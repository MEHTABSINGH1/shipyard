# ShipYard

A small product-catalog storefront built with **Next.js (App Router) + TypeScript**, statically exported and deployed to GitHub Pages.

**Live site:** https://mehtabsingh1.github.io/shipyard/

## Lighthouse (Mobile)

| Page | Performance | Accessibility | Best Practices | SEO |
| --- | --- | --- | --- | --- |
| Home `/` | **99** | 100 | 100 | 100 |
| Product `/products/wave-runner/` | **99** | 100 | 100 | 100 |

Measured on the live GitHub Pages site with Lighthouse 12 (mobile preset). Home: FCP 1.0 s, LCP 2.2 s, TBT 40 ms, CLS 0. The first local measurement of the build scored 83, mainly because the test server sent uncompressed JS; see the performance notes below.

![Lighthouse mobile report](docs/lighthouse-mobile.png)

## Routes

- `/` – responsive grid of products (`app/page.tsx`)
- `/products/[id]/` – one statically pre-built detail page per product (`app/products/[id]/page.tsx`)
- Unknown ids (e.g. `/products/nope/`) show a friendly 404 (`app/not-found.tsx`)

## Structure

| File | Purpose |
| --- | --- |
| `app/data/products.ts` | `Product` type, typed `products` array, `getProduct(id)` helper |
| `app/components/ProductCard.tsx` | Reusable card, takes a typed `product` prop, links to its detail page |
| `app/page.tsx` | Maps products into a CSS grid (`repeat(auto-fill, minmax(240px, 1fr))`) |
| `app/products/[id]/page.tsx` | Dynamic route with `generateStaticParams`, `generateMetadata` and `notFound()` |
| `app/products/[id]/LazyReviews.tsx` | `next/dynamic` wrapper that lazy-loads the Reviews panel |
| `app/loading.tsx` | Skeleton shown while a route loads |
| `app/error.tsx` | Client error boundary with a "Try again" button |
| `app/not-found.tsx` | Friendly 404 page |
| `next.config.ts` | `output: "export"`, `basePath: "/shipyard"`, unoptimized images |
| `.github/workflows/deploy.yml` | Builds the static site and publishes `out/` to GitHub Pages |

## Performance work

- **Images:** real WebP images in `public/products/`, rendered with `next/image` (width/height on cards, `fill` in a sized parent on the detail page) with `alt` text. The above-the-fold (LCP) images use `preload` (Next 16's replacement for `priority`); the rest lazy-load. CLS is 0.
- **Fonts:** Geist via `next/font/google`, self-hosted and applied with `className`, with no Google Fonts `<link>`.
- **Lazy loading:** the below-the-fold Reviews panel (uses `localStorage`) is loaded with `next/dynamic` and `{ ssr: false }` from a Client Component, with a skeleton fallback.
- **Metadata:** title template in the layout, a `metadata` export on the home page, and `generateMetadata` per product (title, description, Open Graph image).
- **Static-export fix:** `scripts/flatten-prefetch.mjs` (run as `postbuild`) copies Next 16's nested prefetch payloads to the flat filenames the router requests, so client navigation prefetches don't 404 on GitHub Pages.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000/shipyard
npm run build    # static export to out/
```

To preview the static build exactly as GitHub Pages serves it (under `/shipyard`), copy `out/` into a folder named `shipyard/` and serve its parent, e.g. `npx serve preview` with `preview/shipyard/` = `out/`, then open http://localhost:3000/shipyard/.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which runs `npm ci && npm run build` and publishes `out/` to GitHub Pages (Settings → Pages → Source: **GitHub Actions**).
