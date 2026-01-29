# Views (GameBoy Shell Screens)

This directory contains React components that serve as **screens** within the main **GameBoy Shell** application (`src/App.jsx`).

## 🛑 distinct from `src/pages/`

- **`src/views/`**: Internal screens rendered _inside_ the GameBoy shell (SPA).
  - Example: `HomeView`, `TripsView` (the menu), `AboutView`.
- **`src/pages/`**: Independent, full-screen applications (MPA) that are launched _from_ the GameBoy shell.
  - Example: `src/pages/trips/ise-shima/` (The actual trip itinerary app).

## Architecture

GameBoy Shell (Root SPA) -> Views (Menu) --(Link/Href)--> Pages (External Apps)

## UI & Typography Standards

To maintain the retro aesthetic and visual comfort:

- **Spacing**: All Views use a content wrapper with `px-6 py-4` to prevent text from touching screen edges.
- **Menus**: Use the "Clean List" style (borderless list items with dynamic background-color on hover/focus).
- **Font**: `DotGothic16` is the primary font for all screen content.
- **Hierarchy**: H1 (`2xl`), H2 (`xl`), H3 (`lg`), Body (`base`), Label (`sm`).
