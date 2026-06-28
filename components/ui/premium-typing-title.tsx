"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/src/motion/useReducedMotion";

type Segment = {
    text: string;
    accent?: boolean;
};

type PremiumTypingTitleProps = {
    segments: Segment[];
    className?: string;
};

type WordToken = {
    type: "word";
    value: string;
    accent?: boolean;
    startIndex: number;
};

type SpaceToken = {
    type: "space";
    value: string;
};

type Token = WordToken | SpaceToken;

const visualGradient =
    "linear-gradient(108deg, #F5F3EF 0%, rgba(245,243,239,.96) 24%, rgba(232,180,228,.82) 46%, rgba(217,70,239,.72) 68%, rgba(139,92,246,.68) 100%)";

function tokenizeSegments(segments: Segment[]) {
    const tokens: Token[] = [];
    let characterIndex = 0;

    segments.forEach((segment) => {
        const parts = segment.text.match(/\S+|\s+/g) ?? [];

        parts.forEach((part) => {
            const isSpace = /^\s+$/.test(part);

            if (isSpace) {
                tokens.push({
                    type: "space",
                    value: " ",
                });

                return;
            }

            tokens.push({
                type: "word",
                value: part,
                accent: segment.accent,
                startIndex: characterIndex,
            });

            characterIndex += Array.from(part).length;
        });
    });

    return tokens;
}

function getAccentLetterStyle(charIndex: number, totalLetters: number) {
    const safeTotal = Math.max(totalLetters - 1, 1);
    const position = (charIndex / safeTotal) * 100;
    const isFirstLetter = charIndex === 0;

    return {
        backgroundImage: visualGradient,
        backgroundSize: `${totalLetters * 115}% 100%`,
        backgroundPosition: `${position}% 50%`,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        textShadow: "0 0 12px rgba(217,70,239,0.035)",

        paddingRight: isFirstLetter ? "0.045em" : undefined,
        marginRight: isFirstLetter ? "-0.045em" : undefined,
    } as React.CSSProperties;
}

export default function PremiumTypingTitle({
    segments,
    className = "",
}: PremiumTypingTitleProps) {
    const reducedMotion = useReducedMotion();

    const tokens = tokenizeSegments(segments);
    const fullText = segments.map((segment) => segment.text).join("");

    return (
        <span
            aria-label={fullText}
            className={className}
        >
            {tokens.map((token, tokenIndex) => {
                if (token.type === "space") {
                    return " ";
                }

                const letters = Array.from(token.value);

                return (
                    <span
                        key={`${token.value}-${tokenIndex}`}
                        aria-hidden="true"
                        className="inline-block whitespace-nowrap"
                    >
                        {letters.map((char, charIndex) => {
                            const globalIndex = token.startIndex + charIndex;

                            const style = token.accent
                                ? getAccentLetterStyle(charIndex, letters.length)
                                : undefined;

                            if (reducedMotion) {
                                return (
                                    <span
                                        key={`${token.value}-${charIndex}`}
                                        className="inline-block"
                                        style={style}
                                    >
                                        {char}
                                    </span>
                                );
                            }

                            return (
                                <motion.span
                                    key={`${token.value}-${charIndex}`}
                                    initial={{
                                        opacity: 0,
                                        filter: "blur(6px)",
                                    }}
                                    whileInView={{
                                        opacity: 1,
                                        filter: "blur(0px)",
                                    }}
                                    viewport={{
                                        once: true,
                                        amount: 0.75,
                                    }}
                                    transition={{
                                        duration: 0.62,
                                        delay: 0.08 + globalIndex * 0.031,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="inline-block will-change-[opacity,filter]"
                                    style={style}
                                >
                                    {char}
                                </motion.span>
                            );
                        })}
                    </span>
                );
            })}
        </span>
    );
}