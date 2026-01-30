/**
 * @name backfill-to-firebase
 * @description 將 TPEX backfill 資料上傳至 Firebase Firestore hot_cb_snapshots
 * @version 1.0.0
 *
 * 用法:
 * node tools/backfill-to-firebase.js
 * node tools/backfill-to-firebase.js --dry-run   (僅預覽，不實際上傳)
 */

const fs = require("fs");
const path = require("path");

const INPUT_FILE = path.join(__dirname, "tpex_backfill_10days.json");
const isDryRun = process.argv.includes("--dry-run");

// Format helpers
function formatChange(change) {
  if (change === null || change === undefined) return "0.00";
  const val = parseFloat(change);
  if (isNaN(val)) return "0.00";
  if (val > 0) return `+${val.toFixed(2)}`;
  if (val < 0) return `${val.toFixed(2)}`;
  return "0.00";
}

function formatChangePercent(change, close) {
  if (change === null || change === undefined || !close) return "0.00%";
  const val = parseFloat(change);
  if (isNaN(val)) return "0.00%";
  const lastClose = close - val;
  if (lastClose <= 0) return "0.00%";
  const pct = (val / lastClose) * 100;
  if (pct > 0) return `+${pct.toFixed(2)}%`;
  if (pct < 0) return `${pct.toFixed(2)}%`;
  return "0.00%";
}

async function run() {
  console.log("========================================");
  console.log("  TPEX Backfill to Firebase Uploader (V2)");
  console.log("========================================\n");

  if (isDryRun) {
    console.log("🔍 DRY RUN MODE - 資料不會實際上傳\n");
  }

  // 1. Load raw data
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ 找不到輸入檔案: ${INPUT_FILE}`);
    process.exit(1);
  }
  const rawData = JSON.parse(fs.readFileSync(INPUT_FILE, "utf8"));

  // 1.1 Load CB Metadata for mapping
  const CB_DATA_PATH = path.join(
    __dirname,
    "..",
    "public",
    "data",
    "cb-data.json",
  );
  let cbMapping = {};
  if (fs.existsSync(CB_DATA_PATH)) {
    const cbData = JSON.parse(fs.readFileSync(CB_DATA_PATH, "utf8"));
    cbData.items.forEach((item) => {
      cbMapping[item.code] = item;
    });
    console.log(`✅ 已載入 ${cbData.items.length} 筆標的中繼資料`);
  }

  console.log(`📂 載入 ${rawData.length} 筆原始資料\n`);

  // 2. Group by date
  const byDate = {};
  for (const item of rawData) {
    if (!byDate[item.date]) byDate[item.date] = [];
    byDate[item.date].push(item);
  }

  const dates = Object.keys(byDate).sort();
  console.log(
    `📅 共 ${dates.length} 個交易日: ${dates[0]} ~ ${dates[dates.length - 1]}\n`,
  );

  // 3. Transform and sort each day
  const snapshots = {};

  for (const date of dates) {
    const items = byDate[date];

    // Calculate correct volume & transform format
    const transformed = items.map((item) => {
      const calcVol =
        item.close > 0 ? Math.round(item.vol_money / item.close / 1000) : 0;
      const meta = cbMapping[item.code] || {};

      return {
        code: item.code,
        name: item.name,
        time: "13:30:00",
        price: item.close,
        change: formatChange(item.change),
        changePercent: formatChangePercent(item.change, item.close),
        volume: calcVol, // Number type
        high: item.high || item.close,
        low: item.low || item.close,
        underlyingCode: meta.underlyingCode || "",
        stockPrice: meta.stockPrice || 0, // Fallback to current meta if available
        _rawVol: calcVol,
      };
    });

    // Sort by volume descending, take top 20
    const sorted = transformed
      .sort((a, b) => b._rawVol - a._rawVol)
      .slice(0, 20)
      .map(({ _rawVol, ...rest }) => rest);

    snapshots[date] = {
      data: sorted,
      updatedAt: new Date().toISOString(),
      source: "backfill",
    };

    console.log(
      `  ✅ ${date}: ${sorted.length} 筆 (榜首: ${sorted[0]?.name} / ${sorted[0]?.volume} 張)`,
    );
  }

  // 4. Upload to Firebase
  if (isDryRun) {
    console.log("\n🔍 DRY RUN 完成 - 以下是預覽資料:\n");
    // Show sample
    const sampleDate = dates[dates.length - 1];
    console.log(`=== ${sampleDate} Top 5 ===`);
    console.table(snapshots[sampleDate].data.slice(0, 5));
    return;
  }

  console.log("\n☁️  開始上傳至 Firebase...\n");

  // Initialize Firebase Admin
  const admin = require("firebase-admin");

  let credential = null;

  // 1. Env Var
  if (process.env.FIREBASE_SERVICE_ACCOUNT) {
    try {
      credential = admin.credential.cert(
        JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT),
      );
    } catch (e) {}
  }

  // 2. Local File
  if (!credential) {
    const possibleKeys = ["service-account.json", "serviceAccountKey.json"];
    for (const keyFile of possibleKeys) {
      const keyPath = path.join(__dirname, "..", keyFile);
      if (fs.existsSync(keyPath)) {
        credential = admin.credential.cert(require(keyPath));
        break;
      }
    }
  }

  if (!credential) {
    console.error(
      "❌ 找不到 Firebase 憑證 (service-account.json 或 serviceAccountKey.json 或 FIREBASE_SERVICE_ACCOUNT 環境變數)",
    );
    process.exit(1);
  }

  admin.initializeApp({
    credential,
    projectId: "my-landing-page-2ca68",
  });

  const db = admin.firestore();

  // Upload each snapshot
  let successCount = 0;
  for (const date of dates) {
    try {
      await db.collection("hot_cb_snapshots").doc(date).set(snapshots[date]);
      successCount++;
      console.log(`  ☁️  ${date} 上傳成功`);
    } catch (e) {
      console.error(`  ❌ ${date} 上傳失敗: ${e.message}`);
    }
  }

  // Update meta
  try {
    const latestDate = dates[dates.length - 1];
    await db
      .collection("hot_cb_meta")
      .doc("latest")
      .set(
        { lastDateId: latestDate, backfilledAt: new Date().toISOString() },
        { merge: true },
      );
    console.log(`\n📌 已更新 hot_cb_meta/latest.lastDateId = ${latestDate}`);
  } catch (e) {
    console.error(`\n⚠️  更新 meta 失敗: ${e.message}`);
  }

  console.log(`\n✨ 完成! 成功上傳 ${successCount}/${dates.length} 個快照`);
}

run().catch((e) => {
  console.error("Fatal error:", e);
  process.exit(1);
});
