# 🔍 Workflow 全面體檢報告

> **日期**：2026-07-06
> **範圍**：repo 內全部 workflow（AI 指令、提交/文件、測試品質、CB 資料管線、部署、旅遊內容、知識管理）
> **狀態**：檢視完成，修正項目待決策

---

## 總覽：七大 Workflow 現況

| # | Workflow | 現況 | 健康度 |
|---|----------|------|:------:|
| A | AI 指令集（`.agent/workflows/` 33 個） | **孤兒**：為前代工具 (Antigravity/Cursor) 設計，Claude Code 讀不到 | 🔴 |
| B | 提交與文件同步 | 規範存在但散落四處，實際執行有斷層（CHANGELOG 斷層 2 個月） | 🟠 |
| C | 測試與品質防線 | `npm test` 與 `npm run guard` **紅燈常態化**，防線失效 | 🔴 |
| D | CB 資料管線（雙軌） | 雲端軌 (GH Actions) 每日自動跑；本地軌 Windows-only，與現用 macOS 斷層 | 🟠 |
| E | 部署 | push main → GitHub Pages 自動部署，健康 | 🟢 |
| F | 旅遊內容產製 | scaffold v4.0 已現代化；缺首頁選單自動註冊 | 🟡 |
| G | 知識管理 | lessons/second-brain/journal 設計完整但閒置；與 Claude 內建記憶並存 | 🟡 |

---

## A. AI 指令 Workflow（最大宗遺產）

### 現況

- `.agent/workflows/` 有 **33 個**指令定義（menu/sync/commit/deploy/doc-check/advisor/pm/cto/designer/sync-cb/fetch-history/generate-travel-book/…），是先前為 Antigravity 設計的完整體系。
- `teaching/WORKFLOW_GUIDE.md` 的日常流程（「開始先 Sync，結束要 Deploy；改完就 Commit，上線前 Doc-check」）全部指向這套指令。
- `.cursorrules` 亦為前代工具而寫（Gemini 委派策略、`task_boundary` 工具）。
- `teaching/ANTIGRAVITY_GUIDEBOOK.md` 要求的 `.gemini/GEMINI.md` **已不存在**。

### 問題

1. Claude Code 只讀 `.claude/commands/`，目前僅有今日新建的 `/commit` 一個指令；其餘 32 個設計全數失效。
2. 新版 `/commit` 與原版 `.agent/workflows/commit.md` 相比，**缺了**：提交前清理（動態資料/快取防呆 + `git clean -ndX`）、TODO.md 已完成項歸檔、旅遊 `data.js` 變更時自動跑 `sync-travel-spec`、Second-Brain 同步提醒、提交前用戶確認的 Critical Stop。原版則缺 guard/test 驗證與 CHANGELOG 檢查（在 doc-check 才有）。兩版需要合併。

### 建議

- **P0**：合併原版步驟到 `.claude/commands/commit.md`（cleanup、TODO 歸檔、trip spec 自動同步、用戶確認）。
- **P1**：把仍有價值的指令遷移到 `.claude/commands/`。優先級建議：
  - 高：`doc-check`、`deploy`（= push，因 push 即部署）、`sync`、`journal`、`capture`、`cleanup`
  - 中：`sync-cb`、`fetch-history`、`generate-travel-book`（多為既有 npm/node 指令的包裝）
  - 低/淘汰：`run`/`stop`/`restart`/`build`/`preview`/`test`（Claude Code 內建能力或一句話可達）、`pm`/`cto`/`designer`/`advisor`/`help`（前代多角色體系，可改用 Claude 內建 agents 或簡化）
- **P1**：遷移後更新 `teaching/WORKFLOW_GUIDE.md` 指向新指令，`.cursorrules`/`ANTIGRAVITY_GUIDEBOOK.md` 標註 legacy 或歸檔。

---

## B. 提交與文件同步 Workflow

### 現況

