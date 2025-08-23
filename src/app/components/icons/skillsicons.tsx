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
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

interface CustomIconProps {
  iconName: string;
  className?: string;
  size?: number;
}

const CustomIcon: React.FC<CustomIconProps> = ({
  iconName,
  className = "",
  size = 24,
}) => {
  const iconMap: Record<
    string,
    React.ComponentType<{ className?: string; size?: number }>
  > = {
    // Programming Languages
    "custom:js": SiJavascript,
    "custom:ts": SiTypescript,
    "custom:python": SiPython,
    "custom:php": SiPhp,

    // Frontend Frameworks
    "custom:react": SiReact,
    "custom:nextjs": SiNextdotjs,
    "custom:vue": SiVuedotjs,
    "custom:tailwind": SiTailwindcss,
    "custom:bootstrap": SiBootstrap,

    // Backend Frameworks
    "custom:nodejs": SiNodedotjs,
    "custom:laravel": SiLaravel,
    "custom:django": SiDjango,
    "custom:express": SiExpress,
    "custom:nestjs": SiNestjs,
    // Databases
    "custom:mongodb": SiMongodb,
    "custom:mysql": SiMysql,
    "custom:firebase": SiFirebase,
    // Cloud Services
    "custom:aws": SiAmazon,
    "custom:vercel": SiVercel,
    "custom:railway": SiRailway,

    // Development Tools
    "custom:postman": SiPostman,
    "custom:figma": SiFigma,
    "custom:vscode": VscVscode,
    "custom:git": SiGit,
    "custom:docker": SiDocker,
  };

  const IconComponent = iconMap[iconName];

  if (!IconComponent) {
    // Fallback to a default icon if the custom icon is not found
    return <div className={`w-6 h-6 bg-gray-400 rounded ${className}`} />;
  }

  return <IconComponent className={className} size={size} />;
};

export default CustomIcon;
