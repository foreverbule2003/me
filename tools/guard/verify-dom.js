/**
 * Guard Script: verify-dom.js
 *
 * 靜態 DOM 完整性檢查工具。
 * 雖然無法完全模擬執行時期的 JS，但能確保基礎的 HTML 結構 (Critical IDs) 仍然存在。
 *
 * Target Critical Files:
 * - tools/archive/cb-calculator-standalone.html
 * - tools/cb-war-room.html
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
    file: "tools/archive/cb-calculator-standalone.html",
    requiredIds: [
      "chartContainer",
      "premiumChart",
      "stockSearch",
      "resultsContainer",
      "premiumRate",
    ],
  },
  {
    file: "tools/cb-war-room.html",
    requiredIds: [
      "dashboardContainer",
      "analysisDrawer",
      "dPremiumChart",
      "drawerOverlay",
    ],
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
  const missingIds = [];

  check.requiredIds.forEach((id) => {
    // Simple regex check for id="VALUE" or id='VALUE'
    const regex = new RegExp(`id=["']${id}["']`, "i");
    if (!regex.test(content)) {
      missingIds.push(id);
    }
  });

  if (missingIds.length > 0) {
    console.log(
      `${ANSI_RED}❌ ${check.file} is missing critical IDs:${ANSI_RESET}`,
    );
    missingIds.forEach((id) => console.log(`   - #${id}`));
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
