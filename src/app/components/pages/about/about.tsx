"use client";
import React, {
  useEffect,
  useState,
  useRef,
  Suspense,
  useCallback,
  useMemo,
  lazy,
} from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { Code2, Camera } from "lucide-react";
import { aboutContent, getFormattedExperience, getProjectsCount } from "@/app/components/content/about";
import Footer from "@/app/components/layouts/footer/Footer";
import ProfileSkeleton from "@/app/components/pages/data/about/components/ProfileSkeleton";
import MainProfileCard from "@/app/components/pages/data/about/components/MainProfileCard";

// Lazy load heavy background components for better performance
const GlobeBackground = lazy(() => import("@/app/components/backgrounds/globe/GlobeBackground"));
const FloatingParticles = lazy(() => import("@/app/components/pages/data/about/components/FloatingParticles"));
const AnimatedStats = lazy(() => import("@/app/components/pages/data/about/components/AnimatedStats"));
const PerformanceMonitor = lazy(() => import("@/app/components/pages/data/about/components/PerformanceMonitor"));
const RollingGallery = lazy(() => import("@/app/components/backgrounds/rolling gallery/gallery").then(m => ({ default: m.RollingGallery })));

interface AboutProps {
  setActiveSection?: (key: string) => void;
}

const roles = aboutContent.roles;
const skills = aboutContent.skills;

