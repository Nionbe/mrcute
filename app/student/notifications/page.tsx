"use client"

import { useState, useEffect } from "react"
import { Bell, Check, CheckCheck, Clock, Filter } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  date: string
  type: "quiz" | "note" | "grade" | "announcement"
  read: boolean
}

export default function StudentNotifications() {
  const [filter, setFilter] = useState<string>("all")
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Load notifications from localStorage or use default ones if not available
  useEffect(() => {
    // Load notifications from localStorage or use default ones if not available
    const savedNotifications = localStorage.getItem("studentNotifications")
    const userId = localStorage.getItem("userId")

    if (savedNotifications) {
      try {
        const parsedNotifications = JSON.parse(savedNotifications)
        setNotifications(parsedNotifications)
      } catch (error) {
        console.error("Error parsing notifications:", error)
        setNotifications(getDefaultNotifications())
      }
    } else {
      // Default notifications if none are saved
      const defaultNotifications = getDefaultNotifications()
      setNotifications(defaultNotifications)
      localStorage.setItem("studentNotifications", JSON.stringify(defaultNotifications))
    }
  }, [])

  // Add a function to get default notifications
  const getDefaultNotifications = (): Notification[] => {
    return [
      {
        id: "1",
        title: "New Quiz Available",
        message: "A new Mathematics quiz has been assigned to you. Complete it before Friday.",
        time: "10:30 AM",
        date: "Today",
        type: "quiz",
        read: false,
      },
      {
        id: "2",
        title: "Grade Posted",
        message: "Your Science quiz grade has been posted. You scored 85%.",
        time: "Yesterday",
        date: "Apr 12, 2025",
        type: "grade",
        read: false,
      },
      {
        id: "3",
        title: "New Study Material",
        message: "New study notes for History chapter 5 have been uploaded.",
        time: "2 days ago",
        date: "Apr 11, 2025",
        type: "note",
        read: false,
      },
      {
        id: "4",
        title: "Upcoming Test Reminder",
        message: "Don't forget about your English test next Monday.",
        time: "3 days ago",
        date: "Apr 10, 2025",
        type: "announcement",
        read: false,
      },
      {
        id: "5",
        title: "Parent-Teacher Meeting",
        message: "Parent-teacher meetings are scheduled for next week. Please inform your parents.",
        time: "1 week ago",
        date: "Apr 6, 2025",
        type: "announcement",
        read: false,
      },
    ]
  }

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("studentNotifications", JSON.stringify(notifications))
  }, [notifications])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )

    toast({
      title: "Notification marked as read",
      description: "This notification has been marked as read.",
    })
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))

    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    })
  }

  const getFilteredNotifications = () => {
    if (filter === "all") return notifications
    if (filter === "unread") return notifications.filter((n) => !n.read)
    return notifications.filter((n) => n.type === filter)
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="student" />

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <h1 className="text-lg font-bold md:text-xl">Notifications</h1>
          <div className="flex items-center gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Notifications</SelectItem>
                <SelectItem value="unread">Unread</SelectItem>
                <SelectItem value="quiz">Quizzes</SelectItem>
                <SelectItem value="grade">Grades</SelectItem>
                <SelectItem value="note">Study Materials</SelectItem>
                <SelectItem value="announcement">Announcements</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">
                All
                {unreadCount > 0 && (
                  <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                    {unreadCount} new
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="unread">Unread</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>All Notifications</CardTitle>
                      <CardDescription>View all your notifications</CardDescription>
                    </div>
                    {unreadCount > 0 && (
                      <Button variant="outline" onClick={markAllAsRead}>
                        <Check className="mr-2 h-4 w-4" />
                        Mark all as read
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {getFilteredNotifications().length > 0 ? (
                    <div className="space-y-4">
                      {getFilteredNotifications().map((notification) => (
                        <div
                          key={notification.id}
                          className={`rounded-lg border p-4 transition-colors ${
                            notification.read ? "bg-white" : "bg-green-50 border-green-200"
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3">
                              <div
                                className={`mt-0.5 rounded-full p-1.5 ${
                                  notification.type === "quiz"
                                    ? "bg-blue-100 text-blue-600"
                                    : notification.type === "grade"
                                      ? "bg-green-100 text-green-600"
                                      : notification.type === "note"
                                        ? "bg-purple-100 text-purple-600"
                                        : "bg-orange-100 text-orange-600"
                                }`}
                              >
                                {notification.type === "quiz" ? (
                                  <Clock className="h-4 w-4" />
                                ) : notification.type === "grade" ? (
                                  <Check className="h-4 w-4" />
                                ) : notification.type === "note" ? (
                                  <Bell className="h-4 w-4" />
                                ) : (
                                  <Bell className="h-4 w-4" />
                                )}
                              </div>
                              <div>
                                <h3 className="font-medium">{notification.title}</h3>
                                <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                                <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                                  <span>{notification.date}</span>
                                  <span>•</span>
                                  <span>{notification.time}</span>
                                </div>
                              </div>
                            </div>
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-green-600"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <CheckCheck className="mr-1 h-4 w-4" />
                                Mark as read
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <Bell className="mb-4 h-12 w-12 text-gray-300" />
                      <h3 className="text-lg font-medium">No notifications</h3>
                      <p className="text-gray-500">You're all caught up!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="unread">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Unread Notifications</CardTitle>
                      <CardDescription>View your unread notifications</CardDescription>
                    </div>
                    {unreadCount > 0 && (
                      <Button variant="outline" onClick={markAllAsRead}>
                        <Check className="mr-2 h-4 w-4" />
                        Mark all as read
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {notifications.filter((n) => !n.read).length > 0 ? (
                    <div className="space-y-4">
                      {notifications
                        .filter((n) => !n.read)
                        .map((notification) => (
                          <div key={notification.id} className="rounded-lg border border-green-200 bg-green-50 p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <div
                                  className={`mt-0.5 rounded-full p-1.5 ${
                                    notification.type === "quiz"
                                      ? "bg-blue-100 text-blue-600"
                                      : notification.type === "grade"
                                        ? "bg-green-100 text-green-600"
                                        : notification.type === "note"
                                          ? "bg-purple-100 text-purple-600"
                                          : "bg-orange-100 text-orange-600"
                                  }`}
                                >
                                  {notification.type === "quiz" ? (
                                    <Clock className="h-4 w-4" />
                                  ) : notification.type === "grade" ? (
                                    <Check className="h-4 w-4" />
                                  ) : notification.type === "note" ? (
                                    <Bell className="h-4 w-4" />
                                  ) : (
                                    <Bell className="h-4 w-4" />
                                  )}
                                </div>
                                <div>
                                  <h3 className="font-medium">{notification.title}</h3>
                                  <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
                                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                                    <span>{notification.date}</span>
                                    <span>•</span>
                                    <span>{notification.time}</span>
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 text-green-600"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <CheckCheck className="mr-1 h-4 w-4" />
                                Mark as read
                              </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12">
                      <CheckCheck className="mb-4 h-12 w-12 text-gray-300" />
                      <h3 className="text-lg font-medium">No unread notifications</h3>
                      <p className="text-gray-500">You're all caught up!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
