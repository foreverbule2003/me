---
description: 依專案 commit workflow（規則寫回 → 清理 → 驗證 → 文件同步 → 壞味道 → 確認 → 分主題提交）建立 git commit
argument-hint: [選填：commit 範圍或補充說明]
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git clean -ndX), Bash(git add:*), Bash(git commit:*), Bash(git rm --cached:*), Bash(npm test:*), Bash(npm run guard:*), Bash(node scripts/sync-travel-spec.mjs:*), Bash(node scripts/sync-memory-backup.mjs)
---

依照以下流程建立 commit（整併自 `.agent/workflows/commit.md` 原版設計與 CONTRIBUTING.md、docs/REFACTOR_GUARD.md、CHANGELOG.md 規範；步驟 0、6、7 與步驟 8 的批准顆粒度條款移植自 second-brain 的 `/commit`）：

## 步驟 0：這一輪談定的規則，寫回定義它的檔

**先做這一步，趁還記得這一輪談過什麼。** 條件是：這一輪在對話裡改了規則或做法——某個欄位怎麼填、流程哪一步、什麼以後不做了。沒有就跳過。

**寫回定義它的那份檔，不是只改結果**：

- 改了某支指令產出的東西 → 改 `.claude/commands/<那支>.md`
- 改了旅程頁的模板或版型慣例 → 改 `trips/TRIP_STYLE_GUIDE.md`
- 改了 guard／測試的判準 → 改 `docs/REFACTOR_GUARD.md`
- 開發流程的底線 → 改 `CONTRIBUTING.md`（本 repo 沒有 CLAUDE.md）

改完 `grep` 一次，確認沒有別的檔還在引用舊名或舊規則。**同一個流程不留兩份檔**——舊的那份改成一行指向正本（例：`.agent/workflows/commit.md`），不要放著分岔。

**同時要找出被這次裁定推翻的舊條文**——推翻的標成推翻並註明日期，不要靜靜蓋掉。

**只改結果不改規則 = 下次跑那支指令會照舊規則長回來。** 本 repo 指令與 workflow 密集（`.claude/commands/` + `.agent/workflows/`），這是最容易漏的一步。

## 步驟 1：提交前清理（Pre-commit Cleanup）

- `git clean -ndX`（dry-run）+ `git status --short` 掃描工作區
- 檢查是否有：測試用暫存檔、`.bak` 備份、API 抓取的原始資料、可重複生成的 JSON 快取
- 發現動態資料將被 commit 時：加入 `.gitignore`，已追蹤者用 `git rm --cached` 拔除
- **絕不加入**：`*serviceAccountKey*.json`、`.env`、`node_modules`、`dist/`、測試輸出
- 實體垃圾檔要刪除前先徵得同意

## 步驟 2：盤點變更

- `git diff`（含 untracked）逐檔了解變更內容
- `git log --oneline -10` 參考近期 commit 風格

## 步驟 3：驗證（Refactor Guard 防線，強制綠燈）

- `npm run guard` — 靜態掃描（路徑違規、React 入口接線、旅程欄位契約）
- `npm test` — vitest 單元測試（僅掃 `src/**`，Playwright 在 `tests/` 另跑）
- 兩者現為綠燈基準（2026-07-06 起）。任一失敗：**先修復，不帶紅燈 commit**；確屬既有問題無法立即修復時，明確向使用者回報並取得同意
- UI/頁面變更若尚未在本次對話中驗證過，先以 dev server 或 build 確認可渲染

## 步驟 4：自動同步（Auto-Sync）

- **旅遊 spec**：若變更包含任何 `src/pages/trips/{trip}/data.js`，必須執行
  `node scripts/sync-travel-spec.mjs {trip}` 並將更新後的 `trips/{trip}/spec.md` 一起提交
- **TODO 歸檔**：檢查根目錄 `TODO.md`，將已完成 `[x]` 項目移至「✅ 已完成歸檔」區塊並附日期

## 步驟 5：文件同步檢查（缺了就先補齊再 commit）

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

## 步驟 6：壞味道掃描（每次 commit 都做，只看本次 diff）

**掃的是本次要提交的文字本身，不是檔案全文**——對本次變更**新增的行**逐項過下面六格。

**抓到就當場改，不是報告完照樣提交。** 診斷完不動手比沒診斷更糟。

