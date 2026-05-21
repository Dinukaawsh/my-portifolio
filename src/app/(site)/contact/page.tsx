import type { Metadata } from "next";
import Contact from "@/app/components/pages/contacts/contact";

export const metadata: Metadata = {
  title: "Contact | Dinuka Wickramarathna",
  description: "Get in touch for collaborations and opportunities.",
};

export default function ContactPage() {
  return <Contact />;
}
