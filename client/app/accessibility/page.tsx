import type { Metadata } from "next";
import { BRAND } from "@/lib/data";
import { pageMeta } from "@/lib/seo";
import AccessibilityClient from "./AccessibilityClient";

export const metadata: Metadata = pageMeta({
  title: `Accessibility | ${BRAND}`,
  description: `${BRAND} accessibility statement. Our commitment to making our luxury chauffeur services and website accessible to all users.`,
  path: "/accessibility/",
});

export default function Page() {
  return <AccessibilityClient />;
}
