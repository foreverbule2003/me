/**
 * 共用配置 - Shared Configuration
 * Tailwind CSS 配置和主題設定
 */

// Tailwind 配置物件
const tailwindConfig = {
  theme: {
    extend: {
      colors: {
        primary: "#0F2540", // Shimakaze Deep Blue
        accent: "#C5A059", // Champagne Gold
        dark: "#1C1C1E", // Elegant Black
        subtle: "#6E6E73", // Apple-like Grey
        surface: "#F5F5F0", // Washi Paper White
        star: "#D4AF37", // Gold
        love: "#C32F2F", // Deep Red
      },
      borderRadius: {
        "3xl": "24px",
        "4xl": "32px",
      },
      fontFamily: {
        display: ['"Noto Serif JP"', "serif"],
        body: ['"DM Sans"', "sans-serif"],
      },
    },
  },
};

// Google Fonts URL
const googleFontsUrl =
  "https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&family=Inter:wght@400;700;800;900&family=DM+Sans:wght@400;500;700&display=swap";

// CDN URLs
const cdnUrls = {
  tailwind: "https://cdn.tailwindcss.com",
  react: "https://unpkg.com/react@18/umd/react.production.min.js",
  reactDom: "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
  babel: "https://unpkg.com/@babel/standalone/babel.min.js",
};

// 導出配置
if (typeof window !== "undefined") {
  window.TripShared = window.TripShared || {};
  window.TripShared.config = {
    tailwindConfig,
    googleFontsUrl,
    cdnUrls,
  };
}
