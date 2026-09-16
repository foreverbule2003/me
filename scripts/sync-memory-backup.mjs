#!/usr/bin/env node
/**
 * 把 Claude Code 的 auto-memory 單向鏡像備份進 repo。
 *
 * 來源（真相）：~/.claude/projects/<encoded-project-path>/memory/*.md —— Claude Code
 * 原生存放本專案記憶的地方，在 repo 之外，不受版控、機器一清就沒。
 * 目的地（快照）：<repo>/.claude/memory-backup/ —— 版控後隨 repo commit/push 保存。
 *
 * 鐵則：**只鏡像，絕不 commit。** commit 一律走 /commit 的確認流程。
 *
 * 三道防呆：
 * 1. 單向：只從 memory/ 寫進 memory-backup/，絕不反向、絕不碰其他目錄。
 * 2. 空來源保護：來源不存在或沒有任何 .md 時中止，**不刪任何備份**
 *    （防「來源路徑錯了 → 空來源 → 把整份快照清空」）。
 * 3. 不 commit：跑完只回報，git 交給 /commit。
 *
 * 移植自 second-brain 的 scripts/python/core/sync_memory_backup.py。
 */

import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

// 本檔位於 <repo>/scripts/，上一層即 repo 根
const PROJECT_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

// 由 repo 絕對路徑反推 Claude Code 的記憶目錄編碼（/ → -），不寫死，repo 搬家仍正確
const ENCODED = PROJECT_ROOT.replaceAll("/", "-");
const SRC = path.join(os.homedir(), ".claude", "projects", ENCODED, "memory");
const DEST = path.join(PROJECT_ROOT, ".claude", "memory-backup");

function main() {
  // 防呆 2a：來源不存在 → 中止，不動備份
  if (!fs.existsSync(SRC) || !fs.statSync(SRC).isDirectory()) {
    console.log(`❌ 找不到記憶來源目錄，中止（未更動任何備份）：\n   ${SRC}`);
    return 1;
  }

  const srcFiles = fs
    .readdirSync(SRC)
    .filter((n) => n.endsWith(".md"))
    .sort();

  // 防呆 2b：來源為空 → 疑似路徑錯誤，中止，不刪備份
  if (srcFiles.length === 0) {
    console.log(
      `❌ 記憶來源目錄裡沒有任何 .md，疑似路徑異常，中止（未刪任何備份）：\n   ${SRC}`,
    );
    return 1;
  }

  fs.mkdirSync(DEST, { recursive: true });

  const added = [];
  const updated = [];

  for (const name of srcFiles) {
    const target = path.join(DEST, name);
    const data = fs.readFileSync(path.join(SRC, name));
    if (!fs.existsSync(target)) {
      fs.writeFileSync(target, data);
      added.push(name);
    } else if (!fs.readFileSync(target).equals(data)) {
      fs.writeFileSync(target, data);
      updated.push(name);
    }
  }

  // 鏡像刪除：備份裡有、來源已無的 .md 一併移除（來源已通過非空檢查，安全）
  const removed = [];
  for (const name of fs
    .readdirSync(DEST)
    .filter((n) => n.endsWith(".md"))
    .sort()) {
    if (!srcFiles.includes(name)) {
      fs.unlinkSync(path.join(DEST, name));
      removed.push(name);
    }
  }

  const relDest = path.relative(PROJECT_ROOT, DEST);
  if (added.length + updated.length + removed.length === 0) {
    console.log(
      `✅ 記憶備份已是最新，無變更（${srcFiles.length} 檔） → ${relDest}/`,
    );
  } else {
    console.log(`✅ 記憶備份已刷新 → ${relDest}/  （來源 ${srcFiles.length} 檔）`);
    if (added.length)
      console.log(`   ＋ 新增 ${added.length}：${added.join(", ")}`);
    if (updated.length)
      console.log(`   ～ 更新 ${updated.length}：${updated.join(", ")}`);
    if (removed.length)
      console.log(`   － 移除 ${removed.length}：${removed.join(", ")}`);
  }
  console.log("ℹ️  只鏡像、未 commit；要入版控請跑 /commit。");
  return 0;
}

process.exit(main());
