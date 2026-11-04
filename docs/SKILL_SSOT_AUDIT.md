# 斜線指令與 skill 共用盤點（SSOT）

盤點日：2026-11-04。只讀盤點，沒有改任何檔、沒有建 symlink。

範圍：

- me：`.claude/commands/*.md`（10 支；`ui-draft.md` 盤點時已被另一個 session 移除，改走共用 skill）
- second-brain（下稱 SB）：`.claude/commands/*.md`（47 支；`site-ui-jud.md` 已移除）、`.claude/skills/*/`（13 支）、`.claude/templates/`（7 份）、`.claude/shared-skills/`（2 支）
- 使用者層：`~/.claude/commands/`（1 支）、`~/.claude/skills/`（`archify`、`minimax-h3-colab`、2 個 symlink；`synced/` 只列）
- 兩邊都排除 `.claude/worktrees/`

判讀依據是逐支讀內容（長檔讀前段與步驟，SB 投資類指令讀到能判斷跟哪些資料夾綁死為止）。

---

## 一、總表

建議欄：**共用** = 抽成單一正本、兩個 repo 都叫得到；**搬到使用者層** = 不需要各 repo 的專屬內容，直接放 `~/.claude/`；**保持各自** = 兩邊都有但不該合；**只留一邊** = 只有一邊有，也只該在那邊。

### 1-1 兩邊各寫一份（同名或同功能）

| 名稱 | 在哪幾處 | 建議 | 理由 |
| --- | --- | --- | --- |
| `commit` | me 指令、SB 指令 | 共用（最後做） | 骨架與壞味道表幾乎一字不差，但批准問句、推送、紅燈政策有直接衝突，要先裁定 |
| `capture` | me 指令、SB 指令 | 共用 | 流程相同；差在條目格式，而 SB 的指令已經跟自己 `TODO.md` 檔頭的格式脫節 |
| `journal` | me 指令、SB 指令 | 共用 | 五個分類一樣；差在要對照的文件與「可複用性掃描」的去向 |
| `sync`（me）／`pull`（SB） | me 指令、SB 指令 | 共用（低優先） | 都是安全同步遠端；差在 rebase 或 merge、要不要順便 push |
| `ui-draft` | 已在 SB `shared-skills/` + `~/.claude/skills/` symlink | 已共用 | 另一個 session 2026-11-04 完成；me 舊指令已移除 |
| `site-ui-jud` | 已在 SB `shared-skills/` + symlink | 已共用 | 同上 |
| `editor` | SB skill、claude.ai 上傳副本（me 目前叫得到的就是這份） | 共用 | 規則不綁 repo；現在是兩份正本，靠 SB `/commit` 提醒手動上傳 |
| 造字清單（非指令，`/commit` 依賴） | me `.claude/hooks/coinage-list.mjs`、SB `scripts/python/hooks/check_ai_coinage.py` | 共用（`commit` 的前置） | 已分岔：me 18 個詞，SB 31 個（兩支檔的 `COINAGE` 實數），SB 後加的「判得出」「拿到料」等 me 都沒有 |

### 1-2 只有一邊有，另一邊也用得到

| 名稱 | 在哪 | 建議 | 理由 |
| --- | --- | --- | --- |
| `grill` | SB 指令 | 搬到使用者層 | 只是 `mattpocock-skills:grilling` 的繁中殼，不碰任何 repo 檔 |
| `handoff` | SB skill | 共用 | 交接單流程通用；只有「喊停」條與觸發 hook 綁 SB |
| `repo-iterate` | SB skill | 共用（低優先） | 寫的是 Tim 改 repo 的習慣，不是 SB 的規則；只有「必經流程」舉例綁 SB |
| `restructure` | SB 指令 | 共用（低優先） | 文件重構流程通用；只有「歷史搬去哪」的例子綁 SB |
| `cleanup` | me 指令 | 共用（低優先） | SB `arch-review.md:85` 指向 `/cleanup`，但 SB 沒有這支，是斷掉的引用 |
| `apple-design`、`emil-design-eng`、`mobile-native` | SB skill（第三方，MIT，原文不改） | 搬到使用者層 | 純 UI 知識，me 的 React 站更常用到；不需要 repo 專屬內容 |
| `skill-template.md` | SB templates | 保持在 SB，不搬 | 已經是單一正本，me 照記憶以 SB 路徑引用；搬走反而要改 SB 多處引用 |

### 1-3 不該共用

