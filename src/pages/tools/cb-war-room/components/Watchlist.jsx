import React, { useState } from "react";

const Watchlist = ({ items, marketData, onAdd, onRemove, onSelectCode }) => {
  const [newCode, setNewCode] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (newCode.trim()) {
      onAdd(newCode.trim());
      setNewCode("");
    }
  };

  const enrichedItems = React.useMemo(() => {
    return items.map((item) => {
      const live = marketData.find((m) => m.code === item.id);
      return { ...item, ...live };
    });
  }, [items, marketData]);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="premium-card p-6 rounded-2xl border-indigo-100 bg-gradient-to-br from-white to-indigo-50/30">
          <h3 className="text-[10px] font-black text-slate-400 uppercase mb-4 px-1 tracking-widest">
            新增追蹤
          </h3>
          <form onSubmit={handleAdd} className="flex gap-2.5">
            <input
              type="text"
              value={newCode}
              onChange={(e) => setNewCode(e.target.value)}
              placeholder="代號 (例: 15142)"
              className="flex-grow border border-slate-200 rounded-xl px-4 py-3 text-sm font-black outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-400 transition-all mono uppercase"
            />
            <button
              type="submit"
              className="w-12 h-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center transition-all shadow-lg active:scale-95"
            >
              <i className="fas fa-plus"></i>
            </button>
          </form>
        </div>

        <div className="md:col-span-3 space-y-8">
          {Object.entries(
            enrichedItems.reduce((acc, item) => {
              const cat = item.category || "未分類 (UNCATEGORIZED)";
              if (!acc[cat]) acc[cat] = [];
              acc[cat].push(item);
              return acc;
            }, {}),
          ).map(([category, groupItems]) => (
            <div
              key={category}
              className="premium-card p-6 rounded-2xl border-slate-100 bg-slate-50/20"
            >
              <h3 className="text-[10px] font-black text-slate-400 uppercase mb-4 px-1 tracking-widest flex items-center justify-between">
                <span>{category}</span>
                <span className="bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full text-[9px]">
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
                      className="group relative flex items-center gap-2 pl-4 pr-1 py-1 bg-white border border-slate-100 rounded-xl shadow-sm hover:shadow-md hover:border-indigo-300 transition-all"
                    >
                      <div
                        onClick={() => onSelectCode(item.id)}
                        className="cursor-pointer py-2"
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
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <i className="fas fa-times-circle text-xs"></i>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {enrichedItems.length === 0 && (
            <div className="py-12 text-center text-slate-300 premium-card rounded-2xl border-slate-100 bg-slate-50/20">
              <i className="fas fa-layer-group text-3xl mb-2 opacity-10"></i>
              <p className="text-[10px] font-bold uppercase tracking-widest">
                尚未新增任何標的
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
