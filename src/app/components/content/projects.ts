// Projects Page Content Configuration
// Edit this file to update your project portfolio, categories, and other content

export const projectsContent = {
  // Page Header Information
  header: {
    title: "My Projects",
    subtitle:
      "A collection of my work showcasing different technologies and problem-solving approaches",
    indicators: ["Building", "Creating", "Innovating"],
  },

  // Project Categories
  categories: ["All", "Full-Stack", "Frontend", "Backend"],

  // Projects Data
  projects: [
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
      color: "bg-green-500",
      delay: 0.7,
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
      color: "bg-blue-500",
      delay: 0.8,
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
      color: "bg-purple-500",
      delay: 0.9,
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
      color: "bg-red-500",
      delay: 1.0,
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
      color: "bg-indigo-500",
      delay: 1.1,
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
      color: "bg-orange-500",
      delay: 1.2,
    },
  ],

  // Animation Settings
  animation: {
    rotationInterval: 3500, // Project rotation effect interval in milliseconds
    floatingParticles: 5, // Number of floating particles
    particleDuration: 19, // Base duration for particle animations
    particleDelay: 1.3, // Base delay between particles
    transitionDuration: 300, // Transition duration for project cards
    staggerDelay: 100, // Delay between staggered animations
  },

  // Floating Particles Configuration
  particles: {
    count: 5,
    baseLeft: 8,
    leftSpacing: 20,
    baseTop: 18,
    topSpacing: 14,
    baseDuration: 19,
    durationVariation: 1.8,
    baseDelay: 1.3,
  },

  // Project Card Configuration
  cardConfig: {
    hoverScale: 1.03,
    hoverY: -8,
    transitionDuration: 300,
    imageHeight: {
      sm: "h-48",
      md: "h-56",
    },
  },

  // Empty State Configuration
  emptyState: {
    icon: "🔍",
    title: "No projects found",
    message: "Try selecting a different category or check back later!",
  },
};

// Helper functions
export const getProjectById = (id: number) => {
  return projectsContent.projects.find((project) => project.id === id);
};

export const getProjectsByCategory = (category: string) => {
  if (category === "All") return projectsContent.projects;
  return projectsContent.projects.filter(
    (project) => project.category === category
  );
};

export const getFeaturedProjects = () => {
  return projectsContent.projects.filter((project) => project.featured);
};

export const getProjectsByTechnology = (technology: string) => {
  return projectsContent.projects.filter((project) =>
    project.technologies.some((tech) =>
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
};

export const getParticleConfig = (index: number) => {
  const { particles } = projectsContent;
  return {
    left: `${particles.baseLeft + index * particles.leftSpacing}%`,
    top: `${particles.baseTop + index * particles.topSpacing}%`,
    duration: particles.baseDuration + index * particles.durationVariation,
    delay: index * particles.baseDelay,
  };
};

export const getAllTechnologies = () => {
  const allTechnologies = new Set<string>();
  projectsContent.projects.forEach((project) => {
    project.technologies.forEach((tech) => allTechnologies.add(tech));
  });
  return Array.from(allTechnologies);
};

// Export individual sections for easier access
export const {
  header,
  categories,
  projects,
  animation,
  particles,
  cardConfig,
  emptyState,
} = projectsContent;
