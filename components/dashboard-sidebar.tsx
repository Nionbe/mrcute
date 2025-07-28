"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  GraduationCap,
  Home,
  LogOut,
  Bell,
  Award,
  User,
  FileText,
  ClipboardList,
  Users,
  CreditCard,
  BarChart,
  Settings,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { SidebarProvider } from "@/components/ui/sidebar"

interface DashboardSidebarProps {
  role: "student" | "parent" | "teacher" | "admin"
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const studentMenuItems = [
    { name: "Dashboard", href: "/student/dashboard", icon: Home },
    { name: "Notes", href: "/student/notes", icon: FileText },
    { name: "Quizzes", href: "/student/quizzes", icon: ClipboardList },
    { name: "Results", href: "/student/results", icon: BarChart },
    { name: "Leaderboard", href: "/student/leaderboard", icon: Award },
    { name: "Profile", href: "/student/profile", icon: User },
    { name: "Notifications", href: "/student/notifications", icon: Bell },
  ]

  const parentMenuItems = [
    { name: "Dashboard", href: "/parent/dashboard", icon: Home },
    { name: "Child's Progress", href: "/parent/progress", icon: BarChart },
    { name: "Payments", href: "/parent/payments", icon: CreditCard },
    { name: "Leaderboard", href: "/parent/leaderboard", icon: Award },
    { name: "Notifications", href: "/parent/notifications", icon: Bell },
  ]

  const teacherMenuItems = [
    { name: "Dashboard", href: "/teacher/dashboard", icon: Home },
    { name: "Post Notes", href: "/teacher/notes", icon: FileText },
    { name: "Create Quiz", href: "/teacher/quizzes", icon: ClipboardList },
    { name: "Assign Grades", href: "/teacher/grades", icon: Award },
    { name: "Students", href: "/teacher/students", icon: Users },
    { name: "Notifications", href: "/teacher/notifications", icon: Bell },
  ]

  const adminMenuItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: Home },
    { name: "Manage Users", href: "/admin/users", icon: Users },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
    { name: "Content", href: "/admin/content", icon: FileText },
    { name: "Leaderboard", href: "/admin/leaderboard", icon: Award },
    { name: "Notifications", href: "/admin/notifications", icon: Bell },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ]

  let menu = studentMenuItems
  let roleTitle = "Student"

  if (role === "parent") {
    menu = parentMenuItems
    roleTitle = "Parent"
  } else if (role === "teacher") {
    menu = teacherMenuItems
    roleTitle = "Teacher"
  } else if (role === "admin") {
    menu = adminMenuItems
    roleTitle = "Admin"
  }

  return (
    <SidebarProvider>
      <div className="block md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-4 z-50"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </Button>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity md:hidden ${mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={() => setMobileOpen(false)}
      />

      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-white transition-transform duration-200 ease-in-out md:translate-x-0 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center border-b px-4">
            <GraduationCap className="mr-2 h-6 w-6 text-green-600" />
            <h1 className="text-lg font-bold text-green-600">Safari Academy</h1>
          </div>

          <div className="flex items-center border-b px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
              <User className="h-4 w-4" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{roleTitle} Portal</p>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-2">
            <ul className="space-y-1">
              {menu.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                      pathname === item.href ? "bg-green-100 text-green-600" : "text-gray-700 hover:bg-gray-100"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="border-t p-4">
            <Link
              href="/"
              className="flex w-full items-center justify-center rounded-md bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
