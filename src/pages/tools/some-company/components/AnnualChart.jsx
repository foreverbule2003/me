import React, { useRef, useEffect } from "react";
import { chartTheme, baseOptions, formatNumber } from "../chartTheme";

/**
 * 年度營運成果總覽 (雙軸混合圖)
 * 營收用灰色長條(左軸),本期淨利用黑線(右一軸),淨利率用紅線(右二軸)。
 * @param {{ revenueData: Record<string, number>, profitData: Record<string, number> }} props
 */
export default function AnnualChart({ revenueData, profitData }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || typeof Chart === "undefined") return;

    if (chartRef.current) chartRef.current.destroy();

    const years = Object.keys(revenueData);
    const labels = years.map((y) => `${y}年度`);

    // 計算淨利率 (%)
    const marginData = years.map((y) => {
      const rev = revenueData[y];
      const prof = profitData[y];
      return rev > 0 ? ((prof / rev) * 100).toFixed(1) : 0;
    });

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
            label: "淨利率 (%) [右二軸]",
            data: marginData,
            borderColor: t.accent,
            backgroundColor: t.accent,
            borderWidth: 2.5,
            pointRadius: 5,
            pointStyle: "rect",
            yAxisID: "y2",
            order: 0,
          },
          {
            type: "line",
            label: "本期淨利 [右一軸]",
            data: Object.values(profitData),
            borderColor: t.ink,
            backgroundColor: t.ink,
            borderWidth: 2,
            pointRadius: 4,
            pointStyle: "rect",
            yAxisID: "y1",
            order: 1,
          },
          {
            type: "bar",
            label: "營業收入 [左軸]",
            data: Object.values(revenueData),
            backgroundColor: t.years[0],
            yAxisID: "y",
            order: 2,
            barPercentage: 0.5,
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
                const value = context.raw;
                if (label.includes("淨利率")) {
                  return `${label}: ${value}%`;
                }
                return `${label}: ${formatNumber(value)} 千元`;
              },
            },
          },
        },
        scales: {
          x: base.scales.x,
          y: {
            ...base.scales.y,
            title: { display: true, text: "營業收入 (千元)", color: t.mute },
          },
          y1: sideAxis("本期淨利 (千元)", {
            ticks: { color: t.mute, callback: (v) => formatNumber(v) },
          }),
          y2: sideAxis("淨利率 (%)", {
            min: 0,
            max: 20, // 根據數據範圍設定 (6.3% - 15.9%)
            ticks: { color: t.accent, callback: (v) => `${v}%` },
          }),
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [revenueData, profitData]);

  return (
    <section className="fd-panel wide">
      <div className="kicker">Annual</div>
      <h3>年度營運成果:營收、淨利與淨利率</h3>
      <div className="fd-canvas">
        <canvas ref={canvasRef} />
      </div>
    </section>
  );
}
