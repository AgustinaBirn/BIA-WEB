"use client";

import { motion, type Transition, type Variants } from "framer-motion";
import { useState } from "react";

import CtaLink from "@/components/ui/cta-link";
import PremiumCard from "@/components/ui/premium-card";
import PriceText from "@/components/ui/price-text";
import { mainServices } from "@/lib/services";
import { buildServiceWhatsAppMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type MainService = (typeof mainServices)[number];

type MainServicesCarouselProps = {
    services: readonly MainService[];
};

type RelativePosition = -2 | -1 | 0 | 1 | 2;

const carouselEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

function getLoopIndex(index: number, length: number) {
    return ((index % length) + length) % length;
}

function getRelativePosition(
    index: number,
    activeIndex: number,
    total: number
): RelativePosition {
    let diff = index - activeIndex;

    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) return 0;
    if (diff === -1) return -1;
    if (diff === 1) return 1;

    return diff < 0 ? -2 : 2;
}

function getCardState(
    position: RelativePosition,
    introComplete = true
) {
    const baseTransition: Transition = {
        duration: 0.72,
        ease: carouselEase,
    };

    if (!introComplete) {
        if (position === 0) {
            return {
                opacity: 0.96,
                x: 0,
                scale: 0.985,
                rotateY: 0,
                filter: "blur(2px)",
                zIndex: 30,
                transition: baseTransition,
            };
        }

        if (position === -1) {
            return {
                opacity: 0.34,
                x: -34,
                scale: 0.82,
                rotateY: 2,
                filter: "blur(7px)",
                zIndex: 14,
                transition: baseTransition,
            };
        }

        if (position === 1) {
            return {
                opacity: 0.34,
                x: 34,
                scale: 0.82,
                rotateY: -2,
                filter: "blur(7px)",
                zIndex: 14,
                transition: baseTransition,
            };
        }

        return {
            opacity: 0,
            x: 0,
            scale: 0.58,
            rotateY: 0,
            filter: "blur(12px)",
            zIndex: 0,
            transition: baseTransition,
        };
    }

    if (position === 0) {
        return {
            opacity: 1,
            x: 0,
            scale: 1,
            rotateY: 0,
            filter: "blur(0px)",
            zIndex: 30,
            transition: baseTransition,
        };
    }

    if (position === -1) {
        return {
            opacity: 1,
            x: -520,
            scale: 0.72,
            rotateY: 5,
            filter: "blur(1.5px)",
            zIndex: 18,
            transition: baseTransition,
        };
    }

    if (position === 1) {
        return {
            opacity: 1,
            x: 520,
            scale: 0.72,
            rotateY: -5,
            filter: "blur(1.5px)",
            zIndex: 18,
            transition: baseTransition,
        };
    }

    return {
        opacity: 0,
        x: position < 0 ? -760 : 760,
        scale: 0.58,
        rotateY: position < 0 ? 8 : -8,
        filter: "blur(10px)",
        zIndex: 0,
        transition: baseTransition,
    };
}

function getMobileCardState(position: RelativePosition) {
    const transition: Transition = {
        duration: 0.72,
        ease: carouselEase,
    };

    if (position === 0) {
        return {
            opacity: 1,
            x: 0,
            scale: 1,
            zIndex: 30,
            transition,
        };
    }

    if (position === -1) {
        return {
            opacity: 0,
            x: -72,
            scale: 0.94,
            zIndex: 14,
            transition,
        };
    }

    if (position === 1) {
        return {
            opacity: 0,
            x: 72,
            scale: 0.94,
            zIndex: 14,
            transition,
        };
    }

    return {
        opacity: 0,
        x: position < 0 ? -108 : 108,
        scale: 0.9,
        zIndex: 0,
        transition,
    };
}

const mobileCarouselIntro: Variants = {
    hidden: {
        opacity: 0,
        y: 28,
        scale: 0.965,
    },

    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.95,
            ease: carouselEase,
        },
    },
};

