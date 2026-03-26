# BrainStormer: Quality Run #2 — Stats

> Generated: 2026-03-26 (Run #2)

---

## Audit Scope

| Category | Files Analyzed |
|----------|---------------|
| HTML pages | 16 (11 main + 3 news + 1 Spanish + 1 district-news) |
| CSS files | 4 (core, theme, responsive, a11y) |
| JS files | 12 (site, index, signup, signup-es, voter-reg, endorsements, events, gallery, issues, press, get-involved, district-news) |
| Config | 1 (netlify.toml) |
| **Total** | **33 files** |

## Finding Summary

| Severity | Count |
|----------|-------|
| CRITICAL | 3 |
| HIGH | 5 |
| MEDIUM | 7 |
| LOW | 5 |
| **Total** | **20 findings** |

## Category Breakdown

| Category | Findings |
|----------|----------|
| Broken/missing content | 2 |
| Stale/placeholder content | 3 |
| SEO gaps | 3 |
| JS null safety | 1 (6+ instances) |
| Accessibility | 3 |
| CSS quality | 3 |
| Security/performance | 4 |
| Code duplication | 2 |

## What's Strong

- Security headers in netlify.toml: CSP, HSTS preload, Permissions-Policy ✓
- Open Graph + Schema.org on all main pages ✓
- Canonical URLs on every page ✓
- Skip-nav links on all pages ✓
- ARIA labels on most interactive elements ✓
- Heading hierarchy correct across all pages ✓
- Asset versioning consistent (`v=20260322`) ✓
- Passive scroll listeners ✓
- DocumentFragment usage for batch DOM inserts ✓
- Focus trap on mobile menu with Escape key restore ✓
