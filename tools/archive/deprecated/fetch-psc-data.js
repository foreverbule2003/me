const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const TARGET_URL = "https://cbas16889.pscnet.com.tw/marketInfo/issued/";
const DATA_FILE = path.join(__dirname, "../public/data/cb-data.json");

(async () => {
  console.log("Launching browser...");
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--window-size=1920,1080",
    ],
  });
  const page = await browser.newPage();

  // Set User Agent to avoid detection
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  );

  try {
    console.log(`Navigating to ${TARGET_URL}...`);
    await page.goto(TARGET_URL, { waitUntil: "networkidle2", timeout: 60000 });

    // Wait for table wrapper specifically
    console.log("Waiting for table wrapper...");
    try {
      await page.waitForSelector(".v-data-table__wrapper", { timeout: 30000 });
    } catch (e) {
      console.log("Selector timeout. Taking screenshot...");
      await page.screenshot({ path: "error_screenshot.png" });
      throw e;
    }

    // Give a little extra time for rows to render (Vue transition)
    await new Promise((r) => setTimeout(r, 2000));

    // Extract Data
    console.log("Extracting data...");
    const result = await page.evaluate(() => {
      // Use verified selectors from subagent
      const wrapper = document.querySelector(".v-data-table__wrapper");
      if (!wrapper) return { error: "Wrapper not found" };

      const table = wrapper.querySelector("table");
      if (!table) return { error: "Table not found inside wrapper" };

      const rows = Array.from(table.querySelectorAll("tbody tr"));
      const items = [];

      // PSC 表格使用多行 header（7 個群組 + 32 個欄位）
      // 使用固定索引避免動態解析錯位問題
      const IDX_NAME = 0; // 標的債券
      const IDX_CODE = 1; // 債券代號
      const IDX_CONVERSION_PRICE = 9; // 轉換價格
      const IDX_UNDERLYING = 10; // 轉換標的代碼

      rows.forEach((tr) => {
        const tds = tr.querySelectorAll("td");
        // 確保資料列有足夠欄位（至少 11 欄）
        if (tds.length >= 11) {
          const code = tds[IDX_CODE].innerText.trim();
          const name = tds[IDX_NAME].innerText.trim();
          const cpStr = tds[IDX_CONVERSION_PRICE].innerText
            .trim()
            .replace(/,/g, "");
          const underlying = tds[IDX_UNDERLYING].innerText.trim();

          const cp = parseFloat(cpStr);

          // 驗證 code 為有效的 CB 代號（5 碼數字）
          if (code && /^\d{5}$/.test(code) && !isNaN(cp)) {
            items.push({
              code: code,
              name: name,
              conversionPrice: cp,
              underlyingCode: underlying,
            });
          }
        }
      });
      return { items };
    });

    if (result.error) {
      console.error("Extraction Error:", result.error);
      if (result.headers) console.log("Headers found:", result.headers);
    } else {
      console.log(`Extracted ${result.items.length} items.`);

      // Structure for frontend
      // Convert to Object Map for O(1) lookup
      const dbItems = {};
      result.items.forEach((item) => {
        dbItems[item.code] = item;
        // Also map underlying if unique? No, stock might have multiple CBs.
        // But frontend "stock search" uses generic logic.
        // Let's just keep list or map.
        // Frontend expects `cbDatabase[code]`.
      });

      // Wait, the frontend code in cb-calculator.html expects:
      // loadDatabase() -> cbDatabase = json.items (forEach push to dict)
      // OR
      // json.items.forEach(...)
      // The script was writing `items: [...]`.
      // Let's keep array format to match frontend expectation (it explicitly iterates items).

      const db = {
        updatedAt: new Date().toISOString(),
        items: result.items,
      };

      fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
      console.log(`Saved to ${DATA_FILE}`);
    }
  } catch (e) {
    console.error("Error:", e);
  } finally {
    await browser.close();
  }
})();
