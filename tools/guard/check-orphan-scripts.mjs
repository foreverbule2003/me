#!/usr/bin/env node
/**
 * Guard Script: check-orphan-scripts.mjs
 *
 * 掃 scripts/ 底下有沒有「沒有執行入口」的腳本。
 *
 * 為什麼需要這支：
 *   scripts/test-calculator-core.mjs 的 import 指向不存在的路徑，壞了兩個月沒被發現
 *   （2026-07-07 修好，見 tasks/lessons.md 與 CHANGELOG 2.7.9）。原因不是沒人看，
 *   而是它沒接進任何 npm script、workflow 或程式碼 import——CI 照不到，人也不會手動跑。
 *   那則教訓自己留下的追蹤項就是「定期掃描 scripts/ 孤兒腳本」，這支把它自動化。
 *
 * 什麼算「執行入口」：
 *   package.json 的 scripts、GitHub workflow、程式碼 import、.claude/commands 或
 *   .agent/workflows 的步驟、根目錄的 .bat。
 *
 * 什麼**不算**：
 *   CHANGELOG.md、tasks/lessons.md、docs/WORKFLOW_AUDIT_*.md 這類歷史記述。
 *   「被談論過」不等於「跑得到」——test-calculator-core.mjs 在這兩個檔裡都有名字，
 *   照樣壞了兩個月。這條區分是這支 guard 的重點，放寬了它就驗不出東西。
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../");
const SCRIPTS_DIR = path.join(ROOT, "scripts");
const GUARD_SELF = "tools/guard/check-orphan-scripts.mjs";

const RED = "\x1b[31m";
const GREEN = "\x1b[32m";
const RESET = "\x1b[0m";

// 沒有入口但確定要留的，列在這裡並寫明用途與判斷依據。
const ALLOWED_ORPHANS = {
  "seed-data.js":
    "Firebase 種子資料，一次性維運工具，不接進 npm script 以免誤觸寫入正式資料庫",
};

// 「談論它」的檔，不算入口
const NOT_AN_ENTRYPOINT = [
  "CHANGELOG.md",
  "tasks/lessons.md",
  "tasks/todo.md",
  "TODO.md",
  "docs/WORKFLOW_AUDIT_2026-07-06.md",
];

const SEARCH_ROOTS = [
  "package.json",
  ".github",
  "vite.config.js",
  "vitest.config.js",
  "playwright.config.js",
  "src",
  "tools",
  "scripts",
  "public",
  ".claude/commands",
  ".agent/workflows",
  "trips",
  "docs",
  "README.md",
  "CONTRIBUTING.md",
];

/** 遞迴收集要搜尋的檔案內容 */
function collectFiles(rel, out) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return;
  const stat = fs.statSync(abs);
  if (stat.isFile()) {
    if (!NOT_AN_ENTRYPOINT.includes(rel)) out.push(rel);
    return;
  }
  for (const entry of fs.readdirSync(abs)) {
    if (entry === "node_modules" || entry.startsWith(".git")) continue;
    collectFiles(path.join(rel, entry), out);
  }
}

console.log(`${GREEN}🛡️  Starting Orphan Script Guard...${RESET}`);

const scripts = fs
  .readdirSync(SCRIPTS_DIR, { withFileTypes: true })
  .filter((d) => d.isFile() && /\.(mjs|js|cjs|py)$/.test(d.name))
  .map((d) => d.name);

const searchFiles = [];
for (const r of SEARCH_ROOTS) collectFiles(r, searchFiles);

const orphans = [];
for (const name of scripts) {
  if (name in ALLOWED_ORPHANS) continue;
  const selfPath = path.join("scripts", name);
  const referenced = searchFiles.some((rel) => {
    if (rel === selfPath) return false; // 腳本自己不算引用自己
    // 本檔的註解舉了 test-calculator-core.mjs 當例子，不排除的話被舉例的腳本
    // 會因為「在說明文字裡出現過」而逃過檢查——該報時不報，比不檢查更糟
    if (rel === GUARD_SELF) return false;
    let content;
    try {
      content = fs.readFileSync(path.join(ROOT, rel), "utf8");
    } catch {
      return false; // 二進位或讀不到的檔跳過
    }
    return content.includes(name);
  });
  if (!referenced) orphans.push(name);
}

if (orphans.length > 0) {
  console.log(`${RED}❌ scripts/ 底下有沒有執行入口的腳本：${RESET}`);
  for (const name of orphans) console.log(`   ${RED}scripts/${name}${RESET}`);
  console.log(
    `\n   沒有入口的腳本壞了不會有人知道（test-calculator-core.mjs 壞了兩個月）。三選一：`,
  );
  console.log(`     1. 接進 package.json 的 scripts，讓它跑得到`);
  console.log(`     2. 確定不再需要就刪掉`);
  console.log(
    `     3. 確定要留著手動用，加進本檔的 ALLOWED_ORPHANS 並寫明用途\n`,
  );
  process.exit(1);
}

console.log(
  `${GREEN}✅ scripts/ 的 ${scripts.length} 支腳本都有執行入口（${Object.keys(ALLOWED_ORPHANS).length} 支列為手動工具）。${RESET}`,
);
