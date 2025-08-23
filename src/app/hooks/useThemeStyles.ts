import { useTheme } from "../contexts/ThemeContext";

export const useThemeStyles = () => {
  const { currentTheme } = useTheme();

  const getCardGradient = () => {
    switch (currentTheme) {
      case "light":
        return "bg-gradient-to-br from-white/80 via-blue-50/40 to-white/80";
      case "water":
        return "bg-gradient-to-br from-blue-900/80 via-cyan-600/40 to-blue-900/80";
      case "sunset":
        return "bg-gradient-to-br from-orange-500/80 via-pink-500/40 to-orange-500/80";
      case "forest":
        return "bg-gradient-to-br from-green-900/80 via-emerald-700/40 to-green-900/80";
      default: // dark
        return "bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80";
    }
  };

  const getHeaderGradient = () => {
    switch (currentTheme) {
      case "light":
        return "bg-gradient-to-r from-blue-500 to-blue-600";
      case "water":
        return "bg-gradient-to-r from-cyan-500 to-cyan-600";
      case "sunset":
        return "bg-gradient-to-r from-orange-500 to-pink-500";
      case "forest":
        return "bg-gradient-to-r from-emerald-500 to-emerald-600";
      default: // dark
        return "bg-gradient-to-r from-blue-500 to-purple-600";
    }
  };

  const getBorderColor = () => {
    switch (currentTheme) {
      case "light":
        return "border-blue-500/30";
      case "water":
        return "border-cyan-500/30";
      case "sunset":
        return "border-orange-500/30";
      case "forest":
        return "border-emerald-500/30";
      default: // dark
        return "border-blue-500/30";
    }
  };

  const getShadowColor = () => {
    switch (currentTheme) {
      case "light":
        return "shadow-blue-500/20";
      case "water":
        return "shadow-cyan-500/20";
      case "sunset":
        return "shadow-orange-500/20";
      case "forest":
        return "shadow-emerald-500/20";
      default: // dark
        return "shadow-blue-500/20";
    }
  };

  return {
    currentTheme,
    getCardGradient,
    getHeaderGradient,
    getBorderColor,
    getShadowColor,
  };
};