export default function About({ setActiveSection }: AboutProps = {}) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [showCvPreview, setShowCvPreview] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Check if CV button should be enabled (default: true if not set)
  const enableCvButton = process.env.NEXT_PUBLIC_ENABLE_CV_BUTTON !== "false";
  // Optimize scroll progress - only track when visible
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Profile images array
  const profileImages = aboutContent.profileImages;

  // Profile image rotation effect
  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % profileImages.length
      );
    }, 2000);

    return () => clearInterval(imageTimer);
  }, [profileImages.length]);

  // Detect mobile devices to tweak preview behavior (client-side only)
  useEffect(() => {
    const ua = navigator.userAgent || "";
    setIsMobile(/Android|iPhone|iPad|iPod/i.test(ua));
  }, []);

  // Initialize service worker - defer to avoid blocking initial render
  useEffect(() => {
    // Defer service worker initialization to improve initial load
    const timer = setTimeout(() => {
      // Register service worker directly (not using hook to avoid rules violation)
      if ("serviceWorker" in navigator && process.env.NODE_ENV === "production") {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("SW registered: ", registration);
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError);
          });
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Typing animation for roles - optimized with useMemo for dependencies
  const typingConfig = useMemo(() => ({
    typingSpeed: aboutContent.animation.typingSpeed,
    typingPause: aboutContent.animation.typingPause,
    deletingSpeed: aboutContent.animation.deletingSpeed,
  }), []);

  useEffect(() => {
    if (!isVisible) return; // Only animate when visible

    let timeout: NodeJS.Timeout;
    if (typing) {
      if (displayed.length < roles[roleIndex].length) {
        timeout = setTimeout(() => {
          setDisplayed(roles[roleIndex].slice(0, displayed.length + 1));
        }, typingConfig.typingSpeed);
      } else {
        timeout = setTimeout(
          () => setTyping(false),
          typingConfig.typingPause
        );
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, typingConfig.deletingSpeed);
      } else {
        setTyping(true);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex, typingConfig, isVisible]);

  // Intersection Observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setShowCard(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Entrance animation for card (fallback)
  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => setShowCard(true), 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  // Typing animation for code block
  const [codeDisplayed, setCodeDisplayed] = useState("");
  const [codeTyping, setCodeTyping] = useState(true);
  const [codeArrayIndex, setCodeArrayIndex] = useState(0);
  const [codeDone] = useState(false);

  useEffect(() => {
    if (codeDone) return;
    let timeout: NodeJS.Timeout;
    if (codeTyping) {
      const currentRole = roles[codeArrayIndex];
      if (codeDisplayed.length < currentRole.length) {
        timeout = setTimeout(() => {
          setCodeDisplayed(currentRole.slice(0, codeDisplayed.length + 1));
        }, aboutContent.animation.codeTypingSpeed);
      } else {
        timeout = setTimeout(
          () => setCodeTyping(false),
          aboutContent.animation.codePause
        );
      }
    } else {
      if (codeArrayIndex < roles.length - 1) {
        timeout = setTimeout(() => {
          setCodeArrayIndex((prev) => prev + 1);
          setCodeDisplayed("");
          setCodeTyping(true);
        }, aboutContent.animation.codeChangeDelay);
      } else {
        // Loop the animation: clear and restart from first role
        timeout = setTimeout(() => {
          setCodeArrayIndex(0);
          setCodeDisplayed("");
          setCodeTyping(true);
        }, aboutContent.animation.codeChangeDelay);
      }
    }
    return () => clearTimeout(timeout);
  }, [codeDisplayed, codeTyping, codeArrayIndex, codeDone]);

  const openCvPreview = useCallback(async () => {
    let ok = false;
    try {
      const res = await fetch("/api/cv-webhook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source: "about_cv_button" }),
      });
      ok = res.ok;
      if (!res.ok) {
        // Attempt to read details for debugging
        const data = await res.json().catch(() => null);
        console.warn("CV webhook failed", data || res.statusText);
      }
    } catch (e) {
      console.warn("CV webhook error", e);
    } finally {
      if (!ok) {
        // Optional UX: brief toast substitute
        console.info("Could not reach Discord webhook. Check server env.");
      }
      // Always use in-app modal; mobile will render image instead of PDF
      setShowCvPreview(true);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-full relative flex flex-col items-center justify-start overflow-x-hidden px-2 sm:px-4 py-4 sm:py-8"
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Fixed Background Components - Lazy loaded for performance */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={null}>
          <GlobeBackground />
        </Suspense>
        <Suspense fallback={null}>
          <FloatingParticles />
        </Suspense>
      </div>
      {/* Performance Monitor - Only in development */}
      {process.env.NODE_ENV === "development" && (
        <Suspense fallback={null}>
          <PerformanceMonitor />
        </Suspense>
      )}

      {/* Enhanced Stats Section - Lazy loaded */}
      <Suspense fallback={null}>
        <AnimatedStats />
      </Suspense>

      {/* Main Content Container */}
      <Suspense fallback={<ProfileSkeleton />}>
        <div className="relative z-10 w-full max-w-7xl mx-auto pb-16 flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8 lg:gap-12">
          {/* Enhanced Glassmorphism Card - Left Side on Desktop */}
          <MainProfileCard
            showCard={showCard}
            profileImages={profileImages}
            currentImageIndex={currentImageIndex}
            aboutContent={aboutContent}
            displayed={displayed}
            roles={roles}
            roleIndex={roleIndex}
            skills={skills}
            openCvPreview={openCvPreview}
            enableCvButton={enableCvButton}
          />

          {/* Enhanced Tech Stack Section - Better Desktop Layout */}
          <motion.div
            className="hidden lg:block w-full max-w-md mx-auto lg:mx-0 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-900/70 via-blue-900/30 to-gray-900/70 backdrop-blur-xl rounded-2xl p-6 border border-blue-500/30 shadow-lg shadow-blue-500/20"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.h4
                className="text-lg font-bold text-blue-300 mb-4 flex items-center gap-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Code2 className="w-5 h-5" />
                Tech Stack Architecture
              </motion.h4>

              <div className="space-y-4">
                {/* Frontend Layer */}
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${aboutContent.techStack.frontend.color} rounded-xl border ${aboutContent.techStack.frontend.borderColor} flex items-center justify-center`}
                  >
                    <motion.div
                      className={`w-6 h-6 ${aboutContent.techStack.frontend.dotColor} rounded-full`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">
                      {aboutContent.techStack.frontend.title}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {aboutContent.techStack.frontend.description}
                    </div>
                  </div>
                </motion.div>

                {/* Backend Layer */}
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <div
                    className={`w-10 h-10 bg-gradient-to-br ${aboutContent.techStack.backend.color} rounded-xl border ${aboutContent.techStack.backend.borderColor} flex items-center justify-center ml-2`}
                  >
                    <motion.div
                      className={`w-5 h-5 ${aboutContent.techStack.backend.dotColor} rounded-full`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">
                      {aboutContent.techStack.backend.title}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {aboutContent.techStack.backend.description}
                    </div>
                  </div>
                </motion.div>

                {/* Database Layer */}
                <motion.div
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <div
                    className={`w-8 h-8 bg-gradient-to-br ${aboutContent.techStack.database.color} rounded-xl border ${aboutContent.techStack.database.borderColor} flex items-center justify-center ml-4`}
                  >
                    <motion.div
                      className={`w-4 h-4 ${aboutContent.techStack.database.dotColor} rounded-full`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">
                      {aboutContent.techStack.database.title}
                    </div>
                    <div className="text-gray-400 text-xs">
                      {aboutContent.techStack.database.description}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Tech Stack Stats */}
              <motion.div
                className="mt-4 pt-4 border-t border-blue-500/20"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-400">
                      {skills.length}
                    </div>
                    <div className="text-xs text-gray-400">Technologies</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-green-400">
                      {getFormattedExperience()}
                    </div>
                    <div className="text-xs text-gray-400">Experience</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Timeline Section */}
          <motion.div
            className="hidden lg:block w-full max-w-md mx-auto lg:mx-0 mt-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-900/60 via-blue-900/20 to-gray-900/60 backdrop-blur-xl rounded-2xl p-4 border border-blue-500/30 shadow-lg shadow-blue-500/20"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <motion.h4
                className="text-sm font-semibold text-blue-300 mb-3 flex items-center gap-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </motion.svg>
                Journey Timeline
              </motion.h4>
              <div className="space-y-3">
                {aboutContent.timeline.map((item, index) => (
                  <motion.div
                    key={item.year}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: item.delay }}
                  >
                    <motion.div
                      className={`w-2 h-2 ${item.color} rounded-full mt-2 flex-shrink-0`}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    />
                    <div>
                      <motion.div
                        className="text-white text-sm font-medium"
                        whileHover={{ color: "#60a5fa" }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.year}
                      </motion.div>
                      <motion.div
                        className="text-gray-400 text-xs"
                        whileHover={{ color: "#9ca3af" }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.place}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Animated JS code block with editor bar - Right Side on Desktop */}
          <motion.div
            className="relative z-10 w-full max-w-full sm:max-w-xl lg:max-w-lg xl:max-w-xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Enhanced Floating Stats Card - Mobile Responsive */}
            <motion.div
              className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 z-20 bg-gradient-to-br from-gray-900/90 via-blue-900/40 to-gray-900/90 backdrop-blur-xl rounded-xl sm:rounded-2xl p-2 sm:p-3 border border-blue-500/30 shadow-lg sm:shadow-2xl shadow-blue-500/20"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 1.0, type: "spring" }}
              whileHover={{
                scale: 1.1,
                rotate: 5,
                boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
              }}
            >
              <motion.div
                className="text-center"
                animate={{
                  scale: [1, 1.05, 1],
                  color: ["#60a5fa", "#3b82f6", "#60a5fa"],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="text-lg sm:text-2xl font-bold text-blue-400">
                  {roles.length}
                </div>
                <div className="text-xs text-gray-300">Roles</div>
              </motion.div>
            </motion.div>

            {/* Enhanced Code Editor Container with Glassmorphism */}
            <div className="w-full">
              {/* Enhanced Editor top bar with glassmorphism */}
              <div className="flex items-center gap-2 bg-gradient-to-r from-gray-800/80 via-gray-700/60 to-gray-800/80 backdrop-blur-xl rounded-t-2xl px-3 sm:px-4 py-3 border-b border-blue-500/30 shadow-lg">
                <motion.div
                  className="flex items-center gap-2"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
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
                      d="M12 17a2 2 0 002-2v-2a2 2 0 00-2-2 2 2 0 00-2 2v2a2 2 0 002 2zm6-2v-2a6 6 0 10-12 0v2a2 2 0 00-2 2v2a2 2 0 002 2h12a2 2 0 002-2v-2a2 2 0 00-2-2z"
                    />
                  </svg>
                  <span className="text-xs text-blue-300 font-mono font-semibold">
                    {aboutContent.codeBlock.filename}
                  </span>
                </motion.div>

                {/* Enhanced Editor Controls */}
                <div className="ml-auto flex items-center gap-2">
                  <motion.div
                    className="w-3 h-3 bg-red-500 rounded-full"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-yellow-500 rounded-full"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <motion.div
                    className="w-3 h-3 bg-green-500 rounded-full"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                </div>
              </div>

              {/* Enhanced Code Content with Glassmorphism */}
              <div className="bg-gradient-to-br from-gray-900/90 via-gray-800/60 to-gray-900/90 backdrop-blur-xl text-left rounded-b-2xl shadow-2xl p-4 sm:p-5 lg:p-5 xl:p-6 text-xs sm:text-sm font-mono text-gray-100 w-full overflow-x-auto border border-t-0 border-blue-500/30 relative overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-transparent to-purple-500/20" />
                  <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.1),transparent_50%)]" />
                  <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]" />
                </div>

                {/* Code Content */}
                <div className="relative z-10">
                  <span className="text-green-400 font-semibold">{`const developer = {`}</span>
                  <br />
                  {/* name field */}
                  <span className="block pl-4 sm:pl-6">
                    <span className="text-white">name</span>
                    <span className="text-white">: </span>
                    <span className="text-yellow-400">&quot;</span>
                    <span className="text-blue-400 font-medium">
                      {aboutContent.personal.name}
                    </span>
                    <span className="text-yellow-400">&quot;</span>
                    <span className="text-white">,</span>
                  </span>

                  {/* roles array */}
                  <span className="block pl-4 sm:pl-6 text-white">
                    roles: [
                  </span>
                  {useMemo(
                    () =>
                      roles.map((role, i) => (
                        <span key={role} className="block pl-8 sm:pl-10">
                          <span className="text-yellow-400">&quot;</span>
                          <span className="text-blue-400 font-medium">
                            {i < codeArrayIndex
                              ? role
                              : i === codeArrayIndex
                              ? codeDisplayed
                              : ""}
                            {i === codeArrayIndex && (
                              <motion.span
                                className="border-r-2 border-blue-400 animate-pulse"
                                animate={{
                                  borderColor: [
                                    "#60a5fa",
                                    "#3b82f6",
                                    "#60a5fa",
                                  ],
                                  boxShadow: [
                                    "0 0 5px rgba(59, 130, 246, 0.5)",
                                    "0 0 15px rgba(59, 130, 246, 0.8)",
                                    "0 0 5px rgba(59, 130, 246, 0.5)",
                                  ],
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                            )}
                          </span>
                          <span className="text-yellow-400">&quot;</span>
                          <span className="text-white">
                            {i < roles.length - 1 ? "," : ""}
                          </span>
                        </span>
                      )),
                    [codeArrayIndex, codeDisplayed]
                  )}
                  <span className="block pl-4 sm:pl-6 text-white">]</span>
                  <br />
                  <span className="text-green-400 font-semibold">{`};`}</span>
                </div>

                {/* Floating Code Particles */}
                <div className="absolute inset-0 pointer-events-none">
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400/60 rounded-full"
                      style={{
                        left: `${15 + i * 25}%`,
                        top: `${20 + i * 20}%`,
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 0.8, 0],
                        y: [0, -10, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.5,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Enhanced Floating Achievements Section */}
            <motion.div
              className="hidden lg:block mt-6 space-y-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {/* Enhanced Current Role Highlight */}
              <motion.div
                className="bg-gradient-to-br from-blue-900/40 via-purple-900/20 to-blue-900/40 backdrop-blur-xl rounded-2xl p-4 border border-blue-500/30 shadow-lg shadow-blue-500/20"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="w-3 h-3 bg-blue-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <h4 className="text-sm font-semibold text-blue-300">
                    Currently Typing
                  </h4>
                </div>
                <motion.p
                  className="text-white text-lg font-mono"
                  animate={{
                    color: ["#ffffff", "#60a5fa", "#ffffff"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  {roles[roleIndex]}
                </motion.p>
                <div className="mt-2 text-xs text-gray-400">
                  Role {roleIndex + 1} of {roles.length}
                </div>
              </motion.div>

              {/* Enhanced Skills Progress */}
              <motion.div
                className="bg-gradient-to-br from-green-900/40 via-emerald-900/20 to-green-900/40 backdrop-blur-xl rounded-2xl p-4 border border-green-500/30 shadow-lg shadow-green-500/20"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(34, 197, 94, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="w-3 h-3 bg-green-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <h4 className="text-sm font-semibold text-green-300">
                    Top Skills
                  </h4>
                </div>
                <div className="space-y-2">
                  {skills.slice(0, 3).map((skill, index) => (
                    <motion.div
                      key={skill}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                    >
                      <span className="text-white text-sm">{skill}</span>
                      <motion.div
                        className="w-16 bg-white/10 rounded-full h-2 overflow-hidden"
                        whileHover={{ scale: 1.1 }}
                      >
                        <motion.div
                          className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${85 + index * 5}%` }}
                          transition={{
                            duration: 1.5,
                            delay: 1.6 + index * 0.2,
                          }}
                        />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced Quick Stats */}
              <motion.div
                className="bg-gradient-to-br from-purple-900/40 via-pink-900/20 to-purple-900/40 backdrop-blur-xl rounded-2xl p-4 border border-purple-500/30 shadow-lg shadow-purple-500/20"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(147, 51, 234, 0.3)",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    className="w-3 h-3 bg-purple-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  />
                  <h4 className="text-sm font-semibold text-purple-300">
                    Quick Stats
                  </h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.8, type: "spring" }}
                  >
                    <div className="text-xl font-bold text-purple-400">
                      {skills.length}
                    </div>
                    <div className="text-xs text-gray-400">Technologies</div>
                  </motion.div>
                  <motion.div
                    className="text-center"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 2.0, type: "spring" }}
                  >
                    <div className="text-xl font-bold text-purple-400">
                      {getFormattedExperience()}
                    </div>
                    <div className="text-xs text-gray-400">Experience</div>
                  </motion.div>
                  <motion.div
                    className="text-center col-span-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 2.2, type: "spring" }}
                  >
                    <div className="text-xl font-bold text-purple-400">
                      {getProjectsCount()}
                    </div>
                    <div className="text-xs text-gray-400">Projects</div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Suspense>

      {/* Photo Gallery Section - Full Width at Bottom */}
      <motion.div
        className="w-full max-w-7xl mx-auto mt-12 mb-8"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <motion.div
          className="bg-transparent backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/20"
          whileHover={{
            scale: 1.01,
            boxShadow: "0 25px 50px rgba(59, 130, 246, 0.3)",
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.h4
            className="text-2xl sm:text-3xl font-bold text-white mb-6 flex items-center justify-center gap-3 relative z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
            Photo Gallery
          </motion.h4>

          <div className="relative h-96 sm:h-[28rem] md:h-[36rem] lg:h-[40rem] xl:h-[44rem] rounded-2xl overflow-hidden bg-transparent">
            <Suspense fallback={null}>
              <RollingGallery autoplay={true} pauseOnHover={false} />
            </Suspense>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer Section */}
      <Footer setActiveSection={setActiveSection} />

      {/* CV Preview Modal */}
      {showCvPreview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70"
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
        >
          <div className="relative w-[100vw] h-[100vh] sm:w-[95vw] sm:max-w-5xl sm:h-[85vh] bg-gray-900 rounded-none sm:rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-gray-800/80 border-b border-white/10">
              <div className="text-sm text-gray-200 font-semibold">
                CV Preview (view only)
              </div>
              <button
                onClick={() => setShowCvPreview(false)}
                className="px-3 py-1 text-xs rounded-md bg-white/10 text-white hover:bg-white/20"
              >
                Close
              </button>
            </div>
            <div className="w-full h-full">
              {isMobile ? (
                <div className="w-full h-full bg-black flex items-center justify-center">
                  <Image
                    src={aboutContent.personal.cvImage}
                    alt="CV Preview"
                    width={800}
                    height={1000}
                    className="max-w-full max-h-full object-contain select-none"
                    onContextMenu={(e) => e.preventDefault()}
                    draggable={false}
                  />
                </div>
              ) : (
                <object
                  data={`${aboutContent.personal.cvFile}#toolbar=0&navpanes=0&scrollbar=0`}
                  type="application/pdf"
                  className="w-full h-full overflow-auto custom-scrollbar"
                >
                  <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-center p-4 text-gray-200">
                    <div>
                      Inline PDF preview is not supported on this device.
                    </div>
                    <button
                      onClick={() =>
                        window.open(
                          `${aboutContent.personal.cvFile}#toolbar=0&navpanes=0`,
                          "_blank",
                          "noopener,noreferrer"
                        )
                      }
                      className="px-4 py-2 rounded-md bg-blue-950 text-white hover:bg-blue-900"
                    >
                      Open Fullscreen Preview
                    </button>
                  </div>
                </object>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
