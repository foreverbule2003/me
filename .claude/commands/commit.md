---
description: 依專案 commit workflow（規則寫回 → 清理 → 驗證 → 文件同步 → 壞味道 → 確認 → 分主題提交）建立 git commit
argument-hint: [選填：commit 範圍或補充說明]
allowed-tools: Bash(git status:*), Bash(git diff:*), Bash(git log:*), Bash(git clean -ndX), Bash(git add:*), Bash(git commit:*), Bash(git rm --cached:*), Bash(npm test:*), Bash(npm run guard:*), Bash(node scripts/check-doc-sync.mjs:*), Bash(node scripts/check-smells.mjs:*), Bash(node scripts/sync-travel-spec.mjs:*), Bash(node scripts/sync-memory-backup.mjs)
---

依照以下流程建立 commit。各步驟當初為什麼這樣訂，收在 `docs/COMMIT_RATIONALE.md`，想改某一步時才翻。

## 步驟 0：這一輪談定的規則，寫回定義它的檔

**先做這一步，趁還記得這一輪談過什麼。** 條件是：這一輪在對話裡改了規則或做法——某個欄位怎麼填、流程哪一步、什麼以後不做了。沒有就跳過。

**寫回定義它的那份檔，不是只改結果**：

- 改了某支指令產出的東西 → 改 `.claude/commands/<那支>.md`
- 改了旅程頁的模板或版型慣例 → 改 `trips/TRIP_STYLE_GUIDE.md`
- 改了 guard／測試的判準 → 改 `docs/REFACTOR_GUARD.md`
- 開發流程的底線 → 改 `CONTRIBUTING.md`（本 repo 沒有 CLAUDE.md）

改完 `grep` 一次，確認沒有別的檔還在引用舊名或舊規則。**同一個流程不留兩份檔**——舊的那份改成一行指向正本（例：`.agent/workflows/commit.md`），不要放著分岔。

**同時要找出被這次裁定推翻的舊條文**——推翻的標成推翻並註明日期，不要靜靜蓋掉。

## 步驟 1：提交前清理

- `git clean -ndX`（dry-run）+ `git status --short` 掃描工作區
- 檢查是否有：測試用暫存檔、`.bak` 備份、API 抓取的原始資料、可重複生成的 JSON 快取
- 發現動態資料將被 commit 時：加入 `.gitignore`，已追蹤者用 `git rm --cached` 拔除
- **絕不加入**：`*serviceAccountKey*.json`、`.env`、`node_modules`、`dist/`、測試輸出
- 實體垃圾檔要刪除前先問（見〈必須停下來等回答的點〉）

## 步驟 2：盤點變更

- `git diff`（含 untracked）逐檔了解變更內容
- `git log --oneline -10` 參考近期 commit 風格

## 步驟 3：驗證（強制綠燈）

- `npm run guard` — 靜態掃描（路徑違規、React 入口接線、旅程欄位契約、孤兒腳本）
- `npm test` — vitest 單元測試（僅掃 `src/**`，Playwright 在 `tests/` 另跑）
- 兩者都必須綠燈。任一失敗：**先修復，不帶紅燈 commit**；確屬既有問題無法立即修復時，停下來問（見〈必須停下來等回答的點〉）
- UI/頁面變更若尚未在本次對話中驗證過，先以 dev server 或 build 確認可渲染

## 步驟 4：自動同步

- **旅遊 spec**：若變更包含任何 `src/pages/trips/{trip}/data.js`，必須執行
  `node scripts/sync-travel-spec.mjs {trip}` 並將更新後的 `trips/{trip}/spec.md` 一起提交
- **TODO 歸檔**：檢查根目錄 `TODO.md`，將已完成 `[x]` 項目移至「✅ 已完成歸檔」區塊並附日期

## 步驟 5：文件同步檢查（缺了就先補齊再 commit）

```bash
node scripts/check-doc-sync.mjs
```

- 每次都跑。**沒有它印出的「文件同步：N 組配對全過」那一行 = 沒跑這一步。**
- 它判的配對：程式或排程改了 → `CHANGELOG.md`；CB 資料管線改了 → `docs/CB_DATA_FLOW.md`；npm scripts 增刪改 → `README.md`；Vite 入口頁增刪 → `docs/SITEMAP.md`；Claude 指令增刪 → `README.md`；旅程 `data.js` 改了 → 該旅程的 `spec.md`。動到 `firestore.rules` 另印一行部署提醒。
- 沒過就照它列的補文件，補完再跑到全過。確屬免同步（純 typo、資料內容更新）時，在 diff 摘要寫一行「文件同步例外：<配對>——<理由>」。**要加配對改那支腳本，不要在這裡補清單。**
- 下表是機器判不了的部分，依變更類型自己對一遍：

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

## 步驟 6：壞味道掃描（每次都跑，只看本次新增的行）

```bash
node scripts/check-smells.mjs
```

