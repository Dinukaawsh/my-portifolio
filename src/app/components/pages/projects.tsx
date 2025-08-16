import React, { useEffect, useState, useRef } from "react";
import Flower from "@/app/components/backgrounds/flower/Flower";

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution built with Next.js, featuring user authentication, product management, shopping cart, and payment integration with Stripe.",
    technologies: [
      "Next.js",
      "React",
      "Node.js",
      "MongoDB",
      "Stripe",
      "Tailwind CSS",
    ],
    image: "/project1.jpg",
    github: "https://github.com/yourusername/ecommerce",
    live: "https://ecommerce-demo.vercel.app",
    category: "Full-Stack",
    featured: true,
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    technologies: [
      "React",
      "Firebase",
      "TypeScript",
      "Tailwind CSS",
      "DnD Kit",
    ],
    image: "/project2.jpg",
    github: "https://github.com/yourusername/task-manager",
    live: "https://task-manager-demo.vercel.app",
    category: "Frontend",
    featured: false,
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description:
      "A beautiful weather application that displays current weather conditions, forecasts, and interactive maps using OpenWeatherMap API.",
    technologies: [
      "Vue.js",
      "JavaScript",
      "CSS3",
      "OpenWeatherMap API",
      "Chart.js",
    ],
    image: "/project3.jpg",
    github: "https://github.com/yourusername/weather-app",
    live: "https://weather-dashboard.vercel.app",
    category: "Frontend",
    featured: false,
  },
  {
    id: 4,
    title: "Blog CMS",
    description:
      "A content management system for blogs with rich text editing, user roles, SEO optimization, and analytics dashboard.",
    technologies: ["Laravel", "PHP", "MySQL", "Vue.js", "Bootstrap", "Redis"],
    image: "/project4.jpg",
    github: "https://github.com/yourusername/blog-cms",
    live: "https://blog-cms-demo.vercel.app",
    category: "Full-Stack",
    featured: false,
  },
  {
    id: 5,
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and dark mode.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "TypeScript",
    ],
    image: "/project5.jpg",
    github: "https://github.com/yourusername/portfolio",
    live: "https://your-portfolio.vercel.app",
    category: "Frontend",
    featured: true,
  },
  {
    id: 6,
    title: "API Gateway Service",
    description:
      "A microservices API gateway built with Node.js, featuring rate limiting, authentication, request routing, and monitoring.",
    technologies: ["Node.js", "Express", "Redis", "JWT", "Docker", "Swagger"],
    image: "/project6.jpg",
    github: "https://github.com/yourusername/api-gateway",
    live: "https://api-gateway-docs.vercel.app",
    category: "Backend",
    featured: false,
  },
];

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);

  const categories = ["All", "Full-Stack", "Frontend", "Backend"];

  const filteredProjects =
    activeCategory === "All"
      ? projectsData
      : projectsData.filter((project) => project.category === activeCategory);

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
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
            My Projects
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-200 max-w-3xl mx-auto px-2">
            A collection of my work showcasing different technologies and
            problem-solving approaches
          </p>
        </div>

        {/* Category Filter */}
        <div
          className={`w-full max-w-4xl mx-auto mb-8 sm:mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div
          className={`w-full max-w-7xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Project Card */}
                <div className="bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-blue-500/30 shadow-2xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105">
                  {/* Project Image */}
                  <div className="relative w-full h-48 sm:h-56 mb-4 rounded-2xl overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-4xl mb-2">🖼️</div>
                        <p className="text-sm opacity-80">Project Image</p>
                      </div>
                    </div>
                    {project.featured && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                          ⭐ Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="space-y-4">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-500/30">
                        {project.category}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors duration-200">
                        {project.title}
                      </h3>
                      <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="text-white font-semibold text-sm mb-2">
                        Technologies Used:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-2">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200 text-center"
                      >
                        GitHub
                      </a>
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-center shadow-lg shadow-blue-500/25"
                      >
                        Live Demo
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No projects found
            </h3>
            <p className="text-gray-400">
              Try selecting a different category or check back later!
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
