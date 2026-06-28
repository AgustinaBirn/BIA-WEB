"use client";

import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

type DiagnosticOptionSelectProps = {
    id: string;
    label: string;
    value: string;
    options: string[];
    placeholder?: string;
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onChange: (value: string) => void;
};

const labelClassName =
    "font-ui text-[0.68rem] uppercase tracking-[0.18em] text-white/[0.38]";

export default function DiagnosticOptionSelect({
    id,
    label,
    value,
    options,
    placeholder = "Seleccionar",
    isOpen,
    onOpenChange,
    onChange,
}: DiagnosticOptionSelectProps) {

    return (
        <div
            className={cn(
                "relative grid gap-2",
                isOpen ? "z-[80]" : "z-10"
            )}
        >
            <label
                htmlFor={id}
                className={labelClassName}
            >
                {label}
            </label>

            <button
                id={id}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() => onOpenChange(!isOpen)}
                className={cn(
                    "group relative flex w-full items-center justify-between gap-4 rounded-[16px] border px-4 py-3 text-left text-sm outline-none backdrop-blur-xl",
                    "transition-[border-color,background-color,box-shadow,transform] duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                    value
                        ? "border-fuchsia-300/16 bg-white/[0.045] text-white/86"
                        : "border-white/[0.075] bg-white/[0.035] text-white/[0.42]",
                    "hover:border-fuchsia-400/24 hover:bg-white/[0.052] hover:shadow-[0_0_28px_rgba(217,70,239,.045)]",
                    "focus-visible:border-fuchsia-400/30 focus-visible:shadow-[0_0_30px_rgba(217,70,239,.065)]",
                    isOpen && "border-fuchsia-400/28 bg-white/[0.055] shadow-[0_0_34px_rgba(217,70,239,.06)]"
                )}
            >
                <span className="relative z-10 line-clamp-1">
                    {value?.trim() ? value : placeholder}
                </span>

                <span
                    className={cn(
                        "relative z-10 text-fuchsia-100/58 transition-transform duration-[360ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                        isOpen && "rotate-180 text-fuchsia-100/82"
                    )}
                >
                    ⌄
                </span>

                <span className="pointer-events-none absolute inset-0 rounded-[16px] bg-[radial-gradient(circle_at_top_right,rgba(217,70,239,.08),transparent_42%)] opacity-0 transition-opacity duration-[360ms] group-hover:opacity-100" />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{
                            opacity: 0,
                            y: -8,
                            scale: 0.985,
                            filter: "blur(8px)",
                        }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            filter: "none",
                        }}
                        exit={{
                            opacity: 0,
                            y: -6,
                            scale: 0.99,
                            filter: "blur(6px)",
                        }}
                        transition={{
                            duration: 0.32,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        role="listbox"
                        className="
    absolute
    left-0
    right-0
    top-full
    z-[90]

    mt-2
    max-h-[190px]
    overflow-y-auto
    overscroll-contain
    bia-select-scroll

    rounded-[20px]
    border
    border-fuchsia-300/12
    bg-[rgba(12,10,15,.96)]
    p-2

    shadow-[0_18px_70px_rgba(0,0,0,.36),0_0_42px_rgba(217,70,239,.085)]
    backdrop-blur-2xl

    md:max-h-[210px]
    lg:max-h-[220px]
"
                    >
                        <div className="grid gap-1.5">
                            {options.map((option) => {
                                const isSelected = option === value;

                                return (
                                    <button
                                        key={option}
                                        type="button"
                                        role="option"
                                        aria-selected={isSelected}
                                        onClick={() => {
                                            onChange(option);
                                            onOpenChange(false);
                                        }}
                                        className={cn(
                                            "group/option relative overflow-hidden rounded-[15px] px-3.5 py-3 text-left text-sm outline-none",
                                            "transition-[background-color,border-color,color,transform,box-shadow] duration-[320ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
                                            isSelected
                                                ? "bg-fuchsia-500/[0.105] text-white shadow-[0_0_24px_rgba(217,70,239,.06)]"
                                                : "bg-white/[0.025] text-white/[0.66] hover:bg-white/[0.055] hover:text-white/88"
                                        )}
                                    >
                                        <span className="relative z-10">
                                            {option}
                                        </span>

                                        <span
                                            className={cn(
                                                "pointer-events-none absolute left-0 top-1/2 h-[42%] w-[2px] -translate-y-1/2 rounded-full bg-gradient-to-b from-fuchsia-300/70 to-violet-300/35 transition-opacity duration-[320ms]",
                                                isSelected
                                                    ? "opacity-100"
                                                    : "opacity-0 group-hover/option:opacity-70"
                                            )}
                                        />

                                        <span className="pointer-events-none absolute inset-0 rounded-[15px] bg-[radial-gradient(circle_at_top_right,rgba(217,70,239,.08),transparent_46%)] opacity-0 transition-opacity duration-[320ms] group-hover/option:opacity-100" />
                                    </button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}