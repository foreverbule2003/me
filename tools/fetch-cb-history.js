const fs = require("fs");
const path = require("path");
const { fetchHistoryData } = require("../src/utils/cb-history-fetcher");

/**
 * @name fetch-cb-history
 * @description 抓取並同步 CB 的歷史日 K 線數據 (Historical OHLCV)
 * @version 2.0.0 (Smart Backfill Enabled)
 *
 * 用法:
 * node tools/fetch-cb-history.js <CODE> [SINCE] [--sync] [--smart]
 * node tools/fetch-cb-history.js --all --smart --sync
 */

// 配置
const OUTPUT_DIR = path.join(__dirname, "..", "public", "data", "history");
const DB_PATH = path.join(__dirname, "..", "public", "data", "cb-data.json");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 產生月份列表 (YYYY/MM ~ YYYY/MM)
function generateMonthRange(fromDate, toDate = new Date()) {
  const months = [];
  let current = new Date(fromDate);
  // Normalize to 1st of month
  current.setDate(1);

  while (current <= toDate) {
    const rocY = current.getFullYear() - 1911;
    const mm = (current.getMonth() + 1).toString().padStart(2, "0");
    months.push(`${rocY}/${mm}`);
    current.setMonth(current.getMonth() + 1);
  }
  return months;
}

// 智慧判斷回補區間
function getSmartMonths(targetCode, options) {
  const { sinceDate, isSmart, isForceDeep, isAll } = options;
  const now = new Date();

  // 1. 強制深度回補 (6個月)
  if (isForceDeep) {
    console.log(`[Smart] Force deep backfill for ${targetCode}`);
    const deepDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    return generateMonthRange(deepDate, now);
  }

  // 2. 指定日期
  if (sinceDate && !sinceDate.startsWith("--")) {
    return generateMonthRange(new Date(sinceDate), now);
  }

  // 3. 智慧模式 (核心邏輯)
  if (isSmart) {
    const localFile = path.join(OUTPUT_DIR, `${targetCode}.json`);

    // Case A: 無本地資料 -> 視為新標的 -> 回補 6 個月
    if (!fs.existsSync(localFile)) {
      console.log(
        `[Smart] 🆕 New target detected: ${targetCode}. Triggering 6-month backfill.`,
      );
      const deepDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
      return generateMonthRange(deepDate, now);
    }

    // Case B: 有本地資料 -> 檢查最後日期
    try {
      const data = JSON.parse(fs.readFileSync(localFile, "utf8"));
      if (!data || data.length === 0) {
        console.log(
          `[Smart] Empty local data: ${targetCode}. Triggering 6-month backfill.`,
        );
        const deepDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        return generateMonthRange(deepDate, now);
      }

      const lastRecord = data[data.length - 1]; // items are sorted
      const lastDate = new Date(lastRecord.date);

      // 如果最後數據就是今天或昨天，可能不需要更新? (這裡簡化為：總是抓取最後月份至今，確保補齊當月數據)
      // 但為了保險，我們從「最後日期的下個月」開始抓？不，應該包含「最後日期的當月」，因為可能有新數據。
      const startDate = new Date(
        lastDate.getFullYear(),
        lastDate.getMonth(),
        1,
      );

      // 如果差距過大 (>6個月)，限制回補範圍以免太久? 暫不限制。
      // Log info
      // console.log(`[Smart] Incremental update for ${targetCode} since ${lastRecord.date}`);
      return generateMonthRange(startDate, now);
    } catch (e) {
      console.warn(
        `[Smart] Error reading local file ${targetCode}, falling back to deep sync.`,
      );
      const deepDate = new Date(now.getFullYear(), now.getMonth() - 5, 1);
      return generateMonthRange(deepDate, now);
    }
  }

  // 4. 預設行為 (Legacy Cron Mode)
  // 如果是 --all (每日排程)，只抓當月，節省資源
  if (isAll) {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    return generateMonthRange(startOfMonth, now);
  }

  // 單一標的無參數：預設 6 個月
  const defaultDeep = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  return generateMonthRange(defaultDeep, now);
}

