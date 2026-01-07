import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameBoyShell } from './components/GameBoyShell.jsx';
import './index.css';  // Tailwind CSS
import '../assets/gb-theme.css';
import avatarImg from '../assets/images/avatar.jpg';

const IndexPage = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const menuItems = [
        { label: '👤 ABOUT', href: './about/' },
        { label: '✈️ SELECT TRIP', href: './trips/' },
        { label: '📓 JOURNAL', href: './journal/' },
        { label: '🔧 TOOLS & CONTACT', href: './tools/' }
    ];

    const handleUp = () => setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    const handleDown = () => setSelectedIndex(prev => (prev < menuItems.length - 1 ? prev + 1 : prev));
    const handleSelect = () => {
        const item = menuItems[selectedIndex];
        window.location.href = item.href;
    };

    return (
        <GameBoyShell
            activePage="home"
            onUp={handleUp}
            onDown={handleDown}
            onSelect={handleSelect}
            onStart={handleSelect}
        >
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
                {menuItems.map((item, index) => (
                    <a
                        key={index}
                        href={item.href}
                        className={`gb-btn menu-item ${index === selectedIndex ? 'active-focus' : ''}`}
                        onMouseEnter={() => setSelectedIndex(index)}
                    >
                        {item.label}
                    </a>
                ))}
            </div>
        </GameBoyShell>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<IndexPage />);
