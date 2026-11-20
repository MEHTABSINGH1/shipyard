import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getProduct, products } from "../../data/products";

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

// Pre-build one static page per product at build time.
export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  return { title: product ? `${product.name} | ShipYard` : "Not found | ShipYard" };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    notFound();
  }

  return (
    <main className="container">
      <Link href="/" className="back-link">
        ← Back to all products
      </Link>

      <article className="detail">
        <div className="detail-image" aria-hidden="true">
          {product.emoji}
        </div>

        <div className="detail-info">
          <span className="badge">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="detail-tagline">{product.tagline}</p>
          <p className="detail-price">{formatPrice(product.price)}</p>
          <div className="detail-meta">
            <span>★ {product.rating.toFixed(1)} / 5</span>
            <span className={product.inStock ? "stock in" : "stock out"}>
              {product.inStock ? "In stock" : "Sold out"}
            </span>
          </div>
          <p>{product.description}</p>
          <button className="button" disabled={!product.inStock}>
            {product.inStock ? "Add to cart" : "Sold out"}
          </button>
        </div>
      </article>
    </main>
  );
}
