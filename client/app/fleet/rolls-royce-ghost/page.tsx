import type { Metadata } from "next";
import { VEHICLES, SITE_URL, BRAND } from "@/lib/data";
import { pageMeta, graphSchema, vehicleSchema, breadcrumbSchema, speakableSchema } from "@/lib/seo";
import VehiclePageClient from "./VehiclePageClient";

const v = VEHICLES.find((x) => x.slug === "rolls-royce-ghost")!;

export const metadata: Metadata = pageMeta({
  title: `${v.seoTitle} | ${BRAND}`,
  description: v.seoDescription,
  path: `/fleet/${v.slug}/`,
  keywords: [
    `${v.fullName} chauffeur Vancouver`,
    `hire ${v.fullName} Vancouver`,
    "luxury car service Vancouver",
    "luxury chauffeur Vancouver",
    "Seven Star Chauffeurs",
  ],
});

export default function Page() {
  const schema = graphSchema(
    vehicleSchema({
      name: v.fullName,
      manufacturer: v.make,
      model: v.model,
      description: v.longDescription,
      image: v.image,
      engineSpec: v.engineSpec,
      seatingCapacity: v.seatingCapacity,
      url: `${SITE_URL}/fleet/${v.slug}/`,
    }),
    breadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Fleet", url: `${SITE_URL}/#fleet` },
      { name: v.fullName, url: `${SITE_URL}/fleet/${v.slug}/` },
    ]),
    speakableSchema(["#speakable-heading", "#speakable-description"])
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <VehiclePageClient />
    </>
  );
}
