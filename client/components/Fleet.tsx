"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

function smoothScrollTo(target: string) {
  const el = document.querySelector(target);
  if (!el) return;
  const nav = document.querySelector("nav[aria-label='Primary']");
  const navH = nav ? nav.getBoundingClientRect().height : 72;
  const top = el.getBoundingClientRect().top + window.scrollY - navH;
  gsap.to(window, {
    duration: 1.4,
    ease: "power3.out",
    scrollTo: { y: Math.max(0, top), autoKill: true },
  });
}

type Vehicle = {
  make: string;
  model: string;
  description: string;
  image: string | null;
};

const FLEET: Vehicle[] = [
  {
    make: "Rolls-Royce",
    model: "Phantom",
    description:
      "The benchmark for chauffeured luxury. A cabin of hand-stitched leather and star-field headliner, gliding in near-silence.",
    image: "/fleet/phantom.webp",
  },
  {
    make: "Rolls-Royce",
    model: "Ghost Series II",
    description:
      "A driver’s Rolls-Royce. Effortless performance paired with the pinnacle of rear-cabin refinement.",
    image: "/fleet/ghost.webp",
  },
  {
    make: "Rolls-Royce",
    model: "Cullinan Black Badge",
    description:
      "Unrelenting presence. The darker, more assertive expression of Rolls-Royce SUV craftsmanship.",
    image: "/fleet/cullinan.webp",
  },
  {
    make: "Mercedes-Maybach",
    model: "GLS 600",
    description:
      "First-class for six. Reclining rear thrones, champagne flutes, and Executive Seating beyond what a sedan can offer.",
    image: "/fleet/maybach.webp",
  },
  {
    make: "Cadillac",
    model: "Escalade IQ",
    description:
      "Among the first fully-electric luxury chauffeur vehicles in Western Canada. Silent, immense, forward.",
    image: "/fleet/escalade-iq.webp",
  },
  {
    make: "Private",
    model: "Luxury Party Bus",
    description:
      "For celebrations that travel. A touring coach reserved exclusively for weddings, galas, and private milestones.",
    image: "/fleet/party-bus.webp",
  },
];

// Travel compression: 1 = 1:1 (full hostage), lower = horizontal moves faster than scroll
const SCRUB_RATIO = 0.42;

