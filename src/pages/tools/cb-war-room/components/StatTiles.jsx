import React from "react";

// 頂部狀態數字磚：每塊一個數字，點了就只看那個狀態的標的
const TILES = [
  { key: null, label: "追蹤", count: (rows) => rows.length },
  {
    key: "discount",
    label: "折價",
    count: (rows) => rows.filter((r) => r.premiumState === "discount").length,
  },
  {
    key: "near",
    label: "接近平價",
    count: (rows) => rows.filter((r) => r.premiumState === "near").length,
  },
  {
    key: "notraded",
    label: "今天沒成交",
    count: (rows) => rows.filter((r) => r.traded === false).length,
  },
];

const StatTiles = ({ rows, active, onChange }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {TILES.map((t) => {
      const isActive = active === t.key;
      return (
        <button
          key={t.label}
          type="button"
          onClick={() => onChange(isActive ? null : t.key)}
          className={`stat-tile premium-card rounded-2xl p-4 text-left transition-all ${
            t.key ? `st-${t.key}` : ""
          } ${isActive ? "is-active" : ""}`}
        >
          <div className="text-xs font-medium text-slate-500">{t.label}</div>
          <div className="stat-num mono">{t.count(rows)}</div>
        </button>
      );
    })}
  </div>
);

export default StatTiles;
