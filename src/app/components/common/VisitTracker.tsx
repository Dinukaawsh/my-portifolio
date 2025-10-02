"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { sendDiscordNotification } from "@/lib/discord";

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
  else if (/MSIE |Trident\//i.test(ua)) browser = "IE";

  return { deviceType, os, browser } as const;
}

export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Check if this is a new session
    const sessionId = sessionStorage.getItem("portfolioSessionId");
    if (!sessionId) {
      // Generate new session ID
      const newSessionId =
        Date.now().toString() + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem("portfolioSessionId", newSessionId);
    }
  }, []);

  useEffect(() => {
    // Track page visit with rate limiting
    const trackVisit = async () => {
      try {
        // Check if we've already tracked this page recently
        const lastTracked = localStorage.getItem(`lastTracked_${pathname}`);
        const now = Date.now();
        const timeSinceLastTrack =
          now - (lastTracked ? parseInt(lastTracked) : 0);

        // Only track if 5 minutes have passed since last visit to this page
        if (timeSinceLastTrack < 5 * 60 * 1000) {
          return; // Skip tracking
        }

        // Get visitor info (basic)
        const userAgent = navigator.userAgent;
        const { deviceType, os, browser } = parseDeviceInfo(userAgent);
        const timestamp = new Date().toLocaleString();
        const sessionId =
          sessionStorage.getItem("portfolioSessionId") || "unknown";
        const isNewSession = !localStorage.getItem(`session_${sessionId}`);

        // Send Discord notification for visit
        await sendDiscordNotification({
          type: "visit",
          data: {
            visitor: {
              userAgent,
              deviceType,
              os,
              browser,
              timestamp,
              page: pathname,
              sessionId: sessionId.substring(0, 8), // Short version for display
              isNewSession,
            },
          },
        });

        // Mark this session as tracked
        if (isNewSession) {
          localStorage.setItem(`session_${sessionId}`, "true");
        }

        // Mark this page as tracked
        localStorage.setItem(`lastTracked_${pathname}`, now.toString());
      } catch (error) {
        console.error("Failed to track visit:", error);
      }
    };

    // Small delay to avoid immediate notification on page load
    const timer = setTimeout(trackVisit, 2000);

    return () => clearTimeout(timer);
  }, [pathname]);

  // This component doesn't render anything
  return null;
}
