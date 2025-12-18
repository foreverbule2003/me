const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

async function main() {
  console.log('--- 快速建立新旅程 (Scaffolding) ---');

  const year = await askQuestion('請輸入年份 (例如 2027): ');
  const location = await askQuestion('請輸入地點/代碼 (例如 sapporo): ');

  if (!year || !location) {
    console.error('年份與地點為必填項目！');
    process.exit(1);
  }

  const folderName = `${year}-${location}`;
  const targetDir = path.join(__dirname, '..', 'trips', folderName);

  if (fs.existsSync(targetDir)) {
    console.error(`錯誤：目錄 ${folderName} 已經存在！`);
    process.exit(1);
  }

  // 1. 建立目錄
  console.log(`\n正在建立目錄: trips/${folderName}...`);
  fs.mkdirSync(path.join(targetDir, 'images'), { recursive: true });

  // 2. 建立 spec.md
  const specContent = `# 🇯🇵 ${year} ${location} 行程規劃

## 📋 行程總覽

| 項目       | 內容                                       |
| ---------- | ------------------------------------------ |
| 行程代碼   | JP-${location.toUpperCase()}-${year}       |
| 適用對象   | 2人                                        |
| 進出點     | TBD                                        |
| 總預算概算 | TBD                                        |
| 核心策略   | TBD                                        |

---

## 📅 行程草案

### Day 1: 抵達
> 今日重點：

| 時間  | 活動 |
| ----- | ---- |
| 12:00 | 抵達 |

---

## ✅ 一鍵檢查清單
- [ ] 訂機票
- [ ] 訂住宿
`;

  fs.writeFileSync(path.join(targetDir, 'spec.md'), specContent);
  console.log('✅ spec.md 建立完成');

  // 3. 建立 index.html (複製 2026-ise-shima 作為模板，但清空內容)
  const templatePath = path.join(__dirname, '..', 'trips', '2026-ise-shima', 'index.html');
  if (fs.existsSync(templatePath)) {
    let htmlContent = fs.readFileSync(templatePath, 'utf8');
    
    // 簡單替換 Title
    htmlContent = htmlContent.replace(/<title>.*<\/title>/, `<title>${year} ${location}</title>`);
    
    // 這裡可以做更多 HTML 清理工作，目前先保持原樣供使用者修改，或者我們可以置換掉 React 的 data 部分
    // 為簡單起見，我們直接寫入，使用者後續修改 spec.md 後更新 HTML 會更完整
    fs.writeFileSync(path.join(targetDir, 'index.html'), htmlContent);
    console.log('✅ index.html 建立完成 (已複製模板)');
  } else {
    console.log('⚠️ 找不到模板檔案，僅建立空 index.html');
    fs.writeFileSync(path.join(targetDir, 'index.html'), '<!DOCTYPE html><html><head><title>New Trip</title></head><body><h1>New Trip</h1></body></html>');
  }

  console.log(`\n🎉 旅程 ${folderName} 建立成功！`);
  console.log(`下一步：\n1. 編輯 trips/${folderName}/spec.md\n2. 修改 trips/${folderName}/index.html`);
  
  rl.close();
}

main();
