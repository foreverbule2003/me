/**
 * Guard Script: check-datapath.js
 *
 * 靜態掃描工具，用於偵測 HTML/JS 檔案中是否包含易碎的絕對路徑配置。
 *
 * Target Risks:
 * - Hardcoded "/data/" paths (Should use getDataPath())
 * - Hardcoded "/me/" prefix (Should be dynamic)
 * - Absolute links to "index.html" or "hot-cb.html" without relative handling
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ANSI_RED = "\x1b[31m";
const ANSI_GREEN = "\x1b[32m";
const ANSI_RESET = "\x1b[0m";

// Configuration
const SCAN_DIR = path.resolve(__dirname, "../../"); // Project root
const IGNORE_DIRS = ["node_modules", ".git", "dist", ".gemini"];
const CRITICAL_PATTERNS = [
  {
    regex: /fetch\(\s*['"`]\/data\//g,
    msg: "Hardcoded fetch /data/ (Use getDataPath)",
  },
  {
    regex: /fetch\(\s*['"`]\/me\//g,
    msg: "Hardcoded fetch /me/ (Use dynamic base)",
  },
  {
    regex: /href\s*=\s*['"`]\/me\//g,
    msg: "Absolute href /me/ (Use relative path)",
  },
];

// 允許清單：vite base 為 "/me/"，以下屬刻意使用的合法絕對路徑，
// 不視為違規（否則 guard 永遠 exit 1，紅燈常態化會讓防線失效）：
// 1. favicon 連結（部署於 GitHub Pages /me/ 下解析正確）
// 2. 回首頁連結 /me/?booted=true（跳過開機動畫的標準導覽模式）
const ALLOWED_LINE_PATTERNS = [
  /['"`]\/me\/favicon/,
  /['"`]\/me\/\?booted=true/,
];

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  let errors = [];

  // Skip gitignored or irrelevant files
  if (filePath.endsWith(".map") || filePath.endsWith(".json")) return [];

  CRITICAL_PATTERNS.forEach((p) => {
    // /g regex 的 lastIndex 會跨呼叫殘留，測前必須歸零，否則漏報
    p.regex.lastIndex = 0;
    if (p.regex.test(content)) {
      // Find line numbers
      const lines = content.split("\n");
      lines.forEach((line, idx) => {
        p.regex.lastIndex = 0;
        if (
          p.regex.test(line) &&
          !ALLOWED_LINE_PATTERNS.some((allowed) => allowed.test(line))
        ) {
          errors.push(
            `Line ${idx + 1}: ${p.msg} -> ${line.trim().substring(0, 50)}...`,
          );
        }
      });
    }
  });

  return errors;
}

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    if (IGNORE_DIRS.includes(file)) return;

    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else if (file.endsWith(".js") || file.endsWith(".html")) {
      const errors = scanFile(filePath);
      if (errors.length > 0) {
        results.push({ file: filePath, errors });
      }
    }
  });
  return results;
}

console.log(`${ANSI_GREEN}🛡️  Starting Data Path Guard Scan...${ANSI_RESET}`);
const violations = walkDir(SCAN_DIR);

if (violations.length > 0) {
  console.log(`${ANSI_RED}❌ Found Potential Path Violations:${ANSI_RESET}`);
  violations.forEach((v) => {
    console.log(`\n📄 ${path.relative(SCAN_DIR, v.file)}`);
    v.errors.forEach((e) => console.log(`   - ${e}`));
  });
  process.exit(1);
} else {
  console.log(`${ANSI_GREEN}✅ No hardcoded data paths detected.${ANSI_RESET}`);
  process.exit(0);
}
