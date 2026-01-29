import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import avatarImg from "../../assets/images/avatar.jpg";

const TripsView = ({ onSetActions }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "2026 北海道 (TBD)",
      href: "/me/trips/2026-hokkaido/index.html",
      isExternal: true,
    },
    {
      label: "2026 伊勢志摩",
      href: "/me/trips/2026-ise-shima/index.html",
      isExternal: true,
    },
    {
      label: "2025 大阪",
      href: "/me/trips/2025-osaka/index.html",
      isExternal: true,
    },
    {
      label: "2025 宿霧",
      href: "/me/trips/2025-cebu/index.html",
      isExternal: true,
    },
  ];

  const handleUp = () =>
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
  const handleDown = () =>
    setSelectedIndex((prev) => (prev < menuItems.length ? prev + 1 : prev));

  const handleSelect = () => {
    if (selectedIndex === menuItems.length) {
      handleBack();
      return;
    }
    const item = menuItems[selectedIndex];
    if (item.isExternal) {
      window.location.href = item.href;
    } else {
      navigate(item.path);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    onSetActions({
      onUp: handleUp,
      onDown: handleDown,
      onSelect: handleSelect,
      onStart: handleSelect,
      onBack: handleBack,
    });
  }, [selectedIndex, navigate, onSetActions]);

  return (
    <>
      <div className="flex-1 flex flex-col">
        {/* Main Content Area */}
        <div className="flex-grow px-6 pt-4 overflow-y-auto">
          {/* Page Title */}
          <div className="border-b-4 border-[#0f380f] pb-1 mb-4">
            <h2 className="text-xl font-bold">SELECT TRIP</h2>
          </div>

          {/* Menu */}
          <div id="menu-container">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`
                  menu-item cursor-pointer text-base py-1.5 px-3 border-2 transition-colors duration-100 mb-1.5
                  ${
                    index === selectedIndex
                      ? "bg-[#0f380f] text-[#9bbc0f] border-[#0f380f]"
                      : "bg-transparent text-[#0f380f] border-[#0f380f] hover:bg-[#0f380f] hover:text-[#9bbc0f]"
                  }
                `}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => {
                  if (item.isExternal) window.location.href = item.href;
                  else if (item.path) navigate(item.path);
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Grounded Footer - Simplified */}
        <div className="px-6 py-2 bg-transparent mt-auto">
          <div
            className={`
              menu-item cursor-pointer text-base py-1.5 px-3 border-2 transition-colors duration-100 text-center
              ${
                selectedIndex === menuItems.length
                  ? "bg-[#0f380f] text-[#9bbc0f] border-[#0f380f]"
                  : "bg-transparent text-[#0f380f] border-[#0f380f] hover:bg-[#0f380f] hover:text-[#9bbc0f]"
              }
            `}
            onMouseEnter={() => setSelectedIndex(menuItems.length)}
            onClick={handleBack}
          >
            BACK
          </div>
        </div>
      </div>
    </>
  );
};

export default TripsView;
