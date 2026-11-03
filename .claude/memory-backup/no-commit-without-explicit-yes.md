---
name: no-commit-without-explicit-yes
description: 沒有對「要 commit 嗎？」的明確同意，絕不 commit / push；描述未來流程的話不算授權
metadata:
  node_type: memory
  type: feedback
  originSessionId: c1ee577d-a6d1-4b17-b3a8-d7f3554eb793
  modified: 2026-11-03T07:05:24.512Z
---

不得自行 commit 或 push。必須先給 diff 摘要、問「要 commit 嗎？（只寫本地，不 push）」並停下等回答；push 另外再問。

**Why:** 2026-11-03 使用者說「等 mac 這邊推上去，我在 windows 拉下來以後你再告訴我該怎麼做」，我把這句描述流程順序的話當成授權，自己叫出 /commit 並直接 commit + push 到 main（觸發部署）。使用者很生氣：「我根本沒叫你commit吧」。

**How to apply:** 使用者提到「推上去」「之後 commit」等未來式的流程描述，都只是計畫，不是批准。我自己呼叫 /commit 也不算批准。做完改動就停在「要 commit 嗎？」，等他回答這一問。見 [[commit-workflow-doc-sync]]。
