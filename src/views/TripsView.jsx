import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import avatarImg from '../../assets/images/avatar.jpg';

const TripsView = ({ onSetActions }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

    const menuItems = [
        { label: '2026 北海道 (TBD)', href: '/me/trips/2026-hokkaido/index.html', isExternal: true },
        { label: '2026 伊勢志摩', href: '/me/trips/2026-ise-shima/index.html', isExternal: true },
        { label: '2025 大阪', href: '/me/trips/2025-osaka/index.html', isExternal: true },
        { label: '2025 宿霧', href: '/me/trips/2025-cebu/index.html', isExternal: true },
        { label: 'BACK', path: '/', isBack: true },
    ];

    const handleUp = () => setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    const handleDown = () => setSelectedIndex(prev => (prev < menuItems.length - 1 ? prev + 1 : prev));

    const handleSelect = () => {
        const item = menuItems[selectedIndex];
        if (item.isExternal) {
            window.location.href = item.href;
        } else {
            navigate(item.path);
        }
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
                <h2 className="text-xl font-bold">SELECT TRIP</h2>
            </div>

            {/* Menu */}
            <div className="flex-grow overflow-y-auto pr-1" id="menu-container">


                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`gb-btn menu-item ${index === selectedIndex ? 'active-focus' : ''} ${item.isBack ? 'mt-6' : ''}`}
                        onMouseEnter={() => setSelectedIndex(index)}
                        onClick={() => {
                            if (item.isExternal) window.location.href = item.href;
                            else if (item.path) navigate(item.path);
                        }}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
        </>
    );
};

export default TripsView;
