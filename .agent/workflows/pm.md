---
description: 呼叫網站產品經理 (Web PM)
---

# Invoke Web PM

This workflow activates the Web PM persona.

    ```bash
    cat .agent/prompts/web-pm-prompt.md
    ```

---

## 📋 Backlog Grooming & Archiving (Pre-Commit)

> 在提交變更前，請 PM 協助整理 `TODO.md`，保持 backlog 清晰。

### 執行流程

1.  **Check (檢查完成項)**
    - 檢視 `TODO.md` 中標記為 `[x]` 的項目。
    - 確認相關程式碼與功能是否確實完成。

2.  **Archive (歸檔)**
    - 將確認完成的項目移動到 `TODO.md` 底部的 `## 🏁 已完成歸檔 (Archived)` 區塊。
    - 若底部無此區塊，請自動建立。
    - 加上歸檔日期 (Option)，例如：`- [x] 項目名稱 (Completed: 2026-01-10)`。

3.  **Update (更新)**
    - 確認是否有新的 Technical Debt 或 Follow-up items 需要加入待辦清單。
