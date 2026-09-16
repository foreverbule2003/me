---
name: workflow-audit-2026-07
description: 2026-07 workflow 體檢結論與 P1/P2 待辦（.agent 33 個孤兒指令待遷移等）
metadata: 
  node_type: memory
  type: project
  originSessionId: ead4fb1c-9a0b-4d36-92d2-487ab8def986
---

2026-07-06 完成全 repo workflow 體檢，報告在 `docs/WORKFLOW_AUDIT_2026-07-06.md`。**P0 與 P1 全部完成**（測試/guard 回綠、/commit 補齊見 [[commit-workflow-doc-sync]]、六指令遷移、new-trip 選單自動註冊、CB 文件雙軌補記、TODO 單軌化）。

**現行指令集**（`.claude/commands/`）：commit、doc-check、deploy、sync、journal、capture、cleanup。`.agent/workflows/`（前代 Antigravity 33 指令）保留作歷史參考，不再使用。TODO 唯一 backlog = 根目錄 `TODO.md`。

**P2 也已全部完成（2026-07-06）**：CHANGELOG 2.5.5 斷層補記、README 部署章節（firestore rules 需手動 deploy）、/check-cb-pipeline 指令、離線小書文件化 + sw/manifest 改指向 master_guide.html（travel-book.html 是已亡歷史名稱）、北海道死連結移除、lessons.md 首筆教訓。

**體檢全案結案。** 指令集現有 8 個：commit、doc-check、deploy、sync、journal、capture、cleanup、check-cb-pipeline。唯一懸而未決：cb-logic/cb_logic 雙版本整併（在獨立 session 進行中）。
