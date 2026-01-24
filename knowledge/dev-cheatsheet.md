# 🛠️ 開發者 Cheat Sheet (Dev Cheatsheet)

> 記錄開發過程中學到的重要模式、技巧與踩雷紀錄。

---

## 📊 資料處理模式

### Incremental Update（增量更新）

**概念**：只抓取最新資料，避免每次都重新爬取完整歷史。

**實作步驟**

1. 從資料庫讀取最後一次更新的日期 (`lastDate`)。
2. 只向 API 請求 `lastDate` 之後的資料。
3. 把新資料 `push` 到本地歷史陣列，然後寫回。

**好處**：減少流量、加速回應、降低 API 請求次數。

**應用案例**：CB 計算機的歷史溢價率資料同步。

---

## 🎨 UI/UX 模式

### Progressive Disclosure（漸進式揭露）

**概念**：在使用者需要時才顯示進階資訊，降低認知負荷。

**實作方式**

- 初始只顯示核心輸入欄位。
- 使用者觸發動作後，才滑出詳細參數與結果區塊。
- 載入期間禁用按鈕，防止重複提交。

**效果**：使用者感受到「一步步引導」而非一次性展示大量空白欄位。

**應用案例**：CB 計算機的搜尋流程。

---

## ⚠️ 踩雷紀錄 (Gotchas)

### HMR Trap（熱模組更新陷阱）

**問題**：Vite 在開發模式下監控 `public/data/`，後端爬蟲產生新 JSON 時觸發 **Full Page Reload**，導致前端狀態重置。

**解法**

```javascript
// vite.config.js
server: {
  watch: {
    ignored: ["**/public/data/**"];
  }
}
```

**教訓**：開發工具的自動刷新功能雖好，卻可能與資料產生衝突，必須手動設定排除規則。

---

### State Locking（狀態鎖定）

**問題**：非同步操作期間使用者可能重複點擊，導致 Race Condition。

**解法**：操作開始時立即 `disable` 所有相關輸入/按鈕，完成後再 `enable`。

**教訓**：與其寫複雜的防抖邏輯，不如直接「暫時剝奪使用者的控制權」。

---

## 🏗️ 架構模式

### Local-First Production（本地即生產）

**概念**：在靜態主機 (如 GitHub Pages) 無法運行後端時，將開發者電腦作為資料生產中心。

**流程**

1. 本地 (Localhost) 執行爬蟲產生資料。
2. 前端同步資料到雲端 (Firebase)。
3. 線上版僅作為資料檢視器。

**優點**：零伺服器成本、架構簡單。

**參考**：[ADR-005](../docs/ARCHITECTURE.md)

---

## 📚 相關連結

- [AI 顧問系統](./ai-advisor-system.md) - 專家團隊協作模式
- [LLM 使用技巧](./llm-usage-patterns.md) - 大語言模型最佳實踐
- [架構決策記錄](../docs/ARCHITECTURE.md) - ADR 文件
