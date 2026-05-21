export const WELCOME_SESSION_KEY = "portfolio-welcome-done";
export const LAST_PATH_KEY = "portfolio-last-path";

/** Default landing after welcome on a brand-new tab session */
export const DEFAULT_AFTER_WELCOME = "/about";

export function markWelcomeComplete() {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(WELCOME_SESSION_KEY, "1");
  }
}

export function isWelcomeComplete(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(WELCOME_SESSION_KEY) === "1";
}

export function saveLastPath(pathname: string) {
  if (typeof window === "undefined") return;
  if (!pathname || pathname === "/") return;
  sessionStorage.setItem(LAST_PATH_KEY, pathname);
}

export function getLastPath(): string {
  if (typeof window === "undefined") return DEFAULT_AFTER_WELCOME;
  return sessionStorage.getItem(LAST_PATH_KEY) || DEFAULT_AFTER_WELCOME;
}
