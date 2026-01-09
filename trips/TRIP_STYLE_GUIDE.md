# 通用行程頁面設計規範 (Universal Trip Design System)

本指南定義了專案中**所有行程頁面 (Trip Page)** 的設計系統與架構規範。所有新增的旅程都應遵循此標準。

## 1. 架構與技術 (Architecture)

- **框架 Framework**: Single File React App (單一 HTML 檔 + 內嵌 Babel/React)。
- **樣式 Styling**: Tailwind CSS (透過 CDN 引入)。
- **圖示 Icons**: Lucide React (透過 iconify 或內嵌 SVG wrapper)。
- **動畫 Animation**: CSS Keyframes (`fadeUp`, `float`) + Tailwind utility classes。

## 2. 設計系統 (Design System)

### 2.1 色彩計畫 (Color Palette)

建議定義於 Tailwind Config 中，可根據特定旅程微調，但基礎語意應保持一致：

| 顏色名稱 (Name) | 範例色碼 (Standard) | 用途 (Usage)                         |
| :-------------- | :------------------ | :----------------------------------- |
| **primary**     | `#0F2540`           | 品牌/旅程主色，用於 Header、主要按鈕 |
| **accent**      | `#C5A059`           | 提亮色，用於圖示、強調文字           |
| **dark**        | `#1C1C1E`           | 主要文字                             |
| **subtle**      | `#6E6E73`           | 次要文字、說明資訊                   |
| **surface**     | `#F5F5F0`           | 頁面背景                             |
| **love**        | `#C32F2F`           | 警告、錯誤提示、收藏                 |
| **star**        | `#D4AF37`           | 評分、星星                           |

### 2.2 字體 (Typography)

- **標題 Display Font**: `Noto Serif JP` (襯線體，或配合旅程風格之襯線體)。
- **內文 Body Font**: `DM Sans` (無襯線體，確保高易讀性)。

### 2.3 通用 UI 模式 (Common UI Patterns)

- **毛玻璃效果 Glass Effect**: `backdrop-filter: blur(12px)` + `bg-white/85`。
- **圓角 Rounded Corners**:
  - 大容器/卡片: `rounded-3xl`
  - 內部元素: `rounded-xl`
- **陰影 Shadows**: 卡片 `shadow-lg`，浮層 `shadow-2xl`。
- **動畫 Animations**: 統一使用 `animate-fade-up` 作為進場效果。

### 2.4 標題層級 (Typography Hierarchy)

| 層級                   | Class                                        | Icon 規格               | 用途         |
| ---------------------- | -------------------------------------------- | ----------------------- | ------------ |
| **SectionCard 主標題** | 共用元件控制                                 | `size={20}`             | 區塊大標題   |
| **子標題 (h3)**        | `text-base font-bold text-gray-800`          | `text-accent size={18}` | 區塊內子標題 |
| **小標題 (h4)**        | `text-sm font-bold text-gray-800`            | -                       | 分類標題     |
| **階段橫幅**           | `text-sm md:text-lg font-bold text-gray-600` | 珊瑚色圓點指示器        | 手機優化     |

```jsx
// 子標題範例
<h3 className="text-base font-bold text-gray-800 mb-4 flex items-center gap-2">
  <IconName className="text-accent" size={18} />
  標題文字
</h3>

// 階段橫幅範例 (手機優化)
<h2 className="text-sm md:text-lg font-bold text-gray-600 flex items-center gap-2">
  <span className="w-1 h-4 md:h-5 bg-accent rounded-full"></span>
  第一階段：xxx
</h2>
```

### 2.5 卡片樣式 (Card Styles)

```jsx
// 標準白底卡片
<div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

// 帶頭部的卡片
<div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
  <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
    <Icon size={16} className="text-accent" />
    <span className="font-bold text-gray-700 text-sm">標題</span>
  </div>
  <div className="p-4">...</div>
</div>

// Accent 主題卡片頭部
<div className="px-5 py-4 bg-accent/10 border-b border-accent/20">
```

### 2.6 標籤樣式 (Tag Styles)

