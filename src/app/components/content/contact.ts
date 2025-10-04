// Contact Page Content Configuration
// Edit this file to update your contact information, form settings, and other content

import { Star } from "lucide-react";

export const contactContent = {
  // Page Header Information
  header: {
    title: "Get In Touch",
    subtitle:
      "Let's connect and discuss opportunities, collaborations, or just have a chat!",
    indicators: ["Connect", "Collaborate", "Create"],
  },

  // Contact Information
  contactInfo: {
    email: "dinukaaw.sh@gmail.com",
    emailDisplay: "Hire me",
    location: "Colombo, Sri Lanka",
    availability: "Available for new opportunities",
  },

  // Form Configuration
  form: {
    title: "Contact Me",
    description:
      "Feel free to reach out for collaborations, opportunities, or just to say hi!",
    fields: {
      name: {
        placeholder: "Your Name",
        required: true,
        type: "text",
      },
      email: {
        placeholder: "Your Email",
        required: true,
        type: "email",
      },
      message: {
        placeholder: "Your Message/Comment",
        required: true,
        type: "textarea",
        rows: 4,
      },
    },
    submitButton: {
      text: "Add Comment",
      loadingText: "Adding Comment...",
    },
    successMessage: {
      title: "✨ Thank you for your feedback!",
      description: "Your comment has been added to the comments section below.",
      actionButton: "Add Another Comment",
    },
  },

  // Direct Email Section
  directEmail: {
    title: "Direct Email Contact",
    description: "Prefer to email directly? Feel free to reach out at:",
    buttonText: "dinukaaw.sh@gmail.com",
  },

  // Comments Section
  comments: {
    title: "Community Comments",
    subtitle: "See what others are saying about my work",
    emptyState: {
      icon: Star,
      message: "Be the first to leave a comment!",
    },
  },

  // Animation Settings
  animation: {
    rotationInterval: 3000, // Contact steps rotation interval in milliseconds
    floatingParticles: 5, // Number of floating particles
    particleDuration: 20, // Base duration for particle animations
    particleDelay: 2, // Base delay between particles
    transitionDuration: 300, // Transition duration for form elements
  },

  // Floating Particles Configuration
  particles: {
    count: 5,
    baseLeft: 20,
    leftSpacing: 15,
    baseTop: 30,
    topSpacing: 10,
    baseDuration: 20,
    durationVariation: 2,
    baseDelay: 2,
  },

  // Call to Action
  callToAction: {
    title: "Ready to Start a Project?",
    description:
      "Let's discuss how we can work together to bring your ideas to life!",
    primaryAction: "Send Message",
    secondaryAction: "Schedule a Call",
  },
};

// Helper functions
export const getContactSteps = () => {
  return contactContent.header.indicators;
};

export const getFormFields = () => {
  return Object.values(contactContent.form.fields);
};

export const getParticleConfig = (index: number) => {
  const { particles } = contactContent;
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
  contactInfo,
  form,
  directEmail,
  comments,
  animation,
  particles,
  callToAction,
} = contactContent;
