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

### src/pages/trips/{locationCode}/

- `main.jsx` - React 入口 (使用共用 Firebase)
- `App.jsx` - 主應用程式
- `data.js` - 行程資料 (ESM 格式)
- `{locationCode}.css` - 頁面專用樣式

## 模板參考

基於最完善的 **伊勢志摩** 實作 (`src/pages/trips/ise-shima/`)

## 使用的共用元件

從 `src/components/trips/` 導入：

- SectionCard
- MapModal
- CollapsibleSection
- ActivityItem

## 下一步

1. 編輯 `trips/{year}-{location}/spec.md` 規劃行程
2. 修改 `src/pages/trips/{locationCode}/data.js` 資料
3. **手動更新 `vite.config.js`** 加入入口點：
   ```javascript
   'trips-{locationCode}': resolve(__dirname, 'trips/{year}-{location}/index.html'),
   ```
4. 執行 `npm run dev` 預覽
