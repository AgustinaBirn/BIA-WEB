import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PriceTextVariant = "primary" | "secondary" | "compact";

type PriceTextProps = {
    children: ReactNode;
    variant?: PriceTextVariant;
    className?: string;
};

const priceStyles: Record<PriceTextVariant, React.CSSProperties> = {
    primary: {
        backgroundImage:
            "linear-gradient(112deg, rgba(244,114,182,.78) 0%, rgba(217,70,239,.72) 48%, rgba(139,92,246,.66) 100%)",
        backgroundSize: "118% 100%",
        backgroundPosition: "50% 50%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        textShadow:
            "0 0 14px rgba(217,70,239,.045), 0 0 24px rgba(139,92,246,.028)",
        filter: "saturate(.86) brightness(.98)",
    },

    secondary: {
        backgroundImage:
            "linear-gradient(112deg, rgba(244,114,182,.64) 0%, rgba(217,70,239,.58) 48%, rgba(139,92,246,.56) 100%)",
        backgroundSize: "112% 100%",
        backgroundPosition: "52% 50%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        textShadow:
            "0 0 12px rgba(217,70,239,.035), 0 0 20px rgba(139,92,246,.024)",
        filter: "saturate(.82) brightness(.98)",
    },

    compact: {
        backgroundImage:
            "linear-gradient(112deg, rgba(244,114,182,.74) 0%, rgba(217,70,239,.68) 52%, rgba(139,92,246,.62) 100%)",
        backgroundSize: "112% 100%",
        backgroundPosition: "50% 50%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        color: "transparent",
        textShadow:
            "0 0 12px rgba(217,70,239,.04), 0 0 18px rgba(139,92,246,.026)",
        filter: "saturate(.84) brightness(1)",
    },
};

export default function PriceText({
    children,
    variant = "primary",
    className = "",
}: PriceTextProps) {
    return (
        <span
            className={cn(
                "inline-block transition-[filter] duration-[420ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                className
            )}
            style={priceStyles[variant]}
        >
            {children}
        </span>
    );
}