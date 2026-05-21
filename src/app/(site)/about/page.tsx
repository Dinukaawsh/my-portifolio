import type { Metadata } from "next";
import About from "@/app/components/pages/about/about";

export const metadata: Metadata = {
  title: "About | Dinuka Wickramarathna",
  description: "Full stack developer — background, skills, and profile.",
};

export default function AboutPage() {
  return <About />;
}
