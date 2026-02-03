import React, { useState, useEffect } from "react";
import { CbCalculatorCore } from "../../../../lib/cb-logic.mjs";
import { fetchStockPrice, fetchCbDetails } from "../utils.js";
import { CbHistoryService } from "../../../../lib/CbHistoryService";
import {
  db,
  doc,
  setDoc,
  serverTimestamp,
} from "../../../../lib/firebase-client.mjs";
import CbChart from "./CbChart";

const AnalysisDrawer = ({ isOpen, onClose, code, initialData = {} }) => {
  const [data, setData] = useState(initialData);
  const [customConvPrice, setCustomConvPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [history, setHistory] = useState([]);
  const [statusMsg, setStatusMsg] = useState({ msg: "", sub: "" });

  useEffect(() => {
    if (!isOpen || !code) return;

    const loadData = async () => {
      setIsLoading(true);
      let underlyingCode =
        initialData.underlyingCode ||
        CbCalculatorCore.inferUnderlyingCode(code);
      let stockPrice = initialData.stockPrice || 0;

      if (stockPrice === 0 && underlyingCode) {
        stockPrice = await fetchStockPrice(underlyingCode);
      }

      // Fallback for missing conversion price (Fetch from Master Metadata)
      let conversionPrice = initialData.conversionPrice;
      if (!conversionPrice) {
        try {
          const details = await fetchCbDetails(code);
          if (details) {
            conversionPrice = details.conversionPrice;
            // Backfill underlyingCode if missing
            if (!underlyingCode) underlyingCode = details.underlyingCode;
            console.log(
              `[AnalysisDrawer] Recovered details from cb_history for ${code}`,
            );
          }
        } catch (err) {
          console.warn("[AnalysisDrawer] Details recovery error", err);
        }
      }

      setData({
        ...initialData,
        code,
        name: initialData.name || code,
        stockPrice,
        conversionPrice, // Ensure this flows into state
        underlyingCode,
      });
      setCustomConvPrice(conversionPrice || "");

      // Fetch History
      try {
        const h = await CbHistoryService.fetchHistory(db, code, {
          onStatusUpdate: (msg, sub) => setStatusMsg({ msg, sub }),
        });
        setHistory(h);
      } catch (err) {
        console.warn("History fetch failed", err);
      }

      setIsLoading(false);
    };

    loadData();
  }, [isOpen, code, initialData]);

  const convPrice = parseFloat(customConvPrice) || data.conversionPrice || 0;
  const parity = CbCalculatorCore.calculateTheoreticalPrice(
    data.stockPrice,
    convPrice,
  );
  const premium = CbCalculatorCore.calculatePremiumRate(data.price, parity);
  const beStockPrice = CbCalculatorCore.calculateParityPrice(
    data.price,
    convPrice,
  );
  const sharesPerBond = CbCalculatorCore.calculateSharesPerBond(convPrice);
  const upside =
    data.stockPrice > 0 && beStockPrice > 0
      ? (beStockPrice / data.stockPrice - 1) * 100
      : 0;
  const status = CbCalculatorCore.getPremiumStatus(premium);

  // [Debug] Trace Blank Premium Issue
  useEffect(() => {
    if (isOpen) {
      console.log("[AnalysisDrawer Debug]", {
        code,
        data,
        customConvPrice,
        computed: { convPrice, parity, premium, status },
      });
    }
  }, [isOpen, code, data, customConvPrice, parity, premium]);

  const handleSave = async () => {
    if (!code || !customConvPrice) return;
    setIsSaving(true);
    try {
      const docRef = doc(db, "cb_history", code);
      await setDoc(
        docRef,
        {
          conversionPrice: parseFloat(customConvPrice),
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );
      console.log("Metadata saved for", code);
    } catch (err) {
      console.error("Save failed", err);
      alert("儲存失敗");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className={`fixed inset-0 z-[90] bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />
      <div
        className={`fixed top-0 right-0 bottom-0 w-full max-w-[480px] bg-white z-[100] shadow-2xl transition-transform duration-400 ease-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <div className="text-xs font-bold text-indigo-50 bg-indigo-500 px-2 py-0.5 rounded-full inline-block mb-1">
              個股快篩
            </div>
            <h2 className="text-xl font-black text-slate-800">{data.name}</h2>
            <p className="text-[10px] mono font-bold text-slate-400 mt-0.5">
              {code}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Prices Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="metric-small">
              <div className="metric-label">現價 (CB)</div>
              <div className="metric-value">
                {data.price ? parseFloat(data.price).toFixed(2) : "--"}
              </div>
            </div>
            <div className="metric-small">
              <div className="metric-label">現價 (股票)</div>
              <div
                className={`metric-value ${data.stockPrice === 0 ? "text-slate-300" : ""}`}
              >
                {data.stockPrice > 0 ? data.stockPrice.toFixed(2) : "--"}
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div
            className={`premium-card p-0 rounded-2xl border-l-4 transition-colors duration-300 shadow-sm overflow-hidden ${premium < 0 ? "border-green-500" : "border-slate-200"}`}
          >
            <div className="p-6 pb-4">
              <div className="flex justify-between items-center mb-1">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-80">
                  轉換溢價率
                </h3>
                <span
                  className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter border ${premium < 0 ? "bg-green-50 text-green-600 border-green-100" : "bg-slate-100 text-slate-400 border-slate-100/50"}`}
                >
                  {status.label}
                </span>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span
                  className={`text-5xl font-black tracking-tighter mono ${premium < 0 ? "text-green-600" : premium > 10 ? "text-red-500" : "text-slate-800"}`}
                >
                  {parity > 0 ? premium.toFixed(2) + "%" : "--%"}
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-400 opacity-60 leading-none">
                {parity > 0
                  ? premium > 0
                    ? "目前價格高於理論價值 (溢價)"
                    : "目前價格低於理論價值 (折價)"
                  : "正在取得即時報價..."}
              </p>
            </div>

            <div className="h-px bg-slate-100 mx-6" />

            <div className="grid grid-cols-2 gap-px bg-slate-100 border-t border-slate-100">
              <div className="bg-white/60 p-5 group hover:bg-white transition-colors">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                  <span>理論價值</span>
                  <i className="fas fa-coins text-[10px] text-slate-300"></i>
                </div>
                <div className="text-2xl font-black text-slate-800 mono tracking-tight mb-1">
                  {parity > 0 ? parity.toFixed(2) : "--"}
                </div>
                <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5">
                  <span className="mono">
                    {sharesPerBond > 0
                      ? `${Math.floor(sharesPerBond)} 股/張`
                      : "-- 股/張"}
                  </span>
                </div>
              </div>
              <div className="bg-white/60 p-5 group hover:bg-white transition-colors relative">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center justify-between">
                  <span>需上漲 (BE)</span>
                  <i className="fas fa-bullseye text-[10px] text-slate-300"></i>
                </div>
                <div className="text-2xl font-black text-slate-800 mono tracking-tight mb-1">
                  {beStockPrice > 0 ? beStockPrice.toFixed(2) : "--"}
                </div>
                <div className="text-[10px] font-bold text-slate-400">
                  <span className="mono">
                    {upside !== 0
                      ? `需上漲 ${upside.toFixed(2)}%`
                      : "需上漲 --%"}
                  </span>
                </div>
              </div>

              <div className="col-span-2 bg-white/60 p-5 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    轉換價格{" "}
                    <span className="text-indigo-400 bg-indigo-50 px-1 ml-1 rounded">
                      可調整
                    </span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={customConvPrice}
                      onChange={(e) => setCustomConvPrice(e.target.value)}
                      className="bg-white border border-slate-200 text-right px-3 py-1.5 rounded-lg mono text-lg font-black w-32 focus:ring-2 focus:ring-indigo-500/20"
                      placeholder={data.conversionPrice}
                    />
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center border border-indigo-100 disabled:opacity-50"
                    >
                      <i
                        className={`fas ${isSaving ? "fa-spinner fa-spin" : "fa-save"}`}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {history.length > 0 ? (
            <CbChart data={history} />
          ) : (
            <div className="pt-4 p-8 text-center text-slate-300 border-2 border-dashed border-slate-100 rounded-2xl">
              <i
                className={`fas ${isLoading ? "fa-spinner fa-spin" : "fa-chart-area"} text-3xl mb-2 opacity-20 block`}
              ></i>
              <p className="text-[10px] font-bold uppercase tracking-widest">
                {isLoading
                  ? `${statusMsg.msg || "正在讀取歷史資料..."}`
                  : "尚無歷史資料"}
              </p>
              {statusMsg.sub && (
                <p className="text-[8px] mt-1 opacity-60">{statusMsg.sub}</p>
              )}
            </div>
          )}

          <button
            className="w-full py-4 text-xs font-black bg-white border border-slate-200 text-slate-400 rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            onClick={() =>
              window.open(
                `/me/tools/cb-calculator.html?code=${code}&autoSearch=true`,
                "_blank",
              )
            }
          >
            <i className="fas fa-external-link-alt"></i> 開啟進階計算機
          </button>
        </div>
      </div>
    </>
  );
};

export default AnalysisDrawer;
