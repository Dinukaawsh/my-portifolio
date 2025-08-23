// Achievements Page Content Configuration
// Edit this file to update your achievements, awards, and other accomplishments

export const achievementsContent = {
  // Page Header Information
  header: {
    title: "Achievements & Awards",
    subtitle:
      "Recognition of my hard work, innovation, and contributions in various fields",
    indicators: ["Excellence", "Innovation", "Leadership"],
  },

  // Achievement Categories
  categories: [
    "All",
    "Academic",
    "Professional",
    "Competitions",
    "Community",
    "Innovation",
  ],

  // Achievements Data
  achievements: [
    {
      id: 1,
      title: "Dean's List - Academic Excellence",
      issuer: "ESOFT Metro Campus",
      issuerLogo: "🎓",
      category: "Academic",
      date: "2024-01-15",
      description:
        "Recognized for maintaining a GPA of 3.8+ and outstanding academic performance throughout the semester.",
      impact:
        "Demonstrated consistent academic excellence and commitment to learning",
      skills: [
        "Academic Excellence",
        "Time Management",
        "Discipline",
        "Problem Solving",
        "Critical Thinking",
      ],
      featured: true,
      color: "bg-blue-500",
      delay: 0.7,
      certificateUrl: null,
      mediaUrl: null,
      tags: ["Academic", "Excellence", "Recognition"],
    },
    {
      id: 2,
      title: "Best Final Year Project Award",
      issuer: "ESOFT Metro Campus",
      issuerLogo: "🏆",
      category: "Academic",
      date: "2024-01-10",
      description:
        "Won the Best Final Year Project Award for developing an innovative e-commerce platform with advanced features and modern technologies.",
      impact:
        "Showcased technical expertise and innovative problem-solving abilities",
      skills: [
        "Project Management",
        "Full-Stack Development",
        "Innovation",
        "Problem Solving",
        "Technical Excellence",
      ],
      featured: true,
      color: "bg-yellow-500",
      delay: 0.8,
      certificateUrl: "/certificates/best-project-award.pdf",
      mediaUrl: "/images/project-demo.jpg",
      tags: ["Project", "Innovation", "Technical Excellence"],
    },
    {
      id: 3,
      title: "Hackathon Winner - CodeFest 2023",
      issuer: "University Tech Society",
      issuerLogo: "💻",
      category: "Competitions",
      date: "2023-12-15",
      description:
        "First place in the annual CodeFest hackathon for developing a real-time language translation app with AI integration.",
      impact:
        "Demonstrated rapid prototyping skills and innovative thinking under pressure",
      skills: [
        "Rapid Prototyping",
        "AI Integration",
        "Team Collaboration",
        "Problem Solving",
        "Innovation",
      ],
      featured: true,
      color: "bg-green-500",
      delay: 0.9,
      certificateUrl: "/certificates/hackathon-winner.pdf",
      mediaUrl: "/images/hackathon-team.jpg",
      tags: ["Competition", "Innovation", "Team Work"],
    },
    {
      id: 4,
      title: "Outstanding Intern Performance",
      issuer: "Twist Digital",
      issuerLogo: "⭐",
      category: "Professional",
      date: "2023-11-30",
      description:
        "Recognized for exceptional performance during internship, including successful project delivery and positive team contributions.",
      impact:
        "Demonstrated professional growth and valuable contributions to the organization",
      skills: [
        "Professional Development",
        "Project Delivery",
        "Team Collaboration",
        "Problem Solving",
        "Adaptability",
      ],
      featured: false,
      color: "bg-purple-500",
      delay: 1.0,
      certificateUrl: "/certificates/intern-performance.pdf",
      mediaUrl: null,
      tags: ["Professional", "Performance", "Recognition"],
    },
    {
      id: 5,
      title: "Community Service Award",
      issuer: "Local Tech Community",
      issuerLogo: "🤝",
      category: "Community",
      date: "2023-10-20",
      description:
        "Awarded for organizing free coding workshops for underprivileged students and mentoring junior developers.",
      impact: "Contributed to community development and knowledge sharing",
      skills: [
        "Leadership",
        "Teaching",
        "Mentoring",
        "Community Building",
        "Communication",
      ],
      featured: false,
      color: "bg-teal-500",
      delay: 1.1,
      certificateUrl: "/certificates/community-service.pdf",
      mediaUrl: "/images/workshop-session.jpg",
      tags: ["Community", "Leadership", "Mentoring"],
    },
    {
      id: 6,
      title: "Innovation Challenge Finalist",
      issuer: "Tech Innovation Hub",
      issuerLogo: "🚀",
      category: "Innovation",
      date: "2023-09-15",
      description:
        "Reached the finals of the National Innovation Challenge with a sustainable energy management system concept.",
      impact:
        "Demonstrated innovative thinking and sustainable technology awareness",
      skills: [
        "Innovation",
        "Sustainability",
        "System Design",
        "Presentation",
        "Research",
      ],
      featured: false,
      color: "bg-indigo-500",
      delay: 1.2,
      certificateUrl: "/certificates/innovation-finalist.pdf",
      mediaUrl: "/images/innovation-pitch.jpg",
      tags: ["Innovation", "Sustainability", "Research"],
    },
  ],

  // Animation Settings
  animation: {
    rotationInterval: 4500, // Achievement rotation effect interval in milliseconds
    floatingParticles: 7, // Number of floating particles
    particleDuration: 20, // Base duration for particle animations
    particleDelay: 1.8, // Base delay between particles
    transitionDuration: 300, // Transition duration for achievement cards
    staggerDelay: 120, // Delay between staggered animations
  },

  // Floating Particles Configuration
  particles: {
    count: 7,
    baseLeft: 8,
    leftSpacing: 14,
    baseTop: 18,
    topSpacing: 11,
    baseDuration: 20,
    durationVariation: 2.5,
    baseDelay: 1.8,
  },

  // Achievement Card Configuration
  cardConfig: {
    hoverScale: 1.03,
    hoverY: -6,
    transitionDuration: 300,
    featuredGlow: true,
    showTags: true,
  },

  // Empty State Configuration
  emptyState: {
    icon: "🌟",
    title: "No achievements found",
    message: "Try selecting a different category or check back later!",
  },

  // Achievement Types Configuration
  achievementTypes: {
    academic: {
      label: "Academic",
      color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      icon: "🎓",
    },
    professional: {
      label: "Professional",
      color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      icon: "⭐",
    },
    competitions: {
      label: "Competitions",
      color: "bg-green-500/20 text-green-300 border-green-500/30",
      icon: "🏆",
    },
    community: {
      label: "Community",
      color: "bg-teal-500/20 text-teal-300 border-teal-500/30",
      icon: "🤝",
    },
    innovation: {
      label: "Innovation",
      color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      icon: "🚀",
    },
  },
};

