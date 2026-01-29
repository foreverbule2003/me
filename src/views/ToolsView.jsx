import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import avatarImg from "../../assets/images/avatar.jpg";

const ToolsView = ({ onSetActions }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    {
      label: "財務儀表板 (封存)",
      href: "/me/tools/archive/prototypes/financial-dashboard.html",
      isExternal: true,
    },
    {
      label: "CB 戰情室",
      href: "/me/tools/cb-war-room.html",
      isExternal: true,
    },
    {
      label: "期權策略 (封存)",
      href: "/me/tools/archive/prototypes/bull-put-spread.html",
      isExternal: true,
    },
    { label: "台股分析自動化", href: "/tools", isExternal: false }, // Keeping this as SPA route if it exists or pointing to correct place
    { label: "聯絡我", isEmail: true },
    { label: "BACK", path: "/", isBack: true },
  ];

  const handleUp = () =>
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
  const handleDown = () =>
    setSelectedIndex((prev) => (prev < menuItems.length - 1 ? prev + 1 : prev));

  const handleSelect = () => {
    const item = menuItems[selectedIndex];
    if (item.isEmail) {
      setIsEmailModalOpen(true);
    } else if (item.isExternal) {
      window.location.href = item.href;
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleBack = () => {
    if (isEmailModalOpen) {
      setIsEmailModalOpen(false);
    } else {
      navigate("/");
    }
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
      {/* Outer wrapper with horizontal and vertical padding to create breathing room */}
      <div className="flex-1 flex flex-col">
        {/* Main Content Area */}
        <div className="flex-grow px-6 pt-4 overflow-y-auto">
          {/* Page Title - Compact */}
          <div className="border-b-4 border-[#0f380f] pb-1 mb-2">
            <h2 className="text-xl font-bold">TOOLS & CONTACT</h2>
          </div>

          {/* Menu - Compact List & Clean Style */}
          <div id="menu-container">
            {menuItems.map((item, index) => (
              <div
                key={index}
                className={`
                menu-item cursor-pointer text-base py-1.5 px-2.5 border-2 transition-colors duration-100 mb-1
                ${
                  index === selectedIndex
                    ? "bg-[#0f380f] text-[#9bbc0f] border-[#0f380f]"
                    : "bg-transparent text-[#0f380f] border-[#0f380f] hover:bg-[#0f380f] hover:text-[#9bbc0f]"
                }
              `}
                onMouseEnter={() => setSelectedIndex(index)}
                onClick={() => {
                  if (item.isEmail) setIsEmailModalOpen(true);
                  else if (item.isExternal) window.location.href = item.href;
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
              menu-item cursor-pointer text-base font-bold py-1.5 px-3 border-2 transition-colors duration-100 text-center
              ${
                selectedIndex === menuItems.length - 1
                  ? "bg-[#0f380f] text-[#9bbc0f] border-[#0f380f]"
                  : "bg-transparent text-[#0f380f] border-[#0f380f] hover:bg-[#0f380f] hover:text-[#9bbc0f]"
              }
            `}
            onMouseEnter={() => setSelectedIndex(menuItems.length - 1)}
            onClick={handleBack}
          >
            BACK
          </div>
        </div>

        {/* Email Modal */}
        {isEmailModalOpen && (
          <div
            className="absolute inset-0 bg-[#9bbc0f] z-[60] flex items-center justify-center p-4"
            onClick={() => setIsEmailModalOpen(false)}
          >
            <div
              className="bg-[#8bac0f] border-4 border-[#0f380f] p-4 w-full shadow-[8px_8px_0_#0f380f]"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-bold border-b-2 border-[#0f380f] mb-2 pb-1">
                CONTACT EMAIL
              </h3>
              <p className="font-mono text-sm break-all mb-6">
                foreverbule2003@gmail.com
              </p>
              <div
                className="gb-btn text-center active-focus"
                onClick={() => setIsEmailModalOpen(false)}
              >
                BACK
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ToolsView;
