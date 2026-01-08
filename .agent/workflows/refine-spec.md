---
description: 啟動協作式規格修訂流程 (Load -> Annotate -> Implement)
---

# 協作式規格修訂流程 (Collaborative Refinement Workflow)

此流程旨在透過將輸出結果或程式碼載入至 `implementation_plan.md`，讓使用者直接進行標註與回饋，從而加速迭代。

## 1. 準備階段 (Capture Context)
- **確認目標**：確認使用者想要調整的對象 (例如：生成的報告、特定的程式碼檔案、或是 UI 截圖的描述)。
- **備份現狀**：確保當前狀態已保存 (Git Commit 或備份檔案)。

## 2. 載入至計畫 (Load into Plan)
- **寫入 `implementation_plan.md`**：
  - 清空舊內容。
  - 建立 `## Request for User (請在此標註)` 區塊。
  - 將目標內容 (如報告 Markdown 原始碼) 貼入 `## Current Content` 區塊。
  - 加入提示語：`請直接在下方內容中添加註解 (例如 <!-- 修改為... --> 或 [FIX] ...)`。

## 3. 通知使用者 (Notify User)
- 使用 `notify_user` 工具。
- 強調：「已將內容載入至 Implementation Plan，請直接在右側文件中進行標註與修改。」
- 設定 `BlockedOnUser: true` 等待反饋。

## 4. 解析與實作 (Parse & Implement)
- **讀取計畫**：使用者完成後，讀取 `implementation_plan.md`。
- **分析差異**：尋找使用者的註解或直接修改的地方。
- **更新實作**：根據標註內容修改程式碼或模板。
- **驗證**：重新生成結果並展示。

---

## 建議的標註語法 (Annotation Syntax)
為了讓 AI 更精準理解，建議使用以下標記：
- `🔥` 或 `[HIGHLIGHT]`: 強調顯示
- `❌` 或 `[DEL]`: 刪除此段
- `➕` 或 `[ADD]`:在此處新增
- `❓` 或 `[Q]`: 提問或確認
