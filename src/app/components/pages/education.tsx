import React from "react";
import Flower from "@/app/components/backgrounds/flower/Flower";

export default function Education() {
  return (
    <section
      className="w-full h-full flex flex-col items-center justify-center text-center relative overflow-hidden"
      style={{ minHeight: "60vh" }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <Flower />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 className="text-4xl font-bold mb-4">Education</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Describe your educational background here.
        </p>
      </div>
    </section>
  );
}
