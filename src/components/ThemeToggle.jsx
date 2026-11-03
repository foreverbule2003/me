import React from "react";
import { useTheme } from "../hooks/useTheme";

// 通用深色／淺色切換鈕。className 用來配合各頁的按鈕樣式。
const ThemeToggle = ({ className = "" }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      title={isDark ? "切換為淺色主題" : "切換為深色主題"}
      aria-label={isDark ? "切換為淺色主題" : "切換為深色主題"}
      className={
        className ||
        "w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-all"
      }
    >
      <i className={`fas ${isDark ? "fa-sun" : "fa-moon"} text-sm`}></i>
    </button>
  );
};

export default ThemeToggle;