export default function Fleet() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 900px)");
    const apply = () => setIsDesktop(mql.matches);
    apply();
    mql.addEventListener("change", apply);
    return () => mql.removeEventListener("change", apply);
  }, []);

  // Elegant header + first-card entrance — runs on both desktop and mobile
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctxGsap = gsap.context(() => {
      const header = section.querySelector<HTMLElement>("[data-fleet-header]");
      if (header) {
        const items = header.querySelectorAll<HTMLElement>("[data-fleet-reveal]");
        const rule = header.querySelector<HTMLElement>("[data-fleet-rule]");

        gsap.set(items, { y: 36, opacity: 0, willChange: "transform, opacity" });
        if (rule) gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: header,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
          defaults: { ease: "cubic-bezier(0.16, 1, 0.3, 1)" },
        });
        tl.to(items, { y: 0, opacity: 1, duration: 1.1, stagger: 0.14 }, 0);
        if (rule) tl.to(rule, { scaleX: 1, duration: 0.9 }, 0.25);
      }

      const firstCard = section.querySelector<HTMLElement>("[data-fleet-card]:first-of-type");
      if (firstCard) {
        const image = firstCard.querySelector<HTMLElement>("[data-fleet-image]");
        if (image) {
          gsap.fromTo(
            image,
            { opacity: 0, scale: 1.04 },
            {
              opacity: 1,
              scale: 1,
              duration: 1.4,
              ease: "cubic-bezier(0.16, 1, 0.3, 1)",
              scrollTrigger: {
                trigger: firstCard,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      }
    }, section);

    return () => ctxGsap.revert();
  }, []);

  useLayoutEffect(() => {
    if (!isDesktop) return;
    const section = sectionRef.current;
    const pin = pinRef.current;
    const track = trackRef.current;
    const progressEl = progressRef.current;
    if (!section || !pin || !track) return;

    const ctxGsap = gsap.context(() => {
      const travel = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -travel(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${travel() / SCRUB_RATIO}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressEl) {
              progressEl.style.width = `${Math.max(6, self.progress * 100)}%`;
            }
          },
        },
      });

      // Per-card reveals driven off the horizontal container animation
      const cards = track.querySelectorAll<HTMLElement>("[data-fleet-card]");
      cards.forEach((card) => {
        const line = card.querySelector<HTMLElement>("[data-fleet-line]");
        const text = card.querySelector<HTMLElement>("[data-fleet-text]");
        const image = card.querySelector<HTMLElement>("[data-fleet-image]");

        if (line) {
          gsap.fromTo(
            line,
            { width: 0 },
            {
              width: 60,
              ease: "power2.out",
              duration: 0.9,
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left 70%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
        if (text) {
          gsap.fromTo(
            text,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              ease: "power2.out",
              duration: 0.9,
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left 80%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
        if (image) {
          gsap.fromTo(
            image,
            { xPercent: 4 },
            {
              xPercent: -4,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        }
      });
    }, section);

    return () => ctxGsap.revert();
  }, [isDesktop]);

  return (
    <section
      id="fleet"
      ref={sectionRef}
      aria-label="Fleet"
      className="relative w-full bg-[var(--obsidian)]"
      style={{
        overflow: "hidden",
        boxShadow: "0 -80px 120px -40px rgba(212,160,74,0.06) inset",
      }}
    >
      {/* Section header sits ABOVE the pinned area so it scrolls past normally
          before the horizontal pin begins — no more "hostage at top" feel. */}
      <div
        data-fleet-header
        className="mx-auto"
        style={{
          maxWidth: "1400px",
          padding:
            "clamp(80px, 12vh, 140px) clamp(24px, 5vw, 64px) clamp(32px, 4vh, 56px)",
        }}
      >
        <div
          data-fleet-reveal
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            fontSize: "13px",
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            color: "var(--gold)",
          }}
        >
          I.&nbsp;&nbsp;The Fleet
        </div>
        <div
          data-fleet-rule
          className="mt-4 h-[1px] bg-[var(--gold)]"
          style={{ width: "60px" }}
        />
        <h2
          data-fleet-reveal
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            color: "var(--ivory)",
            fontSize: "clamp(32px, 5vw, 56px)",
            letterSpacing: "0.06em",
            lineHeight: 1.1,
            marginTop: "28px",
            maxWidth: "880px",
          }}
        >
          Six vehicles. One standard.
        </h2>
        <p
          data-fleet-reveal
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
          Each vehicle reserved exclusively for a single engagement. No shared
          service, no compromise.
        </p>
      </div>

      {/* Pinned zone: ONLY the carousel track pins here — header has already scrolled past.
          Shorter pin runway (travel / 0.7) so horizontal moves faster than scroll. */}
      <div
        ref={pinRef}
        style={{
          position: "relative",
          height: isDesktop ? "100svh" : "auto",
          display: "flex",
          alignItems: "center",
          paddingBottom: isDesktop ? 0 : "clamp(60px, 10vh, 120px)",
          width: "100%",
        }}
      >
        <div
          ref={trackRef}
          style={{
            display: "flex",
            flexDirection: isDesktop ? "row" : "column",
            alignItems: isDesktop ? "center" : "stretch",
            gap: isDesktop ? "clamp(28px, 3.5vw, 56px)" : "clamp(24px, 4vh, 56px)",
            paddingLeft: isDesktop ? "clamp(24px, 6vw, 96px)" : "clamp(20px, 5vw, 48px)",
            paddingRight: isDesktop ? "clamp(24px, 6vw, 96px)" : "clamp(20px, 5vw, 48px)",
            width: isDesktop ? undefined : "100%",
            willChange: isDesktop ? "transform" : "auto",
          }}
        >
          {FLEET.map((v, i) => (
            <div key={v.model} className="contents">
              <FleetCard vehicle={v} index={i} isDesktop={isDesktop} />
              {isDesktop && i < FLEET.length - 1 && (
                <div
                  aria-hidden
                  style={{
                    flex: "0 0 auto",
                    width: "1px",
                    height: "clamp(300px, 45svh, 450px)",
                    background:
                      "linear-gradient(to bottom, transparent 0%, rgba(212,160,74,0.42) 25%, rgba(212,160,74,0.42) 75%, transparent 100%)",
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Thin gold progress rail at bottom of pin */}
        {isDesktop && (
          <div
            aria-hidden
            style={{
              position: "absolute",
              left: "clamp(24px, 6vw, 96px)",
              right: "clamp(24px, 6vw, 96px)",
              bottom: "clamp(36px, 5vh, 56px)",
              height: "1px",
              background: "rgba(244,240,232,0.08)",
            }}
          >
            <div
              ref={progressRef}
              style={{
                height: "100%",
                width: "6%",
                background: "var(--gold)",
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function FleetCard({
  vehicle,
  index,
  isDesktop,
}: {
  vehicle: Vehicle;
  index: number;
  isDesktop: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  if (!isDesktop) {
    return (
      <article
        data-fleet-card
        aria-label={`${vehicle.make} ${vehicle.model}`}
        style={{ width: "100%" }}
      >
        {/* Image block */}
        <div
          data-fleet-image
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 9",
            overflow: "hidden",
          }}
        >
          {vehicle.image ? (
            <NextImage
              src={vehicle.image}
              alt={`${vehicle.make} ${vehicle.model}`}
              fill
              priority={index < 2}
              sizes="100vw"
              draggable={false}
              style={{ objectFit: "cover", objectPosition: "center", userSelect: "none" }}
            />
          ) : (
            <PlaceholderMark label={`${vehicle.make} ${vehicle.model}`} />
          )}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(5,5,5,0.4) 0%, transparent 50%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Text block below */}
        <div style={{ padding: "clamp(16px, 3vw, 24px) 0 0" }}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "10px",
              letterSpacing: "0.5em",
              color: "var(--gold)",
              textTransform: "uppercase",
            }}
          >
            {vehicle.make}
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "22px",
              color: "var(--ivory)",
              marginTop: "6px",
              lineHeight: 1.2,
              letterSpacing: "0.02em",
            }}
          >
            {vehicle.model}
          </div>
          <div
            aria-hidden
            style={{ marginTop: "12px", height: "1px", width: "40px", background: "var(--gold)" }}
          />
          <p
            style={{
              marginTop: "12px",
              color: "var(--chrome)",
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              lineHeight: 1.65,
              letterSpacing: "0.015em",
            }}
          >
            {vehicle.description}
          </p>
          <a
            href="#reserve"
            onClick={(e) => { e.preventDefault(); smoothScrollTo("#reserve"); }}
            className="inline-flex items-center justify-center"
            style={{
              marginTop: "16px",
              padding: "10px 22px",
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--gold)",
              background: "transparent",
              border: "1px solid var(--gold)",
              borderRadius: "2px",
              transition: "background 300ms, color 300ms",
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
            Info
          </a>
        </div>
      </article>
    );
  }

  return (
    <article
      data-fleet-card
      style={{
        flex: "0 0 auto",
        width: "clamp(520px, 55vw, 860px)",
        display: "flex",
        flexDirection: "column",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${vehicle.make} ${vehicle.model}`}
    >
      {/* Image with text overlay */}
      <div
        style={{
          position: "relative",
          height: "clamp(400px, 58svh, 580px)",
          overflow: "hidden",
        }}
      >
        <div
          data-fleet-image
          style={{
            position: "absolute",
            inset: 0,
            transition: "filter 600ms cubic-bezier(0.4,0,0.2,1)",
            filter: hovered ? "brightness(1)" : "brightness(0.85)",
            willChange: "transform, filter",
            pointerEvents: "none",
          }}
        >
          {vehicle.image ? (
            <NextImage
              src={vehicle.image}
              alt={`${vehicle.make} ${vehicle.model}`}
              fill
              priority={index < 2}
              sizes="55vw"
              draggable={false}
              style={{ objectFit: "contain", objectPosition: "center", userSelect: "none" }}
            />
          ) : (
            <PlaceholderMark label={`${vehicle.make} ${vehicle.model}`} />
          )}
        </div>

        {/* Bottom gradient for text legibility */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "60%",
            background: "linear-gradient(to top, rgba(5,5,5,0.7) 0%, transparent 100%)",
            pointerEvents: "none",
          }}
        />

        <div
          data-fleet-text
          style={{
            position: "absolute",
            left: "clamp(24px, 3.5vw, 48px)",
            bottom: "clamp(20px, 3vh, 36px)",
            maxWidth: "min(460px, 75%)",
            zIndex: 2,
            opacity: 0,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "11px",
              letterSpacing: "0.5em",
              color: "var(--gold)",
              textTransform: "uppercase",
            }}
          >
            {vehicle.make}
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 400,
              fontSize: "clamp(22px, 2.4vw, 28px)",
              color: "var(--ivory)",
              marginTop: "8px",
              lineHeight: 1.15,
              letterSpacing: "0.02em",
            }}
          >
            {vehicle.model}
          </div>
          <div
            data-fleet-line
            aria-hidden
            style={{
              marginTop: "14px",
              height: "1px",
              width: 0,
              maxWidth: hovered ? 120 : 60,
              background: "var(--gold)",
              transition: "max-width 500ms cubic-bezier(0.4,0,0.2,1)",
            }}
          />
          <p
            style={{
              marginTop: "14px",
              color: "var(--chrome)",
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              lineHeight: 1.65,
              letterSpacing: "0.015em",
              maxWidth: "44ch",
            }}
          >
            {vehicle.description}
          </p>
        </div>
      </div>

      {/* Explore button below image — aligned with text overlay */}
      <div style={{ paddingTop: "clamp(16px, 2vh, 24px)", paddingLeft: "clamp(24px, 3.5vw, 48px)" }}>
        <a
          href="#reserve"
          onClick={(e) => { e.preventDefault(); smoothScrollTo("#reserve"); }}
          className="inline-flex items-center justify-center btn-gold"
          style={{
            padding: "12px 28px",
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "11px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--gold)",
            background: "transparent",
            border: "1px solid var(--gold)",
            borderRadius: "2px",
            transition: "background 300ms, color 300ms",
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
          Explore
        </a>
      </div>
    </article>
  );
}

function PlaceholderMark({ label }: { label: string }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{
        position: "absolute",
        inset: 0,
        background:
          "radial-gradient(ellipse at center, rgba(24,24,24,1) 0%, var(--obsidian) 70%)",
      }}
    >
      <div
        style={{
          border: "1px solid rgba(212,160,74,0.32)",
          padding: "clamp(48px, 6vw, 96px) clamp(64px, 8vw, 128px)",
          textAlign: "center",
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
            marginTop: "20px",
            fontFamily: "var(--font-display)",
            fontStyle: "italic",
            fontSize: "clamp(20px, 2.4vw, 28px)",
            color: "var(--chrome)",
          }}
        >
          {label}
        </div>
      </div>
    </div>
  );
}
