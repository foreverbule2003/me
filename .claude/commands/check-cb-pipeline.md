---
description: 檢查 CB 資料管線健康度（GitHub Actions + 每週 thefew 同步 + 資料新鮮度）
allowed-tools: Bash(gh run list:*), Bash(gh run view:*), Bash(git log:*), Bash(date:*)
---

檢查 CB 資料管線的健康狀態（架構見 `docs/CB_DATA_FLOW.md`）。

## 流程

1. **雲端軌（GitHub Actions，每交易日）**
   - `gh run list --workflow=daily-hot-cb.yml --limit 5` — 熱門清單爬蟲（台北 13:40）
   - `gh run list --workflow=daily-cb-history.yml --limit 5` — 熱門榜 Top 20 的歷史資料同步（台北 14:15）
   - 有 failure 時用 `gh run view <run-id> --log-failed` 撈出失敗原因
2. **判讀**
   - 最近一個交易日的兩條 run 是否都成功？連續失敗幾天？
   - 注意：週末與台股休市日沒有排程屬正常，不要誤報
3. **每週 thefew 同步（Claude 排程任務 `weekly-thefew-cb-sync`，週一 09:00）**
   - 看 `ls tools/.backups/` 最新一份 `thefew-YYYY-MM-DD.json` 的日期；超過 8 天沒有新的，代表排程沒跑成（Mac 沒開、Chrome 沒開或 thefew 登入過期），提醒使用者到 app 的排程頁按「Run now」
   - Windows 交易機的 XQ DDE 軌已於 2026-11-03 停用，不再檢查
4. **回報**
   - 兩條 Actions 的近況表（日期、狀態、耗時）＋最近一次 thefew 同步日期
   - 異常時：失敗原因摘要 + 建議動作（重跑 `gh workflow run <name>` 或修程式）
