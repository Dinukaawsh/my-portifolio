"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WelcomeScreen from "@/app/components/common/WelcomeScreen";
import {
  DEFAULT_AFTER_WELCOME,
  getLastPath,
  isWelcomeComplete,
} from "@/lib/welcome";

/**
 * New tab at "/": welcome preloader, then About.
 * Refresh at "/" (same tab): skip welcome, return to last page visited in this tab.
 */
export default function HomePage() {
  const router = useRouter();
  const [phase, setPhase] = useState<"checking" | "welcome" | "redirecting">(
    "checking"
  );

  useEffect(() => {
    if (isWelcomeComplete()) {
      setPhase("redirecting");
      router.replace(getLastPath());
      return;
    }
    setPhase("welcome");
  }, [router]);

  if (phase === "checking" || phase === "redirecting") {
    return null;
  }

  return <WelcomeScreen redirectTo={DEFAULT_AFTER_WELCOME} />;
}
