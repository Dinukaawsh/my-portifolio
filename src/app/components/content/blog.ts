// Blog Page Content Configuration
// Edit this file to update your blog posts, platform info, and other content

export const blogContent = {
  // Page Header Information
  header: {
    title: "My Blog Posts",
    subtitle:
      "Thoughts, tutorials, and insights about web development, technology, and my learning journey - all published on Medium",
    indicators: ["Writing", "Learning", "Sharing"],
  },

  // Blog Posts Data
  posts: [
    {
      id: 1,
      image: "/blog-images/blog1.png",
      title: "REST API vs GraphQL: Which Should You Choose in 2025?",
      excerpt:
        "This blog post compares REST API and GraphQL, exploring their strengths and weaknesses. It provides a detailed analysis of each approach, helping developers make an informed decision based on their specific needs.",
      platform: "Medium",
      platformColor: "bg-orange-500",
      url: "https://medium.com/@dinukaaw.sh/rest-api-vs-graphql-which-should-you-choose-in-2025-bfdeacb0817a",
      readTime: "6 min read",
      publishDate: "2025-08-26",
      tags: ["REST API", "GraphQL", "API", "Web Development"],
      featured: true,
    },
    {
      id: 2,
      image: "/blog-images/blog2.png",
      title: "CI/CD Pipelines: Automate Your Workflow Like a Pro",
      excerpt:
        "This blog post provides a comprehensive guide to CI/CD pipelines. It covers the benefits of automating your workflow, the different types of pipelines, and best practices for implementing them.",
      platform: "Medium",
      platformColor: "bg-orange-500",
      url: "https://medium.com/@dinukaaw.sh/ci-cd-pipelines-automate-your-workflow-like-a-pro-0f33314c4173",
      readTime: "8 min read",
      publishDate: "2025-08-26",
      tags: ["CI/CD", "Automation", "Workflow", "DevOps"],
      featured: true,
    },
    {
      id: 3,
      image: "/blog-images/blog3.png",
      title:
        "Why TypeScript is Becoming the Standard for Modern Web Development",
      excerpt:
        "This blog post explores why TypeScript is becoming the standard for modern web development. It discusses the benefits of using TypeScript, including type safety, improved code readability, and better tooling support.",
      platform: "Medium",
      platformColor: "bg-orange-500",
      url: "https://medium.com/@dinukaaw.sh/why-typescript-is-becoming-the-standard-for-modern-web-development-303149a71a57",
      readTime: "4 min read",
      publishDate: "2025-08-26",
      tags: ["TypeScript", "JavaScript", "Programming", "Learning"],
      featured: true,
    },
    // {
    //   id: 4,
    //   title: "Responsive Design Principles for Modern Web Apps",
    //   excerpt:
    //     "Essential principles and techniques for creating truly responsive web applications that work seamlessly across all devices and screen sizes.",
    //   platform: "Medium",
    //   platformColor: "bg-orange-500",
    //   url: "https://medium.com/@dinukaaw.sh/responsive-design-principles",
    //   readTime: "10 min read",
    //   publishDate: "2023-12-28",
    //   tags: ["CSS", "Responsive Design", "UX", "Web Development"],
    //   featured: false,
    // },
    // {
    //   id: 5,
    //   title: "State Management in React: Context vs Redux",
    //   excerpt:
    //     "A comprehensive comparison of state management solutions in React applications. When to use Context API, when to reach for Redux, and practical examples.",
    //   platform: "Medium",
    //   platformColor: "bg-orange-500",
    //   url: "https://medium.com/@dinukaaw.sh/react-state-management-guide",
    //   readTime: "14 min read",
    //   publishDate: "2023-12-20",
    //   tags: ["React", "Redux", "Context API", "State Management"],
    //   featured: false,
    // },
    // {
    //   id: 6,
    //   title: "Deploying Next.js Apps to Vercel: Best Practices",
    //   excerpt:
    //     "Step-by-step guide to deploying Next.js applications to Vercel with optimization tips, environment variables setup, and performance monitoring.",
    //   platform: "Medium",
    //   platformColor: "bg-orange-500",
    //   url: "https://medium.com/@dinukaaw.sh/nextjs-vercel-deployment",
    //   readTime: "9 min read",
    //   publishDate: "2023-12-15",
    //   tags: ["Next.js", "Vercel", "Deployment", "DevOps"],
    //   featured: false,
    // },
  ],

  // Platform Filter Options
  platforms: ["All", "Medium"],

  // Call to Action Section
  callToAction: {
    title: "📖 Want to Read More?",
    description:
      "Follow me on these platforms for more articles, tutorials, and insights about web development!",
    buttonText: "Follow me on Medium",
    buttonUrl: "https://medium.com/@dinukaaw.sh",
    buttonIcon:
      "M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z",
  },

  // Animation Settings
  animation: {
    rotationInterval: 4000, // Blog rotation effect interval in milliseconds
    floatingParticles: 5, // Number of floating particles
    particleDuration: 17, // Base duration for particle animations
    particleDelay: 1.5, // Base delay between particles
  },

  // Platform Configuration
  platformConfig: {
    medium: {
      name: "Medium",
      color: "bg-orange-500",
      icon: "M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z",
    },
  },
};

// Helper functions
export const getFeaturedPosts = () => {
  return blogContent.posts.filter((post) => post.featured);
};

export const getPostsByPlatform = (platform: string) => {
  if (platform === "All") return blogContent.posts;
  return blogContent.posts.filter((post) => post.platform === platform);
};

export const getPostsByTag = (tag: string) => {
  return blogContent.posts.filter((post) =>
    post.tags.some((postTag) =>
      postTag.toLowerCase().includes(tag.toLowerCase())
    )
  );
};

// Export individual sections for easier access
export const {
  header,
  posts,
  platforms,
  callToAction,
  animation,
  platformConfig,
} = blogContent;
