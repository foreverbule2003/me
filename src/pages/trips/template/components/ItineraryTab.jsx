import React from "react";
import StickyPhaseHeader from "./StickyPhaseHeader";
import DayCard from "./DayCard";

const ItineraryTab = ({
  itineraryData,
  expandedDays,
  toggleDay,
  onOpenMap,
  onOpenFoodGuide,
  isAnyExpanded,
}) => {
  return (
    <div className="space-y-4">
      {itineraryData.map((phase, pIdx) => (
        <div key={pIdx}>
          <StickyPhaseHeader
            title={phase.phase}
            forceOpen={isAnyExpanded}
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
