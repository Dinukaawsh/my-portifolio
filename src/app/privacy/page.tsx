"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

export default function PrivacyPage() {
  const router = useRouter();
  const [lastUpdated, setLastUpdated] = useState<string>("");

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

  return (
    <main className="mx-auto w-full max-w-screen-md lg:max-w-3xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
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

      <section className="mt-8 space-y-4 text-base leading-7 text-white">
        <p>
          We respect your privacy. This website collects only the information
          necessary to provide and improve the user experience.
        </p>

        <h2 className="text-lg sm:text-xl font-semibold mt-6">
          Information We Collect
        </h2>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2">
          <li>Basic analytics such as page views and visit duration.</li>
          <li>Voluntary information you submit via contact forms.</li>
          <li>
            OAuth profile basics when you sign in (name, email, avatar), handled
            by NextAuth.
          </li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold mt-6">
          How We Use Information
        </h2>
        <ul className="list-disc pl-5 sm:pl-6 space-y-2">
          <li>To operate and improve the site’s features and performance.</li>
          <li>To respond to your inquiries when you contact us.</li>
          <li>To prevent abuse and ensure service integrity.</li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold mt-6">Cookies</h2>
        <p>
          We may use cookies or similar technologies for session management and
          basic analytics. You can control cookies through your browser
          settings.
        </p>

        <h2 className="text-lg sm:text-xl font-semibold mt-6">
          Third-Party Services
        </h2>
        <p>
          Authentication is provided by third-party identity providers via
          NextAuth. Any data you share with those providers is subject to their
          privacy policies.
        </p>

        <h2 className="text-lg sm:text-xl font-semibold mt-6">
          Data Retention
        </h2>
        <p>
          We retain personal data only as long as necessary for the purposes
          outlined here or as required by law.
        </p>

        <h2 className="text-lg sm:text-xl font-semibold mt-6">Your Rights</h2>
        <p>
          You may request access, correction, or deletion of your personal
          information by contacting us.
        </p>

        <h2 className="text-lg sm:text-xl font-semibold mt-6">Contact</h2>
        <p>
          If you have questions about this policy, please contact us via the
          email listed in the site footer.
        </p>
      </section>
    </main>
  );
}
