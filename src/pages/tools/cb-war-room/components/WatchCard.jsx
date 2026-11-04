import React from "react";
import { PREMIUM_LABEL } from "../watchRow";

const fmt = (v, d = 2) => (v === null ? "—" : v.toFixed(d));

// 漲跌：紅漲綠跌，只上在數字上
export const ChangePct = ({ value }) => {
  if (value === null) return <span className="text-slate-300">—</span>;
  const cls =
    value > 0
      ? "text-red-500"
      : value < 0
        ? "text-green-600"
        : "text-slate-400";
  const arrow = value > 0 ? "▲" : value < 0 ? "▼" : "";
  return (
    <span className={`mono ${cls}`}>
      {arrow}
      {Math.abs(value).toFixed(2)}%
    </span>
  );
};

export const BandTag = ({ band, bands }) => {
  if (band === "low") return <span className="band-tag">低於 {bands.low}</span>;
  if (band === "high")
    return <span className="band-tag">高於 {bands.high}</span>;
  return null;
};

// 一檔一張卡：溢價率是主角；底色 = 折溢價狀態；變淡 = 今天沒成交
const WatchCard = ({
  row,
  bands,
  dragging,
  highlighted,
  dragProps,
  onSelect,
  onRemove,
}) => (
  <div
    {...dragProps}
    data-watch-id={row.id}
    onClick={() => onSelect(row.id)}
    title="點開看分析；拖到其他群組可更換分類"
    className={`watch-card group relative rounded-2xl p-4 cursor-pointer transition-all ${
      row.premiumState ? `wc-${row.premiumState}` : ""
    } ${row.traded === false ? "is-idle" : ""} ${dragging ? "opacity-40" : ""} ${
      highlighted ? "is-located" : ""
    }`}
  >
    {/* 左側色帶：溢價率分段，掃一眼看出哪幾檔便宜 */}
    {row.tier && <i className={`watch-strip tier-${row.tier}`} />}
    <div className="flex items-start justify-between gap-2">
      <div className="min-w-0">
        <div className="text-sm font-semibold text-slate-700 truncate">
          {row.name || row.id}
        </div>
        <div className="text-xs font-medium text-slate-400 mono">{row.id}</div>
      </div>
      <BandTag band={row.band} bands={bands} />
    </div>

    <div className="mt-3 flex items-baseline gap-2">
      <span className="premium-num mono">
        {row.premium === null
          ? "—"
          : `${row.premium > 0 ? "+" : ""}${row.premium.toFixed(1)}%`}
      </span>
      <span className="text-xs font-medium text-slate-500">
        {row.premiumState ? PREMIUM_LABEL[row.premiumState] : "缺轉換價或股價"}
      </span>
    </div>

    <dl className="mt-3 grid grid-cols-[auto_1fr_auto] gap-x-3 gap-y-1 text-xs font-medium">
      <dt className="text-slate-400">CB</dt>
      <dd className="mono text-slate-700 text-right">{fmt(row.cbPrice)}</dd>
      <dd className="text-right">
        <ChangePct value={row.cbChangePct} />
      </dd>
      <dt className="text-slate-400">現股</dt>
      <dd className="mono text-slate-700 text-right">{fmt(row.stockPrice)}</dd>
      <dd className="text-right">
        <ChangePct value={row.stockChangePct} />
      </dd>
    </dl>

    {(row.traded === false || row.updatedLabel) && (
      <div className="mt-2 flex items-center justify-between gap-2 text-xs font-medium text-slate-400">
        <span>{row.traded === false ? "今天沒成交" : ""}</span>
        {row.updatedLabel && (
          <span className="mono" title="資料最後更新時間">
            更新 {row.updatedLabel}
          </span>
        )}
      </div>
    )}

    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onRemove(row.id);
      }}
      title="取消追蹤"
      className="w-6 h-6 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-all absolute -top-2 -right-2"
    >
      <i className="fas fa-times text-[10px]"></i>
    </button>
  </div>
);

export default WatchCard;
