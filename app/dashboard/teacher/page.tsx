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
  const [selectedClass, setSelectedClass] = useState("math-10a")

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

  const attendanceData = [
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
                  <SelectValue />
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
                <h2 className="text-xl font-bold">Assignments</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Assignment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Create New Assignment</DialogTitle>
                      <DialogDescription>
                        Fill in the details to create a new assignment for your students.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="title">Assignment Title</Label>
                          <Input
                            id="title"
                            value={assignmentForm.title}
                            onChange={(e) => setAssignmentForm({ ...assignmentForm, title: e.target.value })}
                            placeholder="e.g., Algebra Chapter 5"
                          />
                        </div>
                        <div>
                          <Label htmlFor="subject">Subject</Label>
                          <Select
                            value={assignmentForm.subject}
                            onValueChange={(value) => setAssignmentForm({ ...assignmentForm, subject: value })}
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
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="dueDate">Due Date</Label>
                          <Input
                            id="dueDate"
                            type="date"
                            value={assignmentForm.dueDate}
                            onChange={(e) => setAssignmentForm({ ...assignmentForm, dueDate: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="points">Total Points</Label>
                          <Input
                            id="points"
                            type="number"
                            value={assignmentForm.points}
                            onChange={(e) => setAssignmentForm({ ...assignmentForm, points: e.target.value })}
                            placeholder="100"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={assignmentForm.description}
                          onChange={(e) => setAssignmentForm({ ...assignmentForm, description: e.target.value })}
                          placeholder="Brief description of the assignment"
                        />
                      </div>
                      <div>
                        <Label htmlFor="instructions">Instructions</Label>
                        <Textarea
                          id="instructions"
                          value={assignmentForm.instructions}
                          onChange={(e) => setAssignmentForm({ ...assignmentForm, instructions: e.target.value })}
                          placeholder="Detailed instructions for students"
                          rows={4}
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={createAssignment} className="bg-green-600 hover:bg-green-700">
                          Create Assignment
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-6">
                {assignments.map((assignment) => (
                  <Card key={assignment.id} className="border-green-100">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{assignment.title}</CardTitle>
                          <CardDescription>
                            {assignment.class} • Due: {assignment.dueDate}
                          </CardDescription>
                        </div>
                        <Badge variant={assignment.status === "completed" ? "default" : "secondary"}>
                          {assignment.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {assignment.submissions}/{assignment.totalStudents}
                          </div>
                          <p className="text-sm text-gray-600">Submissions</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{assignment.avgGrade}%</div>
                          <p className="text-sm text-gray-600">Avg Grade</p>
                        </div>
                        <div className="text-center">
                          <Progress
                            value={(assignment.submissions / assignment.totalStudents) * 100}
                            className="mt-2"
                          />
                          <p className="text-sm text-gray-600 mt-1">Completion Rate</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export Results
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "quizzes" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Quizzes</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Quiz
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Create New Quiz</DialogTitle>
                      <DialogDescription>
                        Build a quiz with multiple choice questions for your students.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="quizTitle">Quiz Title</Label>
                          <Input
                            id="quizTitle"
                            value={quizForm.title}
                            onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
                            placeholder="e.g., History Quiz - WWII"
                          />
                        </div>
                        <div>
                          <Label htmlFor="quizSubject">Subject</Label>
                          <Select
                            value={quizForm.subject}
                            onValueChange={(value) => setQuizForm({ ...quizForm, subject: value })}
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
                        <div>
                          <Label htmlFor="duration">Duration (minutes)</Label>
                          <Input
                            id="duration"
                            type="number"
                            value={quizForm.duration}
                            onChange={(e) => setQuizForm({ ...quizForm, duration: e.target.value })}
                            placeholder="30"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium">Questions</h3>
                          <Button onClick={addQuizQuestion} variant="outline" size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Question
                          </Button>
                        </div>

                        {quizForm.questions.map((question, index) => (
                          <Card key={index} className="border-blue-100">
                            <CardHeader>
                              <CardTitle className="text-base">Question {index + 1}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div>
                                <Label>Question Text</Label>
                                <Textarea
                                  value={question.question}
                                  onChange={(e) => updateQuizQuestion(index, "question", e.target.value)}
                                  placeholder="Enter your question here..."
                                />
                              </div>
                              <div className="grid grid-cols-2 gap-4">
                                {question.options.map((option, optionIndex) => (
                                  <div key={optionIndex} className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      name={`correct-${index}`}
                                      checked={question.correct === optionIndex}
                                      onChange={() => updateQuizQuestion(index, "correct", optionIndex)}
                                      className="text-blue-600"
                                    />
                                    <Input
                                      value={option}
                                      onChange={(e) =>
                                        updateQuizQuestion(index, `option-${optionIndex}`, e.target.value)
                                      }
                                      placeholder={`Option ${optionIndex + 1}`}
                                    />
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={createQuiz} className="bg-blue-600 hover:bg-blue-700">
                          Create Quiz
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-6">
                <Card className="border-blue-100">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">History Quiz - World War II</CardTitle>
                        <CardDescription>History • 30 minutes • 15 questions</CardDescription>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">18/28</div>
                        <p className="text-sm text-gray-600">Completed</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">82%</div>
                        <p className="text-sm text-gray-600">Avg Score</p>
                      </div>
                      <div className="text-center">
                        <Progress value={64} className="mt-2" />
                        <p className="text-sm text-gray-600 mt-1">Completion Rate</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Results
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Quiz
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export Results
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Students</h2>
                <Input placeholder="Search students..." className="max-w-sm" />
              </div>

              <div className="grid gap-4">
                {students.map((student) => (
                  <Card key={student.id} className="border-green-100">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=50&width=50" />
                            <AvatarFallback className="bg-green-100 text-green-600">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{student.name}</h3>
                            <p className="text-sm text-gray-600">{student.email}</p>
                            <p className="text-sm text-gray-500">{student.class}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-8 text-center">
                          <div>
                            <div className="text-lg font-bold text-blue-600">{student.grade}%</div>
                            <p className="text-xs text-gray-600">Grade</p>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-green-600">{student.attendance}%</div>
                            <p className="text-xs text-gray-600">Attendance</p>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-purple-600">
                              {student.assignments.submitted}/{student.assignments.total}
                            </div>
                            <p className="text-xs text-gray-600">Assignments</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Profile
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
                            onValueChange={(value) => setNoteForm({ ...noteForm, subject: value })}
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
                <Button className="bg-blue-600 hover:bg-blue-700">
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
                    {attendanceData.map((record, index) => (
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
