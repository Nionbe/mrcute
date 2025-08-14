"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { fadeIn, slideUp, scale, staggerContainer, cardHover } from "@/lib/animation-utils"

// Animated container that reveals its children with a stagger effect
export function AnimatedContainer({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

// Animated item that fades in
export function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

// Animated item that slides up
export function SlideUp({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      variants={slideUp}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

// Animated item that scales in
export function ScaleIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      variants={scale}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

// Animated card with hover effect
export function AnimatedCard({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}) {
  return (
    <motion.div
      className={className}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={cardHover}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}

// Animated list that reveals items one by one
export function AnimatedList({
  items,
  renderItem,
  className = "",
}: {
  items: any[]
  renderItem: (item: any, index: number) => React.ReactNode
  className?: string
}) {
  return (
    <motion.div className={className} variants={staggerContainer} initial="hidden" animate="visible">
      {items.map((item, index) => (
        <motion.div key={index} variants={slideUp} transition={{ delay: index * 0.05 }}>
          {renderItem(item, index)}
        </motion.div>
      ))}
    </motion.div>
  )
}

// Animated presence wrapper for mount/unmount animations
export function AnimatedTransition({
  children,
  show,
  className = "",
}: {
  children: React.ReactNode
  show: boolean
  className?: string
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div className={className} variants={fadeIn} initial="hidden" animate="visible" exit="exit">
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Loading spinner animation
export function LoadingSpinner({
  size = 24,
  color = "currentColor",
}: {
  size?: number
  color?: string
}) {
  return (
    <motion.div
      className="flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="rounded-full border-2 border-t-transparent"
        style={{
          width: size,
          height: size,
          borderColor: color,
          borderTopColor: "transparent",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />
    </motion.div>
  )
}
