"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import ThemeSwitcher from "@/app/components/common/ThemeSwitcher";
import { useTheme, type Theme } from "@/app/contexts/ThemeContext";
import { NAV_SECTIONS, sectionKeyFromPath } from "@/lib/routes";

const THEME_STYLES: Record<
  Theme,
  { active: string; inactive: string; brand: string; mobilePanel: string }
> = {
  dark: {
    active:
      "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/40",
    inactive: "text-gray-300 hover:text-white hover:bg-white/10",
    brand: "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400",
    mobilePanel:
      "bg-gradient-to-b from-gray-900/98 to-slate-900/98 border-blue-500/30",
  },
  light: {
    active:
      "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30",
    inactive: "text-gray-700 hover:text-blue-700 hover:bg-blue-50",
    brand: "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800",
    mobilePanel:
      "bg-gradient-to-b from-white/98 to-blue-50/98 border-blue-400/40",
  },
  water: {
    active:
      "bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/40",
    inactive: "text-cyan-100 hover:text-white hover:bg-cyan-500/20",
    brand: "text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300",
    mobilePanel:
      "bg-gradient-to-b from-cyan-950/98 to-teal-900/98 border-cyan-500/30",
  },
  sunset: {
    active:
      "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/40",
    inactive: "text-orange-100 hover:text-white hover:bg-orange-500/20",
    brand: "text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-pink-300",
    mobilePanel:
      "bg-gradient-to-b from-orange-950/98 to-pink-900/98 border-orange-500/30",
  },
  forest: {
    active:
      "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg shadow-emerald-500/40",
    inactive: "text-green-100 hover:text-white hover:bg-emerald-500/20",
    brand: "text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-300",
    mobilePanel:
      "bg-gradient-to-b from-green-950/98 to-emerald-900/98 border-emerald-500/30",
  },
};

export default function Navbar() {
  const pathname = usePathname();
  const active = sectionKeyFromPath(pathname);
  const { currentTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const styles = THEME_STYLES[currentTheme];

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const linkClass = (key: string) =>
    `relative shrink-0 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
      active === key ? styles.active : styles.inactive
    }`;

  return (
    <nav
      data-site-nav
      className={`theme-navbar-${currentTheme} sticky top-0 z-50 w-full border-b backdrop-blur-xl shadow-2xl shadow-blue-500/10`}
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        {/* Desktop & tablet landscape */}
        <div className="hidden md:flex items-center justify-between gap-3 w-full">
          <Link
            href="/about"
            className={`shrink-0 text-sm lg:text-base font-bold ${styles.brand}`}
          >
            Dinuka Ashan
          </Link>

          <div className="flex flex-1 items-center justify-center gap-1 min-w-0 overflow-x-auto px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {NAV_SECTIONS.map((section) => (
              <Link
                key={section.key}
                href={section.path}
                className={linkClass(section.key)}
              >
                {section.label}
              </Link>
            ))}
          </div>

          <div className="shrink-0 ml-2">
            <ThemeSwitcher />
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden relative">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/about"
              className={`text-lg font-bold ${styles.brand}`}
              onClick={() => setIsMenuOpen(false)}
            >
              DA
            </Link>

            <div className="flex items-center gap-2">
              <ThemeSwitcher />
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                className={`p-3 rounded-xl transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 ${styles.inactive}`}
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <>
                <motion.button
                  type="button"
                  className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                  aria-label="Close menu"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsMenuOpen(false)}
                />

                <motion.div
                  className={`absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border shadow-2xl ${styles.mobilePanel} max-h-[min(80vh,28rem)] overflow-y-auto`}
                  initial={{ opacity: 0, y: -12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="p-3 flex flex-col gap-1">
                    {NAV_SECTIONS.map((section, index) => (
                      <motion.div
                        key={section.key}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.04 }}
                      >
                        <Link
                          href={section.path}
                          className={`${linkClass(section.key)} block w-full text-left px-5 py-3.5`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {section.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </nav>
  );
}
