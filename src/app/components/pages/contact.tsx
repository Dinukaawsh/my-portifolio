import React, { useState } from "react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="w-full h-full relative flex items-center justify-center overflow-hidden px-2 sm:px-4 bg-black">
      {/* Animated Gradient Background */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 animate-gradient bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 opacity-60 blur-2xl"
        style={{ backgroundSize: "200% 200%" }}
      />
      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto p-4 sm:p-8 rounded-3xl shadow-2xl border border-white/20 bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg flex flex-col items-center text-center transition-all duration-700">
        <h2 className="text-2xl sm:text-4xl font-extrabold mb-1 tracking-tight text-gray-900 dark:text-white">
          Contact
        </h2>
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 mb-6">
          Feel free to reach out for collaborations, opportunities, or just to
          say hi!
        </p>
        {submitted ? (
          <div className="text-green-600 font-semibold text-lg py-8">
            Thank you for reaching out!
          </div>
        ) : (
          <form
            className="w-full max-w-md flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              className="rounded-lg px-4 py-2 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Your Email"
              className="rounded-lg px-4 py-2 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white"
            />
            <textarea
              name="message"
              required
              placeholder="Your Message"
              rows={4}
              className="rounded-lg px-4 py-2 bg-white/80 dark:bg-gray-800/80 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900 dark:text-white"
            />
            <button
              type="submit"
              className="mt-2 px-6 py-2 rounded-full bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
      <style>{`
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientMove 8s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
