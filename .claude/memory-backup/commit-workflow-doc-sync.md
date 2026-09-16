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

**How to apply:** 用 `/commit` 指令（`.claude/commands/commit.md`，完整流程已固化：清理 → guard/test 驗證 → spec/TODO 自動同步 → 文件同步表 → Critical Stop 確認 → 分主題提交）。2026-07-06 起 `npm run guard` 與 `npm test` 為**綠燈基準**（vitest 已限定 src/**、guard 已修白名單與 React 接線檢查），紅燈必須修復或取得使用者同意，不可帶紅燈 commit。不 push 除非明說（push main 即自動部署）。原始設計出處：`.agent/workflows/commit.md`（前代 Antigravity 工具的 33 個 workflow 之一，遷移計畫見 [[workflow-audit-2026-07]]）。
