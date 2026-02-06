import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "./hooks/useAuth";
import { useMarketPulse } from "./hooks/useMarketPulse";
import { useWatchlist } from "./hooks/useWatchlist";
import MarketPulse from "./components/MarketPulse";
import AnalysisDrawer from "./components/AnalysisDrawer";
import DateNavigator from "./components/DateNavigator";
import Watchlist from "./components/Watchlist";

const App = () => {
  const [activeTab, setActiveTab] = useState("pulse");
  const { user, login } = useAuth();
  const {
    data: marketData,
    loading: marketLoading,
    updatedAt,
    isHistory,
    currentDate,
    jumpToDate,
    prevDay,
    nextDay,
    refresh,
  } = useMarketPulse();
  const {
    watchlist,
    loading: watchlistLoading,
    addCB,
    removeCB,
  } = useWatchlist(user);

  const [selectedCode, setSelectedCode] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSelectCode = (code) => {
    setSelectedCode(code);
    setIsDrawerOpen(true);
  };

  const selectedItemData = useMemo(() => {
    if (!selectedCode) return {};
    const poolItem = marketData.find((i) => i.code === selectedCode);
    const watchItem = watchlist.find((i) => i.id === selectedCode);
    return { ...poolItem, ...watchItem };
  }, [selectedCode, marketData, watchlist]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Top Banner / Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-[2px] z-50 bg-slate-100 overflow-hidden">
        <div
          className={`h-full bg-indigo-500 transition-all duration-300 ${marketLoading ? "w-1/2 animate-pulse" : "w-0"}`}
        ></div>
      </div>

      <div className="max-w-[1200px] mx-auto p-4 md:p-8">
        {/* Header Section (Legacy Style) */}
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <a
              href="/me/tools/cb-calculator.html"
              className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-medium text-sm"
            >
              <i className="fas fa-arrow-left"></i>
              <span>計算機</span>
            </a>
            {isHistory && (
              <>
                <div className="h-4 w-[1px] bg-slate-200"></div>
                <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded">
                  <i className="fas fa-archive"></i> HISTORY
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={login}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"
            >
              {user ? (
                <img
                  src={user.photoURL}
                  className="w-6 h-6 rounded-full"
                  alt="User"
                />
              ) : (
                <i className="fas fa-user-circle text-lg"></i>
              )}
            </button>
            <button
              onClick={refresh}
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-all"
            >
              <i
                className={`fas fa-sync-alt ${marketLoading ? "animate-spin" : ""}`}
              ></i>
            </button>
            <a
              href="/me/?booted=true"
              className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all"
            >
              <i className="fas fa-house-chimney text-sm"></i>
            </a>
          </div>
        </header>

        {/* Title Row with Inline DateNavigator */}
        <section className="mb-4">
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-800">
              CB 戰情室
            </h1>
            <DateNavigator
              currentDate={currentDate}
              onPrev={prevDay}
              onNext={nextDay}
              onJump={jumpToDate}
            />
          </div>
          <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <i className="far fa-clock"></i> 最後更新:
              <span className="mono font-semibold text-slate-600">
                {updatedAt ? updatedAt.toLocaleTimeString() : "--:--:--"}
              </span>
            </div>
            {isHistory && (
              <span className="px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-100 rounded flex items-center gap-1 text-xs font-medium">
                <i className="fas fa-history"></i> 歷史回顧模式
              </span>
            )}
          </div>
        </section>

        {/* Tab Navigation */}
        <nav className="flex items-center gap-6 border-b border-slate-200 mb-6">
          <button
            onClick={() => setActiveTab("pulse")}
            className={`flex items-center gap-2 py-3 px-1 text-sm font-semibold border-b-2 transition-all ${activeTab === "pulse" ? "text-indigo-600 border-indigo-600" : "text-slate-400 border-transparent hover:text-slate-600"}`}
          >
            <i className="fas fa-chart-line"></i> 市場熱門
          </button>
          <button
            onClick={() => setActiveTab("watchlist")}
            className={`flex items-center gap-2 py-3 px-1 text-sm font-semibold border-b-2 transition-all ${activeTab === "watchlist" ? "text-indigo-600 border-indigo-600" : "text-slate-400 border-transparent hover:text-slate-600"}`}
          >
            <i className="fas fa-star"></i> 我的追蹤
          </button>
        </nav>

        {/* Content Area */}
        <main>
          {activeTab === "pulse" ? (
            <div className="premium-card rounded-2xl overflow-hidden shadow-sm bg-white">
              <MarketPulse data={marketData} onSelectCode={handleSelectCode} />
            </div>
          ) : user ? (
            <Watchlist
              items={watchlist}
              marketData={marketData}
              onAdd={addCB}
              onRemove={removeCB}
              onSelectCode={handleSelectCode}
            />
          ) : (
            <div className="premium-card rounded-2xl p-20 text-center text-slate-400 bg-white border border-dashed border-slate-200">
              <i className="fas fa-lock text-4xl mb-4 opacity-20 block"></i>
              <p className="font-bold mb-4">請先登入後查看追蹤清單</p>
              <button
                onClick={login}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all"
              >
                Google 快速登入
              </button>
            </div>
          )}
        </main>

        <footer className="mt-6 text-[11px] text-slate-400 flex justify-between items-center px-2">
          <span>* 本版本為 React 實驗版。核心邏輯與 legacy 版共享。</span>
          <span className="mono">Timboy v3.1.0-rc (React)</span>
        </footer>
      </div>

      <AnalysisDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        code={selectedCode}
        initialData={selectedItemData}
      />
    </div>
  );
};

export default App;
