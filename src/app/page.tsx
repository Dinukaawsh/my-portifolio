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
import Horse from "./components/backgrounds/horse/Horse";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

const sections = [
  { key: "about", label: "About", Component: About },
  { key: "skills", label: "Skills", Component: Skills },
  { key: "projects", label: "Projects", Component: Projects },
  { key: "education", label: "Education", Component: Education },
  { key: "blog", label: "Blog", Component: Blog },
  { key: "experience", label: "Experience", Component: Experience },
  { key: "contact", label: "Contact", Component: Contact },
];

function Preloader({ onDone }: { onDone: () => void }) {
  const name = "DINUKA ASHAN WICKRAMARATHNA";
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
      }, 120);
    } else {
      // Show particles after typing is complete
      setShowParticles(true);
      timeout = setTimeout(() => {
        onDone();
        setTimeout(onDone, 700); // short pause before showing main app
      }, 900);
    }
    return () => clearTimeout(timeout);
  }, [displayed, name, onDone]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white transition-opacity duration-700 min-h-screen p-4 overflow-hidden">
      {/* Floating Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + i * 10}%`,
            }}
            animate={{
              y: [0, -100, -200, -300],
              x: [0, Math.random() * 60 - 30],
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1, 1.5, 0],
            }}
            transition={{
              duration: 20 + i * 2,
              delay: i * 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Enhanced Clock */}
      <motion.div
        className="clock absolute top-2 sm:top-4 md:top-6 left-0 right-0 mx-auto text-center text-blue-400 font-mono"
        style={{
          fontSize: "clamp(20px, 5vw, 48px)",
          letterSpacing: "clamp(1px, 0.8vw, 7px)",
          width: "fit-content",
          maxWidth: "100%",
        }}
        id="MyClockDisplay"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {clock}
      </motion.div>

      {/* Enhanced Name Display */}
      <motion.h1
        className="font-extrabold tracking-wide text-center break-words px-4 max-w-full relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
          {displayed}
        </span>
        <motion.span
          className="border-r-2 border-blue-400 ml-1 inline-block"
          animate={{
            opacity: [1, 0, 1],
            scaleY: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.h1>

      {/* Success Message */}
      {showParticles && (
        <motion.div
          className="text-center mt-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex items-center justify-center gap-2 text-blue-300 text-lg"
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-5 h-5" />
            <span>Ready to explore!</span>
            <Sparkles className="w-5 h-5" />
          </motion.div>
        </motion.div>
      )}

      {/* Enhanced Horse Animation */}
      <motion.div
        className="mt-8 flex justify-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7 }}
      >
        <motion.div
          animate={{
            rotate: [0, 1, -1, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Horse />
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState("about");
  const [loading, setLoading] = useState(true);
  const [prevActive, setPrevActive] = useState(active);
  const ActiveSection = sections.find((s) => s.key === active)?.Component;

  // Update prevActive when active changes
  useEffect(() => {
    setPrevActive(active);
  }, [active]);

  return (
    <div className="w-full h-screen flex flex-col">
      {loading && <Preloader onDone={() => setLoading(false)} />}
      {!loading && (
        <>
          <Navbar active={active} setActiveSection={setActive} />
          <main className="relative flex-1 flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0 flex items-center justify-center"
                initial={{
                  opacity: 0,
                  x: prevActive < active ? 100 : -100,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  x: prevActive < active ? -100 : 100,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
              >
                {ActiveSection && <ActiveSection />}
              </motion.div>
            </AnimatePresence>
          </main>
        </>
      )}
    </div>
  );
}
