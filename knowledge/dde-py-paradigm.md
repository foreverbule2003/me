# DDE + Python：本地軟體即數據源的開發範式

這份筆記記錄了一種「顛覆傳統爬蟲」的數據獲取模式：利用 DDE (Dynamic Data Exchange) 協定，將本地已登入的專業軟體作為即時數據供應站。

## 🎯 核心概念：對講機模式

不同於**爬蟲模式**（像苦力一樣去網頁抄資料），**DDE 模式**像是在 Python 與 XQ 之間拉了一條專屬的「對講機連線」。

- **信任機制**：因為你已經手動登入 XQ，XQ 已經完成了身份驗證。Python 只是站在同一台電腦的記憶體門口「接手」數據，因此不需要額外的帳號密碼。
- **通訊語法**：透過 `Service|Topic!Item` 的標準協定溝通。
  - `XQLite|Quote!2330.TW-成交價` (即時報價)
  - `XQLite|Hist!2330.TW-Day-20251201-20251231-31-F004` (歷史區塊)

## 🚀 為什麼這能顛覆開發流程？

1.  **秒級響應**：數據傳輸發生在記憶體內，速度遠超網路請求。
2.  **抗封鎖**：完全不存在 IP 被封鎖或反爬蟲檢測的問題，因為這是本地合法通訊。
3.  **結構化數據**：XQ 傳回的是乾淨的 CSV 格式或單一數值，不需要處理複雜的 HTML DOM 結構。
4.  **開發效率**：原本需要寫幾百行解析邏輯的爬蟲，在 DDE 模式下縮減為幾行 `conv.Request()` 指令。

## 🛠️ 核心工具類別 (XQDDEClient)

在專案中應封裝一個簡單的客戶端類別，隱藏 Win32 的底層細節：

```python
from work.scripts.xq.xq_dde_client import XQDDEClient

# 初始化即連動本地 XQ
client = XQDDEClient()

# 獲取資料
price = client.fetch_live("2330.TW", "成交價")
history = client.fetch_history("2330.TW", "20251208", "20251208")
```

## 🧠 設計哲學：本地優先 (Local-First Data)

這種開發範式強調：**「如果本地軟體已經把資料拉回來了，就別再去敲網路的大門。」** 它實現了個人知識庫與專業工具之間的無縫對接。

---

_Created: 2026-01-26 | Sync ID: DDE-PY-SYNC-001_
