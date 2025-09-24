"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import LetterGlitch from "@/app/components/backgrounds/letter-glich/glich";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import CustomIcon from "@/app/components/icons/skillsicons";
import {
  skillsContent,
  getSkillsByCategory,
  getAllCategories,
  getParticleConfig,
  getSkillsCount,
} from "@/app/components/content/skills";

// Skills data organized by categories
interface SkillItem {
  name: string;
  level: number;
  color: string;
  icon: string;
}

interface SoftSkillItem {
  name: string;
  icon: string;
}

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
  // Check if it's a custom icon
  if (iconName.startsWith("custom:")) {
    const CustomIconWrapper = (props: {
      className?: string;
      size?: number;
    }) => <CustomIcon iconName={iconName} {...props} />;
    CustomIconWrapper.displayName = `CustomIconWrapper(${iconName})`;
    return CustomIconWrapper;
  }

  // Fallback to Lucide icons
  const IconComponent = LucideIcons[
    iconName as keyof typeof LucideIcons
  ] as React.ComponentType<{ className?: string; size?: number }>;
  return IconComponent || LucideIcons.HelpCircle;
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("languages");
  const [progress, setProgress] = useState<Record<string, number[]>>({});
  const [isVisible, setIsVisible] = useState(false);
  const [slideDirection, setSlideDirection] = useState("right");
  const [currentSkill, setCurrentSkill] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Skills rotation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSkill((prev) => (prev + 1) % 4);
    }, skillsContent.animation.skillsRotationInterval);
    return () => clearInterval(timer);
  }, []);

  // Initialize progress state
  useEffect(() => {
    const initialProgress: Record<string, number[]> = {};
    getAllCategories().forEach((category) => {
      if (category !== "softSkills") {
        initialProgress[category] = getSkillsByCategory(category).map(() => 0);
      }
    });
    setProgress(initialProgress);
  }, []);

  // Animate progress bars for current category
  const animateProgress = useCallback(() => {
    // Reset progress for current category first
    const currentCategorySkills = getSkillsByCategory(activeCategory);
    if (
      activeCategory !== "softSkills" &&
      Array.isArray(currentCategorySkills) &&
      currentCategorySkills.length > 0
    ) {
      const skillItems = currentCategorySkills as SkillItem[];
      // Reset to 0 first
      setProgress((prev) => ({
        ...prev,
        [activeCategory]: skillItems.map(() => 0),
      }));

      // Then animate to full values
      setTimeout(() => {
        skillItems.forEach((skill: SkillItem, index) => {
          setTimeout(() => {
            setProgress((prev) => ({
              ...prev,
              [activeCategory]: prev[activeCategory].map((val, i) =>
                i === index ? skill.level : val
              ),
            }));
          }, index * skillsContent.animation.progressAnimationDelay);
        });
      }, 100);
    }
  }, [activeCategory]);

  // Simplified auto-sliding functionality with manual control
  useEffect(() => {
    if (isVisible && !autoSlideRef.current) {
      const startAutoSlide = () => {
        // First, animate the progress bars for current category
        animateProgress();

        // Wait for progress bars to complete, then slide to next category
        setTimeout(() => {
          setIsTransitioning(true);
          setSlideDirection("right");
          setActiveCategory((prev) => {
            const categories = getAllCategories();
            const currentIndex = categories.indexOf(prev);
            const nextIndex = (currentIndex + 1) % categories.length;
            return categories[nextIndex];
          });
          // Reset transition state after animation completes
          setTimeout(() => setIsTransitioning(false), 800);
        }, skillsContent.autoSlide.progressAnimationTime + 1000); // Added extra delay for smooth transition
      };

      // Start the first cycle
      startAutoSlide();

      // Set up recurring cycle - much slower for better user experience
      autoSlideRef.current = setInterval(
        startAutoSlide,
        skillsContent.autoSlide.interval
      );
      setIsAutoSliding(true);
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
        setIsAutoSliding(false);
      }
    };
  }, [isVisible, animateProgress]);

  // Manual navigation functions
  const goToNextCategory = useCallback(() => {
    // Stop auto-sliding
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
      setIsAutoSliding(false);
    }

    setSlideDirection("right");
    setIsTransitioning(true);
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      setActiveCategory((prev) => {
        const categories = getAllCategories();
        const currentIndex = categories.indexOf(prev);
        const nextIndex = (currentIndex + 1) % categories.length;
        return categories[nextIndex];
      });
      // Reset transition state after animation completes
      setTimeout(() => setIsTransitioning(false), 800);
    }, 100);
  }, []);

  const goToPreviousCategory = useCallback(() => {
    // Stop auto-sliding
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
      setIsAutoSliding(false);
    }

    setSlideDirection("left");
    setIsTransitioning(true);
    // Add a small delay to ensure smooth transition
    setTimeout(() => {
      setActiveCategory((prev) => {
        const categories = getAllCategories();
        const currentIndex = categories.indexOf(prev);
        const prevIndex =
          (currentIndex - 1 + categories.length) % categories.length;
        return categories[prevIndex];
      });
      // Reset transition state after animation completes
      setTimeout(() => setIsTransitioning(false), 800);
    }, 100);
  }, []);

  const pauseAutoSlide = useCallback(() => {
    if (autoSlideRef.current) {
      clearInterval(autoSlideRef.current);
      autoSlideRef.current = null;
      setIsAutoSliding(false);
    }
  }, []);

  const resumeAutoSlide = useCallback(() => {
    if (!autoSlideRef.current && isVisible) {
      const startAutoSlide = () => {
        animateProgress();
        setTimeout(() => {
          setIsTransitioning(true);
          setSlideDirection("right");
          setActiveCategory((prev) => {
            const categories = getAllCategories();
            const currentIndex = categories.indexOf(prev);
            const nextIndex = (currentIndex + 1) % categories.length;
            return categories[nextIndex];
          });
          // Reset transition state after animation completes
          setTimeout(() => setIsTransitioning(false), 800);
        }, skillsContent.autoSlide.progressAnimationTime + 1000); // Added extra delay for smooth transition
      };

      // Start immediately
      startAutoSlide();

      // Then set up recurring cycle
      autoSlideRef.current = setInterval(
        startAutoSlide,
        skillsContent.autoSlide.interval
      );
      setIsAutoSliding(true);
    }
  }, [isVisible, animateProgress]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateProgress();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [animateProgress]);

  // Get category display name
  const getCategoryName = (key: string) => {
    const names: Record<string, string> = {
      languages: "Programming Languages",
      frontendFrameworks: "Frontend Frameworks",
      backendFrameworks: "Backend Frameworks",
      databases: "Databases",
      cloudServices: "Cloud Services",
      cicd: "CI/CD",
      apis: "APIs",
      tools: "Development Tools",
      softSkills: "Soft Skills",
    };
    return names[key] || key;
  };

  // Get category color
  const getCategoryColor = (key: string) => {
    const colors: Record<string, string> = {
      languages: "from-blue-500 to-blue-600",
      frontendFrameworks: "from-green-500 to-green-600",
      backendFrameworks: "from-purple-500 to-purple-600",
      databases: "from-orange-500 to-orange-600",
      cloudServices: "from-indigo-500 to-indigo-600",
      cicd: "from-red-500 to-red-600",
      apis: "from-yellow-500 to-yellow-600",
      tools: "from-pink-500 to-pink-600",
      softSkills: "from-teal-500 to-teal-600",
    };
    return colors[key] || "from-gray-500 to-gray-600";
  };

  return (
    <section
      ref={sectionRef}
      className="w-full h-full overflow-y-auto overflow-x-hidden px-2 sm:px-4 py-4 sm:py-8"
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* LetterGlitch Background - Fixed */}
      <div className="fixed inset-0 z-0 w-full h-full bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
        <div className="absolute inset-0 w-full h-full min-h-screen">
          <LetterGlitch
            glitchColors={["#1e40af", "#3b82f6", "#60a5fa", "#93c5fd"]}
            glitchSpeed={80}
            centerVignette={true}
            outerVignette={false}
            smooth={true}
            characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
          />
        </div>
      </div>

      {/* Floating Skills Icons */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from(
          { length: skillsContent.animation.floatingParticles },
          (_, i) => {
            const config = getParticleConfig(i);
            return (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-green-400/30 rounded-full"
                style={{
                  left: config.left,
                  top: config.top,
                }}
                animate={{
                  y: [0, -60, -120, -180],
                  x: [0, Math.random() * 40 - 20],
                  opacity: [0, 1, 0.8, 0],
                  scale: [0, 1, 1.4, 0],
                }}
                transition={{
                  duration: config.duration,
                  delay: config.delay,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            );
          }
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto pb-8 sm:pb-12 flex flex-col items-center">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{
              rotate: [0, 4, -4, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 6,
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
            {skillsContent.header.title}
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-blue-200 max-w-2xl mx-auto px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {skillsContent.header.subtitle}
          </motion.p>

          {/* Animated Skills Indicator */}
          <motion.div
            className="flex justify-center gap-2 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {skillsContent.header.indicators.map((skill, index) => (
              <motion.div
                key={skill}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
                  index === currentSkill
                    ? "bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg"
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

        {/* Enhanced Auto-Sliding Category Display */}
        <motion.div
          className="text-center mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
        >
          <motion.div
            className="relative overflow-hidden"
            whileHover={{ scale: 1.05 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                className={`inline-block ${
                  isTransitioning ? "pointer-events-none" : ""
                }`}
                initial={{
                  opacity: 0,
                  x: slideDirection === "right" ? 100 : -100,
                }}
                animate={{ opacity: 1, x: 0 }}
                exit={{
                  opacity: 0,
                  x: slideDirection === "right" ? -100 : 100,
                }}
                transition={{
                  duration: 0.8,
                  ease: "easeInOut",
                  opacity: { duration: 0.4 },
                  x: { duration: 0.8 },
                  scale: { duration: 0.6 },
                }}
                whileInView={{ scale: [0.95, 1] }}
              >
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
                    {getCategoryName(activeCategory)}
                    {isTransitioning && (
                      <motion.span
                        className="ml-2 inline-block"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        🔄
                      </motion.span>
                    )}
                  </motion.h3>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Enhanced Progress Indicator */}
          <motion.div
            className="flex justify-center mt-4 gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {getAllCategories().map((category) => (
              <motion.button
                key={category}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-blue-500 scale-125"
                    : "bg-white/30"
                }`}
                whileHover={{ scale: 1.3 }}
                animate={
                  activeCategory === category
                    ? {
                        scale: [1, 1.4, 1.25],
                        boxShadow: [
                          "0 0 0 rgba(59, 130, 246, 0.4)",
                          "0 0 15px rgba(59, 130, 246, 0.8)",
                          "0 0 0 rgba(59, 130, 246, 0.4)",
                        ],
                      }
                    : {}
                }
                transition={{ duration: 2, repeat: Infinity }}
                onClick={() => {
                  // Stop auto-sliding when manually selecting
                  if (autoSlideRef.current) {
                    clearInterval(autoSlideRef.current);
                    autoSlideRef.current = null;
                    setIsAutoSliding(false);
                  }
                  setActiveCategory(category);
                }}
              />
            ))}
          </motion.div>

          {/* Manual Navigation Controls */}
          <motion.div
            className="flex justify-center items-center mt-6 gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            {/* Previous Button */}
            <motion.button
              onClick={goToPreviousCategory}
              disabled={isTransitioning}
              className={`p-3 rounded-full transition-colors duration-200 border text-white ${
                isTransitioning
                  ? "bg-white/5 border-white/10 cursor-not-allowed opacity-50"
                  : "bg-white/10 hover:bg-white/20 border-white/20"
              }`}
              whileHover={isTransitioning ? {} : { scale: 1.1, rotate: -5 }}
              whileTap={isTransitioning ? {} : { scale: 0.95 }}
              aria-label="Previous category"
            >
              <svg
                className="w-5 h-5"
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

            {/* Play/Pause Button */}
            <motion.button
              onClick={isAutoSliding ? pauseAutoSlide : resumeAutoSlide}
              disabled={isTransitioning}
              className={`p-3 rounded-full transition-all duration-200 text-white shadow-lg ${
                isTransitioning
                  ? "bg-gradient-to-r from-gray-500 to-gray-600 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              }`}
              whileHover={isTransitioning ? {} : { scale: 1.1 }}
              whileTap={isTransitioning ? {} : { scale: 0.95 }}
              aria-label={
                isAutoSliding ? "Pause auto-slide" : "Resume auto-slide"
              }
            >
              {isAutoSliding ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </motion.button>

            {/* Next Button */}
            <motion.button
              onClick={goToNextCategory}
              disabled={isTransitioning}
              className={`p-3 rounded-full transition-colors duration-200 border text-white ${
                isTransitioning
                  ? "bg-white/5 border-white/10 cursor-not-allowed opacity-50"
                  : "bg-white/10 hover:bg-white/20 border-white/20"
              }`}
              whileHover={isTransitioning ? {} : { scale: 1.1, rotate: 5 }}
              whileTap={isTransitioning ? {} : { scale: 0.95 }}
              aria-label="Next category"
            >
              <svg
                className="w-5 h-5"
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

          {/* Auto-slide Status */}
          <motion.div
            className="text-center mt-3"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <span className="text-xs text-gray-400">
              {isAutoSliding
                ? `🔄 Auto-sliding every ${
                    skillsContent.autoSlide.interval / 1000
                  } seconds`
                : "⏸️ Auto-slide paused"}
            </span>
          </motion.div>
        </motion.div>

        {/* Enhanced Skills Content */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
        >
          {activeCategory === "softSkills" ? (
            // Soft Skills Display
            <div className="bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/20">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">
                {getCategoryName(activeCategory)}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {(getSkillsByCategory(activeCategory) as SoftSkillItem[]).map(
                  (skill, index) => {
                    const IconComponent = getIconComponent(skill.icon);
                    return (
                      <div
                        key={skill.name}
                        className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-blue-500/30 text-center transform hover:scale-105 transition-all duration-300 animate-fade-in-up hover:shadow-lg hover:shadow-blue-500/25"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <IconComponent className="w-6 h-6 text-blue-400" />
                          <span className="text-sm sm:text-base font-semibold text-blue-200">
                            {skill.name}
                          </span>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          ) : (
            // Technical Skills Display
            <div className="bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/20">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">
                {getCategoryName(activeCategory)}
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {(getSkillsByCategory(activeCategory) as SkillItem[]).map(
                  (skill, index) => {
                    const IconComponent = getIconComponent(skill.icon);
                    return (
                      <div
                        key={skill.name}
                        className="group"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                          <div className="flex items-center gap-3 mb-2 sm:mb-0">
                            <div className="flex items-center gap-2">
                              <IconComponent className="w-5 h-5 text-blue-400" />
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: skill.color }}
                              />
                            </div>
                            <span className="font-semibold text-white text-sm sm:text-base">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-xs sm:text-sm text-blue-200 font-mono">
                            {progress[activeCategory]?.[index] || 0}%
                          </span>
                        </div>
                        <div
                          className={`w-full ${skillsContent.progressBars.height.sm} sm:${skillsContent.progressBars.height.md} bg-white/10 rounded-full overflow-hidden backdrop-blur-sm`}
                        >
                          <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-blue-500/25"
                            style={{
                              width: `${
                                progress[activeCategory]?.[index] || 0
                              }%`,
                              background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Enhanced Skills Overview Grid */}
        <motion.div
          className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {getAllCategories().map((category, index) => {
            // Get a representative icon for each category
            const categoryIconMap: Record<string, string> = {
              languages: "custom:js",
              frontendFrameworks: "custom:react",
              backendFrameworks: "custom:nodejs",
              databases: "custom:mongodb",
              cloudServices: "custom:aws",
              tools: "custom:vscode",
              softSkills: "Users",
            };
            const IconComponent = getIconComponent(
              categoryIconMap[category] || "Star"
            );

            return (
              <motion.div
                key={category}
                className="bg-gradient-to-br from-gray-900/60 via-blue-900/20 to-gray-900/60 backdrop-blur-xl rounded-2xl p-3 sm:p-4 border border-blue-500/30 hover:bg-gradient-to-br hover:from-gray-900/80 hover:via-blue-900/40 hover:to-gray-900/80 transition-all duration-300 transform hover:scale-105 cursor-pointer hover:shadow-lg hover:shadow-blue-500/25"
                onClick={() => {
                  // Stop auto-sliding when manually selecting
                  if (autoSlideRef.current) {
                    clearInterval(autoSlideRef.current);
                    autoSlideRef.current = null;
                    setIsAutoSliding(false);
                  }
                  setActiveCategory(category);
                }}
                initial={{ opacity: 0, y: 30, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 1.0 + index * 0.1,
                  type: "spring",
                }}
                whileHover={{
                  scale: 1.08,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <IconComponent className="w-5 h-5 text-blue-400" />
                  <motion.h4
                    className="text-base sm:text-lg font-semibold text-white"
                    whileHover={{ color: "#60a5fa" }}
                  >
                    {getCategoryName(category)}
                  </motion.h4>
                </div>
                <motion.p
                  className="text-xs sm:text-sm text-blue-200"
                  whileHover={{ color: "#93c5fd" }}
                >
                  {getSkillsCount(category)} skills
                </motion.p>
                <motion.div
                  className={`w-12 sm:w-16 h-1 mt-3 rounded-full bg-gradient-to-r ${getCategoryColor(
                    category
                  )}`}
                  whileHover={{
                    width: "100%",
                    transition: { duration: 0.3 },
                  }}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in-right {
          animation: slideInRight 0.7s ease-out forwards;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.7s ease-out forwards;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
