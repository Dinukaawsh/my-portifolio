"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

/**
 * Keeps client session in sync after OAuth redirect / sign-out without a manual refresh.
 */
export default function SessionSync() {
  const { update, status } = useSession();
  const router = useRouter();
  const didMount = useRef(false);

  const syncSession = async () => {
    await update();
    router.refresh();
  };

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      void syncSession();
      return;
    }
    if (status === "loading") {
      void update();
    }
  }, [status, update, router]);

  useEffect(() => {
    const onFocus = () => void syncSession();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, [update, router]);

  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (event.persisted) void syncSession();
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, [update, router]);

  return null;
}
