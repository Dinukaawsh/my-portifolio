/** OAuth return URL: stay on the page the user signed in from (e.g. contact). */
export function getAuthCallbackUrl(pathname: string): string {
  if (pathname && pathname !== "/") {
    return pathname;
  }
  return "/contact";
}

export function getSignOutCallbackUrl(pathname: string): string {
  if (pathname.startsWith("/contact")) {
    return "/contact";
  }
  return pathname || "/contact";
}
