import React, { useRef, useEffect } from "react";

const formatNumber = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

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

    const ctx = canvasRef.current.getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "2023年",
            data: data["2023"],
            borderColor: "#A7F3D0",
            backgroundColor: "#A7F3D0",
            tension: 0.3,
            pointRadius: 5,
          },
          {
            label: "2024年",
            data: data["2024"],
            borderColor: "#10B981",
            backgroundColor: "#10B981",
            tension: 0.3,
            pointRadius: 5,
          },
          {
            label: "2025年",
            data: data["2025"],
            borderColor: "#065F46",
            backgroundColor: "#065F46",
            tension: 0.3,
            pointRadius: 6,
            borderWidth: 3,
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
              label: (context) =>
                `${context.dataset.label}: ${formatNumber(context.raw)} 千元`,
            },
          },
          legend: {
            position: "top",
            align: "end",
            labels: { usePointStyle: true, boxWidth: 8 },
          },
        },
        scales: {
          y: {
            grid: { color: "#f3f4f6" },
            ticks: { callback: (v) => formatNumber(v) },
            border: { dash: [4, 4] },
          },
          x: { grid: { display: false } },
        },
      },
    });

    return () => {
      if (chartRef.current) chartRef.current.destroy();
    };
  }, [labels, data]);

  return (
    <div className="bg-white p-7 rounded-2xl shadow-sm border border-slate-200 transition-all hover:shadow-md duration-300">
      <h2 className="text-lg font-extrabold text-slate-800 mb-6 flex items-center tracking-tight">
        <svg
          className="shrink-0 mr-2 text-emerald-500"
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
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        各季度本期淨利比較
      </h2>
      <div className="relative h-72 w-full">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
