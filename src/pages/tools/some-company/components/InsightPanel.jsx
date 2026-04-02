import React from "react";

const BORDER_MAP = {
  blue: "border-blue-400",
  indigo: "border-indigo-400",
  purple: "border-purple-400",
};

/**
 * 洞察項目渲染 - 支援純文字和高亮混合格式
 */
function InsightItem({ item }) {
  if (typeof item === "string") {
    return (
      <li className="pl-1">
        <span className="leading-relaxed">{item}</span>
      </li>
    );
  }

  // 高亮格式: { text, highlight, after }
  return (
    <li className="pl-1">
      <span className="leading-relaxed">
        {item.text}
        <span className="mx-1 px-1.5 py-0.5 rounded-md font-bold text-emerald-700 bg-emerald-100/80 ring-1 ring-emerald-200/50 transition-all">
          {item.highlight}
        </span>
        {item.after}
      </span>
    </li>
  );
}

/**
 * 財務顧問觀察與分析面板
 */
export default function InsightPanel({ insights }) {
  return (
    <div className="bg-slate-900/5 p-6 md:p-10 rounded-[2rem] shadow-inner border border-slate-200/50 mb-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
          <svg
            className="text-white"
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "28px", height: "28px", minWidth: "28px" }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            財務顧問初步觀察與分析
          </h2>
          <p className="text-sm text-slate-500 font-medium mt-0.5">
            專業級數據洞察報告
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {insights.map((insight, i) => (
          <div
            key={i}
            className={`bg-white p-7 rounded-2xl shadow-sm border-t-8 transition-transform hover:scale-[1.02] duration-300 ${BORDER_MAP[insight.borderColor] || ""}`}
          >
            <h3 className="font-extrabold text-slate-800 mb-5 text-lg leading-snug">
              {insight.title}
            </h3>
            <ul className="list-disc list-outside ml-5 text-slate-600 space-y-4 text-sm font-medium">
              {insight.items.map((item, j) => (
                <InsightItem key={j} item={item} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
