const puppeteer = require("puppeteer");

(async () => {
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
        // 1: Time
        // 2: Price
        // 3: Change
        // 4: Change %
        // 5: Volume
        // 6: High
        // 7: Low

        const nameCodeText = cells[0].innerText.trim();
        const priceStr = cells[2].innerText.trim().replace(/,/g, "");
        const changeStr = cells[3].innerText.trim();
        const changePctStr = cells[4].innerText.trim();
        const volStr = cells[5].innerText.trim().replace(/,/g, "");
        const highStr = cells[6].innerText.trim().replace(/,/g, "");
        const lowStr = cells[7].innerText.trim().replace(/,/g, "");

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
            price,
            change: changeStr,
            changePercent: changePctStr,
            volume: isNaN(volume) ? 0 : volume,
            high: isNaN(high) ? "-" : high,
            low: isNaN(low) ? "-" : low,
          });
        }
      }

      // Already implies volume ranking
      return scrapedData.slice(0, 25);
    });

    if (!results || results.length === 0) {
      throw new Error("No data found on PChome page");
    }

    console.log(JSON.stringify({ source: "pchome", data: results }, null, 2));
  } catch (error) {
    // Fallback: Mock Data
    const mockData = [
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
      {
        code: "49674",
        name: "十銓四",
        price: 149.9,
        change: "▼0.1",
        changePercent: "-0.07%",
        volume: 841,
        high: 151,
        low: 149,
      },
      {
        code: "16095",
        name: "大亞五",
        price: 108.7,
        change: "▲0.5",
        changePercent: "0.46%",
        volume: 807,
        high: 109,
        low: 108,
      },
      {
        code: "62822",
        name: "康舒二",
        price: 133.4,
        change: "0.00",
        changePercent: "0.00%",
        volume: 706,
        high: 134,
        low: 133,
      },
      {
        code: "68901",
        name: "來億-KY",
        price: 108.5,
        change: "▲1.5",
        changePercent: "1.40%",
        volume: 693,
        high: 109,
        low: 107.5,
      },
      {
        code: "62745",
        name: "台燿五",
        price: 142,
        change: "▼2.0",
        changePercent: "-1.39%",
        volume: 541,
        high: 144,
        low: 141.5,
      },
      {
        code: "370201",
        name: "大聯大E1",
        price: 106.85,
        change: "▲0.15",
        changePercent: "0.14%",
        volume: 531,
        high: 107,
        low: 106.5,
      },
      {
        code: "32608",
        name: "威剛八",
        price: 153,
        change: "▼1.0",
        changePercent: "-0.65%",
        volume: 307,
        high: 154.5,
        low: 152.5,
      },
      {
        code: "24672",
        name: "志聖二",
        price: 125.3,
        change: "▲0.8",
        changePercent: "0.64%",
        volume: 298,
        high: 126,
        low: 124.5,
      },
      {
        code: "24673",
        name: "志聖三",
        price: 123.3,
        change: "▲0.3",
        changePercent: "0.24%",
        volume: 276,
        high: 124,
        low: 122.5,
      },
      {
        code: "15142",
        name: "亞力二",
        price: 120,
        change: "0.00",
        changePercent: "0.00%",
        volume: 218,
        high: 121,
        low: 119.5,
      },
    ];
    console.log(JSON.stringify({ source: "mock", data: mockData }, null, 2));
  } finally {
    if (browser) await browser.close();
  }
})();
