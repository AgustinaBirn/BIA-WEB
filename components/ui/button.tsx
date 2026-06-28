"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { buttonMotion } from "@/src/motion/presets";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonProps = HTMLMotionProps<"button"> & {
    variant?: ButtonVariant;
};

const baseClasses = `
  relative
  inline-flex
  items-center
  justify-center
  rounded-full
  px-8
  py-4
  text-sm
  font-medium
  outline-none
  transition-[border-color,box-shadow,color,background-color]
  duration-[380ms]
  ease-[cubic-bezier(0.25,0.1,0.25,1)]
`;

const variantClasses: Record<ButtonVariant, string> = {
    primary: `
    border
    border-white/10
    bg-white/[0.04]
    text-white/85
    backdrop-blur-xl
    hover:border-fuchsia-500/30
    hover:shadow-[0_8px_28px_rgba(217,70,239,0.07)]
    hover:text-white
    active:border-fuchsia-500/30
    focus-visible:border-fuchsia-500/30
  `,

    secondary: `
    border
    border-white/10
    bg-transparent
    text-white/70
    hover:text-white/90
    focus-visible:text-white/90
  `,

    ghost: `
    border
    border-transparent
    bg-transparent
    text-white/62
    hover:text-white/90
    focus-visible:text-white/90
  `,
};

export default function Button({
    variant = "primary",
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <motion.button
            {...buttonMotion}
            className={cn(
                baseClasses,
                variantClasses[variant],
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}