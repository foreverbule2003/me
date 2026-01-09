# 待辦事項 (TODO)

> 最後更新：2026-01-10 (Advisor Prioritization)

## 🔴 P0: 立即執行 (High Visual ROI)

**目標**：修復視覺斷層，讓現有功能完整化。

_(已完成)_

---

## 🟡 P1: 技術清理 (High Value / Low Risk)

**目標**：確保地基乾淨，為 PWA 做準備。

_(已完成)_

---

## 🟢 P2: PWA 核心建設 (MUST-HAVE)

**目標**：確保伊勢志摩旅程可離線使用。

### Phase 1: 可安裝化

- [x] 建立 `manifest.json` (App 名稱、圖示、主題色)
- [x] 準備多尺寸 App 圖示 (192x192, 512x512)

### Phase 2: 離線能力

- [x] 建立 `service-worker.js` (Cache First 策略)
- [x] 在 HTML 註冊 Service Worker
- [x] 快取旅程頁面靜態資源 (HTML/CSS/JS/圖片)
- [x] 測試離線模式

---

## ⚪ P3: 未來規劃 / 待定

### Trip 頁面遷移 (Vite + React)

- [ ] `trips/2026-hokkaido/` → Vite 版
- [ ] `trips/2025-osaka/` → Vite 版
- [ ] `trips/2025-cebu/` → Vite 版

### UX / UI 優化

- [ ] 行程概覽區塊預設全部收合 (Timeline, Flight Info etc.)

### 功能與資料

- [ ] 新增臨空城 (Rinku Town) 美食清單
- [ ] 新增更多素食餐廳資料
- [ ] 完善 AI 旅遊助手功能
- [ ] 完成 2025-osaka 行程規劃
- [ ] 完成 2026-hokkaido 行程規劃

---

## 🏁 已完成歸檔 (Archived)

- [x] **Tech Lead Audit**: 檢查專案中殘留的廢棄代碼 (如 `src/pages` vs `src/views` 結構整理) ✅ (Completed: 2026-01-10)
- [x] 更新 `trips/index.html` 連結指向 Vite 版 ✅ (Completed: 2026-01-10)
- [x] **補完購物清單產品圖片** (Completed: 2026-01-10)
- [x] `trips/2026-ise-shima/` → Vite 版 ✅ 已完成
- [x] 確認 Vite 版正常後，移除舊版 CDN 頁面 ✅ ise-shima 已整合
- [x] **UX 優化**: 修復伊勢志摩頁面導航切換閃爍問題 (改用 CSS Visibility) ✅ (Completed: 2026-01-10)
