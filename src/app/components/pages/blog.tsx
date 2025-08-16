import React, { useEffect, useState, useRef } from "react";
import Flower from "@/app/components/backgrounds/flower/Flower";

const blogData = [
  {
    id: 1,
    title: "Building a Modern Portfolio with Next.js and Tailwind CSS",
    excerpt:
      "Learn how to create a stunning, responsive portfolio website using Next.js 13, Tailwind CSS, and modern web technologies. This comprehensive guide covers everything from setup to deployment.",
    platform: "Medium",
    platformIcon: "📝",
    platformColor: "bg-orange-500",
    url: "https://medium.com/@yourusername/building-modern-portfolio-nextjs-tailwind",
    readTime: "8 min read",
    publishDate: "2024-01-15",
    tags: ["Next.js", "React", "Tailwind CSS", "Web Development"],
    featured: true,
  },
  {
    id: 2,
    title: "Firebase Integration: From Zero to Hero",
    excerpt:
      "A deep dive into Firebase integration for web applications. Learn about authentication, Firestore database, real-time updates, and best practices for production apps.",
    platform: "Dev.to",
    platformIcon: "💻",
    platformColor: "bg-black",
    url: "https://dev.to/yourusername/firebase-integration-guide",
    readTime: "12 min read",
    publishDate: "2024-01-10",
    tags: ["Firebase", "JavaScript", "Web Development", "Backend"],
    featured: false,
  },
  {
    id: 3,
    title: "Mastering TypeScript: A Developer's Journey",
    excerpt:
      "My personal journey learning TypeScript and how it transformed my development workflow. Includes practical examples, common pitfalls, and advanced patterns.",
    platform: "Hashnode",
    platformIcon: "🚀",
    platformColor: "bg-blue-600",
    url: "https://yourusername.hashnode.dev/mastering-typescript",
    readTime: "15 min read",
    publishDate: "2024-01-05",
    tags: ["TypeScript", "JavaScript", "Programming", "Learning"],
    featured: true,
  },
  {
    id: 4,
    title: "Responsive Design Principles for Modern Web Apps",
    excerpt:
      "Essential principles and techniques for creating truly responsive web applications that work seamlessly across all devices and screen sizes.",
    platform: "Medium",
    platformIcon: "📝",
    platformColor: "bg-orange-500",
    url: "https://medium.com/@yourusername/responsive-design-principles",
    readTime: "10 min read",
    publishDate: "2023-12-28",
    tags: ["CSS", "Responsive Design", "UX", "Web Development"],
    featured: false,
  },
  {
    id: 5,
    title: "State Management in React: Context vs Redux",
    excerpt:
      "A comprehensive comparison of state management solutions in React applications. When to use Context API, when to reach for Redux, and practical examples.",
    platform: "Dev.to",
    platformIcon: "💻",
    platformColor: "bg-black",
    url: "https://dev.to/yourusername/react-state-management-guide",
    readTime: "14 min read",
    publishDate: "2023-12-20",
    tags: ["React", "Redux", "Context API", "State Management"],
    featured: false,
  },
  {
    id: 6,
    title: "Deploying Next.js Apps to Vercel: Best Practices",
    excerpt:
      "Step-by-step guide to deploying Next.js applications to Vercel with optimization tips, environment variables setup, and performance monitoring.",
    platform: "Hashnode",
    platformIcon: "🚀",
    platformColor: "bg-blue-600",
    url: "https://yourusername.hashnode.dev/nextjs-vercel-deployment",
    readTime: "9 min read",
    publishDate: "2023-12-15",
    tags: ["Next.js", "Vercel", "Deployment", "DevOps"],
    featured: false,
  },
];

const platforms = ["All", "Medium", "Dev.to", "Hashnode"];

export default function Blog() {
  const [isVisible, setIsVisible] = useState(false);
  const [activePlatform, setActivePlatform] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);

  const filteredBlogs =
    activePlatform === "All"
      ? blogData
      : blogData.filter((blog) => blog.platform === activePlatform);

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
            My Blog Posts
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-200 max-w-3xl mx-auto px-2">
            Thoughts, tutorials, and insights about web development, technology,
            and my learning journey
          </p>
        </div>

        {/* Platform Filter */}
        <div
          className={`w-full max-w-4xl mx-auto mb-8 sm:mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {platforms.map((platform) => (
              <button
                key={platform}
                onClick={() => setActivePlatform(platform)}
                className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
                  activePlatform === platform
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                    : "bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20"
                }`}
              >
                {platform}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div
          className={`w-full max-w-6xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {filteredBlogs.map((blog, index) => (
              <div
                key={blog.id}
                className={`group transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Blog Card */}
                <div className="bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/20 hover:shadow-2xl hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 h-full">
                  {/* Platform Badge & Featured */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-8 h-8 ${blog.platformColor} rounded-full flex items-center justify-center text-white text-sm font-bold`}
                      >
                        {blog.platformIcon}
                      </span>
                      <span className="text-gray-300 text-sm font-medium">
                        {blog.platform}
                      </span>
                    </div>
                    {blog.featured && (
                      <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                        ⭐ Featured
                      </span>
                    )}
                  </div>

                  {/* Blog Content */}
                  <div className="space-y-4 flex-1">
                    {/* Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-200 line-clamp-2">
                      {blog.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                      {blog.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-medium border border-blue-500/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-400 pt-2">
                      <span>{blog.readTime}</span>
                      <span>
                        {new Date(blog.publishDate).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Read More Button */}
                    <div className="pt-4">
                      <a
                        href={blog.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 w-full justify-center"
                      >
                        Read Full Article
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredBlogs.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              No blog posts found
            </h3>
            <p className="text-gray-400">
              Try selecting a different platform or check back later!
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div
          className={`w-full max-w-4xl mx-auto mt-12 text-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl p-8 border border-blue-500/30">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
              📖 Want to Read More?
            </h3>
            <p className="text-gray-300 text-sm sm:text-base mb-6">
              Follow me on these platforms for more articles, tutorials, and
              insights about web development!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://medium.com/@yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-orange-600 transition-all duration-200"
              >
                📝 Medium
              </a>
              <a
                href="https://dev.to/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-black text-white font-semibold rounded-xl hover:bg-gray-800 transition-all duration-200"
              >
                💻 Dev.to
              </a>
              <a
                href="https://yourusername.hashnode.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-200"
              >
                🚀 Hashnode
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
