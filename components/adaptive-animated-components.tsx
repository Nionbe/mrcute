"use client"

import { useRef } from "react"

import { useState } from "react"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useMobileDetection } from "@/hooks/use-mobile-detection"
import { getAdaptiveAnimations, createAdaptiveVariants } from "@/lib/adaptive-animations"

// Adaptive container that adjusts animations based on device
export function AdaptiveContainer({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { isMobile, isTouch } = useMobileDetection()
  const animations = getAdaptiveAnimations(isMobile, isTouch)

  return (
    <motion.div
      className={className}
      variants={createAdaptiveVariants("staggerContainer", isMobile)}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        delay,
        duration: animations.durations.medium,
        ease: animations.easings.smooth,
      }}
    >
      {children}
    </motion.div>
  )
}

// Adaptive fade in animation
export function AdaptiveFadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { isMobile, isTouch } = useMobileDetection()
  const animations = getAdaptiveAnimations(isMobile, isTouch)

  return (
    <motion.div
      className={className}
      variants={createAdaptiveVariants("fadeIn", isMobile)}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        delay,
        duration: animations.durations.medium,
        ease: animations.easings.smooth,
      }}
    >
      {children}
    </motion.div>
  )
}

// Adaptive slide up animation
export function AdaptiveSlideUp({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { isMobile, isTouch } = useMobileDetection()
  const animations = getAdaptiveAnimations(isMobile, isTouch)

  return (
    <motion.div
      className={className}
      variants={createAdaptiveVariants("slideUp", isMobile)}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        delay,
        duration: animations.durations.medium,
        ease: animations.easings.smooth,
      }}
    >
      {children}
    </motion.div>
  )
}

// Adaptive scale animation
export function AdaptiveScaleIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { isMobile, isTouch } = useMobileDetection()
  const animations = getAdaptiveAnimations(isMobile, isTouch)

  return (
    <motion.div
      className={className}
      variants={createAdaptiveVariants("scale", isMobile)}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{
        delay,
        duration: animations.durations.medium,
        ease: animations.easings.smooth,
      }}
    >
      {children}
    </motion.div>
  )
}

// Adaptive card with touch-optimized hover/tap effects
export function AdaptiveCard({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  const { isMobile, isTouch } = useMobileDetection()

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={!isTouch ? { y: -5, transition: { duration: 0.2 } } : undefined}
      whileTap={isTouch ? { scale: 0.98, transition: { duration: 0.1 } } : undefined}
      transition={{ duration: isMobile ? 0.2 : 0.3 }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

// Adaptive list with staggered animations
export function AdaptiveList({
  items,
  renderItem,
  className = "",
}: {
  items: any[]
  renderItem: (item: any, index: number) => React.ReactNode
  className?: string
}) {
  const { isMobile } = useMobileDetection()

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={createAdaptiveVariants("staggerContainer", isMobile)}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={createAdaptiveVariants("slideUp", isMobile)}
          transition={{ delay: isMobile ? index * 0.03 : index * 0.05 }}
        >
          {renderItem(item, index)}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Adaptive page transition
export function AdaptivePageTransition({
  children,
}: {
  children: React.ReactNode
}) {
  const { isMobile } = useMobileDetection()
  const animations = getAdaptiveAnimations(isMobile, false)

  return (
    <motion.div
      initial={{ opacity: 0, y: isMobile ? 5 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: isMobile ? -5 : -10 }}
      transition={{
        duration: animations.durations.medium,
        ease: animations.easings.smooth,
      }}
    >
      {children}
    </motion.div>
  )
}

// Touch-optimized button with feedback
export function TouchButton({
  children,
  className = "",
  onClick,
  disabled = false,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
}) {
  const { isTouch } = useMobileDetection()

  return (
    <motion.button
      className={className}
      whileTap={isTouch && !disabled ? { scale: 0.95 } : undefined}
      whileHover={!isTouch && !disabled ? { scale: 1.05 } : undefined}
      transition={{ duration: 0.1 }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  )
}

// Mobile-optimized drawer animation
export function MobileDrawer({
  isOpen,
  onClose,
  children,
  position = "bottom",
}: {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  position?: "bottom" | "left" | "right"
}) {
  const variants = {
    bottom: {
      hidden: { y: "100%" },
      visible: { y: 0 },
    },
    left: {
      hidden: { x: "-100%" },
      visible: { x: 0 },
    },
    right: {
      hidden: { x: "100%" },
      visible: { x: 0 },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className={`fixed z-50 bg-white rounded-t-xl ${
              position === "bottom"
                ? "bottom-0 left-0 right-0"
                : position === "left"
                  ? "left-0 top-0 bottom-0 w-4/5 max-w-xs"
                  : "right-0 top-0 bottom-0 w-4/5 max-w-xs"
            }`}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants[position]}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Pull-to-refresh animation
export function PullToRefresh({
  onRefresh,
  children,
}: {
  onRefresh: () => Promise<void>
  children: React.ReactNode
}) {
  const [isPulling, setIsPulling] = useState(false)
  const [pullProgress, setPullProgress] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const pullThreshold = 80 // pixels to trigger refresh
  const startY = useRef(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY
    const diff = currentY - startY.current

    // Only allow pulling down when at the top of the page
    if (window.scrollY === 0 && diff > 0) {
      setIsPulling(true)
      setPullProgress(Math.min(diff / pullThreshold, 1))
      e.preventDefault()
    }
  }

  const handleTouchEnd = async () => {
    if (isPulling) {
      if (pullProgress >= 1) {
        setIsRefreshing(true)
        try {
          await onRefresh()
        } finally {
          setIsRefreshing(false)
        }
      }
      setIsPulling(false)
      setPullProgress(0)
    }
  }

  return (
    <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <motion.div
        className="w-full flex justify-center items-center overflow-hidden"
        animate={{ height: isPulling ? `${pullProgress * pullThreshold}px` : 0 }}
      >
        <motion.div
          animate={{
            rotate: isRefreshing ? 360 : 0,
            scale: isPulling ? pullProgress : 0,
          }}
          transition={{
            rotate: { repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" },
            scale: { duration: 0.2 },
          }}
          className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full"
        />
      </motion.div>
      {children}
    </div>
  )
}
