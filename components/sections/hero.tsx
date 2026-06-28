"use client";

import { motion, type Transition } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/src/motion/useReducedMotion";

import Container from "@/components/ui/container";
import Section from "@/components/ui/section";
import Reveal from "@/components/ui/reveal";
import {
  buttonMotion,
  heroAmbientMotion,
  heroAmbientSecondaryMotion,
} from "@/src/motion/presets";
import {
  buildWhatsAppHref,
  DEFAULT_BIA_WHATSAPP_MESSAGE,
} from "@/lib/whatsapp";

const heroAmbientTransition = heroAmbientMotion.transition as Transition;

const heroAmbientSecondaryTransition =
  heroAmbientSecondaryMotion.transition as Transition;

const heroMobileFallbackTransition: Transition = {
  duration: 18,
  repeat: Infinity,
  ease: "easeInOut",
};
export default function Hero() {

  const reducedMotion = useReducedMotion();
  const auraRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [ctaActive, setCtaActive] = useState(false);
  const [secondaryCtaActive, setSecondaryCtaActive] = useState(false);

  // ─── MOBILE DETECTION ──────────────────────────────────────────────────────
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ─── RAF + LERP CURSOR AURA ────────────────────────────────────────────────
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

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

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

    const onMouseMove = (e: MouseEvent) => { if (!mouseOverHero) return; target.x = e.clientX; target.y = e.clientY; };
    const onMouseEnter = () => { mouseOverHero = true; };
    const onMouseLeave = () => { mouseOverHero = false; target.x = homeX; target.y = homeY; };
    const onScroll = () => {
      if (!heroRef.current) return;
      if (heroRef.current.getBoundingClientRect().bottom <= 0) {
        mouseOverHero = false; target.x = homeX; target.y = homeY;
      }
    };

    const heroEl = heroRef.current;
    if (heroEl) { heroEl.addEventListener("mouseenter", onMouseEnter); heroEl.addEventListener("mouseleave", onMouseLeave); }
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      if (heroEl) { heroEl.removeEventListener("mouseenter", onMouseEnter); heroEl.removeEventListener("mouseleave", onMouseLeave); }
    };
  }, [isMobile, reducedMotion]);

  return (
    <div ref={heroRef} data-hero-aura-zone="true">
      <Section className="relative min-h-screen overflow-hidden flex items-center justify-center">

        {/* ── AMBIENT BASE BLOBS ──────────────────────────────────────────── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={reducedMotion ? {} : heroAmbientMotion.animate}
            transition={reducedMotion ? undefined : heroAmbientTransition}
            className="absolute top-[4%] right-[6%] w-[400px] h-[400px] rounded-full blur-[130px] bg-fuchsia-500/25"
          />
          <motion.div
            animate={reducedMotion ? {} : heroAmbientSecondaryMotion.animate}
            transition={reducedMotion ? undefined : heroAmbientSecondaryTransition}
            className="absolute bottom-[6%] left-[4%] w-[340px] h-[340px] rounded-full blur-[100px] bg-violet-500/20"
          />
        </div>

        {/* ── CURSOR AURA ─────────────────────────────────────────────────── */}
        {!isMobile && <div ref={auraRef} className="absolute inset-0 pointer-events-none z-10" />}

        {/* ── MOBILE FALLBACK ─────────────────────────────────────────────── */}
        {isMobile && (
          <motion.div
            animate={
              reducedMotion
                ? {}
                : {
                  opacity: [0.22, 0.38, 0.22],
                  scale: [1, 1.10, 1],
                  x: [0, 16, -10, 0],
                  y: [0, -12, 8, 0],
                }
            }
            transition={reducedMotion ? undefined : heroMobileFallbackTransition}
            className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full blur-[90px] bg-fuchsia-500/20 pointer-events-none"
          />
        )}

        {/* GRID TEXTURE */}
        <div className="absolute inset-0 opacity-[0.024] pointer-events-none">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:82px_82px]" />
        </div>

        {/* ── CONTENT ─────────────────────────────────────────────────────── */}
        <Container className="relative z-20">
          <div className="flex flex-col items-center text-center max-w-[1100px] mx-auto">

            <Reveal>
              <h1 className="
                text-[clamp(3.8rem,13vw,4.4rem)]
                sm:text-[3.8rem] md:text-[5.6rem] xl:text-[8rem] 2xl:text-[9rem]
                leading-[0.88] tracking-[-0.06em] font-display font-black md:whitespace-nowrap
              ">
                <span className="block">
                  Webs con presencia.
                </span>

                <span className="mt-2 block md:mt-0">
                  Marcas con dirección.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-10 max-w-[760px] text-base md:text-[1.12rem]">
                Diseño y desarrollo web premium, branding visual y experiencias digitales
                pensadas para comunicar valor, diferenciar tu propuesta
                y elevar la percepción de tu marca o proyecto.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="
                mt-14 flex flex-col sm:flex-row
                items-center justify-center gap-8
                translate-y-8 md:translate-y-0
              ">

                {/* ── PRIMARY CTA ─────────────────────────────────────────── */}
                {/*
                  Hover:
                  · Bloom iridiscente radial desde el centro (fuchsia→violet, opacity 7%)
                  · Ring fuchsia de 1px + glow exterior muy suave vía box-shadow
                  · Lift de 2px — más contenido que el -3 anterior
                  · Easing premium: cúbico suave
                  · Sin shimmer deslizante (patrón SaaS eliminado)
                */}
                <motion.a
                  href={buildWhatsAppHref(DEFAULT_BIA_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noreferrer"
                  {...buttonMotion}
                  onHoverStart={() => setCtaActive(true)}
                  onHoverEnd={() => setCtaActive(false)}

                  onTapStart={() => setCtaActive(true)}
                  onTapCancel={() => setCtaActive(false)}
                  onTap={() => setCtaActive(false)}
                  whileTap={{
                    scale: 0.985,
                    y: -2,
                  }}
                  className="
                    group
                    relative overflow-hidden rounded-full
                    border border-white/10
                    bg-white/[0.04]
                    px-8 py-4
                    backdrop-blur-xl
                    transition-[border-color,box-shadow] duration-[380ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]
                    hover:border-fuchsia-500/30
                    hover:shadow-[0_8px_28px_rgba(217,70,239,0.07)]
                   
                    active:border-fuchsia-500/30
                    active:shadow-[0_8px_28px_rgba(217,70,239,0.07)]

                    focus-visible:border-fuchsia-500/30
                    focus-visible:shadow-[0_8px_28px_rgba(217,70,239,0.07)]"
                >
                  {/*
                    Bloom: gradiente radial centrado que aparece en hover.
                    Reemplaza el shimmer — este efecto es atmosférico, no SaaS.
                    opacity-0 → opacity-100 vía CSS group-hover (sin JS extra).
                  */}
                  <motion.div
                    className="
                      absolute inset-0 rounded-full pointer-events-none
                      border border-fuchsia-500/0
                      shadow-[0_0_0_0px_rgba(217,70,239,0)]"
                    animate={{
                      opacity: ctaActive ? 1 : 0
                    }}
                    transition={{
                      duration: 0.38,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                  />

                  <span className="
                    relative z-10
                    transition-colors duration-300
                    text-white/85 
                    group-hover:text-white
                    group-active:text-white
                    group-focus-visible:text-white
                  ">
                    Diseñemos tu presencia digital
                  </span>
                </motion.a>

                {/* ── SECONDARY CTA ───────────────────────────────────────── */}
                {/*
                  Hover:
                  · Texto de white/60 → white/90 (sutil, no duro)
                  · Underline fino con gradiente fuchsia→violet que crece
                    de izquierda a derecha (scale-x: 0→1, origin-left)
                  · Flecha → se desplaza 4px + tinte fuchsia suave
                  · Sin scale, sin bounce — restraint editorial total
                */}
                <Link
                  href="/servicios"

                  onMouseEnter={() => setSecondaryCtaActive(true)}
                  onMouseLeave={() => setSecondaryCtaActive(false)}

                  onPointerDown={(event) => {
                    if (event.pointerType !== "mouse") {
                      setSecondaryCtaActive(true);
                    }
                  }}
                  onPointerUp={(event) => {
                    if (event.pointerType !== "mouse") {
                      setSecondaryCtaActive(false);
                    }
                  }}
                  onPointerCancel={() => setSecondaryCtaActive(false)}

                  onFocus={() => setSecondaryCtaActive(true)}
                  onBlur={() => setSecondaryCtaActive(false)}

                  className="group relative flex items-center gap-2"
                >

                  <span
                    className={`
                      relative
                      transition-colors
                      duration-[350ms]

                      ${secondaryCtaActive ? "text-white/90" : "text-white/60"}

                      group-hover:text-white/90
                      group-focus-visible:text-white/90
                    `}
                  >

                    Ver servicios

                    {/* Underline que crece en hover/touch/focus */}
                    <span
                      className={`
                        absolute -bottom-[2px] left-0
                        h-[1px] w-full
                        bg-gradient-to-r from-fuchsia-500/55 via-violet-500/40 to-transparent
                        transition-transform duration-[420ms] ease-out
                        origin-left

                        ${secondaryCtaActive ? "scale-x-100" : "scale-x-0"}

                        group-hover:scale-x-100
                        group-focus-visible:scale-x-100
                      `}
                    />

                  </span>

                  {/* Arrow: desplazamiento + tinte de paleta */}
                  <span
                    className={`
                      inline-block
                      transition-[color,transform]
                      duration-[350ms]
                      ease-out

                      ${secondaryCtaActive
                        ? "text-fuchsia-400/65 translate-x-[4px]"
                        : "text-white/50"
                      }

                      group-hover:text-fuchsia-400/65
                      group-hover:translate-x-[4px]
                      group-focus-visible:text-fuchsia-400/65
                      group-focus-visible:translate-x-[4px]
                    `}
                  >
                    →
                  </span>

                </Link>

              </div>
            </Reveal>

          </div>
        </Container>

      </Section>
    </div>
  );
}