"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  BookOpen,
  BarChart3,
  Trophy,
  User,
  Bell,
  Menu,
  X,
  Plus,
  FileText,
  Shield,
  Upload,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  EyeOff,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Mock data for notifications and quiz results
const mockNotifications = [
  {
    id: 1,
    from: "Dr. Smith",
    subject: "New Assignment Posted",
    message: "A new assignment has been posted for Biology 101. Please check your course materials.",
    timestamp: "2024-01-15T10:30:00Z",
    seen: false,
    type: "assignment",
  },
  {
    id: 2,
    from: "Prof. Johnson",
    subject: "Quiz Results Available",
    message: "Your quiz results for Mathematics are now available. Great job on improving your scores!",
    timestamp: "2024-01-14T15:45:00Z",
    seen: false,
    type: "results",
  },
  {
    id: 3,
    from: "Admin",
    subject: "System Maintenance",
    message: "The system will undergo maintenance this weekend. Please save your work.",
    timestamp: "2024-01-13T09:00:00Z",
    seen: true,
    type: "system",
  },
]

const mockQuizResults = [
  {
    id: 1,
    quizName: "Biology Quiz 1",
    score: 85,
    totalQuestions: 20,
    correctAnswers: 17,
    incorrectQuestions: [
      {
        question: "What is photosynthesis?",
        studentAnswer: "Respiration",
        correctAnswer: "Process of making food using sunlight",
      },
      { question: "Name the powerhouse of cell", studentAnswer: "Nucleus", correctAnswer: "Mitochondria" },
      { question: "What is DNA?", studentAnswer: "Protein", correctAnswer: "Deoxyribonucleic acid" },
    ],
    date: "2024-01-10",
  },
  {
    id: 2,
    quizName: "Mathematics Quiz 2",
    score: 92,
    totalQuestions: 15,
    correctAnswers: 14,
    incorrectQuestions: [{ question: "What is 15 × 7?", studentAnswer: "95", correctAnswer: "105" }],
    date: "2024-01-12",
  },
]

