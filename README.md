# ShipYard

A small product-catalog storefront built with **Next.js (App Router) + TypeScript**.

- `/` – responsive grid of products (`app/page.tsx`)
- `/products/[id]` – statically pre-built detail page per product (`app/products/[id]/page.tsx`)
- Unknown ids (e.g. `/products/nope`) show a friendly 404 (`app/not-found.tsx`)

## Structure

| File | Purpose |
| --- | --- |
| `app/data/products.ts` | `Product` type, typed `products` array, `getProduct(id)` helper |
| `app/components/ProductCard.tsx` | Reusable card, takes a typed `product` prop, links to its detail page |
| `app/page.tsx` | Maps products into a CSS grid (`repeat(auto-fill, minmax(240px, 1fr))`) |
| `app/products/[id]/page.tsx` | Dynamic route with `generateStaticParams` and `notFound()` |
| `app/not-found.tsx` | Friendly 404 page |

## Performance (Part 2)

- **Images:** each product has a real image in `public/products/`, rendered with `next/image` (width/height on cards, `fill` in a sized parent on the detail page) and an `alt`. First-row cards and the detail hero use `preload`; the rest lazy-load. No layout shift.
- **Fonts:** Geist is loaded once with `next/font/google` in `app/layout.tsx` and applied with `className`. It is self-hosted, so there is no Google Fonts `<link>`.
- **Lazy loading:** the below-the-fold Reviews panel (`app/products/[id]/Reviews.tsx`, which uses `localStorage`) is loaded with `next/dynamic` and `{ ssr: false }` from the client wrapper `LazyReviews.tsx`, with a skeleton fallback.
- **Metadata:** the layout sets a `%s | ShipYard` title template, the home page exports `metadata`, and the product route uses `generateMetadata` for each product's title, description and Open Graph image.

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```
