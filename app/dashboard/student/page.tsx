"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  BookOpen,
  Clock,
  CalendarIcon,
  Award,
  User,
  FileText,
  CheckCircle,
  AlertCircle,
  Play,
  Upload,
  Download,
  Bell,
  GraduationCap,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function StudentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  // Quiz timer state
  const [quizTimer, setQuizTimer] = useState<{ [key: string]: number }>({})
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: { [key: string]: string } }>({})

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("safari_user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/auth")
    }
  }, [router])

  // Quiz timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (activeQuiz && quizTimer[activeQuiz] > 0) {
      interval = setInterval(() => {
        setQuizTimer((prev) => ({
          ...prev,
          [activeQuiz]: prev[activeQuiz] - 1,
        }))
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [activeQuiz, quizTimer])

  const handleLogout = () => {
    localStorage.removeItem("safari_user")
    router.push("/")
  }

  const startQuiz = (quizId: string, duration: number) => {
    setActiveQuiz(quizId)
    setQuizTimer((prev) => ({ ...prev, [quizId]: duration * 60 }))
  }

  const submitQuiz = (quizId: string) => {
    setActiveQuiz(null)
    // Simulate quiz submission
    alert("Quiz submitted successfully!")
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  // Mock data
  const assignments = [
    {
      id: "1",
      title: "Mathematics Assignment - Algebra",
      subject: "Mathematics",
      dueDate: "2024-01-15",
      status: "pending",
      description: "Complete exercises 1-20 from Chapter 5",
      points: 100,
    },
    {
      id: "2",
      title: "English Essay - Shakespeare",
      subject: "English",
      dueDate: "2024-01-18",
      status: "submitted",
      description: "Write a 500-word essay on Hamlet",
      points: 150,
      grade: 85,
    },
    {
      id: "3",
      title: "Science Lab Report",
      subject: "Science",
      dueDate: "2024-01-20",
      status: "overdue",
      description: "Document your chemistry experiment results",
      points: 75,
    },
  ]

  const quizzes = [
    {
      id: "quiz1",
      title: "History Quiz - World War II",
      subject: "History",
      duration: 30,
      questions: 15,
      status: "available",
      dueDate: "2024-01-16",
    },
    {
      id: "quiz2",
      title: "Math Quiz - Trigonometry",
      subject: "Mathematics",
      duration: 45,
      questions: 20,
      status: "completed",
      score: 18,
      totalQuestions: 20,
    },
  ]

  const notes = [
    {
      id: "1",
      title: "Biology - Cell Structure",
      subject: "Biology",
      date: "2024-01-10",
      read: true,
      content: "Cell membrane, nucleus, cytoplasm...",
    },
    {
      id: "2",
      title: "Physics - Newton's Laws",
      subject: "Physics",
      date: "2024-01-12",
      read: false,
      content: "First law: object at rest stays at rest...",
    },
  ]

  const grades = [
    { subject: "Mathematics", grade: "A-", percentage: 88, credits: 4 },
    { subject: "English", grade: "B+", percentage: 85, credits: 3 },
    { subject: "Science", grade: "A", percentage: 92, credits: 4 },
    { subject: "History", grade: "B", percentage: 82, credits: 3 },
    { subject: "Art", grade: "A+", percentage: 96, credits: 2 },
  ]

  const attendanceData = [
    { date: "2024-01-08", status: "present" },
    { date: "2024-01-09", status: "present" },
    { date: "2024-01-10", status: "absent" },
    { date: "2024-01-11", status: "present" },
    { date: "2024-01-12", status: "late" },
  ]

  const sampleQuizQuestions = {
    quiz1: [
      {
        id: "q1",
        question: "When did World War II begin?",
        options: ["1939", "1940", "1941", "1942"],
        correct: "1939",
      },
      {
        id: "q2",
        question: "Which country was NOT part of the Axis powers?",
        options: ["Germany", "Italy", "Japan", "France"],
        correct: "France",
      },
    ],
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-50 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6 border-b border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Safari Academy
              </span>
            </div>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-4 flex items-center space-x-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-500">Student</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {[
              { id: "overview", label: "Overview", icon: BookOpen },
              { id: "assignments", label: "Assignments", icon: FileText },
              { id: "quizzes", label: "Quizzes", icon: Clock },
              { id: "notes", label: "Notes", icon: BookOpen },
              { id: "attendance", label: "Attendance", icon: CalendarIcon },
              { id: "grades", label: "Grades", icon: Award },
              { id: "profile", label: "Profile", icon: User },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === item.id ? "bg-blue-100 text-blue-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 bg-transparent"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-blue-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
                <Badge className="ml-2 bg-red-500">3</Badge>
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome Card */}
              <Card className="border-blue-100 bg-gradient-to-r from-blue-500 to-green-500 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Welcome back, {user.firstName}!</CardTitle>
                  <CardDescription className="text-blue-100">
                    You have 2 pending assignments and 1 upcoming quiz
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="border-blue-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Pending Assignments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">2</div>
                  </CardContent>
                </Card>
                <Card className="border-green-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Upcoming Quizzes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">1</div>
                  </CardContent>
                </Card>
                <Card className="border-purple-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Unread Notes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">1</div>
                  </CardContent>
                </Card>
                <Card className="border-orange-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Overall GPA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">3.7</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle>Recent Assignments</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {assignments.slice(0, 3).map((assignment) => (
                      <div key={assignment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{assignment.title}</p>
                          <p className="text-sm text-gray-600">Due: {assignment.dueDate}</p>
                        </div>
                        <Badge
                          variant={
                            assignment.status === "submitted"
                              ? "default"
                              : assignment.status === "overdue"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {assignment.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle>Upcoming Deadlines</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="font-medium">History Quiz</p>
                        <p className="text-sm text-gray-600">Due in 2 days</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                      <Clock className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">English Essay</p>
                        <p className="text-sm text-gray-600">Due in 5 days</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "assignments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Assignments</h2>
                <div className="flex space-x-2">
                  <Badge variant="secondary">All</Badge>
                  <Badge variant="outline">Pending</Badge>
                  <Badge variant="outline">Submitted</Badge>
                  <Badge variant="outline">Overdue</Badge>
                </div>
              </div>

              <div className="grid gap-6">
                {assignments.map((assignment) => (
                  <Card key={assignment.id} className="border-blue-100">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{assignment.title}</CardTitle>
                          <CardDescription>
                            {assignment.subject} • Due: {assignment.dueDate}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={
                            assignment.status === "submitted"
                              ? "default"
                              : assignment.status === "overdue"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {assignment.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{assignment.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">Points: {assignment.points}</span>
                          {assignment.grade && (
                            <span className="text-sm font-medium text-green-600">Grade: {assignment.grade}%</span>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          {assignment.status === "pending" && (
                            <>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                              </Button>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                <Upload className="w-4 h-4 mr-2" />
                                Submit
                              </Button>
                            </>
                          )}
                          {assignment.status === "submitted" && (
                            <Button variant="outline" size="sm">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              View Submission
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "quizzes" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Quizzes</h2>

              <div className="grid gap-6">
                {quizzes.map((quiz) => (
                  <Card key={quiz.id} className="border-green-100">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{quiz.title}</CardTitle>
                          <CardDescription>
                            {quiz.subject} • {quiz.duration} minutes • {quiz.questions} questions
                          </CardDescription>
                        </div>
                        <Badge variant={quiz.status === "completed" ? "default" : "secondary"}>{quiz.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {quiz.status === "available" && (
                        <div className="space-y-4">
                          {activeQuiz === quiz.id ? (
                            <div className="space-y-4">
                              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                                <span className="font-medium">Time Remaining:</span>
                                <span className="text-2xl font-bold text-green-600">
                                  {formatTime(quizTimer[quiz.id] || 0)}
                                </span>
                              </div>

                              {/* Sample Quiz Questions */}
                              {sampleQuizQuestions[quiz.id as keyof typeof sampleQuizQuestions]?.map(
                                (question, index) => (
                                  <div key={question.id} className="p-4 border rounded-lg">
                                    <h4 className="font-medium mb-3">
                                      {index + 1}. {question.question}
                                    </h4>
                                    <div className="space-y-2">
                                      {question.options.map((option, optionIndex) => (
                                        <label key={optionIndex} className="flex items-center space-x-2">
                                          <input
                                            type="radio"
                                            name={question.id}
                                            value={option}
                                            onChange={(e) => {
                                              setQuizAnswers((prev) => ({
                                                ...prev,
                                                [quiz.id]: {
                                                  ...prev[quiz.id],
                                                  [question.id]: e.target.value,
                                                },
                                              }))
                                            }}
                                            className="text-blue-600"
                                          />
                                          <span>{option}</span>
                                        </label>
                                      ))}
                                    </div>
                                  </div>
                                ),
                              )}

                              <div className="flex space-x-2">
                                <Button onClick={() => submitQuiz(quiz.id)} className="bg-green-600 hover:bg-green-700">
                                  Submit Quiz
                                </Button>
                                <Button variant="outline" onClick={() => setActiveQuiz(null)}>
                                  Pause
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-gray-600">Due: {quiz.dueDate}</p>
                                <p className="text-sm text-gray-500">Duration: {quiz.duration} minutes</p>
                              </div>
                              <Button
                                onClick={() => startQuiz(quiz.id, quiz.duration)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Play className="w-4 h-4 mr-2" />
                                Start Quiz
                              </Button>
                            </div>
                          )}
                        </div>
                      )}

                      {quiz.status === "completed" && (
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-green-600">
                              Score: {quiz.score}/{quiz.totalQuestions} (
                              {Math.round((quiz.score! / quiz.totalQuestions!) * 100)}%)
                            </p>
                            <p className="text-sm text-gray-500">Completed</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <FileText className="w-4 h-4 mr-2" />
                            View Results
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Study Notes</h2>
                <Input placeholder="Search notes..." className="max-w-sm" />
              </div>

              <div className="grid gap-4">
                {notes.map((note) => (
                  <Card key={note.id} className={`border-blue-100 ${!note.read ? "bg-blue-50" : ""}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg flex items-center space-x-2">
                            <span>{note.title}</span>
                            {!note.read && (
                              <Badge variant="secondary" className="text-xs">
                                New
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription>
                            {note.subject} • {note.date}
                          </CardDescription>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{note.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Attendance</h2>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle>Attendance Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="border-green-100">
                    <CardHeader>
                      <CardTitle>Attendance Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Present Days</span>
                        <span className="font-bold text-green-600">18</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Absent Days</span>
                        <span className="font-bold text-red-600">2</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Late Days</span>
                        <span className="font-bold text-yellow-600">1</span>
                      </div>
                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">Attendance Rate</span>
                          <span className="font-bold text-blue-600">90%</span>
                        </div>
                        <Progress value={90} className="mt-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-blue-100">
                    <CardHeader>
                      <CardTitle>Recent Attendance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {attendanceData.map((record, index) => (
                        <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                          <span>{record.date}</span>
                          <Badge
                            variant={
                              record.status === "present"
                                ? "default"
                                : record.status === "absent"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {record.status}
                          </Badge>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === "grades" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Grades</h2>

              <div className="grid gap-6">
                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle>Overall Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">3.7</div>
                        <p className="text-gray-600">Overall GPA</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">88%</div>
                        <p className="text-gray-600">Average Grade</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">16</div>
                        <p className="text-gray-600">Total Credits</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle>Subject Grades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {grades.map((grade, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{grade.subject}</h4>
                            <p className="text-sm text-gray-600">{grade.credits} credits</p>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-blue-600">{grade.grade}</div>
                            <div className="text-sm text-gray-600">{grade.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Profile</h2>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" />
                        <AvatarFallback className="bg-blue-100 text-blue-600 text-xl">
                          {user.firstName?.[0]}
                          {user.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm">
                        Change Photo
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" value={user.firstName} readOnly />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" value={user.lastName} readOnly />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={user.email} readOnly />
                    </div>

                    <div>
                      <Label htmlFor="studentId">Student ID</Label>
                      <Input id="studentId" value={user.studentId || "SA2024001"} readOnly />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle>Academic Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Grade Level</Label>
                      <Input value="Grade 10" readOnly />
                    </div>
                    <div>
                      <Label>Class</Label>
                      <Input value="10-A" readOnly />
                    </div>
                    <div>
                      <Label>Academic Year</Label>
                      <Input value="2023-2024" readOnly />
                    </div>
                    <div>
                      <Label>Enrollment Date</Label>
                      <Input value="September 1, 2023" readOnly />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
