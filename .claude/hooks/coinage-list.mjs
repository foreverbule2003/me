/**
 * AI 自造詞清單與掃描範圍。正本只有這一份：
 * - `.claude/hooks/check-ai-coinage.mjs`（寫檔當下攔）
 * - `scripts/check-smells.mjs`（/commit 步驟 6 掃本次新增的行）
 * 兩支都 import 這裡。要加詞、改範圍只改這個檔。
 */

// 慣犯清單：詞 → 建議替代
export const COINAGE = {
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
