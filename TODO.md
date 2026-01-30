# 待辦事項 (TODO)

> 最後更新：2026-01-30 (Meta-Automation-V1.8-Final)

## 🔴 P0: 立即執行 (Pending)

- [ ] (暫無 P0 項目)

---

## 🟡 P1: 下階段技術優化 (Future Tech)

> 目標：持續優化雲端架構與開發者體驗。

- [ ] (暫無 P1 項目)

---

## 🟢 P2: 功能擴充與新行程 (Features & Trips)

> 目標：持續產出新內容與增強 AI 體驗。

- [ ] **數據品質哨兵**: 實作自動化偵測標的「除權息」導致的轉換價跳變警報。 <!-- captured: 2026-01-30 -->

---

## ⚪ P3: 舊版維護與歷史保存 (Legacy & History)

> 註：保留舊版頁面作為 Vibe Coding 進化的歷史見證，僅在必要時進行維護，不強制遷移。

- [ ] 完善 AI 旅遊助手功能
- [ ] 完成 2025-osaka 行程規劃
- [ ] 完成 2026-hokkaido 行程規劃
- [ ] `trips/2026-hokkaido/` (Legacy HTML)
- [ ] `trips/2025-osaka/` (Legacy HTML)
- [ ] `trips/2025-cebu/` (Legacy HTML)

---

## 🏁 已完成歸檔 (Archived)

### 2026-01-30 (16:40)

- [x] **Performance Quick Win**: 實作 `DotGothic16` 字體優化 (Preload + Swap)，Lighthouse Performance 評分提升至 90 分 (LCP 2.3s)。

### 2026-01-30 (16:30)

- [x] **Mobile-First Upgrade (v1.9.5)**: 完成 Viewport 全螢幕優化、手勢導航 (Swipe-Back) 與觸控回饋系統。
- [x] **Firebase Utils Refactor**: 建立 `tools/firebase-utils.js` 並重構 4 個相關腳本，消除重複初始化代碼。

### 2026-01-30 (14:30)

- [x] **Data-Code Decoupling (ADR-007)**: 從 Git 移除頻繁變動的 `cb-data.json` 並重構前端改向 Firestore 讀取。
- [x] **Performance Optimization**: 實作前端 `LocalStorage` 緩存機制（效期 1 小時），平衡雲端同步與加載速度。
- [x] **Metrics Tracking**: 實作雲端執行耗時追蹤 (`measureFirestore` & `logPerfEvent`)。
- [x] **Documentation Sync**: 歸檔顧問策略文件，完成 `ARCHITECTURE.md` (ADR-007) 與 `CB_DATA_FLOW.md` 重大更新。

### 2026-01-30 (12:45)

- [x] **Meta Automation (V1.7)**: 建立 CB 數據維護流水線 (ADR-007)，整合 Excel 匯入、DDE 同步與 JSON 導出。
- [x] **Smart Naming**: 實作智慧名稱補正邏輯，自動移除 DDE 亂碼並補齊中文序號與 KY 標記。
- [x] **Precision Protection**: 於 `xq_bridge.py` 實作精確數據保護機制，防止 DDE 整數數值覆蓋 Excel 高精度轉換價。
- [x] **One-Click Sync**: 建立 `CB_Sync_Master.bat` 與 `/sync-cb` 工作流，實現 Windows 一鍵自動同步流程。
- [x] **Data Integrity**: 完成 124 筆精確轉換價匯入，與全市場 358 筆標的名稱補正。

### 2026-01-29 (22:00)

- [x] **UI Optimization (TimBoy V1.6)**: 移除內部視圖 Header (About, Trips, Journal, Tools)，釋放垂直空間。
- [x] **UX Refactor**: 實作「簡約置底」導航佈局，移除導航區冗餘粗線邊框。
- [x] **Typography Sync**: 統一全站字體舒適度標準 (16px + 6px padding)，修復中文 `font-bold` 導致的字體回退 Bug。

### 2026-01-29 (17:30)

- [x] **UI Optimization**: 實作「漲跌百分比」條件底色邏輯，僅在漲跌停 (>= 9.9%) 時顯示底色。
- [x] **Bug Fix**: 修正因變更 `renderDashboard` 意外刪除 `flashClass` 導致的渲染錯誤。 (ReferenceError)

### 2026-01-29 (15:30)

- [x] **Bug Fix**: 解決 `SyntaxError: Unexpected token 'F'`，修正 `cb-fetcher.js` 偵錯日誌汙染 stdout 的問題。
- [x] **Bug Fix**: 解決 `TypeError: db.collection`，強化 `cb-war-room.html` 效能監控邏輯並強制清除 `dist/` 快取。
- [x] **Bug Fix**: 修正 `hot-cb-cloud.js` 參數錯誤導致的同步失效與模擬數據複寫 Bug。
- [x] **Bug Fix**: 修正 `cb-calculator.html` 載入 `cb-data.json` 失敗的問題，改為 Firestore On-Demand 查詢。(Hotfix v1.5.2)
- [x] **UX Optimization**: 實作智慧快取判定，自動穿透異常的小尺寸 (<= 5) 本地快取資料。
- [x] **Architecture Refactor**: 完成 DDE 橋接器 (`xq_bridge.py`) 的模組化分層重構 (DDE-Mod-V1)。
- [x] **Cloud Migration**: 徹底移除本地 `cb-data.json`，改為純 Firestore 雲端中繼資料驅動。
- [x] **Data Integrity**: 實作 Analysis Drawer 的雲端中繼資料手動修正與立即儲存功能。
- [x] **Maintenance**: 批次同步 355 筆標的中繼資料至 Firestore，實現資料自動維護。
- [x] **Git Clean**: 更新 `.gitignore` 排除 Python 快取檔，並清理大量冗餘 JSON 資料。

