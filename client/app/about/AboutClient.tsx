"use client";

import PageShell from "@/components/PageShell";
import ScrollReveal from "@/components/ScrollReveal";
import CTAButton from "@/components/CTAButton";

export default function AboutClient() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about/" },
  ];

  return (
    <PageShell breadcrumbs={breadcrumbs}>
      <article
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "clamp(40px, 6vh, 80px) clamp(24px, 5vw, 64px) clamp(80px, 12vh, 160px)",
        }}
      >
        <ScrollReveal variant="fade-up">
          <h1
            id="speakable-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 5vw, 64px)",
              fontWeight: 400,
              color: "var(--ivory)",
              marginBottom: "clamp(24px, 3vh, 40px)",
            }}
          >
            About Seven Star Chauffeurs
          </h1>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.12}>
          <p
            id="speakable-description"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(15px, 1.5vw, 18px)",
              fontWeight: 300,
              lineHeight: 1.85,
              color: "var(--chrome)",
              marginBottom: "clamp(32px, 4vh, 48px)",
            }}
          >
            Seven Star Chauffeurs is Vancouver&rsquo;s most exclusive luxury chauffeur service. We operate a curated fleet of six vehicles &mdash; three Rolls-Royce motorcars, a Mercedes-Maybach GLS 600, a fully-electric Cadillac Escalade IQ, and a private luxury party bus &mdash; each reserved for one engagement at a time. Our service model is built on a single principle: discretion, driven.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.2}>
          <div
            style={{
              background: "rgba(255,255,255,0.015)",
              border: "1px solid rgba(212,160,74,0.1)",
              borderRadius: "4px",
              padding: "clamp(32px, 5vh, 56px) clamp(24px, 4vw, 48px)",
              marginBottom: "clamp(40px, 6vh, 64px)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 3vw, 36px)",
                fontWeight: 400,
                color: "var(--ivory)",
                marginBottom: "16px",
              }}
            >
              Our Philosophy
            </h2>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 300,
                lineHeight: 1.85,
                color: "var(--chrome)",
                margin: "0 0 20px",
              }}
            >
              We do not operate a dispatch fleet. We do not surge-price. We do not send the nearest available vehicle. Every Seven Star engagement is a private appointment &mdash; a single vehicle, a single chauffeur, reserved exclusively for you. The vehicle arrives in showroom condition. The chauffeur knows your name, your itinerary, and your preferences before you enter the cabin.
            </p>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 300,
                lineHeight: 1.85,
                color: "var(--chrome)",
                margin: 0,
              }}
            >
              This is not a car service. It is a concierge experience that happens to involve a motorcar.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 400,
              color: "var(--ivory)",
              marginBottom: "16px",
            }}
          >
            The Fleet
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              fontWeight: 300,
              lineHeight: 1.85,
              color: "var(--chrome)",
              marginBottom: "clamp(32px, 4vh, 48px)",
            }}
          >
            Our fleet is deliberately small and deliberately extraordinary. The Rolls-Royce Phantom for arrivals that demand the absolute pinnacle. The Ghost Series II for executive engagements that require all-day discretion. The Cullinan Black Badge for weddings and statement arrivals. The Mercedes-Maybach GLS 600 for hourly charter with first-class rear thrones. The Cadillac Escalade IQ &mdash; fully electric, near-silent &mdash; for the Sea-to-Sky Highway. And the Luxury Party Bus for celebrations that travel between venues.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 400,
              color: "var(--ivory)",
              marginBottom: "16px",
            }}
          >
            Areas We Serve
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              fontWeight: 300,
              lineHeight: 1.85,
              color: "var(--chrome)",
              marginBottom: "clamp(32px, 4vh, 48px)",
            }}
          >
            Seven Star Chauffeurs operates throughout Metro Vancouver &mdash; including Vancouver, West Vancouver, North Vancouver, Burnaby, Richmond, Surrey, Langley, and White Rock &mdash; as well as the Sea-to-Sky Corridor to Whistler and the Okanagan. Airport transfers from YVR, cross-border service to Seattle, and multi-day engagements across British Columbia are all available by arrangement.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.1}>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <CTAButton href="/#reserve">Reserve Now</CTAButton>
            <CTAButton href="/#fleet" variant="outline">View the Fleet</CTAButton>
          </div>
        </ScrollReveal>
      </article>
    </PageShell>
  );
}
