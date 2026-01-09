---
description: 檢視每日的工作完成事項，依類別彙整報告
---

# Journal Workflow (每日日誌)

此指令用於彙整當日所有已完成的開發事項，幫助您快速回顧專案進度。

## 執行流程

1. **掃描今日變更**：
   // turbo
   ```bash
   git log --oneline --since="00:00:00" --until="23:59:59"
   ```

2. **讀取歷史記錄**：
   - 檢查 `CHANGELOG.md` 中的最新日期項目。
   - 檢查 `TODO.md` 中已標記完成的項目。

3. **分類彙整**：
   請依照以下架構進行報告：

   ### 🏗️ 架構調整 (Architecture)
   - *例如：目錄結構重構、元件抽離、路由優化。*

   ### ✨ 新功能 (Features)
   - *例如：新增旅程頁面、購物清單功能、評分系統。*

   ### 🐞 修正 Bug (Bug Fixes)
   - *例如：修復返回按鈕、解決 Firebase 連線問題。*

   ### ⚡ 效能與安全 (Performance & Security)
   - *例如：Lighthouse 優化、圖片壓縮、API Key 保護。*

   ### 📚 知識與文件 (Documentation & Knowledge)
   - *例如：更新 README.md、新增 SITEMAP.md、擴充 COMPONENTS.md。*

4. **🔄 可複用性掃描 (Reusability Scan)**：
   
   自動檢測今日 commits 中可能適合同步到 **second-brain** 的項目：

   **自動標記規則**：
   | 檢測條件                          | 可複用性 | 建議動作             |
   | --------------------------------- | -------- | -------------------- |
   | 新增 `.agent/workflows/*.md`      | ⭐⭐⭐ 高   | 複製到 second-brain  |
   | 新增 `.agent/prompts/*.md`        | ⭐⭐⭐ 高   | 複製到 second-brain  |
   | 新增 `knowledge/*.md`             | ⭐⭐⭐ 高   | 評估是否適合回寫中心 |
   | Commit 含 `[reusable]` 標記       | ⭐⭐⭐ 高   | 執行 /sync-to-brain  |
   | Commit 含「元件」「模組」「工具」 | ⭐⭐ 中    | 檢視是否通用         |

   **輸出格式**：
   ```
   ## 🔄 可複用項目
   | 類型     | 項目     | 來源檔案                    | 建議動作       |
   | -------- | -------- | --------------------------- | -------------- |
   | Workflow | /journal | .agent/workflows/journal.md | → second-brain |
   ```

5. **下一步建議**：
   - 根據 `TODO.md` 提示明日或接下來應優先處理的項目。
   - 若有可複用項目，提示執行同步。

---

## Commit 標記指南

開發時可選擇性加入標記，幫助系統識別：

```bash
# 值得複用的功能
git commit -m "feat: 新增評分元件 [reusable]"

# 一般修改（不用標記）
git commit -m "fix: 修復返回按鈕"
```

---

## 使用方式
直接輸入 `/journal` 即可啟動。
