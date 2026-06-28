"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import RouteAwareLink from "@/components/ui/route-aware-link";
import Section from "@/components/ui/section";
import { homePageContent } from "@/lib/home-page-content";
import { cn } from "@/lib/utils";

export default function HomeServicesTeaser() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [serviceDirection, setServiceDirection] = useState<1 | -1>(1);
    const activeItem = homePageContent.servicesTeaser.items[activeIndex];

    const pointerStartXRef = useRef<number | null>(null);
    const nameBarStartXRef = useRef<number | null>(null);
    const nameBarMovedRef = useRef(false);

    const totalServices = homePageContent.servicesTeaser.items.length;

    const getLoopIndex = (index: number) => {
        return ((index % totalServices) + totalServices) % totalServices;
    };

    const getMobileNamePosition = (offset: -1 | 0 | 1) => {
        if (offset === 0) return "active";
        return "near";
    };

    const getServiceDirection = (nextIndex: number): 1 | -1 => {
        const normalizedNextIndex = getLoopIndex(nextIndex);

        if (normalizedNextIndex === activeIndex) {
            return serviceDirection;
        }

        let diff = normalizedNextIndex - activeIndex;

        if (diff > totalServices / 2) diff -= totalServices;
        if (diff < -totalServices / 2) diff += totalServices;

        return diff > 0 ? 1 : -1;
    };

    const selectService = (index: number, direction?: 1 | -1) => {
        const nextIndex = getLoopIndex(index);

        setServiceDirection(direction ?? getServiceDirection(nextIndex));
        setActiveIndex(nextIndex);
    };

    const goToPreviousService = () => {
        selectService(activeIndex - 1, -1);
    };

    const goToNextService = () => {
        selectService(activeIndex + 1, 1);
    };

    const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
        pointerStartXRef.current = event.clientX;
    };

    const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
        if (pointerStartXRef.current === null) return;

        const offsetX = event.clientX - pointerStartXRef.current;

        if (offsetX <= -42) {
            goToNextService();
        }

        if (offsetX >= 42) {
            goToPreviousService();
        }

        pointerStartXRef.current = null;
    };

    const handlePointerCancel = () => {
        pointerStartXRef.current = null;
    };

    const handleNameBarPointerDown = (
        event: React.PointerEvent<HTMLDivElement>
    ) => {
        nameBarStartXRef.current = event.clientX;
        nameBarMovedRef.current = false;

        event.currentTarget.setPointerCapture?.(event.pointerId);
    };

    const handleNameBarPointerMove = (
        event: React.PointerEvent<HTMLDivElement>
    ) => {
        if (nameBarStartXRef.current === null) return;

        const offsetX = event.clientX - nameBarStartXRef.current;

        if (offsetX <= -38) {
            nameBarMovedRef.current = true;
            goToNextService();
            nameBarStartXRef.current = event.clientX;
        }

        if (offsetX >= 38) {
            nameBarMovedRef.current = true;
            goToPreviousService();
            nameBarStartXRef.current = event.clientX;
        }
    };

    const handleNameBarPointerUp = (
        event: React.PointerEvent<HTMLDivElement>
    ) => {
        nameBarStartXRef.current = null;

        event.currentTarget.releasePointerCapture?.(event.pointerId);
    };

    const handleNameBarPointerCancel = () => {
        nameBarStartXRef.current = null;
    };

    const mobileNameOffsets = [-1, 0, 1] as const;

    return (
        <Section spacing="compact">
            <Container>
                <div className="grid w-full min-w-0 max-w-full gap-10 overflow-hidden lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
                    <Reveal>
                        <div className="w-full min-w-0 max-w-full">
                            <span className="inline-flex rounded-full border border-fuchsia-500/16 bg-fuchsia-500/[0.055] px-4 py-2 font-ui text-[0.7rem] uppercase tracking-[0.22em] text-fuchsia-100/72">
                                {homePageContent.servicesTeaser.eyebrow}
                            </span>

                            <h2 className="mt-7 max-w-full break-words font-display text-[clamp(2.35rem,12vw,5.8rem)] font-black leading-[0.9] tracking-[-0.055em] text-white md:max-w-[760px] md:text-[clamp(2.5rem,6vw,5.8rem)]">
                                {homePageContent.servicesTeaser.title}
                            </h2>

                            <p className="mt-6 max-w-full break-words text-sm leading-7 text-white/[0.62] md:max-w-[590px] md:text-base md:leading-8">
                                {homePageContent.servicesTeaser.description}
                            </p>

                            <RouteAwareLink
                                href="/servicios"
                                className="
                                    mt-8
                                    inline-flex
                                    rounded-full
                                    border
                                    border-fuchsia-300/20
                                    bg-white/[0.045]
                                    px-7
                                    py-4
                                    font-ui
                                    text-sm
                                    text-white/84
                                    transition-[border-color,box-shadow,transform,color]
                                    duration-[380ms]
                                    ease-[cubic-bezier(0.22,1,0.36,1)]
                                    hover:-translate-y-[2px]
                                    hover:border-fuchsia-500/34
                                    hover:text-white
                                    hover:shadow-[0_8px_28px_rgba(217,70,239,0.09)]
                                "
                            >
                                {homePageContent.servicesTeaser.ctaLabel}
                            </RouteAwareLink>
                        </div>
                    </Reveal>

                    <Reveal delay={0.08}>
                        <>
                            {/* MOBILE — CYLINDER SERVICE SELECTOR + ACTIVE CARD */}
                            <div className="relative w-full min-w-0 max-w-full overflow-hidden lg:hidden">
                                <div
                                    onPointerDown={handleNameBarPointerDown}
                                    onPointerMove={handleNameBarPointerMove}
                                    onPointerUp={handleNameBarPointerUp}
                                    onPointerCancel={handleNameBarPointerCancel}
                                    className="relative w-full min-w-0 max-w-full touch-pan-y select-none overflow-hidden rounded-full border border-white/[0.075] bg-black/10 px-9 py-2 shadow-[0_14px_44px_rgba(0,0,0,.16)] backdrop-blur-xl"
                                >
                                    <button
                                        type="button"
                                        aria-label="Ver servicio anterior"
                                        onClick={goToPreviousService}
                                        className="absolute left-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-fuchsia-300/16 bg-[rgba(10,10,11,.78)] text-sm text-fuchsia-100/76 shadow-[0_0_16px_rgba(217,70,239,.06)] backdrop-blur-md transition-[border-color,background-color,color,transform] duration-[320ms] hover:scale-[1.04] hover:border-fuchsia-300/30 hover:bg-[rgba(22,16,28,.72)] hover:text-white"
                                    >
                                        ‹
                                    </button>

                                    <div className="relative h-[52px] w-full min-w-0 max-w-full overflow-hidden">
                                        <AnimatePresence initial={false}>
                                            {mobileNameOffsets.map((offset) => {
                                                const itemIndex = getLoopIndex(
                                                    activeIndex + offset
                                                );
                                                const item =
                                                    homePageContent.servicesTeaser.items[
                                                    itemIndex
                                                    ];

                                                const isActive = offset === 0;
                                                const position =
                                                    getMobileNamePosition(offset);

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
                                                            if (nameBarMovedRef.current) {
                                                                event.preventDefault();
                                                                nameBarMovedRef.current = false;
                                                                return;
                                                            }

                                                            selectService(itemIndex);
                                                        }}
                                                        initial={{
                                                            opacity: 0,
                                                            x: serviceDirection === 1 ? 18 : -18,
                                                        }}
                                                        animate={{
                                                            left,
                                                            opacity: position === "active" ? 1 : 0.48,
                                                            x: 0,
                                                        }}
                                                        exit={{
                                                            opacity: 0,
                                                            x: serviceDirection === 1 ? -18 : 18,
                                                        }}
                                                        transition={{
                                                            duration: 0.34,
                                                            ease: [0.22, 1, 0.36, 1],
                                                        }}
                                                        className="absolute top-1/2 z-10 -ml-[22%] flex w-[44%] -translate-y-1/2 justify-center"
                                                    >
                                                        <motion.span
                                                            animate={{
                                                                scale: isActive ? 1 : 0.9,
                                                            }}
                                                            transition={{
                                                                duration: 0.34,
                                                                ease: [0.22, 1, 0.36, 1],
                                                            }}
                                                            className={cn(
                                                                "block w-full truncate whitespace-nowrap rounded-full border px-3 py-2.5 text-center font-ui text-[0.74rem] transition-[border-color,background-color,color,box-shadow] duration-[340ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                                                                isActive
                                                                    ? "border-fuchsia-300/24 bg-fuchsia-500/[0.075] text-white shadow-[0_0_22px_rgba(217,70,239,.052)]"
                                                                    : "border-white/[0.06] bg-white/[0.018] text-white/[0.42]"
                                                            )}
                                                        >
                                                            {item.name}
                                                        </motion.span>
                                                    </motion.button>
                                                );
                                            })}
                                        </AnimatePresence>
                                    </div>

                                    <button
                                        type="button"
                                        aria-label="Ver servicio siguiente"
                                        onClick={goToNextService}
                                        className="absolute right-2 top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-fuchsia-300/16 bg-[rgba(10,10,11,.78)] text-sm text-fuchsia-100/76 shadow-[0_0_16px_rgba(217,70,239,.06)] backdrop-blur-md transition-[border-color,background-color,color,transform] duration-[320ms] hover:scale-[1.04] hover:border-fuchsia-300/30 hover:bg-[rgba(22,16,28,.72)] hover:text-white"
                                    >
                                        ›
                                    </button>
                                </div>

                                <div
                                    role="region"
                                    aria-label="Detalle del servicio seleccionado"
                                    onPointerDown={handlePointerDown}
                                    onPointerUp={handlePointerUp}
                                    onPointerCancel={handlePointerCancel}
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
                                                    x: serviceDirection === 1 ? 6 : -6,
                                                    filter: "blur(1.5px)",
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    x: 0,
                                                    filter: "blur(0px)",
                                                }}
                                                exit={{
                                                    opacity: 0,
                                                    x: serviceDirection === 1 ? -4 : 4,
                                                    filter: "blur(1px)",
                                                }}
                                                transition={{
                                                    duration: 0.17,
                                                    ease: [
                                                        0.22, 1, 0.36, 1,
                                                    ],
                                                }}
                                                className="relative z-10 flex w-full min-w-0 max-w-full flex-col"
                                            >
                                                <p className="font-ui text-[0.64rem] uppercase tracking-[0.22em] text-fuchsia-100/58">
                                                    Servicio destacado
                                                </p>

                                                <h3 className="mt-3 max-w-full break-words text-[1.92rem] font-medium leading-[0.92] tracking-[-0.055em] text-white">
                                                    {activeItem.name}
                                                </h3>

                                                <p className="mt-4 max-w-full break-words text-sm leading-6 text-white/[0.64]">
                                                    {activeItem.summary}
                                                </p>

                                                <div className="mt-5 border-t border-white/[0.06] pt-4">
                                                    <p className="font-ui text-[0.64rem] uppercase tracking-[0.2em] text-white/[0.34]">
                                                        Inversión inicial
                                                    </p>

                                                    <p className="mt-2 max-w-full break-words text-sm font-medium text-white/[0.78]">
                                                        {activeItem.price}
                                                    </p>
                                                </div>

                                                <p className="mt-5 max-w-full break-words text-xs leading-5 text-white/[0.42]">
                                                    El detalle completo de alcances,
                                                    adicionales y packs está en la
                                                    página de servicios.
                                                </p>
                                            </motion.div>
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            {/* DESKTOP/TABLET — CURRENT APPROVED VERSION */}
                            <div className="hidden lg:block">
                                <div className="relative overflow-hidden rounded-[38px] border border-white/[0.075] bg-[rgba(10,10,11,.72)] p-4 shadow-[0_24px_90px_rgba(0,0,0,.26)] backdrop-blur-xl md:p-5">
                                    <div className="pointer-events-none absolute right-[-22%] top-[-38%] h-[380px] w-[380px] rounded-full bg-fuchsia-500/[0.07] blur-[130px]" />
                                    <div className="pointer-events-none absolute bottom-[-44%] left-[-24%] h-[340px] w-[340px] rounded-full bg-violet-500/[0.055] blur-[120px]" />

                                    <div className="relative z-10 grid gap-4 md:grid-cols-[0.42fr_0.58fr]">
                                        <div className="grid gap-2">
                                            {homePageContent.servicesTeaser.items.map(
                                                (item, index) => {
                                                    const isActive =
                                                        activeIndex === index;

                                                    return (
                                                        <button
                                                            key={item.name}
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
                                                                "group relative overflow-hidden rounded-[22px] px-4 py-4 text-left transition-[background-color,color,transform] duration-[360ms]",
                                                                isActive
                                                                    ? "bg-fuchsia-500/[0.085] text-white"
                                                                    : "text-white/[0.58] hover:bg-white/[0.035] hover:text-white/86"
                                                            )}
                                                        >
                                                            <span className="relative z-10 block font-ui text-[0.68rem] uppercase tracking-[0.2em] text-white/[0.36]">
                                                                0{index + 1}
                                                            </span>

                                                            <span className="relative z-10 mt-2 block text-[1rem] font-medium tracking-[-0.025em]">
                                                                {item.name}
                                                            </span>

                                                            {isActive && (
                                                                <motion.span
                                                                    layoutId="home-service-active"
                                                                    className="absolute inset-y-3 left-0 w-[2px] rounded-full bg-gradient-to-b from-fuchsia-300/70 to-violet-300/30"
                                                                />
                                                            )}
                                                        </button>
                                                    );
                                                }
                                            )}
                                        </div>

                                        <motion.div
                                            whileHover={{
                                                y: -4,
                                                rotateY: -2.4,
                                            }}
                                            transition={{
                                                duration: 0.34,
                                                ease: [0.16, 1, 0.3, 1],
                                            }}
                                            className="relative h-[430px] overflow-hidden rounded-[30px] border border-fuchsia-300/12 bg-white/[0.035] p-6 md:h-[410px] md:p-7 lg:h-[430px]"
                                            style={{
                                                transformStyle: "preserve-3d",
                                            }}
                                        >
                                            <AnimatePresence
                                                mode="wait"
                                                initial={false}
                                            >
                                                <motion.div
                                                    key={activeItem.name}
                                                    initial={{
                                                        opacity: 0,
                                                        x: 7,
                                                        filter: "blur(2px)",
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        x: 0,
                                                        filter: "blur(0px)",
                                                    }}
                                                    exit={{
                                                        opacity: 0,
                                                        x: -5,
                                                        filter: "blur(1.5px)",
                                                    }}
                                                    transition={{
                                                        duration: 0.17,
                                                        ease: [
                                                            0.22, 1, 0.36, 1,
                                                        ],
                                                    }}
                                                    className="relative z-10 flex h-full flex-col"
                                                >
                                                    <div>
                                                        <p className="font-ui text-[0.66rem] uppercase tracking-[0.22em] text-fuchsia-100/58">
                                                            Servicio destacado
                                                        </p>

                                                        <h3 className="mt-4 min-h-[3.15rem] text-[2.2rem] font-medium leading-[0.9] tracking-[-0.055em] text-white md:min-h-[3.85rem] md:text-[2.8rem]">
                                                            {activeItem.name}
                                                        </h3>

                                                        <p className="mt-4 min-h-[4.4rem] text-sm leading-6 text-white/[0.64] md:text-[0.95rem] md:leading-7">
                                                            {activeItem.summary}
                                                        </p>

                                                        <div className="mt-5 border-t border-white/[0.06] pt-4">
                                                            <p className="font-ui text-[0.66rem] uppercase tracking-[0.2em] text-white/[0.34]">
                                                                Inversión inicial
                                                            </p>

                                                            <p className="mt-2 text-sm font-medium text-white/[0.78]">
                                                                {activeItem.price}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <p className="mt-auto pt-5 text-xs leading-5 text-white/[0.42]">
                                                        El detalle completo de alcances,
                                                        adicionales y packs está en la
                                                        página de servicios.
                                                    </p>
                                                </motion.div>
                                            </AnimatePresence>
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </>
                    </Reveal>
                </div>
            </Container>
        </Section>
    );
}