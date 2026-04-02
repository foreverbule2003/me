import React from "react";

const formatNumber = (num) =>
  Math.abs(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/**
 * 變化率指標 - 優化樣式
 */
function ChangeIndicator({ value, label }) {
  if (value === null) return <span className="text-slate-300">-</span>;

  const renderChange = (val) => {
    if (val === null) return null;
    const isUp = val >= 0;
    const colorClass = isUp ? "text-rose-600" : "text-emerald-600";
    return (
      <div className={`flex items-center justify-end font-bold ${colorClass}`}>
        <span className="text-base">
          {val > 0 ? "+" : ""}
          {val.toFixed(1)}%
        </span>
      </div>
    );
  };

  return <>{renderChange(value, label)}</>;
}

/**
 * 通用財務資料表元件
 */
export default function DataTable({
  config,
  data,
  changes,
  annualData,
  annualChanges,
  margins,
  annualMargins,
}) {
  const { title, subtitle, accentColor, isProfit } = config;
  const years = ["2023", "2024", "2025"];
  const quarterLabels = [
    "Q1 (單季)",
    "Q2 (單季)",
    "Q3 (單季)",
    "Q4 (單季推算)",
  ];

  const accentStyles = {
    blue: {
      headerBg: "bg-blue-50/50",
      headerText: "text-blue-600",
      totalBg: "bg-blue-50",
      totalText: "text-blue-700",
      totalBorder: "border-blue-200",
    },
    emerald: {
      headerBg: "bg-emerald-50/50",
      headerText: "text-emerald-600",
      totalBg: "bg-emerald-50",
      totalText: "text-emerald-700",
      totalBorder: "border-emerald-200",
    },
  };

  const styles = accentStyles[accentColor] || accentStyles.blue;

  const renderValue = (val) => {
    if (isProfit && val < 0) {
      return (
        <span className="text-emerald-600 font-semibold">
          ({formatNumber(val)})
        </span>
      );
    }
    return (
      <span className="text-slate-700 font-semibold">{formatNumber(val)}</span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-5 border-b border-slate-100 bg-slate-50/30">
        <h3 className="text-lg font-bold text-slate-800">{title}</h3>
        <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
          <span>{subtitle}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
          <span className="text-slate-400">數據分析報表</span>
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto scrollbar-hide">
        <table className="w-full border-collapse">
          <thead className="text-sm font-bold text-slate-600 uppercase bg-slate-100/50 border-b-2 border-slate-200">
            <tr>
              <th
                rowSpan="2"
                className="px-3 py-4 border-r border-slate-200 text-left bg-slate-100/50 whitespace-nowrap"
              >
                期間
              </th>
              <th className="px-2 py-3 border-r border-slate-200 text-right font-bold text-slate-700 whitespace-nowrap">
                2023年
              </th>
              <th
                colSpan="2"
                className="px-2 py-3 border-r border-slate-200 bg-slate-100/30 text-right font-bold text-slate-600 whitespace-nowrap"
              >
                2024年
              </th>
              <th
                colSpan="2"
                className={`px-2 py-3 ${styles.headerText} ${styles.headerBg} text-right font-bold whitespace-nowrap`}
              >
                2025年
              </th>
            </tr>
            <tr className="bg-slate-50/50 text-sm border-b border-slate-200">
              <th className="px-2 py-2 border-r border-slate-100 text-right font-semibold text-slate-400 whitespace-nowrap">
                {isProfit ? "淨利" : "營收"} / QoQ
              </th>
              <th className="px-2 py-2 border-r border-slate-100 text-right font-semibold text-slate-400 whitespace-nowrap">
                {isProfit ? "淨利" : "營收"} / QoQ
              </th>
              <th className="px-2 py-2 border-r border-slate-100 text-right font-bold text-slate-500 uppercase whitespace-nowrap">
                YoY %
              </th>
              <th
                className={`px-2 py-2 border-r border-slate-100 ${styles.headerBg} text-right font-semibold text-slate-400 whitespace-nowrap`}
              >
                {isProfit ? "淨利" : "營收"} / QoQ
              </th>
              <th
                className={`px-2 py-2 ${styles.headerBg} text-right font-bold text-indigo-900/60 uppercase whitespace-nowrap`}
              >
                YoY %
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {quarterLabels.map((label, qi) => {
              const rowClass =
                qi === 3 ? "bg-slate-50/30" : "group hover:bg-slate-50/50";

              return (
                <tr key={qi} className={`${rowClass} transition-colors`}>
                  <td className="px-3 py-4 font-semibold text-slate-600 border-r border-slate-100 text-left whitespace-nowrap bg-slate-50/10 text-sm">
                    {label}
                  </td>
                  {/* 2023 */}
                  <td className="px-2 py-4 border-r border-slate-100 text-right">
                    <div className="text-slate-800 text-sm font-medium">
                      {renderValue(data["2023"][qi])}
                    </div>
                    <div className="mt-1">
                      <ChangeIndicator
                        value={changes["2023"][qi].qoq}
                        label="QoQ"
                      />
                    </div>
                  </td>
                  {/* 2024 */}
                  <td className="px-2 py-4 border-r border-slate-100 bg-slate-50/20 text-right">
                    <div className="text-slate-800 text-sm font-medium">
                      {renderValue(data["2024"][qi])}
                    </div>
                    <div className="mt-1">
                      <ChangeIndicator
                        value={changes["2024"][qi].qoq}
                        label="QoQ"
                      />
                    </div>
                  </td>
                  <td className="px-2 py-4 border-r border-slate-100 bg-slate-50/20 text-right">
                    <ChangeIndicator
                      value={changes["2024"][qi].yoy}
                      label="YoY"
                    />
                  </td>
                  {/* 2025 */}
                  <td
                    className={`px-2 py-4 border-r border-slate-100 ${styles.headerBg} text-right font-bold`}
                  >
                    <div className="text-slate-900 text-sm">
                      {renderValue(data["2025"][qi])}
                    </div>
                    <div className="mt-1">
                      <ChangeIndicator
                        value={changes["2025"][qi].qoq}
                        label="QoQ"
                      />
                    </div>
                  </td>
                  <td className={`px-2 py-4 ${styles.headerBg} text-right`}>
                    <ChangeIndicator
                      value={changes["2025"][qi].yoy}
                      label="YoY"
                    />
                  </td>
                </tr>
              );
            })}

            {/* Total Row */}
            <tr
              className={`${styles.totalBg} border-t-2 ${styles.totalBorder}`}
            >
              <td className="px-3 py-5 font-bold text-slate-800 border-r border-slate-200 text-left bg-slate-100/20 text-sm whitespace-nowrap">
                總計
              </td>
              <td className="px-2 py-5 border-r border-slate-200 text-right font-bold text-slate-900 text-base">
                {formatNumber(annualData["2023"])}
              </td>
              <td className="px-2 py-5 border-r border-slate-200 bg-slate-50/40 text-right font-bold text-slate-900 text-base">
                {formatNumber(annualData["2024"])}
              </td>
              <td className="px-2 py-5 border-r border-slate-200 bg-slate-50/40 text-right">
                <ChangeIndicator value={annualChanges["2024"]} label="YoY" />
              </td>
              <td
                className={`px-2 py-5 border-r border-slate-200 ${styles.totalBg} text-right font-bold text-slate-900 text-base`}
              >
                {formatNumber(annualData["2025"])}
              </td>
              <td className={`px-2 py-5 ${styles.totalBg} text-right`}>
                <ChangeIndicator value={annualChanges["2025"]} label="YoY" />
              </td>
            </tr>

            {/* NPM Summary Row */}
            {annualMargins && (
              <tr className="bg-indigo-700 text-white border-t border-indigo-800">
                <td className="px-3 py-5 font-bold border-r border-indigo-600/50 text-left bg-indigo-800 text-sm whitespace-nowrap">
                  淨利率 (%)
                </td>
                <td className="px-2 py-4 border-r border-indigo-600/50 text-right font-bold text-indigo-100 text-base">
                  {annualMargins["2023"] ? `${annualMargins["2023"]}%` : "-"}
                </td>
                <td className="px-2 py-4 border-r border-indigo-600/50 text-right font-bold text-indigo-100 text-base">
                  {annualMargins["2024"] ? `${annualMargins["2024"]}%` : "-"}
                </td>
                <td className="px-2 py-4 border-r border-indigo-600/50 text-right font-bold text-indigo-100/50 text-base">
                  -
                </td>
                <td className="px-2 py-4 border-r border-indigo-600/50 text-right font-bold text-yellow-300 text-base">
                  {annualMargins["2025"]}%
                </td>
                <td className="px-2 py-4 text-right font-bold text-indigo-200 text-base border-r border-indigo-600/50">
                  -
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
