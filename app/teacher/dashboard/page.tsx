"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, BookOpen, FileText, TrendingUp, CheckCircle, Plus, Eye } from "lucide-react"
import Link from "next/link"

interface Student {
  id: string
  name: string
  grade: string
  avatar?: string
  lastActive: string
  progress: number
  status: "active" | "inactive"
}

interface Note {
  id: string
  title: string
  subject: string
  grade: string
  createdAt: string
  views: number
}

interface Quiz {
  id: string
  title: string
  subject: string
  grade: string
  questions: number
  submissions: number
  createdAt: string
}

export default function TeacherDashboard() {
  const [students, setStudents] = useState<Student[]>([])
  const [notes, setNotes] = useState<Note[]>([])
  const [quizzes, setQuizzes] = useState<Quiz[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load data from localStorage
    const loadData = () => {
      try {
        // Load students
        const savedStudents = localStorage.getItem("students")
        if (savedStudents) {
          setStudents(JSON.parse(savedStudents))
        } else {
          // Default students data
          const defaultStudents: Student[] = [
            {
              id: "1",
              name: "Alice Johnson",
              grade: "Grade 10",
              lastActive: "2 hours ago",
              progress: 85,
              status: "active",
            },
            {
              id: "2",
              name: "Bob Smith",
              grade: "Grade 10",
              lastActive: "1 day ago",
              progress: 72,
              status: "active",
            },
            {
              id: "3",
              name: "Carol Davis",
              grade: "Grade 11",
              lastActive: "3 hours ago",
              progress: 91,
              status: "active",
            },
          ]
          setStudents(defaultStudents)
          localStorage.setItem("students", JSON.stringify(defaultStudents))
        }

        // Load teacher notes
        const savedNotes = localStorage.getItem("teacherNotes")
        if (savedNotes) {
          setNotes(JSON.parse(savedNotes))
        }

        // Load teacher quizzes
        const savedQuizzes = localStorage.getItem("teacherQuizzes")
        if (savedQuizzes) {
          setQuizzes(JSON.parse(savedQuizzes))
        }

        setLoading(false)
      } catch (error) {
        console.error("Error loading dashboard data:", error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const stats = {
    totalStudents: students.length,
    activeStudents: students.filter((s) => s.status === "active").length,
    totalNotes: notes.length,
    totalQuizzes: quizzes.length,
    avgProgress:
      students.length > 0 ? Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length) : 0,
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your classes.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/teacher/notes">
              <Plus className="h-4 w-4 mr-2" />
              Create Note
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/teacher/quizzes/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Quiz
            </Link>
          </Button>
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
            <p className="text-xs text-muted-foreground">{stats.activeStudents} active students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notes Created</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalNotes}</div>
            <p className="text-xs text-muted-foreground">Study materials shared</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quizzes Created</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
            <p className="text-xs text-muted-foreground">Assessments available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.avgProgress}%</div>
            <p className="text-xs text-muted-foreground">Class performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="students" className="space-y-4">
        <TabsList>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="recent">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Student Overview</CardTitle>
              <CardDescription>Monitor your students' progress and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={student.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {student.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">{student.grade}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">{student.progress}% Complete</p>
                        <Progress value={student.progress} className="w-24" />
                      </div>
                      <Badge variant={student.status === "active" ? "default" : "secondary"}>{student.status}</Badge>
                      <p className="text-xs text-muted-foreground">{student.lastActive}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Notes</CardTitle>
                <CardDescription>Your latest study materials</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notes.slice(0, 5).map((note) => (
                    <div key={note.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{note.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {note.subject} • {note.grade}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          {note.views}
                        </Badge>
                      </div>
                    </div>
                  ))}
                  {notes.length === 0 && <p className="text-center text-muted-foreground py-4">No notes created yet</p>}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Quizzes</CardTitle>
                <CardDescription>Your latest assessments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {quizzes.slice(0, 5).map((quiz) => (
                    <div key={quiz.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{quiz.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {quiz.subject} • {quiz.grade}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">{quiz.questions} questions</Badge>
                        <Badge variant="secondary">{quiz.submissions} submissions</Badge>
                      </div>
                    </div>
                  ))}
                  {quizzes.length === 0 && (
                    <p className="text-center text-muted-foreground py-4">No quizzes created yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest actions and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Recent activity items */}
                <div className="flex items-center space-x-4 p-3 border rounded">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium">Quiz "Math Basics" completed by 5 students</p>
                    <p className="text-sm text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 border rounded">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">New note "Science Chapter 5" created</p>
                    <p className="text-sm text-muted-foreground">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 p-3 border rounded">
                  <Users className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="font-medium">3 new students joined your class</p>
                    <p className="text-sm text-muted-foreground">2 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
