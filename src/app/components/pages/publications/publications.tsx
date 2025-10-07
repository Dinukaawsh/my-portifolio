"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { publicationsContent } from "@/app/components/content/publications";
import { SplineScene } from "@/app/components/backgrounds/robot/splite";
import { Spotlight } from "@/app/components/backgrounds/robot/spotlight";

type PublicationsProps = {
  setActiveSection: React.Dispatch<React.SetStateAction<string>>;
};

export default function Publications({ setActiveSection }: PublicationsProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activePlatform, setActivePlatform] = useState("All");
  const [currentIndicator, setCurrentIndicator] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndicator(
        (prev) => (prev + 1) % publicationsContent.header.indicators.length
      );
    }, publicationsContent.animation.rotationInterval);
    return () => clearInterval(timer);
  }, []);

  const filteredPublications = useMemo(() => {
    return activePlatform === "All"
      ? publicationsContent.publications
      : publicationsContent.publications.filter(
          (p) => p.platform === activePlatform
        );
  }, [activePlatform]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setActiveSection("Publications");
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [setActiveSection]);

  return (
    <section
      id="publications"
      ref={sectionRef}
      className="w-full h-full relative flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden px-2 sm:px-4 py-4 sm:py-8"
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="w-full h-full bg-black/[0.96] relative overflow-hidden">
          <Spotlight
            className="-top-40 left-0 md:left-60 md:-top-20"
            size={200}
          />
          <div className="flex h-full w-full">
            <div className="flex-1 relative w-full h-full">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full min-h-screen"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from(
          { length: publicationsContent.animation.floatingParticles },
          (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-yellow-400/30 rounded-full"
              style={{ left: `${12 + i * 18}%`, top: `${22 + i * 15}%` }}
              animate={{
                y: [0, -70, -140, -210],
                x: [0, Math.random() * 50 - 25],
                opacity: [0, 1, 0.8, 0],
                scale: [0, 1, 1.5, 0],
              }}
              transition={{
                duration:
                  publicationsContent.animation.particleDuration + i * 2,
                delay: i * publicationsContent.animation.particleDelay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          )
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {publicationsContent.header.title}
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-blue-200 max-w-3xl mx-auto px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {publicationsContent.header.subtitle}
          </motion.p>

          {/* Animated Indicators */}
          <motion.div
            className="flex justify-center gap-2 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {publicationsContent.header.indicators.map((label, index) => (
              <motion.div
                key={label}
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
                {label}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Platform Filter */}
        <motion.div
          className="w-full max-w-4xl mx-auto mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {publicationsContent.platforms.map((platform, index) => (
              <motion.button
                key={platform}
                onClick={() => setActivePlatform(platform)}
                className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
                  activePlatform === platform
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
                {platform}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Publications Grid */}
        <motion.div
          className="w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredPublications.map((pub, index) => (
              <motion.div
                key={pub.id}
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
                <div className="bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 h-full">
                  {/* Optional Cover */}
                  {pub.cover && (
                    <div className="mb-4 overflow-hidden rounded-2xl">
                      <Image
                        src={pub.cover}
                        alt={pub.title}
                        width={400}
                        height={192}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  )}

                  {/* Platform / Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-8 h-8 ${pub.platformColor} rounded-full flex items-center justify-center text-white`}
                      >
                        <svg
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-label={pub.platform}
                        >
                          <path
                            d={publicationsContent.callToAction.buttonIcon}
                          />
                        </svg>
                      </span>
                      <span className="text-gray-300 text-sm font-medium">
                        {pub.platform}
                      </span>
                    </div>
                    {pub.featured && (
                      <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                        ⭐ Featured
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="space-y-4 flex-1">
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2">
                      {pub.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {pub.authors.join(", ")} • {pub.venue} • {pub.year}
                    </p>

                    {/* Tags */}
                    {pub.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {pub.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Links */}
                    <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href={pub.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 justify-center"
                      >
                        View Publication
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
                      {pub.doi && (
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/20 justify-center"
                        >
                          DOI
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Empty State */}
        {filteredPublications.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📑</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No publications found
            </h3>
            <p className="text-gray-400">
              Try selecting a different platform or check back later!
            </p>
          </div>
        )}

        {/* Call to Action */}
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
              {publicationsContent.callToAction.title}
            </motion.h3>
            <motion.p
              className="text-gray-300 text-sm sm:text-base mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              {publicationsContent.callToAction.description}
            </motion.p>
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <motion.a
                href={publicationsContent.callToAction.buttonUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#05112b] text-white font-semibold rounded-xl hover:bg-[#05112b] transition-all duration-200 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-3"
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.7, type: "spring" }}
                whileHover={{
                  scale: 1.05,
                  y: -3,
                  boxShadow: "0 15px 35px rgba(245, 101, 101, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-label="Scholar"
                >
                  <path d={publicationsContent.callToAction.buttonIcon} />
                </svg>
                <span>{publicationsContent.callToAction.buttonText}</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
