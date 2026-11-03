#!/usr/bin/env node
/**
 * PostToolUse hook：寫檔當下攔下 AI 自造詞。
 *
 * `/commit` 步驟 6 的 scripts/check-smells.mjs 是**寫完之後**掃本次新增的行；
 * 這支在上游：Write/Edit 一寫進受管路徑就掃，命中當場擋下來。
 *
 * **不掃的**（靠這幾條避免誤報，誤報會讓這道檢查被學會忽略）：
 * - 清單本身所在的檔（規則在點名這些詞，擋了規則就失效）
 * - 引用原話的行（含「」）、引言行（> 開頭）、程式碼區塊
 * - 同一行出現「自造詞」「造字」這類元討論字眼（那是在講這件事，不是在用那個詞）
 *
 * 移植自 second-brain 的 scripts/python/hooks/check_ai_coinage.py。
 * 用法（由 .claude/settings.json 的 PostToolUse hook 呼叫，吃 stdin 的 hook payload）：
 *     echo '<payload>' | node .claude/hooks/check-ai-coinage.mjs
 */

// 清單與掃描範圍的正本在 coinage-list.mjs，/commit 步驟 6 的 scripts/check-smells.mjs 也讀同一份
import { COINAGE, META, watched } from "./coinage-list.mjs";

/** 回傳 [[詞, 建議替代, 那一行的片段]] */
function scan(text) {
  const hits = [];
  let inCode = false;
  for (const line of text.split("\n")) {
    const stripped = line.replace(/^\s+/, "");
    if (stripped.startsWith("```")) {
      inCode = !inCode;
      continue;
    }
    if (inCode || stripped.startsWith(">") || line.includes("「")) continue;
    if (META.some((m) => line.includes(m))) continue;
    for (const [word, better] of Object.entries(COINAGE)) {
      const i = line.indexOf(word);
      if (i !== -1) {
        hits.push([word, better, line.slice(Math.max(0, i - 12), i + 18).trim()]);
      }
    }
  }
  return hits;
}

async function readStdin() {
  const chunks = [];
  for await (const c of process.stdin) chunks.push(c);
  return Buffer.concat(chunks).toString("utf8");
}

const raw = await readStdin();
let payload;
try {
  payload = JSON.parse(raw);
} catch {
  process.exit(0);
}

const ti = payload.tool_input || {};
if (!watched(ti.file_path || "")) process.exit(0);

const text = ti.new_string || ti.content || "";
if (!text) process.exit(0);

const hits = scan(text);
if (hits.length === 0) process.exit(0);

const seen = new Set();
const lines = [];
for (const [word, better, frag] of hits) {
  if (seen.has(word)) continue;
  seen.add(word);
  lines.push(`「${word}」→ 改用「${better}」；出現在：…${frag}…`);
}

console.log(
  JSON.stringify(
    {
      decision: "block",
      reason:
        "AI 自造詞被攔下（清單見 .claude/hooks/coinage-list.mjs）。他讀不懂這些詞——那是我造的，不是他說過的話。\n" +
        lines.join("\n") +
        "\n\n當場改掉，不要留到 /commit 才掃。",
    },
    null,
    0,
  ),
);