| # | 壞味道 | 怎麼認 |
|---|---|---|
| 1 | **AI 造字** | 這個詞出現在他讀過的檔案裡、或他自己說過嗎？有一個是我造的就不合格。慣犯：閘門、沉底、落地／落檔、執法、兜底、暫存區、規則卡。**散文與程式碼註解／docstring 都要看**，不是只掃 `.md`。**2026-09-16 起有 hook 擋在上游**：`.claude/hooks/check-ai-coinage.mjs`，Write/Edit 寫進 `docs/`、`knowledge/`、`teaching/`、`tasks/`、`trips/`、`.claude/commands/`、`.agent/` 與根目錄四份 `.md` 時當場攔。**改清單要同步兩處**——那支腳本的 `COINAGE` 與這一格。這一格改成複查：hook 放行的（引用原話、程式碼區塊、清單本身）人再看一眼 |
| 2 | **冗餘** | 新寫的這段，前面是不是已經有一段在講同一個動作？同一件事在同一份檔案不准講兩次 |
| 3 | **邏輯不通** | 三種形狀：①同一句能讀成兩種結果 ②用 AND 串了一個量不到的條件，整條規則因此永遠不成立 ③方向相反（該亮時暗、該暗時亮） |
| 4 | **幻覺** | 每個數字、每句引文，句子裡有沒有**當場的出處**（檔名:行號、URL、這一輪的工具結果）？沒有就掛 ⚠️未查證，沒有第三種寫法 |
| 5 | **主語是 AI** | 給人讀的檔（README、docs/、CHANGELOG、旅程頁）裡有沒有 AI 的修訂日誌、自我檢討、道歉、「我原本以為」 |
| 6 | **過期的警語** | 本次 diff 及其周邊還掛著的 ⚠️，是不是已經在別處結清了 |

**新形狀不列成一格**：唸到覺得怪但六格都套不上時，寫進本次的 commit 訊息，不改這張表。同一個形狀在 commit 訊息裡出現三次，才提議升格成新的一格。

**輸出一行給他看，用白話，不准用代號**——兩種寫法擇一：

- `壞味道：掃過 <N> 個檔，抓到 <M> 處，已改：<一句話說改了什麼>`
- `壞味道：掃過 <N> 個檔，沒抓到`

**沒有這一行 = 沒跑這一步。**

## 步驟 7：記憶備份刷新（每次必跑）

Claude Code 的 auto-memory（`~/.claude/projects/-Users-tim-myDev-me/memory/`）在 repo 外、不受版控、機器一清就沒，這步把它鏡像進 repo 隨 commit 保存：

```bash
node scripts/sync-memory-backup.mjs
```

- 單向鏡像進 `.claude/memory-backup/`，**只鏡像、不 commit**；找不到來源或來源為空會中止且不刪備份（防空來源清空快照）
- 跑完看 `git status .claude/memory-backup/`：**有變更就單獨 commit 為 `chore(memory-backup): 更新 auto-memory 快照`**，不與本次實質變更混同一個 commit（乾淨 history）；無變更跳過

## 步驟 8：提交前確認（Critical Stop）

- 自我防呆三問：每行變更都能追溯到需求嗎？有誤觸無關的歷史包袱嗎？清掉孤兒變數／匯入了嗎？
- **向使用者摘要「將提交什麼」並停下等確認**，除非使用者已在本次對話明確授權直接提交（例如指示「commit 後不用再問」）
- **批准必須是對「要提交嗎」這一問的回應**：先給 diff 摘要，然後問，然後停。他在別的問題上回的「go／好／對」不算批准——**顆粒度要對齊被問的那一問**
- **`/commit` 是流程入口，不是提交批准**：打了 `/commit` 仍要走完本節的問答，因為那個字出現時 diff 摘要還不存在，他不可能批准一份還沒生出來的東西

## 步驟 9：提交

- commit message：`type(scope): 中文描述`
  - 例：`feat(2026-tokyo): 優化花費總覽介面與資料修正`
  - type：`feat` / `fix` / `refactor` / `style` / `docs` / `chore`
  - scope：受影響模組或旅程代碼（`trips`、`tokyo-2026`、`cb`、`guard`…）
  - 描述聚焦「為什麼改」，繁體中文
- 變更橫跨多個不相關主題時拆成多個 commit；文件同步與對應程式碼放同一個 commit
- **不要 push**，除非使用者明確要求（push 到 main 即觸發自動部署）

## 步驟 10：回報

回報各 commit 的 hash、訊息、驗證結果（guard/test）、壞味道掃描那一行、已同步的文件清單；若有值得沉澱的教訓，提醒寫入 `tasks/lessons.md`。

使用者補充說明（若有）：$ARGUMENTS
