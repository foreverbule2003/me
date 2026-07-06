---
description: 依專案 commit workflow（測試 → 文件同步 → 分主題提交）建立 git commit
argument-hint: [選填：commit 範圍或補充說明]
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git add:*), Bash(git commit:*), Bash(npm test:*), Bash(npm run guard:*)
---

依照以下流程建立 commit（依據 CONTRIBUTING.md、docs/REFACTOR_GUARD.md、CHANGELOG.md 的專案規範）：

## 1. 盤點變更

- `git status --short` 與 `git diff`（含 untracked 檔案）了解所有變更
- `git log --oneline -10` 參考近期 commit 風格

## 2. 驗證（Refactor Guard 防線）

- 執行 `npm run guard`（靜態掃描：硬編碼路徑、關鍵 DOM）
- 執行 `npm test`（vitest）
- 若涉及 UI/頁面變更且尚未在本次對話中驗證過，需先以 dev server 或 build 確認可正常渲染
- 任一步失敗：先修復或明確向使用者回報，不要帶著紅燈 commit

## 3. 文件同步檢查（缺了就先補齊再 commit）

| 變更類型 | 需同步的文件 |
| --- | --- |
| 新功能 / 重大重構 / 移除功能 | `CHANGELOG.md`（Keep a Changelog 格式，新增版本區塊，日期用今天） |
| 架構、目錄結構、資料流變更 | `docs/ARCHITECTURE.md`、`docs/SITEMAP.md` |
| 新增/修改共用元件 | `docs/COMPONENTS.md` |
| 旅遊頁面架構或模板變更 | `trips/TRIP_STYLE_GUIDE.md` |
| 新增 npm script 或開發流程變更 | `README.md`、`CONTRIBUTING.md` |
| 純 typo / 樣式微調 / 資料內容更新 | 免同步 |

## 4. 提交

- commit message 格式：`type(scope): 中文描述`
  - 例：`feat(2026-tokyo): 優化花費總覽介面與資料修正`
  - type：`feat` / `fix` / `refactor` / `style` / `docs` / `chore`
  - scope：受影響模組或旅程代碼（`trips`、`tokyo-2026`、`agent`、`cb`…）
  - 描述聚焦「為什麼改」，繁體中文
- 變更橫跨多個不相關主題時拆成多個 commit；文件同步與對應程式碼放同一個 commit
- 禁止加入：機密檔（`*serviceAccountKey*.json`、`.env`）、測試輸出、暫存檔、`node_modules`
- **不要 push**，除非使用者明確要求

## 5. 回報

完成後回報各 commit 的 hash、訊息，以及測試/文件同步的執行結果。

使用者補充說明（若有）：$ARGUMENTS
