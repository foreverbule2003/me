---
description: 抓取 CB 歷史資料以供溢價率走勢圖使用
---

本工作流程使用 Puppeteer 模擬瀏覽器行為，從 TPEx (櫃買中心) 與 TWSE (證交所) 抓取可轉債及其標的股票的歷史日成交資訊，並計算每日溢價率。

1. **先決條件檢查**
   確保專案目錄下已安裝 Puppeteer。

   ```bash
   npm list puppeteer
   ```

   若未安裝，請執行 `npm install puppeteer`。

2. **執行抓取工具**

   ```bash
   node tools/fetch-cb-history.js <CB代號> [--sync]
   ```

   **範例**:
   - `node tools/fetch-cb-history.js 24673` (僅抓取歷史至本地)
   - `node tools/fetch-cb-history.js --all --sync` (同步所有標的最新數據至雲端)

3. **等待執行完成**
   - 腳本會自動開啟無頭瀏覽器 (Headless Browser)。
   - 依序抓取：
     - TPEx CB 日成交資訊 (最近 6 個月)
     - TWSE/TPEx 標的股日成交資訊 (最近 6 個月)
   - 過程中會顯示 `[Step 1]`, `[Step 2]` 等進度 log。
   - 若遇到反爬蟲阻擋或網路逾時，腳本會自動重試或略過該月份。

4. **檢查結果**
   執行成功後，會在 `public/data/history/` 目錄下產生對應的 JSON 檔案。
   例如: `public/data/history/24673.json`。

   您可以使用 `cat` 或編輯器檢查檔案內容：

   ```bash
   type public\data\history\24673.json
   ```

5. **前端檢視**
   重新整理 CB 計算機頁面，查詢該代號，溢價率走勢圖應會顯示歷史曲線。
