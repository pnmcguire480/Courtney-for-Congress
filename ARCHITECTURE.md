# ARCHITECTURE.md — System Design and Technical Stack

> 🔄 **UPDATE FREQUENCY: EVERY ARCHITECTURAL CHANGE**

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Templating | Eleventy (11ty) v3 | Nunjucks + Markdown, zero client-side overhead |
| Markup | HTML5 (semantic) | Maximum compatibility |
| Styling | CSS3 (custom properties, grid, flexbox) | No preprocessor needed for this scale |
| JavaScript | Vanilla ES5/ES6 | No framework overhead, instant load |
| Fonts | Self-hosted WOFF2 | Privacy (no Google Fonts CDN), performance |
| Forms | Netlify Forms | Free, no backend needed, built into hosting |
| Donations | Anedot (iframe) | FEC-compliant political donation processing |
| Hosting | Netlify (static) | Free tier, automatic SSL, CDN, form handling |
| Version Control | Git (local + GitHub remote) | Standard |

## Architecture Decision: 11ty Templating

The site uses Eleventy for templating (layouts, partials, data files, Markdown news articles) but ships zero client-side JavaScript from 11ty. The build output (`_site/`) is plain HTML/CSS/JS — the same as the original static site, but now with shared components and data-driven content.

**Why:** Eliminates duplication across 22 pages (nav, footer, head, scripts all shared). News articles are Markdown — easy for anyone to write. Signature count, social links, and site metadata live in one JSON file (`src/_data/site.json`).

**Only dependency:** `@11ty/eleventy` (dev dependency).

---

## File Architecture

```
src/                          11ty source directory
├── _data/
│   └── site.json             Global data (title, socials, sig count, GA ID, etc.)
├── _includes/
│   ├── head.njk              Meta tags, stylesheets, analytics, favicon
│   ├── nav.njk               Navigation bar with mobile hamburger
│   ├── footer.njk            Footer with social links, contact, email signup
│   ├── sig-banner.njk        Signature countdown banner
│   └── scripts.njk           JS includes (theme, page-specific)
├── _layouts/
│   ├── base.njk              Master layout (wraps all pages)
│   ├── post.njk              Blog post layout (extends base)
│   └── bare.njk              Minimal layout
├── *.njk                     Page templates (12 main pages)
├── es/                       Spanish pages (3 pages + es.json)
├── news/
│   ├── index.njk             News listing page
│   ├── news.json             Default front matter for all articles
│   └── *.md                  Individual articles (6 published)
└── assets/                   Passed through to _site/ unchanged

_site/                        Build output (deployed to Netlify)
assets/                       CSS, JS, images, fonts
eleventy.config.js            11ty config (input/output, filters, collections)
package.json                  11ty dependency only
netlify.toml                  Deploy config, headers, redirects
robots.txt                    Search engine directives
sitemap.xml                   Page index for crawlers

_archive/                     Historical snapshots (not deployed)
docs/                         Private documents (not deployed)
```

---

## CSS Architecture

4 files loaded in order on every page:

1. **a11y.css** — Accessibility (skip-nav, focus styles, screen reader utilities)
2. **core.css** — Layout, typography, components, base styles
3. **theme.css** — CSS custom properties for colors, dark mode toggle
4. **responsive.css** — Mobile/tablet breakpoints

CSS uses custom properties (`--var`) for theming. Dark mode toggles a `data-theme="dark"` attribute on `<html>`.

---

## JavaScript Architecture

- **site.js** loads on every page — handles nav, theme toggle, scroll animations
- **[page].js** loads only on its respective page — handles page-specific logic
- No module system, no bundling — each script is a standalone `<script>` tag
- Theme preference saved to `localStorage`

---

## Deployment

```
git push → Netlify auto-deploys from main branch
           Build command: npx @11ty/eleventy
           Publish directory: _site
           SSL: automatic via Let's Encrypt
           CDN: Netlify Edge
```

---

## Security

Configured in `netlify.toml`:

| Header | Value | Purpose |
|--------|-------|---------|
| CSP | `default-src 'self'; script-src 'self' 'unsafe-inline'; frame-src https://secure.anedot.com` | Restrict resource loading |
| HSTS | `max-age=31536000; includeSubDomains; preload` | Force HTTPS |
| X-Frame-Options | `DENY` | Prevent clickjacking |
| X-Content-Type-Options | `nosniff` | Prevent MIME sniffing |
| Permissions-Policy | Deny camera, mic, geo, payment, USB | Minimize API surface |

Private directories blocked via redirect rules: `/docs/*`, `/.claude/*` → 404

---

## External Integrations

| Service | How | Where |
|---------|-----|-------|
| Netlify Forms | `<form netlify>` attribute | get-involved, es pages, footer signup |
| Anedot | `<iframe>` embed | follow-the-money |
| Google Analytics 4 | gtag.js (G-HTBD03VP7E) | All pages via head partial |
| Schema.org | JSON-LD in `<head>` | Every page (Organization, WebSite, WebPage, Article) |
| Open Graph | `<meta>` tags | Every page |
