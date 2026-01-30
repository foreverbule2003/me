const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

/**
 * [CB 計算機數據遷移工具]
 *
 * 使用方式：
 * 1. 至 Firebase Console -> 專案設定 -> 服務帳戶 -> 產生新的私鑰。
 * 2. 將金鑰重新命名為 `serviceAccountKey.json` 並放在 `tools/` 目錄下。
 * 3. 執行 `node tools/migrate-to-firestore.js`。
 */

// Check for both key names
const possibleKeys = ["service-account.json", "serviceAccountKey.json"];
let KEY_PATH = null;

for (const key of possibleKeys) {
  const p = path.join(__dirname, "..", "..", key); // Adjusted path to root
  if (fs.existsSync(p)) {
    KEY_PATH = p;
    break;
  }
}

if (!KEY_PATH) {
  console.error(
    "❌ 錯誤：找不到 service-account.json 或 serviceAccountKey.json (於根目錄)",
  );
  process.exit(1);
}

const serviceAccount = require(KEY_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function migrate() {
  const historyDir = path.join(__dirname, "../public/data/history");

  if (!fs.existsSync(historyDir)) {
    console.error("❌ 錯誤：找不到 public/data/history 目錄");
    return;
  }

  const files = fs.readdirSync(historyDir).filter((f) => f.endsWith(".json"));

  console.log(`🚀 找到 ${files.length} 個 JSON 檔案，開始遷移至 Firestore...`);

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
}

migrate().catch((err) => {
  console.error("🔥 發生嚴重錯誤:", err);
  process.exit(1);
});
