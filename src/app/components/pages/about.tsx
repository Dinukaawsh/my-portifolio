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

// Loading Skeleton Component
function ProfileSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-4 sm:mb-6"></div>
      <div className="h-6 sm:h-8 md:h-10 bg-gray-300 dark:bg-gray-600 rounded w-48 mx-auto mb-2"></div>
      <div className="h-4 sm:h-5 md:h-6 bg-gray-300 dark:bg-gray-600 rounded w-32 mx-auto mb-4"></div>
      <div className="h-3 sm:h-4 bg-gray-300 dark:bg-gray-600 rounded w-64 mx-auto mb-4 sm:mb-6"></div>
      <div className="flex flex-wrap gap-2 justify-center mb-4 sm:mb-6">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            className="w-16 h-6 bg-gray-300 dark:bg-gray-600 rounded-full"
          ></div>
        ))}
      </div>
    </div>
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
    <div className="fixed top-20 right-4 z-50 bg-black/80 text-white px-2 py-1 rounded text-xs font-mono">
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
  const sectionRef = useRef<HTMLElement>(null);

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
      className="w-full h-full relative flex flex-col items-center justify-center lg:justify-start overflow-hidden px-2 sm:px-4 py-4 sm:py-8 lg:py-12"
    >
      <GlobeBackground />
      <AnimatedJets />
      <PerformanceMonitor />

      {/* Main Content Container */}
      <Suspense fallback={<ProfileSkeleton />}>
        <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-6 sm:gap-8 lg:gap-12">
          {/* Glassmorphism Card - Left Side on Desktop */}
          <div
            className={`relative z-10 w-full max-w-lg sm:max-w-xl lg:max-w-md xl:max-w-lg mx-auto lg:mx-0 p-4 sm:p-6 lg:p-6 xl:p-8 rounded-3xl shadow-2xl border border-blue-500/30 bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 backdrop-blur-xl flex flex-col items-center lg:items-start text-center lg:text-left transition-all duration-700 ${
              showCard ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            tabIndex={0}
            aria-label="About Dinuka Ashan"
          >
            {/* Profile Image */}
            <div className="relative mb-4 sm:mb-6">
              <Image
                src="/my.jpg"
                alt="Dinuka Ashan profile"
                width={120}
                height={120}
                priority
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full shadow-lg border-4 border-blue-500 object-cover"
              />
            </div>

            {/* Name and Title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 tracking-tight text-white">
              Dinuka Ashan
            </h2>
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl text-blue-400 font-semibold mb-4 min-h-[1.5rem] sm:min-h-[2rem] md:min-h-[2.5rem] flex items-center justify-center">
              {displayed}
              <span className="border-r-2 border-blue-400 animate-pulse ml-1" />
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

            {/* Skills */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4 sm:mb-6">
              {useMemo(
                () =>
                  skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 sm:px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-semibold shadow-sm hover:scale-105 hover:bg-blue-500/30 transition-all duration-200 border border-blue-500/30"
                    >
                      {skill}
                    </span>
                  )),
                []
              )}
            </div>

            {/* Contact Info */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-center mb-4 sm:mb-6 w-full">
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
                    d="M16 12a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0V8a4 4 0 00-8 0v4m8 0v4a4 4 0 01-8 0v-4"
                  />
                </svg>
                <span className="truncate">dinuka.ashan@email.com</span>
              </span>
            </div>

            {/* Download CV Button */}
            <a
              href="#"
              className="inline-block px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/70 transition-all duration-200 mb-4 sm:mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900 text-sm sm:text-base"
              tabIndex={0}
            >
              📄 Download CV
            </a>

            {/* Social Links */}
            <div className="flex gap-4 sm:gap-6 justify-center lg:justify-start items-center">
              <a
                href="https://x.com/DinukaAshan14"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-200 border border-white/20"
                aria-label="X (Twitter)"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 group-hover:text-blue-400 transition-colors duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/dinuka-wickramarathna-88468b214/"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-200 border border-white/20"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 group-hover:text-blue-400 transition-colors duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" />
                </svg>
              </a>
              <a
                href="https://github.com/Dinukaawsh/Dinukaawsh"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 rounded-full bg-white/10 hover:bg-white/20 hover:scale-110 transition-all duration-200 border border-white/20"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300 group-hover:text-white transition-colors duration-200"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            </div>
          </div>

          {/* Animated JS code block with editor bar - Right Side on Desktop */}
          <div className="relative z-10 w-full max-w-full sm:max-w-xl lg:max-w-lg xl:max-w-xl mx-auto lg:mx-0">
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
              <pre className="bg-gray-900/90 text-left rounded-b-xl shadow-lg p-3 sm:p-4 lg:p-4 xl:p-6 text-xs sm:text-sm font-mono text-gray-100 w-full overflow-x-auto border border-t-0 border-gray-800">
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
              </pre>
            </div>
          </div>
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
