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
