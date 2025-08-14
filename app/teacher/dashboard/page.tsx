"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Users, BookOpen, FileText, Award, TrendingUp, GraduationCap, LogOut } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { NotificationBell } from "@/components/notification-bell"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"

export default function TeacherDashboard() {
  const router = useRouter()
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New Student Enrolled",
      message: "A new student has been enrolled in your Mathematics class.",
      time: "30 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "Quiz Submissions",
      message: "15 students have submitted the Algebra quiz.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "3",
      title: "Parent Meeting Request",
      message: "Parent of John Doe has requested a meeting.",
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

  const [teacherInfo, setTeacherInfo] = useState({
    name: "Loading...",
    subjects: ["Mathematics"],
    grades: ["10"],
    teacherId: "Loading...",
    email: "loading@example.com",
  })

  useEffect(() => {
    const userName = localStorage.getItem("userName") || "Teacher"
    const userData = localStorage.getItem("userData")
    const userId = localStorage.getItem("userId") || "TC123456"
    const userEmail = localStorage.getItem("userEmail") || "teacher@example.com"

    let subjects = ["Mathematics"]
    let grades = ["10"]

    if (userData) {
      const parsedData = JSON.parse(userData)
      subjects = parsedData.subjects || ["Mathematics"]
      grades = parsedData.grades || ["10"]
    }

    setTeacherInfo({
      name: userName,
      subjects: subjects,
      grades: grades,
      teacherId: userId,
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
    { title: "Total Students", value: 45, icon: Users, change: "+3 this week" },
    { title: "Active Quizzes", value: 8, icon: FileText, change: "+2 this week" },
    { title: "Study Notes", value: 12, icon: BookOpen, change: "+1 this week" },
    { title: "Avg Class Score", value: "82%", icon: TrendingUp, change: "+3% this month" },
  ]

  const recentQuizzes = [
    {
      id: "1",
      title: "Algebra Basics",
      subject: "Mathematics",
      submissions: 28,
      totalStudents: 30,
      avgScore: 85,
      date: "Apr 10, 2025",
    },
    {
      id: "2",
      title: "Quadratic Equations",
      subject: "Mathematics",
      submissions: 25,
      totalStudents: 30,
      avgScore: 78,
      date: "Apr 8, 2025",
    },
    {
      id: "3",
      title: "Functions and Graphs",
      subject: "Mathematics",
      submissions: 30,
      totalStudents: 30,
      avgScore: 92,
      date: "Apr 5, 2025",
    },
  ]

  const recentNotes = [
    {
      id: "1",
      title: "Quadratic Formula Derivation",
      subject: "Mathematics",
      views: 45,
      date: "Apr 9, 2025",
    },
    {
      id: "2",
      title: "Solving Linear Equations",
      subject: "Mathematics",
      views: 38,
      date: "Apr 7, 2025",
    },
    {
      id: "3",
      title: "Graphing Functions",
      subject: "Mathematics",
      views: 52,
      date: "Apr 4, 2025",
    },
  ]

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className="flex items-center gap-2 md:gap-4">
          <h1 className="text-base font-semibold sm:text-lg md:text-xl">
            Welcome, <span className="text-green-600">{teacherInfo.name}</span>!
          </h1>
          <div className="flex items-center rounded-full bg-green-100 px-2 py-1 sm:px-3">
            <span className="text-xs font-medium text-green-600 sm:text-sm truncate">
              {teacherInfo.subjects.join(", ")} • Grade {teacherInfo.grades.join(", ")}
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
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600 text-xs sm:h-8 sm:w-8 sm:text-sm">
            {teacherInfo.name.charAt(0)}
          </div>
        </div>
      </header>

      <main className="flex-1 space-y-4 p-4 sm:space-y-6 sm:p-6">
        <div className="mb-4 sm:mb-6">
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="flex flex-col items-center justify-between p-4 sm:flex-row sm:p-6">
              <div className="flex items-center">
                <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 sm:mr-4 sm:h-12 sm:w-12">
                  <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold sm:text-xl">{teacherInfo.name}</h2>
                  <p className="text-sm text-gray-600 sm:text-base truncate">
                    {teacherInfo.subjects.join(" & ")} Teacher
                  </p>
                </div>
              </div>
              <div className="mt-3 rounded-lg border border-green-200 bg-white p-3 sm:mt-0">
                <p className="text-xs text-gray-500 sm:text-sm">Teacher ID</p>
                <p className="text-lg font-bold text-green-600 sm:text-xl">{teacherInfo.teacherId}</p>
                <p className="text-xs text-gray-400 truncate">
                  Grade {teacherInfo.grades.join(", ")} • {teacherInfo.email}
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
                  <span className="text-green-600">{stat.change}</span>
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
                <Link href="/teacher/quizzes/create">
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-xs sm:text-sm p-2 sm:p-3">
                    <FileText className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                    <span className="truncate">Create Quiz</span>
                  </Button>
                </Link>
                <Link href="/teacher/notes">
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-xs sm:text-sm p-2 sm:p-3">
                    <BookOpen className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                    <span className="truncate">Add Notes</span>
                  </Button>
                </Link>
                <Link href="/teacher/students">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-xs sm:text-sm p-2 sm:p-3 bg-transparent"
                  >
                    <Users className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                    <span className="truncate">Students</span>
                  </Button>
                </Link>
                <Link href="/teacher/grades">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-xs sm:text-sm p-2 sm:p-3 bg-transparent"
                  >
                    <Award className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                    <span className="truncate">Grades</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Class Overview</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Your teaching statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium sm:text-sm">Quiz Completion Rate</span>
                    <span className="text-xs text-gray-500 sm:text-sm">87%</span>
                  </div>
                  <Progress value={87} className="h-1.5 sm:h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium sm:text-sm">Average Class Score</span>
                    <span className="text-xs text-gray-500 sm:text-sm">82%</span>
                  </div>
                  <Progress value={82} className="h-1.5 sm:h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium sm:text-sm">Student Engagement</span>
                    <span className="text-xs text-gray-500 sm:text-sm">94%</span>
                  </div>
                  <Progress value={94} className="h-1.5 sm:h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Recent Quizzes</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Latest quiz submissions and results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {recentQuizzes.map((quiz) => (
                  <div key={quiz.id} className="flex items-center justify-between rounded-lg border p-3 sm:p-4">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-medium sm:text-base truncate">{quiz.title}</h4>
                      <p className="text-xs text-gray-500 sm:text-sm truncate">{quiz.subject}</p>
                      <p className="text-xs text-gray-500 sm:text-sm">
                        {quiz.submissions}/{quiz.totalStudents} submitted
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-bold sm:text-lg">{quiz.avgScore}%</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {quiz.date}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Link
                  href="/teacher/quizzes"
                  className="block text-center text-xs text-green-600 hover:underline sm:text-sm"
                >
                  View All Quizzes
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Study Notes</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Your published study materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {recentNotes.map((note) => (
                  <div key={note.id} className="flex items-center justify-between rounded-lg border p-3 sm:p-4">
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-medium sm:text-base truncate">{note.title}</h4>
                      <p className="text-xs text-gray-500 sm:text-sm truncate">{note.subject}</p>
                      <p className="text-xs text-gray-500 sm:text-sm">{note.views} views</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {note.date}
                      </Badge>
                    </div>
                  </div>
                ))}
                <Link
                  href="/teacher/notes"
                  className="block text-center text-xs text-green-600 hover:underline sm:text-sm"
                >
                  View All Notes
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
