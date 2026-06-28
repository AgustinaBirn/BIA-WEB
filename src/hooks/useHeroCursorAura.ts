"use client";

import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "@/src/motion/useReducedMotion";

export function useHeroCursorAura() {
  const reducedMotion = useReducedMotion();

  const auraRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile || reducedMotion) {
      if (auraRef.current) {
        auraRef.current.style.background = "";
      }

      return;
    }

    const homeX = 70;
    const homeY = window.innerHeight - 70;

    const target = { x: homeX, y: homeY };
    const current = { x: homeX, y: homeY };

    let raf: number;
    let mouseOverHero = false;

    const lerp = (a: number, b: number, t: number) => {
      return a + (b - a) * t;
    };

    const tick = () => {
      current.x = lerp(current.x, target.x, 0.05);
      current.y = lerp(current.y, target.y, 0.05);

      if (auraRef.current) {
        auraRef.current.style.background = `
          radial-gradient(
            600px circle at ${current.x}px ${current.y}px,
            rgba(217, 70, 239, 0.13),
            rgba(139, 92, 246, 0.09),
            rgba(244, 114, 182, 0.05),
            transparent 68%
          )
        `;
      }

      raf = requestAnimationFrame(tick);
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!mouseOverHero) return;

      target.x = event.clientX;
      target.y = event.clientY;
    };

    const onMouseEnter = () => {
      mouseOverHero = true;
    };

    const onMouseLeave = () => {
      mouseOverHero = false;
      target.x = homeX;
      target.y = homeY;
    };

    const onScroll = () => {
      if (!heroRef.current) return;

      if (heroRef.current.getBoundingClientRect().bottom <= 0) {
        mouseOverHero = false;
        target.x = homeX;
        target.y = homeY;
      }
    };

    const heroEl = heroRef.current;

    if (heroEl) {
      heroEl.addEventListener("mouseenter", onMouseEnter);
      heroEl.addEventListener("mouseleave", onMouseLeave);
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);

      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);

      if (heroEl) {
        heroEl.removeEventListener("mouseenter", onMouseEnter);
        heroEl.removeEventListener("mouseleave", onMouseLeave);
      }
    };
  }, [isMobile, reducedMotion]);

  return {
    auraRef,
    heroRef,
    isMobile,
    reducedMotion,
  };
}
