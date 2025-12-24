/**
 * 共用圖示系統 - Shared Icons System
 * 統一管理所有旅程頁面使用的 Lucide 圖示
 * 使用方式：在頁面中引入此檔案，然後使用 Icons 物件
 */

(function () {
  "use strict";

  // LucideIcon 核心元件 - 使用內嵌 SVG
  const LucideIcon = ({ name, size = 24, className = "", ...props }) => {
    const svgProps = {
      width: size,
      height: size,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className,
      ...props,
    };

    // 所有 Lucide 圖示的 SVG path 定義
    const iconPaths = {
      // === 地圖與導航 ===
      map: (
        <>
          <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
          <line x1="9" y1="3" x2="9" y2="18" />
          <line x1="15" y1="6" x2="15" y2="21" />
        </>
      ),
      "map-pin": (
        <>
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </>
      ),
      navigation: <polygon points="3 11 22 2 13 21 11 13 3 11" />,
      route: (
        <>
          <circle cx="6" cy="19" r="3" />
          <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15" />
          <circle cx="18" cy="5" r="3" />
        </>
      ),

      // === 日期與時間 ===
      calendar: (
        <>
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </>
      ),

      // === 金錢與財務 ===
      wallet: (
        <>
          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
          <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
        </>
      ),

      // === 交通工具 ===
      train: (
        <>
          <rect x="4" y="3" width="16" height="16" rx="2" />
          <path d="M4 11h16" />
          <path d="M12 3v8" />
          <path d="m8 19-2 3" />
          <path d="m18 22-2-3" />
          <path d="M8 15h.01" />
          <path d="M16 15h.01" />
        </>
      ),
      car: (
        <>
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <circle cx="17" cy="17" r="2" />
        </>
      ),
      bus: (
        <>
          <path d="M8 6v6" />
          <path d="M15 6v6" />
          <path d="M2 12h19.6" />
          <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
          <circle cx="7" cy="18" r="2" />
          <path d="M9 18h5" />
          <circle cx="16" cy="18" r="2" />
        </>
      ),
      ship: (
        <>
          <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
          <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
          <path d="M12 10v4" />
          <path d="M12 2v3" />
        </>
      ),

      // === 飛機 ===
      "plane-departure": (
        <>
          <path d="M2 22h20" />
          <path d="M6.36 17.4 4 17l-2-4 .9-.4 1.8 1.4 1.7-.8-.7-3.9.8-.3 3.5 2.6 2.3-1 4.1-4.1a2 2 0 1 1 2.8 2.8l-4.1 4.1-1 2.3 2.6 3.5-.3.8-3.9-.7-.8 1.7 1.4 1.8-.4.9-4-2z" />
        </>
      ),
      "plane-arrival": (
        <>
          <path d="M2 22h20" />
          <path d="M17.64 6.6a2 2 0 1 1 2.82 2.82l-4.1 4.1-1 2.3 2.6 3.5-.3.8-3.9-.7-.8 1.7 1.4 1.8-.4.9-4-2-3.5-.9.9-.4 1.8 1.4 1.7-.8-.7-3.9.8-.3 3.5 2.6 2.3-1z" />
        </>
      ),

      // === 餐飲 ===
      utensils: (
        <>
          <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
          <path d="M7 2v20" />
          <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3m0 0v7" />
        </>
      ),

      // === 住宿 ===
      hotel: (
        <>
          <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
          <path d="m9 16 .348-.24c1.465-1.013 3.84-1.013 5.304 0L15 16" />
          <path d="M8 7h.01" />
          <path d="M16 7h.01" />
          <path d="M12 7h.01" />
          <path d="M12 11h.01" />
          <path d="M16 11h.01" />
          <path d="M8 11h.01" />
          <path d="M10 22v-6.5m4 0V22" />
        </>
      ),

      // === 箭頭與方向 ===
      "arrow-right": (
        <>
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </>
      ),

      // === 自然與環保 ===
      leaf: (
        <>
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
        </>
      ),

      // === 評分與標記 ===
      star: (
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      ),

      // === 資訊與說明 ===
      info: (
        <>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 16v-4" />
          <path d="M12 8h.01" />
        </>
      ),

      // === 特殊效果 ===
      sparkles: (
        <>
          <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
          <path d="M5 3v4" />
          <path d="M19 17v4" />
          <path d="M3 5h4" />
          <path d="M17 19h4" />
        </>
      ),

      // === UI 控制 ===
      x: (
        <>
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </>
      ),
      eye: (
        <>
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
          <circle cx="12" cy="12" r="3" />
        </>
      ),
      "chevron-down": <path d="m6 9 6 6 6-6" />,
      "chevron-up": <path d="m18 15-6-6-6 6" />,

      // === 通訊 ===
      send: (
        <>
          <path d="m22 2-7 20-4-9-9-4Z" />
          <path d="M22 2 11 13" />
        </>
      ),
      phone: (
        <>
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
        </>
      ),
      "external-link": (
        <>
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </>
      ),

      // === AI 與機器人 ===
      bot: (
        <>
          <path d="M12 8V4H8" />
          <rect width="16" height="12" x="4" y="8" rx="2" />
          <path d="M2 14h2" />
          <path d="M20 14h2" />
          <path d="M15 13v2" />
          <path d="M9 13v2" />
        </>
      ),
      "message-circle": <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />,
      languages: (
        <>
          <path d="m5 8 6 6" />
          <path d="m4 14 6-6 2-3" />
          <path d="M2 5h12" />
          <path d="M7 2h1" />
          <path d="m22 22-5-10-5 10" />
          <path d="M14 18h6" />
        </>
      ),
      // === 新增圖示 ===
      plane: (
        <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" style={{transform: 'rotate(45deg)', transformOrigin: 'center'}} />
      ),
      "shopping-bag": (
        <>
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </>
      ),
      suitcase: (
        <>
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </>
      ),
      ticket: (
        <>
          <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
          <path d="M13 5v14" />
        </>
      ),
      "check-square": (
        <>
          <polyline points="9 11 12 14 22 4" />
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
        </>
      ),
    };

    const pathContent = iconPaths[name];
    if (pathContent) {
      return React.createElement("svg", svgProps, pathContent);
    }

    // Fallback 圖示
    return React.createElement(
      "svg",
      svgProps,
      React.createElement("circle", { cx: "12", cy: "12", r: "10" })
    );
  };

  // 圖示名稱映射表
  const iconNames = {
    // 地圖與導航
    MapIcon: "map",
    MapPin: "map-pin",
    Navigation: "navigation",
    RouteIcon: "route",

    // 日期與時間
    Calendar: "calendar",

    // 金錢
    Wallet: "wallet",

    // 交通
    Train: "train",
    Car: "car",
    Bus: "bus",
    Ship: "ship",

    // 飛機
    PlaneDeparture: "plane-departure",
    PlaneArrival: "plane-arrival",

    // 餐飲與住宿
    Utensils: "utensils",
    Hotel: "hotel",

    // 箭頭
    ArrowRight: "arrow-right",

    // 自然
    Leaf: "leaf",

    // 評分
    Star: "star",

    // 資訊
    Info: "info",

    // 特效
    Sparkles: "sparkles",

    // UI 控制
    X: "x",
    Eye: "eye",
    ChevronDown: "chevron-down",
    ChevronUp: "chevron-up",

    // 通訊
    Send: "send",
    Phone: "phone",
    ExternalLink: "external-link",

    // AI
    Bot: "bot",
    MessageCircle: "message-circle",
    Languages: "languages",

    // Missing Icons added for 2025-osaka
    Plane: "plane", // Generic plane
    ShoppingBag: "shopping-bag",
    Suitcase: "suitcase",
    Ticket: "ticket",
    CheckSquare: "check-square",
  };

  // 動態生成所有圖示元件
  const Icons = Object.fromEntries(
    Object.entries(iconNames).map(([componentName, iconName]) => [
      componentName,
      (props) => React.createElement(LucideIcon, { name: iconName, ...props }),
    ])
  );

  // 導出（但元件定義保持在 IIFE 內部）
  if (typeof window !== "undefined") {
    window.TripShared = window.TripShared || {};
    window.TripShared.Icons = Icons;
    window.TripShared.LucideIcon = LucideIcon;
  }
})();
