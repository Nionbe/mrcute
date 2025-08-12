"use client"

import { useState } from "react"

import { BookOpen, FileText, Clock, CalendarIcon, Award, Trophy, Shield, User, Bell } from "heroicons-react"
import { Badge } from "@/components/ui/badge"

const StudentDashboardPage = () => {
  const [activeTab, setActiveTab] = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const kycStatus = "pending" // Example value
  const studentPoints = 100 // Example value

  return (
    <div>
      {/* Sidebar */}
      <nav className="p-4">
        <div className="space-y-2">
          {[
            { id: "overview", label: "Overview", icon: BookOpen },
            { id: "assignments", label: "Assignments", icon: FileText },
            { id: "quizzes", label: "Quizzes", icon: Clock },
            { id: "notes", label: "Notes", icon: BookOpen },
            { id: "attendance", label: "Attendance", icon: CalendarIcon },
            { id: "grades", label: "Grades", icon: Award },
            { id: "leaderboard", label: "Leaderboard", icon: Trophy },
            { id: "kyc", label: "KYC Verification", icon: Shield },
            { id: "profile", label: "Profile", icon: User },
            { id: "notifications", label: "Notifications", icon: Bell },
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
              {item.id === "kyc" && kycStatus === "pending" && (
                <Badge variant="destructive" className="text-xs">
                  !
                </Badge>
              )}
              {item.id === "leaderboard" && <Badge className="bg-green-600 text-xs">{studentPoints}</Badge>}
            </button>
          ))}
        </div>
      </nav>

      {/* Main content area */}
      <div className="p-4">
        {activeTab === "overview" && <div>Overview Content</div>}
        {activeTab === "assignments" && <div>Assignments Content</div>}
        {activeTab === "quizzes" && <div>Quizzes Content</div>}
        {activeTab === "notes" && <div>Notes Content</div>}
        {activeTab === "attendance" && <div>Attendance Content</div>}
        {activeTab === "grades" && <div>Grades Content</div>}
        {activeTab === "leaderboard" && <div>Leaderboard Content</div>}
        {activeTab === "kyc" && <div>KYC Verification Content</div>}
        {activeTab === "profile" && <div>Profile Content</div>}
        {activeTab === "notifications" && <div>Notifications Content</div>}
      </div>
    </div>
  )
}

export default StudentDashboardPage
