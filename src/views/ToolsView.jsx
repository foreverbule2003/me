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
      {/* Header */}
      <div className="flex justify-between items-end border-b-4 border-[#0f380f] pb-2 mb-4">
        <div>
          <h1 className="text-2xl font-bold">TimZ</h1>
          <p className="text-sm">STATUS: ONLINE</p>
        </div>
        <div className="w-12 h-12 grayscale contrast-200 border-2 border-[#0f380f] bg-gray-300 overflow-hidden relative">
          <img
            src={avatarImg}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Page Title */}
      <div className="border-b-4 border-[#0f380f] pb-1 mb-4">
        <h2 className="text-xl font-bold">TOOLS & CONTACT</h2>
      </div>

      {/* Menu */}
      <div className="flex-grow overflow-y-auto pr-1" id="menu-container">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className={`gb-btn menu-item ${index === selectedIndex ? "active-focus" : ""}`}
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
    </>
  );
};

export default ToolsView;
