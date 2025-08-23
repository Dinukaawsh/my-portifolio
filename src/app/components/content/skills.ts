// Skills Page Content Configuration
// Edit this file to update your skills, expertise levels, and other content

export const skillsContent = {
  // Page Header Information
  header: {
    title: "Skills & Expertise",
    subtitle:
      "A comprehensive showcase of my technical skills and professional competencies",
    indicators: ["Technical", "Creative", "Analytical", "Innovative"],
  },

  // Skills Data organized by categories
  skills: {
    languages: [
      { name: "JavaScript", level: 95, color: "#F7DF1E", icon: "custom:js" },
      { name: "TypeScript", level: 90, color: "#3178C6", icon: "custom:ts" },
      { name: "Python", level: 85, color: "#3776AB", icon: "custom:python" },
      { name: "PHP", level: 80, color: "#777BB4", icon: "custom:php" },
    ],

    frontendFrameworks: [
      { name: "React.js", level: 95, color: "#61DAFB", icon: "custom:react" },
      { name: "Next.js", level: 90, color: "#000000", icon: "custom:nextjs" },
      { name: "Vue.js", level: 85, color: "#42B883", icon: "custom:vue" },
      {
        name: "Tailwind CSS",
        level: 88,
        color: "#06B6D4",
        icon: "custom:tailwind",
      },
      {
        name: "Bootstrap",
        level: 88,
        color: "#563D7C",
        icon: "custom:bootstrap",
      },
    ],

    backendFrameworks: [
      { name: "Node.js", level: 92, color: "#339933", icon: "custom:nodejs" },
      { name: "Laravel", level: 85, color: "#FF2D20", icon: "custom:laravel" },
      { name: "Django", level: 80, color: "#092E20", icon: "custom:django" },
      {
        name: "Express.js",
        level: 88,
        color: "#000000",
        icon: "custom:express",
      },
      {
        name: "NestJS",
        level: 80,
        color: "#000000",
        icon: "custom:nestjs",
      },
    ],

    databases: [
      { name: "MongoDB", level: 85, color: "#47A248", icon: "custom:mongodb" },
      { name: "MySQL", level: 80, color: "#4479A1", icon: "custom:mysql" },
      {
        name: "Firebase",
        level: 80,
        color: "#FFCA28",
        icon: "custom:firebase",
      },
    ],

    cloudServices: [
      { name: "AWS", level: 80, color: "#FF9900", icon: "custom:aws" },
      { name: "Vercel", level: 90, color: "#000000", icon: "custom:vercel" },
      { name: "Railway", level: 90, color: "#0B0D0E", icon: "custom:railway" },
    ],

    tools: [
      { name: "Postman", level: 90, color: "#FF6C37", icon: "custom:postman" },
      { name: "Figma", level: 85, color: "#F24E1E", icon: "custom:figma" },
      { name: "VS Code", level: 95, color: "#007ACC", icon: "custom:vscode" },
      { name: "Git", level: 88, color: "#F05032", icon: "custom:git" },
      { name: "Docker", level: 75, color: "#2496ED", icon: "custom:docker" },
    ],

    softSkills: [
      { name: "Teamwork", icon: "Users" },
      { name: "Communication", icon: "MessageCircle" },
      { name: "Problem Solving", icon: "Lightbulb" },
      { name: "Sprint Planning", icon: "RefreshCw" },
      { name: "Creativity", icon: "Sparkles" },
      { name: "Time Management", icon: "Clock" },
      { name: "Leadership", icon: "Crown" },
      { name: "Empathy", icon: "Heart" },
      { name: "Critical Thinking", icon: "Brain" },
      { name: "Conflict Resolution", icon: "Shield" },
      { name: "Work Ethic", icon: "Target" },
      { name: "Attention to Detail", icon: "Search" },
    ],
  },

  // Category Display Names
  categoryNames: {
    languages: "Programming Languages",
    frontendFrameworks: "Frontend Frameworks",
    backendFrameworks: "Backend Frameworks",
    databases: "Databases",
    cloudServices: "Cloud Services",
    tools: "Development Tools",
    softSkills: "Soft Skills",
  },

  // Category Colors
  categoryColors: {
    languages: "from-blue-500 to-blue-600",
    frontendFrameworks: "from-green-500 to-green-600",
    backendFrameworks: "from-purple-500 to-purple-600",
    databases: "from-orange-500 to-orange-600",
    cloudServices: "from-indigo-500 to-indigo-600",
    tools: "from-pink-500 to-pink-600",
    softSkills: "from-teal-500 to-teal-600",
  },

  // Animation Settings
  animation: {
    skillsRotationInterval: 3000, // Skills rotation effect interval in milliseconds
    floatingParticles: 6, // Number of floating particles
    particleDuration: 16, // Base duration for particle animations
    particleDelay: 1.2, // Base delay between particles
    autoSlideInterval: 8000, // Auto-slide interval in milliseconds
    progressAnimationDelay: 200, // Delay between progress bar animations
    transitionDuration: 700, // Transition duration in milliseconds
    staggerDelay: 100, // Delay between staggered animations
  },

  // Floating Particles Configuration
  particles: {
    count: 6,
    baseLeft: 10,
    leftSpacing: 15,
    baseTop: 20,
    topSpacing: 12,
    baseDuration: 16,
    durationVariation: 1.5,
    baseDelay: 1.2,
  },

  // Auto-slide Configuration
  autoSlide: {
    enabled: true,
    interval: 8000, // Total cycle time in milliseconds
    progressAnimationTime: 5000, // Time for progress bars to animate
    transitionDelay: 3000, // Delay before transitioning to next category
  },

  // Progress Bar Configuration
  progressBars: {
    height: {
      sm: "h-3",
      md: "h-4",
    },
    animationDuration: 1000, // Duration for progress bar animation
    staggerDelay: 200, // Delay between each progress bar animation
  },
};

// Helper functions
export const getCategoryName = (key: string) => {
  return (
    skillsContent.categoryNames[
      key as keyof typeof skillsContent.categoryNames
    ] || key
  );
};

export const getCategoryColor = (key: string) => {
  return (
    skillsContent.categoryColors[
      key as keyof typeof skillsContent.categoryNames
    ] || "from-gray-500 to-gray-600"
  );
};

export const getSkillsByCategory = (category: string) => {
  return (
    skillsContent.skills[category as keyof typeof skillsContent.skills] || []
  );
};

export const getAllCategories = () => {
  return Object.keys(skillsContent.skills);
};

export const getParticleConfig = (index: number) => {
  const { particles } = skillsContent;
  return {
    left: `${particles.baseLeft + index * particles.leftSpacing}%`,
    top: `${particles.baseTop + index * particles.topSpacing}%`,
    duration: particles.baseDuration + index * particles.durationVariation,
    delay: index * particles.baseDelay,
  };
};

export const getSkillsCount = (category: string) => {
  const skills =
    skillsContent.skills[category as keyof typeof skillsContent.skills];
  return Array.isArray(skills) ? skills.length : 0;
};

export const getTotalSkillsCount = () => {
  let total = 0;
  Object.values(skillsContent.skills).forEach((category) => {
    if (Array.isArray(category)) {
      total += category.length;
    }
  });
  return total;
};

// Export individual sections for easier access
export const {
  header,
  skills,
  categoryNames,
  categoryColors,
  animation,
  particles,
  autoSlide,
  progressBars,
} = skillsContent;
