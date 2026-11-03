import React, { useState, useEffect, useCallback } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { GameBoyShell } from "./components/GameBoyShell.jsx";
import { SwitchShell } from "./components/SwitchShell.jsx";
import HomeView from "./views/HomeView.jsx";
import SwitchHomeView from "./views/SwitchHomeView.jsx";
import AboutView from "./views/AboutView.jsx";
import TripsView from "./views/TripsView.jsx";
import JournalView from "./views/JournalView.jsx";
import ToolsView from "./views/ToolsView.jsx";
import useSwipe from "./hooks/useSwipe";
import {
  getShell,
  getShellPref,
  isWideScreen,
  setShellPref,
} from "./lib/shellMode";

// Decided once per page load (index.html sets <html data-shell>)
const isSwitch = getShell() === "switch";

const AppContent = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [childActions, setChildActions] = useState({
    onUp: () => {},
    onDown: () => {},
    onLeft: () => {},
    onRight: () => {},
    onSelect: () => {},
    onStart: () => {},
    onBack: () => {},
  });

  // Determine activePage from location
  const getActivePage = () => {
    const path = location.pathname;
    if (path === "/") return "home";
    return path.substring(1); // 'about', 'trips', etc.
  };

  // Callback for children to register their buttons
  const handleSetActions = useCallback((actions) => {
    setChildActions(actions);
  }, []);

  // Global Swipe Handler
  // Swipe Right -> Back (mimic iOS)
  // Swipe Left -> Forward (optional)
  useSwipe({
    onSwipeRight: () => {
      // Only go back if not on home page
      if (location.pathname !== "/") {
        window.history.back();
      }
    },
    onSwipeLeft: () => {
      // Placeholder: specific views might override or we add forward nav
    },
  });

  // Global Stage 2 Loading State
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Handle data loading state from specific views (like Journal)
  const handleLoadState = useCallback((isLoadingData) => {
    // We can combine this with the global timer if we want to ensure
    // data is loaded AND minimum time has passed.
  }, []);

  const isHome = location.pathname === "/";

  const screen = (
    <GameBoyShell
      activePage={getActivePage()}
      headless={true}
      // Switch shell has its own launch transition; skip the green LCD loader
      isLoading={isLoading && !isSwitch}
      onUp={childActions.onUp}
      onDown={childActions.onDown}
      onLeft={childActions.onLeft}
      onRight={childActions.onRight}
      onSelect={childActions.onSelect}
      onStart={childActions.onStart}
      onBack={childActions.onBack}
    >
      <Routes>
        <Route
          path="/"
          element={
            isSwitch ? (
              <SwitchHomeView onSetActions={handleSetActions} />
            ) : (
              <HomeView onSetActions={handleSetActions} />
            )
          }
        />
        <Route
          path="/about"
          element={<AboutView onSetActions={handleSetActions} />}
        />
        <Route
          path="/trips"
          element={<TripsView onSetActions={handleSetActions} />}
        />
        <Route
          path="/journal"
          element={
            <JournalView
              onSetActions={handleSetActions}
              onLoadState={handleLoadState}
            />
          }
        />
        <Route
          path="/tools"
          element={<ToolsView onSetActions={handleSetActions} />}
        />
      </Routes>
    </GameBoyShell>
  );

  if (isSwitch) return <SwitchShell isHome={isHome}>{screen}</SwitchShell>;

  return (
    <>
      {screen}
      {/* Desktop user who picked classic mode needs a way back */}
      {isWideScreen() && getShellPref() === "gb" && (
        <button
          className="sw-back-to-switch"
          onClick={() => setShellPref("switch")}
        >
          ⇄ SWITCH MODE
        </button>
      )}
    </>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
