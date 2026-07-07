# 更新日誌 (Changelog)

本專案的所有重大變更都將記錄在此文件中。

格式基於 [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)。

## [2.6.0] - 2026-07-06 (Trip Scaffold v4.0 & /commit Workflow)

### 新增 (Added) 🚀

- **旅遊 Scaffold v4.0 (`tools/new-trip.js`)**: 依 2026-tokyo 最終架構全面改寫。新旅程改為複製 `src/pages/trips/template/` 產生，目錄命名統一為 `{year}-{location}`，並自動產生 PWA 離線小書檔案（`manifest.json` + `sw.js`）、可同步的 `spec.md`，且自動註冊 `vite.config.js` 入口點。
- **ExpenseSection 模板元件**: 將東京行程的雙幣（JPY/TWD）實際記帳總覽（圓餅圖 + 分類明細）通用化並納入模板，匯率與天數改為參數驅動。
- **`/commit` 自訂指令 (`.claude/commands/commit.md`)**: 固化 commit workflow —— guard/test 驗證 → 文件同步檢查（CHANGELOG、docs、TRIP_STYLE_GUIDE）→ 分主題提交。
- **前代指令遷移 (Workflow P1)**: 自 `.agent/workflows/`（Antigravity 時代的 33 個指令）遷移六個高價值指令至 `.claude/commands/`：`/doc-check`、`/deploy`、`/sync`、`/journal`、`/capture`、`/cleanup`，內容依 Claude Code 環境與現況改寫（deploy 說明 push 即自動部署、cleanup 改用 mac 相容指令等）。
- **new-trip 首頁選單自動註冊**: `tools/new-trip.js` 產生新旅程時自動將選單項插入 `src/views/TripsView.jsx`（最新在前），補上 scaffold 最後一哩。

### 變更 (Changed) 🔄

- **TODO 單軌化**: 根目錄 `TODO.md` 為專案唯一 backlog；`tasks/todo.md`（前代 /advisor checkpoint）標記棄用，`tasks/lessons.md` 保留。
- **CB_DATA_FLOW.md 對齊現實**: 補記 GitHub Actions 雲端軌（每交易日 13:40 / 14:15 自動同步）與本地 XQ DDE 軌的 Windows 平台前提，更新架構圖。
- **WORKFLOW_GUIDE.md**: 日常流程與速查表改指向新的 `.claude/commands/` 指令集。

### 修復 (Fixed) 🔧

- **PWA 離線快取指向已改名檔案**: `trips/2026-tokyo` 的 `sw.js`/`manifest.json`（與 new-trip 模板）仍指向歷史名稱 `travel-book.html`，統一修正為現行產生器輸出的 `master_guide.html`（cache 版本遞增至 v3）；TRIP_STYLE_GUIDE 新增「離線旅遊小書」章節記錄三檔協作關係。
- **首頁選單死連結**: 移除 `TripsView.jsx` 中指向已刪除目錄的「2026 北海道 (TBD)」選單項。
- **測試防線紅燈常態化**: 新增 `vitest.config.js` 限定單元測試掃描 `src/**`，不再誤掃 `tests/` 的 Playwright spec（原本 3 個 suite 必紅）；`npm test` 回歸綠燈基準。
- **Guard 誤報修正**: `check-datapath.js` 新增合法模式白名單（`/me/favicon`、`/me/?booted=true` 屬 vite base 下的刻意用法）並修復 `/g` regex lastIndex 殘留；`verify-dom.js` 由過時的靜態 DOM ID 檢查改為 React 入口接線驗證（mount point + module script 存在性）。`npm run guard` exit code 重新有意義。
- **Workflow 體檢**: 新增 `docs/WORKFLOW_AUDIT_2026-07-06.md` 全面盤點七大 workflow；`/commit` 指令合併 `.agent/workflows/commit.md` 原版設計（提交前清理、TODO 歸檔、旅遊 spec 自動同步、提交前確認）。

### 優化 (Improvements) 🚀

- **旅程模板同步 tokyo 架構**: `template/App.jsx` 升級為 8 頁籤（總覽/行程/交通/景點/美食/購物/住宿/花費），含視差 Hero、匯出 PDF 小書按鈕、住宿估算明細與 Firebase 收藏/購物同步；所有標題、Hero 圖、匯率、晚數改由 `data.js` 的 `tripMeta` 驅動，建立新旅程後通常僅需填資料。
- **資料模板 schema 對齊**: `data.template.js` 補齊 `tripMeta`、`stationMapping`、`attractionData`、`accommodationData`、`expenseData` 等匯出，與 `scripts/sync-travel-spec.mjs`、`scripts/generate-travel-pdf.mjs` 完全相容。
- **TRIP_STYLE_GUIDE.md**: 架構章節由過時的「單一 HTML + CDN」描述更新為 Vite + React 資料驅動工作流程。

