import type { Metadata } from "next";
import "./globals.css";
import VisitTracker from "./components/common/VisitTracker";
import { ThemeProvider } from "./contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Dinuka Wickramarathna - Portfolio",
  description: "Full Stack Developer Portfolio",
};

// TODO: Refactor Navbar to use buttons and accept setActiveSection as a prop. This will be handled after the main logic is set up in page.tsx.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 min-h-screen"
        suppressHydrationWarning={true}
      >
        <ThemeProvider>
          <VisitTracker />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