function CarouselServiceCard({
    service,
    index,
    isPreview = false,
}: {
    service: MainService;
    index: number;
    isPreview?: boolean;
}) {
    const leftColumnIncludes = service.includes.filter(
        (_, itemIndex) => itemIndex % 2 === 0
    );

    const rightColumnIncludes = service.includes.filter(
        (_, itemIndex) => itemIndex % 2 !== 0
    );

    const mobileIncludes = [...leftColumnIncludes, ...rightColumnIncludes];

    const renderFeature = (item: string) => {
        const outlined = (service.outlinedIncludes as readonly string[]).includes(
            item
        );

        const differentiator = (
            service.differentiatorIncludes as readonly string[]
        ).includes(item);

        return (
            <div
                key={item}
                className={cn(
                    "flex gap-3 text-sm leading-5.5                     text-white/[0.68]",
                    (outlined || differentiator) && "text-white/[0.82]"
                )}
            >
                <span
                    className={cn(
                        "mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-fuchsia-400/60",
                        outlined && "mt-[0.65rem]"
                    )}
                />

                <span
                    className={cn(
                        (outlined || differentiator) &&
                        "underline decoration-fuchsia-400/35 underline-offset-[5px]"
                    )}
                >
                    {item}
                </span>
            </div>
        );
    };

    return (
        <PremiumCard
            className={cn(
                " h-full rounded-[32px] bg-[rgba(10,10,11,.96)] p-6 md:p-7 lg:p-7 [filter:blur(0px)] [backface-visibility:hidden] transition-[background-color,border-color,box-shadow,transform] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[rgba(10,10,11,.93)] active:-translate-y-[3px] active:shadow-[0_18px_60px_rgba(217,70,239,.075),0_10px_40px_rgba(139,92,246,.045)]",
                isPreview && "pointer-events-none bg-[rgba(10,10,11,.98)]"
            )}
            contentClassName="flex h-full flex-col"
        >
            <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div>
                    <span className="font-ui text-[0.68rem] uppercase tracking-[0.22em] text-white/[0.34]">
                        0{index + 1}
                    </span>

                    <h3 className="mt-4 text-[1.65rem] font-medium leading-[0.95] tracking-[-0.04em] text-foreground md:text-[2.05rem]">
                        {service.name}
                    </h3>
                </div>

                <div className="text-left md:text-right">
                    <p className="font-ui text-[0.68rem] uppercase tracking-[0.18em] text-white/[0.38]">
                        Desde
                    </p>

                    <p className="mt-1 text-xl font-semibold md:text-2xl">
                        <PriceText variant="primary">
                            {service.priceArs}
                        </PriceText>
                    </p>

                    <p className="text-sm font-medium">
                        <PriceText variant="secondary">
                            {service.priceUsd}
                        </PriceText>
                    </p>
                </div>
            </div>

            <p className="mt-5 max-w-[620px] text-sm leading-7 text-white/[0.62] md:text-base md:leading-8">
                {service.description}
            </p>

            <div className="mt-6 rounded-2xl border border-white/[0.06] bg-black/10 p-4">
                <p className="font-ui text-[0.7rem] uppercase tracking-[0.2em] text-white/[0.38]">
                    Ideal para
                </p>

                <p className="mt-2 text-sm leading-6 text-white/[0.72]">
                    {service.idealFor}
                </p>
            </div>

            <div className="mt-6 grid gap-2
             sm:hidden">
                {mobileIncludes.map(renderFeature)}
            </div>

            <div className="mt-6 hidden gap-2
             sm:grid sm:grid-cols-2">
                {service.includes.map(renderFeature)}
            </div>

            <div className="mt-auto flex flex-col gap-3 border-t border-white/[0.06] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-ui text-sm text-white/[0.52]">
                    Entrega estimada:{" "}
                    <span className="text-white/[0.78]">
                        {service.delivery}
                    </span>
                </p>

                {!isPreview && (
                    <CtaLink
                        message={buildServiceWhatsAppMessage(service.name)}
                        className="w-fit"
                    >
                        Solicitar propuesta
                    </CtaLink>
                )}
            </div>
        </PremiumCard>
    );
}

