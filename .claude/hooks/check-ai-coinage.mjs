#!/usr/bin/env node
/**
 * PostToolUse hook：寫檔當下攔下 AI 自造詞。
 *
 * `/commit` 步驟 6 有同一份慣犯清單，但那是**寫完之後**才掃，而且要靠 AI 自己記得跑。
 * 這支把檢查點搬到上游：Write/Edit 一寫進受管路徑就掃，命中當場擋下來。
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

// 慣犯清單。改這裡等於改規則——同步 `/commit` 步驟 6 那一格。
const COINAGE = {
  閘門: "門檻 / 缺一不進",
  沉底: "收進附錄",
  開獎: "驗證",
  暫存區: "待確認觀察",
  路口: "流程",
  規則卡: "規則本體",
  兜底: "另外綁一個",
  落地: "寫進檔案 / 實際做到",
  落檔: "寫進檔案",
  落盤: "寫進檔案",
  實錘: "證據",
  血緣: "由來",
  指紋: "特徵",
  外顯: "留下紀錄",
  執法: "照著條文做",
  洗成: "講成",
  遮蔽: "蓋過",
  射程: "管得到的範圍",
};

// 只管這幾個地方——它們是「給他讀的」或「他會照著做的」
const WATCHED = [
  "docs/",
  "knowledge/",
  "teaching/",
  "tasks/",
  "trips/",
  ".claude/commands/",
  ".agent/workflows/",
  ".agent/prompts/",
  "README.md",
  "TODO.md",
  "CHANGELOG.md",
  "CONTRIBUTING.md",
];

// 這幾個檔本身就在點名這些詞，擋了規則就失效
const EXEMPT = [
  ".claude/commands/commit.md",
  ".claude/hooks/check-ai-coinage.mjs",
];

// 同一行有這些字 = 在討論這件事，不是在用那個詞
const META = ["自造詞", "造字", "慣犯", "AI 造", "已點名"];

function watched(p) {
  if (!p) return false;
  if (EXEMPT.some((x) => p.includes(x))) return false;
  return WATCHED.some((x) => p.includes(x));
}

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
        "AI 自造詞被攔下（/commit 步驟 6 慣犯清單）。他讀不懂這些詞——那是我造的，不是他說過的話。\n" +
        lines.join("\n") +
        "\n\n當場改掉，不要留到 /commit 才掃。",
    },
    null,
    0,
  ),
);
