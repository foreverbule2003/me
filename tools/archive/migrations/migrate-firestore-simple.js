const fs = require("fs");
const path = require("path");
const admin = require("firebase-admin");

/**
 * [CB 計算機數據遷移工具 - 簡化版]
 *
 * 使用 Firebase 預設憑證 (Application Default Credentials)
 * 執行前請先執行: firebase login
 *
 * 使用方式：
 * node tools/migrate-firestore-simple.js
 */

// 使用 Application Default Credentials (透過 Firebase CLI 登入即可)
admin.initializeApp({
  projectId: "my-landing-page-2ca68",
});

const db = admin.firestore();

async function migrate() {
  const historyDir = path.join(__dirname, "../public/data/history");

  if (!fs.existsSync(historyDir)) {
    console.error("❌ 錯誤：找不到 public/data/history 目錄");
    return;
  }

  const files = fs.readdirSync(historyDir).filter((f) => f.endsWith(".json"));

  console.log(
    `🚀 找到 ${files.length} 個 JSON 檔案，開始遷移至 Firestore...\n`,
  );

  for (const file of files) {
    const symbol = file.replace(".json", "");
    const filePath = path.join(historyDir, file);

    try {
      const rawData = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(rawData);

      console.log(`📦 正在處理 ${symbol} (${data.length} 筆資料)...`);

      // 儲存至 cb_history 集合，以代號為 Document ID
      await db.collection("cb_history").doc(symbol).set({
        symbol: symbol,
        lastUpdated: new Date().toISOString(),
        data: data,
      });

      console.log(`✅ ${symbol} 遷移成功`);
    } catch (err) {
      console.error(`❌ ${symbol} 遷移失敗:`, err.message);
    }
  }

  console.log("\n✨ 遷移工作全部完成！");
  process.exit(0);
}

migrate().catch((err) => {
  console.error("🔥 發生嚴重錯誤:", err);
  process.exit(1);
});
