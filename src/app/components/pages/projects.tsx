import React, { useEffect, useState, useRef } from "react";
import Flower from "@/app/components/backgrounds/flower/Flower";
import { motion, useScroll, useSpring } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "blog application",
    description:
      "This project is a blog application built using Django. It allows users to register, log in, create, read, update, and delete blog posts. Users can also comment on posts.",
    technologies: [
      "Django",
      "Python",
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "SQLite",
      "Django Admin",
      "Django Rest Framework",
      "Django Jasmin",
    ],
    image: "/project1.jpg",
    github: "https://github.com/Dinukaawsh/blog-application",
    live: "https://www.youtube.com/watch?v=yVFk-kpsdVM",
    category: "Full-Stack",
    featured: true,
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution built with PHP, featuring user authentication, product management, shopping cart, and payment integration with Stripe.",
    technologies: [
      "PHP",
      "MySQL",
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "jQuery",
      "Ajax",
      "PHPMyAdmin",
      "XAMPP",
    ],
    image: "/project2.jpg",
    github: "https://github.com/Dinukaawsh/e-commerce-web-site",
    live: false,
    category: "Full-Stack",
    featured: false,
  },
  {
    id: 3,
    title: "Language Translator App",
    description:
      "A language translator application that allows users to translate text from one language to another using the Google Translate API.",
    technologies: [
      "React",
      "JavaScript",
      "HTML",
      "Tailwind CSS",
      "Google Translate API",
      "DeepL API",
    ],
    image: "/project3.jpg",
    github: "https://github.com/Dinukaawsh/translator",
    live: "https://dinukaawsh.github.io/translator/",
    category: "Frontend",
    featured: false,
  },
  {
    id: 4,
    title: "Online Blood Bank Web Site",
    description:
      "A full-stack online blood bank web site built with PHP, featuring user authentication, blood donation, blood request, and blood donation management.",
    technologies: [
      "PHP",
      "MySQL",
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "jQuery",
      "Ajax",
      "PHPMyAdmin",
      "XAMPP",
    ],
    image: "/project4.jpg",
    github: "https://github.com/Dinukaawsh/Online-blood-bank-web-site",
    live: false,
    category: "Full-Stack",
    featured: false,
  },
  {
    id: 5,
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and dark mode. And also firebase for storing the data.",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "TypeScript",
      "Vercel",
      "Firebase",
    ],
    image: "/project5.jpg",
    github: "https://github.com/Dinukaawsh/my-portfolio",
    live: "https://my-portfolio-6w9u.vercel.app/",
    category: "Frontend",
    featured: true,
  },
  {
    id: 6,
    title: "Movie Rental System",
    description:
      "A full-stack movie rental system built with PHP, featuring user authentication, movie management, rental management, and payment integration with Stripe.",
    technologies: [
      "PHP",
      "XML",
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "jQuery",
      "Ajax",
    ],
    image: "/project6.jpg",
    github: "https://github.com/Dinukaawsh/Movie-rental-system",
    live: false,
    category: "Backend",
    featured: false,
  },
];

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentProject, setCurrentProject] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Project rotation effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProject((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

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
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Flower Background - Fixed */}
      <div className="fixed inset-0 z-0">
        <Flower />
      </div>

      {/* Floating Project Icons */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-indigo-400/30 rounded-full"
            style={{
              left: `${8 + i * 20}%`,
              top: `${18 + i * 14}%`,
            }}
            animate={{
              y: [0, -65, -130, -195],
              x: [0, Math.random() * 45 - 22.5],
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1, 1.6, 0],
            }}
            transition={{
              duration: 19 + i * 1.8,
              delay: i * 1.3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <motion.div
            className="inline-block mb-4"
            animate={{
              rotate: [0, 3, -3, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          ></motion.div>

          <motion.h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            My Projects
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-blue-200 max-w-3xl mx-auto px-2"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A collection of my work showcasing different technologies and
            problem-solving approaches
          </motion.p>

          {/* Animated Project Indicator */}
          <motion.div
            className="flex justify-center gap-2 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {["Building", "Creating", "Innovating"].map((project, index) => (
              <motion.div
                key={project}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
                  index === currentProject
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg"
                    : "bg-white/10 text-gray-300 border border-white/20"
                }`}
                animate={
                  index === currentProject ? { scale: 1.1 } : { scale: 1 }
                }
                transition={{ duration: 0.3 }}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                {project}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Category Filter */}
        <motion.div
          className="w-full max-w-4xl mx-auto mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20"
                }`}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.5,
                  delay: 0.5 + index * 0.1,
                  type: "spring",
                }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Projects Grid */}
        <motion.div
          className="w-full max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6, type: "spring" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="group"
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.8 + index * 0.1,
                  type: "spring",
                }}
                whileHover={{
                  scale: 1.03,
                  y: -8,
                  transition: { duration: 0.3 },
                }}
              >
                {/* Project Card */}
                <div className="bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 backdrop-blur-xl rounded-3xl p-4 sm:p-6 border border-blue-500/30 shadow-2xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105">
                  {/* Dynamic Project Visualization */}
                  <div className="relative w-full h-48 sm:h-56 mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.3),transparent_50%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.3),transparent_50%)]" />
                    </div>

                    {/* Floating Tech Icons */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-2 p-4">
                        {project.technologies.slice(0, 6).map((tech, index) => (
                          <motion.div
                            key={index}
                            className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/30"
                            initial={{ opacity: 0, scale: 0, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: index * 0.1,
                              type: "spring",
                            }}
                            whileHover={{
                              scale: 1.1,
                              rotate: 5,
                              transition: { duration: 0.2 },
                            }}
                          >
                            <span className="text-xs sm:text-sm font-bold text-blue-300">
                              {tech.length > 4
                                ? tech.slice(0, 4) + "..."
                                : tech}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Project Type Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white text-xs font-bold rounded-full backdrop-blur-sm">
                        {project.category}
                      </span>
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-3 right-3">
                        <motion.span
                          className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full"
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        >
                          ⭐ Featured
                        </motion.span>
                      </div>
                    )}

                    {/* Animated Border Glow */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border border-blue-500/30"
                      animate={{
                        boxShadow: [
                          "0 0 20px rgba(59, 130, 246, 0.2)",
                          "0 0 30px rgba(147, 51, 234, 0.3)",
                          "0 0 20px rgba(59, 130, 246, 0.2)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>

                  {/* Project Content */}
                  <div className="space-y-4">
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
                    <div
                      className={`flex gap-3 pt-2 ${
                        typeof project.live !== "string" ? "justify-center" : ""
                      }`}
                    >
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-200 text-center ${
                          typeof project.live === "string" ? "flex-1" : "px-8"
                        }`}
                      >
                        GitHub
                      </a>
                      {typeof project.live === "string" && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-center shadow-lg shadow-blue-500/25"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
