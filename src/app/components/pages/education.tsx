import React, { useEffect, useState, useRef } from "react";
import { BackgroundPaths } from "@/app/components/backgrounds/line background/line-backgroung";
import { educationContent } from "@/app/components/content/education";

const educationData = educationContent.institutions;

export default function Education() {
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
      {/* Line Background - Fixed */}
      <div className="fixed inset-0 z-0">
        <BackgroundPaths  />
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
            {educationContent.header.title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-200 max-w-2xl mx-auto px-2">
            {educationContent.header.subtitle}
          </p>
        </div>

        {/* Manual Navigation Education Display */}
        <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg shadow-blue-500/25 inline-block">
              <h3 className="text-lg sm:text-xl font-bold">
                {educationData[activeIndex].institution}
              </h3>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center mt-6 gap-4">
            <button
              onClick={() =>
                setActiveIndex(
                  (prev) =>
                    (prev - 1 + educationData.length) % educationData.length
                )
              }
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 border border-white/20"
              aria-label="Previous education"
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
              {educationData.map((edu, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-blue-500 scale-125"
                      : "bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to ${edu.institution}`}
                />
              ))}
            </div>

            <button
              onClick={() =>
                setActiveIndex((prev) => (prev + 1) % educationData.length)
              }
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 border border-white/20"
              aria-label="Next education"
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

        {/* Education Cards */}
        <div className="w-full max-w-4xl mx-auto">
          <div
            className={`transition-all duration-${
              educationContent.animation.transitionDuration
            } ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Main Education Card */}
            <div className="bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/20">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6">
                <div className="text-4xl sm:text-5xl">
                  {educationData[activeIndex].logo}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                      {educationData[activeIndex].degree}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1 text-xs sm:text-sm rounded-full border ${
                          educationData[activeIndex].status ===
                          "Final Year Student"
                            ? educationContent.statusConfig.finalYear.color
                            : educationData[activeIndex].status ===
                              "In Progress"
                            ? educationContent.statusConfig.inProgress.color
                            : educationContent.statusConfig.completed.color
                        }`}
                      >
                        {educationData[activeIndex].status}
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-xs sm:text-sm rounded-full border border-purple-500/30">
                        {educationData[activeIndex].location}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-lg sm:text-xl text-blue-400 font-semibold mb-2">
                    {educationData[activeIndex].institution}
                  </h4>
                  <p className="text-gray-300 text-sm sm:text-base mb-2">
                    {educationData[activeIndex].specialization}
                  </p>
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
                      {educationData[activeIndex].period}
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-200 text-sm sm:text-base leading-relaxed mb-6">
                {educationData[activeIndex].description}
              </p>

              {/* Achievements */}
              <div className="mb-6">
                <h5 className="text-white font-semibold mb-3 text-sm sm:text-base">
                  Key Achievements:
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {educationData[activeIndex].achievements.map(
                    (achievement, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300 text-xs sm:text-sm">
                          {achievement}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Skills */}
              <div className="mb-6">
                <h5 className="text-white font-semibold mb-3 text-sm sm:text-base">
                  Skills & Technologies:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {educationData[activeIndex].skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 sm:px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30 hover:bg-blue-500/30 transition-colors duration-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Core Modules - Only show for ESOFT Metro Campus (id: 1) */}
              {educationData[activeIndex].id === 1 &&
                educationData[activeIndex].coreModules && (
                  <div className="mb-6">
                    <h5 className="text-white font-semibold mb-3 text-sm sm:text-base flex items-center gap-2">
                      <span className="text-blue-400">📚</span>
                      Core Modules
                    </h5>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                      {educationData[activeIndex].coreModules.map(
                        (module, idx) => (
                          <div
                            key={idx}
                            className="bg-gradient-to-br from-gray-800/60 via-blue-900/20 to-gray-800/60 backdrop-blur-sm rounded-xl p-3 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h6 className="text-white font-medium text-sm mb-1">
                                  {module.name}
                                </h6>
                                <p className="text-gray-400 text-xs mb-2">
                                  {module.description}
                                </p>
                                <div className="flex items-center gap-3 text-xs">
                                  <span className="text-blue-400 font-mono">
                                    {module.code}
                                  </span>
                                  <span className="text-gray-500">
                                    {module.credits} credits
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* Academic Summary */}
                    <div className="mt-4 p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-300">Total Credits:</span>
                        <span className="text-blue-400 font-semibold">
                          {educationData[activeIndex].coreModules.reduce(
                            (total, module) => total + module.credits,
                            0
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
