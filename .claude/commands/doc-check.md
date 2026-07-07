---
description: 提交前檢查文件是否需要同步更新
argument-hint: [選填：指定檢查範圍]
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*)
---

檢視目前工作區變更（`git status` + `git diff`），逐項確認以下文件是否需要因應變更而更新。有缺漏就直接補上，並回報「已更新／不需更新」的逐項結論。

## 📋 文件檢查清單

1. **README.md** — 專案說明：重大功能、安裝或使用方式、可用腳本表
2. **CHANGELOG.md** — 新功能／重大重構／移除功能需有版本區塊（Keep a Changelog 格式）
3. **docs/FEATURES.md** — 使用者可見的功能新增或行為變更
4. **docs/COMPONENTS.md** — 共用元件新增或 Props/API 變更
5. **docs/SITEMAP.md** — 頁面路由新增或變動
6. **docs/STYLE_GUIDE.md** — 全站設計規範（顏色、字體、間距）變更
7. **trips/TRIP_STYLE_GUIDE.md** — 旅程頁面架構或模板變更
8. **trips/{trip}/spec.md** — 特定旅程資料結構變更（`data.js` 有動就跑 `node scripts/sync-travel-spec.mjs {trip}`）
9. **docs/CB_DATA_FLOW.md** — CB 資料管線、排程或 Actions 變更
10. **docs/ARCHITECTURE.md** — 目錄結構、資料流等架構決策變更

## 🧩 結構檢查

- **元件位置**：首頁相關放 `src/components/`；旅程共用放 `src/pages/trips/shared/`；是否有重複元件該合併？
- **Vite 入口點**：新增頁面是否有 `{page}/index.html` + `src/pages/{page}/main.jsx`，且已加入 `vite.config.js` 的 `build.rollupOptions.input`？
- **首頁選單**：新旅程是否已出現在 `src/views/TripsView.jsx` 的 menuItems？

## 🔐 安全性檢查

- **API Keys**：公開 Key 是否已在 Google Cloud Console 設定 HTTP Referrer 限制（`https://foreverbule2003.github.io/*`、`http://localhost:*`）？
- **Firestore 規則**（`firebase/firestore.rules`）：新增 collection 是否有適當讀寫權限？規則有變更時提醒需手動 `firebase deploy --only firestore:rules`（push 不會自動部署規則）

檢查完成後，若使用者接著要提交，建議走 `/commit`。

使用者補充說明（若有）：$ARGUMENTS
