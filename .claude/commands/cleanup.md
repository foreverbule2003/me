---
description: 清理專案架構（掃描廢棄檔案並歸檔）
allowed-tools: Bash(git status:*), Bash(find:*), Bash(ls:*), Bash(git mv:*), Bash(git clean -ndX)
---

系統化清理專案：掃描一次性腳本、廢棄檔案與 POC，分類歸檔，保持專案輕量。

## 流程

### 1. 掃描候選檔案

- `git status --short` 找未追蹤檔案
- `git clean -ndX`（dry-run）看被忽略的殘留
- 依關鍵字掃描：`find tools scripts -name "*migrate*" -o -name "*temp*" -o -name "*old*" -o -name "*bak*" -o -name "*prototype*" -o -name "*mock*"`
- 根目錄的一次性輸出（如 `build_output.txt`、測試報告）

### 2. 分類到標準歸檔結構

- `tools/archive/migrations/` — 資料庫遷移腳本
- `tools/archive/prototypes/` — 功能原型／mock
- `tools/archive/deprecated/` — 已廢棄功能

### 3. 互動確認（Critical Stop）

- **列出建議移動／刪除的清單與理由，等使用者確認後才動手**
- 已追蹤檔案用 `git mv` 保留歷史；確認真的不要的才刪除
- 檢查被移動檔案是否仍被引用（vite.config 入口、npm scripts、文件連結），一併修正

### 4. 收尾

- 清空目錄：`find . -type d -empty -not -path "./node_modules/*" -not -path "./.git/*"` 列出後移除
- 移動了重要參考文件時，在 `CHANGELOG.md` 或相關 README 註記新位置
- 順便健檢 `.claude/commands/` 是否有重複或過期的指令
- 收尾後建議走 `/commit` 提交清理結果
