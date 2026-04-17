"use client";

import PageShell from "@/components/PageShell";
import ScrollReveal from "@/components/ScrollReveal";

const SECTIONS = [
  {
    title: "Information We Collect",
    content: `When you submit a reservation enquiry through our website, we collect your name, email address, phone number, preferred dates, and service details. We may also collect information about your vehicle preferences and any special requirements you communicate. We do not collect payment information through our website; all payment processing is handled through secure, PCI-compliant third-party processors at the time of engagement.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use the information you provide solely to fulfil your chauffeur service engagement, communicate with you about your reservation, and improve our services. We do not sell, rent, or share your personal information with third parties for marketing purposes. Your information may be shared with our chauffeurs only to the extent necessary to fulfil your engagement (e.g., your name and pickup location).`,
  },
  {
    title: "Cookies and Analytics",
    content: `Our website uses essential cookies to ensure proper functionality. We may use analytics services (such as Google Analytics) to understand how visitors interact with our website. These services collect anonymised data about page views, session duration, and device type. You can disable cookies through your browser settings at any time.`,
  },
  {
    title: "Data Security",
    content: `We implement industry-standard security measures to protect your personal information, including SSL/TLS encryption for all data transmitted through our website. Access to personal information is restricted to authorised personnel who require it to fulfil your engagement.`,
  },
  {
    title: "Data Retention",
    content: `We retain your personal information for as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required by law. Reservation records are retained for a minimum of two years for service quality and legal compliance purposes.`,
  },
  {
    title: "Your Rights",
    content: `Under applicable privacy legislation (including British Columbia's Personal Information Protection Act), you have the right to access, correct, or request deletion of your personal information. To exercise these rights, contact us at reservations@sevenstarchauffeurs.ca.`,
  },
  {
    title: "Third-Party Links",
    content: `Our website may contain links to third-party websites. We are not responsible for the privacy practices of these websites. We encourage you to review the privacy policies of any third-party sites you visit.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. Your continued use of our website after any changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "Contact Us",
    content: `If you have questions about this Privacy Policy or our data practices, please contact us at reservations@sevenstarchauffeurs.ca or by phone at +1 (604) 000 0000.`,
  },
];

export default function LegalPageClient() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Privacy Policy", href: "/privacy-policy/" },
  ];

  return (
    <PageShell breadcrumbs={breadcrumbs}>
      <article
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "clamp(40px, 6vh, 80px) clamp(24px, 5vw, 64px) clamp(80px, 12vh, 160px)",
        }}
      >
        <ScrollReveal variant="fade-up">
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 4.5vw, 56px)",
              fontWeight: 400,
              color: "var(--ivory)",
              marginBottom: "16px",
            }}
          >
            Privacy Policy
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 300,
              color: "var(--chrome)",
              marginBottom: "clamp(40px, 6vh, 64px)",
            }}
          >
            Effective Date: January 1, 2025 &middot; Seven Star Chauffeurs Ltd.
          </p>
        </ScrollReveal>

        {SECTIONS.map((s, i) => (
          <ScrollReveal key={s.title} variant="fade-up" delay={i * 0.04}>
            <section style={{ marginBottom: "clamp(32px, 4vh, 48px)" }}>
              <h2
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(20px, 2.5vw, 28px)",
                  fontWeight: 400,
                  color: "var(--ivory)",
                  marginBottom: "12px",
                }}
              >
                {s.title}
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "14px",
                  fontWeight: 300,
                  lineHeight: 1.85,
                  color: "var(--chrome)",
                  margin: 0,
                }}
              >
                {s.content}
              </p>
            </section>
          </ScrollReveal>
        ))}
      </article>
    </PageShell>
  );
}
