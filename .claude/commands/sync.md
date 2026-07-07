---
description: 同步本地與遠端程式碼（fetch → rebase pull → push）
allowed-tools: Bash(git fetch:*), Bash(git status:*), Bash(git pull:*), Bash(git push:*), Bash(git log:*), Bash(git stash:*)
---

檢查遠端 repo 並把本地同步到最新，適合開工前執行。

## 流程

1. `git fetch origin && git status -sb` — 檢查本地與遠端的 ahead/behind 狀態
2. 工作區有未提交變更且需要 pull 時：先向使用者確認（stash 或先 commit），不要默默 stash
3. `git pull --rebase origin <當前分支>` — rebase 保持 commit 歷史乾淨
   - 發生衝突時：停下來列出衝突檔案，與使用者確認解法，不要自行猜測取捨
4. 本地有領先的 commit 時 `git push origin <當前分支>`
5. 回報：同步前後的狀態差異（拉了幾個、推了幾個 commit）
