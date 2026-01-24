# 架構決策記錄 (ADR)

本文件記錄 **Project Me** 做出的重大架構決策。

---

## ADR-001: 遷移至 Vite + React

**狀態**：Accepted
**日期**：2025-12

**背景**：
專案最初混合了原生 HTML 與 CDN-based React (Babel standalone) 以進行快速原型製作。隨著專案成長 (新增 Trips, Journal)，缺乏建構步驟 (Build step) 導致了效能問題，也讓模組管理變得困難。

**決策**：
將整個專案遷移至使用標準 React 工具鏈的 **Vite**。

**後果**：

- ✅ **優點**：快速熱更新 (HMR)、最佳化的 Production Build、可使用 npm 生態系。
- ❌ **缺點**：需要建構步驟 (不能直接打開 `index.html` // 已透過 `npm run preview` 解決)。

---

## ADR-002: 使用 Firebase 作為後端服務

**狀態**：Accepted
**日期**：2025-12

**背景**：
我們需要儲存「動態」資料 (日記、旅程評分)，但不想維護專屬的後端伺服器 (VPS)。

**決策**：
使用 **Firebase** (Firestore + Auth)。

**後果**：

- ✅ **優點**：即時同步、免費額度大方、容易與 React 整合。
- ❌ **缺點**：廠商綁定 (Vendor lock-in)、需小心處理 API Key (透過 `.env`)。

---

## ADR-003: 使用 Tailwind CSS 進行樣式設計

**狀態**：Accepted
**日期**：2025-12

**背景**：
為了 "GameBoy" 美學維護大量自定義 CSS 檔案變得繁瑣。我們需要一種能快速迭代 UI 同時保持一致性的方法。

**決策**：
使用 **Tailwind CSS**。

**後果**：

- ✅ **優點**：快速原型製作、樣式與標記共存 (Colocation)、更小的 CSS bundle (自動移除未用力)。
- ❌ **缺點**：HTML 看起來會充滿 class 名稱。

---

## ADR-004: 領域驅動的路由結構

**狀態**：Accepted
**日期**：2025-12

**背景**：
這個 App 是由多個「迷你 App」(Trips, Blog, Tools) 組成，運行在一個 GameBoy 外殼內。

**決策**：

- `src/pages/` 包含每個 "卡帶" (App) 的入口點。
- `trips/` 包含每趟旅程的 _靜態內容_ 與邏輯，實際上作為被匯入的子模組運作。

**後果**：

- 允許每趟「旅程」獨立開發，同時共享核心的 `GameBoyShell` 元件。

---

## ADR-005: 資料爬蟲的生產策略 (Hybrid Crawler)

**狀態**：Accepted
**日期**：2026-01

**背景**：
GitHub Pages 為純靜態主機，無法運行 Node.js 爬蟲。我们需要一種方法來為「CB 可轉債計算機」產生持續更新的歷史資料。

**決策**：
採用 **「Local-First Production」 (本地即生產)** 策略。

1.  **開發者電腦 (Localhost)** 作為唯一的資料生產中心。
2.  **前端 (Browser)** 負責讀取本地產生的 JSON 並同步至 Firebase。
3.  **線上版** 僅作為資料檢視器，不執行爬蟲。

**後果**：

- ✅ **優點**：零伺服器成本 (Serverless)、架構簡單、規避了部署後端爬蟲的維護成本。
- ⚠️ **踩雷紀錄 (The HMR Trap)**：
  - **問題**：爬蟲在 `public/data/` 生成新 JSON 時，Vite (Dev Server) 會偵測到檔案變動並觸發 **Full Page Reload**，導致使用者的搜尋狀態瞬間重置。
  - **解法**：修改 `vite.config.js` 的 `server.watch.ignored`，明確排除 `**/public/data/**`，切斷「資料面」與「介面面」的熱更新連結。
