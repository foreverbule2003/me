---
description: 啟動本機 dev server 並在內建瀏覽器實際操作 app（取代內建 /run）
---

用 `.claude/launch.json` 的 `vite-dev`（`npm run dev`，port 5173）把網站跑起來，像使用者一樣實際點過，確認畫面正常。不要用 Bash 起 server。

## 流程

1. **啟動**：`preview_start` `{name: "vite-dev"}`，開在 http://localhost:5173/me/
2. **操作**：截圖確認首頁 TimBoy 選單有畫出來；有指定頁面或最近 commit 動到的頁面，就點進去再截圖。空白畫面算啟動失敗
3. **查錯**：`read_console_messages` 看錯誤；server 端問題看 `preview_logs`
4. **回報**：看到什麼、哪裡壞掉；使用者有附參數（`$ARGUMENTS`）時，以那個頁面或功能為主

> 注意：開發模式下 `/notes/` 免 Firebase 登入，但嵌入的 Apps Script 要瀏覽器已登入 Google，內建瀏覽器沒登入時會顯示 Google 401 錯誤頁，不是程式壞掉。
