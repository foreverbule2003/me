/**
 * Trip Components - Vite ESM 版本
 * 提供可重用的 UI 元件給所有旅程頁面
 */

import React, { useState } from 'react';
import {
    ArrowRight,
    ChevronDown,
    ChevronUp,
    ArrowUp,
    ExternalLink,
    FoldVertical,
    UnfoldVertical,
} from 'lucide-react';

// === 1. 返回首頁按鈕 ===
export const BackButton = ({ href = "../../?booted=true#booted" }) => {
    return (
        <a
            href={href}
            className="absolute top-6 left-6 z-50 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/20 shadow-lg group"
            title="回到首頁"
        >
            <ArrowRight
                size={24}
                className="rotate-180 group-hover:-translate-x-1 transition-transform"
            />
        </a>
    );
};

// === 2. 頁面標題元件 ===
export const PageHeader = ({
    badge = "",
    badgeIcon: BadgeIcon = null,
    title = "",
    subtitle = "",
    backgroundImage = "",
    tags = [],
    children = null,
}) => {
    return (
        <header className="relative w-full py-32 px-6 text-white overflow-hidden">
            <BackButton />

            {/* 背景圖片 */}
            <div className="absolute inset-0 z-0 select-none">
                {backgroundImage && (
                    <img
                        src={backgroundImage}
                        alt={title}
                        className="w-full h-full object-cover opacity-90 scale-105 animate-[float_20s_ease-in-out_infinite]"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/60 to-surface/100" />
                <div className="absolute inset-0 bg-primary/40 mix-blend-overlay" />
            </div>

            {/* 內容 */}
            <div className="max-w-5xl mx-auto text-center relative z-10">
                {badge && (
                    <div className="inline-block px-5 py-2 mb-6 rounded-full bg-primary/30 backdrop-blur-md text-sm font-bold tracking-wider border border-accent/40 text-accent/90 animate-fade-up shadow-lg">
                        <div className="flex items-center gap-2">
                            {BadgeIcon && <BadgeIcon size={16} />}
                            {badge}
                        </div>
                    </div>
                )}

                <h1 className="font-display text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight animate-fade-up animate-fade-up-delay-1 drop-shadow-xl text-yellow-50">
                    {title}
                    {subtitle && (
                        <span className="block text-2xl md:text-4xl mt-4 font-light tracking-[0.2em] font-body opacity-90">
                            {subtitle}
                        </span>
                    )}
                </h1>

                {tags.length > 0 && (
                    <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm animate-fade-up animate-fade-up-delay-2">
                        {tags.map((tag, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg"
                            >
                                {tag.icon && <tag.icon size={18} />}
                                <span>{tag.text}</span>
                            </div>
                        ))}
                    </div>
                )}

                {children}
            </div>
        </header>
    );
};

// === 3. Section 卡片容器 ===
// === 3. Section 卡片容器 ===
export const SectionCard = ({
    icon: Icon,
    title,
    children,
    className = "",
    collapsible = false,
    defaultOpen = true,
    forceOpen = null,
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    // 監聽外部強制開關狀態
    React.useEffect(() => {
        if (forceOpen !== null) {
            setIsOpen(forceOpen);
        }
    }, [forceOpen]);

    const HeaderContent = () => (
        <div className="flex items-center gap-2">
            {Icon && (
                <div className="p-2 bg-accent/10 rounded-lg text-accent">
                    <Icon size={18} />
                </div>
            )}
            <h2 className="text-lg md:text-xl font-bold text-gray-800 flex-1 text-left">{title}</h2>
            {collapsible && (
                <div className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
                    <ChevronDown size={20} />
                </div>
            )}
        </div>
    );

    return (
        <section
            className={`bg-white rounded-3xl transition-all duration-300 shadow-lg ${!collapsible ? 'hover:shadow-xl hover:-translate-y-1 p-3 md:p-6' : 'hover:shadow-md overflow-hidden'} ${className}`}
        >
            {collapsible ? (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full block transition-all duration-300 py-3 px-4 text-left ${isOpen ? "border-b border-gray-100 bg-gray-50/30" : ""}`}
                >
                    <HeaderContent />
                </button>
            ) : (
                <div className="mb-5 border-b border-gray-100 pb-3">
                    <HeaderContent />
                </div>
            )}

            <div className={`transition-all duration-500 ease-in-out ${collapsible ? (isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0") : ""}`}>
                <div className={collapsible ? "p-3 md:p-6 pt-4" : ""}>
                    {children}
                </div>
            </div>
        </section>
    );
};

// === 4. 標籤導航 ===
export const TabNavigation = ({ activeTab, setActiveTab, tabs = [] }) => {
    return (
        <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-around">
                    {tabs.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${activeTab === id
                                ? "text-primary font-bold"
                                : "text-subtle hover:text-primary"
                                }`}
                        >
                            <Icon
                                size={24}
                                className={activeTab === id ? "transform -translate-y-0.5" : ""}
                            />
                            <span className="text-xs tracking-wide">{label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
};

// === 5. 可折疊區塊 ===
export const CollapsibleSection = ({
    title,
    icon: Icon,
    defaultOpen = true,
    children,
    className = "",
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className={`mb-8 ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-base font-bold text-gray-800 mb-4 flex items-center justify-between gap-2 group"
            >
                <div className="flex items-center gap-2">
                    {Icon && <Icon className="text-accent" size={18} />}
                    {title}
                </div>
                <ChevronDown
                    size={20}
                    className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                {children}
            </div>
        </div>
    );
};

// === 6. 活動項目 ===
export const ActivityItem = ({ activity, onOpenRoute, onOpenFoodGuide }) => {
    const cleanQuery = (text) => {
        let cleaned = text.replace(
            /[\u{1F600}-\u{1F6FF}|[\u{1F300}-\u{1F5FF}|[\u{1F680}-\u{1F6FF}|[\u{1F700}-\u{1F77F}|[\u{1F780}-\u{1F7FF}|[\u{1F800}-\u{1F8FF}|[\u{1F900}-\u{1F9FF}|[\u{1FA00}-\u{1FA6F}|[\u{1FA70}-\u{1FAFF}]/gu,
            ""
        );
        cleaned = cleaned.replace(/搭乘|移動|前往|抵達|入住|晚餐|午餐|參拜/g, "");
        cleaned = cleaned.replace(/[：:()（）]/g, " ");
        return cleaned.trim();
    };

    const hasExplicitMap = !!activity.map;
    const hasArrow = activity.text.includes("→");
    const isRoute = hasExplicitMap ? activity.map.type === "route" : hasArrow;

    const isBus =
        activity.text.includes("巴士") || activity.subText?.includes("巴士");
    const TransportIcon = isBus ? Bus : Train;

    const handleMapClick = (e) => {
        e.stopPropagation();
        if (hasExplicitMap) {
            onOpenRoute({
                type: activity.map.type || "spot",
                name: cleanQuery(activity.text),
                ...activity.map,
            });
        } else if (hasArrow) {
            const parts = activity.text.split("→");
            const origin = cleanQuery(parts[0]);
            const destination = cleanQuery(parts[parts.length - 1]);
            onOpenRoute({
                type: "route",
                name: cleanQuery(activity.text),
                origin: origin,
                destination: destination,
            });
        }
    };

    return (
        <div className="group/item">
            <div className="flex items-start gap-4">
                <span className="text-xs font-bold text-primary/70 min-w-[3rem] font-mono leading-6">
                    {activity.time}
                </span>
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div className="text-gray-800 font-bold text-sm leading-6 flex-1">
                            {activity.text}
                        </div>
                        {(hasExplicitMap || hasArrow) && (
                            <button
                                onClick={handleMapClick}
                                className="flex-shrink-0 transition-all cursor-pointer hover:scale-110 text-accent w-6 h-6 flex items-center justify-center"
                                title={isRoute ? "查看交通路線" : "查看地點"}
                            >
                                {isRoute ? <TransportIcon size={16} /> : <MapPin size={16} />}
                            </button>
                        )}
                    </div>
                    {activity.subText && (
                        <div className="text-xs text-gray-500 mt-0.5 font-medium">
                            {activity.subText}
                        </div>
                    )}
                    {activity.tips && (
                        <div className="mt-2 text-xs text-orange-700 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-lg inline-block leading-relaxed">
                            <span className="font-bold mr-1">⚠️</span> {activity.tips}
                        </div>
                    )}
                    {activity.note && (
                        <div className="mt-1 text-xs text-primary/70 flex items-start gap-1 leading-relaxed">
                            <Info size={12} className="mt-0.5 shrink-0" /> {activity.note}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// === 7. MapModal (地圖彈窗) ===
export const MapModal = ({ isOpen, onClose, data }) => {
    if (!isOpen || !data) return null;

    let mapUrl = "";
    let externalMapUrl = "";
    const title = data.name || data.query;

    if (data.type === "route") {
        // 使用更強制的路徑規劃參數 f=d (Directions)
        mapUrl = `https://maps.google.com/maps?f=d&source=s_d&saddr=${encodeURIComponent(
            data.origin
        )}&daddr=${encodeURIComponent(data.destination)}&hl=zh-TW&geocode=&aq=&sll=&sspn=&g=0&ie=UTF8&z=10&dirflg=r&output=embed`;

        externalMapUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
            data.origin
        )}&destination=${encodeURIComponent(data.destination)}&travelmode=transit`;
    } else {
        mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
            data.query
        )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
        externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            data.query
        )}`;
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white w-full max-w-3xl h-[80vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
                {/* Header */}
                <div className="bg-indigo-600 p-4 flex items-center justify-between text-white shrink-0">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                        {data.type === "route" ? <Train size={22} /> : <MapPin size={22} />}
                        <h3 className="font-bold text-lg truncate">{title}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="ml-4 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full transition-colors text-2xl font-bold flex-shrink-0"
                    >
                        ✕
                    </button>
                </div>

                {/* Map iframe */}
                <div className="flex-1 bg-gray-100 relative">
                    <iframe
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        scrolling="no"
                        src={mapUrl}
                        title={title}
                        className="w-full h-full"
                    />
                </div>

                {/* Footer */}
                <div className="p-4 bg-white border-t border-gray-100 flex justify-between items-center shrink-0">
                    <span className="text-xs text-gray-400">
                        * 預覽地圖可能因 Google 政策偶有載入限制
                    </span>
                    <a
                        href={externalMapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-lg hover:bg-primary/10 font-medium transition-colors text-sm"
                    >
                        在 Google Maps App 開啟 <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </div>
    );
};

// === 8. FAB 浮動按鈕 ===
export const FAB = ({ icon: Icon, onClick, tooltip, className = "" }) => {
    return (
        <button
            onClick={onClick}
            className={`p-3 rounded-full bg-white/70 backdrop-blur-md text-primary shadow-xl border border-white/50 hover:bg-white hover:text-primary transition-all duration-300 group relative ${className}`}
        >
            <Icon size={24} />
            {tooltip && (
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {tooltip}
                </span>
            )}
        </button>
    );
};

// === 9. 階段標題 ===
export const PhaseHeader = ({
    title,
    isExpanded,
    onToggle,
    stickyTop = "52px",
}) => {
    return (
        <button
            onClick={onToggle}
            className="sticky z-30 w-full bg-gray-50/95 backdrop-blur py-3 md:py-4 cursor-pointer text-left focus:outline-none group"
            style={{ top: stickyTop }}
        >
            <h2 className="text-base md:text-xl font-bold text-gray-600 flex items-center gap-2">
                <span className="w-1 h-6 md:h-8 bg-accent rounded-full" />
                {title}
                <span className="ml-auto text-gray-400 group-hover:text-primary transition-colors">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </span>
            </h2>
        </button>
    );
};

// === 10. Toggle FAB ===
// === 10. Toggle FAB ===
export const ToggleFAB = ({ isExpanded, onToggle }) => (
    <button
        onClick={() => onToggle(!isExpanded)}
        className="p-3 rounded-full bg-white/70 backdrop-blur-md text-indigo-600 shadow-xl border border-white/50 hover:bg-white hover:text-indigo-600 transition-all duration-300 group relative"
        title={isExpanded ? "全部折疊" : "全部展開"}
    >
        {isExpanded ? <FoldVertical size={24} /> : <UnfoldVertical size={24} />}
    </button>
);

// === 11. ScrollToTop FAB ===
export const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    React.useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-24 right-6 z-40 p-3 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:bg-indigo-700 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
            aria-label="回到頂部"
        >
            <ArrowUp size={24} />
        </button>
    );
};
