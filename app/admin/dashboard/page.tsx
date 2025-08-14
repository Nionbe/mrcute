"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Users, BookOpen, Award, CreditCard, BarChart4, User, Settings, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { NotificationBell } from "@/components/notification-bell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminDashboard() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New Payment Upload",
      message: "A parent has uploaded a new payment screenshot for verification.",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "New Teacher Registration",
      message: "A new teacher account has been created and needs approval.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "System Update",
      message: "The system will undergo maintenance tonight at 11 PM.",
      time: "3 hours ago",
      read: true,
    },
  ])

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const [adminInfo, setAdminInfo] = useState({
    name: "Loading...",
    email: "loading@example.com",
    adminId: "Loading...",
  })

  useEffect(() => {
    // Get user info from localStorage
    const userName = localStorage.getItem("userName") || "Admin"
    const userEmail = localStorage.getItem("userEmail") || "admin@example.com"
    const userId = localStorage.getItem("userId") || "AD000001"

    setAdminInfo({
      name: userName,
      email: userEmail,
      adminId: userId,
    })
  }, [])

  const stats = [
    { title: "Total Students", value: 450, icon: Users, change: "+12%" },
    { title: "Total Parents", value: 380, icon: User, change: "+8%" },
    { title: "Total Teachers", value: 25, icon: BookOpen, change: "+2%" },
    { title: "Pending KYC", value: 15, icon: Shield, change: "+5%" },
  ]

  const recentPayments = [
    {
      id: "1",
      student: "Alex Johnson",
      parent: "David Johnson",
      amount: "350 ETB",
      date: "Apr 10, 2025",
      status: "Pending",
    },
    {
      id: "2",
      student: "Emma Davis",
      parent: "Sarah Davis",
      amount: "350 ETB",
      date: "Apr 9, 2025",
      status: "Verified",
    },
    {
      id: "3",
      student: "Michael Brown",
      parent: "Robert Brown",
      amount: "120 ETB",
      date: "Apr 8, 2025",
      status: "Verified",
    },
  ]

  const newUsers = [
    {
      id: "1",
      name: "Olivia Smith",
      role: "Student",
      grade: "10",
      date: "Apr 10, 2025",
    },
    {
      id: "2",
      name: "James Wilson",
      role: "Student",
      grade: "11",
      date: "Apr 9, 2025",
    },
    {
      id: "3",
      name: "Jennifer Lee",
      role: "Parent",
      children: "1",
      date: "Apr 8, 2025",
    },
    {
      id: "4",
      name: "Thomas Clark",
      role: "Teacher",
      subject: "Science",
      date: "Apr 7, 2025",
    },
  ]

  const gradeDistribution = [
    { grade: "Grade 9", students: 120 },
    { grade: "Grade 10", students: 145 },
    { grade: "Grade 11", students: 105 },
    { grade: "Grade 12", students: 80 },
  ]

  const totalStudents = gradeDistribution.reduce((sum, grade) => sum + grade.students, 0)

  return (
    <div className="w-full">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
        <div className="flex items-center">
          <h1 className="text-lg font-bold md:text-xl">Admin Dashboard</h1>
          <div className="ml-4 flex items-center rounded-full bg-green-100 px-3 py-1">
            <span className="text-sm font-medium text-green-600">ID: {adminInfo.adminId}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <NotificationBell notifications={notifications} onMarkAsRead={markAsRead} onMarkAllAsRead={markAllAsRead} />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">A</div>
        </div>
      </header>

      <div className="p-4 md:p-6">
        <div className="mb-6">
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="flex flex-col items-center justify-between p-6 sm:flex-row">
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{adminInfo.name}</h2>
                  <p className="text-gray-600">System Administrator</p>
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-green-200 bg-white p-3 sm:mt-0">
                <p className="text-sm text-gray-500">Admin ID</p>
                <p className="text-xl font-bold text-green-600">{adminInfo.adminId}</p>
                <p className="text-xs text-gray-400">{adminInfo.email}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="flex items-center text-xs text-green-600">
                  {stat.change}
                  <span className="ml-1 text-gray-500">from last month</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
              <CardDescription>Distribution of students across grades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {gradeDistribution.map((grade) => (
                  <div key={grade.grade} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{grade.grade}</span>
                      <span className="text-sm text-gray-500">
                        {grade.students} ({Math.round((grade.students / totalStudents) * 100)}%)
                      </span>
                    </div>
                    <Progress value={(grade.students / totalStudents) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Quick Actions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2">
                <Link href="/admin/users">
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Users
                  </Button>
                </Link>
                <Link href="/admin/payments">
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Verify Payments
                  </Button>
                </Link>
                <Link href="/admin/content">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Manage Content
                  </Button>
                </Link>
                <Link href="/admin/leaderboard">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Award className="mr-2 h-4 w-4" />
                    Leaderboard
                  </Button>
                </Link>
                <Link href="/admin/analytics">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart4 className="mr-2 h-4 w-4" />
                    Analytics
                  </Button>
                </Link>
                <Link href="/admin/settings">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                </Link>
                <Link href="/admin/kyc">
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                    <Shield className="mr-2 h-4 w-4" />
                    Review KYC
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="payments">
          <TabsList className="mb-4">
            <TabsTrigger value="payments">Recent Payments</TabsTrigger>
            <TabsTrigger value="users">New Users</TabsTrigger>
          </TabsList>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle>Recent Payment Uploads</CardTitle>
                <CardDescription>Recent payment uploads that need verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <h4 className="font-medium">{payment.student}</h4>
                        <p className="text-sm text-gray-500">Parent: {payment.parent}</p>
                        <p className="text-sm text-gray-500">Date: {payment.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-bold">{payment.amount}</span>
                        <span
                          className={`ml-2 rounded-full px-2 py-1 text-xs ${
                            payment.status === "Verified"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  <Link href="/admin/payments" className="block text-center text-sm text-green-600 hover:underline">
                    View All Payments
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>New User Registrations</CardTitle>
                <CardDescription>Recently registered users on the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {newUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <h4 className="font-medium">{user.name}</h4>
                        <p className="text-sm text-gray-500">Role: {user.role}</p>
                        <p className="text-sm text-gray-500">
                          {user.role === "Student"
                            ? `Grade: ${user.grade}`
                            : user.role === "Parent"
                              ? `Children: ${user.children}`
                              : `Subject: ${user.subject}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-gray-500">{user.date}</span>
                        <span
                          className={`ml-2 block rounded-full px-2 py-1 text-xs ${
                            user.role === "Student"
                              ? "bg-blue-100 text-blue-600"
                              : user.role === "Parent"
                                ? "bg-purple-100 text-purple-600"
                                : "bg-orange-100 text-orange-600"
                          }`}
                        >
                          {user.role}
                        </span>
                      </div>
                    </div>
                  ))}
                  <Link href="/admin/users" className="block text-center text-sm text-green-600 hover:underline">
                    View All Users
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
