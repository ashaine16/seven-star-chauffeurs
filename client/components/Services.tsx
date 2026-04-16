"use client";

import { useLayoutEffect, useRef } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Service = {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  image: string | null;
  imageAlt: string;
};

const SERVICES: Service[] = [
  {
    eyebrow: "Arrivals & Departures",
    title: "Airport Transfers at YVR",
    description:
      "Meet-and-greet at International Arrivals, luggage handled in silence, and a Phantom at the kerb before you reach the sliding doors. Flight-tracked, hour-monitored, never rushed.",
    bullets: [
      "Flight monitoring with live ETA recalibration",
      "Luggage service and kerbside greet",
      "Executive seating with chilled refreshments",
    ],
    image: "/fleet/phantom.webp",
    imageAlt: "Rolls-Royce Phantom staged for an airport arrival",
  },
  {
    eyebrow: "Executive Movement",
    title: "Corporate Chauffeur",
    description:
      "Between Burrard, Howe, and Coal Harbour, or across province borders. A dedicated chauffeur assigned to your day, your cadence, your confidentiality.",
    bullets: [
      "Single-driver continuity across the engagement",
      "NDA-ready and discretion-trained",
      "Rolls-Royce Ghost Series II, the executive’s car",
    ],
    image: "/fleet/ghost.webp",
    imageAlt: "Rolls-Royce Ghost Series II in downtown Vancouver",
  },
  {
    eyebrow: "The Once-in-a-Lifetime",
    title: "Wedding Chauffeur",
    description:
      "The Cullinan Black Badge dressed for your day. Custom livery, red-carpet arrival, photographer liaison. From first look to final departure, we hold the choreography.",
    bullets: [
      "Bridal-party coordination with photographers",
      "Custom livery and white-glove presentation",
      "Flexible multi-location itineraries",
    ],
    image: "/fleet/cullinan.webp",
    imageAlt: "Rolls-Royce Cullinan Black Badge prepared for a wedding",
  },
  {
    eyebrow: "The Coastal Highway",
    title: "Whistler & Sea-to-Sky",
    description:
      "The Cadillac Escalade IQ. Silent-running electric, commanding presence, on the most photographed highway in the world. Stopovers at Shannon Falls and Tantalus Lookout arranged on request.",
    bullets: [
      "Round-trip or one-way between Vancouver and Whistler",
      "Scenic-stop itineraries curated by request",
      "Fully-electric luxury SUV",
    ],
    image: "/fleet/escalade-iq.webp",
    imageAlt: "Cadillac Escalade IQ on the Sea-to-Sky Highway",
  },
  {
    eyebrow: "After Dark",
    title: "Nightlife & Events",
    description:
      "The touring coach for galas, premieres, and bachelor(ette) evenings that travel between venues. Climate-controlled lounge seating, onboard bar, dedicated host chauffeur.",
    bullets: [
      "Lounge seating for up to fourteen",
      "Onboard bar and ambient lighting",
      "Dedicated host beyond the driver",
    ],
    image: "/fleet/party-bus.webp",
    imageAlt: "Luxury party bus exterior",
  },
  {
    eyebrow: "By the Hour",
    title: "Hourly Charter",
    description:
      "The Mercedes-Maybach GLS 600 reserved on retainer for two hours, eight hours, or a full day. First-class rear thrones, champagne service, itinerary held open for revision.",
    bullets: [
      "Minimum two-hour bookings",
      "Champagne and refreshment service",
      "Dynamic itinerary, revise en route",
    ],
    image: "/fleet/maybach-interior.webp",
    imageAlt: "Mercedes-Maybach GLS 600 rear cabin interior",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctxGsap = gsap.context(() => {
      const blocks = section.querySelectorAll<HTMLElement>("[data-service-block]");
      blocks.forEach((block) => {
        const image = block.querySelector<HTMLElement>("[data-service-image]");
        const text = block.querySelector<HTMLElement>("[data-service-text]");
        const line = block.querySelector<HTMLElement>("[data-service-line]");
        const cta = block.querySelector<HTMLElement>("[data-service-cta]");
        const imageFromX = block.dataset.imageSide === "left" ? -100 : 100;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 1.5,
          },
          defaults: { ease: "power2.out" },
        });

        if (image) {
          tl.fromTo(
            image,
            { x: imageFromX, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6 },
            0,
          );
        }
        if (text) {
          tl.fromTo(
            text,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6 },
            0.2,
          );
        }
        if (line) {
          tl.fromTo(
            line,
            { width: 0 },
            { width: 60, duration: 0.5 },
            0.5,
          );
        }
        if (cta) {
          tl.fromTo(
            cta,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.45 },
            0.6,
          );
        }
      });
    }, section);

    return () => ctxGsap.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      aria-label="Services"
      className="relative w-full bg-[var(--obsidian)]"
      style={{
        overflow: "hidden",
        boxShadow: "0 -80px 120px -40px rgba(212,160,74,0.06) inset",
      }}
    >
      {/* Section header */}
      <div
        className="mx-auto"
        style={{
          maxWidth: "1400px",
          padding:
            "clamp(64px, 9vh, 110px) clamp(24px, 5vw, 64px) clamp(24px, 4vh, 56px)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            fontSize: "13px",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "var(--gold)",
          }}
        >
          II.&nbsp;&nbsp;Services
        </div>
        <div className="mt-4 h-[1px] bg-[var(--gold)]" style={{ width: "60px" }} />
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            color: "var(--ivory)",
            fontSize: "clamp(32px, 5vw, 56px)",
            letterSpacing: "0.06em",
            lineHeight: 1.1,
            marginTop: "28px",
            maxWidth: "960px",
          }}
        >
          The engagements we hold.
        </h2>
        <p
          style={{
            marginTop: "18px",
            maxWidth: "56ch",
            color: "var(--chrome)",
            fontSize: "15px",
            lineHeight: 1.7,
            letterSpacing: "0.02em",
            fontFamily: "var(--font-sans)",
          }}
        >
          Six ways we serve, each reserved on a one-engagement-at-a-time basis.
        </p>
      </div>

      {/* Blocks */}
      <div
        className="mx-auto flex flex-col"
        style={{
          maxWidth: "1400px",
          gap: "clamp(24px, 4vh, 56px)",
          padding: "0 clamp(24px, 5vw, 64px) clamp(64px, 10vh, 120px)",
        }}
      >
        {SERVICES.map((s, i) => {
          const imageSide: "left" | "right" = i % 2 === 0 ? "left" : "right";
          return <ServiceBlock key={s.title} service={s} index={i} imageSide={imageSide} />;
        })}
      </div>
    </section>
  );
}

