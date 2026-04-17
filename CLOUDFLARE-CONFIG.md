# Seven Star Chauffeurs — Cloudflare Pages Configuration Guide

This document provides the optimal Cloudflare configuration for maximum performance, security, and SEO ranking for the Seven Star Chauffeurs website.

---

## 1. Cloudflare Pages — Build Settings

| Setting | Value |
|---|---|
| **Framework preset** | Next.js (Static HTML Export) |
| **Build command** | `cd client && npm install && npm run build` |
| **Build output directory** | `client/out` |
| **Root directory** | `/` |
| **Node.js version** | 22.x |
| **Environment variable** | `NODE_ENV=production` |

### Deploy Branch

| Branch | Purpose |
|---|---|
| `main` | Production deployment |
| `staging` | Preview deployment (optional) |

---

## 2. Custom Domain Setup

1. Go to **Pages > Your Project > Custom Domains**
2. Add `sevenstarchauffeurs.com`
3. Add `www.sevenstarchauffeurs.com`
4. Cloudflare will auto-provision SSL certificates
5. Enable **www to apex redirect** in DNS settings (CNAME `www` → `sevenstarchauffeurs.com`)

### DNS Records

| Type | Name | Content | Proxy |
|---|---|---|---|
| CNAME | `@` | `seven-star-chauffeurs.pages.dev` | Proxied |
| CNAME | `www` | `sevenstarchauffeurs.com` | Proxied |

---

## 3. Cloudflare Dashboard — Speed Settings

### Speed > Optimization

| Setting | Value | Why |
|---|---|---|
| **Auto Minify** (JS, CSS, HTML) | ON | Reduces payload size by ~15-25% |
| **Brotli** | ON | Superior compression vs gzip (~20% smaller) |
| **Early Hints** | ON | Sends 103 hints to preload critical assets before HTML arrives |
| **HTTP/2** | ON (default) | Multiplexed connections |
| **HTTP/3 (QUIC)** | ON | Faster on mobile networks, reduces latency |
| **Rocket Loader** | OFF | Can break GSAP scroll animations — do NOT enable |
| **Mirage** | OFF (Pro+) | Can interfere with hero canvas frames |

### Speed > Image Optimization (Pro plan)

| Setting | Value | Why |
|---|---|---|
| **Polish** | Lossless | Strips metadata, reduces size without quality loss |
| **WebP** | ON | Auto-serve WebP to supported browsers |

---

## 4. Caching Settings

### Caching > Configuration

| Setting | Value |
|---|---|
| **Caching Level** | Standard |
| **Browser Cache TTL** | Respect Existing Headers |
| **Always Online** | ON |

### Caching > Tiered Cache

| Setting | Value |
|---|---|
| **Tiered Cache** | Smart Tiered Cache (if available) |

The `_headers` file in the repo already defines per-path cache rules. Cloudflare will respect these.

---

## 5. Security Settings

### SSL/TLS

| Setting | Value |
|---|---|
| **SSL Mode** | Full (Strict) |
| **Always Use HTTPS** | ON |
| **Minimum TLS Version** | TLS 1.2 |
| **TLS 1.3** | ON |
| **HSTS** | ON (max-age 1 year, includeSubDomains, preload) |
| **Automatic HTTPS Rewrites** | ON |

### Security > WAF

| Setting | Value |
|---|---|
| **Security Level** | Medium |
| **Bot Fight Mode** | ON |
| **Browser Integrity Check** | ON |

**Important:** Make sure to **allow** the following bots in WAF rules so they can crawl the site for SEO and AEO:

- Googlebot / Google-Extended
- Bingbot
- GPTBot (OpenAI)
- ClaudeBot (Anthropic)
- PerplexityBot
- Applebot
- Yandex
- DuckDuckBot

Create a WAF custom rule:
```
Rule name: Allow Search & AI Bots
Expression: (cf.client.bot) or (http.user_agent contains "Googlebot") or (http.user_agent contains "Bingbot") or (http.user_agent contains "GPTBot") or (http.user_agent contains "ClaudeBot") or (http.user_agent contains "PerplexityBot") or (http.user_agent contains "Applebot")
Action: Skip (all remaining custom rules)
```

---

## 6. Page Rules (if needed)

| URL Pattern | Setting | Value |
|---|---|---|
| `*sevenstarchauffeurs.com/frames/*` | Cache Level | Cache Everything |
| `*sevenstarchauffeurs.com/frames/*` | Edge Cache TTL | 1 month |
| `*sevenstarchauffeurs.com/_next/static/*` | Cache Level | Cache Everything |
| `*sevenstarchauffeurs.com/_next/static/*` | Edge Cache TTL | 1 month |

---

## 7. Workers / Functions

This is a **static export** site — no Cloudflare Workers or Functions are needed. All pages are pre-rendered at build time.

---

## 8. Analytics

| Service | Setup |
|---|---|
| **Cloudflare Web Analytics** | Enable in dashboard (free, privacy-friendly, no JS tag needed for Pages) |
| **Google Analytics 4** | Add GA4 tag to layout.tsx when ready |
| **Google Search Console** | Verify via DNS TXT record in Cloudflare |
| **Bing Webmaster Tools** | Verify via DNS CNAME record in Cloudflare |

---

## 9. Performance Checklist

After deploying, verify these in Chrome DevTools Lighthouse:

- [ ] Performance score > 90
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] Cumulative Layout Shift < 0.1
- [ ] Total Blocking Time < 200ms
- [ ] All images served as WebP
- [ ] Brotli compression active (check response headers)
- [ ] HTTP/3 active (check protocol in Network tab)
- [ ] HSTS header present
- [ ] No render-blocking resources (fonts preloaded)

---

## 10. Deployment Workflow

```bash
# 1. Push changes to GitHub
git add -A && git commit -m "description" && git push origin main

# 2. Cloudflare Pages auto-deploys from main branch
# Build takes ~60-90 seconds

# 3. Preview at: https://seven-star-chauffeurs.pages.dev
# Production at: https://sevenstarchauffeurs.com (after custom domain setup)
```

### Rollback

If a deployment has issues, go to **Pages > Deployments** and click **Rollback** on the previous working deployment.

---

## Summary of Key "Do NOT" Items

| Setting | Status | Reason |
|---|---|---|
| Rocket Loader | OFF | Breaks GSAP ScrollTrigger animations |
| Mirage | OFF | Can lazy-load hero frames incorrectly |
| HTML Minification via Workers | OFF | Static export already optimized |
| Email Obfuscation | OFF | Can break mailto: links in contact section |
| ScrapeShield | Review | May block legitimate AI crawlers |
