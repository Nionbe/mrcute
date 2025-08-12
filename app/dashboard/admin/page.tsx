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
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  BarChart3,
  Users,
  Settings,
  Shield,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Search,
  Filter,
  Bell,
  Calendar,
  TrendingUp,
  TrendingDown,
  Activity,
  School,
  GraduationCap,
  LogOut,
  Menu,
  X,
  UserPlus,
  FileText,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function AdminDashboard() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedUserType, setSelectedUserType] = useState("all")

  // Form states
  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    grade: "",
    subject: "",
    phone: "",
  })

  const [classForm, setClassForm] = useState({
    name: "",
    grade: "",
    teacher: "",
    capacity: "",
    subject: "",
  })

  const [announcementForm, setAnnouncementForm] = useState({
    title: "",
    message: "",
    audience: "",
    priority: "",
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

  const createUser = () => {
    console.log("Creating user:", userForm)
    setUserForm({
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      grade: "",
      subject: "",
      phone: "",
    })
    alert("User created successfully!")
  }

  const createClass = () => {
    console.log("Creating class:", classForm)
    setClassForm({
      name: "",
      grade: "",
      teacher: "",
      capacity: "",
      subject: "",
    })
    alert("Class created successfully!")
  }

  const sendAnnouncement = () => {
    console.log("Sending announcement:", announcementForm)
    setAnnouncementForm({
      title: "",
      message: "",
      audience: "",
      priority: "",
    })
    alert("Announcement sent successfully!")
  }

  // Mock data
  const schoolStats = {
    totalStudents: 1247,
    totalTeachers: 89,
    totalParents: 1156,
    totalClasses: 42,
    averageAttendance: 94,
    averageGrade: 87,
    activeUsers: 1523,
    systemUptime: 99.8,
  }

  const users = [
    {
      id: "1",
      name: "Emma Johnson",
      email: "emma.j@school.edu",
      role: "student",
      grade: "Grade 10",
      class: "10-A",
      status: "active",
      lastLogin: "2024-01-12",
    },
    {
      id: "2",
      name: "Sarah Wilson",
      email: "s.wilson@school.edu",
      role: "teacher",
      subject: "Mathematics",
      classes: 3,
      status: "active",
      lastLogin: "2024-01-12",
    },
    {
      id: "3",
      name: "Michael Johnson",
      email: "m.johnson@parent.com",
      role: "parent",
      children: 2,
      status: "active",
      lastLogin: "2024-01-11",
    },
    {
      id: "4",
      name: "David Chen",
      email: "david.c@school.edu",
      role: "student",
      grade: "Grade 11",
      class: "11-B",
      status: "inactive",
      lastLogin: "2024-01-08",
    },
  ]

  const classes = [
    {
      id: "1",
      name: "Mathematics 10-A",
      grade: "Grade 10",
      teacher: "Sarah Wilson",
      students: 28,
      capacity: 30,
      subject: "Mathematics",
      schedule: "Mon, Wed, Fri - 9:00 AM",
    },
    {
      id: "2",
      name: "English 10-A",
      grade: "Grade 10",
      teacher: "John Davis",
      students: 26,
      capacity: 30,
      subject: "English",
      schedule: "Tue, Thu - 10:30 AM",
    },
    {
      id: "3",
      name: "Science 11-B",
      grade: "Grade 11",
      teacher: "Maria Garcia",
      students: 22,
      capacity: 25,
      subject: "Science",
      schedule: "Mon, Wed, Fri - 1:00 PM",
    },
  ]

  const recentActivity = [
    {
      id: "1",
      action: "New student enrolled",
      user: "Emma Johnson",
      timestamp: "2 hours ago",
      type: "enrollment",
    },
    {
      id: "2",
      action: "Grade updated",
      user: "Sarah Wilson",
      timestamp: "4 hours ago",
      type: "grade",
    },
    {
      id: "3",
      action: "Assignment created",
      user: "John Davis",
      timestamp: "6 hours ago",
      type: "assignment",
    },
    {
      id: "4",
      action: "Parent message sent",
      user: "Michael Johnson",
      timestamp: "8 hours ago",
      type: "message",
    },
  ]

  const systemAlerts = [
    {
      id: "1",
      title: "Server Maintenance Scheduled",
      message: "System maintenance scheduled for this weekend",
      type: "info",
      timestamp: "1 hour ago",
    },
    {
      id: "2",
      title: "Low Storage Warning",
      message: "Server storage is 85% full",
      type: "warning",
      timestamp: "3 hours ago",
    },
    {
      id: "3",
      title: "Backup Completed",
      message: "Daily backup completed successfully",
      type: "success",
      timestamp: "12 hours ago",
    },
  ]

  const performanceData = [
    { subject: "Mathematics", avgGrade: 87, trend: "up", students: 245 },
    { subject: "English", avgGrade: 84, trend: "stable", students: 238 },
    { subject: "Science", avgGrade: 89, trend: "up", students: 221 },
    { subject: "History", avgGrade: 82, trend: "down", students: 198 },
    { subject: "Art", avgGrade: 91, trend: "up", students: 156 },
  ]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedUserType === "all" || user.role === selectedUserType
    return matchesSearch && matchesType
  })

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
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
        <div className="p-6 border-b border-orange-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-600 to-red-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
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
              <AvatarFallback className="bg-orange-100 text-orange-600">
                {user.firstName?.[0]}
                {user.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-500">Administrator</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {[
              { id: "overview", label: "Overview", icon: BarChart3 },
              { id: "users", label: "User Management", icon: Users },
              { id: "classes", label: "Class Management", icon: School },
              { id: "reports", label: "Reports & Analytics", icon: FileText },
              { id: "announcements", label: "Announcements", icon: Bell },
              { id: "system", label: "System Health", icon: Activity },
              { id: "settings", label: "Settings", icon: Settings },
              { id: "profile", label: "Profile", icon: Shield },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === item.id ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:bg-gray-100"
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
        <header className="bg-white shadow-sm border-b border-orange-100 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="border-green-200 text-green-600">
                System Online
              </Badge>
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Alerts
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
              <Card className="border-orange-100 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl">Welcome back, {user.firstName}!</CardTitle>
                  <CardDescription className="text-orange-100">Safari Academy School Management System</CardDescription>
                </CardHeader>
              </Card>

              {/* School Stats */}
              <div className="grid md:grid-cols-4 gap-6">
                <Card className="border-orange-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">{schoolStats.totalStudents}</div>
                    <div className="flex items-center text-sm text-green-600 mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +5.2% from last month
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-blue-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Teachers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{schoolStats.totalTeachers}</div>
                    <div className="flex items-center text-sm text-green-600 mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +2.1% from last month
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-green-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Average Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{schoolStats.averageAttendance}%</div>
                    <div className="flex items-center text-sm text-red-600 mt-1">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      -1.3% from last month
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-purple-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Average Grade</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">{schoolStats.averageGrade}%</div>
                    <div className="flex items-center text-sm text-green-600 mt-1">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      +3.7% from last month
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity & System Alerts */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-orange-100">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            activity.type === "enrollment"
                              ? "bg-green-500"
                              : activity.type === "grade"
                                ? "bg-blue-500"
                                : activity.type === "assignment"
                                  ? "bg-purple-500"
                                  : "bg-orange-500"
                          }`}
                        ></div>
                        <div className="flex-1">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-sm text-gray-600">by {activity.user}</p>
                        </div>
                        <span className="text-sm text-gray-500">{activity.timestamp}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-red-100">
                  <CardHeader>
                    <CardTitle>System Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {systemAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        {alert.type === "warning" && <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />}
                        {alert.type === "success" && <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />}
                        {alert.type === "info" && <Activity className="w-5 h-5 text-blue-500 mt-0.5" />}
                        <div className="flex-1">
                          <p className="font-medium">{alert.title}</p>
                          <p className="text-sm text-gray-600">{alert.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Performance Overview */}
              <Card className="border-orange-100">
                <CardHeader>
                  <CardTitle>Academic Performance Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceData.map((subject, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h4 className="font-medium">{subject.subject}</h4>
                            <p className="text-sm text-gray-600">{subject.students} students</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <div className="text-lg font-bold text-orange-600">{subject.avgGrade}%</div>
                            <Progress value={subject.avgGrade} className="w-24 h-2 mt-1" />
                          </div>
                          {subject.trend === "up" && <TrendingUp className="w-5 h-5 text-green-500" />}
                          {subject.trend === "down" && <TrendingUp className="w-5 h-5 text-red-500 rotate-180" />}
                          {subject.trend === "stable" && <div className="w-5 h-5 bg-gray-300 rounded-full"></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "users" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">User Management</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-orange-600 hover:bg-orange-700">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription>Create a new user account for the school system.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={userForm.firstName}
                            onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={userForm.lastName}
                            onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={userForm.email}
                          onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="role">Role</Label>
                          <Select
                            value={userForm.role}
                            onValueChange={(value) => setUserForm({ ...userForm, role: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="teacher">Teacher</SelectItem>
                              <SelectItem value="parent">Parent</SelectItem>
                              <SelectItem value="admin">Administrator</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={userForm.phone}
                            onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                          />
                        </div>
                      </div>
                      {userForm.role === "student" && (
                        <div>
                          <Label htmlFor="grade">Grade</Label>
                          <Select
                            value={userForm.grade}
                            onValueChange={(value) => setUserForm({ ...userForm, grade: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => (
                                <SelectItem key={i + 1} value={`Grade ${i + 1}`}>
                                  Grade {i + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                      {userForm.role === "teacher" && (
                        <div>
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            value={userForm.subject}
                            onChange={(e) => setUserForm({ ...userForm, subject: e.target.value })}
                            placeholder="e.g., Mathematics"
                          />
                        </div>
                      )}
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={createUser} className="bg-orange-600 hover:bg-orange-700">
                          Create User
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Search and Filter */}
              <div className="flex items-center space-x-4">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedUserType} onValueChange={setSelectedUserType}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="student">Students</SelectItem>
                    <SelectItem value="teacher">Teachers</SelectItem>
                    <SelectItem value="parent">Parents</SelectItem>
                    <SelectItem value="admin">Administrators</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>

              {/* Users Table */}
              <Card className="border-orange-100">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                <AvatarFallback className="bg-orange-100 text-orange-600 text-sm">
                                  {user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                user.role === "student"
                                  ? "border-blue-200 text-blue-600"
                                  : user.role === "teacher"
                                    ? "border-green-200 text-green-600"
                                    : user.role === "parent"
                                      ? "border-purple-200 text-purple-600"
                                      : "border-orange-200 text-orange-600"
                              }
                            >
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {user.role === "student" && (
                              <div>
                                <p className="text-sm">{user.grade}</p>
                                <p className="text-xs text-gray-500">Class {user.class}</p>
                              </div>
                            )}
                            {user.role === "teacher" && (
                              <div>
                                <p className="text-sm">{user.subject}</p>
                                <p className="text-xs text-gray-500">{user.classes} classes</p>
                              </div>
                            )}
                            {user.role === "parent" && (
                              <div>
                                <p className="text-sm">{user.children} children</p>
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                          </TableCell>
                          <TableCell className="text-sm text-gray-600">{user.lastLogin}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700 bg-transparent"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "classes" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Class Management</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Class
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create New Class</DialogTitle>
                      <DialogDescription>Set up a new class with teacher assignment and capacity.</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="className">Class Name</Label>
                          <Input
                            id="className"
                            value={classForm.name}
                            onChange={(e) => setClassForm({ ...classForm, name: e.target.value })}
                            placeholder="e.g., Mathematics 10-A"
                          />
                        </div>
                        <div>
                          <Label htmlFor="classGrade">Grade</Label>
                          <Select
                            value={classForm.grade}
                            onValueChange={(value) => setClassForm({ ...classForm, grade: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select grade" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 12 }, (_, i) => (
                                <SelectItem key={i + 1} value={`Grade ${i + 1}`}>
                                  Grade {i + 1}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="subject">Subject</Label>
                          <Input
                            id="subject"
                            value={classForm.subject}
                            onChange={(e) => setClassForm({ ...classForm, subject: e.target.value })}
                            placeholder="e.g., Mathematics"
                          />
                        </div>
                        <div>
                          <Label htmlFor="capacity">Capacity</Label>
                          <Input
                            id="capacity"
                            type="number"
                            value={classForm.capacity}
                            onChange={(e) => setClassForm({ ...classForm, capacity: e.target.value })}
                            placeholder="30"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="teacher">Assign Teacher</Label>
                        <Select
                          value={classForm.teacher}
                          onValueChange={(value) => setClassForm({ ...classForm, teacher: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select teacher" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sarah-wilson">Sarah Wilson - Mathematics</SelectItem>
                            <SelectItem value="john-davis">John Davis - English</SelectItem>
                            <SelectItem value="maria-garcia">Maria Garcia - Science</SelectItem>
                            <SelectItem value="robert-brown">Robert Brown - History</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Cancel</Button>
                        <Button onClick={createClass} className="bg-blue-600 hover:bg-blue-700">
                          Create Class
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-6">
                {classes.map((cls) => (
                  <Card key={cls.id} className="border-blue-100">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{cls.name}</CardTitle>
                          <CardDescription>
                            {cls.grade} • {cls.subject} • {cls.schedule}
                          </CardDescription>
                        </div>
                        <Badge variant="outline" className="border-blue-200 text-blue-600">
                          {cls.subject}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {cls.students}/{cls.capacity}
                          </div>
                          <p className="text-sm text-gray-600">Students</p>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-medium text-green-600">{cls.teacher}</div>
                          <p className="text-sm text-gray-600">Teacher</p>
                        </div>
                        <div className="text-center">
                          <Progress value={(cls.students / cls.capacity) * 100} className="mt-2" />
                          <p className="text-sm text-gray-600 mt-1">Capacity</p>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">
                            {Math.round((cls.students / cls.capacity) * 100)}%
                          </div>
                          <p className="text-sm text-gray-600">Full</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-2" />
                          View Students
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Class
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          Schedule
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Reports & Analytics</h2>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export All
                  </Button>
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Date Range
                  </Button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-orange-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Total Enrollment</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600">1,247</div>
                    <Progress value={85} className="mt-2" />
                    <p className="text-xs text-gray-500 mt-1">85% of capacity</p>
                  </CardContent>
                </Card>
                <Card className="border-green-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Graduation Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">96%</div>
                    <Progress value={96} className="mt-2" />
                    <p className="text-xs text-gray-500 mt-1">Above national average</p>
                  </CardContent>
                </Card>
                <Card className="border-blue-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Teacher Retention</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">92%</div>
                    <Progress value={92} className="mt-2" />
                    <p className="text-xs text-gray-500 mt-1">Excellent retention</p>
                  </CardContent>
                </Card>
                <Card className="border-purple-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Parent Satisfaction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">4.8/5</div>
                    <Progress value={96} className="mt-2" />
                    <p className="text-xs text-gray-500 mt-1">Based on 856 reviews</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-orange-100">
                  <CardHeader>
                    <CardTitle>Academic Performance by Subject</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {performanceData.map((subject, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{subject.subject}</p>
                            <p className="text-sm text-gray-600">{subject.students} students</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-right">
                              <div className="font-bold text-orange-600">{subject.avgGrade}%</div>
                              <Progress value={subject.avgGrade} className="w-20 h-2" />
                            </div>
                            {subject.trend === "up" && <TrendingUp className="w-4 h-4 text-green-500" />}
                            {subject.trend === "down" && <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle>Attendance Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600">94.2%</div>
                        <p className="text-gray-600">Overall Attendance Rate</p>
                      </div>
                      <div className="space-y-3">
                        {["Grade 9", "Grade 10", "Grade 11", "Grade 12"].map((grade, index) => (
                          <div key={grade} className="flex items-center justify-between">
                            <span className="font-medium">{grade}</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={95 - index} className="w-24 h-2" />
                              <span className="text-sm font-medium">{95 - index}%</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "announcements" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">School Announcements</h2>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="w-4 h-4 mr-2" />
                      New Announcement
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Announcement</DialogTitle>
                      <DialogDescription>
                        Send an announcement to students, teachers, parents, or all users.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                          id="title"
                          value={announcementForm.title}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                          placeholder="Announcement title"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="audience">Audience</Label>
                          <Select
                            value={announcementForm.audience}
                            onValueChange={(value) => setAnnouncementForm({ ...announcementForm, audience: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select audience" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Users</SelectItem>
                              <SelectItem value="students">Students Only</SelectItem>
                              <SelectItem value="teachers">Teachers Only</SelectItem>
                              <SelectItem value="parents">Parents Only</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="priority">Priority</Label>
                          <Select
                            value={announcementForm.priority}
                            onValueChange={(value) => setAnnouncementForm({ ...announcementForm, priority: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="normal">Normal</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="urgent">Urgent</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={announcementForm.message}
                          onChange={(e) => setAnnouncementForm({ ...announcementForm, message: e.target.value })}
                          placeholder="Type your announcement here..."
                          rows={4}
                        />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Save Draft</Button>
                        <Button onClick={sendAnnouncement} className="bg-purple-600 hover:bg-purple-700">
                          Send Announcement
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid gap-4">
                <Card className="border-red-100 bg-red-50">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg text-red-800">Emergency Drill Scheduled</CardTitle>
                        <CardDescription className="text-red-600">
                          Sent to All Users • High Priority • 2 hours ago
                        </CardDescription>
                      </div>
                      <Badge variant="destructive">Urgent</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-red-700">
                      Fire drill scheduled for tomorrow at 10:00 AM. All students and staff must participate. Please
                      review emergency procedures with your classes.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-blue-100">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">Parent-Teacher Conferences</CardTitle>
                        <CardDescription>Sent to Parents • Normal Priority • 1 day ago</CardDescription>
                      </div>
                      <Badge variant="outline">Normal</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Parent-teacher conferences are scheduled for next week. Please sign up for your preferred time
                      slot through the parent portal.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-green-100">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">Science Fair Winners</CardTitle>
                        <CardDescription>Sent to All Users • Normal Priority • 3 days ago</CardDescription>
                      </div>
                      <Badge variant="outline">Normal</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Congratulations to all participants in this year's science fair! Winners will be announced at
                      tomorrow's assembly.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "system" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">System Health</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-green-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">System Uptime</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{schoolStats.systemUptime}%</div>
                    <p className="text-xs text-gray-500 mt-1">Last 30 days</p>
                  </CardContent>
                </Card>
                <Card className="border-blue-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-blue-600">{schoolStats.activeUsers}</div>
                    <p className="text-xs text-gray-500 mt-1">Currently online</p>
                  </CardContent>
                </Card>
                <Card className="border-yellow-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Storage Used</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-yellow-600">85%</div>
                    <Progress value={85} className="mt-2" />
                    <p className="text-xs text-gray-500 mt-1">2.1TB of 2.5TB</p>
                  </CardContent>
                </Card>
                <Card className="border-purple-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-600">Database Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-purple-600">Good</div>
                    <p className="text-xs text-gray-500 mt-1">All systems operational</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-orange-100">
                  <CardHeader>
                    <CardTitle>System Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {systemAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                        {alert.type === "warning" && <AlertCircle className="w-5 h-5 text-yellow-500 mt-0.5" />}
                        {alert.type === "success" && <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />}
                        {alert.type === "info" && <Activity className="w-5 h-5 text-blue-500 mt-0.5" />}
                        <div className="flex-1">
                          <p className="font-medium">{alert.title}</p>
                          <p className="text-sm text-gray-600">{alert.message}</p>
                          <p className="text-xs text-gray-500 mt-1">{alert.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-blue-100">
                  <CardHeader>
                    <CardTitle>System Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download System Logs
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Run System Backup
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Activity className="w-4 h-4 mr-2" />
                      System Health Check
                    </Button>
                    <Button className="w-full justify-start bg-transparent" variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Database Maintenance
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">System Settings</h2>

              <Tabs defaultValue="general" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="academic">Academic</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-4">
                  <Card className="border-orange-100">
                    <CardHeader>
                      <CardTitle>School Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="schoolName">School Name</Label>
                          <Input id="schoolName" value="Safari Academy" />
                        </div>
                        <div>
                          <Label htmlFor="schoolCode">School Code</Label>
                          <Input id="schoolCode" value="SA2024" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Textarea id="address" value="123 Education Street, Learning City, LC 12345" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" value="+1 (555) 123-4567" />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" value="info@safariacademy.edu" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="academic" className="space-y-4">
                  <Card className="border-blue-100">
                    <CardHeader>
                      <CardTitle>Academic Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="academicYear">Academic Year</Label>
                          <Select defaultValue="2023-2024">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="2023-2024">2023-2024</SelectItem>
                              <SelectItem value="2024-2025">2024-2025</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="gradingScale">Grading Scale</Label>
                          <Select defaultValue="percentage">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="percentage">Percentage (0-100)</SelectItem>
                              <SelectItem value="letter">Letter Grades (A-F)</SelectItem>
                              <SelectItem value="gpa">GPA Scale (0-4.0)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="termSystem">Term System</Label>
                          <Select defaultValue="semester">
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="semester">Semester</SelectItem>
                              <SelectItem value="quarter">Quarter</SelectItem>
                              <SelectItem value="trimester">Trimester</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="attendanceThreshold">Attendance Threshold</Label>
                          <Input id="attendanceThreshold" value="75%" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="notifications" className="space-y-4">
                  <Card className="border-green-100">
                    <CardHeader>
                      <CardTitle>Notification Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="emailNotifications">Email Notifications</Label>
                          <input type="checkbox" id="emailNotifications" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="smsNotifications">SMS Notifications</Label>
                          <input type="checkbox" id="smsNotifications" className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="pushNotifications">Push Notifications</Label>
                          <input type="checkbox" id="pushNotifications" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="parentNotifications">Auto-notify Parents</Label>
                          <input type="checkbox" id="parentNotifications" defaultChecked className="rounded" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security" className="space-y-4">
                  <Card className="border-red-100">
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="twoFactor">Two-Factor Authentication</Label>
                          <input type="checkbox" id="twoFactor" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sessionTimeout">Auto Logout (minutes)</Label>
                          <Input id="sessionTimeout" value="30" className="w-20" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="passwordPolicy">Strong Password Policy</Label>
                          <input type="checkbox" id="passwordPolicy" defaultChecked className="rounded" />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="auditLogs">Audit Logging</Label>
                          <input type="checkbox" id="auditLogs" defaultChecked className="rounded" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex justify-end">
                <Button className="bg-orange-600 hover:bg-orange-700">Save Settings</Button>
              </div>
            </div>
          )}

          {activeTab === "profile" && (
            <div className="space-y-6">
              <h2 className="text-xl font-bold">Administrator Profile</h2>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-orange-100">
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src="/placeholder.svg?height=80&width=80" />
                        <AvatarFallback className="bg-orange-100 text-orange-600 text-xl">
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
                        <Input id="firstName" value={user.firstName} />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" value={user.lastName} />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" value={user.email} />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" value="+1 (555) 987-6543" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-100">
                  <CardHeader>
                    <CardTitle>Administrative Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Role</Label>
                      <Input value="System Administrator" readOnly />
                    </div>
                    <div>
                      <Label>Employee ID</Label>
                      <Input value="ADM2024001" readOnly />
                    </div>
                    <div>
                      <Label>Department</Label>
                      <Input value="Administration" readOnly />
                    </div>
                    <div>
                      <Label>Access Level</Label>
                      <Input value="Full System Access" readOnly />
                    </div>
                    <div>
                      <Label>Join Date</Label>
                      <Input value="January 1, 2020" readOnly />
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
