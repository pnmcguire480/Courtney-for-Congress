# BrainStormer — Ruleset

This file grows over time. Each BrainStormer run appends new rules below.
Never delete or overwrite entries — the value is in the accumulation.

Rules are referenced at the start of every new run (Step 1) to improve
angle ranking and format matching based on what's worked before.

---

<!-- New runs append below this line -->

### Run: Quality Audit — 2026-03-26

**Type:** Full site quality run (HTML, CSS, JS, SEO, a11y, security)
**Scope:** 33 files analyzed, 20 findings, 31 files modified
**Duration:** Single session

#### Rules learned:

1. **Dark mode override lists rot fast.** Every time a new page-specific `<style>` block adds `color:var(--plum)`, it must also be added to the theme.css plum-text override list. The list had 38 selectors but was missing 26. Future rule: when adding any element with `color:var(--plum)` on a light surface, immediately add it to both `[data-theme="dark"]` and `@media (prefers-color-scheme: dark)` blocks in theme.css.

2. **Inline styles with CSS variables defeat dark mode.** `style="color:var(--plum)"` in HTML requires the attribute selector `[style*="color:var(--plum)"]` in theme.css. Prefer class-based styling over inline var() usage. The existing catch-all at theme.css:396 helps but only for exact string matches.

3. **JSON-LD schema needs maintenance.** Past events left in structured data get indexed by Google as current. Rule: when an event passes, move it from JSON-LD to the HTML "Past Events" list only. Schema should only contain upcoming events.

4. **Null guards on getElementById are non-negotiable.** Six JS files crashed if expected DOM elements were missing. Rule: every `getElementById` or `querySelector` call must have a null check before accessing properties. Use early return pattern: `var el = document.getElementById('x'); if (!el) return;`

5. **Duplicate JS files for i18n is a maintenance trap.** signup.js and signup-es.js diverged by only 4 strings but required every bug fix to be applied twice. Rule: use `document.documentElement.lang` to detect language and keep one file with a strings object.

6. **CSP must be updated when adding external scripts.** GA4 required both `script-src` (for gtag.js) and `connect-src` (for analytics endpoints) updates in netlify.toml. Rule: any external script addition requires a CSP audit.

7. **Block non-public files in netlify.toml.** Template files, brainstormer output, and planning docs are accessible by default on a static host. Rule: add redirect blocks for every directory that shouldn't be public.

---

### Run: Quality Audit #2 — 2026-03-26

**Type:** Full site quality run + content expansion (HTML, CSS, JS, SEO, a11y, i18n)
**Scope:** 22 files analyzed, 4 findings, 8 files modified (fixes), 10 files created/expanded
**Duration:** Single session

#### Rules learned:

1. **New Netlify forms need the right CSS class for JS handling.** When adding a new `<form>` with `data-netlify="true"`, it must also have the class that signup.js targets (`.signup-form`). Without it, the form falls back to full page reload instead of AJAX submission. Rule: every new Netlify form gets `class="signup-form"` plus any layout class.

2. **Spanish pages need separate form names.** Netlify Forms uses the `name` attribute to route submissions. Spanish forms must use distinct names (`voluntario` not `volunteer`, `email-signup-es` not `email-signup`) or submissions merge into one inbox with no language distinction.

3. **Hreflang must be bidirectional.** When creating `es/issues.html`, the English `issues.html` must also get an `hreflang="es"` tag pointing back. Both pages must reference each other. Rule: adding a translation = editing two files.

4. **Replace "incumbent" with the actual name.** The Follow the Money page linked to Shontel Brown's FEC filings but never named her. Not naming the opponent killed SEO and confused voters. CSS class names (`.col-incumbent`) can stay — those aren't user-facing.

5. **success.html and 404.html are SEO afterthoughts.** Both were missing twitter:card, canonical, and/or og:type. Rule: every HTML file gets the full meta tag checklist — even pages with `noindex`.

6. **Content urgency > technical quality.** The grassroots strategic review was right: the site's code quality far outpaces its content urgency. This session proved it — publishing 3 blog posts, adding "Why Independent?", and naming the opponent had more strategic value than any CSS fix.

#### What the grassroots agent surfaced:

The strategic review identified 8 priority actions, most of which are content/messaging, not code. Key insight: **the site's technical quality far outpaces its content urgency.** With 39 days to collect 1,713 more signatures, the campaign needs published blog posts, sharper CTAs, and Cleveland-localized messaging more than it needs code improvements. Future quality runs should weight content gaps as CRITICAL, not just technical issues.
