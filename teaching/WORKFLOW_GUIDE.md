# 🔄 Workflow 情境指南

根據不同的工作情境，使用對應的 Workflow 組合。

> **2026-07 更新**：指令已從前代 Antigravity（`.agent/workflows/`）遷移至
> Claude Code（`.claude/commands/`）。舊目錄保留作歷史參考，內容以本指南為準。
> 沒有對應指令的動作（啟動預覽、跑測試等），直接用一句話請 Claude 執行即可。

---

## 📅 每日開發流程

### 🌅 一天的開始

```
/sync    → 同步遠端程式碼到最新
「啟動 dev server」 → 本地預覽（Claude 會用 preview 工具開）
```

### ✏️ 開發中（修改程式碼）

```
（修改程式碼...）
/capture [靈感]  → 途中想到的點子先丟進 TODO.md，不打斷手上工作
/commit          → 完成一個段落就提交（含 guard/test 驗證與文件同步）
```

### 🌙 一天的結束

```
/journal   → 彙整今日完成事項
/doc-check → 確認文件是否需要更新
/commit    → 提交最後變更
/deploy    → 推送 main（自動觸發 GitHub Pages 部署）
```

---

## 🎯 特定情境

### 🆕 新增旅程頁面

```
npm run new-trip  → 建立新旅程（自動註冊 vite 入口與首頁選單）
（編輯 src/pages/trips/{trip}/data.js...）
/commit           → 提交（data.js 有動會自動同步 spec.md）
/deploy           → 上線
```

### 🔍 定期健檢（每週/每月）

```
/code-review → 檢查目前分支的變更品質
/cleanup     → 歸檔廢棄檔案、清理專案
/commit + /deploy
```

### 🐛 緊急修 Bug

```
「啟動 dev server」→（修復問題並驗證...）
/commit    → 提交修復
/deploy    → 立即上線
```

### 🧹 程式碼整理

```
「執行 npm run format」→ 格式化
/cleanup  → 歸檔廢棄檔案
/commit   → 提交
```

---

## 📋 Workflow 速查表

| 指令               | 功能                           | 何時用       |
| ------------------ | ------------------------------ | ------------ |
| `/sync`            | fetch → rebase pull → push     | 開始工作前   |
| `/capture`         | 靈感快速寫入 TODO.md           | 隨時         |
| `/commit`          | 清理→驗證→文件同步→確認→提交   | 完成一個段落 |
| `/doc-check`       | 文件同步檢查                   | 提交前       |
| `/journal`         | 今日完成事項分類日報           | 一天結束     |
| `/deploy`          | 推送 main 觸發自動部署         | 結束工作時   |
| `/cleanup`         | 掃描並歸檔廢棄檔案             | 專案雜亂時   |
| `npm run new-trip` | 建立新旅程（含入口/選單註冊）  | 規劃新行程   |

---

## 💡 記憶口訣

> **開始先 Sync，結束要 Deploy**
> **改完就 Commit，上線前 Doc-check**
> **靈感隨手 Capture，收工寫 Journal**
