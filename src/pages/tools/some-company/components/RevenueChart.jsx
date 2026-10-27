import React, { useRef, useEffect } from "react";
import { chartTheme, baseOptions, formatNumber } from "../chartTheme";

/**
 * 各季度營業收入比較 (長條圖)
 * @param {{ labels: string[], data: Record<string, number[]> }} props
 */
export default function RevenueChart({ labels, data }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || typeof Chart === "undefined") return;

    if (chartRef.current) chartRef.current.destroy();

    const t = chartTheme();
    const base = baseOptions(t);
    chartRef.current = new Chart(canvasRef.current.getContext("2d"), {
      type: "bar",
      data: {
        labels,
        datasets: Object.keys(data).map((year, i) => ({
          label: `${year}年`,
          data: data[year],
          backgroundColor: t.years[i],
        })),
      },
      options: {
        ...base,
        plugins: {
          ...base.plugins,
          tooltip: {
            callbacks: {
              label: (c) => `${c.dataset.label}: ${formatNumber(c.raw)} 千元`,
            },
          },
        },
        scales: {
          ...base.scales,
          y: { ...base.scales.y, beginAtZero: true },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [labels, data]);

  return (
    <section className="fd-panel">
      <div className="kicker">Revenue</div>
      <h3>各季營業收入</h3>
      <div className="fd-canvas">
        <canvas ref={canvasRef} />
      </div>
    </section>
  );
}
