"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  BookOpen,
  Users,
  Award,
  Bell,
  Settings,
  CreditCard,
  BarChart4,
  FileText,
  GraduationCap,
  User,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DashboardSidebarProps {
  role: "student" | "parent" | "teacher" | "admin"
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()

  const getNavigationItems = () => {
    const baseItems = [
      {
        name: "Dashboard",
        href: `/${role}/dashboard`,
        icon: LayoutDashboard,
      },
    ]

    switch (role) {
      case "student":
        return [
          ...baseItems,
          {
            name: "Study Notes",
            href: "/student/notes",
            icon: BookOpen,
          },
          {
            name: "Quizzes",
            href: "/student/quizzes",
            icon: FileText,
          },
          {
            name: "Results",
            href: "/student/results",
            icon: Award,
          },
          {
            name: "Leaderboard",
            href: "/student/leaderboard",
            icon: Award,
          },
          {
            name: "Notifications",
            href: "/student/notifications",
            icon: Bell,
          },
          {
            name: "Profile",
            href: "/student/profile",
            icon: User,
          },
        ]

      case "parent":
        return [
          ...baseItems,
          {
            name: "Child Progress",
            href: "/parent/progress",
            icon: BarChart4,
          },
          {
            name: "Leaderboard",
            href: "/parent/leaderboard",
            icon: Award,
          },
          {
            name: "Payments",
            href: "/parent/payments",
            icon: CreditCard,
          },
          {
            name: "Notifications",
            href: "/parent/notifications",
            icon: Bell,
          },
        ]

      case "teacher":
        return [
          ...baseItems,
          {
            name: "Students",
            href: "/teacher/students",
            icon: Users,
          },
          {
            name: "Study Notes",
            href: "/teacher/notes",
            icon: BookOpen,
          },
          {
            name: "Quizzes",
            href: "/teacher/quizzes",
            icon: FileText,
          },
          {
            name: "Grades",
            href: "/teacher/grades",
            icon: GraduationCap,
          },
          {
            name: "Notifications",
            href: "/teacher/notifications",
            icon: Bell,
          },
        ]

      case "admin":
        return [
          ...baseItems,
          {
            name: "Users",
            href: "/admin/users",
            icon: Users,
          },
          {
            name: "Content",
            href: "/admin/content",
            icon: BookOpen,
          },
          {
            name: "Payments",
            href: "/admin/payments",
            icon: CreditCard,
          },
          {
            name: "KYC Management",
            href: "/admin/kyc",
            icon: Shield,
          },
          {
            name: "Leaderboard",
            href: "/admin/leaderboard",
            icon: Award,
          },
          {
            name: "Analytics",
            href: "/admin/analytics",
            icon: BarChart4,
          },
          {
            name: "Notifications",
            href: "/admin/notifications",
            icon: Bell,
          },
          {
            name: "Settings",
            href: "/admin/settings",
            icon: Settings,
          },
        ]

      default:
        return baseItems
    }
  }

  const navigationItems = getNavigationItems()

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-full bg-white border-r border-gray-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && (
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-green-600 text-white font-bold">SA</div>
            <span className="ml-2 text-lg font-bold text-gray-900">Safari Academy</span>
          </div>
        )}
        <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="h-8 w-8">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link key={item.name} href={item.href}>
                <div
                  className={cn(
                    "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span className="ml-3">{item.name}</span>}
                </div>
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {!collapsed && (
        <div className="border-t p-4">
          <div className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 text-sm font-medium">
              {role.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900 capitalize">{role}</p>
              <p className="text-xs text-gray-500">Safari Academy</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DashboardSidebar
