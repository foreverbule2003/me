# 📊 資料來源規範 (Data Sources Specification)

本文件定義了 "Me" 專案 (TimBoy) 中所有外部數據爬蟲的來源、抓取範圍與技術規範。

---

## 🛠️ 核心爬蟲清單

### 1. 即時行情爬蟲 (`fetch-cb-data.js`)

- **數據來源**：[TWSE MIS API](https://mis.twse.com.tw/)
- **資料範圍**：
  - CB 現價 (`z`, `a`, `b`)
  - 標的股票現價 (`z`, `y`)
- **更新頻率**：手動觸發 或 GitHub Actions 定期任務。
- **儲存目標**：`public/data/cb-data.json`
- **備註**：轉換價目前由手動維護，因為證交所官網具備反爬蟲機制。

### 2. 歷史資料爬蟲 (`fetch-cb-history.js`)

- **數據來源**：[TWSE/TPEx 歷史行情](https://www.tpex.org.tw/)
- **資料範圍**：
  - CB：TPEx `cbDayQry` 等價列的收市價、漲跌、成交張數
  - 現股：TWSE `STOCK_DAY`，查無改 TPEx `afterTrading/tradingStock` 的收盤價與漲跌
  - 歷史溢價率，以及主文件 `daily` 當日欄位（格式見 `docs/CB_DATA_FLOW.md`）
- **抓取範圍**：預設 6 個月，可自定義區間。
- **儲存目標**：`public/data/history/<CODE>.json` 與 Firestore 雲端備份。

### 3. 市場熱點爬蟲 (`fetch-hot-cb.js`)

- **數據來源**：櫃買中心每日「轉(交)換公司債買賣斷交易行情表」CSV（`RSta0113.YYYYMMDD-C.csv`）。2026-11 前爬 PChome，PChome 對 GitHub Actions 回 403 後改用此檔。
- **資料範圍**：
  - 等價交易成交張數前 20 名的可轉債，收盤後才有當日檔，還沒出就取最近交易日。
  - 漲跌、漲跌幅、成交張數、最高最低。
- **儲存**：Firebase Firestore 快照（`hot_cb_snapshots/<日期>`，一天只寫一次）。抓取失敗時不寫入。

### 4. 每週轉換價與價格同步 (`sync-thefew-cb.js`)

- **數據來源**：[thefew.tw/cb](https://thefew.tw/cb)（需登入，由 Claude 排程任務以已登入的 Chrome 抓取）
- **資料範圍**：全部掛牌中可轉債的轉換價（含除權息調整）、CB 收盤價、股票收盤價。
- **職責**：每週一寫入 Firestore `cb_history` 主文件，詳見 `docs/CB_DATA_FLOW.md`。

原本的 XQ CSV 補丁工具 `import-xq-csv.js` 已於 2026-11-03 移到 `tools/archive/deprecated/xq-dde/`。

---

## 🔐 技術規範與限制

1.  **反爬蟲遵循**：所有腳本應模擬合理 User-Agent，並在請求間加入隨機延遲。
2.  **單一事實來源 (SSOT)**：所有抓取結果最終應以 `cb-data.json` 或 Firestore 作為 UI 渲染的唯一依據。
3.  **錯誤回退 (Fallback)**：當 API 請求失敗時，應提供 `getMockData()` 或讀取最近一次快照。
