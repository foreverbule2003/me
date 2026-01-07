import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import avatarImg from '../../assets/images/avatar.jpg';

const AboutView = ({ onSetActions }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

    const menuItems = [
        { label: '台股分析自動化', path: '/tools' }, // Linking to tools for now as specific sub-tool is MPA
        { label: 'BACK', path: '/', isBack: true },
    ];

    const handleUp = () => setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    const handleDown = () => setSelectedIndex(prev => (prev < menuItems.length - 1 ? prev + 1 : prev));
    const handleSelect = () => {
        const item = menuItems[selectedIndex];
        navigate(item.path);
    };
    const handleBack = () => {
        navigate('/');
    };

    useEffect(() => {
        onSetActions({
            onUp: handleUp,
            onDown: handleDown,
            onSelect: handleSelect,
            onStart: handleSelect,
            onBack: handleBack,
        });
    }, [selectedIndex, navigate, onSetActions]);

    return (
        <>
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

            {/* Page Title */}
            <div className="border-b-4 border-[#0f380f] pb-1 mb-4">
                <h2 className="text-xl font-bold">ABOUT</h2>
            </div>

            {/* About Content */}
            <div className="bg-[#9bbc0f]/50 p-2 mb-4">
                <div className="text-sm leading-relaxed mb-4">
                    <p className="mb-2">熱愛學習與分享。</p>
                    <p>專注於投資與AI應用。</p>
                </div>
            </div>

            <div className="flex-grow overflow-y-auto pr-1" id="menu-container">
                <div className="mb-4">
                    <h2 className="mb-2 font-bold text-xl border-b-2 border-[#0f380f]">AI 應用展示</h2>
                    <div
                        className={`gb-btn menu-item ${selectedIndex === 0 ? 'active-focus' : ''}`}
                        onMouseEnter={() => setSelectedIndex(0)}
                        onClick={() => navigate(menuItems[0].path)}
                    >
                        {menuItems[0].label}
                    </div>
                </div>

                <div
                    className={`gb-btn menu-item ${selectedIndex === 1 ? 'active-focus' : ''}`}
                    onMouseEnter={() => setSelectedIndex(1)}
                    onClick={handleBack}
                >
                    {menuItems[1].label}
                </div>
            </div>
        </>
    );
};

export default AboutView;
