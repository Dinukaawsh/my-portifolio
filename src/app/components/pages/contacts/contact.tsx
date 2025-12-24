import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "@/app/contexts/ThemeContext";
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
import HireMeSection from "@/app/components/pages/data/contact/components/HireMeSection";
import CommentsForm from "@/app/components/pages/data/contact/components/CommentsForm";
import CommentsList from "@/app/components/pages/data/contact/components/CommentsList";
import FeedbackForm from "@/app/components/pages/data/contact/components/FeedbackForm";
import FeedbackList from "@/app/components/pages/data/contact/components/FeedbackList";

// Extend the Session type to include provider
interface ExtendedSession {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  provider?: string;
}

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
  const [activeTab, setActiveTab] = useState<"comments" | "feedback">(
    "feedback"
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
              <HireMeSection
                contactContent={contactContent}
                GOOGLE_FORM_URL={GOOGLE_FORM_URL}
                showHireOptions={showHireOptions}
                setShowHireOptions={setShowHireOptions}
              />

              {/* Tabs */}
              <div className="mb-6 flex justify-center">
                <div className="inline-flex rounded-2xl overflow-hidden border border-blue-500/30 bg-white/5">
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
                </div>
              </div>

              {/* Comment Input Section */}
              {activeTab === "comments" && (
                <CommentsForm
                  themeTextColors={themeTextColors}
                  contactContent={contactContent}
                  loading={loading}
                  submitted={submitted}
                  setSubmitted={setSubmitted}
                  formData={formData}
                  setFormData={(next) => setFormData(next)}
                  onSubmit={(data) => addComment(data)}
                />
              )}

              {/* Feedback Section */}
              {activeTab === "feedback" && (
                <FeedbackForm
                  themeTextColors={themeTextColors}
                  feedbackData={feedbackData}
                  setFeedbackData={(next) => setFeedbackData(next)}
                  feedbackLoading={feedbackLoading}
                  feedbackSubmitted={feedbackSubmitted}
                  setFeedbackSubmitted={setFeedbackSubmitted}
                  onSubmit={(data) => addFeedback(data)}
                  dropdownOpen={dropdownOpen}
                  setDropdownOpen={setDropdownOpen}
                />
              )}
            </motion.div>
          </motion.div>

          {/* Comments/Feedback List Section */}
          {activeTab === "comments" && (
            <CommentsList
              contactContent={contactContent}
              loading={loading}
              containerComments={containerComments}
              comments={comments}
              visibleComments={visibleComments}
              formatTimeRelative={formatTimeRelative}
              getDateLabel={getDateLabel}
              showCommentsContainer={showCommentsContainer}
              setShowCommentsContainer={(v) => setShowCommentsContainer(v)}
              hasMoreComments={hasMoreComments}
              isLoadingMoreComments={isLoadingMoreComments}
              loadMoreComments={loadMoreComments}
            />
          )}

          {activeTab === "feedback" && (
            <FeedbackList
              containerFeedback={containerFeedback}
              feedbackItems={feedbackItems}
              visibleFeedback={visibleFeedback}
              getDateLabel={getDateLabel}
              formatTimeRelative={formatTimeRelative}
              showFeedbackContainer={showFeedbackContainer}
              setShowFeedbackContainer={(v) => setShowFeedbackContainer(v)}
              hasMoreFeedback={hasMoreFeedback}
              isLoadingMoreFeedback={isLoadingMoreFeedback}
              loadMoreFeedback={loadMoreFeedback}
            />
          )}
        </div>
      </section>
    </>
  );
}
