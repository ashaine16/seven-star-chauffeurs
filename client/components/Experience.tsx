"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type Pillar = {
  number: string;
  title: string;
  body: string;
};

const PILLARS: Pillar[] = [
  {
    number: "I",
    title: "The Chauffeur",
    body:
      "Vetted through a five-stage selection: advanced driver training, confidentiality certification, reference audit, defensive-driving retest, and personal deportment. Most have served diplomatic or executive protection. All arrive in three-piece.",
  },
  {
    number: "II",
    title: "The Vehicle",
    body:
      "Prepared the morning of each engagement. Detailed, fuelled, climate-set, and stocked to your brief. Kept to factory-fresh presentation. Any vehicle showing so much as a curb mark is withdrawn.",
  },
  {
    number: "III",
    title: "The Itinerary",
    body:
      "Held open. Your day, revised en route if it must be. A single point of contact accompanies the booking. Routing, stopovers, refreshments, discretion, all coordinated before you ask.",
  },
  {
    number: "IV",
    title: "The Discretion",
    body:
      "No logo on the vehicle. No chatter about the cabin. NDAs signed as standard when the engagement calls for it. We are an absence you feel, not a presence you notice.",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctxGsap = gsap.context(() => {
      // Section heading draw-in (ease-cinematic)
      gsap.fromTo(
        section.querySelector("[data-exp-heading]"),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        },
      );

      // Pillar reveals — stagger, scrub-linked for deliberate pacing
      const pillars = section.querySelectorAll<HTMLElement>("[data-pillar]");
      pillars.forEach((p, i) => {
        const line = p.querySelector<HTMLElement>("[data-pillar-line]");
        const numeral = p.querySelector<HTMLElement>("[data-pillar-numeral]");

        gsap.fromTo(
          p,
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "cubic-bezier(0.4, 0, 0.2, 1)",
            scrollTrigger: {
              trigger: p,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
            delay: (i % 2) * 0.12,
          },
        );

        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              transformOrigin: "left center",
              duration: 0.8,
              ease: "cubic-bezier(0.4, 0, 0.2, 1)",
              scrollTrigger: {
                trigger: p,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }

        if (numeral) {
          gsap.fromTo(
            numeral,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              duration: 1.0,
              ease: "cubic-bezier(0.16, 1, 0.3, 1)",
              scrollTrigger: {
                trigger: p,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });
    }, section);

    return () => ctxGsap.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-label="The Experience"
      className="relative w-full bg-[var(--obsidian)]"
      style={{
        overflow: "hidden",
        boxShadow: "0 -80px 120px -40px rgba(212,160,74,0.06) inset",
      }}
    >
      {/* Key-light gradient — alternating side vs. Fleet (top-left this time) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 60% at 18% 12%, rgba(197,165,90,0.08), transparent 60%)",
        }}
      />

      <div
        className="mx-auto relative"
        style={{
          maxWidth: "1400px",
          padding:
            "clamp(80px, 12vh, 140px) clamp(24px, 5vw, 64px) clamp(80px, 12vh, 160px)",
        }}
      >
        {/* Asymmetric header — indented 1/3 from the left (not centered) */}
        <div
          data-exp-heading
          style={{
            maxWidth: "780px",
            marginLeft: "clamp(0px, 8vw, 140px)",
            willChange: "transform, opacity",
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
            III.&nbsp;&nbsp;Experience
          </div>

          {/* Editorial hairline rule — silver-line with gold segment at the 1/8 mark */}
          <HairlineRule marginTop="clamp(24px, 3vh, 36px)" width="min(480px, 60vw)" />

          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              color: "var(--ivory)",
              fontSize: "clamp(32px, 5vw, 56px)",
              letterSpacing: "0.06em",
              lineHeight: 1.1,
              marginTop: "clamp(24px, 3vh, 40px)",
            }}
          >
            An absence you feel,
            <br />
            <em
              style={{
                fontWeight: 400,
                fontStyle: "italic",
                color: "var(--gold)",
              }}
            >
              not a presence you notice.
            </em>
          </h2>

          <p
            style={{
              marginTop: "20px",
              maxWidth: "58ch",
              color: "var(--chrome)",
              fontSize: "15px",
              lineHeight: 1.75,
              letterSpacing: "0.02em",
              fontFamily: "var(--font-sans)",
            }}
          >
            Four disciplines define us. Each is maintained at a standard we
            refuse to publish, because the guests who recognise it do not need
            it written down.
          </p>
        </div>

        {/* Four pillars — 2×2 grid on desktop, single column on mobile */}
        <div
          className="grid md:grid-cols-2"
          style={{
            marginTop: "clamp(64px, 10vh, 120px)",
            gap: "clamp(56px, 8vh, 96px) clamp(48px, 5vw, 80px)",
          }}
        >
          {PILLARS.map((p) => (
            <article
              key={p.number}
              data-pillar
              style={{
                willChange: "transform, opacity",
                padding: "clamp(24px, 3vw, 40px)",
                background: "rgba(5,5,5,0.3)",
                border: "1px solid rgba(212,160,74,0.1)",
                position: "relative",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "clamp(14px, 2vw, 24px)",
                  marginBottom: "clamp(16px, 2vh, 24px)",
                }}
              >
                <div
                  data-pillar-numeral
                  style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontWeight: 300,
                    fontSize: "clamp(40px, 5vw, 64px)",
                    color: "rgba(212,160,74,0.3)",
                    letterSpacing: "0.04em",
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                  aria-hidden
                >
                  {p.number}
                </div>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "clamp(22px, 2.4vw, 30px)",
                    color: "var(--ivory)",
                    letterSpacing: "0.02em",
                    lineHeight: 1.2,
                    margin: 0,
                  }}
                >
                  {p.title}
                </h3>
              </div>
              <div
                data-pillar-line
                aria-hidden
                style={{
                  height: "1px",
                  width: "48px",
                  background: "var(--gold)",
                  transform: "scaleX(0)",
                  transformOrigin: "left center",
                }}
              />
              <p
                style={{
                  margin: 0,
                  marginTop: "clamp(16px, 2vh, 24px)",
                  color: "var(--chrome)",
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  lineHeight: 1.75,
                  letterSpacing: "0.015em",
                }}
              >
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Editorial hairline rule — 1px silver-line with a 40px gold segment at the 1/8 mark. */
function HairlineRule({
  marginTop,
  width = "100%",
}: {
  marginTop?: string;
  width?: string;
}) {
  return (
    <div
      aria-hidden
      style={{
        position: "relative",
        marginTop,
        width,
        height: "1px",
        background: "rgba(184,184,184,0.12)",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "12.5%",
          top: 0,
          height: "1px",
          width: "40px",
          background: "var(--gold)",
        }}
      />
    </div>
  );
}
