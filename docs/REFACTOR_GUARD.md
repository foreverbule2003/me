# 🔰 Refactor Guard: Defensive Development Protocol

> **核心理念**：重構是為了讓程式碼更乾淨，但不應以犧牲穩定性為代價。我們實作「防禦性開發」機制，確保每次變更皆包含最低限度的自我檢測。

---

## 1. 🛑 三道防線 (The Three Lines of Defense)

所有涉及 UI 結構、路徑變更或邏輯重構的任務，必須依序通過以下三道檢查：

### 第一道：靜態掃描 (Static Guard)
*   **工具**：ESLint, Prettier, `npm run guard` (Custom)
*   **目標**：捕捉語法錯誤、未定義變數 (ReferenceError)、硬編碼路徑 (Hardcoded Paths)。
*   **執行時機**：每次 `write_to_file` 或 `replace_file_content` 之後。

### 第二道：邏輯驗證 (Logic Guard)
*   **工具**：Unit Tests (Jest/Vitest), `tools/guard/verify-dom.js`
*   **目標**：確保關鍵 DOM 元素存在 (e.g., `#chartContainer`)、資料路徑可解析。
*   **執行時機**：功能實作完成前。

### 第三道：視覺確認 (Visual Guard)
*   **工具**：Manual Smoke Test (Browser), `walkthrough.md`
*   **目標**：確認 UI 無破版、動畫正常、用戶體驗 (UX) 未退化。
*   **執行時機**：提交給用戶審閱前。

---

## 2. 🚧 高風險區域 (Critical Zones)

以下檔案或模組被標記為 **CRITICAL**，任何變更皆需特別謹慎：

| 檔案/路徑                                     | 風險等級 | 關鍵元素                                             |
| :-------------------------------------------- | :------: | :--------------------------------------------------- |
| `tools/archive/cb-calculator-standalone.html` |  🔴 HIGH  | DOM Visibility, Chart.js Initialization, Auto-Search |
| `tools/cb-war-room.html`                      |  🔴 HIGH  | Analysis Drawer, Data Enrichment, Path Resolution    |
| `tools/fetch-*.js`                            |  🟠 MED   | API Endpoints, JSON Structure                        |
| `public/data/**`                              |  🟠 MED   | File Paths, Timestamp Caching                        |

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

## 4. 🛠️ Guard Scripts (即將實作)

*   `check-datapath.js`: 掃描 HTML/JS 檔案中是否包含易碎的絕對路徑。
*   `verify-dom.js`: 模擬加載並檢查關鍵 ID 是否存在於 DOM Tree 中。
