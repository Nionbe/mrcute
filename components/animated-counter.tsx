"use client"

import { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  className?: string
  formatter?: (value: number) => string
}

export function AnimatedCounter({
  from,
  to,
  duration = 1.5,
  className = "",
  formatter = (value) => Math.round(value).toString(),
}: AnimatedCounterProps) {
  const [isClient, setIsClient] = useState(false)
  const count = useMotionValue(from)
  const rounded = useSpring(count, { stiffness: 100, damping: 30, duration })
  const [displayValue, setDisplayValue] = useState(formatter(from))

  useEffect(() => {
    setIsClient(true)
    count.set(to)

    return rounded.onChange((latest) => {
      setDisplayValue(formatter(latest))
    })
  }, [count, rounded, to, formatter])

  if (!isClient) {
    return <span className={className}>{formatter(from)}</span>
  }

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {displayValue}
    </motion.span>
  )
}
