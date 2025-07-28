"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, type PanInfo, useAnimation } from "framer-motion"

interface SwipeableCardProps {
  children: React.ReactNode
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  leftAction?: {
    label: string
    color: string
    icon?: React.ReactNode
  }
  rightAction?: {
    label: string
    color: string
    icon?: React.ReactNode
  }
  threshold?: number
}

export function SwipeableCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  leftAction,
  rightAction,
  threshold = 100,
}: SwipeableCardProps) {
  const controls = useAnimation()
  const [isDragging, setIsDragging] = useState(false)
  const constraintsRef = useRef(null)

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false)

    if (info.offset.x > threshold && onSwipeRight) {
      controls.start({ x: "100%", opacity: 0 })
      onSwipeRight()
    } else if (info.offset.x < -threshold && onSwipeLeft) {
      controls.start({ x: "-100%", opacity: 0 })
      onSwipeLeft()
    } else {
      controls.start({ x: 0 })
    }
  }

  return (
    <div className="relative overflow-hidden" ref={constraintsRef}>
      {/* Background actions */}
      <div className="absolute inset-0 flex justify-between items-center px-4">
        {leftAction && (
          <div className="flex items-center justify-center h-full" style={{ color: leftAction.color }}>
            {leftAction.icon}
            <span className="ml-2 font-medium">{leftAction.label}</span>
          </div>
        )}

        {rightAction && (
          <div className="flex items-center justify-center h-full ml-auto" style={{ color: rightAction.color }}>
            <span className="mr-2 font-medium">{rightAction.label}</span>
            {rightAction.icon}
          </div>
        )}
      </div>

      {/* Swipeable card */}
      <motion.div
        drag="x"
        dragConstraints={constraintsRef}
        dragElastic={0.1}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        animate={controls}
        className={`bg-white rounded-lg shadow-sm ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
