import type { ReactNode } from "react";

import Reveal from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type SplitSectionIntroProps = {
    eyebrow: string;
    title: ReactNode;
    description: ReactNode;
    inverted?: boolean;
    titleAlign?: "left" | "right";
    gridClassName?: string;
    titleClassName?: string;
    descriptionClassName?: string;
};

export default function SplitSectionIntro({
    eyebrow,
    title,
    description,
    inverted = false,
    titleAlign = "left",
    gridClassName = "grid gap-8 lg:grid-cols-2 lg:items-center",
    titleClassName = "",
    descriptionClassName = "",
}: SplitSectionIntroProps) {
    const mobileTextAlign = inverted ? "text-right" : "text-left";
    const desktopTitleAlign =
        titleAlign === "right" ? "lg:text-right" : "lg:text-left";

    const titleBlock = (
        <Reveal>
            <div
                className={cn(
                    mobileTextAlign,
                    desktopTitleAlign,
                    inverted && "lg:ml-auto"
                )}
            >
                <span className="inline-flex rounded-full border border-fuchsia-500/16 bg-fuchsia-500/[0.055] px-4 py-2 font-ui text-[0.7rem] uppercase tracking-[0.22em] text-fuchsia-100/72">
                    {eyebrow}
                </span>

                <h2
                    className={cn(
                        "mt-7 font-display text-[clamp(2.5rem,6vw,5.8rem)] font-black leading-[0.9] tracking-[-0.055em] text-white",
                        titleAlign === "right" && "lg:ml-auto",
                        titleClassName
                    )}
                >
                    {title}
                </h2>
            </div>
        </Reveal>
    );

    const descriptionBlock = (
        <Reveal delay={0.08}>
            <p
                className={cn(
                    "max-w-[620px] text-sm leading-7 text-white/[0.62] md:text-base md:leading-8 lg:translate-y-[32px]",
                    inverted
                        ? "ml-auto text-right lg:ml-0 lg:text-left"
                        : "text-left lg:ml-auto lg:text-right",
                    descriptionClassName
                )}
            >
                {description}
            </p>
        </Reveal>
    );

    return (
        <div className={gridClassName}>
            {/* Mobile: orden lógico título → párrafo, con alineación intercalada */}
            <div className="contents lg:hidden">
                {titleBlock}
                {descriptionBlock}
            </div>

            {/* Desktop/tablet: conserva estructura visual original */}
            <div className="hidden lg:contents">
                {inverted ? (
                    <>
                        {descriptionBlock}
                        {titleBlock}
                    </>
                ) : (
                    <>
                        {titleBlock}
                        {descriptionBlock}
                    </>
                )}
            </div>
        </div>
    );
}