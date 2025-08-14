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
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <h1 className="text-base font-semibold sm:text-lg md:text-xl">
            Welcome back, <span className="text-purple-600">{parentInfo.name}</span>!
          </h1>
          <div className="flex items-center rounded-full bg-purple-100 px-2 py-1 sm:px-3">
            <span className="text-xs font-medium text-purple-600 sm:text-sm truncate">
              {parentInfo.childName} - Grade {parentInfo.childGrade}
            </span>
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
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-100 text-purple-600 text-xs sm:h-8 sm:w-8 sm:text-sm">
            {parentInfo.name.charAt(0)}
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-4 p-4 sm:space-y-6 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <Card className="border-2 border-purple-200 bg-purple-50">
            <CardContent className="flex flex-col items-center justify-between p-4 sm:flex-row sm:p-6">
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600 sm:mr-4 sm:h-12 sm:w-12">
                  <User className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold sm:text-xl">{parentInfo.name}</h2>
                  <p className="text-sm text-gray-600 sm:text-base truncate">Parent of {parentInfo.childName}</p>
                </div>
              </div>
              <div className="mt-3 rounded-lg border border-purple-200 bg-white p-3 sm:mt-0">
                <p className="text-xs text-gray-500 sm:text-sm">Child Info</p>
                <p className="text-lg font-bold text-purple-600 sm:text-xl truncate">{parentInfo.childName}</p>
                <p className="text-xs text-gray-400 truncate">
                  Grade {parentInfo.childGrade} • {parentInfo.email}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium sm:text-sm truncate">{stat.title}</CardTitle>
                <stat.icon className="h-3 w-3 text-muted-foreground sm:h-4 sm:w-4" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-bold sm:text-2xl">{stat.value}</div>
                <p className="text-xs text-muted-foreground truncate">
                  <span className="text-purple-600">{stat.change}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 grid-cols-2 sm:gap-3">
                <Link href="/parent/progress">
                  <Button className="w-full justify-start bg-purple-600 hover:bg-purple-700 text-xs sm:text-sm p-2 sm:p-3">
                    <TrendingUp className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                    <span className="truncate">Progress</span>
                  </Button>
                </Link>
                <Link href="/parent/leaderboard">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-xs sm:text-sm p-2 sm:p-3 bg-transparent"
                  >
                    <Award className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                    <span className="truncate">Leaderboard</span>
                  </Button>
                </Link>
                <Link href="/parent/notifications">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-xs sm:text-sm p-2 sm:p-3 bg-transparent"
                  >
                    <Bell className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                    <span className="truncate">Notifications</span>
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
                      <span className="text-xs font-medium sm:text-sm truncate">{subject.subject}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 sm:text-sm">{subject.progress}%</span>
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
                  className="block text-center text-xs text-purple-600 hover:underline sm:text-sm"
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
                      <h4 className="text-sm font-medium sm:text-base truncate">{result.quiz}</h4>
                      <p className="text-xs text-gray-500 sm:text-sm truncate">{result.subject}</p>
                      <p className="text-xs text-gray-500 sm:text-sm">{result.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold sm:text-lg">
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
                  className="block text-center text-xs text-purple-600 hover:underline sm:text-sm"
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
                      <span className="text-xs font-medium sm:text-sm truncate">{subject}</span>
                      <span className="text-xs font-medium sm:text-sm">
                        {subject === "Mathematics"
                          ? "85%"
                          : subject === "Science"
                            ? "78%"
                            : subject === "English"
                              ? "92%"
                              : "70%"}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-gray-100 sm:h-2">
                      <div
                        className="h-1.5 rounded-full bg-purple-600 sm:h-2"
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
                  <Button variant="outline" size="sm" className="w-full text-xs sm:text-sm bg-transparent">
                    View Detailed Progress
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
