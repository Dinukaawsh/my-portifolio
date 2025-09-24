import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  experienceContent,
  getParticleConfig,
} from "@/app/components/content/experience";
import Hyperspeed, {
  hyperspeedPresets,
} from "../backgrounds/hyperspeed/hyperspeed";

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentSkill, setCurrentSkill] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Skills rotation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % 3);
    }, experienceContent.animation.skillsRotationInterval);
    return () => clearInterval(timer);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-full relative flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden px-2 sm:px-4 py-4 sm:py-8"
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Hyperspeed Background - Fixed */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <Hyperspeed effectOptions={hyperspeedPresets.one} />
      </div>

      {/* Floating Experience Icons */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: experienceContent.particles.count }, (_, i) => {
          const config = getParticleConfig(i);
          return (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
              style={{
                left: config.left,
                top: config.top,
              }}
              animate={{
                y: [0, -80, -160, -240],
                x: [0, Math.random() * 60 - 30],
                opacity: [0, 1, 0.8, 0],
                scale: [0, 1, 1.3, 0],
              }}
              transition={{
                duration: config.duration,
                delay: config.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center pb-16">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{
              rotate: [0, 3, -3, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>

          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {experienceContent.header.title}
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-blue-200 max-w-2xl mx-auto px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {experienceContent.header.subtitle}
          </motion.p>

          {/* Animated Skills Indicator */}
          <motion.div
            className="flex justify-center gap-2 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {experienceContent.header.indicators.map((skill, index) => (
              <motion.div
                key={skill}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
                  index === currentSkill
                    ? "bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-lg"
                    : "bg-white/10 text-gray-300 border border-white/20"
                }`}
                animate={index === currentSkill ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Navigation Experience Display */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
        >
          <motion.div className="relative" whileHover={{ scale: 1.05 }}>
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg shadow-blue-500/25 inline-block"
              animate={{
                boxShadow: [
                  "0 10px 25px rgba(59, 130, 246, 0.25)",
                  "0 10px 25px rgba(147, 51, 234, 0.35)",
                  "0 10px 25px rgba(59, 130, 246, 0.25)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.h3
                className="text-lg sm:text-xl font-bold"
                animate={{
                  textShadow: [
                    "0 0 5px rgba(255, 255, 255, 0.5)",
                    "0 0 10px rgba(255, 255, 255, 0.8)",
                    "0 0 5px rgba(255, 255, 255, 0.5)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {experienceContent.experiences[activeIndex].company}
              </motion.h3>
            </motion.div>
          </motion.div>

          {/* Enhanced Navigation Buttons */}
          <motion.div
            className="flex justify-center items-center mt-6 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <motion.button
              onClick={() =>
                setActiveIndex(
                  (prev) =>
                    (prev - 1 + experienceContent.experiences.length) %
                    experienceContent.experiences.length
                )
              }
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 border border-white/20"
              aria-label="Previous experience"
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>

            {/* Enhanced Progress Indicator */}
            <div className="flex gap-2">
              {experienceContent.experiences.map((exp, index) => (
                <motion.button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-blue-500 scale-125"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to ${exp.company}`}
                  whileHover={{ scale: 1.2 }}
                  animate={
                    activeIndex === index
                      ? {
                          scale: [1, 1.3, 1.25],
                          boxShadow: [
                            "0 0 0 rgba(59, 130, 246, 0.4)",
                            "0 0 20px rgba(59, 130, 246, 0.8)",
                            "0 0 0 rgba(59, 130, 246, 0.4)",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 2, repeat: Infinity }}
                />
              ))}
            </div>

            <motion.button
              onClick={() =>
                setActiveIndex(
                  (prev) => (prev + 1) % experienceContent.experiences.length
                )
              }
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 border border-white/20"
              aria-label="Next experience"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Enhanced Experience Cards */}
        <motion.div
          className="w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
        >
          <motion.div
            className="bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/20"
            whileHover={{ scale: 1.02 }}
            animate={{
              boxShadow: [
                "0 25px 50px rgba(59, 130, 246, 0.2)",
                "0 25px 50px rgba(147, 51, 234, 0.3)",
                "0 25px 50px rgba(59, 130, 246, 0.2)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0">
                <Image
                  src={experienceContent.experiences[activeIndex].logo}
                  alt={experienceContent.experiences[activeIndex].logoAlt}
                  width={96}
                  height={96}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                    {experienceContent.experiences[activeIndex].title}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full ${
                        experienceContent.experienceTypes[
                          experienceContent.experiences[
                            activeIndex
                          ].type.toLowerCase() as keyof typeof experienceContent.experienceTypes
                        ]?.color ||
                        experienceContent.experienceTypes.internship.color
                      }`}
                    >
                      {experienceContent.experiences[activeIndex].type}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full ${
                        experienceContent.locations[
                          experienceContent.experiences[
                            activeIndex
                          ].location.toLowerCase() as keyof typeof experienceContent.locations
                        ]?.color || experienceContent.locations.remote.color
                      }`}
                    >
                      {experienceContent.experiences[activeIndex].location}
                    </span>
                  </div>
                </div>
                <h4 className="text-lg sm:text-xl text-blue-400 font-semibold mb-2">
                  {experienceContent.experiences[activeIndex].company}
                </h4>
                <div className="flex items-center gap-4 text-sm text-gray-300">
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {experienceContent.experiences[activeIndex].period}
                  </span>
                  <span className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-purple-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    {experienceContent.experiences[activeIndex].duration}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-6">
              {experienceContent.experiences[activeIndex].description}
            </p>

            {/* Enhanced Responsibilities */}
            <div className="mb-6">
              <motion.h5
                className="text-white font-semibold mb-3 text-sm sm:text-base"
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                Key Responsibilities:
              </motion.h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {experienceContent.experiences[
                  activeIndex
                ].responsibilities.map((resp, idx) => (
                  <motion.div
                    key={idx}
                    className="flex items-start gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.8 + idx * 0.1,
                      type: "spring",
                    }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: idx * 0.2,
                      }}
                    />
                    <span className="text-gray-300 text-xs sm:text-sm">
                      {resp}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Enhanced Skills */}
            <div>
              <motion.h5
                className="text-white font-semibold mb-3 text-sm sm:text-base"
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Technologies & Skills:
              </motion.h5>
              <div className="flex flex-wrap gap-2">
                {experienceContent.experiences[activeIndex].skills.map(
                  (skill, idx) => (
                    <motion.span
                      key={idx}
                      className="px-2 sm:px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-200"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={isVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
                      transition={{
                        duration: 0.5,
                        delay: 0.9 + idx * 0.05,
                        type: "spring",
                        stiffness: 200,
                      }}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor: "rgba(59, 130, 246, 0.3)",
                        borderColor: "rgba(59, 130, 246, 0.6)",
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {skill}
                    </motion.span>
                  )
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
