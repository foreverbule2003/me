import React from "react";
import ReactDOM from "react-dom/client";
import { GameBoyShell } from "../../components/GameBoyShell.jsx";
import "../../index.css"; // Tailwind CSS
import "../../../assets/gb-theme.css";
import avatarImg from "../../../assets/images/avatar.jpg";

const TripsPage = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  // Simulate Data Loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const menuItems = [
    { label: "2026 北海道 (TBD)", href: "/me/trips/2026-hokkaido/index.html" },
    { label: "2026 伊勢志摩", href: "/me/trips/2026-ise-shima/index.html" },
    { label: "2025 大阪", href: "/me/trips/2025-osaka/index.html" },
    { label: "2025 宿霧", href: "/me/trips/2025-cebu/index.html" },
    { label: "BACK", href: "/me/?booted=true", isBack: true },
  ];

  const handleUp = () =>
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
  const handleDown = () =>
    setSelectedIndex((prev) => (prev < menuItems.length - 1 ? prev + 1 : prev));

  const handleSelect = () => {
    if (isLoading) return;
    const item = menuItems[selectedIndex];
    window.location.href = item.href;
  };

  const handleBack = () => {
    window.location.href = "/me/?booted=true";
  };

  return (
    <GameBoyShell
      headless={true}
      isLoading={isLoading}
      activePage="trips"
      onUp={handleUp}
      onDown={handleDown}
      onSelect={handleSelect}
      onStart={handleSelect}
      onBack={handleBack}
    >
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

      {/* Menu */}
      <div className="flex-grow overflow-y-auto pr-1" id="menu-container">
        <h2 className="mb-2 font-bold text-xl border-b-2 border-[#0f380f]">
          SELECT TRIP
        </h2>

        {menuItems.map((item, index) => (
          <a
            key={index}
            href={item.href}
            className={`gb-btn menu-item ${index === selectedIndex ? "active-focus" : ""} ${item.isBack ? "mt-6" : ""}`}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={(e) => {
              e.preventDefault();
              handleSelect();
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </GameBoyShell>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<TripsPage />);
