"use client";

import Link from "next/link";

interface Props {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "outline";
  className?: string;
}

export default function CTAButton({ href, children, variant = "gold", className = "" }: Props) {
  const base =
    "inline-flex items-center justify-center font-sans text-[11px] font-medium tracking-[0.28em] uppercase no-underline transition-all duration-500 rounded-[2px]";
  const gold =
    "bg-[var(--gold)] text-[var(--obsidian)] border border-[var(--gold)] hover:bg-transparent hover:text-[var(--gold)] btn-gold";
  const outline =
    "bg-transparent text-[var(--gold)] border border-[rgba(212,160,74,0.45)] hover:bg-[var(--gold)] hover:text-[var(--obsidian)] hover:border-[var(--gold)]";

  const isExternal = href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel");

  const styles: React.CSSProperties = {
    padding: "clamp(14px, 1.6vh, 18px) clamp(32px, 4vw, 48px)",
    letterSpacing: "0.28em",
  };

  if (isExternal) {
    return (
      <a
        href={href}
        className={`${base} ${variant === "gold" ? gold : outline} ${className}`}
        style={styles}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={`${base} ${variant === "gold" ? gold : outline} ${className}`}
      style={styles}
    >
      {children}
    </Link>
  );
}
