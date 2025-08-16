"use client";
import { useState } from "react";
import ThemeSwitcher from "@/app/components/common/ThemeSwitcher";

interface NavbarProps {
  active: string;
  setActiveSection: (key: string) => void;
}

const sections = [
  { key: "about", label: "About" },
  { key: "projects", label: "Projects" },
  { key: "skills", label: "Skills" },
  { key: "education", label: "Education" },
  { key: "blog", label: "Blog" },
  { key: "experience", label: "Experience" },
  { key: "contact", label: "Contact" },
];

export default function Navbar({ active, setActiveSection }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSectionClick = (key: string) => {
    setActiveSection(key);
    setIsMenuOpen(false); // Close menu when section is selected
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900/95 via-blue-900/95 to-gray-900/95 backdrop-blur-xl border-b border-blue-500/30 shadow-2xl shadow-blue-500/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Left side - Navigation */}
          <div className="flex items-center gap-1">
            {sections.map((section) => (
              <button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`relative px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                  active === section.key
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50 transform scale-105"
                    : "text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105"
                }`}
              >
                {section.label}
                {active === section.key && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </div>

          {/* Right side - Theme Switcher */}
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">DA</span>
            </div>
            <div className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Dinuka Ashan
            </div>
          </div>

          {/* Theme Switcher - Mobile */}
          <div className="md:hidden">
            <ThemeSwitcher />
          </div>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
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

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <div
              className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <div className="md:hidden absolute top-full left-0 right-0 mt-2 bg-gradient-to-b from-gray-900/95 to-gray-900/98 backdrop-blur-xl border border-blue-500/30 rounded-2xl shadow-2xl shadow-blue-500/20 z-50 overflow-hidden">
              <div className="p-4">
                <div className="flex flex-col gap-2">
                  {sections.map((section) => (
                    <button
                      key={section.key}
                      onClick={() => handleSectionClick(section.key)}
                      className={`relative px-6 py-4 text-left rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                        active === section.key
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50 transform scale-105"
                          : "text-gray-300 hover:text-white hover:bg-white/10 hover:scale-105"
                      }`}
                    >
                      {section.label}
                      {active === section.key && (
                        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
