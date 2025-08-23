import React from "react";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiPhp,
  SiReact,
  SiNextdotjs,
  SiVuedotjs,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiLaravel,
  SiDjango,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiAmazon,
  SiVercel,
  SiRailway,
  SiPostman,
  SiFigma,
  SiGit,
  SiDocker,
  SiNestjs,
  SiFirebase,
  SiHtml5,
  SiCss3,
  SiJquery,
  SiPhpmyadmin,
  SiXampp,
  SiGoogle,
  SiXml,
  SiFramer,
  SiStripe,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

interface ProjectIconProps {
  technologyName: string;
  className?: string;
  size?: number;
}

const ProjectIcon: React.FC<ProjectIconProps> = ({
  technologyName,
  className = "",
  size = 24,
}) => {
  // Create a mapping of technology names to their icons
  // This handles variations in naming and provides fallbacks
  const getIconForTechnology = (techName: string) => {
    const normalizedName = techName.toLowerCase().trim();

    const iconMap: Record<
      string,
      React.ComponentType<{ className?: string; size?: number }>
    > = {
      // Programming Languages
      javascript: SiJavascript,
      js: SiJavascript,
      typescript: SiTypescript,
      ts: SiTypescript,
      python: SiPython,
      php: SiPhp,

      // Frontend Frameworks
      react: SiReact,
      "next.js": SiNextdotjs,
      nextjs: SiNextdotjs,
      vue: SiVuedotjs,
      "vue.js": SiVuedotjs,
      "tailwind css": SiTailwindcss,
      tailwindcss: SiTailwindcss,
      bootstrap: SiBootstrap,

      // Backend Frameworks
      "node.js": SiNodedotjs,
      nodejs: SiNodedotjs,
      laravel: SiLaravel,
      django: SiDjango,
      express: SiExpress,
      "express.js": SiExpress,
      nestjs: SiNestjs,

      // Databases
      mongodb: SiMongodb,
      mysql: SiMysql,
      sqlite: SiMysql,
      firebase: SiFirebase,

      // Cloud Services
      aws: SiAmazon,
      vercel: SiVercel,
      railway: SiRailway,

      // Development Tools
      postman: SiPostman,
      figma: SiFigma,
      "vs code": VscVscode,
      vscode: VscVscode,
      git: SiGit,
      docker: SiDocker,

      // Web Technologies
      html: SiHtml5,
      html5: SiHtml5,
      css: SiCss3,
      css3: SiCss3,
      jquery: SiJquery,
      phpmyadmin: SiPhpmyadmin,
      xampp: SiXampp,

      // APIs and Services
      "google translate api": SiGoogle,
      "deepl api": SiGoogle,
      stripe: SiStripe,

      // Other
      xml: SiXml,
      "framer motion": SiFramer,
      framer: SiFramer,

      // Additional technologies found in projects
      "django admin": SiDjango,
      "django rest framework": SiDjango,
      "django jasmin": SiDjango,
      ajax: SiJquery, // Use jQuery icon as fallback for Ajax
    };

    // Try exact match first
    if (iconMap[normalizedName]) {
      return iconMap[normalizedName];
    }

    // Try partial matches
    for (const [key, icon] of Object.entries(iconMap)) {
      if (normalizedName.includes(key) || key.includes(normalizedName)) {
        return icon;
      }
    }

    // Fallback to a default icon
    return SiJavascript;
  };

  const IconComponent = getIconForTechnology(technologyName);

  return <IconComponent className={className} size={size} />;
};

export default ProjectIcon;
