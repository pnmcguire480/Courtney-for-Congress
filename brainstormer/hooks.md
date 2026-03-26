# BrainStormer: Quality Run — Priority Action Items

> Generated: 2026-03-26

---

## CRITICAL (Fix now — voters see broken things)

- [ ] **Broken link:** Create `news/2026-03-15-kickoff-recap.html` or remove link from `news/index.html:252`
- [ ] **Template exposed:** Block public access to `news/_template.html` via netlify.toml redirect
- [ ] **Stale schema:** Remove past events from JSON-LD in `events.html:35-233`
- [ ] **Dark mode readability:** Dark plum text (#470d44) on dark background (#0f0a14) — 20+ selectors missing from `theme.css` override list. Worst on follow-the-money, endorsements, events, district-news pages. Need to add all `color:var(--plum)` text selectors to the dark-mode `#c98ec6` override block.
- [ ] **Google Analytics missing:** Add GA4 measurement ID `G-HTBD03VP7E` to all pages (gtag.js snippet in `<head>`)

## HIGH (Fix soon — resilience + SEO)

- [ ] **Null guards:** Add null checks to all `getElementById`/`querySelector` calls in 6 JS files
- [ ] **theme-color meta:** Add to `success.html`, `news/index.html`, `news/2026-03-08-campaign-launch.html`
- [ ] **Gallery placeholders:** Hide or remove 4 "coming soon" tiles in `gallery.html:382-407`
- [ ] **Lightbox focus:** Fix `gallery.js:40` to focus lightbox container, not `<img>`
- [ ] **Issues a11y:** Add `aria-label` to expandable blocks in `issues.js:4-6`

## MEDIUM (Improve quality)

- [ ] **hreflang tags:** Add self-referential `hreflang="en"` to all 14 non-homepage pages
- [ ] **Merge signup JS:** Consolidate `signup.js` + `signup-es.js` into one function with i18n param
- [ ] **innerHTML → DOM:** Replace string concatenation in `voter-registration.js:106-111`
- [ ] **Clear interval:** Store and clear `setInterval` in `site.js:347`
- [ ] **CSS !important:** Audit `responsive.css` (35+ uses) and refactor base specificity
- [ ] **Dark mode vars:** Replace hardcoded hex in `theme.css:139-162` with CSS custom properties
- [ ] **Double-submit:** Add protection to all 3 form handlers

## LOW (Cleanup)

- [ ] **Dead CSS:** Verify `.btn-ghost` and `.btn-outline` usage, remove if unused
- [ ] **Yard signs:** Decide on `get-involved.html` "coming soon" messaging (lines 444, 528, 555)
- [ ] **Deprecated API:** Remove `document.execCommand` fallback in `press.js:34`
- [ ] **Event delegation:** Refactor mobile menu listeners in `site.js:130-133`
- [ ] **404 og:type:** Add missing `og:type` meta to `404.html`