---

## [2.5.5] - 2026-07-05 (Tokyo Trip Complete & Travel Book Automation)

> 補記：2026-05-12 至 2026-07-05 約 55 個 commit 的彙總（東京行程開發期）。

### 新增 (Added) 🚀

- **2026 東京行程完工**: 8 日行程（東京・橫濱・輕井澤）從 v1.3 規格到全部定稿——8 頁籤架構（總覽/行程/交通/景點/美食/購物/住宿/花費）、獨立景點分頁、Day 4/5 多方案動態切換（輕井澤/高崎/草津溫泉）、住宿最終預訂與跨幣別估算。
- **離線旅遊小書機制**: `scripts/generate-travel-pdf.mjs`（由 data.js 產生高保真離線 HTML/PDF，含目錄錨點）+ PWA（manifest/sw）離線快取 + Header 一鍵匯出 PDF。
- **行程規格自動同步**: `scripts/sync-travel-spec.mjs` 由 data.js 單向產生 spec.md，消除雙向維護。
- **ExpenseSection 實際記帳**: 雙幣（JPY/TWD）記帳統一台幣顯示、依佔比排序的圓餅圖與分類明細。
- **購物清單雲端化**: wishlist + Firebase 已購狀態即時同步、商品詳情 Modal 與實拍圖。

### 優化 (Improvements) 🚀

- **視覺系統**: 森林綠/莫蘭迪主題、玻璃擬態卡片（mask-image Hero）、視差滾動首圖、珊瑚朱分類標籤、全站日期標籤對齊（72px）與標點統一。
- **交通分頁**: 結構化逐段步驟卡（月台/票價/時刻表/官方連結）、N'EX 官方時刻表同步、行程↔交通↔美食跨分頁跳轉定位。
- **共用元件**: 萃取 `ShoppingSection` 至 shared、旅程 template 首次補齊（TRIP_ID/weatherData/vegetarianCard 等）。

### 修復 (Fixed) 🔧

- **TWSE API Rate Limiting**: `fetch-cb-history` 改循序請求 + 100ms 延遲。
- **GameBoyShell 白畫面**: 修復重新整理時 `isPoweredOn` 初始狀態問題。
- **N'EX 回程時刻**: 修正 D8 精確抵達時間與樂桃 MM625 航班資訊。

---

## [2.5.0] - 2026-05-12 (TWII Bias Tool & Mobile Optimization)

### 新增 (Added) 🚀

- **大盤熱度分析工具 (TWII Bias)**: 實作 `tools/twii-bias.html`，提供加權指數 (^TWII) 的 5MA/20MA/60MA 乖離率 (Bias) 分析。
- **Plotly 互動圖表**: 整合 Plotly.js 繪製 K 線圖與乖離率走勢，支援極端門檻標示與均線切換。
- **乖離率熱圖**: 實作歷史極端乖離統計表格，輔以顏色分級標示熱度強度。

### 優化 (Improvements) 🚀

- **行動裝置適應性**:
  - 加入 `viewport-fit=cover` 與 `user-scalable=no` (Plotly) 以優化全螢幕體驗。
  - 實作響應式表格佈局，在手機版自動調整寬度與字體大小。
  - 配置 Plotly `dragmode: 'pan'` 與 `scrollZoom: true` 以支援觸控縮放與平移手勢。
  - 修正 CSS Media Queries，確保圖表容器在各尺寸螢幕下比例正確。

---

## [2.4.0] - 2026-05-09 (Tokyo Trip Bootstrap & Firebase Resilience)

### 新增 (Added) 🚀

- **2026 東京行程 (Bootstrap)**: 建立 `src/pages/trips/2026-tokyo/` 與 `trips/2026-tokyo/` 骨架，完成 Vite+React 架構初始化。
- **旅程導覽更新**: 在 SPA (`TripsView.jsx`) 與 Legacy (`src/pages/trips/main.jsx`) 選單中新增「2026 東京」導覽入口。
- **React 旅程模板 (`src/pages/trips/template/`)**: 建立標準化行程模板，供未來新行程複用。

### 安全性加固 (Security) 🛡️

