/**
 * CbPremiumHistoryChart.mjs
 *
 * Shared Chart Component for Convertible Bonds
 * Encapsulates Chart.js configuration, styling, and interaction logic.
 *
 * @dependencies Chart.js, chartjs-plugin-zoom
 */

/**
 * CbPremiumHistoryChart.mjs
 *
 * Shared Chart Component for Convertible Bonds
 * Encapsulates Chart.js configuration, styling, and interaction logic.
 * Now implements a Widget pattern (Mounts UI + Chart).
 *
 * @dependencies Chart.js, chartjs-plugin-zoom
 */

export const CbPremiumHistoryChart = {
  /**
   * Mount the Chart Widget (Buttons + Canvas) into a container
   * @param {HTMLElement} container - The container element to mount into
   * @param {Array} data - Array of history objects
   * @returns {Chart} The Chart.js instance (for legacy compatibility)
   */
  mount(container, data) {
    if (!container) return null;

    // 1. Cleanup existing DOM
    container.innerHTML = "";

    // 2. Create UI Structure
    // Header Wrapper (Title + Buttons + Info)
    const header = document.createElement("div");
    header.className = "flex items-center justify-between gap-3 mb-6 px-1";

    const leftGroup = document.createElement("div");
    leftGroup.className = "flex flex-col gap-1";

    const title = document.createElement("h4");
    title.className =
      "text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2";
    title.innerHTML =
      '<i class="fas fa-history text-indigo-400"></i> 歷史溢價走勢';

    // Info Pill (Count)
    const infoPill = document.createElement("div");
    infoPill.className =
      "w-fit px-2 py-0.5 bg-slate-50 text-slate-400 text-[9px] font-bold rounded-md mono border border-slate-100";
    infoPill.textContent = `${data.length} 筆歷史資料`;

    leftGroup.appendChild(title);
    leftGroup.appendChild(infoPill);

    const toolbar = document.createElement("div");
    toolbar.className =
      "flex bg-slate-100/80 p-1 rounded-xl shadow-inner border border-slate-200/50";

    // Buttons Config
    const buttons = [
      { label: "1M", range: "1m", title: "過去 1 個月" },
      { label: "3M", range: "3m", title: "過去 3 個月" },
      { label: "MAX", range: "all", title: "所有歷史資料", active: true },
    ];

    const btnElements = {};

    buttons.forEach((btn) => {
      const el = document.createElement("button");
      el.className = `range-btn text-[10px] font-bold px-3 py-1 rounded-md transition-all duration-200 ${btn.active ? "bg-white shadow-sm text-indigo-600" : "text-slate-400 hover:text-slate-600"}`;
      el.textContent = btn.label;
      el.title = btn.title;
      el.dataset.range = btn.range;

      toolbar.appendChild(el);
      btnElements[btn.range] = el;
    });

    header.appendChild(leftGroup);
    header.appendChild(toolbar);

    // Canvas Container
    const canvasWrapper = document.createElement("div");
    canvasWrapper.className =
      "relative w-full h-[280px] bg-white/30 rounded-2xl p-2";
    const canvas = document.createElement("canvas");
    canvasWrapper.appendChild(canvas);

    // Append to Container
    container.appendChild(header);
    container.appendChild(canvasWrapper);

    // 3. Initialize Chart
    const ctx = canvas.getContext("2d");

    // Check global Chart
    if (typeof window.Chart === "undefined") {
      console.error("Chart.js not loaded!");
      container.innerHTML =
        '<div class="text-red-500 text-xs p-4">Chart.js Library Missing</div>';
      return null;
    }

    // Sort Data
    const sortedData = [...data].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );

    // Render Logic (Refactored from previous render method)
    const labels = sortedData.map((d) => d.date.slice(5)); // MM-DD
    const premiums = sortedData.map((d) =>
      parseFloat(d.premium || d.premiumRate || 0),
    );
    const stockPrices = sortedData.map((d) => parseFloat(d.stockPrice || 0));

    const config = {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "溢價率 (%)",
            data: premiums,
            borderColor: "rgb(75, 192, 192)", // Teal
            backgroundColor: "rgba(75, 192, 192, 0.1)",
            yAxisID: "y",
            tension: 0.3,
            fill: true,
            pointRadius: sortedData.length > 50 ? 1 : 3,
            order: 2,
          },
          {
            label: "股價 (TWD)",
            data: stockPrices,
            borderColor: "rgba(54, 162, 235, 0.6)", // Blue
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
            title: { display: true, text: "溢價率 (%)" },
            grid: { color: "#f1f5f9" },
            ticks: { font: { size: 9 } },
          },
          y1: {
            type: "linear",
            display: true,
            position: "right",
            grid: { drawOnChartArea: false },
            title: { display: true, text: "股價 (TWD)" },
            ticks: { font: { size: 9 } },
          },
        },
        plugins: {
          legend: {
            display: true,
            labels: { font: { size: 10 }, boxWidth: 10 },
          },
          zoom: {
            pan: { enabled: true, mode: "x", threshold: 5 },
            zoom: {
              wheel: { enabled: true },
              pinch: { enabled: true },
              mode: "x",
            },
          },
          tooltip: {
            callbacks: {
              afterLabel: function (context) {
                const item = sortedData[context.dataIndex];
                if (context.dataset.yAxisID === "y" && item.cbPrice) {
                  return `CB價: ${parseFloat(item.cbPrice).toFixed(2)}`;
                }
                if (item.isMock) return "(模擬數據)";
              },
            },
          },
        },
      },
    };

    const chart = new window.Chart(ctx, config);

    // 4. Bind Events (Self-contained)
    const updateRangeUI = (activeRange) => {
      Object.values(btnElements).forEach((btn) => {
        if (btn.dataset.range === activeRange) {
          btn.className =
            "text-[10px] font-black px-2.5 py-1 rounded-md transition-all bg-white shadow-sm text-indigo-600";
        } else {
          btn.className =
            "text-[10px] font-bold px-2.5 py-1 rounded-md transition-all text-slate-400 hover:bg-white";
        }
      });
    };

    const handleRangeClick = (range) => {
      updateRangeUI(range);
      this._applyRangeLogic(chart, range, sortedData);
    };

    // Attach click listeners
    Object.entries(btnElements).forEach(([range, btn]) => {
      btn.onclick = () => handleRangeClick(range);
    });

    return chart;
  },

  /**
   * Internal Logic to update chart scale based on range
   */
  _applyRangeLogic(chart, range, fullData) {
    if (!chart || !fullData || fullData.length === 0) return;

    if (range === "all") {
      chart.resetZoom();
    } else {
      const ranges = {
        "1m": 30 * 24 * 60 * 60 * 1000,
        "3m": 90 * 24 * 60 * 60 * 1000,
      };

      const ms = ranges[range];
      if (!ms) return;

      const lastDateStr = fullData[fullData.length - 1].date;
      const lastTime = new Date(lastDateStr).getTime();
      const targetMinTime = lastTime - ms;

      const filtered = fullData.filter(
        (d) => new Date(d.date).getTime() >= targetMinTime,
      );

      const labels = filtered.map((d) => d.date.slice(5));
      const premiums = filtered.map((d) =>
        parseFloat(d.premium || d.premiumRate || 0),
      );
      const stockPrices = filtered.map((d) => parseFloat(d.stockPrice || 0));

      chart.data.labels = labels;
      chart.data.datasets[0].data = premiums;
      chart.data.datasets[1].data = stockPrices;
      chart.update();
    }
  },

  // Legacy render support (Removed/Deprecated)
  // We compel users to use mount() now.
  render(ctx, data) {
    console.warn(
      "CbPremiumHistoryChart.render() is deprecated. Use mount() instead.",
    );
    // Just do a raw render if really needed, but better to fail loud to force migration.
    return null;
  },

  updateRange() {
    console.warn(
      "CbPremiumHistoryChart.updateRange() is deprecated used internal logic.",
    );
  },
};
