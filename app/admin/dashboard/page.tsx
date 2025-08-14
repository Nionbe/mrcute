"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Users, BookOpen, Award, CreditCard, BarChart4, User, Settings, Shield, LogOut } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { NotificationBell } from "@/components/notification-bell"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export default function AdminDashboard() {
  const router = useRouter()
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
    const userName = localStorage.getItem("userName") || "Admin"
    const userEmail = localStorage.getItem("userEmail") || "admin@example.com"
    const userId = localStorage.getItem("userId") || "AD123456"

    setAdminInfo({
      name: userName,
      email: userEmail,
      adminId: userId,
    })
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    })
    router.push("/")
  }

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
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <h1 className="text-base font-semibold sm:text-lg md:text-xl">Admin Dashboard</h1>
          <div className="flex items-center rounded-full bg-green-100 px-2 py-1 sm:px-3">
            <span className="text-xs font-medium text-green-600 sm:text-sm">ID: {adminInfo.adminId}</span>
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2 sm:gap-4">
          <NotificationBell notifications={notifications} onMarkAsRead={markAsRead} onMarkAllAsRead={markAllAsRead} />
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-1 text-xs sm:text-sm bg-transparent"
          >
            <LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs sm:h-8 sm:w-8 sm:text-sm">
            A
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-4 p-4 sm:space-y-6 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="flex flex-col items-center justify-between p-4 sm:flex-row sm:p-6">
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 sm:mr-4 sm:h-12 sm:w-12">
                  <User className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold sm:text-xl">{adminInfo.name}</h2>
                  <p className="text-sm text-gray-600 sm:text-base">System Administrator</p>
                </div>
              </div>
              <div className="mt-3 rounded-lg border border-green-200 bg-white p-3 sm:mt-0">
                <p className="text-xs text-gray-500 sm:text-sm">Admin ID</p>
                <p className="text-lg font-bold text-green-600 sm:text-xl">{adminInfo.adminId}</p>
                <p className="text-xs text-gray-400">{adminInfo.email}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium sm:text-sm">{stat.title}</CardTitle>
                <stat.icon className="h-3 w-3 text-muted-foreground sm:h-4 sm:w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold sm:text-2xl">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Grade Distribution</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Distribution of students across grades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {gradeDistribution.map((grade) => (
                  <div key={grade.grade} className="space-y-1 sm:space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium sm:text-sm">{grade.grade}</span>
                      <span className="text-xs text-gray-500 sm:text-sm">
                        {grade.students} ({Math.round((grade.students / totalStudents) * 100)}%)
                      </span>
                    </div>
                    <Progress value={(grade.students / totalStudents) * 100} className="h-1.5 sm:h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 grid-cols-2 sm:gap-3">
                <Link href="/admin/users">
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-xs sm:text-sm p-2 sm:p-3">
                    <Users className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                    <span className="truncate">Users</span>
                  </Button>
                </Link>
                <Link href="/admin/payments">
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-xs sm:text-sm p-2 sm:p-3">
                    <CreditCard className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                    <span className="truncate">Payments</span>
                  </Button>
                </Link>
                <Link href="/admin/content">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-xs sm:text-sm p-2 sm:p-3 bg-transparent"
                  >
                    <BookOpen className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                    <span className="truncate">Content</span>
                  </Button>
                </Link>
                <Link href="/admin/leaderboard">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-xs sm:text-sm p-2 sm:p-3 bg-transparent"
                  >
                    <Award className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                    <span className="truncate">Leaderboard</span>
                  </Button>
                </Link>
                <Link href="/admin/analytics">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-xs sm:text-sm p-2 sm:p-3 bg-transparent"
                  >
                    <BarChart4 className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                    <span className="truncate">Analytics</span>
                  </Button>
                </Link>
                <Link href="/admin/settings">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-xs sm:text-sm p-2 sm:p-3 bg-transparent"
                  >
                    <Settings className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                    <span className="truncate">Settings</span>
                  </Button>
                </Link>
                <Link href="/admin/kyc">
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-xs sm:text-sm p-2 sm:p-3">
                    <Shield className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                    <span className="truncate">KYC</span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full justify-start text-xs sm:text-sm p-2 sm:p-3 bg-transparent"
                >
                  <LogOut className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                  <span className="truncate">Logout</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="payments" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="payments" className="text-xs sm:text-sm">
              Recent Payments
            </TabsTrigger>
            <TabsTrigger value="users" className="text-xs sm:text-sm">
              New Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="payments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Recent Payment Uploads</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Recent payment uploads that need verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {recentPayments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between rounded-lg border p-3 sm:p-4">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-medium sm:text-base truncate">{payment.student}</h4>
                        <p className="text-xs text-gray-500 sm:text-sm truncate">Parent: {payment.parent}</p>
                        <p className="text-xs text-gray-500 sm:text-sm">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold sm:text-lg">{payment.amount}</span>
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
                  <Link
                    href="/admin/payments"
                    className="block text-center text-xs text-green-600 hover:underline sm:text-sm"
                  >
                    View All Payments
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">New User Registrations</CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Recently registered users on the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {newUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between rounded-lg border p-3 sm:p-4">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-medium sm:text-base truncate">{user.name}</h4>
                        <p className="text-xs text-gray-500 sm:text-sm">Role: {user.role}</p>
                        <p className="text-xs text-gray-500 sm:text-sm">
                          {user.role === "Student"
                            ? `Grade: ${user.grade}`
                            : user.role === "Parent"
                              ? `Children: ${user.children}`
                              : `Subject: ${user.subject}`}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-gray-500 sm:text-sm">{user.date}</span>
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
                  <Link
                    href="/admin/users"
                    className="block text-center text-xs text-green-600 hover:underline sm:text-sm"
                  >
                    View All Users
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
