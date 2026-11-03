import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatarImg from "../../assets/images/avatar.jpg";
import "../styles/switch-shell.css";

// Console size at zoom 1 (2 joycons + tablet)
const CONSOLE_W = 1036;
const CONSOLE_H = 470;

// Buttons feed the same keyboard events GameBoyShell listens to
const pressKey = (key) =>
  window.dispatchEvent(new KeyboardEvent("keydown", { key }));

// scrollIntoView is unreliable inside the zoomed console, so scroll the list by offsets
const revealSelectedRow = () => {
  const row = document.querySelector('.sw-app .menu-item[class~="bg-[#0f380f]"]');
  const list = row?.closest('[class~="overflow-y-auto"]');
  if (!list) return;
  let top = 0;
  for (let n = row; n && n !== list; n = n.offsetParent) top += n.offsetTop;
  const bottom = top + row.offsetHeight;
  if (top < list.scrollTop) list.scrollTop = top;
  else if (bottom > list.scrollTop + list.clientHeight)
    list.scrollTop = bottom - list.clientHeight;
};

// Keyboard keys that press each joycon button (mirrors GameBoyShell's keymap)
const BUTTON_OF_KEY = {
  a: "Enter", A: "Enter", z: "Enter", Z: "Enter",
  b: "Backspace", B: "Backspace", x: "Backspace", X: "Backspace",
};

const Key = ({ pos, keyName, pressed, children }) => (
  <div
    className={`sw-key sw-press ${pos} ${pressed === keyName ? "pressed" : ""}`}
    onMouseDown={() => pressKey(keyName)}
  >
    {children}
  </div>
);

const useClock = () => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(id);
  }, []);
  const h = now.getHours();
  return {
    time: `${h % 12 || 12}:${String(now.getMinutes()).padStart(2, "0")}`,
    ampm: h >= 12 ? "PM" : "AM",
  };
};

// Avatar + clock / wifi / battery, shared by home and sub pages
export const SwitchTopBar = () => {
  const { time, ampm } = useClock();
  return (
    <div className="sw-topbar">
      <div className="sw-user" title="TimZ">
        <img src={avatarImg} alt="TimZ" />
      </div>
      <div className="sw-status">
        <span>
          {time}
          <small>{ampm}</small>
        </span>
        <svg width="22" height="18" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
          <path d="M2 7a14 14 0 0 1 20 0" />
          <path d="M6 11a8 8 0 0 1 12 0" />
          <circle cx="12" cy="16" r="1.6" fill="currentColor" stroke="none" />
        </svg>
        <svg width="34" height="18" viewBox="0 0 34 18" fill="none">
          <rect x="1" y="2" width="28" height="14" rx="2" stroke="currentColor" strokeWidth="2.4" />
          <rect x="4.5" y="5.5" width="21" height="7" fill="currentColor" />
          <rect x="30" y="6" width="3" height="6" rx="1" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
};

/**
 * 橫式掌機外殼（桌機）
 * isHome: 主畫面；其他頁面套 .sw-app 系統頁樣式（覆寫 GameBoy 版 view 的配色）
 */
export const SwitchShell = ({ isHome, children }) => {
  const navigate = useNavigate();
  const consoleRef = useRef(null);
  const [pressed, setPressed] = useState(null);

  // Scale console to ~86% width without overflowing height
  useEffect(() => {
    const fit = () => {
      consoleRef.current.style.zoom = Math.min(
        (window.innerWidth * 0.86) / CONSOLE_W,
        (window.innerHeight * 0.78) / CONSOLE_H,
      );
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  // Light up the matching joycon key on real keyboard input
  useEffect(() => {
    let timer;
    const onKey = (e) => {
      setPressed(BUTTON_OF_KEY[e.key] ?? e.key);
      // Keyboard mode until the mouse actually moves (see body.sw-kbd in CSS)
      if (e.isTrusted) document.body.classList.add("sw-kbd");
      // Keep the keyboard-selected row of a sub page in view (after React re-renders)
      setTimeout(revealSelectedRow);
      clearTimeout(timer);
      timer = setTimeout(() => setPressed(null), 100);
    };
    const onMouseMove = () => document.body.classList.remove("sw-kbd");
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousemove", onMouseMove);
      clearTimeout(timer);
    };
  }, []);

  // Sub pages glow in the accent teal; the home view sets its own tint
  useEffect(() => {
    if (!isHome) document.body.style.setProperty("--sw-glow", "#12c3c9");
  }, [isHome]);

  return (
    <>
      <div className="sw-glow" />
      <div className="sw-console" ref={consoleRef}>
        <div className="sw-joycon left">
          <div className="sw-cluster">
            <Key pos="top" keyName="ArrowUp" pressed={pressed}>
              <i className="sw-arrow" />
            </Key>
            <Key pos="left" keyName="ArrowLeft" pressed={pressed}>
              <i className="sw-arrow" />
            </Key>
            <Key pos="right" keyName="ArrowRight" pressed={pressed}>
              <i className="sw-arrow" />
            </Key>
            <Key pos="bottom" keyName="ArrowDown" pressed={pressed}>
              <i className="sw-arrow" />
            </Key>
          </div>
        </div>

        <div className="sw-tablet">
          <div className="sw-screen">
            {isHome ? (
              children
            ) : (
              <div className="sw-ui app">
                <SwitchTopBar />
                <div className="sw-app">{children}</div>
                <div className="sw-bottombar">
                  <span className="sw-hint sw-press" onClick={() => navigate("/")}>
                    <b className="sw-glyph">⌂</b>Home
                  </span>
                  <div className="sw-hints">
                    <span className="sw-hint sw-press" onClick={() => pressKey("Backspace")}>
                      <b className="sw-glyph">B</b>Back
                    </span>
                    <span className="sw-hint sw-press" onClick={() => pressKey("Enter")}>
                      <b className="sw-glyph">A</b>OK
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="sw-joycon right">
          <div className="sw-ab">
            <Key pos="a" keyName="Enter" pressed={pressed}>A</Key>
            <Key pos="b" keyName="Backspace" pressed={pressed}>B</Key>
          </div>
          <div
            className="sw-home sw-press"
            title="HOME"
            onMouseDown={() => navigate("/")}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round">
              <path d="M4 11l8-7 8 7" />
              <path d="M6 10v10h12V10" />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};
