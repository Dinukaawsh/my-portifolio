// Certificates Page Content Configuration
// Edit this file to update your certificates, certifications, and other content

import {
  Rocket,
  GraduationCap,
  BookOpen,
  Cloud,
  Award,
  Trophy,
} from "lucide-react";

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
    "Development",
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
      issuerLogo: Rocket,
      category: "Cloud & DevOps",
      issueDate: "2025-09-14",
      expiryDate: null, // null for no expiry
      credentialId: "bf9e0608-2c56-4612-bd93-a7033291018d",
      credentialUrl:
        "https://certificates.kodekloud.com/ab7c016a-0f97-48af-8e83-af552b852923/f7b2d58c-4277-46ef-bfcc-d4e5e7c9e2f9/bf9e0608-2c56-4612-bd93-a7033291018d.pdf",
      certificateImage: "/certificates-images/5.png",
      description:
        "Completed the Jenkins Project: Building CI/CD Pipeline for Scalable Web Applications course, which covered the fundamentals of Jenkins, CI/CD pipelines, and how to build a scalable web application using Jenkins.",
      skills: [
        "Jenkins",
        "CI/CD",
        "Scalable Web Applications",
        "Docker",
        "Jenkins Pipeline",
      ],
      featured: true,
      color: "bg-blue-500",
      delay: 0.7,
      verificationUrl:
        "https://certificates.kodekloud.com/ab7c016a-0f97-48af-8e83-af552b852923/f7b2d58c-4277-46ef-bfcc-d4e5e7c9e2f9/bf9e0608-2c56-4612-bd93-a7033291018d.pdf",
    },
    {
      id: 2,
      title: "Migrating Jenkins Pipelines to GitHub Actions",
      issuer: "KodeKloud",
      issuerLogo: Rocket,
      category: "Cloud & DevOps",
      issueDate: "2025-09-14",
      expiryDate: null,
      credentialId: "bf9e0608-2c56-4612-bd93-a7033291018d",
      credentialUrl:
        "https://certificates.kodekloud.com/ab7c016a-0f97-48af-8e83-af552b852923/0a4f5a81-05f2-4c74-a48e-6e887ab5dc73/b0829a0c-ae51-41c2-8f64-0deda119294d.pdf",
      certificateImage: "/certificates-images/4.png",
      description:
        "Completed the Migrating Jenkins Pipelines to GitHub Actions course, which covered the fundamentals of GitHub Actions, how to migrate Jenkins pipelines to GitHub Actions, and how to use GitHub Actions to build and deploy applications.",
      skills: [
        "GitHub Actions",
        "Jenkins",
        "Docker",
        "Jenkins Pipeline",
        "Docker",
      ],
      featured: true,
      color: "bg-orange-500",
      delay: 0.8,
      verificationUrl:
        "https://certificates.kodekloud.com/ab7c016a-0f97-48af-8e83-af552b852923/0a4f5a81-05f2-4c74-a48e-6e887ab5dc73/b0829a0c-ae51-41c2-8f64-0deda119294d.pdf",
    },
    {
      id: 3,
      title: "Nginx For Beginners",
      issuer: "KodeKloud",
      issuerLogo: Rocket,
      category: "Cloud & DevOps",
      issueDate: "2025-09-17",
      expiryDate: null,
      credentialId: "bf9e0608-2c56-4612-bd93-a7033291018d",
      credentialUrl:
        "https://certificates.kodekloud.com/ab7c016a-0f97-48af-8e83-af552b852923/d451fff5-7464-4560-bc64-ad25875e83d9/7cb7415c-6002-40ba-b437-abc13f8f4a04.pdf",
      certificateImage: "/certificates-images/3.png",
      description:
        "Completed the Nginx For Beginners course, which covered the fundamentals of Nginx, how to configure Nginx, and how to use Nginx to deploy applications.",
      skills: [
        "Nginx",
        "Reverse Proxy",
        "Nginx Configuration",
        "Nginx Deployment",
        "Nginx Performance",
        "Nginx Security",
        "Nginx Load Balancing",
      ],
      featured: false,
      color: "bg-cyan-500",
      delay: 0.9,
      verificationUrl:
        "https://certificates.kodekloud.com/ab7c016a-0f97-48af-8e83-af552b852923/d451fff5-7464-4560-bc64-ad25875e83d9/7cb7415c-6002-40ba-b437-abc13f8f4a04.pdf",
    },
    {
      id: 4,
      title: "Master the java programming language",
      issuer: "Udemy",
      issuerLogo: GraduationCap,
      category: "Programming",
      issueDate: "2024-04-19",
      expiryDate: null,
      credentialId: null,
      credentialUrl:
        "https://www.udemy.com/certificate/UC-7887c6f1-aedc-4ca3-9203-b80097c8ad79/",
      certificateImage: "/certificates-images/6.png",
      description:
        "Advanced Java course covering types, interfaces, generics, decorators, and real-world applications.",
      skills: [
        "Java",
        "Java Programming",
        "Java OOP",
        "Java Generics",
        "OOP",
        "Design Patterns",
      ],
      featured: false,
      color: "bg-blue-600",
      delay: 1.0,
      verificationUrl:
        "https://www.udemy.com/certificate/UC-7887c6f1-aedc-4ca3-9203-b80097c8ad79/",
    },
    {
      id: 5,
      title: "Software Design: Developing Effective Requirements",
      issuer: "Great Learning",
      issuerLogo: BookOpen,
      category: "Development",
      issueDate: "2024-05-04",
      expiryDate: null,
      credentialId: null,
      credentialUrl:
        "https://www.linkedin.com/learning/certificates/21128aad4e3169f18158ff8624195b1db454883b7dfc62978528a454a956f004?trk=share_certificate",
      certificateImage: "/certificates-images/2.png",
      description:
        "Learn the fundamentals of software design principles and best practices.",
      skills: ["Software Design", "Design Systems"],
      featured: false,
      color: "bg-purple-500",
      delay: 1.1,
      verificationUrl:
        "https://www.linkedin.com/learning/certificates/21128aad4e3169f18158ff8624195b1db454883b7dfc62978528a454a956f004?trk=share_certificate",
    },
    {
      id: 6,
      title: "Foundations of User Experience (UX) Design",
      issuer: "Coursera",
      issuerLogo: GraduationCap,
      category: "Design",
      issueDate: "2024-05-04",
      expiryDate: null,
      credentialId: null,
      credentialUrl:
        "https://www.coursera.org/account/accomplishments/verify/VJ985EZTFGGR?utm_source=ln&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=course",
      certificateImage: "/certificates-images/1.png",
      description:
        "Learn the fundamentals of user experience design principles and best practices.",
      skills: [
        "User Experience",
        "User Experience Design",
        "User Experience Principles",
        "User Experience Best Practices",
        "User Experience Design Principles",
        "User Experience Design Best Practices",
      ],
      featured: false,
      color: "bg-indigo-500",
      delay: 1.2,
      verificationUrl:
        "https://www.coursera.org/account/accomplishments/verify/VJ985EZTFGGR?utm_source=ln&utm_medium=certificate&utm_content=cert_image&utm_campaign=pdf_header_button&utm_product=course",
    },
    {
      id: 7,
      title: "NLP Course for Beginners",
      issuer: "Udemy",
      issuerLogo: GraduationCap,
      category: "Other",
      issueDate: "2024-04-19",
      expiryDate: null,
      credentialId: null,
      credentialUrl:
        "https://www.udemy.com/certificate/UC-31d4b2a9-9f65-4fdd-8803-4658f85e6a1d/",
      certificateImage: "/certificates-images/7.png",
      description:
        "NLP(Natural Language Processing) Course for Beginners course covering the basics of NLP and how to use it in real-world applications.",
      skills: ["NLP", "NLP Course"],
      featured: false,
      color: "bg-blue-600",
      delay: 1.0,
      verificationUrl:
        "https://www.udemy.com/certificate/UC-31d4b2a9-9f65-4fdd-8803-4658f85e6a1d/",
    },
    {
      id: 8,
      title: "SQL, MYSQL, POSTGRESQL & MONGODB: All-in-One Database Course",
      issuer: "Udemy",
      issuerLogo: GraduationCap,
      category: "Development",
      issueDate: "2025-12-24",
      expiryDate: null,
      credentialId: null,
      credentialUrl:
        "https://www.udemy.com/certificate/UC-7fb3e97f-00e9-4e5d-99bc-4e849f325ea8/",
      certificateImage: "/certificates-images/9.png",
      description:
        "SQL, MYSQL, POSTGRESQL & MONGODB: All-in-One Database Course covering the basics of SQL, MYSQL, POSTGRESQL & MONGODB and how to use it in real-world applications.",
      skills: ["SQL", "MYSQL", "POSTGRESQL", "MONGODB"],
      featured: true,
      color: "bg-blue-600",
      delay: 1.0,
      verificationUrl:
        "https://www.udemy.com/certificate/UC-7fb3e97f-00e9-4e5d-99bc-4e849f325ea8/",
    },
    {
      id: 9,
      title:
        "Master Full-Stack Web Development with JavaScript, jQuery & TypeScript through Hands-On Projects and Real-World Example.  ",
      issuer: "Udemy",
      issuerLogo: GraduationCap,
      category: "Programming",
      issueDate: "2025-08-08",
      expiryDate: null,
      credentialId: null,
      credentialUrl:
        "https://www.udemy.com/certificate/UC-6f0853a2-230b-467b-8a14-00b7ba7fc25a/",
      certificateImage: "/certificates-images/8.png",
      description:
        "Master Full-Stack Web Development with JavaScript, jQuery & TypeScript through Hands-On Projects and Real-World Example. course covering the basics of Full-Stack Web Development and how to use it in real-world applications.",
      skills: [
        "Full-Stack Web Development",
        "JavaScript",
        "jQuery",
        "TypeScript",
      ],
      featured: true,
      color: "bg-blue-600",
      delay: 1.1,
      verificationUrl:
        "https://www.udemy.com/certificate/UC-6f0853a2-230b-467b-8a14-00b7ba7fc25a/",
    },
    {
      id: 10,
      title:
        " JavaScript Mastery From Basics to Advanced 2025",
      issuer: "Udemy",
      issuerLogo: GraduationCap,
      category: "Programming",
      issueDate: "2026-01-16",
      expiryDate: null,
      credentialId: null,
      credentialUrl:
        "https://www.udemy.com/certificate/UC-d04cf232-b0c2-455c-91a2-264c5b99f9fc/",
      certificateImage: "/certificates-images/10.png",
      description:
        "JavaScript Mastery From Basics to Advanced 2025 course covering the basics of JavaScript and how to use it in real-world applications.",
      skills: [
        "JavaScript Mastery",
        "JavaScript Basics",
        "JavaScript Advanced",
        "JavaScript Projects",
        "JavaScript Real-World Examples",
        "JavaScript Hands-On Projects",
        "JavaScript Types",
        "JavaScript Functions",
        "JavaScript Objects",
        "JavaScript Arrays",
        "JavaScript Loops",
        "JavaScript Conditionals",
        "JavaScript Error Handling",
        "JavaScript Debugging",
        "JavaScript Performance Optimization",
      ],
      featured: true,
      color: "bg-blue-600",
      delay: 1.1,
      verificationUrl:
        "https://www.udemy.com/certificate/UC-d04cf232-b0c2-455c-91a2-264c5b99f9fc/",
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
    icon: Trophy,
    title: "No certificates found",
    message: "Try selecting a different category or check back later!",
  },

  // Issuer Configuration
  issuers: {
    kodekloud: {
      name: "KodeKloud",
      logo: Rocket,
      color: "bg-blue-500",
      verificationBase: "https://certificates.kodekloud.com/",
    },
    udemy: {
      name: "Udemy",
      logo: GraduationCap,
      color: "bg-purple-500",
      verificationBase: "https://udemy.com/verify/",
    },
    greatlearning: {
      name: "Great Learning",
      logo: BookOpen,
      color: "bg-purple-500",
      verificationBase: "https://www.linkedin.com/learning/",
    },
    coursera: {
      name: "Coursera",
      logo: GraduationCap,
      color: "bg-blue-500",
      verificationBase: "https://coursera.org/verify/",
    },
    aws: {
      name: "Amazon Web Services",
      logo: Cloud,
      color: "bg-orange-500",
      verificationBase: "https://aws.amazon.com/verification",
    },
    pluralsight: {
      name: "Pluralsight",
      logo: Award,
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
