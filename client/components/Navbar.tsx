"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import NextImage from "next/image";

/* ────────────────────────────────────────────────────────────
   Constants
   ──────────────────────────────────────────────────────────── */

const LINKS = [
  { label: "The Fleet", href: "#fleet" },
  { label: "Services", href: "#services" },
  { label: "The Experience", href: "#experience" },
  { label: "Enquiries", href: "#faq" },
];

const SECTION_IDS = ["fleet", "services", "experience", "faq", "reserve"];

/* ────────────────────────────────────────────────────────────
   Smooth scroll helper (uses native scrollTo, works with CSS
   scroll-margin-top on section[id] in globals.css)
   ──────────────────────────────────────────────────────────── */

function smoothScrollTo(target: string) {
  if (target === "#" || target === "#top") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  const el = document.querySelector(target);
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

/* ────────────────────────────────────────────────────────────
   Navbar
   ──────────────────────────────────────────────────────────── */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navRef = useRef<HTMLElement>(null);

  /* ── Scroll listener: background + active section ── */
  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > window.innerHeight * 0.35);

        /* Determine active section */
        const navH = navRef.current?.getBoundingClientRect().height ?? 80;
        let current = "";
        for (const id of SECTION_IDS) {
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= navH + 120) {
              current = id;
            }
          }
        }
        setActiveSection(current);
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Lock body when drawer is open ── */
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  /* ── Nav click handler ── */
  const handleNavClick = useCallback(
    (e: React.MouseEvent, href: string) => {
      e.preventDefault();
      if (menuOpen) {
        setMenuOpen(false);
        /* Wait for drawer close animation before scrolling */
        setTimeout(() => smoothScrollTo(href), 350);
      } else {
        smoothScrollTo(href);
      }
    },
    [menuOpen],
  );

  const isActive = (href: string) => {
    const id = href.replace("#", "");
    return activeSection === id;
  };

  return (
    <>
      <nav
        ref={navRef}
        aria-label="Primary"
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled || menuOpen ? "rgba(5,5,5,0.97)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(18px) saturate(1.2)" : "none",
          WebkitBackdropFilter: scrolled || menuOpen ? "blur(18px) saturate(1.2)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(197,165,90,0.18)"
            : "1px solid transparent",
          transition:
            "background 500ms cubic-bezier(0.4,0,0.2,1), backdrop-filter 500ms, border-color 500ms",
        }}
      >
        <div
          className="mx-auto flex items-center justify-between"
          style={{
            maxWidth: "1400px",
            padding: "clamp(6px, 0.8vw, 10px) clamp(20px, 4vw, 48px)",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* ── Logo ── */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setMenuOpen(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Seven Star Chauffeurs home"
            className="flex items-center"
            style={{ flexShrink: 0 }}
          >
            <NextImage
              src="/logos/seven-star-mark.webp"
              alt="Seven Star Chauffeurs"
              width={400}
              height={400}
              priority
              style={{
                height: "clamp(52px, 5.5vw, 88px)",
                width: "auto",
                display: "block",
              }}
            />
          </a>

          {/* ── Desktop links ── */}
          <ul
            className="hidden md:flex items-center"
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              gap: "clamp(24px, 2.8vw, 44px)",
            }}
          >
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  className="nav-link"
                  data-active={isActive(l.href) ? "true" : undefined}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontWeight: 400,
                    fontSize: "11.5px",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase" as const,
                    color: isActive(l.href)
                      ? "var(--gold)"
                      : scrolled
                        ? "var(--ivory)"
                        : "var(--ivory)",
                    textDecoration: "none",
                    cursor: "pointer",
                    padding: "8px 0",
                    display: "inline-block",
                    position: "relative" as const,
                    transition: "color 400ms cubic-bezier(0.33,1,0.68,1)",
                  }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* ── Desktop reserve button ── */}
          <a
            href="#reserve"
            onClick={(e) => handleNavClick(e, "#reserve")}
            className="hidden md:inline-flex items-center justify-center btn-gold"
            style={{
              padding: "10px 24px",
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "10.5px",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: isActive("#reserve")
                ? "var(--obsidian)"
                : scrolled
                  ? "var(--obsidian)"
                  : "var(--gold)",
              background: isActive("#reserve")
                ? "var(--gold)"
                : scrolled
                  ? "var(--gold)"
                  : "transparent",
              border: "1px solid var(--gold)",
              borderRadius: "2px",
              cursor: "pointer",
              textDecoration: "none",
              transition:
                "background 400ms cubic-bezier(0.33,1,0.68,1), color 400ms cubic-bezier(0.33,1,0.68,1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--gold)";
              e.currentTarget.style.color = "var(--obsidian)";
            }}
            onMouseLeave={(e) => {
              const filled = scrolled || isActive("#reserve");
              e.currentTarget.style.background = filled ? "var(--gold)" : "transparent";
              e.currentTarget.style.color = filled ? "var(--obsidian)" : "var(--gold)";
            }}
          >
            Reserve
          </a>

          {/* ── Mobile hamburger / X toggle ── */}
          <button
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="md:hidden"
            style={{
              background: "transparent",
              border: 0,
              padding: 10,
              width: "44px",
              height: "44px",
              position: "relative",
              cursor: "pointer",
              zIndex: 20,
            }}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {/* Top bar */}
            <span
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "22px",
                height: "1.5px",
                background: "var(--gold)",
                transform: menuOpen
                  ? "translate(-50%, -50%) rotate(45deg)"
                  : "translate(-50%, calc(-50% - 5px))",
                transition: "transform 400ms cubic-bezier(0.33,1,0.68,1)",
                transformOrigin: "center",
              }}
            />
            {/* Middle bar */}
            <span
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "22px",
                height: "1.5px",
                background: "var(--gold)",
                transform: "translate(-50%, -50%)",
                opacity: menuOpen ? 0 : 1,
                transition:
                  "opacity 300ms cubic-bezier(0.33,1,0.68,1)",
              }}
            />
            {/* Bottom bar */}
            <span
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: "22px",
                height: "1.5px",
                background: "var(--gold)",
                transform: menuOpen
                  ? "translate(-50%, -50%) rotate(-45deg)"
                  : "translate(-50%, calc(-50% + 5px))",
                transition: "transform 400ms cubic-bezier(0.33,1,0.68,1)",
                transformOrigin: "center",
              }}
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile fullscreen drawer ── */}
      <div
        className="md:hidden"
        aria-hidden={!menuOpen}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 45,
          background: "rgba(5,5,5,0.99)",
          display: "flex",
          flexDirection: "column",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 400ms cubic-bezier(0.33,1,0.68,1)",
        }}
      >
        {/* Spacer for nav bar height */}
        <div style={{ height: "clamp(68px, 8vw, 108px)", flexShrink: 0 }} />

        {/* Drawer links */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(4px, 1vh, 8px)",
            paddingBottom: "clamp(40px, 8vh, 80px)",
          }}
        >
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => handleNavClick(e, l.href)}
              style={{
                display: "block",
                padding: "clamp(14px, 2.4vh, 22px) 24px",
                fontFamily: "var(--font-display)",
                fontWeight: 400,
                fontSize: "clamp(24px, 5.5vw, 32px)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: isActive(l.href) ? "var(--gold)" : "var(--ivory)",
                textDecoration: "none",
                textAlign: "center",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 500ms cubic-bezier(0.33,1,0.68,1) ${100 + i * 60}ms, transform 500ms cubic-bezier(0.33,1,0.68,1) ${100 + i * 60}ms, color 300ms`,
              }}
            >
              {l.label}
            </a>
          ))}

          {/* Gold divider */}
          <div
            aria-hidden
            style={{
              width: "48px",
              height: "1px",
              background: "var(--gold)",
              margin: "clamp(16px, 2.5vh, 28px) 0",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "scaleX(1)" : "scaleX(0)",
              transition: "opacity 500ms 300ms, transform 600ms cubic-bezier(0.33,1,0.68,1) 300ms",
            }}
          />

          {/* Reserve button */}
          <a
            href="#reserve"
            onClick={(e) => handleNavClick(e, "#reserve")}
            className="btn-gold"
            style={{
              padding: "16px 52px",
              fontFamily: "var(--font-sans)",
              fontWeight: 500,
              fontSize: "11px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--obsidian)",
              background: "var(--gold)",
              border: "1px solid var(--gold)",
              borderRadius: "2px",
              textDecoration: "none",
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transition: `opacity 500ms cubic-bezier(0.33,1,0.68,1) ${100 + LINKS.length * 60 + 60}ms, transform 500ms cubic-bezier(0.33,1,0.68,1) ${100 + LINKS.length * 60 + 60}ms`,
            }}
          >
            Reserve Now
          </a>

          {/* Contact info at bottom of drawer */}
          <div
            style={{
              marginTop: "clamp(28px, 4vh, 48px)",
              textAlign: "center",
              opacity: menuOpen ? 1 : 0,
              transition: "opacity 600ms 500ms",
            }}
          >
            <a
              href="tel:+16040000000"
              style={{
                display: "block",
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 300,
                letterSpacing: "0.08em",
                color: "var(--chrome)",
                textDecoration: "none",
                marginBottom: "8px",
              }}
            >
              +1 (604) 000 0000
            </a>
            <a
              href="mailto:reservations@sevenstarchauffeurs.ca"
              style={{
                display: "block",
                fontFamily: "var(--font-sans)",
                fontSize: "13px",
                fontWeight: 300,
                letterSpacing: "0.02em",
                color: "var(--chrome)",
                textDecoration: "none",
              }}
            >
              reservations@sevenstarchauffeurs.ca
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
