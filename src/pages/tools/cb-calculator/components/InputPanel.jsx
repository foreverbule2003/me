import React from "react";

/**
 * 參數輸入面板元件
 */
export default function InputPanel({ inputs, setInputs }) {
  const handleChange = (field) => (e) => {
    setInputs((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  return (
    <div className="space-y-6">
      {/* CB Price */}
      <div className="group">
        <label className="block text-xs font-medium text-slate-500 mb-2 ml-1">
          可轉債價格
        </label>
        <input
          type="number"
          value={inputs.cbPrice}
          onChange={handleChange("cbPrice")}
          step="0.01"
          placeholder="125.00"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none mono font-semibold text-slate-700 text-sm placeholder:text-slate-300"
        />
      </div>

      {/* Stock Price */}
      <div className="group">
        <label className="block text-xs font-medium text-slate-500 mb-2 ml-1">
          標的股價
        </label>
        <input
          type="number"
          value={inputs.stockPrice}
          onChange={handleChange("stockPrice")}
          step="0.01"
          placeholder="255.00"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none mono font-semibold text-slate-700 text-sm placeholder:text-slate-300"
        />
      </div>

      {/* Conversion Price */}
      <div className="group">
        <label className="block text-xs font-medium text-slate-500 mb-2 ml-1">
          轉換價
        </label>
        <input
          type="number"
          value={inputs.conversionPrice}
          onChange={handleChange("conversionPrice")}
          step="0.01"
          placeholder="246.60"
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none mono font-semibold text-slate-700 text-sm placeholder:text-slate-300"
        />
      </div>
    </div>
  );
}