| 名稱 | 在哪 | 建議 | 理由 |
| --- | --- | --- | --- |
| `deploy` | me | 只留一邊 | 綁 GitHub Pages 與 `deploy.yml`；SB 推上去就結束，沒有部署 |
| `doc-check` | me | 只留一邊 | 清單是 me 的文件結構（旅程 spec、`vite.config` 入口、Firestore 規則） |
| `dev` | me | 只留一邊 | 綁 `.claude/launch.json` 的 `vite-dev`；SB 是 Live Server 與 `/ipad` |
| `check-cb-pipeline` | me | 只留一邊 | 綁 me 的 GitHub Actions 與 thefew 排程 |
| `orchestrator` | `~/.claude/commands/` | 維持現狀 | 已經在使用者層，本來就是單一正本 |
| `start`、`todo`、`todo-review`、`menu` | SB | 只留一邊 | 讀 SB 的 `personal/ideas.md`、追蹤清單、戰情室、`count_command_usage.py` |
| `arch-review` | SB | 只留一邊 | 檢查項綁 Python／`.venv`／ADR／`PROJECT_ROOT` 紅線 |
| 投資研究類：`company`、`track`、`deck-study`、`earning-fetch`、`earning-check`、`drive-scan`、`ink`、`digest`、`stock-analyze`、`ma-bias`、`cb-3x-vol`、`note-draft`、`weekend-stock-review`、`update_us_stock`、`update_us_statement`、`ai-war-room`、`tw-board`、`us-board`、`topic-board` | SB | 只留一邊 | 全綁 `work/docs/research_tracker/`、`work/docs/trading/`、Sheets 與 SB 的 Python 腳本 |
| 內容產製類：`viz`、`deck`、`deck-ta-jud`、`course-ta-jud`、`web-component-refactor`、`vlog`、`storyboard`、`anim`、`xmind-review` | SB | 只留一邊 | 綁 `tools/viz/`、課程目錄、`tools/video/vlog-kit/` 等 SB 結構 |
| 收集與工具類：`collect`、`newsletter`、`inbox`、`webpdf`、`2-transcription`、`transcription2note`、`distill`、`ai-tip`、`pdf`、`md2pdf`、`qr-code`、`ipad`、`core-export`、`core-import` | SB | 只留一邊 | 都是呼叫 SB 的腳本或寫進 SB 的 `knowledge/`；`md2pdf`、`qr-code` 雖然通用，腳本只在 SB，從 me 叫也得切到 SB 跑 |
| 其餘 templates：`tracker-page`、`topic-note`、`fugle-notes`、`ink-notes`、`jud-report`、`spec-template` | SB | 只留一邊 | `jud-report` 已被共用的 `site-ui-jud`／`ui-draft` 的 `references/second-brain.md` 引用，只在 SB 用到，不用搬 |
| `archify`、`minimax-h3-colab` | `~/.claude/skills/` | 維持現狀 | 已在使用者層 |
| `synced/` 底下 13 支 | `~/.claude/skills/synced/` | 不動 | claude.ai 同步來的 |

---

## 二、建議共用的項目

### 2-1 `commit`

**共通部分**（兩邊內容幾乎相同，可進 `SKILL.md`）：

- 第一步：這一輪談定的規則寫回定義它的檔，被推翻的舊條文標推翻、不靜靜蓋掉。
- 工作區快掃：`git clean -ndX` + `git status --short`，動態產出加 `.gitignore`、已追蹤的 `git rm --cached`。
- 文件同步交給腳本判；「要加配對改腳本，不在指令裡補清單」。
- 壞味道六種、#2／#3／#4 三列表格一字不差；腳本判 #1／#5／#6；「沒有那一行 = 沒跑」；第七種的升格規則相同。
- 記憶備份鏡像，有變更另開 `chore(memory-backup)` commit。
- 先給 diff 摘要再問、然後停；別的問題上回的「好」不算批准；打 `/commit` 不算批准。
- `git add` 點名檔案；繁中 commit 訊息加 type 前綴。
- 刪實體檔案前停。

**各 repo 專屬部分**（進 `references/me.md`、`references/second-brain.md`）：

