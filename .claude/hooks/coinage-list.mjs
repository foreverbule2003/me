/**
 * AI 自造詞清單與掃描範圍。
 * - 詞表正本在 second-brain `.claude/shared-data/coinage.json`（兩個 repo 共用，2026-11-04 合併），
 *   這裡只讀出適用 me 的詞；要加詞改那份 JSON。
 * - 掃描範圍（WATCHED / EXEMPT / META）是 me 自己的，留在這個檔。
 * 讀這裡的：`.claude/hooks/check-ai-coinage.mjs`（寫檔當下攔）、
 * `scripts/check-smells.mjs`（/commit §4 掃本次新增的行）。
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// me 與 second-brain 都在 ~/myDev 底下，用相對位置找
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const COINAGE_JSON = path.resolve(ROOT, "../second-brain/.claude/shared-data/coinage.json");

if (!fs.existsSync(COINAGE_JSON)) {
  throw new Error(`找不到共用造字詞表：${COINAGE_JSON}（second-brain 要跟 me 放在同一層）`);
}

// 慣犯清單：詞 → 建議替代
export const COINAGE = Object.fromEntries(
  JSON.parse(fs.readFileSync(COINAGE_JSON, "utf8"))
    .words.filter((w) => !w.repos || w.repos.includes("me"))
    .map((w) => [w.word, w.better]),
);

// 只管這幾個地方——它們是「給他讀的」或「他會照著做的」
export const WATCHED = [
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
export const EXEMPT = [
  ".claude/commands/commit.md",
  ".claude/hooks/",
  "scripts/check-smells.mjs",
];

// 同一行有這些字 = 在討論這件事，不是在用那個詞
export const META = ["自造詞", "造字", "慣犯", "AI 造", "已點名"];

export function watched(p) {
  if (!p) return false;
  if (EXEMPT.some((x) => p.includes(x))) return false;
  return WATCHED.some((x) => p.includes(x));
}
