import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown, MapPin, Info, Sparkles } from "lucide-react";

const DayCard = ({
  dayData,
  onOpenRoute,
  onOpenFoodGuide,
  isExpanded: controlledExpanded,
  onToggle,
}) => {
  const [internalExpanded, setInternalExpanded] = useState(true);
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

  return (
    <div
      id={`day-${dayData.day}`}
      className={`rounded-3xl shadow-lg overflow-hidden mb-6 border ${
        isAnniversary
          ? "border-[#8B7355]/40 ring-2 ring-[#8B7355]/30"
          : "border-gray-100/50 bg-white"
      }`}
    >
      {/* Header */}
      <div
        onClick={handleToggle}
        className="cursor-pointer relative h-36 bg-cover bg-center"
        style={{ backgroundImage: `url(${dayData.image})` }}
      >
        <div
          className={`absolute inset-0 ${
            isAnniversary
              ? "bg-gradient-to-t from-[#8B7355]/85 via-[#8B7355]/40 to-transparent"
              : "bg-gradient-to-t from-black/80 via-black/40 to-transparent"
          }`}
        />
        {isAnniversary && (
          <div className="absolute top-3 right-3 px-3 py-1 bg-[#8B7355]/90 backdrop-blur-sm rounded-full text-white text-xs font-bold flex items-center gap-1">
            🎊 三週年紀念日
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
          <div>
            <div
              className={`text-xs font-bold tracking-wider mb-1 ${
                isAnniversary ? "text-[#F5F7F2]" : "text-white/80"
              }`}
            >
              DAY {dayData.day} • {dayData.date}
            </div>
            <h3 className="text-white text-xl font-bold">{dayData.title}</h3>
          </div>
          <div className="text-white/70">
            {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
          </div>
        </div>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 md:p-6">
          <div className="space-y-4">
            {dayData.activities.map((act, idx) => (
              <div key={idx} className="flex gap-2 md:gap-4">
                <div className="w-11 md:w-14 shrink-0 text-right">
                  <span className="text-xs md:text-sm font-bold text-[#2D5A27]">
                    {act.time}
                  </span>
                </div>
                <div className="flex-1 pb-4 border-b border-gray-50 last:border-0">
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
                          className="p-1.5 text-gray-400 hover:text-[#2D5A27] transition-colors rounded-lg hover:bg-[#F5F7F2]"
                          title="查看地圖"
                        >
                          <MapPin size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                  {act.note && (
                    <div className="mt-1 text-xs text-[#2D5A27]/70 flex items-start gap-1">
                      <Info size={12} className="mt-0.5 shrink-0" /> {act.note}
                    </div>
                  )}
                  {act.tips && (
                    <div className="mt-2 text-xs text-[#8B7355] bg-[#8B7355]/10 border border-[#8B7355]/20 px-3 py-1.5 rounded-lg inline-block">
                      <span className="font-bold mr-1">⚠️</span> {act.tips}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Highlight */}
          <div className="mt-6 pt-6 border-t border-gray-50">
            <div
              className={`flex items-start gap-3 p-3 rounded-xl border ${
                isAnniversary
                  ? "bg-gradient-to-br from-[#8B7355]/5 to-[#8B7355]/10 border-[#8B7355]/20"
                  : "bg-gradient-to-br from-white to-gray-50 border-gray-100"
              }`}
            >
              <div
                className={`p-2 rounded-lg shrink-0 ${
                  isAnniversary
                    ? "bg-[#8B7355]/10 text-[#8B7355]"
                    : "bg-[#E8968A]/10 text-[#E8968A]"
                }`}
              >
                <Sparkles size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                  HIGHLIGHT
                </div>
                <div
                  className={`text-sm font-medium leading-relaxed ${
                    isAnniversary ? "text-[#8B7355]" : "text-gray-700"
                  }`}
                >
                  {dayData.highlight}
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