// Helper functions
export const getAchievementById = (id: number) => {
  return achievementsContent.achievements.find(
    (achievement) => achievement.id === id
  );
};

export const getAchievementsByCategory = (category: string) => {
  if (category === "All") return achievementsContent.achievements;
  return achievementsContent.achievements.filter(
    (achievement) => achievement.category === category
  );
};

export const getFeaturedAchievements = () => {
  return achievementsContent.achievements.filter(
    (achievement) => achievement.featured
  );
};

export const getAchievementsByIssuer = (issuer: string) => {
  return achievementsContent.achievements.filter(
    (achievement) => achievement.issuer === issuer
  );
};

export const getAchievementsBySkill = (skill: string) => {
  return achievementsContent.achievements.filter((achievement) =>
    achievement.skills.some((s) =>
      s.toLowerCase().includes(skill.toLowerCase())
    )
  );
};

export const getAchievementsByTag = (tag: string) => {
  return achievementsContent.achievements.filter((achievement) =>
    achievement.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
  );
};

export const getParticleConfig = (index: number) => {
  const { particles } = achievementsContent;
  return {
    left: `${particles.baseLeft + index * particles.leftSpacing}%`,
    top: `${particles.baseTop + index * particles.topSpacing}%`,
    duration: particles.baseDuration + index * particles.durationVariation,
    delay: index * particles.baseDelay,
  };
};

export const getAllSkills = () => {
  const allSkills = new Set<string>();
  achievementsContent.achievements.forEach((achievement) => {
    achievement.skills.forEach((skill) => allSkills.add(skill));
  });
  return Array.from(allSkills);
};

export const getAllTags = () => {
  const allTags = new Set<string>();
  achievementsContent.achievements.forEach((achievement) => {
    achievement.tags.forEach((tag) => allTags.add(tag));
  });
  return Array.from(allTags);
};

export const getRecentAchievements = (days: number = 365) => {
  const now = new Date();
  const thresholdDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000);

  return achievementsContent.achievements.filter((achievement) => {
    const achievementDate = new Date(achievement.date);
    return achievementDate >= thresholdDate;
  });
};

// Export individual sections for easier access
export const {
  header,
  categories,
  achievements,
  animation,
  particles,
  cardConfig,
  emptyState,
  achievementTypes,
} = achievementsContent;
