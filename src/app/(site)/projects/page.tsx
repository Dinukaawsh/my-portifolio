import type { Metadata } from "next";
import Projects from "@/app/components/pages/projects/projects";

export const metadata: Metadata = {
  title: "Projects | Dinuka Wickramarathna",
  description: "Selected software projects and case studies.",
};

export default function ProjectsPage() {
  return <Projects />;
}
