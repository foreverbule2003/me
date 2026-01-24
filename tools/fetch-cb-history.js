const fs = require("fs");
const path = require("path");
const { fetchHistoryData } = require("../src/utils/cb-history-fetcher");

/**
 * @name fetch-cb-history
 * @description 抓取並同步 CB 的歷史日 K 線數據 (Historical OHLCV)
 * @source TWSE/TPEx Open Data
 * @scope 定義於 cb-data.json 中的標的代號
 * @target public/data/history/<CODE>.json & Firestore (cb_history/records)
 *
 * 用法:
 * node tools/fetch-cb-history.js <CODE> [SINCE_DATE]  # 抓取單一標的歷史至本地
 * node tools/fetch-cb-history.js --all               # 抓取所有標的最新數據
 * node tools/fetch-cb-history.js <CODE> --sync       # 抓取並同步至 Firestore
 */

// 配置
const OUTPUT_DIR = path.join(__dirname, "..", "public", "data", "history");
const DB_PATH = path.join(__dirname, "..", "public", "data", "cb-data.json");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 獲取月份區間
function getMonthsSince(sinceDateStr) {
  const months = [];
  const now = new Date();
  let startDate = new Date(now.getFullYear(), now.getMonth(), 1);

  if (sinceDateStr && sinceDateStr !== "--sync" && sinceDateStr !== "--all") {
    const since = new Date(sinceDateStr);
    if (!isNaN(since.getTime())) {
      startDate = new Date(since.getFullYear(), since.getMonth(), 1);
    }
  } else if (
    process.argv.includes("--all") ||
    process.argv.includes("--sync")
  ) {
    // 僅同步最新月份
    startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  } else {
    // 預設抓取 6 個月
    startDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  }

  let current = new Date(startDate);
  while (current <= now) {
    const rocY = current.getFullYear() - 1911;
    const mm = (current.getMonth() + 1).toString().padStart(2, "0");
    months.push(`${rocY}/${mm}`);
    current.setMonth(current.getMonth() + 1);
  }
  return months;
}

async function syncToFirestore(cbCode, data) {
  // 延遲式導入 firebase-admin 以免本地執行時無憑證報錯
  const admin = require("firebase-admin");
  if (!admin.apps.length) {
    admin.initializeApp({ projectId: "my-landing-page-2ca68" });
  }
  const db = admin.firestore();
  console.log(`[Cloud] Syncing ${data.length} records for ${cbCode}...`);

  for (const record of data) {
    const docRef = db
      .collection("cb_history")
      .doc(cbCode)
      .collection("records")
      .doc(record.date);
    await docRef.set(
      {
        ...record,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true },
    );
  }

  // 更新主文件 metadata
  await db.collection("cb_history").doc(cbCode).set(
    {
      lastUpdated: new Date().toISOString(),
    },
    { merge: true },
  );
}

(async () => {
  const args = process.argv.slice(2);
  const isAll = args.includes("--all");
  const isSync = args.includes("--sync");

  // 讀取靜態資料庫
  const dbData = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  let targets = [];

  if (isAll) {
    targets = dbData.items;
  } else {
    const code = args[0];
    if (!code || code.startsWith("--")) {
      console.error(
        "Usage: node fetch-cb-history.js <CODE> [SINCE_DATE] [--sync]",
      );
      process.exit(1);
    }
    const item = dbData.items.find((i) => i.code === code);
    if (!item) {
      console.error(`Error: CB ${code} not found in database.`);
      process.exit(1);
    }
    targets = [item];
  }

  const sinceDate = args.find((a) => /^\d{4}-\d{2}-\d{2}$/.test(a));
  const months = getMonthsSince(sinceDate);

  console.log(
    `[Start] Processing ${targets.length} targets for months: ${months.join(", ")}`,
  );

  for (const target of targets) {
    try {
      console.log(`\n--- Processing ${target.name} (${target.code}) ---`);
      const history = await fetchHistoryData(
        target.code,
        target.underlyingCode,
        target.conversionPrice,
        months,
      );

      if (history.length > 0) {
        // 本地儲存
        const outFile = path.join(OUTPUT_DIR, `${target.code}.json`);
        let existing = [];
        if (fs.existsSync(outFile)) {
          try {
            existing = JSON.parse(fs.readFileSync(outFile, "utf8"));
          } catch (e) {}
        }

        // Merge
        const map = new Map();
        existing.forEach((h) => map.set(h.date, h));
        history.forEach((h) => map.set(h.date, h));
        const finalSorted = Array.from(map.values()).sort((a, b) =>
          a.date.localeCompare(b.date),
        );

        fs.writeFileSync(outFile, JSON.stringify(finalSorted, null, 2));
        console.log(
          `✅ [Local] Saved ${finalSorted.length} records to ${outFile}`,
        );

        // 雲端同步
        if (isSync) {
          await syncToFirestore(target.code, history);
          console.log(`✅ [Cloud] Sync complete.`);
        }
      } else {
        console.log(`⚠️ No data found for ${target.code}`);
      }
    } catch (e) {
      console.error(`❌ Failed ${target.code}: ${e.message}`);
    }
  }

  console.log("\n✨ All tasks finished.");
})();
