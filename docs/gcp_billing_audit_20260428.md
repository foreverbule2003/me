# GCP 專案費用調查與優化報告 (2026-04-28 ~ 2026-04-29)

## 1. 調查背景

針對 GCP 專案 `my-landing-page-2ca68` 出現超出預期的費用（本月約 $0.55 USD）進行追蹤，釐清其費用來源與執行邏輯。

## 2. 核心發現 (Root Cause)

### A. 費用來源

- **Firestore 寫入成本**：所有費用均來自 `Cloud Firestore Entity Writes`。
- **關鍵時間點**：監控圖表顯示每天 **13:40 (下午 1:40)** 出現顯著的寫入高峰。
- **關聯任務**：與 `Daily Hot CB Sync` (執行 `Daily_Hot_CB_Sync.bat`) 時間完全吻合。

### B. 實際費用評估 (修正版)

- `Daily_Hot_CB_Sync.bat` 每日實際寫入：
  - `saveSnapshotToCloud`：1 筆 document（整份快照，key 為 YYYY-MM-DD）
  - `updateMasterMetadata`：最多 **20 筆**（Top 20 熱門 CB）
  - **每日合計：約 21 筆** → 月寫入約 630 次，遠低於免費額度
- **真正費用根源**：`xq_bridge.py` (`CB_Sync_Master.bat`) 對全體追蹤標的（可能數百筆）無差異比對地寫入。

### C. 安全隱憂 (已修復)

- `My Landing Page Web` API 金鑰為「無限制」狀態，且啟用了多項高額 Maps API。

## 3. 完成的行動 (All Actions Taken)

### 2026-04-28：安全性加固

| 操作                                                            | 狀態    |
| --------------------------------------------------------------- | ------- |
| 限制 API 金鑰至特定網域 (localhost, github.io, firebaseapp.com) | ✅ 完成 |
| 停用未使用的 Maps API（Roads, Routes, Solar 等）                | ✅ 完成 |

### 2026-04-29：程式碼與服務優化

| 操作                                                       | 影響                         | 狀態    |
| ---------------------------------------------------------- | ---------------------------- | ------- |
| `xq_bridge.py` 實作 Delta Check                            | 避免股價未變動時產生寫入費用 | ✅ 完成 |
| `hot-cb-cloud.js` 加入同日快照防重複寫入                   | 防止同日多次執行重複扣費     | ✅ 完成 |
| 停用閒置 GCP 服務（Dataform, Dataplex, Firebase Test Lab） | 消除潛在隱藏費用             | ✅ 完成 |

## 4. 保留的服務說明

| 服務                              | 保留原因                            |
| --------------------------------- | ----------------------------------- |
| `bigquerystorage.googleapis.com`  | Firebase 內部可能依賴，停用有風險   |
| `pubsub.googleapis.com`           | Firebase 內部可能依賴，停用有風險   |
| `cloudaicompanion.googleapis.com` | Google Cloud 自動啟用，無法手動停用 |

## 5. 後續建議 (Next Steps)

> 2026-11-06 起由第 6 節取代：專案已改回免費方案，不再需要預算警報。

1.  ~~**觀察帳單**：預計 5 月份費用將顯著下降至 $0 或極小值。~~ 實際 5～9 月逐月上升，見第 6 節。
2.  ~~**設定預算警報**~~：改成停用計費，見第 6 節。
3.  **定期審查**：每季確認是否有不必要的服務被自動啟用。

## 6. 2026-11-06：改回免費方案（Spark），費用封頂 0 元

### A. 5 月～11/6 實際費用（帳單幣別 TWD）

| 月份        | 費用     |
| ----------- | -------- |
| 5 月        | 約 NT$1.1 |
| 6 月        | 約 NT$1.3 |
| 7 月        | 約 NT$2.2 |
| 8 月        | 約 NT$3.9 |
| 9 月        | 約 NT$4.9 |
| 10 月       | 約 NT$0.9 |
| 11/1～11/6  | NT$0.86   |

- 合計約 NT$15，全部是 Firestore：寫入 NT$14.22（約 265 萬次計費寫入）、讀取 NT$0.86。
- 11 月的讀取費來自 11/3（台灣時間）單日約 12.5 萬次讀取，超過每日免費 5 萬次；當天在開發「每日同步納入我的追蹤」與 thefew 同步，判斷是開發腳本掃全部資料。之後每天只有數千次。
- 10 月寫入下降的原因未查證。

### B. 為什麼不用預算警報或支出上限

- 預算警報只寄信，不會擋住費用。
- 「強制執行支出上限」只支援 Cloud Run、Cloud Run Functions、Gemini API、Vertex AI，**不支援 Firestore**。

### C. 做法：停用計費

- 帳單帳戶「我的 Google 地圖平台帳單帳戶」底下兩個專案（含 `timboy` / `my-landing-page-2ca68`）都已停用計費功能，帳戶目前未連結任何專案。
- 本專案只用 Firestore、Auth、Analytics，沒有 Cloud Functions、Storage，免費方案都能用。
- 停用後 production 戰情室、追蹤清單讀取正常，console 無錯誤。

### D. 停用計費後的限制

- 每日免費額度：讀取 50,000、寫入 20,000、刪除 20,000。超過後當天的請求失敗，不收費；額度在太平洋時間午夜（台灣下午 3～4 點）重置。
- 平常用量約每日讀取 1,400、寫入 500。GitHub Actions 的每日同步只寫數十筆。
- 會一次讀寫上萬筆的開發腳本（例如掃全部 `cb_history`）可能跑到一半失敗，要分天跑或縮小範圍。
- 額度用完不會收到 Google 通知。改由 `daily-hot-cb.yml`、`daily-cb-history.yml` 失敗時發 Telegram（沿用 second-brain 的 bot，repo secrets `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID`）；兩支腳本在雲端寫入失敗或額度用完時會以非 0 結束。
- 若之後要用 Cloud Functions、Storage 等付費功能，必須重新連結帳單帳戶，屆時要先想好封頂方式。

---

**最後更新**：2026-11-06
