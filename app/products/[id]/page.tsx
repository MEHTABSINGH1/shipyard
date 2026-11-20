import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getProduct, products } from "../../data/products";
import { getReviews } from "../../data/reviews";
import LazyReviews from "./LazyReviews";

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

  if (!product) {
    return { title: "Product not found" };
  }

  // The layout's title template turns this into "<name> | ShipYard".
  const description = `${product.tagline} ${formatPrice(product.price)} at ShipYard.`;
  return {
    title: product.name,
    description,
    openGraph: {
      title: product.name,
      description,
      images: [{ url: product.image, width: 800, height: 600, alt: product.imageAlt }],
    },
  };
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
        {/* fill inside a sized, position:relative parent reserves the space */}
        <div className="detail-image">
          <Image
            src={product.image}
            alt={product.imageAlt}
            fill
            sizes="(max-width: 700px) 100vw, 540px"
            preload
          />
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

      <LazyReviews productId={product.id} initialReviews={getReviews(product.id)} />
    </main>
  );
}
