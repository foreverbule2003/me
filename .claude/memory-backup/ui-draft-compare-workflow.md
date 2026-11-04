---
name: ui-draft-compare-workflow
description: 改 UI 兩條路徑（/site-ui-jud 依規則挑問題、或 Tim 直接提需求）都接 /ui-draft 左右比較頁；兩支 skill 正本在 second-brain shared-skills，symlink 到 ~/.claude/skills
metadata:
  node_type: memory
  type: feedback
  originSessionId: 00806cab-f8d2-4a22-bdc4-672cc4b8a5b0
  modified: 2026-11-04T02:25:53.369Z
---

改 UI 有兩條路，共用同一個草稿比較階段：
- **路徑 A**：`/site-ui-jud` 照頁面規格 §1 挑問題 → Tim 選外觀改動 → `/ui-draft`（入口=問題表）。
- **路徑 B**：Tim 需求還在成形、直接提 → `/ui-draft` 不先訪談，直接給方向與草稿；定下的做法寫回規格，之後 A 拿它檢查。

兩支 skill 正本在 `~/myDev/second-brain/.claude/shared-skills/{ui-draft,site-ui-jud}/`（`SKILL.md` 通用 + `references/me.md`、`references/second-brain.md`），symlink 到 `~/.claude/skills/`。me 的規格是 `docs/UI_SPEC.md`。

**Why:** 2026-11-04 Tim 定調兩條路徑，要求兩個 repo 只留一份正本（SSOT）；同日另開 session 盤點其他可共用的 skill（報告 `docs/SKILL_SSOT_AUDIT.md`）。

**How to apply:** 改這兩支 skill 去改 second-brain 那份，不在 me 另寫；me 專屬做法寫進 `references/me.md`。symlink 換電腦要重建：`ln -sfn ~/myDev/second-brain/.claude/shared-skills/<name> ~/.claude/skills/<name>`。commit 照 [[no-commit-without-explicit-yes]]，兩個 repo 各自問。
