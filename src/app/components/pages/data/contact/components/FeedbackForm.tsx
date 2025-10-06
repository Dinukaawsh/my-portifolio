import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  User,
  Code,
  Palette,
  BarChart3,
  Users,
  Rocket,
  GraduationCap,
  Sparkles,
  ChevronDown,
  Check,
} from "lucide-react";

interface ThemeTextColors {
  textColor: string;
  placeholderColor: string;
  iconColor: string;
}

interface FeedbackData {
  role: string;
  customRole: string;
  message: string;
  rating: number;
}

interface FeedbackFormProps {
  themeTextColors: ThemeTextColors;
  feedbackData: FeedbackData;
  setFeedbackData: (next: FeedbackData) => void;
  feedbackLoading: boolean;
  feedbackSubmitted: boolean;
  setFeedbackSubmitted: (v: boolean) => void;
  onSubmit: (data: FeedbackData) => void;
  dropdownOpen: boolean;
  setDropdownOpen: (v: boolean) => void;
}

export default function FeedbackForm({
  themeTextColors,
  feedbackData,
  setFeedbackData,
  feedbackLoading,
  feedbackSubmitted,
  setFeedbackSubmitted,
  onSubmit,
  dropdownOpen,
  setDropdownOpen,
}: FeedbackFormProps) {
  const { data: session } = useSession();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    if (dropdownOpen)
      document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen, setDropdownOpen]);

  if (!session) {
    return (
      <div className="mb-8">
        <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20">
          <p className="text-white/90 text-sm sm:text-base font-medium text-center">
            🔐 Login required to submit feedback. Your profile picture and name
            will be displayed with your feedback.
          </p>
        </div>

        <div className="text-center py-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Login to Submit Feedback
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              Choose your preferred login method:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <motion.button
              onClick={() => signIn("google")}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-white text-gray-800 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </motion.button>

            <motion.button
              onClick={() => signIn("github")}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </motion.button>
            {/* <motion.button
              type="button"
              onClick={() => signIn("linkedin", { callbackUrl: "/contact" })}
              className="flex items-center justify-center gap-3 px-6 py-4 bg-[#0A66C2] text-white rounded-xl font-semibold hover:bg-[#004182] transition-all duration-200 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Sign in with LinkedIn"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.943v5.663H9.352V9h3.414v1.561h.049c.476-.9 1.64-1.852 3.377-1.852 3.612 0 4.279 2.377 4.279 5.469v6.274zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM3.56 20.452h3.557V9H3.56v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
              LinkedIn
            </motion.button> */}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="mb-6 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20">
        <div className="flex items-center gap-4">
          <Image
            src={session.user?.image || ""}
            alt={session.user?.name || "User"}
            width={48}
            height={48}
            className="w-12 h-12 rounded-full border-2 border-green-400"
          />
          <div>
            <h4 className="text-white font-semibold">{session.user?.name}</h4>
            <p className="text-gray-300 text-sm">{session.user?.email}</p>
            <button
              onClick={() => signOut()}
              className="text-green-400 text-xs hover:text-green-300 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      {feedbackSubmitted ? (
        <motion.div
          className="text-center py-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl border border-green-500/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div className="text-5xl mb-4">🎉</div>
          <div className="text-green-400 font-bold text-xl mb-3">
            Feedback Submitted!
          </div>
          <p className="text-gray-300 text-base mb-6">
            Thank you for your feedback! It will appear below.
          </p>
          <button
            onClick={() => setFeedbackSubmitted(false)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold border border-green-400/50 hover:from-green-600 hover:to-emerald-700 hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Submit Another
          </button>
        </motion.div>
      ) : (
        <form
          className="w-full space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(feedbackData);
          }}
        >
          <div className="relative group">
            <label
              className={`block ${themeTextColors.iconColor} text-sm font-medium mb-2`}
            >
              <span className="flex items-center gap-2">
                <User className={`w-4 h-4 ${themeTextColors.iconColor}`} />
                Your Role
              </span>
            </label>
            <div className="relative" ref={dropdownRef}>
              <motion.button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`w-full px-4 py-4 bg-white/10 border border-blue-500/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 group-hover:border-blue-400/60 group-hover:bg-white/15 flex items-center justify-between`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <span
                  className={
                    feedbackData.role
                      ? themeTextColors.textColor
                      : themeTextColors.placeholderColor
                  }
                >
                  {feedbackData.role
                    ? feedbackData.role.charAt(0).toUpperCase() +
                      feedbackData.role.slice(1).replace("-", " ")
                    : "Select your role"}
                </span>
                <motion.div
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown
                    className={`w-5 h-5 ${themeTextColors.iconColor}`}
                  />
                </motion.div>
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{
                  opacity: dropdownOpen ? 1 : 0,
                  y: dropdownOpen ? 0 : -10,
                  scale: dropdownOpen ? 1 : 0.95,
                }}
                transition={{ duration: 0.2 }}
                className={`absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-xl border border-blue-500/30 rounded-2xl shadow-2xl shadow-blue-500/20 z-50 overflow-hidden ${
                  dropdownOpen ? "pointer-events-auto" : "pointer-events-none"
                }`}
              >
                {[
                  { value: "developer", label: "Developer", icon: Code },
                  { value: "designer", label: "Designer", icon: Palette },
                  {
                    value: "product-manager",
                    label: "Product Manager",
                    icon: BarChart3,
                  },
                  { value: "recruiter", label: "Recruiter", icon: Users },
                  {
                    value: "entrepreneur",
                    label: "Entrepreneur",
                    icon: Rocket,
                  },
                  { value: "student", label: "Student", icon: GraduationCap },
                  { value: "other", label: "Other", icon: Sparkles },
                ].map((option) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setFeedbackData({
                        ...feedbackData,
                        role: option.value,
                        customRole:
                          option.value === "other"
                            ? feedbackData.customRole
                            : "",
                      });
                      setDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all duration-200 ${
                      feedbackData.role === option.value
                        ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-l-4 border-blue-400"
                        : "hover:bg-white/10"
                    } ${themeTextColors.textColor}`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-lg">
                      <option.icon
                        className={`w-5 h-5 ${themeTextColors.iconColor}`}
                      />
                    </span>
                    <span className="font-medium">{option.label}</span>
                    {feedbackData.role === option.value && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto"
                      >
                        <Check
                          className={`w-5 h-5 ${themeTextColors.iconColor}`}
                        />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </motion.div>
            </div>
          </div>

          {feedbackData.role === "other" && (
            <motion.div
              className="relative group"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <label
                className={`block ${themeTextColors.iconColor} text-sm font-medium mb-2`}
              >
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Specify Your Role
                </span>
              </label>
              <input
                type="text"
                name="customRole"
                required={feedbackData.role === "other"}
                placeholder="e.g., UX Designer, Data Scientist, Marketing Manager..."
                value={feedbackData.customRole}
                onChange={(e) =>
                  setFeedbackData({
                    ...feedbackData,
                    customRole: e.target.value,
                  })
                }
                className={`w-full px-4 py-4 bg-white/10 border border-blue-500/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 ${themeTextColors.textColor} ${themeTextColors.placeholderColor} transition-all duration-300 group-hover:border-blue-400/60 group-hover:bg-white/15`}
              />
            </motion.div>
          )}

          <div className="relative group">
            <label
              className={`block ${themeTextColors.iconColor} text-sm font-medium mb-2`}
            >
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                Rate My Portfolio
              </span>
            </label>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  onClick={() =>
                    setFeedbackData({ ...feedbackData, rating: star })
                  }
                  className="focus:outline-none"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className={`w-8 h-8 transition-colors duration-200 ${
                      star <= feedbackData.rating
                        ? "text-yellow-400"
                        : "text-gray-400 hover:text-yellow-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </motion.button>
              ))}
              {feedbackData.rating > 0 && (
                <motion.span
                  className="text-yellow-400 text-sm font-medium ml-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {feedbackData.rating}/5
                </motion.span>
              )}
            </div>
          </div>

          <div className="relative group">
            <label
              className={`block ${themeTextColors.iconColor} text-sm font-medium mb-2`}
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Your Feedback
              </span>
            </label>
            <textarea
              name="message"
              required
              placeholder="Share your detailed feedback about my portfolio..."
              rows={5}
              maxLength={500}
              value={feedbackData.message}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 500)
                  setFeedbackData({ ...feedbackData, message: value });
              }}
              className={`w-full px-4 py-4 bg-white/10 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400 transition-all duration-300 resize-none group-hover:bg-white/15 custom-scrollbar ${
                feedbackData.message.length >= 500
                  ? "border-red-500/60 focus:ring-red-400 focus:border-red-400"
                  : "border-blue-500/40 group-hover:border-blue-400/60"
              }`}
            />
            <div
              className={`absolute bottom-3 right-3 text-xs font-medium ${
                feedbackData.message.length >= 450
                  ? feedbackData.message.length >= 500
                    ? "text-red-400"
                    : "text-yellow-400"
                  : "text-gray-400"
              }`}
            >
              {feedbackData.message.length}/500
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={
              feedbackLoading ||
              feedbackData.message.length >= 500 ||
              feedbackData.message.length === 0 ||
              feedbackData.rating === 0 ||
              feedbackData.role === "" ||
              (feedbackData.role === "other" && feedbackData.customRole === "")
            }
            className={`w-full py-4 px-8 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
              feedbackData.message.length >= 500 ||
              feedbackData.message.length === 0 ||
              feedbackData.rating === 0 ||
              feedbackData.role === "" ||
              (feedbackData.role === "other" && feedbackData.customRole === "")
                ? "bg-gray-500/50 text-gray-300 shadow-gray-500/20 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/30 hover:from-blue-600 hover:to-purple-700 hover:shadow-2xl hover:shadow-blue-500/40"
            }`}
            whileHover={
              feedbackData.message.length < 500 &&
              feedbackData.message.length > 0 &&
              feedbackData.rating > 0 &&
              feedbackData.role !== "" &&
              !(feedbackData.role === "other" && feedbackData.customRole === "")
                ? { scale: 1.02 }
                : {}
            }
            whileTap={
              feedbackData.message.length < 500 &&
              feedbackData.message.length > 0 &&
              feedbackData.rating > 0 &&
              feedbackData.role !== "" &&
              !(feedbackData.role === "other" && feedbackData.customRole === "")
                ? { scale: 0.98 }
                : {}
            }
          >
            {feedbackLoading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Submitting Feedback...
              </span>
            ) : feedbackData.message.length >= 500 ? (
              <span className="text-center flex items-center justify-center gap-2">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                Message too long! Please shorten it.
              </span>
            ) : feedbackData.message.length === 0 ? (
              <span className="text-center flex items-center justify-center gap-2">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                Please enter your feedback
              </span>
            ) : feedbackData.rating === 0 ? (
              <span className="text-center flex items-center justify-center gap-2">
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
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
                Please rate my portfolio
              </span>
            ) : feedbackData.role === "" ? (
              <span className="text-center flex items-center justify-center gap-2">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Please select your role
              </span>
            ) : feedbackData.role === "other" &&
              feedbackData.customRole === "" ? (
              <span className="text-center flex items-center justify-center gap-2">
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                Please specify your role
              </span>
            ) : (
              <span className="text-center">Submit Feedback</span>
            )}
          </motion.button>
        </form>
      )}
    </div>
  );
}
