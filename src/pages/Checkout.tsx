import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";
import { ArrowLeft, Lock } from "lucide-react";

import { useCart } from "@/lib/cart-context";



export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", address: "", city: "", zip: "", phone: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    navigate("/order-success");
  };

  const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div className="page-transition pt-24 pb-20 px-6">
      <div className="mx-auto max-w-3xl">
        <Link to="/cart" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Cart
        </Link>

        <h1 className="text-4xl font-black tracking-tighter mb-12">Checkout</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">Shipping Details</h2>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">Full Name</label>
              <input required value={form.name} onChange={update("name")} className="w-full h-11 px-4 text-sm bg-secondary rounded-lg border-0 outline-none focus:ring-2 focus:ring-foreground transition-shadow" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">Email</label>
              <input required type="email" value={form.email} onChange={update("email")} className="w-full h-11 px-4 text-sm bg-secondary rounded-lg border-0 outline-none focus:ring-2 focus:ring-foreground transition-shadow" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">Address</label>
              <input required value={form.address} onChange={update("address")} className="w-full h-11 px-4 text-sm bg-secondary rounded-lg border-0 outline-none focus:ring-2 focus:ring-foreground transition-shadow" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">City</label>
                <input required value={form.city} onChange={update("city")} className="w-full h-11 px-4 text-sm bg-secondary rounded-lg border-0 outline-none focus:ring-2 focus:ring-foreground transition-shadow" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">ZIP Code</label>
                <input required value={form.zip} onChange={update("zip")} className="w-full h-11 px-4 text-sm bg-secondary rounded-lg border-0 outline-none focus:ring-2 focus:ring-foreground transition-shadow" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">Phone</label>
              <input value={form.phone} onChange={update("phone")} className="w-full h-11 px-4 text-sm bg-secondary rounded-lg border-0 outline-none focus:ring-2 focus:ring-foreground transition-shadow" />
            </div>

            <h2 className="text-lg font-semibold pt-6">Payment</h2>
            <div className="bg-secondary rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Secure payment (UI demo)</span>
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">Card Number</label>
                <input placeholder="4242 4242 4242 4242" className="w-full h-11 px-4 text-sm bg-background rounded-lg border-0 outline-none focus:ring-2 focus:ring-foreground transition-shadow" />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">Expiry</label>
                  <input placeholder="MM/YY" className="w-full h-11 px-4 text-sm bg-background rounded-lg border-0 outline-none focus:ring-2 focus:ring-foreground transition-shadow" />
                </div>
                <div>
                  <label className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2 block">CVC</label>
                  <input placeholder="123" className="w-full h-11 px-4 text-sm bg-background rounded-lg border-0 outline-none focus:ring-2 focus:ring-foreground transition-shadow" />
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="sticky top-24 bg-secondary rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-6">Order Summary</h2>
              {items.length > 0 ? (
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Size {item.size} × {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">${item.product.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mb-6">Your cart is empty</p>
              )}
              <div className="pt-4 border-t border-border space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-muted-foreground">Free</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-4 border-t border-border">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>
              <button type="submit" className="mt-6 btn-primary w-full flex items-center justify-center bg-primary text-primary-foreground h-12 text-sm font-medium rounded-full hover:scale-[1.02] transition-transform">
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
