"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
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
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"

interface MobileNavigationProps {
  role: "student" | "parent" | "teacher" | "admin"
}

export function MobileNavigation({ role }: MobileNavigationProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Close the menu when the route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close the menu when the user clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isOpen && !target.closest(".mobile-nav") && !target.closest(".mobile-nav-toggle")) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Prevent scrolling when the menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

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
    <>
      {/* Mobile Header */}
      <div className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between bg-white border-b border-gray-200 px-4 h-16 md:hidden">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="mobile-nav-toggle mr-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <div className="flex items-center">
            <GraduationCap className="h-6 w-6 text-green-600" />
            <h1 className="ml-2 text-lg font-bold text-green-600">Safari Academy</h1>
          </div>
        </div>
        <div className="flex items-center">
          <Link href={`/${role}/notifications`}>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 flex h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
          </Link>
          <Link href={`/${role}/profile`}>
            <Button variant="ghost" size="icon" className="ml-2">
              <User className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav fixed top-0 left-0 bottom-0 z-50 w-[280px] bg-white shadow-xl md:hidden overflow-y-auto"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center h-16 px-4 border-b">
                <GraduationCap className="h-6 w-6 text-green-600" />
                <h1 className="ml-2 text-lg font-bold text-green-600">Safari Academy</h1>
              </div>

              <div className="flex items-center px-4 py-3 border-b">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <User className="h-4 w-4" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">{roleTitle} Portal</p>
                </div>
              </div>

              <nav className="flex-1 p-4">
                <ul className="space-y-1">
                  {menu.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={`flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium ${
                          pathname === item.href ? "bg-green-50 text-green-600" : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center">
                          <item.icon className="mr-3 h-5 w-5" />
                          {item.name}
                        </div>
                        <ChevronRight className="h-4 w-4 opacity-50" />
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Tab Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 md:hidden">
        <div className="flex justify-around items-center h-16">
          <Link href={`/${role}/dashboard`}>
            <Button
              variant="ghost"
              size="icon"
              className="flex flex-col items-center justify-center h-full w-full rounded-none"
            >
              <Home className={`h-5 w-5 ${pathname === `/${role}/dashboard` ? "text-green-600" : "text-gray-500"}`} />
              <span
                className={`text-xs mt-1 ${pathname === `/${role}/dashboard` ? "text-green-600" : "text-gray-500"}`}
              >
                Home
              </span>
            </Button>
          </Link>

          {role === "student" && (
            <>
              <Link href="/student/notes">
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex flex-col items-center justify-center h-full w-full rounded-none"
                >
                  <FileText
                    className={`h-5 w-5 ${pathname === "/student/notes" ? "text-green-600" : "text-gray-500"}`}
                  />
                  <span
                    className={`text-xs mt-1 ${pathname === "/student/notes" ? "text-green-600" : "text-gray-500"}`}
                  >
                    Notes
                  </span>
                </Button>
              </Link>
              <Link href="/student/quizzes">
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex flex-col items-center justify-center h-full w-full rounded-none"
                >
                  <ClipboardList
                    className={`h-5 w-5 ${pathname === "/student/quizzes" ? "text-green-600" : "text-gray-500"}`}
                  />
                  <span
                    className={`text-xs mt-1 ${pathname === "/student/quizzes" ? "text-green-600" : "text-gray-500"}`}
                  >
                    Quizzes
                  </span>
                </Button>
              </Link>
            </>
          )}

          {role === "parent" && (
            <>
              <Link href="/parent/progress">
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex flex-col items-center justify-center h-full w-full rounded-none"
                >
                  <BarChart
                    className={`h-5 w-5 ${pathname === "/parent/progress" ? "text-green-600" : "text-gray-500"}`}
                  />
                  <span
                    className={`text-xs mt-1 ${pathname === "/parent/progress" ? "text-green-600" : "text-gray-500"}`}
                  >
                    Progress
                  </span>
                </Button>
              </Link>
              <Link href="/parent/payments">
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex flex-col items-center justify-center h-full w-full rounded-none"
                >
                  <CreditCard
                    className={`h-5 w-5 ${pathname === "/parent/payments" ? "text-green-600" : "text-gray-500"}`}
                  />
                  <span
                    className={`text-xs mt-1 ${pathname === "/parent/payments" ? "text-green-600" : "text-gray-500"}`}
                  >
                    Payments
                  </span>
                </Button>
              </Link>
            </>
          )}

          {role === "teacher" && (
            <>
              <Link href="/teacher/notes">
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex flex-col items-center justify-center h-full w-full rounded-none"
                >
                  <FileText
                    className={`h-5 w-5 ${pathname === "/teacher/notes" ? "text-green-600" : "text-gray-500"}`}
                  />
                  <span
                    className={`text-xs mt-1 ${pathname === "/teacher/notes" ? "text-green-600" : "text-gray-500"}`}
                  >
                    Notes
                  </span>
                </Button>
              </Link>
              <Link href="/teacher/quizzes">
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex flex-col items-center justify-center h-full w-full rounded-none"
                >
                  <ClipboardList
                    className={`h-5 w-5 ${pathname === "/teacher/quizzes" ? "text-green-600" : "text-gray-500"}`}
                  />
                  <span
                    className={`text-xs mt-1 ${pathname === "/teacher/quizzes" ? "text-green-600" : "text-gray-500"}`}
                  >
                    Quizzes
                  </span>
                </Button>
              </Link>
            </>
          )}

          {role === "admin" && (
            <>
              <Link href="/admin/users">
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex flex-col items-center justify-center h-full w-full rounded-none"
                >
                  <Users className={`h-5 w-5 ${pathname === "/admin/users" ? "text-green-600" : "text-gray-500"}`} />
                  <span className={`text-xs mt-1 ${pathname === "/admin/users" ? "text-green-600" : "text-gray-500"}`}>
                    Users
                  </span>
                </Button>
              </Link>
              <Link href="/admin/analytics">
                <Button
                  variant="ghost"
                  size="icon"
                  className="flex flex-col items-center justify-center h-full w-full rounded-none"
                >
                  <BarChart
                    className={`h-5 w-5 ${pathname === "/admin/analytics" ? "text-green-600" : "text-gray-500"}`}
                  />
                  <span
                    className={`text-xs mt-1 ${pathname === "/admin/analytics" ? "text-green-600" : "text-gray-500"}`}
                  >
                    Analytics
                  </span>
                </Button>
              </Link>
            </>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="flex flex-col items-center justify-center h-full w-full rounded-none"
            onClick={() => setIsOpen(true)}
          >
            <Menu className="h-5 w-5 text-gray-500" />
            <span className="text-xs mt-1 text-gray-500">Menu</span>
          </Button>
        </div>
      </div>

      {/* Spacer for mobile bottom navigation */}
      <div className="h-16 md:hidden" />
    </>
  )
}
