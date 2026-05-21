import type { Metadata } from "next";
import "./globals.css";
import VisitTracker from "./components/common/VisitTracker";
import AppEntryGate from "./components/common/AppEntryGate";
import { ThemeProvider } from "./contexts/ThemeContext";
import AuthProvider from "./components/common/AuthProvider";

export const metadata: Metadata = {
  title: "Dinuka Wickramarathna - Portfolio",
  description: "Full Stack Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 min-h-screen"
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          <AuthProvider>
            <AppEntryGate />
            <VisitTracker />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
