import React from "react";
import { motion } from "framer-motion";

interface ContactContentHire {
  directEmail: {
    title: string;
    description: string;
  };
  contactInfo: {
    email: string;
  };
}

interface HireMeSectionProps {
  contactContent: ContactContentHire;
  GOOGLE_FORM_URL?: string;
  showHireOptions: boolean;
  setShowHireOptions: (next: (v: boolean) => boolean) => void;
}

export default function HireMeSection({
  contactContent,
  GOOGLE_FORM_URL,
  showHireOptions,
  setShowHireOptions,
}: HireMeSectionProps) {
  return (
    <div className="mb-8 text-center">
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
          {contactContent.directEmail.title}
        </h3>
        <p className="text-gray-300 text-sm sm:text-base mb-4">
          {contactContent.directEmail.description}
        </p>
        <div className="space-y-3">
          <motion.button
            type="button"
            onClick={() => setShowHireOptions((v) => !v)}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold text-sm sm:text-lg rounded-xl sm:rounded-2xl border-2 border-blue-400/50 hover:from-blue-600 hover:to-purple-700 hover:border-blue-300 transition-all duration-300 shadow-2xl shadow-blue-500/30 hover:shadow-3xl hover:shadow-blue-500/50 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400/50 focus:scale-105 active:scale-95 w-full sm:w-auto justify-center"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            whileFocus={{
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
            }}
          >
            <motion.div
              className="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center"
              animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </motion.div>
            <span>Hire Me</span>
            <motion.div
              className="w-2 h-2 bg-white/60 rounded-full"
              animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.button>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: showHireOptions ? 1 : 0,
              height: showHireOptions ? "auto" : 0,
            }}
            transition={{ duration: 0.25 }}
            className={`overflow-hidden ${showHireOptions ? "mt-2" : ""}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <motion.a
                href={`mailto:${contactContent.contactInfo.email}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-white font-semibold rounded-xl border border-blue-400/40 hover:bg-white/15 transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>Email</span>
              </motion.a>

              <motion.a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white/10 text-white font-semibold rounded-xl border border-blue-400/40 hover:bg-white/15 transition"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M19 2H10a2 2 0 00-2 2v2h2V4h9v16h-9v-2H8v2a2 2 0 002 2h9a2 2 0 002-2V4a2 2 0 00-2-2z"
                  />
                  <path fill="currentColor" d="M13 12l-4-4v3H3v2h6v3l4-4z" />
                </svg>
                <span>Google Form</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
