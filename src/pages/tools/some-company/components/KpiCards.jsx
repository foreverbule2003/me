import React from "react";

const ACCENT_MAP = {
  blue: "border-l-blue-500",
  emerald: "border-l-emerald-500",
  purple: "border-l-indigo-500",
};

/**
 * KPI 總覽卡片列
 */
export default function KpiCards({ cards }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`bg-white rounded-xl shadow-sm p-7 border border-slate-100 border-l-8 ${ACCENT_MAP[card.accentColor] || ""}`}
        >
          <p className="text-sm text-slate-400 font-medium mb-1">
            {card.label}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-slate-800">
              {card.value}
            </span>
            <span
              className={`text-sm font-semibold ${card.positive ? "text-rose-600" : "text-emerald-600"}`}
            >
              {card.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
