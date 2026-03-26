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

- **Date:** 2026-03-26 (Session 2)
- **What was accomplished:** Executed all 8 grassroots priority items + 4 district-specific gaps. Published 3 blog posts (electric bill, kids in crisis, follow the money) + updated news index. Swapped hero CTA to signatures. Added "Why Independent?" section. Named Shontel Brown on Follow the Money. Email capture above fold. "Host a House Party" on volunteer page. Localized issues to Cleveland (neighborhoods, MetroHealth, FirstEnergy, redlining). Fixed success page dead end. Added Black Cleveland voice, labor/union language (PRO Act, staffing ratios), Faith & Community church organizing section. Created es/issues.html (16 issues) + es/get-involved.html. Quality audit #2: 4 findings fixed (hero form class, success.html meta, 404.html meta+hreflang). All 4 audits PASS.
- **Next session should start with:** See brainstormer/calendar.md "What's Next" — translate follow-the-money to Spanish, add share buttons to blog posts, add "Votes That Follow the Money" contrast section, visualize PAC trend chart.

### What Works Right Now

- All 20 pages load and function correctly (11 main + 4 news + 1 district-news + 3 Spanish + 1 news index)
- Mobile hamburger menu + dropdown nav (touch + keyboard accessible)
- iOS Safari scroll lock on overlays (menu + lightbox)
- Lightbox swipe gestures on mobile, focus on container (not img)
- Throttled scroll listeners with passive flag
- Netlify Forms (volunteer signup EN/ES, email-signup, email-signup-hero, email-signup-es, voluntario — all via unified signup.js)
- Voter registration directory (50 states + territories)
- Theme toggle (light/dark) — dark mode fully covers all plum-text selectors
- Google Analytics 4 (G-HTBD03VP7E) on all pages
- SEO: Schema.org JSON-LD, Open Graph, canonical URLs, hreflang on all pages
- Security: CSP (updated for GA4), HSTS, X-Frame-Options, Permissions-Policy
- Accessibility: skip-nav, focus traps, ARIA labels/modal/expanded, keyboard nav, focus-visible, 44px targets, aria-labels on expandable issues
- Signature progress bar on homepage
- News/blog section: 4 articles published + template (blocked from public access)
- "Why Independent?" section on homepage addressing spoiler objection
- Email capture above fold on homepage
- Faith & Community church organizing section on get-involved
- Shontel Brown named on Follow the Money (SEO-targetable)
- Double-submit protection on all forms
- Null guards on all JS getElementById/querySelector calls

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
news/                   Blog articles (4 published + template)
es/index.html           Spanish homepage
es/issues.html          Spanish issues/platform (16 issues)
es/get-involved.html    Spanish volunteer page + faith outreach

assets/css/core.css        Main stylesheet
assets/css/theme.css       Color variables, component theming
assets/css/responsive.css  Mobile/tablet breakpoints
assets/css/a11y.css        Accessibility styles

assets/js/site.js          Shared: nav, theme toggle, scroll, reveal
assets/js/index.js         Homepage scroll tracking
assets/js/signup.js        Unified form handling (EN + ES via lang detection)
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
