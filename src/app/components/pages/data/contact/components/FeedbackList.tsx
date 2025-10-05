import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Timestamp } from "firebase/firestore";

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

interface FeedbackListProps {
  containerFeedback: Feedback[];
  feedbackItems: Feedback[];
  visibleFeedback: Feedback[];
  getDateLabel: (ts?: Timestamp) => string;
  formatTimeRelative: (ts?: Timestamp) => string;
  showFeedbackContainer: boolean;
  setShowFeedbackContainer: (v: boolean) => void;
  hasMoreFeedback: boolean;
  isLoadingMoreFeedback: boolean;
  loadMoreFeedback: () => void;
}

export default function FeedbackList({
  containerFeedback,
  feedbackItems,
  visibleFeedback,
  getDateLabel,
  formatTimeRelative,
  showFeedbackContainer,
  setShowFeedbackContainer,
  hasMoreFeedback,
  isLoadingMoreFeedback,
  loadMoreFeedback,
}: FeedbackListProps) {
  return (
    <motion.div
      className="w-full max-w-4xl mx-auto mt-12"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7 }}
    >
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
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
          animate={{ color: ["#93c5fd", "#60a5fa", "#93c5fd"] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Authenticated feedback from users with profile pictures.
        </motion.p>
      </motion.div>

      {showFeedbackContainer ? (
        <motion.div
          className="bg-gradient-to-br from-gray-900/60 via-blue-900/20 to-gray-900/60 backdrop-blur-xl rounded-2xl border border-blue-500/20 shadow-lg shadow-blue-500/10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
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

          <div className="max-h-96 overflow-y-auto custom-scrollbar">
            {containerFeedback.length === 0 ? (
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
        <div className="grid gap-4">
          {visibleFeedback.reduce<React.ReactElement[]>(
            (acc, item, idx, arr) => {
              const prev = idx > 0 ? arr[idx - 1] : null;
              const showHeader =
                !prev ||
                getDateLabel(prev.timestamp) !== getDateLabel(item.timestamp);
              if (showHeader) {
                acc.push(
                  <div key={`feedback-full-header-${item.id}`} className="pt-2">
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
  );
}
