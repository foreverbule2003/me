---
name: commit-workflow-doc-sync
description: 此 repo 的 commit 必須跑 guard/test 並同步文件（CHANGELOG 等），不可裸 commit
metadata: 
  node_type: memory
  type: feedback
  originSessionId: ead4fb1c-9a0b-4d36-92d2-487ab8def986
---

Tim 攔下過一次「只提交程式碼」的 commit（2026-07-06）：這個 repo 有設計好的 commit workflow，直接 commit 是不夠的。

**Why:** repo 規範散落三處 —— `CONTRIBUTING.md`（conventional commits `type(scope): 中文描述`、push 前 `npm test`）、`CHANGELOG.md`（Keep a Changelog 版本區塊）、`docs/REFACTOR_GUARD.md`（`npm run guard` 三道防線）。重大變更還需檢查 `docs/ARCHITECTURE.md`、`docs/COMPONENTS.md`、`trips/TRIP_STYLE_GUIDE.md` 是否要同步。

**How to apply:** 用 `/commit`（me 的 `.claude/commands/commit.md` 是薄殼，正本是 second-brain `.claude/shared-skills/commit/SKILL.md` + `references/me.md`，2026-11-04 起兩個 repo 共用）：規則寫回 → 快掃 → guard/test 與文件同步 → 壞味道 → 記憶備份 → 確認並提交。紅燈：這次改壞的要修好；改之前就壞的寫進 diff 摘要、不擋（2026-11-04 推翻舊的「修不了先問」）。推出照 [[no-commit-without-explicit-yes]]。
