"use client"

import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { cn } from "@/lib/utils"
import type { HTMLAttributes, ReactNode } from "react"
import { forwardRef } from "react"

export interface ScrollAnimationProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "zoom-in" | "none"
  delay?: number
  duration?: number
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export const ScrollAnimation = forwardRef<HTMLDivElement, ScrollAnimationProps>(
  (
    {
      children,
      animation = "fade-up",
      delay = 0,
      duration = 0.6,
      threshold = 0.1,
      rootMargin = "0px",
      triggerOnce = true,
      className,
      ...props
    },
    forwardedRef,
  ) => {
    const { ref, isVisible } = useScrollAnimation({
      threshold,
      rootMargin,
      triggerOnce,
    })

    const getAnimationClass = () => {
      if (animation === "none") return ""

      const baseClass = "transition-all"
      const durationClass = `duration-${Math.round(duration * 1000)}` // Convert to ms
      const delayClass = delay > 0 ? `delay-${Math.round(delay * 1000)}` : "" // Convert to ms

      let initialClass = ""
      let visibleClass = ""

      switch (animation) {
        case "fade-up":
          initialClass = "opacity-0 translate-y-8"
          visibleClass = "opacity-100 translate-y-0"
          break
        case "fade-in":
          initialClass = "opacity-0"
          visibleClass = "opacity-100"
          break
        case "slide-left":
          initialClass = "opacity-0 -translate-x-8"
          visibleClass = "opacity-100 translate-x-0"
          break
        case "slide-right":
          initialClass = "opacity-0 translate-x-8"
          visibleClass = "opacity-100 translate-x-0"
          break
        case "zoom-in":
          initialClass = "opacity-0 scale-95"
          visibleClass = "opacity-100 scale-100"
          break
        default:
          break
      }

      return cn(baseClass, durationClass, delayClass, isVisible ? visibleClass : initialClass)
    }

    return (
      <div
        ref={(node) => {
          // Handle both the internal ref and the forwarded ref
          if (typeof forwardedRef === "function") {
            forwardedRef(node)
          } else if (forwardedRef) {
            forwardedRef.current = node
          }
          ref.current = node
        }}
        className={cn(getAnimationClass(), className)}
        style={{
          transitionDuration: `${duration}s`,
          transitionDelay: `${delay}s`,
        }}
        {...props}
      >
        {children}
      </div>
    )
  },
)

ScrollAnimation.displayName = "ScrollAnimation"
