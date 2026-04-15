import { useState, useEffect, useCallback } from "react";

export function useParallax(speed = 0.5) {
  const [offset, setOffset] = useState(0);

  const handleScroll = useCallback(() => {
    setOffset(window.scrollY);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return offset * speed;
}

export function useParallaxElement(speed = 0.3) {
  const [style, setStyle] = useState({ transform: "translateY(0px)" });

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY * speed;
      setStyle({ transform: `translateY(${y}px)` });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return style;
}
