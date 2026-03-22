# ART.md — Visual Design and UX Direction

> 📌 **UPDATE FREQUENCY: SET ONCE, REVISIT RARELY**

---

## Color Palette

### Light Mode (`:root`)

| Token | Hex | Usage |
|-------|-----|-------|
| `--plum` | `#470d44` | Primary brand — hero bg, CTA bg, footer bg, headings |
| `--plum-deep` | `#2e0829` | Darker plum for emphasis |
| `--plum-light` | `#611a5c` | Lighter plum for hover states |
| `--coral` | `#fdb49b` | Accent — buttons, links hover, highlights |
| `--coral-light` | `#fdd0c2` | Soft coral for backgrounds |
| `--cream` | `#fcf0e1` | Page background |
| `--cream-dark` | `#f5e4cf` | Card backgrounds, alternating sections |
| `--slate` | `#2c2c3a` | Dark neutral for footer text |
| `--white` | `#ffffff` | Card surfaces, contrast areas |
| `--text` | `#1a1a2e` | Body text |
| `--text-light` | `#555566` | Secondary text, captions |

### Dark Mode (`[data-theme="dark"]`)

| Token | Dark Value | Notes |
|-------|-----------|-------|
| `--cream` | `#0f0a14` | Deep purple-black background |
| `--cream-dark` | `#150e1b` | Slightly lighter sections |
| `--white` | `#1a1220` | Card surfaces |
| `--text` | `#ece4f2` | Light lavender body text |
| `--text-light` | `#a89bb3` | Muted secondary text |
| `--plum-light` | `#c98ec6` | Plum elements become lighter for readability |
| `--green` | `#5aad82` | Success/action color |
| `--text-accent` | `#d4957e` | Warm accent for links |

Dark mode activates via `data-theme="dark"` on `<html>` (manual toggle) or `@media (prefers-color-scheme: dark)` (system preference). Manual choice is saved to `localStorage`.

---

## Typography

### Font Stack

| Font | Role | Weights | Format |
|------|------|---------|--------|
| **Playfair Display** | Headlines, hero text | 400, 700, 900 (variable) | Self-hosted WOFF2 |
| **Source Sans 3** | Body text, UI | 300, 400, 600, 700 (variable) | Self-hosted WOFF2 |
| **Bebas Neue** | Labels, accents, nav | 400 | Self-hosted WOFF2 |

### Scale

- Base: `16px` (`html { font-size: 16px }`)
- Body line-height: `1.7`
- Headlines use Playfair Display
- Body uses Source Sans 3
- Nav labels and small caps use Bebas Neue

---

## Layout

- Max content width: `1200px`
- Nav: fixed top, blurred background (`backdrop-filter: blur(12px)`)
- Sections alternate between `--cream` and `--cream-dark` backgrounds
- Cards use `--white` background with subtle shadow
- Grid: CSS Grid for issue cards, flexbox for nav and forms

### Breakpoints (responsive.css)

| Breakpoint | Target |
|-----------|--------|
| `max-width: 480px` | Small phones |
| `max-width: 768px` | Tablets / large phones |
| `max-width: 1024px` | Small laptops |

Mobile-first approach: base styles work on mobile, breakpoints enhance for larger screens.

---

## Component Patterns

- **Buttons:** Coral background on plum, rounded corners, hover lifts with shadow
- **Cards:** White bg, rounded corners, subtle shadow, hover scale transform
- **Section titles:** Playfair Display, plum colored, centered with decorative underline
- **Forms:** Labeled inputs with plum focus ring, Netlify Forms integration
- **Nav:** Fixed, transparent → solid on scroll, hamburger menu on mobile
- **Footer:** Plum background, cream text, social links

---

## Animations

- **Scroll reveal:** Elements fade in and slide up on viewport entry (via `IntersectionObserver`)
- **Nav scroll:** Background solidifies on scroll (`.nav.scrolled`)
- **Hover:** Buttons lift with shadow, cards scale slightly
- **Theme toggle:** Smooth color transitions via CSS `transition`

---

## Icons

- SVG inline (no icon library)
- Social icons in nav and footer
- Minimal use — text-first design
