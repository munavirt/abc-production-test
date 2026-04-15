import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CTASection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 80%" },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-40 lg:py-56 px-6">
      <div ref={ref} className="mx-auto max-w-3xl text-center">
        <h2 className="text-5xl sm:text-7xl lg:text-8xl font-['Playfair_Display'] font-medium italic tracking-[-0.04em] leading-[0.9] opacity-0">
          Shop Now
        </h2>
        <Link
          to="/products"
          className="mt-14 inline-flex items-center gap-3 border border-foreground/20 text-foreground px-12 py-4 text-sm font-light tracking-widest uppercase rounded-full hover:bg-foreground hover:text-background transition-all duration-500 opacity-0"
        >
          View Collection <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
