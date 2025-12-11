# 專案樣式指南 (Style Guide)

這份文件旨在統整專案中使用的主要視覺樣式與慣例，以便在未來的開發中保持 UI 的一致性。

## 1. 主要框架

本專案使用 **[Tailwind CSS](https://tailwindcss.com/)** 作為主要的 CSS 框架。所有樣式應優先使用 Tailwind 的功能類別 (utility classes) 來建構。

## 2. 核心配色 (Color Palette)

- **主要漸層 (Primary Gradient)**: 這是品牌的核心視覺元素，用於標題、按鈕和重要圖示背景。
  - **CSS**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`
  - **Tailwind Class**: `bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]`

- **文字顏色 (Text Colors)**:
  - `text-white`: 用於深色或漸層背景上。
  - `text-gray-800`: 用於主要內文標題。
  - `text-gray-700`: 用於次要標題或區塊標題。
  - `text-gray-600`: 用於段落內文、描述性文字。
  - `text-indigo-600`: 用於連結、日期或需要強調的輔助資訊。

- **背景顏色 (Background Colors)**:
  - `bg-gray-50`: 頁面主要背景色，提供柔和的基底。
  - `bg-white`: 卡片、區塊的背景色。
  - `bg-indigo-50/70`: 強調區塊或互動元素的背景，帶有透明度。

## 3. 字體 (Typography)

- **字體家族**: 全站使用無襯線字體。
  - **Tailwind Class**: `font-sans` 應套用於 `<body>`。
- **字體大小**:
  - `text-4xl`: 頁面主標題 (H1)。
  - `text-2xl`: 區塊主標題 (H2)。
  - `text-xl`: 副標題或引言。
  - `text-lg`: 筆記標題等。
  - `text-base`: (預設) 主要內文。
  - `text-sm`: 輔助性文字，如標籤、日期。

## 4. 共用元件 (Common Components)

### 卡片/區塊 (Card/Section)

用於承載獨立內容區塊，具有陰影和互動效果。

```html
<section class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
  <!-- Content here -->
</section>
```

### 按鈕 (Buttons)

- **主要按鈕 (Primary Button)**: 用於最重要的操作，如「儲存」、「送出」。

```html
<button class="px-6 py-3 bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)] text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
  主要按鈕
</button>
```

- **次要按鈕 (Secondary Button)**: 用於次要操作，如「查看詳情」。

```html
<a href="#" class="inline-flex items-center gap-3 px-5 py-2.5 bg-white text-indigo-600 font-semibold rounded-lg border-2 border-indigo-500 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-700 hover:-translate-y-0.5 transition-all duration-300">
  次要按鈕
</a>
```

- **一般按鈕 (Normal Button)**: 如「取消」。

```html
<button class="px-5 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">
  一般按鈕
</button>
```

### 標籤 (Tags)

用於標示關鍵字或分類。

```html
<span class="text-white px-4 py-1.5 rounded-full text-sm font-medium bg-[linear-gradient(135deg,#667eea_0%,#764ba2_100%)]">
  標籤
</span>
```

### 筆記項目 (Note Item)

```html
<div class="border-l-4 border-indigo-500 p-4 bg-indigo-50/70 rounded-r-lg hover:bg-indigo-100/80 transition-colors">
  <div class="text-sm font-semibold text-indigo-600 mb-1">日期</div>
  <div class="text-lg font-bold text-gray-800 mb-1">標題</div>
  <div class="text-gray-600 leading-relaxed">內容...</div>
</div>
```

## 5. 動畫 (Animations)

以下是定義在 `<style>` 標籤中的自訂動畫，可透過對應的 class 使用。

- **漂浮動畫**: `anim-float`
  - 使元素產生輕微的上下浮動效果。
- **向上滑入**: `anim-slideUp-h1`, `anim-slideUp-p`
  - 使元素由下而上淡入，通常用於頁面載入時的標題和段落。

```css
/* Custom Animations */
.anim-float {
  animation: float 3s ease-in-out infinite;
}
.anim-slideUp-h1 {
  animation: slideUp 1s ease forwards 0.3s;
}
.anim-slideUp-p {
  animation: slideUp 1s ease forwards 0.5s;
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
@keyframes slideUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
```
