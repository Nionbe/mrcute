"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ClipboardList, Search, Tag, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Quiz {
  id: string
  title: string
  description: string
  subject: string
  grade: string
  questions: any[]
  timeLimit: number
  createdAt: string
  teacherName?: string
  teacher?: string
  completed?: boolean
}

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [userGrade, setUserGrade] = useState<string>("10")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Get user grade from localStorage
    const grade = localStorage.getItem("userGrade")
    if (grade) {
      setUserGrade(grade)
    }

    // Load quizzes from localStorage
    const loadQuizzes = () => {
      try {
        // Get teacher quizzes
        const teacherQuizzes = localStorage.getItem("teacherQuizzes")
        let assignedQuizzes: Quiz[] = []

        if (teacherQuizzes) {
          const allTeacherQuizzes = JSON.parse(teacherQuizzes)
          // Filter quizzes by student's grade
          assignedQuizzes = allTeacherQuizzes.filter((quiz: Quiz) => quiz.grade === grade)
        }

        // Get completed quizzes
        const completedQuizzes = localStorage.getItem("completedQuizzes")
        let completedQuizzesArray: string[] = []

        if (completedQuizzes) {
          completedQuizzesArray = JSON.parse(completedQuizzes)
        }

        // Mark completed quizzes
        const markedQuizzes = assignedQuizzes.map((quiz) => ({
          ...quiz,
          completed: completedQuizzesArray.includes(quiz.id),
        }))

        setQuizzes(markedQuizzes)
        console.log("Loaded quizzes for grade", grade, ":", markedQuizzes) // Debug log
      } catch (error) {
        console.error("Error loading quizzes:", error)
        setQuizzes([])
      }
    }

    loadQuizzes()

    // Set up event listener for storage changes
    window.addEventListener("storage", loadQuizzes)

    return () => {
      window.removeEventListener("storage", loadQuizzes)
    }
  }, [])

  // Filter quizzes based on search query and tab
  const filteredQuizzes = quizzes.filter((quiz) => {
    // First filter by search query
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quiz.subject.toLowerCase().includes(searchQuery.toLowerCase())

    // Then filter by tab selection
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && !quiz.completed) ||
      (activeTab === "completed" && quiz.completed)

    return matchesSearch && matchesTab
  })

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Quizzes</h1>
        <p className="text-gray-500">Take quizzes to test your knowledge</p>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search quizzes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Quizzes</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filteredQuizzes.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <ClipboardList className="mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-1 text-lg font-medium">No quizzes found</h3>
          <p className="text-sm text-gray-500">
            {searchQuery
              ? "No quizzes match your search criteria"
              : activeTab === "pending"
                ? "You have no pending quizzes"
                : activeTab === "completed"
                  ? "You haven't completed any quizzes yet"
                  : "No quizzes are available for your grade level"}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredQuizzes.map((quiz) => (
            <Link key={quiz.id} href={`/student/quizzes/${quiz.id}`}>
              <Card className="h-full cursor-pointer transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="line-clamp-2">{quiz.title}</CardTitle>
                    {quiz.completed ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Completed
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                        Pending
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center">
                    <Tag className="mr-1 h-3 w-3" />
                    {quiz.subject}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-gray-500">{quiz.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <Clock className="mr-1 h-3 w-3" />
                    {quiz.timeLimit} minutes
                  </span>
                  <span>By: {quiz.teacherName || quiz.teacher || "Unknown Teacher"}</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
