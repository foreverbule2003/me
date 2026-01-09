/**
 * 共用 React 元件 - Shared React Components
 * 提供可重用的 UI 元件給所有旅程頁面
 *
 * 需要先引入：
 * - React (from CDN)
 * - icons.js (圖示系統)
 */

(function () {
  "use strict";

  // === 1. 返回首頁按鈕 ===
  const BackButton = ({ href = "/me/?booted=true" }) => {
    const { ArrowRight } = window.TripShared.Icons;

    return React.createElement(
      "a",
      {
        href,
        className:
          "absolute top-6 left-6 z-50 p-3 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all border border-white/20 shadow-lg group",
        title: "回到首頁",
      },
      React.createElement(ArrowRight, {
        size: 24,
        className: "rotate-180 group-hover:-translate-x-1 transition-transform",
      }),
    );
  };

  // === 2. 頁面標題元件 ===
  const PageHeader = ({
    badge = "",
    badgeIcon = null,
    title = "",
    subtitle = "",
    backgroundImage = "",
    backgroundStyle = {},
    tags = [],
    children = null,
  }) => {
    const { Leaf } = window.TripShared.Icons;
    const BadgeIcon = badgeIcon || Leaf;

    return React.createElement(
      "header",
      {
        className: "relative w-full py-32 px-6 text-white overflow-hidden",
      },
      // 返回按鈕
      React.createElement(BackButton),

      // 背景圖片
      React.createElement("div", {
        className: "absolute inset-0 z-0 select-none",
        children: [
          backgroundImage &&
            React.createElement("img", {
              key: "bg-img",
              src: backgroundImage,
              alt: title,
              className:
                "w-full h-full object-cover opacity-90 scale-105 animate-[float_20s_ease-in-out_infinite]",
            }),
          React.createElement("div", {
            key: "overlay-1",
            className:
              "absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/60 to-surface/100",
          }),
          React.createElement("div", {
            key: "overlay-2",
            className: "absolute inset-0 bg-primary/40 mix-blend-overlay",
          }),
        ],
      }),

      // 內容
      React.createElement(
        "div",
        {
          className: "max-w-5xl mx-auto text-center relative z-10",
        },
        // Badge
        badge &&
          React.createElement(
            "div",
            {
              key: "badge",
              className:
                "inline-block px-5 py-2 mb-6 rounded-full bg-primary/30 backdrop-blur-md text-sm font-bold tracking-wider border border-accent/40 text-accent/90 animate-fade-up shadow-lg",
            },
            React.createElement(
              "div",
              { className: "flex items-center gap-2" },
              React.createElement(BadgeIcon, { size: 16 }),
              badge,
            ),
          ),

        // 標題
        React.createElement(
          "h1",
          {
            key: "title",
            className:
              "font-display text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight animate-fade-up animate-fade-up-delay-1 drop-shadow-xl text-yellow-50",
          },
          title,
          subtitle &&
            React.createElement(
              "span",
              {
                className:
                  "block text-2xl md:text-4xl mt-4 font-light tracking-[0.2em] font-body opacity-90",
              },
              subtitle,
            ),
        ),

        // 標籤
        tags.length > 0 &&
          React.createElement(
            "div",
            {
              key: "tags",
              className:
                "mt-8 flex flex-wrap justify-center gap-4 text-sm animate-fade-up animate-fade-up-delay-2",
            },
            tags.map((tag, idx) =>
              React.createElement(
                "div",
                {
                  key: idx,
                  className:
                    "flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-lg",
                },
                tag.icon && React.createElement(tag.icon, { size: 18 }),
                React.createElement("span", null, tag.text),
              ),
            ),
          ),

        // 自定義內容
        children,
      ),
    );
  };

  // === 3. Section 卡片容器 ===
  const SectionCard = ({ icon: Icon, title, children, className = "" }) => {
    return React.createElement(
      "section",
      {
        className: `bg-white rounded-3xl p-6 md:p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ${className}`,
      },
      // 標題區
      React.createElement(
        "div",
        {
          className:
            "flex items-center gap-3 mb-6 border-b border-gray-100 pb-4",
        },
        Icon &&
          React.createElement(
            "div",
            {
              className: "p-3 bg-accent/10 rounded-xl text-accent",
            },
            React.createElement(Icon, { size: 24 }),
          ),
        React.createElement(
          "h2",
          {
            className: "text-2xl font-bold text-gray-800",
          },
          title,
        ),
      ),
      // 內容
      children,
    );
  };

  // === 4. 標籤導航 ===
  const TabNavigation = ({ activeTab, setActiveTab, tabs = [] }) => {
    return React.createElement(
      "nav",
      {
        className:
          "sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm",
      },
      React.createElement(
        "div",
        {
          className: "max-w-5xl mx-auto",
        },
        React.createElement(
          "div",
          {
            className: "flex justify-around",
          },
          tabs.map(({ id, label, Icon }) =>
            React.createElement(
              "button",
              {
                key: id,
                onClick: () => setActiveTab(id),
                className: `flex-1 py-4 flex flex-col items-center gap-1 transition-colors ${
                  activeTab === id
                    ? "text-primary font-bold"
                    : "text-subtle hover:text-primary"
                }`,
              },
              React.createElement(Icon, {
                size: 24,
                className: activeTab === id ? "transform -translate-y-0.5" : "",
              }),
              React.createElement(
                "span",
                {
                  className: "text-xs tracking-wide",
                },
                label,
              ),
            ),
          ),
        ),
      ),
    );
  };

  // === 5. 可折疊區塊 (CollapsibleSection) ===
  const CollapsibleSection = ({
    title,
    icon: Icon,
    defaultOpen = true,
    children,
    className = "",
  }) => {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);
    const { ChevronDown } = window.TripShared.Icons;

    return React.createElement(
      "div",
      { className: `mb-8 ${className}` },
      // 標題按鈕
      React.createElement(
        "button",
        {
          onClick: () => setIsOpen(!isOpen),
          className:
            "w-full text-base font-bold text-gray-800 mb-4 flex items-center justify-between gap-2 group",
        },
        React.createElement(
          "div",
          { className: "flex items-center gap-2" },
          Icon &&
            React.createElement(Icon, { className: "text-accent", size: 18 }),
          title,
        ),
        React.createElement(ChevronDown, {
          size: 20,
          className: `text-gray-400 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`,
        }),
      ),
      // 可折疊內容
      React.createElement(
        "div",
        {
          className: `transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
          }`,
        },
        children,
      ),
    );
  };

  // === 6. 活動項目 (ActivityItem) ===
  const ActivityItem = ({ activity, onOpenRoute, onOpenFoodGuide }) => {
    const { Info, Train, Bus, MapPin, Utensils } = window.TripShared.Icons;

    // 輔助函數：清理查詢字串
    const cleanQuery = (text) => {
      let cleaned = text.replace(
        /[\u{1F600}-\u{1F6FF}|[\u{1F300}-\u{1F5FF}|[\u{1F680}-\u{1F6FF}|[\u{1F700}-\u{1F77F}|[\u{1F780}-\u{1F7FF}|[\u{1F800}-\u{1F8FF}|[\u{1F900}-\u{1F9FF}|[\u{1FA00}-\u{1FA6F}|[\u{1FA70}-\u{1FAFF}]/gu,
        "",
      );
      cleaned = cleaned.replace(/搭乘|移動|前往|抵達|入住|晚餐|午餐|參拜/g, "");
      cleaned = cleaned.replace(/[：:()（）]/g, " ");
      return cleaned.trim();
    };

    const hasExplicitMap = !!activity.map;
    const hasArrow = activity.text.includes("→");
    const isRoute = hasExplicitMap ? activity.map.type === "route" : hasArrow;

    // 判斷交通工具類型
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

    return React.createElement(
      "div",
      { className: "group/item" },
      React.createElement(
        "div",
        { className: "flex items-start gap-4" },
        // 時間標籤
        React.createElement(
          "span",
          {
            className:
              "text-xs font-bold text-primary/70 min-w-[3rem] font-mono leading-6",
          },
          activity.time,
        ),
        React.createElement(
          "div",
          { className: "flex-1 min-w-0" },
          // 主標題行
          React.createElement(
            "div",
            { className: "flex items-center justify-between gap-2" },
            React.createElement(
              "div",
              { className: "text-gray-800 font-bold text-sm leading-6 flex-1" },
              activity.text,
            ),
            // 地圖/交通圖示按鈕
            (hasExplicitMap || hasArrow) &&
              React.createElement(
                "button",
                {
                  onClick: handleMapClick,
                  className:
                    "flex-shrink-0 transition-all cursor-pointer hover:scale-110 text-accent w-6 h-6 flex items-center justify-center",
                  title: isRoute ? "查看交通路線" : "查看地點",
                },
                isRoute
                  ? React.createElement(TransportIcon, { size: 16 })
                  : React.createElement(MapPin, { size: 16 }),
              ),
            // 美食指南連結圖示
            activity.foodGuideLink &&
              !hasExplicitMap &&
              !hasArrow &&
              onOpenFoodGuide &&
              React.createElement(
                "button",
                {
                  onClick: (e) => {
                    e.stopPropagation();
                    onOpenFoodGuide();
                  },
                  className:
                    "flex-shrink-0 text-accent transition-all cursor-pointer hover:scale-110 w-6 h-6 flex items-center justify-center",
                  title: `查看「${activity.foodGuideLink}」美食選項`,
                },
                React.createElement(Utensils, { size: 16 }),
              ),
          ),
          // 副標題
          activity.subText &&
            React.createElement(
              "div",
              { className: "text-xs text-gray-500 mt-0.5 font-medium" },
              activity.subText,
            ),
          // 警告提示
          activity.tips &&
            React.createElement(
              "div",
              {
                className:
                  "mt-2 text-xs text-orange-700 bg-orange-50 border border-orange-100 px-3 py-1.5 rounded-lg inline-block leading-relaxed",
              },
              React.createElement(
                "span",
                { className: "font-bold mr-1" },
                "⚠️",
              ),
              " ",
              activity.tips,
            ),
          // 資訊提示
          activity.note &&
            React.createElement(
              "div",
              {
                className:
                  "mt-1 text-xs text-primary/70 flex items-start gap-1 leading-relaxed",
              },
              React.createElement(Info, {
                size: 12,
                className: "mt-0.5 shrink-0",
              }),
              " ",
              activity.note,
            ),
        ),
      ),
    );
  };

  // === 7. MapModal (地圖彈窗) ===
  const MapModal = ({ isOpen, onClose, data }) => {
    const { Train, MapPin, ExternalLink, X } = window.TripShared.Icons;

    if (!isOpen || !data) return null;

    let mapUrl = "";
    let externalMapUrl = "";
    let title = data.name || data.query;

    if (data.type === "route") {
      mapUrl = `https://maps.google.com/maps?saddr=${encodeURIComponent(
        data.origin,
      )}&daddr=${encodeURIComponent(data.destination)}&dirflg=r&output=embed`;
      externalMapUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
        data.origin,
      )}&destination=${encodeURIComponent(data.destination)}&travelmode=transit`;
    } else {
      mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
        data.query,
      )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      externalMapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        data.query,
      )}`;
    }

    return React.createElement(
      "div",
      {
        className:
          "fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in",
      },
      React.createElement(
        "div",
        {
          className:
            "bg-white w-full max-w-3xl h-[80vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative",
        },
        // Header
        React.createElement(
          "div",
          {
            className:
              "bg-primary p-4 flex items-center justify-between text-white shrink-0",
          },
          React.createElement(
            "div",
            { className: "flex items-center gap-2 flex-1 min-w-0" },
            data.type === "route"
              ? React.createElement(Train, { size: 22 })
              : React.createElement(MapPin, { size: 22 }),
            React.createElement(
              "h3",
              { className: "font-bold text-lg truncate" },
              title,
            ),
          ),
          React.createElement(
            "button",
            {
              onClick: onClose,
              className:
                "ml-4 w-10 h-10 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full transition-colors text-2xl font-bold flex-shrink-0",
            },
            "✕",
          ),
        ),
        // Map iframe
        React.createElement(
          "div",
          { className: "flex-1 bg-gray-100 relative" },
          React.createElement("iframe", {
            width: "100%",
            height: "100%",
            frameBorder: "0",
            scrolling: "no",
            marginHeight: "0",
            marginWidth: "0",
            src: mapUrl,
            title: title,
            className: "w-full h-full",
          }),
        ),
        // Footer
        React.createElement(
          "div",
          {
            className:
              "p-4 bg-white border-t border-gray-100 flex justify-between items-center shrink-0",
          },
          React.createElement(
            "span",
            { className: "text-xs text-gray-400" },
            "* 預覽地圖可能因 Google 政策偶有載入限制",
          ),
          React.createElement(
            "a",
            {
              href: externalMapUrl,
              target: "_blank",
              rel: "noopener noreferrer",
              className:
                "flex items-center gap-2 px-4 py-2 bg-primary/5 text-primary rounded-lg hover:bg-primary/10 font-medium transition-colors text-sm",
            },
            "在 Google Maps App 開啟 ",
            React.createElement(ExternalLink, { size: 14 }),
          ),
        ),
      ),
    );
  };

  // === 8. FAB 浮動按鈕 ===
  const FAB = ({ icon: Icon, onClick, tooltip, className = "" }) => {
    return React.createElement(
      "button",
      {
        onClick: onClick,
        className: `p-3 rounded-full bg-white/70 backdrop-blur-md text-primary shadow-xl border border-white/50 hover:bg-white hover:text-primary transition-all duration-300 group relative ${className}`,
      },
      React.createElement(Icon, { size: 24 }),
      tooltip &&
        React.createElement(
          "span",
          {
            className:
              "absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur text-white text-xs font-bold py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none",
          },
          tooltip,
        ),
    );
  };

  // === 9. PhaseHeader (階段標題) ===
  const PhaseHeader = ({ title, isExpanded, onToggle, stickyTop = "52px" }) => {
    const { ChevronUp, ChevronDown } = window.TripShared.Icons;

    return React.createElement(
      "button",
      {
        onClick: onToggle,
        className: `sticky z-30 w-full bg-gray-50/95 backdrop-blur py-3 md:py-4 cursor-pointer text-left focus:outline-none group`,
        style: { top: stickyTop },
      },
      React.createElement(
        "h2",
        {
          className:
            "text-base md:text-xl font-bold text-gray-600 flex items-center gap-2",
        },
        React.createElement("span", {
          className: "w-1 h-6 md:h-8 bg-accent rounded-full",
        }),
        title,
        React.createElement(
          "span",
          {
            className:
              "ml-auto text-gray-400 group-hover:text-primary transition-colors",
          },
          isExpanded
            ? React.createElement(ChevronUp, { size: 18 })
            : React.createElement(ChevronDown, { size: 18 }),
        ),
      ),
    );
  };

  // 導出到全域（但元件定義保持在 IIFE 內部）
  if (typeof window !== "undefined") {
    window.TripShared = window.TripShared || {};
    window.TripShared.components = {
      BackButton,
      PageHeader,
      SectionCard,
      TabNavigation,
      CollapsibleSection,
      ActivityItem,
      MapModal,
      FAB,
      PhaseHeader,
    };
  }
})();
