"use client";

import { motion } from "framer-motion";

import CtaLink from "@/components/ui/cta-link";
import PremiumCard from "@/components/ui/premium-card";
import PriceText from "@/components/ui/price-text";
import { packs } from "@/lib/services";
import { buildPackWhatsAppMessage } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/src/motion/useReducedMotion";

type Pack = (typeof packs)[number];

type PackCardProps = {
    pack: Pack;
    index: number;
};

export default function PackCard({
    pack,
    index,
}: PackCardProps) {
    const reducedMotion = useReducedMotion();

    return (
        <motion.div
            initial={
                reducedMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 34,
                        scale: 0.975,
                        filter: "blur(10px)",
                    }
            }
            whileInView={
                reducedMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        filter: "blur(0px)",
                    }
            }
            viewport={{
                once: true,
                amount: 0.22,
            }}
            transition={{
                duration: 0.92,
                delay: index * 0.18,
                ease: [0.16, 1, 0.3, 1],
            }}
            className="h-full"
        >
            <PremiumCard
                className={cn(
                    "rounded-[32px] p-7 md:p-8",
                    pack.featured
                        ? "border-fuchsia-500/24 bg-[radial-gradient(circle_at_top,rgba(217,70,239,.12),rgba(255,255,255,.035)_38%,rgba(255,255,255,.02)_100%)]"
                        : "border-white/[0.075] bg-white/[0.025]"
                )}
            >
                <div className="mb-6 flex min-h-[34px] items-center">
                    {pack.featured ? (
                        <span className="inline-flex rounded-full border border-fuchsia-500/20 bg-fuchsia-500/10 px-4 py-1.5 font-ui text-[0.68rem] uppercase tracking-[0.18em] text-fuchsia-200/80">
                            {pack.tag}
                        </span>
                    ) : (
                        <span className="font-ui text-[0.72rem] uppercase tracking-[0.2em] text-white/[0.38]">
                            {pack.tag}
                        </span>
                    )}
                </div>

                <h3 className="text-[2rem] font-medium leading-[0.95] tracking-[-0.045em] text-white">
                    {pack.name}
                </h3>

                <div className="mt-7">
                    <p className="font-ui text-[0.72rem] uppercase tracking-[0.18em] text-white/[0.38]">
                        Ideal para
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                        {pack.idealFor.map((item) => (
                            <span
                                key={item}
                                className="rounded-full border border-white/[0.06] px-3 py-1 text-xs text-white/[0.62]"
                            >
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-7 space-y-3">
                    {pack.includes.map((item) => (
                        <div
                            key={item}
                            className="flex gap-3 text-sm leading-6 text-white/[0.7]"
                        >
                            <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-fuchsia-400/60" />
                            <span>{item}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-8 border-t border-white/[0.06] pt-7">
                    <p className="font-ui text-[0.72rem] uppercase tracking-[0.18em] text-white/[0.38]">
                        Desde
                    </p>

                    <p className="mt-2 text-2xl font-semibold">
                        <PriceText variant="primary">
                            {pack.priceArs}
                        </PriceText>
                    </p>

                    <p className="text-sm font-medium">
                        <PriceText variant="secondary">
                            {pack.priceUsd}
                        </PriceText>
                    </p>

                    <p className="mt-3 text-xs leading-6 text-white/[0.42]">
                        Valor individual: {pack.individualValue}
                    </p>

                    <CtaLink
                        message={buildPackWhatsAppMessage(pack.name)}
                        className="mt-7 w-full"
                    >
                        Solicitar propuesta
                    </CtaLink>
                </div>
            </PremiumCard>
        </motion.div>
    );
}