- **Firebase 韌性初始化**: 重構 `src/lib/firebase.js`，加入 `isFirebaseConfigValid` 防護層。環境變數缺失時改為 Graceful Degradation（輸出警告）而非崩潰。
- **環境變數設定**: 新增 `.env` 與 `serviceAccountKey.json`（已由 `.gitignore` 排除）。

### 清理 (Cleanup) 🧹

- **移除北海道 Legacy 頁面**: 刪除 `trips/2026-hokkaido/` 目錄（`index.html`, `spec.md`, `hero.png`）。
- **Vite 設定更新**: 將 `trips-hokkaido` MPA 入口替換為 `trips-tokyo`。

---

## [2.3.1] - 2026-04-29 (GCP Firestore Write Optimization)

### 優化 (Improvements) 🚀

- **Delta Check (`xq_bridge.py`)**: 實作差異比對機制。同步腳本現在只會在 DDE 抓取到的數值與 Firestore 現有數值**不同**時才執行寫入，大幅降低盤後與股價盤整期間的寫入費用。
- **防重複快照 (`hot-cb-cloud.js`)**: `saveSnapshotToCloud` 在寫入前會先檢查今日快照是否已存在。若已存在，直接返回並輸出提示訊息，避免同日多次執行時重複扣費。
- **停用閒置 GCP 服務**: 停用 `Dataform`、`Dataplex`、`Firebase Test Lab` 三個未使用的服務，消除潛在的隱藏計費來源。

---

## [2.3.0] - 2026-04-28 (GCP Billing Audit & Cost Optimization)

### 安全性加固 (Security) 🛡️

- **API Key Hardening**: 實施 API 金鑰網域限制 (HTTP Referrer)，防止 `My Landing Page Web` 金鑰被他人盜用。
- **API Cleanup**: 停用專案中未使用的高額 Google Maps Platform 服務（如 Solar, Roads, Routes 等），徹底消除潛在扣款。

### 優化 (Improvements) 🚀

- **Firestore Delta Check**: 在 `xq_bridge.py` 中實作「差異比對」機制。
  - 只有在 DDE 數據與資料庫內容不一致時才執行寫入。
  - **節費效果**：大幅減少盤後與股價盤整期間的無效寫入費用。