| 類型         | Class                                                              | 用途     |
| ------------ | ------------------------------------------------------------------ | -------- |
| **日期標籤** | `text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full`       | Day 標記 |
| **時間標籤** | `text-xs font-bold text-white bg-accent px-2 py-0.5 rounded-full`  | 交通時間 |
| **推薦標籤** | `text-[10px] font-bold text-white bg-accent px-1.5 py-0.5 rounded` | 推薦項目 |

### 2.7 間距規範 (Spacing)

| 用途         | Class              |
| ------------ | ------------------ |
| 區塊間距     | `mb-8`             |
| 卡片內間距   | `p-4` 或 `p-6`     |
| 標題下間距   | `mb-4`             |
| 列表項目間距 | `space-y-2`        |
| 網格間距     | `gap-4` 或 `gap-6` |

### 2.8 響應式網格 (Responsive Grid)

```jsx
// 兩欄佈局
<div className="grid md:grid-cols-2 gap-6">

// 三欄佈局
<div className="grid md:grid-cols-3 gap-4">
```

## 3. 進階元件樣式 (Advanced Component Patterns)

### 3.1 可折疊區塊 (Collapsible Sections)

```jsx
// 可折疊按鈕標題
<button
  onClick={() => setIsOpen(!isOpen)}
  className="w-full text-base font-bold text-gray-800 mb-4 flex items-center justify-between gap-2 group"
>
  <div className="flex items-center gap-2">
    <IconName className="text-accent" size={18} />
    標題文字
  </div>
  <ChevronDown
    size={20}
    className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
  />
</button>

// 可折疊內容區
<div
  className={`transition-all duration-300 ease-in-out overflow-hidden ${
    isOpen ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
  }`}
>
  {/* 內容 */}
</div>
```

### 3.2 Modal 對話框 (Modal Dialog)

```jsx
// Modal 背景遮罩
<div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">

// Modal 主容器
<div className="bg-white w-full max-w-3xl h-[80vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">

// Modal 標題列
<div className="bg-primary p-4 flex items-center justify-between text-white shrink-0">
  <div className="flex items-center gap-2">
    <IconName size={22} />
    <h3 className="font-bold text-lg">標題</h3>
  </div>
  <button className="p-1 hover:bg-white/20 rounded-full transition-colors">
    <X size={20} />
  </button>
</div>
```

### 3.3 FAB 浮動按鈕 (Floating Action Buttons)

```jsx
// FAB 群組容器
<div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">

// 單一 FAB 按鈕樣式
<button className="p-3 rounded-full bg-white/70 backdrop-blur-md text-primary shadow-xl border border-white/50 hover:bg-white hover:text-primary transition-all duration-300 group relative">
  <IconName size={24} className="animate-pulse" />

  {/* Tooltip */}
  <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
    按鈕說明
  </span>
</button>
```

### 3.4 響應式表格 (Responsive Tables)

```jsx
// 桌面版表格
<div className="hidden md:block overflow-x-auto rounded-xl border border-gray-100">
  <table className="w-full text-left border-collapse">
    <thead>
      <tr className="bg-primary/5 text-primary">
        <th className="p-3 font-bold text-sm whitespace-nowrap">欄位</th>
      </tr>
    </thead>
    <tbody className="text-gray-600">
      <tr className="border-b border-gray-100 hover:bg-accent/5 transition-colors">
        <td className="p-3 text-sm">內容</td>
      </tr>
    </tbody>
  </table>
</div>

// 手機版卡片列表
<div className="md:hidden space-y-3">
  <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
    {/* 卡片內容 */}
  </div>
</div>
```

### 3.5 實用連結區塊 (Useful Links Section)

```jsx
// 分類連結卡片
<div className="grid md:grid-cols-3 gap-4">
  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
    {/* 卡片頭部 */}
    <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
      <IconName size={16} className="text-accent" />
      <span className="font-bold text-gray-700 text-sm">分類名稱</span>
    </div>
    {/* 連結列表 */}
    <div className="p-2">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
      >
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-gray-700 font-medium group-hover:text-primary transition-colors text-sm truncate">
            連結名稱
          </span>
          <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full shrink-0">
            Day 1-2
          </span>
        </div>
        <ExternalLink
          size={14}
          className="text-gray-300 group-hover:text-accent shrink-0 ml-2"
        />
      </a>
    </div>
  </div>
</div>
```

