/* ── Seven Star Chauffeurs — SEO Utilities ── */

import type { Metadata } from "next";
import { SITE_URL, BRAND, PHONE_RAW, EMAIL } from "./data";

/** Generate page-level metadata for any sub-page */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  keywords?: string[];
}): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    keywords: opts.keywords,
    openGraph: {
      type: "website",
      locale: "en_CA",
      url,
      siteName: BRAND,
      title: `${opts.title} | ${BRAND}`,
      description: opts.description,
      images: [
        {
          url: opts.ogImage || `${SITE_URL}/og/default.webp`,
          width: 1200,
          height: 630,
          alt: opts.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${opts.title} | ${BRAND}`,
      description: opts.description,
      images: [opts.ogImage || `${SITE_URL}/og/default.webp`],
    },
  };
}

/** BreadcrumbList JSON-LD */
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Vehicle / Product JSON-LD */
export function vehicleSchema(v: {
  name: string;
  manufacturer: string;
  model: string;
  description: string;
  image: string;
  engineSpec: string;
  seatingCapacity: number;
  url: string;
}) {
  return {
    "@type": "Vehicle",
    name: v.name,
    manufacturer: { "@type": "Organization", name: v.manufacturer },
    model: v.model,
    description: v.description,
    image: `${SITE_URL}${v.image}`,
    vehicleEngine: { "@type": "EngineSpecification", name: v.engineSpec },
    seatingCapacity: v.seatingCapacity,
    url: v.url,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "CAD",
      seller: { "@id": `${SITE_URL}#organization` },
    },
  };
}

/** Service page JSON-LD */
export function servicePageSchema(s: {
  name: string;
  description: string;
  url: string;
  image: string;
  areaServed?: string[];
}) {
  return {
    "@type": "Service",
    name: s.name,
    description: s.description,
    url: s.url,
    image: `${SITE_URL}${s.image}`,
    provider: { "@id": `${SITE_URL}#organization` },
    areaServed: (s.areaServed || ["Vancouver", "Whistler", "Metro Vancouver"]).map(
      (city) => ({ "@type": "City", name: city })
    ),
  };
}

/** FAQ page JSON-LD */
export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** LocalBusiness JSON-LD for area pages */
export function localBusinessSchema(area: {
  city: string;
  lat: number;
  lng: number;
}) {
  return {
    "@type": ["TaxiService", "LocalBusiness"],
    "@id": `${SITE_URL}#business`,
    name: BRAND,
    image: `${SITE_URL}/logos/seven-star-gold.webp`,
    url: SITE_URL,
    telephone: `+1-604-000-0000`,
    email: EMAIL,
    priceRange: "$$$$",
    currenciesAccepted: "CAD",
    address: {
      "@type": "PostalAddress",
      addressLocality: area.city,
      addressRegion: "BC",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: area.lat,
      longitude: area.lng,
    },
    areaServed: { "@type": "City", name: area.city },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "00:00",
        closes: "23:59",
      },
    ],
  };
}

/** Speakable schema for key content */
export function speakableSchema(cssSelectors: string[]) {
  return {
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
}

/** Wrap multiple schema items in @graph */
export function graphSchema(...items: Record<string, unknown>[]) {
  return {
    "@context": "https://schema.org",
    "@graph": items,
  };
}
