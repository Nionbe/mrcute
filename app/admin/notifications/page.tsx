"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, CheckCircle, Clock, Filter, Plus, Search, Send, Trash2, Users } from "lucide-react"

export default function AdminNotifications() {
  const [searchQuery, setSearchQuery] = useState("")
  const [recipientFilter, setRecipientFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  // Sample data for notifications
  const notifications = [
    {
      id: "1",
      title: "System Maintenance",
      message: "The system will undergo maintenance tonight at 11 PM. Please save your work before that time.",
      recipients: "All Users",
      sender: "System Admin",
      date: "Apr 14, 2025",
      status: "Sent",
      priority: "High",
    },
    {
      id: "2",
      title: "New Payment Feature",
      message: "We've added a new payment verification system. Parents can now upload payment receipts directly.",
      recipients: "Parents",
      sender: "System Admin",
      date: "Apr 12, 2025",
      status: "Sent",
      priority: "Medium",
    },
    {
      id: "3",
      title: "Quiz Submission Reminder",
      message: "Reminder: All students must complete the Mathematics quiz by Friday.",
      recipients: "Students (Grade 10)",
      sender: "Ms. Johnson",
      date: "Apr 10, 2025",
      status: "Scheduled",
      priority: "Medium",
    },
    {
      id: "4",
      title: "Parent-Teacher Meeting",
      message: "The quarterly parent-teacher meeting is scheduled for next Monday at 4 PM.",
      recipients: "Parents, Teachers",
      sender: "Principal",
      date: "Apr 8, 2025",
      status: "Draft",
      priority: "High",
    },
    {
      id: "5",
      title: "New Learning Resources",
      message: "New learning resources have been added to the Science section. Check them out!",
      recipients: "Students, Teachers",
      sender: "Content Team",
      date: "Apr 5, 2025",
      status: "Sent",
      priority: "Low",
    },
  ]

  return (
    <div className="flex-1 md:ml-64">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
        <h1 className="text-lg font-bold md:text-xl">Notification Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="default" className="gap-1 bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4" />
            Create Notification
          </Button>
        </div>
      </header>

      <main className="p-4 md:p-6">
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Notifications</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>

          <div className="mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Create New Notification</CardTitle>
                  <CardDescription>Send notifications to users of the platform</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="title" className="mb-2 block text-sm font-medium">
                        Notification Title
                      </label>
                      <Input id="title" placeholder="Enter notification title" />
                    </div>
                    <div>
                      <label htmlFor="recipients" className="mb-2 block text-sm font-medium">
                        Recipients
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select recipients" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Users</SelectItem>
                          <SelectItem value="students">All Students</SelectItem>
                          <SelectItem value="teachers">All Teachers</SelectItem>
                          <SelectItem value="parents">All Parents</SelectItem>
                          <SelectItem value="grade-9">Grade 9 Students</SelectItem>
                          <SelectItem value="grade-10">Grade 10 Students</SelectItem>
                          <SelectItem value="grade-11">Grade 11 Students</SelectItem>
                          <SelectItem value="grade-12">Grade 12 Students</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      Message
                    </label>
                    <Textarea id="message" placeholder="Enter notification message" rows={4} />
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="priority" className="mb-2 block text-sm font-medium">
                        Priority
                      </label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="schedule" className="mb-2 block text-sm font-medium">
                        Schedule (Optional)
                      </label>
                      <Input id="schedule" type="datetime-local" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Save as Draft</Button>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Send className="mr-2 h-4 w-4" />
                      Send Notification
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Notification History</CardTitle>
                <CardDescription>View and manage all notifications</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search notifications..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={recipientFilter} onValueChange={setRecipientFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Recipients</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="teachers">Teachers</SelectItem>
                    <SelectItem value="parents">Parents</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="sent">Sent</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-12 border-b bg-gray-50 p-3 text-sm font-medium text-gray-500">
                  <div className="col-span-3">Title</div>
                  <div className="col-span-2">Recipients</div>
                  <div className="col-span-2">Sender</div>
                  <div className="col-span-2">Date</div>
                  <div className="col-span-1">Priority</div>
                  <div className="col-span-1">Status</div>
                  <div className="col-span-1 text-right">Actions</div>
                </div>
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="grid grid-cols-12 items-center border-b p-3 last:border-0 hover:bg-gray-50"
                  >
                    <div className="col-span-3 flex items-center">
                      <Bell className="mr-2 h-4 w-4 text-gray-500" />
                      <span className="font-medium">{notification.title}</span>
                    </div>
                    <div className="col-span-2">{notification.recipients}</div>
                    <div className="col-span-2">{notification.sender}</div>
                    <div className="col-span-2">{notification.date}</div>
                    <div className="col-span-1">
                      <span
                        className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                          notification.priority === "High"
                            ? "bg-red-100 text-red-600"
                            : notification.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-blue-100 text-blue-600"
                        }`}
                      >
                        {notification.priority}
                      </span>
                    </div>
                    <div className="col-span-1">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          notification.status === "Sent"
                            ? "bg-green-100 text-green-600"
                            : notification.status === "Scheduled"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {notification.status === "Sent" ? (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        ) : notification.status === "Scheduled" ? (
                          <Clock className="mr-1 h-3 w-3" />
                        ) : (
                          <></>
                        )}
                        {notification.status}
                      </span>
                    </div>
                    <div className="col-span-1 flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Users className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </Tabs>
      </main>
    </div>
  )
}
