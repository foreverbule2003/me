/**
 * Guard Script: verify-dom.js
 *
 * 靜態 DOM 完整性檢查工具。
 *
 * 2026-07 更新：cb-war-room 與 cb-calculator 已重構為 Vite + React，
 * HTML 僅剩 <div id="root"> mount shell，舊的「關鍵 ID 存在」檢查已無意義。
 * 改為驗證 React 入口頁的接線完整性：
 *   1. mount point (#root) 存在
 *   2. <script type="module" src="..."> 指向的入口檔案真實存在於磁碟
 * 執行期的 UI 完整性由 Playwright (tests/war-room.spec.js 等) 把關。
 */

const fs = require("fs");
const path = require("path");

const ANSI_RED = "\x1b[31m";
const ANSI_GREEN = "\x1b[32m";
const ANSI_RESET = "\x1b[0m";

// Configuration
const PROJECT_ROOT = path.resolve(__dirname, "../../");

const CHECKS = [
  {
    file: "tools/cb-war-room.html",
    requiredIds: ["root"],
    verifyScriptEntry: true,
  },
  {
    file: "tools/cb-calculator.html",
    requiredIds: ["root"],
    verifyScriptEntry: true,
  },
];

let hasErrors = false;

console.log(`${ANSI_GREEN}🛡️  Starting DOM Integrity Guard...${ANSI_RESET}`);

CHECKS.forEach((check) => {
  const filePath = path.join(PROJECT_ROOT, check.file);

  if (!fs.existsSync(filePath)) {
    console.log(`${ANSI_RED}❌ File Not Found: ${check.file}${ANSI_RESET}`);
    hasErrors = true;
    return;
  }

  const content = fs.readFileSync(filePath, "utf-8");
  const problems = [];

  // 1. Mount point 檢查
  check.requiredIds.forEach((id) => {
    const regex = new RegExp(`id=["']${id}["']`, "i");
    if (!regex.test(content)) {
      problems.push(`missing critical ID: #${id}`);
    }
  });

  // 2. Module script 入口接線檢查
  if (check.verifyScriptEntry) {
    const matches = [
      ...content.matchAll(
        /<script[^>]*type=["']module["'][^>]*src=["']([^"']+)["']/g,
      ),
    ];
    if (matches.length === 0) {
      problems.push("no <script type=\"module\"> entry found");
    }
    matches.forEach((m) => {
      const src = m[1];
      // 絕對路徑 (/src/...) 相對於專案根目錄解析；相對路徑相對於 HTML 所在目錄
      const entryPath = src.startsWith("/")
        ? path.join(PROJECT_ROOT, src)
        : path.resolve(path.dirname(filePath), src);
      if (!fs.existsSync(entryPath)) {
        problems.push(`script entry not found on disk: ${src}`);
      }
    });
  }

  if (problems.length > 0) {
    console.log(`${ANSI_RED}❌ ${check.file} failed:${ANSI_RESET}`);
    problems.forEach((p) => console.log(`   - ${p}`));
    hasErrors = true;
  } else {
    console.log(`${ANSI_GREEN}✅ ${check.file} passed DOM check.${ANSI_RESET}`);
  }
});

if (hasErrors) {
  process.exit(1);
} else {
  process.exit(0);
}
