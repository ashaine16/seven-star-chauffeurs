import type { Metadata } from "next";
import { BRAND } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import LegalPageClient from "./LegalPageClient";

export const metadata: Metadata = pageMeta({
  title: `Terms of Service | ${BRAND}`,
  description: `${BRAND} Terms of Service. Terms and conditions governing the use of our luxury chauffeur services in Vancouver and British Columbia.`,
  path: "/terms-of-service/",
});

export default function Page() {
  return <LegalPageClient />;
}
