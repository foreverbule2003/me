import React from "react";

// 頂部狀態數字磚：每塊一個數字，點了就只看那一段的標的
// 溢價率分三段（門檻 tiers 可調）；折價、接近平價幾乎永遠是 0，不再單獨一塊
export const tileMatch = (key, row) =>
  key === "notraded" ? row.traded === false : row.tier === key;

const StatTiles = ({ rows, tiers, active, onChange }) => {
  const tiles = [
    { key: null, label: "追蹤" },
    { key: "low", label: `溢價 < ${tiers.low}%` },
    { key: "mid", label: `${tiers.low}–${tiers.high}%` },
    { key: "high", label: `> ${tiers.high}%` },
    { key: "notraded", label: "今天沒成交" },
  ];
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
      {tiles.map((t) => {
        const isActive = active === t.key;
        const count = t.key
          ? rows.filter((r) => tileMatch(t.key, r)).length
          : rows.length;
        return (
          <button
            key={t.label}
            type="button"
            onClick={() => onChange(isActive ? null : t.key)}
            className={`stat-tile premium-card rounded-2xl p-4 text-left transition-all ${
              isActive ? "is-active" : ""
            }`}
          >
            <div className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
              {t.key && t.key !== "notraded" && (
                <i className={`tier-dot tier-${t.key}`} />
              )}
              {t.label}
            </div>
            <div className="stat-num mono">{count}</div>
          </button>
        );
      })}
    </div>
  );
};

export default StatTiles;
