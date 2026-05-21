import { ALL_SECTIONS } from "@/lib/routes";

export const SESSION_STORAGE_KEY = "portfolio_session_v2";
export const SESSION_REPORTED_KEY = "portfolio_session_reported_v2";

export type SessionPageVisit = {
  path: string;
  label: string;
  at: number;
};

export type PortfolioSession = {
  id: string;
  startedAt: number;
  lastActiveAt: number;
  pages: SessionPageVisit[];
  userAgent: string;
  deviceType: "mobile" | "tablet" | "desktop" | "unknown";
  os: string;
  browser: string;
  user?: {
    name?: string | null;
    email?: string | null;
    provider?: string | null;
  };
};

export type SessionReportPayload = {
  sessionId: string;
  startedAt: number;
  endedAt: number;
  pages: SessionPageVisit[];
  userAgent: string;
  deviceType: PortfolioSession["deviceType"];
  os: string;
  browser: string;
  reason: "leave" | "idle" | "hidden";
  user?: PortfolioSession["user"];
};

export function getPageLabel(pathname: string): string {
  const match = ALL_SECTIONS.find((s) => s.path === pathname);
  if (match) return match.label;
  if (pathname === "/") return "Home";
  if (pathname === "/privacy") return "Privacy";
  return pathname;
}

export function formatDuration(ms: number): string {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes === 0) return `${seconds}s`;
  return `${minutes}m ${seconds}s`;
}

export function formatPageList(pages: SessionPageVisit[]): string {
  const unique = pages.reduce<SessionPageVisit[]>((acc, page) => {
    if (acc.length === 0 || acc[acc.length - 1].path !== page.path) {
      acc.push(page);
    }
    return acc;
  }, []);

  const lines = unique.map((p) => `• ${p.label} (\`${p.path}\`)`);
  if (lines.length <= 12) return lines.join("\n");
  const shown = lines.slice(0, 12).join("\n");
  return `${shown}\n• …and ${lines.length - 12} more`;
}