規範分散在四處：`CONTRIBUTING.md`（conventional commits、push 前 npm test）、`docs/REFACTOR_GUARD.md`（三道防線）、`.agent/workflows/doc-check.md`（8+2+2 檢查清單）、`CHANGELOG.md`（Keep a Changelog）。

### 問題

1. **CHANGELOG 斷層**：2.5.0 (2026-05-12) → 2.6.0 (2026-07-06) 之間約 2 個月、數十個 commit（整個東京行程開發期）沒有任何版本記錄。
2. **TODO 雙軌**：根目錄 `TODO.md`（最後更新 2026-06-08，內容近乎全空）與 `tasks/todo.md`（/advisor 的 checkpoint，從未使用）並存，職責不清。
3. `docs/FEATURES.md`、`docs/SITEMAP.md` 等 doc-check 清單指定的文件，實際同步頻率不明（抽查顯示落後於程式碼）。
4. 無 pre-commit hook（無 husky）——所有防線都靠自覺或 AI 指令執行。

### 建議

- **P0**：`/commit` 指令補上 doc-check 完整清單（已部分完成，需合併 A-2）。
- **P1**:決定 TODO 單軌制（建議：保留根目錄 `TODO.md` 作為 backlog，`tasks/` 併入或歸檔）。
- **P2**：CHANGELOG 補記 5/12–7/6 的重大變更（tokyo 行程完工、PDF 小書機制）為一個彙總版本（如 2.5.5）。

---

## C. 測試與品質防線（紅燈常態化）

### 現況與問題

1. **`npm test` 永遠紅**：vitest 會誤掃 `tests/*.spec.js`（Playwright 專用檔），3 個 suite 必定失敗（17 個單元測試其實全過）。任何人看到紅燈都會習慣性忽略 → 防線失效。
2. **`npm run guard` 永遠 exit 1**：check-datapath 對既有頁面（tokyo/cebu/prototypes 及 new-trip.js 模板）的 `/me/` 絕對路徑警告。但 vite `base: "/me/"` 下這些寫法實際上是刻意且正確的 → 規則與現實脫節。
3. CONTRIBUTING 要求「push 前 npm test」，但紅燈常態下此要求名存實亡。

### 建議

- **P0**：vitest 設定 `exclude: ["tests/**"]`（或 include 限定 `src/**/*.test.*`），讓 `npm test` 回到綠燈。
- **P0**：guard 的絕對路徑規則加白名單（`/me/` 為 vite base，屬合法），或改為僅警告不影響 exit code；讓 exit code 重新有意義。
- **P1**：綠燈後，把 `npm run guard && npm test` 正式納入 `/commit` 的強制步驟（目前只能「跑了但容忍紅燈」）。

---

## D. CB 資料管線（雙軌）

### 現況

- **雲端軌（健康）**：GitHub Actions `daily-hot-cb.yml`（台北 13:40）與 `daily-cb-history.yml`（台北 14:15）每個交易日自動跑，直寫 Firestore。
- **本地軌（Windows-only）**：`CB_Sync_Master.bat` → `xq_bridge.py`（XQ DDE）→ `export_cb_json.py`；`setup_scheduler.ps1` 排程於週一 10:00 / 週五 14:00，硬編碼路徑 `c:\Users\forev\myDev\me`。

### 問題

1. **平台斷層**：目前開發機是 macOS，本地軌（DDE 依賴 Windows + XQ 全球贏家）在這台機器完全跑不了。文件未標註此前提。
2. **文件與實際不一致**：`docs/CB_DATA_FLOW.md`（最後更新 2026-01-30）只描述本地 Task Scheduler 週一/週五排程，未涵蓋後來的 GitHub Actions 每日雙軌。
3. Actions 的健康監控依賴手動查看 GitHub —— 失敗時無通知管道（可用 workflow 的 failure notification 或定期 `gh run list` 檢查）。

### 建議

- **P1**：更新 `CB_DATA_FLOW.md`：補 GitHub Actions 軌、標註本地軌的 Windows 前提與適用時機。
- **P2**：建立 `/check-cb-pipeline` 指令（`gh run list` 檢查兩條 Actions 近況 + Firestore 資料新鮮度）。

