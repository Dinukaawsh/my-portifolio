// Certificates Page Content Configuration
// Edit this file to update your certificates, certifications, and other content

export const certificatesContent = {
  // Page Header Information
  header: {
    title: "Certificates & Certifications",
    subtitle:
      "Professional certifications and achievements that validate my skills and expertise",
    indicators: ["Learning", "Growing", "Achieving"],
  },

  // Certificate Categories
  categories: [
    "All",
    "Web Development",
    "Programming",
    "Cloud & DevOps",
    "Design",
    "Other",
  ],

  // Certificates Data
  certificates: [
    {
      id: 1,
      title:
        "Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications",
      issuer: "KodeKloud",
      issuerLogo: "🎓",
      category: "DevOps",
      issueDate: "2025-09-14",
      expiryDate: null, // null for no expiry
      credentialId: "bf9e0608-2c56-4612-bd93-a7033291018d",
      credentialUrl:
        "https://certificates.kodekloud.com/ab7c016a-0f97-48af-8e83-af552b852923/f7b2d58c-4277-46ef-bfcc-d4e5e7c9e2f9/bf9e0608-2c56-4612-bd93-a7033291018d.pdf",
      description:
        "Comprehensive course covering Next.js 13 features including App Router, Server Components, and modern React patterns.",
      skills: [
        "Next.js 13",
        "React 18",
        "App Router",
        "Server Components",
        "TypeScript",
        "Tailwind CSS",
      ],
      featured: true,
      color: "bg-blue-500",
      delay: 0.7,
      verificationUrl: "https://udemy.com/verify/12345",
    },
    {
      id: 2,
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services",
      issuerLogo: "☁️",
      category: "Cloud & DevOps",
      issueDate: "2023-12-10",
      expiryDate: "2026-12-10",
      credentialId: "AWS-CCP-12345",
      credentialUrl: "https://aws.amazon.com/verification",
      description:
        "Foundation level certification covering AWS cloud concepts, services, security, architecture, pricing, and support.",
      skills: [
        "AWS Cloud",
        "Cloud Computing",
        "Security",
        "Architecture",
        "Pricing",
        "Support",
      ],
      featured: true,
      color: "bg-orange-500",
      delay: 0.8,
      verificationUrl: "https://aws.amazon.com/verification",
    },
    {
      id: 3,
      title: "React - The Complete Guide",
      issuer: "Udemy",
      issuerLogo: "🎓",
      category: "Web Development",
      issueDate: "2023-11-20",
      expiryDate: null,
      credentialId: "UD-67890",
      credentialUrl: "https://udemy.com/certificate/67890",
      description:
        "Master React with Hooks, Context, Redux, and build real-world applications with modern React patterns.",
      skills: [
        "React Hooks",
        "Context API",
        "Redux",
        "State Management",
        "Component Lifecycle",
        "JSX",
      ],
      featured: false,
      color: "bg-cyan-500",
      delay: 0.9,
      verificationUrl: "https://udemy.com/verify/67890",
    },
    {
      id: 4,
      title: "TypeScript Masterclass",
      issuer: "Udemy",
      issuerLogo: "🎓",
      category: "Programming",
      issueDate: "2023-10-15",
      expiryDate: null,
      credentialId: "UD-11111",
      credentialUrl: "https://udemy.com/certificate/11111",
      description:
        "Advanced TypeScript course covering types, interfaces, generics, decorators, and real-world applications.",
      skills: [
        "TypeScript",
        "Types",
        "Interfaces",
        "Generics",
        "Decorators",
        "Advanced Patterns",
      ],
      featured: false,
      color: "bg-blue-600",
      delay: 1.0,
      verificationUrl: "https://udemy.com/verify/11111",
    },
    {
      id: 5,
      title: "UI/UX Design Fundamentals",
      issuer: "Coursera",
      issuerLogo: "🎨",
      category: "Design",
      issueDate: "2023-09-30",
      expiryDate: null,
      credentialId: "CR-22222",
      credentialUrl: "https://coursera.org/verify/22222",
      description:
        "Learn the fundamentals of user interface and user experience design principles and best practices.",
      skills: [
        "UI Design",
        "UX Design",
        "User Research",
        "Wireframing",
        "Prototyping",
        "Design Systems",
      ],
      featured: false,
      color: "bg-purple-500",
      delay: 1.1,
      verificationUrl: "https://coursera.org/verify/22222",
    },
    {
      id: 6,
      title: "Docker & Kubernetes",
      issuer: "Pluralsight",
      issuerLogo: "🐳",
      category: "Cloud & DevOps",
      issueDate: "2023-08-25",
      expiryDate: null,
      credentialId: "PS-33333",
      credentialUrl: "https://pluralsight.com/verify/33333",
      description:
        "Containerization and orchestration with Docker and Kubernetes for modern application deployment.",
      skills: [
        "Docker",
        "Kubernetes",
        "Containers",
        "Orchestration",
        "Microservices",
        "DevOps",
      ],
      featured: false,
      color: "bg-indigo-500",
      delay: 1.2,
      verificationUrl: "https://pluralsight.com/verify/33333",
    },
  ],

  // Animation Settings
  animation: {
    rotationInterval: 4000, // Certificate rotation effect interval in milliseconds
    floatingParticles: 6, // Number of floating particles
    particleDuration: 18, // Base duration for particle animations
    particleDelay: 1.5, // Base delay between particles
    transitionDuration: 300, // Transition duration for certificate cards
    staggerDelay: 100, // Delay between staggered animations
  },

  // Floating Particles Configuration
  particles: {
    count: 6,
    baseLeft: 12,
    leftSpacing: 16,
    baseTop: 22,
    topSpacing: 13,
    baseDuration: 18,
    durationVariation: 2,
    baseDelay: 1.5,
  },

  // Certificate Card Configuration
  cardConfig: {
    hoverScale: 1.02,
    hoverY: -5,
    transitionDuration: 300,
    featuredGlow: true,
  },

  // Empty State Configuration
  emptyState: {
    icon: "🏆",
    title: "No certificates found",
    message: "Try selecting a different category or check back later!",
  },

  // Issuer Configuration
  issuers: {
    udemy: {
      name: "Udemy",
      logo: "🎓",
      color: "bg-purple-500",
      verificationBase: "https://udemy.com/verify/",
    },
    aws: {
      name: "Amazon Web Services",
      logo: "☁️",
      color: "bg-orange-500",
      verificationBase: "https://aws.amazon.com/verification",
    },
    coursera: {
      name: "Coursera",
      logo: "🎨",
      color: "bg-blue-500",
      verificationBase: "https://coursera.org/verify/",
    },
    pluralsight: {
      name: "Pluralsight",
      logo: "🐳",
      color: "bg-indigo-500",
      verificationBase: "https://pluralsight.com/verify/",
    },
  },
};

