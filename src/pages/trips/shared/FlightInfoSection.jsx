import React from "react";
import { Plane, Info } from "lucide-react";
import { SectionCard } from "../../../components/trips";

const FlightInfoSection = ({
  outbound,
  inbound,
  forceOpen = null,
  title = "航班資訊",
}) => {
  const FlightCard = ({ type, data }) => (
    <div className="p-4 bg-white rounded-2xl border border-gray-100 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-gray-700">
          {type === "outbound" ? "✈️ 去程" : "🛬 回程"}
        </span>
        <span className="text-xs px-2.5 py-1 bg-violet-50 text-violet-600 rounded-full font-bold">
          {data.flightNo}
        </span>
      </div>

      {/* 時間軸 */}
      <div className="flex items-center justify-between">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 tabular-nums">
            {data.time.depart}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            {data.airport.depart}
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center px-3">
          <div className="text-xs text-gray-400 mb-1">{data.duration}</div>
          <div className="w-full h-px bg-gradient-to-r from-violet-200 via-violet-400 to-violet-200 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-[6px] border-l-violet-400 border-y-[4px] border-y-transparent" />
          </div>
          <div className="text-xs text-gray-400 mt-1">{data.date}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 tabular-nums">
            {data.time.arrive}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">
            {data.airport.arrive}
          </div>
        </div>
      </div>

      {/* 航班細節 tags */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-50">
        <span className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-lg">
          {data.airline}
        </span>
        {data.aircraft && (
          <span className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-lg">
            {data.aircraft}
          </span>
        )}
        {data.cabin && (
          <span className="text-xs bg-gray-50 text-gray-600 px-2 py-1 rounded-lg">
            {data.cabin}
          </span>
        )}
      </div>

      {/* 備註 */}
      {data.note && (
        <div className="flex items-start gap-2 text-xs text-gray-400">
          <Info size={12} className="mt-0.5 shrink-0 text-violet-400" />
          <span>{data.note}</span>
        </div>
      )}
    </div>
  );

  return (
    <SectionCard
      icon={Plane}
      title={title}
      collapsible={true}
      defaultOpen={false}
      forceOpen={forceOpen}
    >
      <div className="grid md:grid-cols-2 gap-3">
        <FlightCard type="outbound" data={outbound} />
        <FlightCard type="inbound" data={inbound} />
      </div>
    </SectionCard>
  );
};

export default FlightInfoSection;
