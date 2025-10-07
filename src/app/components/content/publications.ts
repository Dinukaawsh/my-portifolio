// Publications Page Content Configuration
// Edit this file to update your publications, platforms, and other UI text

export const publicationsContent = {
  // Page Header Information
  header: {
    title: "Publications",
    subtitle:
      "Selected academic papers, preprints, and technical articles across venues like IEEE, ACM, and arXiv.",
    indicators: ["Research", "Writing", "Impact"],
  },

  // Publications Data
  publications: [
    {
      id: 1,
      cover: "/blog-images/blog1.png", // optional image shown in card
      title:
        "REST vs GraphQL for Large-Scale Systems: A Performance and DX Study",
      authors: ["Dinuka A. Weerasinghe", "Jane Doe", "John Smith"],
      venue: "IEEE Software (Under Review)",
      year: 2025,
      platform: "IEEE",
      platformColor: "bg-blue-600",
      url: "https://example.com/paper/rest-vs-graphql",
      doi: undefined,
      tags: ["APIs", "Systems", "Benchmarking"],
      featured: true,
    },
    {
      id: 2,
      cover: "/blog-images/blog2.png",
      title: "TypeScript Adoption Patterns in Production-Grade Web Apps",
      authors: ["Dinuka A. Weerasinghe"],
      venue: "arXiv",
      year: 2025,
      platform: "arXiv",
      platformColor: "bg-gray-600",
      url: "https://arxiv.org/abs/0000.00000",
      doi: undefined,
      tags: ["TypeScript", "DX", "Case Study"],
      featured: true,
    },
    {
      id: 3,
      cover: "/blog-images/blog3.png",
      title: "Continuous Delivery Pipelines: Anti-Patterns and Remedies",
      authors: ["Dinuka A. Weerasinghe", "Jane Doe"],
      venue: "ACM Queue",
      year: 2024,
      platform: "ACM",
      platformColor: "bg-red-600",
      url: "https://queue.acm.org/detail.cfm?id=0000000",
      doi: undefined,
      tags: ["CI/CD", "DevOps"],
      featured: false,
    },
  ],

  // Platform Filter Options
  platforms: ["All", "IEEE", "ACM", "arXiv"],

  // Call to Action Section
  callToAction: {
    title: "📄 View my full list of publications",
    description:
      "Find preprints, code, and datasets linked from my research profiles.",
    buttonText: "Visit Google Scholar",
    buttonUrl: "https://scholar.google.com/",
    buttonIcon:
      "M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z",
  },

  // Animation Settings
  animation: {
    rotationInterval: 4500,
    floatingParticles: 5,
    particleDuration: 17,
    particleDelay: 1.5,
  },

  // Platform Configuration (icon paths can be reused)
  platformConfig: {
    ieee: {
      name: "IEEE",
      color: "bg-blue-600",
      icon: "M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z",
    },
    acm: {
      name: "ACM",
      color: "bg-red-600",
      icon: "M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z",
    },
    arxiv: {
      name: "arXiv",
      color: "bg-gray-600",
      icon: "M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z",
    },
  },
};

// Helper functions
export const getFeaturedPublications = () => {
  return publicationsContent.publications.filter((pub) => pub.featured);
};

export const getPublicationsByPlatform = (platform: string) => {
  if (platform === "All") return publicationsContent.publications;
  return publicationsContent.publications.filter(
    (pub) => pub.platform === platform
  );
};

export const getPublicationsByTag = (tag: string) => {
  return publicationsContent.publications.filter((pub) =>
    pub.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
  );
};

// Export individual sections for easier access
export const {
  header,
  publications,
  platforms,
  callToAction,
  animation,
  platformConfig,
} = publicationsContent;