async function syncToFirestore(cbCode, data) {
  try {
    const admin = require("firebase-admin");

    // Initialize if needed
    if (!admin.apps.length) {
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
        const keyPath = path.join(__dirname, "..", "serviceAccountKey.json");
        if (fs.existsSync(keyPath))
          credential = admin.credential.cert(require(keyPath));
      }

      // 3. Skip if no credential (Local Mode)
      if (!credential) {
        console.log(
          "⚠️ [Cloud] No credentials found. Skipping sync (Local Mode Active).",
        );
        return;
      }

      admin.initializeApp({
        credential,
        projectId: "my-landing-page-2ca68",
      });
    }

    const db = admin.firestore();
    const docRef = db.collection("cb_history").doc(cbCode);
    const docSnap = await docRef.get();
    const isManual = process.argv.includes(cbCode);

    // Safety Gate: Only sync if tracked OR manual override
    if (!docSnap.exists() && !isManual) {
        // console.log(`[Cloud] Skipped sync for non-tracked item: ${cbCode}`);
        return;
    }

    console.log(`[Cloud] Syncing ${data.length} records for ${cbCode}...`);

    const batchSize = 500;
    let batch = db.batch();
    let count = 0;

    for (const record of data) {
      const subDocRef = docRef.collection("records").doc(record.date);

      batch.set(
        subDocRef,
        { ...record, updatedAt: admin.firestore.FieldValue.serverTimestamp() },
        { merge: true },
      );
      count++;

      if (count >= batchSize) {
        await batch.commit();
        batch = db.batch();
        count = 0;
      }
    }
    if (count > 0) await batch.commit();

    // Update heartbeat
    if (docSnap.exists()) {
        await docRef.set({ lastUpdated: new Date().toISOString() }, { merge: true });
        console.log(`[Cloud] Updated heartbeat for tracked item: ${cbCode}`);
    } else if (isManual) {
        await docRef.set({ 
          lastUpdated: new Date().toISOString(),
          category: "未分類 (UNCATEGORIZED)",
          addedAt: admin.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        console.log(`[Cloud] Registered new item via manual sync: ${cbCode}`);
    }
  } catch (e) {
    console.warn(`⚠️ [Cloud] Sync Error: ${e.message}`);
  }
}

(async () => {
  const args = process.argv.slice(2);
  const isAll = args.includes("--all");
  const isSync = args.includes("--sync");
  const isSmart = args.includes("--smart");
  const isForceDeep = args.includes("--force-deep");

  // 讀取靜態資料庫
  const dbData = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
  let targets = [];

  if (isAll) {
    targets = dbData.items;
  } else {
    const code = args[0];
    if (!code || code.startsWith("--")) {
      console.error(
        "Usage: node fetch-cb-history.js <CODE|--all> [SINCE] [--sync] [--smart]",
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

  console.log(
    `[Start] Processing ${targets.length} targets. Mode: ${isSmart ? "SMART" : "NORMAL"}`,
  );

  for (const target of targets) {
    try {
      // Per-target month calculation
      const months = getSmartMonths(target.code, {
        sinceDate,
        isSmart,
        isForceDeep,
        isAll,
      });

      // Skip if nothing to do (e.g. smart mode says up to date)
      // Note: generateMonthRange always returns at least one month if valid dates,
      // but if current date is same as last update? We logic for 'current month' ensures checking latest data.

      if (months.length === 0) {
        console.log(`[Skip] ${target.code} is up to date.`);
        continue;
      }

      console.log(`\n--- Processing ${target.name} (${target.code}) ---`);
      console.log(
        `    Range: ${months[0]} -> ${months[months.length - 1]} (${months.length} months)`,
      );

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

        // Merge logic
        const map = new Map();
        existing.forEach((h) => map.set(h.date, h));
        history.forEach((h) => map.set(h.date, h));

        const finalSorted = Array.from(map.values()).sort((a, b) =>
          a.date.localeCompare(b.date),
        );

        fs.writeFileSync(outFile, JSON.stringify(finalSorted, null, 2));
        console.log(
          `✅ [Local] Saved ${finalSorted.length} records (+${history.length} new)`,
        );

        // 雲端同步
        if (isSync) {
          await syncToFirestore(target.code, history); // Sync ONLY the new fetched data to save writes? Or full?
          // Syncing full `finalSorted` ensures consistency but costs rights.
          // Syncing `history` ensures we write what we fetched (which updates gaps).
          // fetchHistoryData returns what it found. Let's sync what we fetched.
          console.log(`✅ [Cloud] Sync complete.`);
        }
      } else {
        console.log(`⚠️ No data found for specified range.`);
      }

      // Rate limiting for Smart/Batch mode
      if (targets.length > 1) {
        // If deep fetch occurred, wait longer
        const delay = months.length > 3 ? 3000 : 1000;
        await new Promise((r) => setTimeout(r, delay));
      }
    } catch (e) {
      console.error(`❌ Failed ${target.code}: ${e.message}`);
    }
  }

  console.log("\n✨ All tasks finished.");
})();
