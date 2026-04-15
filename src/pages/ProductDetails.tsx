import { Link, useParams } from "react-router-dom";

import { useState } from "react";
import { Minus, Plus, Star, ArrowLeft, ShoppingBag, Zap } from "lucide-react";
import { getProduct, products, reviews } from "@/lib/data";
import { useCart } from "@/lib/cart-context";
import { ProductCard } from "@/components/ProductCard";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

function NotFound() {
  return (
    <div className="pt-24 pb-20 px-6 text-center">
      <h1 className="text-4xl font-black tracking-tighter">Product not found</h1>
      <Link to="/products" className="mt-6 inline-block text-sm text-muted-foreground hover:text-foreground">
        ← Back to shop
      </Link>
    </div>
  );
}



export default function ProductDetailPage() {
  const { productId } = useParams();
  const product = getProduct(productId);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const suggestedRef = useScrollReveal<HTMLDivElement>();

  if (!product) return <NotFound />;

  const suggested = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="page-transition pt-20 pb-20">
      <div className="mx-auto max-w-7xl px-6">
        <Link to="/products" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <div className="img-zoom aspect-square bg-secondary rounded-xl overflow-hidden">
            <img src={product.image} alt={product.name} width={800} height={800} className="h-full w-full object-cover" />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-center py-4">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-medium">{product.category}</p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">{product.name}</h1>
            <p className="mt-3 text-2xl font-medium">${product.price}</p>

            <div className="flex items-center gap-2 mt-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className={`h-3.5 w-3.5 ${s <= Math.round(product.rating) ? "fill-foreground text-foreground" : "text-border"}`} />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">{product.description}</p>

            {/* Color */}
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Color</p>
              <div className="flex items-center gap-2">
                <span className="h-6 w-6 rounded-full border-2 border-foreground" style={{ backgroundColor: product.colorHex }} />
                <span className="text-sm">{product.color}</span>
              </div>
            </div>

            {/* Size */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`h-10 min-w-[2.5rem] px-3 text-sm font-medium rounded-lg transition-all ${selectedSize === size ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Quantity</p>
              <div className="flex items-center gap-3">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="h-10 w-10 flex items-center justify-center rounded-lg bg-secondary hover:bg-accent transition-colors">
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="h-10 w-10 flex items-center justify-center rounded-lg bg-secondary hover:bg-accent transition-colors">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className="btn-primary flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground h-12 px-8 text-sm font-medium rounded-full disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform"
              >
                <ShoppingBag className="h-4 w-4" />
                {added ? "Added ✓" : "Add to Cart"}
              </button>
              <Link
                to="/checkout"
                className="flex-1 flex items-center justify-center gap-2 border border-foreground text-foreground h-12 px-8 text-sm font-medium rounded-full hover:bg-foreground hover:text-background transition-colors"
              >
                <Zap className="h-4 w-4" /> Buy Now
              </Link>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <section className="mt-24 pt-16 border-t border-border">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Reviews</h2>
          <div className="space-y-8">
            {reviews.map((review) => (
              <div key={review.id} className="pb-8 border-b border-border last:border-0">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className={`h-3 w-3 ${s <= review.rating ? "fill-foreground text-foreground" : "text-border"}`} />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{review.author}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Suggested */}
        <section className="mt-24 pt-16 border-t border-border">
          <h2 className="text-2xl font-bold tracking-tight mb-8">You may also like</h2>
          <div ref={suggestedRef} className="scroll-reveal grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {suggested.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
