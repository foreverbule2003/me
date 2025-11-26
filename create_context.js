const fs = require("fs");
const path = require("path");

const projectRoot = process.cwd();
const outputFile = "project_context.txt";
const includeExtensions = [".html", ".css", ".js"];
const excludeDirs = ["node_modules", ".git", "dist"];

let output = "";

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory() && !excludeDirs.includes(file)) {
      walk(fullPath);
    } else if (
      stat.isFile() &&
      includeExtensions.includes(path.extname(file))
    ) {
      const content = fs.readFileSync(fullPath, "utf-8");
      const relativePath = path.relative(projectRoot, fullPath);

      output += `File: ${relativePath.replace(/\\/g, "/")}\n`;
      output += `---\n`;
      output += `${content}\n`;
      output += `\n---\n\n`;
    }
  }
}

walk(projectRoot);

fs.writeFileSync(outputFile, output);

console.log(`✅ 專案內容已產生至 ${outputFile}`);
console.log("現在您可以複製該檔案的內容並貼到對話框中。");
