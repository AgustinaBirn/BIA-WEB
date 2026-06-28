"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, type PointerEvent } from "react";

import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import SplitSectionIntro from "@/components/sections/split-section-intro";
import { guidePageContent } from "@/lib/guide-page-content";
import { cn } from "@/lib/utils";

export default function GuideWebsiteTypesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [typeDirection, setTypeDirection] = useState<1 | -1>(1);

    const typeNameStartXRef = useRef<number | null>(null);
    const typeNameMovedRef = useRef(false);
    const typeCardStartXRef = useRef<number | null>(null);

    const activeItem = guidePageContent.websiteTypes.items[activeIndex];
    const totalTypes = guidePageContent.websiteTypes.items.length;
    const mobileTypeOffsets = [-1, 0, 1] as const;

    const getLoopIndex = (index: number) => {
        return ((index % totalTypes) + totalTypes) % totalTypes;
    };

    const getTypeDirection = (nextIndex: number): 1 | -1 => {
        const normalizedNextIndex = getLoopIndex(nextIndex);

        if (normalizedNextIndex === activeIndex) {
            return typeDirection;
        }

        let diff = normalizedNextIndex - activeIndex;

        if (diff > totalTypes / 2) diff -= totalTypes;
        if (diff < -totalTypes / 2) diff += totalTypes;

        return diff > 0 ? 1 : -1;
    };

    const selectType = (index: number, direction?: 1 | -1) => {
        const nextIndex = getLoopIndex(index);

        setTypeDirection(direction ?? getTypeDirection(nextIndex));
        setActiveIndex(nextIndex);
    };

    const goToPreviousType = () => {
        selectType(activeIndex - 1, -1);
    };

    const goToNextType = () => {
        selectType(activeIndex + 1, 1);
    };

    const handleTypeNamePointerDown = (
        event: PointerEvent<HTMLDivElement>
    ) => {
        typeNameStartXRef.current = event.clientX;
        typeNameMovedRef.current = false;

        event.currentTarget.setPointerCapture?.(event.pointerId);
    };

    const handleTypeNamePointerMove = (
        event: PointerEvent<HTMLDivElement>
    ) => {
        if (typeNameStartXRef.current === null) return;

        const offsetX = event.clientX - typeNameStartXRef.current;

        if (offsetX <= -38) {
            typeNameMovedRef.current = true;
            goToNextType();
            typeNameStartXRef.current = event.clientX;
        }

        if (offsetX >= 38) {
            typeNameMovedRef.current = true;
            goToPreviousType();
            typeNameStartXRef.current = event.clientX;
        }
    };

    const handleTypeNamePointerUp = (
        event: PointerEvent<HTMLDivElement>
    ) => {
        typeNameStartXRef.current = null;

        event.currentTarget.releasePointerCapture?.(event.pointerId);
    };

    const handleTypeNamePointerCancel = () => {
        typeNameStartXRef.current = null;
    };

    const handleTypeCardPointerDown = (
        event: PointerEvent<HTMLDivElement>
    ) => {
        typeCardStartXRef.current = event.clientX;

        event.currentTarget.setPointerCapture?.(event.pointerId);
    };

    const handleTypeCardPointerMove = (
        event: PointerEvent<HTMLDivElement>
    ) => {
        if (typeCardStartXRef.current === null) return;

        const offsetX = event.clientX - typeCardStartXRef.current;

        if (offsetX <= -42) {
            goToNextType();
            typeCardStartXRef.current = event.clientX;
        }

        if (offsetX >= 42) {
            goToPreviousType();
            typeCardStartXRef.current = event.clientX;
        }
    };

    const handleTypeCardPointerUp = (
        event: PointerEvent<HTMLDivElement>
    ) => {
        typeCardStartXRef.current = null;

        event.currentTarget.releasePointerCapture?.(event.pointerId);
    };

    const handleTypeCardPointerCancel = () => {
        typeCardStartXRef.current = null;
    };

    return (
        <Section spacing="compact">
            <Container>
                <SplitSectionIntro
                    eyebrow={guidePageContent.websiteTypes.eyebrow}
                    title={guidePageContent.websiteTypes.title}
                    description={guidePageContent.websiteTypes.description}
                    titleClassName="text-[clamp(2.5rem,6vw,5.8rem)]"
                    descriptionClassName="lg:ml-auto lg:text-right"
                />

                {/* MOBILE — SAME PATTERN AS HOME SERVICES */}
                <div className="mt-14 lg:hidden">
                    <Reveal>
                        <div className="relative w-full min-w-0 max-w-full overflow-hidden">
                            <div
                                onPointerDown={handleTypeNamePointerDown}
                                onPointerMove={handleTypeNamePointerMove}
                                onPointerUp={handleTypeNamePointerUp}
                                onPointerCancel={handleTypeNamePointerCancel}
                                className="relative w-full min-w-0 max-w-full touch-pan-y select-none overflow-hidden rounded-full border border-white/[0.075] bg-black/10 px-9 py-2 shadow-[0_14px_44px_rgba(0,0,0,.16)] backdrop-blur-xl"
                            >
                                <button
                                    type="button"
                                    aria-label="Ver tipo anterior"
                                    onClick={goToPreviousType}
                                    className="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-fuchsia-300/16 bg-[rgba(10,10,11,.78)] text-sm text-fuchsia-100/76 shadow-[0_0_16px_rgba(217,70,239,.06)] backdrop-blur-md transition-[border-color,background-color,color,transform] duration-[320ms] hover:scale-[1.04] hover:border-fuchsia-300/30 hover:bg-[rgba(22,16,28,.72)] hover:text-white"
                                >
                                    ‹
                                </button>

                                <div className="relative h-[52px] w-full min-w-0 max-w-full overflow-hidden">
                                    <AnimatePresence initial={false}>
                                        {mobileTypeOffsets.map((offset) => {
                                            const itemIndex = getLoopIndex(
                                                activeIndex + offset
                                            );
                                            const item =
                                                guidePageContent.websiteTypes
                                                    .items[itemIndex];

                                            const isActive = offset === 0;

                                            const left =
                                                offset === -1
                                                    ? "16%"
                                                    : offset === 0
                                                        ? "50%"
                                                        : "84%";

                                            return (
                                                <motion.button
                                                    key={item.name}
                                                    type="button"
                                                    onClick={(event) => {
                                                        if (
                                                            typeNameMovedRef.current
                                                        ) {
                                                            event.preventDefault();
                                                            typeNameMovedRef.current =
                                                                false;
                                                            return;
                                                        }

                                                        selectType(itemIndex);
                                                    }}
                                                    initial={{
                                                        opacity: 0,
                                                        x:
                                                            typeDirection === 1
                                                                ? 18
                                                                : -18,
                                                    }}
                                                    animate={{
                                                        left,
                                                        opacity: isActive ? 1 : 0.48,
                                                        x: 0,
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        x:
                                                            typeDirection === 1
                                                                ? -18
                                                                : 18,
                                                    }}
                                                    transition={{
                                                        duration: 0.34,
                                                        ease: [
                                                            0.22, 1, 0.36, 1,
                                                        ],
                                                    }}
                                                    className="absolute top-1/2 z-10 -ml-[22%] flex w-[44%] -translate-y-1/2 justify-center"
                                                >
                                                    <motion.span
                                                        animate={{
                                                            scale: isActive ? 1 : 0.9,
                                                        }}
                                                        transition={{
                                                            duration: 0.34,
                                                            ease: [
                                                                0.22, 1, 0.36, 1,
                                                            ],
                                                        }}
                                                        className={cn(
                                                            "block w-full truncate whitespace-nowrap rounded-full border px-3 py-2.5 text-center font-ui text-[0.74rem] transition-[border-color,background-color,color,box-shadow] duration-[340ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                                                            isActive
                                                                ? "border-fuchsia-300/24 bg-fuchsia-500/[0.075] text-white shadow-[0_0_22px_rgba(217,70,239,.052)]"
                                                                : "border-white/[0.06] bg-white/[0.018] text-white/[0.42]"
                                                        )}
                                                    >
                                                        {item.shortName}
                                                    </motion.span>
                                                </motion.button>
                                            );
                                        })}
                                    </AnimatePresence>
                                </div>

                                <button
                                    type="button"
                                    aria-label="Ver tipo siguiente"
                                    onClick={goToNextType}
                                    className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-fuchsia-300/16 bg-[rgba(10,10,11,.78)] text-sm text-fuchsia-100/76 shadow-[0_0_16px_rgba(217,70,239,.06)] backdrop-blur-md transition-[border-color,background-color,color,transform] duration-[320ms] hover:scale-[1.04] hover:border-fuchsia-300/30 hover:bg-[rgba(22,16,28,.72)] hover:text-white"
                                >
                                    ›
                                </button>
                            </div>

                            <div
                                role="region"
                                aria-label="Detalle del tipo de web seleccionado"
                                onPointerDown={handleTypeCardPointerDown}
                                onPointerMove={handleTypeCardPointerMove}
                                onPointerUp={handleTypeCardPointerUp}
                                onPointerCancel={handleTypeCardPointerCancel}
                                className="mt-5 w-full min-w-0 max-w-full touch-pan-y overflow-hidden"
                            >
                                <div className="relative w-full min-w-0 max-w-full overflow-hidden rounded-[28px] border border-fuchsia-300/12 bg-white/[0.035] p-5 shadow-[0_18px_58px_rgba(0,0,0,.22)] backdrop-blur-xl">
                                    <AnimatePresence
                                        mode="wait"
                                        initial={false}
                                    >
                                        <motion.div
                                            key={activeItem.name}
                                            initial={{
                                                opacity: 0,
                                                x: typeDirection === 1 ? 6 : -6,
                                                filter: "blur(1.5px)",
                                            }}
                                            animate={{
                                                opacity: 1,
                                                x: 0,
                                                filter: "blur(0px)",
                                            }}
                                            exit={{
                                                opacity: 0,
                                                x: typeDirection === 1 ? -4 : 4,
                                                filter: "blur(1px)",
                                            }}
                                            transition={{
                                                duration: 0.17,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className="relative z-10 flex w-full min-w-0 max-w-full flex-col"
                                        >
                                            <p className="font-ui text-[0.64rem] uppercase tracking-[0.22em] text-fuchsia-100/58">
                                                Tipo de web
                                            </p>

                                            <h3 className="mt-3 max-w-full break-words text-[1.92rem] font-medium leading-[0.92] tracking-[-0.055em] text-white">
                                                {activeItem.name}
                                            </h3>

                                            <div className="mt-5 grid gap-5">
                                                <div>
                                                    <p className="font-ui text-[0.64rem] uppercase tracking-[0.2em] text-white/[0.34]">
                                                        Función
                                                    </p>

                                                    <p className="mt-2 text-sm leading-6 text-white/[0.64]">
                                                        {activeItem.purpose}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="font-ui text-[0.64rem] uppercase tracking-[0.2em] text-white/[0.34]">
                                                        Ideal para
                                                    </p>

                                                    <p className="mt-2 text-sm leading-6 text-white/[0.64]">
                                                        {activeItem.bestFor}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-5 border-t border-white/[0.06] pt-4">
                                                <p className="font-ui text-[0.64rem] uppercase tracking-[0.2em] text-white/[0.34]">
                                                    Suele incluir
                                                </p>

                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {activeItem.includes.map(
                                                        (item) => (
                                                            <span
                                                                key={item}
                                                                className="rounded-full border border-white/[0.075] bg-white/[0.035] px-3 py-1.5 text-xs leading-5 text-white/[0.68]"
                                                            >
                                                                {item}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* DESKTOP/TABLET — CURRENT APPROVED VERSION */}
                <div className="mt-14 hidden lg:block">
                    <Reveal>
                        <div className="relative overflow-hidden rounded-[38px] border border-white/[0.075] bg-white/[0.022] p-4 shadow-[0_22px_84px_rgba(0,0,0,.22)] backdrop-blur-xl md:p-5 lg:p-6">
                            <div className="pointer-events-none absolute left-1/2 top-[-46%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-fuchsia-500/[0.06] blur-[130px]" />
                            <div className="pointer-events-none absolute bottom-[-48%] right-[-18%] h-[340px] w-[340px] rounded-full bg-violet-500/[0.05] blur-[120px]" />

                            <div className="relative z-10 grid gap-5 lg:grid-cols-[0.54fr_0.46fr] lg:items-stretch">
                                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                    {guidePageContent.websiteTypes.items.map(
                                        (item, index) => {
                                            const isActive =
                                                index === activeIndex;

                                            return (
                                                <motion.button
                                                    key={item.name}
                                                    type="button"
                                                    onClick={() =>
                                                        setActiveIndex(index)
                                                    }
                                                    whileHover={{
                                                        y: -4,
                                                    }}
                                                    whileTap={{
                                                        scale: 0.985,
                                                    }}
                                                    transition={{
                                                        duration: 0.34,
                                                        ease: [
                                                            0.22, 1, 0.36, 1,
                                                        ],
                                                    }}
                                                    className={cn(
                                                        "group relative min-h-[138px] overflow-hidden rounded-[26px] border p-5 text-left transition-[border-color,background-color,box-shadow] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                                                        isActive
                                                            ? "border-fuchsia-300/20 bg-fuchsia-500/[0.065] shadow-[0_0_34px_rgba(217,70,239,.052)]"
                                                            : "border-white/[0.075] bg-black/10 hover:border-fuchsia-300/16 hover:bg-white/[0.035]"
                                                    )}
                                                >
                                                    <span className="relative z-10 font-ui text-[0.65rem] uppercase tracking-[0.2em] text-white/[0.34]">
                                                        0{index + 1}
                                                    </span>

                                                    <h3 className="relative z-10 mt-4 text-[1.25rem] font-medium leading-[0.95] tracking-[-0.04em] text-white">
                                                        {item.shortName}
                                                    </h3>

                                                    <p className="relative z-10 mt-3 line-clamp-2 text-xs leading-5 text-white/[0.52]">
                                                        {item.purpose}
                                                    </p>

                                                    {isActive && (
                                                        <motion.span
                                                            layoutId="website-type-glow"
                                                            className="pointer-events-none absolute inset-0 rounded-[26px] bg-[radial-gradient(circle_at_50%_0%,rgba(217,70,239,.12),transparent_58%)]"
                                                        />
                                                    )}
                                                </motion.button>
                                            );
                                        }
                                    )}
                                </div>

                                <div className="relative min-h-[560px] overflow-hidden rounded-[30px] border border-fuchsia-300/12 bg-[rgba(10,10,11,.72)] p-6 shadow-[0_20px_76px_rgba(0,0,0,.24)] md:p-7">
                                    <div className="pointer-events-none absolute right-[-28%] top-[-38%] h-[300px] w-[300px] rounded-full bg-fuchsia-500/[0.07] blur-[110px]" />

                                    <AnimatePresence
                                        mode="wait"
                                        initial={false}
                                    >
                                        <motion.div
                                            key={activeItem.name}
                                            initial={{
                                                opacity: 0,
                                                y: 8,
                                                filter: "blur(4px)",
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                filter: "blur(0px)",
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: -6,
                                                filter: "blur(3px)",
                                            }}
                                            transition={{
                                                duration: 0.28,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className="relative z-10"
                                        >
                                            <p className="font-ui text-[0.68rem] uppercase tracking-[0.22em] text-fuchsia-100/58">
                                                Formato recomendado
                                            </p>

                                            <h3 className="mt-5 font-display text-[clamp(2.25rem,6vw,4.5rem)] font-black leading-[0.9] tracking-[-0.055em] text-white">
                                                {activeItem.name}
                                            </h3>

                                            <div className="mt-7 grid gap-5">
                                                <div>
                                                    <p className="font-ui text-[0.66rem] uppercase tracking-[0.2em] text-white/[0.34]">
                                                        Función
                                                    </p>

                                                    <p className="mt-3 text-sm leading-7 text-white/[0.66]">
                                                        {activeItem.purpose}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="font-ui text-[0.66rem] uppercase tracking-[0.2em] text-white/[0.34]">
                                                        Ideal para
                                                    </p>

                                                    <p className="mt-3 text-sm leading-7 text-white/[0.66]">
                                                        {activeItem.bestFor}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-7 border-t border-white/[0.06] pt-5">
                                                <p className="font-ui text-[0.66rem] uppercase tracking-[0.2em] text-white/[0.34]">
                                                    Suele incluir
                                                </p>

                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {activeItem.includes.map(
                                                        (item) => (
                                                            <span
                                                                key={item}
                                                                className="rounded-full border border-white/[0.075] bg-white/[0.035] px-3 py-1.5 text-xs leading-5 text-white/[0.68]"
                                                            >
                                                                {item}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </Container>
        </Section>
    );
}