| 項目 | me | SB |
| --- | --- | --- |
| 驗證指令 | `npm run guard` + `npm test` | `check_doc_sync.py` + `pytest` |
| 文件同步腳本 | `node scripts/check-doc-sync.mjs` | `.venv/bin/python3 scripts/python/check_doc_sync.py` |
| 壞味道腳本 | `node scripts/check-smells.mjs` | `check_smells.py` |
| 記憶備份腳本 | `sync-memory-backup.mjs` | `sync_memory_backup.py` |
| 規則寫回對照表 | 指令、`TRIP_STYLE_GUIDE.md`、`REFACTOR_GUARD.md`、`CONTRIBUTING.md`（me 沒有 `CLAUDE.md`） | 指令、正本檔頭、`CLAUDE.md` |
| 自動同步 | 旅程 `spec.md`、TODO 歸檔到檔尾 | TODO 歸檔到 `work/docs/history/todo-archive.md` |
| 人工檢查表 | 變更類型 → me 的 docs 表 | TA:人、帳本數字、進場計畫兩端、產出回補規格 |
| 只有 SB 有的步驟 | — | prettier 先查舊版有沒有排過；推完解除 Artifact 監聽 |
| 沿革落點 | `docs/COMMIT_RATIONALE.md` | `knowledge/meta-evolution.md` 附錄 |

**合併前要裁定的衝突**：

1. **批准問句**：me 問「要 commit 並部署嗎？（回「只 commit」就停在本地）」，並明文禁止問「要提交嗎」（「提交」也能讀成送到遠端）；SB 問的正是「要提交嗎?」。兩邊只能留一種。
2. **不推的說法**：me 是「只 commit」，SB 是「先不推」。
3. **push 怎麼做**：me 交給 `/deploy`（含落後檢查、Actions 狀態）；SB 在 `/commit` 裡直接 push。共用後 me 那段要放 references。
4. **紅燈政策**：me guard／test 任一紅燈就擋，修不了要停下來問；SB `pytest` 改之前就壞的不擋、寫進摘要。共通規則要選一邊，或明寫成 repo 專屬。
5. **草稿頁**：SB 已定案的草稿頁直接刪；me 的比較頁保留到 Tim 說刪（`ui-draft` 沿革已記）。
6. **步驟編號**：SB 寫明「步驟編號即外部引用的 `/commit` §N，不要重排」，其他指令與 `check_doc_sync.py` 輸出都引用 §3、§4；me 是 0–10。合併後編號一定變，要一次改掉所有引用。
7. **格式**：SB 已照 `skill-template.md`（MUST／Checkpoints），me 還是舊格式。合併時一併改成模板格式。
8. **造字清單**：兩份已分岔（見 2-6），合併 `commit` 前要先處理，否則共用的壞味道規則底下仍是兩份清單。

### 2-2 `capture`

- **共通**：讀 `TODO.md` → 依輸入分到 P0／P1／P2 → 寫入 → 回報一句「已捕捉『…』至 P{n}」。
- **各 repo 專屬**：條目格式與插入位置。me 是 `- [ ] **標題**: 描述 <!-- captured -->`、放區塊底部；SB 指令寫 `[BUG]/[TASK]/[IDEA]` 標籤、放區塊頂端。
- **衝突點**：SB 的 `TODO.md` 檔頭已改成四格格式（標題／現況／下一步／紀錄），標籤只剩 `[IDEA]`、`[太太線]`，SB 的 `/capture` 沒跟上。建議共用版寫「格式照 `TODO.md` 檔頭〈條目格式〉」，格式只住在各自的 `TODO.md`；me 的 `TODO.md` 檔頭要補一段條目格式。這樣連 references 都不太需要。

### 2-3 `journal`

- **共通**：當日 `git log` → 對照 `TODO.md` 已完成 → 五類分類 → 可複用性掃描 → 明日 1–3 項建議。
- **各 repo 專屬**：me 多對照 `CHANGELOG.md`、支援指定日期；SB 多掃 `.agent/prompts/`。
- **衝突點**：可複用性掃描的去向。me 寫「複製到 Second-Brain 知識庫」，SB 寫「評估是否適用其他專案」。有了 `shared-skills` 之後，建議改成「這支指令兩邊都用得到嗎 → 提議抽到 `shared-skills/`」。

### 2-4 `sync`／`pull`

- **共通**：先看工作區、有未提交變更先問、fetch 後預覽、回報拉了幾個 commit。
- **衝突點**：me 用 `pull --rebase` 並順便 push；SB 用一般 `pull`、不 push。指令名也要選一個。另外 me 已有 SessionStart hook 開場自動同步，使用頻率低，所以排在後面。

### 2-5 `editor`

- **共通**：整支 `SKILL.md` 已經不綁 repo（只寫「專案若有 CLAUDE.md 或術語表就先讀」）。
- **各 repo 專屬**：幾乎沒有；me 沒有 `CLAUDE.md`，可在 references 寫「讀 `CONTRIBUTING.md`」。
- **衝突點**：
  - 搬到 `shared-skills/` 後，SB `check_doc_sync.py` 的 `editor_upload_hint` 判的路徑 `.claude/skills/editor/` 要改。
  - claude.ai 副本仍要手動上傳；共用後 me 這邊會改叫到 symlink 那份，claude.ai 那份只剩給網頁版對話用。
  - `restructure.md` 提到 editor 的立法史在 `knowledge/meta-evolution.md`，搬家後 `references/history.md` 要不要接手這段要決定。

