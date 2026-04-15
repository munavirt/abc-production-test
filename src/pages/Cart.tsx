import { Link } from "react-router-dom";

import { Minus, Plus, X, ArrowRight, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";



export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart();

  return (
    <div className="page-transition pt-24 pb-20 px-6">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-black tracking-tighter mb-2">Your Cart</h1>
        <p className="text-sm text-muted-foreground mb-12">{items.length} item{items.length !== 1 ? "s" : ""}</p>

        {items.length === 0 ? (
          <div className="py-20 text-center">
            <ShoppingBag className="h-12 w-12 text-border mx-auto mb-4" />
            <p className="text-muted-foreground mb-6">Your cart is empty</p>
            <Link to="/products" className="btn-primary inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 text-sm font-medium rounded-full hover:scale-105 transition-transform">
              Shop Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-6">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-4 pb-6 border-b border-border animate-reveal-up">
                  <div className="h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden bg-secondary">
                    <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" loading="lazy" width={96} height={96} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-medium">{item.product.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">Size: {item.size}</p>
                      </div>
                      <button onClick={() => removeItem(item.product.id, item.size)} className="text-muted-foreground hover:text-foreground transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)} className="h-8 w-8 flex items-center justify-center rounded bg-secondary hover:bg-accent transition-colors">
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)} className="h-8 w-8 flex items-center justify-center rounded bg-secondary hover:bg-accent transition-colors">
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-sm font-medium">${item.product.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-sm font-medium">${totalPrice}</span>
              </div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-sm text-muted-foreground">Shipping</span>
                <span className="text-sm text-muted-foreground">Free</span>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-border">
                <span className="text-base font-semibold">Total</span>
                <span className="text-base font-semibold">${totalPrice}</span>
              </div>
              <Link to="/checkout" className="mt-8 btn-primary w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground h-12 text-sm font-medium rounded-full hover:scale-[1.02] transition-transform">
                Checkout <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
