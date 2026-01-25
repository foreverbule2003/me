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
  - 日 K 線數據 (日期, 開, 高, 低, 收)
  - 歷史溢價率計算所需數據。
- **抓取範圍**：預設 6 個月，可自定義區間。
- **儲存目標**：`public/data/history/<CODE>.json` 與 Firestore 雲端備份。

### 3. 市場熱點爬蟲 (`fetch-hot-cb.js`)

- **數據來源**：[PChome 金融](https://money.pchome.com.tw/)
- **資料範圍**：
  - 市場交易量前 50-100 名的可轉債。
  - 當日漲跌幅、成交量分析。
- **儲47.79MB**：Firebase Firestore 快照及本地日誌。

### 4. 手動補丁工具 (`import-xq-csv.js`)

- **數據來源**：XQ 全球贏家 (CSV 導出)
- **資料範圍**：
  - 補齊 TWSE MIS 缺失的極早期或特定標的歷史紀錄。
- **職責**：將 CSV 數據 Merge 進現有的 JSON 歷史存檔。

---

## 🔐 技術規範與限制

1.  **反爬蟲遵循**：所有腳本應模擬合理 User-Agent，並在請求間加入隨機延遲。
2.  **單一事實來源 (SSOT)**：所有抓取結果最終應以 `cb-data.json` 或 Firestore 作為 UI 渲染的唯一依據。
3.  **錯誤回退 (Fallback)**：當 API 請求失敗時，應提供 `getMockData()` 或讀取最近一次快照。
