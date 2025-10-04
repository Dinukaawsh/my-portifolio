"use client";
import React, { useEffect, useState } from "react";
import CustomIcon from "../../icons/skillsicons";
import { skillsContent } from "../../content/skills";

interface FloatingIcon {
  id: number;
  x: number;
  y: number;
  rotation: number;
  rotationSpeed: number;
  floatSpeed: number;
  floatDirection: number;
  icon: string;
  color: string;
  size: number;
  opacity: number;
  baseX: number;
  baseY: number;
}

export default function SkillsBackground() {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    // Collect all skills icons from the skills content
    const allSkills: Array<{ icon: string; color: string }> = [];
    Object.values(skillsContent.skills).forEach((category) => {
      if (Array.isArray(category)) {
        category.forEach((skill) => {
          if (skill.icon) {
            // Check if skill has color property (technical skills) or use default color (soft skills)
            const color =
              "color" in skill && typeof skill.color === "string"
                ? skill.color
                : "#6B7280"; // Default gray for soft skills
            allSkills.push({ icon: skill.icon, color });
          }
        });
      }
    });

    // Create initial icons
    const ICONS_AMOUNT = 40;
    const initialIcons: FloatingIcon[] = [];

    for (let i = 0; i < ICONS_AMOUNT; i++) {
      const randomSkill =
        allSkills[Math.floor(Math.random() * allSkills.length)];
      initialIcons.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.01,
        floatSpeed: Math.random() * 0.3 + 0.1,
        floatDirection: Math.random() * Math.PI * 2,
        icon: randomSkill.icon,
        color: randomSkill.color,
        size: 40 + Math.random() * 20,
        opacity: 0.4 + Math.random() * 0.4,
        baseX: Math.random() * 100,
        baseY: Math.random() * 100,
      });
    }

    setIcons(initialIcons);

    // Animation loop
    let animationId: number;
    const startTime = Date.now();

    function animate() {
      const elapsed = Date.now() - startTime;

      setIcons((prevIcons) =>
        prevIcons.map((icon) => ({
          ...icon,
          rotation: icon.rotation + icon.rotationSpeed,
          x:
            icon.baseX +
            Math.sin(elapsed * icon.floatSpeed * 0.001 + icon.floatDirection) *
              5,
          y:
            icon.baseY +
            Math.cos(elapsed * icon.floatSpeed * 0.001 + icon.floatDirection) *
              3,
        }))
      );

      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isClient]);

  if (!isClient) {
    return (
      <div
        className="fixed inset-0 w-full h-full pointer-events-none z-0"
        style={{ backgroundColor: "#000000" }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ backgroundColor: "#000000" }}
    >
      {/* Floating Skills Icons */}
      <div className="absolute inset-0 overflow-hidden">
        {icons.map((icon) => (
          <div
            key={icon.id}
            className="absolute pointer-events-none transition-all duration-1000 ease-out"
            style={{
              left: `${icon.x}%`,
              top: `${icon.y}%`,
              transform: `translate(-50%, -50%) rotate(${icon.rotation}rad)`,
              opacity: icon.opacity,
            }}
          >
            <div
              className="relative"
              style={{
                width: `${icon.size}px`,
                height: `${icon.size}px`,
              }}
            >
              {/* Neon glow effect */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle, ${icon.color}20 0%, transparent 70%)`,
                  filter: `blur(8px)`,
                  opacity: 0.8,
                }}
              />

              {/* Neon border */}
              <div
                className="absolute inset-0 rounded-full border-2"
                style={{
                  borderColor: icon.color,
                  boxShadow: `
                    0 0 10px ${icon.color}80,
                    0 0 20px ${icon.color}60,
                    0 0 30px ${icon.color}40,
                    inset 0 0 10px ${icon.color}20
                  `,
                }}
              />

              {/* Icon */}
              <div className="relative z-10 flex items-center justify-center w-full h-full">
                <div
                  style={{
                    color: icon.color,
                    filter: `drop-shadow(0 0 8px ${icon.color}80)`,
                  }}
                >
                  <CustomIcon
                    iconName={icon.icon}
                    size={icon.size * 0.7}
                    className="drop-shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subtle gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.2) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
        }}
      />
    </div>
  );
}
