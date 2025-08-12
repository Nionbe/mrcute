"use client"

import { useState } from "react"
import {
  BookOpen,
  FileText,
  Clock,
  Calendar,
  Award,
  Trophy,
  Shield,
  User,
  Bell,
  Menu,
  X,
  Upload,
  Download,
  Eye,
  CheckCircle,
  Star,
  Users,
  Crown,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const StudentDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [studentData, setStudentData] = useState({
    id: "SA2024001",
    name: "Alex Johnson",
    class: "Grade 10-A",
    email: "alex.johnson@safari-academy.com",
    points: 285,
    rank: 3,
    badges: ["Quiz Starter", "Speedster", "Top Scorer"],
    completedQuizzes: 12,
    totalQuizzes: 15,
  })

  const [kycData, setKycData] = useState({
    status: "pending",
    fullName: "",
    dateOfBirth: "",
    idNumber: "",
    uploadedImage: null,
    verificationTime: null,
  })

  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "Mathematics Quiz 1",
      subject: "Mathematics",
      dueDate: "2024-01-20",
      status: "completed",
      score: 87,
      timeSpent: 15,
      timeLimit: 30,
      points: 53, // 10 + 40 + 10 (fast finish)
      questions: 10,
      correctAnswers: 8,
    },
    {
      id: 2,
      title: "Science Quiz 2",
      subject: "Science",
      dueDate: "2024-01-22",
      status: "available",
      timeLimit: 25,
      questions: 8,
    },
  ])

  const [assignments, setAssignments] = useState([
    {
      id: 1,
      title: "Essay on Climate Change",
      subject: "English",
      dueDate: "2024-01-25",
      status: "submitted",
      submittedAt: "2024-01-20T10:30:00Z",
      grade: "A-",
    },
    {
      id: 2,
      title: "Math Problem Set 5",
      subject: "Mathematics",
      dueDate: "2024-01-28",
      status: "pending",
    },
  ])

  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Physics - Newton's Laws",
      subject: "Physics",
      uploadedAt: "2024-01-15",
      readStatus: "completed",
      content: "Newton's three laws of motion...",
    },
    {
      id: 2,
      title: "History - World War II",
      subject: "History",
      uploadedAt: "2024-01-18",
      readStatus: "unread",
      content: "World War II timeline and key events...",
    },
  ])

  const [leaderboardData, setLeaderboardData] = useState({
    currentUser: {
      rank: 3,
      points: 285,
      badges: ["Quiz Starter", "Speedster", "Top Scorer"],
    },
    topStudents: [
      { rank: 1, name: "Sarah M.", class: "Grade 10-B", points: 342, avatar: "/placeholder.svg?height=32&width=32" },
      { rank: 2, name: "Mike R.", class: "Grade 10-A", points: 318, avatar: "/placeholder.svg?height=32&width=32" },
      {
        rank: 3,
        name: "Alex J.",
        class: "Grade 10-A",
        points: 285,
        avatar: "/placeholder.svg?height=32&width=32",
        isCurrentUser: true,
      },
      { rank: 4, name: "Emma L.", class: "Grade 10-C", points: 267, avatar: "/placeholder.svg?height=32&width=32" },
      { rank: 5, name: "David K.", class: "Grade 10-B", points: 245, avatar: "/placeholder.svg?height=32&width=32" },
    ],
  })

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Quiz Available",
      message: "Science Quiz 3 has been posted by Mrs. Smith",
      time: "2 hours ago",
      read: false,
      type: "quiz",
    },
    {
      id: 2,
      title: "Assignment Graded",
      message: "Your Climate Change essay has been graded: A-",
      time: "1 day ago",
      read: true,
      type: "grade",
    },
  ])

  const handleKYCSubmit = () => {
    if (kycData.fullName && kycData.dateOfBirth && kycData.idNumber && kycData.uploadedImage) {
      setKycData((prev) => ({ ...prev, status: "verifying", verificationTime: Date.now() }))

      // Simulate 5-10 minute verification
      setTimeout(
        () => {
          setKycData((prev) => ({ ...prev, status: "approved" }))
        },
        Math.random() * 300000 + 300000,
      ) // 5-10 minutes
    }
  }

  const completeQuiz = (quizId, score, timeSpent) => {
    setQuizzes((prev) =>
      prev.map((quiz) => {
        if (quiz.id === quizId) {
          const completionPoints = 10
          const scoreBonus = Math.floor(score / 10) * 5
          const fastFinishBonus = timeSpent <= quiz.timeLimit * 0.5 ? 10 : 0
          const totalPoints = completionPoints + scoreBonus + fastFinishBonus

          // Update student points
          setStudentData((prevData) => ({
            ...prevData,
            points: prevData.points + totalPoints,
            completedQuizzes: prevData.completedQuizzes + 1,
          }))

          return {
            ...quiz,
            status: "completed",
            score,
            timeSpent,
            points: totalPoints,
            correctAnswers: Math.floor((score / 100) * quiz.questions),
          }
        }
        return quiz
      }),
    )
  }

  const markNoteAsRead = (noteId) => {
    setNotes((prev) => prev.map((note) => (note.id === noteId ? { ...note, readStatus: "completed" } : note)))
  }

  const navigationItems = [
    { id: "overview", label: "Overview", icon: BookOpen },
    { id: "assignments", label: "Assignments", icon: FileText },
    { id: "quizzes", label: "Quizzes", icon: Clock },
    { id: "notes", label: "Notes", icon: BookOpen },
    { id: "attendance", label: "Attendance", icon: Calendar },
    { id: "grades", label: "Grades", icon: Award },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "kyc", label: "KYC Verification", icon: Shield },
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Button variant="outline" size="sm" onClick={() => setSidebarOpen(!sidebarOpen)} className="bg-white shadow-md">
          {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-center h-16 bg-gradient-to-r from-green-600 to-emerald-600">
          <h1 className="text-xl font-bold text-white">Safari Academy</h1>
        </div>

        <div className="p-4 border-b bg-green-50">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback className="bg-green-600 text-white">AJ</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-900">{studentData.name}</p>
              <p className="text-sm text-gray-600">ID: {studentData.id}</p>
              <p className="text-xs text-green-600">{studentData.class}</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? "bg-green-100 text-green-700 border-l-4 border-green-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.id === "kyc" && kycData.status === "pending" && (
                  <Badge variant="destructive" className="text-xs">
                    !
                  </Badge>
                )}
                {item.id === "notifications" && notifications.filter((n) => !n.read).length > 0 && (
                  <Badge className="bg-red-500 text-xs">{notifications.filter((n) => !n.read).length}</Badge>
                )}
              </button>
            ))}
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="lg:ml-64 min-h-screen">
        <div className="p-4 sm:p-6 pt-16 lg:pt-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard Overview</h2>
                <div className="flex items-center space-x-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold text-gray-700">Rank #{leaderboardData.currentUser.rank}</span>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">Total Points</p>
                        <p className="text-2xl sm:text-3xl font-bold">{studentData.points}</p>
                      </div>
                      <Star className="w-6 h-6 sm:w-8 sm:h-8 text-green-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Completed Quizzes</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                          {studentData.completedQuizzes}/{studentData.totalQuizzes}
                        </p>
                      </div>
                      <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Current Rank</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                          #{leaderboardData.currentUser.rank}
                        </p>
                      </div>
                      <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">Badges Earned</p>
                        <p className="text-2xl sm:text-3xl font-bold text-gray-900">{studentData.badges.length}</p>
                      </div>
                      <Award className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Clock className="w-5 h-5" />
                      <span>Recent Quizzes</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {quizzes.slice(0, 3).map((quiz) => (
                        <div key={quiz.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1 min-w-0">
                            <p className="font-medium truncate">{quiz.title}</p>
                            <p className="text-sm text-gray-600">{quiz.subject}</p>
                          </div>
                          <div className="text-right ml-4">
                            {quiz.status === "completed" ? (
                              <div>
                                <Badge className="bg-green-100 text-green-800 text-xs">Completed</Badge>
                                <p className="text-sm text-gray-600 mt-1">
                                  {quiz.score}% (+{quiz.points} pts)
                                </p>
                              </div>
                            ) : (
                              <Badge variant="outline" className="text-xs">
                                Available
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-lg">
                      <Award className="w-5 h-5" />
                      <span>My Badges</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {studentData.badges.map((badge, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg"
                        >
                          <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 flex-shrink-0" />
                          <span className="text-sm font-medium text-purple-800 truncate">{badge}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Quizzes Tab */}
          {activeTab === "quizzes" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Quizzes</h2>

              <div className="grid gap-6">
                {quizzes.map((quiz) => (
                  <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <Clock className="w-5 h-5" />
                            <span>{quiz.title}</span>
                          </CardTitle>
                          <CardDescription>
                            {quiz.subject} • Due: {quiz.dueDate}
                          </CardDescription>
                        </div>
                        {quiz.status === "completed" ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Completed
                          </Badge>
                        ) : (
                          <Badge variant="outline">Available</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      {quiz.status === "completed" ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center p-3 bg-green-50 rounded-lg">
                              <p className="text-2xl font-bold text-green-600">{quiz.score}%</p>
                              <p className="text-sm text-gray-600">Score</p>
                            </div>
                            <div className="text-center p-3 bg-blue-50 rounded-lg">
                              <p className="text-2xl font-bold text-blue-600">{quiz.points}</p>
                              <p className="text-sm text-gray-600">Points Earned</p>
                            </div>
                            <div className="text-center p-3 bg-purple-50 rounded-lg">
                              <p className="text-2xl font-bold text-purple-600">
                                {quiz.correctAnswers}/{quiz.questions}
                              </p>
                              <p className="text-sm text-gray-600">Correct</p>
                            </div>
                            <div className="text-center p-3 bg-orange-50 rounded-lg">
                              <p className="text-2xl font-bold text-orange-600">{quiz.timeSpent}m</p>
                              <p className="text-sm text-gray-600">Time Spent</p>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View Results
                            </Button>
                            <Button variant="outline" size="sm">
                              <Download className="w-4 h-4 mr-2" />
                              Download Report
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>{quiz.questions} questions</span>
                            <span>{quiz.timeLimit} minutes</span>
                          </div>
                          <Button
                            className="w-full bg-green-600 hover:bg-green-700"
                            onClick={() => {
                              // Simulate quiz completion
                              const simulatedScore = Math.floor(Math.random() * 30) + 70 // 70-100%
                              const simulatedTime = Math.floor(Math.random() * quiz.timeLimit * 0.8) + 5
                              completeQuiz(quiz.id, simulatedScore, simulatedTime)
                            }}
                          >
                            Start Quiz
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Notes Tab */}
          {activeTab === "notes" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Study Notes</h2>

              <div className="grid gap-6">
                {notes.map((note) => (
                  <Card key={note.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center space-x-2">
                            <FileText className="w-5 h-5" />
                            <span>{note.title}</span>
                          </CardTitle>
                          <CardDescription>
                            {note.subject} • Uploaded: {note.uploadedAt}
                          </CardDescription>
                        </div>
                        {note.readStatus === "completed" ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Completed
                          </Badge>
                        ) : (
                          <Badge variant="outline">Unread</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-gray-700">{note.content}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => markNoteAsRead(note.id)}
                            disabled={note.readStatus === "completed"}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            {note.readStatus === "completed" ? "Read" : "Mark as Read"}
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Leaderboard Tab */}
          {activeTab === "leaderboard" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gray-900">Student Leaderboard</h2>
                <Tabs defaultValue="all-time" className="w-auto">
                  <TabsList>
                    <TabsTrigger value="weekly">Weekly</TabsTrigger>
                    <TabsTrigger value="monthly">Monthly</TabsTrigger>
                    <TabsTrigger value="all-time">All Time</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* My Progress Card */}
              <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy className="w-6 h-6" />
                    <span>My Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{studentData.points}</p>
                      <p className="text-green-100">Total Points</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">#{leaderboardData.currentUser.rank}</p>
                      <p className="text-green-100">Current Rank</p>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-bold">{studentData.badges.length}</p>
                      <p className="text-green-100">Badges Earned</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2">
                      {studentData.badges.map((badge, index) => (
                        <Badge key={index} className="bg-white/20 text-white border-white/30">
                          <Crown className="w-3 h-3 mr-1" />
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Students */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="w-5 h-5" />
                    <span>Top 10 Students</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {leaderboardData.topStudents.map((student) => (
                      <div
                        key={student.rank}
                        className={`flex items-center justify-between p-4 rounded-lg transition-colors ${
                          student.isCurrentUser
                            ? "bg-green-50 border-2 border-green-200"
                            : "bg-gray-50 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                              student.rank === 1
                                ? "bg-yellow-500"
                                : student.rank === 2
                                  ? "bg-gray-400"
                                  : student.rank === 3
                                    ? "bg-orange-500"
                                    : "bg-gray-300"
                            }`}
                          >
                            {student.rank}
                          </div>
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold flex items-center space-x-2">
                              <span>{student.name}</span>
                              {student.isCurrentUser && <Badge className="bg-green-600 text-xs">You</Badge>}
                            </p>
                            <p className="text-sm text-gray-600">{student.class}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{student.points}</p>
                          <p className="text-sm text-gray-600">points</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* KYC Tab */}
          {activeTab === "kyc" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">KYC Verification</h2>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Identity Verification</span>
                  </CardTitle>
                  <CardDescription>Complete your identity verification to access all platform features</CardDescription>
                </CardHeader>
                <CardContent>
                  {kycData.status === "pending" && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            value={kycData.fullName}
                            onChange={(e) => setKycData((prev) => ({ ...prev, fullName: e.target.value }))}
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="dateOfBirth">Date of Birth</Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            value={kycData.dateOfBirth}
                            onChange={(e) => setKycData((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="idNumber">ID Number (must match your Student ID: {studentData.id})</Label>
                        <Input
                          id="idNumber"
                          value={kycData.idNumber}
                          onChange={(e) => setKycData((prev) => ({ ...prev, idNumber: e.target.value }))}
                          placeholder="Enter your ID number"
                        />
                        {kycData.idNumber && kycData.idNumber !== studentData.id && (
                          <p className="text-sm text-red-600 mt-1">ID number must match your Student ID</p>
                        )}
                      </div>

                      <div>
                        <Label>Upload ID Document</Label>
                        <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-600">Click to upload your ID document</p>
                          <Button
                            variant="outline"
                            className="mt-2 bg-transparent"
                            onClick={() => {
                              // Simulate file upload
                              setKycData((prev) => ({ ...prev, uploadedImage: "id-document.jpg" }))
                            }}
                          >
                            Choose File
                          </Button>
                          {kycData.uploadedImage && (
                            <p className="text-sm text-green-600 mt-2">✓ {kycData.uploadedImage} uploaded</p>
                          )}
                        </div>
                      </div>

                      <Button
                        onClick={handleKYCSubmit}
                        disabled={
                          !kycData.fullName ||
                          !kycData.dateOfBirth ||
                          !kycData.idNumber ||
                          !kycData.uploadedImage ||
                          kycData.idNumber !== studentData.id
                        }
                        className="w-full bg-green-600 hover:bg-green-700"
                      >
                        Submit for Verification
                      </Button>
                    </div>
                  )}

                  {kycData.status === "verifying" && (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                      <h3 className="text-lg font-semibold text-gray-900">Verification in Progress</h3>
                      <p className="text-gray-600">
                        AI is reviewing your documents. This typically takes 5-10 minutes.
                      </p>
                      <div className="mt-4">
                        <Progress value={65} className="w-full max-w-md mx-auto" />
                        <p className="text-sm text-gray-500 mt-2">Processing...</p>
                      </div>
                    </div>
                  )}

                  {kycData.status === "approved" && (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900">Verification Complete</h3>
                      <p className="text-gray-600">Your identity has been successfully verified!</p>
                      <Badge className="bg-green-100 text-green-800 mt-4">Verified Account</Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Notifications</h2>

              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`cursor-pointer transition-colors ${
                      !notification.read ? "bg-blue-50 border-blue-200" : "bg-white"
                    }`}
                    onClick={() => {
                      setNotifications((prev) => prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)))
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-semibold text-gray-900">{notification.title}</h3>
                            {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                          </div>
                          <p className="text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-sm text-gray-500 mt-2">{notification.time}</p>
                        </div>
                        <div className="ml-4">
                          {notification.type === "quiz" && <Clock className="w-5 h-5 text-blue-500" />}
                          {notification.type === "grade" && <Award className="w-5 h-5 text-green-500" />}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Other tabs with placeholder content */}
          {activeTab === "assignments" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Assignments</h2>
              <div className="grid gap-6">
                {assignments.map((assignment) => (
                  <Card key={assignment.id}>
                    <CardHeader>
                      <CardTitle>{assignment.title}</CardTitle>
                      <CardDescription>
                        {assignment.subject} • Due: {assignment.dueDate}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge
                          className={
                            assignment.status === "submitted"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {assignment.status === "submitted" ? "Submitted" : "Pending"}
                        </Badge>
                        {assignment.grade && <span className="font-semibold">Grade: {assignment.grade}</span>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Attendance</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Attendance tracking coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "grades" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Grades</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <Award className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Grade reports coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Profile</h2>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Profile management coming soon</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}

export default StudentDashboardPage
