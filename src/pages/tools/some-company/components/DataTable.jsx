import React, { useState } from "react";
import { QUARTERS } from "../data";

const formatNumber = (num) =>
  Math.abs(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const METRICS = [
  { key: "yoy", label: "YoY" },
  { key: "qoq", label: "QoQ" },
];

/**
 * 變化率指標:台股慣例漲紅跌綠;沒有數據(基準期)不顯示
 */
function Change({ value }) {
  if (value == null) return null;
  return (
    <span className={`sub ${value >= 0 ? "up" : "down"}`}>
      {value > 0 ? "+" : ""}
      {value.toFixed(1)}%
    </span>
  );
}

/**
 * 通用財務資料表元件
 * 年度為列、季度為欄,新增年度只多一列。每格大字為數值,小字為變化率,
 * 右上角切換 YoY / QoQ,一次只看一種;全年欄只有 YoY,切到 QoQ 時不顯示。
 * 虧損以括號、綠色表示;尚未公告的季度、未滿一年的年度合計顯示「–」。
 */
export default function DataTable({
  config,
  years,
  data,
  changes,
  annualData,
  annualChanges,
  annualMargins,
}) {
  const { title, subtitle, isProfit } = config;
  const latestFullYear = Object.keys(annualData).at(-1);
  const [metric, setMetric] = useState("yoy");

  const renderValue = (val) => {
    if (val == null) return <span className="nil">–</span>;
    return isProfit && val < 0 ? (
      <span className="down">({formatNumber(val)})</span>
    ) : (
      formatNumber(val)
    );
  };

  return (
    <section className="fd-panel">
      <div className="fd-panel-head">
        <div>
          <div className="kicker">
            {subtitle} · 小字為 {metric === "yoy" ? "YoY" : "QoQ"}
          </div>
          <h3>{title}</h3>
        </div>
        <div className="fd-toggle" role="group" aria-label="變化率">
          {METRICS.map((m) => (
            <button
              key={m.key}
              type="button"
              aria-pressed={metric === m.key}
              onClick={() => setMetric(m.key)}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>
      <div className="fd-scroll">
        <table className="fd-table">
          <thead>
            <tr>
              <th>年度</th>
              {QUARTERS.map((q) => (
                <th key={q}>{q}</th>
              ))}
              <th className="total">全年</th>
              {annualMargins && <th>淨利率</th>}
            </tr>
          </thead>
          <tbody>
            {years.map((year) => (
              <tr key={year}>
                <td>{year}</td>
                {QUARTERS.map((q, qi) => (
                  <td key={q}>
                    {renderValue(data[year][qi])}
                    {data[year][qi] != null && <Change value={changes[year][qi][metric]} />}
                  </td>
                ))}
                <td className="total">
                  {renderValue(annualData[year])}
                  {metric === "yoy" && <Change value={annualChanges[year]} />}
                </td>
                {annualMargins && (
                  <td className={year === latestFullYear ? "hl" : "mute"}>
                    {annualMargins[year] ? `${annualMargins[year]}%` : <span className="nil">–</span>}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
