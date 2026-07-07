---
description: 快速建立新旅程 (Vite + React 架構)
---

// turbo

1. 執行互動式建立腳本
   node tools/new-trip.js

---

## 此腳本會建立：

### trips/{year}-{location}/

- `index.html` - Vite 入口點
- `spec.md` - 行程規劃文件

### src/pages/trips/{year}-{location}/

- `main.jsx` - React 入口 (使用共用 Firebase)
- `App.jsx` - 主應用程式
- `data.js` - 行程資料 (ESM 格式)
- `{locationCode}.css` - 頁面專用樣式

## 模板參考

基於最完善的 **2026 東京** 實作重構，目前會從 `src/pages/trips/template/` 複製初始架構。

## 使用的共用元件

從 `src/components/trips/` 導入：

- SectionCard
- MapModal
- CollapsibleSection
- ActivityItem

## 下一步

1. 編輯 `trips/{year}-{location}/spec.md` 規劃行程
2. 修改 `src/pages/trips/{year}-{location}/data.js` 資料
3. （若腳本自動寫入失敗）**手動更新 `vite.config.js`** 與 `src/views/TripsView.jsx`。
4. 執行 `npm run dev` 預覽
