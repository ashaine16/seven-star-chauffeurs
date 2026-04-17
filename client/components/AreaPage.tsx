"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { AreaData } from "@/lib/data";
import { VEHICLES, SERVICES } from "@/lib/data";
import PageShell from "./PageShell";
import ScrollReveal from "./ScrollReveal";
import CTAButton from "./CTAButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  area: AreaData;
}

export default function AreaPage({ area }: Props) {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll<HTMLElement>("[data-area-card]");
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50, rotateX: 6, transformPerspective: 800 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.7,
              delay: i * 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });
      }
    });
    return () => ctx.revert();
  }, []);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Areas Served", href: "/areas/" },
    { label: area.city, href: `/areas/${area.slug}/` },
  ];

  return (
    <PageShell breadcrumbs={breadcrumbs}>
      {/* ── Hero ── */}
      <section
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "clamp(40px, 6vh, 80px) clamp(24px, 5vw, 64px) clamp(64px, 10vh, 120px)",
        }}
      >
        <ScrollReveal variant="fade-up">
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "11px",
              fontWeight: 400,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              color: "var(--gold)",
              marginBottom: "16px",
            }}
          >
            {area.region}
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.12}>
          <h1
            id="speakable-heading"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px, 5vw, 68px)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "var(--ivory)",
              margin: "0 0 clamp(16px, 2vh, 24px)",
            }}
          >
            Luxury Chauffeur Service in {area.city}
          </h1>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.24}>
          <p
            id="speakable-description"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "clamp(15px, 1.5vw, 18px)",
              fontWeight: 300,
              color: "var(--chrome)",
              maxWidth: "70ch",
              lineHeight: 1.85,
              margin: "0 0 clamp(28px, 4vh, 40px)",
            }}
          >
            {area.longDescription}
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={0.36}>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <CTAButton href="/#reserve">Reserve in {area.city}</CTAButton>
            <CTAButton href="tel:+16040000000" variant="outline">Call Concierge</CTAButton>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Neighbourhoods / Highlights ── */}
      <section
        style={{
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(212,160,74,0.08)",
          borderBottom: "1px solid rgba(212,160,74,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "clamp(64px, 10vh, 120px) clamp(24px, 5vw, 64px)",
          }}
        >
          <ScrollReveal variant="fade-up">
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 400,
                color: "var(--ivory)",
                marginBottom: "clamp(32px, 5vh, 56px)",
              }}
            >
              Areas We Cover in {area.city}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: "clamp(12px, 1.5vw, 20px)" }}>
            {area.highlights.map((h, i) => (
              <ScrollReveal key={h} variant="scale-in" delay={i * 0.06}>
                <div
                  style={{
                    padding: "clamp(16px, 2vh, 24px) clamp(16px, 2vw, 24px)",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(212,160,74,0.1)",
                    borderRadius: "4px",
                    fontFamily: "var(--font-sans)",
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "var(--ivory)",
                    textAlign: "center",
                    transition: "border-color 400ms",
                  }}
                >
                  {h}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Services in This Area ── */}
      <section
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "clamp(64px, 10vh, 120px) clamp(24px, 5vw, 64px)",
        }}
      >
        <ScrollReveal variant="fade-up">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 400,
              color: "var(--ivory)",
              marginBottom: "clamp(32px, 5vh, 56px)",
            }}
          >
            Services Available in {area.city}
          </h2>
        </ScrollReveal>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3" style={{ gap: "clamp(16px, 2vw, 24px)" }}>
          {SERVICES.map((svc, i) => (
            <div
              key={svc.slug}
              data-area-card
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(212,160,74,0.1)",
                borderRadius: "4px",
                padding: "clamp(24px, 3vh, 36px)",
                willChange: "transform, opacity",
                transition: "border-color 400ms, transform 400ms",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,160,74,0.3)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,160,74,0.1)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "10px",
                  fontWeight: 400,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  marginBottom: "8px",
                }}
              >
                {svc.eyebrow}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(18px, 2vw, 24px)",
                  fontWeight: 400,
                  color: "var(--ivory)",
                  marginBottom: "12px",
                }}
              >
                {svc.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "var(--chrome)",
                  lineHeight: 1.7,
                  marginBottom: "16px",
                }}
              >
                {svc.description}
              </p>
              <Link
                href={`/services/${svc.slug}/`}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  textDecoration: "none",
                  transition: "opacity 300ms",
                }}
              >
                Learn More &rarr;
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── Fleet Available ── */}
      <section
        style={{
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(212,160,74,0.08)",
          borderBottom: "1px solid rgba(212,160,74,0.08)",
        }}
      >
        <div
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: "clamp(64px, 10vh, 120px) clamp(24px, 5vw, 64px)",
          }}
        >
          <ScrollReveal variant="fade-up">
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 400,
                color: "var(--ivory)",
                marginBottom: "clamp(32px, 5vh, 56px)",
              }}
            >
              Our Fleet in {area.city}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-2 md:grid-cols-3" style={{ gap: "clamp(12px, 1.5vw, 20px)" }}>
            {VEHICLES.map((v, i) => (
              <ScrollReveal key={v.slug} variant="fade-up" delay={i * 0.06}>
                <Link
                  href={`/fleet/${v.slug}/`}
                  style={{
                    display: "block",
                    padding: "clamp(20px, 3vh, 32px) clamp(16px, 2vw, 24px)",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(212,160,74,0.1)",
                    borderRadius: "4px",
                    textDecoration: "none",
                    textAlign: "center",
                    transition: "border-color 400ms, transform 400ms",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(15px, 1.6vw, 20px)",
                      fontWeight: 400,
                      color: "var(--ivory)",
                      marginBottom: "4px",
                    }}
                  >
                    {v.fullName}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "12px",
                      fontWeight: 300,
                      color: "var(--gold)",
                    }}
                  >
                    View Details &rarr;
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Landmarks ── */}
      <section
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "clamp(64px, 10vh, 120px) clamp(24px, 5vw, 64px)",
        }}
      >
        <ScrollReveal variant="fade-up">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              fontWeight: 400,
              color: "var(--ivory)",
              marginBottom: "clamp(32px, 5vh, 56px)",
            }}
          >
            Landmarks &amp; Destinations in {area.city}
          </h2>
        </ScrollReveal>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
          {area.landmarks.map((lm, i) => (
            <ScrollReveal key={lm} variant="scale-in" delay={i * 0.05}>
              <span
                style={{
                  display: "inline-block",
                  padding: "10px 20px",
                  background: "rgba(212,160,74,0.06)",
                  border: "1px solid rgba(212,160,74,0.15)",
                  borderRadius: "100px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: 300,
                  color: "var(--ivory)",
                  letterSpacing: "0.02em",
                }}
              >
                {lm}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        style={{
          background: "linear-gradient(135deg, rgba(197,165,90,0.08) 0%, rgba(5,5,5,1) 60%)",
          borderTop: "1px solid rgba(212,160,74,0.12)",
          padding: "clamp(64px, 10vh, 120px) clamp(24px, 5vw, 64px)",
          textAlign: "center",
        }}
      >
        <ScrollReveal variant="fade-up">
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 4vw, 48px)",
              fontWeight: 400,
              color: "var(--ivory)",
              marginBottom: "16px",
            }}
          >
            Reserve Your Chauffeur in {area.city}
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "15px",
              fontWeight: 300,
              color: "var(--chrome)",
              maxWidth: "52ch",
              margin: "0 auto clamp(32px, 4vh, 48px)",
              lineHeight: 1.7,
            }}
          >
            Seven Star Chauffeurs provides luxury chauffeur service throughout {area.city} and {area.region}. Contact our concierge to arrange your experience.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <CTAButton href="/#reserve">Reserve Now</CTAButton>
            <CTAButton href="tel:+16040000000" variant="outline">Call Concierge</CTAButton>
          </div>
        </ScrollReveal>
      </section>
    </PageShell>
  );
}
