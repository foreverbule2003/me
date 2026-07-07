---
description: 彙整今日完成事項，依類別產出日報
argument-hint: [選填：日期，如 2026-07-05，預設今天]
allowed-tools: Bash(git log:*), Bash(git diff:*), Bash(git show:*)
---

彙整當日（或 $ARGUMENTS 指定日期）所有開發事項，產出分類日報。

## 流程

1. **掃描當日 commit**：`git log --oneline --since="midnight"`（指定日期時用 `--since/--until` 對應區間），必要時 `git show --stat` 看變更範圍
2. **對照文件**：檢查 `CHANGELOG.md` 最新區塊與 `TODO.md` 已完成項目，找出「做了但沒記錄」的缺口
3. **分類彙整**，依以下架構報告：
   - 🏗️ **架構調整** — 目錄重構、元件抽離、路由優化
   - ✨ **新功能** — 新頁面、新工具、新指令
   - 🐞 **修正** — Bug fix、防線修復
   - ⚡ **效能與安全** — 優化、API Key 保護、規則調整
   - 📚 **知識與文件** — README／docs／指南更新
4. **可複用性掃描**：檢查今日變更中是否有值得沉澱的通用資產——
   - 新增 `.claude/commands/*.md`（通用工作流程）
   - 新增 `knowledge/*.md`（思維模型）
   - commit 訊息含 `[reusable]` 標記或「元件／模組／工具」字樣
   - 有的話列表建議：哪些適合複製到 Second-Brain 知識庫或寫入 `tasks/lessons.md`
5. **下一步建議**：根據 `TODO.md` 與今日進度，提示接下來 1–3 個優先事項

## 輸出格式

精簡的分類條列 + 一段「明日建議」。沒有活動的分類直接省略。
