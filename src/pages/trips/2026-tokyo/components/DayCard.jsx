import React, { useState, useEffect } from "react";
import {
  ChevronUp,
  ChevronDown,
  MapPin,
  Info,
  Sparkles,
  Train,
  Bus,
  Utensils,
  Ticket,
} from "lucide-react";

const DayCard = ({
  dayData,
  onOpenRoute,
  onOpenFoodGuide,
  isExpanded: controlledExpanded,
  onToggle,
  onJumpToTransport,
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
      className="rounded-3xl shadow-sm overflow-hidden mb-6 border border-white/80 bg-white/95 hover:shadow-md hover:scale-[1.005] transition-all"
    >
      {/* Header */}
      <div
        onClick={handleToggle}
        className="cursor-pointer relative h-36 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#2e3e30]/80 via-black/30 to-transparent" />
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
                <div className="w-14 md:w-16 shrink-0 pt-0.5">
                  <span className="w-full text-center inline-block text-[11px] md:text-xs font-bold text-[#5F7A61] bg-[#5F7A61]/10 py-0.5 rounded-full whitespace-nowrap">
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
                      {act.fee && (
                        <div className="mt-1 text-xs text-[#5F7A61] font-bold flex items-start gap-1">
                          <Ticket size={12} className="mt-0.5 shrink-0" />{" "}
                          {act.fee}
                        </div>
                      )}
                      {act.note && !act.transport && (
                        <div className="mt-1 text-xs text-[#5F7A61]/80 flex items-start gap-1">
                          <Info size={12} className="mt-0.5 shrink-0" />{" "}
                          {act.note}
                        </div>
                      )}
                      {act.tips && (
                        <div className="mt-2 text-xs text-[#5F7A61] bg-[#5F7A61]/10 border border-[#5F7A61]/20 px-3 py-1.5 rounded-lg inline-block font-medium">
                          <span className="font-bold mr-1">⚠️</span> {act.tips}
                        </div>
                      )}
                    </div>
                    <div className="flex items-start justify-end shrink-0 w-7 ml-1">
                      {act.transport ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onJumpToTransport?.(dayData.day);
                          }}
                          className="p-1.5 text-gray-400 hover:text-[#5F7A61] transition-colors rounded-lg hover:bg-[#5F7A61]/10"
                          title="查看交通詳情"
                        >
                          {act.transport.line?.includes("巴士") ||
                          act.transport.line?.includes("公車") ? (
                            <Bus size={16} />
                          ) : (
                            <Train size={16} />
                          )}
                        </button>
                      ) : act.isFood ||
                        act.text?.includes("晚餐") ||
                        act.text?.includes("午餐") ||
                        act.text?.includes("早餐") ||
                        act.text?.includes("美食") ||
                        act.text?.includes("大餐") ||
                        act.time?.includes("晚餐") ||
                        act.time?.includes("午餐") ||
                        act.time?.includes("早餐") ||
                        act.time?.includes("美食") ||
                        act.time?.includes("大餐") ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenFoodGuide?.(dayData.day);
                          }}
                          className="p-1.5 text-gray-400 hover:text-[#5F7A61] transition-colors rounded-lg hover:bg-[#5F7A61]/10"
                          title="查看美食詳情"
                        >
                          <Utensils size={16} />
                        </button>
                      ) : act.map ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenRoute(act.map);
                          }}
                          className="p-1.5 text-gray-400 hover:text-[#5F7A61] transition-colors rounded-lg hover:bg-[#5F7A61]/10"
                          title="查看地圖"
                        >
                          <MapPin size={16} />
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Highlight */}
          <div className="mt-2 pt-4 border-t border-gray-100/40">
            <div className="flex items-start gap-3 p-3 rounded-xl border bg-[#5F7A61]/[0.03] border-[#5F7A61]/10 shadow-sm">
              <div className="p-2 rounded-lg shrink-0 bg-[#5F7A61]/10 text-[#5F7A61]">
                <Sparkles size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-[#5F7A61]/60 uppercase tracking-wider mb-0.5">
                  HIGHLIGHT
                </div>
                <div className="text-sm leading-relaxed text-[#5F7A61]/90 font-medium">
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
