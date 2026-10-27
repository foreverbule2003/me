import React from "react";

const formatNumber = (num) =>
  Math.abs(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/**
 * 變化率指標:台股慣例漲紅跌綠;沒有數據(基準期)顯示一條淡線
 */
function Change({ value, sub }) {
  if (value === null) return <span className={`nil${sub ? " sub" : ""}`}>–</span>;
  return (
    <span className={`${value >= 0 ? "up" : "down"}${sub ? " sub" : ""}`}>
      {value > 0 ? "+" : ""}
      {value.toFixed(1)}%
    </span>
  );
}

/**
 * 通用財務資料表元件
 * 每年一欄數值(下面小字 QoQ);2024、2025 另有 YoY 欄。虧損以括號、綠色表示。
 */
export default function DataTable({
  config,
  data,
  changes,
  annualData,
  annualChanges,
  annualMargins,
}) {
  const { title, subtitle, isProfit } = config;
  const quarterLabels = ["Q1", "Q2", "Q3", "Q4 (推算)"];
  const metric = isProfit ? "淨利" : "營收";

  const renderValue = (val) =>
    isProfit && val < 0 ? (
      <span className="down">({formatNumber(val)})</span>
    ) : (
      formatNumber(val)
    );

  return (
    <section className="fd-panel">
      <div className="kicker">{subtitle} · 小字為 QoQ</div>
      <h3>{title}</h3>
      <div className="fd-scroll">
        <table className="fd-table">
          <thead>
            <tr>
              <th rowSpan="2">期間</th>
              <th>2023</th>
              <th colSpan="2">2024</th>
              <th colSpan="2">2025</th>
            </tr>
            <tr>
              <th>{metric}</th>
              <th>{metric}</th>
              <th>YoY</th>
              <th>{metric}</th>
              <th>YoY</th>
            </tr>
          </thead>
          <tbody>
            {quarterLabels.map((label, qi) => (
              <tr key={qi}>
                <td>{label}</td>
                {["2023", "2024", "2025"].map((year) => (
                  <React.Fragment key={year}>
                    <td>
                      {renderValue(data[year][qi])}
                      <Change value={changes[year][qi].qoq} sub />
                    </td>
                    {year !== "2023" && (
                      <td>
                        <Change value={changes[year][qi].yoy} />
                      </td>
                    )}
                  </React.Fragment>
                ))}
              </tr>
            ))}

            <tr className="total">
              <td>全年</td>
              <td>{formatNumber(annualData["2023"])}</td>
              <td>{formatNumber(annualData["2024"])}</td>
              <td>
                <Change value={annualChanges["2024"]} />
              </td>
              <td>{formatNumber(annualData["2025"])}</td>
              <td>
                <Change value={annualChanges["2025"]} />
              </td>
            </tr>

            {annualMargins && (
              <tr className="margin">
                <td>淨利率</td>
                <td>{annualMargins["2023"]}%</td>
                <td>{annualMargins["2024"]}%</td>
                <td></td>
                <td className="hl">{annualMargins["2025"]}%</td>
                <td></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
