"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BookOpen, FileText, Award, TrendingUp, Clock, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { NotificationBell } from "@/components/notification-bell"

export default function StudentDashboard() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New Quiz Available",
      message: "A new Mathematics quiz has been posted for Grade 10 students.",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "Assignment Due Soon",
      message: "Your Physics assignment is due tomorrow at 11:59 PM.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: "3",
      title: "Grade Updated",
      message: "Your Chemistry quiz grade has been updated.",
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

  const [studentInfo, setStudentInfo] = useState({
    name: "Loading...",
    grade: "Loading...",
    studentId: "Loading...",
    email: "loading@example.com",
  })

  useEffect(() => {
    // Get user info from localStorage
    const userName = localStorage.getItem("userName") || "Student"
    const userData = localStorage.getItem("userData")
    const userId = localStorage.getItem("userId") || "ST000001"
    const userEmail = localStorage.getItem("userEmail") || "student@example.com"

    let grade = "10"
    if (userData) {
      const parsedData = JSON.parse(userData)
      grade = parsedData.grade || "10"
    }

    setStudentInfo({
      name: userName,
      grade: grade,
      studentId: userId,
      email: userEmail,
    })
  }, [])

  const stats = [
    { title: "Completed Quizzes", value: 12, icon: FileText, change: "+3 this week" },
    { title: "Average Score", value: "85%", icon: TrendingUp, change: "+5% from last month" },
    { title: "Study Hours", value: 24, icon: Clock, change: "+2 hours this week" },
    { title: "Rank", value: "#15", icon: Award, change: "↑3 positions" },
  ]

  const recentQuizzes = [
    {
      id: "1",
      subject: "Mathematics",
      title: "Algebra Basics",
      score: 92,
      maxScore: 100,
      date: "Apr 10, 2025",
      status: "Completed",
    },
    {
      id: "2",
      subject: "Physics",
      title: "Motion and Forces",
      score: 78,
      maxScore: 100,
      date: "Apr 8, 2025",
      status: "Completed",
    },
    {
      id: "3",
      subject: "Chemistry",
      title: "Atomic Structure",
      score: 0,
      maxScore: 100,
      date: "Apr 12, 2025",
      status: "Pending",
    },
  ]

  const upcomingQuizzes = [
    {
      id: "1",
      subject: "Biology",
      title: "Cell Structure",
      dueDate: "Apr 15, 2025",
      duration: "45 minutes",
    },
    {
      id: "2",
      subject: "English",
      title: "Grammar and Vocabulary",
      dueDate: "Apr 18, 2025",
      duration: "30 minutes",
    },
    {
      id: "3",
      subject: "History",
      title: "World War II",
      dueDate: "Apr 20, 2025",
      duration: "60 minutes",
    },
  ]

  const studyNotes = [
    {
      id: "1",
      subject: "Mathematics",
      title: "Quadratic Equations",
      lastUpdated: "Apr 9, 2025",
      progress: 75,
    },
    {
      id: "2",
      subject: "Physics",
      title: "Electromagnetic Waves",
      lastUpdated: "Apr 7, 2025",
      progress: 60,
    },
    {
      id: "3",
      subject: "Chemistry",
      title: "Chemical Bonding",
      lastUpdated: "Apr 5, 2025",
      progress: 90,
    },
  ]

  return (
    <div className="w-full">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
        <div className="flex items-center">
          <h1 className="text-lg font-bold md:text-xl">Welcome back, {studentInfo.name}!</h1>
          <div className="ml-4 flex items-center rounded-full bg-blue-100 px-3 py-1">
            <span className="text-sm font-medium text-blue-600">Grade {studentInfo.grade}</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <NotificationBell notifications={notifications} onMarkAsRead={markAsRead} onMarkAllAsRead={markAllAsRead} />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            {studentInfo.name.charAt(0)}
          </div>
        </div>
      </header>

      <div className="p-4 md:p-6">
        <div className="mb-6">
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="flex flex-col items-center justify-between p-6 sm:flex-row">
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold">{studentInfo.name}</h2>
                  <p className="text-gray-600">Grade {studentInfo.grade} Student</p>
                </div>
              </div>
              <div className="mt-4 rounded-lg border border-blue-200 bg-white p-3 sm:mt-0">
                <p className="text-sm text-gray-500">Student ID</p>
                <p className="text-xl font-bold text-blue-600">{studentInfo.studentId}</p>
                <p className="text-xs text-gray-400">{studentInfo.email}</p>
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
                <p className="flex items-center text-xs text-blue-600">{stat.change}</p>
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
                <Link href="/student/quizzes">
                  <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                    <FileText className="mr-2 h-4 w-4" />
                    Take Quiz
                  </Button>
                </Link>
                <Link href="/student/notes">
                  <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Study Notes
                  </Button>
                </Link>
                <Link href="/student/results">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    View Results
                  </Button>
                </Link>
                <Link href="/student/leaderboard">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Award className="mr-2 h-4 w-4" />
                    Leaderboard
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Study Progress</CardTitle>
              <CardDescription>Your recent study notes progress</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {studyNotes.slice(0, 3).map((note) => (
                  <div key={note.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{note.title}</p>
                        <p className="text-xs text-gray-500">{note.subject}</p>
                      </div>
                      <span className="text-sm text-gray-500">{note.progress}%</span>
                    </div>
                    <Progress value={note.progress} className="h-2" />
                  </div>
                ))}
                <Link href="/student/notes" className="block text-center text-sm text-blue-600 hover:underline">
                  View All Notes
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Quiz Results</CardTitle>
              <CardDescription>Your latest quiz performances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentQuizzes.map((quiz) => (
                  <div key={quiz.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h4 className="font-medium">{quiz.title}</h4>
                      <p className="text-sm text-gray-500">{quiz.subject}</p>
                      <p className="text-sm text-gray-500">{quiz.date}</p>
                    </div>
                    <div className="text-right">
                      {quiz.status === "Completed" ? (
                        <>
                          <span className="text-lg font-bold">
                            {quiz.score}/{quiz.maxScore}
                          </span>
                          <Badge
                            variant={quiz.score >= 80 ? "default" : quiz.score >= 60 ? "secondary" : "destructive"}
                            className="ml-2"
                          >
                            {Math.round((quiz.score / quiz.maxScore) * 100)}%
                          </Badge>
                        </>
                      ) : (
                        <Badge variant="outline">Pending</Badge>
                      )}
                    </div>
                  </div>
                ))}
                <Link href="/student/results" className="block text-center text-sm text-blue-600 hover:underline">
                  View All Results
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Quizzes</CardTitle>
              <CardDescription>Quizzes you need to complete</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingQuizzes.map((quiz) => (
                  <div key={quiz.id} className="flex items-center justify-between rounded-lg border p-4">
                    <div>
                      <h4 className="font-medium">{quiz.title}</h4>
                      <p className="text-sm text-gray-500">{quiz.subject}</p>
                      <p className="text-sm text-gray-500">Duration: {quiz.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{quiz.dueDate}</p>
                      <Badge variant="outline" className="mt-1">
                        Due Soon
                      </Badge>
                    </div>
                  </div>
                ))}
                <Link href="/student/quizzes" className="block text-center text-sm text-blue-600 hover:underline">
                  View All Quizzes
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
