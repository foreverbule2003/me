/**
 * 熱門可轉債清單:讀櫃買中心每日「轉(交)換公司債買賣斷交易行情表」CSV,
 * 取等價交易、按成交張數排前 20。
 * 原本爬 PChome,2026-11 起 PChome 對 GitHub Actions 回 403,改用櫃買官方檔。
 * 收盤後才有當日檔;當日還沒出就往前找最近一個交易日。
 */

const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
const TOP_N = 20;
const MAX_LOOKBACK_DAYS = 10;

/** 台北時區的今天(或指定時間的台北日期),回傳 "YYYY-MM-DD" */
function taipeiTodayStr(date = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

/** 台北時區的今天,回傳 { y, m, d } */
function taipeiToday() {
  const [y, m, d] = taipeiTodayStr().split("-").map(Number);
  return { y, m, d };
}

function csvUrl(date) {
  const y = date.getUTCFullYear();
  const mm = String(date.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(date.getUTCDate()).padStart(2, "0");
  return {
    dateStr: `${y}-${mm}-${dd}`,
    url: `https://www.tpex.org.tw/storage/bond_zone/tradeinfo/cb/${y}/${y}${mm}/RSta0113.${y}${mm}${dd}-C.csv`,
  };
}

/** 抓最近一個有檔的交易日;沒檔時櫃買回 302 或 404 */
async function downloadLatestCsv() {
  const { y, m, d } = taipeiToday();
  const cursor = new Date(Date.UTC(y, m - 1, d));
  for (let i = 0; i < MAX_LOOKBACK_DAYS; i++) {
    const dow = cursor.getUTCDay();
    if (dow !== 0 && dow !== 6) {
      const { dateStr, url } = csvUrl(cursor);
      const res = await fetch(url, {
        redirect: "manual",
        headers: {
          "User-Agent": USER_AGENT,
          Referer:
            "https://www.tpex.org.tw/zh-tw/bond/info/statistics-cb/day.html",
        },
      });
      if (res.status === 200) {
        const buf = Buffer.from(await res.arrayBuffer());
        return { dateStr, text: new TextDecoder("big5").decode(buf) };
      }
      console.error(`[cb-fetcher] ${dateStr} 沒有櫃買報價檔 (HTTP ${res.status})`);
    }
    cursor.setUTCDate(cursor.getUTCDate() - 1);
  }
  throw new Error(`最近 ${MAX_LOOKBACK_DAYS} 天都抓不到櫃買可轉債報價檔`);
}

function formatChange(chg) {
  if (chg > 0) return `▲${chg}`;
  if (chg < 0) return `▼${Math.abs(chg)}`;
  return "0.00";
}

/** 解析 CSV 的 BODY 列,只留有成交的等價交易 */
function parseCsv(text) {
  const rows = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line.startsWith("BODY,")) continue;
    const cols = (line.slice(5).match(/"[^"]*"|[^,]+/g) || []).map((c) =>
      c.replace(/^"|"$/g, "").trim(),
    );
    // 0 代號 1 名稱 2 交易 3 收市 4 漲跌 5 開市 6 最高 7 最低 8 筆數 9 單位 10 金額
    if (cols[2] !== "等價" || !/^\d+$/.test(cols[0])) continue;
    const price = parseFloat(cols[3]);
    if (isNaN(price)) continue;
    const chg = parseFloat(cols[4]) || 0;
    const prev = price - chg;
    const volume = parseInt(cols[9].replace(/,/g, ""), 10);
    const high = parseFloat(cols[6]);
    const low = parseFloat(cols[7]);
    rows.push({
      code: cols[0],
      name: cols[1],
      time: "13:30",
      price,
      change: formatChange(chg),
      changePercent: prev ? `${((chg / prev) * 100).toFixed(2)}%` : "0.00%",
      volume: isNaN(volume) ? 0 : volume,
      high: isNaN(high) ? "-" : high,
      low: isNaN(low) ? "-" : low,
    });
  }
  return rows;
}

/**
 * Returns { source, dataDate, updatedAt, data: [{ code, name, price, ... }] }
 */
async function fetchHotCB() {
  try {
    const { dateStr, text } = await downloadLatestCsv();
    const results = parseCsv(text)
      .sort((a, b) => b.volume - a.volume)
      .slice(0, TOP_N);

    if (results.length === 0) {
      throw new Error(`櫃買 ${dateStr} 報價檔解析不出任何成交資料`);
    }
    console.error(`[cb-fetcher] 櫃買 ${dateStr} 報價檔,取成交張數前 ${results.length} 檔`);

    // --- Enrichment Phase: Fetch Underlying Stock Prices ---
    console.error(
      `[Fetcher] Enriching ${results.length} items with real-time stock prices (TWSE/OTC)...`,
    );
    for (const item of results) {
      try {
        // Heuristic: CB Code is 5 digits, Stock Code is first 4.
        const stockCode = item.code.substring(0, 4);
        item.underlyingCode = stockCode;

        // TWSE MIS API (Official Real-time - Delayed/Cached)
        // Query both TSE and OTC to be safe
        const qUrl = `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_${stockCode}.tw|otc_${stockCode}.tw&json=1&delay=0`;
        const res = await fetch(qUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          },
        });
        const json = await res.json();

        if (json.msgArray && json.msgArray.length > 0) {
          // Take the first valid match
          const stockData = json.msgArray.find((d) => d.c === stockCode);
          if (stockData && stockData.z !== "-") {
            item.stockPrice = parseFloat(stockData.z);
          } else if (stockData && stockData.y !== "-") {
            // Fallback to yesterday closing if current price is unavailable (e.g. pre-market)
            item.stockPrice = parseFloat(stockData.y);
          } else {
            item.stockPrice = 0;
          }
        } else {
          item.stockPrice = 0;
        }

        // Polite delay to prevent rate limiting
        await new Promise((r) => setTimeout(r, 100));
      } catch (e) {
        console.error(
          `[Fetcher] Failed to fetch stock price for ${item.code}:`,
          e.message,
        );
        item.stockPrice = 0;
      }
    }
    console.error("[Fetcher] Enrichment complete.");

    return {
      source: "tpex",
      dataDate: dateStr,
      updatedAt: new Date().toISOString(),
      data: results,
    };
  } catch (error) {
    console.error("[cb-fetcher] Error fetching Hot CB:", error.message);
    throw error;
  }
}

module.exports = { fetchHotCB, taipeiTodayStr };
