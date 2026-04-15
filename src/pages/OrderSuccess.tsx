import { Link } from "react-router-dom";

import { ArrowRight, Check } from "lucide-react";



export default function OrderSuccessPage() {
  return (
    <div className="page-transition pt-24 pb-20 px-6 min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="mx-auto mb-8 animate-circle">
          <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center mx-auto">
            <Check className="h-8 w-8 text-primary-foreground" strokeWidth={3} />
          </div>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tighter animate-hero-text" style={{ animationDelay: "300ms" }}>
          Order Confirmed
        </h1>
        <p className="mt-4 text-muted-foreground text-sm leading-relaxed animate-hero-text" style={{ animationDelay: "500ms" }}>
          Thank you for your purchase. Your order #ABC-{Math.random().toString(36).substring(2, 8).toUpperCase()} has been received and is being processed.
        </p>
        <p className="mt-2 text-xs text-muted-foreground animate-hero-text" style={{ animationDelay: "600ms" }}>
          A confirmation email has been sent to your inbox.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-hero-text" style={{ animationDelay: "700ms" }}>
          <Link to="/order-tracking" className="btn-primary inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 text-sm font-medium rounded-full hover:scale-105 transition-transform">
            Track Order
          </Link>
          <Link to="/products" className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-muted-foreground transition-colors">
            Continue Shopping <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
