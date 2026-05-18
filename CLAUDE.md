# CLAUDE.md

Guidance for Claude Code when editing this repository.

## What this repo is

Personal site for Ihar Nestsiarenia at **nesterione.com** (custom domain via `public/CNAME`). It is an **Astro 5** static site, bilingual (Russian primary, English secondary), deployed to **GitHub Pages** via the workflow in `.github/workflows/deploy.yml`.

## Build / preview

```bash
npm install
npm run dev      # localhost:4321
npm run build    # writes ./dist
npm run preview  # serves ./dist
```

A push to `master` triggers `.github/workflows/deploy.yml`, which builds the site and deploys via `actions/deploy-pages@v4`. The Pages source must be set to **GitHub Actions** in repo settings (one-time, not something to revisit on edits).

## i18n / routing

- Astro `i18n` config in `astro.config.mjs`: `defaultLocale: 'ru'`, `locales: ['ru', 'en']`, `prefixDefaultLocale: true`. Every locale lives under its own prefix (`/ru/...`, `/en/...`). `/` redirects to `/ru/`.
- The language toggle (`src/components/LangToggle.astro`) takes an `alternates` prop with URL paths in the other language. Pages and post routes compute this and pass it through `Base.astro`.
- When a post exists in only one language, the toggle falls back to the other-language home page rather than 404ing.

## Content collections

Posts live in `src/content/posts/{ru|en}/<slug>.md`. The schema (`src/content/config.ts`) requires:

- `slug` — **shared across languages** so the toggle can pair counterparts
- `title`, `date`, `lang: 'ru' | 'en'`
- optional `telegram_url`, `description`

### Adding a new post

1. Create `src/content/posts/ru/<slug>.md` with frontmatter as above.
2. Create `src/content/posts/en/<slug>.md` with the **same `slug`** but `lang: en`.
3. If the EN translation isn't ready, omit the EN file — the RU post still renders, and the toggle on it lands the visitor on `/en/`.

## Styling

Everything is in `src/styles/global.css`. System font stack (`-apple-system` first), light theme only, hairline borders `#e5e5e7`, 680px content max-width. No CSS framework. Match the existing type scale and spacing rather than inventing new tokens.

## Layouts

- `src/layouts/Base.astro` — global chrome (header with brand + language toggle, footer with RSS link). Imports the stylesheet. Handles `<title>`, canonical, `hreflang` link tags.
- `src/layouts/Post.astro` — wraps `Base`; renders title, date, content slot, and an optional `Originally on Telegram →` footer link.

## Preserved verbatim — don't touch

- `public/CNAME` — `nesterione.com`
- `public/favicon.png`
- `public/google3753c623f65c7ef2.html` — Google Search Console verification
- `public/cv.html` — static redirect to `/ru/about/` (legacy URL from the old Jekyll site)

## Things this site **does not** have (on purpose)

- No dark mode toggle (light theme only).
- No accent colour beyond black/gray/white.
- No CSS framework, no JS bundle.
- No image carousels, hero photos, or decorative SVGs.
- No long-form CV (`/cv.html` redirects to the short About page).
