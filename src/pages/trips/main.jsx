import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameBoyShell } from '../../components/GameBoyShell.jsx';
import '../../index.css';  // Tailwind CSS
import '../../../assets/gb-theme.css';
import avatarImg from '../../../assets/images/avatar.jpg';

const TripsPage = () => {
    return (
        <GameBoyShell activePage="trips">
            {/* Header */}
            <div className="flex justify-between items-end border-b-4 border-[#0f380f] pb-2 mb-4">
                <div>
                    <h1 className="text-2xl font-bold">TimZ</h1>
                    <p className="text-sm">STATUS: ONLINE</p>
                </div>
                <div className="w-12 h-12 grayscale contrast-200 border-2 border-[#0f380f] bg-gray-300 overflow-hidden relative">
                    <img src={avatarImg} alt="Profile" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* Menu */}
            <div className="flex-grow overflow-y-auto pr-1" id="menu-container">
                <h2 className="mb-2 font-bold text-xl border-b-2 border-[#0f380f]">SELECT TRIP</h2>

                <a href="./2026-hokkaido/index.html" className="gb-btn menu-item">
                    2026 北海道 (TBD)
                </a>
                <a href="./2026-ise-shima/index.html" className="gb-btn menu-item">
                    2026 伊勢志摩
                </a>
                <a href="./2025-osaka/index.html" className="gb-btn menu-item">
                    2025 大阪
                </a>
                <a href="./2025-cebu/index.html" className="gb-btn menu-item">
                    2025 宿霧
                </a>

                <a href="../?booted=true#booted" className="gb-btn menu-item mt-6">
                    BACK
                </a>
            </div>
        </GameBoyShell>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<TripsPage />);
