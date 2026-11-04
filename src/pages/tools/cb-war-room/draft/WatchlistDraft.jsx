import React, { useRef, useState } from "react";
import { toWatchRow } from "../watchRow";
import WatchCard from "../components/WatchCard";
import WatchTable from "../components/WatchTable";

// 「我的追蹤」改版草稿：只在比較頁用，不寫入資料
// ① 搜尋／新增移到工具列，卡片吃滿寬
// ② 狀態磚改成溢價率分段（門檻可調），群組內依溢價率排序
// ③ 卡片左側色帶依溢價率分段上色

const UNCAT = "未分類 (UNCATEGORIZED)";
const PRICE_BANDS = { low: 100, high: 120 };
const DEFAULT_TIERS = { low: 20, high: 50 };

export const Mark = ({ n }) => (
  <span className="draft-mark" data-mark={n}>
    {n}
  </span>
);

const tierOf = (premium, tiers) => {
  if (premium === null) return null;
  if (premium < tiers.low) return "low";
  if (premium <= tiers.high) return "mid";
  return "high";
};

// 沒溢價率的排最後
const byPremium = (a, b) => (a.premium ?? Infinity) - (b.premium ?? Infinity);

const WatchlistDraft = ({ items, marketData, marketUpdatedAt }) => {
  const rootRef = useRef(null);
  const [view, setView] = useState("groups");
  const [tiers, setTiers] = useState(DEFAULT_TIERS);
  const [tierFilter, setTierFilter] = useState(null);
  const [query, setQuery] = useState("");
  const [addCategory, setAddCategory] = useState(UNCAT);
  const [located, setLocated] = useState(null);

  const allRows = React.useMemo(
    () =>
      items.map((item) => {
        const row = toWatchRow(
          item,
          marketData.find((m) => m.code === item.id),
          PRICE_BANDS,
          marketUpdatedAt,
        );
        return { ...row, tier: tierOf(row.premium, tiers) };
      }),
    [items, marketData, marketUpdatedAt, tiers],
  );

  const categories = [...new Set(allRows.map((r) => r.category))].sort();

  const TILES = [
    { key: null, label: "追蹤", match: () => true },
    {
      key: "low",
      label: `溢價 < ${tiers.low}%`,
      match: (r) => r.tier === "low",
    },
    {
      key: "mid",
      label: `${tiers.low}–${tiers.high}%`,
      match: (r) => r.tier === "mid",
    },
    { key: "high", label: `> ${tiers.high}%`, match: (r) => r.tier === "high" },
    { key: "notraded", label: "今天沒成交", match: (r) => r.traded === false },
  ];
  const activeTile = TILES.find((t) => t.key === tierFilter) || TILES[0];
  const rows = allRows.filter(activeTile.match).sort(byPremium);

  const grouped = rows.reduce((acc, r) => {
    (acc[r.category] ||= []).push(r);
    return acc;
  }, {});

  // 搜尋：完整代號 → 跳過去；部分 → 候選；查無 → 可新增
  const q = query.trim().toUpperCase();
  const exact = q ? allRows.find((r) => r.id.toUpperCase() === q) : null;
  const candidates =
    q && !exact
      ? allRows
          .filter((r) => r.id.toUpperCase().includes(q) || r.name.includes(q))
          .slice(0, 6)
      : [];
  const canAdd = q && !exact && candidates.length === 0;

  const locate = (row) => {
    setTierFilter(null);
    setQuery("");
    setLocated(row.id);
    setTimeout(() => {
      rootRef.current
        ?.querySelector(`[data-watch-id="${CSS.escape(row.id)}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    setTimeout(() => setLocated(null), 2000);
  };

  const updateTier = (key, value) => {
    const n = parseFloat(value);
    if (Number.isFinite(n)) setTiers((t) => ({ ...t, [key]: n }));
  };

  return (
    <div ref={rootRef} className="space-y-4">
      {/* ② 溢價率分段磚 */}
      <div className="relative">
        <Mark n="2" />
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {TILES.map((t) => {
            const isActive = tierFilter === t.key;
            return (
              <button
                key={t.label}
                type="button"
                onClick={() => setTierFilter(isActive ? null : t.key)}
                className={`stat-tile premium-card rounded-2xl p-4 text-left transition-all ${
                  isActive ? "is-active" : ""
                }`}
              >
                <div className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                  {t.key && t.key !== "notraded" && (
                    <i className={`draft-dot tier-${t.key}`} />
                  )}
                  {t.label}
                </div>
                <div className="stat-num mono">
                  {allRows.filter(t.match).length}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ① 工具列：檢視切換 + 搜尋／新增 + 門檻 */}
      <div className="relative flex flex-wrap items-center gap-3 px-1">
        <Mark n="1" />
        <div className="vg-tabs seg flex items-center">
          {[
            ["groups", "fa-th-large", "分組"],
            ["table", "fa-list", "表格"],
          ].map(([v, icon, label]) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`flex items-center gap-1.5 text-xs font-semibold ${view === v ? "is-active" : "text-slate-500"}`}
            >
              <i className={`fas ${icon}`}></i> {label}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (exact) locate(exact);
            else if (canAdd) alert("草稿不寫入資料");
          }}
          className="draft-search relative flex items-center gap-2"
        >
          <div className="relative flex-1">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-xs"></i>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && setQuery("")}
              placeholder="搜尋或新增代號"
              className="band-input draft-input text-sm font-semibold mono uppercase"
            />
            {candidates.length > 0 && (
              <ul className="draft-pop absolute left-0 right-0 top-full mt-1 z-10 rounded-xl p-1">
                {candidates.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => locate(r)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs font-medium hover:bg-slate-50"
                    >
                      <span>
                        <span className="mono">{r.id}</span>{" "}
                        <span className="text-slate-400">{r.name}</span>
                      </span>
                      <i className="fas fa-arrow-right text-[10px] text-slate-300"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {canAdd && (
            <select
              value={addCategory}
              onChange={(e) => setAddCategory(e.target.value)}
              className="band-input draft-select text-xs font-medium"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c.replace(" (UNCATEGORIZED)", "")}
                </option>
              ))}
            </select>
          )}
          {(exact || canAdd) && (
            <button
              type="submit"
              className="px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold whitespace-nowrap"
            >
              {exact ? "前往" : "＋ 加入"}
            </button>
          )}
        </form>

        <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
          溢價分段
          <input
            type="number"
            defaultValue={tiers.low}
            onBlur={(e) => updateTier("low", e.target.value)}
            className="band-input mono"
          />
          /
          <input
            type="number"
            defaultValue={tiers.high}
            onBlur={(e) => updateTier("high", e.target.value)}
            className="band-input mono"
          />
          %
        </label>
      </div>

      {view === "table" && (
        <WatchTable
          rows={rows}
          bands={PRICE_BANDS}
          highlightId={located}
          onSelect={() => {}}
        />
      )}

      {view === "groups" &&
        Object.entries(grouped)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([category, groupRows], gi) => (
            <div key={category} className="group-tile rounded-2xl p-4">
              <h3 className="text-xs font-medium text-slate-500 mb-3 px-1 flex items-center gap-2">
                <span>{category.replace(" (UNCATEGORIZED)", "")}</span>
                <span className="text-slate-300">·</span>
                <span>{groupRows.length}</span>
                <span className="text-slate-300 ml-auto">溢價率低 → 高</span>
              </h3>
              {/* ① 吃滿寬：auto-fill 依寬度自動多排 */}
              <div className="draft-cards">
                {groupRows.map((row, i) => (
                  <div key={row.id} className="relative">
                    {/* ③ 色帶 */}
                    {row.tier && (
                      <i className={`draft-strip tier-${row.tier}`} />
                    )}
                    {i === 0 && gi === 0 && <Mark n="3" />}
                    <WatchCard
                      row={row}
                      bands={PRICE_BANDS}
                      highlighted={located === row.id}
                      onSelect={() => {}}
                      onRemove={() => alert("草稿不寫入資料")}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

      {rows.length === 0 && (
        <div className="py-16 text-center text-slate-400 premium-card rounded-2xl text-xs">
          沒有符合條件的標的
        </div>
      )}
    </div>
  );
};

export default WatchlistDraft;
