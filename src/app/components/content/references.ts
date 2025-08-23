// References Page Content Configuration
// Edit this file to update your references, testimonials, and recommendations

export const referencesContent = {
  // Page Header Information
  header: {
    title: "References & Testimonials",
    subtitle:
      "Professional recommendations and feedback from colleagues, mentors, and clients",
    indicators: ["Trust", "Collaboration", "Excellence"],
  },

  // Reference Categories
  categories: [
    "All",
    "Professional",
    "Academic",
    "Client",
    "Mentor",
    "Colleague",
  ],

  // References Data
  references: [
    {
      id: 1,
      name: "Sarah Johnson",
      title: "Senior Software Engineer",
      company: "Twist Digital",
      companyLogo: "🏢",
      category: "Professional",
      relationship: "Direct Supervisor",
      email: "sarah.johnson@twistdigital.com",
      phone: "+1 (555) 123-4567",
      linkedin: "https://linkedin.com/in/sarahjohnson",
      avatar: "/avatars/sarah-johnson.jpg",
      testimonial:
        "Dinuka is an exceptional developer who consistently delivers high-quality work. His problem-solving skills and attention to detail are outstanding. He quickly adapted to our development processes and became a valuable team member. I highly recommend him for any development role.",
      strengths: [
        "Problem Solving",
        "Code Quality",
        "Team Collaboration",
        "Learning Ability",
        "Communication",
      ],
      rating: 5,
      featured: true,
      color: "bg-blue-500",
      delay: 0.7,
      contactPermission: true,
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      title: "Associate Professor",
      company: "ESOFT Metro Campus",
      companyLogo: "🎓",
      category: "Academic",
      relationship: "Academic Advisor",
      email: "michael.chen@esoft.edu",
      phone: "+94 11 234-5678",
      linkedin: "https://linkedin.com/in/michaelchen",
      avatar: "/avatars/michael-chen.jpg",
      testimonial:
        "As Dinuka's academic advisor, I've been impressed by his dedication to learning and his innovative approach to problem-solving. His final year project demonstrated exceptional technical skills and creativity. He consistently showed strong analytical thinking and excellent communication skills.",
      strengths: [
        "Academic Excellence",
        "Innovation",
        "Analytical Thinking",
        "Communication",
        "Project Management",
      ],
      rating: 5,
      featured: true,
      color: "bg-green-500",
      delay: 0.8,
      contactPermission: true,
      lastUpdated: "2024-01-10",
    },
    {
      id: 3,
      name: "Alex Rodriguez",
      title: "Project Manager",
      company: "TechStart Solutions",
      companyLogo: "🚀",
      category: "Client",
      relationship: "Client",
      email: "alex.rodriguez@techstart.com",
      phone: "+1 (555) 987-6543",
      linkedin: "https://linkedin.com/in/alexrodriguez",
      avatar: "/avatars/alex-rodriguez.jpg",
      testimonial:
        "Working with Dinuka was a pleasure. He delivered our e-commerce platform on time and exceeded our expectations. His technical expertise and ability to understand business requirements made the development process smooth and efficient. The final product was exactly what we envisioned.",
      strengths: [
        "Technical Expertise",
        "Business Understanding",
        "Project Delivery",
        "Communication",
        "Quality Assurance",
      ],
      rating: 5,
      featured: false,
      color: "bg-purple-500",
      delay: 0.9,
      contactPermission: true,
      lastUpdated: "2023-12-20",
    },
    {
      id: 4,
      name: "Emily Watson",
      title: "Frontend Developer",
      company: "Twist Digital",
      companyLogo: "🏢",
      category: "Colleague",
      relationship: "Team Member",
      email: "emily.watson@twistdigital.com",
      phone: "+1 (555) 456-7890",
      linkedin: "https://linkedin.com/in/emilywatson",
      avatar: "/avatars/emily-watson.jpg",
      testimonial:
        "Dinuka is a great team player and an excellent developer. He's always willing to help others and share his knowledge. His code is clean, well-documented, and follows best practices. He's been instrumental in improving our development workflow.",
      strengths: [
        "Team Collaboration",
        "Knowledge Sharing",
        "Code Quality",
        "Documentation",
        "Workflow Improvement",
      ],
      rating: 5,
      featured: false,
      color: "bg-indigo-500",
      delay: 1.0,
      contactPermission: true,
      lastUpdated: "2023-12-15",
    },
    {
      id: 5,
      name: "David Kim",
      title: "Senior Developer",
      company: "CodeMentor",
      companyLogo: "👨‍💻",
      category: "Mentor",
      relationship: "Mentor",
      email: "david.kim@codementor.com",
      phone: "+1 (555) 321-0987",
      linkedin: "https://linkedin.com/in/davidkim",
      avatar: "/avatars/david-kim.jpg",
      testimonial:
        "I've been mentoring Dinuka for over a year, and his growth has been remarkable. He's a fast learner with a strong foundation in programming fundamentals. His passion for technology and willingness to take on challenging projects sets him apart. He has a bright future in software development.",
      strengths: [
        "Learning Ability",
        "Programming Fundamentals",
        "Passion for Technology",
        "Problem Solving",
        "Growth Mindset",
      ],
      rating: 5,
      featured: false,
      color: "bg-orange-500",
      delay: 1.1,
      contactPermission: true,
      lastUpdated: "2023-12-10",
    },
    {
      id: 6,
      name: "Lisa Thompson",
      title: "UX Designer",
      company: "DesignHub",
      companyLogo: "🎨",
      category: "Client",
      relationship: "Collaborator",
      email: "lisa.thompson@designhub.com",
      phone: "+1 (555) 654-3210",
      linkedin: "https://linkedin.com/in/lisathompson",
      avatar: "/avatars/lisa-thompson.jpg",
      testimonial:
        "Collaborating with Dinuka on our portfolio website project was excellent. He understood the design requirements perfectly and implemented them flawlessly. His attention to detail and ability to translate design concepts into functional code is impressive. The project was completed ahead of schedule.",
      strengths: [
        "Design Understanding",
        "Implementation Skills",
        "Attention to Detail",
        "Project Management",
        "Timeline Adherence",
      ],
      rating: 5,
      featured: false,
      color: "bg-pink-500",
      delay: 1.2,
      contactPermission: true,
      lastUpdated: "2023-11-30",
    },
  ],

  // Animation Settings
  animation: {
    rotationInterval: 5000, // Reference rotation effect interval in milliseconds
    floatingParticles: 8, // Number of floating particles
    particleDuration: 22, // Base duration for particle animations
    particleDelay: 2.0, // Base delay between particles
    transitionDuration: 300, // Transition duration for reference cards
    staggerDelay: 150, // Delay between staggered animations
  },

  // Floating Particles Configuration
  particles: {
    count: 8,
    baseLeft: 10,
    leftSpacing: 12,
    baseTop: 20,
    topSpacing: 10,
    baseDuration: 22,
    durationVariation: 3,
    baseDelay: 2.0,
  },

  // Reference Card Configuration
  cardConfig: {
    hoverScale: 1.02,
    hoverY: -4,
    transitionDuration: 300,
    featuredGlow: true,
    showRating: true,
    showStrengths: true,
  },

  // Empty State Configuration
  emptyState: {
    icon: "💬",
    title: "No references found",
    message: "Try selecting a different category or check back later!",
  },

  // Reference Types Configuration
  referenceTypes: {
    professional: {
      label: "Professional",
      color: "bg-blue-500/20 text-blue-300 border-blue-500/30",
      icon: "🏢",
    },
    academic: {
      label: "Academic",
      color: "bg-green-500/20 text-green-300 border-green-500/30",
      icon: "🎓",
    },
    client: {
      label: "Client",
      color: "bg-purple-500/20 text-purple-300 border-purple-500/30",
      icon: "🤝",
    },
    mentor: {
      label: "Mentor",
      color: "bg-orange-500/20 text-orange-300 border-orange-500/30",
      icon: "👨‍💻",
    },
    colleague: {
      label: "Colleague",
      color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
      icon: "👥",
    },
  },

  // Contact Information Display
  contactDisplay: {
    showEmail: true,
    showPhone: true,
    showLinkedIn: true,
    requirePermission: true,
  },
};

