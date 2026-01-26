"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
//import TrueFocus from "@/app/components/backgrounds/focus text/text";

interface AboutContent {
  achievement: { text: string };
  personal: {
    name: string;
    description: string;
    location: string;
    email: string;
  };
  quote?: { text: string; author?: string };
  codeBlock: { filename: string };
  socialLinks: Array<{
    label: string;
    href: string;
    icon: string;
    color: string;
  }>;
}

interface MainProfileCardProps {
  showCard: boolean;
  profileImages: string[];
  currentImageIndex: number;
  aboutContent: AboutContent;
  displayed: string;
  roles: string[];
  roleIndex: number;
  skills: string[];
  openCvPreview: () => void;
  enableCvButton?: boolean;
}

export default function MainProfileCard(props: MainProfileCardProps) {
  const {
    showCard,
    profileImages,
    currentImageIndex,
    aboutContent,
    displayed,
    roles,
    roleIndex,
    skills,
    openCvPreview,
    enableCvButton = true, // Default to true if not provided
  } = props;

  return (
    <motion.div
      className="relative z-10 w-full max-w-lg sm:max-w-xl lg:max-w-md xl:max-w-lg mx-auto lg:mx-0 p-4 sm:p-6 lg:p-6 xl:p-8 rounded-3xl shadow-2xl border border-blue-500/30 bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 backdrop-blur-xl flex flex-col items-center lg:items-start text-center lg:text-left"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={showCard ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0,0,0,0.4)" }}
      tabIndex={0}
      aria-label="About Dinuka Ashan"
    >
      {/* Profile Image */}
      <motion.div
        className="relative mb-4 sm:mb-6"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="relative"
          animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.02, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full shadow-lg border-4 border-blue-500 overflow-hidden"
          >
            <Image
              src={profileImages[currentImageIndex]}
              alt={`Dinuka Ashan profile ${currentImageIndex + 1}`}
              width={120}
              height={120}
              priority
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent"
            animate={{
              borderColor: [
                "rgba(59, 130, 246, 0.5)",
                "rgba(147, 51, 234, 0.8)",
                "rgba(59, 130, 246, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
        <motion.div
          className="absolute -top-8 -right-8 sm:-top-2 sm:-right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-1 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-lg z-10"
          animate={{
            y: [0, -3, 0],
            scale: [1, 1.05, 1],
            rotate: [0, 3, -3, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1, rotate: 180 }}
        >
          <span className="text-xs sm:text-sm">
            {aboutContent.achievement.text}
          </span>
        </motion.div>
      </motion.div>

      {/* Name and Title */}
      <div className="mb-2">
        <motion.span
          className="text-blue-300 italic font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl block"
          animate={{
            color: ["#60a5fa", "#a855f7", "#60a5fa"],
            textShadow: [
              "0 0 5px rgba(59, 130, 246, 0.3)",
              "0 0 15px rgba(147, 51, 234, 0.5)",
              "0 0 5px rgba(59, 130, 246, 0.3)",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          I am
        </motion.span>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-lg">
          <motion.span
            animate={{
              textShadow: [
                "0 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 255, 255, 0.1)",
                "0 2px 8px rgba(0, 0, 0, 0.7), 0 0 20px rgba(255, 255, 255, 0.2)",
                "0 2px 4px rgba(0, 0, 0, 0.5), 0 0 10px rgba(255, 255, 255, 0.1)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {aboutContent.personal.name}
          </motion.span>
        </h2>
        {/* <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white drop-shadow-lg">
          <TrueFocus
            sentence={aboutContent.personal.name}
            manualMode={false}
            blurAmount={4}
            borderColor="#60a5fa"
            glowColor="rgba(59, 130, 246, 0.6)"
            animationDuration={0.4}
            pauseBetweenAnimations={0.8}
          />
        </div> */}
      </div>

      <h3 className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-400 font-semibold mb-4 min-h-[1.5rem] sm:min-h-[2rem] md:min-h-[2.5rem] flex items-center justify-center">
        <motion.div
          className="relative inline-flex items-center"
          animate={{
            scale: [1, 1.02, 1],
            filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="relative">
            <motion.span
              className="inline-block"
              animate={{
                textShadow: [
                  "0 0 5px rgba(59, 130, 246, 0.5)",
                  "0 0 20px rgba(59, 130, 246, 0.8)",
                  "0 0 5px rgba(59, 130, 246, 0.5)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {displayed}
            </motion.span>
            <motion.span
              className="inline-block w-0.5 h-full bg-gradient-to-b from-blue-400 via-purple-400 to-blue-400 ml-1"
              animate={{
                opacity: [1, 0, 1],
                scaleY: [1, 0.3, 1],
                boxShadow: [
                  "0 0 5px rgba(59, 130, 246, 0.5)",
                  "0 0 15px rgba(147, 51, 234, 0.8)",
                  "0 0 5px rgba(59, 130, 246, 0.5)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </span>
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-blue-400 rounded-full"
                style={{ left: `${20 + i * 30}%`, top: `${-20 + i * 10}%` }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </h3>

      <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-4 sm:mb-6 leading-relaxed max-w-md">
        {aboutContent.personal.description}
      </p>

      {/* Quote */}
      <motion.div
        className="relative mb-6 sm:mb-8 p-6 sm:p-8 bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 rounded-2xl border border-blue-500/30 backdrop-blur-xl shadow-2xl shadow-blue-500/20"
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
        }}
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 via-transparent to-purple-500/10 p-[1px]">
            <div className="w-full h-full rounded-2xl bg-transparent" />
          </div>
          <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-blue-500/10 to-transparent rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-br-2xl" />
        </div>
        <div className="relative z-10">
          <motion.div
            className="absolute -top-2 -left-2 text-4xl sm:text-5xl text-blue-400 font-serif"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            &ldquo;
          </motion.div>
          <motion.p
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white font-bold text-center leading-relaxed px-4 sm:px-8 py-4 drop-shadow-2xl"
            animate={{
              textShadow: [
                "0 4px 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(59, 130, 246, 0.6)",
                "0 6px 12px rgba(0, 0, 0, 0.9), 0 0 25px rgba(147, 51, 234, 0.8)",
                "0 4px 8px rgba(0, 0, 0, 0.8), 0 0 15px rgba(59, 130, 246, 0.6)",
              ],
              color: ["#ffffff", "#f0f9ff", "#ffffff"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {aboutContent.quote?.text}
          </motion.p>
          <motion.div
            className="absolute -bottom-2 -right-2 text-4xl sm:text-5xl text-blue-400 font-serif"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, -5, 5, 0],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            &rdquo;
          </motion.div>
          <div className="absolute inset-0 pointer-events-none">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-blue-400/60 rounded-full"
                style={{
                  left: `${10 + i * 20}%`,
                  top: `${20 + (i % 2) * 60}%`,
                }}
                animate={{
                  scale: [0, 1, 0],
                  opacity: [0, 0.8, 0],
                  y: [0, -20, 0],
                  x: [0, Math.random() * 40 - 20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          <motion.div
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {aboutContent.quote?.author && (
              <motion.span
                className="text-sm sm:text-base text-blue-200 font-semibold drop-shadow-lg"
                animate={{
                  color: ["#bfdbfe", "#c084fc", "#bfdbfe"],
                  textShadow: [
                    "0 2px 4px rgba(0, 0, 0, 0.6), 0 0 8px rgba(59, 130, 246, 0.4)",
                    "0 3px 6px rgba(0, 0, 0, 0.8), 0 0 12px rgba(147, 51, 234, 0.6)",
                    "0 2px 4px rgba(0, 0, 0, 0.6), 0 0 8px rgba(59, 130, 246, 0.4)",
                  ],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                — {aboutContent.quote.author} —
              </motion.span>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Skills Chips */}
      <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4 sm:mb-6">
        {useMemo(
          () =>
            skills.map((skill, index) => (
              <motion.span
                key={skill}
                className="px-2 sm:px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold shadow-sm border border-blue-500/30 cursor-pointer"
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.1,
                  y: -5,
                  backgroundColor: "rgba(59, 130, 246, 0.3)",
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {skill}
              </motion.span>
            )),
          [skills]
        )}
      </div>

      {/* Typing Progress */}
      <motion.div
        className="w-full mb-4 sm:mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
          <motion.span
            animate={{ color: ["#9ca3af", "#60a5fa", "#9ca3af"] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            ✨ Typing Progress
          </motion.span>
          <motion.span
            className="font-bold"
            animate={{
              scale: [1, 1.1, 1],
              color: ["#60a5fa", "#a855f7", "#60a5fa"],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {Math.round((displayed.length / roles[roleIndex].length) * 100)}%
          </motion.span>
        </div>
        <div className="relative w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20"
            animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="relative h-2 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full"
            style={{
              width: `${(displayed.length / roles[roleIndex].length) * 100}%`,
            }}
            animate={{
              boxShadow: [
                "0 0 5px rgba(59, 130, 246, 0.5)",
                "0 0 20px rgba(147, 51, 234, 0.8)",
                "0 0 5px rgba(59, 130, 246, 0.5)",
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-0 right-0 w-8 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </motion.div>

      {/* Contact Info */}
      <div className="flex flex-col gap-3 justify-center lg:justify-start items-center lg:items-start mb-4 sm:mb-6 w-full">
        <span className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm">
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z"
            />
          </svg>
          <span className="truncate">{aboutContent.personal.location}</span>
        </span>
        <a
          href={`mailto:${aboutContent.personal.email}`}
          className="flex items-center gap-2 text-gray-300 text-xs sm:text-sm hover:text-blue-400 transition-colors duration-200 group"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 flex-shrink-0 group-hover:text-blue-300 transition-colors duration-200"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className="truncate group-hover:text-blue-300 transition-colors duration-200">
            {aboutContent.personal.email}
          </span>
        </a>
      </div>

      {/* CV Button - Only show if enabled via environment variable */}
      {enableCvButton && (
        <motion.button
          type="button"
          onClick={openCvPreview}
          className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm sm:text-base mb-4 sm:mb-6"
          tabIndex={0}
          whileHover={{
            scale: 1.05,
            y: -3,
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "0 10px 25px rgba(59, 130, 246, 0.3)",
              "0 15px 35px rgba(147, 51, 234, 0.4)",
              "0 10px 25px rgba(59, 130, 246, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            className="flex items-center gap-2"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <FileText className="w-4 h-4" />
            Preview CV
          </motion.span>
        </motion.button>
      )}

      {/* Social Links */}
      <motion.div
        className="flex gap-4 sm:gap-6 justify-center lg:justify-start items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
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
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
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
    </motion.div>
  );
}
