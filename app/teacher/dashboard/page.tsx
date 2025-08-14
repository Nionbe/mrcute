"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Users, BookOpen, FileText, Award, TrendingUp, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { NotificationBell } from "@/components/notification-bell"

export default function TeacherDashboard() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New Student Enrolled",
      message: "A new student has been enrolled in your Mathematics class.",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "Quiz Submissions",
      message: "15 students have submitted the Algebra quiz.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "Grade Deadline",
      message: "Grade submission deadline is tomorrow.",
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

  const [teacherInfo, setTeacherInfo] = useState({
    name: "Loading...",
    subject: "Loading...",
    grade: "Loading...",
    teacherId: "Loading...",
    email: "loading@example.com",
  })

  useEffect(() => {
    // Get user info from localStorage
    const userName = localStorage.getItem("userName") || "Teacher"
    const userData = localStorage.getItem("userData")
    const userId = localStorage.getItem("userId") || "TC000001"
    const userEmail = localStorage.getItem("userEmail") || "teacher@example.com"

    let subject = "Mathematics"
    let grade = "10"
    if (userData) {
      const parsedData = JSON.parse(userData)
      subject = parsedData.subject || "Mathematics"
      grade = parsedData.grade || "10"
    }

    setTeacherInfo({
      name: userName,
      subject: subject,
      grade: grade,
      teacherId: userId,
      email: userEmail,
    })
  }, [])

  const stats = [
    { title: "Total Students", value: 45, icon: Users, change: "+3 this month" },
    { title: "Active Quizzes", value: 8, icon: FileText, change: "+2 this week" },
    { title: "Avg Class Score", value: "82%", icon: TrendingUp, change: "+3% from last month" },
    { title: "Graded This Week", value: 23, icon: Award, change: "12 pending" },
  ]

  const recentQuizzes = [
    {
      id: "1",
      title: "Algebra Basics",
      subject: "Mathematics",
      submissions: 42,
      totalStudents: 45,
      avgScore: 85,
      date: "Apr 10, 2025",
      status: "Active",
    },
    {
      id: "2",
      title: "Quadratic Equations",
      subject: "Mathematics",
      submissions: 45,
      totalStudents: 45,
      avgScore: 78,
      date: "Apr 8, 2025",
      status: "Completed",
    },
    {
      id: "3",
      title: "Functions and Graphs",
      subject: "Mathematics",
      submissions: 0,
      totalStudents: 45,
      avgScore: 0,
      date: "Apr 15, 2025",
      status: "Scheduled",
    },
  ]

  const topStudents = [
    {
      id: "1",
      name: "Emma Johnson",
      grade: "10A",
      avgScore: 95,
      lastQuiz: 98,
      trend: "up",
    },
    {
      id: "2",
      name: "Michael Chen",
      grade: "10A",
      avgScore: 92,
      lastQuiz: 89,
      trend: "down",
    },
    {
      id: "3",
      name: "Sarah Williams",
      grade: "10B",
      avgScore: 90,
      lastQuiz: 94,
      trend: "up",
    },
    {
      id: "4",
      name: "David Brown",
      grade: "10A",
      avgScore: 88,
      lastQuiz: 91,
      trend: "up",
    },
  ]

  const pendingTasks = [
    {
      id: "1",
      task: "Grade Algebra Quiz",
      students: 12,
      dueDate: "Apr 12, 2025",
      priority: "high",
    },
    {
      id: "2",
      task: "Create Functions Quiz",
      students: 45,
      dueDate: "Apr 15, 2025",
      priority: "medium",
    },
    {
      id: "3",
      task: "Update Study Notes",
      students: 45,
      dueDate: "Apr 18, 2025",
      priority: "low",
    },
  ]

  return (
    <div className="w-full">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
        <div className="flex items-center">
          <h1 className="text-lg font-bold md:text-xl">Welcome, {teacherInfo.name}!</h1>
          <div className="ml-4 flex items-center rounded-full bg-orange-100 px-3 py-1">
            <span className="text-sm font-medium text-orange-600">
              {teacherInfo.subject} - Grade {teacherInfo.grade}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <NotificationBell notifications={notifications} onMarkAsRead={markAsRead} onMarkAllAsRead={markAllAsRead} />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600">
            {teacherInfo.name.charAt(0)}
          </div>
        </div>
      </header>

      <div className="p-4 md:p-6">
        <div className="mb-6">
          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardContent className="flex flex-col items-center justify-between p-6 sm:flex-row">
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{teacherInfo.name}</h2>
                  <p className="text-gray-600">{teacherInfo.subject} Teacher</p>
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-orange-200 bg-white p-3 sm:mt-0">
                <p className="text-sm text-gray-500">Teacher ID</p>
                <p className="text-xl font-bold text-orange-600">{teacherInfo.teacherId}</p>
                <p className="text-xs text-gray-400">
                  Grade {teacherInfo.grade} • {teacherInfo.email}
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
                <p className="flex items-center text-xs text-orange-600">{stat.change}</p>
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
                <Link href="/teacher/quizzes/create">
                  <Button className="w-full justify-start bg-orange-600 hover:bg-orange-700">
                    <FileText className="mr-2 h-4 w-4" />
                    Create Quiz
                  </Button>
                </Link>
                <Link href="/teacher/grades">
                  <Button className="w-full justify-start bg-orange-600 hover:bg-orange-700">
                    <Award className="mr-2 h-4 w-4" />
                    Grade Quizzes
                  </Button>
                </Link>
                <Link href="/teacher/students">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="mr-2 h-4 w-4" />
                    View Students
                  </Button>
                </Link>
                <Link href="/teacher/notes">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Study Notes
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending Tasks</CardTitle>
              <CardDescription>Tasks that need your attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h4 className="font-medium">{task.task}</h4>
                      <p className="text-sm text-gray-500">{task.students} students</p>
                      <p className="text-sm text-gray-500">Due: {task.dueDate}</p>
                    </div>
                    <Badge
                      variant={
                        task.priority === "high" ? "destructive" : task.priority === "medium" ? "default" : "secondary"
                      }
                    >
                      {task.priority}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Quizzes</CardTitle>
              <CardDescription>Your latest quiz activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentQuizzes.map((quiz) => (
                  <div key={quiz.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h4 className="font-medium">{quiz.title}</h4>
                      <p className="text-sm text-gray-500">{quiz.subject}</p>
                      <p className="text-sm text-gray-500">
                        {quiz.submissions}/{quiz.totalStudents} submissions
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{quiz.date}</p>
                      <Badge
                        variant={
                          quiz.status === "Active" ? "default" : quiz.status === "Completed" ? "secondary" : "outline"
                        }
                      >
                        {quiz.status}
                      </Badge>
                      {quiz.status === "Completed" && (
                        <p className="text-xs text-gray-500 mt-1">Avg: {quiz.avgScore}%</p>
                      )}
                    </div>
                  </div>
                ))}
                <Link href="/teacher/quizzes" className="block text-center text-sm text-orange-600 hover:underline">
                  View All Quizzes
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Students</CardTitle>
              <CardDescription>Students with highest average scores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topStudents.map((student, index) => (
                  <div key={student.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center">
                      <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 text-sm font-bold">
                        #{index + 1}
                      </div>
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-gray-500">{student.grade}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">{student.avgScore}%</p>
                      <p className="text-xs text-gray-500">Last: {student.lastQuiz}%</p>
                      <span className={`text-xs ${student.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                        {student.trend === "up" ? "↗" : "↘"}
                      </span>
                    </div>
                  </div>
                ))}
                <Link href="/teacher/students" className="block text-center text-sm text-orange-600 hover:underline">
                  View All Students
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
