# Cortney for Congress — Website Features

> **Project:** cortneyforcongress.org
> **Stack:** Static HTML + CSS + vanilla JS, hosted on Netlify
> **Last updated:** March 12, 2026

---

## Phase 1 — Completed Features

Everything listed below has been built, committed, and is ready for deployment.

### Pages

#### Homepage (`index.html`)
- Full-viewport hero with candidate headshot, name, office, and pull quote
- "Donate Now" and "Meet Cortney" CTAs in hero
- Hero badge ("Mom. Nurse. Fighter.")
- "Meet Cortney" bio section with drop-cap, sidebar with Golden Rule card and quote card
- Accomplishments section (15 years as matriarch, 12 years as nurse)
- Campaign vision section with highlighted pull quote
- Issue priorities grid (2-row layout with 16 issue pill cards)
- Grassroots pledge section (no PAC money, no corporate money, no foreign PAC money, "Condemn Genocide" stance)
- Donate CTA section
- Full footer with Connect, Contact, Stay Updated columns

#### Issues Page (`issues.html`)
- 16 issue pill cards in a 2-row grid layout
- 13 full policy position sections with detailed proposals:
  - End Foreign & Corporate Influence, Tax the Wealthy, Medicare for All, Reproductive Freedom, Affordable Housing, Livable Wages & UBI, Green New Deal, Free Pre-K Through College, Childcare, Paid Family Leave, Gun Laws, Human Rights for All, Abolish ICE
- Each section includes context, Cortney's position, and specific policy proposals
- "Cortney's Pledge" CTA at bottom

#### Get Involved Page (`get-involved.html`)
- Ballot signature collection urgency banner (2,200 signatures by May 4, 2026)
- "Ways to Help" card grid: Canvassing, Phone Banking, Digital Organizing, Yard Signs (coming soon), Events, Donate
- Volunteer signup form with checkboxes for interest areas
- Donate CTA section

#### Endorsements Page (`endorsements.html`)
- Individual endorsements grid with card layout (name, title, quote)
- Organizational endorsements section
- "Add Your Name" endorsement submission form
- Templates for easily adding more endorsements

#### Events Page (`events.html`)
- Sticky filter bar: All Events, Town Halls, Canvasses, Phone Banks, Rallies, Community
- Events grid with card layout and color-coded type tags
- Past events archive (4 events listed)
- "Host an Event for Cortney" CTA

#### Photo Gallery (`gallery.html`)
- Filter bar: All Photos, Campaign Trail, Community, Events, Cortney
- Responsive photo grid (4 columns desktop, 2 mobile)
- Custom lightbox viewer with keyboard navigation and accessibility
- "Submit Your Photos" CTA

#### Press & Media Kit (`press.html`)
- Press contact banner
- Fast Facts grid (9 cards with candidate info)
- Short bio and long bio with copy-to-clipboard buttons
- Downloadable assets: headshot, wide headshot, campaign logo
- Campaign boilerplate with copy button
- "In the News" section ready for future coverage

#### Campaign Updates (`news/index.html`)
- Posts listing with featured post support
- Post card design with date, category tags, excerpts
- First post: "We're Running — and We're Running to Win" (March 8, 2026)
- Blog post template for easy new post creation

#### Spanish Homepage (`es/index.html`)
- Full Spanish translation of homepage content
- Language toggle in nav
- Separate form for Spanish email signups

#### Custom 404 Page
- On-brand design with witty campaign copy
- Navigation links to all major pages

#### Form Submission Success Page
- Campaign-themed "Thank you for your support!" page
- Shown after any form submission

---

### Forms (4 Netlify Forms)

| Form | Location | What It Collects |
|------|----------|-----------------|
| Email Signup | Footer of every page | Email address |
| Email Signup (Spanish) | Spanish homepage | Email address |
| Volunteer | Get Involved page | Name, email, phone, zip, interests, message |
| Endorsement | Endorsements page | Name, email, city, type, statement |

All forms include:
- Netlify Forms integration (no backend needed)
- Honeypot spam protection
- AJAX submission with inline success messages
- Fallback redirect to success page

---

### Site-Wide Features

