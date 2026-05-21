import type { Metadata } from "next";
import Education from "@/app/components/pages/education/education";

export const metadata: Metadata = {
  title: "Education | Dinuka Wickramarathna",
  description: "Academic background and qualifications.",
};

export default function EducationPage() {
  return <Education />;
}
