# Views (GameBoy Shell Screens)

This directory contains React components that serve as **screens** within the main **GameBoy Shell** application (`src/App.jsx`).

## 🛑 distinct from `src/pages/`

-   **`src/views/`**: Internal screens rendered *inside* the GameBoy shell (SPA).
    -   Example: `HomeView`, `TripsView` (the menu), `AboutView`.
-   **`src/pages/`**: Independent, full-screen applications (MPA) that are launched *from* the GameBoy shell.
    -   Example: `src/pages/trips/ise-shima/` (The actual trip itinerary app).

## Architecture
GameBoy Shell (Root SPA) -> Views (Menu) --(Link/Href)--> Pages (External Apps)
