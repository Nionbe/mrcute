"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BookOpen,
  Users,
  FileText,
  Clock,
  Award,
  User,
  Plus,
  Edit,
  Upload,
  Download,
  CheckCircle,
  BarChart3,
  Calendar,
  GraduationCap,
  LogOut,
  Menu,
  X,
  Eye,
  MessageSquare,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function TeacherDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())

  const [viewResultsModal, setViewResultsModal] = useState<string | null>(null)
  const [viewDetailsModal, setViewDetailsModal] = useState<string | null>(null)
  const [editModal, setEditModal] = useState<string | null>(null)
  const [viewProfileModal, setViewProfileModal] = useState<string | null>(null)
  const [messageModal, setMessageModal] = useState<string | null>(null)
  const [attendanceModal, setAttendanceModal] = useState(false)
  const [attendanceData, setAttendanceData] = useState<{ [key: string]: string }>({})
  const [selectedClass, setSelectedClass] = useState<string | null>(null)

  // Form states
  const [assignmentForm, setAssignmentForm] = useState({
    title: "",
    description: "",
    subject: "",
    dueDate: "",
    points: "",
    instructions: "",
  })

  const [quizForm, setQuizForm] = useState({
    title: "",
    subject: "",
    duration: "",
    questions: [{ question: "", options: ["", "", "", ""], correct: 0 }],
  })

  const [noteForm, setNoteForm] = useState({
    title: "",
    subject: "",
    content: "",
    attachments: [],
  })

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem("safari_user")
    if (userData) {
      setUser(JSON.parse(userData))
    } else {
      router.push("/auth")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("safari_user")
    router.push("/")
  }

  const handleViewResults = (assignmentId: string) => {
    setViewResultsModal(assignmentId)
  }

  const handleViewDetails = (assignmentId: string) => {
    setViewDetailsModal(assignmentId)
  }

  const handleEdit = (assignmentId: string) => {
    setEditModal(assignmentId)
  }

  const handleExportResults = (assignmentId: string) => {
    // Simulate export functionality
    const csvContent =
      "Student Name,Grade,Submission Date\nJohn Doe,85,2024-01-10\nJane Smith,92,2024-01-09\nMike Johnson,78,2024-01-11"
    const blob = new Blob([csvContent], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `assignment_${assignmentId}_results.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const handleViewProfile = (studentId: string) => {
    setViewProfileModal(studentId)
  }

  const handleMessage = (studentId: string) => {
    setMessageModal(studentId)
  }

  const handleMarkAttendance = () => {
    setAttendanceModal(true)
  }

  const submitAttendance = () => {
    // Simulate attendance submission
    alert("Attendance marked successfully!")
    setAttendanceModal(false)
    setAttendanceData({})
  }

  const sendMessage = (studentId: string, message: string) => {
    // Simulate message sending
    alert(`Message sent to student ${studentId}: ${message}`)
    setMessageModal(null)
  }

  // Mock data
  const classes = [
    { id: "math-10a", name: "Mathematics 10-A", students: 28, subject: "Mathematics" },
    { id: "math-10b", name: "Mathematics 10-B", students: 25, subject: "Mathematics" },
    { id: "math-11a", name: "Mathematics 11-A", students: 22, subject: "Mathematics" },
  ]

  const assignments = [
    {
      id: "1",
      title: "Algebra Fundamentals",
      class: "Mathematics 10-A",
      dueDate: "2024-01-15",
      submissions: 18,
      totalStudents: 28,
      status: "active",
      avgGrade: 85,
    },
    {
      id: "2",
      title: "Geometry Problems",
      class: "Mathematics 10-B",
      dueDate: "2024-01-18",
      submissions: 22,
      totalStudents: 25,
      status: "active",
      avgGrade: 78,
    },
    {
      id: "3",
      title: "Trigonometry Quiz",
      class: "Mathematics 11-A",
      dueDate: "2024-01-12",
      submissions: 22,
      totalStudents: 22,
      status: "completed",
      avgGrade: 92,
    },
  ]

  const students = [
    {
      id: "1",
      name: "Emma Johnson",
      email: "emma.j@school.edu",
      class: "Mathematics 10-A",
      grade: 88,
      attendance: 95,
      assignments: { submitted: 8, total: 10 },
      lastActive: "2024-01-10",
    },
    {
      id: "2",
      name: "Michael Chen",
      email: "michael.c@school.edu",
      class: "Mathematics 10-A",
      grade: 92,
      attendance: 98,
      assignments: { submitted: 10, total: 10 },
      lastActive: "2024-01-11",
    },
    {
      id: "3",
      name: "Sarah Williams",
      email: "sarah.w@school.edu",
      class: "Mathematics 10-A",
      grade: 76,
      attendance: 87,
      assignments: { submitted: 7, total: 10 },
      lastActive: "2024-01-09",
    },
  ]

  const submissions = [
    {
      id: "1",
      studentName: "Emma Johnson",
      assignment: "Algebra Fundamentals",
      submittedDate: "2024-01-14",
      status: "graded",
      grade: 88,
      feedback: "Good work on problem solving approach",
    },
    {
      id: "2",
      studentName: "Michael Chen",
      assignment: "Algebra Fundamentals",
      submittedDate: "2024-01-13",
      status: "pending",
      grade: null,
      feedback: "",
    },
    {
      id: "3",
      studentName: "Sarah Williams",
      assignment: "Algebra Fundamentals",
      submittedDate: "2024-01-15",
      status: "pending",
      grade: null,
      feedback: "",
    },
  ]

  const attendanceDataOld = [
    { date: "2024-01-08", present: 26, absent: 2, late: 0 },
    { date: "2024-01-09", present: 25, absent: 1, late: 2 },
    { date: "2024-01-10", present: 28, absent: 0, late: 0 },
    { date: "2024-01-11", present: 24, absent: 3, late: 1 },
    { date: "2024-01-12", present: 27, absent: 1, late: 0 },
  ]

  const createAssignment = () => {
    // Simulate assignment creation
    console.log("Creating assignment:", assignmentForm)
    setAssignmentForm({
      title: "",
      description: "",
      subject: "",
      dueDate: "",
      points: "",
      instructions: "",
    })
    alert("Assignment created successfully!")
  }

  const createQuiz = () => {
    // Simulate quiz creation
    console.log("Creating quiz:", quizForm)
    setQuizForm({
      title: "",
      subject: "",
      duration: "",
      questions: [{ question: "", options: ["", "", "", ""], correct: 0 }],
    })
    alert("Quiz created successfully!")
  }

  const uploadNote = () => {
    // Simulate note upload
    console.log("Uploading note:", noteForm)
    setNoteForm({
      title: "",
      subject: "",
      content: "",
      attachments: [],
    })
    alert("Note uploaded successfully!")
  }

  const addQuizQuestion = () => {
    setQuizForm({
      ...quizForm,
      questions: [...quizForm.questions, { question: "", options: ["", "", "", ""], correct: 0 }],
    })
  }

  const updateQuizQuestion = (index: number, field: string, value: any) => {
    const updatedQuestions = [...quizForm.questions]
    if (field === "question") {
      updatedQuestions[index].question = value
    } else if (field === "correct") {
      updatedQuestions[index].correct = value
    } else if (field.startsWith("option")) {
      const optionIndex = Number.parseInt(field.split("-")[1])
      updatedQuestions[index].options[optionIndex] = value
    }
    setQuizForm({ ...quizForm, questions: updatedQuestions })
  }

  const quizzes = [
    {
      id: "1",
      title: "History Quiz - World War II",
      subject: "History",
      duration: 30,
      questions: 20,
      completed: 16,
      averageScore: 78,
      status: "active",
    },
  ]

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
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
        <div className="p-6 border-b border-green-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-blue-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
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
              <AvatarFallback className="bg-green-100 text-green-600">
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-500">Teacher</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "assignments", label: "Assignments", icon: FileText },
              { id: "quizzes", label: "Quizzes", icon: Clock },
              { id: "students", label: "Students", icon: Users },
              { id: "grading", label: "Grading", icon: Award },
              { id: "notes", label: "Notes & Materials", icon: BookOpen },
              { id: "attendance", label: "Attendance", icon: Calendar },
              { id: "reports", label: "Reports", icon: BarChart3 },
              { id: "profile", label: "Profile", icon: User },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === item.id ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100"
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
        <header className="bg-white shadow-sm border-b border-green-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Teacher Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome Card */}
              <Card className="border-green-100 bg-gradient-to-r from-green-500 to-blue-500 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Welcome back, {user.firstName}!</CardTitle>
                  <CardDescription className="text-green-100">
                    You have 5 assignments to grade and 2 upcoming deadlines
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="border-green-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">75</div>
                  </CardContent>
                </Card>
                <Card className="border-blue-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Active Assignments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">8</div>
                  </CardContent>
                </Card>
                <Card className="border-purple-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Pending Grades</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">12</div>
                  </CardContent>
                </Card>
                <Card className="border-orange-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Avg Class Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">85%</div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle>Recent Submissions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {submissions.slice(0, 3).map((submission) => (
                      <div key={submission.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{submission.studentName}</p>
                          <p className="text-sm text-gray-600">{submission.assignment}</p>
                        </div>
                        <Badge variant={submission.status === "graded" ? "default" : "secondary"}>
                          {submission.status}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle>Class Performance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {classes.map((cls) => (
                      <div key={cls.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{cls.name}</span>
                          <span className="text-sm text-gray-600">{cls.students} students</span>
                        </div>
                        <Progress value={Math.random() * 40 + 60} className="h-2" />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "assignments" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Assignment Management</h2>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Assignment
                </Button>
              </div>

              <div className="grid gap-6">
                {assignments.map((assignment) => (
                  <Card key={assignment.id} className="border-green-100">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{assignment.title}</CardTitle>
                          <CardDescription>
                            {assignment.subject} • Due: {assignment.dueDate} • {assignment.submissions} submissions
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">{assignment.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{assignment.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-500">Points: {assignment.points}</span>
                          <span className="text-sm text-gray-500">Class Average: {assignment.averageGrade}%</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewDetails(assignment.id)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEdit(assignment.id)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleExportResults(assignment.id)}>
                            <Download className="w-4 h-4 mr-2" />
                            Export Results
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {viewDetailsModal && (
                <Dialog open={!!viewDetailsModal} onOpenChange={() => setViewDetailsModal(null)}>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Assignment Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Assignment Title</Label>
                          <Input value="Mathematics Assignment - Algebra" readOnly />
                        </div>
                        <div>
                          <Label>Subject</Label>
                          <Input value="Mathematics" readOnly />
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <textarea
                          className="w-full p-2 border rounded-md"
                          rows={3}
                          value="Complete exercises 1-20 from Chapter 5. Show all work and provide detailed explanations for each solution."
                          readOnly
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>Due Date</Label>
                          <Input value="2024-01-15" readOnly />
                        </div>
                        <div>
                          <Label>Points</Label>
                          <Input value="100" readOnly />
                        </div>
                        <div>
                          <Label>Submissions</Label>
                          <Input value="18/25" readOnly />
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}

              {editModal && (
                <Dialog open={!!editModal} onOpenChange={() => setEditModal(null)}>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Edit Assignment</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Assignment Title</Label>
                          <Input defaultValue="Mathematics Assignment - Algebra" />
                        </div>
                        <div>
                          <Label>Subject</Label>
                          <Input defaultValue="Mathematics" />
                        </div>
                      </div>
                      <div>
                        <Label>Description</Label>
                        <textarea
                          className="w-full p-2 border rounded-md"
                          rows={3}
                          defaultValue="Complete exercises 1-20 from Chapter 5"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label>Due Date</Label>
                          <Input type="date" defaultValue="2024-01-15" />
                        </div>
                        <div>
                          <Label>Points</Label>
                          <Input type="number" defaultValue="100" />
                        </div>
                        <div>
                          <Label>Class</Label>
                          <select className="w-full p-2 border rounded-md">
                            <option>Grade 10-A</option>
                            <option>Grade 10-B</option>
                          </select>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => {
                            alert("Assignment updated successfully!")
                            setEditModal(null)
                          }}
                        >
                          Save Changes
                        </Button>
                        <Button variant="outline" onClick={() => setEditModal(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          )}

          {activeTab === "quizzes" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Quiz Management</h2>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Quiz
                </Button>
              </div>

              <div className="grid gap-6">
                {quizzes.map((quiz) => (
                  <Card key={quiz.id} className="border-emerald-100">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{quiz.title}</CardTitle>
                          <CardDescription>
                            {quiz.subject} • {quiz.duration} minutes • {quiz.questions} questions
                          </CardDescription>
                        </div>
                        <Badge variant="secondary">{quiz.status}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-emerald-600">{quiz.completed}</div>
                            <p className="text-sm text-gray-600">Completed</p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{quiz.averageScore}%</div>
                            <p className="text-sm text-gray-600">Average Score</p>
                          </div>
                        </div>
                        <div className="text-center">
                          <Progress value={64} className="mt-2" />
                          <p className="text-sm text-gray-600 mt-1">Completion Rate</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handleViewResults(quiz.id)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Results
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(quiz.id)}>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Quiz
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleExportResults(quiz.id)}>
                          <Download className="w-4 h-4 mr-2" />
                          Export Results
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {viewResultsModal && (
                <Dialog open={!!viewResultsModal} onOpenChange={() => setViewResultsModal(null)}>
                  <DialogContent className="max-w-4xl">
                    <DialogHeader>
                      <DialogTitle>Quiz Results</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-emerald-600">16</div>
                            <p className="text-sm text-gray-600">Students Completed</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-blue-600">78%</div>
                            <p className="text-sm text-gray-600">Average Score</p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4 text-center">
                            <div className="text-2xl font-bold text-purple-600">12</div>
                            <p className="text-sm text-gray-600">Above 80%</p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="border rounded-lg">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="p-3 text-left">Student Name</th>
                              <th className="p-3 text-left">Score</th>
                              <th className="p-3 text-left">Correct Answers</th>
                              <th className="p-3 text-left">Incorrect Questions</th>
                              <th className="p-3 text-left">Time Taken</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { name: "John Doe", score: 85, correct: 17, incorrect: "Q3, Q7, Q12", time: "28 min" },
                              { name: "Jane Smith", score: 92, incorrect: "Q5, Q14", correct: 18, time: "25 min" },
                              {
                                name: "Mike Johnson",
                                score: 78,
                                correct: 15,
                                incorrect: "Q2, Q8, Q11, Q16, Q19",
                                time: "30 min",
                              },
                              {
                                name: "Sarah Wilson",
                                score: 88,
                                correct: 17,
                                incorrect: "Q4, Q9, Q15",
                                time: "27 min",
                              },
                            ].map((student, index) => (
                              <tr key={index} className="border-t">
                                <td className="p-3 font-medium">{student.name}</td>
                                <td className="p-3">
                                  <Badge variant={student.score >= 80 ? "default" : "secondary"}>
                                    {student.score}%
                                  </Badge>
                                </td>
                                <td className="p-3">{student.correct}/20</td>
                                <td className="p-3 text-sm text-red-600">{student.incorrect}</td>
                                <td className="p-3">{student.time}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          )}

          {activeTab === "students" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Student Management</h2>
                <Input placeholder="Search students..." className="max-w-sm" />
              </div>

              <div className="grid gap-4">
                {students.map((student) => (
                  <Card key={student.id} className="border-green-100">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src={`/placeholder-pihzm.png?key=0u5w2&key=4eefw&height=40&width=40`} />
                            <AvatarFallback className="bg-green-100 text-green-600">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{student.name}</h4>
                            <p className="text-sm text-gray-600">
                              {student.class} • GPA: {student.gpa} • Attendance: {student.attendance}%
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewProfile(student.id)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Profile
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleMessage(student.id)}>
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {viewProfileModal && (
                <Dialog open={!!viewProfileModal} onOpenChange={() => setViewProfileModal(null)}>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Student Profile</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="flex items-center space-x-4">
                        <Avatar className="w-20 h-20">
                          <AvatarImage src="/placeholder.svg?height=80&width=80" />
                          <AvatarFallback className="bg-green-100 text-green-600 text-xl">JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-xl font-bold">John Doe</h3>
                          <p className="text-gray-600">Grade 10-A • Student ID: SA2024001</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Academic Performance</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex justify-between">
                              <span>Overall GPA</span>
                              <span className="font-bold">3.8</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Mathematics</span>
                              <span>A-</span>
                            </div>
                            <div className="flex justify-between">
                              <span>English</span>
                              <span>B+</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Science</span>
                              <span>A</span>
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Attendance & Behavior</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <div className="flex justify-between">
                              <span>Attendance Rate</span>
                              <span className="font-bold">95%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Late Days</span>
                              <span>2</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Assignments Submitted</span>
                              <span>18/20</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Behavior Score</span>
                              <span className="text-green-600">Excellent</span>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}

              {messageModal && (
                <Dialog open={!!messageModal} onOpenChange={() => setMessageModal(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Send Message to Student</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        const formData = new FormData(e.target as HTMLFormElement)
                        const message = formData.get("message") as string
                        sendMessage(messageModal, message)
                      }}
                    >
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="subject">Subject</Label>
                          <Input id="subject" name="subject" placeholder="Enter message subject" required />
                        </div>
                        <div>
                          <Label htmlFor="message">Message</Label>
                          <textarea
                            id="message"
                            name="message"
                            className="w-full p-2 border rounded-md"
                            rows={4}
                            placeholder="Type your message here..."
                            required
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button type="submit" className="bg-green-600 hover:bg-green-700">
                            Send Message
                          </Button>
                          <Button type="button" variant="outline" onClick={() => setMessageModal(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          )}

          {activeTab === "grading" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Grading Center</h2>

              <Tabs defaultValue="pending" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="pending">Pending (5)</TabsTrigger>
                  <TabsTrigger value="graded">Graded</TabsTrigger>
                  <TabsTrigger value="all">All Submissions</TabsTrigger>
                </TabsList>

                <TabsContent value="pending" className="space-y-4">
                  {submissions
                    .filter((s) => s.status === "pending")
                    .map((submission) => (
                      <Card key={submission.id} className="border-orange-100">
                        <CardHeader>
                          <div className="flex items-start justify-between">
                            <div>
                              <CardTitle className="text-lg">{submission.studentName}</CardTitle>
                              <CardDescription>
                                {submission.assignment} • Submitted: {submission.submittedDate}
                              </CardDescription>
                            </div>
                            <Badge variant="secondary">Pending Review</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor={`grade-${submission.id}`}>Grade (out of 100)</Label>
                                <Input id={`grade-${submission.id}`} type="number" placeholder="85" />
                              </div>
                              <div>
                                <Label>Quick Grade</Label>
                                <div className="flex space-x-2">
                                  <Button variant="outline" size="sm">
                                    A (90-100)
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    B (80-89)
                                  </Button>
                                  <Button variant="outline" size="sm">
                                    C (70-79)
                                  </Button>
                                </div>
                              </div>
                            </div>
                            <div>
                              <Label htmlFor={`feedback-${submission.id}`}>Feedback</Label>
                              <Textarea
                                id={`feedback-${submission.id}`}
                                placeholder="Provide feedback to the student..."
                                rows={3}
                              />
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Submit Grade
                              </Button>
                              <Button variant="outline" size="sm">
                                <Download className="w-4 h-4 mr-2" />
                                Download Submission
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>

                <TabsContent value="graded" className="space-y-4">
                  {submissions
                    .filter((s) => s.status === "graded")
                    .map((submission) => (
                      <Card key={submission.id} className="border-green-100">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">{submission.studentName}</h3>
                              <p className="text-sm text-gray-600">{submission.assignment}</p>
                              <p className="text-sm text-gray-500">Graded: {submission.submittedDate}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-green-600">{submission.grade}%</div>
                              <Badge>Graded</Badge>
                            </div>
                          </div>
                          {submission.feedback && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-700">{submission.feedback}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                </TabsContent>
              </Tabs>
            </div>
          )}

          {activeTab === "notes" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Notes & Materials</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Upload Note
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Study Material</DialogTitle>
                      <DialogDescription>Share notes and materials with your students.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="noteTitle">Title</Label>
                          <Input
                            id="noteTitle"
                            value={noteForm.title}
                            onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                            placeholder="e.g., Chapter 5 Notes"
                          />
                        </div>
                        <div>
                          <Label htmlFor="noteSubject">Subject</Label>
                          <Select
                            value={noteForm.subject}
                            onChange={(value) => setNoteForm({ ...noteForm, subject: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select subject" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="mathematics">Mathematics</SelectItem>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="science">Science</SelectItem>
                              <SelectItem value="history">History</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="noteContent">Content</Label>
                        <Textarea
                          id="noteContent"
                          value={noteForm.content}
                          onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
                          placeholder="Enter note content or description..."
                          rows={4}
                        />
                      </div>
                      <div>
                        <Label>Attachments</Label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">Drag and drop files here, or click to browse</p>
                          <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                            Choose Files
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={uploadNote} className="bg-purple-600 hover:bg-purple-700">
                          Upload Note
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                <Card className="border-purple-100">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">Algebra Fundamentals - Chapter 5</CardTitle>
                        <CardDescription>Mathematics • Uploaded: Jan 8, 2024</CardDescription>
                      </div>
                      <Badge>Published</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Comprehensive notes covering linear equations, graphing, and problem-solving techniques.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">📄 PDF • 2.3 MB</span>
                        <span className="text-sm text-gray-500">👁 Viewed by 24/28 students</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          Preview
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Attendance</h2>
                <Button className="bg-green-600 hover:bg-green-700" onClick={handleMarkAttendance}>
                  <Plus className="w-4 h-4 mr-2" />
                  Mark Attendance
                </Button>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle>Recent Attendance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {attendanceDataOld.map((record, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{record.date}</span>
                        <div className="flex space-x-4 text-sm">
                          <span className="text-green-600">Present: {record.present}</span>
                          <span className="text-red-600">Absent: {record.absent}</span>
                          <span className="text-yellow-600">Late: {record.late}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle>Attendance Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">92%</div>
                      <p className="text-gray-600">Average Attendance Rate</p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>This Week</span>
                        <span className="font-medium">94%</span>
                      </div>
                      <Progress value={94} />
                      <div className="flex justify-between">
                        <span>This Month</span>
                        <span className="font-medium">91%</span>
                      </div>
                      <Progress value={91} />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {attendanceModal && (
                <Dialog open={attendanceModal} onOpenChange={() => setAttendanceModal(false)}>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Mark Attendance - Grade 10-A</DialogTitle>
                      <DialogDescription>Mark attendance for today's class</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid gap-3 max-h-96 overflow-y-auto">
                        {students.slice(0, 8).map((student) => (
                          <div key={student.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback className="bg-green-100 text-green-600">
                                  {student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{student.name}</span>
                            </div>
                            <div className="flex space-x-2">
                              {["Present", "Absent", "Late"].map((status) => (
                                <button
                                  key={status}
                                  onClick={() => setAttendanceData({ ...attendanceData, [student.id]: status })}
                                  className={`px-3 py-1 rounded-md text-sm transition-colors ${
                                    attendanceData[student.id] === status
                                      ? status === "Present"
                                        ? "bg-green-500 text-white"
                                        : status === "Absent"
                                          ? "bg-red-500 text-white"
                                          : "bg-yellow-500 text-white"
                                      : "bg-gray-100 hover:bg-gray-200"
                                  }`}
                                >
                                  {status}
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2 pt-4">
                        <Button onClick={submitAttendance} className="bg-green-600 hover:bg-green-700">
                          Submit Attendance
                        </Button>
                        <Button variant="outline" onClick={() => setAttendanceModal(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Reports & Analytics</h2>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle>Class Performance Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {classes.map((cls) => (
                      <div key={cls.id} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">{cls.name}</span>
                          <span className="text-sm text-gray-600">Avg: {Math.floor(Math.random() * 20 + 75)}%</span>
                        </div>
                        <Progress value={Math.random() * 40 + 60} />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle>Assignment Completion Rates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span>Algebra Fundamentals</span>
                        <Badge variant="outline">64% Complete</Badge>
                      </div>
                      <Progress value={64} />
                      <div className="flex justify-between items-center">
                        <span>Geometry Problems</span>
                        <Badge variant="outline">88% Complete</Badge>
                      </div>
                      <Progress value={88} />
                      <div className="flex justify-between items-center">
                        <span>Trigonometry Quiz</span>
                        <Badge>100% Complete</Badge>
                      </div>
                      <Progress value={100} />
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
                <Card className="border-green-100">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" />
                        <AvatarFallback className="bg-green-100 text-green-600 text-xl">
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
                  </CardContent>
                </Card>

                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle>Teaching Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Department</Label>
                      <Input value="Mathematics" readOnly />
                    </div>
                    <div>
                      <Label>Employee ID</Label>
                      <Input value="T2024001" readOnly />
                    </div>
                    <div>
                      <Label>Classes Teaching</Label>
                      <Input value="3 Classes, 75 Students" readOnly />
                    </div>
                    <div>
                      <Label>Join Date</Label>
                      <Input value="September 1, 2020" readOnly />
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
