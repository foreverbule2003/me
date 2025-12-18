/**
 * 共用 React 元件 - Shared React Components
 * 提供可重用的 UI 元件給所有旅程頁面
 * 
 * 需要先引入：
 * - React (from CDN)
 * - icons.js (圖示系統)
 */

(function() {
  "use strict";

  // === 1. 返回首頁按鈕 ===
  const BackButton = ({ href = "../../index.html?booted=true#booted" }) => {
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
        className:
          "rotate-180 group-hover:-translate-x-1 transition-transform",
      })
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
        className:
          "relative w-full py-32 px-6 text-white overflow-hidden",
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
              badge
            )
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
              subtitle
            )
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
                React.createElement("span", null, tag.text)
              )
            )
          ),

        // 自定義內容
        children
      )
    );
  };

  // === 3. Section 卡片容器 ===
  const SectionCard = ({
    icon: Icon,
    title,
    children,
    className = "",
  }) => {
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
            React.createElement(Icon, { size: 24 })
          ),
        React.createElement(
          "h2",
          {
            className: "text-2xl font-bold text-gray-800",
          },
          title
        )
      ),
      // 內容
      children
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
                className:
                  activeTab === id ? "transform -translate-y-0.5" : "",
              }),
              React.createElement(
                "span",
                {
                  className: "text-xs tracking-wide",
                },
                label
              )
            )
          )
        )
      )
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
    };
  }
})();
