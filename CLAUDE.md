# CLAUDE.md — Project Intelligence

> 🔄 **UPDATE FREQUENCY: EVERY SESSION**
> This is the first file any AI agent reads when entering this project. Update it at the start and end of every working session.

---

## Project Identity

- **Name:** Cortney Peterson for Congress
- **One-Liner:** Campaign website for an Independent congressional candidate in Ohio's 11th District, built with 11ty.
- **Repo:** Cort4Congress (local git, deployed via Netlify)
- **Live URL:** https://cortneyforcongress.org/
- **Owner:** Patrick Nicholas McGuire (developer), Cortney Peterson (candidate/client)
- **Stage:** [x] Deployed [x] Iterating

---

## What This Is

A campaign website for Cortney Peterson, an Independent nurse running for Congress in Ohio's 11th District. Grassroots, no-PAC, people-powered. Built with Eleventy (11ty) for templating, vanilla CSS/JS for everything else. The site handles volunteer signup, voter registration directory (all 50 states + territories), endorsements, events, issue positions, press/news (6 articles), district news aggregator, and donation integration via Anedot. Spanish language support at `/es/`. Deployed on Netlify with proper security headers, SEO schema markup, and accessibility features.

---

## What This Is NOT

- Not a web app — no backend, no database, no user accounts
- Not a CMS — content is edited in Nunjucks templates and Markdown files
- Not a framework project — no React, no client-side framework
- Never a fundraising platform — donations go through Anedot (external)
- Never stores voter data or PII — forms go to Netlify Forms only

---

## Current State

### Last Session

- **Date:** 2026-03-28
- **What was accomplished:**
  - Migrated 2 new news articles (ICE in Hospitals, No Kings Cleveland) to 11ty Markdown
  - Archived pre-migration static site to `_archive/pre-migration-static/`
  - Removed scaffold files (markdown/, brainstormer-video/, paladin, codeglass, AGENTS.md, SCENARIOS.md, etc.)
  - Removed root HTML files — source of truth is now `src/` → `_site/`
  - Updated all project docs for 11ty reality
  - Full pre-launch audit: identified all gaps and blocked items
- **Build output:** 22 files (12 main + 3 Spanish + 6 news + 1 news index)
- **Next session should start with:** Verify Netlify deploy config, update signature count

### What Works Right Now

- All 22 pages build and function correctly via `npm run build`
- 11ty templating: layouts, partials (head, nav, footer, sig-banner, scripts), global data
- News articles in Markdown with front matter, auto-collected and sorted
- Mobile hamburger menu + dropdown nav (touch + keyboard accessible)
- iOS Safari scroll lock on overlays (menu + lightbox)
- Lightbox swipe gestures on mobile
- Netlify Forms (volunteer signup EN/ES, email-signup, email-signup-hero, email-signup-es, voluntario)
- Voter registration directory (50 states + territories)
- Theme toggle (light/dark)
- Google Analytics 4 (G-HTBD03VP7E) on all pages
- SEO: Schema.org JSON-LD, Open Graph, canonical URLs, hreflang on all pages
- Security: CSP (updated for GA4), HSTS, X-Frame-Options, Permissions-Policy
- Accessibility: skip-nav, focus traps, ARIA labels/modal/expanded, keyboard nav, focus-visible, 44px targets
- Signature progress bar (data-driven from `src/_data/site.json`)
- 6 news articles published
- Double-submit protection on all forms
- Null guards on all JS getElementById/querySelector calls

### What's Blocked

| Blocked Item | Waiting On | Since |
|-------------|-----------|-------|
| Photo gallery | Professional campaign photos from Cortney | Ongoing |
| Endorsements content | More endorsement submissions | Ongoing |
| Facebook social link | Page doesn't exist at facebook.com/cortneyforcongress | 2026-03-28 |
| Yard signs section | Campaign funding | Ongoing |

---

## Tech Stack

- **Build:** Eleventy (11ty) v3 — Nunjucks templates, Markdown for news
- **Runtime:** Browser (vanilla JS, ES5/ES6)
- **Styling:** CSS3 (4 files: core.css, theme.css, responsive.css, a11y.css)
- **Fonts:** Self-hosted WOFF2
- **Forms:** Netlify Forms
- **Donations:** Anedot iframe embed
- **Deployment:** Netlify (publish = `_site`)
- **Domain:** cortneyforcongress.org

---

## File Map

```
src/                        11ty source (THE source of truth)
  _data/site.json           Global data (title, socials, sig count, GA ID)
  _includes/                Partials (head, nav, footer, sig-banner, scripts)
  _layouts/                 Layouts (base, post, bare)
  index.njk                 Homepage
  issues.njk                Policy positions
  endorsements.njk          Endorsements
  events.njk                Campaign events
  get-involved.njk          Volunteer signup
  gallery.njk               Photo gallery
  press.njk                 Press/media
  follow-the-money.njk      Campaign finance transparency
  voter-registration.njk    50-state voter reg directory
  district-news.njk         OH-11 news aggregator
  success.njk               Form thank-you
  404.njk                   Custom error page
  es/                       Spanish pages (index, issues, get-involved)
  news/                     Blog articles (Markdown with front matter)
    index.njk               News listing page
    *.md                    Individual articles (6 published)

_site/                      11ty build output (deployed to Netlify)
assets/                     CSS, JS, images, fonts (passed through by 11ty)
eleventy.config.js          11ty configuration
package.json                11ty dependency only
netlify.toml                Deploy config, security headers, redirects

_archive/                   Old files (not deployed)
  pre-migration-static/     Complete pre-migration site snapshot
docs/                       Agreements, invoices, design docs (not deployed)
brainstormer/               Content generation outputs
```

---

## How to Work

### Building

```bash
npm run build     # Build to _site/
npm start         # Dev server with live reload
```

### Adding a News Article

1. Create `src/news/YYYY-MM-DD-slug.md`
2. Add front matter (title, date, description, tag, tagClass, readTime, permalink, hreflang)
3. Write content in Markdown
4. Run `npm run build` — article auto-appears in collection

### Updating Signature Count

Edit `src/_data/site.json` → change `sigCount`. Rebuild.

---

## AI Agent Rules

### Must Do

1. **Read this file first.** Every session. No exceptions.
2. **Match existing patterns.** Nunjucks templates for pages, Markdown for news, vanilla CSS/JS.
3. **Small changes, frequent commits.**
4. **Update this file** at the end of every session.
5. **Build and verify.** Run `npm run build` after changes.

### Must Not

1. **Never read SNIFFTEST.md.** Human testing only.
2. **Never add npm dependencies** beyond 11ty.
3. **Never refactor without permission.**
4. **Never remove comments or TODOs.**
5. **Never delete files** without approval.

### When Uncertain

- **Stop and ask.** A question is always better than a wrong assumption.
- **Present options.** Don't make unilateral decisions.

---

## Context Window Management

### Always Load (Every Session)

- CLAUDE.md (this file)

### Load When Relevant

- ARCHITECTURE.md (deployment, security headers)
- ART.md (colors, typography, component styles)
- CONTEXT.md (campaign background, candidate info)

### Never Load

- SNIFFTEST.md (human eyes only)
- docs/ (private agreements, invoices)
- .netlify/ (deployment cache)

---

## Session Handoff Protocol

When ending a session:
1. Update "Last Session" above
2. Note any open questions
3. Commit changes with descriptive message

When starting a session:
1. Read this file completely
2. Check "Last Session" for continuity
3. Confirm understanding before writing code
