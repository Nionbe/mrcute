"use client"

import type React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface EnhancedCardProps {
  title: string
  description?: string
  icon?: LucideIcon
  iconColor?: string
  footer?: React.ReactNode
  className?: string
  children?: React.ReactNode
  onClick?: () => void
  delay?: number
}

export function EnhancedCard({
  title,
  description,
  icon: Icon,
  iconColor = "text-primary-600",
  footer,
  className,
  children,
  onClick,
  delay = 0,
}: EnhancedCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={onClick ? { y: -5, transition: { duration: 0.2 } } : undefined}
      className={cn(
        "rounded-xl border bg-card text-card-foreground shadow-md transition-all",
        onClick && "cursor-pointer hover:shadow-lg",
        className,
      )}
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center gap-4">
          {Icon && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: delay + 0.1 }}
              className={cn("rounded-full p-2 bg-primary-50", iconColor)}
            >
              <Icon className="h-5 w-5" />
            </motion.div>
          )}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: delay + 0.2 }}
              className="font-semibold text-lg"
            >
              {title}
            </motion.h3>
            {description && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: delay + 0.3 }}
                className="text-sm text-muted-foreground mt-1"
              >
                {description}
              </motion.p>
            )}
          </div>
        </div>
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.4 }}
            className="mt-4"
          >
            {children}
          </motion.div>
        )}
      </div>
      {footer && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: delay + 0.5 }}
          className="border-t bg-muted/50 px-6 py-4"
        >
          {footer}
        </motion.div>
      )}
    </motion.div>
  )
}
