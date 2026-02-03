import React from "react";

const DateNavigator = ({ currentDate, onPrev, onNext, onJump }) => {
  const days = ["日", "一", "二", "三", "四", "五", "六"];
  const dayName = days[currentDate.getDay()];

  const y = currentDate.getFullYear();
  const m = String(currentDate.getMonth() + 1).padStart(2, "0");
  const d = String(currentDate.getDate()).padStart(2, "0");
  const displayDate = `${y.toString().slice(-2)}/${m}/${d}(${dayName})`;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(currentDate);
  target.setHours(0, 0, 0, 0);
  const isLatest = target >= today;

  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={onPrev}
        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-slate-100 rounded-full transition-all active:scale-95"
      >
        <i className="fas fa-chevron-left text-xs"></i>
      </button>

      <div className="relative group flex items-center gap-2 px-3 py-1.5 cursor-pointer hover:bg-slate-50 rounded-lg transition-all">
        <i className="far fa-calendar-alt text-slate-400 group-hover:text-indigo-500 transition-colors text-sm"></i>
        <span className="mono text-lg font-bold text-slate-700 group-hover:text-indigo-600 transition-colors select-none">
          {displayDate}
        </span>
        <input
          type="date"
          value={formatDate(currentDate)}
          onChange={(e) => onJump(new Date(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      <button
        onClick={onNext}
        disabled={isLatest}
        className={`w-8 h-8 flex items-center justify-center rounded-full transition-all ${isLatest ? "text-slate-200 cursor-not-allowed" : "text-slate-400 hover:text-indigo-600 hover:bg-slate-100 active:scale-95"}`}
      >
        <i className="fas fa-chevron-right text-xs"></i>
      </button>
    </div>
  );
};

export default DateNavigator;
