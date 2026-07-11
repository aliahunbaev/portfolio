# ahunbaev.com

Personal site / archive for Ali Ahunbáev. White, black, serif-led, literary —
reads like a library, not a landing page.

## Stack

Next.js (App Router) + plain CSS Modules on Vercel. No UI libraries, no
Tailwind, no animation libraries. Content lives in data files so entries are
added without touching layout code.

## Develop

```bash
npm run dev     # dev server at http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

## Structure

```
app/
  layout.tsx            root shell + fonts; mounts the three fixtures
  globals.css           color + type system (all design tokens live here)
  page.tsx              Work — the home feed + bio rail
  info/                 Info — extended bio, currents, influences
  notes/                Notes — dated list + notes/[slug] reading pages
  sketches/             Sketches — masonry grid (stub)
  contact/              Contact — one screen
  marble/               project page (ships fuller)
  art-movement/         project page (stub)
  beau-flaneur/         project page (stub)
components/
  Stamp.tsx             top-left seal / home link
  Nav.tsx               top-right nav (mobile glyph, active-route underline)
  Clock.tsx             bottom-left live clock
  Feed.tsx              the Work feed (staggered entries)
  ProjectShell.tsx      shared project-page scaffold
  Placeholder.tsx       temporary image stand-in
content/
  work.ts               Work feed entries — add work here
  notes.ts              Notes — add writing here
```

## Editing content

- **Add a work entry:** append to `content/work.ts`. `monument` = full entry
  with image + project page; `index` = date + sentence only; `linkout` =
  external ↗.
- **Add a note:** append to `content/notes.ts`.
- **Images:** black & white, treated in the asset. Drop files in
  `public/images/` and swap `<Placeholder>` for `next/image` (Feed and
  ProjectShell have inline notes showing how).

## Design tokens

All color, type, scale, and rhythm live as CSS variables in
`app/globals.css`. The accent (seal blue) is the only color on the site —
change it in one place. Typefaces swap via the `next/font` import in
`app/layout.tsx`.

## Not yet built (by design)

Chapter rail (v1.1), lightbox, MDX authoring, halftone/WebGL. The classic
version ships first; delight layers arrive one at a time.
