---
description: 提交前檢查文件是否需要更新
---

# 文件更新提醒 Workflow

當功能變動時，在 Commit 前請確認以下文件是否需要同步更新：

## 📋 檢查清單

1. **README.md** - 專案說明
   - 是否新增了需要說明的重大功能？
   - 是否修改了專案的安裝或使用方式？

2. **docs/FEATURES.md** - 功能清單
   - 是否新增了使用者可見的功能？
   - 是否修改了現有功能的行為？

3. **docs/COMPONENTS.md** - 元件文件
   - 是否新增了共用元件？
   - 是否修改了元件的 Props 或 API？

4. **docs/SITEMAP.md** - 網站地圖
   - 是否新增了頁面？
   - 是否修改了頁面路徑？

5. **docs/STYLE_GUIDE.md** - 全站樣式指南
   - 是否修改了全站設計規範（顏色、字體、間距）？

6. **trips/TRIP_STYLE_GUIDE.md** - 旅程樣式指南
   - 是否修改了旅程頁面的設計規範？

7. **trips/[trip-name]/spec.md** - 各旅程規格說明
   - 是否修改了特定旅程的資料結構？
   - 是否新增了旅程專屬功能？

## 🧩 元件結構檢查

8. **元件一致性**
   - 新增的元件是否放在正確位置？
     - 首頁相關：`src/components/`
     - 旅程頁面：`trips/shared/`
   - 是否有重複的元件需要合併？
9. **Vite 入口點**
   - 新增頁面是否有對應的入口點？
     - HTML：`[page]/index.html`
     - JS：`src/pages/[page]/main.jsx`
   - 是否已加入 `vite.config.js` 的 `build.rollupOptions.input`？

## 🔐 安全性檢查

8. **API Keys 安全性**
   - 公開的 API Key 是否已在 [Google Cloud Console](https://console.cloud.google.com/apis/credentials) 設定 HTTP Referrer 限制？
   - 允許的網域：`https://foreverbule2003.github.io/*`, `http://localhost:*`

9. **Firebase 規則** (`firebase/firestore.rules`)
   - 新增的 collection 是否有適當的讀寫權限？
   - 是否需要 Firebase Auth 保護敏感資料？

## ✅ 更新順序建議

| 變更規模     | 建議順序                                   |
| ------------ | ------------------------------------------ |
| **大型功能** | 先寫 Implementation Plan → 實作 → 更新文件 |
| **小型修改** | 實作 → 同步更新相關文件                    |

## 🔧 提交指令

確認文件更新完成後：

```bash
git add . && git commit -m "[message]"
```
