# 🔰 Refactor Guard: Defensive Development Protocol

> **核心理念**：重構是為了讓程式碼更乾淨，但不應以犧牲穩定性為代價。我們實作「防禦性開發」機制，確保每次變更皆包含最低限度的自我檢測。

---

## 1. 🛑 三道防線 (The Three Lines of Defense)

所有涉及 UI 結構、路徑變更或邏輯重構的任務，必須依序通過以下三道檢查：

### 第一道：靜態掃描 (Static Guard)

- **工具**：ESLint, Prettier, `npm run guard` (Custom)
- **目標**：捕捉語法錯誤、未定義變數 (ReferenceError)、硬編碼路徑 (Hardcoded Paths)。
- **執行時機**：每次 `write_to_file` 或 `replace_file_content` 之後。

### 第二道：邏輯驗證 (Logic Guard)

- **工具**：Unit Tests (Jest/Vitest), `tools/guard/verify-dom.js`
- **目標**：確保關鍵 DOM 元素存在 (e.g., `#chartContainer`)、資料路徑可解析。
- **執行時機**：功能實作完成前。

### 第三道：視覺確認 (Visual Guard)

- **工具**：Manual Smoke Test (Browser), `walkthrough.md`
- **目標**：確認 UI 無破版、動畫正常、用戶體驗 (UX) 未退化。
- **執行時機**：提交給用戶審閱前。

---

## 2. 🚧 高風險區域 (Critical Zones)

以下檔案或模組被標記為 **CRITICAL**，任何變更皆需特別謹慎：

| 檔案/路徑                                     | 風險等級 | 關鍵元素                                             |
| :-------------------------------------------- | :------: | :--------------------------------------------------- |
| `src/pages/tools/cb-war-room/`                | 🔴 HIGH  | Analysis Drawer, Data Enrichment, Path Resolution    |
| `src/pages/tools/cb-calculator/`              | 🔴 HIGH  | Firestore Fetch, LocalStorage Cache, Chart Rendering |
| `tools/cb-war-room.html` / `cb-calculator.html` | 🟠 MED | React mount shell 與 module script 接線 (guard 驗證) |
| `tools/fetch-*.js`                            |  🟠 MED  | API Endpoints, JSON Structure                        |
| `public/data/**`                              |  🟠 MED  | File Paths, Timestamp Caching                        |

---

## 3. 📜 標準作業程序 (SOP)

### A. 路徑變更 (Path Migration)

1.  **Search**: 全域搜尋舊路徑 (e.g., `/data/`)。
2.  **Replace**: 使用動態路徑 helper (e.g., `getDataPath()`) 取代絕對路徑。
3.  **Verify**: 執行 `npm run guard` 檢查是否殘留硬編碼。

### B. UI 重構 (UI Refactor)

1.  **Snapshot**: 重構前確認 DOM 結構 (ID/Class)。
2.  **Refactor**: 執行修改。
3.  **Restore**: 檢查是否遺失關鍵變數 (e.g., `canvas`, `ctx`) 或隱藏類別 (`hidden`) 被誤鎖死。

---

## 4. 🛠️ Guard Scripts

`npm run guard` 依序執行以下三支，任一紅燈即中止：

- `check-datapath.js`: 掃描 HTML/JS 檔案中是否包含易碎的絕對路徑。
- `verify-dom.js`: 模擬加載並檢查關鍵 ID 是否存在於 DOM Tree 中。
- `check-trip-schema.mjs`: 比對各旅程 `data.js` 用到的欄位與 `data.template.js` 的欄位契約。某欄位在 **2 個以上旅程**出現、模板卻沒有時紅燈——這是「`data.js` 先長欄位、模板事後才追」造成產生腳本印出 `undefined` 的上游攔截點（已發生兩次，見 CHANGELOG 2.7.0 的 `origin`/`destination` 與 2.7.5 的 `baggage`）。

### `check-trip-schema.mjs` 的判準與侷限

| 項目 | 說明 |
| --- | --- |
| 監看範圍 | 只比對兩支產生腳本會讀的 9 個 export（`flightData`、`itineraryData`、`recommendedRoutes`、`foodData` 等）。其餘 export 只餵給 React 元件，缺欄位在畫面上當場就看得出來 |
| 門檻 | 出現在 **≥ 2 個旅程** 才算契約缺漏；只有 1 個旅程用視為該旅程特有欄位，`VERBOSE=1` 時才列出 |
| 註解也算數 | 模板常以註解示範選填欄位（例 `// transport: { line: ... }`），`import` 看不到，故另外掃模板原始碼，該 export 區塊內出現過 `鍵名:` 即視為已列出 |
| 抓不到什麼 | 只分辨「鍵名在哪個 export 區塊出現過」，不分辨巢狀層級。抓得到「模板從未提過的新欄位」，抓不到「鍵名有、但掛在錯的層」 |
| 例外 | 確認某欄位只屬於特定旅程時，加進腳本內的 `ALLOWED_MISSING` 並註明原因 |
