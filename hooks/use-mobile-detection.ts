"use client"

import { useState, useEffect } from "react"

export function useMobileDetection() {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window === "undefined") return

    // Function to update state based on window size
    const updateDeviceType = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)

      // Check for touch capability
      setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0)
    }

    // Initial check
    updateDeviceType()

    // Add event listener for window resize
    window.addEventListener("resize", updateDeviceType)

    // Cleanup
    return () => window.removeEventListener("resize", updateDeviceType)
  }, [])

  return { isMobile, isTablet, isTouch }
}
