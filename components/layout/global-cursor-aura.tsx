"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/src/motion/useReducedMotion";

export default function GlobalCursorAura() {
    const auraRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useReducedMotion();

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const check = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        check();

        window.addEventListener("resize", check);

        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        if (!isDesktop || reducedMotion) {
            if (auraRef.current) {
                auraRef.current.style.background = "";
            }

            return;
        }

        const target = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        };

        const current = {
            x: target.x,
            y: target.y,
        };
        let raf: number;
        let visible = false;
        let insideHeroZone = false;

        const lerp = (a: number, b: number, t: number) => {
            return a + (b - a) * t;
        };

        const tick = () => {
            current.x = lerp(current.x, target.x, 0.78);
            current.y = lerp(current.y, target.y, 0.78);

            if (auraRef.current) {
                auraRef.current.style.opacity = visible ? "1" : "0";

                auraRef.current.style.background = insideHeroZone
                    ? `
            radial-gradient(
                5.8px circle at ${current.x}px ${current.y}px,
                rgba(245, 243, 239, 0.98) 0%,
                rgba(245, 243, 239, 0.94) 32%,
                rgba(217, 70, 239, 0.72) 58%,
                transparent 80%
            ),
            radial-gradient(
                18px circle at ${current.x}px ${current.y}px,
                transparent 48%,
                rgba(245, 243, 239, 0.42) 51%,
                rgba(217, 70, 239, 0.34) 58%,
                rgba(139, 92, 246, 0.22) 64%,
                transparent 72%
            )
        `
                    : `
            radial-gradient(
                5.8px circle at ${current.x}px ${current.y}px,
                rgba(245, 243, 239, 0.98) 0%,
                rgba(245, 243, 239, 0.94) 30%,
                rgba(217, 70, 239, 0.68) 56%,
                transparent 78%
            ),
            radial-gradient(
                18px circle at ${current.x}px ${current.y}px,
                transparent 48%,
                rgba(245, 243, 239, 0.34) 51%,
                rgba(217, 70, 239, 0.28) 58%,
                rgba(139, 92, 246, 0.18) 64%,
                transparent 72%
            ),
            radial-gradient(
                34px circle at ${current.x}px ${current.y}px,
                rgba(217, 70, 239, 0.095),
                rgba(139, 92, 246, 0.058),
                rgba(244, 114, 182, 0.028),
                transparent 76%
            )
        `;
            }

            raf = requestAnimationFrame(tick);
        };

        const onMouseMove = (event: MouseEvent) => {
            const element = document.elementFromPoint(
                event.clientX,
                event.clientY
            );

            insideHeroZone = Boolean(
                element?.closest("[data-hero-aura-zone='true']")
            );

            visible = true;

            target.x = event.clientX;
            target.y = event.clientY;
        };

        const onMouseLeave = () => {
            visible = false;
        };

        const onMouseEnter = () => {
            visible = true;
        };

        window.addEventListener("mousemove", onMouseMove, {
            passive: true,
        });

        document.documentElement.addEventListener("mouseleave", onMouseLeave);
        document.documentElement.addEventListener("mouseenter", onMouseEnter);

        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);

            window.removeEventListener("mousemove", onMouseMove);

            document.documentElement.removeEventListener(
                "mouseleave",
                onMouseLeave
            );
            document.documentElement.removeEventListener("mouseenter", onMouseEnter);
        };
    }, [isDesktop, reducedMotion]);

    if (!isDesktop || reducedMotion) {
        return null;
    }

    return (
        <div
            ref={auraRef}
            aria-hidden="true"
            className="
    pointer-events-none
    fixed
    inset-0
    z-[9999]

    hidden
    lg:block

    opacity-0
    transition-opacity
    duration-[220ms]
    ease-out
  "
        />
    );
}