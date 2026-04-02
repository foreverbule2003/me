import React from "react";
import KpiCards from "./components/KpiCards";
import RevenueChart from "./components/RevenueChart";
import ProfitChart from "./components/ProfitChart";
import AnnualChart from "./components/AnnualChart";
import DataTable from "./components/DataTable";
import InsightPanel from "./components/InsightPanel";
import { Home, ChevronRight } from "lucide-react";
import {
  QUARTERS,
  revenue,
  profit,
  annualRevenue,
  annualProfit,
  kpiCards,
  revenueChanges,
  profitChanges,
  annualRevenueChanges,
  annualProfitChanges,
  insights,
  revenueTableConfig,
  profitTableConfig,
} from "./data";

/**
 * 財務趨勢視覺化儀表板 - 主元件
 */
export default function App() {
  // 計算淨利率 (%)
  const calcMargin = (p, r) => (r > 0 ? ((p / r) * 100).toFixed(1) : "0.0");

  const profitMargins = {};
  const annualProfitMargins = {};

  Object.keys(profit).forEach((year) => {
    profitMargins[year] = profit[year].map((p, i) =>
      calcMargin(p, revenue[year][i]),
    );
    annualProfitMargins[year] = calcMargin(
      annualProfit[year],
      annualRevenue[year],
    );
  });

  return (
    <div className="min-h-screen text-slate-800 p-4 md:p-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* Top Navigation */}
        <nav className="flex items-center gap-3 mb-6">
          <a
            href="/me/index.html"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white/70 backdrop-blur-md border border-slate-200 shadow-sm text-slate-600 hover:text-indigo-600 hover:bg-white hover:scale-110 transition-all duration-200 group"
            title="回到首頁"
          >
            <Home size={18} className="group-hover:drop-shadow-sm" />
          </a>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 bg-slate-100/50 px-3 py-2 rounded-full border border-slate-200/50">
            <span className="hover:text-slate-600 cursor-default">首頁</span>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="hover:text-slate-600 cursor-default">工具箱</span>
            <ChevronRight size={12} className="text-slate-300" />
            <span className="text-indigo-600 font-bold">財務儀表板 (2025)</span>
          </div>
        </nav>

        {/* 標題區塊 */}
        <header className="mb-10">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 tracking-tight">
            財務趨勢視覺化儀表板
          </h1>
          <p className="text-slate-500 flex items-center gap-2">
            2023 - 2025 營業收入與本期淨利分析
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-200/50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              單位：千元
            </span>
          </p>
        </header>

        {/* KPI 總覽卡片 */}
        <KpiCards cards={kpiCards} />

        {/* 圖表區塊 (上半部兩欄) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <RevenueChart labels={QUARTERS} data={revenue} />
          <ProfitChart labels={QUARTERS} data={profit} />
        </div>

        {/* 圖表區塊 (下半部全寬) */}
        <AnnualChart revenueData={annualRevenue} profitData={annualProfit} />

        {/* 財務顧問觀察區塊 */}
        <InsightPanel insights={insights} />

        {/* 詳細數據報表區塊 */}
        <div className="mt-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">
            詳細數據報表
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <DataTable
              config={revenueTableConfig}
              data={revenue}
              changes={revenueChanges}
              annualData={annualRevenue}
              annualChanges={annualRevenueChanges}
            />
            <DataTable
              config={profitTableConfig}
              data={profit}
              changes={profitChanges}
              annualData={annualProfit}
              annualChanges={annualProfitChanges}
              margins={profitMargins}
              annualMargins={annualProfitMargins}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
