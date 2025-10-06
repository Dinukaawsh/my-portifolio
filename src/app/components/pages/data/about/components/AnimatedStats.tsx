"use client";
import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, TrendingUp, Heart, Target } from "lucide-react";
import { getDynamicStats } from "@/app/components/content/about";

export default function AnimatedStats() {
  const [ref, inView] = useInView({ triggerOnce: true });

  const stats = getDynamicStats().map((stat) => ({
    ...stat,
    icon:
      stat.icon === "TrendingUp"
        ? TrendingUp
        : stat.icon === "Target"
        ? Target
        : stat.icon === "Code2"
        ? Code2
        : stat.icon === "Heart"
        ? Heart
        : TrendingUp,
  }));

  return (
    <motion.div
      ref={ref}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, staggerChildren: 0.1 }}
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          className="bg-gradient-to-br from-gray-900/60 via-gray-800/40 to-gray-900/60 backdrop-blur-xl rounded-xl p-4 border border-gray-600/30 text-center"
          whileHover={{
            scale: 1.05,
            y: -5,
            boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <motion.div
            className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-full flex items-center justify-center mx-auto mb-3`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <stat.icon className="w-6 h-6 text-white" />
          </motion.div>
          <motion.div
            className="text-2xl font-bold text-white mb-1"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: index * 0.1 + 0.3,
              type: "spring",
            }}
          >
            {stat.value}+
          </motion.div>
          <div className="text-xs text-gray-400">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}
