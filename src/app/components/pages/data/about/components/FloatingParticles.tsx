"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { seededRange } from "@/lib/seeded-random";

const PARTICLE_COUNT = 20;

export default function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const base = i * 7;
        return {
          id: i,
          x: seededRange(base + 1, 0, 100),
          y: seededRange(base + 2, 0, 100),
          size: seededRange(base + 3, 2, 6),
          duration: seededRange(base + 4, 10, 30),
          delay: seededRange(base + 5, 0, 5),
          driftX: seededRange(base + 6, -50, 50),
        };
      }),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, -200, -300],
            x: [0, particle.driftX, 0],
            opacity: [0, 1, 0.8, 0],
            scale: [0, 1, 1.2, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
