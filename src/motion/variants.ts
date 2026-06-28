// src/motion/variants.ts

export const buttonVariants = {
  primary: {
    hover: {
      y: -2,
      scale: 1.015,
    },
    tap: {
      scale: 0.985,
    },
  },

  ghost: {
    hover: {
      y: -1,
    },
    tap: {
      scale: 0.99,
    },
  },

  minimal: {
    hover: {
      y: 0,
    },
    tap: {
      scale: 1,
    },
  },
};