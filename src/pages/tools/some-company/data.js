/**
 * 財務趨勢資料：2023 - 2026 Q2 營業收入與本期淨利 (單位：千元)
 * 刻意不寫公司名稱（頁面、註解、docs 皆同）。
 *
 * 資料來源：上市母公司各季合併財務報告，附註「採用權益法之投資」中
 * 該關聯企業的財務資訊彙整。
 * - Q1–Q3 單季數：取各季報的當季欄位；2023 年取 2024 年各季報的去年同期欄位
 * - Q4：財報只揭露全年，Q4 = 全年 − 前三季累計（故標「推算」）
 * - 2026-10-27 已逐季核對 2024Q1–2026Q2 共 10 份季報，14 季與 3 個年度全數一致
 * - 尚未公告的季度填 null（表格顯示「–」，圖表斷點）；未滿一年的年度不放年度合計
 * - 已知落差：2024 Q3 季報的前三季累計營收 232,950，比上半年 141,443 + Q3 單季 89,187
 *   多 2,320（季報本身就不一致）。Q4 依慣例用「全年 − 前三季累計」，所以 2024 四季
 *   加總 305,635 比全年 307,955 少 2,320，近四季滾動營收在 24Q4–25Q3 也會少這個數。
 *
 * 新增一季時只要改 revenue / profit（滿一年再補 annual*），
 * 變化率、KPI 卡與觀察小圖會自動重算；觀察的 title / note 仍需手改。
 */

export const QUARTERS = ["Q1", "Q2", "Q3", "Q4 (推算)"];

// ── 營業收入 (季度) ──
export const revenue = {
  2023: [35136, 55696, 58338, 57040],
  2024: [64666, 76777, 89187, 75005],
  2025: [84550, 82471, 74784, 74511],
  2026: [119070, 112817, null, null],
};

// ── 本期淨利 (季度) ──
export const profit = {
  2023: [-1966, 4365, 4703, 5896],
  2024: [5824, 8335, 10639, 3913],
  2025: [13780, 11908, 10633, 14115],
  2026: [24702, 30294, null, null],
};

// ── 年度合計（財報揭露的全年數）──
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

export const YEARS = Object.keys(revenue);

// ── 變化率 (%)：以下全部由上方數字推導 ──
const round1 = (n) => Math.round(n * 10) / 10;

// 基期為負（虧損）時用絕對值當分母，方向才不會顛倒
const pct = (cur, prev) =>
  cur == null || prev == null ? null : round1(((cur - prev) / Math.abs(prev)) * 100);

// 格式: { [year]: [{ yoy, qoq } × 4] }；正數 = 成長，null = 無數據
const quarterChanges = (data) =>
  Object.fromEntries(
    Object.keys(data).map((year) => {
      const prevYear = data[year - 1];
      return [
        year,
        data[year].map((v, qi) => ({
          yoy: pct(v, prevYear?.[qi]),
          qoq: pct(v, qi === 0 ? prevYear?.[3] : data[year][qi - 1]),
        })),
      ];
    }),
  );

const annualChanges = (data) =>
  Object.fromEntries(Object.keys(data).map((year) => [year, pct(data[year], data[year - 1])]));

export const revenueChanges = quarterChanges(revenue);
export const profitChanges = quarterChanges(profit);
export const annualRevenueChanges = annualChanges(annualRevenue);
export const annualProfitChanges = annualChanges(annualProfit);

// ── KPI 卡片：最新年度已公告的期間，對比去年同期 ──
const latestYear = YEARS.at(-1);
const reported = revenue[latestYear].filter((v) => v != null).length;
const PERIOD_NAMES = ["Q1", "上半年", "前三季", "全年"];
export const latestPeriod = `${latestYear} ${PERIOD_NAMES[reported - 1]}`;
export const coverage =
  reported === 4 ? `${YEARS[0]}–${latestYear}` : `${YEARS[0]}–${latestYear} Q${reported}`;

