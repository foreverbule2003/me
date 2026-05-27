import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, MapPin } from "lucide-react";

// 解析標題，分離地點名與日期段落
// e.g. "橫濱 (Day 1–2)" => { location: "橫濱", dayRange: "Day 1–2" }
const parseTitle = (title) => {
  const match = title.match(/^(.+?)\s*\((.+?)\)$/);
  if (match) return { location: match[1], dayRange: match[2] };
  return { location: title, dayRange: null };
};

const StickyPhaseHeader = ({
  title,
  children,
  defaultOpen = false,
  forceOpen = null,
  collapseCounter = 0,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [enableTransition, setEnableTransition] = useState(false);
  const containerRef = useRef(null);
  const prevCollapseCounter = useRef(collapseCounter);
  const { location, dayRange } = parseTitle(title);

  // FAB 展開全部時打開（不觸發動畫）
  useEffect(() => {
    if (forceOpen === true) {
      setIsOpen(true);
    }
  }, [forceOpen]);

  // FAB 收合全部時關閉（collapseCounter 遞增即觸發）
  useEffect(() => {
    if (collapseCounter > 0 && collapseCounter !== prevCollapseCounter.current) {
      prevCollapseCounter.current = collapseCounter;
      setIsOpen(false);
    }
  }, [collapseCounter]);

  const handleToggle = () => {
    if (!enableTransition) setEnableTransition(true);
    const wasCollapsed = !isOpen;
    setIsOpen(!isOpen);

    if (wasCollapsed && containerRef.current) {
      setTimeout(() => {
        const headerHeight = 72;
        const elementTop =
          containerRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementTop - headerHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  const transitionClass = enableTransition ? "transition-all duration-300" : "";
  const contentTransitionClass = enableTransition
    ? "transition-all duration-500 ease-in-out"
    : "";

  return (
    <div ref={containerRef}>
      <div
        className={`${transitionClass} ${
          isOpen ? "sticky top-[72px] z-30" : "relative z-0"
        }`}
      >
        {/* 與 SectionCard 一致的圓角玻璃卡片容器 */}
        <div
          className={`${transitionClass} bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg rounded-3xl overflow-hidden`}
        >
          <button
            onClick={handleToggle}
            className={`w-full block py-3 px-4 text-left ${transitionClass} ${
              isOpen ? "border-b border-gray-100/50 bg-transparent" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              {/* 日期 badge 移到最左邊，並給予固定寬度以對齊地點名稱 */}
              {dayRange && (
                <div className="w-[110px] md:w-[150px] flex-shrink-0 flex justify-start">
                  <span
                    className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0 ${transitionClass} ${
                      isOpen
                        ? "text-[#5F7A61]/50 border border-[#5F7A61]/20 bg-transparent"
                        : "text-[#5F7A61] bg-[#5F7A61]/10 border border-transparent"
                    }`}
                  >
                    {dayRange}
                  </span>
                </div>
              )}
              {/* 地點名稱：展開時顏色變淡、稍微縮小 */}
              <h2
                className={`font-bold flex-1 text-left ${transitionClass} ${
                  isOpen ? "text-base text-gray-400" : "text-lg text-gray-800"
                }`}
              >
                {location}
              </h2>
              {/* ChevronDown */}
              <div
                className={`flex-shrink-0 ${
                  enableTransition ? "transition-transform duration-300" : ""
                } ${
                  isOpen ? "rotate-180 text-gray-300" : "text-gray-400"
                }`}
              >
                <ChevronDown size={isOpen ? 16 : 20} />
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* ── 內容區 ── */}
      <div
        className={`${contentTransitionClass} ${
          isOpen ? "max-h-[5000px] opacity-100 mt-3" : "max-h-0 opacity-0 overflow-hidden mt-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default StickyPhaseHeader;
