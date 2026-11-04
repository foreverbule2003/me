import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SwitchTopBar } from "../components/SwitchShell.jsx";
import { setShellPref } from "../lib/shellMode";

const ICON = {
  about: '<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  trips: '<path d="M2 16l20-8-6 14-3-6-6-2z"/>',
  journal:
    '<rect x="5" y="3" width="14" height="18" rx="1"/><path d="M9 8h6M9 12h6M9 16h4"/>',
  notes: '<path d="M4 20l4-1 11-11-3-3L5 16z"/><path d="M14 6l3 3"/>',
  tools:
    '<path d="M14 6a4 4 0 0 0-5 5l-6 6 3 3 6-6a4 4 0 0 0 5-5l-3 3-3-3z"/>',
};

const TILES = [
  { key: "about", title: "ABOUT", sub: "PROFILE", name: "About TimZ", glow: "#4f6f68", path: "/about" },
  { key: "trips", title: "SELECT TRIP", sub: "OSAKA · ISE-SHIMA", name: "Select Trip", glow: "#3f6fe0", path: "/trips" },
  { key: "journal", title: "JOURNAL", sub: "DAILY LOG", name: "Journal", glow: "#e9774f", path: "/journal" },
  { key: "notes", title: "NOTES", sub: "KNOWLEDGE", name: "Notes", glow: "#4fb05a", href: "/me/notes/" },
  { key: "tools", title: "TOOLS & CONTACT", sub: "UTILITIES", name: "Tools & Contact", glow: "#7b3fc4", path: "/tools" },
];

