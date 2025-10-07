"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  certificatesContent,
  getCertificatesByCategory,
} from "@/app/components/content/certificates";
import { Star, Trophy } from "lucide-react";
import {
  Lightning,
  ElasticHueSlider,
} from "@/app/components/backgrounds/thunderbolt/thunderbolt";

export default function Certificates() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentIndicator, setCurrentIndicator] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [lightningHue, setLightningHue] = useState(220); // Default hue for lightning
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
        (prev) => (prev + 1) % certificatesContent.header.indicators.length
      );
    }, certificatesContent.animation.rotationInterval);
    return () => clearInterval(timer);
  }, []);

  const filteredCertificates =
    activeCategory === "All"
      ? certificatesContent.certificates
      : getCertificatesByCategory(activeCategory);

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

      {/* Lightning Background - Fixed */}
      <div className="fixed inset-0 z-0">
        <Lightning
          hue={lightningHue}
          xOffset={0}
          speed={1.6}
          intensity={0.6}
          size={2}
        />
      </div>

      {/* Floating Certificate Icons */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from(
          { length: certificatesContent.animation.floatingParticles },
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
                  certificatesContent.animation.particleDuration + i * 2,
                delay: i * certificatesContent.animation.particleDelay,
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
          {/* Lightning Hue Control */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <ElasticHueSlider
              value={lightningHue}
              onChange={setLightningHue}
              label="Adjust Lightning Hue"
            />
          </motion.div>

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
            {certificatesContent.header.title}
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-blue-200 max-w-3xl mx-auto px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {certificatesContent.header.subtitle}
          </motion.p>

          {/* Animated Certificate Indicator */}
          <motion.div
            className="flex justify-center gap-2 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {certificatesContent.header.indicators.map((indicator, index) => (
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
            {certificatesContent.categories.map((category, index) => (
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

        {/* Enhanced Certificates Grid */}
        <motion.div
          className="w-full max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredCertificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
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
                {/* Certificate Card */}
                <div className="bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 h-full">
                  {/* Certificate Image */}
                  {certificate.certificateImage && (
                    <div className="mb-6 relative group">
                      <div className="relative w-full h-56 sm:h-60 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800/60 to-gray-900/60 border-2 border-blue-500/30 shadow-2xl shadow-blue-500/20">
                        <Image
                          src={certificate.certificateImage}
                          alt={`${certificate.title} Certificate`}
                          fill
                          className="object-contain transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={certificate.featured}
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Corner Accent */}
                        <div className="absolute top-3 right-3 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* View Button */}
                        <button
                          onClick={() =>
                            setSelectedImage(certificate.certificateImage)
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

                        {/* Certificate Badge */}
                        <div className="absolute bottom-3 left-3 bg-gradient-to-r from-blue-500/90 to-purple-600/90 backdrop-blur-sm rounded-xl px-3 py-1.5 border border-white/20">
                          <span className="text-white text-xs font-semibold flex items-center gap-1">
                            <svg
                              className="w-3 h-3"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Certificate
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Issuer Badge & Featured */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-8 h-8 ${certificate.color} rounded-full flex items-center justify-center text-white`}
                      >
                        <certificate.issuerLogo className="w-5 h-5" />
                      </span>
                      <span className="text-gray-300 text-sm font-medium">
                        {certificate.issuer}
                      </span>
                    </div>
                    {certificate.featured && (
                      <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                        <Star
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                        />
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Certificate Content */}
                  <div className="space-y-4 flex-1">
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2">
                      {certificate.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                      {certificate.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {certificate.skills.map((skill, skillIndex) => (
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
                      <span>{certificate.category}</span>
                      <span>
                        {new Date(certificate.issueDate).toLocaleDateString()}
                      </span>
                    </div>

                    {/* View Certificate Button */}
                    <div className="pt-4">
                      <a
                        href={certificate.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 w-full justify-center"
                      >
                        View Certificate
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
        {filteredCertificates.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4 flex justify-center">
              <Trophy className="w-16 h-16" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No certificates found
            </h3>
            <p className="text-gray-400">
              Try selecting a different category or check back later!
            </p>
          </div>
        )}

        {/* Certificate Summary Stats */}
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
                {certificatesContent.certificates.length}
              </div>
              <div className="text-sm text-blue-200">Total Certificates</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-2xl p-6 text-center border border-purple-500/30"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <div className="text-2xl font-bold text-white mb-1">
                {
                  certificatesContent.certificates.filter(
                    (cert) => cert.featured
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
                    certificatesContent.certificates.map((cert) => cert.issuer)
                  ).size
                }
              </div>
              <div className="text-sm text-green-200">Platforms</div>
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
                    certificatesContent.certificates.flatMap(
                      (cert) => cert.skills
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
                  alt="Certificate"
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
