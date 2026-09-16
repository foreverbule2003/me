# 貢獻給 Project Me (TimBoy)

歡迎來到 **TimBoy** 專案！我們正在打造一個結合復古遊戲機美學與現代 Web 技術的個人品牌平台。

## 🌟 專案哲學

1.  **美學優先 (Aesthetics First)**：如果它看起來不像 GameBoy 或感覺不夠「復古」，它就不屬於這裡。
2.  **掌機優化 (Handheld Optimization)**：所有功能必須在手機 (直式螢幕) 上運作流暢。
3.  **現代核心 (Modern under the Hood)**：雖然外表復古，但骨子裡是 Vite, React 18 與 Firebase。

## 🛠️ 開發流程

### 1. 安裝

```bash
npm install
```

### 2. 本地執行

```bash
npm run dev
```

### 3. 新增內容

我們使用互動式腳本來新增標準內容。

**新增旅程 (Trip):**

```bash
npm run new-trip
# 跟隨提示建立新的旅程資料夾 (例如：trips/2026-tokyo)
```

> **⚠️ 落後遠端時會被擋下。** 建立新旅程會改動 `vite.config.js` 的
> `rollupOptions.input` 與 `src/views/TripsView.jsx` 的 `menuItems` 這兩個
> 「全域註冊點」，在分歧狀態下動手，兩台機器必然在同幾行撞出合併衝突
> （2026-09-06 連續發生兩次，見 `tasks/lessons.md`）。腳本因此會先跑
> `git fetch` 並在 `behind > 0` 時中止，請照提示 `git pull --rebase` 後重跑。
> 離線或無 remote 時只警告不擋；確定要在落後狀態下建立可用
> `SKIP_SYNC_CHECK=1 npm run new-trip`。

> **📒 資料來自旅行社行程表／電子書時，一併建 `trips/{trip}/trip_notes.md`。**
> `spec.md` 由 `data.js` 自動生成、勿手改，承載不了的來源資訊放 `trip_notes.md`。
> 兩者的職責分工與個資處理原則見 `trips/TRIP_STYLE_GUIDE.md` §1.2。

**新增部落格/日記 (Journal):**
目前日記透過 Firebase 管理。(CLI 新增功能即將推出)。

## 📝 Pull Requests / 變更

- **分支 (Branching)**：`feature/your-feature-name` 或 `fix/issue-description`。
- **Commits**：使用 Conventional Commits (例如：`feat: add new trip`, `fix: header alignment`)。
- **開工前確認沒落後遠端**：`npm run sync-check`（Claude Code 的 SessionStart hook 會自動跑，看到落後就先 `git pull --rebase`）。落後開工的代價是事後解衝突，而那些衝突多半是「兩邊各往同一個錨點插一行」，先同步就完全不會發生。三次教訓見 `tasks/lessons.md`——其中 2026-09-16 那次是**同一台電腦**的 git worktree 推了 commit，主工作目錄靜默落後五天，不需要第二台機器也會中。
- **測試**：在推送前執行 `npm test` 確保沒有破壞現有功能。
- **提交流程**：走 `/commit`（正本在 `.claude/commands/commit.md`，共 0–10 步）。它會強制跑 `npm run guard` 與 `npm test` 綠燈、檢查文件同步、掃本次 diff 的壞味道、刷新記憶備份，最後停下來等你確認才提交。`.agent/workflows/commit.md` 是已停用的舊版，只留指路。
- **寫檔會被掃 AI 自造詞**：`.claude/hooks/check-ai-coinage.mjs` 在 Write/Edit 寫進 `docs/`、`knowledge/`、`teaching/`、`tasks/`、`trips/`、`.claude/commands/`、`.agent/` 與根目錄四份 `.md` 時當場攔。要增刪詞彙，同步改那支腳本的 `COINAGE` 與 `/commit` 步驟 6 表格第 1 格。

## 🎨 風格指南

請參閱 [STYLE_GUIDE.md](./docs/STYLE_GUIDE.md) 獲取詳細的 CSS 與元件使用規範。
