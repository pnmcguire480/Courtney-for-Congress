# Cortney Peterson for Congress — OH-11

**A professional campaign website for Cortney Peterson — Independent candidate for Ohio's 11th Congressional District.**

## About Cortney

Cortney Peterson is a nurse, mom, and fierce advocate for working families. After a life-changing medical procedure restored her health, she decided to fight for the people of Ohio's 11th district — not as a politician, but as a policymaker.

**This is a grassroots campaign.** No foreign PACs. No corporate PACs. People-powered.

**FEC ID:** H6OH11186

## The Site

A fast, secure, mobile-first campaign website built with:

- **Static HTML/CSS/JS** — No frameworks, no build tools, no bloat
- **Netlify** — Free hosting with global CDN, auto-SSL, and security headers
- **Zero tracking** — No Google Analytics, no Meta Pixel, no cookies. Your visit is your business.

## Quick Start

```bash
# Clone
git clone https://github.com/pnmcguire480/Courtney-for-Congress.git
cd Courtney-for-Congress

# Preview locally
# Just open index.html in a browser, or:
python3 -m http.server 8000
# Visit http://localhost:8000
```

## Deployment

This site auto-deploys to Netlify when changes are pushed to `main`.

```bash
git add -A && git commit -m "your message"
git push origin main
# Live in ~30 seconds
```

## Structure

```
├── index.html              <- Homepage
├── issues.html             <- Policy positions
├── get-involved.html       <- Volunteer signup & donate
├── endorsements.html       <- Endorsements
├── events.html             <- Campaign events
├── gallery.html            <- Photo gallery
├── press.html              <- Press kit & media info
├── 404.html                <- Custom error page
├── es/
│   └── index.html          <- Spanish-language homepage
├── news/
│   ├── index.html          <- Updates / blog listing
│   ├── _template.html      <- Template for new posts
│   └── 2026-03-08-*.html   <- Individual posts
├── assets/
│   ├── images/             <- Photos, logo, graphics
│   ├── favicon.ico         <- Browser tab icon
│   └── og-image.png        <- Social sharing preview
├── netlify.toml            <- Hosting config & security headers
├── markdown/               <- Development docs & project context
└── _archive/               <- Reference files & originals
```

## Security

This site is hardened with:
- Content Security Policy (CSP)
- HTTP Strict Transport Security (HSTS)
- X-Frame-Options: DENY
- No third-party scripts
- No database, no server-side code, no attack surface

## Contributing

This is a volunteer-built project. If you want to help:

1. Fork the repo
2. Make your changes
3. Submit a pull request
4. Patrick will review

## Support the Campaign

**Donate:** [secure.anedot.com/cortney-peterson-for-congress/donate](https://secure.anedot.com/cortney-peterson-for-congress/donate)

**Contact:** cortneyforcongress@gmail.com

**Social:** [Facebook](https://facebook.com/cortneyforcongress) | [Instagram](https://instagram.com/cortneyforcongress) | [TikTok](https://tiktok.com/@cortneyforcongress) | [Threads](https://threads.net/@cortneyforcongress) | [Bluesky](https://bsky.app/profile/cortneyforcongress.bsky.social)

---

*Paid for by Cortney Peterson For Congress.*

*Built with care by a volunteer developer. Not paid for by any PAC, corporation, or lobbyist.*
