import React from "react";
import { CloudSun, MapPin, Droplets, Thermometer } from "lucide-react";
import { SectionCard } from "../../../components/trips";

const WeatherForecastSection = ({ forceOpen, theme = "default" }) => {
  const t =
    {
      default: {
        activeBorder: "border-indigo-500",
        shadow: "shadow-indigo-200/50",
        hoverBorder: "hover:border-indigo-100",
        borderLight: "border-indigo-100",
        bgMain: "bg-indigo-500",
        textLight: "text-indigo-300",
        textMain: "text-indigo-600",
        textDark: "text-indigo-900",
        textSecondary: "text-indigo-400",
        tempHigh: "bg-orange-500",
      },
      forest: {
        activeBorder: "border-[#2D5A27]",
        shadow: "shadow-[#2D5A27]/20",
        hoverBorder: "hover:border-[#2D5A27]/30",
        borderLight: "border-[#2D5A27]/20",
        bgMain: "bg-[#2D5A27]",
        textLight: "text-[#8B7355]/60",
        textMain: "text-[#2D5A27]",
        textDark: "text-[#1A3A17]",
        textSecondary: "text-[#8B7355]",
        tempHigh: "bg-[#8B7355]",
      },
    }[theme] || "default";
  const forecastData = [
    {
      date: "1/11",
      day: "日",
      fullDate: "1/11 (日)",
      loc: "泉佐野",
      weatherIcon: "☁️/☀️",
      weatherText: "曇後轉晴",
      tempHigh: 7,
      tempLow: 5,
      precip: "40%",
      note: "轉晴但冷",
      warn: false,
    },
    {
      date: "1/12",
      day: "一",
      fullDate: "1/12 (一)",
      loc: "VISON",
      weatherIcon: "🌤️",
      weatherText: "晴時多雲",
      tempHigh: 8,
      tempLow: -2,
      precip: "20%",
      note: "清晨極冷",
      warn: true,
    },
    {
      date: "1/13",
      day: "二",
      fullDate: "1/13 (二)",
      loc: "VISON",
      weatherIcon: "🌤️",
      weatherText: "晴時多雲",
      tempHigh: 15,
      tempLow: -2,
      precip: "40%",
      note: "溫差大",
      warn: true,
    },
    {
      date: "1/14",
      day: "三",
      fullDate: "1/14 (三)",
      loc: "伊勢",
      weatherIcon: "☀️",
      weatherText: "晴朗",
      tempHigh: 9,
      tempLow: 2,
      precip: "20%",
      note: "晴朗",
      warn: false,
    },
    {
      date: "1/15",
      day: "四",
      fullDate: "1/15 (四)",
      loc: "志摩",
      weatherIcon: "🌤️",
      weatherText: "晴時多雲",
      tempHigh: 13,
      tempLow: 2,
      precip: "20%",
      note: "舒適",
      warn: false,
    },
    {
      date: "1/16",
      day: "五",
      fullDate: "1/16 (五)",
      loc: "大阪",
      weatherIcon: "🌤️",
      weatherText: "晴時多雲",
      tempHigh: 15,
      tempLow: 5,
      precip: "20%",
      note: "溫暖",
      warn: false,
    },
    {
      date: "1/17",
      day: "六",
      fullDate: "1/17 (六)",
      loc: "USJ",
      weatherIcon: "☀️",
      weatherText: "晴朗",
      tempHigh: 14,
      tempLow: 4,
      precip: "20%",
      note: "適合遊園",
      warn: false,
    },
    {
      date: "1/18",
      day: "日",
      fullDate: "1/18 (日)",
      loc: "USJ",
      weatherIcon: "☀️",
      weatherText: "晴朗",
      tempHigh: 12,
      tempLow: 5,
      precip: "10%",
      note: "適合遊園",
      warn: false,
    },
    {
      date: "1/19",
      day: "一",
      fullDate: "1/19 (一)",
      loc: "大阪",
      weatherIcon: "☀️",
      weatherText: "晴朗",
      tempHigh: 13,
      tempLow: 3,
      precip: "10%",
      note: null,
      warn: false,
    },
    {
      date: "1/20",
      day: "二",
      fullDate: "1/20 (二)",
      loc: "泉佐野",
      weatherIcon: "🌤️",
      weatherText: "晴時多雲",
      tempHigh: 10,
      tempLow: 2,
      precip: "20%",
      note: null,
      warn: false,
    },
    {
      date: "1/21",
      day: "三",
      fullDate: "1/21 (三)",
      loc: "關西",
      weatherIcon: "🌤️",
      weatherText: "晴時多雲",
      tempHigh: 9,
      tempLow: 3,
      precip: "30%",
      note: "返程",
      warn: false,
    },
  ];

  // Get current date string matching data format "M/D" (e.g., "1/11")
  const todayObj = new Date();
  const TODAY_STR = `${todayObj.getMonth() + 1}/${todayObj.getDate()}`;

  // Auto-scroll to today
  const scrollContainerRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollContainerRef.current) {
      // Find the index of today
      const todayIndex = forecastData.findIndex((d) => d.date === TODAY_STR);
      if (todayIndex !== -1) {
        const cardWidth = 100; // w-[100px]
        const gap = 12; // gap-3 = 12px

        const scrollPos = (cardWidth + gap) * todayIndex;

        // Wait a tick for layout to stabilize if needed
        setTimeout(() => {
          scrollContainerRef.current.scrollTo({
            left: scrollPos,
            behavior: "smooth",
          });
        }, 300);
      }
    }
  }, [TODAY_STR]);

  return (
    <SectionCard
      icon={CloudSun}
      title="天氣預報"
      collapsible={true}
      defaultOpen={true}
      forceOpen={forceOpen}
      variant="glass"
    >
      {/* Horizontal Scroll Container */}
      <div className="relative -mx-4 md:mx-0">
        {/* Adjusted padding to pt-3 pb-6: specific tuning to fit shadow without excess spacing */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto pt-3 pb-6 px-4 md:px-0 gap-3 snap-x snap-mandatory no-scrollbar"
        >
          {forecastData.map((item, idx) => {
            const isToday = item.date === TODAY_STR;

            return (
              <div
                key={idx}
                className={`snap-center shrink-0 w-[100px] flex flex-col items-center p-3 rounded-2xl border-2 transition-all ${
                  isToday
                    ? `bg-white ${t.activeBorder} shadow-lg ${t.shadow} scale-[1.02] z-10`
                    : `bg-white border-gray-100 ${t.hoverBorder} shadow-sm hover:shadow-md`
                }`}
              >
                {/* Day Index & Date */}
                <div
                  className={`text-center mb-2 w-full border-b pb-1 ${
                    isToday ? t.borderLight : "border-gray-50"
                  }`}
                >
                  {/* Fixed height container for label to match alignment */}
                  <div className="h-[22px] flex items-center justify-center mb-1">
                    {isToday ? (
                      <div
                        className={`text-[10px] font-extrabold text-white ${t.bgMain} rounded-full px-2 py-0.5 tracking-widest shadow-sm`}
                      >
                        DAY {idx + 1}
                      </div>
                    ) : (
                      <div
                        className={`text-[10px] font-extrabold ${t.textLight} tracking-widest`}
                      >
                        DAY {idx + 1}
                      </div>
                    )}
                  </div>

                  <div className="flex items-baseline justify-center gap-1">
                    <span
                      className={`text-sm font-black leading-tight ${
                        isToday ? t.textMain : t.textDark
                      }`}
                    >
                      {item.date.split("/")[1]}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        isToday ? t.textSecondary : "text-gray-400"
                      }`}
                    >
                      ({item.day})
                    </span>
                  </div>
                </div>

                {/* Icon */}
                <div className="h-8 flex items-center justify-center mb-1">
                  <div
                    className="text-2xl filter drop-shadow-sm transform hover:scale-110 transition-transform cursor-default whitespace-nowrap"
                    title={item.weatherText}
                  >
                    {item.weatherIcon}
                  </div>
                </div>

                {/* Weather Text (Truncated if too long) */}
                <div className="text-[10px] font-bold text-gray-500 mb-2 truncate max-w-full">
                  {item.weatherText}
                </div>

                {/* Temp */}
                <div className="flex flex-col items-center mb-2 w-full">
                  <span className="text-xl font-black text-gray-800 tracking-tighter leading-none">
                    {item.tempHigh}°
                  </span>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-[10px] font-bold text-gray-400">
                      {item.tempLow}°
                    </span>
                  </div>

                  <div className="w-full h-1 rounded-full bg-gray-100 mt-1.5 overflow-hidden relative">
                    <div
                      className={`absolute top-0 bottom-0 rounded-full opacity-40 ${
                        item.tempHigh >= 15 ? t.tempHigh : "bg-blue-500"
                      }`}
                      style={{
                        left: "10%",
                        right: "10%",
                      }}
                    />
                  </div>
                </div>

                {/* Footer: Precip or Loc */}
                <div className="mt-auto flex flex-col items-center w-full">
                  {/* Location Pill */}
                  <div className="text-[10px] font-bold text-gray-500 bg-gray-100/80 px-2 py-0.5 rounded-full truncate max-w-full text-center tracking-wide mb-1">
                    {item.loc}
                  </div>

                  {/* Precip - Fixed Height Slot */}
                  <div className="h-[14px] flex items-center justify-center mb-1">
                    {item.precip !== "0%" && (
                      <div
                        className={`flex items-center gap-0.5 text-[9px] font-bold ${
                          parseInt(item.precip) >= 30
                            ? "text-blue-500"
                            : "text-gray-300"
                        }`}
                      >
                        <Droplets size={8} />
                        {item.precip}
                      </div>
                    )}
                  </div>

                  {/* Note - Fixed Height Slot */}
                  <div className="h-[20px] flex items-center justify-center w-full">
                    {item.note && (
                      <div
                        className={`text-[9px] px-1.5 py-0.5 rounded border truncate max-w-full ${
                          item.warn
                            ? "bg-blue-50 text-blue-600 border-blue-100"
                            : "bg-gray-50 text-gray-400 border-gray-100"
                        }`}
                        title={item.note}
                      >
                        {item.note}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Helper Gradient for Scroll Hint */}
        <div className="absolute right-0 top-0 bottom-4 w-8 bg-gradient-to-l from-white/90 to-transparent pointer-events-none md:hidden" />
      </div>
    </SectionCard>
  );
};

export default WeatherForecastSection;
