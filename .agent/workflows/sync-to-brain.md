---
description: 將目前專案的好點子同步回 Second-Brain 知識庫
---

# Sync to Brain (回寫知識庫)

此工作流程用於將目前專案中產生的好點子、工作流程、思考架構同步回 **second-brain** 作為中央知識庫。

## 執行流程

1. **掃描目前專案可複用資產**：
   // turbo

   ```bash
   echo "=== Workflows ===" && dir /b .agent\workflows\*.md 2>nul && echo. && echo "=== Prompts ===" && dir /b .agent\prompts\*.md 2>nul && echo. && echo "=== Knowledge ===" && dir /b knowledge\*.md 2>nul
   ```

2. **比對 Second-Brain 現有資產**：
   // turbo

   ```bash
   echo "=== Second-Brain Workflows ===" && dir /b c:\Users\forev\myDev\second-brain\.agent\workflows\*.md 2>nul && echo. && echo "=== Second-Brain Prompts ===" && dir /b c:\Users\forev\myDev\second-brain\.agent\prompts\*.md 2>nul && echo. && echo "=== Second-Brain Knowledge ===" && dir /b c:\Users\forev\myDev\second-brain\knowledge\*.md 2>nul
   ```

3. **分析差異**：
   根據掃描結果，識別以下類型的項目：

   | 類型    | 說明                    | 建議動作       |
   | ------- | ----------------------- | -------------- |
   | 🆕 新增 | Second-Brain 沒有的項目 | 複製並調整     |
   | 🔄 更新 | 兩邊都有但內容不同      | 檢視差異後合併 |
   | ✅ 相同 | 已同步                  | 跳過           |

4. **選擇性同步**：
   - 詢問使用者想要同步哪些項目
   - 執行複製並調整專案特定內容為通用版本
   - 提交變更到 second-brain

---

## 通用化指南

從專案複製到 second-brain 時，需調整以下內容：

**程式碼範例**：

- 移除專案特定的路徑名稱
- 將具體元件名稱改為通用描述

**文件內容**：

- 抽象化專案特定的描述
- 將「me 專案」改為「目標專案」

---

## 使用方式

```bash
# 在任意專案目錄執行
/sync-to-brain
```

## 相關工作流程

- `/journal` - 每日回顧時自動提示可複用項目
- `/idea` - 快速記錄靈感
