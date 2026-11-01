# RSAH

RSAH adalah jurnal satu halaman dengan tagline **#tangguh**. Isinya berangkat dari pemikiran sendiri dan sport, ditulis dengan suara yang santai tetapi menusuk—langsung ke inti untuk pembaca usia 17–24 tahun.

The page uses a scroll-driven presentation: article sections reveal as readers move through the story, while the background color transitions to reflect each chapter. Editorial photography, motion, and a minimal navigation frame the content.

## Brand direction

- **Name:** RSAH
- **Tagline:** #tangguh
- **Audience:** usia 17–24 tahun
- **Topics:** pemikiran sendiri dan sport
- **Voice:** santai, tajam, langsung ke inti
- **Typography:** editorial serif dan technical mono
- **Palette:** warm orange, amber, electric blue, deep blue, green, dan black

## Built with

- [Next.js](https://nextjs.org/) App Router
- React
- TypeScript
- Tailwind CSS 4 via the PostCSS plugin

Article photography is loaded from [Unsplash](https://unsplash.com/), so images require an internet connection.

## Run locally

Use Node.js and npm, then install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

For production canonical URLs, social previews, sitemap, and robots metadata,
copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL` to the
public site URL.

## Article images

The `image` field in `content/article-data.ts` accepts both local and remote image
sources:

```ts
// Local file: place it in public/images/
image: "/images/my-article-image.jpg"

// Unsplash CDN
image: "https://images.unsplash.com/photo-..."

// Pexels CDN
image: "https://images.pexels.com/photos/..."
```

Local files must be inside `public/` and are referenced from the public root;
do not use an operating-system path such as `C:\Users\...`. For another
remote provider, add its image CDN hostname to `images.remotePatterns` in
`next.config.ts`. Use the provider's direct image/CDN URL, not the page URL.

Each article record also includes the editorial fields used by the next phases:
`slug`, `eyebrow`, `excerpt`, `body`, `author`, `publishedAt`, `readingTime`,
`category`, `video`, `externalLinks`, `pullQuote`, `alignment`, `mediaType`,
`featured`, `relatedArticles`, `seoTitle`, `seoDescription`, and `socialImage`.

## Quality checks

Run the static checks before opening a pull request:

```bash
npm run typecheck
npm run build
npm run test:e2e
```

The end-to-end suite covers desktop and mobile Chromium, chapter navigation,
reading progress, reduced-motion behavior, remote-image failure fallback, and
mobile navigation visibility. Install the Playwright browser separately with:

```bash
npx playwright install chromium
```

Pull requests and pushes to `main` run the same checks through the workflow in
`.github/workflows/quality.yml`. Failed Playwright runs upload their HTML
report and diagnostic artifacts.

## Production

Build and run the production version:

```bash
npm run build
npm start
```
