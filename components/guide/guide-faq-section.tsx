"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import { homePageContent } from "@/lib/home-page-content";
import { cn } from "@/lib/utils";

export default function GuideFaqSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const handleQuestionClick = (index: number) => {
        setActiveIndex((current) => (current === index ? null : index));
    };

    return (
        <Section spacing="compact">
            <Container>
                <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
                    {/* INTRO — FIRST ON MOBILE / LEFT ON DESKTOP */}
                    <Reveal>
                        <div className="text-left">
                            <span className="inline-flex rounded-full border border-fuchsia-500/16 bg-fuchsia-500/[0.055] px-4 py-2 font-ui text-[0.7rem] uppercase tracking-[0.22em] text-fuchsia-100/72">
                                {homePageContent.faq.eyebrow}
                            </span>

                            <h2 className="mt-7 max-w-[720px] font-display text-[clamp(2.5rem,6vw,5.8rem)] font-black leading-[0.9] tracking-[-0.055em] text-white">
                                {homePageContent.faq.title}
                            </h2>

                            <p className="mt-6 max-w-[560px] text-sm leading-7 text-white/[0.62] md:text-base md:leading-8">
                                {homePageContent.faq.description}
                            </p>
                        </div>
                    </Reveal>

                    {/* FAQ ITEMS */}
                    <Reveal delay={0.08}>
                        <motion.div
                            layout
                            className="grid gap-3"
                            transition={{
                                layout: {
                                    duration: 0.34,
                                    ease: [0.22, 1, 0.36, 1],
                                },
                            }}
                        >
                            {homePageContent.faq.items.map((item, index) => {
                                const isActive = activeIndex === index;

                                return (
                                    <motion.div
                                        key={item.question}
                                        layout
                                        className="relative"
                                        transition={{
                                            layout: {
                                                duration: 0.34,
                                                ease: [0.22, 1, 0.36, 1],
                                            },
                                        }}
                                    >
                                        <motion.button
                                            type="button"
                                            layout
                                            onClick={() =>
                                                handleQuestionClick(index)
                                            }
                                            whileHover={{
                                                x: -5,
                                                rotate:
                                                    index % 2 === 0
                                                        ? -0.35
                                                        : 0.35,
                                            }}
                                            whileTap={{
                                                scale: 0.985,
                                            }}
                                            transition={{
                                                duration: 0.3,
                                                ease: [0.22, 1, 0.36, 1],
                                            }}
                                            className={cn(
                                                "group flex min-h-[58px] w-full items-center justify-between gap-4 rounded-[26px] border px-5 py-4 text-left backdrop-blur-xl transition-[border-color,background-color,color,box-shadow] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)] md:px-6",
                                                isActive
                                                    ? "border-fuchsia-300/20 bg-fuchsia-500/[0.06] text-white shadow-[0_0_34px_rgba(217,70,239,.052)]"
                                                    : "border-white/[0.075] bg-white/[0.024] text-white/[0.72] hover:border-fuchsia-300/16 hover:bg-white/[0.038] hover:text-white/88"
                                            )}
                                        >
                                            <span className="max-w-[620px] text-[1.02rem] font-medium leading-6 tracking-[-0.025em] md:text-[1.12rem]">
                                                {item.question}
                                            </span>

                                            <span
                                                className={cn(
                                                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-fuchsia-300/14 bg-white/[0.035] font-ui text-sm text-fuchsia-100/70 transition-[transform,border-color,color,background-color] duration-[360ms]",
                                                    isActive &&
                                                    "rotate-45 border-fuchsia-300/28 bg-fuchsia-500/[0.07] text-white"
                                                )}
                                            >
                                                +
                                            </span>
                                        </motion.button>

                                        <motion.div
                                            initial={false}
                                            animate={{
                                                gridTemplateRows: isActive
                                                    ? "1fr"
                                                    : "0fr",
                                                opacity: isActive ? 1 : 0,
                                                marginTop: isActive ? 12 : 0,
                                            }}
                                            transition={{
                                                gridTemplateRows: {
                                                    duration: 0.34,
                                                    ease: [0.22, 1, 0.36, 1],
                                                },
                                                opacity: {
                                                    duration: 0.24,
                                                    ease: [0.22, 1, 0.36, 1],
                                                },
                                                marginTop: {
                                                    duration: 0.34,
                                                    ease: [0.22, 1, 0.36, 1],
                                                },
                                            }}
                                            className="grid overflow-hidden"
                                            aria-hidden={!isActive}
                                        >
                                            <div className="min-h-0 overflow-hidden">
                                                <motion.div
                                                    initial={false}
                                                    animate={{
                                                        y: isActive ? 0 : -4,
                                                        scale: isActive
                                                            ? 1
                                                            : 0.992,
                                                        filter: isActive
                                                            ? "blur(0px)"
                                                            : "blur(3px)",
                                                    }}
                                                    transition={{
                                                        duration: 0.3,
                                                        ease: [
                                                            0.22, 1, 0.36, 1,
                                                        ],
                                                    }}
                                                    className="overflow-hidden rounded-[24px] border border-fuchsia-300/14 bg-white/[0.034] px-5 py-4 shadow-[0_16px_48px_rgba(0,0,0,.18),0_0_32px_rgba(217,70,239,.045)] backdrop-blur-xl md:px-6"
                                                >
                                                    <p className="text-sm leading-7 text-white/[0.64] md:text-[0.96rem] md:leading-7">
                                                        {item.answer}
                                                    </p>
                                                </motion.div>
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </Reveal>
                </div>
            </Container>
        </Section>
    );
}