import React, { useRef, useEffect } from "react";
import { chartTheme, baseOptions, formatNumber } from "../chartTheme";

/**
 * 各季度本期淨利比較 (折線圖)
 * @param {{ labels: string[], data: Record<string, number[]> }} props
 */
export default function ProfitChart({ labels, data }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || typeof Chart === "undefined") return;

    if (chartRef.current) chartRef.current.destroy();

    const t = chartTheme();
    const base = baseOptions(t);
    const years = Object.keys(data);
    chartRef.current = new Chart(canvasRef.current.getContext("2d"), {
      type: "line",
      data: {
        labels,
        datasets: years.map((year, i) => {
          const latest = i === years.length - 1;
          return {
            label: `${year}年`,
            data: data[year],
            borderColor: t.years[i],
            backgroundColor: t.years[i],
            borderWidth: latest ? 2.5 : 2,
            pointRadius: latest ? 4 : 3,
            pointStyle: "rect",
          };
        }),
      },
      options: {
        ...base,
        interaction: { mode: "index", intersect: false },
        plugins: {
          ...base.plugins,
          tooltip: {
            callbacks: {
              label: (c) => `${c.dataset.label}: ${formatNumber(c.raw)} 千元`,
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [labels, data]);

  return (
    <section className="fd-panel">
      <div className="kicker">Net Income</div>
      <h3>各季本期淨利</h3>
      <div className="fd-canvas">
        <canvas ref={canvasRef} />
      </div>
    </section>
  );
}
