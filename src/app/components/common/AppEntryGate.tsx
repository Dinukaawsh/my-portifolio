"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import WelcomeScreen from "@/app/components/common/WelcomeScreen";
import {
  DEFAULT_AFTER_WELCOME,
  isWelcomeComplete,
  saveLastPath,
} from "@/lib/welcome";

/**
 * New browser tab on any route except "/": welcome once, then About.
 * Refresh in the same tab: welcome already done → stay on current page.
 */
export default function AppEntryGate() {
  const pathname = usePathname();
  const [showWelcome, setShowWelcome] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    saveLastPath(pathname);
  }, [pathname]);

  useEffect(() => {
    setReady(true);
    if (pathname === "/") {
      setShowWelcome(false);
      return;
    }
    setShowWelcome(!isWelcomeComplete());
  }, [pathname]);

  if (!ready || !showWelcome) {
    return null;
  }

  return <WelcomeScreen redirectTo={DEFAULT_AFTER_WELCOME} />;
}
