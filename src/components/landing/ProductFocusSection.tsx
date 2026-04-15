import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import tshirtFloat from "@/assets/tshirt-floating.png";

gsap.registerPlugin(ScrollTrigger);

export function ProductFocusSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    if (!section || !image || !text) return;

    const ctx = gsap.context(() => {
      // Float animation for tshirt
      gsap.to(image, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Slow rotation
      gsap.to(image, {
        rotateY: 8,
        rotateX: -3,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Image entrance from scroll
      gsap.fromTo(
        image,
        { scale: 0.6, opacity: 0, x: 100 },
        {
          scale: 1,
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            end: "top 30%",
            scrub: 1,
          },
        }
      );

      // Text reveals staggered
      const textElements = text.querySelectorAll("[data-animate]");
      textElements.forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.15,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="min-h-screen py-32 px-6 lg:px-16 overflow-hidden">
      <div className="mx-auto max-w-7xl flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Product Image - Left */}
        <div className="w-full lg:w-1/2 flex justify-center" style={{ perspective: "1000px" }}>
          <img
            ref={imageRef}
            src={tshirtFloat}
            alt="ABC Essential Tee"
            width={600}
            height={600}
            className="w-[320px] sm:w-[420px] lg:w-[500px] drop-shadow-2xl"
            style={{ willChange: "transform" }}
          />
        </div>

        {/* Text Content - Right */}
        <div ref={textRef} className="w-full lg:w-1/2 space-y-10">
          <p data-animate className="text-xs uppercase tracking-[0.5em] text-muted-foreground font-medium">
            The Essential Tee
          </p>
          <h2 data-animate className="text-4xl sm:text-5xl lg:text-6xl font-['Playfair_Display'] font-medium italic tracking-[-0.03em] leading-[1.05]">
            Crafted for<br />Movement
          </h2>
          <p data-animate className="text-lg text-muted-foreground font-light leading-relaxed max-w-lg">
            Minimal. Bold. Timeless.
          </p>
          <div data-animate className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-px bg-foreground/20" />
              <p className="text-sm text-muted-foreground font-light">100% Organic Pima Cotton</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-px bg-foreground/20" />
              <p className="text-sm text-muted-foreground font-light">Relaxed Oversized Fit</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-px bg-foreground/20" />
              <p className="text-sm text-muted-foreground font-light">Designed in Los Angeles</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
