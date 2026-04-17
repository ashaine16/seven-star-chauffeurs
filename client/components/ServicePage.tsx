"use client";

import { useEffect, useRef } from "react";
import NextImage from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ServiceData } from "@/lib/data";
import PageShell from "./PageShell";
import ScrollReveal from "./ScrollReveal";
import CTAButton from "./CTAButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  service: ServiceData;
}

export default function ServicePage({ service }: Props) {
  const heroRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Hero parallax zoom */
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current,
          { scale: 1.1 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      }

      /* FAQ accordion reveal */
      if (faqRef.current) {
        const items = faqRef.current.querySelectorAll<HTMLElement>("[data-faq-item]");
        items.forEach((item, i) => {
          gsap.fromTo(
            item,
            { opacity: 0, x: i % 2 === 0 ? -40 : 40, rotateY: i % 2 === 0 ? -4 : 4, transformPerspective: 800 },
            {
              opacity: 1,
              x: 0,
              rotateY: 0,
              duration: 0.7,
              delay: i * 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: item,
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
    { label: "Services", href: "/#services" },
    { label: service.title, href: `/services/${service.slug}/` },
  ];

  return (
    <PageShell breadcrumbs={breadcrumbs}>
      {/* ── Hero ── */}
      <section style={{ position: "relative", overflow: "hidden", minHeight: "clamp(400px, 55vh, 650px)" }}>
        <div ref={heroRef} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
          <NextImage
            src={service.image}
            alt={service.imageAlt}
            fill
            style={{ objectFit: "cover", objectPosition: "center 40%" }}
            priority
            sizes="100vw"
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(5,5,5,0.25) 0%, rgba(5,5,5,0.65) 50%, rgba(5,5,5,0.97) 100%)",
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
                color: "var(--gold)",
                marginBottom: "16px",
              }}
            >
              {service.eyebrow}
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.15}>
            <h1
              id="speakable-heading"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(34px, 5vw, 68px)",
                fontWeight: 400,
                lineHeight: 1.1,
                color: "var(--ivory)",
                margin: 0,
              }}
            >
              {service.title}
            </h1>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.3}>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(15px, 1.5vw, 18px)",
                fontWeight: 300,
                color: "var(--chrome)",
                maxWidth: "60ch",
                marginTop: "clamp(16px, 2vh, 24px)",
                lineHeight: 1.7,
              }}
            >
              {service.description}
            </p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={0.45}>
            <div style={{ marginTop: "clamp(28px, 4vh, 40px)", display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <CTAButton href="/#reserve">Book This Service</CTAButton>
              <CTAButton href="tel:+16040000000" variant="outline">Call Concierge</CTAButton>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Long Description + Vehicle ── */}
      <section
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "clamp(64px, 10vh, 120px) clamp(24px, 5vw, 64px)",
        }}
      >
        <div className="grid md:grid-cols-5" style={{ gap: "clamp(40px, 6vw, 80px)", alignItems: "start" }}>
          <div className="md:col-span-3">
            <ScrollReveal variant="fade-right">
              <div
                id="speakable-description"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(15px, 1.4vw, 17px)",
                  fontWeight: 300,
                  lineHeight: 1.85,
                  color: "var(--chrome)",
                }}
              >
                <p style={{ margin: "0 0 24px" }}>{service.longDescription}</p>
              </div>
            </ScrollReveal>

            {/* Bullets */}
            <ScrollReveal variant="fade-up" delay={0.2}>
              <ul style={{ listStyle: "none", padding: 0, margin: "32px 0 0" }}>
                {service.bullets.map((b) => (
                  <li
                    key={b}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "14px",
                      padding: "12px 0",
                      borderBottom: "1px solid rgba(184,184,184,0.06)",
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      fontWeight: 300,
                      color: "var(--chrome)",
                      lineHeight: 1.7,
                    }}
                  >
                    <span style={{ color: "var(--gold)", flexShrink: 0, marginTop: "2px" }}>&#9670;</span>
                    {b}
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          </div>

          <div className="md:col-span-2">
            <ScrollReveal variant="fade-left">
              <div
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(212,160,74,0.12)",
                  borderRadius: "4px",
                  padding: "clamp(24px, 3vh, 36px)",
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
                    marginBottom: "12px",
                  }}
                >
                  Signature Vehicle
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(20px, 2.5vw, 28px)",
                    fontWeight: 400,
                    color: "var(--ivory)",
                    marginBottom: "16px",
                  }}
                >
                  {service.vehicle}
                </div>
                <div style={{ position: "relative", aspectRatio: "16/10", borderRadius: "4px", overflow: "hidden" }}>
                  <NextImage
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, 40vw"
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Detailed Sections ── */}
      {service.detailedSections.map((section, i) => (
        <section
          key={section.heading}
          style={{
            maxWidth: 1400,
            margin: "0 auto",
            padding: `0 clamp(24px, 5vw, 64px) clamp(48px, 7vh, 80px)`,
          }}
        >
          <ScrollReveal variant={i % 2 === 0 ? "fade-right" : "fade-left"}>
            <div
              style={{
                background: i % 2 === 0 ? "rgba(255,255,255,0.015)" : "transparent",
                border: i % 2 === 0 ? "1px solid rgba(212,160,74,0.08)" : "none",
                borderRadius: "4px",
                padding: "clamp(32px, 5vh, 56px) clamp(24px, 4vw, 48px)",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(24px, 3vw, 36px)",
                  fontWeight: 400,
                  color: "var(--ivory)",
                  marginBottom: "clamp(16px, 2vh, 24px)",
                }}
              >
                {section.heading}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(14px, 1.3vw, 16px)",
                  fontWeight: 300,
                  lineHeight: 1.85,
                  color: "var(--chrome)",
                  maxWidth: "75ch",
                }}
              >
                {section.content}
              </p>
            </div>
          </ScrollReveal>
        </section>
      ))}

      {/* ── FAQ ── */}
      {service.faq.length > 0 && (
        <section
          style={{
            background: "rgba(255,255,255,0.015)",
            borderTop: "1px solid rgba(212,160,74,0.08)",
            borderBottom: "1px solid rgba(212,160,74,0.08)",
            marginTop: "clamp(32px, 5vh, 64px)",
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
                Frequently Asked Questions
              </h2>
            </ScrollReveal>

            <div ref={faqRef} style={{ display: "flex", flexDirection: "column", gap: "clamp(16px, 2vh, 24px)" }}>
              {service.faq.map((f, i) => (
                <div
                  key={f.question}
                  data-faq-item
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(212,160,74,0.1)",
                    borderRadius: "4px",
                    padding: "clamp(24px, 3vh, 36px)",
                    willChange: "transform, opacity",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(17px, 1.8vw, 22px)",
                      fontWeight: 400,
                      color: "var(--ivory)",
                      marginBottom: "12px",
                    }}
                  >
                    {f.question}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "14px",
                      fontWeight: 300,
                      lineHeight: 1.8,
                      color: "var(--chrome)",
                      margin: 0,
                    }}
                  >
                    {f.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA Banner ── */}
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
            Reserve {service.title}
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
            Each engagement is quoted individually. Contact our concierge to arrange your experience.
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
