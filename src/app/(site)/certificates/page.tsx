import type { Metadata } from "next";
import Certificates from "@/app/components/pages/certificates/certificates";

export const metadata: Metadata = {
  title: "Certificates | Dinuka Wickramarathna",
  description: "Certifications and credentials.",
};

export default function CertificatesPage() {
  return <Certificates />;
}
