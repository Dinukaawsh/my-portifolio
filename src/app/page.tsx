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
        className="clock absolute top-2 sm:top-4 md:top-6 left-0 right-0 mx-auto text-center text-blue-400 font-mono"
        style={{
          fontSize: "clamp(20px, 5vw, 48px)",
          letterSpacing: "clamp(1px, 0.8vw, 7px)",
          width: "fit-content",
          maxWidth: "100%",
        }}
        id="MyClockDisplay"
      >
        {clock}
      </div>
      <h1 className="font-extrabold tracking-wide text-center break-words px-4 max-w-full">
        <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          {displayed}
        </span>
        <span className="border-r-2 border-blue-400 animate-pulse ml-1" />
      </h1>
      <div className="mt-8 flex justify-center">
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
