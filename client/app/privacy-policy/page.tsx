import type { Metadata } from "next";
import { BRAND, SITE_URL, EMAIL } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import LegalPageClient from "./LegalPageClient";

export const metadata: Metadata = pageMeta({
  title: `Privacy Policy | ${BRAND}`,
  description: `${BRAND} Privacy Policy. How we collect, use, and protect your personal information when you use our luxury chauffeur services in Vancouver.`,
  path: "/privacy-policy/",
});

export default function Page() {
  return <LegalPageClient />;
}
