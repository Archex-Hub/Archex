# Archex — The Brand's Digital Gateway

The official brand gateway for **archexweb.in**.

This static website serves as a lightweight, elegant portal to the Archex ecosystem, communicating the transition of **Archex Web** to **Archex Craft** and directing visitors to both **Archex Craft** (digital products & engineering) and **Archex Studio** (brand & digital experience).

---

## Brand Architecture & Mandatory Destinations

- **Brand Name**: `Archex` (wordmark: `archex.`)
- **Core Message**: *"Archex Web is now Archex Craft."*

### Destinations
1. **Archex Craft (Primary)**: [`https://craft.archexweb.in/`](https://craft.archexweb.in/)  
   *01 / DIGITAL PRODUCTS & ENGINEERING* — Product engineering, intelligent systems, and software experiences.
2. **Archex Studio (Creative Practice)**: [`https://studio.archexweb.in/`](https://studio.archexweb.in/)  
   *02 / BRAND & DIGITAL EXPERIENCE* — Visual identity, design systems, and digital experiences.
3. **Studio Work Archive**: [`https://studio.archexweb.in/work/`](https://studio.archexweb.in/work/)  
   Selected work archive from Archex Studio.

---

## Technology Stack

- **Framework**: [Astro](https://astro.build/) (Static Mode)
- **Language**: TypeScript (`astro/tsconfigs/strict`)
- **Styling**: Native Custom CSS with CSS variables, fluid typography (`clamp()`), and responsive layouts
- **Vector Graphics**: Native SVG geometry and architectural diagrams
- **Animation**: Native CSS transitions, keyframe pulses, and accessible motion (`prefers-reduced-motion`)
- **Verification**: [Playwright](https://playwright.dev/) End-to-End & Multi-device responsive test suite

---

## Project Structure

```
Archex/
├── public/
│   ├── favicon.svg              # Archex monolithic arch vector favicon
│   ├── robots.txt               # Production crawl directives
│   └── fonts/                   # Locally hosted WOFF2 brand typefaces
│       ├── dm-serif-display.woff2
│       ├── instrument-sans-400.woff2
│       ├── instrument-sans-500.woff2
│       └── instrument-sans-600.woff2
├── src/
│   ├── components/
│   │   ├── Header.astro         # Minimalist navigation
│   │   ├── Hero.astro           # Rebrand announcement & evolution pathway
│   │   ├── Destinations.astro   # Craft & Studio asymmetric presentation
│   │   ├── SignatureVisual.astro# Interactive "Two directions, one name" artwork
│   │   ├── Closing.astro        # Graceful closing & destination pathways
│   │   └── Footer.astro         # Wordmark, links & dynamic copyright
│   ├── layouts/
│   │   └── BaseLayout.astro     # Semantic shell, SEO meta, OG tags
│   ├── pages/
│   │   └── index.astro          # Continuous gateway homepage
│   └── styles/
│       └── global.css           # Archex design tokens & global styles
├── tests/
│   └── e2e/
│       ├── gateway.spec.ts      # Content, destination links & branding tests
│       └── responsive-screenshots.spec.ts # 8-viewport responsive audits & captures
├── artifacts/
│   └── screenshots/             # High-resolution multi-device captures
├── astro.config.mjs             # Static configuration
├── playwright.config.ts         # Playwright test & webServer configuration
└── package.json
```

---

## Local Development & Build

### Prerequisites
- Node.js >= 18 (Tested on Node v24.16.0)
- npm >= 9

### Commands

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Typecheck Astro & TypeScript
npm run check

# 4. Generate production static build
npm run build
# Output directory: dist/

# 5. Preview production build locally
npm run preview

# 6. Run Playwright E2E & Responsive Test Suite
npm run test:e2e
```

---

## Deployment Instructions

The static build is output to the `dist/` directory and can be deployed to any static host (Vercel, Cloudflare Pages, Netlify, AWS S3 / CloudFront, GitHub Pages):

1. **Build Command**: `npm run build`
2. **Publish / Output Directory**: `dist`
3. **Domain Configuration**:
   - Assign primary/apex domain: `archexweb.in` and `www.archexweb.in`.
   - Configure a 301 permanent redirect from `archexweb.in` to `https://www.archexweb.in/` (or vice-versa according to your canonical preference).
4. **Subdomain Isolation**:
   - Do **NOT** attach root domain to `craft.archexweb.in` or `studio.archexweb.in`.
   - Both subdomains remain completely separate, untouched deployments.

---

## License & Copyright

© 2026 Archex. All directions lead forward.