**Navigation**
- Fixed top navbar with blur effect on all pages
- Responsive hamburger menu on mobile
- Active tab highlighting for current page
- Social media icons (Facebook, Instagram, TikTok, Threads, Bluesky)
- Prominent coral Donate button

**Design System**
- Consistent color palette: plum, coral, cream
- Three Google Fonts: Playfair Display, Source Sans 3, Bebas Neue
- Responsive at 480px, 768px, and 1024px breakpoints
- Scroll-triggered reveal animations

**SEO**
- Unique title, description, and Open Graph tags on every page
- Twitter/X card support
- Canonical URLs
- Spanish page with hreflang tags

**Accessibility**
- Semantic HTML throughout
- ARIA labels, roles, and states on all interactive elements
- Keyboard navigation support (lightbox, filters)
- Focus management
- Form labels and autocomplete attributes

**Performance**
- No build tools or frameworks — zero overhead
- Inline CSS and JS (no extra HTTP requests)
- Google Fonts preconnect and display swap
- Lazy loading on below-fold images
- 1-year asset caching via Netlify

**Security (Netlify Headers)**
- HSTS with preload
- Content Security Policy
- X-Frame-Options: DENY
- Permissions Policy (camera, mic, geo disabled)
- Cross-Origin protections

**FEC Compliance**
- "Paid for by Cortney Peterson For Congress" on every page
- FEC Committee ID: H6OH11186

---

## Phase 2 — In Progress

- [ ] **Domain DNS transfer** — cortneyforcongress.org registered at Hostinger, nameservers being pointed to Netlify
- [ ] **SSL certificate** — Auto-provisions once DNS propagates
- [ ] **Form email notifications** — Need to configure in Netlify dashboard so Cortney receives submissions
- [ ] **Campaign email hosting** — Currently using Gmail; domain email (info@cortneyforcongress.org) needs a provider
- [ ] **Gallery photos** — Structure built, need real campaign trail photos
- [ ] **Press coverage** — "In the News" section ready, awaiting media coverage
- [ ] **Yard signs** — Section ready to reactivate when funding allows
- [ ] **Spanish page expansion** — Only homepage translated; issues, get-involved, etc. need translation
- [ ] **Social media account verification** — URLs configured, accounts need to be verified as active

---

## Phase 3 — Suggested Future Features

### Fundraising
- Donation progress thermometer / goal tracker
- Embedded Anedot donation widget (instead of external link)
- Recurring donation messaging
- Small-dollar donor wall

### Events
- RSVP integration (Luma, Eventbrite, or custom form)
- "Add to Calendar" buttons (.ics export)
- Event location maps
- Automatic past/upcoming sorting by date

### Voter Engagement
- Voter registration links (Ohio Secretary of State)
- OH-11 district map
- Signature collection progress tracker
- Issue priority survey for supporters

### Email & Outreach
- Newsletter platform integration (Mailchimp, Buttondown)
- SMS/text signup for rapid outreach
- Automated welcome email series
- Dedicated contact form with subject categories

### Content Management
- Headless CMS (Decap CMS or TinaCMS) for non-technical updates
- RSS feed for blog syndication
- Blog pagination and category filtering

### Social Media
- Social sharing buttons on blog posts
- Live social media feed widgets
- Supporter story/testimonial submission form

### Analytics
- Netlify Analytics ($9/month, privacy-friendly)
- A/B testing on hero messaging and CTAs

### Campaign Operations
- Volunteer hour tracking
- Phone banking script page
- Opponent policy comparison (factual, issues-focused)
- Downloadable canvassing materials (flyers, door hangers)

### Legal & Compliance
- Privacy policy page
- Full ADA/WCAG 2.1 AA accessibility audit
- Cookie consent (if analytics added)

### Technical
- Shared nav/footer components (eliminate duplication across 13 pages)
- Sitemap.xml for search engines
- Structured data (Schema.org) for rich search results
- Automated broken link checking
- Image optimization pipeline (WebP format)

---

*Built by Patrick McGuire for Cortney Peterson for Congress*
*Questions? pnmcguire4@gmail.com | (813) 940-0111*
