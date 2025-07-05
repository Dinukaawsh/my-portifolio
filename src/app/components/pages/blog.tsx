import React from "react";
import Horse from "../backgrounds/horse/Horse";

export default function Blog() {
  return (
    <section className="w-full h-full flex flex-col items-center justify-center text-center relative">
      <div style={{ position: "absolute", top: 0, left: 0, zIndex: 0 }}>
        <Horse />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <h2 className="text-4xl font-bold mb-4">Blog</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Write your blog posts or link to your blog here.
        </p>
      </div>
    </section>
  );
}
