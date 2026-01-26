import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

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
  onContactMeClick: () => void;
  whatsappNumber?: string;
}

export default function HireMeSection({
  contactContent,
  GOOGLE_FORM_URL,
  showHireOptions,
  setShowHireOptions,
  onContactMeClick,
  whatsappNumber,
}: HireMeSectionProps) {
  // WhatsApp number comes from environment variable via parent component
  // Parent reads from NEXT_PUBLIC_WHATSAPP_NUMBER and passes as prop
  // Fallback only used if env var is not set
  const whatsappNum = whatsappNumber || "";
  const whatsappUrl = `https://wa.me/${whatsappNum}`;

  return (
    <div className="mb-8 text-center">
      <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30">
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
          {contactContent.directEmail.title}
        </h3>
        <p className="text-gray-300 text-sm sm:text-base mb-4">
          {contactContent.directEmail.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
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

          <motion.button
            type="button"
            onClick={onContactMeClick}
            className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-sm sm:text-lg rounded-xl sm:rounded-2xl border-2 border-green-400/50 hover:from-green-600 hover:to-emerald-700 hover:border-green-300 transition-all duration-300 shadow-2xl shadow-green-500/30 hover:shadow-3xl hover:shadow-green-500/50 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400/50 focus:scale-105 active:scale-95 w-full sm:w-auto justify-center"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 25px 50px rgba(16, 185, 129, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
            <span>Contact Me</span>
          </motion.button>
        </div>

        {/* WhatsApp Button */}
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold rounded-xl border-2 border-[#25D366]/50 hover:from-[#25D366]/90 hover:to-[#128C7E]/90 transition-all duration-300 shadow-lg shadow-[#25D366]/30 hover:shadow-xl hover:shadow-[#25D366]/50 hover:scale-105 mb-4"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(37, 211, 102, 0.4)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </motion.svg>
          <span className="text-base sm:text-lg">Let&apos;s Talk</span>
          <motion.div
            className="w-2 h-2 bg-white/80 rounded-full"
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.2, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.a>

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
              onClick={async () => {
                // Track Google Form link click (fallback notification)
                try {
                  await fetch("/api/google-form", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      formData: { action: "form_opened" },
                      submittedBy: "User clicked Google Form link",
                      timestamp: new Date().toLocaleString(),
                      formUrl: GOOGLE_FORM_URL, // Include form URL in notification
                    }),
                  });
                } catch {
                  // Silently fail - this is just a tracking notification
                  console.log("Could not send Google Form click notification");
                }
              }}
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
  );
}
