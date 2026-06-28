import type { ReactNode } from "react";

import { buildWhatsAppHref, DEFAULT_BIA_WHATSAPP_MESSAGE } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type CtaLinkProps = {
    children: ReactNode;
    message?: string;
    className?: string;
};

export default function CtaLink({
    children,
    message = DEFAULT_BIA_WHATSAPP_MESSAGE,
    className = "",
}: CtaLinkProps) {
    return (
        <a
            href={buildWhatsAppHref(message)}
            target="_blank"
            rel="noreferrer"
            className={cn(
                `
                    group
                    relative
                    inline-flex
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border
                    border-white/10
                    bg-white/[0.04]
                    px-7
                    py-4
                    font-ui
                    text-sm
                    text-white/82
                    backdrop-blur-xl

                    transition-[border-color,box-shadow,transform,color]
                    duration-[380ms]
                    ease-[cubic-bezier(0.25,0.1,0.25,1)]

                    hover:-translate-y-[2px]
                    hover:border-fuchsia-500/30
                    hover:text-white
                    hover:shadow-[0_8px_28px_rgba(217,70,239,0.07)]

                    active:-translate-y-[1px]
                    active:border-fuchsia-500/30
                    active:text-white
                    active:shadow-[0_8px_28px_rgba(217,70,239,0.07)]
                `,
                className
            )}
        >
            {children}
        </a>
    );
}