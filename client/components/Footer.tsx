"use client";

import { useLayoutEffect, useRef } from "react";
import NextImage from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FLEET_LINKS = [
  { label: "Rolls-Royce Phantom", href: "#fleet" },
  { label: "Rolls-Royce Ghost", href: "#fleet" },
  { label: "Rolls-Royce Cullinan", href: "#fleet" },
  { label: "Mercedes-Maybach GLS", href: "#fleet" },
  { label: "Cadillac Escalade IQ", href: "#fleet" },
  { label: "Luxury Party Bus", href: "#fleet" },
];

const SERVICE_LINKS = [
  { label: "Airport Transfers", href: "#services" },
  { label: "Corporate Chauffeur", href: "#services" },
  { label: "Wedding Chauffeur", href: "#services" },
  { label: "Whistler & Sea-to-Sky", href: "#services" },
  { label: "Nightlife & Events", href: "#services" },
  { label: "Hourly Charter", href: "#services" },
];

const SITE_LINKS = [
  { label: "The Fleet", href: "#fleet" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Enquiries", href: "#faq" },
  { label: "Reserve", href: "#reserve" },
];

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const year = new Date().getFullYear();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll<HTMLElement>("[data-footer-reveal]"),
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "cubic-bezier(0.16, 1, 0.3, 1)",
          stagger: 0.08,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={ref}
      aria-label="Site footer"
      className="relative w-full"
      style={{
        background: "var(--obsidian)",
        overflow: "hidden",
        borderTop: "1px solid rgba(212,160,74,0.14)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(197,165,90,0.06), transparent 70%)",
        }}
      />

      <div
        className="mx-auto relative"
        style={{
          maxWidth: "1400px",
          padding:
            "clamp(72px, 10vh, 120px) clamp(24px, 5vw, 64px) clamp(36px, 5vh, 56px)",
        }}
      >
        {/* Top editorial line — hairline with gold segment at 1/8 mark */}
        <div
          aria-hidden
          style={{
            position: "relative",
            height: "1px",
            width: "min(480px, 60vw)",
            background: "rgba(184,184,184,0.12)",
            marginBottom: "clamp(40px, 6vh, 72px)",
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

        {/* Main grid: brand | fleet | services | connect */}
        <div
          className="grid md:grid-cols-12"
          style={{
            gap: "clamp(40px, 5vw, 72px)",
            alignItems: "start",
          }}
        >
          {/* Brand */}
          <div
            className="md:col-span-4"
            data-footer-reveal
            style={{ willChange: "transform, opacity" }}
          >
            <a
              href="#top"
              aria-label="Seven Star Chauffeurs"
              style={{
                display: "inline-block",
                marginLeft: "-6px",
              }}
            >
              <NextImage
                src="/logos/seven-star-mark.png"
                alt="Seven Star Chauffeurs"
                width={400}
                height={400}
                style={{
                  height: "clamp(88px, 9vw, 120px)",
                  width: "auto",
                  display: "block",
                  filter: "drop-shadow(0 2px 20px rgba(5,5,5,0.5))",
                }}
              />
            </a>
            <p
              style={{
                marginTop: "clamp(20px, 3vh, 28px)",
                color: "var(--chrome)",
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 300,
                lineHeight: 1.75,
                letterSpacing: "0.02em",
                maxWidth: "36ch",
              }}
            >
              Vancouver's most discreet private chauffeur service. Six vehicles,
              one standard, reserved one engagement at a time.
            </p>

            <div
              style={{
                marginTop: "clamp(24px, 3vh, 32px)",
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(15px, 1.5vw, 17px)",
                color: "var(--gold)",
                letterSpacing: "0.04em",
              }}
            >
              Discretion, driven.
            </div>
          </div>

          {/* Fleet */}
          <div
            className="md:col-span-2"
            data-footer-reveal
            style={{ willChange: "transform, opacity" }}
          >
            <FooterHeading>The Fleet</FooterHeading>
            <FooterList items={FLEET_LINKS} />
          </div>

          {/* Services */}
          <div
            className="md:col-span-3"
            data-footer-reveal
            style={{ willChange: "transform, opacity" }}
          >
            <FooterHeading>Services</FooterHeading>
            <FooterList items={SERVICE_LINKS} />
          </div>

          {/* Connect */}
          <div
            className="md:col-span-3"
            data-footer-reveal
            style={{ willChange: "transform, opacity" }}
          >
            <FooterHeading>Connect</FooterHeading>
            <ul
              style={{
                margin: 0,
                padding: 0,
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "clamp(14px, 1.8vh, 20px)",
              }}
            >
              <FooterContact
                eyebrow="Telephone"
                value="+1 (604) 000 0000"
                href="tel:+16040000000"
              />
              <FooterContact
                eyebrow="Correspondence"
                value="reservations@sevenstarchauffeurs.ca"
                href="mailto:reservations@sevenstarchauffeurs.ca"
              />
              <FooterContact
                eyebrow="Studio"
                value={`Vancouver, British Columbia`}
              />
              <FooterContact
                eyebrow="Availability"
                value="By appointment, 24 hours a day"
              />
            </ul>

            <div
              style={{
                marginTop: "clamp(24px, 3vh, 32px)",
                display: "flex",
                gap: "12px",
              }}
            >
              <SocialIcon
                href="https://instagram.com"
                label="Instagram"
                icon={<InstagramIcon />}
              />
              <SocialIcon
                href="https://www.linkedin.com"
                label="LinkedIn"
                icon={<LinkedInIcon />}
              />
              <SocialIcon
                href="mailto:reservations@sevenstarchauffeurs.ca"
                label="Email"
                icon={<MailIcon />}
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          aria-hidden
          style={{
            height: "1px",
            background: "rgba(184,184,184,0.08)",
            marginTop: "clamp(56px, 8vh, 96px)",
            marginBottom: "clamp(28px, 3vh, 36px)",
          }}
        />

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
          style={{ gap: "clamp(16px, 2vh, 24px)" }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "clamp(18px, 3vw, 36px)",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: 300,
                color: "var(--chrome)",
                letterSpacing: "0.04em",
              }}
            >
              © {year} Seven Star Chauffeurs. All rights reserved.
            </span>
            <SmallLink href="#reserve">Privacy</SmallLink>
            <SmallLink href="#reserve">Terms</SmallLink>
            <SmallLink href="#reserve">Accessibility</SmallLink>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "clamp(20px, 3vw, 32px)",
            }}
          >
            <nav
              aria-label="Footer navigation"
              className="hidden md:flex"
              style={{
                alignItems: "center",
                gap: "clamp(20px, 2.6vw, 32px)",
              }}
            >
              {SITE_LINKS.map((l) => (
                <SmallLink key={l.href} href={l.href}>
                  {l.label}
                </SmallLink>
              ))}
            </nav>
            <BackToTop />
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontFamily: "var(--font-sans)",
        fontWeight: 400,
        fontSize: "11px",
        letterSpacing: "0.4em",
        textTransform: "uppercase",
        color: "var(--gold)",
        marginBottom: "clamp(18px, 2.4vh, 26px)",
      }}
    >
      {children}
    </div>
  );
}

