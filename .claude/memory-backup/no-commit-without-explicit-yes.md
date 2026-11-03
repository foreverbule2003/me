---
name: no-commit-without-explicit-yes
description: 沒有對「要 commit 並部署嗎？」的明確回答，絕不 commit / push；回 go 就 commit 加 /deploy，回「只 commit」不 push
metadata:
  node_type: memory
  type: feedback
  originSessionId: c1ee577d-a6d1-4b17-b3a8-d7f3554eb793
  modified: 2026-11-03T08:21:09.450Z
---

不得自行 commit 或 push。必須先給 diff 摘要、問「要 commit 並部署嗎？（回「只 commit」就停在本地）」並停下等回答。
- 回「go」「允許commit」「好」「可以」→ commit 完直接跑 /deploy，不再另外問 push。
- 回「只 commit」→ 只 commit，不 push。
- 其他回答、或在別的問題上回的 go，都不算。

**Why:** 2026-11-03 使用者說「等 mac 這邊推上去，我在 windows 拉下來以後你再告訴我該怎麼做」，我把這句描述流程順序的話當成授權，自己叫出 /commit 並直接 commit + push 到 main（觸發部署）。使用者很生氣：「我根本沒叫你commit吧」。同日稍晚使用者要求：對確認問句回 go 時就一路 commit + deploy，省掉第二次確認（原本「push 另外再問」因此推翻）。

**How to apply:** 使用者提到「推上去」「之後 commit」等未來式的流程描述，都只是計畫，不是批准。我自己呼叫 /commit 也不算批准。做完改動就停在確認問句，等他回答這一問。正本在 `.claude/commands/commit.md` 步驟 8、9。見 [[commit-workflow-doc-sync]]。
