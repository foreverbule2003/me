import React, { useState, useEffect, useRef } from "react";

export const GameBoyShell = ({
  children,
  activePage = "home",
  onUp,
  onDown,
  onLeft,
  onRight,
  onSelect, // A button
  onBack, // B button
  onStart, // Start button
  onOp, // Select button
  headless = false,
  isLoading = false,
}) => {
  // --- Boot Status Check ---
  const checkBootStatus = () => {
    if (headless) return true;
    if (typeof window === "undefined") return false;
    return (
      sessionStorage.getItem("gb_powered_on") === "true" ||
      window.location.search.includes("booted=true") ||
      window.location.hash === "#booted"
    );
  };

  const initialBooted = checkBootStatus();

  // --- Audio State ---
  const audioCtxRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPoweredOn, setIsPoweredOn] = useState(initialBooted);

  // --- Boot Sequence State ---
  const [bootStep, setBootStep] = useState(initialBooted ? "on" : "off"); // off -> booting -> on
  const [showBootLogo, setShowBootLogo] = useState(false);
  const [contentOpacity, setContentOpacity] = useState(initialBooted ? 1 : 0);

  // --- Audio Engine ---
  const initAudio = () => {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const playTone = (freq, type, duration, vol = 0.1) => {
    if (isMuted || !audioCtxRef.current) return;

    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    gain.gain.setValueAtTime(vol, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + duration);
  };

  const playHover = () => playTone(200, "square", 0.05, 0.05);
  const playClick = () => {
    playTone(400, "square", 0.1, 0.1);
    setTimeout(() => playTone(1200, "square", 0.2, 0.1), 100);
  };
  const playBootSound = () => {
    if (isMuted || !audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "square";
    o.frequency.setValueAtTime(100, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(2000, ctx.currentTime + 0.5);

    g.gain.setValueAtTime(0.3, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);

    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 1.5);
  };

  // --- Handlers ---
  const handlePowerOn = () => {
    // 1. Init Audio
    initAudio();
    setIsMuted(false);
    setIsPoweredOn(true);

    // 2. Start Boot Sequence
    setBootStep("booting");
    setTimeout(() => setShowBootLogo(true), 50);

    // 3. Play Sound after slight delay
    setTimeout(() => playBootSound(), 800);

    // 4. Show Content
    setTimeout(() => {
      setBootStep("on");
      setContentOpacity(1);
      sessionStorage.setItem("gb_powered_on", "true");
    }, 1200);
  };

  const toggleSound = () => {
    if (isMuted) {
      initAudio();
      setIsMuted(false);
      playBootSound();
    } else {
      setIsMuted(true);
    }
  };

  // --- Keyboard Controls ---
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPoweredOn) return;

      switch (e.key) {
        case "ArrowUp":
          onUp && onUp();
          playTone(200, "square", 0.05, 0.05);
          break;
        case "ArrowDown":
          onDown && onDown();
          playTone(200, "square", 0.05, 0.05);
          break;
        case "ArrowLeft":
          onLeft && onLeft();
          playTone(200, "square", 0.05, 0.05);
          break;
        case "ArrowRight":
          onRight && onRight();
          playTone(200, "square", 0.05, 0.05);
          break;
        case "Enter": // A Button
        case "z":
        case "Z":
          onSelect && onSelect();
          playTone(400, "square", 0.1, 0.1);
          break;
        case "Backspace": // B Button
        case "x":
        case "X":
          onBack && onBack();
          playTone(150, "square", 0.1, 0.1);
          break;
        case "s":
        case "S":
          onStart && onStart();
          playTone(200, "square", 0.05, 0.05);
          break;
        case "Shift":
          onOp && onOp();
          playTone(200, "square", 0.05, 0.05);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPoweredOn, onUp, onDown, onLeft, onRight, onSelect, onBack]);

  // --- Headless Event Listeners ---
  useEffect(() => {
    const handleCustomToggle = () => toggleSound();
    window.addEventListener("gb-toggle-sound", handleCustomToggle);
    return () =>
      window.removeEventListener("gb-toggle-sound", handleCustomToggle);
  }, [isMuted]); // Re-bind to capture current isMuted state

  // --- Render Helpers ---
  const DPad = () => (
    <div className="d-pad-container">
      <div className="d-pad-h"></div>
      <div className="d-pad-v"></div>
      <div className="d-pad-center"></div>
      {/* Interactive mock buttons */}
      <div
        className="d-btn d-up"
        onMouseDown={() => {
          onUp && onUp();
          playTone(200, "square", 0.05, 0.05);
        }}
      ></div>
      <div
        className="d-btn d-right"
        onMouseDown={() => {
          onRight && onRight();
          playTone(200, "square", 0.05, 0.05);
        }}
      ></div>
      <div
        className="d-btn d-down"
        onMouseDown={() => {
          onDown && onDown();
          playTone(200, "square", 0.05, 0.05);
        }}
      ></div>
      <div
        className="d-btn d-left"
        onMouseDown={() => {
          onLeft && onLeft();
          playTone(200, "square", 0.05, 0.05);
        }}
      ></div>
    </div>
  );

  const ABButtons = ({ labelA, labelB }) => (
    <div className="action-btns">
      <div className="ab-btn-wrapper">
        <div
          className="ab-btn"
          onMouseDown={() => {
            onSelect && onSelect();
            playTone(400, "square", 0.1, 0.1);
          }}
        ></div>
        <div className="ab-label">{labelA || "A"}</div>
      </div>
      <div className="ab-btn-wrapper">
        <div
          className="ab-btn"
          onMouseDown={() => {
            onBack && onBack();
            playTone(150, "square", 0.1, 0.1);
          }}
        ></div>
        <div className="ab-label">{labelB || "B"}</div>
      </div>
    </div>
  );

  const StartSelectButtons = ({ labelStart, labelSelect }) => (
    <div className="start-select-container">
      <div className="ss-btn-wrapper">
        <div
          className="ss-btn"
          onMouseDown={() => {
            onOp && onOp();
            playTone(200, "square", 0.05, 0.05);
          }}
        ></div>
        <div className="ss-label">{labelSelect || "SELECT"}</div>
      </div>
      <div className="ss-btn-wrapper">
        <div
          className="ss-btn"
          onMouseDown={() => {
            onStart && onStart();
            playTone(200, "square", 0.05, 0.05);
          }}
        ></div>
        <div className="ss-label">{labelStart || "START"}</div>
      </div>
    </div>
  );

  if (headless) {
    return (
      <div
        style={{
          height: "100%",
          width: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {isLoading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#9bbc0f",
              zIndex: 50,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div className="loading-spinner"></div>
            <div className="loading-text">LOADING...</div>
          </div>
        )}
        <div
          style={{
            opacity: isLoading ? 0 : 1,
            transition: "opacity 0.3s",
            height: "100%",
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="gb-shell">
      {/* Top Text */}
      <div className="flex justify-between text-gray-400 text-xs mb-1 px-4 font-bold tracking-widest items-center">
        <span>DOT MATRIX WITH STEREO SOUND</span>
        <button
          onClick={toggleSound}
          className={`text-xs px-3 py-1 rounded shadow-md border-2 font-bold transition-all 
                            ${
                              isMuted
                                ? "bg-gray-300 text-gray-800 border-gray-500 animate-pulse hover:bg-white"
                                : "bg-red-600 text-white border-red-800 hover:bg-red-500"
                            }`}
        >
          {isMuted ? "SOUND OFF" : "SOUND ON"}
        </button>
      </div>

      {/* Bezel */}
      <div className="gb-bezel">
        <div className="flex space-x-2 mb-1 items-center">
          <div
            className={`w-3 h-3 rounded-full border border-gray-600 transition-colors duration-300 ${isPoweredOn ? "bg-red-600 shadow-[0_0_8px_red]" : "bg-gray-800"}`}
          ></div>
          <span className="text-[10px] text-gray-500 font-bold">BATTERY</span>
        </div>

        {/* Screen */}
        <div className="gb-screen-glass relative">
          {!isPoweredOn ? (
            <div
              className="absolute inset-0 bg-[#8b9c0f] opacity-20 flex items-center justify-center cursor-pointer"
              onClick={handlePowerOn}
            >
              <span className="text-[#0f380f] font-bold animate-pulse">
                CLICK TO POWER ON
              </span>
            </div>
          ) : (
            <>
              {bootStep === "booting" && (
                <div
                  className={`absolute inset-0 z-50 flex items-center justify-center bg-[#9bbc0f] transition-opacity duration-1000 ${showBootLogo ? "opacity-100" : "opacity-0"}`}
                >
                  <h1 className="text-4xl font-bold tracking-widest text-[#0f380f] animate-bounce">
                    Nintendo®
                  </h1>
                </div>
              )}

              <div
                className="gb-content transition-opacity duration-500"
                style={{ opacity: contentOpacity }}
              >
                {children}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="controls-area mt-8 px-4">
        <div className="flex justify-between items-end">
          <DPad />
          <ABButtons />
        </div>
        <StartSelectButtons />
      </div>
    </div>
  );
};
