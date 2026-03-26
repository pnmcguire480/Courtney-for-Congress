# BrainStormer: Quality Run — Angles of Attack

> Generated: 2026-03-26 | Scope: Full site audit (HTML, CSS, JS, SEO, a11y, security)

---

## Angle 1: Broken / Missing Content (CRITICAL)

**Finding:** The news index links to `news/2026-03-15-kickoff-recap.html` which doesn't exist. Users clicking "Kickoff Rally Recap" get a 404.
- File: `news/index.html` lines 252, 254
- Action: Create the article or remove the link

**Finding:** `news/_template.html` is publicly accessible. Contains placeholder instructions visible to anyone who navigates to `/news/_template.html`.
- Action: Add redirect in `netlify.toml` to block access, or rename with underscore convention

---

## Angle 2: Stale / Placeholder Content Visible to Voters

**Finding:** Gallery page shows 4 "coming soon" placeholder tiles (📸 icons with text like "Canvass photos coming soon").
- File: `gallery.html` lines 382-407
- Action: Hide with `display:none` or remove until photos arrive

**Finding:** Get-involved page references "Yard signs coming soon" in 3 places.
- File: `get-involved.html` lines 444, 528, 555
- Action: Decide — launch or remove for now

**Finding:** Past events still in Schema.org JSON-LD structured data on `events.html` (lines 35-233). Google may index stale events.
- Action: Remove past events from `<script type="application/ld+json">` blocks

---

## Angle 3: SEO Gaps

**Finding:** `theme-color` meta tag missing from 4 files:
- `success.html`, `news/index.html`, `news/2026-03-08-campaign-launch.html`, `news/_template.html`
- All main pages have `<meta name="theme-color" content="#470d44">` — these don't

**Finding:** `hreflang` tags only on `index.html` and `es/index.html`. All other 14 pages missing self-referential hreflang declarations.

**Finding:** `404.html` missing `og:type` meta tag.

---

## Angle 4: JavaScript Null Safety (HIGH)

6+ getElementById/querySelector calls with no null guards — any missing DOM element crashes the page:

| File | Line | Element |
|------|------|---------|
| `endorsements.js` | 2 | `#endorseForm` |
| `endorsements.js` | 5 | `#endorseSuccess` |
| `get-involved.js` | 2 | `#volunteerForm` |
| `get-involved.js` | 5 | `#formSuccess` |
| `signup.js` | 5 | `form button` |
| `signup-es.js` | 5 | `form button` |
| `voter-registration.js` | 62-63 | `#registerSelect`, `#checkSelect` |
| `index.js` | 32 | signature bar wrap element |

---

## Angle 5: Accessibility Gaps

**Finding:** `gallery.js` line 40 — focuses an `<img>` element which isn't natively focusable. Lightbox container should have `tabindex="-1"` and `role="dialog"`.

**Finding:** `issues.js` lines 4-6 — sets `role="button"` and `aria-expanded` but no `aria-label`. Screen readers can't describe what the button does.

**Finding:** `gallery.html` lines 354, 370 — `<figure>` elements with `role="button"` and `tabindex="0"` is unconventional. Should use `<button>` wrapper or ensure full keyboard handler.

---

## Angle 6: CSS Quality

**Finding:** `responsive.css` uses 35+ `!important` flags — indicates underlying specificity problems in `core.css`.

**Finding:** `theme.css` dark mode (lines 139-162) uses hardcoded hex values (`#c98ec6`, `rgba(201,142,198,0.3)`) instead of CSS variables. Colors defined in 3 places.

**Finding:** `core.css` defines `.btn-ghost` (line 188) and `.btn-outline` (line 183) — neither appears in any HTML file. Possibly dead CSS.

---

## Angle 7: Security & Performance

**Finding:** `voter-registration.js` lines 106-111 builds HTML via string concatenation + `innerHTML`. Low risk (hardcoded data) but bad pattern.

**Finding:** `press.js` line 34 uses deprecated `document.execCommand('copy')`. Has Clipboard API primary path but fallback is deprecated.

**Finding:** `site.js` line 347 — `setInterval(updateSigCountdown, 60000)` never cleared. Runs forever.

**Finding:** `site.js` lines 130-133 — event listeners added to all mobile menu links on every page load without delegation. Accumulate if menu regenerates.

---

## Angle 8: Code Duplication

**Finding:** `signup.js` and `signup-es.js` are nearly identical — differ only in 4 translated strings. Should be one function with language parameter.

**Finding:** Form success handling uses 2 different patterns:
- `signup.js`: Replaces form innerHTML with success message
- `endorsements.js` / `get-involved.js`: Hides form, shows separate success element