// Tiles = content, shortcuts = system functions; the two never overlap
const SHORTCUTS = [
  { id: "contact", tip: "聯絡我", svg: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>' },
  { id: "help", tip: "操作說明", svg: '<rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/>' },
  { id: "sound", tip: "音效", svg: '<path d="M4 9h4l5-4v14l-5-4H4z"/><path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/>' },
  { id: "classic", tip: "經典模式", svg: '<rect x="6" y="2" width="12" height="20" rx="2"/><rect x="8.5" y="4.5" width="7" height="6"/><path d="M9 15h3M10.5 13.5v3"/><circle cx="15" cy="15.5" r="1"/>' },
];

const EMAIL = "foreverbule2003@gmail.com";

// Secret: A B A B quickly jumps straight to the CB watchlist
const SECRET = "ABAB";
const SECRET_WINDOW = 1500; // ms for the whole sequence
const SECRET_HREF = "/me/tools/cb-war-room.html?tab=watchlist";

const TILE_W = 170; // tile + gap
const VISIBLE = 3;

const HELP = [
  ["← → ↑ ↓", "移動"],
  ["A / Enter", "A：開啟"],
  ["B / Backspace", "B：返回"],
];

const Svg = ({ body, className, strokeWidth = 2 }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinejoin="round"
    strokeLinecap="round"
    dangerouslySetInnerHTML={{ __html: body }}
  />
);

/**
 * 桌機主畫面（橫式掌機）
 * 兩列焦點：row 0 = 大方塊、row 1 = 圓形捷徑
 */
const SwitchHomeView = ({ onSetActions }) => {
  const navigate = useNavigate();
  const [row, setRow] = useState(0);
  const [col, setCol] = useState(0);
  const [scCol, setScCol] = useState(0);
  const [launching, setLaunching] = useState(null);
  const [overlay, setOverlay] = useState(null); // "contact" | "help" | null

  const launchTimer = useRef(null);
  const presses = useRef([]);

  const openTile = (tile) => {
    setLaunching(tile.title);
    clearTimeout(launchTimer.current);
    launchTimer.current = setTimeout(() => {
      launchTimer.current = null;
      if (tile.href) window.location.href = tile.href;
      else navigate(tile.path);
    }, 350);
  };

  // B during the launch animation cancels it (also lets A in "ABAB" not open a tile)
  const cancelLaunch = () => {
    if (!launchTimer.current) return false;
    clearTimeout(launchTimer.current);
    launchTimer.current = null;
    setLaunching(null);
    return true;
  };

  // Returns true when this press completes the secret
  const record = (btn) => {
    const now = Date.now();
    presses.current = [...presses.current, { btn, at: now }]
      .filter((p) => now - p.at <= SECRET_WINDOW)
      .slice(-SECRET.length);
    if (presses.current.map((p) => p.btn).join("") !== SECRET) return false;
    presses.current = [];
    cancelLaunch();
    setOverlay(null);
    setLaunching("MY WATCHLIST");
    setTimeout(() => (window.location.href = SECRET_HREF), 350);
    return true;
  };

  const runShortcut = (sc) => {
    if (sc.id === "sound")
      window.dispatchEvent(new CustomEvent("gb-toggle-sound"));
    else if (sc.id === "classic") setShellPref("gb");
    else setOverlay(sc.id);
  };

  const select = () => {
    if (row === 0) openTile(TILES[col]);
    else runShortcut(SHORTCUTS[scCol]);
  };

  useEffect(() => {
    // Any button dismisses an overlay first
    const guard = (fn) => () => (overlay ? setOverlay(null) : fn());
    onSetActions({
      onUp: guard(() => setRow(0)),
      onDown: guard(() => setRow(1)),
      onLeft: guard(() =>
        row === 0
          ? setCol((c) => Math.max(0, c - 1))
          : setScCol((c) => Math.max(0, c - 1)),
      ),
      onRight: guard(() =>
        row === 0
          ? setCol((c) => Math.min(TILES.length - 1, c + 1))
          : setScCol((c) => Math.min(SHORTCUTS.length - 1, c + 1)),
      ),
      onSelect: () => {
        record("A");
        guard(select)();
      },
      onStart: guard(select),
      onBack: () => {
        if (record("B") || cancelLaunch()) return;
        guard(() => setRow(0))();
      },
    });
  }, [row, col, scCol, overlay, navigate, onSetActions]);

  // Tint the ambient light with the focused tile
  useEffect(() => {
    document.body.style.setProperty("--sw-glow", TILES[col].glow);
  }, [col]);

  const shift = Math.max(0, Math.min(col - (VISIBLE - 1), TILES.length - VISIBLE - 0.6));

  return (
    <div className="sw-ui">
      <SwitchTopBar />

      <div className="sw-band">
        <div className="sw-title">{row === 0 ? TILES[col].name : ""}</div>
        <div className="sw-tiles" style={{ transform: `translateX(${-shift * TILE_W}px)` }}>
          {TILES.map((t, i) => (
            <div
              key={t.key}
              className={`sw-tile sw-c-${t.key} ${row === 0 && i === col ? "active" : ""}`}
              onClick={() => {
                if (row === 0 && i === col) openTile(t);
                setRow(0);
                setCol(i);
              }}
            >
              <Svg className="sw-cover-icon" body={ICON[t.key]} strokeWidth={1.6} />
              <div className="sw-cover-title">{t.title}</div>
              <div className="sw-cover-sub">{t.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="sw-shortcuts">
        {SHORTCUTS.map((s, i) => (
          <div
            key={s.id}
            className={`sw-sc ${row === 1 && i === scCol ? "active" : ""}`}
            onClick={() => {
              setRow(1);
              setScCol(i);
              runShortcut(s);
            }}
          >
            <Svg body={s.svg} />
            <span className="sw-sc-tip">{s.tip}</span>
          </div>
        ))}
      </div>

      <div className="sw-bottombar">
        <div className="sw-hints">
          <span className="sw-hint">
            <b className="sw-glyph">B</b>Back
          </span>
          <span className="sw-hint">
            <b className="sw-glyph">A</b>Start
          </span>
        </div>
      </div>

      <div className={`sw-overlay ${launching ? "show" : ""}`}>{launching}</div>
      <div
        className={`sw-overlay help ${overlay === "contact" ? "show" : ""}`}
        onClick={() => setOverlay(null)}
      >
        <div className="sw-contact">
          <div className="sw-contact-label">CONTACT</div>
          <a href={`mailto:${EMAIL}`} onClick={(e) => e.stopPropagation()}>
            {EMAIL}
          </a>
          <div className="sw-help-close">按任意鍵關閉</div>
        </div>
      </div>
      <div
        className={`sw-overlay help ${overlay === "help" ? "show" : ""}`}
        onClick={() => setOverlay(null)}
      >
        <div>
          <div className="sw-help-grid">
            {HELP.map(([k, v]) => (
              <React.Fragment key={k}>
                <kbd>{k}</kbd>
                <span>{v}</span>
              </React.Fragment>
            ))}
          </div>
          <div className="sw-help-close">按任意鍵關閉</div>
        </div>
      </div>
    </div>
  );
};

export default SwitchHomeView;
