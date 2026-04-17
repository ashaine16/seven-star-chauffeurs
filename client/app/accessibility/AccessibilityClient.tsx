"use client";

import PageShell from "@/components/PageShell";
import ScrollReveal from "@/components/ScrollReveal";

const SECTIONS = [
  { title: "Our Commitment", content: "Seven Star Chauffeurs is committed to ensuring that our website and services are accessible to all individuals, including those with disabilities. We strive to meet or exceed the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards." },
  { title: "Website Accessibility Features", content: "Our website includes semantic HTML structure with proper heading hierarchy, ARIA landmarks and labels for screen reader navigation, keyboard-navigable interactive elements, sufficient colour contrast ratios throughout the design, responsive design that adapts to all screen sizes and zoom levels, alt text for all meaningful images, and reduced-motion support for users who prefer minimal animation." },
  { title: "Vehicle Accessibility", content: "Seven Star Chauffeurs is committed to accommodating guests with mobility requirements. Our SUV fleet (Rolls-Royce Cullinan, Mercedes-Maybach GLS 600, and Cadillac Escalade IQ) offers higher ride height and wider door openings for easier entry and exit. Please inform us of any specific accessibility requirements at the time of booking so we can ensure the most comfortable experience possible." },
  { title: "Ongoing Improvements", content: "We regularly review our website and services for accessibility and are committed to continuous improvement. We welcome feedback from our users about how we can improve accessibility." },
  { title: "Contact Us", content: "If you encounter any accessibility barriers on our website or have suggestions for improvement, please contact us at reservations@sevenstarchauffeurs.ca or +1 (604) 000 0000. We will make every reasonable effort to address your concerns promptly." },
];

export default function AccessibilityClient() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Accessibility", href: "/accessibility/" },
  ];

  return (
    <PageShell breadcrumbs={breadcrumbs}>
      <article style={{ maxWidth: 800, margin: "0 auto", padding: "clamp(40px, 6vh, 80px) clamp(24px, 5vw, 64px) clamp(80px, 12vh, 160px)" }}>
        <ScrollReveal variant="fade-up">
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 400, color: "var(--ivory)", marginBottom: "16px" }}>
            Accessibility Statement
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, color: "var(--chrome)", marginBottom: "clamp(40px, 6vh, 64px)" }}>
            Seven Star Chauffeurs Ltd. &middot; Updated January 2025
          </p>
        </ScrollReveal>
        {SECTIONS.map((s, i) => (
          <ScrollReveal key={s.title} variant="fade-up" delay={i * 0.04}>
            <section style={{ marginBottom: "clamp(32px, 4vh, 48px)" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 400, color: "var(--ivory)", marginBottom: "12px" }}>{s.title}</h2>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "14px", fontWeight: 300, lineHeight: 1.85, color: "var(--chrome)", margin: 0 }}>{s.content}</p>
            </section>
          </ScrollReveal>
        ))}
      </article>
    </PageShell>
  );
}
