import React, { useRef, useEffect } from "react";

const formatNumber = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/**
 * 年度營運成果總覽 (雙軸混合圖)
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

    const ctx = canvasRef.current.getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            type: "line",
            label: "淨利率 (%) [右二軸]",
            data: marginData,
            borderColor: "#10B981", // Emerald-500
            backgroundColor: "#10B981",
            borderWidth: 4,
            pointRadius: 6,
            pointHoverRadius: 8,
            yAxisID: "y2",
            order: 0,
            tension: 0.3,
          },
          {
            type: "line",
            label: "本期淨利 [右一軸]",
            data: Object.values(profitData),
            borderColor: "#F59E0B",
            backgroundColor: "#F59E0B",
            borderWidth: 3,
            pointRadius: 6,
            yAxisID: "y1",
            order: 1,
          },
          {
            type: "bar",
            label: "營業收入 [左軸]",
            data: Object.values(revenueData),
            backgroundColor: "#6366F1",
            borderRadius: 6,
            yAxisID: "y",
            order: 2,
            barPercentage: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
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
          legend: { position: "top" },
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: { display: true, text: "營業收入 (千元)" },
            grid: { color: "#f3f4f6" },
            ticks: { callback: (v) => formatNumber(v) },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            title: { display: true, text: "本期淨利 (千元)" },
            grid: { drawOnChartArea: false },
            ticks: { callback: (v) => formatNumber(v) },
          },
          y2: {
            type: "linear",
            display: true,
            position: "right",
            title: { display: true, text: "淨利率 (%)" },
            grid: { drawOnChartArea: false },
            min: 0,
            max: 20, // 根據數據範圍設定 (6.3% - 15.9%)
            ticks: { callback: (v) => `${v}%` },
          },
          x: { grid: { display: false } },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [revenueData, profitData]);

  return (
    <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200 mb-10 transition-all hover:shadow-md duration-300">
      <h2 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center tracking-tight">
        <svg
          className="shrink-0 mr-2 text-indigo-500"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "20px", height: "20px", minWidth: "20px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        年度營運成果總覽 (營收與獲利成長)
      </h2>
      <div className="relative h-96 w-full">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
