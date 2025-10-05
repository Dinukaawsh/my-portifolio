// About Page Content Configuration
// Edit this file to update your personal information, skills, and other content

export const aboutContent = {
  // Personal Information
  personal: {
    name: "Dinuka Wickramarathna",
    title: "Full Stack Developer",
    location: "Colombo, Sri Lanka",
    email: "dinukaaw.sh@gmail.com",
    cvFile: "CV/cv.pdf",
    cvFileName: "Dinuka_Wickramarathna_CV.pdf",
    description:
      "I'm a passionate Full Stack Developer and Information Technology student pursuing a Bachelor of Information Technology (Hons), specializing in modern web technologies. With expertise across the entire software development lifecycle, I build robust, scalable applications using cutting-edge technologies. My technical proficiency includes frontend development with React.js and Next.js, backend architecture using Node.js and Express.js, and proficiency in JavaScript, TypeScript, and Python. I have extensive experience with both SQL and NoSQL databases including MongoDB and MySQL. I excel in designing RESTful APIs and GraphQL endpoints, implementing secure authentication with JWT, and creating responsive user interfaces with Tailwind CSS. My cloud infrastructure knowledge covers AWS services, CI/CD pipelines with GitHub Actions, and containerization using Docker and Kubernetes. Beyond technical skills, I bring strong problem-solving abilities, effective communication, and collaborative teamwork to every project. I'm committed to writing clean, maintainable code following industry best practices and delivering high-quality solutions that meet both business requirements and user needs.",
  },

  // Professional Roles (for typing animation)
  roles: [
    "Full Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "UI/UX Designer",
    "DevOps Engineer",
  ],

  // Technical Skills
  skills: [
    "React.js",
    "Next.js",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "MySQL",
    "Tailwind CSS",
    "Figma",
    "AWS",
  ],

  // Statistics
  stats: [
    {
      label: "Years Experience",
      value: 1,
      icon: "TrendingUp",
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Projects Completed",
      value: 12,
      icon: "Target",
      color: "from-green-500 to-emerald-500",
    },
    {
      label: "Technologies",
      value: "dynamic", // Will be calculated from skills.length
      icon: "Code2",
      color: "from-purple-500 to-pink-500",
    },
    {
      label: "Happy Clients",
      value: 8,
      icon: "Heart",
      color: "from-red-500 to-orange-500",
    },
  ],

  // Tech Stack Architecture
  techStack: {
    frontend: {
      title: "Frontend",
      description: "React, Next.js, TypeScript",
      color: "from-blue-500/40 to-purple-500/40",
      borderColor: "border-blue-400/50",
      dotColor: "bg-blue-400",
    },
    backend: {
      title: "Backend",
      description: "Node.js, Express.js, APIs",
      color: "from-green-500/40 to-emerald-500/40",
      borderColor: "border-green-400/50",
      dotColor: "bg-green-400",
    },
    database: {
      title: "Database",
      description: "MongoDB, MySQL, Firebase",
      color: "from-orange-500/40 to-red-500/40",
      borderColor: "border-orange-400/50",
      dotColor: "bg-orange-400",
    },
  },

  // Career Timeline
  timeline: [
    {
      year: "2021 - Present",
      place: "ESU colombo",
      color: "bg-blue-400",
      delay: 0.7,
    },
    {
      year: "2025 - Present",
      place: "Twist Digital",
      color: "bg-green-400",
      delay: 0.8,
    },
    {
      year: "Future",
      place: "Senior Developer",
      color: "bg-purple-400",
      delay: 0.9,
    },
  ],

  // Social Media Links
  socialLinks: [
    {
      href: "https://x.com/DinukaAshan14",
      icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
      label: "X (Twitter)",
      color: "group-hover:text-blue-400",
    },
    {
      href: "https://www.linkedin.com/in/dinuka-wickramarathna-88468b214/",
      icon: "M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.28h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.89v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v5.59z",
      label: "LinkedIn",
      color: "group-hover:text-blue-400",
    },
    {
      href: "https://github.com/Dinukaawsh/Dinukaawsh",
      icon: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.93 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23a11.52 11.52 0 0 1 3.003-.404c1.018.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
      label: "GitHub",
      color: "group-hover:text-white",
    },
    {
      href: "https://medium.com/@dinukaaw.sh",
      icon: "M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z",
      label: "Medium",
      color: "group-hover:text-green-400",
    },
    {
      href: "https://web.facebook.com/dinuka.wickramarathna",
      icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
      label: "Facebook",
      color: "group-hover:text-blue-600",
    },
    {
      href: "https://wa.me/94767326845",
      icon: "M20.52 3.48A11.88 11.88 0 0 0 12.04 0C5.4 0 .02 5.38.02 12.02c0 2.12.56 4.18 1.62 6L0 24l6.14-1.61a11.98 11.98 0 0 0 5.9 1.51h.01c6.64 0 12.02-5.38 12.02-12.02 0-3.21-1.25-6.23-3.53-8.4zM12.05 22.1h-.01c-1.9 0-3.76-.5-5.39-1.45l-.38-.23-3.64.96.97-3.55-.25-.37A10.05 10.05 0 0 1 2 12.02C2 6.5 6.53 2 12.05 2c2.69 0 5.22 1.05 7.12 2.95a10.03 10.03 0 0 1 2.95 7.1c0 5.52-4.53 10.05-10.07 10.05zm5.77-7.54c-.31-.16-1.84-.91-2.13-1.02-.29-.11-.5-.16-.71.16-.21.31-.82 1.02-1 1.23-.19.21-.37.24-.68.08-.31-.16-1.31-.48-2.5-1.53-.92-.82-1.54-1.83-1.72-2.14-.18-.31-.02-.48.14-.64.14-.14.31-.37.47-.56.16-.19.21-.32.31-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.71-.97-2.35-.26-.63-.52-.55-.71-.56h-.6c-.19 0-.5.08-.76.4-.26.31-1 1-1 2.44 0 1.44 1.02 2.84 1.16 3.04.14.21 2 3.05 4.86 4.28.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.11.55-.08 1.84-.75 2.1-1.47.26-.72.26-1.34.18-1.47-.08-.13-.29-.21-.6-.37z",
      label: "WhatsApp",
      color: "group-hover:text-green-600",
    },
  ],

  // Profile Images
  profileImages: [
    "/about-images/my.jpg",
    "/about-images/my2.jpg",
    "/about-images/my3.jpg",
  ],

  // Animation Settings
  animation: {
    typingSpeed: 80,
    typingPause: 1200,
    deletingSpeed: 40,
    roleChangeDelay: 400,
    codeTypingSpeed: 60,
    codePause: 700,
    codeChangeDelay: 400,
  },

  // Code Block Settings
  codeBlock: {
    prefix: "const developer = [",
    suffix: "];",
    filename: "developer.js",
  },

  // Achievement Badge
  achievement: {
    text: "⭐ Full-Stack",
    show: true,
  },
};

// Helper function to get dynamic stats
export const getDynamicStats = () => {
  return aboutContent.stats.map((stat) => ({
    ...stat,
    value: stat.value === "dynamic" ? aboutContent.skills.length : stat.value,
  }));
};

// Export individual sections for easier access
export const {
  personal,
  roles,
  skills,
  techStack,
  timeline,
  socialLinks,
  profileImages,
  animation,
  codeBlock,
  achievement,
} = aboutContent;
