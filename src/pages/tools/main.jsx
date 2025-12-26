import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameBoyShell } from '../../components/GameBoyShell.jsx';
import '../../../assets/gb-theme.css';
import avatarImg from '../../../assets/images/avatar.jpg';

const ToolsPage = () => {
    return (
        <GameBoyShell activePage="tools">
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
                <h2 className="mb-2 font-bold text-xl border-b-2 border-[#0f380f]">TOOLS & CONTACT</h2>

                <a href="./financial-dashboard.html" className="gb-btn menu-item">
                    財務儀表板
                </a>
                <a href="./bull-put-spread.html" className="gb-btn menu-item">
                    期權策略模擬器
                </a>
                <a href="mailto:foreverbule2003@gmail.com" className="gb-btn menu-item">
                    聯絡我
                </a>

                <a href="../?booted=true#booted" className="gb-btn menu-item mt-6">
                    BACK
                </a>
            </div>
        </GameBoyShell>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<ToolsPage />);
