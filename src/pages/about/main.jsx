import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameBoyShell } from '../../components/GameBoyShell.jsx';
import '../../index.css';  // Tailwind CSS
import '../../../assets/gb-theme.css';
import avatarImg from '../../../assets/images/avatar.jpg';

const AboutPage = () => {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true);

    // Simulate Data Loading
    React.useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const menuItems = [
        { label: '🤖 台股分析自動化', href: '../tools/stock-analyzer/?booted=true#booted' },
        { label: 'BACK', href: '../?booted=true#booted', isBack: true },
    ];

    const handleUp = () => setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    const handleDown = () => setSelectedIndex(prev => (prev < menuItems.length - 1 ? prev + 1 : prev));
    const handleSelect = () => {
        if (isLoading) return;
        const item = menuItems[selectedIndex];
        window.location.href = item.href;
    };
    const handleBack = () => {
        window.location.href = '../?booted=true#booted';
    };

    return (
        <GameBoyShell headless={true}
            isLoading={isLoading}
            activePage="about"
            onUp={handleUp}
            onDown={handleDown}
            onSelect={handleSelect}
            onStart={handleSelect}
            onBack={handleBack}
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

            {/* About Content */}
            <div className="bg-[#9bbc0f]/50 p-2 mb-4 border-2 border-[#0f380f]">
                <h2 className="mb-2 font-bold text-xl border-b-2 border-[#0f380f]">ABOUT</h2>
                <div className="text-sm leading-relaxed mb-4">
                    <p className="mb-2">熱愛學習與分享。</p>
                    <p>專注於投資與AI應用。</p>
                </div>
            </div>

            {/* AI Application Showcase - Now integrated in manual loop or just map them */}
            {/* Since structure is a bit split (Showcase section vs bottom menu), let's render them consistently highlight based on index */}

            <div className="flex-grow overflow-y-auto pr-1" id="menu-container">
                {/* Custom rendering to match previous layout but with active-focus class */}
                <div className="mb-4">
                    <h2 className="mb-2 font-bold text-xl border-b-2 border-[#0f380f]">AI 應用展示</h2>
                    <a
                        href={menuItems[0].href}
                        className={`gb-btn menu-item ${selectedIndex === 0 ? 'active-focus' : ''}`}
                        onMouseEnter={() => setSelectedIndex(0)}
                    >
                        {menuItems[0].label}
                    </a>
                </div>

                {/* Bottom Menu */}
                <a
                    href={menuItems[1].href}
                    className={`gb-btn menu-item ${selectedIndex === 1 ? 'active-focus' : ''}`}
                    onMouseEnter={() => setSelectedIndex(1)}
                >
                    {menuItems[1].label}
                </a>
            </div>
        </GameBoyShell>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(<AboutPage />);
