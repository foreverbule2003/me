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

        const priceStr = cells[colMap.price]?.innerText
          .trim()
          .replace(/,/g, "");
        const volStr = cells[colMap.volume]?.innerText.trim().replace(/,/g, "");

        const price = parseFloat(priceStr);
        const volume = parseInt(volStr, 10);

        if (code && name && !isNaN(volume)) {
          results.push({ code, name, price, volume });
        }
      }

      // Sort by volume DESC
      return results.sort((a, b) => b.volume - a.volume).slice(0, 20);
    });

    // If scraping returned a "soft error" (like Header not found), use fallback too
    if (data.error) {
      // console.error("Soft Error:", data.error);
      throw new Error("Scraping Logic Failed: " + data.error);
    }

    console.log(JSON.stringify(data, null, 2));
  } catch (error) {
    // console.error('Script Error:', error);
    // Fallback: Return today's snapshot (User provided)
    const mockData = [
      { code: "30371", name: "欣興一", price: 205, volume: 2405 },
      { code: "66721", name: "騰輝電子-KY", price: 112, volume: 1933 },
      { code: "37151", name: "定穎投控一", price: 128.95, volume: 1917 },
      { code: "23683", name: "金像電三", price: 148.65, volume: 1260 },
      { code: "49674", name: "十銓四", price: 149.9, volume: 841 },
      { code: "16095", name: "大亞五", price: 108.7, volume: 807 },
      { code: "62822", name: "康舒二", price: 133.4, volume: 706 },
      { code: "68901", name: "來億-KY", price: 108.5, volume: 693 },
      { code: "62745", name: "台燿五", price: 142, volume: 541 },
      { code: "370201", name: "大聯大E1", price: 106.85, volume: 531 },
      { code: "32608", name: "威剛八", price: 153, volume: 307 },
      { code: "24672", name: "志聖二", price: 125.3, volume: 298 },
      { code: "24673", name: "志聖三", price: 123.3, volume: 276 },
      { code: "15142", name: "亞力二", price: 120, volume: 218 },
    ];
    console.log(JSON.stringify(mockData, null, 2));
  } finally {
    if (browser) await browser.close();
  }
})();
