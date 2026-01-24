const puppeteer = require("puppeteer");
const admin = require("firebase-admin");

/**
 * CB 歷史資料增量同步工具 (雲端/Action 專用)
 * 
 * 邏輯：
 * 1. 從 Firestore 讀取所有 track 的 CB (cb_history 集合中的文件)。
 * 2. 獲取每個 CB 的最新收盤行情。
 * 3. 如雲端尚未有今日數據，則寫入。
 */

// 初始化 Firebase Admin (由環境變數注入)
if (!admin.apps.length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) 
    : null;
    
  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } else {
    // 試圖使用預設認證 (本地開發實測可用)
    admin.initializeApp({
      projectId: "my-landing-page-2ca68"
    });
  }
}

const db = admin.firestore();

async function getWatchedCBs() {
  const snapshot = await db.collection("cb_history").get();
  return snapshot.docs.map(doc => ({
    code: doc.id,
    ...doc.data()
  }));
}

async function fetchLatestDay(browser, cbCode, underlyingCode, convPrice) {
  const page = await browser.newPage();
  try {
    // 獲取今天日期 YYYY-MM-DD
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    
    console.log(`[Fetch] Processing ${cbCode} for ${dateStr}...`);

    // 1. Fetch CB Price (TPEx)
    const tpexUrl = `https://www.tpex.org.tw/www/zh-tw/bond/cbDayQry`;
    const formData = new URLSearchParams();
    formData.append("date", dateStr.replace(/-/g, "/"));
    formData.append("code", cbCode);
    formData.append("response", "json");

    // 注意：這裡使用 POST 行為需要 session 或 referer
    await page.goto("https://www.tpex.org.tw/zh-tw/bond/info/statistics-cb/day-quotes.html");
    
    const cbJson = await page.evaluate(async (url, body) => {
        const resp = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: body
        });
        return await resp.json();
    }, tpexUrl, formData.toString());

    let cbPrice = null;
    if (cbJson.aaData && cbJson.aaData.length > 0) {
        // 取最後一筆 (通常是指定日期的那一筆)
        const row = cbJson.aaData[cbJson.aaData.length - 1];
        cbPrice = parseFloat(row[6]?.replace(/,/g, ""));
    }

    if (!cbPrice) {
        console.log(`  - No CB quote found for today.`);
        return null;
    }

    // 2. Fetch Stock Price (TWSE/TPEx)
    // 簡化邏輯：優先嘗試 TWSE
    const twseDate = dateStr.replace(/-/g, "");
    const twseUrl = `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${twseDate}&stockNo=${underlyingCode}`;
    await page.goto(twseUrl);
    const stockJson = await page.evaluate(() => JSON.parse(document.body.innerText));

    let stockPrice = null;
    if (stockJson.stat === "OK" && stockJson.data) {
        const row = stockJson.data[stockJson.data.length - 1]; 
        stockPrice = parseFloat(row[6]?.replace(/,/g, ""));
    }

    if (!stockPrice) {
        // Fallback: 試試 TPEx Web API
        const rocDate = `${today.getFullYear() - 1911}/${(today.getMonth()+1).toString().padStart(2, '0')}`;
        const tpexStockUrl = `https://www.tpex.org.tw/web/stock/aftertrading/daily_trading_info/st43_result.php?d=${rocDate}&stkno=${underlyingCode}&json=1`;
        await page.goto(tpexStockUrl);
        const tpexStockJson = await page.evaluate(() => JSON.parse(document.body.innerText));
        if (tpexStockJson.aaData && tpexStockJson.aaData.length > 0) {
            const row = tpexStockJson.aaData[tpexStockJson.aaData.length - 1];
            stockPrice = parseFloat(row[6]?.replace(/,/g, ""));
        }
    }

    if (!stockPrice) {
        console.log(`  - No Stock quote found.`);
        return null;
    }

    // 3. Calculate
    const parity = (100 / convPrice) * stockPrice;
    const premium = ((cbPrice - parity) / parity) * 100;

    return {
        date: dateStr,
        cbPrice: parseFloat(cbPrice.toFixed(2)),
        stockPrice: parseFloat(stockPrice.toFixed(2)),
        premium: parseFloat(premium.toFixed(2)),
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };
  } catch (e) {
    console.error(`  - Error:`, e.message);
    return null;
  } finally {
    await page.close();
  }
}

async function run() {
  console.log("🚀 [Sync] Starting incremental sync...");
  const watchedCBs = await getWatchedCBs();
  console.log(`[Info] Found ${watchedCBs.length} CBs in watchlist.`);

  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  try {
    for (const cb of watchedCBs) {
      if (!cb.underlyingCode || !cb.conversionPrice) {
          console.log(`[Skip] ${cb.code} is missing metadata.`);
          continue;
      }

      const result = await fetchLatestDay(browser, cb.code, cb.underlyingCode, cb.conversionPrice);
      
      if (result) {
        // 寫入 Firestore
        const recordRef = db.collection("cb_history").doc(cb.code).collection("records").doc(result.date);
        await recordRef.set(result, { merge: true });
        
        // 更新主文件 Metadata
        await db.collection("cb_history").doc(cb.code).update({
            lastUpdated: new Date().toISOString(),
            recordCount: admin.firestore.FieldValue.increment(1) // 粗略估計，實際應 query count
        });

        console.log(`✅ [Success] Sync ${cb.code} for ${result.date}`);
      }
    }
  } finally {
    await browser.close();
  }
  console.log("✨ [Sync] Finished.");
}

run().catch(console.error);
