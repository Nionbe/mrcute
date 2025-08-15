"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, BellRing, BookOpen, FileText, Calendar, Trash2, CheckCircle, RefreshCw, Users } from "lucide-react"
import DataManager, { type Notification, type User } from "@/lib/data-manager"

export default function StudentNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const dataManager = DataManager.getInstance()

  useEffect(() => {
    initializeData()
    setupEventListeners()

    return () => {
      // Cleanup event listeners
      dataManager.removeEventListener("notifications-updated", handleNotificationsUpdate)
    }
  }, [])

  const initializeData = async () => {
    try {
      setLoading(true)

      // Get current user from localStorage or set default
      let user = dataManager.getCurrentUser()
      if (!user) {
        // Set default student user
        const defaultStudent: User = {
          id: "student-1",
          name: localStorage.getItem("userName") || "Alex Smith",
          email: "alex.smith@student.safariacademy.edu",
          role: "student",
          grade: localStorage.getItem("userGrade") || "10",
        }
        dataManager.setCurrentUser(defaultStudent.id)
        user = defaultStudent
      }

      setCurrentUser(user)

      // Load notifications for this user
      loadNotifications(user)
    } catch (error) {
      console.error("Error initializing data:", error)
    } finally {
      setLoading(false)
    }
  }

  const setupEventListeners = () => {
    dataManager.addEventListener("notifications-updated", handleNotificationsUpdate)
  }

  const handleNotificationsUpdate = (data: Notification[]) => {
    if (currentUser) {
      loadNotifications(currentUser)
    }
  }

  const loadNotifications = (user: User) => {
    try {
      const userNotifications = dataManager.getNotificationsForUser(user.id, user.role, user.grade)
      setNotifications(userNotifications)
      console.log(`Loaded ${userNotifications.length} notifications for user ${user.id}`)
    } catch (error) {
      console.error("Error loading notifications:", error)
      setNotifications([])
    }
  }

  const markAsRead = (notificationId: string) => {
    try {
      const success = dataManager.markNotificationAsRead(notificationId)
      if (success && currentUser) {
        loadNotifications(currentUser)
      }
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const markAllAsRead = () => {
    try {
      if (currentUser) {
        dataManager.markAllNotificationsAsRead(currentUser.id, currentUser.role, currentUser.grade)
        loadNotifications(currentUser)
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
    }
  }

  const deleteNotification = (notificationId: string) => {
    try {
      // For now, we'll just mark as read since we don't have a delete method
      markAsRead(notificationId)
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
      case "announcement":
        return <Users className="w-5 h-5 text-purple-500" />
      default:
        return <Bell className="w-5 h-5 text-gray-500" />
    }
  }

  const refreshNotifications = () => {
    if (currentUser) {
      loadNotifications(currentUser)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      const now = new Date()
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60))

      if (diffInMinutes < 1) return "Just now"
      if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`
      if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`
      if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)} days ago`

      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  const unreadCount = notifications.filter((notif) => !notif.read).length

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-24"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
            <BellRing className="w-8 h-8" />
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive" className="ml-2">
                {unreadCount}
              </Badge>
            )}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Stay updated with the latest announcements and content
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshNotifications} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          {unreadCount > 0 && (
            <Button onClick={markAllAsRead} variant="outline">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Total</p>
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
                <p className="text-sm text-gray-500">Unread</p>
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
                <p className="text-sm text-gray-500">Today</p>
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
              <Bell className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Notifications</h3>
              <p className="text-gray-600 text-center">
                You're all caught up! New notifications will appear here when your teachers share content.
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
                        <Badge variant="outline" className="text-xs capitalize">
                          {notification.type}
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">{notification.message}</CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">
                          <Calendar className="w-3 h-3 mr-1" />
                          {formatDate(notification.createdAt)}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          From: {notification.senderName}
                        </Badge>
                        {notification.targetGrade && (
                          <Badge variant="outline" className="text-xs">
                            Grade {notification.targetGrade}
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
