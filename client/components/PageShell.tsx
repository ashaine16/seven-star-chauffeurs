"use client";

import { useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Props {
  children: ReactNode;
  breadcrumbs: { label: string; href: string }[];
}

export default function PageShell({ children, breadcrumbs }: Props) {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!mainRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        mainRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" }
      );
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={mainRef} className="min-h-screen" style={{ background: "var(--obsidian)" }}>
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        style={{
          padding: "clamp(100px, 12vh, 140px) clamp(24px, 5vw, 64px) 0",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        <ol
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            listStyle: "none",
            margin: 0,
            padding: 0,
            fontFamily: "var(--font-sans)",
            fontSize: "12px",
            fontWeight: 400,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          {breadcrumbs.map((crumb, i) => (
            <li key={crumb.href} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {i > 0 && (
                <span style={{ color: "rgba(184,184,184,0.4)" }} aria-hidden>/</span>
              )}
              {i < breadcrumbs.length - 1 ? (
                <Link
                  href={crumb.href}
                  style={{
                    color: "var(--gold)",
                    textDecoration: "none",
                    transition: "opacity 300ms",
                  }}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span style={{ color: "var(--chrome)" }}>{crumb.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {children}
    </main>
  );
}
