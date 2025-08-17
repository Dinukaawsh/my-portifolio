"use client";
import React, {
  useEffect,
  useState,
  useRef,
  Suspense,
  useCallback,
  useMemo,
} from "react";
import GlobeBackground from "@/app/components/backgrounds/globe/GlobeBackground";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, TrendingUp, Heart, Target } from "lucide-react";

// Enhanced Loading Skeleton Component with animations
function ProfileSkeleton() {
  return (
    <motion.div
      className="animate-pulse"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-full mx-auto mb-4 sm:mb-6"
        animate={{
          scale: [1, 1.05, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="h-6 sm:h-8 md:h-10 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded w-48 mx-auto mb-2"
        animate={{ width: ["12rem", "14rem", "12rem"] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      <motion.div
        className="h-4 sm:h-5 md:h-6 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded w-32 mx-auto mb-4"
        animate={{ width: ["8rem", "10rem", "8rem"] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
      />
      <motion.div
        className="h-3 sm:h-4 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded w-64 mx-auto mb-4 sm:mb-6"
        animate={{ width: ["16rem", "18rem", "16rem"] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
      />
      <div className="flex flex-wrap gap-2 justify-center mb-4 sm:mb-6">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <motion.div
            key={i}
            className="w-16 h-6 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}

// Floating Particles Component
function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, -200, -300],
            x: [0, Math.random() * 100 - 50],
            opacity: [0, 1, 0.8, 0],
            scale: [0, 1, 1.2, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

// Enhanced Animated Stats Component
function AnimatedStats() {
  const [ref, inView] = useInView({ triggerOnce: true });

  const stats = [
    {
      label: "Years Experience",
      value: 1,
      icon: TrendingUp,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Projects Completed",
      value: 12,
      icon: Target,
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Technologies",
      value: skills.length,
      icon: Code2,
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Happy Clients",
      value: 8,
      icon: Heart,
      color: "from-red-500 to-orange-500",
    },
  ];

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, staggerChildren: 0.1 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-xl p-4 border border-gray-600/30 text-center"
          whileHover={{
            scale: 1.05,
            y: -5,
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <motion.div
            className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <stat.icon className="w-6 h-6 text-white" />
          </motion.div>
          <motion.div
            className="text-2xl font-bold text-white mb-1"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.1 + 0.3,
              type: "spring",
            }}
          >
            {stat.value}+
          </motion.div>
          <div className="text-xs text-gray-400">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

const roles = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Designer",
  "DevOps Engineer",
];

const skills = [
  "React.js",
  "Next.js",
  "Node.js",
  "TypeScript",
  "MongoDB",
  "MySQL",
  "Tailwind CSS",
  "Figma",
  "AWS",
];

function AnimatedJets() {
  const [positions, setPositions] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const requestRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number | undefined>(undefined);

  // Memoize animation function to prevent recreation
  const animate = useCallback((time: number) => {
    if (startTimeRef.current === undefined) startTimeRef.current = time;
    const t = (time - startTimeRef.current) / 1000;

    // Three different parametric paths
    const r = 180;
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;

    setPositions([
      {
        x: cx + r * Math.cos(t),
        y: cy + r * Math.sin(t),
      },
      {
        x: cx + r * 0.7 * Math.cos(t * 0.8 + 2),
        y: cy + r * 0.5 * Math.sin(t * 0.8 + 2.5),
      },
      {
        x: cx + r * 0.9 * Math.cos(t * 1.2 - 1),
        y: cy + r * 0.8 * Math.sin(t * 1.1 - 1.5),
      },
    ]);

    requestRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  return (
    <>
      {positions.map((pos, i) => (
        <span
          key={i}
          className="pointer-events-none z-10"
          style={{
            position: "fixed",
            left: pos.x - 50,
            top: pos.y - 50,
            width: 100,
            height: 100,
            transition: "none",
          }}
        >
          <svg
            fill="#000000"
            width="100"
            height="100"
            viewBox="-7.2 -7.2 38.40 38.40"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M14,4H11.89a1,1,0,0,0-.81.42L7.16,10H5a2,2,0,0,0-2,2H3a2,2,0,0,0,2,2H7.16l3.92,5.58a1,1,0,0,0,.81.42H14l-1-6h3l1.71,1.71a1,1,0,0,0,.7.29H21l-2-4,2-4H18.41a1,1,0,0,0-.7.29L16,10H13Z"
                style={{ fill: "#2ca9bc" }}
              ></path>
              <path
                d="M14,4H11.89a1,1,0,0,0-.81.42L7.16,10H5a2,2,0,0,0-2,2H3a2,2,0,0,0,2,2H7.16l3.92,5.58a1,1,0,0,0,.81.42H14l-1-6h3l1.71,1.71a1,1,0,0,0,.7.29H21l-2-4,2-4H18.41a1,1,0,0,0-.7.29L16,10H13Z"
                style={{
                  fill: "none",
                  stroke: "#000",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                }}
              ></path>
            </g>
          </svg>
        </span>
      ))}
    </>
  );
}

// Performance monitoring component
function PerformanceMonitor() {
  const [fps, setFps] = useState(0);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    const measureFPS = () => {
      frameCount.current++;
      const currentTime = performance.now();

      if (currentTime - lastTime.current >= 1000) {
        setFps(
          Math.round(
            (frameCount.current * 1000) / (currentTime - lastTime.current)
          )
        );
        frameCount.current = 0;
        lastTime.current = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed top-24 right-4 z-50 bg-black/80 text-white px-2 py-1 rounded text-xs font-mono">
      FPS: {fps}
    </div>
  );
}

// Service Worker registration hook
function useServiceWorker() {
  useEffect(() => {
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
  }, []);
}

export default function About() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [showCard, setShowCard] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Profile images array
  const profileImages = ["/my.jpg", "/my2.jpg", "/my3.jpg"];

  // Profile image rotation effect
  useEffect(() => {
    const imageTimer = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % profileImages.length
      );
    }, 2000);

    return () => clearInterval(imageTimer);
  }, [profileImages.length]);

  // Initialize service worker
  useServiceWorker();

  // Typing animation for roles
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (typing) {
      if (displayed.length < roles[roleIndex].length) {
        timeout = setTimeout(() => {
          setDisplayed(roles[roleIndex].slice(0, displayed.length + 1));
        }, 80);
      } else {
        timeout = setTimeout(() => setTyping(false), 1200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 40);
      } else {
        setTyping(true);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

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
  const codePrefix = "const developer = [";
  const codeSuffix = "];";
  const [codeDisplayed, setCodeDisplayed] = useState("");
  const [codeTyping, setCodeTyping] = useState(true);
  const [codeArrayIndex, setCodeArrayIndex] = useState(0);
  const [codeDone, setCodeDone] = useState(false);

  useEffect(() => {
    if (codeDone) return;
    let timeout: NodeJS.Timeout;
    if (codeTyping) {
      const currentRole = roles[codeArrayIndex];
      if (codeDisplayed.length < currentRole.length) {
        timeout = setTimeout(() => {
          setCodeDisplayed(currentRole.slice(0, codeDisplayed.length + 1));
        }, 60);
      } else {
        timeout = setTimeout(() => setCodeTyping(false), 700);
      }
    } else {
      if (codeArrayIndex < roles.length - 1) {
        timeout = setTimeout(() => {
          setCodeArrayIndex((prev) => prev + 1);
          setCodeDisplayed("");
          setCodeTyping(true);
        }, 400);
      } else {
        setCodeDone(true);
      }
    }
    return () => clearTimeout(timeout);
  }, [codeDisplayed, codeTyping, codeArrayIndex, codeDone]);

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

      {/* Fixed Background Components */}
      <div className="fixed inset-0 z-0">
        <GlobeBackground />
        <AnimatedJets />
        <FloatingParticles />
      </div>
      <PerformanceMonitor />

      {/* Enhanced Stats Section */}
      <AnimatedStats />

      {/* Main Content Container */}
      <Suspense fallback={<ProfileSkeleton />}>
        <div className="relative z-10 w-full max-w-7xl mx-auto pb-16 flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8 lg:gap-12">
          {/* Enhanced Glassmorphism Card - Left Side on Desktop */}
          <motion.div
            className="relative z-10 w-full max-w-lg sm:max-w-xl lg:max-w-md xl:max-w-lg mx-auto lg:mx-0 p-4 sm:p-6 lg:p-6 xl:p-8 rounded-3xl shadow-2xl border border-blue-500/30 bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 backdrop-blur-xl flex flex-col items-center lg:items-start text-center lg:text-left"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={showCard ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
            }}
            tabIndex={0}
            aria-label="About Dinuka Ashan"
          >
            {/* Enhanced Profile Image */}
            <motion.div
              className="relative mb-4 sm:mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="relative"
                animate={{
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
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
                {/* Animated border glow */}
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
              {/* Enhanced Floating Achievement Badge - Mobile Responsive */}
              <motion.div
                className="absolute -top-8 -right-8 sm:-top-2 sm:-right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-1 py-0.5 sm:px-2 sm:py-1 rounded-full shadow-lg z-10"
                animate={{
                  y: [0, -3, 0],
                  scale: [1, 1.05, 1],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.1, rotate: 180 }}
              >
                <span className="text-xs sm:text-sm">⭐ Full-Stack</span>
              </motion.div>
            </motion.div>

            {/* Enhanced Name and Title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 tracking-tight text-white">
              Dinuka Ashan
            </h2>
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-400 font-semibold mb-4 min-h-[1.5rem] sm:min-h-[2rem] md:min-h-[2.5rem] flex items-center justify-center">
              <motion.div
                className="relative inline-flex items-center"
                animate={{
                  scale: [1, 1.02, 1],
                  filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
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

                  {/* Enhanced Blinking Cursor */}
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

                {/* Floating Particles around the text */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-blue-400 rounded-full"
                      style={{
                        left: `${20 + i * 30}%`,
                        top: `${-20 + i * 10}%`,
                      }}
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

            {/* Description */}
            <p className="text-xs sm:text-sm md:text-base text-gray-200 mb-4 sm:mb-6 leading-relaxed max-w-md">
              I&apos;m a passionate Full Stack Developer and Information
              Technology student, following by Bachelor of Information
              Technology (Hons), specializing in modern web technologies. With
              expertise in React.js, Next.js, and Node.js, I build scalable
              applications that deliver exceptional user experiences. My backend
              skills include express.js, while I&apos;m proficient in both SQL
              and NoSQL databases. I&apos;m committed to writing clean,
              maintainable code and staying current with industry best
              practices.
            </p>

            {/* Enhanced Skills */}
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
                []
              )}
            </div>

            {/* Enhanced Typing Progress Indicator */}
            <motion.div
              className="w-full mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                <motion.span
                  animate={{
                    color: ["#9ca3af", "#60a5fa", "#9ca3af"],
                  }}
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
                  {Math.round(
                    (displayed.length / roles[roleIndex].length) * 100
                  )}
                  %
                </motion.span>
              </div>

              {/* Enhanced Progress Bar */}
              <div className="relative w-full bg-white/10 rounded-full h-2 overflow-hidden">
                {/* Animated Background */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Main Progress Bar */}
                <motion.div
                  className="relative h-2 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-full"
                  style={{
                    width: `${
                      (displayed.length / roles[roleIndex].length) * 100
                    }%`,
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

                {/* Shimmer Effect */}
                <motion.div
                  className="absolute top-0 right-0 w-8 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                {/* Floating Particles on Progress */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full"
                      style={{
                        left: `${10 + i * 40}%`,
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                      animate={{
                        scale: [0, 1, 0],
                        opacity: [0, 0.6, 0],
                        y: [0, -5, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>
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
                <span className="truncate">Colombo, Sri Lanka</span>
              </span>
              <a
                href="mailto:dinukaaw.sh2@gmail.com"
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
                  dinukaaw.sh@gmail.com
                </span>
              </a>
            </div>

            {/* Enhanced Download CV Button */}
            <motion.a
              href="/dinuka wickramarathna.pdf"
              download="Dinuka_Wickramarathna_CV.pdf"
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
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                📄 Download CV
              </motion.span>
            </motion.a>

            {/* Enhanced Social Links */}
            <motion.div
              className="flex gap-4 sm:gap-6 justify-center lg:justify-start items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {[
                {
                  href: "https://x.com/DinukaAshan14",
                  icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                  label: "X (Twitter)",
                  color: "group-hover:text-blue-400",
                },
                {
                  href: "https://www.linkedin.com/in/dinuka-wickramarathna-88468b214/",
                  icon: "M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z",
                  label: "LinkedIn",
                  color: "group-hover:text-blue-400",
                },
                {
                  href: "https://github.com/Dinukaawsh/Dinukaawsh",
                  icon: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
                  label: "GitHub",
                  color: "group-hover:text-white",
                },
              ].map((social, index) => (
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
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/40 to-purple-500/40 rounded-xl border border-blue-400/50 flex items-center justify-center">
                    <motion.div
                      className="w-6 h-6 bg-blue-400 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">
                      Frontend
                    </div>
                    <div className="text-gray-400 text-xs">
                      React, Next.js, TypeScript
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
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500/40 to-emerald-500/40 rounded-xl border border-green-400/50 flex items-center justify-center ml-2">
                    <motion.div
                      className="w-5 h-5 bg-green-400 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">
                      Backend
                    </div>
                    <div className="text-gray-400 text-xs">
                      Node.js, Express.js, APIs
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
                  <div className="w-8 h-8 bg-gradient-to-br from-orange-500/40 to-red-500/40 rounded-xl border border-orange-400/50 flex items-center justify-center ml-4">
                    <motion.div
                      className="w-4 h-4 bg-orange-400 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7],
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold text-sm">
                      Database
                    </div>
                    <div className="text-gray-400 text-xs">
                      MongoDB, MySQL, Firebase
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
                    <div className="text-2xl font-bold text-green-400">1+</div>
                    <div className="text-xs text-gray-400">Years Exp</div>
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
            transition={{ duration: 0.8, delay: 0.4 }}
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
                {[
                  {
                    year: "2021 - Present",
                    place: "ESOFT Metro Campus",
                    color: "bg-blue-400",
                    delay: 0.7,
                  },
                  {
                    year: "2025 - Present",
                    place: "Twist Digital",
                    color: "bg-green-400",
                    delay: 0.8,
                  },
                  {
                    year: "Future",
                    place: "Senior Developer",
                    color: "bg-purple-400",
                    delay: 0.9,
                  },
                ].map((item, index) => (
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
            <div className="w-full">
              {/* Editor top bar with lock and filename */}
              <div className="flex items-center gap-2 bg-gray-800/80 rounded-t-xl px-3 sm:px-4 py-2 border-b border-gray-700">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 flex-shrink-0"
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
                <span className="text-xs text-gray-300 font-mono">
                  developer.js
                </span>
              </div>
              <pre className="bg-gray-900/90 text-left rounded-b-xl shadow-lg p-3 sm:p-4 lg:p-4 xl:p-6 text-xs sm:text-sm font-mono text-gray-100 w-full overflow-x-auto border border-t-0 border-gray-800 relative">
                <span className="text-green-400">{codePrefix}</span>
                <br />
                {useMemo(
                  () =>
                    roles.map((role, i) => (
                      <span key={role} className="block pl-4 sm:pl-6">
                        <span className="text-yellow-400">&quot;</span>
                        <span className="text-blue-400">
                          {i < codeArrayIndex
                            ? role
                            : i === codeArrayIndex
                            ? codeDisplayed
                            : ""}
                          {i === codeArrayIndex && (
                            <span className="border-r-2 border-blue-400 animate-pulse" />
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
                <span className="text-green-400">{codeSuffix}</span>

                {/* Code Animation Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-pulse pointer-events-none" />
              </pre>
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
                    <div className="text-xl font-bold text-purple-400">1+</div>
                    <div className="text-xs text-gray-400">Years Exp</div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </Suspense>

      {/* Floating animated background shapes */}
      <style>{`
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 8s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
