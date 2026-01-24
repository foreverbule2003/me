# 更新日誌 (Changelog)

本專案的所有重大變更都將記錄在此文件中。

格式基於 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)。

## [1.2.1] - 2026-01-24 (Hot CB UI Refactor & Reliability)

### 新增 (Added)

- **雙頁籤導航系統**：在 Hot CB 頁面實作 `市場熱門 (Pulse)` 與 `我的追蹤 (Watchlist)` 分離介面。
- **行動端 RWD 增強**：為手機版設計「高低價內容摺疊」佈局，確保所有解析度下資訊對等。
- **智慧雲端備援**：重構數據獲取邏輯，當 API 離線時自動、無感地切換至 Firestore 雲端快照。

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

## [1.0.0] - 2025-12-27

### 新增

- **伊勢志摩旅程 (2026)**：完全遷移至 Vite + React。
- **宿霧旅程 (2025)**：初始 Legacy 結構。
- **GameBoy 外殼**：營造 "TimBoy" 模擬器感覺的核心佈局元件。
- **工具應用 (Tools App)**：財務儀表板與股票分析工具。
- **日記應用 (Journal App)**：Firebase 支援的開發者日記。
