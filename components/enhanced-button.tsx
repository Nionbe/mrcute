"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-safari-600 text-primary-foreground hover:bg-safari-700",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-safari-600 bg-background text-safari-600 hover:bg-safari-50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-safari-600 underline-offset-4 hover:underline",
        success: "bg-green-600 text-white hover:bg-green-700",
        warning: "bg-yellow-500 text-white hover:bg-yellow-600",
        info: "bg-blue-600 text-white hover:bg-blue-700",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      elevation: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
      rounded: {
        default: "rounded-md",
        full: "rounded-full",
        none: "rounded-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      elevation: "none",
      rounded: "default",
    },
  },
)

interface EnhancedButtonProps extends React.ComponentProps<typeof Button>, VariantProps<typeof buttonVariants> {
  elevation?: "none" | "sm" | "md" | "lg"
  rounded?: "default" | "full" | "none"
  withAnimation?: boolean
}

export function EnhancedButton({
  className,
  variant,
  size,
  elevation,
  rounded,
  withAnimation = true,
  ...props
}: EnhancedButtonProps) {
  if (!withAnimation) {
    return <Button className={cn(buttonVariants({ variant, size, elevation, rounded }), className)} {...props} />
  }

  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
      <Button className={cn(buttonVariants({ variant, size, elevation, rounded }), className)} {...props} />
    </motion.div>
  )
}
