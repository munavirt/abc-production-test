
import { useState, useEffect, useRef } from "react";
import { products } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";



const COLORS = ["All", "Black", "White", "Navy", "Olive", "Grey", "Burgundy", "Sand"];
const SIZES = ["All", "XS", "S", "M", "L", "XL", "XXL"];

function ParallaxCard({ children, index }: { children: React.ReactNode; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowH = window.innerHeight;
      const centerDist = rect.top + rect.height / 2 - windowH / 2;
      const speed = 0.03 * (index % 2 === 0 ? 1 : -1);
      setOffset(centerDist * speed);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [index]);

  return (
    <div ref={ref}>
      <div style={{ transform: `translateY(${offset}px)`, willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [colorFilter, setColorFilter] = useState("All");
  const [sizeFilter, setSizeFilter] = useState("All");
  const ref = useScrollReveal<HTMLDivElement>();

  const filtered = products.filter((p) => {
    if (colorFilter !== "All" && p.color !== colorFilter) return false;
    if (sizeFilter !== "All" && !p.sizes.includes(sizeFilter)) return false;
    return true;
  });

  return (
    <div className="page-transition pt-24 pb-20 px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground font-medium mb-3">Collection</p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-[-0.05em]">All Products</h1>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-6 mb-12 pb-8 border-b border-border">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Color</p>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setColorFilter(c)}
                  className={`px-4 py-2 text-xs font-medium rounded-full transition-all ${colorFilter === c ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"}`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">Size</p>
            <div className="flex flex-wrap gap-2">
              {SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSizeFilter(s)}
                  className={`px-4 py-2 text-xs font-medium rounded-full transition-all ${sizeFilter === s ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-accent"}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-8">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>

        <div ref={ref} className="scroll-reveal grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filtered.map((product, i) => (
            <ParallaxCard key={product.id} index={i}>
              <ProductCard product={product} />
            </ParallaxCard>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-muted-foreground">No products match your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
