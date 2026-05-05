# 實作計畫範本 (Implementation Plan Template)

> 這是 `implementation_plan.md` 的建議標準格式。強烈建議在開始編寫程式碼前，先填寫此範本，落實「Think Before Coding」原則。

---

# [Goal Description]

簡短描述問題、背景脈絡以及這次變更要達成什麼目的。

## 取捨與假設 (Trade-offs & Assumptions)
> **(Think Before Coding 核心精神)**
- **我們的假設是**：(例如：資料量不會超過 1000 筆，所以先不實作分頁)
- **為什麼不選更複雜的方案**：(說明為了貫徹 Simplicity First 而放棄的選項)
- **潛在風險**：(如果這個假設錯了，會發生什麼事？)

## User Review Required

記錄任何需要使用者審查或給予回饋的項目，例如破壞性變更 (Breaking Changes) 或重大的設計決策。使用 GitHub alerts (`> [!IMPORTANT]`) 標示。

## Open Questions

在實作前需要釐清的問題。如果不清楚，**就在這裡發問，不要靜默猜測**。

## 變更計畫 (Proposed Changes)

將檔案按組件分組（依賴項目優先）。使用 `[MODIFY]`, `[NEW]`, `[DELETE]` 標籤。

### [Component Name]

#### [MODIFY] [file basename](file:///absolute/path/to/modifiedfile)
- 修改目的...
- **外科手術檢查 (Surgical Check)**：確保不包含格式自動排版，只動與需求有關的邏輯。

#### [NEW] [file basename](file:///absolute/path/to/newfile)
- 新增目的...

## 驗證計畫 (Verification Plan)
> **(落實目標驅動執行 Goal-Driven Execution)**

我們如何驗證這些修改達到預期效果？

### 自動化化測試 (Automated Tests)
- [ ] 將執行的具體指令或測試腳本。

### 手動驗證流程 (Manual Verification)
- [ ] 步驟 1：... 預期結果：...
- [ ] 步驟 2：... 預期結果：...
