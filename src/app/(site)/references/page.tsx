import type { Metadata } from "next";
import References from "@/app/components/pages/references/references";

export const metadata: Metadata = {
  title: "References | Dinuka Wickramarathna",
  description: "Professional references.",
};

export default function ReferencesPage() {
  return <References />;
}
