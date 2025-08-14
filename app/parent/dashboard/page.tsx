"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { User, TrendingUp, Clock, Award, FileText, CreditCard, Bell } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { NotificationBell } from "@/components/notification-bell"

export default function ParentDashboard() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Payment Due",
      message: "Monthly tuition payment is due in 3 days.",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "Quiz Result",
      message: "Your child scored 92% on the Mathematics quiz.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "Parent Meeting",
      message: "Parent-teacher meeting scheduled for next week.",
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

  const [parentInfo, setParentInfo] = useState({
    name: "Loading...",
    childName: "Loading...",
    childGrade: "Loading...",
    parentId: "Loading...",
    email: "loading@example.com",
  })

  useEffect(() => {
    // Get user info from localStorage
    const userName = localStorage.getItem("userName") || "Parent"
    const userData = localStorage.getItem("userData")
    const userId = localStorage.getItem("userId") || "PR000001"
    const userEmail = localStorage.getItem("userEmail") || "parent@example.com"

    let childName = "Alex Demo"
    let childGrade = "10"
    if (userData) {
      const parsedData = JSON.parse(userData)
      childName = parsedData.childName || "Alex Demo"
      childGrade = parsedData.childGrade || "10"
    }

    setParentInfo({
      name: userName,
      childName: childName,
      childGrade: childGrade,
      parentId: userId,
      email: userEmail,
    })
  }, [])

  const stats = [
    { title: "Child's Avg Score", value: "87%", icon: TrendingUp, change: "+5% this month" },
    { title: "Completed Quizzes", value: 15, icon: FileText, change: "+3 this week" },
    { title: "Study Hours", value: 28, icon: Clock, change: "+4 hours this week" },
    { title: "Class Rank", value: "#8", icon: Award, change: "↑2 positions" },
  ]

  const recentResults = [
    {
      id: "1",
      subject: "Mathematics",
      quiz: "Algebra Basics",
      score: 92,
      maxScore: 100,
      date: "Apr 10, 2025",
      grade: "A",
    },
    {
      id: "2",
      subject: "Physics",
      quiz: "Motion and Forces",
      score: 85,
      maxScore: 100,
      date: "Apr 8, 2025",
      grade: "B+",
    },
    {
      id: "3",
      subject: "Chemistry",
      quiz: "Atomic Structure",
      score: 78,
      maxScore: 100,
      date: "Apr 5, 2025",
      grade: "B",
    },
  ]

  const upcomingPayments = [
    {
      id: "1",
      description: "Monthly Tuition Fee",
      amount: "350 ETB",
      dueDate: "Apr 15, 2025",
      status: "Due Soon",
    },
    {
      id: "2",
      description: "Lab Fee",
      amount: "50 ETB",
      dueDate: "Apr 20, 2025",
      status: "Upcoming",
    },
  ]

  const subjectProgress = [
    { subject: "Mathematics", progress: 85, grade: "A-" },
    { subject: "Physics", progress: 78, grade: "B+" },
    { subject: "Chemistry", progress: 82, grade: "B+" },
    { subject: "Biology", progress: 90, grade: "A" },
    { subject: "English", progress: 75, grade: "B" },
  ]

  return (
    <div className="w-full">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
        <div className="flex items-center">
          <h1 className="text-lg font-bold md:text-xl">Welcome back, {parentInfo.name}!</h1>
          <div className="ml-4 flex items-center rounded-full bg-purple-100 px-3 py-1">
            <span className="text-sm font-medium text-purple-600">
              {parentInfo.childName} - Grade {parentInfo.childGrade}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <NotificationBell notifications={notifications} onMarkAsRead={markAsRead} onMarkAllAsRead={markAllAsRead} />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600">
            {parentInfo.name.charAt(0)}
          </div>
        </div>
      </header>

      <div className="p-4 md:p-6">
        <div className="mb-6">
          <Card className="border-2 border-purple-200 bg-purple-50">
            <CardContent className="flex flex-col items-center justify-between p-6 sm:flex-row">
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{parentInfo.name}</h2>
                  <p className="text-gray-600">Parent of {parentInfo.childName}</p>
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-purple-200 bg-white p-3 sm:mt-0">
                <p className="text-sm text-gray-500">Parent ID</p>
                <p className="text-xl font-bold text-purple-600">{parentInfo.parentId}</p>
                <p className="text-xs text-gray-400">
                  Grade {parentInfo.childGrade} • {parentInfo.email}
                </p>
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
                <p className="flex items-center text-xs text-purple-600">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-6 grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Quick Actions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 md:grid-cols-2">
                <Link href="/parent/progress">
                  <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Progress
                  </Button>
                </Link>
                <Link href="/parent/payments">
                  <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700">
                    <CreditCard className="mr-2 h-4 w-4" />
                    Make Payment
                  </Button>
                </Link>
                <Link href="/parent/leaderboard">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Award className="mr-2 h-4 w-4" />
                    Leaderboard
                  </Button>
                </Link>
                <Link href="/parent/notifications">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subject Progress</CardTitle>
              <CardDescription>{parentInfo.childName}'s performance by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {subjectProgress.slice(0, 4).map((subject) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{subject.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{subject.progress}%</span>
                        <Badge variant="outline">{subject.grade}</Badge>
                      </div>
                    </div>
                    <Progress value={subject.progress} className="h-2" />
                  </div>
                ))}
                <Link href="/parent/progress" className="block text-center text-sm text-purple-600 hover:underline">
                  View Detailed Progress
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Quiz Results</CardTitle>
              <CardDescription>{parentInfo.childName}'s latest quiz performances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentResults.map((result) => (
                  <div key={result.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h4 className="font-medium">{result.quiz}</h4>
                      <p className="text-sm text-gray-500">{result.subject}</p>
                      <p className="text-sm text-gray-500">{result.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">
                        {result.score}/{result.maxScore}
                      </span>
                      <Badge
                        variant={result.score >= 90 ? "default" : result.score >= 80 ? "secondary" : "outline"}
                        className="ml-2"
                      >
                        {result.grade}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Link href="/parent/progress" className="block text-center text-sm text-purple-600 hover:underline">
                  View All Results
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Status</CardTitle>
              <CardDescription>Upcoming payments and fees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h4 className="font-medium">{payment.description}</h4>
                      <p className="text-sm text-gray-500">Due: {payment.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">{payment.amount}</span>
                      <Badge
                        variant={payment.status === "Due Soon" ? "destructive" : "outline"}
                        className="ml-2 block mt-1"
                      >
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Link href="/parent/payments" className="block text-center text-sm text-purple-600 hover:underline">
                  View Payment History
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
