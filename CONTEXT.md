# CONTEXT.md — Background and Domain Knowledge

> 📌 **UPDATE FREQUENCY: SET ONCE, UPDATE AS NEEDED**

---

## Why This Project Exists

Cortney Peterson is a nurse running as an Independent for U.S. Congress in Ohio's 11th District. No PAC money, no party backing — just people and conviction. She needed a professional campaign website that works as an organizing tool, not a brochure. Patrick McGuire is building it as a paid project ($900 total + $75/month maintenance).

---

## Domain Background

### Key Concepts

| Term | Definition | Why It Matters |
|------|-----------|---------------|
| Grassroots campaign | Campaign funded by small-dollar donations and volunteer labor, not PACs or party money | Shapes every design decision — site must convert visitors to volunteers, not just inform |
| OH-11 | Ohio's 11th Congressional District, Greater Cleveland area | Urban/suburban, diverse, working-class — mobile-first audience |
| Anedot | Online donation processing platform for political campaigns | Handles all financial transactions via iframe embed |
| Netlify Forms | Server-side form handling for static sites | Captures volunteer signups without a backend |
| FEC compliance | Federal Election Commission rules for campaign websites | Must include "Paid for by" disclaimers, proper attribution |

### Domain Rules

- Campaign websites must include FEC-required disclaimers
- Donation processing must go through compliant payment processors (Anedot)
- No storing of voter PII on the site itself
- Accessibility is both ethical and legally relevant (ADA)

### Common Misconceptions

- Campaign sites don't need to be complex — simplicity and speed win
- "Pretty" doesn't matter as much as "clear CTA on every page"
- Voters browse on phones, not desktops — mobile-first is mandatory

---

## Stakeholders

| Person / Group | Role | Interest | Influence | Contact |
|---------------|------|----------|-----------|---------|
| Cortney Peterson | Candidate + Treasurer | Site represents her campaign | Final say on content/messaging | Direct |
| Patrick McGuire | Developer | Building and maintaining the site | All technical decisions | Direct |
| Volunteers | Users | Need to sign up, find events, share content | Feedback on usability | Via forms |
| Voters | Users | Need info on issues, how to register, how to donate | Primary audience | Anonymous |

### Decision Authority

- **Product decisions:** Cortney (what the campaign needs)
- **Technical decisions:** Patrick (how to build it)
- **Design decisions:** Patrick (with Cortney's approval on branding)
- **Content decisions:** Cortney (messaging, positions, endorsements)

---

## Constraints

### Technical Constraints

- **Budget:** Minimal — Netlify free tier, no paid services beyond Anedot
- **Hosting:** Netlify static hosting (no server-side code)
- **Stack:** Zero dependencies — vanilla HTML/CSS/JS only
- **Browser requirements:** Must work on mobile Chrome, Safari, Firefox (voters' phones)

### Human Constraints

- **Team size:** 1 developer (Patrick)
- **Candidate availability:** Limited — Cortney is a working nurse
- **Skill gaps:** No dedicated designer, no copywriter

### External Constraints

- **FEC regulations:** Disclaimer requirements, contribution limits
- **Accessibility:** WCAG 2.1 AA target
- **Campaign timeline:** Must be polished before campaign milestones

---

## Values and Principles

- Accessibility is non-negotiable — every voter should be able to use this site
- Speed over features — fast page loads on slow phones
- Simplicity over sophistication — no framework, no build step, no complexity
- Every page earns its existence — if it doesn't serve the campaign, cut it
- The site is an organizing tool, not a brochure

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| CSS files lost (not in git) | Low (now fixed) | High | Committed to git 2026-03-22 |
| Anedot iframe blocked by CSP | Low | High | CSP explicitly allows secure.anedot.com |
| Site defaced or attacked | Low | High | Security headers, no dynamic content, no backend |
| Content goes stale | Medium | Medium | Regular content updates, news section |

---

## Glossary

| Term | Meaning in This Project |
|------|------------------------|
| C4C | Cortney for Congress (internal shorthand) |
| OH-11 | Ohio's 11th Congressional District |
| Grassroots | People-powered, no PAC money, small-dollar funded |
| Static site | No server, no database, just HTML/CSS/JS files |
| Anedot | Donation processor (external service) |
