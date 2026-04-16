"use client";

import { useEffect, useState } from "react";
import NextImage from "next/image";

const LINKS = [
  { label: "Fleet", href: "#fleet" },
  { label: "Services", href: "#services" },
  { label: "Experience", href: "#experience" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled ? "rgba(5,5,5,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(197,165,90,0.18)"
          : "1px solid transparent",
        transition:
          "background 300ms cubic-bezier(0.4,0,0.2,1), backdrop-filter 300ms, border-color 300ms",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between"
        style={{
          maxWidth: "1400px",
          padding: "clamp(6px, 0.8vw, 10px) clamp(20px, 4vw, 48px)",
        }}
      >
        <a href="#top" aria-label="Seven Star Chauffeurs home" className="flex items-center gap-3">
          <NextImage
            src="/logos/seven-star-mark.png"
            alt="Seven Star Chauffeurs"
            width={400}
            height={400}
            priority
            style={{ height: "clamp(72px, 7vw, 96px)", width: "auto", display: "block" }}
          />
        </a>

        <ul className="hidden md:flex items-center gap-8 lg:gap-10" style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="link-ivory"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "13px",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: scrolled ? "var(--gold)" : "var(--ivory)",
                  transition: "color 300ms cubic-bezier(0.4,0,0.2,1)",
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#reserve"
          className="btn-gold hidden md:inline-flex items-center justify-center"
          style={{
            padding: "12px 22px",
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "12px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: scrolled ? "var(--obsidian)" : "var(--gold)",
            background: scrolled ? "var(--gold)" : "transparent",
            border: "1px solid var(--gold)",
            borderRadius: "2px",
            transition: "background 300ms, color 300ms",
          }}
        >
          Reserve
        </a>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          className="md:hidden flex flex-col items-end gap-[6px]"
          style={{ background: "transparent", border: 0, padding: 8 }}
        >
          <span style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
          <span style={{ width: "20px", height: "1px", background: "var(--gold)" }} />
          <span style={{ width: "24px", height: "1px", background: "var(--gold)" }} />
        </button>
      </div>
    </nav>
  );
}
