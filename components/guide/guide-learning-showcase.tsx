"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, type PointerEvent } from "react";

import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import SplitSectionIntro from "@/components/sections/split-section-intro";
import { guidePageContent } from "@/lib/guide-page-content";
import { cn } from "@/lib/utils";

export default function GuideLearningShowcase() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [conceptDirection, setConceptDirection] = useState<1 | -1>(1);

    const conceptNameStartYRef = useRef<number | null>(null);
    const conceptNameMovedRef = useRef(false);

    const activeItem = guidePageContent.learning.items[activeIndex];
    const totalConcepts = guidePageContent.learning.items.length;
    const mobileConceptOffsets = [-1, 0, 1] as const;

    const getLoopIndex = (index: number) => {
        return ((index % totalConcepts) + totalConcepts) % totalConcepts;
    };

    const getConceptDirection = (nextIndex: number): 1 | -1 => {
        const normalizedNextIndex = getLoopIndex(nextIndex);

        if (normalizedNextIndex === activeIndex) {
            return conceptDirection;
        }

        let diff = normalizedNextIndex - activeIndex;

        if (diff > totalConcepts / 2) diff -= totalConcepts;
        if (diff < -totalConcepts / 2) diff += totalConcepts;

        return diff > 0 ? 1 : -1;
    };

    const selectConcept = (index: number, direction?: 1 | -1) => {
        const nextIndex = getLoopIndex(index);

        setConceptDirection(direction ?? getConceptDirection(nextIndex));
        setActiveIndex(nextIndex);
    };

    const goToPreviousConcept = () => {
        selectConcept(activeIndex - 1, -1);
    };

    const goToNextConcept = () => {
        selectConcept(activeIndex + 1, 1);
    };

    const handleConceptNamePointerDown = (
        event: PointerEvent<HTMLDivElement>
    ) => {
        conceptNameStartYRef.current = event.clientY;
        conceptNameMovedRef.current = false;

        event.currentTarget.setPointerCapture?.(event.pointerId);
    };

    const handleConceptNamePointerMove = (
        event: PointerEvent<HTMLDivElement>
    ) => {
        if (conceptNameStartYRef.current === null) return;

        const offsetY = event.clientY - conceptNameStartYRef.current;

        if (offsetY <= -34) {
            conceptNameMovedRef.current = true;
            goToNextConcept();
            conceptNameStartYRef.current = event.clientY;
        }

        if (offsetY >= 34) {
            conceptNameMovedRef.current = true;
            goToPreviousConcept();
            conceptNameStartYRef.current = event.clientY;
        }
    };

    const handleConceptNamePointerUp = (
        event: PointerEvent<HTMLDivElement>
    ) => {
        conceptNameStartYRef.current = null;

        event.currentTarget.releasePointerCapture?.(event.pointerId);
    };

    const handleConceptNamePointerCancel = () => {
        conceptNameStartYRef.current = null;
    };

    return (
        <Section spacing="compact">
            <Container>
                <SplitSectionIntro
                    eyebrow={guidePageContent.learning.eyebrow}
                    title={
                        <>
                            <span className="block md:hidden">
                                Entendé qué estás
                            </span>
                            <span className="block md:hidden">
                                construyendo.
                            </span>

                            <span className="hidden md:block">Entendé</span>
                            <span className="hidden md:block">qué estás</span>
                            <span className="hidden md:block">
                                construyendo.
                            </span>
                        </>
                    }
                    description={guidePageContent.learning.description}
                    inverted
                    titleAlign="right"
                    titleClassName="text-[clamp(2.5rem,6vw,5.7rem)]"
                />

                {/* MOBILE — CONCEPTOS ESENCIALES / SELECTOR VERTICAL */}
                <div className="mt-14 lg:hidden">
                    <Reveal>
                        <div
                            onPointerDown={handleConceptNamePointerDown}
                            onPointerMove={handleConceptNamePointerMove}
                            onPointerUp={handleConceptNamePointerUp}
                            onPointerCancel={handleConceptNamePointerCancel}
                            className="relative w-full min-w-0 max-w-full touch-none select-none overflow-hidden  bg-black/10 px-4 py-5 shadow-[0_14px_44px_rgba(0,0,0,.16)] backdrop-blur-xl"
                        >
                            <button
                                type="button"
                                aria-label="Ver concepto anterior"
                                onClick={goToPreviousConcept}
                                className="absolute left-1/2 top-1.5 z-30 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-white/[0.045] bg-white/[0.018] font-ui text-[0.8rem] text-white/24 backdrop-blur-md transition-[border-color,background-color,color,transform] duration-[320ms] hover:border-fuchsia-300/16 hover:bg-white/[0.032] hover:text-fuchsia-100/52"
                            >
                                <span className="block rotate-90">‹</span>
                            </button>

                            <div className="relative h-[116px] w-full min-w-0 max-w-full overflow-hidden">
                                <AnimatePresence initial={false}>
                                    {mobileConceptOffsets.map((offset) => {
                                        const itemIndex = getLoopIndex(
                                            activeIndex + offset
                                        );
                                        const item =
                                            guidePageContent.learning.items[
                                            itemIndex
                                            ];

                                        const isActive = offset === 0;

                                        const top =
                                            offset === -1
                                                ? "15%"
                                                : offset === 0
                                                    ? "50%"
                                                    : "83%";

                                        return (
                                            <motion.button
                                                key={item.title}
                                                type="button"
                                                onClick={(event) => {
                                                    if (
                                                        conceptNameMovedRef.current
                                                    ) {
                                                        event.preventDefault();
                                                        conceptNameMovedRef.current =
                                                            false;
                                                        return;
                                                    }

                                                    selectConcept(itemIndex);
                                                }}
                                                initial={{
                                                    opacity: 0,
                                                    y:
                                                        conceptDirection === 1
                                                            ? 18
                                                            : -18,
                                                }}
                                                animate={{
                                                    top,
                                                    opacity: isActive ? 1 : 0.34,
                                                    y: 0,
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    y:
                                                        conceptDirection === 1
                                                            ? -18
                                                            : 18,
                                                }}
                                                transition={{
                                                    duration: 0.34,
                                                    ease: [0.22, 1, 0.36, 1],
                                                }}
                                                className={cn(
                                                    "absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 justify-center",
                                                    isActive
                                                        ? "z-20 w-[82%]"
                                                        : "z-10 w-[66%]"
                                                )}
                                            >
                                                <motion.span
                                                    animate={{
                                                        scale: isActive ? 1 : 0.76,
                                                        y:
                                                            isActive
                                                                ? 0
                                                                : offset === -1
                                                                    ? 9
                                                                    : -9,
                                                        filter: isActive
                                                            ? "blur(0px)"
                                                            : "blur(0.4px)",
                                                    }}
                                                    transition={{
                                                        duration: 0.34,
                                                        ease: [
                                                            0.22, 1, 0.36, 1,
                                                        ],
                                                    }}
                                                    className={cn(
                                                        "block w-full truncate whitespace-nowrap rounded-full border px-4 py-2.5 text-center font-ui text-[0.76rem] transition-[border-color,background-color,color,box-shadow] duration-[340ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                                                        isActive
                                                            ? "border-fuchsia-300/24 bg-fuchsia-500/[0.075] text-white shadow-[0_0_22px_rgba(217,70,239,.052)]"
                                                            : "border-white/[0.045] bg-white/[0.012] text-white/[0.34]"
                                                    )}
                                                >
                                                    {item.title}
                                                </motion.span>
                                            </motion.button>
                                        );
                                    })}
                                </AnimatePresence>
                            </div>

                            <button
                                type="button"
                                aria-label="Ver concepto siguiente"
                                onClick={goToNextConcept}
                                className="absolute bottom-1.5 left-1/2 z-30 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border border-white/[0.045] bg-white/[0.018] font-ui text-[0.8rem] text-white/24 backdrop-blur-md transition-[border-color,background-color,color,transform] duration-[320ms] hover:border-fuchsia-300/16 hover:bg-white/[0.032] hover:text-fuchsia-100/52"
                            >
                                <span className="block rotate-90">›</span>
                            </button>
                        </div>
                    </Reveal>

                    <Reveal delay={0.08}>
                        <div className="mt-5 w-full min-w-0 max-w-full overflow-hidden">
                            <div className="relative min-h-[520px] overflow-hidden rounded-[36px] border border-fuchsia-300/12 bg-[rgba(10,10,11,.72)] p-7 shadow-[0_24px_90px_rgba(0,0,0,.28)] backdrop-blur-xl">
                                <div className="pointer-events-none absolute right-[-20%] top-[-35%] h-[380px] w-[380px] rounded-full bg-fuchsia-500/[0.07] blur-[130px]" />
                                <div className="pointer-events-none absolute bottom-[-42%] left-[-18%] h-[320px] w-[320px] rounded-full bg-violet-500/[0.055] blur-[120px]" />

                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div
                                        key={activeItem.title}
                                        initial={{
                                            opacity: 0,
                                            y:
                                                conceptDirection === 1
                                                    ? 16
                                                    : -16,
                                            filter: "blur(7px)",
                                        }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            filter: "blur(0px)",
                                        }}
                                        exit={{
                                            opacity: 0,
                                            y:
                                                conceptDirection === 1
                                                    ? -12
                                                    : 12,
                                            filter: "blur(6px)",
                                        }}
                                        transition={{
                                            duration: 0.34,
                                            ease: [0.22, 1, 0.36, 1],
                                        }}
                                        className="relative z-10"
                                    >
                                        <p className="font-ui text-[0.7rem] uppercase tracking-[0.22em] text-fuchsia-100/58">
                                            Concepto esencial
                                        </p>

                                        <div className="mt-5 flex items-start justify-between gap-5">
                                            <h3 className="font-display text-[clamp(2.4rem,13vw,4.5rem)] font-black leading-[0.9] tracking-[-0.055em] text-white">
                                                {activeItem.title}
                                            </h3>

                                            <span className="mt-2 shrink-0 font-ui text-[0.7rem] uppercase tracking-[0.22em] text-white/[0.32]">
                                                {activeItem.number}
                                            </span>
                                        </div>

                                        <div className="mt-8 grid gap-6">
                                            <div>
                                                <p className="font-ui text-[0.68rem] uppercase tracking-[0.2em] text-white/[0.36]">
                                                    Función
                                                </p>

                                                <p className="mt-3 text-sm leading-7 text-white/[0.68]">
                                                    {activeItem.short}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="font-ui text-[0.68rem] uppercase tracking-[0.2em] text-white/[0.36]">
                                                    Por qué importa
                                                </p>

                                                <p className="mt-3 text-sm leading-7 text-white/[0.68]">
                                                    {activeItem.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-8 border-t border-white/[0.06] pt-6">
                                            <p className="font-ui text-[0.68rem] uppercase tracking-[0.2em] text-white/[0.36]">
                                                Claves
                                            </p>

                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {activeItem.details.map(
                                                    (detail) => (
                                                        <span
                                                            key={detail}
                                                            className="rounded-full border border-white/[0.075] bg-white/[0.035] px-3 py-1.5 text-xs leading-5 text-white/[0.68]"
                                                        >
                                                            {detail}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* DESKTOP/TABLET — CONCEPTOS ESENCIALES APROBADO */}
                <div className="mt-14 hidden gap-8 lg:grid lg:grid-cols-[0.34fr_0.66fr] lg:items-stretch">
                    <Reveal>
                        <div className="lg:sticky lg:top-32">
                            <div className="rounded-[28px] border border-white/[0.07] bg-white/[0.025] p-3 backdrop-blur-xl">
                                {guidePageContent.learning.items.map(
                                    (item, index) => {
                                        const isActive = activeIndex === index;

                                        return (
                                            <button
                                                key={item.title}
                                                type="button"
                                                onMouseEnter={() =>
                                                    setActiveIndex(index)
                                                }
                                                onFocus={() =>
                                                    setActiveIndex(index)
                                                }
                                                onClick={() =>
                                                    setActiveIndex(index)
                                                }
                                                className={cn(
                                                    "group relative flex w-full items-center justify-between gap-4 overflow-hidden rounded-[20px] px-4 py-4 text-left transition-[background-color,color,transform] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                                                    isActive
                                                        ? "bg-fuchsia-500/[0.075] text-white"
                                                        : "text-white/[0.54] hover:bg-white/[0.035] hover:text-white/84"
                                                )}
                                            >
                                                <span className="relative z-10 font-ui text-[0.68rem] uppercase tracking-[0.2em]">
                                                    {item.number}
                                                </span>

                                                <span className="relative z-10 text-sm font-medium tracking-[-0.02em]">
                                                    {item.title}
                                                </span>

                                                {isActive && (
                                                    <motion.span
                                                        layoutId="guide-learning-active"
                                                        className="absolute inset-y-3 left-0 w-[2px] rounded-full bg-gradient-to-b from-fuchsia-300/70 to-violet-300/30"
                                                    />
                                                )}
                                            </button>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    </Reveal>

                    <Reveal delay={0.08}>
                        <motion.div
                            whileHover={{
                                y: -4,
                                rotateY: -2,
                            }}
                            transition={{
                                duration: 0.42,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="relative min-h-[520px] overflow-hidden rounded-[36px] border border-fuchsia-300/12 bg-[rgba(10,10,11,.72)] p-7 shadow-[0_24px_90px_rgba(0,0,0,.28)] backdrop-blur-xl md:p-9"
                            style={{
                                transformStyle: "preserve-3d",
                            }}
                        >
                            <div className="pointer-events-none absolute right-[-20%] top-[-35%] h-[380px] w-[380px] rounded-full bg-fuchsia-500/[0.07] blur-[130px]" />
                            <div className="pointer-events-none absolute bottom-[-42%] left-[-18%] h-[320px] w-[320px] rounded-full bg-violet-500/[0.055] blur-[120px]" />

                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={activeItem.title}
                                    initial={{
                                        opacity: 0,
                                        x: 18,
                                        rotateY: -2,
                                        filter: "blur(7px)",
                                    }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        rotateY: 0,
                                        filter: "blur(0px)",
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: -14,
                                        rotateY: 2,
                                        filter: "blur(6px)",
                                    }}
                                    transition={{
                                        duration: 0.34,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="relative z-10"
                                >
                                    <p className="font-ui text-[0.7rem] uppercase tracking-[0.22em] text-fuchsia-100/58">
                                        Concepto esencial
                                    </p>

                                    <div className="mt-5 flex items-start justify-between gap-5">
                                        <h3 className="font-display text-[clamp(2.4rem,6vw,5.4rem)] font-black leading-[0.9] tracking-[-0.055em] text-white">
                                            {activeItem.title}
                                        </h3>

                                        <span className="mt-2 shrink-0 font-ui text-[0.7rem] uppercase tracking-[0.22em] text-white/[0.32]">
                                            {activeItem.number}
                                        </span>
                                    </div>

                                    <div className="mt-8 grid gap-6 md:grid-cols-2">
                                        <div>
                                            <p className="font-ui text-[0.68rem] uppercase tracking-[0.2em] text-white/[0.36]">
                                                Función
                                            </p>

                                            <p className="mt-3 text-sm leading-7 text-white/[0.68] md:text-base md:leading-8">
                                                {activeItem.short}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="font-ui text-[0.68rem] uppercase tracking-[0.2em] text-white/[0.36]">
                                                Por qué importa
                                            </p>

                                            <p className="mt-3 text-sm leading-7 text-white/[0.68] md:text-base md:leading-8">
                                                {activeItem.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 border-t border-white/[0.06] pt-6">
                                        <p className="font-ui text-[0.68rem] uppercase tracking-[0.2em] text-white/[0.36]">
                                            Claves
                                        </p>

                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {activeItem.details.map((detail) => (
                                                <span
                                                    key={detail}
                                                    className="rounded-full border border-white/[0.075] bg-white/[0.035] px-3 py-1.5 text-xs leading-5 text-white/[0.68]"
                                                >
                                                    {detail}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>
                    </Reveal>
                </div>
            </Container>
        </Section>
    );
}