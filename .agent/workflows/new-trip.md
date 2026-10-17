---
description: 快速建立新旅程 (Vite + React 架構)
---

// turbo

> `// turbo` 是 Antigravity 工作流程的標記，一般理解為允許代理人自動執行下方指令、不逐一詢問。⚠️未查證（repo 內無定義）

> ⚠ 目前只支援日本行程（幣別只有日圓／台幣，頁首標籤寫死 `JP`），細節見 `trips/TRIP_STYLE_GUIDE.md` 第 1 節。

1. 執行互動式建立腳本
   node tools/new-trip.js

   腳本會依序問四個問題，答案由旅行者本人提供：

   | 問題 | 用途 | 例 |
   |---|---|---|
   | 年份 | 資料夾名稱 `{year}-{location}` 的前半 | 2027 |
   | 地點代碼 | 資料夾名稱後半與網址，小寫英文 | sapporo |
   | 主標題 | 頁面大標（可留空） | 北海道 |
   | 副標題 | 頁面副標（可留空） | 札幌・小樽 6日旅 |

---

## 此腳本會建立／修改：

### trips/{year}-{location}/

- `index.html` - Vite 入口點
- `spec.md` - 行程規格書（之後由 data.js 自動同步產生，見下方「下一步」第 2 步）
- `expenses.md` - 實際花費記帳（手寫，確認後轉寫進 data.js 的 expenseData；不併進 spec.md，見 `trips/TRIP_STYLE_GUIDE.md` 1.2 節）
- `manifest.json`、`sw.js` - 離線旅遊小書（見 `trips/TRIP_STYLE_GUIDE.md` 1.1 節）

### src/pages/trips/{year}-{location}/

- `main.jsx` - React 入口 (使用共用 Firebase)
- `App.jsx` - 主應用程式
- `data.js` - 行程資料 (ESM 格式)
- `{locationCode}.css` - 頁面專用樣式
- `components/` - DayCard／ItineraryTab／StickyPhaseHeader／ExpenseSection

### 自動修改的既有檔案

- `vite.config.js` - 註冊入口點
- `src/views/TripsView.jsx` - 首頁旅程選單加入本趟

## 模板參考

以 `src/pages/trips/template/` 為準（由 2026 東京重構而來）。共用元件清單見 `trips/TRIP_STYLE_GUIDE.md` 第 1 節，本檔不另列。

## 下一步

1. 在 `src/pages/trips/{year}-{location}/data.js` 規劃行程、填入資料（含 `tripMeta`）（2026-10-17 推翻舊寫法「編輯 spec.md 規劃行程」，與 spec.md 自動生成、勿手改相矛盾）
2. 執行 `node scripts/sync-travel-spec.mjs {year}-{location}` 由 data.js 產生 `spec.md`。⚠ 腳本建立的初始 `spec.md` 只是佔位草稿，這一步會整份覆蓋，**不要在 spec.md 手寫要保留的內容**（見 `trips/TRIP_STYLE_GUIDE.md` 1.2 節）
3. （若腳本自動寫入失敗）**手動更新 `vite.config.js`** 與 `src/views/TripsView.jsx`。
4. **手動更新** `docs/SITEMAP.md`（網站地圖加入本趟）與 `CHANGELOG.md`（新增版本紀錄）——腳本不會改這兩份。
5. 執行 `npm run dev` 預覽
6. 旅途中／回來後在 `trips/{year}-{location}/expenses.md` 記帳，確認後轉寫進 `data.js`
7. 上線：push `main` 後 GitHub Actions 自動部署到 GitHub Pages（可用 `/deploy` 指令）。push 之前要先經旅行者本人同意。
