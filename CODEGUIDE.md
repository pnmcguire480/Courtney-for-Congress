# CODEGUIDE.md — Code Conventions and Standards

> 📌 **UPDATE FREQUENCY: SET ONCE, REVISIT RARELY**

---

## Stack Rules

- **11ty for templating.** Pages are Nunjucks (`.njk`), news articles are Markdown (`.md`).
- **Only dependency:** `@11ty/eleventy`. No other npm packages.
- CSS uses custom properties (`--var`) — never hardcode colors
- JavaScript is vanilla ES5/ES6 — no modules, no bundler
- All fonts self-hosted — no CDN calls
- Source lives in `src/`, build output in `_site/`

---

## File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Pages | `kebab-case.njk` | `voter-registration.njk` |
| News | `YYYY-MM-DD-slug.md` | `2026-03-28-no-kings-cleveland.md` |
| CSS | `purpose.css` | `core.css`, `theme.css`, `responsive.css` |
| JS | `page-name.js` | `signup.js`, `voter-registration.js` |
| Shared JS | `site.js` | Loaded on every page |
| Images | `descriptive-name.ext` | `og-image.png`, `apple-touch-icon.png` |

---

## CSS Conventions

### Load Order (every page)

```html
<link rel="stylesheet" href="/assets/css/a11y.css">
<link rel="stylesheet" href="/assets/css/core.css">
<link rel="stylesheet" href="/assets/css/theme.css">
<link rel="stylesheet" href="/assets/css/responsive.css">
```

### Rules

- Use CSS custom properties from `:root` — never raw hex values
- Page-specific styles go in inline `<style>` blocks in the HTML `<head>`
- Shared styles go in `core.css`
- Dark mode overrides go in `theme.css`
- Responsive breakpoints go in `responsive.css`
- Accessibility styles go in `a11y.css`
- Class names: `.kebab-case` (e.g., `.nav-links`, `.section-title`, `.quick-card`)

---

## JavaScript Conventions

### Structure

- `site.js` loads on every page — handles nav, theme, scroll, animations
- `[page].js` loads only on its page — handles page-specific logic
- No module system — each file is a standalone `<script>` at bottom of `<body>`
- Use `const` and `let`, not `var`
- Use template literals for string building
- Use `addEventListener`, not `onclick` attributes (except theme toggle in `<head>`)

### Patterns

```javascript
// DOM queries
const el = document.querySelector('.selector');
const els = document.querySelectorAll('.selector');

// Event listeners
el.addEventListener('click', () => { ... });

// LocalStorage for preferences
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');

// Intersection Observer for scroll effects
const observer = new IntersectionObserver(callback, { threshold: 0.1 });
observer.observe(element);
```

---

## HTML Conventions

- Semantic elements: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Every page has: skip-nav link, `<main>`, proper heading hierarchy
- Every page includes Schema.org JSON-LD in `<head>`
- Every page has Open Graph and Twitter card meta tags
- Forms use `<label>` with `for` attribute — never implicit labels
- All images have `alt` text
- Links to external sites get `rel="noopener noreferrer"`

---

## Git Workflow

- **Branch:** Feature branches, merge to `main` for deploy
- **Commits:** Descriptive messages, present tense ("Add voter registration page")
- **Build:** Run `npm run build` before committing to verify output
- **Push:** After each working session
- **No force push.** Ever.

---

## Accessibility Checklist

Before shipping any page:

- [ ] Keyboard navigable (Tab through everything)
- [ ] Skip-nav link present and functional
- [ ] All images have `alt` text
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 large text)
- [ ] Focus indicators visible
- [ ] Forms have labels
- [ ] No content hidden from screen readers unless decorative
