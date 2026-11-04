---
name: command-format-skill-template
description: me repo 新增或改寫 .claude/commands/*.md 時，照 second-brain 的 .claude/templates/skill-template.md 段落格式
metadata:
  node_type: memory
  type: feedback
  originSessionId: 00806cab-f8d2-4a22-bdc4-672cc4b8a5b0
  modified: 2026-11-04T02:13:27.673Z
---

在 me repo 新增或改寫斜線指令／skill 時，格式照 `/Users/tim/myDev/second-brain/.claude/templates/skill-template.md`：description 寫「什麼時候用」、固定段落順序（Parameters → Inputs → Steps「步驟名 → 產出」→ Output → Error Handling → Checkpoints）、MUST 只標跳過會出事的幾條、由來與事故寫在 `---` 後的附錄。兩百行內且沒有用到才查的資料 → 斜線指令；否則拆成 skill + references。

**Why:** 2026-11-04 Tim 做 [[ui-draft-compare-workflow]] 時要求「參考 second brain 的 skill template」。

**How to apply:** 寫指令前先讀那份模板（會更新，別憑記憶）；既有的舊指令沒要求不主動全改。
