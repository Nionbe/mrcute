"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  Home,
  BookOpen,
  FileText,
  Trophy,
  User,
  Bell,
  BarChart3,
  Users,
  Settings,
  CreditCard,
  GraduationCap,
} from "lucide-react"

interface SidebarItem {
  title: string
  href: string
  icon: any
  badge?: number
}

interface AnimatedSidebarProps {
  role: "student" | "teacher" | "parent" | "admin"
}

export function AnimatedSidebar({ role }: AnimatedSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsOpen(true)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const getNavigationItems = (): SidebarItem[] => {
    const baseItems = {
      student: [
        { title: "Dashboard", href: "/student/dashboard", icon: Home },
        { title: "Notes", href: "/student/notes", icon: BookOpen },
        { title: "Quizzes", href: "/student/quizzes", icon: FileText },
        { title: "Results", href: "/student/results", icon: BarChart3 },
        { title: "Leaderboard", href: "/student/leaderboard", icon: Trophy },
        { title: "Profile", href: "/student/profile", icon: User },
        { title: "Notifications", href: "/student/notifications", icon: Bell, badge: 3 },
      ],
      teacher: [
        { title: "Dashboard", href: "/teacher/dashboard", icon: Home },
        { title: "Students", href: "/teacher/students", icon: Users },
        { title: "Notes", href: "/teacher/notes", icon: BookOpen },
        { title: "Quizzes", href: "/teacher/quizzes", icon: FileText },
        { title: "Grades", href: "/teacher/grades", icon: BarChart3 },
        { title: "Notifications", href: "/teacher/notifications", icon: Bell },
      ],
      parent: [
        { title: "Dashboard", href: "/parent/dashboard", icon: Home },
        { title: "Progress", href: "/parent/progress", icon: BarChart3 },
        { title: "Payments", href: "/parent/payments", icon: CreditCard },
        { title: "Leaderboard", href: "/parent/leaderboard", icon: Trophy },
        { title: "Notifications", href: "/parent/notifications", icon: Bell },
      ],
      admin: [
        { title: "Dashboard", href: "/admin/dashboard", icon: Home },
        { title: "Users", href: "/admin/users", icon: Users },
        { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
        { title: "Content", href: "/admin/content", icon: BookOpen },
        { title: "Payments", href: "/admin/payments", icon: CreditCard },
        { title: "Settings", href: "/admin/settings", icon: Settings },
      ],
    }
    return baseItems[role] || baseItems.student
  }

  const navigationItems = getNavigationItems()

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "fixed top-4 left-4 z-50 md:hidden",
          "bg-white shadow-lg hover:bg-gray-50",
          "transition-all duration-300 ease-in-out",
        )}
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay for mobile */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full bg-gradient-to-b from-blue-600 to-blue-800 text-white z-40",
          "transition-all duration-300 ease-in-out",
          "shadow-xl",
          isOpen ? "w-64" : "w-0 md:w-16",
          "md:relative md:z-auto",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div
            className={cn(
              "flex items-center p-4 border-b border-blue-500",
              "transition-all duration-300 ease-in-out",
              isOpen ? "justify-between" : "justify-center",
            )}
          >
            {isOpen && (
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-8 w-8 text-yellow-400" />
                <span className="text-xl font-bold">Safari Academy</span>
              </div>
            )}

            {/* Desktop toggle button */}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex text-white hover:bg-blue-700"
              onClick={toggleSidebar}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navigationItems.map((item, index) => {
              const isActive = pathname === item.href
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg",
                    "transition-all duration-200 ease-in-out",
                    "hover:bg-blue-700 hover:scale-105",
                    "group relative",
                    isActive && "bg-blue-700 shadow-lg",
                  )}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                  onClick={() => isMobile && setIsOpen(false)}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 flex-shrink-0",
                      "transition-all duration-200",
                      isActive ? "text-yellow-400" : "text-blue-200",
                      "group-hover:text-yellow-400",
                    )}
                  />

                  {isOpen && (
                    <span
                      className={cn(
                        "font-medium transition-all duration-300",
                        isActive ? "text-yellow-400" : "text-white",
                      )}
                    >
                      {item.title}
                    </span>
                  )}

                  {item.badge && isOpen && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {item.badge}
                    </span>
                  )}

                  {/* Tooltip for collapsed state */}
                  {!isOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.title}
                    </div>
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Footer */}
          <div className={cn("p-4 border-t border-blue-500", "transition-all duration-300")}>
            {isOpen ? (
              <div className="text-center text-blue-200 text-sm">
                <p>© 2024 Safari Academy</p>
                <p>Version 1.0</p>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-4 w-4 text-yellow-400" />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
