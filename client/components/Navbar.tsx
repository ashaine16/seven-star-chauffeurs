"use client";

import { useEffect, useState, useRef } from "react";
import NextImage from "next/image";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const LINKS = [
  { label: "The Fleet", href: "#fleet" },
  { label: "Services", href: "#services" },
  { label: "The Experience", href: "#experience" },
  { label: "Enquiries", href: "#faq" },
];

function smoothScrollTo(target: string, onDone?: () => void) {
  const navOffset = Math.min(Math.max(72, window.innerHeight * 0.09), 108);
  gsap.to(window, {
    duration: 1.4,
    ease: "cubic-bezier(0.16, 1, 0.3, 1)",
    scrollTo: { y: target, offsetY: navOffset, autoKill: true },
    onComplete: onDone,
  });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!drawerRef.current) return;
    if (menuOpen) {
      gsap.fromTo(
        drawerRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" },
      );
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    setTimeout(() => smoothScrollTo(href), 50);
  };

  return (
    <nav
      aria-label="Primary"
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: scrolled || menuOpen ? "rgba(5,5,5,0.92)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
        WebkitBackdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
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
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setMenuOpen(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          aria-label="Seven Star Chauffeurs home"
          className="flex items-center gap-3"
        >
          <NextImage
            src="/logos/seven-star-mark.webp"
            alt="Seven Star Chauffeurs"
            width={400}
            height={400}
            priority
            style={{ height: "clamp(56px, 6vw, 96px)", width: "auto", display: "block" }}
          />
        </a>

        <ul className="hidden md:flex items-center gap-8 lg:gap-10" style={{ margin: 0, padding: 0, listStyle: "none" }}>
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={(e) => handleNavClick(e, l.href)}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 400,
                  fontSize: "12px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: scrolled ? "var(--gold)" : "var(--ivory)",
                  transition: "color 300ms cubic-bezier(0.4,0,0.2,1)",
                  textDecoration: "none",
                  cursor: "pointer",
                  padding: "8px 0",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--gold)";
                  e.currentTarget.style.opacity = "1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = scrolled ? "var(--gold)" : "var(--ivory)";
                  e.currentTarget.style.opacity = "1";
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#reserve"
          onClick={(e) => handleNavClick(e, "#reserve")}
          className="hidden md:inline-flex items-center justify-center"
          style={{
            padding: "10px 22px",
            fontFamily: "var(--font-sans)",
            fontWeight: 500,
            fontSize: "11px",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: scrolled ? "var(--obsidian)" : "var(--gold)",
            background: scrolled ? "var(--gold)" : "transparent",
            border: "1px solid var(--gold)",
            borderRadius: "2px",
            cursor: "pointer",
            textDecoration: "none",
            transition: "background 300ms, color 300ms, transform 200ms",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "var(--gold)";
            e.currentTarget.style.color = "var(--obsidian)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = scrolled ? "var(--gold)" : "transparent";
            e.currentTarget.style.color = scrolled ? "var(--obsidian)" : "var(--gold)";
          }}
        >
          Reserve
        </a>

        {/* Mobile hamburger / close */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="md:hidden flex flex-col items-center justify-center"
          style={{
            background: "transparent",
            border: 0,
            padding: 10,
            width: "44px",
            height: "44px",
            position: "relative",
          }}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span
            style={{
              width: "22px",
              height: "1.5px",
              background: "var(--gold)",
              position: "absolute",
              transition: "transform 300ms, opacity 200ms",
              transform: menuOpen ? "rotate(45deg)" : "translateY(-5px)",
            }}
          />
          <span
            style={{
              width: "22px",
              height: "1.5px",
              background: "var(--gold)",
              position: "absolute",
              transition: "opacity 200ms",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            style={{
              width: "22px",
              height: "1.5px",
              background: "var(--gold)",
              position: "absolute",
              transition: "transform 300ms, opacity 200ms",
              transform: menuOpen ? "rotate(-45deg)" : "translateY(5px)",
            }}
          />
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          ref={drawerRef}
          className="md:hidden"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(5,5,5,0.98)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            zIndex: -1,
            padding: "0 clamp(32px, 8vw, 64px)",
          }}
        >
          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0",
              width: "100%",
              maxWidth: "320px",
            }}
          >
            {LINKS.map((l, i) => (
              <div key={l.href} style={{ width: "100%", textAlign: "center" }}>
                <a
                  href={l.href}
                  onClick={(e) => handleNavClick(e, l.href)}
                  style={{
                    display: "block",
                    padding: "clamp(16px, 2.5vh, 22px) 0",
                    fontFamily: "var(--font-display)",
                    fontWeight: 400,
                    fontSize: "clamp(20px, 3.5vw, 28px)",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--ivory)",
                    textDecoration: "none",
                  }}
                >
                  {l.label}
                </a>
                {i < LINKS.length - 1 && (
                  <div
                    aria-hidden
                    style={{
                      height: "1px",
                      width: "40px",
                      margin: "0 auto",
                      background: "rgba(212,160,74,0.25)",
                    }}
                  />
                )}
              </div>
            ))}
          </nav>

          <div
            aria-hidden
            style={{
              width: "60px",
              height: "1px",
              background: "var(--gold)",
              margin: "clamp(24px, 4vh, 36px) auto",
            }}
          />

          <a
            href="#reserve"
            onClick={(e) => handleNavClick(e, "#reserve")}
            style={{
              padding: "16px 44px",
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
            }}
          >
            Reserve Now
          </a>
        </div>
      )}
    </nav>
  );
}
