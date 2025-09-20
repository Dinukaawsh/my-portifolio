"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Flower from "@/app/components/backgrounds/flower/Flower";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  achievementsContent,
  getAchievementsByCategory,
} from "@/app/components/content/achievements";

export default function Achievements() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndicator, setCurrentIndicator] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Indicator rotation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndicator(
        (prev) => (prev + 1) % achievementsContent.header.indicators.length
      );
    }, achievementsContent.animation.rotationInterval);
    return () => clearInterval(timer);
  }, []);

  const filteredAchievements =
    activeCategory === "All"
      ? achievementsContent.achievements
      : getAchievementsByCategory(activeCategory);

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

      {/* Flower Background - Fixed */}
      <div className="fixed inset-0 z-0">
        <Flower />
      </div>

      {/* Floating Achievement Icons */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from(
          { length: achievementsContent.animation.floatingParticles },
          (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
              style={{
                left: `${12 + i * 18}%`,
                top: `${22 + i * 15}%`,
              }}
              animate={{
                y: [0, -70, -140, -210],
                x: [0, Math.random() * 50 - 25],
                opacity: [0, 1, 0.8, 0],
                scale: [0, 1, 1.5, 0],
              }}
              transition={{
                duration:
                  achievementsContent.animation.particleDuration + i * 2,
                delay: i * achievementsContent.animation.particleDelay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
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
              rotate: [0, 2, -2, 0],
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
            {achievementsContent.header.title}
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-blue-200 max-w-3xl mx-auto px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {achievementsContent.header.subtitle}
          </motion.p>

          {/* Animated Achievement Indicator */}
          <motion.div
            className="flex justify-center gap-2 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {achievementsContent.header.indicators.map((indicator, index) => (
              <motion.div
                key={indicator}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
                  index === currentIndicator
                    ? "bg-gradient-to-r from-yellow-500 to-orange-600 text-white shadow-lg"
                    : "bg-white/10 text-gray-300 border border-white/20"
                }`}
                animate={
                  index === currentIndicator ? { scale: 1.1 } : { scale: 1 }
                }
                transition={{ duration: 0.3 }}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                {indicator}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Category Filter */}
        <motion.div
          className="w-full max-w-4xl mx-auto mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {achievementsContent.categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20"
                }`}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + index * 0.1,
                  type: "spring",
                }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Achievements Grid */}
        <motion.div
          className="w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredAchievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                className="group"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.8 + index * 0.1,
                  type: "spring",
                }}
                whileHover={{
                  scale: 1.02,
                  y: -5,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Achievement Card */}
                <div className="bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 h-full">
                  {/* Achievement Image */}
                  {achievement.achievementImage && (
                    <div className="mb-6 relative group">
                      <div className="relative w-full h-64 sm:h-72 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-2 border-blue-500/30 shadow-2xl shadow-blue-500/20">
                        <Image
                          src={achievement.achievementImage}
                          alt={`${achievement.title} Achievement`}
                          fill
                          className="object-contain transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={achievement.featured}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Corner Accent */}
                        <div className="absolute top-3 right-3 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* View Button */}
                        <button
                          onClick={() =>
                            setSelectedImage(achievement.achievementImage)
                          }
                          className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30 shadow-xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
                            <svg
                              className="w-10 h-10 text-white drop-shadow-lg"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                              />
                            </svg>
                          </div>
                        </button>

                        {/* Achievement Badge */}
                        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-blue-500/90 to-purple-600/90 backdrop-blur-sm rounded-xl px-3 py-1.5 border border-white/20">
                          <span className="text-white text-xs font-semibold flex items-center gap-1">
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Achievement
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Issuer Badge & Featured */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-8 h-8 ${achievement.color} rounded-full flex items-center justify-center text-white text-lg`}
                      >
                        {achievement.issuerLogo}
                      </span>
                      <span className="text-gray-300 text-sm font-medium">
                        {achievement.issuer}
                      </span>
                    </div>
                    {achievement.featured && (
                      <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                        ⭐ Featured
                      </span>
                    )}
                  </div>

                  {/* Achievement Content */}
                  <div className="space-y-4 flex-1">
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2">
                      {achievement.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                      {achievement.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {achievement.skills.map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-400 pt-2">
                      <span>{achievement.category}</span>
                      <span>
                        {new Date(achievement.date).toLocaleDateString()}
                      </span>
                    </div>

                    {/* View Achievement Button */}
                    <div className="pt-4">
                      <a
                        href={
                          achievement.certificateUrl ||
                          achievement.mediaUrl ||
                          "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 w-full justify-center"
                      >
                        View Achievement
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🏆</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No achievements found
            </h3>
            <p className="text-gray-400">
              Try selecting a different category or check back later!
            </p>
          </div>
        )}

        {/* Achievement Summary Stats */}
        <motion.div
          className="w-full max-w-4xl mx-auto mt-12"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <motion.div
              className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-2xl p-6 text-center border border-blue-500/30"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <div className="text-2xl font-bold text-white mb-1">
                {achievementsContent.achievements.length}
              </div>
              <div className="text-sm text-blue-200">Total Achievements</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl p-6 text-center border border-purple-500/30"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <div className="text-2xl font-bold text-white mb-1">
                {
                  achievementsContent.achievements.filter(
                    (achievement) => achievement.featured
                  ).length
                }
              </div>
              <div className="text-sm text-purple-200">Featured</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-2xl p-6 text-center border border-green-500/30"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <div className="text-2xl font-bold text-white mb-1">
                {
                  new Set(
                    achievementsContent.achievements.map(
                      (achievement) => achievement.category
                    )
                  ).size
                }
              </div>
              <div className="text-sm text-green-200">Categories</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-2xl p-6 text-center border border-orange-500/30"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.7 }}
            >
              <div className="text-2xl font-bold text-white mb-1">
                {
                  new Set(
                    achievementsContent.achievements.flatMap(
                      (achievement) => achievement.skills
                    )
                  ).size
                }
              </div>
              <div className="text-sm text-orange-200">Skills</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Image Modal/Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl xl:max-w-5xl max-h-[90vh] sm:max-h-[95vh] mx-2 sm:mx-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 sm:-top-16 right-0 text-white hover:text-gray-300 transition-colors bg-black/50 backdrop-blur-sm rounded-full p-2 sm:p-3 border border-white/20 z-10"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              {/* Image Container */}
              <div className="relative w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl border-2 sm:border-4 border-white/20">
                <Image
                  src={selectedImage}
                  alt="Achievement"
                  width={1000}
                  height={800}
                  className="w-full h-full object-contain p-2 sm:p-4"
                  priority
                />
              </div>

              {/* Image Info */}
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 bg-black/70 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4 border border-white/20">
                <p className="text-white text-xs sm:text-sm font-medium text-center">
                  Tap outside or press ESC to close
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
