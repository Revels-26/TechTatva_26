# Tech Tatva 26 — Landing Page

Marketing/landing page for Tech Tatva 26 (MIT Manipal's techno-management fest).

This repo is **only the landing page**. Registration, sign-in, and attendee data are
handled by a separate system — this site just links out to it (see `SITE.registerUrl`
in `src/config/site.ts`).

## Tech stack

- [Vite](https://vite.dev/) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (via `@tailwindcss/vite`)
- [lucide-react](https://lucide.dev/) for icons
- [aos](https://michalsnik.github.io/aos/) for scroll-reveal animations
- [react-fast-marquee](https://www.react-fast-marquee.com/) for the sponsor strip

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # type-check + production build
npm run lint     # eslint
npm run preview  # preview the production build
```

## Project structure

```
src/
  components/   # page sections (Header, Hero, About, Events, Sponsors, FAQ, Footer, ...)
  config/       # site-wide constants (name, dates, register URL, socials, nav links)
  index.css     # Tailwind entry + global styles/fonts
  App.tsx       # composes the sections into the single-page layout
public/
  assets/       # images, logos, etc. — add fest assets here
```

## Filling in real content

Everything currently on the page is placeholder copy/data so the project builds and
runs end-to-end. Before launch:

- Update `src/config/site.ts` — fest name/edition, dates, venue, `registerUrl`, socials, contact email.
- Replace placeholder copy/stats in `About.tsx`, the event list in `Events.tsx`, and
  the sponsor list in `Sponsors.tsx` with real content/logos.
- Add real images to `public/assets/` and reference them (prefer AVIF/WebP over PNG/JPEG).
- Update the meta tags and OG image in `index.html`.
