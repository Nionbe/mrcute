"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, BellRing, BookOpen, FileText, Calendar, Trash2, CheckCircle, RefreshCw } from "lucide-react"

interface Notification {
  id: string
  title: string
  message: string
  type: "quiz" | "note" | "general"
  read: boolean
  createdAt: string
  grade?: string
  quizTitle?: string
  noteTitle?: string
}

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    // Get current user
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}")
    setCurrentUser(user)

    loadNotifications()

    // Listen for real-time notification updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "studentNotifications") {
        console.log("Notifications updated, reloading...")
        loadNotifications()
      }
    }

    // Listen for custom storage events (same tab)
    const handleCustomStorageChange = (e: any) => {
      if (e.key === "studentNotifications") {
        console.log("Notifications updated (custom), reloading...")
        loadNotifications()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("storage", handleCustomStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("storage", handleCustomStorageChange)
    }
  }, [])

  const loadNotifications = () => {
    try {
      setLoading(true)
      const savedNotifications = localStorage.getItem("studentNotifications")
      if (savedNotifications) {
        const allNotifications = JSON.parse(savedNotifications)

        // Filter notifications for current user's grade
        const userGrade = JSON.parse(localStorage.getItem("currentUser") || "{}").grade
        const filteredNotifications = allNotifications.filter(
          (notif: Notification) => !notif.grade || notif.grade === userGrade,
        )

        // Sort by creation date (newest first)
        filteredNotifications.sort(
          (a: Notification, b: Notification) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )

        console.log("Loaded notifications:", filteredNotifications.length)
        setNotifications(filteredNotifications)
      } else {
        setNotifications([])
      }
    } catch (error) {
      console.error("Error loading notifications:", error)
      setNotifications([])
    } finally {
      setLoading(false)
    }
  }

  const markAsRead = (notificationId: string) => {
    try {
      const updatedNotifications = notifications.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif,
      )

      // Update local state
      setNotifications(updatedNotifications)

      // Update localStorage with all notifications (not just filtered ones)
      const allNotifications = JSON.parse(localStorage.getItem("studentNotifications") || "[]")
      const updatedAllNotifications = allNotifications.map((notif: Notification) =>
        notif.id === notificationId ? { ...notif, read: true } : notif,
      )

      localStorage.setItem("studentNotifications", JSON.stringify(updatedAllNotifications))
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const markAllAsRead = () => {
    try {
      const updatedNotifications = notifications.map((notif) => ({ ...notif, read: true }))
      setNotifications(updatedNotifications)

      // Update localStorage
      const allNotifications = JSON.parse(localStorage.getItem("studentNotifications") || "[]")
      const updatedAllNotifications = allNotifications.map((notif: Notification) => ({ ...notif, read: true }))
      localStorage.setItem("studentNotifications", JSON.stringify(updatedAllNotifications))
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
    }
  }

  const deleteNotification = (notificationId: string) => {
    try {
      const updatedNotifications = notifications.filter((notif) => notif.id !== notificationId)
      setNotifications(updatedNotifications)

      // Update localStorage
      const allNotifications = JSON.parse(localStorage.getItem("studentNotifications") || "[]")
      const updatedAllNotifications = allNotifications.filter((notif: Notification) => notif.id !== notificationId)
      localStorage.setItem("studentNotifications", JSON.stringify(updatedAllNotifications))
    } catch (error) {
      console.error("Error deleting notification:", error)
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "quiz":
        return <BookOpen className="w-5 h-5 text-blue-500" />
      case "note":
        return <FileText className="w-5 h-5 text-green-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const refreshNotifications = () => {
    loadNotifications()
  }

  const unreadCount = notifications.filter((notif) => !notif.read).length

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-6 h-6 animate-spin mr-2" />
          <span>Loading notifications...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <BellRing className="w-8 h-8" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">Stay updated with the latest announcements and content</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshNotifications} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline">
              <CheckCircle className="w-4 h-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{notifications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BellRing className="w-5 h-5 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">Unread</p>
                <p className="text-2xl font-bold">{unreadCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-bold">
                  {
                    notifications.filter((notif) => {
                      const notifDate = new Date(notif.createdAt)
                      const today = new Date()
                      return notifDate.toDateString() === today.toDateString()
                    }).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Bell className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Notifications</h3>
              <p className="text-muted-foreground text-center">
                You're all caught up! New notifications will appear here.
              </p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`transition-all ${
                !notification.read ? "border-blue-200 bg-blue-50/50 shadow-md" : "hover:shadow-md"
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    {getNotificationIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-base">{notification.title}</CardTitle>
                        {!notification.read && (
                          <Badge variant="destructive" className="text-xs">
                            New
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-xs">
                          {notification.type}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">{notification.message}</CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(notification.createdAt).toLocaleString()}
                        </Badge>
                        {notification.grade && (
                          <Badge variant="outline" className="text-xs">
                            {notification.grade}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {!notification.read && (
                      <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => deleteNotification(notification.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
