# 更新日誌 (Changelog)

本專案的所有重大變更都將記錄在此文件中。

格式基於 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)。

## [1.2.0] - 2026-01-24 (Hot CB Enhancements & DX)

### 新增 (Added)

- **Hot CB 歷史瀏覽功能**：支援透過 `?date=YYYY-MM-DD` 參數或 UI 箭頭導航切換歷史快照。
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
