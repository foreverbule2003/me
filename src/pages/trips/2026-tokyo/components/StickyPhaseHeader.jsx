import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, MapPin } from "lucide-react";

const StickyPhaseHeader = ({
  title,
  children,
  defaultOpen = false,
  forceOpen = null,
  image,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const containerRef = useRef(null);

  useEffect(() => {
    if (forceOpen !== null) {
      // 當點擊全部展開/折疊時，總是保持標題展開，以便查看下方的每日卡片
      setIsOpen(true);
    }
  }, [forceOpen]);

  const handleToggle = () => {
    const wasCollapsed = !isOpen;
    setIsOpen(!isOpen);

    // 如果從收合狀態展開，滾動到頂部讓 Banner 吸附
    if (wasCollapsed && containerRef.current) {
      setTimeout(() => {
        const headerHeight = 72; // TabNavigation height
        const elementTop =
          containerRef.current.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementTop - headerHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  return (
    <div className="mb-6" ref={containerRef}>
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden
                ${
                  isOpen
                    ? "sticky top-[72px] z-30 -mx-4 md:mx-0 md:rounded-xl shadow-sm"
                    : "relative z-0 mx-0 rounded-3xl shadow-md my-4 hover:shadow-lg hover:scale-[1.01] cursor-pointer"
                }`}
      >
        <button
          onClick={handleToggle}
          className={`w-full relative block transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isOpen ? "h-[56px]" : "h-24 md:h-36"}`}
        >
          {/* 背景層：毛玻璃 (Open) vs 圖片 (Closed) */}
          <div className="absolute inset-0">
            {/* Open Background */}
            <div
              className={`absolute inset-0 bg-white/95 backdrop-blur-md border-b border-gray-100/50 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
            ></div>

            {/* Closed Background */}
            <div
              className={`absolute inset-0 transition-opacity duration-500 ${isOpen ? "opacity-0" : "opacity-100"}`}
            >
              {image && (
                <img
                  src={image}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  alt=""
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>
          </div>

          {/* 內容層：Open 狀態內容 */}
          <div
            className={`absolute inset-0 px-5 flex items-center justify-between transition-all duration-500 ${isOpen ? "opacity-100 translate-y-0 delay-100" : "opacity-0 -translate-y-4 pointer-events-none"}`}
          >
            <h2 className="text-sm font-medium text-[#0F2540] flex items-center gap-2">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#E8968A]/10 text-[#E8968A]">
                <MapPin size={12} />
              </span>
              {title}
            </h2>
            <div className="text-gray-400 rotate-180">
              <ChevronDown size={16} />
            </div>
          </div>

          {/* 內容層：Closed 狀態內容 */}
          <div
            className={`absolute inset-0 px-5 py-3 flex items-end justify-between transition-all duration-500 ${isOpen ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0 delay-100"}`}
          >
            <h2 className="text-lg md:text-xl font-medium text-white mb-0.5 drop-shadow-md">
              {title}
            </h2>
            <div className="text-white/80 mb-1">
              <ChevronDown size={20} />
            </div>
          </div>
        </button>
      </div>

      <div
        className={`transition-all duration-500 ease-in-out ${isOpen ? "opacity-100 max-h-[5000px] mt-4" : "opacity-0 max-h-0 overflow-hidden mt-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default StickyPhaseHeader;
