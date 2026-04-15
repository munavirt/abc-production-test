import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h3 className="font-heading text-xl font-black tracking-[-0.04em] uppercase">ABC</h3>
            <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
              Premium essentials for the modern individual. Crafted with purpose, designed with intention.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Shop</h4>
            <div className="space-y-3">
              <Link to="/products" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">All Products</Link>
              <Link to="/products" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">Essentials</Link>
              <Link to="/products" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">New Arrivals</Link>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Support</h4>
            <div className="space-y-3">
              <Link to="/order-tracking" className="block text-sm text-foreground hover:text-muted-foreground transition-colors">Track Order</Link>
              <span className="block text-sm text-foreground">Shipping & Returns</span>
              <span className="block text-sm text-foreground">Contact Us</span>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-border">
          <p className="text-xs text-muted-foreground">&copy; 2026 ABC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
