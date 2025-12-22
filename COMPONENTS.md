# 元件清單 (Components)

> 最後更新：2024-12-22

## 共用元件 (trips/shared/)

### 1. SectionCard
**位置**: `trips/shared/components.js`

用途：統一的內容卡片容器，用於旅程詳情頁的各個區塊。

```javascript
SectionCard({
  title: "區塊標題",
  icon: "🏨",
  children: [...]
})
```

### 2. DayCard
**位置**: `trips/shared/components.js`

用途：每日行程卡片，展示單日的行程摘要。

### 3. TimelineItem
**位置**: `trips/shared/components.js`

用途：時間軸項目，用於展示每日行程的時間順序。

### 4. TabNavigation
**位置**: `trips/shared/components.js`

用途：分頁導航，用於切換行程總覽、每日詳情等頁面。

---

## 首頁元件 (index.html)

### TimBoy 模擬器

| 元件     | CSS Class     | 功能              |
| -------- | ------------- | ----------------- |
| 外殼     | `.gb-shell`   | Game Boy 外殼造型 |
| 螢幕     | `.gb-screen`  | 綠色復古螢幕      |
| 內容區   | `.gb-content` | 選單與內容顯示區  |
| D-Pad    | `.d-pad-*`    | 方向控制鍵        |
| A/B 按鈕 | `.ab-btn`     | 動作按鈕          |
| 選單項目 | `.gb-btn`     | 可選擇的選單按鈕  |

---

## 工具頁元件

### 期權模擬器

| 元件     | 功能                         |
| -------- | ---------------------------- |
| 輸入表單 | 標的價格、履約價、權利金輸入 |
| 計算結果 | 最大獲利/虧損/損益平衡點     |
| 風險指標 | 視覺化風險比率               |
| 損益圖表 | Canvas 繪製的損益曲線        |

### 財務儀表板

| 元件       | 功能                 |
| ---------- | -------------------- |
| 趨勢折線圖 | 營收趨勢視覺化       |
| 長條圖     | 獲利能力比較         |
| 時間選擇器 | 季度/半年度/年度切換 |

---

## CSS 變數

```css
:root {
  --gb-darkest: #0f380f;
  --gb-dark: #306230;
  --gb-light: #8bac0f;
  --gb-lightest: #9bbc0f;
}
```

---

## 圖示系統

**位置**: `trips/shared/icons.js`

所有圖示使用 SVG 或 Emoji，統一管理於 `icons.js`。
