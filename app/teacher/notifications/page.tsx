"use client"

import { useState } from "react"
import { Search, Filter, Bell, Plus, Trash, Send } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Notification {
  id: string
  title: string
  message: string
  type: string
  date: string
  time: string
  recipients: string
  sent: boolean
}

export default function TeacherNotifications() {
  const [searchQuery, setSearchQuery] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [notificationToDelete, setNotificationToDelete] = useState<string | null>(null)

  const [newNotification, setNewNotification] = useState({
    title: "",
    message: "",
    type: "announcement",
    recipients: "all", // all, grade10, grade11, etc.
  })

  // Sample notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Quiz Reminder",
      message: "Mathematics Quiz for Grade 10 is scheduled for tomorrow. Please ensure all students are prepared.",
      type: "reminder",
      date: "Apr 10, 2025",
      time: "10:30 AM",
      recipients: "Grade 10",
      sent: true,
    },
    {
      id: "2",
      title: "Homework Submission",
      message: "Reminder to submit the Algebra II homework by Friday.",
      type: "homework",
      date: "Apr 9, 2025",
      time: "2:15 PM",
      recipients: "Grade 10",
      sent: true,
    },
    {
      id: "3",
      title: "Parent-Teacher Meeting",
      message: "Parent-Teacher meetings are scheduled for next week. Please inform your students.",
      type: "announcement",
      date: "Apr 8, 2025",
      time: "9:00 AM",
      recipients: "All Grades",
      sent: true,
    },
    {
      id: "4",
      title: "Exam Schedule",
      message: "Final exam schedule for the term has been published. Please review and inform your students.",
      type: "announcement",
      date: "Apr 5, 2025",
      time: "11:45 AM",
      recipients: "All Grades",
      sent: true,
    },
  ])

  // Filter notifications based on search query and type filter
  const filteredNotifications = notifications.filter(
    (notification) =>
      (notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (typeFilter === "all" || notification.type === typeFilter),
  )

  const handleCreateNotification = () => {
    // Validate form
    if (!newNotification.title || !newNotification.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create new notification
    const currentDate = new Date()
    const formattedDate = `${currentDate.toLocaleString("default", {
      month: "short",
    })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`
    const formattedTime = currentDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })

    const newNotificationItem: Notification = {
      id: `notification-${Date.now()}`,
      title: newNotification.title,
      message: newNotification.message,
      type: newNotification.type,
      date: formattedDate,
      time: formattedTime,
      recipients:
        newNotification.recipients === "all"
          ? "All Grades"
          : `Grade ${newNotification.recipients.replace("grade", "")}`,
      sent: true,
    }

    // Add to notifications list
    setNotifications([newNotificationItem, ...notifications])

    // Reset form and close dialog
    setNewNotification({
      title: "",
      message: "",
      type: "announcement",
      recipients: "all",
    })
    setIsCreateDialogOpen(false)

    toast({
      title: "Notification Sent",
      description: "Your notification has been successfully sent.",
    })
  }

  const handleDeleteNotification = () => {
    if (!notificationToDelete) return

    // Remove notification from list
    setNotifications(notifications.filter((notification) => notification.id !== notificationToDelete))

    // Close dialog
    setIsDeleteDialogOpen(false)
    setNotificationToDelete(null)

    toast({
      title: "Notification Deleted",
      description: "The notification has been successfully deleted.",
    })
  }

  const openDeleteDialog = (id: string) => {
    setNotificationToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="teacher" />

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <h1 className="text-lg font-bold md:text-xl">Notifications</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search notifications..."
                className="w-full rounded-md pl-8 md:w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="announcement">Announcements</SelectItem>
                <SelectItem value="reminder">Reminders</SelectItem>
                <SelectItem value="homework">Homework</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Send Notification
            </Button>
          </div>
        </header>

        <main className="mx-auto max-w-6xl p-4 md:p-6">
          <Tabs defaultValue="sent">
            <TabsList className="mb-6">
              <TabsTrigger value="sent">Sent</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            </TabsList>

            <TabsContent value="sent">
              {filteredNotifications.length > 0 ? (
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <Card key={notification.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{notification.title}</h3>
                              <Badge
                                className={
                                  notification.type === "announcement"
                                    ? "bg-blue-500"
                                    : notification.type === "reminder"
                                      ? "bg-yellow-500"
                                      : "bg-purple-500"
                                }
                              >
                                {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">{notification.message}</p>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
                              <span>
                                Sent: {notification.date} at {notification.time}
                              </span>
                              <span>To: {notification.recipients}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Send className="mr-2 h-4 w-4" />
                              Resend
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-500 hover:bg-red-50 hover:text-red-600"
                              onClick={() => openDeleteDialog(notification.id)}
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <Bell className="mb-2 h-10 w-10 text-gray-300" />
                  <h3 className="mb-1 text-lg font-medium">No notifications found</h3>
                  <p className="text-sm text-gray-500">
                    {searchQuery || typeFilter !== "all"
                      ? "Try a different search term or filter"
                      : "Send your first notification to get started"}
                  </p>
                  <Button onClick={() => setIsCreateDialogOpen(true)} className="mt-4 bg-green-600 hover:bg-green-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Send Notification
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="scheduled">
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <Bell className="mb-2 h-10 w-10 text-gray-300" />
                <h3 className="mb-1 text-lg font-medium">No scheduled notifications</h3>
                <p className="text-sm text-gray-500">Schedule notifications to be sent at a later time</p>
                <Button onClick={() => setIsCreateDialogOpen(true)} className="mt-4 bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Schedule Notification
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Create Notification Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Send Notification</DialogTitle>
            <DialogDescription>Create a new notification to send to students and parents.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={newNotification.title}
                onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
                className="col-span-3"
                placeholder="Enter notification title"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="message" className="text-right">
                Message
              </Label>
              <Textarea
                id="message"
                value={newNotification.message}
                onChange={(e) => setNewNotification({ ...newNotification, message: e.target.value })}
                className="col-span-3"
                placeholder="Enter notification message"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Select
                value={newNotification.type}
                onValueChange={(value) => setNewNotification({ ...newNotification, type: value })}
              >
                <SelectTrigger id="type" className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="announcement">Announcement</SelectItem>
                  <SelectItem value="reminder">Reminder</SelectItem>
                  <SelectItem value="homework">Homework</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="recipients" className="text-right">
                Recipients
              </Label>
              <Select
                value={newNotification.recipients}
                onValueChange={(value) => setNewNotification({ ...newNotification, recipients: value })}
              >
                <SelectTrigger id="recipients" className="col-span-3">
                  <SelectValue placeholder="Select recipients" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="grade10">Grade 10</SelectItem>
                  <SelectItem value="grade11">Grade 11</SelectItem>
                  <SelectItem value="grade12">Grade 12</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateNotification} className="bg-green-600 hover:bg-green-700">
              Send Notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete Notification</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this notification? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteNotification}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
