"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bell } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
}

interface NotificationBellProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
}

export function AnimatedNotificationBell({ notifications, onMarkAsRead, onMarkAllAsRead }: NotificationBellProps) {
  const [unreadCount, setUnreadCount] = useState(0)
  const [showAnimation, setShowAnimation] = useState(false)

  useEffect(() => {
    // Count unread notifications
    const count = notifications.filter((notification) => !notification.read).length
    setUnreadCount(count)

    // Trigger animation when new notifications arrive
    if (count > 0) {
      setShowAnimation(true)
      const timeout = setTimeout(() => {
        setShowAnimation(false)
      }, 2000)
      return () => clearTimeout(timeout)
    }
  }, [notifications])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <motion.div
            animate={showAnimation ? { rotate: [0, -10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Bell className="h-5 w-5" />
          </motion.div>
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.div
                key="badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white"
              >
                {unreadCount}
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onMarkAllAsRead} className="h-auto p-1 text-xs">
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="max-h-[300px] overflow-y-auto">
          <AnimatePresence>
            {notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <DropdownMenuItem
                    className={`flex cursor-pointer flex-col items-start p-3 ${
                      !notification.read ? "bg-muted/50" : ""
                    }`}
                    onClick={() => onMarkAsRead(notification.id)}
                  >
                    <div className="flex w-full justify-between">
                      <span className="font-medium">{notification.title}</span>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                    <span className="mt-1 text-sm text-muted-foreground">{notification.message}</span>
                  </DropdownMenuItem>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 text-center text-sm text-muted-foreground"
              >
                No notifications
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
