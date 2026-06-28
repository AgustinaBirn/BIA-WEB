"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import AddOnCard from "@/components/services/add-on-card";
import { addOns } from "@/lib/services";
import { cn } from "@/lib/utils";

type AddOn = (typeof addOns)[number];

type AddOnsMobileCarouselProps = {
    items: readonly AddOn[];
};

function getLoopIndex(index: number, length: number) {
    return ((index % length) + length) % length;
}

function chunkItems(items: readonly AddOn[], size: number) {
    const chunks: AddOn[][] = [];

    for (let index = 0; index < items.length; index += size) {
        chunks.push([...items.slice(index, index + size)]);
    }

    return chunks;
}

const slideVariants = {
    enter: (direction: number) => ({
        opacity: 0,
        x: direction > 0 ? 44 : -44,
        scale: 0.975,
        filter: "blur(8px)",
    }),

    center: {
        opacity: 1,
        x: 0,
        scale: 1,
        filter: "none",
        transition: {
            duration: 0.58,
            ease: [0.16, 1, 0.3, 1],
        },
    },
};

export default function AddOnsMobileCarousel({
    items,
}: AddOnsMobileCarouselProps) {
    const slides = chunkItems(items, 3);
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(1);

    const goPrevious = () => {
        setDirection(-1);
        setActiveIndex((current) => getLoopIndex(current - 1, slides.length));
    };

    const goNext = () => {
        setDirection(1);
        setActiveIndex((current) => getLoopIndex(current + 1, slides.length));
    };

    const activeSlide = slides[activeIndex];

    return (
        <motion.div
            className="relative mt-16 md:hidden"
            initial={{
                opacity: 0,
                y: 24,
                scale: 0.975,
                filter: "blur(10px)",
            }}
            whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "none",
            }}
            viewport={{
                once: true,
                amount: 0.32,
                margin: "-10% 0px -10% 0px",
            }}
            transition={{
                duration: 0.82,
                ease: [0.16, 1, 0.3, 1],
            }}
        >
            <div className="relative overflow-hidden">
                <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    drag="x"
                    dragConstraints={{
                        left: 0,
                        right: 0,
                    }}
                    dragElastic={0.055}
                    onDragEnd={(_, info) => {
                        if (info.offset.x <= -52) {
                            goNext();
                        }

                        if (info.offset.x >= 52) {
                            goPrevious();
                        }
                    }}
                    className="grid gap-4 touch-pan-y"
                >
                    {activeSlide.map((addOn) => (
                        <AddOnCard
                            key={addOn.name}
                            addOn={addOn}
                        />
                    ))}
                </motion.div>
            </div>

            <div className="mt-7 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    {slides.map((_, index) => {
                        const isActive = index === activeIndex;

                        return (
                            <button
                                key={index}
                                type="button"
                                aria-label={`Ver grupo ${index + 1} de add-ons`}
                                onClick={() => {
                                    if (index === activeIndex) return;

                                    setDirection(index > activeIndex ? 1 : -1);
                                    setActiveIndex(index);
                                }}
                                className={cn(
                                    "h-[3px] rounded-full transition-all duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                                    isActive
                                        ? "w-9 bg-gradient-to-r from-fuchsia-300/70 via-violet-300/45 to-transparent"
                                        : "w-3 bg-white/[0.18]"
                                )}
                            />
                        );
                    })}
                </div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        aria-label="Ver add-ons anteriores"
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
                            text-[1.2rem]
                            leading-none
                            text-fuchsia-100/82

                            shadow-[0_0_18px_rgba(217,70,239,.08)]
                            backdrop-blur-md

                            transition-[border-color,background-color,color,transform,box-shadow]
                            duration-[320ms]
                            ease-[cubic-bezier(0.22,1,0.36,1)]

                            active:scale-[0.94]
                            active:border-fuchsia-300/34
                            active:bg-[rgba(22,16,28,.72)]
                            active:text-white
                        "
                    >
                        &lt;
                    </button>

                    <button
                        type="button"
                        aria-label="Ver add-ons siguientes"
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
                            text-[1.2rem]
                            leading-none
                            text-fuchsia-100/82

                            shadow-[0_0_18px_rgba(217,70,239,.08)]
                            backdrop-blur-md

                            transition-[border-color,background-color,color,transform,box-shadow]
                            duration-[320ms]
                            ease-[cubic-bezier(0.22,1,0.36,1)]

                            active:scale-[0.94]
                            active:border-fuchsia-300/34
                            active:bg-[rgba(22,16,28,.72)]
                            active:text-white
                        "
                    >
                        &gt;
                    </button>
                </div>
            </div>
        </motion.div>
    );
}