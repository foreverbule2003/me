---
name: finance-dashboard-anonymous
description: 財務儀表板（tools/some-company）刻意不寫公司名；實際來源記在 repo 外的私人檔
metadata:
  type: project
---

財務儀表板（`tools/some-company.html`）刻意不出現公司名稱：頁面、`data.js` 註解、README、docs 都不寫。2026-10-27 使用者明確要求。

實際公司、季報位置與下載方式記在 `~/.claude/private/finance-dashboard-source.txt`（需要時才讀）。這份記憶本身不能寫公司名，因為 /commit 會把 auto-memory 鏡像進 repo 的 `.claude/memory-backup/`。

**Why:** 使用者的選擇；repo 公開在 GitHub。
**How to apply:** repo 內與記憶裡一律用「上市母公司／關聯企業」等中性描述；新增觀察、註解、記憶時不帶公司名、股票代號、持股比例。舊 commit 歷史裡仍有公司名，改寫歷史前要先問使用者。
