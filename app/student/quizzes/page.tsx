"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Search, Calendar, User, Clock, RefreshCw, Play } from "lucide-react"
import Link from "next/link"

interface Quiz {
  id: string
  title: string
  description: string
  subject: string
  grade: string
  timeLimit: number
  questions: any[]
  showAnswers: boolean
  createdAt: string
  teacherId: string
  teacherName: string
}

export default function StudentQuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    // Get current user
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}")
    setCurrentUser(user)

    loadQuizzes()

    // Listen for real-time updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "teacherQuizzes") {
        console.log("Quizzes updated, reloading...")
        loadQuizzes()
      }
    }

    // Listen for custom storage events (same tab)
    const handleCustomStorageChange = (e: any) => {
      if (e.key === "teacherQuizzes") {
        console.log("Quizzes updated (custom), reloading...")
        loadQuizzes()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("storage", handleCustomStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("storage", handleCustomStorageChange)
    }
  }, [])

  useEffect(() => {
    filterQuizzes()
  }, [quizzes, searchTerm, currentUser])

  const loadQuizzes = () => {
    try {
      setLoading(true)
      const savedQuizzes = localStorage.getItem("teacherQuizzes")
      if (savedQuizzes) {
        const allQuizzes = JSON.parse(savedQuizzes)
        console.log("Loaded quizzes:", allQuizzes.length)
        setQuizzes(allQuizzes)
      } else {
        setQuizzes([])
      }
    } catch (error) {
      console.error("Error loading quizzes:", error)
      setQuizzes([])
    } finally {
      setLoading(false)
    }
  }

  const filterQuizzes = () => {
    if (!currentUser?.grade) {
      setFilteredQuizzes([])
      return
    }

    const filtered = quizzes.filter((quiz) => {
      // Filter by student's grade
      const gradeMatch = quiz.grade === currentUser.grade

      // Filter by search term
      const searchMatch =
        searchTerm === "" ||
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase())

      return gradeMatch && searchMatch
    })

    // Sort by creation date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    console.log(`Filtered quizzes for ${currentUser.grade}:`, filtered.length)
    setFilteredQuizzes(filtered)
  }

  const refreshQuizzes = () => {
    loadQuizzes()
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-6 h-6 animate-spin mr-2" />
          <span>Loading quizzes...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Quizzes</h1>
          <p className="text-muted-foreground">
            Take quizzes created by your teachers
            {currentUser?.grade && ` for ${currentUser.grade}`}
          </p>
        </div>
        <Button onClick={refreshQuizzes} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search quizzes by title, subject, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Available Quizzes</p>
                <p className="text-2xl font-bold">{filteredQuizzes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Your Grade</p>
                <p className="text-2xl font-bold">{currentUser?.grade || "N/A"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">
                  {
                    filteredQuizzes.filter((quiz) => {
                      const quizDate = new Date(quiz.createdAt)
                      const weekAgo = new Date()
                      weekAgo.setDate(weekAgo.getDate() - 7)
                      return quizDate >= weekAgo
                    }).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quizzes List */}
      <div className="grid gap-4">
        {filteredQuizzes.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Quizzes Available</h3>
              <p className="text-muted-foreground text-center">
                {searchTerm
                  ? "No quizzes match your search criteria"
                  : `No quizzes have been created for ${currentUser?.grade || "your grade"} yet`}
              </p>
              {searchTerm && (
                <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-4">
                  Clear Search
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredQuizzes.map((quiz) => (
            <Card key={quiz.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{quiz.title}</CardTitle>
                    <CardDescription className="mt-2">{quiz.description}</CardDescription>
                    <div className="flex flex-wrap items-center gap-2 mt-3">
                      <Badge variant="secondary">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {quiz.subject}
                      </Badge>
                      <Badge variant="outline">
                        <User className="w-3 h-3 mr-1" />
                        {quiz.teacherName}
                      </Badge>
                      <Badge variant="outline">
                        <Clock className="w-3 h-3 mr-1" />
                        {quiz.timeLimit} min
                      </Badge>
                      <Badge variant="outline">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(quiz.createdAt).toLocaleDateString()}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Link href={`/student/quizzes/${quiz.id}`}>
                      <Button className="w-full">
                        <Play className="w-4 h-4 mr-2" />
                        Start Quiz
                      </Button>
                    </Link>
                    <p className="text-xs text-muted-foreground text-center">{quiz.questions.length} questions</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
