"use client";

import PageShell from "@/components/PageShell";
import ScrollReveal from "@/components/ScrollReveal";

const SECTIONS = [
  { title: "Acceptance of Terms", content: "By accessing the Seven Star Chauffeurs website or engaging our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website or services." },
  { title: "Service Description", content: "Seven Star Chauffeurs provides luxury chauffeured transportation services in Metro Vancouver, the Sea-to-Sky Corridor, and surrounding areas of British Columbia. All services are provided by appointment only and are subject to vehicle and chauffeur availability." },
  { title: "Reservations and Cancellations", content: "All reservations are confirmed upon receipt of a booking confirmation from Seven Star Chauffeurs. Cancellation policies vary by service type and will be communicated at the time of booking. Late cancellations or no-shows may incur charges as outlined in your booking confirmation." },
  { title: "Pricing and Payment", content: "All prices are quoted in Canadian dollars (CAD) and are exclusive of applicable taxes unless otherwise stated. Pricing is provided on a per-engagement basis and may vary based on vehicle selection, duration, distance, and time of day. Payment terms are communicated at the time of booking." },
  { title: "Client Responsibilities", content: "Clients are responsible for providing accurate pickup and drop-off information, being ready at the scheduled pickup time, and treating our vehicles and chauffeurs with respect. Smoking, vaping, and the consumption of illegal substances are strictly prohibited in all Seven Star vehicles. Clients are responsible for any damage to vehicles caused by their actions or those of their guests." },
  { title: "Liability Limitations", content: "Seven Star Chauffeurs maintains comprehensive commercial insurance for all vehicles and operations. However, we are not liable for delays caused by traffic, weather, road closures, or other circumstances beyond our reasonable control. Our liability for any claim arising from our services is limited to the amount paid for the specific engagement in question." },
  { title: "Intellectual Property", content: "All content on the Seven Star Chauffeurs website, including text, images, logos, and design elements, is the property of Seven Star Chauffeurs Ltd. and is protected by Canadian copyright law. Reproduction, distribution, or modification of any content without prior written consent is prohibited." },
  { title: "Privacy", content: "Your use of our website and services is also governed by our Privacy Policy, which is incorporated into these Terms of Service by reference." },
  { title: "Governing Law", content: "These Terms of Service are governed by and construed in accordance with the laws of the Province of British Columbia and the federal laws of Canada applicable therein. Any disputes arising from these terms shall be resolved in the courts of British Columbia." },
  { title: "Changes to Terms", content: "Seven Star Chauffeurs reserves the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated effective date. Your continued use of our website or services after any changes constitutes acceptance of the updated terms." },
  { title: "Contact", content: "For questions about these Terms of Service, contact us at reservations@sevenstarchauffeurs.ca or +1 (604) 000 0000." },
];

export default function LegalPageClient() {
  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Terms of Service", href: "/terms-of-service/" },
  ];

  return (
    <PageShell breadcrumbs={breadcrumbs}>
      <article style={{ maxWidth: 800, margin: "0 auto", padding: "clamp(40px, 6vh, 80px) clamp(24px, 5vw, 64px) clamp(80px, 12vh, 160px)" }}>
        <ScrollReveal variant="fade-up">
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 400, color: "var(--ivory)", marginBottom: "16px" }}>
            Terms of Service
          </h1>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", fontWeight: 300, color: "var(--chrome)", marginBottom: "clamp(40px, 6vh, 64px)" }}>
            Effective Date: January 1, 2025 &middot; Seven Star Chauffeurs Ltd.
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
