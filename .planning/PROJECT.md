# Seven Star Chauffeurs

## What This Is

A premium, 3D scroll-animated single-page website for **Seven Star Chauffeurs**, a luxury chauffeur service operating in Vancouver and the Lower Mainland, BC. The site positions Seven Star as the most visually impressive chauffeur website in Canada, using a canvas-based hero scroll sequence, GSAP ScrollTrigger cinematic animations, and full SEO/AEO optimization for local search dominance.

**Design direction:** "Noir Opulence" — cinematic dark luxury. Obsidian blacks, strategic gold light, dramatic photography. Tom Ford × Christopher Nolan. Each scroll section is a "scene."

## Core Value

Convert high-net-worth Vancouver / Lower Mainland visitors into bookings by delivering a luxury web experience that mirrors the in-vehicle experience — then making the three conversion paths (Book Now form, click-to-call, WhatsApp) friction-free.

## Target Audience

- High-net-worth individuals (HNWIs) in Vancouver / Lower Mainland
- Corporate executives (executive transportation)
- Wedding planners and couples (luxury wedding vehicles)
- Event organizers (galas, proms, concerts, sports)
- YVR airport tourists / visitors
- Film and production companies
- **Demographics:** 28–65, HHI $150K+, tech-savvy, value exclusivity

## Primary Conversions

1. "Book Now" form (name, email, phone, service type, date)
2. Click-to-call
3. WhatsApp message initiation

## Tech Stack

- React 19 + TypeScript + Tailwind CSS 4
- GSAP (ScrollTrigger, ScrollSmoother) for scroll animations
- HTML Canvas for hero frame sequence (Kling AI–generated frames)
- Vite build tooling
- Cloudflare Pages hosting (GitHub → Cloudflare pipeline)
- Pre-rendering via `vite-prerender-plugin` or custom Puppeteer script

## Brand

- **Logo:** Gold double-headed eagle emblem + "Seven Star Chauffeurs" wordmark (dark-bg, white-bg, transparent variants)
- **Palette:** Obsidian Black `#050505`, Metallic Gold `#C5A55A`, Warm Ivory `#F5F0E8`, Cool Silver `#B8B8B8`
- **Type:** Cormorant Garamond (display), DM Sans (body)
- **Socials:** Instagram `@sevenstarchauffeurs`
- **Domain:** `sevenstarchauffeurs.com`

## Fleet (6 vehicles)

1. Rolls-Royce Phantom — flagship, hero section
2. Rolls-Royce Cullinan — premium SUV
3. Rolls-Royce Ghost Series II — executive sedan
4. Mercedes-Maybach GLS 600 — luxury SUV
5. **Cadillac Escalade IQ** — modern electric luxury (rare in market — differentiator)
6. Luxury Party Bus — group events

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Canvas-based hero scroll sequence (desktop) with static poster fallback < 768px
- [ ] GSAP ScrollTrigger cinematic scene-based scrolling throughout
- [ ] Fleet section with 6 vehicles + rarity emphasis on Escalade IQ
- [ ] Book Now form (name, email, phone, service type, date) with submission handling
- [ ] Click-to-call and WhatsApp CTAs
- [ ] Full SEO/AEO schema (LocalBusiness, Service, FAQ, Organization, Speakable)
- [ ] `llms.txt` + `llms-full.txt` for AI crawler optimization
- [ ] Build-time pre-rendering for all routes
- [ ] City-specific location pages for 12+ Lower Mainland cities
- [ ] Service-specific pages (airport, wedding, corporate, party bus, etc.)
- [ ] `robots.txt` allowing all AI crawlers + `sitemap.xml`
- [ ] Cloudflare `_headers` and `_redirects`
- [ ] Fleet photo remediation — remove "Valora Concierge" branding via AI inpainting or replacement
- [ ] GitHub → Cloudflare Pages deployment pipeline
- [ ] Mobile performance: smooth scroll on mid-range devices, static poster hero fallback

### Out of Scope (v1)

- Live booking/dispatch integration — form submission only, manual follow-up
- Multi-language (English only for v1)
- Payment processing on site — quote/confirmation flow, not checkout
- Customer login / account system
- Blog / editorial CMS — static pages only for v1

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Single-page scroll architecture + discrete route pages for SEO | Scroll for emotional hero journey; routes for city/service SEO surface area | — Pending |
| Canvas frame sequence (not video) for hero | Frame-by-frame scroll control, crisp scrubbing, lower perceived weight than looping video | — Pending |
| Cloudflare Pages over Vercel | Acceltra default pipeline, edge-wide perf, free plan suits static+prerender | — Pending |
| Pre-render instead of SSR | Static output = fastest TTFB, simplest ops; no dynamic content requires SSR in v1 | — Pending |
| `vite-prerender-plugin` preferred, Puppeteer script as fallback | Zero-config for simple routes; custom script if per-route hydration quirks appear | — Pending |
| Noir Opulence design language | Differentiates from generic chauffeur sites (bright/corporate); aligns with HNWI taste | — Pending |

## Constraints

- **MVP in 1 week**, full polish in 2 weeks
- Must outperform competitors: `luxurychauffeursvancouver.ca`, `upperec.com`, `valoraconcierge.com`
- Fleet photos with "Valora Concierge" watermark must be cleaned before use
- Cadillac Escalade IQ rarity must be called out as a differentiator
- Hero scroll sequence must gracefully degrade on mobile (< 768px = static poster)

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd:transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-14 after initialization*
