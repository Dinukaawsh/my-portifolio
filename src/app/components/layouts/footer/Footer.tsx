"use client";
import React from "react";
import { motion } from "framer-motion";
import { Heart, Code, Coffee, Sparkles } from "lucide-react";
import { aboutContent } from "@/app/components/content/about";
import Image from "next/image";
import Threads from "@/app/components/backgrounds/footer_backgound/footer_background";
import { useTheme } from "@/app/contexts/ThemeContext";

interface FooterProps {
  setActiveSection?: (key: string) => void;
}

const Footer: React.FC<FooterProps> = ({ setActiveSection }) => {
  const { currentTheme } = useTheme();
  const currentYear = new Date().getFullYear();

  // Theme-aware colors for lightning effects
  const lightningColors = {
    light: {
      primary: "#3B82F6", // blue-500
      secondary: "#1D4ED8", // blue-700
      glow: "rgba(59, 130, 246, 0.1)", // blue-500 with opacity
    },
    dark: {
      primary: "#00BFFF", // deep sky blue
      secondary: "#1E90FF", // dodger blue
      glow: "rgba(0, 191, 255, 0.1)", // deep sky blue with opacity
    },
    water: {
      primary: "#00CED1", // dark turquoise
      secondary: "#20B2AA", // light sea green
      glow: "rgba(0, 206, 209, 0.1)", // dark turquoise with opacity
    },
    sunset: {
      primary: "#FF6347", // tomato
      secondary: "#FF4500", // orange red
      glow: "rgba(255, 99, 71, 0.1)", // tomato with opacity
    },
    forest: {
      primary: "#32CD32", // lime green
      secondary: "#228B22", // forest green
      glow: "rgba(50, 205, 50, 0.1)", // lime green with opacity
    },
  };

  const currentColors = lightningColors[currentTheme];

  // Theme-aware text colors
  const textColors = {
    light: {
      primary: "text-gray-700",
      secondary: "text-gray-600",
      hover: "hover:text-blue-600",
      link: "text-gray-600",
    },
    dark: {
      primary: "text-white",
      secondary: "text-gray-300",
      hover: "hover:text-blue-400",
      link: "text-gray-300",
    },
    water: {
      primary: "text-white",
      secondary: "text-cyan-200",
      hover: "hover:text-cyan-300",
      link: "text-cyan-200",
    },
    sunset: {
      primary: "text-white",
      secondary: "text-orange-200",
      hover: "hover:text-orange-300",
      link: "text-orange-200",
    },
    forest: {
      primary: "text-white",
      secondary: "text-green-200",
      hover: "hover:text-green-300",
      link: "text-green-200",
    },
  };

  const currentTextColors = textColors[currentTheme];

  const sections = [
    { key: "about", label: "About" },
    { key: "projects", label: "Projects" },
    { key: "skills", label: "Skills" },
    { key: "education", label: "Education" },
    { key: "experience", label: "Experience" },
    { key: "certificates", label: "Certificates" },
    { key: "achievements", label: "Achievements" },
    { key: "blog", label: "Blog" },
    { key: "contact", label: "Contact" },
  ];

  const handleSectionClick = (key: string) => {
    if (setActiveSection) {
      setActiveSection(key);
    }
  };

  return (
    <footer
      className="relative w-full backdrop-blur-xl border-t border-blue-500/30 shadow-2xl shadow-blue-500/20 py-8 px-4 sm:px-6 overflow-hidden"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.95)" }}
    >
      {/* Lightning Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Lightning Bolts */}
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={`lightning-${i}`}
            className="absolute"
            style={{
              left: `${20 + i * 20}%`,
              top: `${10 + i * 15}%`,
              width: "2px",
              height: "200px",
              background: `linear-gradient(to bottom, transparent, ${currentColors.primary}, ${currentColors.secondary}, transparent)`,
              opacity: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0, 1, 0],
              boxShadow: [
                `0 0 0px ${currentColors.primary}`,
                `0 0 20px ${currentColors.primary}, 0 0 40px ${currentColors.secondary}`,
                `0 0 0px ${currentColors.primary}`,
              ],
            }}
            transition={{
              duration: 0.8,
              delay: i * 2,
              repeat: Infinity,
              repeatDelay: 3 + Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Lightning Flashes */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`flash-${i}`}
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle, ${currentColors.glow} 0%, transparent 70%)`,
              opacity: 0,
            }}
            animate={{
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 0.3,
              delay: i * 2.5,
              repeat: Infinity,
              repeatDelay: 4 + Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Electric Sparks */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={`spark-${i}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: currentColors.primary,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              boxShadow: [
                `0 0 0px ${currentColors.primary}`,
                `0 0 10px ${currentColors.primary}, 0 0 20px ${currentColors.secondary}`,
                `0 0 0px ${currentColors.primary}`,
              ],
            }}
            transition={{
              duration: 0.5,
              delay: Math.random() * 3,
              repeat: Infinity,
              repeatDelay: 2 + Math.random() * 4,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Threads Background */}
      <div
        style={{
          width: "100%",
          height: "600px",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      >
        <Threads amplitude={1} distance={0} enableMouseInteraction={false} />
      </div>

      {/* Floating Background Particles */}
      <div className="absolute inset-0 pointer-events-none z-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + i * 15}%`,
              backgroundColor: `${currentColors.primary}30`,
            }}
            animate={{
              y: [0, -40, -80, -120],
              x: [0, Math.random() * 30 - 15],
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1, 1.2, 0],
            }}
            transition={{
              duration: 12 + i * 2,
              delay: i * 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="flex items-center justify-center md:justify-start gap-3 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-10 h-10 rounded-full overflow-hidden shadow-lg shadow-blue-500/25 border-2 border-blue-500/30"
                animate={{
                  rotate: [0, 2, -2, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/about-images/my.jpg"
                  alt="Dinuka Wickramarathna"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                  priority
                />
              </motion.div>
              <motion.h3
                className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Dinuka Ashan
              </motion.h3>
            </motion.div>
            <p
              className={`${currentTextColors.secondary} text-sm leading-relaxed`}
            >
              Passionate software engineer crafting digital experiences with
              modern technologies. Building the future, one line of code at a
              time.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4
              className={`text-lg font-semibold ${currentTextColors.primary} mb-4`}
            >
              Quick Links
            </h4>
            <div className="space-y-2">
              {sections.map((section, index) => (
                <motion.button
                  key={section.key}
                  onClick={() => handleSectionClick(section.key)}
                  className={`block ${currentTextColors.link} ${currentTextColors.hover} transition-colors duration-300 text-sm text-left w-full`}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {section.label}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4
              className={`text-lg font-semibold ${currentTextColors.primary} mb-4`}
            >
              Get In Touch
            </h4>
            <div className="space-y-3">
              <motion.a
                href={`mailto:${aboutContent.personal.email}`}
                className={`flex items-center justify-center md:justify-start gap-2 ${currentTextColors.link} ${currentTextColors.hover} transition-colors duration-300 text-sm`}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="flex-shrink-0"
                >
                  <path d="M12 13.065l-11.99-7.065v14h24v-14l-12.01 7.065zm11.99-9.065h-23.98l11.99 7.065 11.99-7.065z" />
                </svg>
                {aboutContent.personal.email}
              </motion.a>
              <motion.a
                href={`https://github.com/${aboutContent.socialLinks
                  .find((s) => s.label === "GitHub")
                  ?.href.split("/")
                  .pop()}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center md:justify-start gap-2 ${currentTextColors.link} ${currentTextColors.hover} transition-colors duration-300 text-sm`}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="flex-shrink-0"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                @Dinukaawsh
              </motion.a>
              <motion.a
                href={
                  aboutContent.socialLinks.find((s) => s.label === "LinkedIn")
                    ?.href
                }
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center md:justify-start gap-2 ${currentTextColors.link} ${currentTextColors.hover} transition-colors duration-300 text-sm`}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="flex-shrink-0"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" />
                </svg>
                {aboutContent.personal.name}
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Enhanced Social Media Links - Same Design as About Page */}
        <motion.div
          className="flex justify-center items-center gap-4 sm:gap-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {aboutContent.socialLinks.map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-full bg-white/10 border border-white/20"
              aria-label={social.label}
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.8 + index * 0.1,
                type: "spring",
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.2,
                rotate: 360,
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
              }}
              whileTap={{ scale: 0.9 }}
              viewport={{ once: true }}
            >
              <svg
                className={`w-5 h-5 sm:w-6 sm:h-6 text-gray-300 ${social.color} transition-colors duration-200`}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d={social.icon} />
              </svg>
            </motion.a>
          ))}
        </motion.div>

        {/* Divider */}
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent mb-6"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          viewport={{ once: true }}
        />

        {/* Copyright, Policy Links and Tagline */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
        >
          {/* Policy Links */}
          <div className="mb-3">
            <a
              href="/privacy"
              className={`text-xs ${currentTextColors.link} ${currentTextColors.hover}`}
            >
              Privacy Policy
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 mb-2">
            <motion.div
              className="flex items-center gap-2 text-gray-300"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Code className="w-4 h-4 text-blue-400" />
              <span className="text-sm">
                &copy; {currentYear} DINUKA ASHAN WICKRAMARATHNA
              </span>
              <Code className="w-4 h-4 text-blue-400" />
            </motion.div>
          </div>

          <motion.div
            className="flex items-center justify-center gap-2 text-xs text-gray-400"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Coffee className="w-3 h-3" />
            <span>&quot;Building dreams, one line of code at a time&quot;</span>
            <Heart className="w-3 h-3 text-red-400" />
          </motion.div>

          {/* Made with Love */}
          <motion.div
            className="mt-3 flex items-center justify-center gap-2 text-xs text-gray-500"
            animate={{
              y: [0, -2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span>Made with</span>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-3 h-3 text-red-500" />
            </motion.div>
            <span>and</span>
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Coffee className="w-3 h-3 text-amber-500" />
            </motion.div>
            <span>using Next.js</span>
            <Sparkles className="w-3 h-3 text-blue-400" />
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
