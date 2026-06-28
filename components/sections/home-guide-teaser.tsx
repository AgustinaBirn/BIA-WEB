"use client";

import { motion } from "framer-motion";
import { useState } from "react";

import Container from "@/components/ui/container";
import Reveal from "@/components/ui/reveal";
import RouteAwareLink from "@/components/ui/route-aware-link";
import Section from "@/components/ui/section";
import { homePageContent } from "@/lib/home-page-content";
import { cn } from "@/lib/utils";

export default function HomeGuideTeaser() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const handleQuestionClick = (index: number) => {
        setActiveIndex((current) => (current === index ? null : index));
    };

    return (
        <Section spacing="compact">
            <Container>
                <div className="grid gap-10 lg:grid-cols-[0.46fr_0.54fr] lg:items-center">
                    {/* RIGHT IN DESKTOP / FIRST IN MOBILE */}
                    <div className="order-1 lg:order-2">
                        <Reveal delay={0.08}>
                            <div className="text-left lg:text-right">
                                <span className="inline-flex rounded-full border border-fuchsia-500/16 bg-fuchsia-500/[0.055] px-4 py-2 font-ui text-[0.7rem] uppercase tracking-[0.22em] text-fuchsia-100/72">
                                    {homePageContent.guideTeaser.eyebrow}
                                </span>

                                <h2 className="mt-7 ml-0 max-w-[820px] font-display text-[clamp(2.45rem,6vw,5.6rem)] font-black leading-[0.9] tracking-[-0.055em] text-white lg:ml-auto">
                                    {homePageContent.guideTeaser.title}
                                </h2>

                                <p className="mt-6 ml-0 max-w-[660px] text-sm leading-7 text-white/[0.62] md:text-base md:leading-8 lg:ml-auto">
                                    {homePageContent.guideTeaser.description}
                                </p>
                            </div>
                        </Reveal>
                    </div>

                    {/* LEFT IN DESKTOP / SECOND IN MOBILE */}
                    <div className="order-2 lg:order-1">
                        <Reveal>
                            <div className="lg:pr-8">
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
                                    {homePageContent.guideTeaser.questions.map(
                                        (item, index) => {
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
                                                                    ? -0.45
                                                                    : 0.45,
                                                        }}
                                                        whileTap={{
                                                            scale: 0.985,
                                                        }}
                                                        transition={{
                                                            duration: 0.3,
                                                            ease: [0.22, 1, 0.36, 1],
                                                        }}
                                                        className={cn(
                                                            "group flex min-h-[52px] w-full items-center justify-between gap-4 rounded-full border px-5 py-3 text-left backdrop-blur-xl transition-[border-color,background-color,color,box-shadow] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                                                            isActive
                                                                ? "border-fuchsia-300/22 bg-fuchsia-500/[0.07] text-white shadow-[0_0_30px_rgba(217,70,239,.055)]"
                                                                : "border-white/[0.075] bg-black/10 text-white/[0.68] hover:border-fuchsia-300/18 hover:bg-white/[0.04] hover:text-white/88 hover:shadow-[0_0_26px_rgba(217,70,239,.04)]"
                                                        )}
                                                    >
                                                        <span className="text-sm leading-6">
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
                                                                    scale: isActive ? 1 : 0.992,
                                                                    filter: isActive
                                                                        ? "blur(0px)"
                                                                        : "blur(3px)",
                                                                }}
                                                                transition={{
                                                                    duration: 0.3,
                                                                    ease: [0.22, 1, 0.36, 1],
                                                                }}
                                                                className="overflow-hidden rounded-[24px] border border-fuchsia-300/14 bg-white/[0.034] px-5 py-4 shadow-[0_16px_48px_rgba(0,0,0,.18),0_0_32px_rgba(217,70,239,.045)] backdrop-blur-xl"
                                                            >
                                                                <p className="text-sm leading-7 text-white/[0.64]">
                                                                    {item.answer}
                                                                </p>
                                                            </motion.div>
                                                        </div>
                                                    </motion.div>
                                                </motion.div>
                                            );
                                        }
                                    )}
                                </motion.div>

                                <RouteAwareLink
                                    href="/guia"
                                    className="mt-8 inline-flex rounded-full border border-white/[0.1] bg-white/[0.035] px-7 py-4 font-ui text-sm text-white/78 transition-[border-color,box-shadow,transform,color] duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[2px] hover:border-fuchsia-400/28 hover:text-white hover:shadow-[0_8px_28px_rgba(217,70,239,0.075)]"
                                >
                                    {homePageContent.guideTeaser.ctaLabel}
                                </RouteAwareLink>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </Container>
        </Section>
    );
}