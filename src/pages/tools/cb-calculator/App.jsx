import React from "react";
import { useCalculator } from "./hooks/useCalculator";
import SearchInput from "./components/SearchInput";
import InputPanel from "./components/InputPanel";
import ResultsPanel from "./components/ResultsPanel";
import PremiumChart from "./components/PremiumChart";

/**
 * CB 計算機主元件
 */
export default function App() {
    const {
        loading,
        symbols,
        selectedSymbol,
        inputs,
        setInputs,
        results,
        fetchSymbolData,
    } = useCalculator();

    return (
        <div className="min-h-screen text-slate-900">
            <div className="max-w-[1200px] mx-auto p-4 md:p-8">
                {/* Top Action Bar */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <a
                            href="cb-war-room.html"
                            className="flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-sm"
                        >
                            <i className="fas fa-arrow-left"></i>
                            <span>戰情室</span>
                        </a>
                        <div className="h-4 w-[1px] bg-slate-200"></div>
                        <span className="status-pill market-open">
                            <i className="fas fa-microchip text-xs"></i>
                            數據引擎 v3.0 (React)
                        </span>
                    </div>
                    <a
                        href="../../index.html?booted=true"
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
                    >
                        <i className="fas fa-house-chimney text-sm"></i>
                    </a>
                </div>

                {/* Header */}
                <div className="mb-10 text-center md:text-left">
                    <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-800 flex items-center justify-center md:justify-start gap-3">
                        <i className="fas fa-calculator text-indigo-500"></i>
                        CB 可轉債計算機
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 font-medium">
                        精密計算溢價率、轉換價值與損益平衡點
                    </p>
                </div>

                {/* Info Card */}
                <div className="mb-10 p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-start gap-4 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 blur-[2px] pointer-events-none text-slate-400">
                        <i className="fas fa-brain text-7xl"></i>
                    </div>
                    <div className="flex items-start gap-4 relative z-10 w-full">
                        <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                            <i className="fas fa-terminal"></i>
                        </div>
                        <div>
                            <h3 className="font-medium text-slate-800 mb-1">
                                關於轉換溢價率 (Conversion Premium)
                            </h3>
                            <p className="text-xs leading-loose text-slate-500 font-medium">
                                表示 CB 市場價格相對於其「轉換為股票價值」的超額比例。
                                <span className="text-indigo-600 font-medium bg-indigo-50 px-1 rounded">
                                    溢價率趨近 0% 或為負
                                </span>
                                時，CB 價格將與底層股價高度連動。
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
                    {/* Left: Input Panel */}
                    <div className="lg:col-span-5 bg-white p-5 md:p-6 rounded-2xl premium-card overflow-visible relative z-20">
                        <h2 className="text-sm font-medium text-slate-400 mb-6 flex items-center gap-2">
                            <i className="fas fa-sliders-h text-indigo-500"></i>
                            輸入參數
                        </h2>

                        <SearchInput
                            symbols={symbols}
                            onSelect={fetchSymbolData}
                            loading={loading}
                        />

                        {selectedSymbol && (
                            <div className="mb-6 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center text-white text-xs font-medium shadow-sm shadow-indigo-200">
                                        <i className="fas fa-tag"></i>
                                    </div>
                                    <span className="font-semibold text-slate-800 text-sm tracking-tight">
                                        {selectedSymbol.name || selectedSymbol.code}
                                    </span>
                                    <span className="ml-auto px-2 py-1 bg-white border border-slate-200 text-slate-500 text-xs rounded-md mono font-semibold">
                                        {selectedSymbol.code}
                                    </span>
                                </div>
                            </div>
                        )}

                        <hr className="border-slate-100 mb-8" />

                        <InputPanel inputs={inputs} setInputs={setInputs} />
                    </div>

                    {/* Right: Results */}
                    <div className="lg:col-span-7 flex flex-col gap-6">
                        <ResultsPanel results={results} inputs={inputs} />
                        <PremiumChart symbol={selectedSymbol?.code} />

                        {/* Navigation Link */}
                        <a
                            href="cb-war-room.html"
                            className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-xl hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group no-underline"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-red-100 flex items-center justify-center text-red-500">
                                    <i className="fas fa-fire text-sm group-hover:animate-pulse"></i>
                                </div>
                                <div>
                                    <div className="text-xs font-medium text-slate-400 tracking-tighter">
                                        市場熱門 (戰情室)
                                    </div>
                                    <div className="text-sm font-medium text-slate-700">
                                        查看今日熱門榜單
                                    </div>
                                </div>
                            </div>
                            <i className="fas fa-chevron-right text-slate-300 group-hover:translate-x-1 transition-transform"></i>
                        </a>

                        {/* Formula Reference */}
                        <div className="bg-white p-5 rounded-xl text-xs text-gray-400 border border-gray-100">
                            <h4 className="font-medium text-gray-600 mb-2">計算公式</h4>
                            <ul className="space-y-1 list-disc pl-4">
                                <li>
                                    <span className="font-medium text-gray-500">可轉換股數</span> =
                                    100,000 ÷ 轉換價格
                                </li>
                                <li>
                                    <span className="font-medium text-gray-500">轉換價值</span> =
                                    可轉換股數 × 股價 ÷ 1000
                                </li>
                                <li>
                                    <span className="font-medium text-gray-500">轉換溢價率</span> =
                                    (CB價格 - 轉換價值) ÷ 轉換價值 × 100%
                                </li>
                                <li>
                                    <span className="font-medium text-gray-500">轉換平價</span> =
                                    轉換價格 × CB價格 ÷ 100
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
