const puppeteer = require("puppeteer");

/**
 * Scrapes the Hot CB list from PChome.
 * Returns a list of { code, name, price, ... } objects.
 */
async function fetchHotCB() {
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    // Set User Agent
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    );

    // PChome Ranking Page for CBs
    const URL = "https://pchome.megatime.com.tw/group/mkt1/cid55/010.html";

    await page.goto(URL, {
      waitUntil: "networkidle0",
      timeout: 30000,
    });

    // Wait for the specific tbody ID that contains data rows
    await page.waitForSelector("#cpidStock", { timeout: 15000 });

    const results = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll("#cpidStock tr"));
      const scrapedData = [];

      for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].querySelectorAll("td");
        if (cells.length < 8) continue;

        // Column mapping for PChome:
        // 0: Name (Code) - e.g. "欣興一 (30371)"
        // 1: Time (e.g. "13:30")
        // 2: Price
        // 3: Change
        // 4: Change %
        // 5: Volume
        // 6: High
        // 7: Low

        const nameCodeText = cells[0].innerText.trim();
        const timeStr = cells[1].innerText.trim();
        const priceStr = cells[2].innerText.trim().replace(/[^0-9.-]/g, "");
        const changeStr = cells[3].innerText.trim();
        const changePctStr = cells[4].innerText.trim();
        const volStr = cells[5].innerText.trim().replace(/,/g, "");
        const highStr = cells[6].innerText.trim().replace(/[^0-9.-]/g, "");
        const lowStr = cells[7].innerText.trim().replace(/[^0-9.-]/g, "");

        // Extract Code from name (Code)
        const codeMatch = nameCodeText.match(/\((\d+)\)/);
        const code = codeMatch ? codeMatch[1] : "";
        const name = nameCodeText.split("(")[0].trim().replace(/\s+$/, "");

        const price = parseFloat(priceStr);
        const volume = parseInt(volStr, 10);
        const high = parseFloat(highStr);
        const low = parseFloat(lowStr);

        if (code && !isNaN(price)) {
          scrapedData.push({
            code,
            name,
            time: timeStr,
            price,
            change: changeStr,
            changePercent: changePctStr,
            volume: isNaN(volume) ? 0 : volume,
            high: isNaN(high) ? "-" : high,
            low: isNaN(low) ? "-" : low,
          });
        }
      }

      // Explicitly sort by Volume (Desc) to ensure "Hot" definition
      scrapedData.sort((a, b) => b.volume - a.volume);

      // Return Top 20 strictly
      return scrapedData.slice(0, 20);
    });

    if (!results || results.length === 0) {
      throw new Error("No data found on PChome page");
    }

    // --- Enrichment Phase: Fetch Underlying Stock Prices ---
    console.log(
      `[Fetcher] Enriching ${results.length} items with real-time stock prices (TWSE/OTC)...`,
    );
    const enrichPromises = results.map(async (item) => {
      try {
        // Heuristic: CB Code is 5 digits, Stock Code is first 4.
        const stockCode = item.code.substring(0, 4);
        item.underlyingCode = stockCode;

        // TWSE MIS API (Official Real-time - Delayed/Cached)
        // Query both TSE and OTC to be safe
        const qUrl = `https://mis.twse.com.tw/stock/api/getStockInfo.jsp?ex_ch=tse_${stockCode}.tw|otc_${stockCode}.tw&json=1&delay=0`;
        const res = await fetch(qUrl);
        const json = await res.json();

        if (json.msgArray && json.msgArray.length > 0) {
          // Take the first valid match
          const stockData = json.msgArray.find((d) => d.c === stockCode);
          if (stockData && stockData.z !== "-") {
            item.stockPrice = parseFloat(stockData.z);
            // console.log(`[Stock] ${item.name} (${stockCode}) = ${item.stockPrice}`);
          } else if (stockData && stockData.y !== "-") {
            // Fallback to yesterday closing if current price is unavailable (e.g. pre-market)
            item.stockPrice = parseFloat(stockData.y);
          } else {
            item.stockPrice = 0;
          }
        } else {
          item.stockPrice = 0;
        }
      } catch (e) {
        console.warn(
          `[Fetcher] Failed to fetch stock price for ${item.code}:`,
          e.message,
        );
        item.stockPrice = 0;
      }
    });

    // Wait for all enrichments (fairly fast)
    await Promise.all(enrichPromises);
    console.log("[Fetcher] Enrichment complete.");

    // Wrap in object with metadata
    return {
      source: "pchome",
      updatedAt: new Date().toISOString(), // Fallback server time
      data: results,
    };
  } catch (error) {
    console.error("[cb-fetcher] Error fetching Hot CB:", error.message);
    throw error;
  } finally {
    if (browser) await browser.close();
  }
}

/**
 * Returns mock data for fallback/testing purposes.
 */
function getMockHotCB() {
  return [
    {
      code: "30371",
      name: "欣興一",
      price: 205,
      change: "▲2.0",
      changePercent: "0.98%",
      volume: 2405,
      high: 206,
      low: 203,
    },
    {
      code: "66721",
      name: "騰輝電子-KY",
      price: 112,
      change: "▼1.5",
      changePercent: "-1.32%",
      volume: 1933,
      high: 114,
      low: 111.5,
    },
    {
      code: "37151",
      name: "定穎投控一",
      price: 128.95,
      change: "0.00",
      changePercent: "0.00%",
      volume: 1917,
      high: 129.5,
      low: 128,
    },
    // ... truncated list for brevity in mock
    {
      code: "23683",
      name: "金像電三",
      price: 148.65,
      change: "▲3.65",
      changePercent: "2.52%",
      volume: 1260,
      high: 149.5,
      low: 146,
    },
  ];
}

module.exports = { fetchHotCB, getMockHotCB };
