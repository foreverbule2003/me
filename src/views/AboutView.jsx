import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import avatarImg from "../../assets/images/avatar.jpg";
import { getShell } from "../lib/shellMode";

// Landscape shell has B Back on its bottom bar, so the in-page BACK is dropped there
const inSwitch = getShell() === "switch";

const AboutView = ({ onSetActions }) => {
  const navigate = useNavigate();

  // Only BACK is selectable on this page (none in the landscape shell)
  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    onSetActions({
      onUp: () => {},
      onDown: () => {},
      onSelect: inSwitch ? () => {} : handleBack,
      onStart: inSwitch ? () => {} : handleBack,
      onBack: handleBack,
    });
  }, [navigate, onSetActions]);

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
        </div>

        {/* Grounded Footer - Simplified */}
        {!inSwitch && (
          <div className="px-6 py-2 bg-transparent mt-auto">
            <div
              className={`
                menu-item cursor-pointer text-base py-1.5 px-3 border-2 transition-colors duration-100 text-center
                bg-[#0f380f] text-[#9bbc0f] border-[#0f380f]
              `}
              onClick={handleBack}
            >
              BACK
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AboutView;
