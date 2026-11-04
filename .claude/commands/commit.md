---
description: 依 commit workflow（規則寫回 → 快掃 → 驗證與文件同步 → 壞味道 → 記憶備份 → 確認並提交部署）建立 git commit
argument-hint: [選填：commit 範圍或補充說明]
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git clean -ndX), Bash(git add:*), Bash(git commit:*), Bash(git rm --cached:*), Bash(npm test:*), Bash(npm run guard:*), Bash(node scripts/check-doc-sync.mjs:*), Bash(node scripts/check-smells.mjs:*), Bash(node scripts/sync-travel-spec.mjs:*), Bash(node scripts/sync-memory-backup.mjs)
---

讀 `~/myDev/second-brain/.claude/shared-skills/commit/SKILL.md` 與它的 `references/me.md`，照它執行（兩個 repo 共用的正本，2026-11-04 起）。

使用者補充說明（若有）：$ARGUMENTS
