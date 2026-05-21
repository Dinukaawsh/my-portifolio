"use client";

import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import type { IconType } from "react-icons";

type ProviderId = "google" | "github" | "linkedin" | "facebook";

const PROVIDERS: {
  id: ProviderId;
  label: string;
  icon: IconType;
  className: string;
}[] = [
  {
    id: "google",
    label: "Google",
    icon: FaGoogle,
    className:
      "bg-white text-gray-800 hover:bg-gray-100 border border-gray-200/80",
  },
  {
    id: "github",
    label: "GitHub",
    icon: FaGithub,
    className:
      "bg-gray-800 text-white hover:bg-gray-700 border border-gray-600/50",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: FaLinkedin,
    className:
      "bg-[#0A66C2] text-white hover:bg-[#004182] border border-[#0A66C2]/80",
  },
  {
    id: "facebook",
    label: "Facebook",
    icon: FaFacebook,
    className:
      "bg-[#1877F2] text-white hover:bg-[#166FE5] border border-[#1877F2]/80",
  },
];

const buttonBase =
  "flex w-full min-w-0 items-center justify-center gap-2.5 rounded-xl px-4 py-3.5 min-h-[3rem] text-sm font-semibold shadow-md transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.98]";

type SocialAuthButtonsProps = {
  callbackUrl: string;
};

export default function SocialAuthButtons({
  callbackUrl,
}: SocialAuthButtonsProps) {
  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-3">
        {PROVIDERS.map(({ id, label, icon: Icon, className }) => (
          <button
            key={id}
            type="button"
            onClick={() => signIn(id, { callbackUrl })}
            className={`${buttonBase} ${className}`}
            aria-label={`Sign in with ${label}`}
          >
            <Icon className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" aria-hidden />
            <span className="truncate">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
