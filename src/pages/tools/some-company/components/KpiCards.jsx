import React from "react";

/**
 * KPI 總覽卡片列:細黑頂線、粗黑大數字,變化率依台股慣例漲紅跌綠
 */
export default function KpiCards({ cards }) {
  return (
    <section className="fd-kpis">
      {cards.map((card, i) => (
        <div key={i} className="fd-kpi">
          <div className="kicker">{card.label}</div>
          <div className="num">{card.value}</div>
          <div className={`chg ${card.positive ? "up" : "down"}`}>
            {card.change}
          </div>
        </div>
      ))}
    </section>
  );
}
