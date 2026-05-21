"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { markWelcomeComplete } from "@/lib/welcome";

const FULL_NAME = "DINUKA WICKRAMARATHNA";

type WelcomeScreenProps = {
  redirectTo?: string;
};

export default function WelcomeScreen({
  redirectTo = "/about",
}: WelcomeScreenProps) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    const typeTimer = window.setInterval(() => {
      index += 1;
      setName(FULL_NAME.slice(0, index));
      if (index >= FULL_NAME.length) {
        window.clearInterval(typeTimer);
        window.setTimeout(() => {
          setDone(true);
          markWelcomeComplete();
          router.replace(redirectTo);
        }, 700);
      }
    }, 70);

    return () => window.clearInterval(typeTimer);
  }, [router, redirectTo]);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-slate-950">
      <p className="text-xs uppercase tracking-[0.35em] text-slate-400 mb-6">
        Portfolio
      </p>
      <h1 className="text-center text-2xl sm:text-4xl font-semibold tracking-tight text-white px-6">
        {name}
        {!done && (
          <span className="inline-block w-[2px] h-[1em] bg-blue-400 ml-1 animate-pulse align-middle" />
        )}
      </h1>
      <p className="mt-4 text-sm text-slate-400">
        {done ? "Welcome!" : "Loading experience…"}
      </p>
    </div>
  );
}
