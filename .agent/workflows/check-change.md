---
description: 檢查當前工作區的變更、Git 狀態與潛在問題
---

# Change Check Workflow

> **目的**：在提交或推進進度前，快速檢視當前的檔案變更、Git 狀態與潛在的程式碼問題。
> **使用時機**：每次 coding 告一段落，準備 commit 前，或想知道「我剛剛改了什麼」的時候。

// turbo-all

## 1. 檢視 Git 狀態 (簡潔版)
顯示目前有哪些檔案被修改、新增或刪除。

git status --short

## 2. 檢視具體變更 (Diff)
顯示具體的程式碼差異。
(為了避免輸出過長，限制最近修改的 Diff，或建議使用者使用 UI 工具查看更詳細內容)

git diff --stat

## 3. 檢查 TODO 與關鍵標記
掃描變更中是否遺留了 FIXME 或 TODO。

git grep -nE "FIXME|TODO" -- $(git diff --name-only)

## 4. 顯示最近的 Commit
回顧一下最近的進度，避免重複或遺漏。

git log --oneline -n 5

---
_完成後，請根據上述資訊向使用者報告變更摘要。_
