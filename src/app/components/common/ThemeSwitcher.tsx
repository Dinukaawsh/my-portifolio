"use client";
import React, { useState } from "react";
import { useTheme, Theme } from "../../contexts/ThemeContext";
import { Moon, Sun, Waves, Sunset, Trees, type LucideIcon } from "lucide-react";

interface ThemeSwitcherProps {
  className?: string;
}

const themes: {
  key: Theme;
  name: string;
  icon: LucideIcon;
  gradient: string;
}[] = [
  {
    key: "dark",
    name: "Dark",
    icon: Moon,
    gradient: "from-gray-900 via-blue-900 to-gray-900",
  },
  {
    key: "light",
    name: "Light",
    icon: Sun,
    gradient: "from-white via-blue-50 to-white",
  },
  {
    key: "water",
    name: "Water",
    icon: Waves,
    gradient: "from-blue-900 via-cyan-600 to-blue-900",
  },
  {
    key: "sunset",
    name: "Sunset",
    icon: Sunset,
    gradient: "from-orange-500 via-pink-500 to-purple-600",
  },
  {
    key: "forest",
    name: "Forest",
    icon: Trees,
    gradient: "from-green-900 via-emerald-700 to-green-900",
  },
];

export default function ThemeSwitcher({ className = "" }: ThemeSwitcherProps) {
  const { currentTheme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
    setIsOpen(false);
  };

  const currentThemeData = themes.find((t) => t.key === currentTheme);

  return (
    <div className={`relative ${className}`}>
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-3 rounded-2xl backdrop-blur-xl border transition-all duration-300 hover:scale-105 group ${
          currentTheme === "light"
            ? "bg-gradient-to-br from-white/80 via-blue-50/40 to-white/80 border-blue-500/30 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30"
            : currentTheme === "water"
            ? "bg-gradient-to-br from-blue-900/80 via-cyan-600/40 to-blue-900/80 border-cyan-500/30 shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/30"
            : currentTheme === "sunset"
            ? "bg-gradient-to-br from-orange-500/80 via-pink-500/40 to-orange-500/80 border-orange-500/30 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30"
            : currentTheme === "forest"
            ? "bg-gradient-to-br from-green-900/80 via-emerald-700/40 to-green-900/80 border-emerald-500/30 shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30"
            : "bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 border-blue-500/30 shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30"
        }`}
        aria-label="Toggle theme switcher"
      >
        <div className="flex items-center gap-2">
          {currentThemeData?.icon &&
            React.createElement(currentThemeData.icon, {
              className: "w-5 h-5 text-white",
            })}
          <span className="hidden sm:block text-sm font-medium text-white">
            {currentThemeData?.name}
          </span>
          <svg
            className={`w-4 h-4 text-blue-300 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Active Theme Indicator */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse" />
      </button>

      {/* Theme Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div
            className={`absolute top-full right-0 mt-2 w-48 backdrop-blur-2xl border rounded-2xl shadow-2xl z-50 overflow-hidden ${
              currentTheme === "light"
                ? "bg-gradient-to-br from-white/98 via-blue-50/80 to-white/98 border-blue-500/50 shadow-blue-500/30"
                : currentTheme === "water"
                ? "bg-gradient-to-br from-blue-900/98 via-cyan-600/80 to-blue-900/98 border-cyan-500/50 shadow-cyan-500/30"
                : currentTheme === "sunset"
                ? "bg-gradient-to-br from-orange-500/98 via-pink-500/80 to-orange-500/98 border-orange-500/50 shadow-orange-500/30"
                : currentTheme === "forest"
                ? "bg-gradient-to-br from-green-900/98 via-emerald-700/80 to-green-900/98 border-emerald-500/50 shadow-emerald-500/30"
                : "bg-gradient-to-br from-gray-900/98 via-blue-900/80 to-gray-900/98 border-blue-500/50 shadow-blue-500/30"
            }`}
          >
            <div className="p-2">
              {themes.map((theme) => (
                <button
                  key={theme.key}
                  onClick={() => handleThemeChange(theme.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                    currentTheme === theme.key
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50"
                      : currentTheme === "light"
                      ? "text-gray-700 hover:text-gray-900 hover:bg-white/80 bg-white/60"
                      : "text-gray-300 hover:text-white hover:bg-white/20 bg-black/20"
                  }`}
                >
                  {React.createElement(theme.icon, {
                    className: "w-5 h-5 text-current",
                  })}
                  <span className="font-medium">{theme.name}</span>
                  {currentTheme === theme.key && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
