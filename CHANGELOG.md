# 更新日誌 (Changelog)

本專案的所有重大變更都將記錄在此文件中。

格式基於 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)。

## [1.3.1] - 2026-01-24 (Security & Data Governance)

### 安全 (Security)

- **權限控管 (Auth Guard)**：在 CB 戰情室實作 Firebase Auth 狀態監控，對「我的追蹤」分頁增加登入遮罩，防止非授權存取。
- **後端鎖定**：收緊 Firestore 規則，將 `cb_history` 寫入權限限制為僅限管理員。

### 資料規範 (Governance)

- **資料來源文件化**：建立 `docs/DATASOURCES.md` 詳列爬蟲來源 (TWSE MIS, PChome, XQ CSV) 與資料範圍。
- **代碼註解強化**：為核心爬蟲腳本導入標準化 JSDoc 規範。

### 新增功能 (Features)

- **自動化防禦 (Refactor Guard)** 🛡️：實作靜態掃描與 DOM 完整性檢查 (`npm run guard`)，防止重構引發的回歸錯誤。

### 錯誤修復 (Bug Fixes)

- **CB 計算機 (Calculator)**：修正 404 資料讀取錯誤、走勢圖不可見問題、以及變數 `canvas` 遺失導致的 crash。
- **戰情室 (War Room)**：修正溢價率計算公式 (移除錯誤的係數)，解決顯示 -60% 的異常；修復分析抽屜資料載入異常。

### 重大變更 (Breaking Changes)

