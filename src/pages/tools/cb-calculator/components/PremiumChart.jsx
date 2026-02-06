import React, { useEffect, useRef, useState } from "react";

/**
 * 溢價率歷史圖表元件
 * 使用全域 CbPremiumHistoryChart widget
 */
export default function PremiumChart({ symbol }) {
    const mountRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        if (!symbol || !mountRef.current) return;

        const loadChart = async () => {
            setLoading(true);
            setError(null);

            try {
                // 使用全域 widget (從舊版繼承)
                if (window.CbPremiumHistoryChart) {
                    // 清除舊圖表
                    if (chartInstanceRef.current) {
                        chartInstanceRef.current.destroy?.();
                    }
                    mountRef.current.innerHTML = "";

                    const widget = new window.CbPremiumHistoryChart(symbol, {
                        container: mountRef.current,
                    });
                    await widget.init();
                    chartInstanceRef.current = widget;
                } else {
                    setError("圖表引擎尚未載入");
                }
            } catch (e) {
                console.error("[PremiumChart] Error:", e);
                setError("載入失敗");
            } finally {
                setLoading(false);
            }
        };

        loadChart();

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy?.();
            }
        };
    }, [symbol]);

    return (
        <div className="premium-card p-6 rounded-2xl relative min-h-[300px]">
            <div ref={mountRef} className="w-full">
                {!symbol && (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-300">
                        <div className="pulse-ring mb-4">
                            <div className="pulse-dot"></div>
                        </div>
                        <div className="text-xs font-medium tracking-wide uppercase opacity-50">
                            選擇標的後顯示歷史走勢
                        </div>
                    </div>
                )}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-12 text-slate-300">
                        <div className="pulse-ring mb-4">
                            <div className="pulse-dot"></div>
                        </div>
                        <div className="text-xs font-medium tracking-wide uppercase opacity-50">
                            載入圖表中...
                        </div>
                    </div>
                )}
                {error && (
                    <div className="flex flex-col items-center justify-center py-12 text-red-300">
                        <i className="fas fa-exclamation-triangle text-2xl mb-2"></i>
                        <div className="text-xs font-medium">{error}</div>
                    </div>
                )}
            </div>
        </div>
    );
}
