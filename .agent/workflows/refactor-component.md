---
description: 標準化元件重構流程 (分析 -> 規劃 -> 實作 -> 驗證)
---

# Refactor Component Workflow

此流程定義了將大型檔案 (如 `App.jsx`) 拆分為模組化元件的標準作業程序。

## 1. 🔍 Analysis (分析階段)

在開始寫程式碼之前，先使用 PM 與 CTO 視角進行分析。
可以使用 `/cto` 或 `/pm` 來輔助。

**關鍵問題**：

- 哪些邏輯屬於獨立的功能區塊？(e.g., Tab 內容、複雜的 UI 卡片)
- 資料流 (Props) 如何傳遞？
- 是否有重複使用的樣式或邏輯？

## 2. 📝 Planning (規劃階段)

建立 Artifacts 以確保方向正確。**所有文件必須使用繁體中文**。

1.  **Create `task.md`**: 列出重構的階段性任務 (Phase 1: Design, Phase 2: Extraction, Phase 3: Integration)。
2.  **Create `implementation_plan.md`**:
    - **目錄結構**: 定義新元件的存放位置 (e.g., `src/pages/.../components/`)。
    - **元件清單**: 列出要提取的元件名稱與 Props 定義。
    - **驗證計畫**: 定義如何驗證重構後的行為一致性。

## 3. ✂️ Extraction (提取階段)

依序提取元件，保持「小步快跑」。

1.  **建立新檔案**: 在 `components/` 目錄下建立新元件。
2.  **搬移程式碼**: 將邏輯從主檔案複製到新元件。
3.  **修復依賴**: 確保所有 import (如 `lucide-react`, `shared/`) 都正確引入。
4.  **匯出元件**: `export default ComponentName;`

## 4. 🔄 Integration (整合階段)

1.  **匯入新元件**: 在主檔案 (e.g., `App.jsx`) 中引入新元件。
2.  **替換舊程式碼**: 將原本的行內程式碼替換為元件標籤 `<Component ... />`。
3.  **移除舊定義**: 刪除主檔案中不再需要的本地變數或是舊的 component定義。

## 5. ✅ Verification (驗證階段)

1.  **編譯檢查**: 執行 `npm run build` 確保沒有語法錯誤或遺漏的變數。
2.  **功能驗證**: 手動操作 UI，確認互動行為 (Expand/Collapse, Modal, Route) 與重構前一致。
3.  **文件更新**: 更新 `walkthrough.md` 記錄變更內容。
