import Link from "next/link";
import type { Product } from "../data/products";
import { formatPrice } from "../data/products";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="card">
      <div className="card-image" aria-hidden="true">
        {product.emoji}
      </div>
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
