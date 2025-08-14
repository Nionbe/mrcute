"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
  role?: string
}

export function DashboardLayout({ children, role: propRole }: DashboardLayoutProps) {
  const [role, setRole] = useState(propRole || "")

  useEffect(() => {
    // If role is not provided as prop, get it from localStorage
    if (!propRole) {
      const userRole = localStorage.getItem("userRole")
      if (userRole) {
        setRole(userRole)
      } else {
        // Default to student if no role is found
        setRole("student")
      }
    }
  }, [propRole])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role={role as any} />
      <div className="flex-1">
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}

// Add default export for backward compatibility
export default DashboardLayout
