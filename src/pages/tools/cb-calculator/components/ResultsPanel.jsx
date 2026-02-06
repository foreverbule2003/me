import React from "react";

/**
 * 計算結果顯示面板
 */
export default function ResultsPanel({ results, inputs }) {
    const hasData =
        inputs.cbPrice && inputs.stockPrice && inputs.conversionPrice;

    // 判斷溢價率狀態
    const getPremiumStatus = () => {
        if (!results.premiumRate && results.premiumRate !== 0) return "計算中";
        if (results.premiumRate < 0) return "折價";
        if (results.premiumRate < 5) return "低溢價";
        if (results.premiumRate < 15) return "中溢價";
        return "高溢價";
    };

    const getPremiumColor = () => {
        if (!results.premiumRate && results.premiumRate !== 0)
            return "border-slate-200";
        if (results.premiumRate < 0) return "border-emerald-500";
        if (results.premiumRate < 5) return "border-blue-500";
        if (results.premiumRate < 15) return "border-amber-500";
        return "border-red-500";
    };

    const getStatusBadgeClass = () => {
        if (!results.premiumRate && results.premiumRate !== 0)
            return "bg-slate-100 text-slate-400";
        if (results.premiumRate < 0) return "bg-emerald-100 text-emerald-600";
        if (results.premiumRate < 5) return "bg-blue-100 text-blue-600";
        if (results.premiumRate < 15) return "bg-amber-100 text-amber-600";
        return "bg-red-100 text-red-600";
    };

    return (
        <div
            className={`premium-card p-0 rounded-2xl border-l-4 ${getPremiumColor()} transition-colors duration-300 shadow-sm overflow-hidden`}
        >
            {/* Top Section: Premium Rate */}
            <div className="p-6 pb-4">
                <div className="flex justify-between items-center mb-1">
                    <h3 className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                        轉換溢價率
                    </h3>
                    <span
                        className={`px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-tight ${getStatusBadgeClass()}`}
                    >
                        {getPremiumStatus()}
                    </span>
                </div>
                <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-semibold text-slate-800 tracking-tight mono">
                        {hasData && results.premiumRate !== null
                            ? `${results.premiumRate.toFixed(2)}%`
                            : "--%"}
                    </span>
                </div>
                <p className="text-xs font-medium text-slate-400 opacity-80 leading-snug">
                    {hasData
                        ? results.isDiscount
                            ? "折價中，CB 價格與股價高度連動"
                            : "目前處於溢價狀態"
                        : "暫無數據。請輸入標的進行運算。"}
                </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100 mx-6"></div>

            {/* Bottom Section: Metrics Grid */}
            <div className="grid grid-cols-2 gap-px bg-slate-100 border-t border-slate-100">
                {/* Conversion Value */}
                <div className="bg-white/60 p-5 group hover:bg-white transition-colors">
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2 flex items-center justify-between">
                        <span>轉換價值</span>
                        <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-indigo-400 transition-colors">
                            <i className="fas fa-coins text-xs"></i>
                        </div>
                    </div>
                    <div className="text-xl font-semibold text-slate-800 mono tracking-tight mb-1">
                        {hasData && results.conversionValue !== null
                            ? results.conversionValue.toFixed(2)
                            : "--"}
                    </div>
                    <div className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                        <i className="fas fa-layer-group text-xs opacity-70"></i>
                        <span className="mono">
                            {hasData && results.sharesPerBond !== null
                                ? `${results.sharesPerBond.toFixed(0)} 股/張`
                                : "-- 股/張"}
                        </span>
                    </div>
                </div>

                {/* Parity (Upside) */}
                <div className="bg-white/60 p-5 group hover:bg-white transition-colors relative">
                    <div className="absolute left-0 top-4 bottom-4 w-px bg-slate-100/50"></div>
                    <div className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-2 flex items-center justify-between">
                        <span>需上漲 (BE)</span>
                        <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:text-amber-500 transition-colors">
                            <i className="fas fa-bullseye text-xs"></i>
                        </div>
                    </div>
                    <div className="text-xl font-semibold text-slate-800 mono tracking-tight mb-1">
                        {hasData && results.parityPrice !== null
                            ? results.parityPrice.toFixed(2)
                            : "--"}
                    </div>
                    <div className="text-xs font-medium text-slate-400 flex items-center gap-1.5">
                        <i className="fas fa-chart-line text-xs opacity-70"></i>
                        <span className="mono">
                            {hasData && results.upsideNeeded !== null
                                ? `需上漲 ${results.upsideNeeded.toFixed(2)}%`
                                : "需上漲 --%"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