- 六種：#1 造字、#2 冗餘、#3 邏輯不通、#4 幻覺、#5 主語是 AI、#6 過期的警語。
- 腳本判三種：**#1 造字**（用 Bash 寫入的檔、既有檔的新增行都會掃；詞放在「」裡不算）、**#5 主語是 AI**、**#6 過期的警語**（只把 ⚠️ 列出來，是不是已經結清要自己判）。造字清單與掃描範圍的正本在 `.claude/hooks/coinage-list.mjs`，寫檔時的 hook 也讀這份，要加詞改那裡。
- **抓到就當場改，不是報告完照樣提交。** 改完再跑一次。
- 機器判不了的三種，自己讀過去：

| # | 壞味道 | 怎麼認 |
|---|---|---|
| 2 | **冗餘** | 新寫的這段，前面是不是已經有一段在講同一個動作？同一件事在同一份檔案不准講兩次 |
| 3 | **邏輯不通** | 三種形狀：①同一句能讀成兩種結果 ②用 AND 串了一個量不到的條件，整條規則因此永遠不成立 ③方向相反（該亮時暗、該暗時亮） |
| 4 | **幻覺** | 每個數字、每句引文，句子裡有沒有**當場的出處**（檔名:行號、URL、這一輪的工具結果）？沒有就掛 ⚠️未查證，沒有第三種寫法 |

- 腳本不掃的地方也要看：`tools/`、`scripts/`、`src/` 的程式碼註解與檔頭說明。
- 唸到覺得怪、但六種都套不上時，寫進本次的 commit 訊息，不改這張表。同一個形狀在 commit 訊息裡出現三次，才提議加成第七種。
- **輸出一行給他看，用白話，不准用代號**——兩種寫法擇一：
  - `壞味道：掃過 <N> 個檔，抓到 <M> 處，已改：<一句話說改了什麼>`
  - `壞味道：掃過 <N> 個檔，沒抓到`
- **沒有這一行 = 沒跑這一步。**

## 步驟 7：記憶備份刷新（每次必跑）

```bash
node scripts/sync-memory-backup.mjs
```

- 把 auto-memory 單向鏡像進 `.claude/memory-backup/`，**只鏡像、不 commit**；找不到來源或來源為空會中止且不刪備份
- 跑完看 `git status .claude/memory-backup/`：**有變更就單獨 commit 為 `chore(memory-backup): 更新 auto-memory 快照`**，不與本次實質變更混同一個 commit；無變更跳過

## 步驟 8：提交前確認

- 自我檢查三問：每行變更都能追溯到需求嗎？有誤觸無關的歷史包袱嗎？清掉孤兒變數／匯入了嗎？
- 照〈diff 摘要格式〉給摘要，問「要 commit 嗎？（只寫本地，不 push）」，**然後停**，等他回答這一問（見〈必須停下來等回答的點〉）。

## 步驟 9：提交

- commit message：`type(scope): 中文描述`
  - 例：`feat(2026-tokyo): 優化花費總覽介面與資料修正`
  - type：`feat` / `fix` / `refactor` / `style` / `docs` / `chore`
  - scope：受影響模組或旅程代碼（`trips`、`tokyo-2026`、`cb`、`guard`…）
  - 描述聚焦「為什麼改」，繁體中文
- 變更橫跨多個不相關主題時拆成多個 commit；文件同步與對應程式碼放同一個 commit
- **`git add` 點名檔案**：`git add <檔1> <檔2> …`，不用 `git add .`／`git add -A`。點名的清單就是 diff 摘要列出的那些檔
- **不要 push**——push 是 `/deploy` 的事，要另外問（push 到 main 即觸發自動部署）

## 步驟 10：回報

回報各 commit 的 hash、訊息、驗證結果（guard/test）、文件同步與壞味道那兩行、已同步的文件清單；若有值得記下的教訓，提醒寫入 `tasks/lessons.md`。

## diff 摘要格式

步驟 8 問之前給的摘要：

```
<commit 訊息第一行>
  <檔案>：<改了什麼，一句>
  （文件同步例外：<配對>——<理由>；沒有就不寫這行）
  （記憶快照另一個 commit：有／無）
壞味道：<步驟 6 那一行>
要 commit 嗎？（只寫本地，不 push）
```

拆成多個 commit 時，每個 commit 各一段。

## 必須停下來等回答的點

- **commit 之前**（步驟 8）：給 diff 摘要、問「要 commit 嗎？（只寫本地，不 push）」、停。
  - 批准必須是回答這一問。他在別的問題上回的「go／好／對」不算。
  - 打 `/commit`、或我自己叫出 `/commit`，都不算批准。
  - 他描述之後流程的話（「等推上去以後…」「commit 完再…」）是計畫，不算批准。
  - 不問「要提交嗎」：「提交」也能讀成送到遠端。
- **push 之前**：push 不屬於這支指令，走 `/deploy`，另外問。
- **刪實體檔案之前**（步驟 1）。
- **guard／test 紅燈且修不了時**（步驟 3）：回報失敗內容，問要不要帶著提交。

使用者補充說明（若有）：$ARGUMENTS
