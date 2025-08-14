"use client"

import React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { NotificationBell } from "@/components/notification-bell"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface EnhancedDashboardLayoutProps {
  children: React.ReactNode
  role?: "student" | "parent" | "teacher" | "admin"
  showSearch?: boolean
  showBreadcrumbs?: boolean
}

export function EnhancedDashboardLayout({
  children,
  role: propRole,
  showSearch = false,
  showBreadcrumbs = true,
}: EnhancedDashboardLayoutProps) {
  const [role, setRole] = useState<string>(propRole || "")
  const [userName, setUserName] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    if (!pathname) return []

    const paths = pathname.split("/").filter(Boolean)
    return paths.map((path, index) => {
      const href = `/${paths.slice(0, index + 1).join("/")}`
      return {
        href,
        label: path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " "),
      }
    })
  }

  const breadcrumbs = generateBreadcrumbs()

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

    // Get user name
    const storedUserName = localStorage.getItem("userName")
    if (storedUserName) {
      setUserName(storedUserName)
    }
  }, [propRole])

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  const notifications = [
    {
      id: "1",
      title: "New Feature Available",
      message: "Check out the new dashboard features that were just released!",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: "2",
      title: "Account Update",
      message: "Your account information has been updated successfully.",
      time: "1 hour ago",
      read: false,
    },
  ]

  const markAsRead = (id: string) => {
    // Implementation would go here
  }

  const markAllAsRead = () => {
    // Implementation would go here
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role={role as any} />

      {/* Mobile menu backdrop */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      <div className="flex-1 flex flex-col md:ml-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm md:px-6">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <h1 className="text-lg font-bold md:text-xl">
              {breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].label : "Dashboard"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {showSearch && (
              <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input type="search" placeholder="Search..." className="w-[200px] rounded-md pl-8 md:w-[300px]" />
              </div>
            )}

            <NotificationBell notifications={notifications} onMarkAsRead={markAsRead} onMarkAllAsRead={markAllAsRead} />

            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8 bg-safari-100 text-safari-600">
                <AvatarFallback>{userName ? getInitials(userName) : "U"}</AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:inline-block">{userName}</span>
            </div>
          </div>
        </header>

        <main className="flex-1">
          {showBreadcrumbs && breadcrumbs.length > 1 && (
            <div className="border-b bg-white px-4 py-2 md:px-6">
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((crumb, i) => (
                    <React.Fragment key={i}>
                      <BreadcrumbItem>
                        {i === breadcrumbs.length - 1 ? (
                          <span className="font-medium text-gray-900">{crumb.label}</span>
                        ) : (
                          <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {i < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                    </React.Fragment>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          )}

          <div className="p-4 md:p-6">{children}</div>
        </main>

        <footer className="border-t bg-white px-4 py-4 text-center text-sm text-gray-500 md:px-6">
          <p>© {new Date().getFullYear()} Safari Academy. All rights reserved.</p>
        </footer>
      </div>
    </div>
  )
}

export default EnhancedDashboardLayout
