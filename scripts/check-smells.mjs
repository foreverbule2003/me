#!/usr/bin/env node
/**
 * /commit §4 的壞味道掃描：六種裡機器判得了的三種交給機器。
 *
 * 只做三種：
 *   1. 造字 —— 補寫檔 hook 的漏：用 Bash 寫入的檔、既有檔的新增行、hook 裝上之前就在的寫法
 *   2. 主語是 AI —— 關鍵詞比對，誤報低
 *   3. ⚠️ 盤點 —— 只列出來，不判是否已結清（要讀別的檔，機器判不了）
 * 冗餘、邏輯不通、幻覺留在 /commit §4 的表裡由人判：硬做成檢查只會每行都報，
 * 平常就在報的檢查很快會被學會忽略。移植自 second-brain 的 scripts/python/check_smells.py。
 *
 * 清單不另存一份：COINAGE / META / watched 從 .claude/hooks/coinage-list.mjs 讀（詞表正本在 second-brain 的 .claude/shared-data/coinage.json）。
 *
 * 用法：
 *   node scripts/check-smells.mjs              # 工作區（含未追蹤）對 HEAD
 *   node scripts/check-smells.mjs --cached     # 只看已 stage 的
 *   node scripts/check-smells.mjs --range A..B # 檢查既有 commit 範圍
 */

import { execFileSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { COINAGE, META, watched } from "../.claude/hooks/coinage-list.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const args = process.argv.slice(2);
const cached = args.includes("--cached");
const range = args.includes("--range") ? args[args.indexOf("--range") + 1] : null;

// 這些檔的主題就是「AI 做錯了什麼」，主語是 AI 是正常的
const AI_SUBJECT_OK = ["tasks/lessons.md"];
const AI_SUBJECT = ["抱歉", "我的疏失", "讓我重新確認", "感謝你的指正", "我原本以為", "我誤判", "我搞錯", "我應該要"];

const git = (...a) =>
  execFileSync("git", ["-c", "core.quotePath=false", ...a], { cwd: ROOT, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

/** 回傳 [[檔名, 新增的那一行]] */
function addedLines() {
  const diffArgs = range ? [range] : cached ? ["--cached"] : ["HEAD"];
  const res = [];
  let cur = "";
  for (const line of git("diff", "-U0", ...diffArgs).split("\n")) {
    if (line.startsWith("+++ ")) cur = line.startsWith("+++ b/") ? line.slice(6) : "";
    else if (line.startsWith("+") && cur) res.push([cur, line.slice(1)]);
  }
  // 未追蹤的新檔全文都算新增
  if (!range && !cached) {
    for (const f of git("ls-files", "-o", "--exclude-standard").split("\n").filter(Boolean)) {
      try {
        fs.readFileSync(path.join(ROOT, f), "utf8").split("\n").forEach((l) => res.push([f, l]));
      } catch {}
    }
  }
  return res;
}

/** 那個詞是不是落在「」裡面（引用原話，放行） */
function inQuotes(line, word) {
  return [...line.matchAll(/「([^」]*)」/g)].some((m) => m[1].includes(word));
}

const pairs = addedLines().filter(([f]) => watched(f));
const files = new Set(pairs.map(([f]) => f));
if (pairs.length === 0) {
  console.log("壞味道：這次沒有要掃的新增行");
  process.exit(0);
}

const hits = [];
const warns = [];
let inCode = false;
let lastFile = "";
for (const [f, line] of pairs) {
  if (f !== lastFile) {
    inCode = false;
    lastFile = f;
  }
  const st = line.trimStart();
  if (st.startsWith("```")) {
    inCode = !inCode;
    continue;
  }
  if (inCode || st.startsWith(">")) continue;
  if (META.some((m) => line.includes(m))) continue;
  const frag = line.trim().slice(0, 44);

  for (const [word, better] of Object.entries(COINAGE)) {
    if (line.includes(word) && !inQuotes(line, word)) hits.push(`造字「${word}」→ 改成「${better}」  ${f}：${frag}`);
  }
  if (!AI_SUBJECT_OK.some((x) => f.includes(x))) {
    for (const w of AI_SUBJECT) {
      if (line.includes(w)) hits.push(`主語是 AI「${w}」  ${f}：${frag}`);
    }
  }
  if (line.includes("⚠️")) warns.push(`${f}：${line.trim().slice(0, 60)}`);
}

for (const w of warns) console.log(`  ⚠️ 要自己判是不是已經結清：${w}`);

if (hits.length) {
  console.log(`壞味道：掃過 ${files.size} 個檔，抓到 ${hits.length} 處`);
  hits.forEach((h, i) => console.log(`  ${i + 1}. ${h}`));
  console.log("  （冗餘、邏輯不通、幻覺機器判不了，見 /commit §4 的表）");
  process.exit(1);
}
console.log(`壞味道：掃過 ${files.size} 個檔，沒抓到`);