export default function StudentPortal() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("notes")
  const [kycCompleted, setKycCompleted] = useState(false)
  const [kycModalOpen, setKycModalOpen] = useState(false)
  const [kycStatus, setKycStatus] = useState("pending") // pending, submitted, approved, rejected
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [idNumber, setIdNumber] = useState("")
  const [fullName, setFullName] = useState("")
  const [address, setAddress] = useState("")

  const [notifications, setNotifications] = useState(mockNotifications)
  const [unreadCount, setUnreadCount] = useState(0)
  const [selectedNotification, setSelectedNotification] = useState<any>(null)
  const [notificationModalOpen, setNotificationModalOpen] = useState(false)

  const [quizResults] = useState(mockQuizResults)
  const [selectedQuizResult, setSelectedQuizResult] = useState<any>(null)
  const [quizResultModalOpen, setQuizResultModalOpen] = useState(false)

  useEffect(() => {
    const unread = notifications.filter((n) => !n.seen).length
    setUnreadCount(unread)
  }, [notifications])

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "notes", label: "Notes", icon: BookOpen },
    { id: "quizzes", label: "Quizzes", icon: FileText },
    { id: "results", label: "Results", icon: BarChart3 },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "profile", label: "Profile", icon: User },
    { id: "kyc", label: "KYC Verification", icon: Shield, disabled: false },
    { id: "notifications", label: "Notifications", icon: Bell },
  ]

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleKycSubmit = () => {
    if (uploadedImage && idNumber && fullName && address) {
      setKycStatus("submitted")
      setKycModalOpen(false)
      // Simulate approval process
      setTimeout(() => {
        setKycStatus("approved")
        setKycCompleted(true)
      }, 3000)
    }
  }

  const markNotificationAsSeen = (notificationId: number) => {
    setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, seen: true } : n)))
  }

  const openNotification = (notification: any) => {
    setSelectedNotification(notification)
    setNotificationModalOpen(true)
    if (!notification.seen) {
      markNotificationAsSeen(notification.id)
    }
  }

  const openQuizResult = (result: any) => {
    setSelectedQuizResult(result)
    setQuizResultModalOpen(true)
  }

  const getKycStatusIcon = () => {
    switch (kycStatus) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "submitted":
        return <Clock className="w-5 h-5 text-blue-500" />
      case "approved":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "rejected":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Shield className="w-5 h-5 text-gray-500" />
    }
  }

  const getKycStatusText = () => {
    switch (kycStatus) {
      case "pending":
        return "Verification Required"
      case "submitted":
        return "Under Review"
      case "approved":
        return "Verified"
      case "rejected":
        return "Verification Failed"
      default:
        return "Not Started"
    }
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      {/* Animated Sidebar */}
      <div
        className={cn(
          "relative bg-gradient-to-b from-green-600 to-green-800 text-white transition-all duration-300 ease-in-out shadow-xl",
          sidebarOpen ? "w-64" : "w-16",
        )}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-green-500/30">
          <div className="flex items-center justify-between">
            <div
              className={cn(
                "flex items-center space-x-2 transition-opacity duration-200",
                sidebarOpen ? "opacity-100" : "opacity-0",
              )}
            >
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg">Safari Academy</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="text-white hover:bg-white/20 transition-all duration-200 hover:scale-110"
            >
              {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
          {sidebarOpen && <div className="mt-2 text-sm text-green-200 animate-fade-in">Student Portal</div>}
        </div>

        {/* Navigation Items */}
        <nav className="p-2 space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            const isDisabled = item.disabled

            return (
              <button
                key={item.id}
                onClick={() => !isDisabled && setActiveTab(item.id)}
                disabled={isDisabled}
                className={cn(
                  "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                  isActive
                    ? "bg-white/20 text-white shadow-lg"
                    : isDisabled
                      ? "text-green-300 cursor-not-allowed opacity-60"
                      : "text-green-100 hover:bg-white/10 hover:text-white hover:translate-x-1",
                  !sidebarOpen && "justify-center",
                )}
              >
                <div className="relative">
                  <Icon
                    className={cn(
                      "w-5 h-5 transition-transform duration-200",
                      isActive && "scale-110",
                      !isDisabled && "group-hover:scale-110",
                    )}
                  />
                  {item.id === "notifications" && unreadCount > 0 && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </div>
                  )}
                </div>
                <span
                  className={cn(
                    "font-medium transition-opacity duration-200",
                    sidebarOpen ? "opacity-100" : "opacity-0",
                  )}
                >
                  {item.label}
                </span>
                {item.id === "kyc" && sidebarOpen && <div className="ml-auto">{getKycStatusIcon()}</div>}

                {/* Tooltip for collapsed sidebar */}
                {!sidebarOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                    {item.id === "kyc" && ` (${getKycStatusText()})`}
                    {item.id === "notifications" && unreadCount > 0 && ` (${unreadCount} unread)`}
                  </div>
                )}
              </button>
            )
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 capitalize">
                {activeTab === "kyc" ? "KYC Verification" : `My ${activeTab}`}
              </h1>
              <p className="text-gray-600 mt-1">
                {activeTab === "notes" && "Access and manage your study notes"}
                {activeTab === "dashboard" && "Overview of your academic progress"}
                {activeTab === "quizzes" && "Take quizzes and practice tests"}
                {activeTab === "results" && "View your quiz and exam results"}
                {activeTab === "leaderboard" && "See how you rank among peers"}
                {activeTab === "profile" && "Manage your account settings"}
                {activeTab === "kyc" && "Complete your identity verification"}
                {activeTab === "notifications" && "Stay updated with important alerts"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                Student
              </Badge>
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {activeTab === "notes" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Input placeholder="Search notes..." className="w-64" />
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      All Notes
                    </Button>
                    <Button variant="outline" size="sm">
                      My Notes
                    </Button>
                    <Button variant="outline" size="sm">
                      Class Notes
                    </Button>
                  </div>
                </div>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Note
                </Button>
              </div>

              <Card className="border-dashed border-2 border-gray-300">
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No notes found</h3>
                  <p className="text-gray-600 mb-4">Start by creating your first note</p>
                  <Button className="bg-green-600 hover:bg-green-700">Create Note</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Recent Notifications</h2>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  {unreadCount} unread
                </Badge>
              </div>

              <div className="space-y-3">
                {notifications.map((notification) => (
                  <Card
                    key={notification.id}
                    className={cn(
                      "cursor-pointer transition-all hover:shadow-md",
                      !notification.seen && "border-green-200 bg-green-50",
                    )}
                    onClick={() => openNotification(notification)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-gray-900">{notification.subject}</h4>
                            {!notification.seen && <div className="w-2 h-2 bg-green-500 rounded-full"></div>}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">From: {notification.from}</p>
                          <p className="text-sm text-gray-700 line-clamp-2">{notification.message}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          {notification.seen ? (
                            <Eye className="w-4 h-4 text-gray-400" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-green-500" />
                          )}
                          <span className="text-xs text-gray-500">
                            {new Date(notification.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "results" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Quiz Results</h2>
                <Badge variant="outline" className="bg-green-50 text-green-700">
                  Average: 88.5%
                </Badge>
              </div>

              <div className="grid gap-4">
                {quizResults.map((result) => (
                  <Card key={result.id} className="cursor-pointer hover:shadow-md transition-all">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{result.quizName}</h3>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Score: {result.score}%</span>
                            <span>
                              Correct: {result.correctAnswers}/{result.totalQuestions}
                            </span>
                            <span>Date: {result.date}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div
                            className={cn(
                              "text-2xl font-bold",
                              result.score >= 90
                                ? "text-green-600"
                                : result.score >= 80
                                  ? "text-yellow-600"
                                  : "text-red-600",
                            )}
                          >
                            {result.score}%
                          </div>
                          <Button variant="outline" size="sm" onClick={() => openQuizResult(result)}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "kyc" && (
            <div className="max-w-2xl mx-auto space-y-6">
              <Card
                className={cn(
                  "border-2",
                  kycStatus === "pending" && "border-yellow-200 bg-yellow-50",
                  kycStatus === "submitted" && "border-blue-200 bg-blue-50",
                  kycStatus === "approved" && "border-green-200 bg-green-50",
                  kycStatus === "rejected" && "border-red-200 bg-red-50",
                )}
              >
                <CardHeader>
                  <CardTitle
                    className={cn(
                      "flex items-center space-x-2",
                      kycStatus === "pending" && "text-yellow-800",
                      kycStatus === "submitted" && "text-blue-800",
                      kycStatus === "approved" && "text-green-800",
                      kycStatus === "rejected" && "text-red-800",
                    )}
                  >
                    {getKycStatusIcon()}
                    <span>KYC {getKycStatusText()}</span>
                  </CardTitle>
                  <CardDescription
                    className={cn(
                      kycStatus === "pending" && "text-yellow-700",
                      kycStatus === "submitted" && "text-blue-700",
                      kycStatus === "approved" && "text-green-700",
                      kycStatus === "rejected" && "text-red-700",
                    )}
                  >
                    {kycStatus === "pending" && "Complete your identity verification to access all platform features"}
                    {kycStatus === "submitted" && "Your documents are being reviewed by our team"}
                    {kycStatus === "approved" && "Your identity has been successfully verified"}
                    {kycStatus === "rejected" &&
                      "Your verification was rejected. Please resubmit with correct documents"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg border">
                      <FileText className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <h4 className="font-medium">Personal Info</h4>
                      <p className="text-sm text-gray-600">Basic details</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border">
                      <User className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <h4 className="font-medium">Identity Proof</h4>
                      <p className="text-sm text-gray-600">Upload documents</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border">
                      <Shield className="w-8 h-8 mx-auto mb-2 text-green-600" />
                      <h4 className="font-medium">Verification</h4>
                      <p className="text-sm text-gray-600">Final review</p>
                    </div>
                  </div>

                  {kycStatus === "approved" ? (
                    <div className="bg-green-100 p-6 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <h4 className="font-medium text-green-800">Verification Complete</h4>
                      </div>
                      <p className="text-green-700">
                        Your identity has been successfully verified. You now have full access to all platform features.
                      </p>
                    </div>
                  ) : (
                    <Dialog open={kycModalOpen} onOpenChange={setKycModalOpen}>
                      <DialogTrigger asChild>
                        <Button
                          className={cn(
                            "w-full",
                            kycStatus === "pending" && "bg-green-600 hover:bg-green-700",
                            kycStatus === "submitted" && "bg-blue-600 hover:bg-blue-700",
                            kycStatus === "rejected" && "bg-red-600 hover:bg-red-700",
                          )}
                          disabled={kycStatus === "submitted"}
                        >
                          {kycStatus === "pending" && (
                            <>
                              <Shield className="w-4 h-4 mr-2" />
                              Start KYC Verification
                            </>
                          )}
                          {kycStatus === "submitted" && (
                            <>
                              <Clock className="w-4 h-4 mr-2" />
                              Under Review
                            </>
                          )}
                          {kycStatus === "rejected" && (
                            <>
                              <Upload className="w-4 h-4 mr-2" />
                              Resubmit Documents
                            </>
                          )}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>KYC Verification</DialogTitle>
                          <DialogDescription>
                            Please provide your personal information and upload a clear photo of your government-issued
                            ID
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="fullName">Full Name (as on ID)</Label>
                              <Input
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="Enter your full name"
                              />
                            </div>
                            <div>
                              <Label htmlFor="idNumber">ID Number</Label>
                              <Input
                                id="idNumber"
                                value={idNumber}
                                onChange={(e) => setIdNumber(e.target.value)}
                                placeholder="Enter your ID number"
                              />
                            </div>
                            <div>
                              <Label htmlFor="address">Address</Label>
                              <Textarea
                                id="address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="Enter your full address"
                                rows={3}
                              />
                            </div>
                          </div>

                          <div className="space-y-4">
                            <Label>Upload ID Document</Label>
                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 relative">
                              {uploadedImage ? (
                                <div className="space-y-4">
                                  <img
                                    src={uploadedImage || "/placeholder.svg"}
                                    alt="Uploaded ID"
                                    className="max-w-full h-48 object-contain mx-auto rounded-lg"
                                  />
                                  <div className="flex justify-center">
                                    <Button variant="outline" onClick={() => setUploadedImage(null)}>
                                      Remove Image
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <div className="text-center">
                                  <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                                  <div className="space-y-2">
                                    <p className="text-sm text-gray-600">
                                      Click to upload or drag and drop your ID document
                                    </p>
                                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                                    <Button
                                      variant="outline"
                                      className="mt-2 bg-transparent"
                                      onClick={() => document.getElementById("file-upload")?.click()}
                                    >
                                      Choose File
                                    </Button>
                                  </div>
                                  <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                  />
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="bg-blue-50 p-4 rounded-lg">
                            <h4 className="font-medium text-blue-800 mb-2">Requirements:</h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                              <li>• Clear, high-quality photo of your government-issued ID</li>
                              <li>• All text must be clearly readable</li>
                              <li>• ID must be valid and not expired</li>
                              <li>• Name on ID must match the name provided above</li>
                            </ul>
                          </div>

                          <Button
                            onClick={handleKycSubmit}
                            disabled={!uploadedImage || !idNumber || !fullName || !address}
                            className="w-full bg-green-600 hover:bg-green-700"
                          >
                            Submit for Verification
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Study Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">75%</div>
                  <p className="text-gray-600">Course completion</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quiz Average</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">87%</div>
                  <p className="text-gray-600">Last 5 quizzes</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Rank</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">#12</div>
                  <p className="text-gray-600">Out of 150 students</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Placeholder content for other tabs */}
          {!["notes", "kyc", "dashboard", "notifications", "results"].includes(activeTab) && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  {(() => {
                    const currentItem = navigationItems.find((item) => item.id === activeTab)
                    if (currentItem?.icon) {
                      const IconComponent = currentItem.icon
                      return <IconComponent className="w-8 h-8 text-gray-400" />
                    }
                    return null
                  })()}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">{activeTab} Coming Soon</h3>
                <p className="text-gray-600 text-center">This feature is under development</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Dialog open={notificationModalOpen} onOpenChange={setNotificationModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedNotification?.subject}</DialogTitle>
            <DialogDescription>
              From: {selectedNotification?.from} •{" "}
              {selectedNotification && new Date(selectedNotification.timestamp).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-800">{selectedNotification?.message}</p>
            </div>
            <div className="flex items-center justify-between">
              <Badge
                variant={
                  selectedNotification?.type === "assignment"
                    ? "default"
                    : selectedNotification?.type === "results"
                      ? "secondary"
                      : "outline"
                }
              >
                {selectedNotification?.type}
              </Badge>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Eye className="w-4 h-4" />
                <span>Marked as read</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={quizResultModalOpen} onOpenChange={setQuizResultModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedQuizResult?.quizName} - Detailed Results</DialogTitle>
            <DialogDescription>
              Score: {selectedQuizResult?.score}% • {selectedQuizResult?.correctAnswers}/
              {selectedQuizResult?.totalQuestions} correct • {selectedQuizResult?.date}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedQuizResult?.score}%</div>
                  <p className="text-sm text-gray-600">Overall Score</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{selectedQuizResult?.correctAnswers}</div>
                  <p className="text-sm text-gray-600">Correct Answers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-red-600">
                    {selectedQuizResult?.incorrectQuestions?.length || 0}
                  </div>
                  <p className="text-sm text-gray-600">Incorrect Answers</p>
                </CardContent>
              </Card>
            </div>

            {selectedQuizResult?.incorrectQuestions && selectedQuizResult.incorrectQuestions.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-4 text-red-600">Questions to Review</h3>
                <div className="space-y-4">
                  {selectedQuizResult.incorrectQuestions.map((question: any, index: number) => (
                    <Card key={index} className="border-red-200">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{question.question}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-red-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-red-800 mb-1">Your Answer:</p>
                            <p className="text-red-700">{question.studentAnswer}</p>
                          </div>
                          <div className="bg-green-50 p-3 rounded-lg">
                            <p className="text-sm font-medium text-green-800 mb-1">Correct Answer:</p>
                            <p className="text-green-700">{question.correctAnswer}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
