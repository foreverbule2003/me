# 待辦事項 (TODO)

> 最後更新：2026-06-08 (Tokyo-UI-Polish)

## 🔴 P0: 立即執行 (Pending)

- [ ] (暫無 P0 項目)

---

## 🟡 P1: 下階段技術優化 (Future Tech)

> 目標：持續優化雲端架構與開發者體驗。

- [ ] (暫無 P1 項目)

---

## 🟢 P2: 功能擴充與新行程 (Features & Trips)

> 目標：持續產出新內容與增強 AI 體驗。

- [ ] **數據品質哨兵**: 實作自動化偵測標的「除權息」導致的轉換價跳變警報。 <!-- captured: 2026-01-30 -->

---

## ⚪ P3: 舊版維護與歷史保存 (Legacy & History)

> 註：保留舊版頁面作為 Vibe Coding 進化的歷史見證，僅在必要時進行維護，不強制遷移。

- [ ] 完善 AI 旅遊助手功能
- [ ] 完成 2025-osaka 行程規劃
- [ ] `trips/2025-osaka/` (Legacy HTML)
- [ ] `trips/2025-cebu/` (Legacy HTML)

## 🏁 已完成歸檔 (Archived)

### 2026-06-14

- [x] **2026-Tokyo 離線 PDF 匯出優化**：
  - 開發 `generate_master_guide.mjs` 自動化腳本，將 `data.js` 的完整行程、住宿、美食、購物圖文清單等完美轉換為高保真 PDF。
  - 對齊網頁版 8 個頁籤的視覺順序，並加入 PDF 目錄錨點 (Anchor Links) 以支援點擊跳轉。

### 2026-06-13 (12:56)

- [x] **2026-Tokyo 資料更新與擴充**：
  - **美食清單擴充**：在「澀谷」地區新增三家素食友善（Vegan）餐廳，包含幕末カレー、真さか MASAKA 居酒屋、與 THE NUTS EXCHANGE 咖啡廳。
  - **天氣預報更新**：更新 10 日間天氣預報資料，調降輕井澤氣溫至符合避暑勝地的合理範圍 (20~22°C)，並微調各天降雨機率與描述。
  - **實用連結更新**：將 N'EX 成田特快車票的 Klook 連結替換為最新有效版本。

### 2026-06-09 (22:50)

- [x] **交通與路線分頁細節打磨**：
  - **站名與月台整合**：拔除原先站名與月台過度突出的圓角標籤與 Emoji，將兩者整合至同一行並以 `/` 分隔（如：`東京站 / 1號月台`），大幅提升介面極簡高級感。
  - **路線名稱去重**：自動生成標籤（如特急、新幹線）後，手動清除了資料庫中對應的 `[特急]`、`[新幹線]` 贅字與內建 🚄/🚇 Emoji，保留純粹的文字與 Lucide 高質感純色圖示。
  - **排版順序優化**：將 Day 4/5 交通切換方案的「日期標籤」移至最頂部，提升閱讀動線合理性；將新幹線「官方時刻表」連結移至時間表格下方，並精簡連結文字。
  - **排版對齊優化**：利用 `ml-auto` 將各交通段的「乘車時間預估（約 X 分）」完美向右對齊，解決右側留白不平衡的問題；並將 D8 的票價說明統一為 D1 的格式。

### 2026-06-09 (21:45)

- [x] **預算分頁排版與文字精修**：
  - 將「總預算估算數字」與「圓餅圖」合併進同一個磨砂玻璃圓角卡片中，上半部維持極簡單行排版，下半部嵌入高對比莫蘭迪色系圓餅圖（已徹底拔除相近的綠色與黃褐色，確保高辨識度）。
  - 精簡所有預算大項名稱為雙字（機票、交通、住宿、餐飲、購物），並為機票托運說明加入換行指令 (`\n` 搭配 `whitespace-pre-line`) 以防手機版破版。
  - 將各項目之次要說明文字重新對齊精簡（如「兩人每晚平均約 ¥22,000」、「每人總計約 ¥18,030」）。

