---
description: 啟動層級式 AI 顧問同步 (Advisor, PM, CTO, CSO, CIO)
---

# Advisor Sync Workflow

> 產品經理 + 技術長 + 設師師 -> 首席策略官 -> 首席投資長 (風險預警)

## 🎯 模式選擇

| 模式         | 用法                    | 說明                 |
| ------------ | ----------------------- | -------------------- |
| **完整模式** | `/advisor-sync`         | 執行 4 步驟完整流程  |
| **快速模式** | `/advisor-sync --quick` | 僅收集數據 + PM 檢視 |

// turbo-all

## 1. 收集專案數據

### Git 狀態

git status --short

### 核心 Backlog (TODO List)

Get-Content "TODO.md"

### 最近變更紀錄

git log --oneline -n 10

## 2. 啟動層級式分析流程

### 第一步：專業視角分析

請根據上述數據，分別使用以下模板產出分析報告：

- 使用 `[[web-pm-prompt]]` (產品與進度視角)
- 使用 `[[cto-prompt]]` (技術架構與效能視角)
- 使用 `[[designer-prompt]]` (UI/UX 與視覺視角)

### 第二步：超級角色彙整

將上述報告交給 CSO 進行初步戰略定義：

- 使用 `[[cso-prompt]]` (首席策略官)

### 第三步：第二意見審視 (Devil's Advocate)

將 CSO 的決策交給 CIO/CRO 進行挑戰與審視：

- 使用 `[[cio-prompt]]` 或 `[[cro-prompt]]`
- 專家會從風險、盲點、替代方案角度提出質疑

### 第四步：最終共識

綜合以上視點，形成最終行動方案與 Backlog 調整建議。

---

*註：此流程加入「第二意見」機制，避免單一視角的盲點，產出更穩健的專案決策。*
