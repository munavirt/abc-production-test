import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function BrandStatement() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const words = el.querySelectorAll("[data-word]");
      words.forEach((word, i) => {
        gsap.fromTo(
          word,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 75%" },
            delay: i * 0.12,
          }
        );
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-40 lg:py-56 px-6">
      <div ref={ref} className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-['Playfair_Display'] font-medium italic tracking-[-0.03em] leading-snug">
          {"Designed for those who move different.".split(" ").map((word, i) => (
            <span key={i} data-word className="inline-block mr-[0.3em] opacity-0">
              {word}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
