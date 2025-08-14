"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { User, TrendingUp, Clock, Award, FileText, Bell, LogOut } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { NotificationBell } from "@/components/notification-bell"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export default function ParentDashboard() {
  const router = useRouter()
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Quiz Result",
      message: "Your child scored 92% on the Mathematics quiz.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "2",
      title: "Parent Meeting",
      message: "Parent-teacher meeting scheduled for next week.",
      time: "3 hours ago",
      read: true,
    },
    {
      id: "3",
      title: "Progress Update",
      message: "Your child has improved in Science this month.",
      time: "1 day ago",
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
    email: "loading@example.com",
  })

  useEffect(() => {
    const userName = localStorage.getItem("userName") || "Parent"
    const userData = localStorage.getItem("userData")
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
      email: userEmail,
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

  const subjectProgress = [
    { subject: "Mathematics", progress: 85, grade: "A-" },
    { subject: "Physics", progress: 78, grade: "B+" },
    { subject: "Chemistry", progress: 82, grade: "B+" },
    { subject: "Biology", progress: 90, grade: "A" },
    { subject: "English", progress: 75, grade: "B" },
  ]

  return (
    <div className="w-full">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-2 sm:px-4 md:px-6">
        <div className="flex items-center min-w-0 flex-1">
          <h1 className="text-sm sm:text-lg font-bold md:text-xl truncate">
            Welcome back, <span className="text-purple-600">{parentInfo.name}</span>!
          </h1>
          <div className="ml-2 sm:ml-4 flex items-center rounded-full bg-purple-100 px-2 sm:px-3 py-1">
            <span className="text-xs sm:text-sm font-medium text-purple-600 truncate">
              {parentInfo.childName} - Grade {parentInfo.childGrade}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
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
          <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 text-xs sm:text-sm">
            {parentInfo.name.charAt(0)}
          </div>
        </div>
      </header>

      <div className="p-2 sm:p-4 md:p-6">
        <div className="mb-4 sm:mb-6">
          <Card className="border-2 border-purple-200 bg-purple-50">
            <CardContent className="flex flex-col items-center justify-between p-3 sm:p-6 sm:flex-row">
              <div className="flex items-center">
                <div className="mr-3 sm:mr-4 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                  <User className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-lg sm:text-xl font-bold truncate">{parentInfo.name}</h2>
                  <p className="text-sm sm:text-base text-gray-600 truncate">Parent of {parentInfo.childName}</p>
                </div>
              </div>
              <div className="mt-3 sm:mt-0 rounded-lg border border-purple-200 bg-white p-3">
                <p className="text-xs sm:text-sm text-gray-500">Child Info</p>
                <p className="text-sm sm:text-lg font-bold text-purple-600 truncate">{parentInfo.childName}</p>
                <p className="text-xs text-gray-400 truncate">
                  Grade {parentInfo.childGrade} • {parentInfo.email}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-4 sm:mb-6 grid grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xs sm:text-sm font-medium text-gray-500 truncate">{stat.title}</CardTitle>
                  <stat.icon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-lg sm:text-2xl font-bold">{stat.value}</div>
                <p className="flex items-center text-xs text-purple-600 truncate">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-4 sm:mb-6 grid gap-4 sm:gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 grid-cols-2">
                <Link href="/parent/progress">
                  <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-xs sm:text-sm p-2 sm:p-3">
                    <TrendingUp className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="truncate">View Progress</span>
                  </Button>
                </Link>
                <Link href="/parent/leaderboard">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent text-xs sm:text-sm p-2 sm:p-3"
                  >
                    <Award className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="truncate">Leaderboard</span>
                  </Button>
                </Link>
                <Link href="/parent/notifications">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent text-xs sm:text-sm p-2 sm:p-3"
                  >
                    <Bell className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="truncate">Notifications</span>
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full justify-start bg-transparent text-xs sm:text-sm p-2 sm:p-3"
                >
                  <LogOut className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                  <span className="truncate">Logout</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Subject Progress</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {parentInfo.childName}'s performance by subject
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {subjectProgress.slice(0, 4).map((subject) => (
                  <div key={subject.subject} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium truncate">{subject.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm text-gray-500">{subject.progress}%</span>
                        <Badge variant="outline" className="text-xs">
                          {subject.grade}
                        </Badge>
                      </div>
                    </div>
                    <Progress value={subject.progress} className="h-1.5 sm:h-2" />
                  </div>
                ))}
                <Link
                  href="/parent/progress"
                  className="block text-center text-xs sm:text-sm text-purple-600 hover:underline"
                >
                  View Detailed Progress
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Recent Quiz Results</CardTitle>
              <CardDescription className="text-xs sm:text-sm">
                {parentInfo.childName}'s latest quiz performances
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {recentResults.map((result) => (
                  <div key={result.id} className="flex items-center justify-between rounded-lg border p-3 sm:p-4">
                    <div className="min-w-0 flex-1">
                      <h4 className="font-medium text-sm sm:text-base truncate">{result.quiz}</h4>
                      <p className="text-xs sm:text-sm text-gray-500 truncate">{result.subject}</p>
                      <p className="text-xs sm:text-sm text-gray-500">{result.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm sm:text-lg font-bold">
                        {result.score}/{result.maxScore}
                      </span>
                      <Badge
                        variant={result.score >= 90 ? "default" : result.score >= 80 ? "secondary" : "outline"}
                        className="ml-2 text-xs"
                      >
                        {result.grade}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Link
                  href="/parent/progress"
                  className="block text-center text-xs sm:text-sm text-purple-600 hover:underline"
                >
                  View All Results
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Academic Progress</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Subject performance overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {["Mathematics", "Science", "English", "History"].map((subject) => (
                  <div key={subject}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-medium truncate">{subject}</span>
                      <span className="text-xs sm:text-sm font-medium">
                        {subject === "Mathematics"
                          ? "85%"
                          : subject === "Science"
                            ? "78%"
                            : subject === "English"
                              ? "92%"
                              : "70%"}
                      </span>
                    </div>
                    <div className="h-1.5 sm:h-2 w-full rounded-full bg-gray-100">
                      <div
                        className="h-1.5 sm:h-2 rounded-full bg-purple-600"
                        style={{
                          width: `${
                            subject === "Mathematics"
                              ? "85%"
                              : subject === "Science"
                                ? "78%"
                                : subject === "English"
                                  ? "92%"
                                  : "70%"
                          }`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Link href="/parent/progress">
                  <Button variant="outline" size="sm" className="w-full bg-transparent text-xs sm:text-sm">
                    View Detailed Progress
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