function ServiceBlock({
  service,
  index,
  imageSide,
}: {
  service: Service;
  index: number;
  imageSide: "left" | "right";
}) {
  return (
    <article
      data-service-block
      data-image-side={imageSide}
      className="grid md:grid-cols-2 items-stretch"
      style={{
        gap: "clamp(0px, 2vw, 32px)",
        position: "relative",
      }}
    >
      {/* Image side */}
      <div
        data-service-image
        style={{
          position: "relative",
          order: imageSide === "left" ? 1 : 2,
          aspectRatio: "5 / 4",
          minHeight: "clamp(260px, 40vh, 440px)",
          overflow: "hidden",
          willChange: "transform, opacity",
        }}
      >
        {service.image ? (
          <NextImage
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(min-width: 900px) 50vw, 100vw"
            style={{
              objectFit: "contain",
              objectPosition: "center",
              filter: "brightness(0.92)",
            }}
          />
        ) : (
          <ServicePlaceholder label={service.imageAlt} />
        )}
        {/* Edge fade toward the text side for a seamless bleed */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              imageSide === "left"
                ? "linear-gradient(90deg, transparent 60%, rgba(5,5,5,0.55) 100%)"
                : "linear-gradient(90deg, rgba(5,5,5,0.55) 0%, transparent 40%)",
          }}
        />
      </div>

      {/* Text side — frosted glass panel */}
      <div
        style={{
          order: imageSide === "left" ? 2 : 1,
          display: "flex",
          alignItems: "center",
          padding: "clamp(12px, 2vw, 32px) 0",
        }}
      >
        <div
          data-service-text
          style={{
            background: "rgba(5,5,5,0.4)",
            backdropFilter: "blur(20px) saturate(1.05)",
            WebkitBackdropFilter: "blur(20px) saturate(1.05)",
            border: "1px solid rgba(212,160,74,0.15)",
            padding: "clamp(22px, 2.6vw, 40px)",
            width: "100%",
            position: "relative",
            boxShadow:
              "0 0 0 1px rgba(5,5,5,0.3) inset, 0 30px 60px -20px rgba(0,0,0,0.55)",
          }}
        >
          {/* Index marker */}
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 400,
              fontSize: "11px",
              letterSpacing: "0.45em",
              color: "var(--gold)",
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            {String(index + 1).padStart(2, "0")} &nbsp;·&nbsp; {service.eyebrow}
          </div>

          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(22px, 2.6vw, 32px)",
              color: "var(--ivory)",
              letterSpacing: "0.02em",
              lineHeight: 1.15,
              marginTop: "10px",
            }}
          >
            {service.title}
          </h3>

          <div
            data-service-line
            aria-hidden
            style={{
              marginTop: "16px",
              height: "1px",
              width: 0,
              background: "var(--gold)",
            }}
          />

          <p
            style={{
              marginTop: "16px",
              color: "var(--chrome)",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              lineHeight: 1.7,
              letterSpacing: "0.015em",
              maxWidth: "52ch",
            }}
          >
            {service.description}
          </p>

          <a
            data-service-cta
            href="#reserve"
            className="inline-flex items-center justify-center"
            style={{
              marginTop: "22px",
              padding: "12px 24px",
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "11px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--gold)",
              background: "transparent",
              border: "1px solid var(--gold)",
              borderRadius: "2px",
              transition:
                "background 400ms cubic-bezier(0.33,1,0.68,1), color 400ms cubic-bezier(0.33,1,0.68,1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--gold)";
              e.currentTarget.style.color = "var(--obsidian)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--gold)";
            }}
          >
            Reserve
          </a>
        </div>
      </div>
    </article>
  );
}

function ServicePlaceholder({ label }: { label: string }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse at center, rgba(24,24,24,1) 0%, var(--obsidian) 72%)",
      }}
    >
      <div
        style={{
          border: "1px solid rgba(212,160,74,0.3)",
          padding: "clamp(40px, 5vw, 72px) clamp(52px, 7vw, 104px)",
          textAlign: "center",
          maxWidth: "80%",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 400,
            fontSize: "10px",
            letterSpacing: "0.5em",
            color: "var(--gold)",
            textTransform: "uppercase",
          }}
        >
          Photography Forthcoming
        </div>
        <div
          style={{
            marginTop: "16px",
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "clamp(18px, 2.2vw, 24px)",
            color: "var(--chrome)",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
