# 元件清單 (Components)

> 最後更新：2026-01-03

## 共用元件庫 (兩套架構並存)

### CDN 版 (trips/shared/)
供 CDN React + Babel 頁面使用，透過 `window.TripShared` 全域暴露。

### Vite 版 (src/components/trips/) ✨ NEW
供 Vite + React 頁面使用，ESM 模組格式。

| 檔案                 | 說明                                 |
| -------------------- | ------------------------------------ |
| `TripIcons.jsx`      | lucide-react 圖示統一導出            |
| `TripComponents.jsx` | SectionCard, MapModal 等共用 UI 元件 |
| `index.js`           | 統一導出入口                         |

**輔助函式**：`src/lib/trip-helpers.js`
- `cleanQuery()` - 清理 Gemini API 回應
- `callGeminiAPI()` - 呼叫 Gemini API

---

## CDN 版共用元件 (trips/shared/)

### 1. SectionCard
**位置**: `trips/shared/components.js`

統一的內容卡片容器，用於旅程詳情頁的各個區塊。

```javascript
SectionCard({
  icon: IconComponent, // Lucide icon 元件
  title: "區塊標題",   // 字串或 JSX
  children: [...]      // 內容
})
```

**樣式特點**:
- 白底圓角卡片 (`rounded-3xl`)
- 陰影效果 (`shadow-lg`)
- 邊框 (`border border-gray-100`)
- 毛玻璃效果的背景

**新增 Props (Vite 版)**:
- `collapsible`: Boolean (是否可折疊)
- `defaultOpen`: Boolean (預設展開狀態)
- `forceOpen`: Boolean|Null (受控模式強制展開狀態)

### 1.1 CollapsiblePhase (Vite 版內部元件)
**位置**: `src/pages/trips/ise-shima/App.jsx`

用於行程分頁的階段標題折疊容器。

| Prop        | 類型    | 說明                  |
| ----------- | ------- | --------------------- |
| `title`     | String  | 階段標題              |
| `forceOpen` | Boolean | 受控強制展開 (Global) |

---

## 旅程頁面元件 (2026-ise-shima/index.html)

### 2. Header
頁面頂部橫幅，包含背景圖片、漸層遮罩、標題文字。

| 屬性     | 說明                                                        |
| -------- | ----------------------------------------------------------- |
| 背景圖   | Unsplash 日本風景照                                         |
| 漸層遮罩 | `from-headerPrimary/90 via-headerPrimary/60 to-surface/100` |
| 返回按鈕 | 左上角圓形毛玻璃按鈕                                        |
| 標籤     | 旅程代號標籤 (如 JP-ISE-OSA-2026-VEG-10D)                   |

### 3. StrategySection (行程亮點)
顯示行程摘要統計卡片。

| 元素     | 說明                            |
| -------- | ------------------------------- |
| 統計卡片 | 天數、周遊券天數等數字統計      |
| 功能標籤 | 素食友善、溫泉療癒等 emoji 標籤 |
| 亮點標籤 | VISON 連住、賢島寶生苑等關鍵詞  |

### 4. UsefulLinksSection (實用連結)
分類展示外部連結，含交通票券、住宿、景點三大類。

```javascript
usefulLinks = {
  categories: [
    {
      type: "ticket",
      label: "交通票券",
      icon: "Train",
      items: [{ name, day, url }]
    }
  ]
}
```

### 5. DayCard (每日行程卡片)
可折疊的每日行程卡片，支援受控與非受控模式。

| 屬性              | 類型     | 說明                       |
| ----------------- | -------- | -------------------------- |
| `dayData`         | Object   | 日期、標題、圖片、活動列表 |
| `onOpenRoute`     | Function | 開啟地圖 modal 的回調      |
| `onOpenFoodGuide` | Function | 切換到美食分頁的回調       |
| `isExpanded`      | Boolean  | 受控模式的展開狀態         |
| `onToggle`        | Function | 切換展開狀態的回調         |

**活動項目資料結構**:
```javascript
{
  time: "14:00",
  text: "活動標題",
  subText: "副標題說明",
  note: "補充資訊",
  tips: "警告提示",
  foodGuideLink: "地區名稱",
  map: { type: "route|spot", query, origin, destination }
}
```

