# 更新日誌 (Changelog)

本專案的所有重大變更都將記錄在此文件中。

格式基於 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)。

## [1.5.2] - 2026-01-29 (Calculator Metadata Hotfix)

### 錯誤修復 (Fixes) 🐛

- **計算機崩潰 (JSON Error)**：修復 `cb-calculator.html` 嘗試載入已移除的 `cb-data.json` 導致的 "Unexpected token" 錯誤。改為 On-Demand 查詢 Firestore `cb_history` 集合。
- **初始化競爭 (Race Condition)**：解決 `handleSearch` 在 `db` 初始化前執行導致的 "Cannot access 'db' before initialization" 與 "System Idle" 卡死問題，統一使用 `window.db` 全域引用。

## [1.5.1] - 2026-01-29 (UI Stability & Hotfix)

### 錯誤修復 (Fixes) 🐛

- **戰情室 UI 崩潰 (SyntaxError)**：將 `cb-fetcher.js` 的偵錯日誌重新導向至 `stderr`，防止其污染 API 的 JSON 輸出流，徹底解決 `Unexpected token 'F'` 報錯。
- **Firebase V10 兼容性**：強化 `logPerfEvent` 與 `measureFetch` 的防禦性邏輯，排除所有殘留的 V8 `db.collection` 鏈式調用風險。
- **雲端同步引擎**：修正 `hot-cb-cloud.js` 中 `updateMasterMetadata` 的 `batch.set` 參數錯誤，解決因同步失敗觸發的「模擬數據覆蓋真實數據」Bug。
- **快取一致性**：實作智慧快取判定機制，當本地 IndexedDB 中存有異常少量的資料（如之前錯誤快取的 4 筆模擬數據）時，會自動穿透快取並強制從雲端拉取 20 筆真實數據。

### 優化 (Improvements) 🚀

- **建構環境清理**：腳本化強制刪除 `dist/` 目錄，確保瀏覽器載入完全編譯後的最新版 Modular SDK 腳本。

## [1.5.0] - 2026-01-29 (Cloud-Native Data Refactor)

### 新增 (Added) 🚀

- **雲端中繼資料中心 (Cloud Metadata)**：徹底移除本地 `cb-data.json`。系統現在會從 Firestore 動態拉取標的中繼資料，並支援 UI 即時修正儲存。
- **DDE 模組化架構**：將 `xq_bridge.py` 拆解為「通訊層 (`lib/xq_dde.py`)」與「業務層 (`lib/cb_service.py`)」，支援批次更新與預覽模式。
- **資料自動校驗**：腳本現在會自動過濾無效標的，並支援透過 CLI 參數驅動。

### 變更 (Changed) ⚙️

- **資料存儲策略**：取消 Git commit 存回 JSON 的舊邏輯，改為純 Firebase 寫入。
- **性能優化**：同步引擎改用 Firestore Batch Write，大幅減少 API 調用負擔。

### 錯誤修復 (Fixes) 🐛

- **金像電 (23683)**：修正轉換價缺失問題，並導入雲端儲存機制。
- **Python 快取清理**：更新 `.gitignore` 並清理機械產生的 `__pycache__` 檔案。

### 錯誤修復 (Fixes) 🐛

- **自動註冊漏洞封堵 (Deep Fix)**：修正 `fetch-cb-history.js` 同步邏輯。現在定時補漏任務在寫入任何子集合（records）數據前會先驗證母文件是否存在，徹底阻斷 Firestore 自動創建「幽靈標的」的特性。
- **分析抽屜崩潰**：修復了 `cb-war-room.html` 中因 `classList` 存取 null 元素導致ের報錯問題，全面導入 `Null Guard` 增強前端穩定性。
- **資料正確性**：修正金像電三 (23683) 轉換價錯誤 (450 -> 154.2)，確保溢價率與折價分析計算精準。

### 優化 (Improvements) 🚀

- **自動註冊漏洞封堵**：修正 `fetch-cb-history.js` 同步邏輯。現在定時補漏任務僅對「已在追蹤清單」的標的進行心跳更新，防止全市場 250+ 檔標的自動擠爆追蹤清單。
- **同步引擎升級**：`xq_bridge.py` 現在會自動從 Master DB (`cb-data.json`) 撈取轉換價進行雲端補正，防止 DDE 資料污染。
- **工作區清理**：移除了 10+ 個開發期間產生的臨時調試腳本與備份檔，保持專案架構整潔。

## [1.4.0] - 2026-01-25 (Widget Pattern & Component Refactor)
