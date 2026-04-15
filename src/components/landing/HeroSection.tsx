import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroVideo from "@/assets/cinematic-hero.mp4";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const overlay = overlayRef.current;
    if (!section || !text || !overlay) return;

    const ctx = gsap.context(() => {
      // Fade in headline
      gsap.fromTo(
        text.children,
        { y: 60, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.4,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.5,
        }
      );

      // On scroll: fade out hero content, zoom video
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
          pin: false,
        },
      });

      tl.to(text, { y: -120, opacity: 0, duration: 1, ease: "none" })
        .to(overlay, { opacity: 0.7, duration: 1, ease: "none" }, 0)
        .to(
          videoRef.current,
          { scale: 1.15, duration: 1, ease: "none" },
          0
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[110vh] overflow-hidden">
      <div className="absolute inset-0 bg-background">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover object-center"
          src={heroVideo}
          style={{ willChange: "transform" }}
        />
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 15%, rgba(255,255,255,0) 60%, rgba(255,255,255,1) 100%)" }}
        />
      </div>

      <div className="relative z-10 flex items-center justify-center h-screen px-6">
        <div ref={textRef} className="text-center max-w-4xl">
          <p className="text-xs uppercase tracking-[0.5em] text-foreground/40 font-medium opacity-0">
            ABC — Premium Essentials
          </p>
          <h1 className="mt-6 text-5xl sm:text-7xl lg:text-[8rem] font-medium italic tracking-tight text-foreground leading-[0.9] opacity-0">
            Wear What Matter
          </h1>
          <p className="mt-8 text-sm text-foreground/50 max-w-md mx-auto font-light leading-relaxed opacity-0">
            Crafted for those who appreciate the beauty of simplicity
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <div className="w-px h-12 bg-foreground/20 relative overflow-hidden">
          <div className="w-full h-6 bg-foreground/60 absolute scroll-line-anim" />
        </div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-foreground/30 font-light">Scroll</p>
      </div>
    </section>
  );
}
