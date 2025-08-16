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
  const sectionRef = useRef<HTMLElement>(null);

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
      {/* Flower Background - Fixed */}
      <div className="fixed inset-0 z-0">
        <Flower />
      </div>
      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Header */}
        <div
          className={`text-center mb-8 sm:mb-12 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-3 sm:mb-4 tracking-tight">
            Get In Touch
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-blue-200 max-w-2xl mx-auto px-2">
            Let&apos;s connect and discuss opportunities, collaborations, or
            just have a chat!
          </p>
        </div>

        {/* Contact Card */}
        <div
          className={`w-full max-w-2xl mx-auto transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="bg-gradient-to-br from-gray-900/80 via-blue-900/40 to-gray-900/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-blue-500/30 shadow-2xl shadow-blue-500/20">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight text-white text-center">
              Contact Me
            </h2>
            <p className="text-sm sm:text-base text-gray-300 mb-8 text-center">
              Feel free to reach out for collaborations, opportunities, or just
              to say hi!
            </p>
            {/* Direct Email Contact */}
            <div className="mb-8 text-center">
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-6 border border-blue-500/30">
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-3">
                  📧 Direct Email Contact
                </h3>
                <p className="text-gray-300 text-sm sm:text-base mb-4">
                  Prefer to email directly? Feel free to reach out at:
                </p>
                <a
                  href="mailto:dinukaaw.sh2@gmail.com"
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
                  dinukaaw.sh2@gmail.com
                </a>
              </div>
            </div>

            {/* Contact Form */}
            {submitted ? (
              <div className="text-center py-8">
                <div className="text-green-400 font-semibold text-lg mb-2">
                  ✨ Thank you for your feedback!
                </div>
                <p className="text-gray-300 text-sm">
                  Your comment has been added to the comments section below.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 transition-all duration-200"
                >
                  Add Another Comment
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
                  placeholder="Your Name"
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
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="rounded-xl px-4 py-3 bg-white/10 border border-blue-500/30 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-gray-400 transition-all duration-200"
                />
                <textarea
                  name="message"
                  required
                  placeholder="Your Message/Comment"
                  rows={4}
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
                  {loading ? "Adding Comment..." : "Add Comment"}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div
          className={`w-full max-w-4xl mx-auto mt-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              💬 Community Comments
            </h2>
            <p className="text-blue-200 text-sm sm:text-base">
              See what others are saying about my work
            </p>
          </div>

          {comments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">🌟</div>
              <p className="text-gray-400 text-sm sm:text-base">
                Be the first to leave a comment!
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
        </div>
      </div>
    </section>
  );
}
