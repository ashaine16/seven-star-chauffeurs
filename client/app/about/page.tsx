import type { Metadata } from "next";
import { BRAND, SITE_URL } from "@/lib/data";
import { pageMeta, graphSchema, breadcrumbSchema, speakableSchema } from "@/lib/seo";
import AboutClient from "./AboutClient";

export const metadata: Metadata = pageMeta({
  title: `About | ${BRAND}`,
  description: `About Seven Star Chauffeurs — Vancouver's most exclusive luxury chauffeur service. Rolls-Royce, Maybach, and Escalade IQ fleet. By appointment only.`,
  path: "/about/",
  keywords: ["about Seven Star Chauffeurs", "luxury chauffeur Vancouver", "Vancouver car service", "private driver Vancouver"],
});

export default function Page() {
  const schema = graphSchema(
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: BRAND,
      url: SITE_URL,
      logo: `${SITE_URL}/logos/seven-star-gold.webp`,
      description: "Seven Star Chauffeurs is Vancouver's most exclusive luxury chauffeur service, operating a fleet of Rolls-Royce, Mercedes-Maybach, and Cadillac vehicles. By appointment only.",
      areaServed: [
        { "@type": "City", name: "Vancouver" },
        { "@type": "City", name: "West Vancouver" },
        { "@type": "City", name: "North Vancouver" },
        { "@type": "City", name: "Burnaby" },
        { "@type": "City", name: "Richmond" },
        { "@type": "City", name: "Surrey" },
        { "@type": "City", name: "Langley" },
        { "@type": "City", name: "White Rock" },
        { "@type": "City", name: "Whistler" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-604-000-0000",
        contactType: "reservations",
        availableLanguage: ["English"],
      },
    },
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "About", url: `${SITE_URL}/about/` },
    ]),
    speakableSchema(["#speakable-heading", "#speakable-description"])
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <AboutClient />
    </>
  );
}
