# Archex — Website & Gateway

The official parent-brand website and central ecosystem gateway for **[archexweb.in](https://www.archexweb.in/)**.

Archex operates as the parent brand bringing together three distinct, complementary practices:
1. **Archex Craft** (`craft.archexweb.in`) — Thoughtful software engineering, web applications, and digital product development.
2. **Archex Studio** (`studio.archexweb.in`) — Brand identity, creative direction, UI/UX, and digital experiences.
3. **Archex GTM** (`gtm.archexweb.in` via parent contact gateway) — Go-to-market strategy, positioning, launch planning, and growth execution.

---

## Brand Positioning & Operating Philosophy

- **Overarching Tagline**: *Archex — Independent thinking. Purposeful execution.*
- **Mission**: Archex brings together technology, creative thinking and go-to-market expertise to help ideas become meaningful products, experiences and businesses.
- **Engagement Model**: Collaborative framework, independent engagement. Clients may engage individual practices independently, or bring them together for multidisciplinary execution.

---

## Ecosystem Destinations

| Practice | Scope | Live Destination |
| :--- | :--- | :--- |
| **Archex Craft** | Software engineering & digital systems | [`https://craft.archexweb.in/`](https://craft.archexweb.in/) |
| **Archex Studio** | Brand identity & digital experiences | [`https://studio.archexweb.in/`](https://studio.archexweb.in/) |
| **Archex GTM** | Go-to-market strategy & execution | Direct parent enquiry: [`https://gtm.archexweb.in`](https://www.archexweb.inhttps://gtm.archexweb.in) |

*Note: No fabricated destination URL is deployed for Archex GTM until its dedicated digital property is established.*

---

## Technology Stack

- **Framework**: [Astro](https://astro.build/) (Static Mode)
- **Language**: TypeScript (`astro/tsconfigs/strict`)
- **Styling**: Native CSS with design tokens, fluid typography (`clamp()`), and responsive layouts
- **Fonts**: Locally hosted self-contained WOFF2 typefaces (`DM Serif Display`, `Instrument Sans`)
- **Accessibility**: WCAG 2.2 AA compliant, skip link, accessible mobile drawer with keyboard focus trap and Escape key listener
- **Verification**: [Playwright](https://playwright.dev/) End-to-End test suite across multiple viewports (320px to 1920px)

---

## Project Structure

```
Archex/
├── public/
│   ├── favicon.svg               # Archex arch vector favicon
│   ├── robots.txt                # Production crawl directives & sitemap pointer
│   ├── sitemap.xml               # Complete production XML sitemap
│   ├── _redirects                # Legacy routing & permanent 301 redirects
│   └── fonts/                    # Locally hosted WOFF2 brand typefaces
├── src/
│   ├── components/
│   │   ├── Header.astro          # Navigation with accessible mobile drawer
│   │   ├── Hero.astro            # Editorial headline & 3-discipline overview
│   │   ├── Practices.astro       # Equal 3-practice cards (Craft, Studio, GTM)
│   │   ├── CollaborationFramework.astro # Flow: Strategy → Design → Engineering → Market
│   │   ├── AboutSection.astro    # Homepage ecosystem overview & 4 pillars
│   │   ├── ContactCTA.astro      # Closing enquiry invitation
│   │   └── Footer.astro          # Identity, destinations, legal & dynamic copyright
│   ├── layouts/
│   │   └── BaseLayout.astro      # Shell, SEO meta, OG tags, Schema.org Organization JSON-LD
│   ├── pages/
│   │   ├── index.astro           # Continuous homepage
│   │   ├── about.astro           # Detailed about page & ecosystem philosophy
│   │   ├── contact.astro         # 8-field accessible enquiry form with validation & consent
│   │   ├── privacy.astro         # Privacy policy with purpose-specific consent
│   │   ├── terms.astro           # Terms of service governing ecosystem usage
│   │   └── 404.astro             # Custom accessible 404 not found page
│   └── styles/
│       └── global.css            # Archex design tokens, form system & global styles
├── tests/
│   └── e2e/
│       ├── gateway.spec.ts       # 18 Parent brand governance, content & form tests
│       └── responsive-screenshots.spec.ts # Multi-viewport responsive audits & captures
├── artifacts/
│   └── screenshots/              # High-resolution multi-device screenshot captures
├── astro.config.mjs              # Static configuration
├── playwright.config.ts          # Playwright test & preview webServer configuration
└── package.json
```

---

## Local Development & Verification

```bash
# 1. Install dependencies
npm install

# 2. Typecheck with Astro compiler
npm run check

# 3. Build production static bundle
npm run build
# Output directory: dist/

# 4. Preview build locally
npm run preview

# 5. Run Playwright E2E and screenshot suite
npm run test:e2e
```

---

## Contact Form & Backend Integration

The enquiry form on `/contact` is built with:
- Client-side validation: RFC-standard email check, length requirements, required indicators.
- Accessibility: `aria-invalid`, `aria-describedby`, error alerts, auto-focus on first error.
- Anti-spam: Honeypot trap field (`_archex_hp`).
- Security: Duplicate submission throttling and rate limiting via session hashing.
- Consent separation: Purpose-specific enquiry processing consent is strictly separate from optional marketing consent.

### Backend Routing Configuration
In production environments (e.g., Cloudflare Pages, Netlify, Vercel), connect the form submission handler to your preferred backend service:
- **Option A (Astro Server / Serverless Endpoint)**: Change `output: 'static'` to `output: 'hybrid'` or deploy an edge function at `/api/contact` sending via Resend / AWS SES.
- **Option B (Serverless Webhook)**: Dispatch to a secure webhook endpoint (e.g. Zapier, Make, n8n, Slack/Discord notification bot) configured via `CONTACT_WEBHOOK_URL`.
- **Option C (Hosting Form Handler)**: Cloudflare Workers or Netlify Forms attribute (`data-netlify="true"`).

---

## License & Copyright

© 2026 Archex. All rights reserved.
