import ProductCard from "./components/ProductCard";
import { products } from "./data/products";

export default function Home() {
  return (
    <main className="container">
      <section className="hero">
        <h1>ShipYard</h1>
        <p>Gear for life by the water. Pick something and set sail.</p>
      </section>

      <section className="grid" aria-label="Products">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
}
