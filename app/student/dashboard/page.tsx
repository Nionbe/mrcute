"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Clock, Award, Calendar, BarChart, FileText, Bell } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationBell } from "@/components/notification-bell"
import { AdaptiveFadeIn, AdaptiveSlideUp } from "@/components/adaptive-animated-components"

export default function StudentDashboard() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "New Quiz Available",
      message: "Mathematics Quiz for Grade 10 is now available. Complete it before Friday.",
      time: "10 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "Quiz Results",
      message: "Your Science Quiz results are now available. You scored 85%!",
      time: "2 hours ago",
      read: false,
    },
    {
      id: "3",
      title: "Rank Update",
      message: "Congratulations! You've moved up to rank #5 in Mathematics.",
      time: "1 day ago",
      read: true,
    },
  ])

  const [studentInfo, setStudentInfo] = useState({
    name: "Loading...",
    grade: "10",
    studentId: "Loading...",
    totalPoints: 1250,
    rank: 5,
  })

  useEffect(() => {
    // Get user info from localStorage
    const userName = localStorage.getItem("userName") || "Student"
    const userGrade = localStorage.getItem("userGrade") || "10"
    const userId = localStorage.getItem("userId") || "SA123456"

    setStudentInfo({
      name: userName,
      grade: userGrade,
      studentId: userId,
      totalPoints: 1250,
      rank: 5,
    })
  }, [])

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((notification) => ({ ...notification, read: true })))
  }

  const upcomingQuizzes = [
    {
      id: "1",
      subject: "Mathematics",
      topic: "Algebra II",
      dueDate: "Apr 15, 2025",
      timeLimit: "45 min",
      icon: "📐",
      color: "bg-blue-500",
    },
    {
      id: "2",
      subject: "Science",
      topic: "Cell Biology",
      dueDate: "Apr 18, 2025",
      timeLimit: "60 min",
      icon: "🧬",
      color: "bg-green-500",
    },
    {
      id: "3",
      subject: "History",
      topic: "World War II",
      dueDate: "Apr 20, 2025",
      timeLimit: "30 min",
      icon: "🏛️",
      color: "bg-amber-500",
    },
  ]

  const recentNotes = [
    {
      id: "1",
      subject: "History",
      title: "World War II Overview",
      date: "Apr 10, 2025",
      icon: "🏛️",
      color: "bg-amber-500",
    },
    {
      id: "2",
      subject: "Geography",
      title: "Climate Zones",
      date: "Apr 8, 2025",
      icon: "🌍",
      color: "bg-emerald-500",
    },
    {
      id: "3",
      subject: "English",
      title: "Shakespeare's Sonnets",
      date: "Apr 5, 2025",
      icon: "📚",
      color: "bg-purple-500",
    },
  ]

  const subjectProgress = [
    { subject: "Mathematics", progress: 78, icon: "📐", color: "from-blue-500 to-indigo-500" },
    { subject: "Science", progress: 65, icon: "🧬", color: "from-green-500 to-teal-500" },
    { subject: "English", progress: 92, icon: "📚", color: "from-purple-500 to-pink-500" },
    { subject: "History", progress: 45, icon: "🏛️", color: "from-amber-500 to-orange-500" },
  ]

  const events = [
    { date: "Apr 15", title: "Mathematics Quiz", type: "quiz", time: "10:00 AM" },
    { date: "Apr 18", title: "Science Project Due", type: "deadline", time: "11:59 PM" },
    { date: "Apr 20", title: "History Presentation", type: "presentation", time: "2:00 PM" },
    { date: "Apr 25", title: "Parent-Teacher Meeting", type: "meeting", time: "4:30 PM" },
  ]

  const achievements = [
    { title: "Perfect Score", description: "Scored 100% on a quiz", icon: "🏆", unlocked: true },
    { title: "Quick Learner", description: "Completed 5 lessons in one day", icon: "⚡", unlocked: true },
    { title: "Math Wizard", description: "Solved 50 math problems", icon: "🧙", unlocked: true },
    { title: "Science Explorer", description: "Completed all science modules", icon: "🔬", unlocked: false },
    { title: "History Buff", description: "Aced the history final exam", icon: "📜", unlocked: false },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        <AdaptiveFadeIn>
          <header className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400">
                    {studentInfo.name}
                  </span>
                  !
                </h1>
                <p className="mt-1 text-gray-600 dark:text-gray-300">Here's an overview of your learning journey</p>
              </div>
              <div className="mt-4 flex items-center gap-4 md:mt-0">
                <NotificationBell
                  notifications={notifications}
                  onMarkAsRead={markAsRead}
                  onMarkAllAsRead={markAllAsRead}
                />
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                  {studentInfo.name.charAt(0)}
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
              <Card className="overflow-hidden">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-90"></div>
                  <CardContent className="relative p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100">Attendance</p>
                        <p className="mt-1 text-3xl font-bold">95%</p>
                      </div>
                      <div className="rounded-full bg-white/20 p-3">
                        <Clock className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Progress value={95} className="h-1.5 bg-white/20" />
                    </div>
                  </CardContent>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600 opacity-90"></div>
                  <CardContent className="relative p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-emerald-100">Assignments</p>
                        <p className="mt-1 text-3xl font-bold">24/25</p>
                      </div>
                      <div className="rounded-full bg-white/20 p-3">
                        <FileText className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Progress value={96} className="h-1.5 bg-white/20" />
                    </div>
                  </CardContent>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-600 opacity-90"></div>
                  <CardContent className="relative p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100">Quiz Score</p>
                        <p className="mt-1 text-3xl font-bold">89%</p>
                      </div>
                      <div className="rounded-full bg-white/20 p-3">
                        <Award className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Progress value={89} className="h-1.5 bg-white/20" />
                    </div>
                  </CardContent>
                </div>
              </Card>

              <Card className="overflow-hidden">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-amber-600 opacity-90"></div>
                  <CardContent className="relative p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-amber-100">Rank</p>
                        <p className="mt-1 text-3xl font-bold">#5</p>
                      </div>
                      <div className="rounded-full bg-white/20 p-3">
                        <BarChart className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center gap-1">
                        <div className="h-1.5 w-1/5 rounded-full bg-white/20"></div>
                        <div className="h-1.5 w-1/5 rounded-full bg-white/40"></div>
                        <div className="h-1.5 w-1/5 rounded-full bg-white/60"></div>
                        <div className="h-1.5 w-1/5 rounded-full bg-white/80"></div>
                        <div className="h-1.5 w-1/5 rounded-full bg-white"></div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </div>
          </header>
        </AdaptiveFadeIn>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <AdaptiveSlideUp>
              <Tabs defaultValue="progress" className="w-full">
                <TabsList className="mb-4 grid w-full grid-cols-3">
                  <TabsTrigger value="progress">Progress</TabsTrigger>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                <TabsContent value="progress">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold">Subject Progress</h3>
                      <div className="space-y-6">
                        {subjectProgress.map((subject, index) => (
                          <div key={index}>
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xl">{subject.icon}</span>
                                <span className="font-medium">{subject.subject}</span>
                              </div>
                              <span className="text-sm font-medium">{subject.progress}%</span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                              <motion.div
                                className="h-full rounded-full"
                                style={{
                                  background: `linear-gradient(to right, ${subject.color.split(" ")[1]}, ${subject.color.split(" ")[3]})`,
                                }}
                                initial={{ width: 0 }}
                                animate={{ width: `${subject.progress}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6">
                        <Link href="/student/results">
                          <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500">
                            View Detailed Progress
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="upcoming">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold">Upcoming Events</h3>
                      <div className="space-y-4">
                        {events.map((event, index) => (
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
                                      : event.type === "deadline"
                                        ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                        : event.type === "presentation"
                                          ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                                          : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
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
                        <Link href="/student/calendar">
                          <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500">
                            <Calendar className="mr-2 h-4 w-4" />
                            View Full Calendar
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="achievements">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="mb-4 text-xl font-bold">Your Achievements</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {achievements.map((achievement, index) => (
                          <div
                            key={index}
                            className={`rounded-lg border p-4 transition-all ${
                              achievement.unlocked
                                ? "border-emerald-200 bg-emerald-50 dark:border-emerald-900/50 dark:bg-emerald-900/20"
                                : "border-gray-200 bg-gray-50 opacity-60 dark:border-gray-800 dark:bg-gray-900/50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full text-xl ${
                                  achievement.unlocked
                                    ? "bg-emerald-100 dark:bg-emerald-900/30"
                                    : "bg-gray-100 dark:bg-gray-800"
                                }`}
                              >
                                {achievement.icon}
                              </div>
                              <div>
                                <h4 className="font-medium">{achievement.title}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{achievement.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6">
                        <Link href="/student/achievements">
                          <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500">
                            View All Achievements
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </AdaptiveSlideUp>

            <AdaptiveSlideUp delay={0.1}>
              <div className="mt-8">
                <h3 className="mb-4 text-xl font-bold">Recent Notes</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {recentNotes.map((note, index) => (
                    <Link href={`/student/notes/${note.id}`} key={index}>
                      <Card className="h-full cursor-pointer transition-all hover:-translate-y-1 hover:shadow-md">
                        <CardContent className="p-6">
                          <div className="mb-3 flex items-center gap-2">
                            <div
                              className={`flex h-8 w-8 items-center justify-center rounded-full ${note.color} text-white`}
                            >
                              <span className="text-sm">{note.icon}</span>
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{note.subject}</span>
                          </div>
                          <h4 className="mb-2 font-medium">{note.title}</h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">Updated: {note.date}</p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </AdaptiveSlideUp>
          </div>

          <div>
            <AdaptiveSlideUp delay={0.2}>
              <h3 className="mb-4 text-xl font-bold">Upcoming Quizzes</h3>
              <div className="space-y-4">
                {upcomingQuizzes.map((quiz, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative">
                      <div className={`h-1 ${quiz.color}`}></div>
                      <CardContent className="p-6">
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{quiz.icon}</span>
                            <span className="font-medium">{quiz.subject}</span>
                          </div>
                          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                            {quiz.timeLimit}
                          </span>
                        </div>
                        <h4 className="mb-2 font-medium">{quiz.topic}</h4>
                        <div className="flex items-center justify-between">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Due: {quiz.dueDate}</p>
                          <Link href={`/student/quizzes/${quiz.id}`}>
                            <Button size="sm" variant="outline">
                              Start Quiz
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}

                <Link href="/student/quizzes">
                  <Button className="mt-2 w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500">
                    View All Quizzes
                  </Button>
                </Link>
              </div>
            </AdaptiveSlideUp>

            <AdaptiveSlideUp delay={0.3}>
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

                    <Link href="/student/notifications">
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