// Helper functions
export const getCertificateById = (id: number) => {
  return certificatesContent.certificates.find((cert) => cert.id === id);
};

export const getCertificatesByCategory = (category: string) => {
  if (category === "All") return certificatesContent.certificates;
  return certificatesContent.certificates.filter(
    (cert) => cert.category === category
  );
};

export const getFeaturedCertificates = () => {
  return certificatesContent.certificates.filter((cert) => cert.featured);
};

export const getCertificatesByIssuer = (issuer: string) => {
  return certificatesContent.certificates.filter(
    (cert) => cert.issuer === issuer
  );
};

export const getCertificatesBySkill = (skill: string) => {
  return certificatesContent.certificates.filter((cert) =>
    cert.skills.some((s) => s.toLowerCase().includes(skill.toLowerCase()))
  );
};

export const getParticleConfig = (index: number) => {
  const { particles } = certificatesContent;
  return {
    left: `${particles.baseLeft + index * particles.leftSpacing}%`,
    top: `${particles.baseTop + index * particles.topSpacing}%`,
    duration: particles.baseDuration + index * particles.durationVariation,
    delay: index * particles.baseDelay,
  };
};

export const getAllSkills = () => {
  const allSkills = new Set<string>();
  certificatesContent.certificates.forEach((cert) => {
    cert.skills.forEach((skill) => allSkills.add(skill));
  });
  return Array.from(allSkills);
};

export const getExpiringCertificates = (daysThreshold: number = 90) => {
  const now = new Date();
  const thresholdDate = new Date(
    now.getTime() + daysThreshold * 24 * 60 * 60 * 1000
  );

  return certificatesContent.certificates.filter((cert) => {
    if (!cert.expiryDate) return false;
    const expiryDate = new Date(cert.expiryDate);
    return expiryDate <= thresholdDate && expiryDate > now;
  });
};

// Export individual sections for easier access
export const {
  header,
  categories,
  certificates,
  animation,
  particles,
  cardConfig,
  emptyState,
  issuers,
} = certificatesContent;
