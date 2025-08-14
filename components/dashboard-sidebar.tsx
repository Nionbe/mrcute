"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { toast } from "@/components/ui/use-toast"
import {
  Menu,
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
  LogOut,
  ChevronRight,
  Shield,
} from "lucide-react"

interface SidebarItem {
  title: string
  href: string
  icon: any
  badge?: number
}

interface DashboardSidebarProps {
  role: "student" | "teacher" | "parent" | "admin"
}

export function DashboardSidebar({ role }: DashboardSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    })
    router.push("/")
  }

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
        { title: "Leaderboard", href: "/parent/leaderboard", icon: Trophy },
        { title: "Notifications", href: "/parent/notifications", icon: Bell },
      ],
      admin: [
        { title: "Dashboard", href: "/admin/dashboard", icon: Home },
        { title: "Users", href: "/admin/users", icon: Users },
        { title: "Analytics", href: "/admin/analytics", icon: BarChart3 },
        { title: "Content", href: "/admin/content", icon: BookOpen },
        { title: "KYC", href: "/admin/kyc", icon: Shield },
        { title: "Payments", href: "/admin/payments", icon: CreditCard },
        { title: "Settings", href: "/admin/settings", icon: Settings },
      ],
    }
    return baseItems[role] || baseItems.student
  }

  const navigationItems = getNavigationItems()

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex h-14 items-center border-b px-4 lg:h-16 lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <GraduationCap className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" />
          <span className="text-sm font-bold text-green-600 sm:text-base">Safari Academy</span>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                  isActive ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground",
                )}
                onClick={() => isMobile && setIsOpen(false)}
              >
                <Icon className="h-4 w-4" />
                <span className="flex-1 truncate">{item.title}</span>
                {item.badge && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-medium text-white">
                    {item.badge}
                  </span>
                )}
                {isMobile && <ChevronRight className="h-4 w-4 opacity-50" />}
              </Link>
            )
          })}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start gap-3 text-sm" onClick={handleLogout}>
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <>
        {/* Mobile Menu Button */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="fixed left-4 top-4 z-40 md:hidden bg-transparent">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </>
    )
  }

  return (
    <div className="hidden border-r bg-muted/40 md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <SidebarContent />
      </div>
    </div>
  )
}
