"use client";

import { useEffect, useCallback, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function PrivacyPage() {
  const router = useRouter();
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleClose = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    // Set a deterministic, locale-stable date on client to avoid hydration mismatch
    const formatter = new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    });
    setLastUpdated(formatter.format(new Date()));

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

  // Animated starfield background
  useEffect(() => {
    const canvasMaybe = canvasRef.current;
    if (!canvasMaybe) return;
    const ctxMaybe = canvasMaybe.getContext("2d");
    if (!ctxMaybe) return;
    const canvas = canvasMaybe as HTMLCanvasElement;
    const context = ctxMaybe as CanvasRenderingContext2D;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    let devicePixelRatio = Math.max(
      1,
      Math.min(window.devicePixelRatio || 1, 2)
    );
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    type Star = {
      x: number;
      y: number;
      size: number;
      speed: number;
      twinkle: number; // phase offset
      hue: number;
    };

    let stars: Star[] = [];

    function resize() {
      // canvas and context are narrowed above and never reassigned
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      devicePixelRatio = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      // Recreate stars to fit current viewport
      const density = 0.0009; // stars per px^2
      const count = Math.max(80, Math.floor(width * height * density));
      stars = new Array(count).fill(0).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.6 + Math.random() * 1.8,
        speed: 0.06 + Math.random() * 0.18, // slow drift
        twinkle: Math.random() * Math.PI * 2,
        hue: 210 + Math.random() * 60, // cool white/blue range
      }));
    }

    function step(timestamp: number) {
      context.clearRect(0, 0, width, height);

      // subtle parallax drift upward
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Twinkle opacity oscillation
        const alpha = prefersReducedMotion
          ? 0.8
          : 0.6 + 0.4 * Math.sin(timestamp * 0.002 + star.twinkle);

        context.fillStyle = `hsla(${star.hue}, 70%, 90%, ${alpha})`;
        context.beginPath();
        context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        context.fill();

        // Glow
        context.shadowBlur = 8;
        context.shadowColor = `hsla(${star.hue}, 90%, 70%, ${alpha * 0.7})`;
        context.beginPath();
        context.arc(star.x, star.y, star.size * 0.8, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;

        // Update position
        star.y -= star.speed;
        if (star.y < -2) {
          star.y = height + 2;
          star.x = Math.random() * width;
        }
      }

      animationFrameId = requestAnimationFrame(step);
    }

    resize();
    animationFrameId = requestAnimationFrame(step);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="min-h-[100dvh] w-full bg-black text-white relative overflow-hidden">
      {/* Night sky backdrop (no interactive background) */}
      <div className="absolute inset-0 -z-10">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        {/* subtle stars */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,0.9) 0, transparent 50%)," +
              "radial-gradient(1px 1px at 40% 60%, rgba(255,255,255,0.8) 0, transparent 50%)," +
              "radial-gradient(1.5px 1.5px at 70% 20%, rgba(255,255,255,0.7) 0, transparent 50%)," +
              "radial-gradient(1px 1px at 80% 80%, rgba(255,255,255,0.6) 0, transparent 50%)",
            backgroundColor: "#000000",
          }}
        />
        {/* horizon gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black" />
        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.6)_100%)]" />
      </div>

      <div className="mx-auto w-full max-w-screen-md lg:max-w-3xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              Privacy Policy
            </h1>
            <p className="text-xs sm:text-sm text-white/60">
              Last updated: {lastUpdated}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close privacy policy"
            className="inline-flex items-center justify-center rounded-md border border-white/10 bg-white/5 hover:bg-white/10 active:bg-white/15 transition-colors px-3 py-2 text-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="sr-only">Close</span>
          </button>
        </div>

        <section className="mt-8 space-y-6 text-base leading-7">
          <p className="text-white/90">
            This site is my personal portfolio. I only collect the minimum
            information needed to showcase my work, keep the site running
            smoothly, and respond when you reach out.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold mt-6">
            What I Collect
          </h2>
          <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-white/90">
            <li>
              Basic visit analytics (page views, device type, approximate
              region).
            </li>
            <li>
              Details you submit via the contact form (name, email, message).
            </li>
            <li>
              If authentication is enabled in the future, basic profile info
              provided by the provider.
            </li>
          </ul>

          <h2 className="text-lg sm:text-xl font-semibold mt-6">
            How It’s Used
          </h2>
          <ul className="list-disc pl-5 sm:pl-6 space-y-2 text-white/90">
            <li>To improve the portfolio experience and fix issues.</li>
            <li>To reply to messages you send.</li>
            <li>To protect the site from abuse.</li>
          </ul>

          <h2 className="text-lg sm:text-xl font-semibold mt-6">Cookies</h2>
          <p className="text-white/90">
            Cookies or similar storage may be used for session needs and simple
            analytics. You can control cookies in your browser settings.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold mt-6">
            Third‑Party Services
          </h2>
          <p className="text-white/90">
            Some features may rely on third parties (e.g., auth providers or
            analytics). Any data shared with them is governed by their own
            privacy policies.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold mt-6">
            Data Retention
          </h2>
          <p className="text-white/90">
            Personal data is kept only as long as necessary for the purposes
            above or as required by law.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold mt-6">
            Your Choices
          </h2>
          <p className="text-white/90">
            You can request access, correction, or deletion of your personal
            information by contacting me.
          </p>

          <h2 className="text-lg sm:text-xl font-semibold mt-6">Contact</h2>
          <p className="text-white/90">
            For questions about this policy, please use the contact section on
            this site.
          </p>
        </section>
      </div>
    </main>
  );
}
