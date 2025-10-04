"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/layouts/navbar/Navbar";
import About from "./components/pages/about";
import Projects from "./components/pages/projects";
import Contact from "./components/pages/contact";
import Blog from "./components/pages/blog";
import Experience from "./components/pages/experience";
import Skills from "./components/pages/skills";
import Education from "./components/pages/education";
import Certificates from "./components/pages/certificates";
import Achievements from "./components/pages/achievements";
import References from "./components/pages/references";
import Horse from "./components/backgrounds/horse/Horse";
//import TrueFocus from "./components/backgrounds/focus text/text";
import LightRays from "./components/backgrounds/perloader/preloader";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const sections = [
  { key: "about", label: "About", Component: About },
  { key: "skills", label: "Skills", Component: Skills },
  { key: "projects", label: "Projects", Component: Projects },
  { key: "education", label: "Education", Component: Education },
  { key: "experience", label: "Experience", Component: Experience },
  { key: "certificates", label: "Certificates", Component: Certificates },
  { key: "achievements", label: "Achievements", Component: Achievements },
  { key: "references", label: "References", Component: References },
  { key: "blog", label: "Blog", Component: Blog },
  { key: "contact", label: "Contact", Component: Contact },
];

function Preloader({ onDone }: { onDone: () => void }) {
  const name = "DINUKA WICKRAMARATHNA";
  const [displayed, setDisplayed] = useState("");
  const [clock, setClock] = useState("");
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    function showTime() {
      const date = new Date();
      let h = date.getHours();
      const m = date.getMinutes();
      const s = date.getSeconds();
      let session = "AM";
      if (h === 0) h = 12;
      if (h > 12) {
        h = h - 12;
        session = "PM";
      }
      const hh = h < 10 ? "0" + h : h.toString();
      const mm = m < 10 ? "0" + m : m.toString();
      const ss = s < 10 ? "0" + s : s.toString();
      setClock(`${hh}:${mm}:${ss} ${session}`);
    }
    showTime();
    const interval = setInterval(showTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (displayed.length < name.length) {
      timeout = setTimeout(() => {
        setDisplayed(name.slice(0, displayed.length + 1));
      }, 150);
    } else {
      // Show particles after typing is complete
      timeout = setTimeout(() => {
        setShowParticles(true);
        timeout = setTimeout(() => {
          onDone();
          setTimeout(onDone, 500); // short pause before showing main app
        }, 1000);
      }, 800);
    }
    return () => clearTimeout(timeout);
  }, [displayed, name, onDone]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center text-white transition-opacity duration-700 min-h-screen p-4 overflow-hidden">
      {/* LightRays Background */}
      <div className="absolute inset-0 w-full h-full z-0 bg-black">
        <LightRays
          raysOrigin="top-center"
          raysColor="#8B5CF6"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={false}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      {/* Simplified Background - Reduced from 8 to 2 particles */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {[0, 1].map((i) => {
          const colors = ["bg-blue-400/20", "bg-violet-400/20"];
          const colorClass = colors[i];
          return (
            <motion.div
              key={i}
              className={`absolute w-1 h-1 ${colorClass} rounded-full`}
              style={{
                left: `${20 + i * 60}%`,
                top: `${30 + i * 40}%`,
              }}
              animate={{
                y: [0, -40],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 8,
                delay: i * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </div>

      {/* Enhanced Clock */}
      <motion.div
        className="clock absolute top-2 sm:top-4 md:top-6 left-0 right-0 mx-auto text-center text-blue-400 font-mono z-20"
        style={{
          fontSize: "clamp(20px, 5vw, 48px)",
          letterSpacing: "clamp(1px, 0.8vw, 7px)",
          width: "fit-content",
          maxWidth: "100%",
        }}
        id="MyClockDisplay"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {clock}
      </motion.div>

      {/* 3D Name Display */}
      <motion.div
        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 relative flex items-center justify-center z-20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        {/* Fallback 2D text only during initial typing */}
        {displayed.length < 3 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-20"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent font-extrabold tracking-wide text-center px-4">
              {displayed}
            </span>
          </motion.div>
        )}

        {/* Custom Typing Effect with Focus */}
        <motion.div
          className="w-full h-full flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: displayed.length > 0 ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative flex gap-1 sm:gap-2 md:gap-3 lg:gap-4 justify-center items-center flex-wrap">
            {displayed.split("").map((char, index) => {
              const isLastChar = index === displayed.length - 1;
              const isSpace = char === " ";
              const isSecondPart = index >= 6; // "DINUKA " is 6 characters

              return (
                <span
                  key={index}
                  className={`relative text-[1.5rem] sm:text-[2rem] md:text-[2.5rem] lg:text-[3rem] font-black transition-all duration-300 ${
                    isLastChar && !isSpace
                      ? "text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                      : "text-white"
                  } ${isSpace && isSecondPart ? "w-full" : ""}`}
                  style={{
                    filter: isLastChar && !isSpace ? "blur(0px)" : "blur(1px)",
                  }}
                >
                  {char}
                  {isLastChar && !isSpace && (
                    <span
                      className="absolute inset-0 border-2 border-blue-400 rounded-sm opacity-80"
                      style={{
                        boxShadow: "0 0 10px rgba(59, 130, 246, 0.6)",
                      }}
                    />
                  )}
                </span>
              );
            })}
          </div>
        </motion.div>
      </motion.div>

      {/* Success Message */}
      {showParticles && (
        <motion.div
          className="absolute bottom-20 sm:bottom-24 md:bottom-28 left-1/2 transform -translate-x-1/2 z-30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-center gap-2 text-blue-300 text-lg">
            <Sparkles className="w-5 h-5" />
            <span>Ready to explore!</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </motion.div>
      )}

      {/* Simplified Horse Animation */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <Horse />
      </div>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState("about");
  const [loading, setLoading] = useState(true);
  const ActiveSection = sections.find((s) => s.key === active)?.Component;

  return (
    <div className="w-full min-h-screen flex flex-col">
      {loading && <Preloader onDone={() => setLoading(false)} />}
      {!loading && (
        <>
          <Navbar active={active} setActiveSection={setActive} />
          <main className="relative flex-1 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="w-full h-full flex items-center justify-center"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration: 0.15,
                  ease: "easeOut",
                }}
              >
                {ActiveSection && (
                  <ActiveSection setActiveSection={setActive} />
                )}
              </motion.div>
            </AnimatePresence>
          </main>
        </>
      )}
    </div>
  );
}
