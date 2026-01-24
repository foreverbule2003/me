# 待辦事項 (TODO)

> 最後更新：2026-01-23 (Post-LoadingFix)

## 🔴 P0: 立即執行 (Pending)

_(暫無 P0 項目)_

---

- [ ] **Serverless Migration**: 將本地爬蟲 (`fetch-cb-history.js`) 遷移至 GCP Cloud Functions。
  - 技術：Google Cloud Functions (Node.js) + Cloud Scheduler。

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

- [x] **Hot CB History**: 建立每日熱門 CB 榜單的歷史存檔機制。 (Completed: 2026-01-24)

- [x] **CB 工具 UI/UX 升級**:
  - 重構 `hot-cb.html` 與 `cb-calculator.html` 列表排版 (High/Low 對齊、字體層次)。
  - 優化搜尋框體驗 (禁用瀏覽器自動完成)。
  - 修正深色模式下資訊卡片的視覺斷層。
  - ✅ (Completed: 2026-01-24)
- [x] **安全性機制實作**:
  - 建立 `/test-cb-tool` 自動化冒煙測試。
  - 於 `/check-change` 加入 ID 刪除偵測。
  - 制定 `safeguard_plan.md` 重構規範。
  - ✅ (Completed: 2026-01-24)
- [x] **功能修復**: 解決 UI 重構導致的搜尋與 Autocomplete 邏輯中斷問題。✅ (Completed: 2026-01-24)

- [x] **Feature**: 實作「已建檔標的」自動完成/預先載入功能 (Autocomplete from Firebase)。✅ (Completed: 2026-01-23)
  - 解決線上版無法爬取新資料的問題，改為引導使用者選擇已存在的資料。
- [x] **CB 計算機功能升級**: 新增溢價率走勢圖、補齊 2026/01 斷層、引入 Zoom/Pan 互動與區間切換 (1M/3M/All) ✅ (Completed: 2026-01-23)
- [x] **數據自動化工具**: 建立 `fetch-cb-history.js` (API 直接模式) 與 `import-xq-csv.js` ✅ (Completed: 2026-01-23)
- [x] **圖表 Bug 修正**: 解決因日期格式 (MM-DD vs YYYY-MM-DD) 導致的縮放重置失效問題 ✅ (Completed: 2026-01-23)
- [x] **假日顯示邏輯修復**: 修正 `hot-cb.html` 在週末顯示 "LIVE DATA" 的問題，正確解析 PChome 數據時間並顯示 "LAST CLOSE" ✅ (Completed: 2026-01-24)
- [x] **Hot CB 歷史瀏覽器**: 實作 `hot-cb.html` 的日期導航與歷史數據載入功能 (`?date=YYYY-MM-DD`) ✅ (Completed: 2026-01-24)
- [x] **網站圖示修復**: 補上 `favicon.ico` 並修復 404 錯誤 ✅ (Completed: 2026-01-24)

- [x] Tech Lead Audit: 檢查專案中殘留的廢棄代碼 (如 src/pages vs src/views 結構整理) ✅ (Completed: 2026-01-10)
- [x] 優化天氣預報 UI: 修復切邊、調整間距、新增自動捲動至當日功能 ✅ (Completed: 2026-01-10)
- [x] 調整總覽頁面佈局: 將行程概覽移至天氣預報上方 ✅ (Completed: 2026-01-10)
- [x] 增強航班資訊: 加入航廈 (Terminal) 資料 ✅ (Completed: 2026-01-10)
- [x] 更新 `trips/index.html` 連結指向 Vite 版 ✅ (Completed: 2026-01-10)
- [x] **補完購物清單產品圖片** (Completed: 2026-01-10)
- [x] `trips/2026-ise-shima/` → Vite 版 ✅ 已完成
- [x] 確認 Vite 版正常後，移除舊版 CDN 頁面 ✅ ise-shima 已整合
- [x] **UX 優化**: 修復伊勢志摩頁面導航切換閃爍問題 (改用 CSS Visibility) ✅ (Completed: 2026-01-10)
- [x] **App.jsx 進階模組化**: 提取 Flight, Budget, Checklist, Links 為共用元件，移除 Firestore 依賴 ✅ (Completed: 2026-01-10)
- [x] **PWA 核心建設 (Phase 1-3)**: 建立 Manifest, Service Worker, 支援離線與解決路徑問題 ✅ (Completed: 2026-01-10)
- [x] **Goal (P0)**: 修復視覺斷層，讓現有功能完整化 ✅ (Completed: 2026-01-10)
- [x] **Refactor (Ise-Shima)**: 行程元件重構 (DayCard, StickyPhaseHeader, ItineraryTab) ✅ (Completed: 2026-01-10)
- [x] **Goal (P1)**: 技術清理 - 確保地基乾淨 (App.jsx Refactor) ✅ (Completed: 2026-01-10)
- [x] 行程概覽區塊預設收合 + 今日醒目標示 + 點擊跳轉功能 ✅ (Completed: 2026-01-10)
- [x] 新增臨空城 (Rinku Town) 美食清單 ✅ (Completed: 2026-01-10)
- [x] 新增更多素食餐廳資料 (含 USJ 專區) ✅ (Completed: 2026-01-10)
- [x] 建立全行程 (1/11-1/21) 天氣預報表格 ✅ (Completed: 2026-01-10)
- [x] 將 USJ 混雜預想整合至 App.jsx ✅ (Completed: 2026-01-10)
- [x] **UI/UX 優化**: 交通資訊表格化 (USJ 入園情報、巴士時刻表、近鐵比較) ✅ (Completed: 2026-01-10)
- [x] **視覺升級**: USJ 資訊欄位精簡 (DAY X 標籤、閉園時間)、VISON 巴士連結按鈕化 ✅ (Completed: 2026-01-10)
