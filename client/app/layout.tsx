import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL = "https://sevenstarchauffeurs.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Seven Star Chauffeurs — Vancouver's Premier Luxury Chauffeur Service",
    template: "%s | Seven Star Chauffeurs",
  },
  description:
    "Vancouver's most discreet private chauffeur service. Rolls-Royce Phantom, Ghost, Cullinan Black Badge, Mercedes-Maybach GLS 600, Cadillac Escalade IQ, and a private luxury touring coach. By invitation, one engagement at a time.",
  keywords: [
    "Vancouver luxury chauffeur",
    "Rolls-Royce Phantom chauffeur Vancouver",
    "private chauffeur Vancouver",
    "YVR airport chauffeur",
    "wedding chauffeur Vancouver",
    "Whistler chauffeur service",
    "corporate chauffeur Vancouver",
    "Maybach chauffeur Vancouver",
    "Cadillac Escalade IQ chauffeur",
    "luxury party bus Vancouver",
  ],
  authors: [{ name: "Seven Star Chauffeurs" }],
  creator: "Seven Star Chauffeurs",
  publisher: "Seven Star Chauffeurs",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_CA",
    url: SITE_URL,
    siteName: "Seven Star Chauffeurs",
    title: "Seven Star Chauffeurs — Vancouver's Premier Luxury Chauffeur Service",
    description:
      "Rolls-Royce, Maybach, Escalade IQ. Vancouver's most discreet and exceptional chauffeur service. By invitation.",
    images: [
      {
        url: "/logos/seven-star-gold.webp",
        width: 520,
        height: 520,
        alt: "Seven Star Chauffeurs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Seven Star Chauffeurs",
    description:
      "Vancouver's most discreet private chauffeur service. By invitation.",
    images: ["/logos/seven-star-gold.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/logos/seven-star-mark.webp", type: "image/webp" },
    ],
    shortcut: "/logos/seven-star-mark.webp",
    apple: "/logos/seven-star-mark.webp",
  },
  category: "transportation",
  other: {
    "theme-color": "#050505",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
  colorScheme: "dark",
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}#organization`,
      name: "Seven Star Chauffeurs",
      alternateName: "Seven Star",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logos/seven-star-gold.webp`,
        width: 520,
        height: 520,
      },
      slogan: "Discretion, driven.",
      description:
        "Vancouver's most discreet private chauffeur service. Rolls-Royce Phantom, Ghost, Cullinan Black Badge, Mercedes-Maybach GLS 600, Cadillac Escalade IQ.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Vancouver",
        addressRegion: "BC",
        addressCountry: "CA",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "Reservations",
          email: "reservations@sevenstarchauffeurs.ca",
          telephone: "+1-604-000-0000",
          areaServed: ["CA"],
          availableLanguage: ["English"],
        },
      ],
      sameAs: [
        "https://instagram.com",
        "https://www.linkedin.com",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}#website`,
      url: SITE_URL,
      name: "Seven Star Chauffeurs",
      description:
        "Vancouver's most discreet private chauffeur service. By invitation.",
      publisher: { "@id": `${SITE_URL}#organization` },
      inLanguage: "en-CA",
    },
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}#business`,
      name: "Seven Star Chauffeurs",
      image: `${SITE_URL}/logos/seven-star-gold.webp`,
      url: SITE_URL,
      telephone: "+1-604-000-0000",
      email: "reservations@sevenstarchauffeurs.ca",
      priceRange: "$$$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Vancouver",
        addressRegion: "BC",
        addressCountry: "CA",
      },
      areaServed: [
        { "@type": "City", name: "Vancouver" },
        { "@type": "City", name: "Whistler" },
        { "@type": "AdministrativeArea", name: "British Columbia" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
          opens: "00:00",
          closes: "23:59",
        },
      ],
    },
    {
      "@type": "Service",
      "@id": `${SITE_URL}#service`,
      name: "Luxury Chauffeur Service",
      serviceType: "Luxury ground transportation and chauffeur service",
      provider: { "@id": `${SITE_URL}#organization` },
      areaServed: [
        { "@type": "City", name: "Vancouver" },
        { "@type": "City", name: "Whistler" },
        { "@type": "AdministrativeArea", name: "British Columbia" },
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Seven Star Engagements",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Airport Transfers at YVR",
              description:
                "Meet-and-greet at International Arrivals, flight-tracked, luggage service, Phantom or Maybach at the kerb.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Corporate Chauffeur",
              description:
                "Single-driver continuity for executive engagements across Metro Vancouver and inter-province. NDA-ready.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Wedding Chauffeur",
              description:
                "Cullinan Black Badge with custom livery, red-carpet arrival, photographer liaison, multi-location choreography.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Whistler & Sea-to-Sky",
              description:
                "Fully-electric Cadillac Escalade IQ between Vancouver and Whistler. Scenic stopovers by request.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Nightlife & Events",
              description:
                "Private touring coach for galas, premieres, and bachelor or bachelorette evenings. Up to fourteen guests.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Hourly Charter",
              description:
                "Mercedes-Maybach GLS 600 on retainer. Two-hour minimum, champagne service, revisable itinerary.",
            },
          },
        ],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE_URL}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I book Seven Star Chauffeurs?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Reservations are accepted by private enquiry through the form on our site. A concierge responds within hours with availability and confirmation, including a reference number of the form SSC-XXXX-XXXX.",
          },
        },
        {
          "@type": "Question",
          name: "How are vehicles assigned to engagements?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Each vehicle is reserved for a single engagement at a time. There is no shared service. Vehicle preference is part of the reservation form.",
          },
        },
        {
          "@type": "Question",
          name: "Are Seven Star chauffeurs vetted?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "All chauffeurs are background-checked, trained in discretion, and NDA-ready on request.",
          },
        },
        {
          "@type": "Question",
          name: "What is the cancellation policy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Reservations may be adjusted or cancelled up to 48 hours before the engagement without fee. Shorter-notice changes are accommodated on a case-by-case basis.",
          },
        },
        {
          "@type": "Question",
          name: "What destinations does Seven Star serve?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Metro Vancouver primarily. Whistler and the Sea-to-Sky corridor by standing route. Other destinations within Western Canada by arrangement.",
          },
        },
        {
          "@type": "Question",
          name: "Is pricing published?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Each engagement is quoted individually on request.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap"
        />
        <link
          rel="preload"
          as="image"
          href="/frames/frame_0001.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/logos/seven-star-gold.webp"
          type="image/webp"
          fetchPriority="high"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body className="page-in">{children}</body>
    </html>
  );
}
