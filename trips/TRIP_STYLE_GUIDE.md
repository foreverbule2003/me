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
