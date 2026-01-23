const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

/**
 * [CB 計算機數據遷移工具 - 增量版]
 * 
 * 將本地 JSON 歷史資料遷移至 Firestore Subcollections 架構
 * 結構: cb_history/{symbol}/records/{date}
 * 
 * 使用方式：
 * node tools/migrate-to-subcollections.js
 */

// 初始化 Firebase Admin
admin.initializeApp({
  projectId: 'my-landing-page-2ca68'
});

const db = admin.firestore();

async function migrate() {
  const historyDir = path.join(__dirname, '../public/data/history');
  
  if (!fs.existsSync(historyDir)) {
    console.error('❌ 錯誤：找不到 public/data/history 目錄');
    return;
  }

  const files = fs.readdirSync(historyDir).filter(f => f.endsWith('.json'));
  console.log(`🚀 找到 ${files.length} 個 JSON 檔案，開始遷移至 Firestore (Subcollections)...\n`);

  for (const file of files) {
    const symbol = file.replace('.json', '');
    const filePath = path.join(historyDir, file);
    
    try {
      const rawData = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(rawData);

      if (!Array.isArray(data) || data.length === 0) {
        console.log(`⚠️ ${symbol} 無資料，跳過`);
        continue;
      }

      console.log(`📦 正在處理 ${symbol} (${data.length} 筆資料)...`);

      // 1. 更新主文件 (Parent Document)
      await db.collection('cb_history').doc(symbol).set({
        symbol: symbol,
        lastUpdated: new Date().toISOString(),
        recordCount: data.length
      }, { merge: true });

      // 2. 批次寫入子集合 (Subcollection Batch Write)
      // Firestore batch limit is 500 operations
      const BATCH_SIZE = 450;
      const chunks = [];
      for (let i = 0; i < data.length; i += BATCH_SIZE) {
        chunks.push(data.slice(i, i + BATCH_SIZE));
      }

      let totalWritten = 0;

      for (const chunk of chunks) {
        const batch = db.batch();
        const recordsRef = db.collection('cb_history').doc(symbol).collection('records');

        chunk.forEach(record => {
          // 確保有 date 欄位作為 ID
          if (record.date) {
            const docRef = recordsRef.doc(record.date);
            batch.set(docRef, record);
          }
        });

        await batch.commit();
        totalWritten += chunk.length;
        process.stdout.write('.'); // Progress indicator
      }

      console.log(`\n✅ ${symbol} 遷移成功 (已寫入 ${totalWritten} 筆記錄)`);
      
    } catch (err) {
      console.error(`\n❌ ${symbol} 遷移失敗:`, err.message);
    }
  }

  console.log('\n✨ 遷移工作全部完成！架構已升級為 Subcollections。');
  process.exit(0);
}

migrate().catch(err => {
  console.error('🔥 發生嚴重錯誤:', err);
  process.exit(1);
});
