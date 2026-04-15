import { Link } from "react-router-dom";
import type { Product } from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      to="/products/$productId"
      params={{ productId: product.id }}
      className="product-card group block"
    >
      <div className="img-zoom aspect-square bg-secondary rounded-lg overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="product-card-image h-full w-full object-cover"
        />
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="text-sm font-medium text-foreground group-hover:text-muted-foreground transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground">${product.price}</p>
      </div>
    </Link>
  );
}
