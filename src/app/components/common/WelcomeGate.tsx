"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "portfolio-welcome-seen";

export default function WelcomeGate() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    setVisible(true);
    const fullName = "DINUKA WICKRAMARATHNA";
    let index = 0;

    const typeTimer = window.setInterval(() => {
      index += 1;
      setName(fullName.slice(0, index));
      if (index >= fullName.length) {
        window.clearInterval(typeTimer);
        window.setTimeout(() => {
          sessionStorage.setItem(STORAGE_KEY, "1");
          setVisible(false);
          router.refresh();
        }, 600);
      }
    }, 70);

    return () => window.clearInterval(typeTimer);
  }, [router]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/95 backdrop-blur-sm">
      <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-6">
        Portfolio
      </p>
      <h1 className="text-center text-2xl sm:text-4xl font-semibold tracking-tight text-white px-6">
        {name}
        <span className="inline-block w-[2px] h-[1em] bg-blue-400 ml-1 animate-pulse align-middle" />
      </h1>
      <p className="mt-4 text-sm text-slate-400">Loading experience…</p>
    </div>
  );
}
