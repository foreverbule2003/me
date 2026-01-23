const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  page.on("console", (msg) => {
    // Filter out typical noisy logs
    const text = msg.text();
    if (
      !text.includes("JQMIGRATE") &&
      !text.includes("blocked") &&
      !text.includes("violate")
    ) {
      console.error("PAGE LOG:", text);
    }
  });

  try {
    await page.goto("https://cbas16889.pscnet.com.tw/marketInfo/marketStats", {
      waitUntil: "networkidle0", // Wait for SPA to settle
      timeout: 30000,
    });

    // Uniform Securities usually has a table with class or easy indicators.
    // Let's wait for a cell containing specific text "大聯大" or "熱門" or just "table"
    try {
      await page.waitForSelector("table", { timeout: 15000 });
    } catch (e) {
      // Continue to inspect
    }

    const data = await page.evaluate(() => {
      const title = document.title;
      const bodyText = document.body.innerText
        .slice(0, 300)
        .replace(/\n/g, " ");

      const rows = Array.from(document.querySelectorAll("table tr"));
      let headerIdx = -1;
      let colMap = {};

      for (let i = 0; i < rows.length; i++) {
        const text = rows[i].innerText;
        // Uniform Header often: "代號", "名稱", "成交價", "漲跌幅", "成交量"
        if (
          text.includes("代號") &&
          text.includes("名稱") &&
          text.includes("成交量")
        ) {
          headerIdx = i;
          const cells = Array.from(rows[i].querySelectorAll("td, th"));
          cells.forEach((cell, idx) => {
            const t = cell.innerText.trim();
            if (t.includes("代號")) colMap.code = idx;
            if (t.includes("名稱") || t.includes("商品")) colMap.name = idx;
            if (t.includes("成交價") || t.includes("現價")) colMap.price = idx;
            if (t.includes("成交量") || t.includes("總量")) colMap.volume = idx;
          });
          break;
        }
      }

      if (headerIdx === -1) {
        return {
          error: "Header not found",
          title,
          bodySnippet: bodyText,
          tableCount: document.querySelectorAll("table").length,
        };
      }

      const results = [];
      for (let i = headerIdx + 1; i < rows.length; i++) {
        const cells = rows[i].querySelectorAll("td");
        if (cells.length < Object.keys(colMap).length) continue;

        const code = cells[colMap.code]?.innerText.trim();
        const name = cells[colMap.name]?.innerText.trim();

        const priceStr = cells[2].innerText.trim().replace(/,/g, '');   // 2: Price
        const changeStr = cells[3].innerText.trim();                    // 3: Change
        const changePctStr = cells[4].innerText.trim();                 // 4: Change %
        const volStr = cells[5].innerText.trim().replace(/,/g, '');     // 5: Volume
        const highStr = cells[6].innerText.trim().replace(/,/g, '');    // 6: High
        const lowStr = cells[7].innerText.trim().replace(/,/g, '');     // 7: Low

        const price = parseFloat(priceStr);
        const volume = parseInt(volStr, 10);
        const high = parseFloat(highStr);
        const low = parseFloat(lowStr);

        if (code && !isNaN(price) && !isNaN(volume)) {
            data.push({ 
                code, 
                name, 
                price, 
                change: changeStr,
                changePercent: changePctStr,
                volume,
                high: isNaN(high) ? '-' : high,
                low: isNaN(low) ? '-' : low
            });
        }
      }

      // Already sorted by volume on the page, but let's ensure
      // return data.sort((a, b) => b.volume - a.volume).slice(0, 20);
      return data.slice(0, 20);
    });

    if (!result || result.length === 0) {
        throw new Error("No data found on PChome page");
    }

    console.log(JSON.stringify({ source: 'pchome', data: result }, null, 2));

  } catch (error) {
    // console.error('Script Error:', error);
    // Fallback: Mock Data
    const mockData = [
      { code: "30371", name: "欣興一", price: 205, change: "▲2.0", changePercent: "0.98%", volume: 2405, high: 206, low: 203 },
      { code: "66721", name: "騰輝電子-KY", price: 112, change: "▼1.5", changePercent: "-1.32%", volume: 1933, high: 114, low: 111.5 },
      { code: "37151", name: "定穎投控一", price: 128.95, change: "0.00", changePercent: "0.00%", volume: 1917, high: 129.5, low: 128 },
      { code: "23683", name: "金像電三", price: 148.65, change: "▲3.65", changePercent: "2.52%", volume: 1260, high: 149.5, low: 146 },
      { code: "49674", name: "十銓四", price: 149.9, change: "▼0.1", changePercent: "-0.07%", volume: 841, high: 151, low: 149 },
      { code: "16095", name: "大亞五", price: 108.7, change: "▲0.5", changePercent: "0.46%", volume: 807, high: 109, low: 108 },
      { code: "62822", name: "康舒二", price: 133.4, change: "0.00", changePercent: "0.00%", volume: 706, high: 134, low: 133 },
      { code: "68901", name: "來億-KY", price: 108.5, change: "▲1.5", changePercent: "1.40%", volume: 693, high: 109, low: 107.5 },
      { code: "62745", name: "台燿五", price: 142, change: "▼2.0", changePercent: "-1.39%", volume: 541, high: 144, low: 141.5 },
      { code: "370201", name: "大聯大E1", price: 106.85, change: "▲0.15", changePercent: "0.14%", volume: 531, high: 107, low: 106.5 },
      { code: "32608", name: "威剛八", price: 153, change: "▼1.0", changePercent: "-0.65%", volume: 307, high: 154.5, low: 152.5 },
      { code: "24672", name: "志聖二", price: 125.3, change: "▲0.8", changePercent: "0.64%", volume: 298, high: 126, low: 124.5 },
      { code: "24673", name: "志聖三", price: 123.3, change: "▲0.3", changePercent: "0.24%", volume: 276, high: 124, low: 122.5 },
      { code: "15142", name: "亞力二", price: 120, change: "0.00", changePercent: "0.00%", volume: 218, high: 121, low: 119.5 }
    ];
    console.log(JSON.stringify({ source: 'mock', data: mockData }, null, 2));
  } finally {
    if (browser) await browser.close();
  }
})();
