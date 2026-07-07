---
description: 推送 main 到 GitHub 觸發自動部署（GitHub Pages）
allowed-tools: Bash(git status:*), Bash(git log:*), Bash(git push:*), Bash(gh run list:*), Bash(gh run watch:*)
---

把本地 main 推送到 GitHub。push 即觸發 `.github/workflows/deploy.yml` 自動 build + 部署到 GitHub Pages（https://foreverbule2003.github.io/me/）。

## 流程

1. **前置檢查**
   - 確認目前在 `main` 分支且工作區乾淨（有未提交變更時，先建議走 `/commit`）
   - `git log origin/main..HEAD --oneline` 列出即將推送的 commit，向使用者展示
2. **推送**
   - `git push origin main`
3. **確認部署**
   - `gh run list --workflow=deploy.yml --limit 1` 檢查 Actions 是否啟動
   - 部署失敗時撈 log 回報原因，不要只說「已推送」
4. **回報**
   - 推送的 commit 數、部署狀態、線上網址

> 注意：`firebase/firestore.rules` 的變更**不會**隨 push 部署，需另外執行 `firebase deploy --only firestore:rules`。
