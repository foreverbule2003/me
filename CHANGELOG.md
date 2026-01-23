# 更新日誌 (Changelog)

本專案的所有重大變更都將記錄在此文件中。

格式基於 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)。

## [Unreleased]

### 新增

- `CONTRIBUTING.md` 貢獻指南。
- 自動化測試工作流程 (`npm test`)。
- Lighthouse 稽核工作流程。
- 專家角色 (`web-pm`, `tech-lead`, `designer`) 於 `.agent/prompts`。

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
