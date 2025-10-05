import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import {
  Code,
  Palette,
  BarChart3,
  Users,
  Rocket,
  GraduationCap,
  Sparkles,
  User,
  ChevronDown,
  Check,
} from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";

// Extend the Session type to include provider
interface ExtendedSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  provider?: string;
}

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { sendDiscordNotification } from "@/lib/discord";
import { motion, useScroll, useSpring } from "framer-motion";
import { format, formatDistanceToNow, isToday, isYesterday } from "date-fns";
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

interface Feedback {
  id: string;
  name: string;
  email: string;
  role: string;
  message: string;
  rating: number;
  timestamp: Timestamp;
  userImage?: string;
  provider?: string;
}

export default function Contact() {
  const { data: session } = useSession();
  const { currentTheme } = useTheme();

  // Theme-aware text colors only
  const getThemeTextColors = () => {
    switch (currentTheme) {
      case "light":
        return {
          textColor: "text-gray-800",
          placeholderColor: "text-gray-500",
          iconColor: "text-blue-500",
        };
      case "water":
        return {
          textColor: "text-white",
          placeholderColor: "text-gray-300",
          iconColor: "text-cyan-400",
        };
      case "sunset":
        return {
          textColor: "text-white",
          placeholderColor: "text-gray-200",
          iconColor: "text-orange-400",
        };
      case "forest":
        return {
          textColor: "text-white",
          placeholderColor: "text-gray-300",
          iconColor: "text-emerald-400",
        };
      default: // dark
        return {
          textColor: "text-white",
          placeholderColor: "text-gray-400",
          iconColor: "text-blue-400",
        };
    }
  };

  const themeTextColors = getThemeTextColors();
  const GOOGLE_FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL;

  // const formatFirestoreTimestamp = (ts?: Timestamp): string => {
  //   try {
  //     const date = ts?.toDate ? ts.toDate() : null;
  //     if (!date) return "Just now";
  //     const calendarDate = format(date, "PP");
  //     const clockTime = format(date, "p");
  //     const relative = formatDistanceToNow(date, { addSuffix: true });
  //     return `${calendarDate} • ${clockTime} • ${relative}`;
  //   } catch {
  //     return "Just now";
  //   }
  // };

  const formatTimeRelative = (ts?: Timestamp): string => {
    try {
      const date = ts?.toDate ? ts.toDate() : null;
      if (!date) return "Just now";
      const clockTime = format(date, "p");
      const relative = formatDistanceToNow(date, { addSuffix: true });
      return `${clockTime} • ${relative}`;
    } catch {
      return "Just now";
    }
  };

  const getDateLabel = (ts?: Timestamp): string => {
    const date = ts?.toDate ? ts.toDate() : null;
    if (!date) return "Unknown date";
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "PP");
  };
  const [activeTab, setActiveTab] = useState<"comments" | "feedback">(
    "comments"
  );
  const [submitted, setSubmitted] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [feedbackLoading, setFeedbackLoading] = useState(false);

  // Infinite scroll states
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [hasMoreFeedback, setHasMoreFeedback] = useState(true);
  const [isLoadingMoreComments, setIsLoadingMoreComments] = useState(false);
  const [isLoadingMoreFeedback, setIsLoadingMoreFeedback] = useState(false);

  // Scroll and visibility states
  const [visibleComments, setVisibleComments] = useState<Comment[]>([]);
  const [visibleFeedback, setVisibleFeedback] = useState<Feedback[]>([]);
  const [lastCommentId, setLastCommentId] = useState<string | null>(null);
  const [lastFeedbackId, setLastFeedbackId] = useState<string | null>(null);

  // Container view states
  const [showCommentsContainer, setShowCommentsContainer] = useState(true);
  const [showFeedbackContainer, setShowFeedbackContainer] = useState(true);
  const [containerComments, setContainerComments] = useState<Comment[]>([]);
  const [containerFeedback, setContainerFeedback] = useState<Feedback[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    rating: 0,
  });
  const [feedbackData, setFeedbackData] = useState({
    role: "",
    customRole: "",
    message: "",
    rating: 0,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showHireOptions, setShowHireOptions] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const loadingCommentsRef = useRef(false);
  const loadingFeedbackRef = useRef(false);
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

  // Fetch initial comments from Firebase (first page)
  const fetchComments = useCallback(async (reset = false) => {
    try {
      setLoading(true);
      const commentsRef = collection(db, "comments");
      const q = query(commentsRef, orderBy("timestamp", "desc"), limit(10));

      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];

      if (reset) {
        setComments(commentsData);
        setVisibleComments(commentsData);
        setContainerComments(commentsData); // Show ALL comments in container
        setLastCommentId(
          querySnapshot.docs[querySnapshot.docs.length - 1]?.id || null
        );
      } else {
        setComments((prev) => [...prev, ...commentsData]);
        setVisibleComments((prev) => [...prev, ...commentsData]);
        setContainerComments((prev) => [...prev, ...commentsData]); // Add ALL to container
        setLastCommentId(
          querySnapshot.docs[querySnapshot.docs.length - 1]?.id || null
        );
      }

      setHasMoreComments(querySnapshot.docs.length === 10);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load more comments (pagination)
  const loadMoreComments = useCallback(async () => {
    if (
      !hasMoreComments ||
      isLoadingMoreComments ||
      !lastCommentId ||
      loadingCommentsRef.current
    )
      return;

    try {
      loadingCommentsRef.current = true;
      setIsLoadingMoreComments(true);
      const commentsRef = collection(db, "comments");

      // Get the last document from the current comments list
      const lastDocSnapshot = comments[comments.length - 1];
      if (!lastDocSnapshot) {
        setHasMoreComments(false);
        return;
      }

      // Create a document snapshot for startAfter
      const lastDocRef = doc(db, "comments", lastDocSnapshot.id);
      const lastDoc = await getDoc(lastDocRef);

      if (!lastDoc.exists()) {
        setHasMoreComments(false);
        return;
      }

      const q = query(
        commentsRef,
        orderBy("timestamp", "desc"),
        startAfter(lastDoc),
        limit(10)
      );

      const querySnapshot = await getDocs(q);
      const newComments = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];

      if (newComments.length > 0) {
        // Use functional updates to get the latest state and prevent duplicates
        setComments((prevComments) => {
          const existingIds = new Set(prevComments.map((c) => c.id));
          const uniqueNewComments = newComments.filter(
            (c) => !existingIds.has(c.id)
          );
          return uniqueNewComments.length > 0
            ? [...prevComments, ...uniqueNewComments]
            : prevComments;
        });

        setVisibleComments((prevVisibleComments) => {
          const existingIds = new Set(prevVisibleComments.map((c) => c.id));
          const uniqueNewComments = newComments.filter(
            (c) => !existingIds.has(c.id)
          );
          return uniqueNewComments.length > 0
            ? [...prevVisibleComments, ...uniqueNewComments]
            : prevVisibleComments;
        });

        setContainerComments((prevContainerComments) => {
          const existingIds = new Set(prevContainerComments.map((c) => c.id));
          const uniqueNewComments = newComments.filter(
            (c) => !existingIds.has(c.id)
          );
          return uniqueNewComments.length > 0
            ? [...prevContainerComments, ...uniqueNewComments]
            : prevContainerComments;
        });

        setLastCommentId(
          querySnapshot.docs[querySnapshot.docs.length - 1]?.id || null
        );
        setHasMoreComments(querySnapshot.docs.length === 10);
      } else {
        setHasMoreComments(false);
      }
    } catch (error) {
      console.error("Error loading more comments:", error);
    } finally {
      setIsLoadingMoreComments(false);
      loadingCommentsRef.current = false;
    }
  }, [hasMoreComments, isLoadingMoreComments, lastCommentId, comments]);

  // Fetch initial feedback from Firebase (first page)
  const fetchFeedback = useCallback(async (reset = false) => {
    try {
      setFeedbackLoading(true);
      const feedbackRef = collection(db, "feedback");
      const q = query(feedbackRef, orderBy("timestamp", "desc"), limit(10));

      const querySnapshot = await getDocs(q);
      const feedbackData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Feedback[];

      if (reset) {
        setFeedbackItems(feedbackData);
        setVisibleFeedback(feedbackData);
        setContainerFeedback(feedbackData); // Show ALL feedback in container
        setLastFeedbackId(
          querySnapshot.docs[querySnapshot.docs.length - 1]?.id || null
        );
      } else {
        setFeedbackItems((prev) => [...prev, ...feedbackData]);
        setVisibleFeedback((prev) => [...prev, ...feedbackData]);
        setContainerFeedback((prev) => [...prev, ...feedbackData]); // Add ALL to container
        setLastFeedbackId(
          querySnapshot.docs[querySnapshot.docs.length - 1]?.id || null
        );
      }

      setHasMoreFeedback(querySnapshot.docs.length === 10);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    } finally {
      setFeedbackLoading(false);
    }
  }, []);

  // Load more feedback (pagination)
  const loadMoreFeedback = useCallback(async () => {
    if (
      !hasMoreFeedback ||
      isLoadingMoreFeedback ||
      !lastFeedbackId ||
      loadingFeedbackRef.current
    )
      return;

    try {
      loadingFeedbackRef.current = true;
      setIsLoadingMoreFeedback(true);
      const feedbackRef = collection(db, "feedback");

      // Get the last document from the current feedback list
      const lastDocSnapshot = feedbackItems[feedbackItems.length - 1];
      if (!lastDocSnapshot) {
        setHasMoreFeedback(false);
        return;
      }

      // Create a document snapshot for startAfter
      const lastDocRef = doc(db, "feedback", lastDocSnapshot.id);
      const lastDoc = await getDoc(lastDocRef);

      if (!lastDoc.exists()) {
        setHasMoreFeedback(false);
        return;
      }

      const q = query(
        feedbackRef,
        orderBy("timestamp", "desc"),
        startAfter(lastDoc),
        limit(10)
      );

      const querySnapshot = await getDocs(q);
      const newFeedback = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Feedback[];

      if (newFeedback.length > 0) {
        // Use functional updates to get the latest state and prevent duplicates
        setFeedbackItems((prevFeedbackItems) => {
          const existingIds = new Set(prevFeedbackItems.map((f) => f.id));
          const uniqueNewFeedback = newFeedback.filter(
            (f) => !existingIds.has(f.id)
          );
          return uniqueNewFeedback.length > 0
            ? [...prevFeedbackItems, ...uniqueNewFeedback]
            : prevFeedbackItems;
        });

        setVisibleFeedback((prevVisibleFeedback) => {
          const existingIds = new Set(prevVisibleFeedback.map((f) => f.id));
          const uniqueNewFeedback = newFeedback.filter(
            (f) => !existingIds.has(f.id)
          );
          return uniqueNewFeedback.length > 0
            ? [...prevVisibleFeedback, ...uniqueNewFeedback]
            : prevVisibleFeedback;
        });

        setContainerFeedback((prevContainerFeedback) => {
          const existingIds = new Set(prevContainerFeedback.map((f) => f.id));
          const uniqueNewFeedback = newFeedback.filter(
            (f) => !existingIds.has(f.id)
          );
          return uniqueNewFeedback.length > 0
            ? [...prevContainerFeedback, ...uniqueNewFeedback]
            : prevContainerFeedback;
        });

        setLastFeedbackId(
          querySnapshot.docs[querySnapshot.docs.length - 1]?.id || null
        );
        setHasMoreFeedback(querySnapshot.docs.length === 10);
      } else {
        setHasMoreFeedback(false);
      }
    } catch (error) {
      console.error("Error loading more feedback:", error);
    } finally {
      setIsLoadingMoreFeedback(false);
      loadingFeedbackRef.current = false;
    }
  }, [hasMoreFeedback, isLoadingMoreFeedback, lastFeedbackId, feedbackItems]);

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
      await fetchComments(true); // Refresh comments (reset = true)
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

  // Add feedback to Firebase
  const addFeedback = async (feedbackData: {
    role: string;
    customRole: string;
    message: string;
    rating: number;
  }) => {
    if (!session?.user) return;

    try {
      setFeedbackLoading(true);
      await addDoc(collection(db, "feedback"), {
        name: session.user.name || "Anonymous",
        email: session.user.email || "",
        role:
          feedbackData.role === "other"
            ? feedbackData.customRole
            : feedbackData.role,
        message: feedbackData.message,
        rating: feedbackData.rating,
        userImage: session.user.image,
        provider: (session as ExtendedSession)?.provider || "unknown",
        timestamp: serverTimestamp(),
      });
      await fetchFeedback(true); // Refresh feedback (reset = true)
      setFeedbackData({ role: "", customRole: "", message: "", rating: 0 });
      setFeedbackSubmitted(true);

      // Send Discord notification for new feedback
      await sendDiscordNotification({
        type: "feedback",
        data: {
          feedback: {
            name: session.user.name || "Anonymous",
            email: session.user.email || "",
            role:
              feedbackData.role === "other"
                ? feedbackData.customRole
                : feedbackData.role,
            message: feedbackData.message,
            rating: feedbackData.rating,
            provider: (session as ExtendedSession)?.provider || "unknown",
            image: session.user.image || undefined,
            timestamp: new Date().toLocaleString(),
          },
        },
      });
    } catch (error) {
      console.error("Error adding feedback:", error);
    } finally {
      setFeedbackLoading(false);
    }
  };

  // Intersection Observer for animations and initial data loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (activeTab === "comments" && comments.length === 0) {
            fetchComments(true);
          } else if (activeTab === "feedback" && feedbackItems.length === 0) {
            fetchFeedback(true);
          }
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [
    activeTab,
    comments.length,
    feedbackItems.length,
    fetchComments,
    fetchFeedback,
  ]);

  // When tab changes while visible, fetch corresponding data if not loaded
  useEffect(() => {
    if (!isVisible) return;
    if (activeTab === "comments" && comments.length === 0) {
      fetchComments(true);
    } else if (activeTab === "feedback" && feedbackItems.length === 0) {
      fetchFeedback(true);
    }
  }, [
    activeTab,
    isVisible,
    comments.length,
    feedbackItems.length,
    fetchComments,
    fetchFeedback,
  ]);

  // Infinite scroll for comments
  useEffect(() => {
    const handleScroll = () => {
      if (activeTab !== "comments" || !hasMoreComments || isLoadingMoreComments)
        return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Load more when user scrolls to bottom 200px
      if (scrollTop + windowHeight >= documentHeight - 200) {
        loadMoreComments();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab, hasMoreComments, isLoadingMoreComments, loadMoreComments]);

  // Infinite scroll for feedback
  useEffect(() => {
    const handleScroll = () => {
      if (activeTab !== "feedback" || !hasMoreFeedback || isLoadingMoreFeedback)
        return;

      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Load more when user scrolls to bottom 200px
      if (scrollTop + windowHeight >= documentHeight - 200) {
        loadMoreFeedback();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab, hasMoreFeedback, isLoadingMoreFeedback, loadMoreFeedback]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

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
              {/* Hire Me - Choice Options */}
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
                      <span>Hire Me</span>
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
                    </motion.button>

                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: showHireOptions ? 1 : 0,
                        height: showHireOptions ? "auto" : 0,
                      }}
                      transition={{ duration: 0.25 }}
                      className={`overflow-hidden ${
                        showHireOptions ? "mt-2" : ""
                      }`}
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
                          <svg
                            className="w-5 h-5"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              fill="currentColor"
                              d="M19 2H10a2 2 0 00-2 2v2h2V4h9v16h-9v-2H8v2a2 2 0 002 2h9a2 2 0 002-2V4a2 2 0 00-2-2z"
                            />
                            <path
                              fill="currentColor"
                              d="M13 12l-4-4v3H3v2h6v3l4-4z"
                            />
                          </svg>
                          <span>Google Form</span>
                        </motion.a>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="mb-6 flex justify-center">
                <div className="inline-flex rounded-2xl overflow-hidden border border-blue-500/30 bg-white/5">
                  <button
                    className={`px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold transition-all ${
                      activeTab === "comments"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "text-blue-200 hover:bg-white/10"
                    }`}
                    onClick={() => setActiveTab("comments")}
                  >
                    Comments
                  </button>
                  <button
                    className={`px-4 sm:px-6 py-2 text-sm sm:text-base font-semibold transition-all ${
                      activeTab === "feedback"
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                        : "text-blue-200 hover:bg-white/10"
                    }`}
                    onClick={() => setActiveTab("feedback")}
                  >
                    Feedback
                  </button>
                </div>
              </div>

              {/* Comment Input Section */}
              {activeTab === "comments" && (
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

                        {/* Email Field */}
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
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                            className="w-full px-4 py-4 bg-white/10 border border-blue-500/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400 transition-all duration-300 group-hover:border-blue-400/60 group-hover:bg-white/15"
                          />
                        </div>
                      </div>

                      {/* Star Rating Field */}
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
              )}

              {/* Feedback Section */}
              {activeTab === "feedback" && (
                <div className="mb-8">
                  {!session && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20">
                      <p className="text-white/90 text-sm sm:text-base font-medium text-center">
                        🔐 Login required to submit feedback. Your profile
                        picture and name will be displayed with your feedback.
                      </p>
                    </div>
                  )}

                  {!session ? (
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
                        {/* Google Login */}
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

                        {/* GitHub Login */}
                        <motion.button
                          onClick={() => signIn("github")}
                          className="flex items-center justify-center gap-3 px-6 py-4 bg-gray-800 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all duration-200 shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                          GitHub
                        </motion.button>

                        {/* LinkedIn Login - Commented out */}
                        {/* <motion.button
                          onClick={() => signIn("linkedin")}
                          className="flex items-center justify-center gap-3 px-6 py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-200 shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          LinkedIn
                        </motion.button> */}
                      </div>
                    </div>
                  ) : (
                    <div>
                      {/* User Profile Display */}
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
                            <h4 className="text-white font-semibold">
                              {session.user?.name}
                            </h4>
                            <p className="text-gray-300 text-sm">
                              {session.user?.email}
                            </p>
                            <button
                              onClick={() => signOut()}
                              className="text-green-400 text-xs hover:text-green-300 transition-colors"
                            >
                              Sign out
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Feedback Form */}
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
                            addFeedback(feedbackData);
                          }}
                        >
                          {/* Custom Role Dropdown */}
                          <div className="relative group">
                            <label
                              className={`block ${themeTextColors.iconColor} text-sm font-medium mb-2`}
                            >
                              <span className="flex items-center gap-2">
                                <User
                                  className={`w-4 h-4 ${themeTextColors.iconColor}`}
                                />
                                Your Role
                              </span>
                            </label>

                            {/* Custom Dropdown */}
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
                                    ? feedbackData.role
                                        .charAt(0)
                                        .toUpperCase() +
                                      feedbackData.role
                                        .slice(1)
                                        .replace("-", " ")
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

                              {/* Dropdown Options */}
                              <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{
                                  opacity: dropdownOpen ? 1 : 0,
                                  y: dropdownOpen ? 0 : -10,
                                  scale: dropdownOpen ? 1 : 0.95,
                                }}
                                transition={{ duration: 0.2 }}
                                className={`absolute top-full left-0 right-0 mt-2 bg-gray-900/95 backdrop-blur-xl border border-blue-500/30 rounded-2xl shadow-2xl shadow-blue-500/20 z-50 overflow-hidden ${
                                  dropdownOpen
                                    ? "pointer-events-auto"
                                    : "pointer-events-none"
                                }`}
                              >
                                {[
                                  {
                                    value: "developer",
                                    label: "Developer",
                                    icon: Code,
                                  },
                                  {
                                    value: "designer",
                                    label: "Designer",
                                    icon: Palette,
                                  },
                                  {
                                    value: "product-manager",
                                    label: "Product Manager",
                                    icon: BarChart3,
                                  },
                                  {
                                    value: "recruiter",
                                    label: "Recruiter",
                                    icon: Users,
                                  },
                                  {
                                    value: "entrepreneur",
                                    label: "Entrepreneur",
                                    icon: Rocket,
                                  },
                                  {
                                    value: "student",
                                    label: "Student",
                                    icon: GraduationCap,
                                  },
                                  {
                                    value: "other",
                                    label: "Other",
                                    icon: Sparkles,
                                  },
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
                                    <span className="font-medium">
                                      {option.label}
                                    </span>
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

                          {/* Custom Role Field - Only shows when "Other" is selected */}
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

                          {/* Star Rating Field */}
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
                                    setFeedbackData({
                                      ...feedbackData,
                                      rating: star,
                                    })
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

                          {/* Message Field */}
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
                                if (value.length <= 500) {
                                  setFeedbackData({
                                    ...feedbackData,
                                    message: value,
                                  });
                                }
                              }}
                              className={`w-full px-4 py-4 bg-white/10 border rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400 transition-all duration-300 resize-none group-hover:bg-white/15 custom-scrollbar ${
                                feedbackData.message.length >= 500
                                  ? "border-red-500/60 focus:ring-red-400 focus:border-red-400"
                                  : "border-blue-500/40 group-hover:border-blue-400/60"
                              }`}
                            />
                            {/* Character Counter with Warning */}
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

                          {/* Submit Button */}
                          <motion.button
                            type="submit"
                            disabled={
                              feedbackLoading ||
                              feedbackData.message.length >= 500 ||
                              feedbackData.message.length === 0 ||
                              feedbackData.rating === 0 ||
                              feedbackData.role === "" ||
                              (feedbackData.role === "other" &&
                                feedbackData.customRole === "")
                            }
                            className={`w-full py-4 px-8 rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 ${
                              feedbackData.message.length >= 500 ||
                              feedbackData.message.length === 0 ||
                              feedbackData.rating === 0 ||
                              feedbackData.role === "" ||
                              (feedbackData.role === "other" &&
                                feedbackData.customRole === "")
                                ? "bg-gray-500/50 text-gray-300 shadow-gray-500/20 cursor-not-allowed"
                                : "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-blue-500/30 hover:from-blue-600 hover:to-purple-700 hover:shadow-2xl hover:shadow-blue-500/40"
                            }`}
                            whileHover={
                              feedbackData.message.length < 500 &&
                              feedbackData.message.length > 0 &&
                              feedbackData.rating > 0 &&
                              feedbackData.role !== "" &&
                              !(
                                feedbackData.role === "other" &&
                                feedbackData.customRole === ""
                              )
                                ? { scale: 1.02 }
                                : {}
                            }
                            whileTap={
                              feedbackData.message.length < 500 &&
                              feedbackData.message.length > 0 &&
                              feedbackData.rating > 0 &&
                              feedbackData.role !== "" &&
                              !(
                                feedbackData.role === "other" &&
                                feedbackData.customRole === ""
                              )
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
                              <span className="text-center">
                                Submit Feedback
                              </span>
                            )}
                          </motion.button>
                        </form>
                      )}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>

          {/* Comments/Feedback List Section */}
          {activeTab === "comments" && (
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

              {/* Container View */}
              {showCommentsContainer ? (
                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 via-blue-900/20 to-gray-900/60 backdrop-blur-xl rounded-2xl border border-blue-500/20 shadow-lg shadow-blue-500/10"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Container Header */}
                  <div className="p-4 border-b border-blue-500/20">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-semibold text-lg">
                        Recent Comments
                      </h3>
                      <span className="text-blue-300 text-sm">
                        {containerComments.length} comments
                      </span>
                    </div>
                  </div>

                  {/* Container Content */}
                  <div className="max-h-96 overflow-y-auto custom-scrollbar">
                    {loading ? (
                      <div className="text-center py-12 text-blue-200">
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-6 h-6 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
                          Loading comments...
                        </div>
                      </div>
                    ) : containerComments.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-gray-400 text-lg mb-2">
                          {React.createElement(
                            contactContent.comments.emptyState.icon
                          )}
                        </div>
                        <p className="text-gray-400 text-sm sm:text-base">
                          {contactContent.comments.emptyState.message}
                        </p>
                      </div>
                    ) : (
                      <div className="p-4 space-y-4">
                        {containerComments.reduce<React.ReactElement[]>(
                          (acc, comment, idx, arr) => {
                            const prev = idx > 0 ? arr[idx - 1] : null;
                            const showHeader =
                              !prev ||
                              getDateLabel(prev.timestamp) !==
                                getDateLabel(comment.timestamp);
                            if (showHeader) {
                              acc.push(
                                <div
                                  key={`comments-header-${comment.id}`}
                                  className="py-2"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="flex-1 h-px bg-blue-500/20" />
                                    <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider">
                                      {getDateLabel(comment.timestamp)}
                                    </span>
                                    <div className="flex-1 h-px bg-blue-500/20" />
                                  </div>
                                </div>
                              );
                            }
                            acc.push(
                              <div
                                key={comment.id}
                                className="bg-gradient-to-br from-gray-800/40 via-blue-800/10 to-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-blue-500/10"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                    {comment.name.charAt(0).toUpperCase()}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="text-white font-semibold text-sm truncate">
                                          {comment.name}
                                        </h4>
                                      </div>
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <div className="flex items-center gap-1">
                                          {[1, 2, 3, 4, 5].map((star) => (
                                            <svg
                                              key={star}
                                              className={`w-3 h-3 ${
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
                                        <span className="text-gray-400 text-xs whitespace-nowrap">
                                          {formatTimeRelative(
                                            comment.timestamp
                                          )}
                                        </span>
                                      </div>
                                    </div>
                                    <p
                                      className="text-gray-300 text-sm leading-relaxed overflow-hidden"
                                      style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                      }}
                                    >
                                      {comment.message}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                            return acc;
                          },
                          []
                        )}
                      </div>
                    )}
                  </div>

                  {/* View All Button */}
                  {containerComments.length > 0 && (
                    <div className="p-4 border-t border-blue-500/20">
                      <motion.button
                        onClick={() => setShowCommentsContainer(false)}
                        className="w-full py-3 px-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl text-blue-300 hover:from-blue-500/30 hover:to-purple-500/30 hover:border-blue-400/50 transition-all duration-300 font-semibold"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-center gap-2">
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
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                          Switch to Expanded View ({comments.length})
                        </div>
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              ) : (
                /* Full View */
                <div className="grid gap-4">
                  {visibleComments.reduce<React.ReactElement[]>(
                    (acc, comment, idx, arr) => {
                      const prev = idx > 0 ? arr[idx - 1] : null;
                      const showHeader =
                        !prev ||
                        getDateLabel(prev.timestamp) !==
                          getDateLabel(comment.timestamp);
                      if (showHeader) {
                        acc.push(
                          <div
                            key={`comments-full-header-${comment.id}`}
                            className="pt-2"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-px bg-blue-500/20" />
                              <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider">
                                {getDateLabel(comment.timestamp)}
                              </span>
                              <div className="flex-1 h-px bg-blue-500/20" />
                            </div>
                          </div>
                        );
                      }
                      acc.push(
                        <div
                          key={comment.id}
                          className="bg-gradient-to-br from-gray-900/60 via-blue-900/20 to-gray-900/60 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-blue-500/20 shadow-lg shadow-blue-500/10"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                              {comment.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="text-white font-semibold text-sm sm:text-base truncate">
                                    {comment.name}
                                  </h4>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <svg
                                        key={star}
                                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
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
                                  <span className="text-gray-400 text-xs whitespace-nowrap">
                                    {formatTimeRelative(comment.timestamp)}
                                  </span>
                                </div>
                              </div>
                              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                                {comment.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                      return acc;
                    },
                    []
                  )}

                  {/* Load More Comments Button */}
                  {hasMoreComments && (
                    <motion.div
                      className="text-center py-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.button
                        onClick={loadMoreComments}
                        disabled={isLoadingMoreComments}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl text-blue-300 hover:from-blue-500/30 hover:to-purple-500/30 hover:border-blue-400/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isLoadingMoreComments ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
                            Loading more...
                          </div>
                        ) : (
                          "Load More Comments"
                        )}
                      </motion.button>
                    </motion.div>
                  )}

                  {/* End of comments indicator */}
                  {!hasMoreComments && visibleComments.length > 0 && (
                    <motion.div
                      className="text-center py-6 text-gray-400 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      ✨ You&apos;ve reached the end of comments
                    </motion.div>
                  )}

                  {/* Compact View Button */}
                  <motion.div
                    className="text-center py-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.button
                      onClick={() => setShowCommentsContainer(true)}
                      className="px-6 py-3 bg-gradient-to-r from-gray-500/20 to-gray-600/20 border border-gray-500/30 rounded-xl text-gray-300 hover:from-gray-500/30 hover:to-gray-600/30 hover:border-gray-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center justify-center gap-2">
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
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                        Switch to Compact View
                      </div>
                    </motion.button>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "feedback" && (
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
                  Feedback
                </motion.h2>
                <motion.p
                  className="text-blue-200 text-sm sm:text-base"
                  animate={{
                    color: ["#93c5fd", "#60a5fa", "#93c5fd"],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Authenticated feedback from users with profile pictures.
                </motion.p>
              </motion.div>

              {/* Container View */}
              {showFeedbackContainer ? (
                <motion.div
                  className="bg-gradient-to-br from-gray-900/60 via-blue-900/20 to-gray-900/60 backdrop-blur-xl rounded-2xl border border-blue-500/20 shadow-lg shadow-blue-500/10"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Container Header */}
                  <div className="p-4 border-b border-blue-500/20">
                    <div className="flex items-center justify-between">
                      <h3 className="text-white font-semibold text-lg">
                        Recent Feedback
                      </h3>
                      <span className="text-blue-300 text-sm">
                        {containerFeedback.length} feedback
                      </span>
                    </div>
                  </div>

                  {/* Container Content */}
                  <div className="max-h-96 overflow-y-auto custom-scrollbar">
                    {feedbackLoading ? (
                      <div className="text-center py-12 text-blue-200">
                        <div className="flex items-center justify-center gap-3">
                          <div className="w-6 h-6 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
                          Loading feedback...
                        </div>
                      </div>
                    ) : containerFeedback.length === 0 ? (
                      <div className="text-center py-12 text-gray-400">
                        No feedback yet.
                      </div>
                    ) : (
                      <div className="p-4 space-y-4">
                        {containerFeedback.reduce<React.ReactElement[]>(
                          (acc, item, idx, arr) => {
                            const prev = idx > 0 ? arr[idx - 1] : null;
                            const showHeader =
                              !prev ||
                              getDateLabel(prev.timestamp) !==
                                getDateLabel(item.timestamp);
                            if (showHeader) {
                              acc.push(
                                <div
                                  key={`feedback-header-${item.id}`}
                                  className="py-2"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="flex-1 h-px bg-blue-500/20" />
                                    <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider">
                                      {getDateLabel(item.timestamp)}
                                    </span>
                                    <div className="flex-1 h-px bg-blue-500/20" />
                                  </div>
                                </div>
                              );
                            }
                            acc.push(
                              <div
                                key={item.id}
                                className="bg-gradient-to-br from-gray-800/40 via-blue-800/10 to-gray-800/40 backdrop-blur-sm rounded-xl p-4 border border-blue-500/10"
                              >
                                <div className="flex items-start gap-3">
                                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 overflow-hidden">
                                    {item.userImage ? (
                                      <Image
                                        src={item.userImage}
                                        alt={item.name}
                                        width={32}
                                        height={32}
                                        className="w-full h-full object-cover"
                                      />
                                    ) : (
                                      <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                        {item.name.charAt(0).toUpperCase()}
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <h4 className="text-white font-semibold text-sm truncate">
                                          {item.name}
                                        </h4>
                                        <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full whitespace-nowrap">
                                          {item.role}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2 flex-wrap">
                                        <div className="flex items-center gap-1">
                                          {[1, 2, 3, 4, 5].map((star) => (
                                            <svg
                                              key={star}
                                              className={`w-3 h-3 ${
                                                star <= (item.rating || 0)
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
                                        <span className="text-gray-400 text-xs whitespace-nowrap">
                                          {formatTimeRelative(item.timestamp)}
                                        </span>
                                        {item.provider && (
                                          <span className="text-xs px-2 py-1 bg-blue-500/20 text-white rounded-full whitespace-nowrap">
                                            via {item.provider}
                                          </span>
                                        )}
                                      </div>
                                    </div>
                                    <p
                                      className="text-gray-300 text-sm leading-relaxed overflow-hidden"
                                      style={{
                                        display: "-webkit-box",
                                        WebkitLineClamp: 2,
                                        WebkitBoxOrient: "vertical",
                                      }}
                                    >
                                      {item.message}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                            return acc;
                          },
                          []
                        )}
                      </div>
                    )}
                  </div>

                  {/* View All Button */}
                  {containerFeedback.length > 0 && (
                    <div className="p-4 border-t border-blue-500/20">
                      <motion.button
                        onClick={() => setShowFeedbackContainer(false)}
                        className="w-full py-3 px-6 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl text-blue-300 hover:from-blue-500/30 hover:to-purple-500/30 hover:border-blue-400/50 transition-all duration-300 font-semibold"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-center gap-2">
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
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          </svg>
                          Switch to Expanded View ({feedbackItems.length})
                        </div>
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              ) : (
                /* Full View */
                <div className="grid gap-4">
                  {visibleFeedback.reduce<React.ReactElement[]>(
                    (acc, item, idx, arr) => {
                      const prev = idx > 0 ? arr[idx - 1] : null;
                      const showHeader =
                        !prev ||
                        getDateLabel(prev.timestamp) !==
                          getDateLabel(item.timestamp);
                      if (showHeader) {
                        acc.push(
                          <div
                            key={`feedback-full-header-${item.id}`}
                            className="pt-2"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex-1 h-px bg-blue-500/20" />
                              <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider">
                                {getDateLabel(item.timestamp)}
                              </span>
                              <div className="flex-1 h-px bg-blue-500/20" />
                            </div>
                          </div>
                        );
                      }
                      acc.push(
                        <div
                          key={item.id}
                          className="bg-gradient-to-br from-gray-900/60 via-blue-900/20 to-gray-900/60 backdrop-blur-xl rounded-2xl p-4 sm:p-6 border border-blue-500/20 shadow-lg shadow-blue-500/10"
                        >
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 overflow-hidden">
                              {item.userImage ? (
                                <Image
                                  src={item.userImage}
                                  alt={item.name}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                  {item.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="text-white font-semibold text-sm sm:text-base truncate">
                                    {item.name}
                                  </h4>
                                  <span className="text-xs px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full whitespace-nowrap">
                                    {item.role}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <div className="flex items-center gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <svg
                                        key={star}
                                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                                          star <= (item.rating || 0)
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
                                  <span className="text-gray-400 text-xs whitespace-nowrap">
                                    {formatTimeRelative(item.timestamp)}
                                  </span>
                                  {item.provider && (
                                    <span className="text-xs px-2 py-1 bg-blue-500/20 text-white rounded-full whitespace-nowrap">
                                      via {item.provider}
                                    </span>
                                  )}
                                </div>
                              </div>
                              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                                {item.message}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                      return acc;
                    },
                    []
                  )}

                  {/* Load More Feedback Button */}
                  {hasMoreFeedback && (
                    <motion.div
                      className="text-center py-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.button
                        onClick={loadMoreFeedback}
                        disabled={isLoadingMoreFeedback}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl text-blue-300 hover:from-blue-500/30 hover:to-purple-500/30 hover:border-blue-400/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isLoadingMoreFeedback ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin"></div>
                            Loading more...
                          </div>
                        ) : (
                          "Load More Feedback"
                        )}
                      </motion.button>
                    </motion.div>
                  )}

                  {/* End of feedback indicator */}
                  {!hasMoreFeedback && visibleFeedback.length > 0 && (
                    <motion.div
                      className="text-center py-6 text-gray-400 text-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      ✨ You&apos;ve reached the end of feedback
                    </motion.div>
                  )}

                  {/* Compact View Button */}
                  <motion.div
                    className="text-center py-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.button
                      onClick={() => setShowFeedbackContainer(true)}
                      className="px-6 py-3 bg-gradient-to-r from-gray-500/20 to-gray-600/20 border border-gray-500/30 rounded-xl text-gray-300 hover:from-gray-500/30 hover:to-gray-600/30 hover:border-gray-400/50 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center justify-center gap-2">
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
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                        Switch to Compact View
                      </div>
                    </motion.button>
                  </motion.div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}
