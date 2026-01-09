---
description: 檢查遠端 repo 並同步程式碼到最新
---

// turbo-all

1. 取得遠端變更並檢查狀態
   git fetch origin && git status -sb

2. 拉取遠端更新 (使用 rebase 保持 commit 歷史乾淨)
   git pull --rebase origin $(git rev-parse --abbrev-ref HEAD)

3. 推送本地 commit 到遠端 (如有)
   git push origin $(git rev-parse --abbrev-ref HEAD)
