# DESIGN-SYSTEM.md — Seven Star Chauffeurs

**Direction:** Noir Opulence — Cinematic Dark Luxury
**Reference lineage:** Tom Ford campaigns · Rolls-Royce digital · Christopher Nolan cinematography · Aston Martin Residences · Bottega Veneta online
**Intent:** The screen is not a page — it is a darkened showroom at 11pm. Light falls on one object at a time. Nothing is cheerful. Everything is inevitable.

---

## 1. Recommended Pattern

**Editorial Cinematic Scroll** — a vertically pinned, scene-by-scene narrative where each section is a self-contained "shot." Content does not scroll past; the camera reveals it.

- **Macro layout:** full-bleed black canvases, asymmetric grids (12-col, content offset right or left — never uniformly centered), generous negative space (≥40% of any viewport is pure obsidian).
- **Micro layout:** editorial magazine rules — large display type, thin rules (1px gold hairlines), long measure for body copy (max 62ch), captioned vehicle plates like a Sotheby's lot sheet.
- **Density:** low. One idea per viewport. If the user can see two CTAs at once, the scene is too busy.
- **Alignment logic:** text left-aligned on the brand side, right-aligned on the fleet-detail side. Center alignment reserved only for the opening monogram and section plate titles.

---

## 2. Style

**Style name:** Obsidian Editorial (a fusion of Editorial Minimalism + Cinematic Dark Luxury)

