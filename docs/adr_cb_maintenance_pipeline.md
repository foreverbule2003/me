# ADR: CB 數據維護流水線 (Metadata Maintenance Pipeline)

## 背景 (Background)

目前計畫中存在三種數據格式：

1. **CSV** (cb_meta_template.csv): 使用者維護轉換價的介面。
2. **Firestore** (cb_history): 雲端持久化的真相來源。
3. **JSON** (cb-data.json): 前端戰情室為了效能而讀取的靜態檔案。

## 決策 (Decision)

我們將建立一個「單一真相來源」的自動化流水線，而不是手動維護 JSON 或直接讓前端頻繁讀取 Firestore。

### 數據流向 (Data Flow)

1. **維護層**：使用者編輯 `cb_meta_template.csv`（填寫轉換價）。
2. **持久層**：透過 `import_cb_meta.py` 將 CSV 內容同步至 **Firestore**。
3. **分發層**：建立 `export_cb_json.py`，從 Firestore 抓取最新資料（含 DDE 同步後的即時價格）並產出 `cb-data.json` 供前端使用。

## 後果 (Consequences)

- **優點**：
  - **一致性**：確保 CSV、資料庫與前端看到的資料永遠同步。
  - **效能**：前端依然讀取靜態 JSON，不會因為增加標的而變慢或增加 Firestore 帳單。
  - **備份**：Firestore 作為雲端備份，即使本機 CSV 遺失也能救回資料。
- **缺點**：
  - 需要多執行一步「匯出 JSON」的動作。
