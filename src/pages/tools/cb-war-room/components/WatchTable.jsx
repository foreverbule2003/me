import React, { useState } from "react";
import { PREMIUM_LABEL } from "../watchRow";
import { ChangePct, BandTag } from "./WatchCard";

const COLUMNS = [
  { key: "name", label: "名稱 / 代號", align: "left" },
  { key: "category", label: "分類", align: "left" },
  { key: "premium", label: "溢價率", align: "right" },
  { key: "cbPrice", label: "CB", align: "right" },
  { key: "cbChangePct", label: "CB 漲跌", align: "right" },
  { key: "stockPrice", label: "現股", align: "right" },
  { key: "stockChangePct", label: "現股漲跌", align: "right" },
  { key: "volume", label: "成交量", align: "right" },
  { key: "updatedMs", label: "更新", align: "right" },
];

// 沒資料的排最後，不管升降冪
const compare = (key, dir) => (a, b) => {
  const x = a[key];
  const y = b[key];
  if (x === null || x === undefined) return 1;
  if (y === null || y === undefined) return -1;
  const r = typeof x === "string" ? x.localeCompare(y, "zh-Hant") : x - y;
  return dir === "asc" ? r : -r;
};

const WatchTable = ({ rows, bands, highlightId, onSelect }) => {
  // 預設溢價率由低到高：最便宜的在最上面
  const [sort, setSort] = useState({ key: "premium", dir: "asc" });
  const sorted = [...rows].sort(compare(sort.key, sort.dir));

  const toggle = (key) =>
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
        : { key, dir: "asc" },
    );

  return (
    <div className="premium-card rounded-2xl overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="border-b border-slate-200 text-xs text-slate-400">
          <tr>
            {COLUMNS.map((c) => (
              <th
                key={c.key}
                className={`px-4 py-3 font-medium whitespace-nowrap ${c.align === "right" ? "text-right" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => toggle(c.key)}
                  className={`inline-flex items-center gap-1 hover:text-slate-700 ${sort.key === c.key ? "text-slate-700" : ""}`}
                >
                  {c.label}
                  {sort.key === c.key && (
                    <i
                      className={`fas fa-caret-${sort.dir === "asc" ? "up" : "down"}`}
                    ></i>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r) => (
            <tr
              key={r.id}
              data-watch-id={r.id}
              onClick={() => onSelect(r.id)}
              className={`table-row-hover border-b border-slate-100 last:border-0 text-sm ${r.traded === false ? "is-idle" : ""} ${highlightId === r.id ? "is-located" : ""}`}
            >
              <td className="px-4 py-3">
                <div className="font-semibold text-slate-700 whitespace-nowrap">
                  {r.name || r.id}
                </div>
                <div className="text-xs font-medium text-slate-400 mono">
                  {r.id}
                </div>
              </td>
              <td className="px-4 py-3 text-xs font-medium text-slate-500 whitespace-nowrap">
                {r.category.replace(" (UNCATEGORIZED)", "")}
              </td>
              <td className="px-4 py-3 text-right whitespace-nowrap">
                <span
                  className={`premium-pill mono ${r.premiumState ? `wc-${r.premiumState}` : ""}`}
                  title={r.premiumState ? PREMIUM_LABEL[r.premiumState] : ""}
                >
                  {r.premium === null
                    ? "—"
                    : `${r.premium > 0 ? "+" : ""}${r.premium.toFixed(1)}%`}
                </span>
              </td>
              <td className="px-4 py-3 text-right whitespace-nowrap">
                <span className="mono font-semibold text-slate-700">
                  {r.cbPrice === null ? "—" : r.cbPrice.toFixed(2)}
                </span>{" "}
                <BandTag band={r.band} bands={bands} />
              </td>
              <td className="px-4 py-3 text-right">
                <ChangePct value={r.cbChangePct} />
              </td>
              <td className="px-4 py-3 text-right mono text-slate-700">
                {r.stockPrice === null ? "—" : r.stockPrice.toFixed(2)}
              </td>
              <td className="px-4 py-3 text-right">
                <ChangePct value={r.stockChangePct} />
              </td>
              <td className="px-4 py-3 text-right mono text-xs text-slate-500">
                {r.volume === null ? "—" : r.volume}
              </td>
              <td className="px-4 py-3 text-right mono text-xs text-slate-400 whitespace-nowrap">
                {r.updatedLabel ?? "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WatchTable;