### 6. BudgetTable (預算概算表)
響應式預算表格，桌面版顯示表格，手機版顯示卡片列表。

| 資料欄位 | 說明         |
| -------- | ------------ |
| item     | 預算項目名稱 |
| cost     | 金額 (JPY)   |
| note     | 說明備註     |

**功能**:
- 自動計算總計
- 支援多幣別顯示 (JPY/TWD)
- 響應式切換表格/卡片

### 7. MapModal (地圖彈窗)
嵌入 Google Maps iframe 的彈窗。

| 模式    | 說明                                |
| ------- | ----------------------------------- |
| `route` | 路線規劃模式（顯示 A→B 的交通路線） |
| `spot`  | 定點模式（顯示單一地點）            |

### 8. MapView (交通地圖頁)
交通資訊總覽頁面，包含三個可折疊區塊。

| 區塊              | 說明                          |
| ----------------- | ----------------------------- |
| 近鐵特急比較表    | 特急 vs 普通列車時間/費用比較 |
| 松阪⇔VISON 時刻表 | 雙向時刻表卡片                |
| 每日交通路徑總覽  | 可點擊開啟地圖的路線卡片      |

### 9. FoodView (美食指南)
美食資訊列表，支援收藏功能。

**功能**:
- 按地區分類 (臨空城、VISON、伊勢、大阪等)
- 愛心收藏 (localStorage 持久化)
- 收藏項目自動排序至頂部
- 推薦標籤高亮

```javascript
foodData = {
  categories: [{
    location: "地區名",
    day: "Day 1-2",
    sections: [{
      title: "分類標題",
      items: [{ name, type, desc, note, recommended, mapUrl }]
    }]
  }]
}
```

### 10. AIModal (AI 旅遊助手)
AI 聊天與翻譯功能的彈窗。

| 分頁       | 說明                          |
| ---------- | ----------------------------- |
| 行程顧問   | AI 聊天對話 (支援 Gemini API) |
| 素食溝通卡 | 預設的日文素食需求卡片        |

**子元件**:
- `AIChatBubble` - 聊天氣泡
- `TranslatorButton` - 翻譯按鈕

### 11.0 ToggleFAB (展開/折疊按鈕)
**位置**: `index.html` (本地元件)

共用的懸浮收合按鈕 (FAB)，用於控制各頁面的全域展開/折疊狀態。

| Prop         | 類型     | 說明               |
| ------------ | -------- | ------------------ |
| `isExpanded` | Boolean  | 當前展開狀態       |
| `onToggle`   | Function | 切換狀態的回調函數 |

### 11. App (主程式)
應用程式根元件，管理全局狀態和路由。

| 狀態            | 說明                                          |
| --------------- | --------------------------------------------- |
| `activeTab`     | 當前分頁 (overview/itinerary/map/food/budget) |
| `isAIModalOpen` | AI Modal 開關                                 |
| `mapModalData`  | 地圖 Modal 資料                               |
| `allExpanded`   | 全域展開/折疊狀態                             |
| `phaseExpanded` | 各階段展開狀態                                |

---

## 首頁元件 (index.html)

### TimBoy 模擬器 (GameBoyShell)

**位置**: `src/components/GameBoyShell.jsx`

React 封裝的 Game Boy 外殼元件，處理所有外觀與互動邏輯。

| Prop         | 類型      | 說明                                            |
| ------------ | --------- | ----------------------------------------------- |
| `activePage` | string    | 當前頁面 ID ('home', 'trips', 'about', 'tools') |
| `children`   | ReactNode | 螢幕內顯示的內容                                |

| 元件     | CSS Class          | 功能                    |
| -------- | ------------------ | ----------------------- |
| 外殼     | `.gb-shell`        | Game Boy 外殼造型       |
| 螢幕     | `.gb-screen-glass` | 螢幕玻璃與反光效果      |
| 內容區   | `.gb-content`      | 選單與內容顯示區        |
| D-Pad    | `.d-pad-*`         | 模擬方向鍵 (僅音效回饋) |
| A/B 按鈕 | `.ab-btn`          | 模擬按鈕 (僅音效回饋)   |
| 選單項目 | `.gb-btn`          | 可選擇的選單按鈕        |

