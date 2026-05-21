import Navbar from "@/app/components/layouts/navbar/Navbar";
import WelcomeGate from "@/app/components/common/WelcomeGate";
import { PortfolioNavProvider } from "@/app/contexts/PortfolioNavContext";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PortfolioNavProvider>
      <WelcomeGate />
      <div className="site-shell min-h-screen flex flex-col">
        <Navbar />
        <main className="relative flex-1 w-full min-h-0">{children}</main>
      </div>
    </PortfolioNavProvider>
  );
}
