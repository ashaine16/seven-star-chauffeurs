# PROJECT-BRIEF.md — Seven Star Chauffeurs

## Deliverable
A premium, 3D scroll-animated single-page website for Seven Star Chauffeurs,
a luxury chauffeur service operating in Vancouver and the Lower Mainland, BC.
The site must be the most visually impressive chauffeur website in Canada,
featuring a canvas-based hero scroll sequence, GSAP ScrollTrigger animations
throughout, and full SEO/AEO optimization for local search dominance.

## Target Audience
- High-net-worth individuals (HNWIs) in Vancouver and the Lower Mainland
- Corporate executives requiring executive transportation
- Wedding planners and couples seeking luxury wedding vehicles
- Event organizers (galas, proms, concerts, sports events)
- Tourists and visitors arriving at YVR International Airport
- Film and production companies needing premium vehicle rentals
- Demographics: 28-65 years old, household income $150K+, tech-savvy,
  value exclusivity and seamless experiences

## Primary Conversion Actions
1. "Book Now" form submission (name, email, phone, service type, date)
2. Direct phone call (click-to-call)
3. WhatsApp message initiation

## Tech Stack
- React 19 + TypeScript + Tailwind CSS 4
- GSAP (ScrollTrigger, ScrollSmoother) for all scroll animations
- HTML Canvas for hero frame sequence
- Vite for build tooling
- Cloudflare Pages for hosting (GitHub → Cloudflare pipeline)
- Pre-rendering via vite-prerender-plugin or custom Puppeteer script

## Brand Assets
- Logo: Gold double-headed eagle emblem with "Seven Star Chauffeurs" text
  - Dark background version (primary)
  - White background version
  - Transparent version
- Colors: Obsidian Black (#050505), Metallic Gold (#C5A55A),
  Warm Ivory (#F5F0E8), Cool Silver (#B8B8B8)
- Fonts: Cormorant Garamond (display), DM Sans (body)
- Instagram: @sevenstarchauffeurs
- Domain: sevenstarchauffeurs.com

## Fleet (6 vehicles)
1. Rolls-Royce Phantom — The flagship, used for hero section
2. Rolls-Royce Cullinan — Premium SUV
3. Rolls-Royce Ghost Series II — Executive sedan
4. Mercedes-Maybach GLS 600 — Luxury SUV
5. Cadillac Escalade IQ — Modern electric luxury
6. Luxury Party Bus — Group events and celebrations

## Design Direction
"Noir Opulence" — Cinematic Dark Luxury. The entire site lives in deep
obsidian blacks with content revealed through strategic gold light and
dramatic photography. Each scroll section is a "scene" in a cinematic
experience. Think Tom Ford campaigns meets Christopher Nolan cinematography.

## Hosting
GitHub → Cloudflare Pages (Acceltra default pipeline)

## Deadline
MVP in 1 week. Full polish in 2 weeks.

## Key Competitors (for reference)
- Luxury Chauffeurs Vancouver (luxurychauffeursvancouver.ca)
- Upper Echelon Chauffeurs (upperec.com)
- Valora Concierge (valoraconcierge.com)

## SEO/AEO Requirements
- Full schema markup (LocalBusiness, Service, FAQ, Organization, Speakable)
- llms.txt and llms-full.txt for AI crawler optimization
- Build-time pre-rendering for all routes
- City-specific location pages for 12+ Lower Mainland cities
- Service-specific pages (airport, wedding, corporate, party bus, etc.)
- robots.txt allowing all AI crawlers
- sitemap.xml with all routes
- Cloudflare _headers and _redirects files

## Important Notes
- Some fleet photos contain "Valora Concierge" branding from the previous
  company. These must be edited (AI inpainting) or replaced before use.
- The hero section uses a canvas-based frame sequence animated by Kling AI.
- Mobile fallback: static poster image on screens below 768px.
- The Cadillac Escalade IQ is extremely rare in the market — emphasize this
  as a differentiator.