- **終極整合 (The Merger)**：廢除獨立的 `cb-calculator.html` 與 `hot-cb.html`，所有功能整合至 [CB 戰情室 (cb-war-room.html)](file:///c:/Users/forev/myDev/me/tools/cb-war-room.html)。
- **工具鏈現代化**：重構 `tools/` 目錄，將核心爬蟲邏輯抽離至 `cb-history-fetcher.js`，並合併 redundant CLI 工具。

### 新增 (Added)

- **數據自動補全 (Live Enrichment)**：移植 MIS Proxy 邏輯，當列表缺失股價時自動於背景補全，確保溢價率計算永不中斷。
- **交錯式進場動畫 (Staggered Intro)**：為分析面板注入 Premium 質感的有序浮現動畫。
- **快取架構 (SSOT)**：實作 `globalCbDatabase` 確保所有數據請求均來自單一來源。
- **Vibe Coding 指令**：建立 `/capture` 工作流，支援瞬間捕捉靈感並自動歸檔至 [TODO.md](file:///c:/Users/forev/myDev/me/TODO.md)。

### 安全 (Security & Quality)

- **404 斷鏈修復**：清理主選單與專案連結，確保所有入口指向有效檔案。
- **爬蟲穩定性**：統一 TPEx/TWSE 抓取核心，降低維護成本。

## [1.2.1] - 2026-01-24 (Hot CB UI Refactor & Reliability)

### 新增 (Added)

- **雙頁籤導航系統**：在 Hot CB 頁面實作 `市場熱門 (Pulse)` 與 `我的追蹤 (Watchlist)` 分離介面。
- **行動端 RWD 增強**：為手機版設計「高低價內容摺疊」佈局，確保所有解析度下資訊對等。
- **智慧雲端備援**：重構數據獲取邏輯，當 API 離線時自動、無感地切換至 Firestore 雲端快照。
- **Vibe Coding 驗證系統**：實作 `/capture` 指令與靈感自動歸檔流程，驗證開發效率。

### 安全 (Security & Quality)

- **自動化測試**：建立 `/test-cb-tool` 冒煙測試與 `/check-change` ID 損毀偵測。
- **重構規範**：制定 `safeguard_plan.md` 以引導高品質的代碼遷移。

### 修正 (Fixed)

- **數據解析韌性**：支援金融數據中的「全形符號」（＋/－/▲/▼），修正計算昨收參考價時的 Crash 問題。
- **JavaScript 穩定性**：清理了重構後的冗餘代碼與 Null 引用，解決「連線故障」誤報。

### 變更 (Changed)

- **UI 精簡 (Private Labeling)**：隱藏了所有介面上的第三方資料來源（PChome）標籤，提升產品專業感。

## [1.2.0] - 2026-01-24 (Hot CB Enhancements & DX)

### 新增 (Added)

- **Hot CB 歷史瀏覽功能**：支援透過 `?date=YYYY-MM-DD` 參數或 UI 箭頭導航切換歷史快照。
- **Serverless 爬蟲基建**：實作 GitHub Actions 自動化抓取流程與 Firestore 雲端同步。
- **架構優化**：中央化 Firebase 配置管理，消除硬編碼 Project ID。
- **網站圖示 (Favicon)**：新增 `favicon.ico` 並解決 404 報錯問題。
- **Workflow 指令別名**：新增 `/clean` 與 `/tidy` 別名（後續根據顧問建議已進行精簡）。

### 修正 (Fixed)

- **假日顯示邏輯**：修正 Hot CB 列表在週末誤顯示 "LIVE DATA" 的問題，改為正確顯示數據具體時間與 `LAST CLOSE` 狀態。
- **爬蟲時間擷取**：更新 `cb-fetcher.js` 以擷取 PChome 原始表格中的具體成交時間。

### 變更 (Changed)

- **Workflow 治理**：將「Workflow 清理」邏輯整合進 `/cleanup`，避免指令過度膨脹。
- **文件規範更新**：將 `CHANGELOG.md` 正式納入 `commit` 與 `doc-check` 工作流的必填清單。

## [1.1.0] - 2026-01-23 (CB Calculator Refactor)

### 修正 (Fixed)

- **Loading UI 優化**：
  - 重構 `handleSearch` 流程，確保點擊搜尋後 Loader 立即出現 (0延遲)。
  - 將 Loading 遮罩範圍縮小至圖表區域，保留標題與按鈕的可見性。
  - 搜尋期間禁用 1M/3M/All 切換按鈕，防止重複點擊與邏輯錯誤。
- **頁面跳轉 (Auto-Reset) 問題**：
  - 修正搜尋新標的 (如 `15142`) 時頁面無故重整的 Bug。
  - 原因為 Vite HMR 誤判，已排除 `public/data/` 的檔案監控。
  - 修正 `runMigration` 中的無限遞迴呼叫，確保搜尋流程單一且穩定。
- **資料顯示**：
  - 修新標的 (New Ticker) 即使有資料卻不顯示時間戳記的問題。
  - 當無歷史資料時，圖表改為顯示今日單點數據，避免留白。

## [1.0.1] - 2026-01-10 (Ise-Shima Refactor & PWA)

### 新增 (Added)

- **PWA 核心建設**：實作 Manifest, Service Worker 並支援離線訪問。
- **內容擴充**：新增伊勢志摩行程的天氣預報表格、臨空城美食清單與素食餐廳導覽。

### 修正 (Fixed)

- **UX 優化**：解決伊勢志摩頁面導航切換閃爍問題。

### 變更 (Changed)

- **組件重構**：將伊勢志摩行程拆分為 `DayCard`, `StickyPhaseHeader` 等模組化組件。
- **架構清理**：提取 Flight, Budget, Checklist 為共用元件，移除殘留的 Firestore 依賴。

## [1.0.0] - 2025-12-27

### 新增

- **伊勢志摩旅程 (2026)**：完全遷移至 Vite + React。
- **宿霧旅程 (2025)**：初始 Legacy 結構。
- **GameBoy 外殼**：營造 "TimBoy" 模擬器感覺的核心佈局元件。
- **工具應用 (Tools App)**：財務儀表板與股票分析工具。
- **日記應用 (Journal App)**：Firebase 支援的開發者日記。
