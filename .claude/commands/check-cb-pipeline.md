---
description: 檢查 CB 資料管線健康度（GitHub Actions 雙軌 + 資料新鮮度）
allowed-tools: Bash(gh run list:*), Bash(gh run view:*), Bash(git log:*), Bash(date:*)
---

檢查 CB 資料管線兩條自動化軌道的健康狀態（架構見 `docs/CB_DATA_FLOW.md`）。

## 流程

1. **雲端軌（GitHub Actions，每交易日）**
   - `gh run list --workflow=daily-hot-cb.yml --limit 5` — 熱門清單爬蟲（台北 13:40）
   - `gh run list --workflow=daily-cb-history.yml --limit 5` — 歷史資料同步（台北 14:15）
   - 有 failure 時用 `gh run view <run-id> --log-failed` 撈出失敗原因
2. **判讀**
   - 最近一個交易日的兩條 run 是否都成功？連續失敗幾天？
   - 注意：週末與台股休市日沒有排程屬正常，不要誤報
3. **本地軌（Windows 交易機，僅提醒）**
   - 本地 XQ DDE 軌無法從這台 macOS 檢查；若雲端資料正常但高精度轉換價過舊，提醒使用者到交易機確認 `CB_Sync_Master.bat` 排程（週一 10:00／週五 14:00）
4. **回報**
   - 兩條 Actions 的近況表（日期、狀態、耗時）
   - 異常時：失敗原因摘要 + 建議動作（重跑 `gh workflow run <name>` 或修程式）
