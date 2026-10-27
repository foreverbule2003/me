import React from "react";

// data.js 的標題帶「1. 」編號與結尾 emoji;編號改由大紅數字呈現,emoji 不顯示
const cleanTitle = (title) =>
  title.replace(/^\d+\.\s*/, "").replace(/\s*\p{Extended_Pictographic}+\s*$/u, "");

/**
 * 洞察項目渲染 - 支援純文字和高亮混合格式
 */
function InsightItem({ item }) {
  if (typeof item === "string") return <li>{item}</li>;

  // 高亮格式: { text, highlight, after }
  return (
    <li>
      {item.text}
      <mark>{item.highlight}</mark>
      {item.after}
    </li>
  );
}

/**
 * 財務顧問觀察與分析面板
 */
export default function InsightPanel({ insights }) {
  return (
    <section className="fd-section">
      <div className="fd-section-head">
        <div className="kicker">Analysis</div>
        <h2>財務顧問初步觀察</h2>
      </div>

      <div className="fd-insights">
        {insights.map((insight, i) => (
          <article key={i} className="fd-panel fd-insight">
            <div className="no">{String(i + 1).padStart(2, "0")}</div>
            <h3>{cleanTitle(insight.title)}</h3>
            <ul>
              {insight.items.map((item, j) => (
                <InsightItem key={j} item={item} />
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
