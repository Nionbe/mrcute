"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

type ToastType = "success" | "error" | "info" | "warning"

interface ToastProps {
  id: string
  title: string
  message: string
  type: ToastType
  duration?: number
  onClose: (id: string) => void
}

export function EnhancedToast({ id, title, message, type, duration = 5000, onClose }: ToastProps) {
  const [progress, setProgress] = useState(100)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval)
          onClose(id)
          return 0
        }
        return prev - 100 / (duration / 100)
      })
    }, 100)

    setIntervalId(interval)

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [duration, id, onClose])

  const handleMouseEnter = () => {
    if (intervalId) clearInterval(intervalId)
  }

  const handleMouseLeave = () => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval)
          onClose(id)
          return 0
        }
        return prev - 100 / (duration / 100)
      })
    }, 100)

    setIntervalId(interval)
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
    }
  }

  const getBgColor = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "error":
        return "bg-red-50 border-red-200"
      case "info":
        return "bg-blue-50 border-blue-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`w-full max-w-sm overflow-hidden rounded-lg border shadow-lg ${getBgColor()}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">{getIcon()}</div>
          <div className="ml-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="mt-1 text-sm text-gray-500">{message}</p>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              className="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => onClose(id)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="h-1 w-full bg-gray-200">
        <motion.div
          className={`h-full ${
            type === "success"
              ? "bg-green-500"
              : type === "error"
                ? "bg-red-500"
                : type === "info"
                  ? "bg-blue-500"
                  : "bg-yellow-500"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </motion.div>
  )
}

export function ToastContainer({ toasts, onClose }: { toasts: ToastProps[]; onClose: (id: string) => void }) {
  return (
    <div className="fixed bottom-0 right-0 z-50 m-4 flex flex-col space-y-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <EnhancedToast key={toast.id} {...toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  )
}
