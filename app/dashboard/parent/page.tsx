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
import { Calendar } from "@/components/ui/calendar"
import {
  Users,
  FileText,
  Clock,
  Award,
  User,
  Bell,
  MessageSquare,
  CalendarIcon,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Download,
  Eye,
  GraduationCap,
  LogOut,
  Menu,
  X,
  Phone,
  Mail,
  Home,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function ParentDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [selectedChild, setSelectedChild] = useState("emma")

  // Message form state
  const [messageForm, setMessageForm] = useState({
    teacher: "",
    subject: "",
    message: "",
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

  const sendMessage = () => {
    console.log("Sending message:", messageForm)
    setMessageForm({ teacher: "", subject: "", message: "" })
    alert("Message sent successfully!")
  }

  // Mock data for children (parents can have multiple children)
  const children = [
    {
      id: "emma",
      name: "Emma Johnson",
      grade: "Grade 10",
      class: "10-A",
      photo: "/placeholder.svg?height=60&width=60",
      studentId: "SA2024001",
    },
    {
      id: "alex",
      name: "Alex Johnson",
      grade: "Grade 8",
      class: "8-B",
      photo: "/placeholder.svg?height=60&width=60",
      studentId: "SA2024002",
    },
  ]

  const currentChild = children.find((child) => child.id === selectedChild) || children[0]

  // Mock data for the selected child
  const childData = {
    emma: {
      grades: [
        { subject: "Mathematics", grade: "A-", percentage: 88, trend: "up" },
        { subject: "English", grade: "B+", percentage: 85, trend: "stable" },
        { subject: "Science", grade: "A", percentage: 92, trend: "up" },
        { subject: "History", grade: "B", percentage: 82, trend: "down" },
        { subject: "Art", grade: "A+", percentage: 96, trend: "up" },
      ],
      assignments: [
        {
          id: "1",
          title: "Mathematics Assignment - Algebra",
          subject: "Mathematics",
          dueDate: "2024-01-15",
          status: "submitted",
          grade: 88,
          submittedDate: "2024-01-14",
        },
        {
          id: "2",
          title: "English Essay - Shakespeare",
          subject: "English",
          dueDate: "2024-01-18",
          status: "pending",
          grade: null,
          submittedDate: null,
        },
        {
          id: "3",
          title: "Science Lab Report",
          subject: "Science",
          dueDate: "2024-01-20",
          status: "overdue",
          grade: null,
          submittedDate: null,
        },
      ],
      attendance: {
        rate: 95,
        present: 18,
        absent: 1,
        late: 0,
        recentRecords: [
          { date: "2024-01-08", status: "present" },
          { date: "2024-01-09", status: "present" },
          { date: "2024-01-10", status: "absent" },
          { date: "2024-01-11", status: "present" },
          { date: "2024-01-12", status: "present" },
        ],
      },
      upcomingEvents: [
        {
          id: "1",
          title: "Parent-Teacher Conference",
          date: "2024-01-20",
          time: "2:00 PM",
          type: "meeting",
        },
        {
          id: "2",
          title: "Mathematics Quiz",
          date: "2024-01-16",
          time: "10:00 AM",
          type: "quiz",
        },
        {
          id: "3",
          title: "Science Fair",
          date: "2024-01-25",
          time: "9:00 AM",
          type: "event",
        },
      ],
    },
    alex: {
      grades: [
        { subject: "Mathematics", grade: "B+", percentage: 87, trend: "up" },
        { subject: "English", grade: "A-", percentage: 89, trend: "stable" },
        { subject: "Science", grade: "B", percentage: 83, trend: "up" },
        { subject: "History", grade: "A", percentage: 91, trend: "up" },
        { subject: "Physical Education", grade: "A+", percentage: 98, trend: "stable" },
      ],
      assignments: [
        {
          id: "1",
          title: "History Project - Ancient Civilizations",
          subject: "History",
          dueDate: "2024-01-17",
          status: "submitted",
          grade: 91,
          submittedDate: "2024-01-16",
        },
        {
          id: "2",
          title: "Math Worksheet - Fractions",
          subject: "Mathematics",
          dueDate: "2024-01-19",
          status: "pending",
          grade: null,
          submittedDate: null,
        },
      ],
      attendance: {
        rate: 98,
        present: 19,
        absent: 0,
        late: 1,
        recentRecords: [
          { date: "2024-01-08", status: "present" },
          { date: "2024-01-09", status: "present" },
          { date: "2024-01-10", status: "present" },
          { date: "2024-01-11", status: "late" },
          { date: "2024-01-12", status: "present" },
        ],
      },
      upcomingEvents: [
        {
          id: "1",
          title: "Sports Day",
          date: "2024-01-22",
          time: "9:00 AM",
          type: "event",
        },
        {
          id: "2",
          title: "English Presentation",
          date: "2024-01-18",
          time: "11:00 AM",
          type: "assignment",
        },
      ],
    },
  }

  const currentChildData = childData[selectedChild as keyof typeof childData] || childData.emma

  const notifications = [
    {
      id: "1",
      title: "New Grade Posted",
      message: "Emma received 88% on Mathematics Assignment",
      date: "2024-01-14",
      type: "grade",
      read: false,
    },
    {
      id: "2",
      title: "Assignment Due Soon",
      message: "English Essay due in 2 days",
      date: "2024-01-16",
      type: "assignment",
      read: false,
    },
    {
      id: "3",
      title: "Parent-Teacher Conference",
      message: "Scheduled for January 20th at 2:00 PM",
      date: "2024-01-15",
      type: "meeting",
      read: true,
    },
  ]

  const teachers = [
    { id: "1", name: "Ms. Sarah Wilson", subject: "Mathematics", email: "s.wilson@school.edu" },
    { id: "2", name: "Mr. John Davis", subject: "English", email: "j.davis@school.edu" },
    { id: "3", name: "Dr. Maria Garcia", subject: "Science", email: "m.garcia@school.edu" },
    { id: "4", name: "Mr. Robert Brown", subject: "History", email: "r.brown@school.edu" },
  ]

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
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
        <div className="p-6 border-b border-purple-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
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
              <AvatarFallback className="bg-purple-100 text-purple-600">
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-500">Parent</p>
            </div>
          </div>
        </div>

        {/* Child Selector */}
        <div className="p-4 border-b border-purple-100">
          <Label className="text-sm font-medium text-gray-700">Monitoring</Label>
          <Select value={selectedChild} onValueChange={setSelectedChild}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {children.map((child) => (
                <SelectItem key={child.id} value={child.id}>
                  <div className="flex items-center space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={child.photo || "/placeholder.svg"} />
                      <AvatarFallback className="text-xs">
                        {child.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>{child.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {[
              { id: "overview", label: "Overview", icon: Home },
              { id: "grades", label: "Grades", icon: Award },
              { id: "assignments", label: "Assignments", icon: FileText },
              { id: "attendance", label: "Attendance", icon: CalendarIcon },
              { id: "schedule", label: "Schedule", icon: Clock },
              { id: "teachers", label: "Teachers", icon: Users },
              { id: "notifications", label: "Notifications", icon: Bell },
              { id: "profile", label: "Profile", icon: User },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === item.id ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.id === "notifications" && (
                  <Badge className="ml-auto bg-red-500 text-white text-xs">
                    {notifications.filter((n) => !n.read).length}
                  </Badge>
                )}
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
        <header className="bg-white shadow-sm border-b border-purple-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Parent Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={currentChild.photo || "/placeholder.svg"} />
                  <AvatarFallback className="text-xs bg-purple-100 text-purple-600">
                    {currentChild.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{currentChild.name}</p>
                  <p className="text-xs text-gray-500">{currentChild.grade}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome Card */}
              <Card className="border-purple-100 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Welcome back, {user.firstName}!</CardTitle>
                  <CardDescription className="text-purple-100">
                    Here's how {currentChild.name} is doing in {currentChild.grade}
                  </CardDescription>
                </CardHeader>
              </Card>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="border-purple-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Overall GPA</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">
                      {(
                        currentChildData.grades.reduce((sum, grade) => sum + grade.percentage, 0) /
                        currentChildData.grades.length /
                        25
                      ).toFixed(1)}
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-green-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Attendance Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{currentChildData.attendance.rate}%</div>
                  </CardContent>
                </Card>
                <Card className="border-blue-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Assignments Due</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">
                      {currentChildData.assignments.filter((a) => a.status === "pending").length}
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-orange-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Unread Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">
                      {notifications.filter((n) => !n.read).length}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle>Recent Grades</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentChildData.grades.slice(0, 3).map((grade, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                          <div>
                            <p className="font-medium">{grade.subject}</p>
                            <p className="text-sm text-gray-600">{grade.percentage}%</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{grade.grade}</Badge>
                          {grade.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                          {grade.trend === "down" && <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentChildData.upcomingEvents.slice(0, 3).map((event) => (
                      <div key={event.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            event.type === "meeting"
                              ? "bg-purple-500"
                              : event.type === "quiz"
                                ? "bg-blue-500"
                                : "bg-green-500"
                          }`}
                        ></div>
                        <div className="flex-1">
                          <p className="font-medium">{event.title}</p>
                          <p className="text-sm text-gray-600">
                            {event.date} at {event.time}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            event.type === "meeting"
                              ? "border-purple-200 text-purple-600"
                              : event.type === "quiz"
                                ? "border-blue-200 text-blue-600"
                                : "border-green-200 text-green-600"
                          }
                        >
                          {event.type}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "grades" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Academic Performance</h2>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </Button>
              </div>

              <div className="grid gap-6">
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle>Overall Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600">
                          {(
                            currentChildData.grades.reduce((sum, grade) => sum + grade.percentage, 0) /
                            currentChildData.grades.length /
                            25
                          ).toFixed(1)}
                        </div>
                        <p className="text-gray-600">Overall GPA</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">
                          {Math.round(
                            currentChildData.grades.reduce((sum, grade) => sum + grade.percentage, 0) /
                              currentChildData.grades.length,
                          )}
                          %
                        </div>
                        <p className="text-gray-600">Average Grade</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">{currentChildData.grades.length}</div>
                        <p className="text-gray-600">Subjects</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle>Subject Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentChildData.grades.map((grade, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div>
                              <h4 className="font-medium">{grade.subject}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <Progress value={grade.percentage} className="w-32 h-2" />
                                <span className="text-sm text-gray-600">{grade.percentage}%</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-right">
                              <div className="text-xl font-bold text-purple-600">{grade.grade}</div>
                            </div>
                            {grade.trend === "up" && <TrendingUp className="w-5 h-5 text-green-500" />}
                            {grade.trend === "down" && <TrendingUp className="w-5 h-5 text-red-500 rotate-180" />}
                            {grade.trend === "stable" && <div className="w-5 h-5 bg-gray-300 rounded-full"></div>}
                          </div>
                        </div>
                      ))}
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
                {currentChildData.assignments.map((assignment) => (
                  <Card key={assignment.id} className="border-purple-100">
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
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {assignment.status === "submitted" && assignment.grade && (
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <span className="font-medium text-green-600">Grade: {assignment.grade}%</span>
                              <span className="text-sm text-gray-500">Submitted: {assignment.submittedDate}</span>
                            </div>
                          )}
                          {assignment.status === "pending" && (
                            <div className="flex items-center space-x-2">
                              <Clock className="w-5 h-5 text-blue-500" />
                              <span className="text-blue-600">Pending submission</span>
                            </div>
                          )}
                          {assignment.status === "overdue" && (
                            <div className="flex items-center space-x-2">
                              <AlertTriangle className="w-5 h-5 text-red-500" />
                              <span className="text-red-600">Overdue</span>
                            </div>
                          )}
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "attendance" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Attendance Record</h2>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-purple-100">
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
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600">{currentChildData.attendance.rate}%</div>
                        <p className="text-gray-600">Overall Attendance Rate</p>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-xl font-bold text-green-600">{currentChildData.attendance.present}</div>
                          <p className="text-sm text-gray-600">Present</p>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-red-600">{currentChildData.attendance.absent}</div>
                          <p className="text-sm text-gray-600">Absent</p>
                        </div>
                        <div>
                          <div className="text-xl font-bold text-yellow-600">{currentChildData.attendance.late}</div>
                          <p className="text-sm text-gray-600">Late</p>
                        </div>
                      </div>
                      <Progress value={currentChildData.attendance.rate} className="mt-4" />
                    </CardContent>
                  </Card>

                  <Card className="border-blue-100">
                    <CardHeader>
                      <CardTitle>Recent Attendance</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {currentChildData.attendance.recentRecords.map((record, index) => (
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

          {activeTab === "schedule" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Schedule & Events</h2>

              <div className="grid gap-6">
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {currentChildData.upcomingEvents.map((event) => (
                      <div key={event.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-4 h-4 rounded-full ${
                              event.type === "meeting"
                                ? "bg-purple-500"
                                : event.type === "quiz"
                                  ? "bg-blue-500"
                                  : event.type === "assignment"
                                    ? "bg-orange-500"
                                    : "bg-green-500"
                            }`}
                          ></div>
                          <div>
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-gray-600">
                              {event.date} at {event.time}
                            </p>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={
                            event.type === "meeting"
                              ? "border-purple-200 text-purple-600"
                              : event.type === "quiz"
                                ? "border-blue-200 text-blue-600"
                                : event.type === "assignment"
                                  ? "border-orange-200 text-orange-600"
                                  : "border-green-200 text-green-600"
                          }
                        >
                          {event.type}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle>Weekly Schedule</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-5 gap-4">
                      {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                        <div key={day} className="text-center">
                          <h4 className="font-medium text-gray-900 mb-2">{day}</h4>
                          <div className="space-y-2">
                            <div className="p-2 bg-blue-50 rounded text-xs">
                              <p className="font-medium">Mathematics</p>
                              <p className="text-gray-600">9:00 AM</p>
                            </div>
                            <div className="p-2 bg-green-50 rounded text-xs">
                              <p className="font-medium">English</p>
                              <p className="text-gray-600">10:30 AM</p>
                            </div>
                            <div className="p-2 bg-purple-50 rounded text-xs">
                              <p className="font-medium">Science</p>
                              <p className="text-gray-600">1:00 PM</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "teachers" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Teachers</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Send Message to Teacher</DialogTitle>
                      <DialogDescription>
                        Send a message to your child's teacher about their progress or any concerns.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="teacher">Select Teacher</Label>
                        <Select
                          value={messageForm.teacher}
                          onValueChange={(value) => setMessageForm({ ...messageForm, teacher: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Choose a teacher" />
                          </SelectTrigger>
                          <SelectContent>
                            {teachers.map((teacher) => (
                              <SelectItem key={teacher.id} value={teacher.id}>
                                {teacher.name} - {teacher.subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={messageForm.subject}
                          onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                          placeholder="Message subject"
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={messageForm.message}
                          onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                          placeholder="Type your message here..."
                          rows={4}
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={sendMessage} className="bg-purple-600 hover:bg-purple-700">
                          Send Message
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                {teachers.map((teacher) => (
                  <Card key={teacher.id} className="border-purple-100">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src="/placeholder.svg?height=48&width=48" />
                            <AvatarFallback className="bg-purple-100 text-purple-600">
                              {teacher.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{teacher.name}</h3>
                            <p className="text-sm text-gray-600">{teacher.subject} Teacher</p>
                            <p className="text-sm text-gray-500">{teacher.email}</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Mail className="w-4 h-4 mr-2" />
                            Email
                          </Button>
                          <Button variant="outline" size="sm">
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Notifications</h2>
                <Button variant="outline" size="sm">
                  Mark All as Read
                </Button>
              </div>

              <div className="space-y-4">
                {notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={`border-purple-100 ${!notification.read ? "bg-purple-50" : ""}`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div
                            className={`w-2 h-2 rounded-full mt-2 ${
                              notification.type === "grade"
                                ? "bg-green-500"
                                : notification.type === "assignment"
                                  ? "bg-blue-500"
                                  : "bg-purple-500"
                            }`}
                          ></div>
                          <div>
                            <h4 className="font-medium">{notification.title}</h4>
                            <p className="text-gray-600 mt-1">{notification.message}</p>
                            <p className="text-sm text-gray-500 mt-2">{notification.date}</p>
                          </div>
                        </div>
                        {!notification.read && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                            New
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Profile</h2>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-purple-100">
                  <CardHeader>
                    <CardTitle>Parent Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" />
                        <AvatarFallback className="bg-purple-100 text-purple-600 text-xl">
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
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" value="+1 (555) 123-4567" readOnly />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle>Children</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {children.map((child) => (
                      <div key={child.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={child.photo || "/placeholder.svg"} />
                            <AvatarFallback className="bg-blue-100 text-blue-600">
                              {child.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{child.name}</p>
                            <p className="text-sm text-gray-600">
                              {child.grade} • Class {child.class}
                            </p>
                            <p className="text-sm text-gray-500">ID: {child.studentId}</p>
                          </div>
                        </div>
                        <Button
                          variant={selectedChild === child.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedChild(child.id)}
                        >
                          {selectedChild === child.id ? "Monitoring" : "Switch"}
                        </Button>
                      </div>
                    ))}
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
