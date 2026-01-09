---
description: 快速提交變更到目前分支 (不推送)
---

# Commit Workflow

## 步驟 1：文件同步檢查（強制）

在提交前，確認以下文件是否需要因應今日變更而更新：

| 檔案                   | 檢查重點                     | 狀態 |
| ---------------------- | ---------------------------- | ---- |
| **README.md**          | 專案說明、目錄結構           | ☐    |
| **TODO.md**            | 標記完成項目、更新進行中區塊 | ☐    |
| **docs/FEATURES.md**   | 新增/修改功能說明            | ☐    |
| **docs/COMPONENTS.md** | 新增/修改 UI 組件說明        | ☐    |
| **docs/SITEMAP.md**    | 頁面路由變動                 | ☐    |

## 步驟 2：🔄 知識庫同步提醒

檢查此次變更是否包含可複用的好點子，應同步回 **Second-Brain**：

| 變更類型                     | 應同步到 Second-Brain |
| ---------------------------- | --------------------- |
| 新增 `.agent/workflows/*.md` | ⭐ 是 (通用工作流程)   |
| 新增 `.agent/prompts/*.md`   | ⭐ 是 (通用 AI 角色)   |
| 新增 `knowledge/*.md`        | ⭐ 是 (思維模型)       |
| Commit 含 `[reusable]` 標記  | ⭐ 是                  |

> 💡 若有可複用項目，提交後執行 `/sync-to-brain`

## 步驟 2.5：🤖 專家審查 (PM & CTO Review)

> ⚠️ 在執行 git commit 之前，**建議**請 PM 與 CTO 進行最後確認（特別是重大架構變更）。

1. **PM 審核**：確認目標達成率、Backlog 優先順序。
2. **CTO 審核**：確認代碼質量、架構一致性與技術債。

**指令範例**：
`/help pm cto 請 review 以上變更與文件同步狀況，準備進行 commit。`

// turbo

## 步驟 3：提交變更 (Commit)

git add . && git commit -m "[message]"