function FooterList({
  items,
}: {
  items: { label: string; href: string }[];
}) {
  return (
    <ul
      style={{
        margin: 0,
        padding: 0,
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {items.map((item) => (
        <li key={item.label}>
          <a
            href={item.href}
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 300,
              fontSize: "14px",
              color: "var(--chrome)",
              letterSpacing: "0.015em",
              textDecoration: "none",
              transition: "color 300ms cubic-bezier(0.33,1,0.68,1)",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--ivory)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--chrome)";
            }}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

function FooterContact({
  eyebrow,
  value,
  href,
}: {
  eyebrow: string;
  value: string;
  href?: string;
}) {
  const Tag: React.ElementType = href ? "a" : "div";
  return (
    <li style={{ listStyle: "none" }}>
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "10px",
          fontWeight: 400,
          letterSpacing: "0.42em",
          textTransform: "uppercase",
          color: "var(--gold)",
          opacity: 0.85,
        }}
      >
        {eyebrow}
      </div>
      <Tag
        {...(href ? { href } : {})}
        style={{
          marginTop: "6px",
          display: "inline-block",
          fontFamily: "var(--font-sans)",
          fontSize: "14px",
          fontWeight: 300,
          color: "var(--ivory)",
          letterSpacing: "0.015em",
          textDecoration: "none",
          transition: "color 300ms cubic-bezier(0.33,1,0.68,1)",
          wordBreak: "break-word",
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLElement>) => {
          if (!href) return;
          (e.currentTarget as HTMLElement).style.color = "var(--gold)";
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLElement>) => {
          if (!href) return;
          (e.currentTarget as HTMLElement).style.color = "var(--ivory)";
        }}
      >
        {value}
      </Tag>
    </li>
  );
}

function SmallLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: "12px",
        fontWeight: 400,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "var(--chrome)",
        textDecoration: "none",
        transition: "color 300ms cubic-bezier(0.33,1,0.68,1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--gold)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--chrome)";
      }}
    >
      {children}
    </a>
  );
}

function BackToTop() {
  return (
    <a
      href="#top"
      className="inline-flex items-center"
      aria-label="Back to top"
      style={{
        gap: "10px",
        fontFamily: "var(--font-sans)",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.32em",
        textTransform: "uppercase",
        color: "var(--gold)",
        textDecoration: "none",
        padding: "10px 16px",
        border: "1px solid rgba(212,160,74,0.35)",
        borderRadius: "2px",
        transition:
          "background 400ms cubic-bezier(0.33,1,0.68,1), color 400ms cubic-bezier(0.33,1,0.68,1), border-color 400ms",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "var(--gold)";
        e.currentTarget.style.color = "var(--obsidian)";
        e.currentTarget.style.borderColor = "var(--gold)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
        e.currentTarget.style.color = "var(--gold)";
        e.currentTarget.style.borderColor = "rgba(212,160,74,0.35)";
      }}
    >
      <span>Top</span>
      <span aria-hidden style={{ display: "inline-block", transform: "translateY(-1px)" }}>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path
            d="M6 10V2M6 2L2.5 5.5M6 2L9.5 5.5"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  );
}

function SocialIcon({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      style={{
        width: "38px",
        height: "38px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(212,160,74,0.28)",
        borderRadius: "50%",
        color: "var(--chrome)",
        textDecoration: "none",
        transition:
          "color 400ms cubic-bezier(0.33,1,0.68,1), border-color 400ms cubic-bezier(0.33,1,0.68,1), transform 400ms",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--gold)";
        e.currentTarget.style.borderColor = "var(--gold)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--chrome)";
        e.currentTarget.style.borderColor = "rgba(212,160,74,0.28)";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {icon}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="4.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="3"
        width="18"
        height="18"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M7.5 10v7M7.5 7.5v.01M11 10v7M11 13c0-1.7 1.2-3 2.8-3s2.7 1.3 2.7 3v4"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M4 7l8 6 8-6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
