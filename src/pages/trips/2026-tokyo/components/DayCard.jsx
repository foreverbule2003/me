import React, { useState, useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  MapPin,
  Info,
  Sparkles,
  Train,
  Bus,
} from "lucide-react";

const DayCard = ({
  dayData,
  onOpenRoute,
  onOpenFoodGuide,
  isExpanded: controlledExpanded,
  onToggle,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(true);
  const [selectedOptIndex, setSelectedOptIndex] = useState(0);
  const isControlled =
    controlledExpanded !== null && controlledExpanded !== undefined;

  useEffect(() => {
    if (isControlled) {
      setInternalExpanded(controlledExpanded);
    }
  }, [controlledExpanded, isControlled]);

  const isExpanded = isControlled ? controlledExpanded : internalExpanded;

  const handleToggle = () => {
    if (isControlled) {
      onToggle?.();
    }
    setInternalExpanded(!internalExpanded);
  };

  const isAnniversary = dayData.anniversary === true;

  // 動態切換方案資料
  const currentData = dayData.options
    ? dayData.options[selectedOptIndex]
    : dayData;
  const title = currentData.title || dayData.title;
  const highlight = currentData.highlight || dayData.highlight;
  const image = currentData.image || dayData.image;
  const activities = currentData.activities || dayData.activities;

  return (
    <div
      id={`day-${dayData.day}`}
      className={`rounded-3xl shadow-sm overflow-hidden mb-6 border transition-all ${
        isAnniversary
          ? "border-[#7A8B7B]/50 ring-2 ring-[#7A8B7B]/20 bg-amber-50"
          : "border-white/80 bg-white/95 hover:shadow-md hover:scale-[1.005]"
      }`}
    >
      {/* Header */}
      <div
        onClick={handleToggle}
        className="cursor-pointer relative h-36 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div
          className={`absolute inset-0 ${
            isAnniversary
              ? "bg-gradient-to-t from-[#5F7A61]/85 via-[#5F7A61]/30 to-transparent"
              : "bg-gradient-to-t from-[#2e3e30]/80 via-black/30 to-transparent"
          }`}
        />
        {isAnniversary && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-[#5F7A61]/90 backdrop-blur-md rounded-full text-white text-xs font-bold flex items-center gap-1 border border-white/20 shadow-md">
            🎊 三週年紀念日
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
          <div>
            <div
              className={`text-xs font-bold tracking-wider mb-1 ${
                isAnniversary ? "text-[#F4F6F0]" : "text-white/80"
              }`}
            >
              DAY {dayData.day} • {dayData.date}
            </div>
            <h3 className="text-white text-xl font-bold">{title}</h3>
          </div>
          <div className="text-white/70">
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 md:p-6">
          {/* 方案切換 Tabs */}
          {dayData.options && (
            <div className="flex gap-2 mb-5 bg-[#F4F6F0] p-1 rounded-2xl border border-[#7A8B7B]/10">
              {dayData.options.map((opt, oIdx) => (
                <button
                  key={oIdx}
                  onClick={(e) => {
                    e.stopPropagation(); // 阻止卡片折疊
                    setSelectedOptIndex(oIdx);
                  }}
                  className={`flex-1 py-2 px-2.5 rounded-xl text-xs font-bold transition-all text-center ${
                    selectedOptIndex === oIdx
                      ? "bg-[#5F7A61] text-white shadow-sm"
                      : "text-[#5F7A61] hover:bg-[#5F7A61]/5"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}

          <div className="space-y-4">
            {activities.map((act, idx) => (
              <div key={idx} className="flex gap-2 md:gap-4">
                <div className="w-11 md:w-14 shrink-0 text-right">
                  <span className="text-xs md:text-sm font-bold text-[#5F7A61]">
                    {act.time}
                  </span>
                </div>
                <div className="flex-1 pb-4 border-b border-gray-50/30 last:border-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-800 mb-1">
                        {act.text}
                      </div>
                      {act.subText && (
                        <div className="text-sm text-gray-500">
                          {act.subText}
                        </div>
                      )}
                    </div>
                    <div className="flex items-start gap-1 shrink-0">
                      {act.map && (
                        <button
                          onClick={() => onOpenRoute(act.map)}
                          className="p-1.5 text-gray-400 hover:text-[#5F7A61] transition-colors rounded-lg hover:bg-[#5F7A61]/10"
                          title="查看地圖"
                        >
                          <MapPin size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                  {act.note && !act.transport && (
                    <div className="mt-1 text-xs text-[#5F7A61]/80 flex items-start gap-1">
                      <Info size={12} className="mt-0.5 shrink-0" /> {act.note}
                    </div>
                  )}
                  {act.transport && (
                    <div className="mt-2.5 bg-[#F4F6F0] border border-[#7A8B7B]/20 rounded-xl p-3 flex flex-col gap-2">
                      <div className="flex items-center gap-1.5 border-b border-[#7A8B7B]/10 pb-1.5">
                        {act.transport.line.includes("巴士") ||
                        act.transport.line.includes("公車") ? (
                          <Bus size={14} className="text-[#5F7A61]" />
                        ) : (
                          <Train size={14} className="text-[#5F7A61]" />
                        )}
                        <span className="text-sm font-bold text-[#5F7A61]">
                          {act.transport.line}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs">
                        {act.transport.station && (
                          <span className="bg-white text-gray-700 font-medium px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
                            <span className="text-[10px]">📍</span>{" "}
                            {act.transport.station}
                          </span>
                        )}
                        {act.transport.platform && (
                          <span className="bg-white text-gray-700 font-medium px-2 py-1 rounded-md shadow-sm flex items-center gap-1 border border-emerald-100">
                            <span className="text-[10px]">🛤️</span>{" "}
                            {act.transport.platform}
                          </span>
                        )}
                      </div>
                      {(act.transport.fare || act.transport.note) && (
                        <div className="text-[11px] text-gray-500 mt-2 leading-relaxed bg-white/50 p-2.5 rounded-lg flex flex-col gap-1 border border-white/30">
                          {act.transport.fare && (
                            <div className="flex items-center gap-1 text-[#5F7A61] font-bold">
                              <span>🪙</span> 票價：{act.transport.fare}
                            </div>
                          )}
                          {act.transport.note && (
                            <div className="text-gray-500">
                              {act.transport.note.includes("⚠️") ? (
                                <span className="text-red-500 font-medium">
                                  {act.transport.note}
                                </span>
                              ) : (
                                <span>* {act.transport.note}</span>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                  {act.tips && (
                    <div className="mt-2 text-xs text-[#5F7A61] bg-[#5F7A61]/10 border border-[#5F7A61]/20 px-3 py-1.5 rounded-lg inline-block font-medium">
                      <span className="font-bold mr-1">⚠️</span> {act.tips}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Highlight */}
          <div className="mt-6 pt-6 border-t border-gray-100/40">
            <div
              className={`flex items-start gap-3 p-3 rounded-xl border ${
                isAnniversary
                  ? "bg-gradient-to-br from-[#5F7A61]/5 to-[#5F7A61]/10 border-[#5F7A61]/20"
                  : "bg-gray-50 border-gray-100 shadow-sm"
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 ${
                  isAnniversary
                    ? "bg-[#5F7A61]/10 text-[#5F7A61]"
                    : "bg-[#5F7A61]/10 text-[#5F7A61]"
                }`}
              >
                <Sparkles size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                  HIGHLIGHT
                </div>
                <div
                  className={`text-sm leading-relaxed ${
                    isAnniversary
                      ? "text-[#5F7A61] font-bold"
                      : "text-gray-700 font-medium"
                  }`}
                >
                  {highlight}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DayCard;
