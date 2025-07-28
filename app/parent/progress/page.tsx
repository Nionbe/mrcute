"use client"

import { useState, useEffect } from "react"
import { LineChart, BarChart3, BookOpen, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ParentProgress() {
  const [childInfo, setChildInfo] = useState({
    name: "Loading...",
    grade: "Loading...",
    studentId: "Loading...",
  })

  useEffect(() => {
    // Get child info from localStorage
    const childId = localStorage.getItem("childId")
    const childName = localStorage.getItem("childName")
    const childGrade = localStorage.getItem("childGrade")

    if (childId && childName && childGrade) {
      setChildInfo({
        name: childName,
        grade: childGrade,
        studentId: childId,
      })
    } else {
      // Fallback if data isn't available
      setChildInfo({
        name: "Alex Johnson",
        grade: "10",
        studentId: "SA123456",
      })
    }
  }, [])

  const [selectedTerm, setSelectedTerm] = useState("term2")

  const quizScores = [
    { subject: "Mathematics", scores: [85, 92, 78, 88, 95] },
    { subject: "Science", scores: [76, 82, 90, 85, 79] },
    { subject: "English", scores: [92, 88, 90, 85, 94] },
    { subject: "History", scores: [70, 75, 82, 80, 78] },
  ]

  const attendanceData = [
    { month: "January", present: 20, absent: 1, late: 2 },
    { month: "February", present: 18, absent: 0, late: 1 },
    { month: "March", present: 22, absent: 1, late: 0 },
    { month: "April", present: 15, absent: 0, late: 1 },
  ]

  const subjectProgress = [
    { subject: "Mathematics", progress: 78, grade: "B+" },
    { subject: "Science", progress: 65, grade: "B" },
    { subject: "English", progress: 92, grade: "A" },
    { subject: "History", progress: 45, grade: "C+" },
  ]

  const recentQuizzes = [
    {
      id: "1",
      subject: "Mathematics",
      topic: "Algebra II",
      date: "Apr 10, 2025",
      score: 85,
    },
    {
      id: "2",
      subject: "Science",
      topic: "Cell Biology",
      date: "Apr 5, 2025",
      score: 92,
    },
    {
      id: "3",
      subject: "English",
      topic: "Literary Analysis",
      date: "Apr 1, 2025",
      score: 78,
    },
  ]

  // Calculate average scores for each subject
  const averageScores = quizScores.map((subject) => ({
    subject: subject.subject,
    average: Math.round(subject.scores.reduce((a, b) => a + b, 0) / subject.scores.length),
  }))

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="parent" />

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <h1 className="text-lg font-bold md:text-xl">Child's Progress</h1>
          <div className="flex items-center gap-2">
            <Select value={selectedTerm} onValueChange={setSelectedTerm}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Term" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="term1">Term 1 (Jan-Mar)</SelectItem>
                <SelectItem value="term2">Term 2 (Apr-Jun)</SelectItem>
                <SelectItem value="term3">Term 3 (Jul-Sep)</SelectItem>
                <SelectItem value="term4">Term 4 (Oct-Dec)</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <LineChart className="mr-2 h-4 w-4" />
              Export Report
            </Button>
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

          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="subjects">Subjects</TabsTrigger>
              <TabsTrigger value="attendance">Attendance</TabsTrigger>
              <TabsTrigger value="quizzes">Quizzes & Tests</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {subjectProgress.map((subject) => (
                  <Card key={subject.subject}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{subject.subject}</CardTitle>
                      <CardDescription>Current progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Progress value={subject.progress} className="h-2 w-2/3" />
                        <span className="text-xl font-bold text-green-600">{subject.grade}</span>
                      </div>
                      <p className="mt-2 text-xs text-gray-500">{subject.progress}% completed</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Performance</CardTitle>
                  <CardDescription>Quiz scores from the past month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentQuizzes.map((quiz) => (
                      <div key={quiz.id} className="flex items-center justify-between rounded-lg border p-4">
                        <div>
                          <h4 className="font-medium">
                            {quiz.subject}: {quiz.topic}
                          </h4>
                          <p className="text-sm text-gray-500">{quiz.date}</p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`text-lg font-bold ${
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
                          <p className="text-xs text-gray-500">
                            {quiz.score >= 90
                              ? "Excellent"
                              : quiz.score >= 80
                                ? "Good"
                                : quiz.score >= 70
                                  ? "Satisfactory"
                                  : "Needs Improvement"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subjects">
              <div className="grid gap-6 md:grid-cols-2">
                {subjectProgress.map((subject) => (
                  <Card key={subject.subject}>
                    <CardHeader>
                      <CardTitle>{subject.subject}</CardTitle>
                      <CardDescription>Detailed subject performance</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="mb-1 flex items-center justify-between">
                          <span className="text-sm font-medium">Current Grade</span>
                          <span
                            className={`font-bold ${
                              subject.grade.startsWith("A")
                                ? "text-green-600"
                                : subject.grade.startsWith("B")
                                  ? "text-blue-600"
                                  : subject.grade.startsWith("C")
                                    ? "text-yellow-600"
                                    : "text-red-600"
                            }`}
                          >
                            {subject.grade}
                          </span>
                        </div>
                        <Progress value={subject.progress} className="h-2" />
                      </div>

                      <div className="rounded-lg bg-gray-50 p-3">
                        <h4 className="mb-2 font-medium">Strengths</h4>
                        <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                          <li>Consistent participation in class discussions</li>
                          <li>Excellent performance on quizzes</li>
                          <li>Thorough homework completion</li>
                        </ul>
                      </div>

                      <div className="rounded-lg bg-gray-50 p-3">
                        <h4 className="mb-2 font-medium">Areas for Improvement</h4>
                        <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                          <li>Written assignments could be more detailed</li>
                          <li>Can improve on practical applications</li>
                        </ul>
                      </div>

                      <div className="flex justify-between text-sm">
                        <div>
                          <p className="font-medium">Teacher</p>
                          <p className="text-gray-600">Ms. Johnson</p>
                        </div>
                        <div>
                          <p className="font-medium">Class Average</p>
                          <p className="text-gray-600">82%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="attendance">
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Attendance Overview</CardTitle>
                    <CardDescription>Monthly attendance records</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {attendanceData.map((month) => (
                        <div key={month.month} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{month.month}</h4>
                            <p className="text-sm text-gray-500">
                              Total days: {month.present + month.absent + month.late}
                            </p>
                          </div>

                          <div className="grid grid-cols-3 gap-2">
                            <div className="flex items-center rounded-md bg-green-100 p-2">
                              <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
                              <div>
                                <p className="text-xs text-gray-600">Present</p>
                                <p className="font-bold text-green-600">{month.present} days</p>
                              </div>
                            </div>
                            <div className="flex items-center rounded-md bg-red-100 p-2">
                              <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                              <div>
                                <p className="text-xs text-gray-600">Absent</p>
                                <p className="font-bold text-red-600">{month.absent} days</p>
                              </div>
                            </div>
                            <div className="flex items-center rounded-md bg-yellow-100 p-2">
                              <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
                              <div>
                                <p className="text-xs text-gray-600">Late</p>
                                <p className="font-bold text-yellow-600">{month.late} days</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Attendance Summary</CardTitle>
                    <CardDescription>Term 2 overview</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="rounded-md bg-gray-50 p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col items-center justify-center rounded-md bg-green-50 p-3">
                          <Clock className="mb-1 h-5 w-5 text-green-500" />
                          <p className="text-sm text-gray-600">Attendance Rate</p>
                          <p className="text-xl font-bold text-green-600">97%</p>
                        </div>
                        <div className="flex flex-col items-center justify-center rounded-md bg-blue-50 p-3">
                          <BookOpen className="mb-1 h-5 w-5 text-blue-500" />
                          <p className="text-sm text-gray-600">On-Time Rate</p>
                          <p className="text-xl font-bold text-blue-600">96%</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 text-sm font-medium">Attendance Statistics</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center justify-between">
                          <span>Total school days</span>
                          <span className="font-medium">80 days</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Present</span>
                          <span className="font-medium">75 days (94%)</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Absent (excused)</span>
                          <span className="font-medium">2 days (2.5%)</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Late arrivals</span>
                          <span className="font-medium">3 days (3.8%)</span>
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="quizzes">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Quiz Performance</CardTitle>
                    <CardDescription>Performance across all subjects</CardDescription>
                  </div>
                  <BarChart3 className="h-5 w-5 text-gray-500" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-8">
                    {quizScores.map((subject) => (
                      <div key={subject.subject} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{subject.subject}</h4>
                          <p className="text-sm font-bold text-green-600">
                            Avg: {Math.round(subject.scores.reduce((a, b) => a + b, 0) / subject.scores.length)}%
                          </p>
                        </div>

                        <div className="flex items-center gap-1">
                          {subject.scores.map((score, i) => (
                            <div key={i} className="flex flex-1 flex-col items-center">
                              <div
                                className="mb-1 h-24 w-full rounded-t-sm"
                                style={{
                                  background: `linear-gradient(to top, ${
                                    score >= 90
                                      ? "#10B981"
                                      : score >= 80
                                        ? "#3B82F6"
                                        : score >= 70
                                          ? "#F59E0B"
                                          : "#EF4444"
                                  }, #f3f4f6)`,
                                  height: `${Math.max(score, 30)}%`,
                                }}
                              ></div>
                              <p className="text-xs font-medium">Quiz {i + 1}</p>
                              <p
                                className={`text-xs font-bold ${
                                  score >= 90
                                    ? "text-green-600"
                                    : score >= 80
                                      ? "text-blue-600"
                                      : score >= 70
                                        ? "text-yellow-600"
                                        : "text-red-600"
                                }`}
                              >
                                {score}%
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
