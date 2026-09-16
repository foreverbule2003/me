---
description: 已停用——commit 流程正本改到 .claude/commands/commit.md
---

# Commit Workflow（已停用，2026-09-16）

> **正本在 [`.claude/commands/commit.md`](../../.claude/commands/commit.md)，打 `/commit` 執行。**

本檔原本是 `/commit` 的舊版設計（步驟 0–4，含 `git add .`、`/sync-to-brain`、PM/CTO 審查）。
指令集遷進 `.claude/commands/` 後，正本只剩一份，本檔與它已分岔——舊版還在教
`git add .`，而正本要求點名檔案；舊版沒有 guard/test 綠燈、壞味道掃描、記憶備份這三道。

**留下這一行而不是刪檔**，是因為同一個流程存兩份檔就是下次照舊規則長回來的來源：
有人（或 AI）翻到這裡時要看得到正本在哪，而不是照著舊步驟做完才發現。

舊版全文見 git 歷史：`git log --follow -p .agent/workflows/commit.md`
