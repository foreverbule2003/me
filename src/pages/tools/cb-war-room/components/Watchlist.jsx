import React, { useState } from "react";

const Watchlist = ({ items, marketData, onAdd, onRemove, onSelectCode }) => {
  const [newCode, setNewCode] = useState("");
  const [addCategory, setAddCategory] = useState("未分類 (UNCATEGORIZED)");
  const [isCustomCat, setIsCustomCat] = useState(false);
  const [customCategoryInput, setCustomCategoryInput] = useState("");

  // State for filtering (Set of selected categories)
  const [selectedFilters, setSelectedFilters] = useState(new Set());

  // Extract unique categories from items
  const allCategories = React.useMemo(() => {
    const cats = new Set(
      items.map((i) => i.category || "未分類 (UNCATEGORIZED)"),
    );
    return Array.from(cats).sort();
  }, [items]);

  // Initialize filters (Select All by default)
  React.useEffect(() => {
    // Only init if empty (initial load) to avoid resetting user selection on data update
    // But if new categories appear, we might want to auto-select them or not?
    // Let's simple approach: If allCategories changes size significantly, maybe reset?
    // Better: Just defaulting to 'all selected' if size is 0 (first load).
    if (selectedFilters.size === 0 && allCategories.length > 0) {
      setSelectedFilters(new Set(allCategories));
    }
  }, [allCategories.length]); // Depend on length change mainly

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

  const handleAdd = (e) => {
    e.preventDefault();
    if (newCode.trim()) {
      const finalCat = isCustomCat ? customCategoryInput.trim() : addCategory;
      onAdd(newCode.trim(), finalCat);
      setNewCode("");
      // Don't reset category, allowing rapid entry in same cat
    }
  };

  const enrichedItems = React.useMemo(() => {
    return items
      .filter((item) => {
        const cat = item.category || "未分類 (UNCATEGORIZED)";
        // If no filters selected, show nothing? Or show all?
        // UX standard: if nothing selected, usually nothing shown.
        // But we init with all selected.
        return selectedFilters.has(cat);
      })
      .map((item) => {
        const live = marketData.find((m) => m.code === item.id);
        return { ...item, ...live };
      });
  }, [items, marketData, selectedFilters]);

  // Grouping Logic
  const groupedItems = React.useMemo(() => {
    return enrichedItems.reduce((acc, item) => {
      const cat = item.category || "未分類 (UNCATEGORIZED)";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {});
  }, [enrichedItems]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* 1. Category Filter Bar (Material Chips) */}
      {allCategories.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar px-1">
          <button
            onClick={handleSelectAll}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap border ${
              selectedFilters.size === allCategories.length
                ? "bg-slate-800 text-white border-slate-800"
                : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
            }`}
          >
            {selectedFilters.size === allCategories.length ? "全選" : "全不選"}
          </button>
          <div className="w-[1px] h-4 bg-slate-300 mx-1"></div>
          {allCategories.map((cat) => {
            const isSelected = selectedFilters.has(cat);
            return (
              <button
                key={cat}
                onClick={() => handleToggleFilter(cat)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all whitespace-nowrap border flex items-center gap-1 ${
                  isSelected
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200"
                    : "bg-white text-slate-500 border-slate-200 hover:border-indigo-300"
                }`}
              >
                {isSelected && <i className="fas fa-check text-[10px]"></i>}
                {cat}
              </button>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* 2. Add New Block */}
        <div className="premium-card p-5 rounded-2xl border-indigo-100 bg-gradient-to-br from-white to-indigo-50/50 h-fit">
          <h3 className="text-[10px] font-black text-slate-400 uppercase mb-3 px-1 tracking-widest">
            新增追蹤
          </h3>
          <form onSubmit={handleAdd} className="flex flex-col gap-3">
            <div className="relative">
              <i className="fas fa-search absolute left-3 top-3.5 text-slate-300 text-xs"></i>
              <input
                type="text"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                placeholder="代號 (例: 15142)"
                className="w-full pl-8 border border-slate-200 rounded-xl px-4 py-3 text-sm font-black outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all mono uppercase"
              />
            </div>

            {/* Category Selector */}
            <div className="flex gap-2">
              {!isCustomCat ? (
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
                  className="flex-grow w-0 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 outline-none focus:border-indigo-400 bg-white"
                >
                  {allCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="__NEW__">+ 新增分類...</option>
                </select>
              ) : (
                <div className="flex-grow w-0 flex gap-1 animate-in fade-in slide-in-from-right-2">
                  <input
                    type="text"
                    value={customCategoryInput}
                    onChange={(e) => setCustomCategoryInput(e.target.value)}
                    placeholder="輸入新分類名稱"
                    autoFocus
                    className="w-full border border-indigo-300 rounded-xl px-3 py-2 text-xs font-bold outline-none focus:ring-2 focus:ring-indigo-500/10 text-indigo-700 bg-indigo-50/50"
                  />
                  <button
                    type="button"
                    onClick={() => setIsCustomCat(false)}
                    className="w-8 flex-none text-slate-400 hover:text-red-500"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 font-bold text-sm"
            >
              <i className="fas fa-plus"></i>
              <span>加入追蹤</span>
            </button>
          </form>
        </div>

        {/* 3. Grouped List Area */}
        <div className="lg:col-span-3 space-y-6">
          {Object.entries(groupedItems).map(([category, groupItems]) => (
            <div
              key={category}
              className="premium-card p-5 rounded-2xl border-slate-100 bg-slate-50/30"
            >
              <h3 className="text-[10px] font-black text-slate-400 uppercase mb-4 px-1 tracking-widest flex items-center justify-between">
                <span>{category}</span>
                <span className="bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded-full text-[9px] shadow-sm">
                  {groupItems.length}
                </span>
              </h3>

              <div className="flex flex-wrap gap-3">
                {groupItems.map((item) => {
                  const premium = parseFloat(
                    item.premium || item.premiumRate || 0,
                  );
                  const isDiscount = premium < 0;

                  return (
                    <div
                      key={item.id}
                      className="group relative flex items-center gap-2 pl-4 pr-1 py-1.5 bg-white border border-slate-200/60 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all hover:-translate-y-0.5"
                    >
                      <div
                        onClick={() => onSelectCode(item.id)}
                        className="cursor-pointer py-1"
                      >
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-slate-800 mono tracking-tighter">
                            {item.id}
                          </span>
                          <span className="text-[9px] font-bold text-slate-400 truncate max-w-[60px]">
                            {item.name || "--"}
                          </span>
                        </div>
                      </div>

                      <div
                        className={`ml-2 px-2 py-1 rounded-lg text-[10px] font-black mono ${isDiscount ? "bg-indigo-50 text-indigo-600" : "bg-slate-50 text-slate-500"}`}
                      >
                        {premium.toFixed(1)}%
                      </div>

                      <button
                        onClick={() => onRemove(item.id)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all absolute -top-2 -right-2 bg-white shadow-sm border border-slate-100"
                      >
                        <i className="fas fa-times text-[10px]"></i>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {enrichedItems.length === 0 && (
            <div className="py-16 text-center text-slate-300 premium-card rounded-2xl border-slate-100 bg-slate-50/20 border-dashed">
              <i className="fas fa-filter text-4xl mb-3 opacity-20 block"></i>
              <p className="text-xs font-bold uppercase tracking-widest">
                {items.length > 0
                  ? "沒有符合篩選條件的標的"
                  : "尚未新增任何標的"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
