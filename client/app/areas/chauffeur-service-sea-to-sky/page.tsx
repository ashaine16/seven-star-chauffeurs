import type { Metadata } from "next";
import { AREAS, SITE_URL, BRAND } from "@/lib/data";
import { pageMeta, graphSchema, localBusinessSchema, breadcrumbSchema, speakableSchema } from "@/lib/seo";
import AreaPageClient from "./AreaPageClient";

const a = AREAS.find((x) => x.slug === "chauffeur-service-sea-to-sky")!;

export const metadata: Metadata = pageMeta({
  title: `${a.seoTitle} | ${BRAND}`,
  description: a.seoDescription,
  path: `/areas/${a.slug}/`,
  keywords: [
    `luxury chauffeur ${a.city}`,
    `chauffeur service ${a.city}`,
    `car service ${a.city}`,
    `private driver ${a.city}`,
    "Seven Star Chauffeurs",
  ],
});

export default function Page() {
  const schema = graphSchema(
    localBusinessSchema({ city: a.city, lat: a.lat, lng: a.lng }),
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Areas Served", url: `${SITE_URL}/areas/` },
      { name: a.city, url: `${SITE_URL}/areas/${a.slug}/` },
    ]),
    speakableSchema(["#speakable-heading", "#speakable-description"])
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <AreaPageClient />
    </>
  );
}
