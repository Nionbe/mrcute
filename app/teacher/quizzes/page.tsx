"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ClipboardList, Search, Plus, Clock, Tag, Edit, Trash2, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function TeacherQuizzesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGrade, setFilterGrade] = useState("all")
  const [teacherInfo, setTeacherInfo] = useState({
    name: "Loading...",
    subject: "Mathematics",
    grade: "10",
    teacherId: "Loading...",
  })
  const [quizzes, setQuizzes] = useState([])
  const [showSuccess, setShowSuccess] = useState(false)
  const [lastCreatedQuiz, setLastCreatedQuiz] = useState({ title: "", grade: "" })

  useEffect(() => {
    // Get user info from localStorage
    const userName = localStorage.getItem("userName") || "Teacher"
    const userId = localStorage.getItem("userId") || "TA789012"
    const userSubject = localStorage.getItem("userSubject") || "Mathematics"
    const userGrade = localStorage.getItem("userGrade") || "10"

    setTeacherInfo({
      name: userName,
      subject: userSubject,
      grade: userGrade,
      teacherId: userId,
    })

    // Load quizzes from localStorage
    const storedQuizzes = localStorage.getItem("teacherQuizzes")
    if (storedQuizzes) {
      try {
        const parsedQuizzes = JSON.parse(storedQuizzes)
        // Filter quizzes by this teacher
        const teacherQuizzes = parsedQuizzes.filter((quiz) => quiz.teacherId === userId)
        if (teacherQuizzes.length > 0) {
          setQuizzes(teacherQuizzes)
        }
      } catch (error) {
        console.error("Error parsing stored quizzes:", error)
      }
    }

    // Check for newly created quiz
    const newQuiz = localStorage.getItem("newlyCreatedQuiz")
    if (newQuiz) {
      try {
        const parsedQuiz = JSON.parse(newQuiz)
        if (parsedQuiz && parsedQuiz.teacherId === userId) {
          setLastCreatedQuiz({
            title: parsedQuiz.title,
            grade: parsedQuiz.grade,
          })
          setShowSuccess(true)
          setTimeout(() => setShowSuccess(false), 5000)
          localStorage.removeItem("newlyCreatedQuiz")
        }
      } catch (error) {
        console.error("Error parsing newly created quiz:", error)
      }
    }
  }, [])

  const handleDeleteQuiz = (id) => {
    // Remove from local state
    const updatedQuizzes = quizzes.filter((quiz) => quiz.id !== id)
    setQuizzes(updatedQuizzes)

    // Remove from localStorage
    const storedQuizzes = localStorage.getItem("teacherQuizzes")
    if (storedQuizzes) {
      try {
        const parsedQuizzes = JSON.parse(storedQuizzes)
        const updatedStoredQuizzes = parsedQuizzes.filter((quiz) => quiz.id !== id)
        localStorage.setItem("teacherQuizzes", JSON.stringify(updatedStoredQuizzes))
      } catch (error) {
        console.error("Error updating stored quizzes:", error)
      }
    }

    toast({
      title: "Quiz deleted",
      description: "The quiz has been successfully deleted.",
    })
  }

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = filterGrade === "all" || quiz.grade === filterGrade
    return matchesSearch && matchesGrade
  })

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="teacher" />

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <h1 className="text-lg font-bold md:text-xl">Quizzes</h1>
          <Link href="/teacher/quizzes/create">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Create Quiz
            </Button>
          </Link>
        </header>

        <main className="mx-auto max-w-6xl p-4 md:p-6">
          {showSuccess && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <AlertCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600">Quiz Published Successfully</AlertTitle>
              <AlertDescription>
                Your quiz "{lastCreatedQuiz.title}" has been published and is now visible to students in Grade{" "}
                {lastCreatedQuiz.grade}.
              </AlertDescription>
            </Alert>
          )}

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Manage Quizzes</CardTitle>
              <CardDescription>Create and manage quizzes for your students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search quizzes..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterGrade} onValueChange={setFilterGrade}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="9">Grade 9</SelectItem>
                    <SelectItem value="10">Grade 10</SelectItem>
                    <SelectItem value="11">Grade 11</SelectItem>
                    <SelectItem value="12">Grade 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {filteredQuizzes.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <ClipboardList className="mb-2 h-10 w-10 text-gray-400" />
                <h3 className="text-lg font-medium">No quizzes found</h3>
                <p className="text-sm text-gray-500">
                  No quizzes match your search criteria. Try adjusting your filters or create a new quiz.
                </p>
                <Link href="/teacher/quizzes/create" className="mt-4">
                  <Button className="bg-green-600 hover:bg-green-700">Create Quiz</Button>
                </Link>
              </div>
            ) : (
              filteredQuizzes.map((quiz) => (
                <Card key={quiz.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{quiz.title}</CardTitle>
                        <CardDescription>
                          {quiz.subject} • Grade {quiz.grade} • {quiz.createdAt}
                        </CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Link href={`/teacher/quizzes/${quiz.id}/edit`}>
                          <Button variant="outline" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="icon" onClick={() => handleDeleteQuiz(quiz.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">{quiz.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {quiz.timeLimit} minutes
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {quiz.questions.length} questions
                      </Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Grade {quiz.grade}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t bg-gray-50 px-6 py-3">
                    <span className="text-sm text-gray-500">{quiz.attempts || 0} student attempts</span>
                    <Link href={`/teacher/quizzes/${quiz.id}`}>
                      <Button variant="link" className="text-green-600 p-0">
                        View Details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
