"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

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

export function NotificationBell({ notifications = [], onMarkAsRead, onMarkAllAsRead }: NotificationBellProps) {
  const [open, setOpen] = useState(false)
  const [hasAnimated, setHasAnimated] = useState(false)
  const [prevUnreadCount, setPrevUnreadCount] = useState(0)
  const unreadCount = notifications.filter((n) => !n.read).length

  // Add animation effect when new notifications arrive
  useEffect(() => {
    if (unreadCount > prevUnreadCount) {
      setHasAnimated(true)
      setTimeout(() => setHasAnimated(false), 1000)
    }
    setPrevUnreadCount(unreadCount)
  }, [unreadCount, prevUnreadCount])

  const handleNotificationClick = (id: string) => {
    onMarkAsRead(id)
    // Keep the popover open for a better user experience
  }

  const handleMarkAllAsRead = () => {
    onMarkAllAsRead()
    // Don't close the popover to let the user see the changes
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className={cn("relative", hasAnimated && "animate-bounce")}>
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between border-b p-3">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1 text-xs text-green-600"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="divide-y">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "cursor-pointer p-3 transition-colors hover:bg-gray-50",
                    !notification.read && "bg-green-50",
                  )}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="flex justify-between">
                    <h4 className="font-medium">{notification.title}</h4>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6">
              <Bell className="mb-2 h-8 w-8 text-gray-300" />
              <p className="text-center text-sm text-gray-500">No notifications yet</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
