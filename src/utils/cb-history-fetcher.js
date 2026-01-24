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

  // Fallback: TPEx
  const ry = parseInt(yyyymmdd.substring(0, 4)) - 1911;
  const rm = yyyymmdd.substring(4, 6);
  const tpexUrl = `https://www.tpex.org.tw/web/stock/aftertrading/daily_trading_info/st43_result.php?d=${ry}/${rm}&stkno=${stockCode}&json=1`;

  await page.setExtraHTTPHeaders({
    Referer:
      "https://www.tpex.org.tw/web/stock/aftertrading/daily_trading_info/st43.php?l=zh-tw",
  });
  await page.goto(tpexUrl, { waitUntil: "networkidle0" });
  const tpexText = await page.evaluate(() => document.body.innerText);
  try {
    const tpexJson = JSON.parse(tpexText);
    if (tpexJson && tpexJson.aaData)
      return { source: "TPEx", data: tpexJson.aaData };
  } catch (e) {}

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

      const json = await fetchMonthRaw(page, dateParam, cbCode);
      let rows = json.aaData || (json.tables && json.tables[0]?.data) || [];

      rows.forEach((row) => {
        const dStr = row[0];
        let dateStr = "";
        if (dStr.includes("/")) {
          const [dy, dm, dd] = dStr.split("/");
          dateStr = `${parseInt(dy) + 1911}-${dm.padStart(2, "0")}-${dd.padStart(2, "0")}`;
        } else if (dStr.length === 7) {
          dateStr = `${parseInt(dStr.substring(0, 3)) + 1911}-${dStr.substring(3, 5)}-${dStr.substring(5, 7)}`;
        }
        const close = parseFloat(row[6]?.replace(/,/g, ""));
        if (!isNaN(close) && dateStr) {
          if (!historyMap.has(dateStr))
            historyMap.set(dateStr, { date: dateStr });
          historyMap.get(dateStr).cbPrice = close;
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
          const close = parseFloat(row[6].replace(/,/g, ""));
          if (historyMap.has(dateStr)) {
            historyMap.get(dateStr).stockPrice = close;
          } else {
            // Even if we don't have CB price for this date, we might want to store stock price?
            // Normally we only care if both exist for premium.
            // But for sync consistency, let's just keep track.
            historyMap.set(dateStr, { date: dateStr, stockPrice: close });
          }
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
