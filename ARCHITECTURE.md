# ARCHITECTURE.md — System Design and Technical Stack

> 🔄 **UPDATE FREQUENCY: EVERY ARCHITECTURAL CHANGE**

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Markup | HTML5 (semantic) | Zero dependencies, maximum compatibility |
| Styling | CSS3 (custom properties, grid, flexbox) | No preprocessor needed for this scale |
| JavaScript | Vanilla ES5/ES6 | No framework overhead, instant load |
| Fonts | Self-hosted WOFF2 | Privacy (no Google Fonts CDN), performance |
| Forms | Netlify Forms | Free, no backend needed, built into hosting |
| Donations | Anedot (iframe) | FEC-compliant political donation processing |
| Hosting | Netlify (static) | Free tier, automatic SSL, CDN, form handling |
| Version Control | Git (local + remote) | Standard |

## Architecture Decision: No Build Step

This is an intentional zero-dependency static site. There is no `package.json`, no `node_modules`, no build process. Files deploy as-is from the root directory. This is a feature, not a limitation.

**Why:** Campaign sites need to be reliable above all else. No dependency can break. No build can fail. Any developer can open any file and understand it immediately.

---

## File Architecture

```
/                           Root = deploy directory
├── *.html                  Pages (11 total)
├── es/                     Spanish language variant
├── news/                   Blog/news articles
├── assets/
│   ├── css/
│   │   ├── core.css        Layout, typography, base styles
│   │   ├── theme.css       Color variables, component theming, dark mode
│   │   ├── responsive.css  Breakpoints: 320px, 768px, 1024px
│   │   └── a11y.css        Accessibility: focus, skip-nav, screen reader
│   ├── js/
│   │   ├── site.js         Shared: nav, theme toggle, scroll, animations
│   │   └── [page].js       Per-page logic (signup, voter-reg, etc.)
│   ├── fonts/              Self-hosted WOFF2 + fonts.css
│   └── images/             Favicons, OG image, campaign logo
├── docs/                   Private (blocked by netlify.toml redirect)
├── netlify.toml            Deploy config, headers, redirects
├── robots.txt              Search engine directives
└── sitemap.xml             Page index for crawlers
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
           No build command
           Publish directory: "." (root)
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

Private directories blocked via redirect rules: `/docs/*`, `/markdown/*`, `/.claude/*` → 404

---

## External Integrations

| Service | How | Where |
|---------|-----|-------|
| Netlify Forms | `<form netlify>` attribute | get-involved.html, es/index.html |
| Anedot | `<iframe>` embed | follow-the-money.html |
| Schema.org | JSON-LD in `<head>` | Every page (Organization, WebSite, WebPage) |
| Open Graph | `<meta>` tags | Every page |