### 3.6 DayCard 可折疊行程卡片

```jsx
// 可折疊 DayCard
<div className="relative bg-white rounded-3xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">
  {/* 可點擊的圖片頭部 */}
  <button className="w-full relative overflow-hidden cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-inset transition-all duration-300 h-28">
    <img
      src={imageUrl}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />

    {/* 左上角日期標籤 */}
    <div className="absolute left-4 top-4">
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 backdrop-blur-md text-white font-bold text-sm border border-white/20 shadow-lg">
        D1 · 1/12 (一)
      </span>
    </div>

    {/* 右上角展開/折疊圖示 */}
    <div className="absolute right-4 top-4 p-2 bg-white/20 backdrop-blur-md rounded-full text-white border border-white/30">
      <ChevronDown size={16} />
    </div>
  </button>

  {/* 可折疊內容區 */}
  <div
    style={{ display: "grid", gridTemplateRows: isExpanded ? "1fr" : "0fr" }}
  >
    <div className="min-h-0">{/* 行程內容 */}</div>
  </div>
</div>
```

## 4. 分頁導航 (Tab Navigation)

```jsx
// 分頁導航容器 (Sticky)
<div className="sticky top-0 z-40 glass shadow-sm border-b border-gray-100/50">
  <div className="max-w-5xl mx-auto px-4">
    <nav className="flex items-center justify-around gap-1 sm:gap-2 md:gap-8 py-3 md:py-4">
      {/* 分頁按鈕 */}
      <button
        className={`flex items-center justify-center gap-1 sm:gap-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 rounded-full font-medium transition-all duration-300 whitespace-nowrap text-xs sm:text-sm md:text-base
          ${
            isActive
              ? "bg-primary text-white shadow-md transform scale-105"
              : "bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          }
        `}
      >
        <TabIcon size={18} className="flex-shrink-0" />
        <span className="hidden sm:inline">{tab.label}</span>
      </button>
    </nav>
  </div>
</div>
```

## 5. 階段標題 (Phase Headers)

```jsx
// 可折疊的階段標題
<button
  onClick={() => togglePhase(idx)}
  className="sticky top-[52px] z-30 w-full bg-gray-50/95 backdrop-blur py-3 md:py-4 cursor-pointer text-left focus:outline-none group"
>
  <h2 className="text-base md:text-xl font-bold text-gray-600 flex items-center gap-2">
    <span className="w-1 h-6 md:h-8 bg-accent rounded-full" />
    第一階段：伊勢志摩度假慢旅 (Day 1-6)
    <span className="ml-auto text-gray-400 group-hover:text-primary transition-colors">
      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
    </span>
  </h2>
</button>
```

## 6. 活動項目樣式 (Activity Item Styles)

```jsx
// 時間軸活動項目
<div className="flex items-start gap-4">
  {/* 時間標籤 */}
  <span className="text-xs font-bold text-primary/70 min-w-[3rem] font-mono leading-6">
    14:00
  </span>

  <div className="flex-1 min-w-0">
    {/* 主標題行 */}
    <div className="flex items-center justify-between gap-2">
      <div className="text-gray-800 font-bold text-sm leading-6 flex-1">
        活動標題
      </div>
      {/* 地圖/交通圖示按鈕 */}
      <button className="flex-shrink-0 transition-all cursor-pointer hover:scale-110 text-accent w-6 h-6 flex items-center justify-center">
        <Train size={16} />
      </button>
    </div>

    {/* 副標題 */}
    <div className="text-xs text-gray-500 mt-0.5 font-medium">副標題說明</div>

    {/* 警告提示 */}
    <div className="mt-2 text-xs text-orange-700 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-lg inline-block leading-relaxed">
      <span className="font-bold mr-1">⚠️</span> 注意事項
    </div>

    {/* 資訊提示 */}
    <div className="mt-1 text-xs text-primary/70 flex items-start gap-1 leading-relaxed">
      <Info size={12} className="mt-0.5 shrink-0" /> 補充資訊
    </div>
  </div>
</div>
```
