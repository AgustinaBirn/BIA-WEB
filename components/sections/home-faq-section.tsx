"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import Container from "@/components/ui/container";
import PremiumCard from "@/components/ui/premium-card";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import { homePageContent } from "@/lib/home-page-content";
import { cn } from "@/lib/utils";

export default function HomeFaqSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <Section spacing="compact">
            <Container>
                <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
                    <Reveal>
                        <div>
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

                    <div className="space-y-3">
                        {homePageContent.faq.items.map((item, index) => {
                            const isActive = activeIndex === index;

                            return (
                                <Reveal
                                    key={item.question}
                                    delay={index * 0.035}
                                >
                                    <PremiumCard
                                        liftOnHover={false}
                                        className={cn(
                                            "rounded-[26px] p-0",
                                            isActive && "border-fuchsia-400/18 bg-white/[0.034]"
                                        )}
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActiveIndex((current) =>
                                                    current === index ? null : index
                                                )
                                            }
                                            className="
                                                flex
                                                w-full
                                                items-start
                                                justify-between
                                                gap-5
                                                px-5
                                                py-5
                                                text-left
                                                md:px-6
                                            "
                                        >
                                            <span className="max-w-[620px] text-[1.05rem] font-medium leading-6 tracking-[-0.025em] text-white/88 md:text-[1.15rem]">
                                                {item.question}
                                            </span>

                                            <span
                                                className={cn(
                                                    "mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-fuchsia-300/14 bg-white/[0.035] font-ui text-sm text-fuchsia-100/70 transition-[transform,border-color,color,background-color] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                                                    isActive &&
                                                    "rotate-45 border-fuchsia-300/28 bg-fuchsia-500/[0.07] text-white"
                                                )}
                                            >
                                                +
                                            </span>
                                        </button>

                                        <AnimatePresence initial={false}>
                                            {isActive && (
                                                <motion.div
                                                    initial={{
                                                        height: 0,
                                                        opacity: 0,
                                                        filter: "blur(6px)",
                                                    }}
                                                    animate={{
                                                        height: "auto",
                                                        opacity: 1,
                                                        filter: "none",
                                                    }}
                                                    exit={{
                                                        height: 0,
                                                        opacity: 0,
                                                        filter: "blur(5px)",
                                                    }}
                                                    transition={{
                                                        duration: 0.42,
                                                        ease: [0.16, 1, 0.3, 1],
                                                    }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="border-t border-white/[0.055] px-5 pb-5 pt-4 md:px-6">
                                                        <p className="max-w-[680px] text-sm leading-7 text-white/[0.62] md:text-[0.96rem] md:leading-7">
                                                            {item.answer}
                                                        </p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </PremiumCard>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </Section>
    );
}