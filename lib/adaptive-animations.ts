"use client"

import type { Variants } from "framer-motion"

// Base animation variants
const baseVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideIn: {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    exit: {},
  },
}

// Mobile-optimized animation variants (simpler, faster)
const mobileVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 10 }, // Reduced distance
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  },
  slideIn: {
    hidden: { opacity: 0, x: 10 }, // Reduced distance
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.95 }, // Less scaling
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05, // Faster staggering
      },
    },
    exit: {},
  },
}

// Touch-specific animation variants (optimized for touch interactions)
const touchVariants = {
  tap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
  press: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
  swipe: (direction: "left" | "right" | "up" | "down") => {
    const axis = direction === "left" || direction === "right" ? "x" : "y"
    const factor = direction === "right" || direction === "down" ? 1 : -1

    return {
      [axis]: 10 * factor,
      transition: { duration: 0.2 },
    }
  },
}

// Get appropriate animation variants based on device type
export function getAdaptiveAnimations(isMobile: boolean, isTouch: boolean) {
  const baseAnimations = isMobile ? mobileVariants : baseVariants

  return {
    ...baseAnimations,
    ...(isTouch && { touch: touchVariants }),
    // Transition durations
    durations: {
      fast: isMobile ? 0.15 : 0.2,
      medium: isMobile ? 0.25 : 0.3,
      slow: isMobile ? 0.35 : 0.5,
    },
    // Transition easings
    easings: {
      smooth: [0.4, 0.0, 0.2, 1], // Material Design standard easing
      accelerate: [0.4, 0.0, 1, 1], // Accelerate easing
      decelerate: [0.0, 0.0, 0.2, 1], // Decelerate easing
      sharp: [0.4, 0.0, 0.6, 1], // Sharp easing
    },
  }
}

// Helper function to create adaptive variants
export function createAdaptiveVariants(variantName: keyof typeof baseVariants, isMobile: boolean): Variants {
  return isMobile ? mobileVariants[variantName] : baseVariants[variantName]
}
