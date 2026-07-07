import React from "react";
import StickyPhaseHeader from "./StickyPhaseHeader";
import DayCard from "./DayCard";

const ItineraryTab = ({
  itineraryData,
  expandedDays,
  toggleDay,
  onOpenMap,
  onOpenFoodGuide,
  onJumpToTransport,
  isAnyExpanded,
  collapseCounter,
}) => {
  return (
    <div className="space-y-6">
      {itineraryData.map((phase, pIdx) => (
        <div key={pIdx}>
          <StickyPhaseHeader
            title={phase.phase}
            forceOpen={isAnyExpanded}
            collapseCounter={collapseCounter}
          >
            {phase.days.map((day, dIdx) => {
              const dayKey = `${pIdx}-${dIdx}`;
              return (
                <DayCard
                  key={dIdx}
                  dayData={day}
                  onOpenRoute={onOpenMap}
                  onOpenFoodGuide={onOpenFoodGuide}
                  onJumpToTransport={onJumpToTransport}
                  isExpanded={!!expandedDays[dayKey]}
                  onToggle={() => toggleDay(dayKey)}
                />
              );
            })}
          </StickyPhaseHeader>
        </div>
      ))}
    </div>
  );
};

export default ItineraryTab;
