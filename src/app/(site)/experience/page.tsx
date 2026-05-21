import type { Metadata } from "next";
import Experience from "@/app/components/pages/experience/experience";

export const metadata: Metadata = {
  title: "Experience | Dinuka Wickramarathna",
  description: "Professional work experience.",
};

export default function ExperiencePage() {
  return <Experience />;
}
