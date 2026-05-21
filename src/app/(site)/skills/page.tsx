import type { Metadata } from "next";
import Skills from "@/app/components/pages/skills/skills";

export const metadata: Metadata = {
  title: "Skills | Dinuka Wickramarathna",
  description: "Technical skills and tooling.",
};

export default function SkillsPage() {
  return <Skills />;
}
