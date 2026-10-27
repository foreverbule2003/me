import React, { useRef, useEffect, useState } from "react";
import { chartTheme, baseOptions, formatNumber } from "../chartTheme";

const VIEWS = [
  { key: "line", label: "折線" },
  { key: "bar", label: "長條" },
];

/**
 * 各季度比較圖:每年一組,預設折線看走勢,右上角可切換長條。
 * 營收與淨利共用;淨利有負值,所以 Y 軸是否從 0 起由 beginAtZero 決定。
 * @param {{ kicker: string, title: string, labels: string[], data: Record<string, number[]>, beginAtZero?: boolean }} props
 */
export default function QuarterChart({ kicker, title, labels, data, beginAtZero = false }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [view, setView] = useState("line");

  useEffect(() => {
    if (!canvasRef.current || typeof Chart === "undefined") return;

    if (chartRef.current) chartRef.current.destroy();

    const t = chartTheme();
    const base = baseOptions(t);
    const years = Object.keys(data);
    const isLine = view === "line";
    chartRef.current = new Chart(canvasRef.current.getContext("2d"), {
      type: view,
      data: {
        labels,
        datasets: years.map((year, i) => {
          const latest = i === years.length - 1;
          return {
            label: `${year}年`,
            data: data[year],
            backgroundColor: t.years[i],
            borderColor: t.years[i],
            ...(isLine && {
              borderWidth: latest ? 2.5 : 2,
              pointRadius: latest ? 4 : 3,
              pointStyle: "rect",
            }),
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
        scales: {
          ...base.scales,
          y: { ...base.scales.y, beginAtZero },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [labels, data, view, beginAtZero]);

  return (
    <section className="fd-panel">
      <div className="fd-panel-head">
        <div>
          <div className="kicker">{kicker}</div>
          <h3>{title}</h3>
        </div>
        <div className="fd-toggle" role="group" aria-label="圖表類型">
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
