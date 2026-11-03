const puppeteer = require("puppeteer");

/**
 * 核心爬蟲工具：負責抓取可轉債與標的股票的歷史資料
 */

async function initBrowser() {
  return await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--window-size=1920,1080",
    ],
  });
}

// "1,234.50" / "+1.50" / "X0.00"(除權息) / "" -> number 或 null
function parseNum(str) {
  const n = parseFloat(String(str ?? "").replace(/[^0-9.\-]/g, ""));
  return isNaN(n) ? null : n;
}

/**
 * 抓取指定月份的數據
 * @param {Object} page Puppeteer Page object
 * @param {string} date AD Date YYYY/MM/01
 * @param {string} code CB Code
 */
async function fetchMonthRaw(page, date, code) {
  const formData = new URLSearchParams();
  formData.append("date", date);
  formData.append("code", code);
  formData.append("id", "");
  formData.append("response", "json");

  const json = await page.evaluate(
    async (url, body) => {
      const resp = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
      });
      const text = await resp.text();
      try {
        return JSON.parse(text);
      } catch (e) {
        return { error: true, msg: text.substring(0, 200) };
      }
    },
    "https://www.tpex.org.tw/www/zh-tw/bond/cbDayQry",
    formData.toString(),
  );

  return json;
}

/**
 * 抓取標的股票數據 (TWSE/TPEx)
 * @param {Object} page Puppeteer Page object
 * @param {string} yyyymmdd YYYYMMDD
 * @param {string} stockCode Stock Code
 */
async function fetchStockDayRaw(page, yyyymmdd, stockCode) {
  // 優先試試 TWSE
  const twseUrl = `https://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${yyyymmdd}&stockNo=${stockCode}`;
  await page.goto(twseUrl, { waitUntil: "networkidle0" });
  const text = await page.evaluate(() => document.body.innerText);
  try {
    const json = JSON.parse(text);
    if (json && json.stat === "OK") return { source: "TWSE", data: json.data };
  } catch (e) {}

  // Fallback: TPEx 上櫃個股日成交（舊的 st43_result.php 已 404）
  // 直接用 Node fetch，避免從 twse.com.tw 頁面跨網域被 CORS 擋
  let tpexJson = null;
  try {
    const resp = await fetch(
      "https://www.tpex.org.tw/www/zh-tw/afterTrading/tradingStock",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `code=${stockCode}&date=${yyyymmdd.substring(0, 4)}/${yyyymmdd.substring(4, 6)}/01&id=&response=json`,
      },
    );
    tpexJson = await resp.json();
  } catch (e) {}
  const tpexRows = tpexJson?.tables?.[0]?.data;
  if (tpexRows && tpexRows.length) return { source: "TPEx", data: tpexRows };

  return null;
}

/**
 * 獲取單一標的的歷史或今日數據
 */
async function fetchHistoryData(cbCode, stockCode, convPrice, months) {
  const browser = await initBrowser();
  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  );

  const historyMap = new Map();

  try {
    // 1. Fetch CB Data
    await page.goto(
      "https://www.tpex.org.tw/zh-tw/bond/info/statistics-cb/day-quotes.html",
    );

    for (const rocMonth of months) {
      const [ry, rm] = rocMonth.split("/");
      const year = parseInt(ry) + 1911;
      const dateParam = `${year}/${rm}/01`;

      // TPEx 連續請求偶爾回錯誤頁，最多重試 2 次
      let json = null;
      for (let attempt = 0; attempt < 3; attempt++) {
        json = await fetchMonthRaw(page, dateParam, cbCode);
        if (!json.error && (json.aaData || json.tables)) break;
        await new Promise((r) => setTimeout(r, 3000 * (attempt + 1)));
      }
      if (json.error || !(json.aaData || json.tables)) {
        console.warn(
          `⚠️ [CB] ${cbCode} ${dateParam} 抓取失敗: ${json.msg || json.stat || "no data"}`,
        );
      }
      const table = json.tables && json.tables[0];
      let rows = json.aaData || table?.data || [];
      // 欄位: 日期,交易模式,收市價,漲跌,開市價,最高價,最低價,成交筆數,單位,成交金額(元),平均價
      // 每天有「等價」(盤中撮合) 與「議價」兩列，只取等價；舊格式沒有交易模式欄就照舊位置
      const fields = table?.fields || [];
      const col = (name, fallback) =>
        fields.indexOf(name) >= 0 ? fields.indexOf(name) : fallback;
      const iMode = fields.indexOf("交易模式");
      const iClose = col("收市價", 6);
      const iChange = col("漲跌", -1);
      const iUnits = col("單位", -1);
      if (iMode >= 0) rows = rows.filter((row) => row[iMode] === "等價");

      rows.forEach((row) => {
        const dStr = row[0];
        let dateStr = "";
        if (dStr.includes("/")) {
          const [dy, dm, dd] = dStr.split("/");
          dateStr = `${parseInt(dy) + 1911}-${dm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
        } else if (dStr.length === 7) {
          dateStr = `${parseInt(dStr.substring(0, 3)) + 1911}-${dStr.substring(3, 5)}-${dStr.substring(5, 7)}`;
        }
        if (!dateStr) return;
        const close = parseNum(row[iClose]);
        if (close !== null) {
          if (!historyMap.has(dateStr))
            historyMap.set(dateStr, { date: dateStr });
          const item = historyMap.get(dateStr);
          item.cbPrice = close;
          if (iChange >= 0) item.cbChange = parseNum(row[iChange]);
          if (iUnits >= 0) item.cbVolume = parseNum(row[iUnits]) ?? 0;
        } else if (iMode >= 0) {
          // 等價列在但沒收市價 = 當天沒成交
          if (!historyMap.has(dateStr))
            historyMap.set(dateStr, { date: dateStr });
          historyMap.get(dateStr).cbVolume = 0;
        }
      });
      await new Promise((r) => setTimeout(r, 1000));
    }

    // 2. Fetch Stock Data
    for (const rocMonth of months) {
      const [ry, rm] = rocMonth.split("/");
      const year = parseInt(ry) + 1911;
      const yyyymmdd = `${year}${rm}01`;

      const result = await fetchStockDayRaw(page, yyyymmdd, stockCode);
      if (result && result.data) {
        result.data.forEach((row) => {
          const [dy, dm, dd] = row[0].split("/");
          const dateStr = `${parseInt(dy) + 1911}-${dm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
          const close = parseNum(row[6]);
          if (close === null) return;
          if (!historyMap.has(dateStr))
            historyMap.set(dateStr, { date: dateStr });
          const item = historyMap.get(dateStr);
          item.stockPrice = close;
          item.stockChange = parseNum(row[7]);
        });
      }
      await new Promise((r) => setTimeout(r, 1000));
    }

    // 3. Process & Calculate
    const finalData = [];
    Array.from(historyMap.values()).forEach((item) => {
      if (item.cbPrice || item.stockPrice) {
        if (item.cbPrice && item.stockPrice && convPrice) {
          const parity = (100 / convPrice) * item.stockPrice;
          item.premium = parseFloat(
            (((item.cbPrice - parity) / parity) * 100).toFixed(2),
          );
        }
        finalData.push(item);
      }
    });

    return finalData.sort((a, b) => a.date.localeCompare(b.date));
  } finally {
    await browser.close();
  }
}

module.exports = { fetchHistoryData };
