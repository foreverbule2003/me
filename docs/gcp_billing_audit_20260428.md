# GCP 專案費用調查與優化報告 (2026-04-28)

## 1. 調查背景
針對 GCP 專案 `my-landing-page-2ca68` 出現超出預期的費用（本月約 $0.55 USD）進行追蹤，釐清其費用來源與執行邏輯。

## 2. 核心發現 (Root Cause)

### A. 費用來源
*   **Firestore 寫入成本**：所有費用均來自 `Cloud Firestore Entity Writes`。
*   **關鍵時間點**：監控圖表顯示每天 **13:40 (下午 1:40)** 出現顯著的寫入高峰。
*   **關聯任務**：經查與 Windows 工作排程器中的 `Daily Hot CB Sync` (執行 `Daily_Hot_CB_Sync.bat`) 時間完全吻合。

### B. 安全隱憂 (已修復)
*   **API 金鑰洩漏風險**：發現名為 `My Landing Page Web` 的金鑰為「無限制」狀態，且啟用了多項高額 Maps API（如 Solar, Routes）。

### C. 程式邏輯缺陷
*   **無效寫入**：原有的同步腳本 (`xq_bridge.py` 與 `hot-cb-cloud.js`) 缺乏「差異比對」機制。
*   **強制更新**：腳本中包含 `lastUpdated: new Date().toISOString()`，導致每次執行時，Firestore 都會因為時間戳記不同而判定資料已變動，進而產生寫入費用。

## 3. 已執行的行動 (Actions Taken)

### 安全性加固
1.  **API 金鑰限制**：已將金鑰 `ff160f2f...` 限制為僅允許特定網域 (localhost, github.io, firebaseapp.com) 存取。
2.  **停用 API**：已停用專案中未使用的高額 Maps 服務（Roads, Routes, Solar API 等）。

### 程式碼優化
1.  **差異比對實作**：在 `tools/xq_bridge.py` 中加入了 Delta Check 機制。
    *   邏輯：從 XQ 抓到數據後，先與資料庫現有數據比對。
    *   結果：僅在資料真正有變動時才執行 `batch.set`。若無變動，控制台將顯示 `[SKIP] No changes detected.`。

## 4. 後續建議 (Next Steps)

1.  **監控排程頻率**：確認 Windows 任務排程器的執行頻率。若非必要，建議將同步頻率控制在每 10-30 分鐘一次，或僅在開盤時間執行。
2.  **JS 端優化**：未來建議對 `src/utils/hot-cb-cloud.js` 進行類似優化。
    *   *註：目前用戶已手動加回 `lastUpdated` 時間戳記，這會維持寫入成本，除非改為僅在資料變動時才更新該欄位。*
3.  **觀察帳單**：預計在優化後的下一個計費週期，Firestore 寫入費用將顯著下降。

---
**文件紀錄日期**：2026-04-28
**操作員**：Antigravity (AI Assistant)
