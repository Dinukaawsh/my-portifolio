import React, { useEffect, useState } from "react";

const languages = [
  { name: "JavaScript", level: 95 },
  { name: "TypeScript", level: 85 },
  { name: "Python", level: 80 },
  { name: "C#", level: 70 },
  { name: "Java", level: 70 },
];

const frameworks = [
  { name: "Next.js", color: "#000" },
  { name: "Django", color: "#092E20" },
  { name: "Laravel", color: "#FF2D20" },
];

const frontendFrameworks = [
  { name: "React", color: "#61DAFB" },
  { name: "Vue", color: "#42B883" },
];

const tools = [
  { name: "VS Code", color: "#007ACC" },
  { name: "Eclipse", color: "#2C2255" },
  { name: "Postman", color: "#FF6C37" },
  { name: "Docker", color: "#2496ED" },
];

const softSkills = [
  "Teamwork",
  "Communication",
  "Problem Solving",
  "Adaptability",
  "Creativity",
  "Time Management",
  "Leadership",
  "Empathy",
  "Critical Thinking",
  "Conflict Resolution",
  "Work Ethic",
  "Attention to Detail",
];

export default function Skills() {
  const [progress, setProgress] = useState(languages.map(() => 0));
  const [showFrameworks, setShowFrameworks] = useState(false);
  const [showFrontend, setShowFrontend] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showSoftSkills, setShowSoftSkills] = useState(false);

  useEffect(() => {
    // Animate languages progress
    const timeouts = languages.map((lang, i) =>
      setTimeout(() => {
        setProgress((prev) => {
          const copy = [...prev];
          copy[i] = lang.level;
          return copy;
        });
      }, 400 + i * 250)
    );
    // Animate sections entrance
    const fwTimeout = setTimeout(() => setShowFrameworks(true), 1800);
    const feTimeout = setTimeout(() => setShowFrontend(true), 2200);
    const toolsTimeout = setTimeout(() => setShowTools(true), 2600);
    const softTimeout = setTimeout(() => setShowSoftSkills(true), 3000);
    return () => {
      timeouts.forEach(clearTimeout);
      clearTimeout(fwTimeout);
      clearTimeout(feTimeout);
      clearTimeout(toolsTimeout);
      clearTimeout(softTimeout);
    };
  }, []);

  return (
    <section className="w-full h-full relative flex items-center justify-center overflow-hidden px-2 sm:px-4 bg-black">
      {/* Animated Gradient Background */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 animate-gradient bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 opacity-60 blur-2xl"
        style={{ backgroundSize: "200% 200%" }}
      />
      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-4xl mx-auto p-4 sm:p-8 rounded-3xl shadow-2xl border border-white/20 bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg flex flex-col items-center text-center transition-all duration-700">
        <h2 className="text-2xl sm:text-4xl font-extrabold mb-1 tracking-tight text-gray-900 dark:text-white">
          Skills
        </h2>
        {/* Languages with progress bars */}
        <div className="w-full mt-6 mb-8 animate-fade-in-up">
          <h3 className="text-lg sm:text-xl font-bold mb-4 text-blue-700 dark:text-blue-300 text-left">
            Languages
          </h3>
          <div className="flex flex-col gap-4">
            {languages.map((lang, i) => (
              <div key={lang.name} className="w-full">
                <div className="flex justify-between mb-1">
                  <span className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base">
                    {lang.name}
                  </span>
                  <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-mono">
                    {progress[i]}%
                  </span>
                </div>
                <div className="w-full h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-3 bg-gradient-to-r from-blue-400 via-blue-600 to-purple-500 rounded-full transition-all duration-1000 animate-bar-grow"
                    style={{ width: `${progress[i]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Frameworks */}
        <div
          className={`w-full mb-8 transition-all duration-700 ${
            showFrameworks
              ? "opacity-100 translate-y-0 animate-fade-in-left"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-lg sm:text-xl font-bold mb-4 text-green-700 dark:text-green-300 text-left">
            Frameworks
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {frameworks.map((fw) => (
              <div
                key={fw.name}
                className="px-5 py-3 rounded-xl shadow-lg bg-gradient-to-br from-white/80 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-300 dark:border-gray-700 flex flex-col items-center min-w-[110px] animate-bounce-in"
                style={{ borderColor: fw.color }}
              >
                <span
                  className="font-bold text-base"
                  style={{ color: fw.color }}
                >
                  {fw.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Frontend Frameworks */}
        <div
          className={`w-full mb-8 transition-all duration-700 ${
            showFrontend
              ? "opacity-100 translate-y-0 animate-fade-in-right"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-lg sm:text-xl font-bold mb-4 text-cyan-700 dark:text-cyan-300 text-left">
            Frontend Frameworks
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {frontendFrameworks.map((fw) => (
              <div
                key={fw.name}
                className="px-5 py-3 rounded-xl shadow-lg bg-gradient-to-br from-white/80 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-300 dark:border-gray-700 flex flex-col items-center min-w-[110px] animate-flip-in"
                style={{ borderColor: fw.color }}
              >
                <span
                  className="font-bold text-base"
                  style={{ color: fw.color }}
                >
                  {fw.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Tools & Technologies */}
        <div
          className={`w-full mb-8 transition-all duration-700 ${
            showTools
              ? "opacity-100 translate-y-0 animate-fade-in-up"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-lg sm:text-xl font-bold mb-4 text-indigo-700 dark:text-indigo-300 text-left">
            Tools & Technologies
          </h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {tools.map((tool) => (
              <div
                key={tool.name}
                className="px-4 py-2 rounded-lg shadow bg-gradient-to-br from-white/80 to-gray-200 dark:from-gray-800 dark:to-gray-900 border border-gray-300 dark:border-gray-700 flex items-center animate-scale-in"
                style={{ borderColor: tool.color }}
              >
                <span
                  className="font-semibold text-sm"
                  style={{ color: tool.color }}
                >
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Soft Skills */}
        <div
          className={`w-full transition-all duration-700 ${
            showSoftSkills
              ? "opacity-100 translate-y-0 animate-fade-in-up-delayed"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-lg sm:text-xl font-bold mb-4 text-pink-700 dark:text-pink-300 text-left">
            Soft Skills
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {softSkills.map((skill, i) => (
              <span
                key={skill}
                className="px-3 py-1 bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-200 rounded-full text-xs font-semibold shadow-sm animate-soft-skill"
                style={{ animationDelay: `${i * 0.08 + 0.2}s` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
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
        .animate-fade-in-up {
          animation: fadeInUp 1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-left {
          animation: fadeInLeft 1s 0.2s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes fadeInLeft {
          0% { opacity: 0; transform: translateX(-40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-fade-in-right {
          animation: fadeInRight 1s 0.2s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes fadeInRight {
          0% { opacity: 0; transform: translateX(40px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-bounce-in {
          animation: bounceIn 0.9s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.7) translateY(40px); }
          60% { opacity: 1; transform: scale(1.05) translateY(-8px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-flip-in {
          animation: flipIn 1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes flipIn {
          0% { opacity: 0; transform: rotateY(90deg) scale(0.7); }
          100% { opacity: 1; transform: rotateY(0) scale(1); }
        }
        .animate-scale-in {
          animation: scaleIn 0.8s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes scaleIn {
          0% { opacity: 0; transform: scale(0.7); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-up-delayed {
          animation: fadeInUp 1.2s 0.3s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .animate-bar-grow {
          transition: width 1s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .animate-soft-skill {
          animation: fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
    </section>
  );
}
