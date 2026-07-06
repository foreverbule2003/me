---
description: 依專案 commit workflow（清理 → 驗證 → 文件同步 → 確認 → 分主題提交）建立 git commit
argument-hint: [選填：commit 範圍或補充說明]
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git clean -ndX), Bash(git add:*), Bash(git commit:*), Bash(git rm --cached:*), Bash(npm test:*), Bash(npm run guard:*), Bash(node scripts/sync-travel-spec.mjs:*)
---

依照以下流程建立 commit（整併自 `.agent/workflows/commit.md` 原版設計與 CONTRIBUTING.md、docs/REFACTOR_GUARD.md、CHANGELOG.md 規範）：

## 步驟 0：提交前清理（Pre-commit Cleanup）

- `git clean -ndX`（dry-run）+ `git status --short` 掃描工作區
- 檢查是否有：測試用暫存檔、`.bak` 備份、API 抓取的原始資料、可重複生成的 JSON 快取
- 發現動態資料將被 commit 時：加入 `.gitignore`，已追蹤者用 `git rm --cached` 拔除
- **絕不加入**：`*serviceAccountKey*.json`、`.env`、`node_modules`、`dist/`、測試輸出

## 步驟 1：盤點變更

- `git diff`（含 untracked）逐檔了解變更內容
- `git log --oneline -10` 參考近期 commit 風格

## 步驟 2：驗證（Refactor Guard 防線，強制綠燈）

- `npm run guard` — 靜態掃描（路徑違規、React 入口接線）
- `npm test` — vitest 單元測試（僅掃 `src/**`，Playwright 在 `tests/` 另跑）
- 兩者現為綠燈基準（2026-07-06 起）。任一失敗：**先修復，不帶紅燈 commit**；確屬既有問題無法立即修復時，明確向使用者回報並取得同意
- UI/頁面變更若尚未在本次對話中驗證過，先以 dev server 或 build 確認可渲染

## 步驟 3：自動同步（Auto-Sync）

- **旅遊 spec**：若變更包含任何 `src/pages/trips/{trip}/data.js`，必須執行
  `node scripts/sync-travel-spec.mjs {trip}` 並將更新後的 `trips/{trip}/spec.md` 一起提交
- **TODO 歸檔**：檢查根目錄 `TODO.md`，將已完成 `[x]` 項目移至「✅ 已完成歸檔」區塊並附日期

## 步驟 4：文件同步檢查（缺了就先補齊再 commit）

| 變更類型 | 需同步的文件 |
| --- | --- |
| 新功能 / 重大重構 / 移除功能 | `CHANGELOG.md`（Keep a Changelog 版本區塊，日期用今天） |
| 架構、目錄結構、資料流變更 | `docs/ARCHITECTURE.md`、`docs/SITEMAP.md`、`docs/CB_DATA_FLOW.md`（CB 相關時） |
| 新增/修改共用元件 | `docs/COMPONENTS.md` |
| 使用者可見的功能變動 | `docs/FEATURES.md` |
| 旅遊頁面架構或模板變更 | `trips/TRIP_STYLE_GUIDE.md` |
| 新增 npm script 或開發流程變更 | `README.md`、`CONTRIBUTING.md` |
| Firestore collection 或規則變更 | `firebase/firestore.rules`（並提醒需手動 `firebase deploy --only firestore:rules`） |
| 純 typo / 樣式微調 / 資料內容更新 | 免同步 |

## 步驟 5：提交前確認（Critical Stop）

- 自我防呆三問：每行變更都能追溯到需求嗎？有誤觸無關的歷史包袱嗎？清掉孤兒變數/匯入了嗎？
- **向使用者摘要「將提交什麼」並停下等確認**，除非使用者已在本次對話明確授權直接提交（例如指示「commit 後不用再問」）

## 步驟 6：提交

- commit message：`type(scope): 中文描述`
  - 例：`feat(2026-tokyo): 優化花費總覽介面與資料修正`
  - type：`feat` / `fix` / `refactor` / `style` / `docs` / `chore`
  - scope：受影響模組或旅程代碼（`trips`、`tokyo-2026`、`cb`、`guard`…）
  - 描述聚焦「為什麼改」，繁體中文
- 變更橫跨多個不相關主題時拆成多個 commit；文件同步與對應程式碼放同一個 commit
- **不要 push**，除非使用者明確要求（push 到 main 即觸發自動部署）

## 步驟 7：回報

回報各 commit 的 hash、訊息、驗證結果（guard/test）、已同步的文件清單；若有值得沉澱的教訓，提醒寫入 `tasks/lessons.md`。

使用者補充說明（若有）：$ARGUMENTS
