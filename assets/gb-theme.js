/**
 * TimBoy (GameBoy風格) 主題腳本
 * 用於首頁系列：index.html, about.html, trips.html, tools.html
 */

(function () {
  "use strict";

  // =====================
  // 8-bit Web Audio API Sound Engine
  // =====================
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  let audioCtx;
  let isMuted = true;

  function initAudio() {
    if (!audioCtx) {
      audioCtx = new AudioContext();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
  }

  function playTone(freq, type, duration, vol = 0.1) {
    if (isMuted || !audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = type; // 'square', 'sawtooth', 'triangle'
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

    gain.gain.setValueAtTime(vol, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      audioCtx.currentTime + duration,
    );

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  }

  function playHover() {
    playTone(400, "square", 0.05, 0.05);
  }

  function playClick() {
    playTone(900, "square", 0.1, 0.1);
    setTimeout(() => playTone(1200, "square", 0.2, 0.1), 100);
  }

  function playBoot() {
    if (isMuted || !audioCtx) return;
    const o = audioCtx.createOscillator();
    const g = audioCtx.createGain();
    o.type = "square";
    o.frequency.setValueAtTime(100, audioCtx.currentTime);
    o.frequency.exponentialRampToValueAtTime(2000, audioCtx.currentTime + 0.5);

    g.gain.setValueAtTime(0.3, audioCtx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 1.5);

    o.connect(g);
    g.connect(audioCtx.destination);
    o.start();
    o.stop(audioCtx.currentTime + 1.5);
  }

  // =====================
  // UI Logic
  // =====================

  function initSoundToggle() {
    const soundToggle = document.getElementById("soundToggle");
    if (!soundToggle) return;

    soundToggle.addEventListener("click", () => {
      initAudio();
      isMuted = !isMuted;

      if (isMuted) {
        soundToggle.innerHTML = "🔈 SOUND OFF";
        soundToggle.classList.remove(
          "bg-orange-500",
          "text-white",
          "border-red-700",
        );
        soundToggle.classList.add(
          "bg-gray-300",
          "text-gray-800",
          "border-gray-500",
          "animate-pulse",
        );
      } else {
        soundToggle.innerHTML = "🔊 SOUND ON";
        soundToggle.classList.remove(
          "bg-gray-300",
          "text-gray-800",
          "border-gray-500",
          "animate-pulse",
        );
        soundToggle.classList.add(
          "bg-orange-500",
          "text-white",
          "border-red-700",
        );
        playBoot();
      }
    });
  }

  function initButtonSounds() {
    const buttons = document.querySelectorAll(".gb-btn, button");

    buttons.forEach((btn) => {
      if (btn.id === "soundToggle") return;

      btn.addEventListener("mouseenter", () => {
        if (!isMuted && audioCtx) {
          const freq = 300 + Math.random() * 200;
          playTone(freq, "square", 0.05, 0.03);
        }
      });

      btn.addEventListener("click", () => {
        playClick();
      });
    });
  }

  // =====================
  // GameBoy Controls Logic
  // =====================

  function initDPadControls() {
    const menuItems = document.querySelectorAll(".menu-item");
    let currentFocusIndex = -1;

    function updateFocus(index) {
      menuItems.forEach((item) => item.classList.remove("active-focus"));
      if (index >= 0 && index < menuItems.length) {
        menuItems[index].classList.add("active-focus");
        menuItems[index].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        playHover();
      }
    }

    const btnDown = document.getElementById("btn-down");
    const btnUp = document.getElementById("btn-up");
    const btnA = document.getElementById("btn-a");
    const btnB = document.getElementById("btn-b");
    const btnSelect = document.getElementById("btn-select");
    const btnStart = document.getElementById("btn-start");

    if (btnDown) {
      btnDown.addEventListener("mousedown", () => {
        if (currentFocusIndex < menuItems.length - 1) {
          currentFocusIndex++;
          updateFocus(currentFocusIndex);
        }
        playTone(200, "square", 0.05, 0.05);
      });
    }

    if (btnUp) {
      btnUp.addEventListener("mousedown", () => {
        if (currentFocusIndex > 0) {
          currentFocusIndex--;
          updateFocus(currentFocusIndex);
        }
        playTone(200, "square", 0.05, 0.05);
      });
    }

    if (btnA) {
      btnA.addEventListener("mousedown", () => {
        playTone(400, "square", 0.1, 0.1);
        if (currentFocusIndex >= 0 && currentFocusIndex < menuItems.length) {
          playClick();
          setTimeout(() => {
            window.location.href = menuItems[currentFocusIndex].href;
          }, 200);
        }
      });
    }

    if (btnB) {
      btnB.addEventListener("mousedown", () => {
        playTone(150, "square", 0.1, 0.1);
        currentFocusIndex = -1;
        menuItems.forEach((item) => item.classList.remove("active-focus"));
      });
    }

    if (btnSelect) {
      btnSelect.addEventListener("mousedown", () =>
        playTone(300, "square", 0.1, 0.05),
      );
    }

    if (btnStart) {
      btnStart.addEventListener("mousedown", () => playBoot());
    }

    // Keyboard support
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        btnDown?.dispatchEvent(new Event("mousedown"));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        btnUp?.dispatchEvent(new Event("mousedown"));
      } else if (e.key === "Enter" || e.key === "z") {
        e.preventDefault();
        btnA?.dispatchEvent(new Event("mousedown"));
      } else if (e.key === "Escape" || e.key === "x") {
        e.preventDefault();
        btnB?.dispatchEvent(new Event("mousedown"));
      }
    });
  }

  // =====================
  // Boot Sequence Logic
  // =====================

  function initBootSequence() {
    const clickMask = document.getElementById("click-mask");
    const bootScreen = document.getElementById("boot-screen");
    const bootLogo = document.getElementById("boot-logo");
    const gbContent = document.querySelector(".gb-content");
    const soundToggle = document.getElementById("soundToggle");

    if (!clickMask || !bootScreen || !gbContent) return;

    // Initialize state
    const urlParams = new URLSearchParams(window.location.search);
    const hasBooted =
      sessionStorage.getItem("gb_powered_on") ||
      urlParams.get("booted") === "true" ||
      window.location.hash === "#booted";

    if (hasBooted) {
      // Skip animation
      clickMask.style.display = "none";
      bootScreen.style.display = "none";
      gbContent.style.opacity = "1";
    } else {
      // Initial state for fresh boot
      gbContent.style.opacity = "0";

      clickMask.addEventListener("click", () => {
        // Set flag
        sessionStorage.setItem("gb_powered_on", "true");

        // 1. User gesture: Init Audio
        initAudio();
        isMuted = false;
        if (soundToggle) {
          soundToggle.innerHTML = "🔊 SOUND ON";
          soundToggle.classList.remove(
            "bg-gray-300",
            "text-gray-800",
            "border-gray-500",
            "animate-pulse",
          );
          soundToggle.classList.add(
            "bg-orange-500",
            "text-white",
            "border-red-700",
          );
        }

        // 2. Hide Mask, Show Boot Screen
        clickMask.style.display = "none";
        bootScreen.style.display = "flex";

        // 3. Start Animation
        setTimeout(() => {
          if (bootLogo) {
            bootLogo.classList.add("scrolling-down");
          }
        }, 100);

        // 4. Time the "Ding" sound
        setTimeout(() => {
          playBoot();
        }, 2400);

        // 5. Transition to Content
        setTimeout(() => {
          bootScreen.style.transition = "opacity 0.5s";
          bootScreen.style.opacity = "0";

          gbContent.style.transition = "opacity 0.5s";
          gbContent.style.opacity = "1";

          setTimeout(() => {
            bootScreen.style.display = "none";
          }, 500);
        }, 3500);
      });
    }
  }

  // =====================
  // Initialize
  // =====================

  function init() {
    initSoundToggle();
    initButtonSounds();
    initDPadControls();
    initBootSequence();
  }

  // Run on DOM ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  // Export for external use if needed
  window.GBTheme = {
    initAudio,
    playTone,
    playHover,
    playClick,
    playBoot,
  };
})();
