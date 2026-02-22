# Cortney Peterson for Congress — OH-11 🇺🇸

**A free, open-source campaign website for Cortney Peterson — Independent candidate for Ohio's 11th Congressional District.**

This is a single-file HTML campaign site built as a volunteer contribution. No strings attached, no invoices, no PAC money involved. Just a regular person helping another regular person fight for working families.

---

## 🚀 Quick Start

1. Download or clone this repo
2. Open `index.html` in any browser
3. That's it. No build tools, no dependencies, no frameworks to install.

## ✏️ What Needs to Be Customized

### Must Do
| Item | Location in Code | What to Do |
|------|-----------------|------------|
| **Headshot Photo** | Hero section — look for `hero-image-placeholder` | Replace the placeholder `<div>` with `<img src="your-photo.jpg" alt="Cortney Peterson">` |
| **Social Media Links** | Footer — look for `social-link` | Replace the `#` hrefs with actual Facebook, Instagram, TikTok, Threads, and Bluesky URLs |

### Integration Points (for a developer)
| Feature | Notes |
|---------|-------|
| **Email Signup** | Form is stubbed out in the footer. Connect to Mailchimp, ConvertKit, Action Network, or whatever email service the campaign uses |
| **Donate Button** | Already linked to the existing Anedot page (`secure.anedot.com/cortney-peterson-for-congress/donate`) — update if the link changes |
| **Issues Page** | The current site has an Issues tab with detailed policy positions. This could be built as a second HTML page or expanded as sections within this file |
| **Endorsements Page** | Same as above — add as needed |
| **Get Involved Page** | Volunteer signup, events, etc. |

## 🎨 Design Details

- **Single-file HTML** — all CSS and JS are inline, zero external dependencies beyond Google Fonts
- **Mobile-first responsive** — works on phones, tablets, and desktop
- **Fonts**: Playfair Display (headlines), Source Sans 3 (body), Bebas Neue (labels/accents)
- **Color palette**: Deep plum (`#3d1952`), coral (`#e8845c`), cream (`#faf6f0`)
- **Features**: Sticky nav with scroll effect, hamburger mobile menu, scroll-reveal animations, accessible markup

## 🌐 Free Hosting Options

Since this is a static HTML file, it can be hosted for free almost anywhere:

- **GitHub Pages** — Enable in repo Settings → Pages → Deploy from main branch
- **Netlify** — Drag and drop the file at [netlify.com/drop](https://app.netlify.com/drop)
- **Cloudflare Pages** — Connect the repo for auto-deploys
- **Vercel** — Same as above

To use a custom domain like `cortneyforcongress.org`, point the DNS to whichever host you choose.

## 📋 License

This project is donated to the Cortney Peterson for Congress campaign. Use it, modify it, make it yours. No attribution required.

## 💪 Why This Exists

Cortney is running a grassroots campaign — no foreign PACs, no corporate PACs, just people. This website was built in the same spirit. Free tools for real people running for real change.

If you want to support the campaign directly: [**Donate here**](https://secure.anedot.com/cortney-peterson-for-congress/donate)

---

*Built with ❤️ by a volunteer developer. Not paid for by any PAC, corporation, or lobbyist.*

*Paid for by Cortney Peterson For Congress.*
