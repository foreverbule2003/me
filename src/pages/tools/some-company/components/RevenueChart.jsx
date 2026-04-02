import React, { useRef, useEffect } from "react";

const formatNumber = (num) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/**
 * 各季度營業收入比較 (長條圖)
 * @param {{ labels: string[], data: Record<string, number[]> }} props
 */
export default function RevenueChart({ labels, data }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || typeof Chart === "undefined") return;

    // Destroy previous chart if exists
    if (chartRef.current) chartRef.current.destroy();

    const ctx = canvasRef.current.getContext("2d");
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "2023年",
            data: data["2023"],
            backgroundColor: "#93C5FD",
            borderRadius: 4,
          },
          {
            label: "2024年",
            data: data["2024"],
            backgroundColor: "#3B82F6",
            borderRadius: 4,
          },
          {
            label: "2025年",
            data: data["2025"],
            backgroundColor: "#1E3A8A",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
            beginAtZero: true,
            grid: { color: "#f3f4f6" },
            ticks: { callback: (v) => formatNumber(v) },
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
          className="shrink-0 mr-2 text-blue-500"
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
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
        各季度營業收入比較
      </h2>
      <div className="relative h-72 w-full">
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
