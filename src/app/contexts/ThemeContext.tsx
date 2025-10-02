"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";

export type Theme = "dark" | "light" | "water" | "sunset" | "forest";

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
  applyTheme: (theme: Theme) => void;
  resetToDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>("dark");
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  const updateNavbarTheme = useCallback(
    (theme: Theme) => {
      if (!isClient) return;

      const navbar = document.querySelector("nav");
      if (navbar) {
        // Remove existing theme classes
        navbar.classList.remove(
          "theme-navbar-dark",
          "theme-navbar-light",
          "theme-navbar-water",
          "theme-navbar-sunset",
          "theme-navbar-forest"
        );

        // Add new theme class
        navbar.classList.add(`theme-navbar-${theme}`);
      }
    },
    [isClient]
  );

  const updatePageThemes = useCallback(
    (theme: Theme) => {
      if (!isClient) return;

      // First, remove all existing theme classes from the document
      const allElements = document.querySelectorAll("*");

      allElements.forEach((element) => {
        const classes = element.className;
        if (typeof classes === "string" && classes.includes("theme-")) {
          // Remove all theme-related classes
          const newClasses = classes
            .replace(/\btheme-[a-z-]+\b/g, "") // Remove theme-* classes
            .replace(/\bfrom-[a-z]+-[0-9]+(\/[0-9]+)?\b/g, "") // Remove from-* classes
            .replace(/\bvia-[a-z]+-[0-9]+(\/[0-9]+)?\b/g, "") // Remove via-* classes
            .replace(/\bto-[a-z]+-[0-9]+(\/[0-9]+)?\b/g, "") // Remove to-* classes
            .replace(/\bbg-gradient-to-[a-z]+\b/g, "") // Remove bg-gradient-* classes
            .trim();

          element.className = newClasses;
        }
      });

      // Now apply the new theme to the document body
      document.body.className = document.body.className
        .replace(/\btheme-[a-z-]+\b/g, "")
        .trim();

      document.body.classList.add(`theme-${theme}`);

      // Apply theme to specific elements that need gradient backgrounds
      const applyGradientToElements = () => {
        // Find elements that should have gradient backgrounds
        const cardElements = document.querySelectorAll(
          '[class*="card"], [class*="Card"], .bg-gradient-to-br'
        );
        const headerElements = document.querySelectorAll(
          '[class*="header"], [class*="Header"], .bg-gradient-to-r'
        );

        // Apply card gradients
        cardElements.forEach((element) => {
          if (element instanceof HTMLElement) {
            element.classList.add("bg-gradient-to-br");
            switch (theme) {
              case "light":
                element.classList.add(
                  "from-white/80",
                  "via-blue-50/40",
                  "to-white/80"
                );
                break;
              case "water":
                element.classList.add(
                  "from-blue-900/80",
                  "via-cyan-600/40",
                  "to-blue-900/80"
                );
                break;
              case "sunset":
                element.classList.add(
                  "from-orange-500/80",
                  "via-pink-500/40",
                  "to-orange-500/80"
                );
                break;
              case "forest":
                element.classList.add(
                  "from-green-900/80",
                  "via-emerald-700/40",
                  "to-green-900/80"
                );
                break;
              default: // dark
                element.classList.add(
                  "from-gray-900/80",
                  "via-blue-900/40",
                  "to-gray-900/80"
                );
                break;
            }
          }
        });

        // Apply header gradients
        headerElements.forEach((element) => {
          if (element instanceof HTMLElement) {
            element.classList.add("bg-gradient-to-r");
            switch (theme) {
              case "light":
                element.classList.add("from-blue-500", "to-blue-600");
                break;
              case "water":
                element.classList.add("from-cyan-500", "to-cyan-600");
                break;
              case "sunset":
                element.classList.add("from-orange-500", "to-pink-500");
                break;
              case "forest":
                element.classList.add("from-emerald-500", "to-emerald-600");
                break;
              default: // dark
                element.classList.add("from-blue-500", "to-purple-600");
                break;
            }
          }
        });
      };

      // Apply gradients immediately
      applyGradientToElements();

      // Also apply gradients after a short delay to catch dynamically added elements
      setTimeout(applyGradientToElements, 100);
    },
    [isClient]
  );

  const applyTheme = useCallback(
    (theme: Theme) => {
      // Update navbar theme
      updateNavbarTheme(theme);

      // Update page backgrounds based on theme
      updatePageThemes(theme);

      // Save theme to localStorage
      if (isClient) {
        localStorage.setItem("portfolio-theme", theme);
      }
    },
    [isClient, updateNavbarTheme, updatePageThemes]
  );

  const setTheme = (theme: Theme) => {
    setCurrentTheme(theme);
    applyTheme(theme);
  };

  const resetToDarkMode = () => {
    setCurrentTheme("dark");
    applyTheme("dark");
    if (isClient) {
      localStorage.setItem("portfolio-theme", "dark");
    }
  };

  // Set client flag to prevent hydration mismatches
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Always start with dark mode on app load (ignore localStorage)
  useEffect(() => {
    if (!isClient) return;

    // Force dark mode as default for entire application
    setCurrentTheme("dark");
    applyTheme("dark");
  }, [isClient, applyTheme]);

  // Apply theme when currentTheme changes
  useEffect(() => {
    if (currentTheme && isClient) {
      applyTheme(currentTheme);
    }
  }, [currentTheme, isClient, applyTheme]);

  // Apply theme on route change (for Next.js navigation)
  useEffect(() => {
    if (!isClient) return;

    // Small delay to ensure DOM is ready after route change
    const timer = setTimeout(() => {
      applyTheme(currentTheme);
    }, 100);

    return () => clearTimeout(timer);
  }, [pathname, currentTheme, isClient, applyTheme]);

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    applyTheme,
    resetToDarkMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
