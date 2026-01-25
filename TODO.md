# 待辦事項 (TODO)

> 最後更新：2026-01-24 (Post-Ultimate-Integration)

## 🔴 P0: 立即執行 (Pending)

- [ ] **Crawler Review**: 重新審查爬蟲資料來源規則與邏輯 (基於 DATASOURCES.md) <!-- captured: 2026-01-25 -->

---

## 🟡 P1: 下階段技術優化 (Future Tech)

> 目標：持續優化雲端架構與開發者體驗。

- [x] **性能監控 (Phase 1)**: 實作 Web Vitals 與 GA4 整合 (Core Infrastructure)。
- [x] **性能監控 (Phase 2)**: 實作戰情室 API Latency 追蹤與自定義異常 Alert。
- [x] **性能監控 (Phase 3)**: 實作前端「網路健康度」訊號燈 (Signal Widget)。
- [ ] **性能監控 (Phase 4)**: (Optional) 實作雲端執行耗時追蹤。 (待觀察)
- [ ] **CB 戰情室**: 實作「我的追蹤」頁籤登入權限限制 <!-- captured: 2026-01-24 -->
- [x] **Refactor Guard**: 於下一次 UI 重構時試行並驗證防禦性開發機制 <!-- captured: 2026-01-24 -->
- [ ] **UI Refactor**: 合併分析抽屜中的資訊卡片 (Premium, Conv Val, Parity) 為單一視覺區塊 <!-- captured: 2026-01-24 -->
- [ ] **Component Refactor**: 將「歷史溢價走勢圖」重構為獨立可複用元件 (Shared Component)，以解決戰情室與計算機的重複代碼問題 <!-- captured: 2026-01-25 -->

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

- [x] **Refactor Guard**: 於下一次 UI 重構時試行並驗證防禦性開發機制 <!-- archived: 2026-01-24 -->

> 註：已完成項目會定期搬移至 `CHANGELOG.md` 並在此清理。

- [x] **Ultimate Integration (Phase 3)**: 將 CB 計算機完全併入戰情室，實現單頁分析體驗、即時數據自動補全 (Live Enrichment)、與爬蟲腳本標準化。 ✅ (Completed: 2026-01-24)
- [x] **Vibe Coding 驗證**: 完成「側邊欄動畫」的快速實作與自動歸檔測試，確認 /capture 指令與歸檔流程運作正常。 ✅ (Capture: 2026-01-24)
- [x] **Bug**: 戰情室歷史溢價走勢圖 (Chart) 的 MAX 按鈕功能失效 (Fixed: 2026-01-25)
- [x] **Bug**: 點擊商品後的個股溢價圖表顯示異常 (Fixed: 2026-01-25)
