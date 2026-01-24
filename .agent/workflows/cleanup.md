# Cleanup Workflow

> **Purpose**: 系統化清理專案架構，歸檔廢棄檔案，保持專案輕量化。
> **Trigger**: 當專案雜亂、累積過多一次性腳本或 POC 時使用。

## 🎯 執行步驟

### 1. 掃描候選檔案

尋找可能是「一次性」或「已廢棄」的檔案：

- 關鍵字：`migrate`, `temp`, `test`, `old`, `bak`, `prototype`
- 未被追蹤的檔案 (Untracked)

// turbo

```bash
git status --short
find tools -name "*migrate*"
find tools -name "*test*"
```

### 2. 建立歸檔目錄 (如果沒有)

確保標準歸檔結構存在：

- `tools/archive/migrations/` (資料庫遷移)
- `tools/archive/prototypes/` (功能原型)
- `tools/archive/deprecated/` (已廢棄功能)

### 3. 移動與分類 (互動式)

- 請列出建議移動的檔案清單。
- 等待使用者確認。
- 使用 `git mv` 或 `mv` 進行移動。

### 4. 清理空目錄

移除移動後留下的空資料夾。

// turbo

```bash
# Windows PowerShell compatible check
Get-ChildItem -Path . -Recurse -Directory | Where-Object { $_.GetFileSystemInfos().Count -eq 0 } | Remove-Item
```

### 5. 更新文件

- 如果移動了重要參考文件，請在 `CHANGELOG.md` 或相關 README 中註記新位置。

### 6. Workflow 健檢 (Workflow Health)

順便檢查 `.agent/workflows/` 中是否有冗餘項目：
- **重複別名**: 如 `clean.md` vs `cleanup.md`。
- **過期實驗**: `test-*.md` 或不再使用的 POC。

// turbo
```bash
ls .agent/workflows | Sort-Object
```
