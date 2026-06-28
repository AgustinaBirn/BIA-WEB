"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type PremiumCardProps = Omit<ComponentPropsWithoutRef<"article">, "children"> & {
    children: ReactNode;
    contentClassName?: string;
    overflow?: "hidden" | "visible";
    liftOnHover?: boolean;
    glowOnHover?: boolean;
};

const premiumCardBase =
    "group relative h-full border border-white/[0.075] bg-white/[0.026] backdrop-blur-sm transition-[transform,border-color,background-color,box-shadow] duration-[680ms] ease-[cubic-bezier(0.16,1,0.3,1)] [box-shadow:0_22px_72px_rgba(0,0,0,.26),0_0_34px_rgba(217,70,239,.045),0_0_42px_rgba(139,92,246,.032)] hover:border-fuchsia-500/22 hover:bg-white/[0.043] hover:[box-shadow:0_30px_92px_rgba(0,0,0,.32),0_0_48px_rgba(217,70,239,.068),0_0_56px_rgba(139,92,246,.048)] active:border-fuchsia-500/22 active:bg-white/[0.043] active:[box-shadow:0_28px_84px_rgba(0,0,0,.30),0_0_44px_rgba(217,70,239,.064),0_0_52px_rgba(139,92,246,.046)]";

function PremiumCardGlow() {
    return (
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[680ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-active:opacity-100">
            <div
                className="
          absolute
          right-[-22%]
          top-[-28%]

          h-[280px]
          w-[280px]

          rounded-full
          blur-[90px]

          bg-fuchsia-500/10
        "
            />

            <div
                className="
          absolute
          left-[-22%]
          bottom-[-28%]

          h-[280px]
          w-[280px]

          rounded-full
          blur-[90px]

          bg-fuchsia-500/10
        "
            />
        </div>
    );
}

export default function PremiumCard({
    children,
    className,
    contentClassName,
    overflow = "hidden",
    liftOnHover = true,
    glowOnHover = true,
    ...props
}: PremiumCardProps) {
    return (
        <article
            className={cn(
                premiumCardBase,
                overflow === "visible" ? "overflow-visible" : "overflow-hidden",
                liftOnHover && "hover:-translate-y-2 active:-translate-y-[5px]",
                className
            )}
            {...props}
        >
            {glowOnHover && <PremiumCardGlow />}

            <div className={cn("relative z-10", contentClassName)}>
                {children}
            </div>
        </article>
    );
}