import type { Metadata } from "next";
import { SERVICES, SITE_URL, BRAND } from "@/lib/data";
import { pageMeta, graphSchema, servicePageSchema, faqSchema, breadcrumbSchema, speakableSchema } from "@/lib/seo";
import ServicePageClient from "./ServicePageClient";

const s = SERVICES.find((x) => x.slug === "wedding-chauffeur")!;

export const metadata: Metadata = pageMeta({
  title: `${s.seoTitle} | ${BRAND}`,
  description: s.seoDescription,
  path: `/services/${s.slug}/`,
  keywords: [
    `${s.title} Vancouver`,
    `luxury ${s.title.toLowerCase()} Vancouver`,
    "luxury chauffeur service Vancouver",
    "Seven Star Chauffeurs",
  ],
});

export default function Page() {
  const schema = graphSchema(
    servicePageSchema({
      name: s.title,
      description: s.longDescription,
      url: `${SITE_URL}/services/${s.slug}/`,
      image: s.image,
      areaServed: ["Vancouver", "West Vancouver", "North Vancouver", "Burnaby", "Richmond", "Surrey", "Langley", "White Rock", "Whistler"],
    }),
    faqSchema(s.faq),
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Services", url: `${SITE_URL}/#services` },
      { name: s.title, url: `${SITE_URL}/services/${s.slug}/` },
    ]),
    speakableSchema(["#speakable-heading", "#speakable-description"])
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <ServicePageClient />
    </>
  );
}
