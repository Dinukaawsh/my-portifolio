import React, { useEffect, useState, useRef } from "react";
import Flower from "@/app/components/backgrounds/flower/Flower";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  referencesContent,
  getReferencesByCategory,
} from "@/app/components/content/references";

export default function References() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndicator, setCurrentIndicator] = useState(0);
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
        (prev) => (prev + 1) % referencesContent.header.indicators.length
      );
    }, referencesContent.animation.rotationInterval);
    return () => clearInterval(timer);
  }, []);

  const filteredReferences =
    activeCategory === "All"
      ? referencesContent.references
      : getReferencesByCategory(activeCategory);

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

      {/* Floating Reference Icons */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from(
          { length: referencesContent.animation.floatingParticles },
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
                duration: referencesContent.animation.particleDuration + i * 2,
                delay: i * referencesContent.animation.particleDelay,
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
            {referencesContent.header.title}
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-blue-200 max-w-3xl mx-auto px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {referencesContent.header.subtitle}
          </motion.p>

          {/* Animated Reference Indicator */}
          <motion.div
            className="flex justify-center gap-2 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {referencesContent.header.indicators.map((indicator, index) => (
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
            {referencesContent.categories.map((category, index) => (
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

        {/* Enhanced References Grid */}
        <motion.div
          className="w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredReferences.map((reference, index) => (
              <motion.div
                key={reference.id}
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
                {/* Reference Card */}
                <div className="bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 h-full">
                  {/* Company Badge & Featured */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-8 h-8 ${reference.color} rounded-full flex items-center justify-center text-white text-lg`}
                      >
                        {reference.companyLogo}
                      </span>
                      <span className="text-gray-300 text-sm font-medium">
                        {reference.company}
                      </span>
                    </div>
                    {reference.featured && (
                      <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                        ⭐ Featured
                      </span>
                    )}
                  </div>

                  {/* Reference Content */}
                  <div className="space-y-4 flex-1">
                    {/* Name and Position */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-200">
                        {reference.name}
                      </h3>
                      <p className="text-blue-300 text-sm font-medium">
                        {reference.title}
                      </p>
                    </div>

                    {/* Testimonial */}
                    <blockquote className="text-gray-300 text-sm sm:text-base leading-relaxed italic">
                      &ldquo;{reference.testimonial}&rdquo;
                    </blockquote>

                    {/* Strengths */}
                    <div className="flex flex-wrap gap-2">
                      {reference.strengths.map((strength, strengthIndex) => (
                        <span
                          key={strengthIndex}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30"
                        >
                          {strength}
                        </span>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-400 pt-2">
                      <span>{reference.category}</span>
                      <span>
                        {new Date(reference.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Contact Button */}
                    <div className="pt-4">
                      <a
                        href={
                          reference.linkedin || reference.email
                            ? `mailto:${reference.email}`
                            : "#"
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 w-full justify-center"
                      >
                        Contact Reference
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
        {filteredReferences.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">💼</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No references found
            </h3>
            <p className="text-gray-400">
              Try selecting a different category or check back later!
            </p>
          </div>
        )}

        {/* Enhanced Call to Action */}
        <motion.div
          className="w-full max-w-4xl mx-auto mt-12 text-center"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
        >
          <motion.div
            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl p-8 border border-blue-500/30"
            whileHover={{ scale: 1.02 }}
            animate={{
              boxShadow: [
                "0 25px 50px rgba(59, 130, 246, 0.1)",
                "0 25px 50px rgba(147, 51, 234, 0.2)",
                "0 25px 50px rgba(59, 130, 246, 0.1)",
              ],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <motion.h3
              className="text-xl sm:text-2xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              Need a reference?
            </motion.h3>
            <motion.p
              className="text-gray-300 text-sm sm:text-base mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              Get in touch with my professional references for more insights
            </motion.p>
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <motion.a
                href="#"
                className="px-8 py-4 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-all duration-200 shadow-lg shadow-orange-500/25 flex items-center justify-center gap-3"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 1.7,
                  type: "spring",
                }}
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 15px 35px rgba(245, 101, 101, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Contact References</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
