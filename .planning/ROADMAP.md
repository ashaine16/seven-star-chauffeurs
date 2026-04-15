# Roadmap — Seven Star Chauffeurs v1.0

**Granularity:** Coarse (5 phases)
**Execution:** Parallel where possible
**Target:** MVP in 1 week, full polish in 2 weeks

---

## Phase 1 — Foundation & Design System

**Goal:** A deployable skeleton site with the Noir Opulence design language codified and the Cloudflare pipeline live.

**Scope:**
- Vite + React 19 + TypeScript + Tailwind 4 scaffold with strict config
- ESLint, Prettier, Husky quality gates
- Tailwind theme: palette tokens, typography scale, spacing, shadows
- Self-hosted Cormorant Garamond + DM Sans pipeline
- Core UI primitives (Button, Link, Section, Container, Divider)
- Logo asset integration (all variants)
- GitHub repo → Cloudflare Pages deploy on push
- Domain `sevenstarchauffeurs.com` wired with SSL
- `_headers` + `_redirects` baseline
- Base `robots.txt`, `sitemap.xml` placeholder, favicon set

**Requirements covered:** REQ-001, 002, 003, 004, 005, 010, 011, 012, 013

**Exit criteria:**
- Bare "Hello Noir Opulence" page live at production domain
- Design tokens usable in any component
- CI green, deploy automatic

---

## Phase 2 — Hero Canvas + Scroll Framework

**Goal:** The cinematic hero scroll sequence works smoothly on desktop with a clean mobile fallback, and the GSAP scroll framework is the foundation for all subsequent sections.

**Scope:**
- Canvas frame sequence loader with preloading + decode strategy
- GSAP ScrollTrigger + ScrollSmoother integration site-wide
- Hero section: frame-by-frame scrub tied to scroll position
- Responsive frame sets (mobile/tablet/desktop) or static poster < 768px
- Overlay headline, tagline, primary CTA with staged reveals
- `prefers-reduced-motion` opt-out path
- Performance budget validated: no main-thread jank on mid-range mobile
- Reusable scroll-scene utilities (pin, parallax, cross-fade) documented

**Requirements covered:** REQ-020, 021, 022, 023, 030

**Exit criteria:**
- Hero scrubs at 60fps on desktop, degrades gracefully on mobile
- Reduced-motion users see static hero + instant content
- Scroll scene utilities ready for Phase 3 to consume

---

## Phase 3 — Narrative Sections & Conversion

**Goal:** The homepage tells the full Noir Opulence story across all scroll scenes and all three conversion paths are live and tracked.

**Scope:**
- Fleet section: 6 vehicles with scroll-triggered cinematography, Escalade IQ rarity callout
- Services section (Airport, Wedding, Corporate, Events, Party Bus, Hourly)
- About / Story section (brand positioning, trust signals)
- Testimonials section (placeholder-friendly)
- Footer with full NAP, socials, sitemap
- Book Now form (name, email, phone, service type, date) with client-side validation
- Form submission backend (Cloudflare Pages Function or Formspree/Resend) + success/error UX
- Click-to-call + WhatsApp sticky mobile CTA + header/footer placements
- GA4 (or equivalent) with conversion events on all 3 CTAs
- Fleet photo audit + AI inpainting / replacement to remove "Valora Concierge" branding

**Requirements covered:** REQ-031, 032, 033, 034, 035, 036, 040, 041, 042, 043, 044, 060, 061, 062

**Exit criteria:**
- Homepage fully scrollable end-to-end with all sections populated
- Form submissions land in inbox; test calls + WhatsApp deep links work on mobile
- GA4 dashboard shows events firing for each CTA
- No "Valora Concierge" watermark remains in shipped imagery

---

## Phase 4 — SEO/AEO & Route Expansion

**Goal:** The site dominates local + AI search through pre-rendered city/service pages, comprehensive schema, and LLM-optimized content.

**Scope:**
- Build-time pre-rendering (`vite-prerender-plugin` preferred; Puppeteer script as fallback)
- 12+ city landing pages (programmatic templates, unique local copy + schema per page)
- 6+ service landing pages (Airport, Wedding, Corporate, Party Bus, Hourly, Events)
- Schema.org JSON-LD: LocalBusiness, Service (per service), FAQPage, Organization, Speakable
- Per-route meta (title, description, canonical, OG, Twitter) — unique
- `llms.txt` + `llms-full.txt` at root
- `robots.txt` whitelisting AI crawlers (GPTBot, ClaudeBot, PerplexityBot, +)
- Auto-generated `sitemap.xml` covering all routes
- Internal linking strategy between city ↔ service ↔ home

**Requirements covered:** REQ-050, 051, 052, 053, 054, 055, 056, 057

**Exit criteria:**
- All routes served as static HTML (curl shows full markup without JS)
- Schema validates (Google Rich Results test + Schema.org validator)
- 12+ cities × 6+ services = meaningful SEO surface live
- Sitemap + robots + llms files all valid and reachable

---

## Phase 5 — Performance, QA & Polish

**Goal:** Ship-ready: Core Web Vitals green, cross-browser QA clean, content finalized, visually clearly outclasses competitors.

**Scope:**
- Core Web Vitals optimization (LCP, INP, CLS) on mobile + desktop
- Lighthouse ≥ 90 across Performance, Accessibility, Best Practices, SEO on representative routes
- Image optimization pass (WebP/AVIF, responsive srcset, lazy-load)
- Cross-browser QA: Chrome, Safari, Firefox, Edge; iOS Safari, Android Chrome
- Mid-range mobile device testing for canvas hero
- Should-have additions if time: page transitions, Instagram feed, fleet comparison, FAQ accordion
- Side-by-side comparison vs. 3 reference competitors (subjective approval)
- Accessibility audit (keyboard nav, focus states, ARIA, contrast, reduced-motion)
- Final copy review + typo/legal pass
- Launch checklist + handoff doc

**Requirements covered:** REQ-070, 071, 072, 073, 080, 081, 082, 083

**Exit criteria:**
- All success criteria from REQUIREMENTS.md satisfied
- User approves site as visually superior to reference competitors
- Production site stable, monitored, and handed off

---

## Phase Dependencies

```
Phase 1 (Foundation)
    ↓
Phase 2 (Hero + Scroll Framework)
    ↓
Phase 3 (Narrative + Conversion)  ←→  Phase 4 (SEO + Routes)   [can overlap]
    ↓                                        ↓
    └─────────────→ Phase 5 (Polish) ←───────┘
```

- Phases 3 and 4 can run partially in parallel once Phase 2 establishes the scroll framework and routing is stable.
- Phase 5 requires Phases 3 + 4 feature-complete.

---

## Out-of-Scope Reminder

- Live dispatch integration, payment processing, customer accounts, blog CMS, non-English locales — deferred to v2+.