### 2026-01-28 (18:15)

- [x] **Data Backfill**: 完成 TPEX 歷史資料 (11天) 補回至 Firestore，修正成交量計算邏輯與 UI 響應式顯示。
- [x] **Feasibility Study**: 完成 DDE 歷史數據回補研究（結論：放棄 DDE 路徑，改採 Web API）。
- [x] **Bug Fix**: 徹底封鎖 Firestore 子集合寫入觸發的「幽靈註冊」漏洞 (Deep Fix)。
- [x] **Cleanup**: 再次執行 `clean_auto_watchlist.mjs` 並清理 17 個殘留空殼標的。
- [x] **Bug Fix**: 修正戰情室日期切換卡死問題 (Verified & Decoupled: 2026-01-28)
- [x] **Hotfix**: 修復分析抽屜 `classList` 錯誤與崩潰問題 (Null Guard)。
- [x] **Data Integrity**: 修正 23683 轉換價異常並補正雲端數據。
- [x] **Engine Fix**: 防止 `fetch-cb-history.js` 對全市場標的進行自動註冊。
- [x] **Cleanup**: 執行 `clean_auto_watchlist.mjs` 並清理 10+ 個臨時調試腳本。
- [x] **Bug Fix**: 修正戰情室限價 CB 價格顯示錯誤 (Verified: 2026-01-28)
- [x] **Data Architecture**: 實作雙軌資料流與智慧同步架構 (ADR-006) (Completed: 2026-01-27)
- [x] **Bug Fix**: 修正戰情室價格 NaN 與遺留模組報錯 (Completed: 2026-01-27)
- [x] **Automation**: 完成 `fetch-hot-cb.js` 每日更新與自動提交 (Completed: 2026-01-27)
- [x] **Cleanup**: 刪除 21 個歷史 JSON 檔案 (-13k lines) (Completed: 2026-01-27)
- [x] **Documentation**: 建立 `CB_DATA_FLOW.md` 正式檔案 (Completed: 2026-01-27)

> 註：已完成項目會定期搬移至 `CHANGELOG.md` 並在此清理。

- [x] **CB 戰情室**: 實作「我的追蹤」頁籤登入權限限制 (Fixed: 2026-01-26)
- [x] **UI Refactor**: 合併分析抽屜中的資訊卡片 (Unified Card V10) (Fixed: 2026-01-26)

- [x] **Component Refactor**: 將「歷史溢價走勢圖」重構為獨立可複用 Widget (`CbPremiumHistoryChart.mjs`)，完全封裝 UI 控制與繪圖邏輯。 (Fixed: 2026-01-25)
- [x] **Crawler Review**: 重新審查爬蟲資料來源規則與邏輯 (基於 DATASOURCES.md) (Fixed: 2026-01-25)
- [x] **Bug**: 歷史溢價走勢圖顯示空白，且資料筆數顯示為 -- (Fixed: 2026-01-25)
- [x] **Data Execution**: [Backfilling...] 完成針對 Watchlist (15 items) 的精準回補程序 (Fixed: 2026-01-25)
- [x] **Smart Backfill**: 實作 `fetch-cb-history.js` 的智慧回補邏輯 (CLI Layer) (Fixed: 2026-01-25)
- [x] **Doc Refactor**: 調整 TODO.md 歸檔區塊排序邏輯 (Fixed: 2026-01-25)
- [x] **Hotfix**: 解決 `firebase.auth` 未定義導致的腳本崩潰 (Script Crash) (Fixed: 2026-01-25)
- [x] **Hotfix**: 解決 `outputs` 初始化順序錯誤 (TDZ Error) (Fixed: 2026-01-25)
- [x] **UI Refactor**: 重構 CB 計算機顯示介面 (V10: 整合標籤、去除圖示、垂直壓縮) (Fixed: 2026-01-25)
- [x] **Bug**: 點擊商品後的個股溢價圖表顯示異常 (Fixed: 2026-01-25)
- [x] **Bug**: 戰情室歷史溢價走勢圖 (Chart) 的 MAX 按鈕功能失效 (Fixed: 2026-01-25)
- [x] **性能監控 (Phase 1-3)**: 實作前端效能追蹤 (Web Vitals/GA4/Latency/Signal) (Completed: 2026-01-24)
- [x] **Refactor Guard**: 於下一次 UI 重構時試行並驗證防禦性開發機制 (Completed: 2026-01-24)
- [x] **Vibe Coding 驗證**: 完成「側邊欄動畫」的快速實作與自動歸檔測試，確認 /capture 指令與歸檔流程運作正常。 ✅ (Capture: 2026-01-24)
- [x] **Ultimate Integration (Phase 3)**: 將 CB 計算機完全併入戰情室，實現單頁分析體驗、即時數據自動補全 (Live Enrichment)、與爬蟲腳本標準化。 ✅ (Completed: 2026-01-24)
