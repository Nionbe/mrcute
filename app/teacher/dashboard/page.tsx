"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, BookOpen, FileText, BarChart3, Plus, Clock, CheckCircle, TrendingUp } from "lucide-react"
import Link from "next/link"

interface Quiz {
  id: string
  title: string
  subject: string
  grade: string
  questions: number
  timeLimit: number
  createdAt: string
  status: "active" | "draft"
  submissions: number
}

interface Note {
  id: string
  title: string
  subject: string
  grade: string
  content: string
  createdAt: string
  views: number
}

interface Student {
  id: string
  name: string
  grade: string
  lastActive: string
  progress: number
}

export default function TeacherDashboard() {
  const [userName, setUserName] = useState("")
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [students, setStudents] = useState<Student[]>([])
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalQuizzes: 0,
    totalNotes: 0,
    averageScore: 0,
  })

  useEffect(() => {
    // Load user data
    const storedUserName = localStorage.getItem("userName")
    if (storedUserName) {
      setUserName(storedUserName)
    }

    // Load teacher's quizzes
    const teacherQuizzes = JSON.parse(localStorage.getItem("teacherQuizzes") || "[]")
    setQuizzes(teacherQuizzes.slice(0, 3)) // Show latest 3

    // Load teacher's notes
    const teacherNotes = JSON.parse(localStorage.getItem("teacherNotes") || "[]")
    setNotes(teacherNotes.slice(0, 3)) // Show latest 3

    // Load mock student data
    const mockStudents: Student[] = [
      {
        id: "ST001",
        name: "Alice Johnson",
        grade: "10",
        lastActive: "2 hours ago",
        progress: 85,
      },
      {
        id: "ST002",
        name: "Bob Smith",
        grade: "10",
        lastActive: "1 day ago",
        progress: 72,
      },
      {
        id: "ST003",
        name: "Carol Davis",
        grade: "9",
        lastActive: "3 hours ago",
        progress: 91,
      },
    ]
    setStudents(mockStudents)

    // Calculate stats
    setStats({
      totalStudents: mockStudents.length,
      totalQuizzes: teacherQuizzes.length,
      totalNotes: teacherNotes.length,
      averageScore: 82,
    })
  }, [])

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, {userName || "Teacher"}! 👋</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Here's what's happening with your classes today.</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Link href="/teacher/quizzes/create">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Quiz
            </Button>
          </Link>
          <Link href="/teacher/notes">
            <Button variant="outline">
              <BookOpen className="h-4 w-4 mr-2" />
              Add Note
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +2 from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Quizzes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
            <p className="text-xs text-muted-foreground">
              <CheckCircle className="h-3 w-3 inline mr-1" />
              {quizzes.filter((q) => q.status === "active").length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Notes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalNotes}</div>
            <p className="text-xs text-muted-foreground">
              <Clock className="h-3 w-3 inline mr-1" />
              {notes.reduce((sum, note) => sum + note.views, 0)} total views
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +5% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Quizzes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Quizzes
              <Link href="/teacher/quizzes">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <div key={quiz.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{quiz.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        Grade {quiz.grade}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {quiz.subject}
                      </Badge>
                      <span className="text-xs text-gray-500">{quiz.submissions} submissions</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={quiz.status === "active" ? "default" : "secondary"}>{quiz.status}</Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No quizzes created yet</p>
                <Link href="/teacher/quizzes/create">
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    Create Your First Quiz
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Notes
              <Link href="/teacher/notes">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {notes.length > 0 ? (
              notes.map((note) => (
                <div key={note.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{note.title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="secondary" className="text-xs">
                        Grade {note.grade}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {note.subject}
                      </Badge>
                      <span className="text-xs text-gray-500">{note.views} views</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No notes created yet</p>
                <Link href="/teacher/notes">
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    Create Your First Note
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Student Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Student Progress
            <Link href="/teacher/students">
              <Button variant="ghost" size="sm">
                View All Students
              </Button>
            </Link>
          </CardTitle>
          <CardDescription>Recent activity from your students</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={`/placeholder-user.jpg`} />
                    <AvatarFallback>
                      {student.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs text-gray-500">
                      Grade {student.grade} • Last active {student.lastActive}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">{student.progress}%</p>
                    <Progress value={student.progress} className="w-20 h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
