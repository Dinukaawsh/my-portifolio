"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, X } from "lucide-react";
import type { Session } from "next-auth";

interface SignOutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  session: Session | null;
  loading?: boolean;
}

export default function SignOutConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  session,
  loading = false,
}: SignOutConfirmModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={loading ? undefined : onClose}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="signout-dialog-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              onClick={(e) => e.stopPropagation()}
              className="pointer-events-auto w-full max-w-md rounded-2xl border border-amber-500/25 bg-gradient-to-br from-gray-900/98 via-slate-900/95 to-gray-900/98 p-6 shadow-2xl shadow-amber-500/10"
            >
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 border border-amber-400/30">
                  <LogOut className="h-5 w-5 text-amber-400" />
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white disabled:opacity-50"
                  aria-label="Close"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <h2
                id="signout-dialog-title"
                className="text-xl font-bold text-white mb-2"
              >
                Sign out?
              </h2>
              <p className="text-sm text-gray-400 mb-5 leading-relaxed">
                You will need to sign in again to submit feedback. Your session
                on this device will end.
              </p>

              {session?.user && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt=""
                      width={40}
                      height={40}
                      className="h-10 w-10 shrink-0 rounded-full border border-green-400/50"
                    />
                  ) : (
                    <div className="h-10 w-10 shrink-0 rounded-full bg-green-500/20 border border-green-400/40" />
                  )}
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-white">
                      {session.user.name}
                    </p>
                    <p className="truncate text-xs text-gray-400">
                      {session.user.email}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={loading}
                  className="rounded-xl border border-white/15 px-5 py-2.5 text-sm font-medium text-gray-200 transition-colors hover:bg-white/10 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => void onConfirm()}
                  disabled={loading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-500/25 transition-opacity hover:opacity-95 disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      Signing out…
                    </>
                  ) : (
                    <>
                      <LogOut className="h-4 w-4" />
                      Sign out
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
