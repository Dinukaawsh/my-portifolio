// Experience Page Content Configuration
// Edit this file to update your work experience, company details, and other content

export const experienceContent = {
  // Page Header Information
  header: {
    title: "Professional Experience",
    subtitle: "My journey in software development and technology",
    indicators: ["Development", "Innovation", "Growth"],
  },

  // Work Experience Data
  experiences: [
    {
      id: 1,
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
      logo: "/experince-images/twist.png",
      logoAlt: "Twist Digital Logo",
      color: "bg-blue-500",
      delay: 0.7,
    },
  ],

  // Navigation Settings
  navigation: {
    autoRotate: false, // Set to true if you want automatic rotation
    rotationInterval: 4000, // Rotation interval in milliseconds
    showProgressIndicator: true, // Show dots indicator
    showNavigationButtons: true, // Show prev/next buttons
  },

  // Experience Type Configuration
  experienceTypes: {
    internship: {
      label: "Internship",
      color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    },
    fullTime: {
      label: "Full-Time",
      color: "bg-green-500/20 text-green-300 border-green-500/30",
    },
    contract: {
      label: "Contract",
      color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    },
    freelance: {
      label: "Freelance",
      color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    },
  },

  // Location Configuration
  locations: {
    remote: {
      label: "Remote",
      color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    },
    onsite: {
      label: "On-Site",
      color: "bg-green-500/20 text-green-300 border-green-500/30",
    },
    hybrid: {
      label: "Hybrid",
      color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    },
  },

  // Animation Settings
  animation: {
    transitionDuration: 300, // Transition duration in milliseconds
    staggerDelay: 100, // Delay between staggered animations
    floatingAnimation: true, // Enable floating animations
    gradientAnimation: true, // Enable gradient animations
    skillsRotationInterval: 4000, // Skills rotation interval
  },

  // Skills Categories
  skillsCategories: {
    frontend: {
      label: "Frontend Technologies",
      color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    },
    backend: {
      label: "Backend Technologies",
      color: "bg-green-500/20 text-green-300 border-green-500/30",
    },
    devops: {
      label: "DevOps & Tools",
      color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    },
    databases: {
      label: "Databases",
      color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
    },
  },

  // Floating Particles Configuration
  particles: {
    count: 5,
    baseLeft: 15,
    leftSpacing: 18,
    baseTop: 25,
    topSpacing: 12,
    baseDuration: 18,
    durationVariation: 2,
    baseDelay: 1.5,
  },
};

// Helper functions
export const getExperienceById = (id: number) => {
  return experienceContent.experiences.find((exp) => exp.id === id);
};

export const getExperiencesByType = (type: string) => {
  return experienceContent.experiences.filter((exp) => exp.type === type);
};

export const getExperiencesByLocation = (location: string) => {
  return experienceContent.experiences.filter(
    (exp) => exp.location === location
  );
};

export const getAllSkills = () => {
  const allSkills = new Set<string>();
  experienceContent.experiences.forEach((exp) => {
    exp.skills.forEach((skill) => allSkills.add(skill));
  });
  return Array.from(allSkills);
};

export const getSkillsByCategory = (category: string) => {
  const categorySkills: { [key: string]: string[] } = {
    frontend: [
      "Next.js",
      "React.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
    ],
    backend: ["Node.js", "REST APIs", "Webhooks", "WebSockets"],
    devops: ["AWS", "GitHub", "Git", "CI/CD", "Data Migration"],
    databases: ["MongoDB"],
  };

  return categorySkills[category] || [];
};

export const getParticleConfig = (index: number) => {
  const { particles } = experienceContent;
  return {
    left: `${particles.baseLeft + index * particles.leftSpacing}%`,
    top: `${particles.baseTop + index * particles.topSpacing}%`,
    duration: particles.baseDuration + index * particles.durationVariation,
    delay: index * particles.baseDelay,
  };
};

// Export individual sections for easier access
export const {
  header,
  experiences,
  navigation,
  experienceTypes,
  locations,
  animation,
  skillsCategories,
  particles,
} = experienceContent;
