import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import avatarImg from "../../assets/images/avatar.jpg";

const AboutView = ({ onSetActions }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const menuItems = [
    { label: "台股分析自動化", path: "/tools" }, // Linking to tools for now as specific sub-tool is MPA
  ];

  const handleUp = () =>
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
  const handleDown = () =>
    setSelectedIndex((prev) => (prev < 1 ? prev + 1 : prev));
  const handleSelect = () => {
    navigate(menuItems[0].path);
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
            <h2 className="text-xl font-bold">ABOUT</h2>
          </div>

          {/* About Content */}
          <div className="bg-[#0f380f]/10 p-3 mb-4 rounded border-2 border-[#0f380f]/20">
            <div className="text-base leading-snug">
              <p className="mb-2">熱愛學習與分享。</p>
              <p>專注於投資與AI應用。</p>
            </div>
          </div>

          <div id="menu-container">
            <div className="mb-6">
              <h3 className="mb-2 font-bold text-lg border-b-2 border-[#0f380f]">
                AI 應用展示
              </h3>
              <div
                className={`
                  menu-item cursor-pointer text-base py-1.5 px-3 border-2 transition-colors duration-100
                  ${
                    selectedIndex === 0
                      ? "bg-[#0f380f] text-[#9bbc0f] border-[#0f380f]"
                      : "bg-transparent text-[#0f380f] border-[#0f380f] hover:bg-[#0f380f] hover:text-[#9bbc0f]"
                  }
                `}
                onMouseEnter={() => setSelectedIndex(0)}
                onClick={() => navigate(menuItems[0].path)}
              >
                {menuItems[0].label}
              </div>
            </div>
          </div>
        </div>

        {/* Grounded Footer - Simplified */}
        <div className="px-6 py-2 bg-transparent mt-auto">
          <div
            className={`
              menu-item cursor-pointer text-base py-1.5 px-3 border-2 transition-colors duration-100 text-center
              ${
                selectedIndex === 1
                  ? "bg-[#0f380f] text-[#9bbc0f] border-[#0f380f]"
                  : "bg-transparent text-[#0f380f] border-[#0f380f] hover:bg-[#0f380f] hover:text-[#9bbc0f]"
              }
            `}
            onMouseEnter={() => setSelectedIndex(1)}
            onClick={handleBack}
          >
            BACK
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutView;
