import React from "react";
import { Plane, ArrowRight } from "lucide-react";
import { SectionCard } from "../../../components/trips";

const FlightInfoSection = ({
  outbound,
  inbound,
  forceOpen = null,
  title = "航班資訊",
}) => {
  const FlightCard = ({ type, data }) => (
    <div className="p-4 bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-800">
          {type === "outbound" ? "去程" : "回程"}
        </span>
        <span className="text-xs px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full">
          {data.airline} {data.flightNo}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-800">
            {data.time.depart}
          </div>
          <div className="text-xs text-gray-500">
            {data.airport.depart}
            {data.terminal?.depart && (
              <span className="ml-1 font-bold text-indigo-600">
                {data.terminal.depart}
              </span>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center px-3">
          <div className="text-xs text-gray-400 mb-1">{data.duration}</div>
          <div className="w-full h-px bg-gray-300 relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-400 border-y-2 border-y-transparent"></div>
          </div>
          <div className="text-xs text-gray-400 mt-1">{data.date}</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-800">
            {data.time.arrive}
          </div>
          <div className="text-xs text-gray-500">
            {data.airport.arrive}
            {data.terminal?.arrive && (
              <span className="ml-1 font-bold text-indigo-600">
                {data.terminal.arrive}
              </span>
            )}
          </div>
        </div>
      </div>
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