- **Billing Audit**: 建立 [gcp_billing_audit_20260428.md](file:///c:/Users/forev/myDev/me/docs/gcp_billing_audit_20260428.md) 專項審核報告，確認費用來源為 `Daily Hot CB Sync` (13:40) 觸發的寫入高峰。

### 變更 (Changed) ⚙️

- **Maintenance Pipeline**: 更新 `TODO.md`，將 GCP 費用監控提升至 P0 最高優先權。

---

## [2.2.0] - 2026-02-06 (Calculator React Transformation)

### 重構 (Refactor) 🛠️

- **React Migration (v3.0)**: `cb-calculator.html` 全面遷移至 React/Vite 架構。
  - 拆分 `SearchInput`, `InputPanel`, `ResultsPanel` 等獨立元件。
  - 復用 `useCalculator` hook 與 `cb-logic.mjs` 核心演算法。
  - 移除 1700+ 行舊版 HTML/JS 代碼 (保留 legacy 備份)。

### 錯誤修復 (Fixes) 🐛

- **UI Overflow**: 修復搜尋下拉選單 (Dropdown) 因父容器 `overflow` 屬性導致的截斷問題，並修正 `absolute` 定位偏移。
- **Font Consistency**: 修正輸入框與標的卡片字體過大問題，統一降級為 `text-sm` 以符合設計規範。

### 優化 (Improvements) 🚀

- **Visual Hierarchy**: 優化計算結果面板視讀性，將 Premium Rate 提升為 `4xl` 重點顯示，並統一輔助標籤樣式。

## [2.1.3] - 2026-02-06 (Typography Unification & Style Guide)

### 新增 (Added) 🚀

- **Style Guide**: 建立 `STYLE_GUIDE.md` 設計規範文件，定義 CB 工具統一的字體、顏色、間距標準。

### 變更 (Changed) ⚙️

- **Typography Unification**: 統一 CB 戰情室與 CB 計算機的字體規範：
  - 主要資訊：`text-sm font-semibold`
  - 輔助資訊：`text-xs font-medium`
- **Visual Noise Reduction**: 批次移除 `font-black`、`font-bold`、`text-[9/10/11px]` 等非標準樣式。
- **MarketPulse**: 統一現價與漲跌欄字體為相同大小 (`text-sm`)。
- **Watchlist**: 精簡卡片顯示，統一分類標籤樣式。

## [2.1.2] - 2026-02-05 (Legacy Revert & DDE Sort)

### 變更 (Changed) ⚙️

- **Sync Strategy**: 由於 DDE 數據部分欄位缺漏，將自動化腳本 (`Daily_Hot_CB_Sync.bat`) 暫時切回 Legacy Crawler (`fetch-hot-cb.js`)，改由 PChome 獲取完整漲跌幅數據。
- **DDE Improvement**: 雖已切換回舊版，但仍優化了 `fetch-hot-cb-dde.py` 腳本，加入成交量 (Volume) 遞減排序邏輯，以備未來切換回 DDE 時使用。

### 錯誤修復 (Fixes) 🐛

- **SyntaxError**: 修復 `WarRoom/utils.js` 中的 `import` 語句位置錯誤，解決導致頁面全白的嚴重 Bug。

### 新增 (Added) 🚀

- **Automation**: 新增 `Daily_Hot_CB_Sync.bat` 批次檔，方便使用者設定 Windows Task Scheduler 進行每日自動更新。

### 新增 (Added) 🚀

- **Hybrid DDE Sync**: 引入 `tools/fetch-hot-cb-dde.py`，透過本地 XQ 客戶端直接獲取即時報價，彻底解決 PChome 爬蟲被封鎖的問題。
- **DDE Fallback**: 針對無量跌停標的 (如 35831)，實作 `Price` -> `PreClose` 自動回補機制，確保戰情室數據完整。
- **Diagnostic Tool**: 新增 `tools/test_dde_connection.py` 用於診斷 DDE 連線與欄位對應。
- **Local History Backfill**: 新增 `npm run fetch:history:full` 指令，支援使用本地算力與 IP 進行全量歷史 K 線補齊。

### 變更 (Changed) ⚙️

- **Quota Protection**: 修改 `fetch-cb-history.js`，增加對 Firebase `RESOURCE_EXHAUSTED` 錯誤的攔截與降級處理 (Graceful Degradation)，防止因寫入額度耗盡導致腳本崩潰。
- **Docs**: 更新 `README.md`，納入 DDE 操作指南與架構說明。

### 錯誤修復 (Fixes) 🐛

- **Sync Stability**: 修復因 Anti-Bot 導致的 Hot CB 資料間歇性空白問題。

### 新增 (Added) 🚀

- **React Migration**: 全面將 CB 戰情室遷移至 React 元件架構，提升代碼可維護性。
- **Metadata Recovery**: 於 `AnalysisDrawer` 實作靜態 metadata 池救援機制，修復資料缺失顯示 `--%` 的問題。
- **Unified Testing**: 整合 React 專屬與冒煙測試至 `tests/war-room.spec.js`。

### 變更 (Changed) ⚙️

- **UI Restoration**: 恢復 DateNavigator 經典的大尺寸、置中樣式與智慧日期切換邏輯。
- **Tab Styling**: 優化導航標籤顏色 (Indigo) 與底線動畫，改善視覺深度。
- **Build Infrastructure**: 更新 Vite 配置，支援混合式 (MPA + SPA) 構建路徑。

### 錯誤修復 (Fixes) 🐛

- **TypeError**: 修復 `allMetadata.find` 不是函式的解析報錯（`cb-data.json` 格式解構修正）。
- **Compatibility**: 修正 `useMarketPulse` 中對 Firestore `Timestamp` 與遺留資料格式的相容性解析。
  - [ ] 手動驗證：本地 `npm run dev` 預覽。

## [2.0.0-rc3] - 2026-02-03 (War Room Core Stability)

### 錯誤修復 (Fixes) 🐛

- **Blank Premium Rate**: 修正戰情室轉換議價率空白問題。將 `cb-war-room` 的資料讀取邏輯重構為 On-Demand 模式，直接從 `cb_history` 讀取含 `conversionPrice` 的完整中繼資料，解決 `hot_cb_snapshots` 欄位缺失問題。
- **Invalid Hook Call**: 透過 `vite.config.js` 的 `resolve.alias` 強制 React 單一本體，解決因依賴衝突導致的白畫面與 Hooks 報錯。
- **Custom Element**: 修正防護腳本中的元素名稱檢測 (`ace` -> `mce`)，有效抑制第三方元件重複註冊錯誤。
- **Data Decoupling**: 徹底移除本地 `cb-data.json` 並恢復 `.gitignore` 設定，完成雲端原生架構的最後一哩路。
- **Date Sync**: 修正 `useMarketPulse` 下拉更新邏輯。當當日資料尚未產生而自動回退至歷史快照時，UI 日期標題現在會同步更正為實際資料日期，避免產生「未來資料」的誤解。
- **Watchlist Grouping**: 恢復追蹤清單的分組顯示功能，並新增 **Filter Chips** (分類篩選) 與 **Category Dropdown** (新增分類選單)，大幅提升清單管理效率。
- **Cloud Sync Fix**: 修正 `fetch-cb-history.js` 中的 `docSnap.exists` 類型錯誤 (Prop vs Func)，恢復 GitHub Actions 自動同步功能。

## [2.0.0-rc2] - 2026-02-03 (React Migration & UI Restoration)

### 新增 (Added) 🚀

- **Console Guard**: 引入 `tests/console-guard.spec.js` 守衛機制，自動攔截瀏覽器 Console 錯誤與 Page Errors，確保靜默崩潰 (Silent Crash) 能被即時發現。
- **Centralized Logic**: 建立 `src/lib/cb-logic.mjs` 與 `src/lib/cb-logic.test.mjs`，達成計算公式的 100% 複用。

### 變更 (Changed) ⚙️

- **Refactoring Phase 1 & 2**: 重構 `cb-war-room.html` 與 `cb-calculator.html` 改由共用模組驅動。
- **CSS Architecture**: 提取 `public/css/cb-theme.css` 作為工具箱主題規範。

### 錯誤修復 (Fixes) 🐛

- **ReferenceError**: 修復 `cb-calculator.html` 中 `measureFetch` 參考無效導致的靜默崩潰。
- **Firestore Index**: 透過 Console Guard 成功識別並修復 `hot_cb_snapshots` 集合跨組查詢缺索引的問題。

### 2026-02-02 (13:50)

- [x] **Logic Core Refactoring**: 成功將 CB 計算邏輯抽離至 `src/lib/cb-logic.mjs`，消除 `cb-war-room` 與 `cb-calculator` 的代碼重複。
- [x] **Console Guard**: 實作 `tests/console-guard.spec.js` 主動偵測執行期錯誤，成功修復 `measureFetch` 未定義問題並發現 Firestore 索引缺失漏洞。
- [x] **Library Consolidation**: 集中管理 Firebase Client 與共用樣式 (`cb-theme.css`)。

### 2026-02-02 (20:30)

## [1.9.7] - 2026-02-02 (Scope Correction & Watchlist Polish)

### 新增 (Added) 🚀

- **Data Status Indicator**: 戰情室新增「資料狀態儀表」，明確區分「今日資料 (Today)」與「歷史快照 (Snapshot)」，解決盤中資訊不對稱問題。

### 變更 (Changed) ⚙️

- **Scope Correction (用語修正)**：全面移除戰情室中暗示「即時串流報價 (True Realtime)」的用語與圖示，回歸「每日快照」的準確定義。
- **Watchlist Logic**: 強化追蹤清單過濾器，僅顯示具備明確 `category` 的標的，自動隱藏系統同步產生的背景資料。

## [1.9.6] - 2026-02-02 (Firebase Key Standardization)

### 錯誤修復 (Fixes) 🐛

- **Firebase Utils**: 修復 `serviceAccountKey.json` 檔名不一致的問題，統一全專案工具鍊 (Python & JS) 的憑證讀取邏輯。
- **Data Sync**: 修復 `/sync-cb` 工作流程因憑證錯誤導致的同步失敗問題。

## [1.9.5] - 2026-01-30 (Mobile-First Experience)

### 新增 (Added) 🚀

- **Mobile-First Core**: 升級 `viewport` 設定 (`viewport-fit=cover`) 並啟用 PWA `standalone` 模式，提供全螢幕沈浸體驗。
- **手勢控制**: 新增 `useSwipe` Hook 並實作全站「右滑返回」手勢。
- **觸覺優化**: 為 GameBoy 按鈕加入 `active` 縮放動畫與擴大點擊熱區，移除 iOS 預設灰色高亮。

### 重構 (Refactor) 🛠️

- **Firebase Utils**: 提取 `tools/firebase-utils.js` 統一管理金鑰讀取邏輯，消除多個工具腳本中的重複代碼。

### 優化 (Improvements) 🚀

- **Performance (Quick Win)**: 實作字體非阻塞載入 (Preload + Swap)，LCP 從 11.5s 降至 2.3s (Lighthouse 90分)。

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
