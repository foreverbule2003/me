# CB 戰情室 Style Guide

> 本文件定義 CB 戰情室頁面的設計規範，確保視覺一致性。

---

## 字體規範 (Typography)

只使用 **2 種大小** + **2 種權重**，避免視覺噪音。

| 層級     | Tailwind Class          | 用途範例                         |
| -------- | ----------------------- | -------------------------------- |
| **主要** | `text-sm font-semibold` | Tab 標籤、CB 代號、現價、漲跌    |
| **次要** | `text-xs font-semibold` | 分類標籤、按鈕                   |
| **輔助** | `text-xs font-medium`   | 分類標題、時間戳、百分比、成交量 |

### 表格專用 (MarketPulse)

| 欄位       | Class                                  |
| ---------- | -------------------------------------- |
| 名稱       | `text-sm font-semibold text-slate-700` |
| 代號/時間  | `text-xs font-medium text-slate-400`   |
| 現價       | `text-sm font-semibold` + 漲跌色       |
| 漲跌數值   | `text-sm font-semibold` + 漲跌色       |
| 漲跌百分比 | `text-xs font-medium`                  |
| 成交量     | `text-xs font-medium text-slate-500`   |

### 禁用項目

- ❌ `font-bold`、`font-black`（權重過重）
- ❌ `text-[10px]`、`text-[11px]`（非標準大小）
- ❌ `tracking-widest`（字距過寬）

---

## 色彩系統 (Colors)

### 文字顏色

| 用途     | Class             | 說明               |
| -------- | ----------------- | ------------------ |
| 主要文字 | `text-slate-700`  | CB 代號、重要數據  |
| 次要文字 | `text-slate-500`  | 標籤、說明         |
| 輔助文字 | `text-slate-400`  | 百分比、數量       |
| 強調色   | `text-indigo-600` | 選中狀態、折價標記 |

### 背景顏色

| 用途     | Class            |
| -------- | ---------------- |
| 卡片背景 | `bg-white`       |
| 次要區塊 | `bg-slate-50/30` |
| 選中標籤 | `bg-indigo-100`  |
| 主按鈕   | `bg-indigo-600`  |

### 邊框顏色

| 用途       | Class               |
| ---------- | ------------------- |
| 預設邊框   | `border-slate-200`  |
| Hover 邊框 | `border-indigo-300` |
| 選中邊框   | `border-indigo-300` |

---

## 間距規範 (Spacing)

| 元素     | Padding       | Gap     |
| -------- | ------------- | ------- |
| 卡片     | `p-5`         | -       |
| 標籤按鈕 | `px-3 py-1.5` | `gap-2` |
| CB 項目  | `px-4 py-2.5` | `gap-3` |
| 表單輸入 | `px-4 py-3`   | -       |

---

## 圓角規範 (Border Radius)

| 元素      | Class         |
| --------- | ------------- |
| 卡片      | `rounded-2xl` |
| 按鈕/標籤 | `rounded-lg`  |
| CB 項目   | `rounded-xl`  |
| 輸入框    | `rounded-xl`  |

---

## 互動狀態 (Interactions)

### Hover 效果

```jsx
// 標準 hover 變化
hover:border-indigo-300 hover:bg-indigo-50/30 transition-all
```

### 選中狀態

```jsx
// 標籤選中
bg-indigo-100 text-indigo-700 border-indigo-300

// Tab 選中
text-indigo-600 border-indigo-600
```

---

## 程式碼範例

### 分類標籤

```jsx
<button className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap border bg-indigo-100 text-indigo-700 border-indigo-300">
  PCB
</button>
```

### CB 卡片項目

```jsx
<div className="flex items-center gap-3 px-4 py-2.5 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-50/30 transition-all">
  <span className="text-sm font-semibold text-slate-700 mono">23683</span>
  <span className="text-sm font-medium mono text-slate-400">0.0%</span>
</div>
```

### 分類標題

```jsx
<h3 className="text-xs font-medium text-slate-500 uppercase mb-3 px-1 flex items-center gap-2">
  <span>PCB</span>
  <span className="text-slate-300">·</span>
  <span>3</span>
</h3>
```
