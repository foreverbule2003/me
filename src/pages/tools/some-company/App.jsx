import React from "react";
import KpiCards from "./components/KpiCards";
import RevenueChart from "./components/RevenueChart";
import ProfitChart from "./components/ProfitChart";
import AnnualChart from "./components/AnnualChart";
import DataTable from "./components/DataTable";
import InsightPanel from "./components/InsightPanel";
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
        {/* 標題區塊 */}
        <header className="mb-10 pt-4">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            財務趨勢視覺化儀表板
          </h1>
          <p className="text-slate-500">
            2023 - 2025 營業收入與本期淨利分析{" "}
            <span className="text-slate-400 ml-1">(單位：千元)</span>
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
