import { Link } from "react-router-dom";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="font-heading text-xl font-black tracking-[-0.04em] text-foreground uppercase">
            ABC
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" activeProps={{ className: "text-sm font-medium text-foreground" }}>
              Home
            </Link>
            <Link to="/products" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" activeProps={{ className: "text-sm font-medium text-foreground" }}>
              Shop
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative group">
              <ShoppingBag className="h-5 w-5 text-foreground group-hover:scale-110 transition-transform" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/login" className="hidden md:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Login
            </Link>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-reveal-up">
          <div className="px-6 py-4 space-y-3">
            <Link to="/" className="block text-sm font-medium text-foreground" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/products" className="block text-sm font-medium text-foreground" onClick={() => setMenuOpen(false)}>Shop</Link>
            <Link to="/login" className="block text-sm font-medium text-foreground" onClick={() => setMenuOpen(false)}>Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
