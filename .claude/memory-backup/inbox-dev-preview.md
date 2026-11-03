---
name: inbox-dev-preview
description: 改完待讀清單(收件匣 Apps Script)後,先 clasp push、自己用 Chrome 開 /dev 實測,再把 /dev 網址交給 Tim
metadata:
  type: feedback
---

改 `scripts/apps-script/inbox/` 之後、部署(update-deployment)之前:
1. 在該資料夾跑 `npx @google/clasp@3 push --force`(不用先 commit)。
2. 自己用 Claude in Chrome(Tim 的 Chrome 已登入 Google)開測試網址實測改到的功能:
   https://script.google.com/macros/s/AKfycbxAFiuZ8aS9VOEeUl7bv8bvc9HJgfKZl1TSa4O7PfDi/dev
3. 測過才把這個網址貼給 Tim,提示他可以先看效果。

**Why:** 2026-11-03 Tim 要我記住這個網址並主動提示;同日我沒測就叫他開嵌入版 /dev,結果是「需要存取權」,他很不滿。
**How to apply:** `/dev` 不能嵌進 me repo 入口頁(嵌入框只顯示 Drive「需要存取權」),只能直接開。內建瀏覽器沒登入 Google,一定要用 Chrome 測。push 後每小時清理就照新程式跑,動到 `sweep_` 時先講。細節在 work/docs/specs/inbox-spec.md §4。
