import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameBoyShell } from '../../components/GameBoyShell.jsx';
import '../../../assets/gb-theme.css';

const AboutPage = () => {
    return (
        <GameBoyShell activePage="about">
            {/* Header */}
            <div className="flex justify-between items-end border-b-4 border-[#0f380f] pb-2 mb-4">
                <div>
                    <h1 className="text-2xl font-bold">TimZ</h1>
                    <p className="text-sm">STATUS: ONLINE</p>
                </div>
                <div className="w-12 h-12 grayscale contrast-200 border-2 border-[#0f380f] bg-gray-300 overflow-hidden relative">
                    <img src="../assets/images/avatar.jpg" alt="Profile" className="w-full h-full object-cover" />
                </div>
            </div>

            {/* About Content */}
            <div className="bg-[#9bbc0f]/50 p-2 mb-4 border-2 border-[#0f380f]">
                <h2 className="mb-2 font-bold text-xl border-b-2 border-[#0f380f]">ABOUT</h2>
                <div className="text-sm leading-relaxed mb-4">
                    <p className="mb-2">熱愛學習與分享。</p>
                    <p>專注於投資與AI應用。</p>
                </div>
            </div>

            {/* Menu */}
            <div className="flex-grow overflow-y-auto pr-1" id="menu-container">
                <a href="../?booted=true#booted" className="gb-btn menu-item">
                    BACK
                </a>
            </div>
        </GameBoyShell>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<AboutPage />);
