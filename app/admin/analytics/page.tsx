"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { BarChart3, LineChart, PieChart, Download, Users, BookOpen, Award, Calendar } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function AdminAnalytics() {
  const [dateRange, setDateRange] = useState("this-month")

  // Sample data for analytics
  const gradeDistribution = [
    { grade: "Grade 9", students: 120 },
    { grade: "Grade 10", students: 145 },
    { grade: "Grade 11", students: 105 },
    { grade: "Grade 12", students: 80 },
  ]

  const quizCompletionRate = [
    { subject: "Mathematics", completed: 85, total: 100 },
    { subject: "Science", completed: 92, total: 100 },
    { subject: "English", completed: 78, total: 100 },
    { subject: "History", completed: 65, total: 100 },
  ]

  const attendanceData = [
    { month: "January", attendanceRate: 95 },
    { month: "February", attendanceRate: 93 },
    { month: "March", attendanceRate: 96 },
    { month: "April", attendanceRate: 94 },
  ]

  const paymentStatistics = [
    { status: "Verified", count: 120, percentage: 60 },
    { status: "Pending", count: 60, percentage: 30 },
    { status: "Rejected", count: 20, percentage: 10 },
  ]

  const userActivity = [
    { day: "Monday", students: 420, teachers: 22, parents: 180 },
    { day: "Tuesday", students: 430, teachers: 24, parents: 200 },
    { day: "Wednesday", students: 445, teachers: 25, parents: 210 },
    { day: "Thursday", students: 450, teachers: 25, parents: 195 },
    { day: "Friday", students: 440, teachers: 23, parents: 185 },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="admin" />

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <h1 className="text-lg font-bold md:text-xl">Analytics Dashboard</h1>
          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="this-year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-1">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <div className="mb-6 grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Students</p>
                    <h3 className="mt-1 text-2xl font-bold">450</h3>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-green-600">+12% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Teachers</p>
                    <h3 className="mt-1 text-2xl font-bold">25</h3>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <BookOpen className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-green-600">+2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Quizzes</p>
                    <h3 className="mt-1 text-2xl font-bold">120</h3>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
                    <Award className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-green-600">+15% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Attendance Rate</p>
                    <h3 className="mt-1 text-2xl font-bold">94%</h3>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <Calendar className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-2 text-xs text-green-600">+1% from last month</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="teachers">Teachers</TabsTrigger>
              <TabsTrigger value="payments">Payments</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Grade Distribution</CardTitle>
                      <CardDescription>Distribution of students across grades</CardDescription>
                    </div>
                    <BarChart3 className="h-5 w-5 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {gradeDistribution.map((grade) => (
                        <div key={grade.grade} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{grade.grade}</span>
                            <span className="text-sm text-gray-500">{grade.students} students</span>
                          </div>
                          <Progress value={(grade.students / 145) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Payment Statistics</CardTitle>
                      <CardDescription>Status of all payments</CardDescription>
                    </div>
                    <PieChart className="h-5 w-5 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {paymentStatistics.map((stat) => (
                        <div key={stat.status} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{stat.status}</span>
                            <span className="text-sm text-gray-500">
                              {stat.count} ({stat.percentage}%)
                            </span>
                          </div>
                          <Progress
                            value={stat.percentage}
                            className={`h-2 ${
                              stat.status === "Verified"
                                ? "bg-green-100"
                                : stat.status === "Pending"
                                  ? "bg-yellow-100"
                                  : "bg-red-100"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>User Activity</CardTitle>
                      <CardDescription>Activity throughout the week</CardDescription>
                    </div>
                    <LineChart className="h-5 w-5 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg border p-3">
                      <div className="h-[300px] w-full bg-gray-100 flex items-center justify-center">
                        <p className="text-gray-500">[User activity chart would be displayed here]</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Quiz Completion</CardTitle>
                      <CardDescription>Completion rate by subject</CardDescription>
                    </div>
                    <Award className="h-5 w-5 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {quizCompletionRate.map((subject) => (
                        <div key={subject.subject} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{subject.subject}</span>
                            <span className="text-sm text-gray-500">
                              {subject.completed}/{subject.total} (
                              {Math.round((subject.completed / subject.total) * 100)}%)
                            </span>
                          </div>
                          <Progress value={(subject.completed / subject.total) * 100} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Attendance Trend</CardTitle>
                      <CardDescription>Monthly attendance rates</CardDescription>
                    </div>
                    <Calendar className="h-5 w-5 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {attendanceData.map((month) => (
                        <div key={month.month} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{month.month}</span>
                            <span className="text-sm text-gray-500">{month.attendanceRate}%</span>
                          </div>
                          <Progress value={month.attendanceRate} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="students">
              <Card>
                <CardHeader>
                  <CardTitle>Student Analytics</CardTitle>
                  <CardDescription>Detailed analysis of student performance and engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Student analytics content will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="teachers">
              <Card>
                <CardHeader>
                  <CardTitle>Teacher Analytics</CardTitle>
                  <CardDescription>Detailed analysis of teacher performance and engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Teacher analytics content will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Analytics</CardTitle>
                  <CardDescription>Detailed analysis of payment trends and statuses</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Payment analytics content will be displayed here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
