# GCP 專案費用調查與優化報告 (2026-04-28 ~ 2026-04-29)

## 1. 調查背景
針對 GCP 專案 `my-landing-page-2ca68` 出現超出預期的費用（本月約 $0.55 USD）進行追蹤，釐清其費用來源與執行邏輯。

## 2. 核心發現 (Root Cause)

### A. 費用來源
*   **Firestore 寫入成本**：所有費用均來自 `Cloud Firestore Entity Writes`。
*   **關鍵時間點**：監控圖表顯示每天 **13:40 (下午 1:40)** 出現顯著的寫入高峰。
*   **關聯任務**：與 `Daily Hot CB Sync` (執行 `Daily_Hot_CB_Sync.bat`) 時間完全吻合。

### B. 實際費用評估 (修正版)
*   `Daily_Hot_CB_Sync.bat` 每日實際寫入：
    *   `saveSnapshotToCloud`：1 筆 document（整份快照，key 為 YYYY-MM-DD）
    *   `updateMasterMetadata`：最多 **20 筆**（Top 20 熱門 CB）
    *   **每日合計：約 21 筆** → 月寫入約 630 次，遠低於免費額度
*   **真正費用根源**：`xq_bridge.py` (`CB_Sync_Master.bat`) 對全體追蹤標的（可能數百筆）無差異比對地寫入。

### C. 安全隱憂 (已修復)
*   `My Landing Page Web` API 金鑰為「無限制」狀態，且啟用了多項高額 Maps API。

## 3. 完成的行動 (All Actions Taken)

### 2026-04-28：安全性加固
| 操作 | 狀態 |
|------|------|
| 限制 API 金鑰至特定網域 (localhost, github.io, firebaseapp.com) | ✅ 完成 |
| 停用未使用的 Maps API（Roads, Routes, Solar 等）| ✅ 完成 |

### 2026-04-29：程式碼與服務優化
| 操作 | 影響 | 狀態 |
|------|------|------|
| `xq_bridge.py` 實作 Delta Check | 避免股價未變動時產生寫入費用 | ✅ 完成 |
| `hot-cb-cloud.js` 加入同日快照防重複寫入 | 防止同日多次執行重複扣費 | ✅ 完成 |
| 停用閒置 GCP 服務（Dataform, Dataplex, Firebase Test Lab）| 消除潛在隱藏費用 | ✅ 完成 |

## 4. 保留的服務說明

| 服務 | 保留原因 |
|------|---------|
| `bigquerystorage.googleapis.com` | Firebase 內部可能依賴，停用有風險 |
| `pubsub.googleapis.com` | Firebase 內部可能依賴，停用有風險 |
| `cloudaicompanion.googleapis.com` | Google Cloud 自動啟用，無法手動停用 |

## 5. 後續建議 (Next Steps)

1.  **觀察帳單**：預計 5 月份費用將顯著下降至 $0 或極小值。
2.  **設定預算警報**：在 GCP 控制台設定每月 $1 USD 的警報，超過時自動發送 Email。
3.  **定期審查**：每季確認是否有不必要的服務被自動啟用。

---
**最後更新**：2026-04-29
**操作員**：Antigravity (AI Assistant)
