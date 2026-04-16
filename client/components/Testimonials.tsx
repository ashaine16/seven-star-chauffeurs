"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type QA = { q: string; a: string };

const FAQS: QA[] = [
  {
    q: "How do I reserve, and how soon will I hear back?",
    a: "Submit the reservation form or telephone us directly. A concierge, not an auto-responder, replies within the hour around the clock. Complex itineraries are confirmed the same day.",
  },
  {
    q: "Which vehicle will be assigned to my engagement?",
    a: "You choose. We hold the Phantom, Ghost, Cullinan, Maybach GLS 600, and Escalade IQ on retainer and assign by occasion, or by preference. The specific chassis and trim is confirmed in writing before the day.",
  },
  {
    q: "Are your chauffeurs vetted beyond a clean driving record?",
    a: "Every chauffeur clears a five-stage selection: advanced driver training, confidentiality certification, reference audit, defensive-driving retest, and personal deportment review. Many have served in diplomatic or executive-protection roles.",
  },
  {
    q: "Do you sign non-disclosure agreements?",
    a: "Yes, as standard when the engagement calls for it. Our vehicles carry no livery, our chauffeurs do not discuss the cabin, and our records are held under professional discretion protocols.",
  },
  {
    q: "What is your cancellation and revision policy?",
    a: "Itineraries may be revised en route without charge. Cancellations more than twenty-four hours prior are refunded in full; within the window, a fifty-percent retainer is held. Weddings and multi-day engagements carry bespoke terms.",
  },
  {
    q: "Do you serve destinations beyond Vancouver?",
    a: "Yes. Sea-to-Sky, Whistler, the Okanagan, cross-border Seattle, and charter-flight connections throughout Western Canada. Long-haul engagements are quoted on request.",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctxGsap = gsap.context(() => {
      gsap.fromTo(
        section.querySelector("[data-faq-heading]"),
        { y: 32, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        },
      );

      const items = section.querySelectorAll<HTMLElement>("[data-faq-item]");
      gsap.fromTo(
        items,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "cubic-bezier(0.4, 0, 0.2, 1)",
          stagger: 0.08,
          scrollTrigger: {
            trigger: items[0],
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, section);

    return () => ctxGsap.revert();
  }, []);

  return (
    <section
      id="faq"
      ref={sectionRef}
      aria-label="Frequently Asked"
      className="relative w-full bg-[var(--obsidian)]"
      style={{ overflow: "hidden" }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 80% 60% at 82% 18%, rgba(197,165,90,0.08), transparent 60%)",
        }}
      />

      <div
        className="mx-auto relative"
        style={{
          maxWidth: "1400px",
          padding:
            "clamp(72px, 10vh, 120px) clamp(24px, 5vw, 64px) clamp(80px, 12vh, 140px)",
        }}
      >
        <div
          className="grid md:grid-cols-12"
          style={{ gap: "clamp(32px, 5vw, 80px)" }}
        >
          <div
            className="md:col-span-4"
            data-faq-heading
            style={{ willChange: "transform, opacity" }}
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
              IV.&nbsp;&nbsp;Enquiries
            </div>
            <div
              style={{
                height: "1px",
                width: "60px",
                background: "var(--gold)",
                marginTop: "18px",
              }}
              aria-hidden
            />
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                color: "var(--ivory)",
                fontSize: "clamp(30px, 4vw, 44px)",
                letterSpacing: "0.03em",
                lineHeight: 1.15,
                marginTop: "clamp(20px, 3vh, 32px)",
              }}
            >
              The questions
              <br />
              <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
                we hear most often.
              </em>
            </h2>
            <p
              style={{
                marginTop: "20px",
                maxWidth: "38ch",
                color: "var(--chrome)",
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                lineHeight: 1.7,
                letterSpacing: "0.02em",
              }}
            >
              Anything else? Telephone the concierge. We answer within the
              hour.
            </p>
          </div>

          <div className="md:col-span-8">
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                borderTop: "1px solid rgba(184,184,184,0.12)",
              }}
            >
              {FAQS.map((item, i) => (
                <FaqItem key={item.q} index={i} qa={item} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqItem({ index, qa }: { index: number; qa: QA }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  return (
    <li
      data-faq-item
      style={{
        borderBottom: "1px solid rgba(184,184,184,0.12)",
        willChange: "transform, opacity",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        style={{
          width: "100%",
          background: "transparent",
          border: 0,
          padding: "clamp(20px, 2.4vh, 28px) 0",
          display: "flex",
          alignItems: "flex-start",
          gap: "clamp(20px, 3vw, 40px)",
          cursor: "pointer",
          textAlign: "left",
          color: "var(--ivory)",
          transition: "color 300ms cubic-bezier(0.33,1,0.68,1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--gold)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--ivory)";
        }}
      >
        <span
          aria-hidden
          style={{
            flex: "0 0 auto",
            width: "clamp(36px, 4vw, 52px)",
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            fontSize: "11px",
            letterSpacing: "0.4em",
            color: "var(--gold)",
            textTransform: "uppercase",
            paddingTop: "6px",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          style={{
            flex: 1,
            fontFamily: "var(--font-display)",
            fontWeight: 400,
            fontSize: "clamp(18px, 2vw, 24px)",
            letterSpacing: "0.01em",
            lineHeight: 1.35,
            color: "inherit",
            transition: "color 300ms cubic-bezier(0.33,1,0.68,1)",
          }}
        >
          {qa.q}
        </span>
        <span
          aria-hidden
          style={{
            flex: "0 0 auto",
            width: "18px",
            height: "18px",
            marginTop: "10px",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              width: "18px",
              height: "1px",
              background: "var(--gold)",
              transform: "translateY(-50%)",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              height: "18px",
              width: "1px",
              background: "var(--gold)",
              transform: `translateX(-50%) scaleY(${open ? 0 : 1})`,
              transformOrigin: "center",
              transition: "transform 400ms cubic-bezier(0.33,1,0.68,1)",
            }}
          />
        </span>
      </button>

      <div
        ref={panelRef}
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 500ms cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            style={{
              padding: "0 0 clamp(24px, 3vh, 32px) calc(clamp(36px, 4vw, 52px) + clamp(20px, 3vw, 40px))",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(-6px)",
              transition:
                "opacity 500ms cubic-bezier(0.33,1,0.68,1) 80ms, transform 500ms cubic-bezier(0.33,1,0.68,1) 80ms",
            }}
          >
            <p
              style={{
                margin: 0,
                maxWidth: "62ch",
                color: "var(--chrome)",
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 300,
                lineHeight: 1.75,
                letterSpacing: "0.02em",
              }}
            >
              {qa.a}
            </p>
          </div>
        </div>
      </div>
    </li>
  );
}
