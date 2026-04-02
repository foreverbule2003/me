/**
 * 財務趨勢資料
 * 2023 - 2025 營業收入與本期淨利 (單位：千元)
 */

export const QUARTERS = ["Q1", "Q2", "Q3", "Q4 (推算)"];
export const YEARS = ["2023", "2024", "2025"];

// ── 營業收入 (季度) ──
export const revenue = {
  2023: [35136, 55696, 58338, 57040],
  2024: [64666, 76777, 89187, 75005],
  2025: [84550, 82471, 74784, 74511],
};

// ── 本期淨利 (季度) ──
export const profit = {
  2023: [-1966, 4365, 4703, 5896],
  2024: [5824, 8335, 10639, 3913],
  2025: [13780, 11908, 10633, 14115],
};

// ── 年度合計 ──
export const annualRevenue = {
  2023: 206210,
  2024: 307955,
  2025: 316316,
};

export const annualProfit = {
  2023: 12998,
  2024: 28711,
  2025: 50436,
};

// ── KPI 卡片資料 ──
export const kpiCards = [
  {
    label: "2025 全年營業收入",
    value: "316,316",
    change: "+2.7% (YoY)",
    positive: true,
    accentColor: "blue",
  },
  {
    label: "2025 全年本期淨利",
    value: "50,436",
    change: "+75.6% (YoY)",
    positive: true,
    accentColor: "emerald",
  },
  {
    label: "2025 淨利率 (推算)",
    value: "15.9%",
    change: "創三年新高",
    positive: true,
    accentColor: "purple",
  },
];

// ── 變化率資料 (YoY · QoQ) ──
// 格式: { yoy: number|null, qoq: number|null }
// 正數 = 成長, 負數 = 衰退, null = 無數據(基準期)
export const revenueChanges = {
  2023: [
    { yoy: null, qoq: null },
    { yoy: null, qoq: 58.5 },
    { yoy: null, qoq: 4.7 },
    { yoy: null, qoq: -2.2 },
  ],
  2024: [
    { yoy: 84.0, qoq: 13.4 },
    { yoy: 37.8, qoq: 18.7 },
    { yoy: 52.9, qoq: 16.2 },
    { yoy: 31.5, qoq: -15.9 },
  ],
  2025: [
    { yoy: 30.7, qoq: 12.7 },
    { yoy: 7.4, qoq: -2.5 },
    { yoy: -16.1, qoq: -9.3 },
    { yoy: -0.7, qoq: -0.4 },
  ],
};

export const profitChanges = {
  2023: [
    { yoy: null, qoq: null },
    { yoy: null, qoq: 322.0 },
    { yoy: null, qoq: 7.7 },
    { yoy: null, qoq: 25.4 },
  ],
  2024: [
    { yoy: 396.2, qoq: -1.2 },
    { yoy: 91.0, qoq: 43.1 },
    { yoy: 126.2, qoq: 27.6 },
    { yoy: -33.6, qoq: -63.2 },
  ],
  2025: [
    { yoy: 136.6, qoq: 252.2 },
    { yoy: 42.9, qoq: -13.6 },
    { yoy: -0.1, qoq: -10.7 },
    { yoy: 260.7, qoq: 32.7 },
  ],
};

export const annualRevenueChanges = {
  2023: null,
  2024: 49.3,
  2025: 2.7,
};

export const annualProfitChanges = {
  2023: null,
  2024: 120.9,
  2025: 75.7,
};

// ── 財務顧問觀察 ──
export const insights = [
  {
    title: "1. 營收成長趨緩，但獲利能力大爆發 🚀",
    borderColor: "blue",
    items: [
      "2024年相比2023年，營收大幅成長近 50%（206,210 跳升至 307,955）。",
      {
        text: "2025年營收相比2024年幾乎持平，但",
        highlight: "2025年淨利高達 50,436，比 2024年暴增約 75%",
        after: "。",
      },
      "這意味著公司在 2025 年極有可能改善了產品組合、提升了毛利率，或是成功控制了營業費用。",
    ],
  },
  {
    title: "2. 第一季 (Q1) 的強勢轉型 📈",
    borderColor: "indigo",
    items: [
      "2023年 Q1 公司還是處於虧損狀態 (-1,966)。",
      {
        text: "到了 2025年 Q1，",
        highlight: "單季獲利已達 13,780",
        after: "，成為全年度獲利的重要基石。",
      },
      "顯示公司的體質在兩年內發生了根本性的好轉與轉型。",
    ],
  },
  {
    title: "3. 下半年的營運節奏改變 🔄",
    borderColor: "purple",
    items: [
      "2024年的高點落在 Q3（營收 89,187、淨利 10,639）。",
      {
        text: "2025年 Q3 營收出現衰退，但",
        highlight: "Q4 淨利卻創下單季 14,115 的亮眼表現",
        after: "。",
      },
      "這可能暗示出貨遞延、年底有業外收益認列，或是成本結構在年底有顯著優化。",
    ],
  },
];

// ── 表格配置 ──
export const revenueTableConfig = {
  title: "一、營業收入趨勢表",
  subtitle: "單位：千元",
  accentColor: "blue",
  isProfit: false,
};

export const profitTableConfig = {
  title: "二、本期淨利 (損) 趨勢表",
  subtitle: "單位：千元",
  accentColor: "emerald",
  isProfit: true,
};
