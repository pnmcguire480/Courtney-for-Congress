# SPEC.md — Product Specification

> 🔄 **UPDATE FREQUENCY: EVERY FEATURE CHANGE**

---

## Users

### Primary: Potential Voters (OH-11 residents)
- Browse on phones (mobile-first)
- Want to quickly understand who Cortney is and what she stands for
- Need easy access to voter registration
- May want to donate (small dollar)

### Secondary: Potential Volunteers
- Want to sign up to help the campaign
- Need event information
- Looking for ways to get involved beyond donations

### Tertiary: Press / Media
- Need candidate bio, photos, press releases
- Looking for contact information and campaign statements

---

## Features (Current)

| Feature | Page | Status |
|---------|------|--------|
| Hero + campaign intro | index.html | Done |
| Issue positions (grid) | issues.html | Done |
| Volunteer signup form (Netlify Forms) | get-involved.html | Done |
| Spanish language signup | es/index.html | Done |
| Voter registration directory (50 states) | voter-registration.html | Done |
| Endorsements showcase | endorsements.html | Done |
| Campaign events listing | events.html | Done |
| Photo gallery | gallery.html | Placeholder |
| Press/media page | press.html | Done |
| Campaign finance transparency | follow-the-money.html | Done |
| Donation integration (Anedot) | follow-the-money.html | Done |
| News/blog articles | news/ | Started (1 article) |
| Signature progress bar | index.html | Done |
| Dark/light theme toggle | All pages | Done |
| Mobile hamburger nav | All pages | Done |
| SEO schema markup | All pages | Done |
| Security headers | netlify.toml | Done |
| Accessibility features | All pages | Done |
| Custom 404 page | 404.html | Done |

---

## Acceptance Criteria (Global)

- Every page loads in under 2 seconds on 3G
- Every page has a clear call-to-action
- Every page is accessible via keyboard navigation
- Every page has proper SEO metadata (title, description, OG, schema)
- Site works without JavaScript (forms degrade gracefully)
- No external tracking, no cookies, no analytics that compromise privacy
