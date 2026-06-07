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
            image={
              pIdx === 0
                ? phase.days[3]?.image || phase.days[0].image
                : phase.days[1]?.image || phase.days[0].image
            }
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
