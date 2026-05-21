"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  SESSION_STORAGE_KEY,
  SESSION_REPORTED_KEY,
  getPageLabel,
  type PortfolioSession,
  type SessionReportPayload,
} from "@/lib/session-analytics";

const IDLE_MS = 15 * 60 * 1000;
const HIDDEN_FLUSH_MS = 45 * 1000;

function parseDeviceInfo(userAgent: string) {
  const ua = userAgent || "";
  const isMobile = /Android|iPhone|iPod/i.test(ua);
  const isTablet =
    /iPad|Tablet/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua));
  const deviceType = isMobile
    ? "mobile"
    : isTablet
      ? "tablet"
      : /Mobi|Mobile/i.test(ua)
        ? "mobile"
        : "desktop";

  let os = "unknown";
  if (/Windows NT/i.test(ua)) os = "Windows";
  else if (/Mac OS X/i.test(ua))
    os = /iPhone|iPad|iPod/i.test(ua) ? "iOS" : "macOS";
  else if (/Android/i.test(ua)) os = "Android";
  else if (/Linux/i.test(ua)) os = "Linux";

  let browser = "unknown";
  if (/Edg\//i.test(ua)) browser = "Edge";
  else if (/OPR\//i.test(ua) || /Opera/i.test(ua)) browser = "Opera";
  else if (/Chrome\//i.test(ua)) browser = "Chrome";
  else if (/Safari\//i.test(ua) && /Version\//i.test(ua)) browser = "Safari";
  else if (/Firefox\//i.test(ua)) browser = "Firefox";

  return { deviceType, os, browser } as const;
}

function createSessionId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

function readSession(): PortfolioSession | null {
  try {
    const raw = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PortfolioSession;
  } catch {
    return null;
  }
}

function writeSession(session: PortfolioSession) {
  sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export default function VisitTracker() {
  const pathname = usePathname();
  const { data: authSession } = useSession();
  const flushingRef = useRef(false);
  const hiddenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const getOrCreateSession = useCallback((): PortfolioSession => {
    const existing = readSession();
    const { deviceType, os, browser } = parseDeviceInfo(navigator.userAgent);
    const now = Date.now();

    const user = authSession?.user
      ? {
          name: authSession.user.name,
          email: authSession.user.email,
          provider: (authSession as { provider?: string }).provider,
        }
      : undefined;

    if (existing) {
      existing.lastActiveAt = now;
      if (user) existing.user = user;
      writeSession(existing);
      return existing;
    }

    const fresh: PortfolioSession = {
      id: createSessionId(),
      startedAt: now,
      lastActiveAt: now,
      pages: [],
      userAgent: navigator.userAgent,
      deviceType,
      os,
      browser,
      user,
    };
    writeSession(fresh);
    sessionStorage.removeItem(SESSION_REPORTED_KEY);
    return fresh;
  }, [authSession]);

  const recordPage = useCallback(
    (path: string) => {
      const session = getOrCreateSession();
      const last = session.pages[session.pages.length - 1];
      if (!last || last.path !== path) {
        session.pages.push({
          path,
          label: getPageLabel(path),
          at: Date.now(),
        });
      }
      session.lastActiveAt = Date.now();
      writeSession(session);
    },
    [getOrCreateSession]
  );

  const flushSession = useCallback(
    async (reason: SessionReportPayload["reason"]) => {
      if (flushingRef.current) return;

      const session = readSession();
      if (!session || session.pages.length === 0) return;

      if (sessionStorage.getItem(SESSION_REPORTED_KEY) === session.id) {
        return;
      }

      flushingRef.current = true;

      const payload: SessionReportPayload = {
        sessionId: session.id,
        startedAt: session.startedAt,
        endedAt: Date.now(),
        pages: session.pages,
        userAgent: session.userAgent,
        deviceType: session.deviceType,
        os: session.os,
        browser: session.browser,
        reason,
        user: session.user,
      };

      const body = JSON.stringify(payload);

      try {
        if (navigator.sendBeacon) {
          const blob = new Blob([body], { type: "application/json" });
          navigator.sendBeacon("/api/analytics/session", blob);
        } else {
          await fetch("/api/analytics/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
            keepalive: true,
          });
        }
        sessionStorage.setItem(SESSION_REPORTED_KEY, session.id);
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
      } catch (error) {
        console.error("Failed to report session:", error);
      } finally {
        flushingRef.current = false;
      }
    },
    []
  );

  const resetIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      void flushSession("idle");
    }, IDLE_MS);
  }, [flushSession]);

  useEffect(() => {
    recordPage(pathname);
    resetIdleTimer();
  }, [pathname, recordPage, resetIdleTimer]);

  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        hiddenTimerRef.current = setTimeout(() => {
          void flushSession("hidden");
        }, HIDDEN_FLUSH_MS);
      } else {
        if (hiddenTimerRef.current) {
          clearTimeout(hiddenTimerRef.current);
          hiddenTimerRef.current = null;
        }
        resetIdleTimer();
      }
    };

    const onPageHide = () => {
      void flushSession("leave");
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onPageHide);

    resetIdleTimer();

    return () => {
      if (hiddenTimerRef.current) clearTimeout(hiddenTimerRef.current);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onPageHide);
    };
  }, [flushSession, resetIdleTimer]);

  return null;
}
