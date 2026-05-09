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

  return (
    <div
      id={`day-${dayData.day}`}
      className="bg-white rounded-3xl shadow-lg overflow-hidden mb-6 border border-gray-100/50"
    >
      {/* Header */}
      <div
        onClick={handleToggle}
        className="cursor-pointer relative h-32 bg-cover bg-center"
        style={{ backgroundImage: `url(${dayData.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-end">
          <div>
            <div className="text-white/80 text-xs font-bold tracking-wider mb-1">
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
                  <span className="text-xs md:text-sm font-bold text-indigo-600">
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
                          className="p-1.5 text-gray-400 hover:text-indigo-600 transition-colors rounded-lg hover:bg-gray-50"
                          title="查看地圖"
                        >
                          <MapPin size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                  {act.note && (
                    <div className="mt-1 text-xs text-indigo-600/70 flex items-start gap-1">
                      <Info size={12} className="mt-0.5 shrink-0" /> {act.note}
                    </div>
                  )}
                  {act.tips && (
                    <div className="mt-2 text-xs text-orange-700 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-lg inline-block">
                      <span className="font-bold mr-1">⚠️</span> {act.tips}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Highlight */}
          <div className="mt-6 pt-6 border-t border-gray-50">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-br from-white to-gray-50 border border-gray-100">
              <div className="p-2 bg-[#E8968A]/10 text-[#E8968A] rounded-lg shrink-0">
                <Sparkles size={16} />
              </div>
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">
                  HIGHLIGHT
                </div>
                <div className="text-sm font-medium text-gray-700 leading-relaxed">
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
