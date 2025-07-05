"use client";
import React, { useEffect, useState, useRef } from "react";
import GlobeBackground from "@/app/components/backgrounds/globe/GlobeBackground";
import Image from "next/image";

const roles = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "UI/UX Designer",
  "DevOps Engineer",
];

const skills = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
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

  useEffect(() => {
    function animate(time: number) {
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
    }
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

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

export default function About() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
  const [showCard, setShowCard] = useState(false);

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

  // Entrance animation for card
  useEffect(() => {
    const timer = setTimeout(() => setShowCard(true), 300);
    return () => clearTimeout(timer);
  }, []);

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
    <section className="w-full h-full relative flex items-center justify-center overflow-hidden px-2 sm:px-4">
      <GlobeBackground />
      <AnimatedJets />
      {/* Animated Gradient Background */}

      {/* Glassmorphism Card */}
      <div
        className={`relative z-10 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto p-4 sm:p-8 rounded-3xl shadow-2xl border border-white/20 bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg flex flex-col items-center text-center transition-all duration-700 ${
          showCard ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
        tabIndex={0}
        aria-label="About Dinuka Ashan"
      >
        <Image
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Dinuka Ashan profile"
          width={96}
          height={96}
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-full shadow-lg mb-4 border-4 border-blue-500 object-cover"
        />
        <h2 className="text-2xl sm:text-4xl font-extrabold mb-1 tracking-tight text-gray-900 dark:text-white">
          Dinuka Ashan
        </h2>
        <h3 className="text-base sm:text-xl text-blue-600 dark:text-blue-400 font-semibold mb-3 min-h-[2.5rem] flex items-center justify-center">
          {displayed}
          <span className="border-r-2 border-blue-600 dark:border-blue-400 animate-pulse ml-1" />
        </h3>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-4">
          Passionate developer with 5+ years of experience building modern web
          applications. I love crafting beautiful UIs, solving complex problems,
          and learning new technologies.
        </p>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-2 sm:px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 rounded-full text-xs font-semibold shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
          <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500"
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
            Colombo, Sri Lanka
          </span>
          <span className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500"
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
            dinuka.ashan@email.com
          </span>
        </div>
        <a
          href="#"
          className="inline-block px-4 sm:px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors duration-200 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          tabIndex={0}
        >
          Download CV
        </a>
        <div className="flex gap-3 sm:gap-5 justify-center mt-2">
          <a
            href="#"
            className="hover:scale-125 hover:text-blue-500 transition-transform duration-200"
            aria-label="Twitter"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 4.557a9.93 9.93 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.564-2.005.974-3.127 1.195A4.92 4.92 0 0 0 16.616 3c-2.73 0-4.942 2.21-4.942 4.932 0 .386.045.763.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965c-.423.722-.666 1.561-.666 2.475 0 1.708.87 3.216 2.188 4.099a4.904 4.904 0 0 1-2.237-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.936 4.936 0 0 1-2.224.084c.627 1.956 2.444 3.377 4.6 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.209c9.057 0 14.009-7.496 14.009-13.986 0-.213-.005-.425-.014-.636A9.936 9.936 0 0 0 24 4.557z" />
            </svg>
          </a>
          <a
            href="#"
            className="hover:scale-125 hover:text-blue-700 transition-transform duration-200"
            aria-label="LinkedIn"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z" />
            </svg>
          </a>
          <a
            href="#"
            className="hover:scale-125 hover:text-gray-900 dark:hover:text-white transition-transform duration-200"
            aria-label="GitHub"
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </a>
        </div>
      </div>
      {/* Animated JS code block with editor bar */}
      <div className="relative z-10 mt-6 sm:mt-8 max-w-full sm:max-w-xl w-full mx-0 sm:mx-4 flex justify-center">
        <div className="w-full">
          {/* Editor top bar with lock and filename */}
          <div className="flex items-center gap-2 bg-gray-800/80 rounded-t-xl px-3 sm:px-4 py-2 border-b border-gray-700">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300"
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
          <pre className="bg-gray-900/90 text-left rounded-b-xl shadow-lg p-3 sm:p-6 text-xs sm:text-sm font-mono text-gray-100 w-full overflow-x-auto border border-t-0 border-gray-800">
            <span className="text-green-400">{codePrefix}</span>
            <br />
            {roles.map((role, i) => (
              <span key={role} className="block pl-6">
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
            ))}
            <span className="text-green-400">{codeSuffix}</span>
          </pre>
        </div>
      </div>
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
