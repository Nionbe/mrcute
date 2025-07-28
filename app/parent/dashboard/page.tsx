"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { NotificationBell } from "@/components/notification-bell"
import { GraduationCap, Award, CreditCard, BarChart3, Clock } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ParentDashboard() {
  const [childInfo, setChildInfo] = useState({
    name: "Loading...",
    grade: "Loading...",
    studentId: "Loading...",
  })
  const [userName, setUserName] = useState("Parent")

  useEffect(() => {
    // Get child info from localStorage
    const childId = localStorage.getItem("childId")
    const childName = localStorage.getItem("childName")
    const childGrade = localStorage.getItem("childGrade")
    const storedUserName = localStorage.getItem("userName")

    if (childId && childName && childGrade) {
      setChildInfo({
        name: childName,
        grade: childGrade,
        studentId: childId,
      })
    }

    if (storedUserName) {
      setUserName(storedUserName)
    }
  }, [])

  const recentQuizzes = [
    {
      subject: "Mathematics",
      topic: "Algebra II",
      date: "Apr 10, 2025",
      score: 85,
    },
    {
      subject: "Science",
      topic: "Cell Biology",
      date: "Apr 5, 2025",
      score: 92,
    },
    {
      subject: "English",
      topic: "Literary Analysis",
      date: "Apr 1, 2025",
      score: 78,
    },
  ]

  const upcomingPayments = [
    {
      description: "Term 3 Tuition",
      amount: "350 ETB",
      dueDate: "May 15, 2025",
    },
    {
      description: "Field Trip Fee",
      amount: "75 ETB",
      dueDate: "Apr 25, 2025",
    },
  ]

  const notifications = [
    {
      id: "1",
      title: "Quiz Results Available",
      message: "Your child's Science quiz results are now available.",
      date: "Apr 10, 2025",
      read: false,
    },
    {
      id: "2",
      title: "Parent-Teacher Meeting",
      message: "Upcoming parent-teacher meeting scheduled for April 20.",
      date: "Apr 8, 2025",
      read: true,
    },
    {
      id: "3",
      title: "Payment Reminder",
      message: "Term 3 tuition payment is due on May 15.",
      date: "Apr 5, 2025",
      read: true,
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="parent" />

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <h1 className="text-lg font-bold md:text-xl">Parent Dashboard</h1>
          <div className="flex items-center gap-4">
            <NotificationBell notifications={notifications} />
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-sm font-medium text-green-600">{userName.charAt(0)}</span>
              </div>
              <span className="hidden text-sm font-medium md:inline-block">{userName}</span>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <Card className="mb-6 border-2 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h2 className="text-xl font-bold">{childInfo.name}</h2>
                  <p className="text-sm text-gray-600">Grade {childInfo.grade} Student</p>
                  <p className="text-sm text-gray-600">Student ID: {childInfo.studentId}</p>
                  <p className="text-sm text-gray-600">Safari Academy</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Academic Standing</p>
                  <p className="text-lg font-bold text-green-600">Good Standing</p>
                  <p className="text-xs text-gray-500">Based on attendance and grades</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Overall Average</p>
                  <p className="text-lg font-bold text-green-600">B+ (85%)</p>
                  <p className="text-xs text-gray-500">Term 2 average across all subjects</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Recent Performance</CardTitle>
                  <BarChart3 className="h-4 w-4 text-gray-500" />
                </div>
                <CardDescription>Latest quiz results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentQuizzes.map((quiz, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div>
                        <p className="font-medium">{quiz.subject}</p>
                        <p className="text-xs text-gray-500">{quiz.topic}</p>
                      </div>
                      <div className="text-right">
                        <span
                          className={`font-bold ${
                            quiz.score >= 90
                              ? "text-green-600"
                              : quiz.score >= 80
                                ? "text-blue-600"
                                : quiz.score >= 70
                                  ? "text-yellow-600"
                                  : "text-red-600"
                          }`}
                        >
                          {quiz.score}%
                        </span>
                        <p className="text-xs text-gray-500">{quiz.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/parent/progress">
                    <Button variant="outline" size="sm" className="w-full">
                      View Full Progress Report
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Upcoming Payments</CardTitle>
                  <CreditCard className="h-4 w-4 text-gray-500" />
                </div>
                <CardDescription>Payment schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingPayments.map((payment, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-2 last:border-0">
                      <div>
                        <p className="font-medium">{payment.description}</p>
                        <p className="text-xs text-gray-500">Due: {payment.dueDate}</p>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-green-600">{payment.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/parent/payments">
                    <Button variant="outline" size="sm" className="w-full">
                      Manage Payments
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Notifications</CardTitle>
                  <Clock className="h-4 w-4 text-gray-500" />
                </div>
                <CardDescription>Recent updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.slice(0, 3).map((notification) => (
                    <div key={notification.id} className="flex items-start gap-2 border-b pb-2 last:border-0">
                      <div
                        className={`mt-0.5 h-2 w-2 rounded-full ${notification.read ? "bg-gray-300" : "bg-green-500"}`}
                      ></div>
                      <div>
                        <p className="font-medium">{notification.title}</p>
                        <p className="text-xs text-gray-500">{notification.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/parent/notifications">
                    <Button variant="outline" size="sm" className="w-full">
                      View All Notifications
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Academic Progress</CardTitle>
                  <GraduationCap className="h-5 w-5 text-gray-500" />
                </div>
                <CardDescription>Subject performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Mathematics", "Science", "English", "History"].map((subject) => (
                    <div key={subject}>
                      <div className="mb-1 flex items-center justify-between">
                        <span className="text-sm font-medium">{subject}</span>
                        <span className="text-sm font-medium">
                          {subject === "Mathematics"
                            ? "85%"
                            : subject === "Science"
                              ? "78%"
                              : subject === "English"
                                ? "92%"
                                : "70%"}
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-green-600"
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
                    <Button variant="outline" size="sm" className="w-full">
                      View Detailed Progress
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Leaderboard Ranking</CardTitle>
                  <Award className="h-5 w-5 text-gray-500" />
                </div>
                <CardDescription>Your child's position in class</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center py-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <div className="relative">
                        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                          <Award className="h-12 w-12 text-green-600" />
                        </div>
                        <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
                          3
                        </div>
                      </div>
                    </div>
                    <h3 className="mt-4 text-xl font-bold">{childInfo.name}</h3>
                    <p className="text-sm text-gray-500">Rank 3 of 25 students</p>
                    <div className="mt-2 flex justify-center gap-2">
                      <span className="rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-600">
                        Mathematics: 2nd
                      </span>
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-600">
                        Science: 5th
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <Link href="/parent/leaderboard">
                    <Button variant="outline" size="sm" className="w-full">
                      View Leaderboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