### 2026-06-09 (21:05)

- [x] **景點與美食分頁視覺標籤優化**：與使用者互動測試多款 Tailwind 及日本傳統顏色後，最終定案使用大師特調色「珊瑚朱 (Sango, #E86B50)」作為分類標籤的高對比強調色，並去除了原先的背景底框，以純文字高對比方式呈現，完美契合「森林綠」主題同時不失日式高級感。
- [x] **DayCard 說明文字防溢位與票價圖示收斂**：針對 DayCard 右側無 icon 導致文字說明溢位破壞版面的問題，加入了強制最小預留空間 (`w-7 ml-1`)。並將原本過於搶眼的金色硬幣票價樣式，改為極簡低調的森林透視綠 (`text-[#5F7A61]/80`) 配上 Lucide `Ticket` 小圖示，確保視覺重量符合附註說明的層級。
- [x] **第一天出發與機場接送行程補齊**：在 Day 1 首項加入從家裡出發的機場接送行程，讓第一天的出發節奏更加完整。


### 2026-06-09 (20:30)

- [x] **UI 細節與連動功能優化 (Part 2)**：
  - **手機版導覽列提示**：為頂部毛玻璃 Tab 導覽列加上左右邊緣的半透明漸層遮罩 (mask-image fade-out)，強烈提示使用者區塊可左右滑動。
  - **資訊層級對比優化**：將 DayCard 中的時間標示升級為「森林綠時間膠囊」樣式 (固定寬度、置中、加底色)，並將每日結尾的 Highlight 區塊背景改為與主題融合的極淡透視綠色 (`bg-[#5F7A61]/3%`)。
  - **首圖視差滾動**：為全版 Hero Image 加入微幅的視差滾動 (Parallax Effect) 與位移縮放，提升首頁滑動時的空間景深感。

### 2026-06-08 (23:00)

- [x] **UI 細節與連動功能優化**：
  - **美食分頁連動**：行程清單支援識別「美食、晚餐、早餐」等關鍵字或隱藏 `isFood` 標記，點擊刀叉圖示可自動跳轉至美食分頁對應天數並捲動定位。
  - **排版對齊**：統一全站所有卡片頂部的「Day X」日期標籤寬度（72px 置中），讓後方地點與標題達到完美的垂直對齊。
  - **視覺潔淨**：移除行程資料中的「美食：」、「晚餐：」等冗餘前綴，並將方案之間的「或」改為全形斜線「／」，讓畫面更清爽。
  - **間距收斂**：縮小了每日行程末尾與 Highlight 區塊之間的過大留白 (margin-top/padding-top 調整)，整體佈局更緊湊。


### 2026-06-07 (22:40)

- [x] **預算分頁資料拆分與 UI 優化**：將機票預算改為單人標示（移除兩人總價的混淆描述）；詳細拆分原有的交通大項目為 N'EX 特急、新幹線、腳踏車（非電動）與 ICOCA/Suica 等四個細項並標示各別預估花費；最後移除了預算表總計欄位下方的多餘「預算重點」文字，提升版面潔淨度。同步更新了 `data.js`, `BudgetSection.jsx` 與 `spec.md`。

### 2026-06-07 (22:20)

- [x] **行程概覽城市保留與行程晚餐移除**：優化 2026 東京行程資料。將總覽行程概覽（overviewData）的標題精簡為城市名稱，移除「慢活探索」等無關字眼；並將 Itinerary 中所有尚未決定之晚餐活動項目全數移出。同時將 spec.md 中對應的行程總覽表格與每日詳細行程表格同步精簡。

### 2026-06-07 (13:55)

- [x] **行程大標題精簡、標題防折行優化與住宿不寫死**：將 Day 5 大標題與方案標題中的「全天」與「（紀念日）」字眼移除，改為乾淨的「輕井澤慢活」。將輕井澤等尚未預訂之飯店名稱自黑色粗體活動標題中移除，改為簡潔的「飯店 Check-in」，飯店候選名稱則放入 `subText` 中（落實住宿不寫死的原則）。精簡所有粗體活動標題，確保在手機版面不會折行。此外，將 `DayCard.jsx` 中的交通 note 和 tips 移入 `flex-1 min-w-0` 內容區內，防止手機版面時，長說明的文字溢出到右側 icon 顯示的區域。

### 2026-06-07 (13:30)

- [x] **行程與交通分頁深度連動與自動定位**：重構行程分頁，移除活動中冗餘的交通說明區塊，改為專屬的交通 icon。點擊 icon 可直接跳轉至交通分頁，並自動平滑捲動至該天數對應的交通規劃卡片。

### 2026-06-07 (13:20)

- [x] **交通票價補齊與說明去重**：補齊 2026 東京旅程中所有交通段之票價（包含成田特快、新幹線、信濃鐵道與急行巴士）。針對多段轉乘（如 Day 4 高崎方案 A、草津溫泉）採用分列價格呈現而非加總；並將 UI 上的票價由標籤樣式改為下方說明區塊（🪙 票價）顯示，同時清理了下方說明中重複出現的金額數字。同步更新了 spec.md 中的交通規劃表格。
- [x] **Day 4-5 多方案動態切換深度優化與標籤精簡**：在 data.js、DayCard.jsx 與 App.jsx 中進行多方案邏輯與 UI 的二度精修。將 Day 4 與 Day 5 的方案切換標籤進一步精簡為純目的地字眼（輕井澤、高崎、草津溫泉），移除所有的「方案 X：」與「(住宿)」前綴，防止在手機版面折行。同時，行程大標題與方案一的名稱已徹底移除「大宮」字眼；為 Day 4 交通的高崎方案補齊了「大宮轉乘（3號轉17/18月台）」與「湘南新宿線特別快速直達（3號月台）」的月台資訊。最重要的是，已將 Day 5 的行程 (itineraryData) 與交通 (recommendedRoutes) 也成功改寫為 options 架構，支援對應 Day 4 三種住宿點出發返回輕井澤 APA 飯店的動態行程與交通切換。

### 2026-06-07 (13:10)

- [x] **Day 4 多方案切換標籤優化與高崎路線票價對比**：在 data.js、DayCard.jsx 與 App.jsx 中微調交通與行程分頁之方案標籤為純目的地名稱（方案 1：輕井澤、方案 2：高崎、方案 3：草津溫泉），移除冗餘的括號住宿說明。同時，在交通分頁的方案 2（高崎）中新增「大宮轉乘新幹線」與「JR 湘南新宿線特別快速直達」兩條可選路線，並在步驟中詳細註明乘車時間、票價與價差對比（新幹線共約 ¥4,490 vs 直達普通車 ¥1,980，省下特急券費用 ¥2,510），提供更完備的交通規劃考量。

### 2026-06-07 (12:15)

- [x] **景點分頁與導覽列架構調整**：將 2026 東京旅程頁面中原有的購物清單重構，獨立出「景點」分頁，整合 Google Maps 擷取之觀光點。更新導覽列順序與命名為精簡的七個雙字 Tab（總覽、行程、交通、景點、美食、購物、住宿）。將合併的「澀谷・表參道」拆分為「澀谷」與「原宿・表參道」，並補齊 SHIBUYA SKY 展望台（附票價）、橫濱空中纜車（附票價）、輕井澤高原教會、星野溫泉 蜻蛉之湯（附泡湯價）、輕井澤野鳥之森、經典麵包三名店，以及原宿 AFURI 與九州じゃんがら拉麵，並移除 neel 咖啡廳等景點美食。

### 2026-06-06 (22:55)

- [x] **新增購物清單「居家」分類與 MUJI 品項**：在 data.js 的 wishlist 中新增居家分類，並加入 MUJI 耳環收納盒及檸檬草精油品項，補齊對應的日本官網售價（390円 / 890円）與實拍圖片。

### 2026-06-06 (15:37)

- [x] **購物清單精修與內容擴充**：移除卡片外層的地點標籤與多餘日文，讓版面更清爽。完成志摩旅程商品導入 (肌研、DUO)，新增 KOSE 噴霧、SAWAYA 果醬與無印柚子糖真實商品圖。並調整圖片容器由 `object-cover` 變更為 `object-contain p-1` 徹底解決商品圖邊緣裁切問題。

### 2026-05-28 (22:45)

- [x] **日期標籤與天氣卡片對稱性優化**：重構交通、住宿、美食 Tab 展開後的日期 pill 佈局，獨立移出並設定 `mb-4`（16px），與 SectionCard 展開後的頂部 `pt-4` (16px) 形成完美的上下對稱；同時移除天氣預報卡片中 `DAY X` 標籤的固定高度 `h-[22px]` 容器，微調 padding 與 margin 以釋放空間，達成極佳的排版對稱與視覺呼吸感。
- **全站美食清單大掃除與標點大統一**：
  - 清理所有美食備註中重複囉唆的廢話（如「可點蔬菜口味」、「蕎麥麵本身無肉」、「全素食材」等），只在真正需要注意的關鍵飲食與高湯備註處以低調的一般深灰色呈現。
  - 將美食名稱旁邊的「店家類型（type）」改用亮眼醒目的橘色粗體著色，讓美食清單具有極佳的導覽聚焦效果。
  - 統一美食說明與類別的標點符號：類別斜線統一為帶空格的 `/`，說明一律採用全形逗號 `，` 分隔，並徹底消除所有的句尾句號，打造極簡文青風旅遊指南。
  - 增修兩家澀谷人氣名店：`AFURI 澀谷` (補回推薦小黃星) 與 `YAYOI 彌生軒 澀谷新南口店`，補齊 Google Maps 搜尋連結。

### 2026-05-27 (22:37)

- [x] **購物分頁優化與購買清單**：刪除備用/返程「其他」分類，全新打造高質感且支援 Firebase 雲端即時同步的「購買清單」SectionCard，整合分類過濾 Tabs（二字簡化）與文字採購比例。
- [x] **交通分頁標籤精簡**：移除了交通路線內部冗餘的「預估總時間」標籤，簡化版面。
- [x] **全頁面日期標示大統一**：統一將住宿、美食與交通分頁展開後的日期格式，改為圓角淡綠色 Badge，移除多餘的「日期：」字樣；並補齊了交通多天行程（Day 2-3、Day 5-6）的星期幾資訊。

### 2026-05-24 (21:42)

- [x] **Tokyo UI 視覺重構 (Glass Effect)**: 修復 Hero Image 邊界斷裂感（導入 `mask-image` 漸層遮罩）、移除多餘邊框，並替附屬面板（Timeline, Flight, Checklist, Shopping 等）導入 `variant="glass"` 半透明毛玻璃材質，完美還原高質感層次對比。

### 2026-05-12 (16:15)

- [x] **TWII Bias Analysis Tool**: 實作加權指數乖離率 (Bias) 分析工具 `tools/twii-bias.html`，整合 K 線圖與 MA 乖離率熱圖。
- [x] **Mobile Optimization**: 優化 `twii-bias.html` 的行動裝置顯示效果，包含 Viewport 設定、響應式表格與 Plotly 圖表觸控縮放支援。

### 2026-05-10 (13:50)

- [x] **2026-tokyo (東京・橫濱・輕井澤 8 日旅)**：完成 v1.3 行程規格、確認 SL394/MM625 航班資訊、實作「蛋奶素」日文溝通卡、紀念日 UI 視覺效果 (Rose/Pink Theme)，並同步更新 29 間 Google Maps 美食清單。
- [x] **Tokyo UI 視覺重構 (Forest Theme)**：移除 Hero Image 濾鏡、全站色系統一為森林綠/醒木色、清除所有橘色/紫色 Icon，購物頁籤結構扁平化（與美食頁籤對齊）。
- [x] **ShoppingSection 元件萃取**：將購物清單邏輯獨立為 `shared/ShoppingSection.jsx`，支援 `forest`/`default` 主題切換，並更新 `template/` 模板目錄（補齊 `TRIP_ID`、`weatherData`、`linksData`、`checklistData`、`vegetarianCard`）。

### 2026-04-29 (11:56)

- [x] **GCP 費用監控與優化 (全面稽核)**：完成 GCP 帳單全面稽核，實作 `xq_bridge.py` Delta Check（差異比對）、`hot-cb-cloud.js` 防重複快照寫入、停用閒置 GCP 服務（Dataform/Dataplex/Test Lab），並限制 API 金鑰與停用高危 Maps API。參閱：[gcp_billing_audit_20260428.md](file:///c:/Users/forev/myDev/me/docs/gcp_billing_audit_20260428.md)

### 2026-04-02 (15:35)

- [x] **Home Navigation**: 為財務儀表板新增具備毛玻璃效果的「回到首頁」按鈕與麵包屑導覽 (Breadcrumb)。
- [x] **UI Bug Fix (TimBoy)**: 修正工具選單重複顯示兩個 BACK 按鈕的問題，並同步選單標籤文字。
- [x] **Financial Dashboard (React Migration)**: 將 `some-company.html` 遷移至 Vite + React 模組化架構。
- [x] **No-Scroll Layout & UI Balance**: 移除 min-width 並縮減邊距，實現全站無捲軸、高密度的專業金融報表感。
- [x] **Typography Scaling**: 統一並放大報表字體至 text-sm (14px) 與 text-base (16px)。
- [x] **Dynamic Context Labels**: 實作動態表頭標籤（如：營收/QoQ），精確對齊數據意涵。
- [x] **Clutter Reduction**: 移除 YoY/QoQ 圖示，改用簡約數學正負號。

### 2026-02-06 (14:30)

- [x] **React Migration (Calculator)**: 完成 `cb-calculator.html` 遷移至 React 架構 (v3.0)，加上元件拆分與邏輯復用。
- [x] **UI Fix**: 解決搜尋下拉選單 (Dropdown) 被容器截斷與超出邊界的問題 (Overflow & Relative Fix)。
- [x] **Typography Polish**: 實作 CB 工具介面的字體大小統一化 (Input Panel & Labels)，嚴格遵守 SM/XS 雙尺寸規範。
- [x] **Typography Unification**: 統一 CB 戰情室與 CB 計算機字體規範 (批次替換 50+ 處樣式)。
- [x] **Style Guide**: 建立 `STYLE_GUIDE.md` 設計規範文件。

### 2026-02-05 (14:25)

- [x] **Strategy Revert**: 將每日同步腳本切回 PChome 爬蟲，以解決 DDE 資料缺漏問題。
- [x] **DDE Fix**: 修正 DDE 腳本的排序邏輯 (Sort by Volume)。

### 2026-02-05 (14:15)

- [x] **Hotfix**: 修復 `WarRoom` 白畫面問題 (SyntaxError in utils.js)。
- [x] **Automation**: 建立 `Daily_Hot_CB_Sync.bat` 供 Task Scheduler 使用。

### 2026-02-04 (11:50)

- [x] **Hybrid DDE Sync**: 建立 `fetch-hot-cb-dde.py` 以取代不穩定的 PChome 爬蟲，實現可靠的每日收盤價同步。
- [x] **History Sync Resilience**: 於 `fetch-cb-history.js` 實作 Firebase Quota Exceeded 攔截機制，防止腳本崩潰並自動切換至 Local-Only 模式。
- [x] **DDE Fallback Logic**: 針對無量個股實作 `PreClose` 自動回補，修正戰情室數據空白問題。

### 2026-02-03 (12:00)

- [x] **Blank Premium Fix**: 修正戰情室議價率空白問題，改採 On-Demand Fetch 直接讀取主資料庫。
- [x] **React Stability**: 解決 Invalid Hook Call 與 Custom Element 重複註冊問題，確保戰情室渲染穩定。
- [x] **Cloud Architecture**: 完成 `cb-data.json` 移除與 `utils.js` 雲端化重構。
- [x] **Watchlist Enhancements**: 實作追蹤清單分類篩選 (Filter Chips) 與新增時的分類選單 (Dropdown UI)，優化長名單的管理體驗。
- [x] **Cloud Sync Fix**: 修正 `fetch-cb-history.js` 中錯誤的 `docSnap.exists` 呼叫方式，解決 GitHub Actions 同步失敗問題。

### 2026-02-03 (09:45)

- [x] **Security Fix (High Severity)**: 解決 Google Cloud API Key 洩漏問題，遷移至環境變數並實施 Referrer 限制，成功修復 403 錯誤。
- [x] **React Migration (Phase 3)**: 完成 CB 戰情室由 HTML/JS 遷移至 Vite + React 架構，實現組件化開發。
- [x] **UI Restoration**: 根據用戶反饋恢復 DateNavigator 經典樣式，並優化 Tab 導航配色與縮放效果。
- [x] **Stability Fix**: 解決 `allMetadata.find` 與 `updatedAt.toDate` 等關鍵執行期報錯，增強代碼防礙性。
- [x] **Test Consolidation**: 整合 React 專屬驗證至 `tests/war-room.spec.js`，達成測試集單一化。

### 2026-02-02 (13:50)

- [x] **Logic Core Refactoring**: 成功將 CB 計算邏輯抽離至 `src/lib/cb-logic.mjs`，消除 `cb-war-room` 與 `cb-calculator` 的代碼重複。
- [x] **Console Guard**: 實作 `tests/console-guard.spec.js` 主動偵測執行期錯誤，成功修復 `measureFetch` 未定義問題並發現 Firestore 索引缺失漏洞。
- [x] **Library Consolidation**: 集中管理 Firebase Client 與共用樣式 (`cb-theme.css`)。

### 2026-02-02 (20:30)

- [x] **Data Status Indicator**: 實作戰情室資料狀態儀表，明確標示「今日資料」或「收盤快照」，解決盤中資訊落差誤解。
- [x] **Scope Correction**: 修正介面用語，將「即時報價」降級為「每日快照/今日資料」，符合系統真實能力。
- [x] **Watchlist Fix**: 修復追蹤清單回歸 Bug，增加 `category` 過濾邏輯，隱藏系統自動同步但未追蹤的標的。

### 2026-02-02 (10:45)

- [x] **Data Sync Fix**: 統一全專案 Firebase Admin 金鑰檔名為 `serviceAccountKey.json`，修復 DDE 同步工具。
- [x] **Investigation**: 驗證 Data Flow 雙軌架構文件 (`CB_DATA_FLOW.md`) 與實作的一致性。

### 2026-01-30 (16:40)

- [x] **Performance Quick Win**: 實作 `DotGothic16` 字體優化 (Preload + Swap)，Lighthouse Performance 評分提升至 90 分 (LCP 2.3s)。

### 2026-01-30 (16:30)

- [x] **Mobile-First Upgrade (v1.9.5)**: 完成 Viewport 全螢幕優化、手勢導航 (Swipe-Back) 與觸控回饋系統。
- [x] **Firebase Utils Refactor**: 建立 `tools/firebase-utils.js` 並重構 4 個相關腳本，消除重複初始化代碼。

### 2026-01-30 (14:30)

- [x] **Data-Code Decoupling (ADR-007)**: 從 Git 移除頻繁變動的 `cb-data.json` 並重構前端改向 Firestore 讀取。
- [x] **Performance Optimization**: 實作前端 `LocalStorage` 緩存機制（效期 1 小時），平衡雲端同步與加載速度。
- [x] **Metrics Tracking**: 實作雲端執行耗時追蹤 (`measureFirestore` & `logPerfEvent`)。
- [x] **Documentation Sync**: 歸檔顧問策略文件，完成 `ARCHITECTURE.md` (ADR-007) 與 `CB_DATA_FLOW.md` 重大更新。

### 2026-01-30 (12:45)

- [x] **Meta Automation (V1.7)**: 建立 CB 數據維護流水線 (ADR-007)，整合 Excel 匯入、DDE 同步與 JSON 導出。
- [x] **Smart Naming**: 實作智慧名稱補正邏輯，自動移除 DDE 亂碼並補齊中文序號與 KY 標記。
- [x] **Precision Protection**: 於 `xq_bridge.py` 實作精確數據保護機制，防止 DDE 整數數值覆蓋 Excel 高精度轉換價。
- [x] **One-Click Sync**: 建立 `CB_Sync_Master.bat` 與 `/sync-cb` 工作流，實現 Windows 一鍵自動同步流程。
- [x] **Data Integrity**: 完成 124 筆精確轉換價匯入，與全市場 358 筆標的名稱補正。

### 2026-01-29 (22:00)

- [x] **UI Optimization (TimBoy V1.6)**: 移除內部視圖 Header (About, Trips, Journal, Tools)，釋放垂直空間。
- [x] **UX Refactor**: 實作「簡約置底」導航佈局，移除導航區冗餘粗線邊框。
- [x] **Typography Sync**: 統一全站字體舒適度標準 (16px + 6px padding)，修復中文 `font-bold` 導致的字體回退 Bug。

### 2026-01-29 (17:30)

- [x] **UI Optimization**: 實作「漲跌百分比」條件底色邏輯，僅在漲跌停 (>= 9.9%) 時顯示底色。
- [x] **Bug Fix**: 修正因變更 `renderDashboard` 意外刪除 `flashClass` 導致的渲染錯誤。 (ReferenceError)

### 2026-01-29 (15:30)

- [x] **Bug Fix**: 解決 `SyntaxError: Unexpected token 'F'`，修正 `cb-fetcher.js` 偵錯日誌汙染 stdout 的問題。
- [x] **Bug Fix**: 解決 `TypeError: db.collection`，強化 `cb-war-room.html` 效能監控邏輯並強制清除 `dist/` 快取。
- [x] **Bug Fix**: 修正 `hot-cb-cloud.js` 參數錯誤導致的同步失效與模擬數據複寫 Bug。
- [x] **Bug Fix**: 修正 `cb-calculator.html` 載入 `cb-data.json` 失敗的問題，改為 Firestore On-Demand 查詢。(Hotfix v1.5.2)
- [x] **UX Optimization**: 實作智慧快取判定，自動穿透異常的小尺寸 (<= 5) 本地快取資料。
- [x] **Architecture Refactor**: 完成 DDE 橋接器 (`xq_bridge.py`) 的模組化分層重構 (DDE-Mod-V1)。
- [x] **Cloud Migration**: 徹底移除本地 `cb-data.json`，改為純 Firestore 雲端中繼資料驅動。
- [x] **Data Integrity**: 實作 Analysis Drawer 的雲端中繼資料手動修正與立即儲存功能。
- [x] **Maintenance**: 批次同步 355 筆標的中繼資料至 Firestore，實現資料自動維護。
- [x] **Git Clean**: 更新 `.gitignore` 排除 Python 快取檔，並清理大量冗餘 JSON 資料。

### 2026-01-28 (18:15)

- [x] **Data Backfill**: 完成 TPEX 歷史資料 (11天) 補回至 Firestore，修正成交量計算邏輯與 UI 響應式顯示。
- [x] **Feasibility Study**: 完成 DDE 歷史數據回補研究（結論：放棄 DDE 路徑，改採 Web API）。
- [x] **Bug Fix**: 徹底封鎖 Firestore 子集合寫入觸發的「幽靈註冊」漏洞 (Deep Fix)。
- [x] **Cleanup**: 再次執行 `clean_auto_watchlist.mjs` 並清理 17 個殘留空殼標的。
- [x] **Bug Fix**: 修正戰情室日期切換卡死問題 (Verified & Decoupled: 2026-01-28)
- [x] **Hotfix**: 修復分析抽屜 `classList` 錯誤與崩潰問題 (Null Guard)。
- [x] **Data Integrity**: 修正 23683 轉換價異常並補正雲端數據。
- [x] **Engine Fix**: 防止 `fetch-cb-history.js` 對全市場標的進行自動註冊。
- [x] **Cleanup**: 執行 `clean_auto_watchlist.mjs` 並清理 10+ 個臨時調試腳本。
- [x] **Bug Fix**: 修正戰情室限價 CB 價格顯示錯誤 (Verified: 2026-01-28)
- [x] **Data Architecture**: 實作雙軌資料流與智慧同步架構 (ADR-006) (Completed: 2026-01-27)
- [x] **Bug Fix**: 修正戰情室價格 NaN 與遺留模組報錯 (Completed: 2026-01-27)
- [x] **Automation**: 完成 `fetch-hot-cb.js` 每日更新與自動提交 (Completed: 2026-01-27)
- [x] **Cleanup**: 刪除 21 個歷史 JSON 檔案 (-13k lines) (Completed: 2026-01-27)
- [x] **Documentation**: 建立 `CB_DATA_FLOW.md` 正式檔案 (Completed: 2026-01-27)

> 註：已完成項目會定期搬移至 `CHANGELOG.md` 並在此清理。

- [x] **CB 戰情室**: 實作「我的追蹤」頁籤登入權限限制 (Fixed: 2026-01-26)
- [x] **UI Refactor**: 合併分析抽屜中的資訊卡片 (Unified Card V10) (Fixed: 2026-01-26)

- [x] **Component Refactor**: 將「歷史溢價走勢圖」重構為獨立可複用 Widget (`CbPremiumHistoryChart.mjs`)，完全封裝 UI 控制與繪圖邏輯。 (Fixed: 2026-01-25)
- [x] **Crawler Review**: 重新審查爬蟲資料來源規則與邏輯 (基於 DATASOURCES.md) (Fixed: 2026-01-25)
- [x] **Bug**: 歷史溢價走勢圖顯示空白，且資料筆數顯示為 -- (Fixed: 2026-01-25)
- [x] **Data Execution**: [Backfilling...] 完成針對 Watchlist (15 items) 的精準回補程序 (Fixed: 2026-01-25)
- [x] **Smart Backfill**: 實作 `fetch-cb-history.js` 的智慧回補邏輯 (CLI Layer) (Fixed: 2026-01-25)
- [x] **Doc Refactor**: 調整 TODO.md 歸檔區塊排序邏輯 (Fixed: 2026-01-25)
- [x] **Hotfix**: 解決 `firebase.auth` 未定義導致的腳本崩潰 (Script Crash) (Fixed: 2026-01-25)
- [x] **Hotfix**: 解決 `outputs` 初始化順序錯誤 (TDZ Error) (Fixed: 2026-01-25)
- [x] **UI Refactor**: 重構 CB 計算機顯示介面 (V10: 整合標籤、去除圖示、垂直壓縮) (Fixed: 2026-01-25)
- [x] **Bug**: 點擊商品後的個股溢價圖表顯示異常 (Fixed: 2026-01-25)
- [x] **Bug**: 戰情室歷史溢價走勢圖 (Chart) 的 MAX 按鈕功能失效 (Fixed: 2026-01-25)
- [x] **性能監控 (Phase 1-3)**: 實作前端效能追蹤 (Web Vitals/GA4/Latency/Signal) (Completed: 2026-01-24)
- [x] **Refactor Guard**: 於下一次 UI 重構時試行並驗證防禦性開發機制 (Completed: 2026-01-24)
- [x] **Vibe Coding 驗證**: 完成「側邊欄動畫」的快速實作與自動歸檔測試，確認 /capture 指令與歸檔流程運作正常。 ✅ (Capture: 2026-01-24)
- [x] **Ultimate Integration (Phase 3)**: 將 CB 計算機完全併入戰情室，實現單頁分析體驗、即時數據自動補全 (Live Enrichment)、與爬蟲腳本標準化。 ✅ (Completed: 2026-01-24)
- [x] **UI Polish**: 完善 2026-tokyo 交通分頁的 N'EX 時刻表動態顯示與排版修正 (Completed: 2026-06-08)
