/**
 * GameBoy Shell React Component (Vite ESM Version)
 * 
 * Handles:
 * - Boot Sequence (Animation + Sound)
 * - Audio Context Management (Web Audio API)
 * - Control Inputs (D-Pad, Buttons)
 * - Reusable UI Layout
 */

import React, { useState, useEffect, useRef } from 'react';

export const GameBoyShell = ({
    children,
    activePage = 'home',
    onUp,
    onDown,
    onLeft,
    onRight,
    onSelect, // A button
    onBack,   // B button
    onStart,  // Start button
    onOp      // Select button
}) => {
    // --- Audio State ---
    const audioCtxRef = useRef(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPoweredOn, setIsPoweredOn] = useState(false);

    // --- Boot Sequence State ---
    const [bootStep, setBootStep] = useState('off'); // off -> booting -> on
    const [showBootLogo, setShowBootLogo] = useState(false);
    const [contentOpacity, setContentOpacity] = useState(0);

    // --- Audio Engine ---
    const initAudio = () => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
            audioCtxRef.current = new AudioContext();
        }
        if (audioCtxRef.current.state === 'suspended') {
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

    const playHover = () => playTone(400, 'square', 0.05, 0.05);
    const playClick = () => {
        playTone(900, 'square', 0.1, 0.1);
        setTimeout(() => playTone(1200, 'square', 0.2, 0.1), 100);
    };
    const playBootSound = () => {
        if (isMuted || !audioCtxRef.current) return;
        const ctx = audioCtxRef.current;

        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'square';
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
        setBootStep('booting');
        setTimeout(() => setShowBootLogo(true), 50);

        // 3. Play Sound after slight delay
        setTimeout(() => playBootSound(), 800);

        // 4. Show Content
        setTimeout(() => {
            setBootStep('on');
            setContentOpacity(1);
            sessionStorage.setItem('gb_powered_on', 'true');
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
                case 'ArrowUp':
                    onUp && onUp();
                    playTone(200, 'square', 0.05, 0.05);
                    break;
                case 'ArrowDown':
                    onDown && onDown();
                    playTone(200, 'square', 0.05, 0.05);
                    break;
                case 'ArrowLeft':
                    onLeft && onLeft();
                    playTone(200, 'square', 0.05, 0.05);
                    break;
                case 'ArrowRight':
                    onRight && onRight();
                    playTone(200, 'square', 0.05, 0.05);
                    break;
                case 'Enter': // A Button
                case 'z':
                case 'Z':
                    onSelect && onSelect();
                    playTone(400, 'square', 0.1, 0.1);
                    break;
                case 'Backspace': // B Button
                case 'x':
                case 'X':
                    onBack && onBack();
                    playTone(150, 'square', 0.1, 0.1);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isPoweredOn, onUp, onDown, onLeft, onRight, onSelect, onBack]);

    // --- Boot Check Effect ---
    useEffect(() => {
        // Check if already booted in this session
        const hasBooted = sessionStorage.getItem('gb_powered_on') ||
            window.location.search.includes('booted=true') ||
            window.location.hash === '#booted';

        if (hasBooted) {
            setIsPoweredOn(true);
            setBootStep('on');
            setContentOpacity(1);
        }
    }, []);

    // --- Render Helpers ---
    const DPad = () => (
        <div className="d-pad-container">
            <div className="d-pad-h"></div>
            <div className="d-pad-v"></div>
            <div className="d-pad-center"></div>
            {/* Interactive mock buttons */}
            <div className="d-btn d-up" onMouseDown={() => { onUp && onUp(); playTone(200, 'square', 0.05, 0.05); }}></div>
            <div className="d-btn d-right" onMouseDown={() => { onRight && onRight(); playTone(200, 'square', 0.05, 0.05); }}></div>
            <div className="d-btn d-down" onMouseDown={() => { onDown && onDown(); playTone(200, 'square', 0.05, 0.05); }}></div>
            <div className="d-btn d-left" onMouseDown={() => { onLeft && onLeft(); playTone(200, 'square', 0.05, 0.05); }}></div>
        </div>
    );

    const ActionButton = ({ label, id, style }) => (
        <div className="ab-btn-wrapper" style={style}>
            <div
                className="ab-btn"
                id={id}
                onMouseDown={() => {
                    if (label === 'A') { onSelect && onSelect(); playTone(400, 'square', 0.1, 0.1); }
                    else { onBack && onBack(); playTone(150, 'square', 0.1, 0.1); }
                }}
            ></div>
            <div className="ab-label">{label}</div>
        </div>
    );

    return (
        <div className="gb-shell">
            {/* Top Text */}
            <div className="flex justify-between text-gray-400 text-xs mb-1 px-4 font-bold tracking-widest items-center">
                <span>DOT MATRIX WITH STEREO SOUND</span>
                <button
                    onClick={toggleSound}
                    className={`text-xs px-3 py-1 rounded shadow-md border-2 font-bold transition-all 
            ${isMuted
                            ? 'bg-gray-300 text-gray-800 border-gray-500 animate-pulse hover:bg-white'
                            : 'bg-orange-500 text-white border-red-700'}`}
                >
                    {isMuted ? "🔈 SOUND OFF" : "🔊 SOUND ON"}
                </button>
            </div>

            {/* Bezel & Screen */}
            <div className="gb-bezel">
                {/* Battery Indicator */}
                <div className="flex justify-between text-red-500 text-[10px] mb-1 px-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_5px_red]"></div>
                    <span>BATTERY</span>
                </div>

                <div className="gb-screen-glass relative">
                    {/* 1. Click Mask (Power On) */}
                    {!isPoweredOn && (
                        <div id="click-mask" onClick={handlePowerOn} style={{ display: 'flex' }}>
                            <div className="power-icon">⏻</div>
                            <div className="power-text">Click to Power On</div>
                        </div>
                    )}

                    {/* 2. Boot Screen */}
                    {bootStep === 'booting' && (
                        <div id="boot-screen" style={{ display: 'flex', opacity: 1, transition: 'opacity 0.5s' }}>
                            <div className={`boot-logo ${showBootLogo ? 'scrolling-down' : ''}`} id="boot-logo">
                                TimBoy<span className="boot-registered">®</span>
                            </div>
                        </div>
                    )}

                    {/* 3. Main Content */}
                    <div className="gb-content" style={{ opacity: contentOpacity, transition: 'opacity 0.5s' }}>
                        {children}
                    </div>
                </div>

                <div className="text-center italic text-gray-400 font-bold mt-2 text-xl tracking-[0.2em] opacity-80">
                    TimBoy
                </div>
            </div>

            {/* Controls Area */}
            <div className="controls-area">
                <DPad />
                <div className="action-btns">
                    <ActionButton label="B" id="btn-b" />
                    <ActionButton label="A" id="btn-a" style={{ marginTop: '-20px' }} />
                </div>
            </div>

            {/* Start/Select */}
            <div className="start-select-container">
                <div className="ss-btn-wrapper">
                    <div className="ss-btn" id="btn-select" onMouseDown={() => playTone(300, 'square', 0.1, 0.05)}></div>
                    <div className="ss-label">SELECT</div>
                </div>
                <div className="ss-btn-wrapper">
                    <div className="ss-btn" id="btn-start" onMouseDown={playBootSound}></div>
                    <div className="ss-label">START</div>
                </div>
            </div>
        </div>
    );
};

export default GameBoyShell;
