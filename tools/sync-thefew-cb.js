const fs = require("fs");
const path = require("path");
const { getFirebaseAdmin } = require("./firebase-utils");

/**
 * @name sync-thefew-cb
 * @description 把 thefew 抓下來的轉換價、CB 收盤價、股票收盤價寫入 cb_history 主文件
 *
 * 用法:
 * node tools/sync-thefew-cb.js <資料檔>           # dry-run，只列出差異
 * node tools/sync-thefew-cb.js <資料檔> --apply   # 寫入 Firestore
 *
 * 資料檔由 tools/thefew-extract.js 產生，每筆「代號,轉換價,CB收盤價,股票收盤價」，以 ; 或換行分隔。
 *
 * 防呆（2026-11 XQ 同步把價格截掉一位數，寫壞上百檔）：
 * - 筆數少於 MIN_ROWS 整批不寫
 * - 轉換價單檔變動超過 MAX_CP_CHANGE 不寫，列出來人工確認
 * - 寫入前把舊值備份到 tools/.backups/
 */

const MIN_ROWS = 300;
const MAX_CP_CHANGE = 0.3;
const BACKUP_DIR = path.join(__dirname, ".backups");

function parseRows(text) {
  const rows = {};
  for (const entry of text.split(/[;\n]/)) {
    const [code, cp, cb, sp] = entry.trim().split(",");
    if (!/^\d{4,6}$/.test(code || "")) continue;
    const num = (v) => (parseFloat(v) > 0 ? parseFloat(v) : null);
    if (!num(cp)) continue;
    rows[code] = { cp: num(cp), cb: num(cb), sp: num(sp) };
  }
  return rows;
}

(async () => {
  const [file] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const isApply = process.argv.includes("--apply");
  if (!file || !fs.existsSync(file)) {
    console.error("Usage: node tools/sync-thefew-cb.js <資料檔> [--apply]");
    process.exit(1);
  }

  const rows = parseRows(fs.readFileSync(file, "utf8"));
  const count = Object.keys(rows).length;
  if (count < MIN_ROWS) {
    console.error(`❌ 只解析到 ${count} 筆（< ${MIN_ROWS}），可能沒登入或頁面改版，整批不寫入。`);
    process.exit(1);
  }

  const admin = getFirebaseAdmin();
  const db = admin.firestore();
  const snapshot = await db.collection("cb_history").get();
  const priceDate = new Date().toISOString().split("T")[0];

  const backup = {};
  const held = [];
  const updates = [];
  let cpChanged = 0;

  for (const doc of snapshot.docs) {
    const row = rows[doc.id];
    if (!row) continue;
    const old = doc.data();
    backup[doc.id] = {
      conversionPrice: old.conversionPrice ?? null,
      price: old.price ?? null,
      stockPrice: old.stockPrice ?? null,
    };

    const update = { priceDate };
    const oldCp = old.conversionPrice;
    if (oldCp && Math.abs(row.cp - oldCp) / oldCp > MAX_CP_CHANGE) {
      held.push(`${doc.id} ${old.name || ""}: ${oldCp} → ${row.cp}`);
    } else if (row.cp !== oldCp) {
      update.conversionPrice = row.cp;
      cpChanged++;
    }
    if (row.cb) update.price = row.cb;
    if (row.sp) update.stockPrice = row.sp;

    updates.push([doc.ref, update]);
  }

  const matched = Object.keys(backup).length;
  const notInDb = Object.keys(rows).filter((c) => !backup[c]);
  console.log(`[thefew] 解析 ${count} 筆，對到 ${matched} 檔，轉換價變動 ${cpChanged} 檔`);
  if (notInDb.length) console.log(`[thefew] 資料庫沒有的代號：${notInDb.join(",")}`);
  if (held.length) {
    console.log(`⚠️ 轉換價變動超過 ${MAX_CP_CHANGE * 100}%，未寫入，請人工確認：`);
    held.forEach((h) => console.log(`   ${h}`));
  }

  if (!isApply) {
    console.log("🔍 Dry run，未寫入。加 --apply 才會寫入。");
    process.exit(0);
  }

  fs.mkdirSync(BACKUP_DIR, { recursive: true });
  const backupFile = path.join(BACKUP_DIR, `thefew-${priceDate}.json`);
  fs.writeFileSync(backupFile, JSON.stringify(backup, null, 1));
  for (let i = 0; i < updates.length; i += 400) {
    const batch = db.batch();
    updates.slice(i, i + 400).forEach(([ref, u]) => batch.set(ref, u, { merge: true }));
    await batch.commit();
  }
  console.log(`✅ 已寫入 ${matched} 檔（priceDate=${priceDate}），舊值備份：${backupFile}`);
  process.exit(0);
})();
