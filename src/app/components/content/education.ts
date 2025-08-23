// Education Page Content Configuration
// Edit this file to update your educational background, institutions, and other content

export const educationContent = {
  // Page Header Information
  header: {
    title: "Educational Journey",
    subtitle: "My academic path in technology and software development",
  },

  // Educational Institutions Data
  institutions: [
    {
      id: 1,
      institution: "ESOFT Metro Campus",
      degree: "Bachelor of Information Technology (Honours)",
      specialization: "Computer Software Engineering",
      period: "2021 - 2025",
      status: "Completed",
      location: "Bambalapitiya, Sri Lanka",
      description:
        "Completed a Bachelor of Information Technology (Hons) degree at ESOFT Metro Campus, Bambalapitiya. Passionate about technology and continuously developing skills in software development, problem-solving, and innovative IT solutions. Excited to contribute to impactful projects and grow as an IT professional.",
      skills: [
        "PHP",
        "CSS",
        "Figma",
        "MySQL",
        "Firebase",
        "Java",
        "XML",
        "HTML",
        "C#",
        "Bootstrap",
        "Android Studio",
      ],
      logo: "🎓",
      achievements: [
        "Maintaining strong academic performance",
        "Active participation in technology projects",
        "Developing practical software solutions",
        "Collaborating with peers on innovative ideas",
      ],
      color: "bg-blue-500",
      delay: 0.7,
    },
    {
      id: 2,
      institution: "Ku/parakramabahu National School",
      degree: "G.C.E. Advanced Level",
      specialization: "Technology Stream",
      period: "2016 - 2018",
      status: "Completed",
      location: "Kurunegala, Sri Lanka",
      description:
        "Completed G.C.E. Advanced Level with a Technology Stream, building a strong foundation in mathematics and physics.",
      skills: [
        "Mathematics",
        "Physics",
        "Problem Solving",
        "Analytical Thinking",
        "Critical Analysis",
        "Logical Reasoning",
      ],
      logo: "🔬",
      achievements: [
        "Strong foundation in mathematical concepts",
        "Developed analytical thinking skills",
        "Enhanced problem-solving abilities",
        "Built logical reasoning capabilities",
      ],
      color: "bg-green-500",
      delay: 0.8,
    },
  ],

  // Navigation Settings
  navigation: {
    autoRotate: false, // Set to true if you want automatic rotation
    rotationInterval: 5000, // Rotation interval in milliseconds
    showProgressIndicator: true, // Show dots indicator
    showNavigationButtons: true, // Show prev/next buttons
  },

  // Status Configuration
  statusConfig: {
    completed: {
      label: "Completed",
      color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    },
    inProgress: {
      label: "In Progress",
      color: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
    },
    finalYear: {
      label: "Final Year Student",
      color: "bg-green-500/20 text-green-300 border-green-500/30",
    },
  },

  // Animation Settings
  animation: {
    transitionDuration: 700, // Transition duration in milliseconds
    staggerDelay: 100, // Delay between staggered animations
    floatingAnimation: true, // Enable floating animations
    gradientAnimation: true, // Enable gradient animations
  },

  // Skills Categories
  skillsCategories: {
    programming: {
      label: "Programming Languages",
      color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
    },
    tools: {
      label: "Development Tools",
      color: "bg-green-500/20 text-green-300 border-green-500/30",
    },
    softSkills: {
      label: "Soft Skills",
      color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
    },
  },
};

// Helper functions
export const getInstitutionById = (id: number) => {
  return educationContent.institutions.find((inst) => inst.id === id);
};

export const getInstitutionsByStatus = (status: string) => {
  return educationContent.institutions.filter((inst) => inst.status === status);
};

export const getInstitutionsByPeriod = (startYear: number, endYear: number) => {
  return educationContent.institutions.filter((inst) => {
    const [start] = inst.period.split(" - ").map(Number);
    return start >= startYear && start <= endYear;
  });
};

export const getAllSkills = () => {
  const allSkills = new Set<string>();
  educationContent.institutions.forEach((inst) => {
    inst.skills.forEach((skill) => allSkills.add(skill));
  });
  return Array.from(allSkills);
};

export const getSkillsByCategory = (category: string) => {
  const categorySkills: { [key: string]: string[] } = {
    programming: ["PHP", "Java", "C#", "HTML", "CSS", "XML"],
    tools: ["Figma", "MySQL", "Firebase", "Bootstrap", "Android Studio"],
    softSkills: [
      "Problem Solving",
      "Analytical Thinking",
      "Critical Analysis",
      "Logical Reasoning",
    ],
  };

  return categorySkills[category] || [];
};

// Export individual sections for easier access
export const {
  header,
  institutions,
  navigation,
  statusConfig,
  animation,
  skillsCategories,
} = educationContent;
