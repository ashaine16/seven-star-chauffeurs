"use client";

import { useEffect, useRef } from "react";
import NextImage from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { VehicleData } from "@/lib/data";
import PageShell from "./PageShell";
import ScrollReveal from "./ScrollReveal";
import CTAButton from "./CTAButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  vehicle: VehicleData;
  accentColor?: string;
}

export default function VehiclePage({ vehicle, accentColor = "var(--gold)" }: Props) {
  const heroImgRef = useRef<HTMLDivElement>(null);
  const specGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero image parallax */
      if (heroImgRef.current) {
        gsap.fromTo(
          heroImgRef.current,
          { scale: 1.08, y: 0 },
          {
            scale: 1,
            y: -40,
            ease: "none",
            scrollTrigger: {
              trigger: heroImgRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          }
        );
      }

      /* Spec cards 3D tilt on scroll */
      if (specGridRef.current) {
        const cards = specGridRef.current.querySelectorAll<HTMLElement>("[data-spec-card]");
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              rotateY: i % 2 === 0 ? -8 : 8,
              rotateX: 6,
              y: 60,
              transformPerspective: 1000,
            },
            {
              opacity: 1,
              rotateY: 0,
              rotateX: 0,
              y: 0,
              duration: 0.8,
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
    { label: "Fleet", href: "/#fleet" },
    { label: vehicle.fullName, href: `/fleet/${vehicle.slug}/` },
  ];

  return (
    <PageShell breadcrumbs={breadcrumbs}>
      {/* ── Hero Section ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          minHeight: "clamp(420px, 60vh, 700px)",
        }}
      >
        <div
          ref={heroImgRef}
          style={{
            position: "absolute",
            inset: 0,
            willChange: "transform",
          }}
        >
          <NextImage
            src={vehicle.image}
            alt={vehicle.imageAlt}
            fill
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
            priority
            sizes="100vw"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.7) 60%, rgba(5,5,5,0.95) 100%)",
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1400,
            margin: "0 auto",
            padding: "clamp(120px, 18vh, 200px) clamp(24px, 5vw, 64px) clamp(60px, 8vh, 100px)",
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
                color: accentColor,
                marginBottom: "16px",
              }}
            >
              {vehicle.make}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.15}>
            <h1
              id="speakable-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 5.5vw, 72px)",
                fontWeight: 400,
                lineHeight: 1.1,
                color: "var(--ivory)",
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              {vehicle.model}
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.3}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "clamp(18px, 2.2vw, 26px)",
                fontWeight: 400,
                color: accentColor,
                marginTop: "clamp(16px, 2vh, 24px)",
                letterSpacing: "0.02em",
              }}
            >
              {vehicle.tagline}
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.45}>
            <div style={{ marginTop: "clamp(28px, 4vh, 40px)", display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <CTAButton href="/#reserve">Reserve This Vehicle</CTAButton>
              <CTAButton href="/fleet/" variant="outline">View Full Fleet</CTAButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Description Section ── */}
      <section
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "clamp(64px, 10vh, 120px) clamp(24px, 5vw, 64px)",
        }}
      >
        <div className="grid md:grid-cols-2" style={{ gap: "clamp(40px, 6vw, 80px)", alignItems: "start" }}>
          <ScrollReveal variant="fade-right">
            <div
              id="speakable-description"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(15px, 1.4vw, 17px)",
                fontWeight: 300,
                lineHeight: 1.85,
                color: "var(--chrome)",
                letterSpacing: "0.015em",
              }}
            >
              <p style={{ margin: "0 0 24px" }}>{vehicle.longDescription}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-left">
            <div
              className="img-zoom"
              style={{
                position: "relative",
                borderRadius: "4px",
                overflow: "hidden",
                aspectRatio: "4/3",
              }}
            >
              <NextImage
                src={vehicle.image}
                alt={`${vehicle.fullName} interior detail`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: `1px solid rgba(212,160,74,0.15)`,
                  borderRadius: "4px",
                  pointerEvents: "none",
                }}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Specs Grid ── */}
      <section
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 clamp(24px, 5vw, 64px) clamp(64px, 10vh, 120px)",
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
              letterSpacing: "-0.01em",
            }}
          >
            Specifications
          </h2>
        </ScrollReveal>

        <div
          ref={specGridRef}
          className="grid grid-cols-2 md:grid-cols-3"
          style={{ gap: "clamp(16px, 2vw, 24px)" }}
        >
          {vehicle.specs.map((spec, i) => (
            <div
              key={spec.label}
              data-spec-card
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(212,160,74,0.12)",
                borderRadius: "4px",
                padding: "clamp(20px, 3vh, 32px) clamp(16px, 2vw, 24px)",
                willChange: "transform, opacity",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "10px",
                  fontWeight: 400,
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: accentColor,
                  marginBottom: "8px",
                }}
              >
                {spec.label}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(18px, 2vw, 24px)",
                  fontWeight: 400,
                  color: "var(--ivory)",
                  lineHeight: 1.3,
                }}
              >
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
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
              Features &amp; Appointments
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2" style={{ gap: "clamp(16px, 2vw, 24px)" }}>
            {vehicle.features.map((feat, i) => (
              <ScrollReveal key={feat} variant="fade-up" delay={i * 0.06}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    padding: "clamp(16px, 2vh, 24px) 0",
                    borderBottom: "1px solid rgba(184,184,184,0.06)",
                  }}
                >
                  <span
                    style={{
                      color: accentColor,
                      fontFamily: "var(--font-display)",
                      fontSize: "18px",
                      lineHeight: 1,
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  >
                    &#9670;
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "15px",
                      fontWeight: 300,
                      color: "var(--chrome)",
                      lineHeight: 1.7,
                      letterSpacing: "0.015em",
                    }}
                  >
                    {feat}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Best For ── */}
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
            Ideal For
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: "clamp(16px, 2vw, 24px)" }}>
          {vehicle.bestFor.map((use, i) => (
            <ScrollReveal key={use} variant="scale-in" delay={i * 0.08}>
              <div
                style={{
                  textAlign: "center",
                  padding: "clamp(24px, 4vh, 40px) clamp(16px, 2vw, 24px)",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(212,160,74,0.1)",
                  borderRadius: "4px",
                  transition: "border-color 400ms, transform 400ms",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(212,160,74,0.35)";
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
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "var(--ivory)",
                    lineHeight: 1.5,
                    letterSpacing: "0.015em",
                  }}
                >
                  {use}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        style={{
          background: `linear-gradient(135deg, rgba(197,165,90,0.08) 0%, rgba(5,5,5,1) 60%)`,
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
            Reserve the {vehicle.model}
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
            Each engagement is quoted individually and reserved for one client at a time.
            Contact our concierge to arrange your {vehicle.fullName} experience.
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
