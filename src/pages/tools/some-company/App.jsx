import React from "react";
import KpiCards from "./components/KpiCards";
import QuarterChart from "./components/QuarterChart";
import AnnualChart from "./components/AnnualChart";
import DataTable from "./components/DataTable";
import InsightPanel from "./components/InsightPanel";
import {
  QUARTERS,
  YEARS,
  coverage,
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
 * 財務儀表板 - 主元件
 */
export default function App() {
  // 計算淨利率 (%)
  const calcMargin = (p, r) => (r > 0 ? ((p / r) * 100).toFixed(1) : "0.0");

  const annualProfitMargins = {};

  Object.keys(annualProfit).forEach((year) => {
    annualProfitMargins[year] = calcMargin(
      annualProfit[year],
      annualRevenue[year],
    );
  });

  return (
    <main className="fd">
      <nav className="fd-crumb" aria-label="導覽">
        <a href="/me/index.html">首頁</a>
        <span>/</span>
        <span>工具箱</span>
        <span>/</span>
        <span className="here">財務儀表板</span>
      </nav>

      <header className="fd-head">
        <div className="kicker">Financial Report · {coverage}</div>
        <h1>財務儀表板</h1>
        <p>{coverage} 營業收入與本期淨利分析。單位:千元,Q4 為全年減前三季的推算值。</p>
      </header>

      <KpiCards cards={kpiCards} />

      <div className="fd-charts">
        <QuarterChart kicker="Revenue" title="各季營業收入" labels={QUARTERS} data={revenue} beginAtZero />
        <QuarterChart kicker="Net Income" title="各季本期淨利" labels={QUARTERS} data={profit} />
        <AnnualChart
          revenueData={annualRevenue}
          profitData={annualProfit}
          quarterRevenue={revenue}
          quarterProfit={profit}
        />
      </div>

      <InsightPanel insights={insights} />

      <section className="fd-section">
        <div className="fd-section-head">
          <div className="kicker">Data</div>
          <h2>詳細數據報表</h2>
        </div>
        <div className="fd-tables">
          <DataTable
            config={revenueTableConfig}
            years={YEARS}
            data={revenue}
            changes={revenueChanges}
            annualData={annualRevenue}
            annualChanges={annualRevenueChanges}
          />
          <DataTable
            config={profitTableConfig}
            years={YEARS}
            data={profit}
            changes={profitChanges}
            annualData={annualProfit}
            annualChanges={annualProfitChanges}
            annualMargins={annualProfitMargins}
          />
        </div>
      </section>
    </main>
  );
}
