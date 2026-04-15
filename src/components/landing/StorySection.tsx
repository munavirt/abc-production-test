import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import fabricCloseup from "@/assets/fabric-closeup.jpg";

gsap.registerPlugin(ScrollTrigger);

const stories = [
  { label: "01", title: "Engineered Comfort", desc: "Every fiber selected for softness that lasts wash after wash." },
  { label: "02", title: "Premium Cotton", desc: "Sourced from the finest organic Pima farms for an unmatched feel." },
  { label: "03", title: "Built for Everyday", desc: "Durability meets design — constructed to endure the pace of life." },
];

export function StorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const imageWrap = imageRef.current;
    if (!section || !imageWrap) return;

    const ctx = gsap.context(() => {
      // Fabric zoom effect on scroll
      const img = imageWrap.querySelector("img");
      if (img) {
        gsap.fromTo(
          img,
          { scale: 1.3 },
          {
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: imageWrap,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      }

      // Story items animate in
      const items = section.querySelectorAll("[data-story]");
      items.forEach((el) => {
        gsap.fromTo(
          el,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 overflow-hidden">
      {/* Fabric image band with zoom */}
      <div ref={imageRef} className="relative h-[50vh] lg:h-[60vh] overflow-hidden mb-32">
        <img
          src={fabricCloseup}
          alt="Premium cotton fabric texture"
          loading="lazy"
          width={1280}
          height={800}
          className="h-full w-full object-cover"
          style={{ willChange: "transform" }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: "rgba(255,255,255,0.6)" }}
        >
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-['Playfair_Display'] font-medium italic tracking-[-0.04em] text-foreground">
            The Details
          </h2>
        </div>
      </div>

      {/* Story items */}
      <div className="mx-auto max-w-5xl px-6 space-y-24">
        {stories.map((s) => (
          <div key={s.label} data-story className="flex flex-col sm:flex-row items-start gap-8">
            <span className="text-xs tracking-[0.3em] text-muted-foreground font-light mt-2 shrink-0 w-12">
              {s.label}
            </span>
            <div>
              <h3 className="text-3xl sm:text-4xl font-['Playfair_Display'] font-medium italic tracking-[-0.02em] mb-4">
                {s.title}
              </h3>
              <p className="text-muted-foreground font-light text-base leading-relaxed max-w-lg">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
