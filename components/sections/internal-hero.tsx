"use client";

import { motion } from "framer-motion";

import Container from "@/components/ui/container";
import CtaLink from "@/components/ui/cta-link";
import Reveal from "@/components/ui/reveal";
import Section from "@/components/ui/section";
import { useHeroCursorAura } from "@/src/hooks/useHeroCursorAura";

type InternalHeroProps = {
    eyebrow: string;
    titleLineOne: string;
    titleLineTwo: string;
    description: string;
    ctaLabel: string;
    ctaMessage: string;
    mobileTitleLines?: string[];
    mobileTitleClassName?: string;
    mobileTitleGapBeforeIndex?: number;
};

export default function InternalHero({
    eyebrow,
    titleLineOne,
    titleLineTwo,
    description,
    ctaLabel,
    ctaMessage,
    mobileTitleLines,
    mobileTitleClassName = "",
    mobileTitleGapBeforeIndex
}: InternalHeroProps) {
    const { auraRef, heroRef, isMobile, reducedMotion } = useHeroCursorAura();

    return (
        <div ref={heroRef} data-hero-aura-zone="true">
            <Section
                spacing="none"
                className="relative min-h-screen overflow-hidden flex items-center justify-center pt-32 pb-20"
            >
                {/* ATMOSPHERIC DEPTH */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={
                            reducedMotion
                                ? {}
                                : {
                                    opacity: [0.4, 0.58, 0.4],
                                    scale: [1, 1.06, 1],
                                }
                        }
                        transition={{
                            duration: 14,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-[4%] right-[6%] w-[400px] h-[400px] rounded-full blur-[130px] bg-fuchsia-500/25"
                    />

                    <motion.div
                        animate={
                            reducedMotion
                                ? {}
                                : {
                                    opacity: [0.3, 0.48, 0.3],
                                    scale: [1, 1.05, 1],
                                }
                        }
                        transition={{
                            duration: 11,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2.5,
                        }}
                        className="absolute bottom-[6%] left-[4%] w-[340px] h-[340px] rounded-full blur-[100px] bg-violet-500/20"
                    />
                </div>

                {/* CURSOR AURA */}
                {!isMobile && (
                    <div
                        ref={auraRef}
                        className="absolute inset-0 pointer-events-none z-10"
                    />
                )}

                {/* MOBILE FALLBACK */}
                {isMobile && (
                    <motion.div
                        animate={
                            reducedMotion
                                ? {}
                                : {
                                    opacity: [0.22, 0.38, 0.22],
                                    scale: [1, 1.1, 1],
                                    x: [0, 16, -10, 0],
                                    y: [0, -12, 8, 0],
                                }
                        }
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-[22%] left-1/2 -translate-x-1/2 w-[280px] h-[280px] rounded-full blur-[90px] bg-fuchsia-500/20 pointer-events-none"
                    />
                )}

                {/* GRID TEXTURE */}
                <div className="absolute inset-0 opacity-[0.024] pointer-events-none">
                    <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.7)_1px,transparent_1px)] bg-[size:82px_82px]" />
                </div>

                <Container className="relative z-20">
                    <div className="mx-auto flex max-w-[1100px] flex-col items-center text-center">
                        <Reveal>
                            <span className="font-ui text-[0.72rem] uppercase tracking-[0.28em] text-white/[0.42]">
                                {eyebrow}
                            </span>
                        </Reveal>

                        <Reveal delay={0.08}>
                            <h1
                                className="
                  mt-7
                  font-display
                  text-[clamp(3.8rem,13vw,4.4rem)]
                  sm:text-[3.8rem]
                  md:text-[5.6rem]
                  xl:text-[8rem]
                  2xl:text-[9rem]
                  leading-[0.88]
                  tracking-[-0.06em]
                  font-black
                  md:whitespace-nowrap
                "
                            >
                                {mobileTitleLines ? (
                                    <>
                                        <span className={`md:hidden ${mobileTitleClassName}`}>
                                            {mobileTitleLines.map((line, index) => {
                                                const shouldAddSentenceGap =
                                                    typeof mobileTitleGapBeforeIndex === "number" &&
                                                    index === mobileTitleGapBeforeIndex;

                                                return (
                                                    <span
                                                        key={line}
                                                        className={`
          block
          whitespace-nowrap
          ${shouldAddSentenceGap ? "mt-2" : ""}
        `}
                                                    >
                                                        {line}
                                                    </span>
                                                );
                                            })}
                                        </span>

                                        <span className="hidden md:inline">
                                            {titleLineOne}
                                            <br />
                                            {titleLineTwo}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        {titleLineOne}
                                        <br />
                                        {titleLineTwo}
                                    </>
                                )}
                            </h1>
                        </Reveal>

                        <Reveal delay={0.16}>
                            <p className="mx-auto mt-10 max-w-[760px] text-base md:text-[1.12rem]">
                                {description}
                            </p>
                        </Reveal>

                        <Reveal delay={0.24}>
                            <div className="mt-14 flex items-center justify-center">
                                <CtaLink message={ctaMessage}>
                                    {ctaLabel}
                                </CtaLink>
                            </div>
                        </Reveal>
                    </div>
                </Container>
            </Section>
        </div>
    );
}