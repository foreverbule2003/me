import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameBoyShell } from './components/GameBoyShell.jsx';
import '../assets/gb-theme.css';

const IndexPage = () => {
    return (
        <GameBoyShell activePage="home">
            {/* Header */}
            <div className="flex justify-between items-end border-b-4 border-[#0f380f] pb-2 mb-4">
                <div>
                    <h1 className="text-2xl font-bold">TimZ</h1>
                    <p className="text-sm">STATUS: ONLINE</p>
                </div>
                <div className="w-12 h-12 grayscale contrast-200 border-2 border-[#0f380f] bg-gray-300 overflow-hidden relative">
                    <img src="/assets/images/avatar.jpg" alt="Profile" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Menu */}
            <div className="flex-grow overflow-y-auto pr-1" id="menu-container">
                <a href="./about/" className="gb-btn menu-item">
                    👤 ABOUT
                </a>
                <a href="./trips/" className="gb-btn menu-item">
                    ✈️ SELECT TRIP
                </a>
                <a href="./journal/" className="gb-btn menu-item">
                    📓 JOURNAL
                </a>
                <a href="./tools/" className="gb-btn menu-item">
                    🔧 TOOLS & CONTACT
                </a>
            </div>
        </GameBoyShell>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<IndexPage />);