const sumTo = (arr) => arr.slice(0, reported).reduce((a, b) => a + b, 0);
const kpiRev = sumTo(revenue[latestYear]);
const kpiProf = sumTo(profit[latestYear]);
const prevRev = sumTo(revenue[latestYear - 1]);
const prevProf = sumTo(profit[latestYear - 1]);
const margin = (kpiProf / kpiRev) * 100;
const marginDiff = round1(margin - (prevProf / prevRev) * 100);

const fmt = (n) => n.toLocaleString("en-US");
const signed = (n, unit) => `${n > 0 ? "+" : ""}${n.toFixed(1)}${unit} (YoY)`;
const revYoy = pct(kpiRev, prevRev);
const profYoy = pct(kpiProf, prevProf);

export const kpiCards = [
  {
    label: `${latestPeriod}營業收入`,
    value: fmt(kpiRev),
    change: signed(revYoy, "%"),
    positive: revYoy >= 0,
  },
  {
    label: `${latestPeriod}本期淨利`,
    value: fmt(kpiProf),
    change: signed(profYoy, "%"),
    positive: profYoy >= 0,
  },
  {
    label: `${latestPeriod}淨利率`,
    value: `${margin.toFixed(1)}%`,
    change: signed(marginDiff, " pt"),
    positive: marginDiff >= 0,
  },
];

// ── 觀察：小圖數字由上方資料推導，標題與說明手寫 ──
// chart.values 的單位：千元，或 unit 為 "%" 時是百分比；highlight 為紅色強調的那根；
// sparse 為 true 時只標頭、尾與強調那根的數值（點多時避免擠在一起）
const half = (data, year) => data[year][0] + data[year][1];

// 近四季滾動（TTM）：每一季往回加總最近四季，攤平淡旺季與單季一次性項目
const flatQuarters = (data) =>
  YEARS.flatMap((y) => data[y].map((v, qi) => ({ label: `${y.slice(2)}Q${qi + 1}`, v })));
const ttm = (data) => {
  const qs = flatQuarters(data);
  return qs.flatMap((q, i) => {
    const window = qs.slice(i - 3, i + 1);
    if (i < 3 || window.some((w) => w.v == null)) return [];
    return [{ label: q.label, v: window.reduce((a, w) => a + w.v, 0) }];
  });
};
const ttmRevenue = ttm(revenue);
const ttmProfit = ttm(profit);
const ttmLabels = ttmRevenue.map((t) => t.label);
const ttmChart = (values, unit) => ({
  labels: ttmLabels,
  values,
  highlight: values.length - 1,
  unit,
  sparse: true,
});

export const insights = [
  {
    title: "上半年淨利：2026 已超過 2025 全年",
    note: "淨利增幅約為營收的三倍，Q2 單季淨利 30,294 為歷年單季最高。",
    chart: {
      labels: ["2024 H1", "2025 H1", "2026 H1", "2025 全年"],
      values: [half(profit, 2024), half(profit, 2025), half(profit, 2026), annualProfit[2025]],
      highlight: 2,
    },
  },
  {
    title: "近四季營收：2025 年原地踏步，2026 年重新加速",
    note: "近四季營收在 2025 年一直停在 316,316 到 331,213 之間，2026 上半年兩季就推升到 381,182。",
    chart: ttmChart(ttmRevenue.map((t) => t.v)),
  },
  {
    title: "近四季淨利：兩年半成長約 6 倍",
    note: "2025 年 Q2 到 Q3 曾短暫持平（40,240 → 40,234），之後再加速。近四季加總可攤平單季的一次性項目，比單看某一季穩定。",
    chart: ttmChart(ttmProfit.map((t) => t.v)),
  },
  {
    title: "近四季淨利率：從 6.3% 升到 20.9%",
    note: "同期營收增加約 85%，淨利成長主要來自淨利率；毛利或費用面的原因，財報摘要未揭露。",
    chart: ttmChart(
      ttmProfit.map((t, i) => round1((t.v / ttmRevenue[i].v) * 100)),
      "%",
    ),
  },
];

// ── 表格配置 ──
export const revenueTableConfig = {
  title: "一、營業收入趨勢表",
  subtitle: "單位：千元",
  isProfit: false,
};

export const profitTableConfig = {
  title: "二、本期淨利 (損) 趨勢表",
  subtitle: "單位：千元",
  isProfit: true,
};
