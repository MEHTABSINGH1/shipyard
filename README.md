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

## Run locally

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```