---

## E. 部署 Workflow（健康）

- push main → `deploy.yml` → build（Firebase env secrets）→ GitHub Pages，設計簡潔且與 `/deploy` 指令語意一致（deploy = push）。
- 小缺口：`firebase/firestore.rules` 的部署（`firebase deploy --only firestore:rules`）未見於任何文件或指令——規則變更時容易漏部署。建議記入 doc-check 安全性段落。

---

## F. 旅遊內容 Workflow

### 現況

`npm run new-trip` (v4.0，今日改版) → 填 `data.js` → `sync-travel-spec.mjs` 同步 spec → `generate-travel-pdf.mjs` 產離線小書 → PWA (manifest/sw)。scaffold 已與 2026-tokyo 架構對齊並實測通過。

### 缺口

1. **首頁選單未自動註冊**：`src/views/TripsView.jsx` 硬編碼旅程清單，new-trip 產完頁面後首頁看不到入口（CHANGELOG 2.4.0 也記載當時是手動加的）。
2. 原版 commit workflow 的「data.js 變更 → 自動 sync spec」步驟尚未納入新 `/commit`（見 A-2）。
3. `travel-book.html`（sw.js 快取目標）由 generate-travel-pdf 產生，但兩者關係只存在於程式碼中，未文件化。

### 建議

- **P1**：new-trip.js 增加 TripsView.jsx 自動插入選單項（或改為由設定檔驅動選單）。
- **P2**：TRIP_STYLE_GUIDE 補「離線小書」一節（travel-book.html ↔ manifest/sw 關係）。

---

## G. 知識管理 Workflow

### 現況

- `knowledge/`（7 篇思維模型/準則）、`tasks/lessons.md`（教訓紀錄，空模板）、`tasks/todo.md`（advisor checkpoint，未用）、`/journal`、`/sync-to-brain`（Second-Brain 同步）。

### 問題

設計完整但全數閒置（lessons.md 建立至今零筆記錄）；且與 Claude Code 內建的 memory 機制重疊。

### 建議

- **P2**：二擇一——(a) 放棄 repo 內雙軌，教訓/偏好交給 Claude memory；(b) 保留 `lessons.md` 作為跨工具的持久紀錄，並在 `/commit` 或新 `/retro` 指令中加入寫入提醒。建議 (b)，因 repo 內文件不綁定特定 AI 工具。

---

## 修正優先序總表

| 優先 | 項目 | 影響 | 狀態 |
|------|------|------|------|
| P0-1 | vitest exclude Playwright specs | `npm test` 回綠，防線復活 | ✅ 2026-07-06 |
| P0-2 | guard 絕對路徑規則白名單/降級 | `npm run guard` exit code 重新有意義 | ✅ 2026-07-06 |
| P0-3 | `/commit` 合併原版步驟（cleanup、TODO 歸檔、trip spec 同步、用戶確認） | 補齊「設計好的 commit workflow」 | ✅ 2026-07-06 |
| P1-1 | 遷移高價值指令至 `.claude/commands/`（doc-check、deploy、sync、journal、capture、cleanup） | 33 個孤兒 workflow 中的精華復活 | ✅ 2026-07-06 |
| P1-2 | new-trip 自動註冊首頁選單 | scaffold 最後一哩 | ✅ 2026-07-06 |
| P1-3 | 更新 CB_DATA_FLOW.md（Actions 雙軌 + Windows 前提） | 文件與現實一致 | ✅ 2026-07-06 |
| P1-4 | TODO 單軌化（根目錄為準）；WORKFLOW_GUIDE 更新指向新指令 | 消除雙軌混亂 | ✅ 2026-07-06 |
| P2 | CHANGELOG 補斷層、firestore rules 部署文件化、/check-cb-pipeline、離線小書文件、lessons.md 活化、TripsView 北海道死連結處理 | 品質完善 | ⬜ 待辦 |
