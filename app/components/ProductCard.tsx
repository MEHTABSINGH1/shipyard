import Image from "next/image";
import Link from "next/link";
import type { Product } from "../data/products";
import { formatPrice } from "../data/products";

type ProductCardProps = {
  product: Product;
  /** Preload the image for cards visible on first paint (above the fold). */
  preload?: boolean;
};

export default function ProductCard({ product, preload = false }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="card">
      <Image
        className="card-image"
        src={product.image}
        alt={product.imageAlt}
        width={800}
        height={600}
        sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 360px"
        preload={preload}
      />
      <div className="card-body">
        <span className="badge">{product.category}</span>
        <h2 className="card-title">{product.name}</h2>
        <p className="card-tagline">{product.tagline}</p>
        <div className="card-footer">
          <span className="price">{formatPrice(product.price)}</span>
          <span className={product.inStock ? "stock in" : "stock out"}>
            {product.inStock ? "In stock" : "Sold out"}
          </span>
        </div>
      </div>
    </Link>
  );
}
