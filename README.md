# emanuelefaraci.com

My personal portfolio, rebuilt from scratch with Next.js 16 and the App Router. It replaces the previous Vite + React version with a faster, SEO-first architecture while keeping the same dark, minimal design language.

## What it does

- **Landing / Hero** -- animated name reveal with blur-in effect and a typewriter that cycles through my roles.
- **About** -- split layout with profile image, journey timeline and a skills grid organized by domain (frontend, backend, AI, bots, devops).
- **Projects** -- server-rendered grid of selected works with live links, GitHub refs and tech stack badges.
- **Footer** -- contact channels, location clock and site navigation.

A floating dock at the bottom handles all page navigation.

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4, custom CSS
- **Motion**: Framer Motion
- **Fonts**: Space Grotesk + JetBrains Mono via `next/font`
- **Deployment**: Vercel

## SEO

- Per-page metadata with Open Graph and Twitter cards
- JSON-LD structured data (Person + WebSite schemas)
- Dynamic sitemap via `app/sitemap.ts`
- `robots.txt` and `llms.txt` for crawlers and AI agents
- Security and caching headers in `next.config.ts`
- Custom 404 page

## Run locally

```bash
npm install
npm run dev
```

Dev server starts at `http://localhost:3000`.

## Build

```bash
npm run build
npm start
```

---

Contact: hey@emanuelefaraci.com | t.me/emqnuele
