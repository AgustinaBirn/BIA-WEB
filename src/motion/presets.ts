// src/motion/presets.ts

import { motionTokens } from "./tokens";
import { easing } from "./easing";

export const buttonMotion = {
  whileHover: {
    y: -motionTokens.distance.micro,
    scale: motionTokens.scale.subtle,
  },

  whileTap: {
    scale: motionTokens.scale.tap,
  },

  transition: {
    duration: motionTokens.duration.base,
    ease: easing.smooth,
  },
};

export const cardMotion = {
  whileHover: {
    y: -motionTokens.distance.small,
  },

  transition: {
    duration: motionTokens.duration.base,
    ease: easing.smooth,
  },
};

export const sectionReveal = {
  initial: { opacity: 0, y: 12 },

  whileInView: {
    opacity: 1,
    y: 0,
  },

  transition: {
    duration: motionTokens.duration.slow,
    ease: easing.smooth,
  },
};

export const staggerContainer = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

export const navbarMotion = {
  initial: {
    opacity: 0,
    y: -10,
  },

  animate: {
    opacity: 1,
    y: 0,
  },

  transition: {
    duration: motionTokens.duration.base,
    ease: easing.smooth,
  },
};

export const heroReveal = {
  initial: {
    opacity: 0,
    y: 16,
  },

  animate: {
    opacity: 1,
    y: 0,
  },

  transition: {
    duration: 0.8,
    ease: easing.smooth,
  },
};

export const bloomMotion = {
  initial: {
    opacity: 0,
  },

  whileHover: {
    opacity: 1,
  },

  transition: {
    duration: 0.45,
    ease: easing.smooth,
  },
};

export const heroAmbientMotion = {
  animate: {
    opacity: [0.4, 0.58, 0.4],
    scale: [1, 1.06, 1],
  },

  transition: {
    duration: 14,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const heroAmbientSecondaryMotion = {
  animate: {
    opacity: [0.3, 0.48, 0.3],
    scale: [1, 1.05, 1],
  },

  transition: {
    duration: 11,
    repeat: Infinity,
    ease: "easeInOut",
    delay: 2.5,
  },
};

export const navbarReveal = {
  initial: {
    y: -80,
    opacity: 0,
  },

  animate: {
    y: 0,
    opacity: 1,
  },

  transition: {
    duration: 0.9,
    ease: [0.22, 1, 0.36, 1],
  },
};
