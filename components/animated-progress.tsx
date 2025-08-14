"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AnimatedProgressProps {
  value: number
  max?: number
  className?: string
  barClassName?: string
  showValue?: boolean
  label?: string
  size?: "sm" | "md" | "lg"
  color?: "default" | "success" | "warning" | "danger" | "info"
  animated?: boolean
}

export function AnimatedProgress({
  value,
  max = 100,
  className = "",
  barClassName = "",
  showValue = false,
  label,
  size = "md",
  color = "default",
  animated = true,
}: AnimatedProgressProps) {
  const [width, setWidth] = useState(0)

  // Calculate the percentage
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)

  useEffect(() => {
    // Animate the progress bar
    const timer = setTimeout(() => {
      setWidth(percentage)
    }, 100)

    return () => clearTimeout(timer)
  }, [percentage])

  // Determine height based on size
  const getHeight = () => {
    switch (size) {
      case "sm":
        return "h-1.5"
      case "md":
        return "h-2.5"
      case "lg":
        return "h-4"
      default:
        return "h-2.5"
    }
  }

  // Determine color based on type
  const getColor = () => {
    switch (color) {
      case "success":
        return "bg-green-500"
      case "warning":
        return "bg-yellow-500"
      case "danger":
        return "bg-red-500"
      case "info":
        return "bg-blue-500"
      default:
        return "bg-primary"
    }
  }

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue) && (
        <div className="mb-1 flex items-center justify-between">
          {label && <span className="text-sm font-medium">{label}</span>}
          {showValue && (
            <motion.span
              key={value}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-sm text-muted-foreground"
            >
              {value}/{max}
            </motion.span>
          )}
        </div>
      )}
      <div className={`w-full overflow-hidden rounded-full bg-gray-200 ${getHeight()}`}>
        <motion.div
          className={`${getColor()} ${getHeight()} rounded-full ${barClassName}`}
          style={{ width: animated ? `${width}%` : `${percentage}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}
