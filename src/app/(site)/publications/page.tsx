import type { Metadata } from "next";
import Publications from "@/app/components/pages/publications/publications";

export const metadata: Metadata = {
  title: "Publications | Dinuka Wickramarathna",
  description: "Research and published work.",
};

export default function PublicationsPage() {
  return <Publications />;
}
