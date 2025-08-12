"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  BarChart3,
  Trophy,
  User,
  Bell,
  Menu,
  X,
  Plus,
  Search,
  FileText,
  Shield,
  AlertCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function StudentPortal() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("notes")
  const [kycCompleted, setKycCompleted] = useState(false)

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "notes", label: "Notes", icon: BookOpen },
    { id: "quizzes", label: "Quizzes", icon: FileText },
    { id: "results", label: "Results", icon: BarChart3 },
    { id: "leaderboard", label: "Leaderboard", icon: Trophy },
    { id: "profile", label: "Profile", icon: User },
    { id: "kyc", label: "KYC Verification", icon: Shield, disabled: !kycCompleted },
    { id: "notifications", label: "Notifications", icon: Bell },
  ]

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Animated Sidebar */}
      <div
        className={cn(
          "relative bg-gradient-to-b from-blue-600 to-blue-800 text-white transition-all duration-300 ease-in-out shadow-xl",
          sidebarOpen ? "w-64" : "w-16",
        )}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-blue-500/30">
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
          {sidebarOpen && <div className="mt-2 text-sm text-blue-200 animate-fade-in">Student Portal</div>}
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
                      ? "text-blue-300 cursor-not-allowed opacity-60"
                      : "text-blue-100 hover:bg-white/10 hover:text-white hover:translate-x-1",
                  !sidebarOpen && "justify-center",
                )}
              >
                <Icon
                  className={cn(
                    "w-5 h-5 transition-transform duration-200",
                    isActive && "scale-110",
                    !isDisabled && "group-hover:scale-110",
                  )}
                />
                <span
                  className={cn(
                    "font-medium transition-opacity duration-200",
                    sidebarOpen ? "opacity-100" : "opacity-0",
                  )}
                >
                  {item.label}
                </span>
                {isDisabled && sidebarOpen && <AlertCircle className="w-4 h-4 ml-auto text-yellow-400" />}

                {/* Tooltip for collapsed sidebar */}
                {!sidebarOpen && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                    {isDisabled && " (Complete KYC)"}
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
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
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
                  <Input placeholder="Search notes..." className="w-64" icon={<Search className="w-4 h-4" />} />
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

          {activeTab === "kyc" && (
            <div className="max-w-2xl mx-auto space-y-6">
              <Card className="border-yellow-200 bg-yellow-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-yellow-800">
                    <Shield className="w-5 h-5" />
                    <span>KYC Verification Required</span>
                  </CardTitle>
                  <CardDescription className="text-yellow-700">
                    Complete your identity verification to access all platform features
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg border">
                      <FileText className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <h4 className="font-medium">Personal Info</h4>
                      <p className="text-sm text-gray-600">Basic details</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border">
                      <User className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <h4 className="font-medium">Identity Proof</h4>
                      <p className="text-sm text-gray-600">Upload documents</p>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg border">
                      <Shield className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <h4 className="font-medium">Verification</h4>
                      <p className="text-sm text-gray-600">Final review</p>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-lg border">
                    <h4 className="font-medium mb-4">Required Documents</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Government-issued photo ID (passport, driver's license, or national ID)</li>
                      <li>• Proof of address (utility bill or bank statement, not older than 3 months)</li>
                      <li>• Student enrollment verification</li>
                    </ul>
                  </div>

                  <Button disabled className="w-full bg-gray-400 cursor-not-allowed">
                    <AlertCircle className="w-4 h-4 mr-2" />
                    Complete Registration First
                  </Button>

                  <p className="text-sm text-gray-600 text-center">
                    KYC verification will be available after you complete your account registration
                  </p>
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
                  <div className="text-3xl font-bold text-blue-600">75%</div>
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
                  <div className="text-3xl font-bold text-purple-600">#12</div>
                  <p className="text-gray-600">Out of 150 students</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Placeholder content for other tabs */}
          {!["notes", "kyc", "dashboard"].includes(activeTab) && (
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
    </div>
  )
}
