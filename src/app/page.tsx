"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/layouts/navbar/Navbar";
import About from "./components/pages/about";
import Projects from "./components/pages/projects";
import Resume from "./components/pages/resume";
import Contact from "./components/pages/contact";
import Blog from "./components/pages/blog";
import Experience from "./components/pages/experience";
import Skills from "./components/pages/skills";
import Education from "./components/pages/education";

const sections = [
  { key: "about", label: "About", Component: About },
  { key: "projects", label: "Projects", Component: Projects },
  { key: "resume", label: "Resume", Component: Resume },
  { key: "contact", label: "Contact", Component: Contact },
  { key: "blog", label: "Blog", Component: Blog },
  { key: "experience", label: "Experience", Component: Experience },
  { key: "skills", label: "Skills", Component: Skills },
  { key: "education", label: "Education", Component: Education },
];

function Preloader({ onDone }: { onDone: () => void }) {
  const name = "DINUKA ASHAN WICKRAMARATHNA";
  const [displayed, setDisplayed] = useState("");
  const [clock, setClock] = useState("");

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
      timeout = setTimeout(() => {
        onDone();
        setTimeout(onDone, 700); // short pause before showing main app
      }, 900);
    }
    return () => clearTimeout(timeout);
  }, [displayed, name, onDone]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950 text-white transition-opacity duration-700 min-h-screen p-4">
      <div
        className="clock"
        style={{
          position: "absolute",
          top: 24,
          left: "50%",
          transform: "translateX(-50%)",
          color: "#17D4FE",
          fontSize: 48,
          fontFamily: "Orbitron, monospace",
          letterSpacing: 7,
        }}
        id="MyClockDisplay"
      >
        {clock}
      </div>
      <h1 className="font-extrabold tracking-wide text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-center break-words">
        {displayed}
        <span className="border-r-2 border-blue-400 animate-pulse ml-1" />
      </h1>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState("about");
  const [loading, setLoading] = useState(true);
  const ActiveSection = sections.find((s) => s.key === active)?.Component;

  return (
    <div className="w-full h-screen flex flex-col">
      {loading && <Preloader onDone={() => setLoading(false)} />}
      {!loading && (
        <>
          <Navbar active={active} setActiveSection={setActive} />
          <main className="relative flex-1 flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
              key={active}
            >
              {ActiveSection && <ActiveSection />}
            </div>
          </main>
          {/* <Footer /> */}
        </>
      )}
    </div>
  );
}
