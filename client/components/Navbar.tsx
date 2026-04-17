"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import NextImage from "next/image";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollToPlugin);
}

const LINKS = [
  { label: "The Fleet", href: "#fleet" },
  { label: "Services", href: "#services" },
  { label: "The Experience", href: "#experience" },
  { label: "Enquiries", href: "#faq" },
];

const MOBILE_BP = 768;

function getNavHeight() {
  const nav = document.querySelector("nav[aria-label='Primary']");
  return nav ? nav.getBoundingClientRect().height : 72;
}

function smoothScrollTo(target: string) {
  const el = document.querySelector(target);
  if (el) {
    const navH = getNavHeight();
    const top = el.getBoundingClientRect().top + window.scrollY - navH;
    gsap.to(window, {
      duration: 1.2,
      ease: "power3.out",
      scrollTo: { y: Math.max(0, top), autoKill: true },
    });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const check = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
      setIsMobile(window.innerWidth < MOBILE_BP);
    };
    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  useEffect(() => {
    if (!drawerRef.current) return;
    if (menuOpen) {
      gsap.fromTo(
        drawerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" },
      );
      const links = drawerRef.current.querySelectorAll<HTMLElement>("[data-drawer-link]");
      gsap.fromTo(
        links,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.06, delay: 0.1 },
      );
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (menuOpen) {
      setMenuOpen(false);
      document.body.style.overflow = "";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          smoothScrollTo(href);
        });
      });
    } else {
      smoothScrollTo(href);
    }
  }, [menuOpen]);

  return (
    <nav
      aria-label="Primary"
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: isMobile || scrolled || menuOpen ? "rgba(5,5,5,0.97)" : "transparent",
        backdropFilter: isMobile || scrolled || menuOpen ? "blur(16px)" : "none",
        WebkitBackdropFilter: isMobile || scrolled || menuOpen ? "blur(16px)" : "none",
        borderBottom: isMobile || scrolled
          ? "1px solid rgba(197,165,90,0.18)"
          : "1px solid transparent",
        transition:
          "background 300ms cubic-bezier(0.4,0,0.2,1), backdrop-filter 300ms, border-color 300ms",
      }}
    >
      {/* Nav bar content */}
      <div
        className="mx-auto flex items-center justify-between"
        style={{
          maxWidth: "1400px",
          padding: "clamp(6px, 0.8vw, 10px) clamp(20px, 4vw, 48px)",
          position: "relative",
          zIndex: 10,
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

        {/* Desktop links */}
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
                  transition: "color 300ms",
                  textDecoration: "none",
                  cursor: "pointer",
                  padding: "8px 0",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "var(--gold)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = scrolled ? "var(--gold)" : "var(--ivory)";
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop reserve button */}
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
            transition: "background 300ms, color 300ms",
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

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label="Open menu"
          className="md:hidden flex flex-col items-center justify-center"
          style={{
            background: "transparent",
            border: 0,
            padding: 10,
            width: "44px",
            height: "44px",
            position: "relative",
            cursor: "pointer",
          }}
          onClick={() => setMenuOpen(true)}
        >
          <span style={{ width: "22px", height: "1.5px", background: "var(--gold)", position: "absolute", transform: "translateY(-5px)" }} />
          <span style={{ width: "22px", height: "1.5px", background: "var(--gold)", position: "absolute" }} />
          <span style={{ width: "22px", height: "1.5px", background: "var(--gold)", position: "absolute", transform: "translateY(5px)" }} />
        </button>
      </div>

      {/* Mobile fullscreen drawer */}
      {menuOpen && (
        <div
          ref={drawerRef}
          className="md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 5,
            background: "rgba(5,5,5,0.99)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Drawer header */}
          <div
            className="flex items-center justify-between"
            style={{ padding: "clamp(6px, 0.8vw, 10px) clamp(20px, 4vw, 48px)" }}
          >
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              aria-label="Seven Star Chauffeurs home"
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
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              style={{
                background: "transparent",
                border: 0,
                width: "44px",
                height: "44px",
                position: "relative",
                cursor: "pointer",
              }}
            >
              <span style={{ width: "22px", height: "1.5px", background: "var(--gold)", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(45deg)" }} />
              <span style={{ width: "22px", height: "1.5px", background: "var(--gold)", position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%) rotate(-45deg)" }} />
            </button>
          </div>

          {/* Drawer links */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingBottom: "clamp(40px, 8vh, 80px)" }}>
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-drawer-link
                onClick={(e) => handleNavClick(e, l.href)}
                style={{
                  display: "block",
                  padding: "clamp(14px, 2.2vh, 20px) 24px",
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "clamp(22px, 5vw, 30px)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--ivory)",
                  textDecoration: "none",
                  textAlign: "center",
                }}
              >
                {l.label}
              </a>
            ))}

            <div aria-hidden style={{ width: "48px", height: "1px", background: "var(--gold)", margin: "clamp(20px, 3vh, 32px) 0" }} />

            <a
              href="#reserve"
              data-drawer-link
              onClick={(e) => handleNavClick(e, "#reserve")}
              style={{
                padding: "16px 48px",
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
        </div>
      )}
    </nav>
  );
}