**功能**:
- **開機動畫**: 處理電源開啟時的 Nintendo 風格動畫
- **音效管理**: 內建 Web Audio API 音效 (開機、點擊、懸停)
- **電源狀態**: 使用 `sessionStorage` 記憶開機狀態

---

## Vite 頁面入口點 (src/pages/)

### 頁面結構

| 頁面       | 入口點                       | HTML                 |
| ---------- | ---------------------------- | -------------------- |
| 首頁       | `src/main.jsx`               | `index.html`         |
| About      | `src/pages/about/main.jsx`   | `about/index.html`   |
| Trips 列表 | `src/pages/trips/main.jsx`   | `trips/index.html`   |
| Tools      | `src/pages/tools/main.jsx`   | `tools/index.html`   |
| Journal    | `src/pages/journal/main.jsx` | `journal/index.html` |

### Firebase 設定

**位置**: `src/lib/firebase.js`

整合 Firebase Firestore 與 Auth，供 Journal 頁面使用。

```javascript
import { db, auth, googleProvider, ... } from '../lib/firebase.js';
```

---

## 日記頁元件 (journal/index.html)

### JournalPage
主頁面元件，管理日記列表與認證狀態。

| 狀態           | 說明                             |
| -------------- | -------------------------------- |
| `entries`      | 日記列表 (從 Firestore 載入)     |
| `user`         | 當前登入的使用者 (Firebase Auth) |
| `isModalOpen`  | 編輯 Modal 開關                  |
| `editingEntry` | 正在編輯的日記項目               |

### JournalCard
日記卡片元件，顯示單一日記摘要。

| Prop       | 類型     | 說明                  |
| ---------- | -------- | --------------------- |
| `entry`    | Object   | 日記資料              |
| `canEdit`  | Boolean  | 是否顯示編輯/刪除按鈕 |
| `onClick`  | Function | 點擊編輯的回調        |
| `onDelete` | Function | 刪除日記的回調        |

### JournalModal
日記編輯彈窗，用於新增/編輯日記。

| 欄位          | 說明                 |
| ------------- | -------------------- |
| `title`       | 日記標題             |
| `content`     | 內容 (Markdown 支援) |
| `mood`        | 心情 emoji           |
| `tags`        | 標籤陣列             |
| `codeSnippet` | 程式碼片段 (選填)    |

---

## 工具頁元件

### 期權模擬器 (bull-put-spread.html)

| 元件     | 功能                         |
| -------- | ---------------------------- |
| 輸入表單 | 標的價格、履約價、權利金輸入 |
| 計算結果 | 最大獲利/虧損/損益平衡點     |
| 風險指標 | 視覺化風險比率               |
| 損益圖表 | Canvas 繪製的損益曲線        |

### 財務儀表板 (financial-dashboard.html)

| 元件       | 功能                 |
| ---------- | -------------------- |
| 趨勢折線圖 | 營收趨勢視覺化       |
| 長條圖     | 獲利能力比較         |
| 時間選擇器 | 季度/半年度/年度切換 |

---

## CSS 變數

### 首頁 (Game Boy 風格)
```css
:root {
  --gb-darkest: #0f380f;
  --gb-dark: #306230;
  --gb-light: #8bac0f;
  --gb-lightest: #9bbc0f;
}
```

### 旅程頁 (Tailwind 擴展)
```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: "#4F46E5",      // Indigo
        headerPrimary: "#0F2540", // Deep Blue
        accent: "#E8968A",        // Coral Rose
        dark: "#1C1C1E",
        subtle: "#6E6E73",
        surface: "#F5F5F0",
        star: "#E8968A",
        love: "#C32F2F"
      }
    }
  }
}
```

---

## 圖示系統

**位置**: `trips/shared/icons.js`

使用 Lucide React 圖示，通過 `window.TripShared.Icons` 全域暴露。

| 圖示           | 用途      |
| -------------- | --------- |
| MapIcon        | 地圖      |
| Calendar       | 日曆/行程 |
| Wallet         | 預算      |
| Train          | 鐵路交通  |
| Bus            | 巴士交通  |
| Utensils       | 餐飲      |
| Hotel          | 住宿      |
| Star           | 評分/收藏 |
| Sparkles       | 亮點/AI   |
| ChevronDown/Up | 展開/折疊 |
| ExternalLink   | 外部連結  |
| MapPin         | 地點標記  |
| Navigation     | 導航      |
