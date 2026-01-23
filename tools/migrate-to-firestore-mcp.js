const fs = require('fs');
const path = require('path');

/**
 * [CB 計算機數據遷移工具 - MCP 版本]
 * 
 * 使用方式：
 * 直接執行 `node tools/migrate-to-firestore-mcp.js`
 * 此版本透過讀取本地 JSON 並產出 Firebase CLI 指令，由開發者手動執行。
 */

async function migrate() {
  const historyDir = path.join(__dirname, '../public/data/history');
  
  if (!fs.existsSync(historyDir)) {
    console.error('❌ 錯誤：找不到 public/data/history 目錄');
    return;
  }

  const files = fs.readdirSync(historyDir).filter(f => f.endsWith('.json'));

  console.log(`🚀 找到 ${files.length} 個 JSON 檔案，準備產出 Firestore 匯入指令...`);
  console.log('');

  const importData = {};

  for (const file of files) {
    const symbol = file.replace('.json', '');
    const filePath = path.join(historyDir, file);
    
    try {
      const rawData = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(rawData);

      console.log(`📦 處理 ${symbol} (${data.length} 筆資料)...`);

      importData[symbol] = {
        symbol: symbol,
        lastUpdated: new Date().toISOString(),
        data: data
      };
      
    } catch (err) {
      console.error(`❌ ${symbol} 處理失敗:`, err.message);
    }
  }

  // 產出 JSON 檔案供 Firebase CLI 匯入
  const outputPath = path.join(__dirname, 'firestore-import.json');
  const firestoreData = {
    __collections__: {
      cb_history: Object.keys(importData).reduce((acc, symbol) => {
        acc[symbol] = importData[symbol];
        return acc;
      }, {})
    }
  };

  fs.writeFileSync(outputPath, JSON.stringify(firestoreData, null, 2));
  console.log('');
  console.log(`✅ 已產出 Firestore 匯入檔案: ${outputPath}`);
  console.log('');
  console.log('📌 請執行以下指令完成匯入：');
  console.log('');
  console.log('   firebase firestore:delete --all-collections -f');
  console.log('   firebase firestore:import tools/firestore-import.json');
  console.log('');
}

migrate().catch(err => {
  console.error('🔥 發生嚴重錯誤:', err);
  process.exit(1);
});
