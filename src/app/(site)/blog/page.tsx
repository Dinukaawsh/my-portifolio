import type { Metadata } from "next";
import Blog from "@/app/components/pages/blogs/blog";

export const metadata: Metadata = {
  title: "Blog | Dinuka Wickramarathna",
  description: "Articles and writing.",
};

export default function BlogPage() {
  return <Blog />;
}
