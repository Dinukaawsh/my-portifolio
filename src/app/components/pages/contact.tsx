import React, { useState, useEffect, useRef } from "react";
import Flower from "@/app/components/backgrounds/flower/Flower";
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

interface Comment {
  id: string;
  name: string;
  message: string;
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
  }) => {
    try {
      setLoading(true);
      await addDoc(collection(db, "comments"), {
        ...commentData,
        timestamp: serverTimestamp(),
      });
      await fetchComments(); // Refresh comments
      setFormData({ name: "", email: "", message: "" });
      setSubmitted(true);

      // Send Discord notification for new comment
      await sendDiscordNotification({
        type: "comment",
        data: {
          comment: {
            name: commentData.name,
            email: commentData.email,
            message: commentData.message,
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
    <section
      ref={sectionRef}
      className="w-full h-full relative flex flex-col items-center justify-start overflow-y-auto overflow-x-hidden px-2 sm:px-4 py-4 sm:py-8"
    >
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transform origin-left z-50"
        style={{ scaleX }}
      />

      {/* Flower Background - Fixed */}
      <div className="fixed inset-0 z-0">
        <Flower />
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
                animate={index === currentStep ? { scale: 1.1 } : { scale: 1 }}
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
                <a
                  href={`mailto:${contactContent.contactInfo.email}`}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105"
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
                  {contactContent.contactInfo.emailDisplay}
                </a>
              </div>
            </div>

            {/* Contact Form */}
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-green-400 font-semibold text-lg mb-2">
                  {contactContent.form.successMessage.title}
                </div>
                <p className="text-gray-300 text-sm">
                  {contactContent.form.successMessage.description}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition-all duration-200"
                >
                  {contactContent.form.successMessage.actionButton}
                </button>
              </div>
            ) : (
              <form
                className="w-full flex flex-col gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  addComment(formData);
                }}
              >
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={contactContent.form.fields.name.placeholder}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="rounded-xl px-4 py-3 bg-white/10 border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400 transition-all duration-200"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={contactContent.form.fields.email.placeholder}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="rounded-xl px-4 py-3 bg-white/10 border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400 transition-all duration-200"
                />
                <textarea
                  name="message"
                  required
                  placeholder={contactContent.form.fields.message.placeholder}
                  rows={contactContent.form.fields.message.rows}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="rounded-xl px-4 py-3 bg-white/10 border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400 transition-all duration-200 resize-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:from-blue-600 hover:to-purple-700 hover:shadow-xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? contactContent.form.submitButton.loadingText
                    : contactContent.form.submitButton.text}
                </button>
              </form>
            )}
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
                {contactContent.comments.emptyState.icon}
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
  );
}
