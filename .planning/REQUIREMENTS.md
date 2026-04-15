# Requirements — Seven Star Chauffeurs v1.0

**Milestone goal:** Ship a production-ready "Noir Opulence" single-page + SEO route site for Seven Star Chauffeurs that is visually best-in-class in Canadian chauffeur market and drives bookings via 3 conversion paths.

**Scope timeline:** MVP in 1 week, full polish in 2 weeks.

---

## Must Have (v1)

### Foundation & Infrastructure

- **REQ-001** Vite + React 19 + TypeScript + Tailwind CSS 4 project scaffolded with strict TS config
- **REQ-002** ESLint + Prettier + Husky pre-commit quality gates
- **REQ-003** GitHub → Cloudflare Pages deployment pipeline (auto-deploy on push to main)
- **REQ-004** Domain `sevenstarchauffeurs.com` wired to Cloudflare Pages with SSL
- **REQ-005** Cloudflare `_headers` (security, caching) and `_redirects` configured

### Design System & Branding

- **REQ-010** Tailwind theme configured with brand palette: Obsidian Black `#050505`, Metallic Gold `#C5A55A`, Warm Ivory `#F5F0E8`, Cool Silver `#B8B8B8`
- **REQ-011** Typography pipeline: Cormorant Garamond (display) + DM Sans (body), self-hosted with `font-display: swap`
- **REQ-012** Logo assets integrated (dark-bg primary, white-bg, transparent variants) with correct usage per surface
- **REQ-013** Core UI primitives (Button, Link, Section, Container, Divider) with Noir Opulence styling

### Hero Experience

- **REQ-020** Canvas-based hero frame sequence (Kling AI–generated) scrubs on scroll using GSAP ScrollTrigger
- **REQ-021** Frame images optimized (WebP/AVIF, responsive sizes) with preloading strategy to avoid jank
- **REQ-022** Mobile fallback (< 768px): static poster image of Rolls-Royce Phantom — no canvas animation
- **REQ-023** Hero headline, tagline, and primary CTA overlay with staged scroll-triggered reveals

### Scroll-Driven Narrative Sections

- **REQ-030** GSAP ScrollSmoother enabled site-wide with accessibility-respecting `prefers-reduced-motion` opt-out
- **REQ-031** Scene-based scroll sections: pinning, parallax, cross-fades between fleet showcases
- **REQ-032** Fleet section reveals all 6 vehicles with scroll-triggered cinematography; Escalade IQ rarity is explicitly called out
- **REQ-033** Services section (Airport, Wedding, Corporate, Events, Party Bus, Hourly) with icon/imagery and copy
- **REQ-034** About / Story section conveying "Noir Opulence" positioning and trust signals
- **REQ-035** Testimonials / social proof section (placeholder-ready if none yet)
- **REQ-036** Footer with full NAP (Name/Address/Phone), social links, sitemap

### Conversion Paths

- **REQ-040** "Book Now" form: name, email, phone, service type (enum), date — client-side validation
- **REQ-041** Form submission handler (Cloudflare Pages Function or email webhook like Formspree/Resend) with success/error UX
- **REQ-042** Click-to-call button (`tel:` link) visible on mobile sticky CTA and in header/footer
- **REQ-043** WhatsApp CTA (`wa.me` deep link) with pre-filled message, visible on mobile sticky CTA
- **REQ-044** Conversion tracking events fired (GA4 or equivalent) for all three CTAs

### SEO / AEO

- **REQ-050** Schema.org JSON-LD: `LocalBusiness`, `Service` (per service), `FAQPage`, `Organization`, `Speakable`
- **REQ-051** Meta tags (title, description, canonical, Open Graph, Twitter) per route — unique per page
- **REQ-052** `llms.txt` and `llms-full.txt` at site root for AI crawler optimization
- **REQ-053** `robots.txt` explicitly allowing all major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) + regular bots
- **REQ-054** `sitemap.xml` auto-generated covering all routes
- **REQ-055** Build-time pre-rendering (`vite-prerender-plugin` or Puppeteer) for all routes — HTML delivered to crawlers without JS
- **REQ-056** City landing pages for 12+ Lower Mainland cities (Vancouver, Burnaby, Richmond, Surrey, Coquitlam, Langley, North Vancouver, West Vancouver, New Westminster, Delta, White Rock, Port Moody, +)
- **REQ-057** Service landing pages (Airport, Wedding, Corporate, Party Bus, Hourly, Events) with unique content + schema

### Content & Assets

- **REQ-060** Fleet photos audited — any image showing "Valora Concierge" watermark is inpainted or replaced before shipping
- **REQ-061** Photography optimized (responsive `srcset`, WebP/AVIF, lazy-load below-fold)
- **REQ-062** Copywriting done for hero, services, fleet cards, about, city pages (programmatic templates acceptable for cities)

### Performance & QA

- **REQ-070** Core Web Vitals green on mobile + desktop (LCP < 2.5s, INP < 200ms, CLS < 0.1)
- **REQ-071** Lighthouse ≥ 90 on Performance, Accessibility, Best Practices, SEO
- **REQ-072** Canvas hero tested on mid-range mobile devices (no jank); graceful fallback confirmed
- **REQ-073** Cross-browser QA: latest Chrome, Safari, Firefox, Edge; iOS Safari + Android Chrome

---

## Should Have (v1 if time permits, else v1.1)

- **REQ-080** Animated page transitions between routes (view transitions API or GSAP)
- **REQ-081** Instagram feed embed on homepage (latest 6 posts from `@sevenstarchauffeurs`)
- **REQ-082** Interactive fleet comparison (toggle vehicles, compare specs side-by-side)
- **REQ-083** FAQ accordion with rich content + FAQPage schema

---

## Nice to Have (v2+)

- **REQ-090** Multi-language (French) for Quebec expansion
- **REQ-091** Live availability checker
- **REQ-092** Customer login + trip history
- **REQ-093** Online payment / deposit capture
- **REQ-094** Dynamic blog / editorial CMS
- **REQ-095** Driver profiles with bios and photos

---

## Out of Scope

- **Live dispatch / booking integration** — form submissions are manually followed up in v1
- **Payment processing on-site** — quote/confirm flow only, no checkout
- **Customer accounts** — no login in v1
- **Blog CMS** — static content only
- **Non-English locales** — English only for v1

---

## Success Criteria

The project is "done" when:

1. Live at `sevenstarchauffeurs.com` with Cloudflare Pages auto-deploy on green CI
2. Hero canvas scroll sequence scrubs smoothly on desktop; mobile fallback renders correctly
3. All 3 conversion paths functional and tracked (form, call, WhatsApp)
4. Lighthouse ≥ 90 across the board on at least 3 representative routes
5. 12+ city pages + 6+ service pages live, each with unique content + correct schema
6. `llms.txt`, `llms-full.txt`, `robots.txt`, `sitemap.xml` present and valid
7. Zero fleet photos still show "Valora Concierge" branding
8. Visually clearly outclasses the 3 reference competitor sites (subjective user approval)
