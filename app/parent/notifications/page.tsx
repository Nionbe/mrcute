"use client"

import { useState, useEffect } from "react"
import { Bell, Check, Filter, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Notification {
  id: string
  title: string
  message: string
  date: string
  type: "payment" | "academic" | "event" | "general"
  read: boolean
}

export default function ParentNotifications() {
  const [searchQuery, setSearchQuery] = useState("")
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<string>("all")

  // Load notifications from localStorage or initialize with defaults
  useEffect(() => {
    const savedNotifications = localStorage.getItem("parentNotifications")

    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    } else {
      // Default notifications
      const defaultNotifications: Notification[] = [
        {
          id: "1",
          title: "Payment Confirmed",
          message: "Your payment for Term 2 Tuition has been confirmed.",
          date: "Apr 10, 2025",
          type: "payment",
          read: false,
        },
        {
          id: "2",
          title: "Parent-Teacher Meeting",
          message: "Reminder: Parent-Teacher meeting scheduled for next Friday at 3:00 PM.",
          date: "Apr 9, 2025",
          type: "event",
          read: false,
        },
        {
          id: "3",
          title: "Mid-Term Report Available",
          message: "Your child's mid-term academic report is now available for viewing.",
          date: "Apr 5, 2025",
          type: "academic",
          read: false,
        },
        {
          id: "4",
          title: "School Holiday Announcement",
          message: "The school will be closed on April 15th for a national holiday.",
          date: "Apr 3, 2025",
          type: "general",
          read: true,
        },
        {
          id: "5",
          title: "Extracurricular Activity Registration",
          message: "Registration for after-school activities is now open for the next term.",
          date: "Mar 28, 2025",
          type: "event",
          read: true,
        },
      ]

      setNotifications(defaultNotifications)
      localStorage.setItem("parentNotifications", JSON.stringify(defaultNotifications))
    }
  }, [])

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    if (notifications.length > 0) {
      localStorage.setItem("parentNotifications", JSON.stringify(notifications))
    }
  }, [notifications])

  const unreadCount = notifications.filter((notification) => !notification.read).length

  const filteredNotifications = notifications.filter((notification) => {
    // Apply search filter
    const matchesSearch =
      notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchQuery.toLowerCase())

    // Apply type filter
    const matchesType = filter === "all" || notification.type === filter

    return matchesSearch && matchesType
  })

  const unreadNotifications = filteredNotifications.filter((notification) => !notification.read)
  const readNotifications = filteredNotifications.filter((notification) => notification.read)

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )

    toast({
      title: "Notification marked as read",
      description: "This notification has been marked as read.",
    })
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))

    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "payment":
        return "bg-green-100 text-green-800"
      case "academic":
        return "bg-blue-100 text-blue-800"
      case "event":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="parent" />

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <h1 className="text-lg font-bold md:text-xl">Notifications</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search notifications..."
                className="w-full rounded-md pl-8 md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setFilter("all")}>All</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("payment")}>Payments</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("academic")}>Academic</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("event")}>Events</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setFilter("general")}>General</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {unreadCount > 0 && (
              <Button variant="outline" onClick={markAllAsRead}>
                <Check className="mr-2 h-4 w-4" />
                Mark all as read
              </Button>
            )}
          </div>
        </header>

        <main className="p-4 md:p-6">
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="unread">
                Unread
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {unreadCount}
                  </Badge>
                )}
              </TabsTrigger>
              <TabsTrigger value="read">Read</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {filteredNotifications.length > 0 ? (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <Card key={notification.id} className={notification.read ? "opacity-75" : ""}>
                      <CardContent className="p-6">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{notification.title}</h3>
                              <Badge className={getTypeColor(notification.type)}>
                                {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                              </Badge>
                              {!notification.read && <span className="h-2 w-2 rounded-full bg-red-500"></span>}
                            </div>
                            <p className="text-sm text-gray-500">{notification.message}</p>
                            <p className="text-xs text-gray-400">{notification.date}</p>
                          </div>
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="shrink-0"
                              onClick={() => markAsRead(notification.id)}
                            >
                              <Check className="mr-2 h-4 w-4" />
                              Mark as read
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-center text-gray-500">No notifications found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="unread">
              {unreadNotifications.length > 0 ? (
                <div className="space-y-4">
                  {unreadNotifications.map((notification) => (
                    <Card key={notification.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{notification.title}</h3>
                              <Badge className={getTypeColor(notification.type)}>
                                {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                              </Badge>
                              <span className="h-2 w-2 rounded-full bg-red-500"></span>
                            </div>
                            <p className="text-sm text-gray-500">{notification.message}</p>
                            <p className="text-xs text-gray-400">{notification.date}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="shrink-0"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <Check className="mr-2 h-4 w-4" />
                            Mark as read
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                  <div className="text-center">
                    <Bell className="mx-auto mb-2 h-10 w-10 text-gray-300" />
                    <p className="text-gray-500">No unread notifications</p>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="read">
              {readNotifications.length > 0 ? (
                <div className="space-y-4">
                  {readNotifications.map((notification) => (
                    <Card key={notification.id} className="opacity-75">
                      <CardContent className="p-6">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{notification.title}</h3>
                              <Badge className={getTypeColor(notification.type)}>
                                {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500">{notification.message}</p>
                            <p className="text-xs text-gray-400">{notification.date}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-center text-gray-500">No read notifications</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
