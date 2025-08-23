"use client";
import React from "react";
import { motion } from "framer-motion";
import { Heart, Code, Coffee, Sparkles } from "lucide-react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-gradient-to-br from-gray-900/95 via-blue-900/40 to-gray-900/95 backdrop-blur-xl border-t border-blue-500/30 shadow-2xl shadow-blue-500/20 py-8 px-4 sm:px-6 overflow-hidden">
      {/* Floating Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
            style={{
              left: `${15 + i * 20}%`,
              top: `${20 + i * 15}%`,
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
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25"
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
                <span className="text-white font-bold text-lg">DA</span>
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
            <p className="text-gray-300 text-sm leading-relaxed">
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
            <h4 className="text-lg font-semibold text-white mb-4">
              Quick Links
            </h4>
            <div className="space-y-2">
              {["About", "Projects", "Skills", "Experience", "Contact"].map(
                (link, index) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {link}
                  </motion.a>
                )
              )}
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
            <h4 className="text-lg font-semibold text-white mb-4">
              Get In Touch
            </h4>
            <div className="space-y-3">
              <motion.a
                href="mailto:dinuka.ashan@example.com"
                className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
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
                dinuka.ashan@example.com
              </motion.a>
              <motion.a
                href="https://github.com/Dinukaawsh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
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
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                </svg>
                @Dinukaawsh
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/dinuka-ashan"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center md:justify-start gap-2 text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
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
                Dinuka Ashan
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Social Media Links */}
        <motion.div
          className="flex justify-center items-center gap-6 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          {[
            {
              href: "https://github.com/Dinukaawsh",
              icon: (
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.7.42.36.79 1.09.79 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
                </svg>
              ),
              label: "GitHub",
            },
            {
              href: "https://linkedin.com/in/dinuka-ashan",
              icon: (
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" />
                </svg>
              ),
              label: "LinkedIn",
            },
            {
              href: "mailto:dinuka.ashan@example.com",
              icon: (
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 13.065l-11.99-7.065v14h24v-14l-12.01 7.065zm11.99-9.065h-23.98l11.99 7.065 11.99-7.065z" />
                </svg>
              ),
              label: "Email",
            },
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.href}
              target={social.label === "Email" ? "_self" : "_blank"}
              rel={social.label === "Email" ? "" : "noopener noreferrer"}
              aria-label={social.label}
              className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-400 hover:text-white hover:from-blue-500/40 hover:to-purple-500/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
              whileHover={{
                y: -3,
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.8 + index * 0.1,
                type: "spring",
              }}
              viewport={{ once: true }}
            >
              {social.icon}
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

        {/* Copyright and Tagline */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          viewport={{ once: true }}
        >
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
