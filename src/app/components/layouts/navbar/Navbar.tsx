"use client";
import { useState } from "react";
import ThemeSwitcher from "@/app/components/common/ThemeSwitcher";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

interface NavbarProps {
  active: string;
  setActiveSection: (key: string) => void;
}

const sections = [
  { key: "about", label: "About" },
  { key: "projects", label: "Projects" },
  { key: "skills", label: "Skills" },
  { key: "education", label: "Education" },
  { key: "experience", label: "Experience" },
  { key: "certificates", label: "Certificates" },
  { key: "achievements", label: "Achievements" },
  // { key: "references", label: "References" },
  { key: "blog", label: "Blog" },
  // { key: "publications", label: "Publications" },
  { key: "contact", label: "Contact" },
];

export default function Navbar({ active, setActiveSection }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(17, 24, 39, 0.95)", "rgba(17, 24, 39, 0.98)"]
  );
  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ["blur(16px)", "blur(24px)"]
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSectionClick = (key: string) => {
    setActiveSection(key);
    setIsMenuOpen(false); // Close menu when section is selected
  };

  return (
    <motion.nav
      className="sticky top-0 z-50 border-b border-blue-500/30 shadow-2xl shadow-blue-500/20"
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: "50%",
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              delay: i * 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between w-full">
          {/* Left side - Navigation */}
          <div className="flex items-center gap-1 flex-1">
            {sections.map((section) => (
              <motion.button
                key={section.key}
                onClick={() => setActiveSection(section.key)}
                className={`relative px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                  active === section.key
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50"
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {section.label}
                {active === section.key && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-blue-400 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, type: "spring" }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right side - Theme Switcher */}
          <div className="flex items-center gap-4 ml-8">
            <ThemeSwitcher />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center justify-between">
          {/* Logo/Brand */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
              animate={{
                rotate: [0, 1, -1, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-white font-bold text-sm">DA</span>
            </motion.div>
            <div className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Dinuka Ashan
            </div>
          </motion.div>

          {/* Theme Switcher - Mobile */}
          <div className="md:hidden">
            <ThemeSwitcher />
          </div>

          {/* Hamburger Button */}
          <motion.button
            onClick={toggleMenu}
            className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
            transition={{ duration: 0.2 }}
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
          </motion.button>
        </div>

        {/* Enhanced Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <>
              {/* Animated Backdrop */}
              <motion.div
                className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                onClick={() => setIsMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Animated Mobile Menu */}
              <motion.div
                className="md:hidden absolute top-full left-0 right-0 mt-2 bg-gradient-to-b from-gray-900/95 to-gray-900/98 backdrop-blur-xl border border-blue-500/30 rounded-2xl shadow-2xl shadow-blue-500/20 z-50 max-h-[80vh] overflow-y-auto"
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, type: "spring" }}
              >
                <div className="p-4">
                  <div className="flex flex-col gap-2 min-h-fit">
                    {sections.map((section, index) => (
                      <motion.button
                        key={section.key}
                        onClick={() => handleSectionClick(section.key)}
                        className={`relative px-6 py-4 text-left rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-shrink-0 ${
                          active === section.key
                            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/50"
                            : "text-gray-300 hover:text-white hover:bg-white/10"
                        }`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.05,
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {section.label}
                        {active === section.key && (
                          <motion.div
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-blue-400 rounded-full"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.2 }}
                          />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
