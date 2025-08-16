import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Flower from "@/app/components/backgrounds/flower/Flower";

const experiences = [
  {
    company: "Twist Digital",
    title: "Software Engineer (Full-Stack)",
    period: "Mar 2025 - Present",
    duration: "6 months",
    type: "Internship",
    location: "Remote",
    description:
      "Currently working as a Software Engineer at Twist Digital, where I'm gaining hands-on experience in full-stack web development using modern technologies. My work spans both frontend and backend development, with a strong focus on Next.js for building scalable and high-performance applications.",
    responsibilities: [
      "Full-stack web development using Next.js and modern technologies",
      "Deploying applications and managing CI/CD pipelines",
      "Database design and migrations",
      "Cloud hosting and DevOps practices",
      "Building efficient, user-centric applications",
    ],
    skills: [
      "Next.js",
      "React.js",
      "Node.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "MongoDB",
      "AWS",
      "GitHub",
      "Git",
      "REST APIs",
      "CI/CD",
      "Data Migration",
      "Webhooks",
      "WebSockets",
    ],
  },
];

export default function Experience() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full h-full relative flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden px-2 sm:px-4 py-4 sm:py-8"
    >
      {/* Flower Background - Fixed */}
      <div className="fixed inset-0 z-0">
        <Flower />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center pb-16">
        {/* Header */}
        <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
            Professional Experience
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-200 max-w-2xl mx-auto px-2">
            My journey in software development and technology
          </p>
        </div>

        {/* Manual Navigation Experience Display */}
        <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg shadow-blue-500/25 inline-block">
              <h3 className="text-lg sm:text-xl font-bold">
                {experiences[activeIndex].company}
              </h3>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              onClick={() =>
                setActiveIndex(
                  (prev) => (prev - 1 + experiences.length) % experiences.length
                )
              }
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 border border-white/20"
              aria-label="Previous experience"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Progress Indicator */}
            <div className="flex gap-2">
              {experiences.map((exp, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-blue-500 scale-125"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to ${exp.company}`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setActiveIndex((prev) => (prev + 1) % experiences.length)
              }
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 border border-white/20"
              aria-label="Next experience"
            >
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Experience Cards */}
        <div className="w-full max-w-4xl mx-auto">
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Main Experience Card */}
            <div className="bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/20">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex-shrink-0">
                  <Image
                    src="/twist.png"
                    alt="Twist Digital Logo"
                    width={96}
                    height={96}
                    className="w-full h-full object-contain"
                    priority
                  />
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                      {experiences[activeIndex].title}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs sm:text-sm rounded-full border border-blue-500/30">
                        {experiences[activeIndex].type}
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs sm:text-sm rounded-full border border-purple-500/30">
                        {experiences[activeIndex].location}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-lg sm:text-xl text-blue-400 font-semibold mb-2">
                    {experiences[activeIndex].company}
                  </h4>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {experiences[activeIndex].period}
                    </span>
                    <span className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 text-purple-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {experiences[activeIndex].duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-6">
                {experiences[activeIndex].description}
              </p>

              {/* Responsibilities */}
              <div className="mb-6">
                <h5 className="text-white font-semibold mb-3 text-sm sm:text-base">
                  Key Responsibilities:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {experiences[activeIndex].responsibilities.map(
                    (resp, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300 text-xs sm:text-sm">
                          {resp}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Skills */}
              <div>
                <h5 className="text-white font-semibold mb-3 text-sm sm:text-base">
                  Technologies & Skills:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {experiences[activeIndex].skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 sm:px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
