import React, { useState, useEffect, useCallback } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { GameBoyShell } from "./components/GameBoyShell.jsx";
import HomeView from "./views/HomeView.jsx";
import AboutView from "./views/AboutView.jsx";
import TripsView from "./views/TripsView.jsx";
import JournalView from "./views/JournalView.jsx";
import ToolsView from "./views/ToolsView.jsx";

const AppContent = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [childActions, setChildActions] = useState({
    onUp: () => {},
    onDown: () => {},
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

  return (
    <GameBoyShell
      activePage={getActivePage()}
      headless={true}
      isLoading={isLoading}
      onUp={childActions.onUp}
      onDown={childActions.onDown}
      onSelect={childActions.onSelect}
      onStart={childActions.onStart}
      onBack={childActions.onBack}
    >
      <Routes>
        <Route
          path="/"
          element={<HomeView onSetActions={handleSetActions} />}
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
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
