import type { Metadata } from "next";
import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

export const metadata: Metadata = {
  title: { absolute: "ShipYard | Gear for life by the water" },
  description:
    "Browse ShipYard's catalog of surfboards, apparel and sailing gear: boards, hoodies, lanterns, dry bags and more.",
};

// The first row of cards is visible on first paint, so preload those images.
const ABOVE_THE_FOLD = 3;

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <h1>ShipYard</h1>
        <p>Gear for life by the water. Pick something and set sail.</p>
      </section>

      <section className="grid" aria-label="Products">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            preload={index < ABOVE_THE_FOLD}
          />
        ))}
      </section>
    </main>
  );
}
