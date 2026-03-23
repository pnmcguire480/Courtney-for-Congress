# CLAUDE.md — Project Intelligence

> 🔄 **UPDATE FREQUENCY: EVERY SESSION**
> This is the first file any AI agent reads when entering this project. Update it at the start and end of every working session.

---

## Project Identity

- **Name:** Cortney Peterson for Congress
- **One-Liner:** Static campaign website for an Independent congressional candidate in Ohio's 11th District.
- **Repo:** Cort4Congress (local git, deployed via Netlify)
- **Live URL:** https://cortneyforcongress.org/
- **Owner:** Patrick Nicholas McGuire (developer), Cortney Peterson (candidate/client)
- **Stage:** [x] Deployed [ ] Iterating

---

## What This Is

A zero-dependency static campaign website for Cortney Peterson, an Independent nurse running for Congress in Ohio's 11th District. Grassroots, no-PAC, people-powered. The site handles volunteer signup, voter registration directory (all 50 states + territories), endorsements, events, issue positions, press/news, and donation integration via Anedot. Spanish language support at `/es/`. Deployed on Netlify with proper security headers, SEO schema markup, and accessibility features.

---

## What This Is NOT

- Not a web app — no backend, no database, no user accounts
- Not a CMS — content is edited directly in HTML files
- Not a framework project — no React, no build step, no node_modules
- Never a fundraising platform — donations go through Anedot (external)
- Never stores voter data or PII — forms go to Netlify Forms only

---

## Current State

### Last Session

- **Date:** 2026-03-23
- **What was accomplished:** Comprehensive mobile responsiveness audit (CSS, JS, accessibility, layout) and fixed all 17 issues: iOS Safari scroll lock, menu fade transition, dropdown touch support, hamburger/checkbox touch targets, form focus indicators, aria-modal/label toggling, scroll throttling with passive listeners, lightbox swipe gestures, clipboard API fallback, color contrast fixes, breakpoint normalization, DocumentFragment optimization, removed all inline onclick handlers across 13 pages
- **Next session should start with:** Test mobile fixes on real devices (iOS Safari, Android Chrome), verify dark mode contrast still good with new section-label/em colors

### What Works Right Now

- All 11 pages load and function correctly
- Mobile hamburger menu + dropdown nav (touch + keyboard accessible)
- iOS Safari scroll lock on overlays (menu + lightbox)
- Lightbox swipe gestures on mobile
- Throttled scroll listeners with passive flag
- Netlify Forms (volunteer signup, English + Spanish)
- Voter registration directory (50 states + territories)
- Theme toggle (light/dark)
- SEO: Schema.org JSON-LD on every page, Open Graph, canonical URLs
- Security: CSP, HSTS, X-Frame-Options, Permissions-Policy
- Accessibility: skip-nav, focus traps (includes hamburger), ARIA labels/modal/expanded, keyboard nav, focus-visible indicators, 44px touch targets
- Signature progress bar on homepage
- News/blog section with article template

### What's Broken Right Now

- Nothing critically broken — site is live and functional

### What's Blocked

| Blocked Item | Waiting On | Since |
|-------------|-----------|-------|
| Photo gallery | Professional campaign photos | Ongoing |
| Endorsements content | More endorsement submissions | Ongoing |

---

## Tech Stack

- **Runtime:** Browser (vanilla JS, ES5/ES6)
- **Styling:** CSS3 (4 files: core.css, theme.css, responsive.css, a11y.css)
- **Fonts:** Self-hosted WOFF2
- **Forms:** Netlify Forms
- **Donations:** Anedot iframe embed
- **Deployment:** Netlify (static hosting, `publish = "."`)
- **Domain:** cortneyforcongress.org

---

## File Map

```
index.html              Homepage (hero, issues grid, signature tracker)
issues.html             Policy positions
endorsements.html       Supporter endorsements
events.html             Campaign events
get-involved.html       Volunteer signup form
gallery.html            Photo gallery (placeholder)
press.html              Press/media page
follow-the-money.html   Campaign finance transparency
voter-registration.html State-by-state voter reg directory
success.html            Form submission thank-you
404.html                Custom error page
news/                   Blog articles
es/index.html           Spanish language homepage

assets/css/core.css        Main stylesheet
assets/css/theme.css       Color variables, component theming
assets/css/responsive.css  Mobile/tablet breakpoints
assets/css/a11y.css        Accessibility styles

assets/js/site.js          Shared: nav, theme toggle, scroll, reveal
assets/js/index.js         Homepage scroll tracking
assets/js/signup.js        English form handling
assets/js/signup-es.js     Spanish form handling
assets/js/voter-registration.js  State directory builder
assets/js/endorsements.js  Endorsements page logic
assets/js/events.js        Events page logic
assets/js/gallery.js       Gallery page logic
assets/js/issues.js        Issues page logic
assets/js/press.js         Press page logic

netlify.toml              Deploy config, security headers, redirects
```

---

## AI Agent Rules

### Must Do

1. **Read this file first.** Every session. No exceptions.
2. **Match existing patterns.** This is vanilla HTML/CSS/JS — no frameworks, no build tools.
3. **Small changes, frequent commits.**
4. **Update this file** at the end of every session.
5. **Respect the static nature.** No npm, no build steps, no dependencies.
6. **Test in browser.** Open the HTML file directly or use `npx serve .` to test.

### Must Not

1. **Never read SNIFFTEST.md.** Human testing only.
2. **Never add npm dependencies.** This is a zero-dependency project.
3. **Never refactor without permission.**
4. **Never remove comments or TODOs.**
5. **Never delete files** without approval.
6. **Never add a build step.** The site deploys as-is from the root directory.

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
