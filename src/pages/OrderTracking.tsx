
import { useState } from "react";
import { Package, Truck, MapPin, Check, Search } from "lucide-react";



const STEPS = [
  { label: "Order Placed", icon: Package, desc: "Your order has been confirmed", time: "Apr 12, 2:30 PM" },
  { label: "Shipped", icon: Truck, desc: "Package picked up by carrier", time: "Apr 13, 9:15 AM" },
  { label: "Out for Delivery", icon: MapPin, desc: "On its way to you", time: "Apr 14, 8:00 AM" },
  { label: "Delivered", icon: Check, desc: "Successfully delivered", time: "" },
];

export default function OrderTrackingPage() {
  const [orderId, setOrderId] = useState("");
  const [tracking, setTracking] = useState(false);
  const currentStep = 2; // mock: out for delivery

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) setTracking(true);
  };

  return (
    <div className="page-transition pt-24 pb-20 px-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="text-4xl font-black tracking-tighter mb-2">Track Order</h1>
        <p className="text-sm text-muted-foreground mb-12">Enter your order ID to check the status.</p>

        <form onSubmit={handleTrack} className="flex gap-3 mb-16">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g. ABC-X7K9M2"
              className="w-full h-12 pl-11 pr-4 text-sm bg-secondary rounded-full border-0 outline-none focus:ring-2 focus:ring-foreground transition-shadow"
            />
          </div>
          <button type="submit" className="btn-primary bg-primary text-primary-foreground h-12 px-8 text-sm font-medium rounded-full hover:scale-105 transition-transform">
            Track
          </button>
        </form>

        {tracking && (
          <div className="animate-reveal-up">
            <div className="bg-secondary rounded-xl p-6 mb-8">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Order ID</p>
              <p className="text-sm font-semibold">{orderId || "ABC-X7K9M2"}</p>
            </div>

            <div className="relative pl-8">
              <div className="absolute left-[15px] top-4 bottom-4 w-px bg-border" />
              {STEPS.map((step, i) => {
                const done = i <= currentStep;
                const active = i === currentStep;
                const StepIcon = step.icon;
                return (
                  <div key={step.label} className="relative pb-12 last:pb-0">
                    <div className={`absolute -left-8 top-0 h-8 w-8 rounded-full flex items-center justify-center z-10 transition-all ${done ? "bg-primary" : "bg-secondary border border-border"}`}>
                      <StepIcon className={`h-3.5 w-3.5 ${done ? "text-primary-foreground" : "text-muted-foreground"}`} />
                    </div>
                    <div className="ml-4">
                      <p className={`text-sm font-medium ${active ? "text-foreground" : done ? "text-foreground" : "text-muted-foreground"}`}>
                        {step.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                      {step.time && <p className="text-xs text-muted-foreground mt-1">{step.time}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
