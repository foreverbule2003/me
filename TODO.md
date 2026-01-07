# 待辦事項 (TODO)

> 最後更新：2025-12-27

## 🔧 Vite 遷移（中優先）

### Trip 頁面遷移
目前使用 CDN React + Babel，可選擇遷移到 Vite + React：

- [x] `trips/2026-ise-shima/` → Vite 版 ✅ 已完成
- [ ] `trips/2026-hokkaido/` → Vite 版
- [ ] `trips/2025-osaka/` → Vite 版  
- [ ] `trips/2025-cebu/` → Vite 版

**遷移模板**：參考 `src/pages/trips/ise-shima/`

### 遷移後清理
- [x] 確認 Vite 版正常後，移除舊版 CDN 頁面 ✅ ise-shima 已整合
- [ ] 更新 `trips/index.html` 連結指向 Vite 版

---

## 📱 PWA 離線支援（中優先）

讓旅程頁面可離線使用，出國無網路時仍可查看行程。

### 實作項目
- [ ] 建立 `manifest.json` (App 名稱、圖示、主題色)
- [ ] 準備多尺寸 App 圖示 (192x192, 512x512)
- [ ] 建立 `service-worker.js` (Cache First 策略)
- [ ] 在 HTML 註冊 Service Worker
- [ ] 快取旅程頁面靜態資源 (HTML/CSS/JS/圖片)
- [ ] 測試離線模式

**參考**：[Vite PWA Plugin](https://vite-pwa-org.netlify.app/)

---

## 🧹 維護與重構
 
- [ ] **Tech Lead Audit**: 檢查專案中殘留的廢棄代碼 (如 `src/pages` vs `src/views` 結構整理)

---

## 📋 其他待辦

### 功能增強
- [ ] 新增更多素食餐廳資料
- [ ] 完善 AI 旅遊助手功能
- [ ] **補完購物清單產品圖片**：
  - [ ] 保養類 (SANA 眼霜、Melano CC、肌研、眼藥水)
  - [ ] 上妝類 (Visee 遮瑕、CLIO/TIRTIR 氣墊、KATE 眼線、Cezanne 臥蠶)

### 文件
- [ ] 完成 2025-osaka 行程規劃
- [ ] 完成 2026-hokkaido 行程規劃
