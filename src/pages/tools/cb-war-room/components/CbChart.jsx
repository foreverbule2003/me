import React, { useEffect, useRef, useState } from "react";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";

// Register Chart.js components
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  zoomPlugin,
);

const CbChart = ({ data, height = 280 }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [range, setRange] = useState("all");

  const sortedData = React.useMemo(() => {
    return [...data].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [data]);

  useEffect(() => {
    if (!chartRef.current || sortedData.length === 0) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    const filteredData =
      range === "all"
        ? sortedData
        : (() => {
            const ms = {
              "1m": 30 * 24 * 60 * 60 * 1000,
              "3m": 90 * 24 * 60 * 60 * 1000,
            }[range];
            if (!ms) return sortedData;
            const lastTime = new Date(
              sortedData[sortedData.length - 1].date,
            ).getTime();
            return sortedData.filter(
              (d) => new Date(d.date).getTime() >= lastTime - ms,
            );
          })();

    const labels = filteredData.map((d) => d.date.slice(5));
    const premiums = filteredData.map((d) =>
      parseFloat(d.premium || d.premiumRate || 0),
    );
    const stockPrices = filteredData.map((d) => parseFloat(d.stockPrice || 0));

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "溢價率 (%)",
            data: premiums,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.1)",
            yAxisID: "y",
            tension: 0.3,
            fill: true,
            pointRadius: filteredData.length > 50 ? 1 : 3,
            order: 2,
          },
          {
            label: "股價 (TWD)",
            data: stockPrices,
            borderColor: "rgba(54, 162, 235, 0.6)",
            borderDash: [5, 5],
            yAxisID: "y1",
            tension: 0.3,
            pointRadius: 0,
            borderWidth: 1.5,
            fill: false,
            order: 1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        scales: {
          x: {
            grid: { display: false },
            ticks: { font: { size: 9 }, maxRotation: 0 },
          },
          y: {
            type: "linear",
            display: true,
            position: "left",
            title: {
              display: true,
              text: "溢價率 (%)",
              font: { size: 10, weight: "bold" },
            },
            grid: { color: "#f1f5f9" },
            ticks: { font: { size: 9 } },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            grid: { drawOnChartArea: false },
            title: {
              display: true,
              text: "股價 (TWD)",
              font: { size: 10, weight: "bold" },
            },
            ticks: { font: { size: 9 } },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: { font: { size: 10 }, boxWidth: 10 },
          },
          zoom: {
            pan: { enabled: true, mode: "x" },
            zoom: {
              wheel: { enabled: true },
              pinch: { enabled: true },
              mode: "x",
            },
          },
          tooltip: {
            callbacks: {
              afterLabel: function (context) {
                const item = filteredData[context.dataIndex];
                if (context.dataset.yAxisID === "y" && item.cbPrice) {
                  return `CB價: ${parseFloat(item.cbPrice).toFixed(2)}`;
                }
                return "";
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [sortedData, range]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-3 mb-4 px-1">
        <div className="flex flex-col gap-1">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <i className="fas fa-history text-indigo-400"></i> 歷史溢價走勢
          </h4>
          <div className="w-fit px-2 py-0.5 bg-slate-50 text-slate-400 text-[9px] font-bold rounded-md mono border border-slate-100">
            {sortedData.length} 筆歷史資料
          </div>
        </div>

        <div className="flex bg-slate-100/80 p-1 rounded-xl shadow-inner border border-slate-200/50">
          {["1M", "3M", "ALL"].map((btnLabel) => {
            const btnRange = btnLabel.toLowerCase();
            const isActive = range === btnRange;
            return (
              <button
                key={btnLabel}
                onClick={() => setRange(btnRange)}
                className={`text-[10px] font-bold px-3 py-1 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-white shadow-sm text-indigo-600"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {btnLabel}
              </button>
            );
          })}
        </div>
      </div>

      <div
        style={{ height }}
        className="relative w-full bg-white/30 rounded-2xl p-2"
      >
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default CbChart;
