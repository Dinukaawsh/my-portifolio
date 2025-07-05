import React from "react";

const experiences = [
  {
    company: "TechNova Solutions",
    title: "Senior Full Stack Developer",
    period: "2022 - Present",
    description:
      "Leading a team to build scalable SaaS products using React, Next.js, and AWS. Architected microservices and mentored junior developers.",
  },
  {
    company: "Webify Labs",
    title: "Frontend Developer",
    period: "2020 - 2022",
    description:
      "Developed modern, responsive UIs with React and Tailwind CSS. Collaborated with designers and backend teams to deliver seamless user experiences.",
  },
  {
    company: "CodeCrafters",
    title: "Junior Developer",
    period: "2018 - 2020",
    description:
      "Worked on REST APIs and internal tools using Node.js and Express. Improved code quality and learned best practices.",
  },
];

export default function Experience() {
  return (
    <section className="w-full h-full relative flex items-center justify-center overflow-hidden px-2 sm:px-4 bg-black">
      {/* Animated Gradient Background */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 animate-gradient bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 opacity-60 blur-2xl"
        style={{ backgroundSize: "200% 200%" }}
      />
      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto p-4 sm:p-8 rounded-3xl shadow-2xl border border-white/20 bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg flex flex-col items-center text-center transition-all duration-700">
        <h2 className="text-2xl sm:text-4xl font-extrabold mb-1 tracking-tight text-gray-900 dark:text-white">
          Experience
        </h2>
        <div className="w-full mt-6 flex flex-col gap-6">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className="bg-white/80 dark:bg-gray-800/80 rounded-xl shadow p-4 text-left border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                <span className="font-bold text-blue-700 dark:text-blue-300 text-base sm:text-lg">
                  {exp.title}
                </span>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-mono">
                  {exp.period}
                </span>
              </div>
              <div className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base mb-1">
                {exp.company}
              </div>
              <div className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm">
                {exp.description}
              </div>
            </div>
          ))}
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
      `}</style>
    </section>
  );
}