**Core moves:**
- Deep obsidian base (#050505 → #0A0A0A subtle vertical gradient, never flat pure black — flat black reads "amateur dark mode")
- Single directional "key light" per scene — a soft gold spot from upper-left or upper-right, simulated with a 40%-opacity radial gradient and a subtle bloom
- Photography treated as gallery pieces: letterboxed, framed by 1px gold hairlines, captioned with metadata (vehicle, year, engine)
- Type-first hero — the word does the work before the image arrives
- "Filmic grain" — a ~3% noise overlay on all dark surfaces (essential; eliminates banding and adds texture)

**Do NOT use:** glassmorphism, neumorphism, bento grids, frosted cards, pastel gradients, blob shapes, gradient text, rainbow accents, shadcn default look.

---

## 3. Color Palette

| Role | Token | Hex | Use |
|---|---|---|---|
| Base void | `obsidian` | `#050505` | Page bg, hero canvas, nav rail |
| Base rise | `obsidian-rise` | `#0A0A0A` | Subtle top-edge gradient partner to `obsidian` |
| Surface 1 | `obsidian-1` | `#0F0F0F` | Elevated cards, drawer backgrounds |
| Surface 2 | `obsidian-2` | `#161616` | Input fields, active states |
| Gold leaf | `gold` | `#C5A55A` | Primary accent — see **Gold Discipline** below |
| Gold bright | `gold-hi` | `#E4C77A` | Hover / focus ring only |
| Gold dim | `gold-lo` | `#8C7640` | Disabled / pressed / metadata labels |
| Ivory | `ivory` | `#F5F0E8` | Primary text on dark (never pure white) |
| Ivory muted | `ivory-70` | `rgba(245,240,232,0.7)` | Secondary copy |
| Ivory subtle | `ivory-40` | `rgba(245,240,232,0.4)` | Captions, eyebrow labels, divider text |
| Silver | `silver` | `#B8B8B8` | Tertiary text, icon strokes |
| Silver line | `silver-line` | `rgba(184,184,184,0.12)` | Hairline dividers, subtle borders |
| Signal (rare) | `signal` | `#E4C77A` | Form success — use gold-hi; do not introduce green |
| Error | `crimson` | `#8B2E2E` | Form error only — deep oxblood, never bright red |

### Gold Discipline (critical)

Gold is **gold leaf**, not paint. Budget per full-length screen: **≤3 appearances total**. Permitted surfaces:

- Logo + wordmark
- Hairline rules and section plate numerals
- A single CTA on any given scene
- Selected characters in display type (drop-cap, ampersand, numeral) — one flourish per scene
- Micro-interaction flourish (cursor ring, focus outline)

**Forbidden:** gold buttons stacked, gold body text runs, gold backgrounds, gold-tinted images, gold gradients as decorative swaths.

---

## 4. Typography Pairing

**Display:** Cormorant Garamond — weights 300 (Light), 400 (Regular), 500 (Medium). Tight tracking (`-0.02em`) at large sizes; opened to `+0.24em` for small-caps eyebrows.

**Body:** DM Sans — weights 300, 400, 500. Line-height 1.6 at body sizes.

**Numerals:** Cormorant Garamond **italic**, tabular-lining for specs; reserved for rarity numerals, vehicle years, scene plates ("II.", "III.").

**Scale (fluid, clamp-based):**

| Token | Role | Size (desktop) | Size (mobile) | Weight | Tracking |
|---|---|---|---|---|---|
| `display-xl` | Hero headline | 112px / 0.95 lh | 56px | Cormorant 300 | -0.03em |
| `display-l` | Scene titles | 72px / 1.0 | 40px | Cormorant 400 | -0.02em |
| `display-m` | Vehicle names | 48px / 1.05 | 32px | Cormorant 400 | -0.01em |
| `eyebrow` | Section numerals | 12px / 1.4 | 11px | DM Sans 500, small-caps | +0.28em |
| `body-l` | Lead paragraph | 20px / 1.55 | 17px | DM Sans 300 | -0.005em |
| `body` | Copy | 16px / 1.65 | 15px | DM Sans 400 | 0 |
| `caption` | Photo credits, specs | 13px / 1.5 | 12px | DM Sans 400, small-caps | +0.12em |
| `label` | Form fields | 11px / 1.3 | 11px | DM Sans 500, small-caps | +0.2em |

**Rules:**
- Never mix more than three type sizes in one viewport.
- Eyebrows (`eyebrow`) always paired with a hairline rule beneath or beside.
- Display type gets **optical kerning** and `font-feature-settings: "liga", "kern", "swsh" 1` for the italic swash variants on `&`, `7`, `Q`.
- No `text-transform: uppercase` on Cormorant — it breaks the serif rhythm. Small-caps only via `font-feature-settings: "smcp"` on DM Sans.

---

## 5. Key Effects

### Motion language
**Principle:** every motion is **slow, weighted, and inevitable** — a Rolls-Royce door closing, not a TikTok swipe.

| Token | Duration | Easing | Use |
|---|---|---|---|
| `ease-cinematic` | 1200ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Scene entrances, hero reveals |
| `ease-deliberate` | 800ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Section crossfades, parallax |
| `ease-press` | 400ms | `cubic-bezier(0.2, 0, 0, 1)` | Button press, link underline |
| `ease-hover` | 600ms | `cubic-bezier(0.33, 1, 0.68, 1)` | Hover states, cursor ring |

**Banned:** bounce, elastic, overshoot, anything with spring physics. No motion under 300ms except the cursor ring.

### Canvas hero
- 120-frame sequence at 1920×1080 WebP, total ≤6MB, preloaded with `Image.decode()` while LCP paints a blurred first-frame poster.
- ScrubTrigger pinned 100vh × 2.5 scroll length, frame index mapped via `Math.floor(progress * (frames-1))`.
- Overlay text fades in at frame 30 (25% progress), fades out at frame 90.
- `<768px`: single static `phantom-poster.webp`, no canvas, no pin — just the shot.
- `prefers-reduced-motion`: static poster, instant copy, no pin.

### Signature surface effects
- **Filmic grain:** 120×120 SVG noise tile, `mix-blend-mode: overlay`, 4% opacity, fixed position, z-index above all content except modals. Cost: ~6KB.
- **Key-light gradient:** `radial-gradient(ellipse 80% 60% at 20% 15%, rgba(197,165,90,0.08), transparent 60%)` — one per scene, angle alternates L/R down the page.
- **Hairline rules:** `1px` solid `var(--silver-line)` with a 1px gold segment (40px wide) positioned at the 1/8 mark — editorial detail.
- **Photo frames:** 1px `var(--gold-lo)` outset offset 12px from image edge; caption typeset below in `caption` token with a 24px vertical rhythm rule.
- **Cursor (desktop only):** custom 8px ivory dot with a 32px gold ring that lags 80ms behind pointer (GSAP `quickTo`). Scales to 48px over interactive elements.
- **Link underline:** never default; a 1px gold line that draws left→right on hover over 600ms, lingers, retracts right→left on leave.

### Imagery treatment
- Every vehicle photo desaturated to ~85% then warmed +8° toward gold in midtones.
- Shadows lifted barely (never crushed pure-black) to preserve leather-grain detail.
- Aspect ratios locked to cinematic: 2.39:1 (hero plates) or 4:5 (portrait fleet cards). **No 16:9 stock-looking crops, no 1:1 Instagram squares.**

### Corner radii
| Token | Value | Use |
|---|---|---|
| `radius-none` | 0 | Photo plates, hero canvas, section containers — **default** |
| `radius-hairline` | 2px | Form inputs, toast messages |
| `radius-soft` | 6px | Primary CTA button only |
| ~~`radius-pill`~~ | — | **Forbidden** — no pill buttons, no rounded tags |

Most surfaces are **square-cornered**. The softness is in the motion, not the geometry.

### Elevation / shadows
Single shadow token, used sparingly:
```
shadow-plate: 0 24px 48px -16px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4);
```
Cards do not float — they rest. No hover-lift. Hover changes border-color (`silver-line` → `gold-lo`) and nothing else.

---

## 6. Anti-Patterns — Explicitly Forbidden

1. **Purple / violet gradients** anywhere — not in backgrounds, overlays, glows, or icons. Our accent is gold. Full stop.
2. **Centered-everything layouts.** Hero copy may be centered; narrative sections must use asymmetric offsets. Centered paragraphs of body copy are banned.
3. **Uniform rounded corners.** No `rounded-2xl` carpet-bombing. Corners are sharp by default.
4. **Inter, Geist, SF Pro, Manrope, Plus Jakarta, Satoshi.** Not allowed. Body is DM Sans; display is Cormorant Garamond. Nothing else.
5. **SaaS dashboard aesthetics:** sidebar navs, card grids with identical rounded shadows, pastel status pills, emoji in headlines, "⚡ Fast · 🔒 Secure · 🎨 Beautiful" feature rows.
6. **Hero video loops** with auto-play muted MP4. We use canvas frames precisely to avoid this.
7. **Gold splashing:** gold buttons with gold text, gold backgrounds, gold-on-gold anything.
8. **Emoji.** None. Not in UI copy, not in CTAs, not in error states. If a concept needs an icon, use a 1.5px-stroke custom line icon in ivory or silver.
9. **Snappy micro-interactions.** No 150ms bounces, no "satisfying" spring physics. Luxury is patient.
10. **Stock photography** of businesspeople shaking hands, airport lounges, generic city skylines. Every photograph must be of the actual fleet or shot in a production-designed style.
11. **"Book Now" buttons repeated 6 times per scroll.** One primary CTA per scene. Mobile sticky CTA is the exception.
12. **Bright success greens / alert yellows / error reds.** Semantic color in this system speaks through type weight and gold-hi / oxblood — never neon.
13. **Skeuomorphic leather textures, embossed gold badges, Vegas-casino chrome.** Luxury is restraint; kitsch is the opposite.
14. **Tooltip overload** and **onboarding carousels.** The site is a showroom, not an app.
15. **Hamburger menus on desktop.** Nav is a horizontal rail with small-caps labels. Mobile may use a full-screen drawer, never a dropdown.

---

## 7. Component Tokens (implementation shorthand)

```css
:root {
  --obsidian: #050505;
  --obsidian-rise: #0A0A0A;
  --obsidian-1: #0F0F0F;
  --obsidian-2: #161616;
  --gold: #C5A55A;
  --gold-hi: #E4C77A;
  --gold-lo: #8C7640;
  --ivory: #F5F0E8;
  --ivory-70: rgba(245,240,232,0.7);
  --ivory-40: rgba(245,240,232,0.4);
  --silver: #B8B8B8;
  --silver-line: rgba(184,184,184,0.12);

  --font-display: "Cormorant Garamond", "Times New Roman", serif;
  --font-body: "DM Sans", system-ui, sans-serif;

  --ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-deliberate: cubic-bezier(0.4, 0, 0.2, 1);

  --radius-none: 0;
  --radius-hairline: 2px;
  --radius-soft: 6px;

  --shadow-plate: 0 24px 48px -16px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4);

  --page-gutter: clamp(20px, 4vw, 64px);
  --scene-height: 100vh;
}

body {
  background: linear-gradient(180deg, var(--obsidian) 0%, var(--obsidian-rise) 100%);
  color: var(--ivory);
  font-family: var(--font-body);
  font-weight: 300;
}
```

### Primary CTA
```
background: transparent;
border: 1px solid var(--gold);
color: var(--gold);
padding: 18px 36px;
font: 500 12px/1 var(--font-body);
letter-spacing: 0.24em;
text-transform: uppercase;
border-radius: var(--radius-soft);
transition: background 600ms var(--ease-hover), color 600ms var(--ease-hover);
```
Hover: `background: var(--gold); color: var(--obsidian);` — no shadow change, no scale.

### Secondary link
Underline draws on hover (see Key Effects). Color stays `ivory`.

### Form field
```
background: var(--obsidian-2);
border: 0;
border-bottom: 1px solid var(--silver-line);
color: var(--ivory);
padding: 18px 0;
font: 300 17px/1.4 var(--font-body);
border-radius: 0;
```
Focus: `border-bottom-color: var(--gold); border-bottom-width: 1px;` + a 600ms hairline draw animation.
Label floats as a small-caps `label` token, never pill-wrapped.

---

## 8. Pre-Delivery Checklist

Before any scene, section, or PR is considered shippable:

**Brand integrity**
- [ ] Zero purple, violet, teal, or pastel anywhere in the palette
- [ ] Gold appearances on this screen ≤ 3 total
- [ ] No gold-on-gold stacking
- [ ] All type is Cormorant Garamond or DM Sans — no other families load
- [ ] Pure `#000000` and pure `#FFFFFF` absent from rendered output

**Layout**
- [ ] At least 40% of the viewport is negative space (obsidian)
- [ ] No more than one primary CTA visible at once (mobile sticky CTA excepted)
- [ ] Asymmetric grid confirmed — not a stack of centered blocks
- [ ] Default corner radius is 0; exceptions justified

**Motion**
- [ ] No animation shorter than 300ms (cursor ring excepted)
- [ ] No bounce / elastic / overshoot easings
- [ ] `prefers-reduced-motion` path tested end-to-end
- [ ] Canvas hero scrubs at 60fps on a mid-range Android (Pixel 6a or equivalent)
- [ ] Mobile <768px hero is static poster — canvas is not mounted

**Type**
- [ ] Display type uses `-0.02em` tracking at ≥48px
- [ ] Eyebrows are small-caps DM Sans at `+0.28em`
- [ ] No `text-transform: uppercase` applied to Cormorant
- [ ] Body line-length ≤ 62ch

**Imagery**
- [ ] Every fleet photo passes watermark audit (zero "Valora Concierge" traces)
- [ ] All photos share the desaturate-85% + warm-+8° treatment
- [ ] Filmic grain overlay active and set to 3–4% opacity
- [ ] No 1:1 or 16:9 stock-feeling crops

**Effects**
- [ ] Key-light gradient present, alternating side between scenes
- [ ] Hairline rules carry the gold segment detail
- [ ] Hover states change color only — never lift/scale
- [ ] Custom cursor active on desktop, disabled on touch devices

**Accessibility**
- [ ] Ivory on obsidian contrast ≥ 11:1 (AAA)
- [ ] Gold-on-obsidian contrast ≥ 4.5:1 for text; decorative gold below that size is marked `aria-hidden`
- [ ] Focus outlines are 2px `gold-hi`, 2px offset — never removed
- [ ] Keyboard navigable scroll scenes with skip-to-content anchor
- [ ] All motion has a reduced-motion static equivalent
- [ ] Form fields have programmatic labels (small-caps label is visual only)

**Performance**
- [ ] LCP < 2.5s on 4G mobile, INP < 200ms, CLS < 0.1
- [ ] Font files self-hosted, subset to Latin-1, `font-display: swap`
- [ ] Canvas frames preloaded with `rel=preload as=image`, total ≤ 6MB
- [ ] Lighthouse ≥ 90 across Performance, Accessibility, Best Practices, SEO
- [ ] No third-party scripts beyond analytics and form backend

**Showroom test (the subjective gate)**
- [ ] Does this scene feel like a Rolls-Royce microsite, not a Shopify storefront?
- [ ] If the user squinted, would they mistake it for Valora / Upper Echelon / Luxury Chauffeurs Vancouver? If yes — redesign.
- [ ] Is there exactly one thing the eye lands on first? Name it.
- [ ] Would Tom Ford sign this off?

---

*Last updated: 2026-04-14. This document is the final word on visual language — disagreements escalate to the brand owner, not the developer.*

---

## Noir Opulence — Design Constitution

> **Status:** Non-negotiable. These rules supersede any conflicting guidance above or in any external skill. When a dial, tool, or generator disagrees with this section, this section wins.

### Color System

| Token | Hex | OKLCH | Usage |
|---|---|---|---|
| `--bg-void` | `#050505` | `oklch(0.08 0 0)` | Primary background, the void |
| `--bg-elevated` | `#0a0a0a` | `oklch(0.12 0 0)` | Elevated surfaces, cards |
| `--bg-glass` | `rgba(10,10,10,0.7)` | N/A | Frosted glass overlays |
| `--gold` | `#C5A55A` | `oklch(0.72 0.1 85)` | Primary accent, sparingly |
| `--gold-dim` | `rgba(197,165,90,0.3)` | N/A | Subtle gold hints |
| `--ivory` | `#F5F0E8` | `oklch(0.95 0.01 85)` | Body text |
| `--silver` | `#B8B8B8` | `oklch(0.77 0 0)` | Secondary text, labels |
| `--white` | `#FFFFFF` | `oklch(1 0 0)` | Headlines only |

### Typography

| Role | Font | Weight | Size Range | Tracking |
|---|---|---|---|---|
| Hero Display | Cormorant Garamond | 700 | 72–120px | -0.02em |
| Section Heading | Cormorant Garamond | 600 | 48–64px | -0.01em |
| Subheading | DM Sans | 500 | 20–24px | 0 |
| Body | DM Sans | 400 | 16–18px | 0.01em |
| Label / Caption | Cormorant Garamond | 300 italic | 14–16px | 0.15em (uppercase) |
| Button | DM Sans | 500 | 14–16px | 0.1em (uppercase) |

### Animation Rules

| Property | Value | Reasoning |
|---|---|---|
| Default duration | 0.8–1.2s | Luxury = deliberate, not snappy |
| Easing | `power2.out` or `power3.out` | Smooth deceleration |
| Scroll trigger start | `"top 85%"` | Content enters before reaching center |
| Fade-in distance | 30–50px upward | Subtle lift, not dramatic jump |
| Stagger delay | 0.15s | Cascading reveals |
| Parallax ratio | 0.3–0.5 | Subtle depth, not jarring |

### Signature Interactions

1. **Gold Particle Constellation** — 7 particles forming a star pattern, reacting to scroll
2. **Curtain Reveal** — dark wipe transitions between major sections
3. **Frosted Glass** — `backdrop-filter: blur(20px)` on text overlays over imagery
4. **Magnetic CTA** — buttons subtly attract toward cursor within a 100px radius
5. **Gold Shimmer** — buttons have a traveling light effect on hover

### Anti-Patterns (NEVER DO)

- Purple gradients of any kind
- Centered card grids with uniform rounded corners
- Inter font anywhere
- Bright white backgrounds
- Playful bounce animations
- Generic stock photography
- More than 2 gold elements visible at any time
- Text directly on busy images without a glass overlay
