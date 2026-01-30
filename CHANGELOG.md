# 更新日誌 (Changelog)

本專案的所有重大變更都將記錄在此文件中。

格式基於 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)。

## [1.9.0] - 2026-01-30

### 新增 (Added) 🚀

- **自動化測試基礎建設**：導入 Vitest (單元測試) 與 Playwright (E2E 測試) 框架。
- **邏輯模組化架構**：建立 `src/lib/cb_logic.mjs` 作為統一計算權威，實現邏輯與 UI 徹底解耦。
- **測試覆蓋**：完成 9 筆核心算力測試與 3 筆 UI 冒煙測試，確保財務工具的長期穩定性。

## [1.8.0] - 2026-01-30 (Data-Code Decoupling & Cloud Authority)

### 新增 (Added) 🚀

- **數據與代碼解耦 (ADR-007)**：將頻繁變動的 `cb-data.json` 移出 Git 版本控制，解決倉庫冗餘問題。
- **Firestore 權威驅動**：重構 `CB 計算機` 轉向直接由雲端 Firestore 同步全市場標的中繼資料。
- **前端 LocalStorage 緩存**：實作 1 小時效期的數據緩存機制，平衡即時性與加載效能。

### 變更 (Changed) ⚙️

- **架構升級**：更新 `CB_DATA_FLOW.md` 與 `ARCHITECTURE.md` (新增 ADR-007)，全面切換至數據解耦新架構。
- **文檔整合**：移除臨時性的顧問策略文件，將核心決策歸檔至正統 ADR 體系。

### 優化 (Improvements) 🚀

- **效能監控實作**：全站導入 `logPerfEvent` 與 `measureFirestore` 監控雲端執行耗時，提升開發者診斷效率。

## [1.7.0] - 2026-01-30 (CB Metadata Automation Pipeline)

### 新增 (Added) 🚀

- **一鍵自動化同步 (Master Sync)**：建立 `CB_Sync_Master.bat` 與 `/sync-cb` 工作流，實現 DDE 同步至 JSON 導出的全自動流水線。
- **Excel 批次匯入工具**：開發 `import_cb_xlsx.py`，支援直接從 Excel 同步高精度轉換價至 Firestore。
- **ADR-007 (CB Maintenance Pipeline)**：確立「Excel -> Firestore -> JSON」的單一真相來源架構。

### 變更 (Changed) ⚙️

- **DDE 橋接器強化**：`xq_bridge.py` 正式支援名稱補正（移除問號、補序號）、標代號智慧推算，以及 CVP（已轉換比例）同步。
- **數據品質保護**：實作 `Precision Protection` 邏輯，防止 DDE 整數數值覆蓋資料庫中的精確轉換價。

### 優化 (Improvements) 🚀

- **全市場清理**：完成 358 筆標的名稱自動清洗與補正，提升戰情室數據整潔度度。

## [1.6.0] - 2026-01-29 (Sitewide Typography & Layout Unification)

### 新增 (Added) 🚀

- **排版規範小紅書 (Typography Plan)**：建立全站 H1-H3、Body、Label 的 Tailwind 字體標準，解決頁面切換時的 Header 跳動問題。
- **全方位呼吸感 (Sitewide Spacing)**：所有 View 元件導入 `px-6 py-4` 緩衝區，根本解決文字貼邊導致的視覺壓迫感。
- **Workflow**: 在 check-change 中加入 Mock UI 殘留檢查規則。

### 變更 (Changed) ⚙️

- **UI**: 移除內部視圖 (About, Trips, Tools, Journal) 的頂部 Header，釋放垂直空間。
- **UX**: 實作「簡約置底」導航佈局，移除導航區冗餘粗線邊框，視覺更輕量化。
- **Font**: 移除所有選單項的 `font-bold` 權重，修復繁體中文字體渲染回退 (Fallback) 問題。
- **選單邊框還原 (Border Restoration)**：在保留 `px-6 py-4` 緩衝區的基礎上，還原選單項目的顯性邊框。
- **UI 結構與排版規範化**：同步全站 Header、標題與選單字體級別，達成 100% 視覺語言一致性。

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

### 修正 (Fixed) 🐛

- **GitHub Action 修復**：修正 `Daily CB History Sync` 流程因 `cb-data.json` 移除導致的腳本崩潰問題，改採 Firestore 回退機制。
- **金鑰路徑標準化**：統一所有工具 (`fetch-cb-history`, `migrate`, `backfill`) 的 Firebase 金鑰檢查邏輯。現在同時支援 `service-account.json` (專案預設) 與 `serviceAccountKey.json` (舊慣例)。

## [1.4.0] - 2026-01-25 (Widget Pattern & Component Refactor)
