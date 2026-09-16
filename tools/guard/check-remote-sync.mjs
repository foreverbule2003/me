#!/usr/bin/env node
/**
 * 開工同步檢查：本地是否落後遠端。
 *
 * 為什麼不只掛在 `npm run new-trip`：
 *   分歧開工已發生三次，每次成因都不同，而 new-trip 的檢查只涵蓋第一種。
 *   1. 2026-09-06：另一台機器先推，本地沒 fetch 就建旅程（兩次）
 *   2. 2026-09-16：同一台機器的 git worktree 把 commit 推上去後，主工作目錄的
 *      main 靜默落後五天——連「兩台機器」這個前提都不需要
 *   第 2 種完全繞過 new-trip 的檢查：那天根本沒建新旅程，落後是在寫文件時撞上的。
 *   所以檢查要在「開工」這個時間點跑，而不是綁在某一支指令上。
 *
 * 三種用法：
 *   node tools/guard/check-remote-sync.mjs            開工檢查，只報告不擋（SessionStart hook 用）
 *   node tools/guard/check-remote-sync.mjs --strict   落後時 exit 1（new-trip 這類會動全域註冊點的指令用）
 *   import { checkRemoteSync } from "./check-remote-sync.mjs"
 *
 * 離線、無 remote、不在 git repo 時一律只警告不擋——擋了會讓離線工作做不下去，
 * 而這道檢查一旦妨礙日常就會被學會略過。
 * 略過：SKIP_SYNC_CHECK=1
 */

import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../");

/**
 * @returns {{status: string, ahead: number, behind: number, worktrees: string[], message: string}}
 *   status: "ok" | "behind" | "skipped"
 */
export function checkRemoteSync({ fetch = true } = {}) {
  const git = (cmd) =>
    execSync(`git ${cmd}`, {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      timeout: 30000,
    }).trim();

  const skip = (message) => ({
    status: "skipped",
    ahead: 0,
    behind: 0,
    worktrees: [],
    message,
  });

  if (process.env.SKIP_SYNC_CHECK === "1") return skip("SKIP_SYNC_CHECK=1，略過。");

  try {
    git("rev-parse --is-inside-work-tree");
  } catch {
    return skip("不在 git repo，略過。");
  }

  if (fetch) {
    try {
      git("fetch");
    } catch {
      return skip("連不上遠端（離線？），略過。");
    }
  }

  let ahead = 0;
  let behind = 0;
  try {
    const counts = git("rev-list --left-right --count @{u}...HEAD").split(/\s+/);
    behind = parseInt(counts[0], 10);
    ahead = parseInt(counts[1], 10);
  } catch {
    return skip("無上游分支，略過。");
  }

  // 同 repo 的其他 worktree 也可能推過 commit——2026-09-16 的落後就是這樣來的
  let worktrees = [];
  try {
    worktrees = git("worktree list")
      .split("\n")
      .slice(1) // 第一行是主工作目錄
      .filter(Boolean);
  } catch {
    // worktree 資訊拿不到不影響主要判斷
  }

  return {
    status: behind > 0 ? "behind" : "ok",
    ahead,
    behind,
    worktrees,
    message:
      behind > 0
        ? `本地落後遠端 ${behind} 個 commit（ahead ${ahead}）。`
        : `已與遠端同步（ahead ${ahead}, behind 0）。`,
  };
}

// ---- CLI ----
if (import.meta.url === `file://${process.argv[1]}`) {
  const strict = process.argv.includes("--strict");
  const result = checkRemoteSync();

  if (result.status === "skipped") {
    console.log(`⏭️  ${result.message}`);
    process.exit(0);
  }

  if (result.status === "ok") {
    console.log(`✅ ${result.message}`);
    process.exit(0);
  }

  console.error(`⚠️  ${result.message}`);
  console.error(`   先同步再動手：git pull --rebase`);
  if (result.worktrees.length > 0) {
    console.error(
      `\n   這個 repo 另有 ${result.worktrees.length} 個 worktree，遠端的新 commit 可能是從那裡推的：`,
    );
    for (const w of result.worktrees) console.error(`     ${w}`);
  }
  if (strict) {
    console.error(`\n   （確定要在落後狀態下繼續：SKIP_SYNC_CHECK=1）`);
    process.exit(1);
  }
  process.exit(0);
}
