import React, { useRef, useEffect, useState } from "react";
import { chartTheme, baseOptions, formatNumber } from "../chartTheme";

const VIEWS = [
  { key: "year", label: "年度" },
  { key: "quarter", label: "季度" },
];

const margin = (p, r) => ((p / r) * 100).toFixed(1);

/**
 * 營運成果總覽 (雙軸混合圖),右上角切換年度/季度
 * 營收用灰色長條(左軸),本期淨利用紅線(右軸)。年度:淨利率寫在 X 軸年份下方;
 * 季度:點太多,淨利率改放滑鼠提示,只畫已公告的季度。
 * @param {{ revenueData: Record<string, number>, profitData: Record<string, number>,
 *   quarterRevenue: Record<string, (number|null)[]>, quarterProfit: Record<string, (number|null)[]> }} props
 */
export default function AnnualChart({ revenueData, profitData, quarterRevenue, quarterProfit }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [view, setView] = useState("year");

  useEffect(() => {
    if (!canvasRef.current || typeof Chart === "undefined") return;

    if (chartRef.current) chartRef.current.destroy();

    let labels, revenues, profits;
    if (view === "year") {
      const years = Object.keys(revenueData);
      // 兩行標籤:年度 + 淨利率
      labels = years.map((y) => [`${y}年度`, `淨利率 ${margin(profitData[y], revenueData[y])}%`]);
      revenues = years.map((y) => revenueData[y]);
      profits = years.map((y) => profitData[y]);
    } else {
      const quarters = Object.keys(quarterRevenue).flatMap((y) =>
        quarterRevenue[y].flatMap((r, qi) =>
          r == null ? [] : [{ label: `${y.slice(2)}Q${qi + 1}`, r, p: quarterProfit[y][qi] }],
        ),
      );
      labels = quarters.map((q) => q.label);
      revenues = quarters.map((q) => q.r);
      profits = quarters.map((q) => q.p);
    }

    const t = chartTheme();
    const base = baseOptions(t);
    const sideAxis = (text, extra) => ({
      type: "linear",
      position: "right",
      title: { display: true, text, color: t.mute },
      grid: { drawOnChartArea: false },
      border: { display: false },
      ...extra,
    });

    chartRef.current = new Chart(canvasRef.current.getContext("2d"), {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            type: "line",
            label: "本期淨利 [右軸]",
            data: profits,
            borderColor: t.accent,
            backgroundColor: t.accent,
            borderWidth: 2.5,
            pointRadius: 4,
            pointStyle: "rect",
            yAxisID: "y1",
            order: 1,
          },
          {
            type: "bar",
            label: "營業收入 [左軸]",
            data: revenues,
            backgroundColor: t.years[0],
            yAxisID: "y",
            order: 2,
            barPercentage: view === "year" ? 0.5 : 0.7,
          },
        ],
      },
      options: {
        ...base,
        interaction: { mode: "index", intersect: false },
        plugins: {
          ...base.plugins,
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.dataset.label.split(" ")[0];
                return `${label}: ${formatNumber(context.raw)} 千元`;
              },
              footer: (items) => {
                const i = items[0].dataIndex;
                return `淨利率: ${margin(profits[i], revenues[i])}%`;
              },
            },
          },
        },
        scales: {
          x: {
            ...base.scales.x,
            ticks: { ...base.scales.x.ticks, color: t.ink },
          },
          y: {
            ...base.scales.y,
            title: { display: true, text: "營業收入 (千元)", color: t.mute },
          },
          y1: sideAxis("本期淨利 (千元)", {
            beginAtZero: true,
            ticks: { color: t.accent, callback: (v) => formatNumber(v) },
          }),
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [revenueData, profitData, quarterRevenue, quarterProfit, view]);

  return (
    <section className="fd-panel wide">
      <div className="fd-panel-head">
        <div>
          <div className="kicker">{view === "year" ? "Annual" : "Quarterly"}</div>
          <h3>{view === "year" ? "年度" : "各季"}營運成果:營收、淨利與淨利率</h3>
        </div>
        <div className="fd-toggle" role="group" aria-label="時間維度">
          {VIEWS.map((v) => (
            <button
              key={v.key}
              type="button"
              aria-pressed={view === v.key}
              onClick={() => setView(v.key)}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>
      <div className="fd-canvas">
        <canvas ref={canvasRef} />
      </div>
    </section>
  );
}