// Helper functions
export const getReferenceById = (id: number) => {
  return referencesContent.references.find((ref) => ref.id === id);
};

export const getReferencesByCategory = (category: string) => {
  if (category === "All") return referencesContent.references;
  return referencesContent.references.filter(
    (ref) => ref.category === category
  );
};

export const getFeaturedReferences = () => {
  return referencesContent.references.filter((ref) => ref.featured);
};

export const getReferencesByCompany = (company: string) => {
  return referencesContent.references.filter((ref) => ref.company === company);
};

export const getReferencesByRating = (minRating: number) => {
  return referencesContent.references.filter((ref) => ref.rating >= minRating);
};

export const getReferencesByStrength = (strength: string) => {
  return referencesContent.references.filter((ref) =>
    ref.strengths.some((s) => s.toLowerCase().includes(strength.toLowerCase()))
  );
};

export const getParticleConfig = (index: number) => {
  const { particles } = referencesContent;
  return {
    left: `${particles.baseLeft + index * particles.leftSpacing}%`,
    top: `${particles.baseTop + index * particles.topSpacing}%`,
    duration: particles.baseDuration + index * particles.durationVariation,
    delay: index * particles.baseDelay,
  };
};

export const getAllStrengths = () => {
  const allStrengths = new Set<string>();
  referencesContent.references.forEach((ref) => {
    ref.strengths.forEach((strength) => allStrengths.add(strength));
  });
  return Array.from(allStrengths);
};

export const getAllCompanies = () => {
  const allCompanies = new Set<string>();
  referencesContent.references.forEach((ref) => {
    allCompanies.add(ref.company);
  });
  return Array.from(allCompanies);
};

export const getAverageRating = () => {
  const totalRating = referencesContent.references.reduce(
    (sum, ref) => sum + ref.rating,
    0
  );
  return totalRating / referencesContent.references.length;
};

export const getContactableReferences = () => {
  return referencesContent.references.filter((ref) => ref.contactPermission);
};

// Export individual sections for easier access
export const {
  header,
  categories,
  references,
  animation,
  particles,
  cardConfig,
  emptyState,
  referenceTypes,
  contactDisplay,
} = referencesContent;
