import React from "react";

const W = 320;
const H = 120;
const PAD_TOP = 18; // 留給長條上方的數值
const PAD_BOTTOM = 18; // 留給下方的標籤

const formatValue = (v, unit) =>
  unit === "%" ? `${v.toFixed(1)}%` : v < 0 ? `(${Math.abs(v).toLocaleString("en-US")})` : v.toLocaleString("en-US");

/**
 * 觀察用的小長條圖:強調那根用紅色,負值綠色(台股慣例),其餘灰色;有負值時畫 0 基準線
 * sparse:點多(如近四季滾動 11 個點)時精簡數值與標籤,避免擠成一團
 */
function MiniBars({ labels, values, highlight, unit, sparse = false }) {
  const min = Math.min(0, ...values);
  const max = Math.max(0, ...values);
  const plotH = H - PAD_TOP - PAD_BOTTOM;
  const y = (v) => PAD_TOP + ((max - v) / (max - min || 1)) * plotH;
  const zero = y(0);
  const slot = W / values.length;
  const barW = Math.min(slot * (sparse ? 0.6 : 0.5), 40);
  // 點多時只標頭、尾與強調那根的數值;標籤只標頭、尾與每年 Q4
  const showValue = (i) => !sparse || i === 0 || i === values.length - 1 || i === highlight;
  const showLabel = (i) => !sparse || i === 0 || i === values.length - 1 || labels[i].endsWith("Q4");

  return (
    <svg className="fd-minibars" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={labels.map((l, i) => `${l} ${formatValue(values[i], unit)}`).join(",")}>
      {values.map((v, i) => {
        const cx = slot * i + slot / 2;
        const top = Math.min(y(v), zero);
        const tone = i === highlight ? "hl" : v < 0 ? "neg" : "base";
        return (
          <g key={labels[i]}>
            <rect className={tone} x={cx - barW / 2} y={top} width={barW} height={Math.max(Math.abs(zero - y(v)), 1)} />
            {/* 負值的數字放在 0 線上方,避免壓到下方的年份標籤 */}
            {showValue(i) && (
              <text className={`val ${tone}`} x={cx} y={(v < 0 ? zero : top) - 5} textAnchor="middle">
                {formatValue(v, unit)}
              </text>
            )}
            {showLabel(i) && (
              <text className="lab" x={cx} y={H - 4} textAnchor="middle">
                {labels[i]}
              </text>
            )}
          </g>
        );
      })}
      <line className="axis" x1="0" x2={W} y1={zero} y2={zero} />
    </svg>
  );
}

/**
 * 觀察面板:編號由大紅數字呈現,每則一張小圖配一句說明
 */
export default function InsightPanel({ insights }) {
  return (
    <section className="fd-section">
      <div className="fd-section-head">
        <div className="kicker">Analysis</div>
        <h2>觀察</h2>
      </div>

      <div className="fd-insights">
        {insights.map((insight, i) => (
          <article key={i} className="fd-panel fd-insight">
            <div className="no">{String(i + 1).padStart(2, "0")}</div>
            <h3>{insight.title}</h3>
            <MiniBars {...insight.chart} />
            <p className="note">{insight.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
