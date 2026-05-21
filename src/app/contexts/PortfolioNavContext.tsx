"use client";

import { createContext, useContext, useCallback, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { sectionPath, type SectionKey } from "@/lib/routes";

type PortfolioNavContextValue = {
  navigateToSection: (key: SectionKey | string) => void;
};

const PortfolioNavContext = createContext<PortfolioNavContextValue | null>(
  null
);

export function PortfolioNavProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const navigateToSection = useCallback(
    (key: SectionKey | string) => {
      router.push(sectionPath(key));
    },
    [router]
  );

  return (
    <PortfolioNavContext.Provider value={{ navigateToSection }}>
      {children}
    </PortfolioNavContext.Provider>
  );
}

export function usePortfolioNav() {
  const ctx = useContext(PortfolioNavContext);
  if (!ctx) {
    throw new Error("usePortfolioNav must be used within PortfolioNavProvider");
  }
  return ctx;
}

/** Optional hook for components that support both legacy props and routing */
export function useSectionNavigator(
  setActiveSection?: (key: string) => void
) {
  const router = useRouter();
  return useCallback(
    (key: string) => {
      if (setActiveSection) {
        setActiveSection(key);
        return;
      }
      router.push(sectionPath(key));
    },
    [setActiveSection, router]
  );
}