### 2-6 造字清單

- **共通**：詞 → 建議替代的對照表；寫檔 hook 與 `/commit` 壞味道掃描都讀它。
- **現況**：me 的清單檔頭寫「正本只有這一份」，是指 me 內部；跨 repo 有兩份，且 SB 比 me 多十幾個詞（`報頭`、`單卡`、`兩條腿`、`判得出`、`拿到料`……），「兜底」／「兜底日期」、「執法」的建議替代也不同。
- **衝突點**：一邊是 JS、一邊是 Python。建議把詞表抽成一份 JSON 放 `shared-skills/` 旁（例如 `.claude/shared-data/coinage.json`），兩邊腳本各自讀；掃描範圍（哪些路徑）仍留各 repo。SB 有幾個詞只在投資語境才算（`單卡`、`恐慌頁`、`應變卡`），要決定是全域詞表還是加一欄「適用 repo」。

### 2-7 `handoff`

- **共通**：觸發訊號、交接單格式、用 `start_session` 開 fresh 子 session、不寫檔。
- **各 repo 專屬**：SB 有 `handoff_trigger.py` hook 和 `CLAUDE.md`〈他喊停就停〉；me 都沒有。
- **衝突點**：me 要不要也裝觸發 hook；不裝的話 references/me.md 寫明「只靠 AI 自己判斷訊號」。

### 2-8 `repo-iterate`、`restructure`、`cleanup`（低優先）

- `repo-iterate`：共通是〈每修完一處〉的四問、刪減訊號、AI 界線、淨增減回報；專屬是「必經流程」清單（SB：`CLAUDE.md`、`/commit`、`/start`、hook；me：`CONTRIBUTING.md`、`/commit`、hook）。衝突點：me 的 auto-memory 已有幾條同類 feedback，要決定以 skill 為準、記憶只留指標。
- `restructure`：共通是整支流程；專屬只有「沿革落點」的例子。可以不拆 references，把例子改成「先問落點」就通用。
- `cleanup`：共通是掃描 → 分類 → 確認後 `git mv` → 收尾；專屬是歸檔目錄（me：`tools/archive/{migrations,prototypes,deprecated}`）。⚠️未查證：SB 有沒有約定的歸檔目錄，這次沒讀到相關規則，合併前要問 Tim。

### 2-9 搬到使用者層（不需要 references）

- `grill`：直接搬到 `~/.claude/commands/grill.md`，SB 那份刪掉。
- `apple-design`、`emil-design-eng`、`mobile-native`：整個資料夾搬到 `~/.claude/skills/`，SB 專案層刪掉，否則 SB 會載入兩次（同 `shared-skills` 的理由）。它們是第三方原文、沒有 SB 專屬內容，不需要放 `shared-skills/`。

---

## 三、建議執行順序

1. **收尾已共用的兩支**：確認 `ui-draft`、`site-ui-jud` 在兩個 repo 的新 session 都叫得到；SB `menu.md`、README 的指令表指向新位置。
2. **零衝突的搬家**：`grill` 搬到使用者層指令；三支第三方設計 skill 搬到 `~/.claude/skills/`。不需要任何裁定。
3. **單支、幾乎不綁 repo 的 skill**：`editor`、`handoff` 進 `shared-skills/` + symlink；同時改 `check_doc_sync.py` 的 editor 路徑。
4. **造字清單抽成單一詞表**：`commit` 的前置，先裁定「全域詞表或分 repo 適用」。
5. **`capture`、`journal`**：小、衝突少；`capture` 順帶修 SB 指令與 `TODO.md` 格式脫節，me `TODO.md` 補條目格式。
6. **`commit`**：先請 Tim 裁定 2-1 的八個衝突，再寫共通 `SKILL.md` + 兩份 references；同一批改掉所有「`/commit` §N」引用。兩邊各留一支薄殼指令保住 `/commit`。
7. **選做**：`sync`／`pull`、`cleanup`（先補 SB 歸檔規則）、`repo-iterate`、`restructure`。

每一步做完，兩邊都要各開一個新 session 叫一次，確認載入的是 symlink 那份（`skill-template.md` 記過：同一場對話裡 Skill 工具可能載入舊版快照）。
