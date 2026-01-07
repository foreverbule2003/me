import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import avatarImg from '../../assets/images/avatar.jpg';

const HomeView = ({ onSetActions }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const navigate = useNavigate();

    const menuItems = [
        { label: 'ABOUT', path: '/about' },
        { label: 'SELECT TRIP', path: '/trips' },
        { label: 'JOURNAL', path: '/journal' },
        { label: 'TOOLS & CONTACT', path: '/tools' }
    ];

    const handleUp = () => setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
    const handleDown = () => setSelectedIndex(prev => (prev < menuItems.length - 1 ? prev + 1 : prev));
    const handleSelect = () => {
        const item = menuItems[selectedIndex];
        navigate(item.path);
    };

    // Export actions to the parent shell
    useEffect(() => {
        onSetActions({
            onUp: handleUp,
            onDown: handleDown,
            onSelect: handleSelect,
            onStart: handleSelect,
            onBack: () => { },
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

            {/* Menu */}
            <div className="flex-grow overflow-y-auto pr-1" id="menu-container">
                {menuItems.map((item, index) => (
                    <div
                        key={index}
                        className={`gb-btn menu-item ${index === selectedIndex ? 'active-focus' : ''}`}
                        onMouseEnter={() => setSelectedIndex(index)}
                        onClick={() => navigate(item.path)}
                    >
                        {item.label}
                    </div>
                ))}
            </div>
        </>
    );
};

export default HomeView;
