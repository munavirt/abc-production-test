import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getFeaturedProducts } from "@/lib/data";
import { ProductCard } from "@/components/ProductCard";

gsap.registerPlugin(ScrollTrigger);

export function ProductShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featured = getFeaturedProducts();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const heading = section.querySelector("[data-heading]");
      if (heading) {
        gsap.fromTo(
          heading,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: heading, start: "top 85%" },
          }
        );
      }

      const cards = section.querySelectorAll("[data-card]");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
            delay: i * 0.1,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6">
      <div className="mx-auto max-w-7xl">
        <div data-heading className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.5em] text-muted-foreground font-medium mb-4">Curated</p>
          <h2 className="text-4xl sm:text-5xl font-['Playfair_Display'] font-medium italic tracking-[-0.03em]">The Collection</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {featured.map((product) => (
            <div key={product.id} data-card>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
