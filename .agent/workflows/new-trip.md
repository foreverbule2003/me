---
description: 快速建立新旅程 (使用共用元件模板)
---

// turbo

1. 執行互動式建立腳本
   node tools/new-trip.js

---

## 此腳本會：
- 建立 `trips/{year}-{location}/` 目錄
- 產生 `index.html` (使用共用元件)
- 產生 `spec.md` (行程規劃文件)
- 建立 `images/` 資料夾

## 使用的共用元件
- SectionCard
- CollapsibleSection
- MapModal
- FAB
- PhaseHeader

## 下一步
1. 編輯 `spec.md` 規劃行程
2. 修改 `index.html` 中的 `TRIP_CONFIG`、`itineraryData`、`budgetData`
3. 執行 `npm run dev` 預覽
