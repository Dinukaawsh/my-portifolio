import React from "react";
import { motion } from "framer-motion";

interface ThemeTextColors {
  textColor: string;
  placeholderColor: string;
  iconColor: string;
}

interface FormData {
  name: string;
  email: string;
  message: string;
  rating: number;
}

interface CommentsFormProps {
  themeTextColors: ThemeTextColors;
  contactContent: {
    form: {
      title?: string;
      description?: string;
      submitButton: { text: string; loadingText: string };
      successMessage: {
        title: string;
        description: string;
        actionButton: string;
      };
    };
  };
  loading: boolean;
  submitted: boolean;
  setSubmitted: (v: boolean) => void;
  formData: FormData;
  setFormData: (next: FormData) => void;
  onSubmit: (data: FormData) => void;
}

export default function CommentsForm({
  themeTextColors,
  contactContent,
  loading,
  submitted,
  setSubmitted,
  formData,
  setFormData,
  onSubmit,
}: CommentsFormProps) {
  return (
    <div className="mb-8">
      <motion.div
        className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <p className="text-white/90 text-sm sm:text-base font-medium text-center">
          💬✨ Share Your Thoughts! I&apos;d love to hear what you think about
          my portfolio. Drop a comment below and let&apos;s connect!
        </p>
      </motion.div>

      {submitted ? (
        <motion.div
          className="text-center py-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl border border-green-500/30"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div className="text-5xl mb-4">🎉</div>
          <div className="text-green-400 font-bold text-xl mb-3">
            {contactContent.form.successMessage.title}
          </div>
          <p className="text-gray-300 text-base mb-6">
            {contactContent.form.successMessage.description}
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold border border-green-400/50 hover:from-green-600 hover:to-emerald-700 hover:scale-105 transition-all duration-200 shadow-lg"
          >
            {contactContent.form.successMessage.actionButton}
          </button>
        </motion.div>
      ) : (
        <form
          className="w-full space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(formData);
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Your Name
                </span>
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-4 bg-white/10 border border-blue-500/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400 transition-all duration-300 group-hover:border-blue-400/60 group-hover:bg-white/15"
              />
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
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Email Address
                </span>
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-4 bg-white/10 border border-blue-500/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400 transition-all duration-300 group-hover:border-blue-400/60 group-hover:bg-white/15"
              />
            </div>
          </div>

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
                  onClick={() => setFormData({ ...formData, rating: star })}
                  className="focus:outline-none"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className={`w-8 h-8 transition-colors duration-200 ${
                      star <= formData.rating
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
              {formData.rating > 0 && (
                <motion.span
                  className="text-yellow-400 text-sm font-medium ml-2"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {formData.rating}/5
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
                Your Message
              </span>
            </label>
            <textarea
              name="message"
              required
              placeholder="Share your thoughts about my portfolio..."
              rows={5}
              maxLength={500}
              value={formData.message}
              onChange={(e) => {
                const value = e.target.value;
                if (value.length <= 500)
                  setFormData({ ...formData, message: value });
              }}
              className={`w-full px-4 py-4 bg-white/10 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400 transition-all duration-300 resize-none group-hover:bg-white/15 custom-scrollbar ${
                formData.message.length >= 500
                  ? "border-red-500/60 focus:ring-red-400 focus:border-red-400"
                  : "border-blue-500/40 group-hover:border-blue-400/60"
              }`}
            />
            <div
              className={`absolute bottom-3 right-3 text-xs font-medium ${
                formData.message.length >= 450
                  ? formData.message.length >= 500
                    ? "text-red-400"
                    : "text-yellow-400"
                  : "text-gray-400"
              }`}
            >
              {formData.message.length}/500
            </div>
          </div>

          <motion.button
            type="submit"
            disabled={
              loading ||
              formData.message.length >= 500 ||
              formData.message.length === 0 ||
              formData.rating === 0
            }
            className={`w-full py-4 px-8 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
              formData.message.length >= 500 ||
              formData.message.length === 0 ||
              formData.rating === 0
                ? "bg-gray-500/50 text-gray-300 shadow-gray-500/20 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/30 hover:from-blue-600 hover:to-purple-700 hover:shadow-2xl hover:shadow-blue-500/40"
            }`}
            whileHover={
              formData.message.length < 500 &&
              formData.message.length > 0 &&
              formData.rating > 0
                ? { scale: 1.02 }
                : {}
            }
            whileTap={
              formData.message.length < 500 &&
              formData.message.length > 0 &&
              formData.rating > 0
                ? { scale: 0.98 }
                : {}
            }
          >
            {loading ? (
              <span className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                {contactContent.form.submitButton.loadingText}
              </span>
            ) : formData.message.length >= 500 ? (
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
            ) : formData.message.length === 0 ? (
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
                Please enter a message
              </span>
            ) : formData.rating === 0 ? (
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
            ) : (
              <span className="text-center">
                {contactContent.form.submitButton.text}
              </span>
            )}
          </motion.button>
        </form>
      )}
    </div>
  );
}
