"use client";
import React, { useEffect, useRef, useState } from "react";

export default function PerformanceMonitor() {
  const [fps, setFps] = useState(0);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());

  useEffect(() => {
    const measureFPS = () => {
      frameCount.current++;
      const currentTime = performance.now();
      if (currentTime - lastTime.current >= 1000) {
        setFps(
          Math.round(
            (frameCount.current * 1000) / (currentTime - lastTime.current)
          )
        );
        frameCount.current = 0;
        lastTime.current = currentTime;
      }
      requestAnimationFrame(measureFPS);
    };
    requestAnimationFrame(measureFPS);
  }, []);

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed top-24 right-4 z-50 bg-black/80 text-white px-2 py-1 rounded text-xs font-mono">
      FPS: {fps}
    </div>
  );
}
