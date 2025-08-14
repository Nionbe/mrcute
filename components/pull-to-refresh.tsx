"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
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
