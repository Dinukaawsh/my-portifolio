import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  themeTextColors: {
    textColor: string;
    placeholderColor: string;
    iconColor: string;
  };
  onSubmit: (data: {
    name: string;
    email: string;
    subject: string;
    body: string;
  }) => Promise<void>;
  loading?: boolean;
}

export default function ContactFormModal({
  isOpen,
  onClose,
  themeTextColors,
  onSubmit,
  loading = false,
}: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    body: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.body.trim()) {
      newErrors.body = "Message is required";
    } else if (formData.body.trim().length < 10) {
      newErrors.body = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await onSubmit(formData);
      setSubmitted(true);
      setTimeout(() => {
        setFormData({ name: "", email: "", subject: "", body: "" });
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-br from-gray-900/95 via-blue-900/50 to-gray-900/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/20 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <motion.h2
                  className="text-2xl sm:text-3xl font-extrabold text-white"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  Contact Me
                </motion.h2>
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              {/* Success Message */}
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <motion.div
                    className="w-20 h-20 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center"
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                    transition={{ duration: 0.6 }}
                  >
                    <svg
                      className="w-10 h-10 text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Message Sent! ✨
                  </h3>
                  <p className="text-gray-300">
                    I'll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-white/10 border ${
                        errors.name
                          ? "border-red-500"
                          : "border-blue-500/30 focus:border-blue-500"
                      } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                      placeholder="Your Name"
                      disabled={loading}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-400">{errors.name}</p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-white/10 border ${
                        errors.email
                          ? "border-red-500"
                          : "border-blue-500/30 focus:border-blue-500"
                      } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                      placeholder="your.email@example.com"
                      disabled={loading}
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Subject <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl bg-white/10 border ${
                        errors.subject
                          ? "border-red-500"
                          : "border-blue-500/30 focus:border-blue-500"
                      } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all`}
                      placeholder="What's this about?"
                      disabled={loading}
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-400">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Body Field */}
                  <div>
                    <label
                      htmlFor="body"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="body"
                      name="body"
                      value={formData.body}
                      onChange={handleChange}
                      rows={6}
                      className={`w-full px-4 py-3 rounded-xl bg-white/10 border ${
                        errors.body
                          ? "border-red-500"
                          : "border-blue-500/30 focus:border-blue-500"
                      } text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none`}
                      placeholder="Tell me more about your project or inquiry..."
                      disabled={loading}
                    />
                    {errors.body && (
                      <p className="mt-1 text-sm text-red-400">{errors.body}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
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
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                        <span>Send Message</span>
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
