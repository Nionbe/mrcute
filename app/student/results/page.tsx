"use client"

import { useState, useEffect } from "react"
import { BarChart, Search, Download, Printer, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"

interface QuizResult {
  id: string
  title: string
  subject: string
  date: string
  score: number
  totalQuestions: number
  correctAnswers: number
  timeSpent: string
  status: string
}

export default function StudentResults() {
  const [searchQuery, setSearchQuery] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("all")
  const [selectedResult, setSelectedResult] = useState<QuizResult | null>(null)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [quizResults, setQuizResults] = useState<QuizResult[]>([])
  const [studentInfo, setStudentInfo] = useState({
    name: "Loading...",
    grade: "10",
    studentId: "Loading...",
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
    })

    // Get quiz results from localStorage
    const savedResults = JSON.parse(localStorage.getItem("quizResults") || "[]")
    if (savedResults.length > 0) {
      setQuizResults(savedResults)
    } else {
      // Fallback to mock data if no results in localStorage
      setQuizResults([
        {
          id: "1",
          title: "Algebra II: Systems of Equations",
          subject: "Mathematics",
          date: "Apr 10, 2025",
          score: 85,
          totalQuestions: 20,
          correctAnswers: 17,
          timeSpent: "38 min",
          status: "Passed",
        },
        {
          id: "2",
          title: "Cell Biology",
          subject: "Science",
          date: "Apr 5, 2025",
          score: 92,
          totalQuestions: 25,
          correctAnswers: 23,
          timeSpent: "52 min",
          status: "Passed",
        },
        {
          id: "3",
          title: "Literary Analysis",
          subject: "English",
          date: "Apr 1, 2025",
          score: 78,
          totalQuestions: 15,
          correctAnswers: 12,
          timeSpent: "35 min",
          status: "Passed",
        },
        {
          id: "4",
          title: "World War II",
          subject: "History",
          date: "Mar 25, 2025",
          score: 65,
          totalQuestions: 20,
          correctAnswers: 13,
          timeSpent: "42 min",
          status: "Passed",
        },
        {
          id: "5",
          title: "Geometry: Triangles and Angles",
          subject: "Mathematics",
          date: "Mar 20, 2025",
          score: 72,
          totalQuestions: 18,
          correctAnswers: 13,
          timeSpent: "40 min",
          status: "Passed",
        },
      ])
    }
  }, [])

  const subjectPerformance = [
    { subject: "Mathematics", average: 78.5, quizzes: 2 },
    { subject: "Science", average: 92, quizzes: 1 },
    { subject: "English", average: 78, quizzes: 1 },
    { subject: "History", average: 65, quizzes: 1 },
  ]

  // Filter results based on search query, subject, and time
  const filteredResults = quizResults.filter((result) => {
    const matchesSearch =
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = subjectFilter === "all" || result.subject === subjectFilter

    // Simple time filter logic - could be expanded for more precise filtering
    const resultDate = new Date(result.date)
    const now = new Date()
    const oneMonthAgo = new Date()
    oneMonthAgo.setMonth(now.getMonth() - 1)

    let matchesTime = true
    if (timeFilter === "this-month") {
      matchesTime = resultDate.getMonth() === now.getMonth() && resultDate.getFullYear() === now.getFullYear()
    } else if (timeFilter === "last-month") {
      matchesTime =
        resultDate.getMonth() === oneMonthAgo.getMonth() && resultDate.getFullYear() === oneMonthAgo.getFullYear()
    }

    return matchesSearch && matchesSubject && matchesTime
  })

  // Calculate overall average
  const overallAverage =
    quizResults.length > 0 ? quizResults.reduce((sum, result) => sum + result.score, 0) / quizResults.length : 0

  const handleViewDetails = (result: QuizResult) => {
    setSelectedResult(result)
    setIsDetailsDialogOpen(true)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="student" />

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <div className="flex items-center">
            <h1 className="text-lg font-bold md:text-xl">Quiz Results</h1>
            <div className="ml-4 flex items-center rounded-full bg-green-100 px-3 py-1">
              <span className="text-sm font-medium text-green-600">ID: {studentInfo.studentId}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search results..."
                className="w-full rounded-md pl-8 md:w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Science">Science</SelectItem>
                <SelectItem value="English">English</SelectItem>
                <SelectItem value="History">History</SelectItem>
              </SelectContent>
            </Select>
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Time Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        <main className="mx-auto max-w-6xl p-4 md:p-6">
          {/* Student Info Card */}
          <Card className="mb-6 border-2 border-green-200 bg-green-50">
            <CardContent className="flex flex-col items-center justify-between p-6 sm:flex-row">
              <div className="flex items-center">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
                  {studentInfo.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{studentInfo.name}</h2>
                  <p className="text-gray-600">Grade {studentInfo.grade} Student</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 sm:mt-0">
                <div className="rounded-lg border border-green-200 bg-white p-3">
                  <p className="text-sm text-gray-500">Overall Average</p>
                  <p className="text-xl font-bold text-green-600">{overallAverage.toFixed(1)}%</p>
                </div>
                <div className="rounded-lg border border-green-200 bg-white p-3">
                  <p className="text-sm text-gray-500">Quizzes Taken</p>
                  <p className="text-xl font-bold text-green-600">{quizResults.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="results">
            <TabsList className="mb-6">
              <TabsTrigger value="results">Quiz Results</TabsTrigger>
              <TabsTrigger value="performance">Performance Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="results">
              {filteredResults.length > 0 ? (
                <div className="space-y-4">
                  {filteredResults.map((result) => (
                    <Card key={result.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                          <div>
                            <div className="mb-1 flex items-center gap-2">
                              <Badge className="bg-green-500">{result.subject}</Badge>
                              <span className="text-sm text-gray-500">{result.date}</span>
                            </div>
                            <h3 className="text-lg font-medium">{result.title}</h3>
                            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-600">
                              <span>Questions: {result.totalQuestions}</span>
                              <span>Correct: {result.correctAnswers}</span>
                              <span>Time: {result.timeSpent}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex h-16 w-16 flex-col items-center justify-center rounded-full border-4 border-green-100 text-center">
                              <span className="text-lg font-bold text-green-600">{result.score}%</span>
                            </div>
                            <Button variant="outline" size="sm" onClick={() => handleViewDetails(result)}>
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <BarChart className="mb-2 h-10 w-10 text-gray-300" />
                  <h3 className="mb-1 text-lg font-medium">No results found</h3>
                  <p className="text-sm text-gray-500">
                    {searchQuery || subjectFilter !== "all" || timeFilter !== "all"
                      ? "Try a different search term or filter"
                      : "Complete some quizzes to see your results here"}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="performance">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Subject Performance</CardTitle>
                    <CardDescription>Your average scores by subject</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {subjectPerformance.map((subject) => (
                        <div key={subject.subject} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{subject.subject}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">{subject.average.toFixed(1)}%</span>
                              <span className="text-xs text-gray-400">({subject.quizzes} quizzes)</span>
                            </div>
                          </div>
                          <Progress value={subject.average} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Progress</CardTitle>
                    <CardDescription>Your performance over time</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center justify-center p-6">
                    <BarChart className="mb-4 h-24 w-24 text-green-200" />
                    <p className="text-center text-sm text-gray-500">Take more quizzes to see your progress chart</p>
                    <Button className="mt-4 bg-green-600 hover:bg-green-700">
                      <Download className="mr-2 h-4 w-4" />
                      Download Report
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Performance Insights</CardTitle>
                      <CardDescription>Analysis of your quiz performance</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Printer className="mr-2 h-4 w-4" />
                      Print Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 rounded-lg border p-4">
                    <h3 className="text-lg font-medium">Strengths</h3>
                    <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                      <li>Strong performance in Science with 92% average</li>
                      <li>Consistent scores in Mathematics across multiple quizzes</li>
                      <li>Good time management in English quizzes</li>
                    </ul>
                  </div>
                  <div className="mt-4 space-y-4 rounded-lg border p-4">
                    <h3 className="text-lg font-medium">Areas for Improvement</h3>
                    <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
                      <li>History scores are below your overall average</li>
                      <li>Consider spending more time on World War II topics</li>
                      <li>Review Geometry concepts to improve Mathematics scores</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Quiz Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Quiz Details
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </DialogTitle>
            <DialogDescription>{selectedResult?.title}</DialogDescription>
          </DialogHeader>

          {selectedResult && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-green-100 text-center">
                  <span className="text-3xl font-bold text-green-600">{selectedResult.score}%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg border p-3">
                  <p className="text-sm text-gray-500">Subject</p>
                  <p className="font-medium">{selectedResult.subject}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{selectedResult.date}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm text-gray-500">Questions</p>
                  <p className="font-medium">{selectedResult.totalQuestions}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm text-gray-500">Correct Answers</p>
                  <p className="font-medium">{selectedResult.correctAnswers}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm text-gray-500">Time Spent</p>
                  <p className="font-medium">{selectedResult.timeSpent}</p>
                </div>
                <div className="rounded-lg border p-3">
                  <p className="text-sm text-gray-500">Status</p>
                  <p
                    className={`font-medium ${selectedResult.status === "Passed" ? "text-green-600" : "text-red-600"}`}
                  >
                    {selectedResult.status}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <h3 className="mb-2 font-medium">Performance Analysis</h3>
                <p className="text-sm text-gray-600">
                  {selectedResult.score >= 90
                    ? "Excellent work! You have a strong understanding of this subject."
                    : selectedResult.score >= 80
                      ? "Great job! You have a good grasp of the material with some room for improvement."
                      : selectedResult.score >= 70
                        ? "Good effort! Review the topics you missed to strengthen your understanding."
                        : selectedResult.score >= 60
                          ? "You've passed, but should focus on improving your understanding of key concepts."
                          : "You need additional practice with this material. Consider reviewing the subject thoroughly."}
                </p>
              </div>

              <div className="flex justify-end">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Printer className="mr-2 h-4 w-4" />
                  Print Results
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
