#!/usr/bin/env node
/**
 * /commit 步驟 5 的文件同步檢查：把「改了 A 就該動 B」這幾組配對交給機器判。
 *
 * 為什麼是腳本不是清單：
 *   清單寫下去之後，沒有任何東西會告訴你它被跳過了。2026-11-03 CB 流程改版，
 *   步驟 5 的表只列了 CB_DATA_FLOW.md，DATASOURCES.md 與架構圖 JSON 是逐一 grep 才補到的。
 *   腳本壞了當場知道：它跑不起來，或印不出「全過」那一行。
 *
 * 判不了的不放進來：
 *   「這是不是純 typo / 資料內容更新」機器分不出來。程式改了卻不寫 CHANGELOG 的情形，
 *   這支照樣報；確屬免同步時，在 diff 摘要寫「文件同步例外：<配對>——<理由>」，不改這支。
 *
 * 用法：
 *   node scripts/check-doc-sync.mjs              # 工作區（含未追蹤）對 HEAD
 *   node scripts/check-doc-sync.mjs --cached     # 只看已 stage 的
 *   node scripts/check-doc-sync.mjs --range A..B # 檢查既有 commit 範圍（回頭驗證用）
 */

import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const cached = args.includes("--cached");
const rangeArg = args[args.indexOf("--range") + 1];
const range = args.includes("--range") ? rangeArg : null;

const git = (...a) =>
  execFileSync("git", ["-c", "core.quotePath=false", ...a], { cwd: ROOT, encoding: "utf8" });
const lines = (s) => s.split("\n").map((l) => l.trim()).filter(Boolean);

function diffArgs() {
  if (range) return [range];
  return cached ? ["--cached"] : ["HEAD"];
}

// 改動的檔（含新增、刪除、搬移的兩端）
const changed = new Set(lines(git("diff", "--name-only", "--no-renames", ...diffArgs())));
if (!range && !cached) lines(git("ls-files", "-o", "--exclude-standard")).forEach((f) => changed.add(f));
const files = [...changed];

// 新增或刪除的檔（不含修改）
const addedOrDeleted = lines(git("diff", "--name-only", "--no-renames", "--diff-filter=AD", ...diffArgs()));
if (!range && !cached) lines(git("ls-files", "-o", "--exclude-standard")).forEach((f) => addedOrDeleted.push(f));

const touched = (f) => changed.has(f);
const any = (re) => files.filter((f) => re.test(f));

// package.json 的 scripts 區塊有沒有變（改版本號、依賴不算）
function npmScriptsChanged() {
  if (!touched("package.json")) return false;
  const before = range ? range.split("..")[0] : "HEAD";
  const after = range
    ? git("show", `${range.split("..")[1] || "HEAD"}:package.json`)
    : cached
      ? git("show", ":package.json")
      : fs.readFileSync(path.join(ROOT, "package.json"), "utf8");
  let old = {};
  try {
    old = JSON.parse(git("show", `${before}:package.json`)).scripts || {};
  } catch {}
  return JSON.stringify(old) !== JSON.stringify(JSON.parse(after).scripts || {});
}

// 每組：觸發的檔 → 必須也動到的文件
const PAIRS = [
  {
    name: "程式或排程改了 → CHANGELOG.md",
    trigger: any(/^(src\/|tools\/(?!archive\/)|scripts\/|\.github\/workflows\/|vite\.config\.js$)/),
    need: ["CHANGELOG.md"],
  },
  {
    name: "CB 資料管線改了 → docs/CB_DATA_FLOW.md",
    trigger: any(
      /^(tools\/(fetch-cb|fetch-hot-cb|sync-thefew|thefew-)|src\/utils\/(cb-|hot-cb)|\.github\/workflows\/daily-)/,
    ),
    need: ["docs/CB_DATA_FLOW.md"],
  },
  {
    name: "npm scripts 增刪改 → README.md",
    trigger: npmScriptsChanged() ? ["package.json（scripts）"] : [],
    need: ["README.md"],
  },
  {
    name: "Vite 入口頁增刪 → docs/SITEMAP.md",
    trigger: addedOrDeleted.filter((f) => /^(tools\/[^/]+\.html|trips\/[^/]+\/index\.html)$/.test(f)),
    need: ["docs/SITEMAP.md"],
  },
  {
    name: "Claude 指令增刪 → README.md",
    trigger: addedOrDeleted.filter((f) => /^\.claude\/commands\/.+\.md$/.test(f)),
    need: ["README.md"],
  },
];

// 旅程 data.js → 同名 spec.md（只對已有 spec.md 的旅程）
for (const f of any(/^src\/pages\/trips\/[^/]+\/data\.js$/)) {
  const trip = f.split("/")[3];
  const spec = `trips/${trip}/spec.md`;
  if (fs.existsSync(path.join(ROOT, spec))) {
    PAIRS.push({
      name: `${trip} 行程資料改了 → ${spec}（node scripts/sync-travel-spec.mjs ${trip}）`,
      trigger: [f],
      need: [spec],
    });
  }
}

const failed = [];
for (const p of PAIRS) {
  if (p.trigger.length === 0) continue;
  const missing = p.need.filter((n) => !touched(n));
  if (missing.length) failed.push({ ...p, missing });
}
const active = PAIRS.filter((p) => p.trigger.length).length;

if (touched("firebase/firestore.rules")) {
  console.log("提醒：firestore.rules 改了，不會隨 push 部署，要手動 firebase deploy --only firestore:rules");
}

if (failed.length === 0) {
  console.log(`文件同步：${PAIRS.length} 組配對全過（本次觸發 ${active} 組）`);
  process.exit(0);
}

console.log(`文件同步：${failed.length} 組沒過`);
for (const p of failed) {
  console.log(`  ✗ ${p.name}`);
  console.log(`    觸發：${p.trigger.slice(0, 5).join("、")}${p.trigger.length > 5 ? ` 等 ${p.trigger.length} 檔` : ""}`);
  console.log(`    沒動到：${p.missing.join("、")}`);
}
process.exit(1);
