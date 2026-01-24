---
description: 抓取 CB 即時行情
---

# 抓取 CB 即時行情

從 PSC 抓取 Master Data（轉換價格等），並從證交所 MIS API 更新即時價格。

// turbo

1. 抓取 Master Data（需 Puppeteer，約 30 秒）
   node tools/fetch-psc-data.js

// turbo 2. 更新即時行情（純 API 呼叫）
node tools/fetch-cb-data.js
