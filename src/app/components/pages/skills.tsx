"use client";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Flower from "@/app/components/backgrounds/flower/Flower";

// Skills data organized by categories
interface SkillItem {
  name: string;
  level: number;
  color: string;
}

interface SkillsData {
  languages: SkillItem[];
  frontendFrameworks: SkillItem[];
  backendFrameworks: SkillItem[];
  databases: SkillItem[];
  cloudServices: SkillItem[];
  tools: SkillItem[];
  softSkills: string[];
}

const skillsData: SkillsData = {
  languages: [
    { name: "JavaScript", level: 95, color: "#F7DF1E" },
    { name: "TypeScript", level: 90, color: "#3178C6" },
    { name: "Python", level: 85, color: "#3776AB" },
    { name: "PHP", level: 80, color: "#777BB4" },
  ],

  frontendFrameworks: [
    { name: "React.js", level: 95, color: "#61DAFB" },
    { name: "Next.js", level: 90, color: "#000000" },
    { name: "Vue.js", level: 85, color: "#42B883" },
    { name: "Tailwind CSS", level: 88, color: "#06B6D4" },
    { name: "Bootstrap", level: 88, color: "#563D7C" },
  ],

  backendFrameworks: [
    { name: "Node.js", level: 92, color: "#339933" },
    { name: "Laravel", level: 85, color: "#FF2D20" },
    { name: "Django", level: 80, color: "#092E20" },
    { name: "Express.js", level: 88, color: "#000000" },
  ],

  databases: [
    { name: "MongoDB", level: 85, color: "#47A248" },
    { name: "MySQL", level: 80, color: "#4479A1" },
  ],

  cloudServices: [
    { name: "AWS", level: 80, color: "#FF9900" },
    { name: "Vercel", level: 90, color: "#000000" },
    { name: "Railway", level: 90, color: "#0B0D0E" },
  ],

  tools: [
    { name: "Postman", level: 90, color: "#FF6C37" },
    { name: "Figma", level: 85, color: "#F24E1E" },
    { name: "VS Code", level: 95, color: "#007ACC" },
    { name: "Git", level: 88, color: "#F05032" },
    { name: "Docker", level: 75, color: "#2496ED" },
  ],

  softSkills: [
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
  ],
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("languages");
  const [progress, setProgress] = useState<Record<string, number[]>>({});
  const [isVisible, setIsVisible] = useState(false);
  const [slideDirection, setSlideDirection] = useState("right");
  const sectionRef = useRef<HTMLElement>(null);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize progress state
  useEffect(() => {
    const initialProgress: Record<string, number[]> = {};
    Object.keys(skillsData).forEach((category) => {
      if (category !== "softSkills") {
        initialProgress[category] = skillsData[
          category as keyof SkillsData
        ].map(() => 0);
      }
    });
    setProgress(initialProgress);
  }, []);

  // Animate progress bars for current category
  const animateProgress = useCallback(() => {
    // Reset progress for current category first
    const currentCategorySkills =
      skillsData[activeCategory as keyof SkillsData];
    if (
      activeCategory !== "softSkills" &&
      Array.isArray(currentCategorySkills) &&
      currentCategorySkills.length > 0
    ) {
      const skillItems = currentCategorySkills as SkillItem[];
      // Reset to 0 first
      setProgress((prev) => ({
        ...prev,
        [activeCategory]: skillItems.map(() => 0),
      }));

      // Then animate to full values
      setTimeout(() => {
        skillItems.forEach((skill: SkillItem, index) => {
          setTimeout(() => {
            setProgress((prev) => ({
              ...prev,
              [activeCategory]: prev[activeCategory].map((val, i) =>
                i === index ? skill.level : val
              ),
            }));
          }, index * 200);
        });
      }, 100);
    }
  }, [activeCategory]);

  // Auto-sliding functionality with progress bar animation
  useEffect(() => {
    if (isVisible) {
      const startAutoSlide = () => {
        // First, animate the progress bars for current category
        animateProgress();

        // Wait for progress bars to complete, then slide to next category
        setTimeout(() => {
          setSlideDirection("right");
          setActiveCategory((prev) => {
            const categories = Object.keys(skillsData);
            const currentIndex = categories.indexOf(prev);
            const nextIndex = (currentIndex + 1) % categories.length;
            return categories[nextIndex];
          });
        }, 2500); // Wait 2.5 seconds (2s for progress + 0.5s buffer)
      };

      // Start the first cycle
      startAutoSlide();

      // Set up recurring cycle
      autoSlideRef.current = setInterval(startAutoSlide, 3000); // 3 second total cycle
    }

    return () => {
      if (autoSlideRef.current) {
        clearInterval(autoSlideRef.current);
      }
    };
  }, [isVisible, activeCategory, animateProgress]);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          animateProgress();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [animateProgress]);

  // Get category display name
  const getCategoryName = (key: string) => {
    const names: Record<string, string> = {
      languages: "Programming Languages",
      frontendFrameworks: "Frontend Frameworks",
      backendFrameworks: "Backend Frameworks",
      databases: "Databases",
      cloudServices: "Cloud Services",
      tools: "Development Tools",
      softSkills: "Soft Skills",
    };
    return names[key] || key;
  };

  // Get category color
  const getCategoryColor = (key: string) => {
    const colors: Record<string, string> = {
      languages: "from-blue-500 to-blue-600",
      frontendFrameworks: "from-green-500 to-green-600",
      backendFrameworks: "from-purple-500 to-purple-600",
      databases: "from-orange-500 to-orange-600",
      cloudServices: "from-indigo-500 to-indigo-600",
      tools: "from-pink-500 to-pink-600",
      softSkills: "from-teal-500 to-teal-600",
    };
    return colors[key] || "from-gray-500 to-gray-600";
  };

  return (
    <section
      ref={sectionRef}
      className="w-full h-full overflow-y-auto overflow-x-hidden px-2 sm:px-4 py-4 sm:py-8"
    >
      {/* Flower Background - Fixed */}
      <div className="fixed inset-0 z-0">
        <Flower />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto pb-8 sm:pb-12 flex flex-col items-center">
        {/* Header */}
        <div
          className={`text-center mb-6 sm:mb-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
            Skills & Expertise
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-200 max-w-2xl mx-auto px-2">
            A comprehensive showcase of my technical skills and professional
            competencies
          </p>
        </div>

        {/* Auto-Sliding Category Display */}
        <div
          className={`text-center mb-6 sm:mb-8 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative overflow-hidden">
            <div
              key={activeCategory}
              className={`transform transition-all duration-700 ease-in-out ${
                slideDirection === "right"
                  ? "animate-slide-in-right"
                  : "animate-slide-in-left"
              }`}
            >
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg shadow-blue-500/25 inline-block">
                <h3 className="text-lg sm:text-xl font-bold">
                  {getCategoryName(activeCategory)}
                </h3>
              </div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center mt-4 gap-2">
            {Object.keys(skillsData).map((category) => (
              <div
                key={category}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-blue-500 scale-125"
                    : "bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Skills Content */}
        <div
          className={`transition-all duration-700 mb-6 sm:mb-8 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {activeCategory === "softSkills" ? (
            // Soft Skills Display
            <div className="bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/20">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">
                {getCategoryName(activeCategory)}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
                {skillsData.softSkills.map((skill, index) => (
                  <div
                    key={skill}
                    className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-blue-500/30 text-center transform hover:scale-105 transition-all duration-300 animate-fade-in-up hover:shadow-lg hover:shadow-blue-500/25"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-sm sm:text-base font-semibold text-blue-200">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Technical Skills Display
            <div className="bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/20">
              <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">
                {getCategoryName(activeCategory)}
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {(
                  skillsData[activeCategory as keyof SkillsData] as SkillItem[]
                ).map((skill, index) => (
                  <div
                    key={skill.name}
                    className="group"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <div className="flex items-center gap-3 mb-2 sm:mb-0">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: skill.color }}
                        />
                        <span className="font-semibold text-white text-sm sm:text-base">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-xs sm:text-sm text-blue-200 font-mono">
                        {progress[activeCategory]?.[index] || 0}%
                      </span>
                    </div>
                    <div className="w-full h-3 sm:h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-blue-500/25"
                        style={{
                          width: `${progress[activeCategory]?.[index] || 0}%`,
                          background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Skills Overview Grid */}
        <div
          className={`mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {Object.keys(skillsData).map((category) => (
            <div
              key={category}
              className="bg-gradient-to-br from-gray-900/60 via-blue-900/20 to-gray-900/60 backdrop-blur-xl rounded-2xl p-3 sm:p-4 border border-blue-500/30 hover:bg-gradient-to-br hover:from-gray-900/80 hover:via-blue-900/40 hover:to-gray-900/80 transition-all duration-300 transform hover:scale-105 cursor-pointer hover:shadow-lg hover:shadow-blue-500/25"
              onClick={() => setActiveCategory(category)}
            >
              <h4 className="text-base sm:text-lg font-semibold text-white mb-2">
                {getCategoryName(category)}
              </h4>
              <p className="text-xs sm:text-sm text-blue-200">
                {skillsData[category as keyof SkillsData].length} skills
              </p>
              <div
                className={`w-12 sm:w-16 h-1 mt-3 rounded-full bg-gradient-to-r ${getCategoryColor(
                  category
                )}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in-right {
          animation: slideInRight 0.7s ease-out forwards;
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-left {
          animation: slideInLeft 0.7s ease-out forwards;
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
