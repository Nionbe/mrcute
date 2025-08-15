"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, ClipboardList, TrendingUp, Calendar, Plus, Eye, Edit, BarChart3 } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  totalStudents: number
  totalQuizzes: number
  totalNotes: number
  averageScore: number
  recentQuizzes: any[]
  recentNotes: any[]
}

export default function TeacherDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalQuizzes: 0,
    totalNotes: 0,
    averageScore: 0,
    recentQuizzes: [],
    recentNotes: [],
  })
  const [teacherInfo, setTeacherInfo] = useState({
    name: "Loading...",
    subject: "Mathematics",
    grade: "10",
    teacherId: "Loading...",
  })

  useEffect(() => {
    // Get teacher info
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

    // Load dashboard stats
    loadDashboardStats(userId)
  }, [])

  const loadDashboardStats = (teacherId: string) => {
    try {
      // Load quizzes
      const storedQuizzes = JSON.parse(localStorage.getItem("teacherQuizzes") || "[]")
      const teacherQuizzes = storedQuizzes.filter((quiz: any) => quiz.teacherId === teacherId)

      // Load notes
      const storedNotes = JSON.parse(localStorage.getItem("teacherNotes") || "[]")
      const teacherNotes = storedNotes.filter((note: any) => note.teacherId === teacherId)

      // Calculate stats
      const totalStudents = 25 // Mock data
      const averageScore =
        teacherQuizzes.length > 0
          ? teacherQuizzes.reduce((sum: number, quiz: any) => sum + (quiz.averageScore || 75), 0) /
            teacherQuizzes.length
          : 0

      setStats({
        totalStudents,
        totalQuizzes: teacherQuizzes.length,
        totalNotes: teacherNotes.length,
        averageScore: Math.round(averageScore),
        recentQuizzes: teacherQuizzes.slice(0, 3),
        recentNotes: teacherNotes.slice(0, 3),
      })
    } catch (error) {
      console.error("Error loading dashboard stats:", error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome back, {teacherInfo.name}!</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            {teacherInfo.subject} Teacher • Grade {teacherInfo.grade}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/teacher/quizzes/create">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Quiz
            </Button>
          </Link>
          <Link href="/teacher/notes">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
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
            <p className="text-xs text-muted-foreground">Active in your classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quizzes Created</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuizzes}</div>
            <p className="text-xs text-muted-foreground">Total assessments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Notes</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalNotes}</div>
            <p className="text-xs text-muted-foreground">Shared with students</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageScore}%</div>
            <p className="text-xs text-muted-foreground">Class performance</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Quizzes */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Quizzes</CardTitle>
              <Link href="/teacher/quizzes">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </Link>
            </div>
            <CardDescription>Your latest quiz assessments</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.recentQuizzes.length > 0 ? (
              <div className="space-y-4">
                {stats.recentQuizzes.map((quiz) => (
                  <div key={quiz.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{quiz.title}</h4>
                      <p className="text-sm text-gray-600">
                        {quiz.subject} • Grade {quiz.grade}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {quiz.questions?.length || 0} questions
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {quiz.timeLimit} min
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Link href={`/teacher/quizzes/${quiz.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/teacher/quizzes/${quiz.id}/edit`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <ClipboardList className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">No quizzes created yet</p>
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
            <div className="flex items-center justify-between">
              <CardTitle>Recent Notes</CardTitle>
              <Link href="/teacher/notes">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View All
                </Button>
              </Link>
            </div>
            <CardDescription>Your latest study materials</CardDescription>
          </CardHeader>
          <CardContent>
            {stats.recentNotes.length > 0 ? (
              <div className="space-y-4">
                {stats.recentNotes.map((note) => (
                  <div key={note.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium">{note.title}</h4>
                      <p className="text-sm text-gray-600">
                        {note.subject} • Grade {note.grade}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{new Date(note.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-1">
                      <Link href={`/teacher/notes/${note.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <BookOpen className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">No notes created yet</p>
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

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/teacher/students">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Users className="h-4 w-4 mr-2" />
                Manage Students
              </Button>
            </Link>
            <Link href="/teacher/grades">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Grades
              </Button>
            </Link>
            <Link href="/teacher/notifications">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Calendar className="h-4 w-4 mr-2" />
                Send Notification
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
