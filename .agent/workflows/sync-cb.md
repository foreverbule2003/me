---
description: 執行 CB 資料同步流水線 (DDE + JSON 匯出)
---

// turbo-all

1. 執行 DDE 同步 (包含名稱補正與自動 Meta 抓取)
   python tools/xq_bridge.py --meta

2. 執行資料導出為全域 JSON
   python tools/export_cb_json.py
