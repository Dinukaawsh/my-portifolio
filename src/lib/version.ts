// Version utility - reads version from package.json
// This allows the app to display its version number

export const getVersion = (): string => {
  // In Next.js, we can access package.json version at build time
  // For client-side, we use a public env variable
  if (typeof window !== "undefined") {
    // Client-side: use public env variable
    return process.env.NEXT_PUBLIC_APP_VERSION || "0.1.0";
  }

  // Server-side: try to read from package.json
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const packageJson = require("../../package.json");
    return packageJson.version || "0.1.0";
  } catch {
    return process.env.NEXT_PUBLIC_APP_VERSION || "0.1.0";
  }
};

// Format version with 'v' prefix
export const getFormattedVersion = (): string => {
  const version = getVersion();
  return version.startsWith("v") ? version : `v${version}`;
};
