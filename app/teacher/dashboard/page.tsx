"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Users, ClipboardList, Award, PlusCircle, User, BarChart, Calendar, Bell } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationBell } from "@/components/notification-bell"
import { AdaptiveFadeIn, AdaptiveSlideUp } from "@/components/adaptive-animated-components"

export default function TeacherDashboard() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Quiz Submissions",
      message: "15 students have completed the Mathematics Quiz.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "Grade Reminder",
      message: "Don't forget to assign grades for the Science Quiz by Friday.",
      time: "2 hours ago",
      read: false,
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
    subject: "Mathematics",
    grade: "10",
    teacherId: "Loading...",
  })

  useEffect(() => {
    // Get user info from localStorage
    const userName = localStorage.getItem("userName") || "Teacher"
    const userId = localStorage.getItem("userId") || "TA789012"

    setTeacherInfo({
      name: userName,
      subject: "Mathematics",
      grade: "10",
      teacherId: userId,
    })
  }, [])

  const recentNotes = [
    {
      id: "1",
      title: "Algebra II: Quadratic Equations",
      date: "Apr 10, 2025",
      views: 28,
      icon: "📐",
      color: "bg-blue-500",
    },
    {
      id: "2",
      title: "Geometry: Triangles and Angles",
      date: "Apr 5, 2025",
      views: 32,
      icon: "📏",
      color: "bg-indigo-500",
    },
  ]

  const activeQuizzes = [
    {
      id: "1",
      title: "Algebra II: Systems of Equations",
      dueDate: "Apr 15, 2025",
      submissions: "15/30",
      icon: "📊",
      color: "bg-blue-500",
    },
    {
      id: "2",
      title: "Geometry: Circles and Arcs",
      dueDate: "Apr 18, 2025",
      submissions: "8/30",
      icon: "⭕",
      color: "bg-indigo-500",
    },
  ]

  const topStudents = [
    { id: "1", name: "Alex Johnson", score: 92, avatar: "/placeholder.svg?height=40&width=40" },
    { id: "2", name: "Emma Davis", score: 88, avatar: "/placeholder.svg?height=40&width=40" },
    { id: "3", name: "Michael Brown", score: 85, avatar: "/placeholder.svg?height=40&width=40" },
    { id: "4", name: "James Wilson", score: 82, avatar: "/placeholder.svg?height=40&width=40" },
    { id: "5", name: "Olivia Smith", score: 80, avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const classPerformance = [
    { month: "Jan", average: 76 },
    { month: "Feb", average: 78 },
    { month: "Mar", average: 81 },
    { month: "Apr", average: 85 },
  ]

  const upcomingEvents = [
    { date: "Apr 15", title: "Mathematics Quiz", type: "quiz", time: "10:00 AM" },
    { date: "Apr 20", title: "Parent-Teacher Meeting", type: "meeting", time: "4:30 PM" },
    { date: "Apr 25", title: "End of Term Assessment", type: "assessment", time: "9:00 AM" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <AdaptiveFadeIn>
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome,{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400">
                    {teacherInfo.name}
                  </span>
                  !
                </h1>
                <p className="mt-1 text-gray-600 dark:text-gray-300">Here's an overview of your teaching dashboard</p>
              </div>
              <div className="mt-4 flex items-center gap-4 md:mt-0">
                <NotificationBell
                  notifications={notifications}
                  onMarkAsRead={markAsRead}
                  onMarkAllAsRead={markAllAsRead}
                />
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                  {teacherInfo.name.charAt(0)}
                </div>
              </div>
            </div>

            <Card className="mt-6 border-2 border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-900/20">
              <CardContent className="flex flex-col items-center justify-between p-6 sm:flex-row">
                <div className="flex items-center">
                  <div className="mr-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{teacherInfo.name}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{teacherInfo.subject} Teacher</p>
                  </div>
                </div>
                <div className="mt-4 rounded-lg border border-emerald-200 bg-white p-4 shadow-md dark:border-emerald-900/50 dark:bg-gray-900 sm:mt-0">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Teacher ID</p>
                  <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{teacherInfo.teacherId}</p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">Grade {teacherInfo.grade} Instructor</p>
                </div>
              </CardContent>
            </Card>
          </header>
        </AdaptiveFadeIn>

        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AdaptiveSlideUp>
            <Card className="overflow-hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-90"></div>
                <CardContent className="relative p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Students</p>
                      <p className="mt-1 text-3xl font-bold">30</p>
                    </div>
                    <div className="rounded-full bg-white/20 p-3">
                      <Users className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-blue-100">Grade 10 Mathematics</p>
                </CardContent>
              </div>
            </Card>
          </AdaptiveSlideUp>

          <AdaptiveSlideUp delay={0.1}>
            <Card className="overflow-hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-90"></div>
                <CardContent className="relative p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100">Notes</p>
                      <p className="mt-1 text-3xl font-bold">12</p>
                    </div>
                    <div className="rounded-full bg-white/20 p-3">
                      <BookOpen className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-emerald-100">Posted this term</p>
                </CardContent>
              </div>
            </Card>
          </AdaptiveSlideUp>

          <AdaptiveSlideUp delay={0.2}>
            <Card className="overflow-hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-90"></div>
                <CardContent className="relative p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Quizzes</p>
                      <p className="mt-1 text-3xl font-bold">8</p>
                    </div>
                    <div className="rounded-full bg-white/20 p-3">
                      <ClipboardList className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-purple-100">Created this term</p>
                </CardContent>
              </div>
            </Card>
          </AdaptiveSlideUp>

          <AdaptiveSlideUp delay={0.3}>
            <Card className="overflow-hidden">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-90"></div>
                <CardContent className="relative p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-amber-100">Avg. Score</p>
                      <p className="mt-1 text-3xl font-bold">82%</p>
                    </div>
                    <div className="rounded-full bg-white/20 p-3">
                      <Award className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-amber-100">Across all quizzes</p>
                </CardContent>
              </div>
            </Card>
          </AdaptiveSlideUp>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <AdaptiveSlideUp delay={0.1}>
              <Tabs defaultValue="performance" className="w-full">
                <TabsList className="mb-4 grid w-full grid-cols-3">
                  <TabsTrigger value="performance">Class Performance</TabsTrigger>
                  <TabsTrigger value="quizzes">Active Quizzes</TabsTrigger>
                  <TabsTrigger value="events">Upcoming Events</TabsTrigger>
                </TabsList>

                <TabsContent value="performance">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold">Class Performance Trend</h3>
                      <div className="h-64">
                        <div className="flex h-full flex-col">
                          <div className="flex h-full items-end">
                            {classPerformance.map((month, index) => (
                              <div
                                key={index}
                                className="relative mx-2 flex h-full flex-1 flex-col items-center justify-end"
                              >
                                <motion.div
                                  className="w-full rounded-t-md bg-gradient-to-t from-emerald-600 to-teal-500 dark:from-emerald-500 dark:to-teal-400"
                                  initial={{ height: 0 }}
                                  animate={{ height: `${month.average}%` }}
                                  transition={{ duration: 1, delay: index * 0.1 }}
                                />
                                <div className="mt-2 text-center">
                                  <span className="text-sm font-medium">{month.month}</span>
                                  <span className="block text-xs text-gray-500 dark:text-gray-400">
                                    {month.average}%
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Link href="/teacher/analytics">
                          <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500">
                            <BarChart className="mr-2 h-4 w-4" />
                            View Detailed Analytics
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="quizzes">
                  <Card>
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xl font-bold">Active Quizzes</h3>
                        <Link href="/teacher/quizzes">
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500"
                          >
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create Quiz
                          </Button>
                        </Link>
                      </div>

                      <div className="space-y-4">
                        {activeQuizzes.map((quiz, index) => (
                          <Card key={quiz.id} className="overflow-hidden">
                            <div className="relative">
                              <div className={`h-1 ${quiz.color}`}></div>
                              <CardContent className="p-4">
                                <div className="mb-2 flex items-center gap-3">
                                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-xl text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                    {quiz.icon}
                                  </div>
                                  <div>
                                    <h4 className="font-medium">{quiz.title}</h4>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Due: {quiz.dueDate}</p>
                                  </div>
                                </div>
                                <div className="mt-3 flex items-center justify-between">
                                  <div>
                                    <span className="text-sm font-medium">{quiz.submissions}</span>
                                    <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">submissions</span>
                                  </div>
                                  <Link href={`/teacher/quizzes/${quiz.id}`}>
                                    <Button size="sm" variant="outline">
                                      View Details
                                    </Button>
                                  </Link>
                                </div>
                              </CardContent>
                            </div>
                          </Card>
                        ))}
                      </div>

                      <Link
                        href="/teacher/quizzes"
                        className="mt-4 block text-center text-sm text-emerald-600 hover:underline dark:text-emerald-400"
                      >
                        View All Quizzes
                      </Link>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="events">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold">Upcoming Events</h3>
                      <div className="space-y-4">
                        {upcomingEvents.map((event, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 rounded-lg border p-4 dark:border-gray-800"
                          >
                            <div className="flex h-12 w-12 flex-shrink-0 flex-col items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                              <span className="text-xs font-medium">{event.date.split(" ")[0]}</span>
                              <span className="text-lg font-bold">{event.date.split(" ")[1]}</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{event.title}</h4>
                              <div className="mt-1 flex items-center gap-2">
                                <span
                                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                                    event.type === "quiz"
                                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                      : event.type === "meeting"
                                        ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                        : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                  }`}
                                >
                                  {event.type}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400">{event.time}</span>
                              </div>
                            </div>
                            <Button variant="outline" size="sm" className="flex-shrink-0">
                              Details
                            </Button>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6">
                        <Link href="/teacher/calendar">
                          <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500">
                            <Calendar className="mr-2 h-4 w-4" />
                            View Full Calendar
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </AdaptiveSlideUp>

            <AdaptiveSlideUp delay={0.2}>
              <div className="mt-8">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-xl font-bold">Recent Notes</h3>
                  <Link href="/teacher/notes">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500"
                    >
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Post Note
                    </Button>
                  </Link>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {recentNotes.map((note, index) => (
                    <Link href={`/teacher/notes/${note.id}`} key={index}>
                      <Card className="h-full cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md">
                        <CardContent className="p-6">
                          <div className="mb-3 flex items-center gap-2">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${note.color} text-white`}
                            >
                              <span className="text-sm">{note.icon}</span>
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Mathematics</span>
                          </div>
                          <h4 className="mb-2 font-medium">{note.title}</h4>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-500 dark:text-gray-400">Posted: {note.date}</p>
                            <span className="text-sm font-medium">{note.views} views</span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                <Link
                  href="/teacher/notes"
                  className="mt-4 block text-center text-sm text-emerald-600 hover:underline dark:text-emerald-400"
                >
                  View All Notes
                </Link>
              </div>
            </AdaptiveSlideUp>
          </div>

          <div>
            <AdaptiveSlideUp delay={0.3}>
              <h3 className="mb-4 text-xl font-bold">Top Performing Students</h3>
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {topStudents.map((student, index) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between rounded-lg border p-4 dark:border-gray-800"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center overflow-hidden rounded-full ${
                              index === 0
                                ? "border-2 border-yellow-400 bg-yellow-100 dark:bg-yellow-900/30"
                                : index === 1
                                  ? "border-2 border-gray-400 bg-gray-100 dark:bg-gray-800"
                                  : index === 2
                                    ? "border-2 border-amber-600 bg-amber-100 dark:bg-amber-900/30"
                                    : "bg-gray-100 dark:bg-gray-800"
                            }`}
                          >
                            {index < 3 ? (
                              <span
                                className={`text-sm font-bold ${
                                  index === 0
                                    ? "text-yellow-600 dark:text-yellow-400"
                                    : index === 1
                                      ? "text-gray-600 dark:text-gray-400"
                                      : "text-amber-600 dark:text-amber-400"
                                }`}
                              >
                                {index + 1}
                              </span>
                            ) : (
                              <img
                                src={student.avatar || "/placeholder.svg"}
                                alt={student.name}
                                className="h-full w-full object-cover"
                              />
                            )}
                          </div>
                          <div>
                            <h4 className="font-medium">{student.name}</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Grade 10 Mathematics</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                            {student.score}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href="/teacher/students"
                    className="mt-4 block text-center text-sm text-emerald-600 hover:underline dark:text-emerald-400"
                  >
                    View All Students
                  </Link>
                </CardContent>
              </Card>
            </AdaptiveSlideUp>

            <AdaptiveSlideUp delay={0.4}>
              <div className="mt-8">
                <h3 className="mb-4 text-xl font-bold">Notifications</h3>
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {notifications.map((notification, index) => (
                        <div
                          key={notification.id}
                          className={`rounded-lg border p-4 ${
                            notification.read
                              ? "border-gray-100 dark:border-gray-800"
                              : "border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-900/20"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                                notification.read
                                  ? "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                                  : "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
                              }`}
                            >
                              <Bell className="h-4 w-4" />
                            </div>
                            <div>
                              <h4 className="font-medium">{notification.title}</h4>
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{notification.message}</p>
                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Link href="/teacher/notifications">
                      <Button variant="outline" className="mt-4 w-full">
                        View All Notifications
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </AdaptiveSlideUp>
          </div>
        </div>
      </div>
    </div>
  )
}
