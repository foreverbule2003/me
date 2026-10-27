// 圖表共用配色與格式:從 some-company.css 的 :root 變數讀顏色,讓圖表跟頁面同一套 Swiss+Minimal。
// 三個年度由淺到深:2023 淺灰、2024 中灰、2025 強調紅。

export const formatNumber = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export function chartTheme() {
  const css = getComputedStyle(document.documentElement);
  const v = (name) => css.getPropertyValue(name).trim();
  return {
    ink: v("--ink"),
    mute: v("--mute"),
    line: v("--line"),
    accent: v("--accent"),
    years: [v("--s1"), v("--s2"), v("--accent")],
    gray: v("--s2"),
  };
}

// 圖例、格線、座標軸的共用設定
export function baseOptions(t) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "start",
        labels: {
          usePointStyle: true,
          pointStyle: "rect",
          boxWidth: 8,
          boxHeight: 8,
          color: t.mute,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { color: t.ink },
        ticks: { color: t.mute },
      },
      y: {
        grid: { color: t.line, drawTicks: false },
        border: { display: false },
        ticks: { color: t.mute, padding: 8, callback: (n) => formatNumber(n) },
      },
    },
  };
}
