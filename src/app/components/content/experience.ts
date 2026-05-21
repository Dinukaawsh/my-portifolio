// Experience Page Content Configuration
// Edit this file to update your work experience, company details, and other content

// Type for single role experience (backward compatibility)
type SingleRoleExperience = {
  id: number;
  company: string;
  title: string;
  period: string;
  duration: string;
  type: string;
  location: string;
  description: string;
  responsibilities: string[];
  skills: string[];
  logo: string;
  logoAlt: string;
  color: string;
  delay: number;
};

export const experienceContent = {
  // Page Header Information
  header: {
    title: "Professional Experience",
    subtitle: "My journey in software development and technology",
    indicators: ["Development", "Innovation", "Growth"],
  },

  // Work Experience Data
  // If a company has multiple roles, use the 'roles' array to show progression
  // Otherwise, use the single role structure
  experiences: [
    {
      id: 1,
      company: "Twist Digital",
      location: "Remote",
      logo: "/experince-images/twist.png",
      logoAlt: "Twist Digital Logo",
      color: "bg-green-500",
      delay: 0.7,
      // Multiple roles at the same company - shows progression like LinkedIn
      roles: [
        {
          id: 1,
          title: "Associate Software Engineer (Full-Stack)",
          period: "Jan 2026 - Present",
          duration: "Ongoing",
          type: "Full-Time",
          description:
            "Promoted to Associate Software Engineer at Twist Digital, where I continue to work on full-stack web development using modern technologies. I'm taking on more responsibilities and leading development initiatives, with a strong focus on Next.js for building scalable and high-performance applications.",
          responsibilities: [
            "Full-stack web development using Next.js and modern technologies",
            "Leading development initiatives and mentoring junior developers",
            "Deploying applications and managing CI/CD pipelines",
            "Database design and migrations",
            "Cloud hosting and DevOps practices",
            "Building efficient, user-centric applications",
            "Code reviews and technical decision-making",
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
            "GraphQL",
            "Docker",
          ],
        },
        {
          id: 2,
          title: "Software Engineer Intern (Full-Stack)",
          period: "Mar 2025 - Dec 2025",
          duration: "10 months",
          type: "Internship",
          description:
            "Started my professional journey as a Software Engineer Intern at Twist Digital, where I gained hands-on experience in full-stack web development using modern technologies. My work spanned both frontend and backend development, with a strong focus on Next.js for building scalable and high-performance applications.",
          responsibilities: [
            "Full-stack web development using Next.js and modern technologies",
            "Deploying applications and managing CI/CD pipelines",
            "Database design and migrations",
            "Cloud hosting and DevOps practices",
            "Building efficient, user-centric applications",
            "Learning and implementing best practices in software development",
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
        },
      ],
      // Combined period for the entire company experience
      period: "Mar 2025 - Present",
      // Combined description (optional, can be used for company overview)
      description:
        "Working at Twist Digital, progressing from Intern to Associate Software Engineer, focusing on full-stack web development using modern technologies.",
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
  return experienceContent.experiences.filter((exp) => {
    // Check if experience has roles (new structure)
    if (exp.roles && Array.isArray(exp.roles)) {
      return exp.roles.some((role) => role.type === type);
    }
    // Backward compatibility for single role structure
    const singleExp = exp as unknown as SingleRoleExperience;
    return singleExp.type === type;
  });
};

export const getExperiencesByLocation = (location: string) => {
  return experienceContent.experiences.filter(
    (exp) => exp.location === location
  );
};

export const getAllSkills = () => {
  const allSkills = new Set<string>();
  experienceContent.experiences.forEach((exp) => {
    // Check if experience has roles (new structure)
    if ('roles' in exp && exp.roles && Array.isArray(exp.roles)) {
      exp.roles.forEach((role) => {
        role.skills.forEach((skill: string) => allSkills.add(skill));
      });
    } else {
      // Backward compatibility for single role structure
      const singleExp = exp as unknown as SingleRoleExperience;
      const skills = singleExp.skills || [];
      if (Array.isArray(skills)) {
        skills.forEach((skill: string) => allSkills.add(skill));
      }
    }
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
