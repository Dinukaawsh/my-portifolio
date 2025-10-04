import React, { useState, useEffect, useRef } from "react";

import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { sendDiscordNotification } from "@/lib/discord";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  contactContent,
  getContactSteps,
  getParticleConfig,
} from "@/app/components/content/contact";
import { ParticleTextEffect } from "@/app/components/backgrounds/dotted-text/dottedtext";

interface Comment {
  id: string;
  name: string;
  message: string;
  rating: number;
  timestamp: Timestamp; // Firebase timestamp type
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
  });
  const [currentStep, setCurrentStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Contact form steps animation
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % getContactSteps().length);
    }, contactContent.animation.rotationInterval);
    return () => clearInterval(timer);
  }, []);

  // Fetch comments from Firebase
  const fetchComments = async () => {
    try {
      const q = query(collection(db, "comments"), orderBy("timestamp", "desc"));
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];
      setComments(commentsData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Add comment to Firebase
  const addComment = async (commentData: {
    name: string;
    email: string;
    message: string;
    rating: number;
  }) => {
    try {
      setLoading(true);
      await addDoc(collection(db, "comments"), {
        ...commentData,
        timestamp: serverTimestamp(),
      });
      await fetchComments(); // Refresh comments
      setFormData({ name: "", email: "", message: "", rating: 0 });
      setSubmitted(true);

      // Send Discord notification for new comment
      await sendDiscordNotification({
        type: "comment",
        data: {
          comment: {
            name: commentData.name,
            email: commentData.email,
            message: commentData.message,
            rating: commentData.rating,
            timestamp: new Date().toLocaleString(),
          },
        },
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          fetchComments(); // Fetch comments when page becomes visible
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full h-full relative flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden px-2 sm:px-4 py-4 sm:py-8"
      >
        {/* Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left z-50"
          style={{ scaleX }}
        />

        {/* Dotted Text Background - Fixed */}
        <div className="fixed inset-0 z-0">
          <ParticleTextEffect />
        </div>

        {/* Floating Contact Icons */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {Array.from(
            { length: contactContent.animation.floatingParticles },
            (_, i) => {
              const config = getParticleConfig(i);
              return (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
                  style={{
                    left: config.left,
                    top: config.top,
                  }}
                  animate={{
                    y: [0, -100, -200, -300],
                    x: [0, Math.random() * 100 - 50],
                    opacity: [0, 1, 0.8, 0],
                    scale: [0, 1, 1.2, 0],
                  }}
                  transition={{
                    duration: config.duration,
                    delay: config.delay,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              );
            }
          )}
        </div>

        {/* Main Content */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
          {/* Enhanced Header */}
          <motion.div
            className="text-center mb-8 sm:mb-12"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          >
            <motion.div
              className="inline-block mb-4"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>

            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {contactContent.header.title}
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl text-blue-200 max-w-2xl mx-auto px-2"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {contactContent.header.subtitle}
            </motion.p>

            {/* Animated Steps Indicator */}
            <motion.div
              className="flex justify-center gap-2 mt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {getContactSteps().map((step, index) => (
                <motion.div
                  key={step}
                  className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium ${
                    index === currentStep
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "bg-white/10 text-gray-300 border border-white/20"
                  }`}
                  animate={
                    index === currentStep ? { scale: 1.1 } : { scale: 1 }
                  }
                  transition={{ duration: 0.3 }}
                >
                  <span className="w-2 h-2 rounded-full bg-current" />
                  {step}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Enhanced Contact Card */}
          <motion.div
            className="w-full max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/20"
              animate={{
                boxShadow: [
                  "0 25px 50px rgba(59, 130, 246, 0.2)",
                  "0 25px 50px rgba(147, 51, 234, 0.3)",
                  "0 25px 50px rgba(59, 130, 246, 0.2)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.h2
                className="text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight text-white text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {contactContent.form.title}
              </motion.h2>
              <motion.p
                className="text-sm sm:text-base text-gray-300 mb-8 text-center"
                initial={{ opacity: 0, y: -20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {contactContent.form.description}
              </motion.p>
              {/* Direct Email Contact */}
              <div className="mb-8 text-center">
                <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30">
                  <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                    {contactContent.directEmail.title}
                  </h3>
                  <p className="text-gray-300 text-sm sm:text-base mb-4">
                    {contactContent.directEmail.description}
                  </p>
                  <motion.a
                    href={`mailto:${contactContent.contactInfo.email}`}
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
                      animate={{
                        rotate: [0, 5, -5, 0],
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
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
                    <span className="relative">
                      {contactContent.contactInfo.emailDisplay}
                      <motion.div
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-white/50 rounded-full"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </span>
                    <motion.div
                      className="w-2 h-2 bg-white/60 rounded-full"
                      animate={{
                        opacity: [0.6, 1, 0.6],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.a>
                </div>
              </div>

              {/* Comment Input Section */}
              <div className="mb-8">
                {/* Add Comment Prompt */}
                <motion.div
                  className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <p className="text-white/90 text-sm sm:text-base font-medium text-center">
                    💬✨ Share Your Thoughts! I&apos;d love to hear what you
                    think about my portfolio. Drop a comment below and
                    let&apos;s connect!
                  </p>
                </motion.div>

                {/* Contact Form */}
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
                      addComment(formData);
                    }}
                  >
                    {/* Name and Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Name Field */}
                      <div className="relative group">
                        <label className="block text-blue-300 text-sm font-medium mb-2">
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

                      {/* Email Field */}
                      <div className="relative group">
                        <label className="block text-blue-300 text-sm font-medium mb-2">
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

                    {/* Star Rating Field */}
                    <div className="relative group">
                      <label className="block text-blue-300 text-sm font-medium mb-2">
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
                              setFormData({ ...formData, rating: star })
                            }
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

                    {/* Message Field */}
                    <div className="relative group">
                      <label className="block text-blue-300 text-sm font-medium mb-2">
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
                          if (value.length <= 500) {
                            setFormData({ ...formData, message: value });
                          }
                        }}
                        className={`w-full px-4 py-4 bg-white/10 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400 transition-all duration-300 resize-none group-hover:bg-white/15 custom-scrollbar ${
                          formData.message.length >= 500
                            ? "border-red-500/60 focus:ring-red-400 focus:border-red-400"
                            : "border-blue-500/40 group-hover:border-blue-400/60"
                        }`}
                      />
                      {/* Character Counter with Warning */}
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

                    {/* Submit Button */}
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
            </motion.div>
          </motion.div>

          {/* Enhanced Comments Section */}
          <motion.div
            className="w-full max-w-4xl mx-auto mt-12"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.h2
                className="text-2xl sm:text-3xl font-extrabold text-white mb-3"
                animate={{
                  textShadow: [
                    "0 0 5px rgba(59, 130, 246, 0.5)",
                    "0 0 20px rgba(59, 130, 246, 0.8)",
                    "0 0 5px rgba(59, 130, 246, 0.5)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {contactContent.comments.title}
              </motion.h2>
              <motion.p
                className="text-blue-200 text-sm sm:text-base"
                animate={{
                  color: ["#93c5fd", "#60a5fa", "#93c5fd"],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {contactContent.comments.subtitle}
              </motion.p>
            </motion.div>

            {comments.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">
                  <contactContent.comments.emptyState.icon className="w-8 h-8 mx-auto" />
                </div>
                <p className="text-gray-400 text-sm sm:text-base">
                  {contactContent.comments.emptyState.message}
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-gradient-to-br from-gray-900/60 via-blue-900/20 to-gray-900/60 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-blue-500/20 shadow-lg shadow-blue-500/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-white font-semibold text-sm sm:text-base">
                            {comment.name}
                          </h4>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <svg
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= (comment.rating || 0)
                                    ? "text-yellow-400"
                                    : "text-gray-600"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-gray-400 text-xs">
                            {comment.timestamp?.toDate
                              ? comment.timestamp.toDate().toLocaleDateString()
                              : "Just now"}
                          </span>
                        </div>
                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                          {comment.message}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
