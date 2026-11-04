import React, { useState } from "react";
import { DEFAULT_TIERS, premiumTier, toWatchRow } from "../watchRow";
import StatTiles, { tileMatch } from "./StatTiles";
import WatchCard from "./WatchCard";
import WatchTable from "./WatchTable";

// 還沒有標的的分類只存在本機（分類是跟著標的存在 Firestore 的）
const EXTRA_CATS_KEY = "cb-watchlist-extra-categories";
const loadExtraCats = () => {
  try {
    return JSON.parse(localStorage.getItem(EXTRA_CATS_KEY)) || [];
  } catch {
    return [];
  }
};

// 價格區間、溢價分段門檻與檢視方式是個人偏好，存在本機
const BANDS_KEY = "cb-watchlist-price-bands";
const TIERS_KEY = "cb-watchlist-premium-tiers";
const VIEW_KEY = "cb-watchlist-view";
const UNCAT = "未分類 (UNCATEGORIZED)";

// 沒溢價率的排最後
const byPremium = (a, b) => (a.premium ?? Infinity) - (b.premium ?? Infinity);
const DEFAULT_BANDS = { low: 100, high: 120 };
const loadJson = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};
const saveJson = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

const Watchlist = ({
  items,
  marketData,
  marketUpdatedAt,
  onAdd,
  onMove,
  onRenameCategory,
  onRemove,
  onSelectCode,
}) => {
  const [newCode, setNewCode] = useState("");
  // 拖拉換群組：正在拖的代號、滑過的群組
  const [draggingId, setDraggingId] = useState(null);
  const [dropTarget, setDropTarget] = useState(null);
  const [addCategory, setAddCategory] = useState("未分類 (UNCATEGORIZED)");
  const [isCustomCat, setIsCustomCat] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState("");
  // 分類名稱編輯：正在改的分類、輸入中的新名稱
  const [editingCat, setEditingCat] = useState(null);
  const [editCatValue, setEditCatValue] = useState("");
  // 篩選列直接新增分類
  const [extraCats, setExtraCats] = useState(loadExtraCats);
  const [isAddingCat, setIsAddingCat] = useState(false);
  const [newCatValue, setNewCatValue] = useState("");

  const [bands, setBands] = useState(() => loadJson(BANDS_KEY, DEFAULT_BANDS));
  const [tiers, setTiers] = useState(() => loadJson(TIERS_KEY, DEFAULT_TIERS));
  const [view, setView] = useState(() => loadJson(VIEW_KEY, "groups"));
  // 狀態數字磚的篩選：null | low | mid | high | notraded
  const [stateFilter, setStateFilter] = useState(null);

  const updateBand = (key, value) => {
    const n = parseFloat(value);
    if (!Number.isFinite(n)) return;
    const next = { ...bands, [key]: n };
    setBands(next);
    saveJson(BANDS_KEY, next);
  };
  const updateTier = (key, value) => {
    const n = parseFloat(value);
    if (!Number.isFinite(n)) return;
    const next = { ...tiers, [key]: n };
    setTiers(next);
    saveJson(TIERS_KEY, next);
  };
  const changeView = (v) => {
    setView(v);
    saveJson(VIEW_KEY, v);
  };

  const saveExtraCats = (next) => {
    setExtraCats(next);
    try {
      localStorage.setItem(EXTRA_CATS_KEY, JSON.stringify(next));
    } catch {}
  };

  // State for filtering (Set of selected categories)
  const [selectedFilters, setSelectedFilters] = useState(new Set());

  // Extract unique categories from items
  const allCategories = React.useMemo(() => {
    const cats = new Set([
      ...items.map((i) => i.category || "未分類 (UNCATEGORIZED)"),
      ...extraCats,
    ]);
    return Array.from(cats).sort();
  }, [items, extraCats]);

  // 預設全選；之後新出現的分類（新增標的、別處改名）也自動勾選，
  // 否則剛加的標的會被篩掉看不到。使用者取消勾選的舊分類維持不動。
  const seenCats = React.useRef(new Set());
  React.useEffect(() => {
    const fresh = allCategories.filter((c) => !seenCats.current.has(c));
    if (fresh.length === 0) return;
    fresh.forEach((c) => seenCats.current.add(c));
    setSelectedFilters((prev) => new Set([...prev, ...fresh]));
  }, [allCategories]);

  const handleToggleFilter = (cat) => {
    const next = new Set(selectedFilters);
    if (next.has(cat)) {
      next.delete(cat);
    } else {
      next.add(cat);
    }
    setSelectedFilters(next);
  };

  const handleSelectAll = () => {
    if (selectedFilters.size === allCategories.length) {
      setSelectedFilters(new Set()); // Deselect All
    } else {
      setSelectedFilters(new Set(allCategories)); // Select All
    }
  };

  // 工具列的搜尋兼新增：代號已在清單 → 跳過去高亮；輸入一部分 → 列候選；
  // 查無 → 選分類加入。帶時間戳，重複前往同一檔也會重新捲動、閃一次
  const [located, setLocated] = useState(null);
  const highlightId = located?.id ?? null;
  const query = newCode.trim().toUpperCase();
  const matchRows = React.useMemo(
    () =>
      items.map((item) => {
        const row = toWatchRow(
          item,
          marketData.find((m) => m.code === item.id),
          bands,
          marketUpdatedAt,
        );
        return { ...row, tier: premiumTier(row.premium, tiers) };
      }),
    [items, marketData, bands, tiers, marketUpdatedAt],
  );
  const exactRow = query
    ? matchRows.find((r) => r.id.toUpperCase() === query)
    : null;
  const candidates =
    query && !exactRow
      ? matchRows
          .filter(
            (r) => r.id.toUpperCase().includes(query) || r.name.includes(query),
          )
          .slice(0, 6)
      : [];
  const canAdd = query && !exactRow && candidates.length === 0;

  // 目標可能被分類或狀態篩掉，先放出來再捲
  const locate = (row) => {
    if (!selectedFilters.has(row.category))
      setSelectedFilters((prev) => new Set(prev).add(row.category));
    if (stateFilter && !tileMatch(stateFilter, row)) setStateFilter(null);
    setLocated({ id: row.id, at: Date.now() });
  };

  React.useEffect(() => {
    if (!located) return;
    document
      .querySelector(`[data-watch-id="${CSS.escape(located.id)}"]`)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    const t = setTimeout(() => setLocated(null), 2000);
    return () => clearTimeout(t);
  }, [located]);

  // 打完完整代號就跳，不用按 Enter
  const exactId = exactRow?.id;
  React.useEffect(() => {
    if (exactRow) locate(exactRow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exactId]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (exactRow) {
      locate(exactRow);
      setNewCode("");
      return;
    }
    if (canAdd) {
      const finalCat = isCustomCat ? customCategoryInput.trim() : addCategory;
      onAdd(newCode.trim(), finalCat);
      setNewCode("");
      // Don't reset category, allowing rapid entry in same cat
    }
  };

  const commitNewCat = () => {
    const name = newCatValue.trim();
    setIsAddingCat(false);
    setNewCatValue("");
    if (!name || allCategories.includes(name)) return;
    saveExtraCats([...extraCats, name]);
    setSelectedFilters((prev) => new Set(prev).add(name));
    setAddCategory(name);
    setIsCustomCat(false);
  };

  const startRename = (cat) => {
    setEditingCat(cat);
    setEditCatValue(cat.replace(" (UNCATEGORIZED)", ""));
  };

  const commitRename = async () => {
    const from = editingCat;
    const to = editCatValue.trim();
    setEditingCat(null);
    if (!from || !to || to === from.replace(" (UNCATEGORIZED)", "")) return;
    // 篩選與新增預設跟著改名，否則改名後的群組會被篩掉
    setSelectedFilters((prev) => {
      const next = new Set(prev);
      if (next.delete(from)) next.add(to);
      return next;
    });
    if (addCategory === from) setAddCategory(to);
    if (extraCats.includes(from))
      saveExtraCats([...new Set(extraCats.map((c) => (c === from ? to : c)))]);
    await onRenameCategory(from, to);
  };

  // 分類篩選後的列（狀態數字磚依這份計數）
  const categoryRows = React.useMemo(
    () => matchRows.filter((r) => selectedFilters.has(r.category)),
    [matchRows, selectedFilters],
  );

  // 依溢價率由低到高，便宜的排前面
  const rows = React.useMemo(
    () =>
      (stateFilter
        ? categoryRows.filter((r) => tileMatch(stateFilter, r))
        : [...categoryRows]
      ).sort(byPremium),
    [categoryRows, stateFilter],
  );

  const groupedRows = React.useMemo(() => {
    const groups = rows.reduce((acc, row) => {
      if (!acc[row.category]) acc[row.category] = [];
      acc[row.category].push(row);
      return acc;
    }, {});
    // 空分類也要顯示，才能把標的拖進去（套用狀態篩選時不顯示）
    if (!stateFilter)
      extraCats.forEach((cat) => {
        if (selectedFilters.has(cat) && !groups[cat]) groups[cat] = [];
      });
    return groups;
  }, [rows, extraCats, selectedFilters, stateFilter]);

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <StatTiles
        rows={categoryRows}
        tiers={tiers}
        active={stateFilter}
        onChange={setStateFilter}
      />

      {/* 1. Category Filter Bar */}
      {allCategories.length > 0 && (
        <div className="vg-chips flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar px-1">
          <button
            onClick={handleSelectAll}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap border ${
              selectedFilters.size === allCategories.length
                ? "bg-slate-700 text-white border-slate-700"
                : "bg-slate-50 text-slate-500 border-slate-200 hover:border-slate-300"
            }`}
          >
            {selectedFilters.size === allCategories.length ? "全選" : "全不選"}
          </button>
          <div className="w-[1px] h-4 bg-slate-200 mx-0.5"></div>
          {allCategories.map((cat) => {
            const isSelected = selectedFilters.has(cat);
            const displayName = cat.replace(" (UNCATEGORIZED)", "");
            return (
              <button
                key={cat}
                onClick={() => handleToggleFilter(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap border ${
                  isSelected
                    ? "bg-indigo-100 text-indigo-700 border-indigo-300"
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                }`}
              >
                {displayName}
              </button>
            );
          })}
          {isAddingCat ? (
            <input
              type="text"
              value={newCatValue}
              onChange={(e) => setNewCatValue(e.target.value)}
              onBlur={commitNewCat}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.currentTarget.blur();
                if (e.key === "Escape") {
                  setNewCatValue("");
                  setIsAddingCat(false);
                }
              }}
              placeholder="新分類名稱"
              autoFocus
              className="w-28 flex-none px-3 py-1.5 rounded-lg text-xs font-semibold border border-indigo-300 text-indigo-700 bg-indigo-50/50 outline-none focus:ring-2 focus:ring-indigo-500/10"
            />
          ) : (
            <button
              type="button"
              onClick={() => setIsAddingCat(true)}
              title="新增分類"
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap border border-dashed border-slate-300 text-slate-400 hover:text-indigo-600 hover:border-indigo-300"
            >
              <i className="fas fa-plus"></i>
            </button>
          )}
        </div>
      )}

      {/* 工具列：檢視切換、搜尋／新增、門檻 */}
      <div className="flex flex-wrap items-center gap-3 px-1">
        <div className="vg-tabs seg flex items-center">
          {[
            ["groups", "fa-th-large", "分組"],
            ["table", "fa-list", "表格"],
          ].map(([v, icon, label]) => (
            <button
              key={v}
              type="button"
              onClick={() => changeView(v)}
              className={`flex items-center gap-1.5 text-xs font-semibold ${view === v ? "is-active" : "text-slate-500"}`}
            >
              <i className={`fas ${icon}`}></i> {label}
            </button>
          ))}
        </div>

        <form
          onSubmit={handleAdd}
          className="flex flex-1 flex-wrap items-center gap-2 min-w-[220px]"
        >
          <div className="relative flex-1 min-w-[160px]">
            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 text-xs"></i>
            <input
              type="text"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setNewCode("");
              }}
              placeholder="搜尋或新增代號"
              title={
                exactRow
                  ? `已在「${exactRow.category.replace(" (UNCATEGORIZED)", "")}」追蹤中`
                  : undefined
              }
              className="w-full pl-8 border border-slate-200 rounded-xl px-3 py-2 text-sm font-semibold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all mono uppercase"
            />
            {candidates.length > 0 && (
              <ul className="watch-search-pop absolute left-0 right-0 top-full mt-1 z-10 rounded-xl p-1">
                {candidates.map((r) => (
                  <li key={r.id}>
                    <button
                      type="button"
                      onClick={() => {
                        locate(r);
                        setNewCode("");
                      }}
                      className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left text-xs font-medium text-slate-600 hover:bg-slate-50"
                    >
                      <span className="truncate">
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

          {/* 分類只在查無代號、要新增時才出現 */}
          {canAdd &&
            (!isCustomCat ? (
              <select
                value={addCategory}
                onChange={(e) => {
                  if (e.target.value === "__NEW__") {
                    setIsCustomCat(true);
                    setCustomCategoryInput("");
                  } else {
                    setAddCategory(e.target.value);
                  }
                }}
                className="border border-slate-200 rounded-xl px-2 py-2 text-xs font-medium text-slate-600 outline-none focus:border-indigo-400 bg-white"
              >
                {allCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.replace(" (UNCATEGORIZED)", "")}
                  </option>
                ))}
                <option value="__NEW__">+ 新增分類...</option>
              </select>
            ) : (
              <div className="flex gap-1">
                <input
                  type="text"
                  value={customCategoryInput}
                  onChange={(e) => setCustomCategoryInput(e.target.value)}
                  placeholder="新分類名稱"
                  autoFocus
                  className="w-32 border border-indigo-300 rounded-xl px-3 py-2 text-xs font-medium outline-none text-indigo-700 bg-indigo-50/50"
                />
                <button
                  type="button"
                  onClick={() => setIsCustomCat(false)}
                  className="w-6 text-slate-400 hover:text-red-500"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
            ))}

          {(exactRow || canAdd) && (
            <button
              type="submit"
              className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold whitespace-nowrap transition-all active:scale-95"
            >
              {exactRow ? "前往" : "＋ 加入"}
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
        <label className="flex items-center gap-2 text-xs font-medium text-slate-500">
          CB 價格區間：低於
          <input
            type="number"
            defaultValue={bands.low}
            onBlur={(e) => updateBand("low", e.target.value)}
            className="band-input mono"
          />
          ／高於
          <input
            type="number"
            defaultValue={bands.high}
            onBlur={(e) => updateBand("high", e.target.value)}
            className="band-input mono"
          />
          時標示
        </label>
      </div>

      {/* 標的：分組卡片或排序表，吃滿寬 */}
      <div className="space-y-4">
        {view === "table" && rows.length > 0 && (
          <WatchTable
            rows={rows}
            bands={bands}
            highlightId={highlightId}
            onSelect={onSelectCode}
          />
        )}

        {view === "groups" &&
          Object.entries(groupedRows).map(([category, groupRows]) => (
            <div
              key={category}
              onDragOver={(e) => {
                if (!draggingId) return;
                e.preventDefault();
                setDropTarget(category);
              }}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget))
                  setDropTarget(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                const item = items.find((i) => i.id === draggingId);
                const from = item?.category || "未分類 (UNCATEGORIZED)";
                if (item && from !== category) onMove(item.id, category);
                setDraggingId(null);
                setDropTarget(null);
              }}
              className={`group-tile rounded-2xl p-4 transition-all ${
                dropTarget === category ? "is-drop" : ""
              }`}
            >
              <h3 className="text-xs font-medium text-slate-500 mb-3 px-1 flex items-center gap-2">
                {editingCat === category ? (
                  <input
                    type="text"
                    value={editCatValue}
                    onChange={(e) => setEditCatValue(e.target.value)}
                    onBlur={commitRename}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") e.currentTarget.blur();
                      if (e.key === "Escape") setEditingCat(null);
                    }}
                    autoFocus
                    className="border border-slate-300 rounded-md px-2 py-0.5 text-xs font-medium text-slate-700 bg-white outline-none"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => startRename(category)}
                    title="點擊修改分類名稱"
                    className="group/cat flex items-center gap-1.5 hover:text-slate-800 transition-colors"
                  >
                    <span>{category.replace(" (UNCATEGORIZED)", "")}</span>
                    <i className="fas fa-pen text-[9px] opacity-0 group-hover/cat:opacity-100 transition-opacity"></i>
                  </button>
                )}
                <span className="text-slate-300">·</span>
                <span>{groupRows.length}</span>
              </h3>

              {groupRows.length === 0 ? (
                <div className="flex items-center gap-3 px-4 py-3 border border-dashed border-slate-300 rounded-xl text-xs font-medium text-slate-400">
                  <span>把標的拖到這裡，或搜尋代號時選這個分類加入</span>
                  <button
                    type="button"
                    onClick={() =>
                      saveExtraCats(extraCats.filter((c) => c !== category))
                    }
                    title="刪除空分類"
                    className="text-slate-300 hover:text-red-500"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3">
                  {groupRows.map((row) => (
                    <WatchCard
                      key={row.id}
                      row={row}
                      bands={bands}
                      dragging={draggingId === row.id}
                      highlighted={highlightId === row.id}
                      dragProps={{
                        draggable: true,
                        onDragStart: (e) => {
                          e.dataTransfer.effectAllowed = "move";
                          e.dataTransfer.setData("text/plain", row.id);
                          setDraggingId(row.id);
                        },
                        onDragEnd: () => {
                          setDraggingId(null);
                          setDropTarget(null);
                        },
                      }}
                      onSelect={onSelectCode}
                      onRemove={onRemove}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}

        {rows.length === 0 && (
          <div className="py-16 text-center text-slate-400 premium-card rounded-2xl">
            <i className="fas fa-filter text-4xl mb-3 opacity-20 block"></i>
            <p className="text-xs font-medium">
              {items.length > 0 ? "沒有符合篩選條件的標的" : "尚未新增任何標的"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
