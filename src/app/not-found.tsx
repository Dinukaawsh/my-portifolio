"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SkillsBackground from "./components/backgrounds/skills/SkillsBackground";

export default function NotFound() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <SkillsBackground />
      </div>

      {/* Overlay gradient for readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />

      {/* Content */}
      <div className="relative z-20 mx-auto flex min-h-[100dvh] max-w-4xl flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.h1
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="text-7xl font-extrabold tracking-tight text-white md:text-8xl"
            style={{
              textShadow:
                "0 0 10px rgba(99,102,241,0.95), 0 0 20px rgba(99,102,241,0.8), 0 0 35px rgba(56,189,248,0.6)",
            }}
          >
            404
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="mt-3 text-balance text-lg leading-relaxed text-white/85 md:text-xl"
          >
            The page you&apos;re looking for isn&apos;t in my stack. Let&apos;s
            get you back.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-6 py-3 text-white backdrop-blur-md transition hover:bg-white/20"
          >
            <span>Go Home</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
            >
              <path d="M13.5 4.5a.75.75 0 0 1 .75-.75h6a.75.75 0 0 1 .75.75v6a.75.75 0 0 1-1.5 0V6.31l-8.72 8.72a.75.75 0 1 1-1.06-1.06l8.72-8.72h-4.19a.75.75 0 0 1-.75-.75Z" />
              <path d="M6 5.25A3.75 3.75 0 0 0 2.25 9v8.25A3.75 3.75 0 0 0 6 21h8.25A3.75 3.75 0 0 0 18 17.25V13.5a.75.75 0 0 0-1.5 0v3.75A2.25 2.25 0 0 1 14.25 19.5H6A2.25 2.25 0 0 1 3.75 17.25V9A2.25 2.25 0 0 1 6 6.75h3.75a.75.75 0 0 0 0-1.5H6Z" />
            </svg>
          </Link>
        </motion.div>

        {/* Decorative vignette for subtle focus */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
        </div>
      </div>
    </div>
  );
}
