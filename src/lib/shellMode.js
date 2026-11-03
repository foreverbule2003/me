/**
 * Shell mode: which device shell wraps the app.
 * - "switch": landscape handheld, desktop only (≥ 1024px wide)
 * - "gb": portrait GameBoy, mobile and desktop classic mode
 *
 * index.html decides the mode before first paint and writes it to
 * <html data-shell>; keep WIDE_QUERY / PREF_KEY in sync with that script.
 */
export const WIDE_QUERY = "(min-width: 1024px)";
const PREF_KEY = "shell_pref";

export const getShell = () =>
  document.documentElement.dataset.shell === "switch" ? "switch" : "gb";

export const isWideScreen = () => window.matchMedia(WIDE_QUERY).matches;

export const getShellPref = () => {
  try {
    return localStorage.getItem(PREF_KEY);
  } catch {
    return null;
  }
};

// Mode is fixed at page load, so switching reloads to rebuild the shell
export const setShellPref = (pref) => {
  try {
    localStorage.setItem(PREF_KEY, pref);
  } catch {
    // storage blocked: the reload falls back to the default mode
  }
  window.location.reload();
};
