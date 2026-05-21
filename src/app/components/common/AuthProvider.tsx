"use client";

import { SessionProvider } from "next-auth/react";
import SessionSync from "@/app/components/common/SessionSync";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider refetchOnWindowFocus>
      <SessionSync />
      {children}
    </SessionProvider>
  );
}
