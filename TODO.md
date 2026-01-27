# 待辦事項 (TODO)

> 最後更新：2026-01-25 (Widget-Refactor-Stable)

## 🔴 P0: 立即執行 (Pending)

- [ ] **Bug**: CB戰情室的限價CB價格有誤 <!-- captured: 2026-01-25 -->
- [ ] **Bug**: 戰情室的個股需要修正 <!-- captured: 2026-01-25 -->
- [ ] **Data Architecture**: 徹底檢視現有的CB獲取資料的方式 (Ref: [dde-py-paradigm.md](knowledge/dde-py-paradigm.md)) <!-- captured: 2026-01-26 -->

---

## 🟡 P1: 下階段技術優化 (Future Tech)

> 目標：持續優化雲端架構與開發者體驗。

- [ ] **性能監控 (Phase 4)**: (Optional) 實作雲端執行耗時追蹤。 (待觀察) <!-- implemented: logPerfEvent -->

---

## 🟢 P2: 功能擴充與新行程 (Features & Trips)

> 目標：持續產出新內容與增強 AI 體驗。

- [ ] 完善 AI 旅遊助手功能
- [ ] 完成 2025-osaka 行程規劃
- [ ] 完成 2026-hokkaido 行程規劃

---

## ⚪ P3: 舊版維護與歷史保存 (Legacy & History)

> 註：保留舊版頁面作為 Vibe Coding 進化的歷史見證，僅在必要時進行維護，不強制遷移。

- [ ] `trips/2026-hokkaido/` (Legacy HTML)
- [ ] `trips/2025-osaka/` (Legacy HTML)
- [ ] `trips/2025-cebu/` (Legacy HTML)

---

## 🏁 已完成歸檔 (Archived)

### 2026-01-28

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