export default function MainServicesCarousel({
    services,
}: MainServicesCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [, setMobileDirection] = useState(1);
    const [introComplete, setIntroComplete] = useState(false);

    const total = services.length;

    const goPrevious = () => {
        setMobileDirection(-1);
        setActiveIndex((current) => getLoopIndex(current - 1, total));
    };

    const goNext = () => {
        setMobileDirection(1);
        setActiveIndex((current) => getLoopIndex(current + 1, total));
    };

    return (
        <motion.div
            className="relative mt-14"
            initial={false}
            viewport={{
                once: true,
                amount: 0.28,
            }}
            onViewportEnter={() => setIntroComplete(true)}
        >
            <div className="relative overflow-hidden py-4 lg:h-[760px] lg:px-[120px]">
                {/* DESKTOP CYLINDER STAGE */}
                <div
                    className="
            relative
            hidden
            h-full
            lg:block
          "
                    style={{
                        perspective: "1300px",
                    }}
                >
                    {services.map((service, index) => {
                        const position = getRelativePosition(index, activeIndex, total);
                        const state = getCardState(position, introComplete);
                        const isActive = position === 0;

                        return (
                            <motion.div
                                key={service.name}
                                animate={{
                                    opacity: state.opacity,
                                    x: state.x,
                                    scale: state.scale,
                                    rotateY: state.rotateY,
                                    filter: state.filter,
                                }}
                                transition={state.transition}
                                className={cn(
                                    "absolute left-1/2 top-0 h-[700px] w-full max-w-[860px] -translate-x-1/2",
                                    !isActive && "pointer-events-none"
                                )}
                                style={{
                                    zIndex: state.zIndex,
                                    transformStyle: "preserve-3d",
                                }}
                            >
                                <CarouselServiceCard
                                    service={service}
                                    index={index}
                                    isPreview={!isActive}
                                />
                            </motion.div>
                        );
                    })}

                    {/* FIXED DESKTOP ARROWS */}
                    <button
                        type="button"
                        aria-label="Ver servicio anterior"
                        onClick={goPrevious}
                        className="
                            absolute
                            left-6
                            top-[350px]
                            z-50

                            hidden
                            h-11
                            w-11

                            items-center
                            justify-center

                            rounded-full
                            border
                            border-white/[0.08]

                            bg-white/[0.035]

                            text-white/58

                            backdrop-blur-xl

                            transition-[border-color,background-color,color,transform]
                            duration-[360ms]
                            ease-[cubic-bezier(0.22,1,0.36,1)]

                            hover:scale-[1.04]
                            hover:border-fuchsia-400/24
                            hover:bg-white/[0.055]
                            hover:text-white/88

                            focus-visible:border-fuchsia-400/24
                            focus-visible:text-white/88

                            lg:flex
                        "
                    >
                        ←
                    </button>

                    <button
                        type="button"
                        aria-label="Ver servicio siguiente"
                        onClick={goNext}
                        className="
                            absolute
                            right-6
                            top-[350px]
                            z-50

                            hidden
                            h-11
                            w-11

                            items-center
                            justify-center

                            rounded-full
                            border
                            border-white/[0.08]

                            bg-white/[0.035]

                            text-white/58

                            backdrop-blur-xl

                            transition-[border-color,background-color,color,transform]
                            duration-[360ms]
                            ease-[cubic-bezier(0.22,1,0.36,1)]

                            hover:scale-[1.04]
                            hover:border-fuchsia-400/24
                            hover:bg-white/[0.055]
                            hover:text-white/88

                            focus-visible:border-fuchsia-400/24
                            focus-visible:text-white/88

                            lg:flex
                        "
                    >
                        →
                    </button>

                    {/* FIXED CONTROLS / INDICATOR */}
                    <div className="mt-7 flex min-h-[20px] items-center justify-center">
                        <div className="flex min-h-[10px] items-center gap-2">
                            {services.map((service, index) => {
                                const isActive = index === activeIndex;

                                return (
                                    <button
                                        key={service.name}
                                        type="button"
                                        aria-label={`Ver ${service.name}`}
                                        onClick={() => {
                                            if (index === activeIndex) return;

                                            setActiveIndex(index);
                                        }}
                                        className={cn(
                                            "h-[3px] rounded-full transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                                            isActive
                                                ? "w-9 bg-gradient-to-r from-fuchsia-300/70 via-violet-300/45 to-transparent"
                                                : "w-3 bg-white/[0.18] hover:bg-white/[0.32]"
                                        )}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* MOBILE / TABLET ACTIVE CARD */}
                <motion.div
                    className="relative lg:hidden"
                    initial="hidden"
                    whileInView="show"
                    viewport={{
                        once: true,
                        amount: 0.32,
                        margin: "-10% 0px -10% 0px",
                    }}
                    variants={mobileCarouselIntro}
                >
                    <div className="relative overflow-visible">
                        {/* HEIGHT ANCHOR — solo define la altura mobile según la card activa */}
                        <div
                            aria-hidden="true"
                            className="
            pointer-events-none
            invisible
            lg:hidden
        "
                        >
                            <CarouselServiceCard
                                service={services[activeIndex]}
                                index={activeIndex}
                            />
                        </div>

                        {/* ANIMATED MOBILE STACK */}
                        <div className="absolute inset-0">
                            {services.map((service, index) => {
                                const position = getRelativePosition(index, activeIndex, total);
                                const state = getMobileCardState(position);
                                const isActive = position === 0;

                                return (
                                    <motion.div
                                        key={service.name}
                                        animate={{
                                            opacity: state.opacity,
                                            x: state.x,
                                            scale: state.scale,
                                        }}
                                        transition={state.transition}
                                        drag={isActive ? "x" : false}
                                        dragConstraints={{
                                            left: 0,
                                            right: 0,
                                        }}
                                        dragElastic={0.045}
                                        onDragEnd={(_, info) => {
                                            if (info.offset.x <= -58) {
                                                goNext();
                                            }

                                            if (info.offset.x >= 58) {
                                                goPrevious();
                                            }
                                        }}
                                        className={cn(
                                            "absolute left-0 top-0 w-full touch-pan-y [backface-visibility:hidden] [will-change:transform,opacity]",
                                            !isActive && "pointer-events-none"
                                        )}
                                        style={{
                                            zIndex: state.zIndex,
                                            backfaceVisibility: "hidden",
                                            WebkitBackfaceVisibility: "hidden",
                                            WebkitFontSmoothing: "antialiased",
                                            textRendering: "geometricPrecision",
                                        }}
                                    >
                                        <CarouselServiceCard
                                            service={service}
                                            index={index}
                                            isPreview={!isActive}
                                        />
                                    </motion.div>
                                );
                            })}
                        </div>

                        <div
                            className="
        absolute
        right-6
        top-[6.35rem]
        z-50

        flex
        items-center
        gap-2
    "
                        >
                            <button
                                type="button"
                                aria-label="Ver servicio anterior"
                                onClick={goPrevious}
                                className="
            flex
            h-9
            w-9
            items-center
            justify-center

            rounded-full
            border
            border-fuchsia-300/18
            bg-[rgba(10,10,11,.58)]

            font-ui
            text-[1.25rem]
            leading-none
            text-fuchsia-100/82

            shadow-[0_0_18px_rgba(217,70,239,.08)]
            backdrop-blur-md

            transition-[border-color,background-color,color,transform,box-shadow]
            duration-[320ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]

            hover:scale-[1.04]
            hover:border-fuchsia-300/34
            hover:bg-[rgba(22,16,28,.72)]
            hover:text-white
            hover:shadow-[0_0_22px_rgba(217,70,239,.14)]

            active:scale-[0.94]
        "
                            >
                                &lt;
                            </button>

                            <button
                                type="button"
                                aria-label="Ver servicio siguiente"
                                onClick={goNext}
                                className="
            flex
            h-9
            w-9
            items-center
            justify-center

            rounded-full
            border
            border-fuchsia-300/18
            bg-[rgba(10,10,11,.58)]

            font-ui
            text-[1.25rem]
            leading-none
            text-fuchsia-100/82

            shadow-[0_0_18px_rgba(217,70,239,.08)]
            backdrop-blur-md

            transition-[border-color,background-color,color,transform,box-shadow]
            duration-[320ms]
            ease-[cubic-bezier(0.22,1,0.36,1)]

            hover:scale-[1.04]
            hover:border-fuchsia-300/34
            hover:bg-[rgba(22,16,28,.72)]
            hover:text-white
            hover:shadow-[0_0_22px_rgba(217,70,239,.14)]

            active:scale-[0.94]
        "
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* FIXED CONTROLS / INDICATOR */}
            <div className="mt-7 flex min-h-[20px] items-center justify-center">
                <div className="flex min-h-[10px] items-center gap-2">
                    {services.map((service, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <button
                                key={service.name}
                                type="button"
                                aria-label={`Ver ${service.name}`}
                                onClick={() => {
                                    if (index === activeIndex) return;

                                    setMobileDirection(index > activeIndex ? 1 : -1);
                                    setActiveIndex(index);
                                }}
                                className={cn(
                                    "h-[3px] rounded-full transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                                    isActive
                                        ? "w-9 bg-gradient-to-r from-fuchsia-300/70 via-violet-300/45 to-transparent"
                                        : "w-3 bg-white/[0.18] hover:bg-white/[0.32]"
                                )}
                            />
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}