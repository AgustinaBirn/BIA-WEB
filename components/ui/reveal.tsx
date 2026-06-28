"use client";

import { motion } from "framer-motion";
import { sectionReveal } from "@/src/motion/presets";
import { useReducedMotion } from "@/src/motion/useReducedMotion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={sectionReveal.initial}
      whileInView={sectionReveal.whileInView}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        ...sectionReveal.transition,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}