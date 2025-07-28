"use client"

import type React from "react"

import Link from "next/link"
import { Bell, User, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NotificationBell } from "@/components/notification-bell"

interface EnhancedHeaderProps {
  userRole: string
  userName: string
  userAvatar?: string
  notificationCount?: number
  onLogout?: () => void
  mobileNavContent?: React.ReactNode
}

export function EnhancedHeader({
  userRole,
  userName,
  userAvatar,
  notificationCount = 0,
  onLogout,
  mobileNavContent,
}: EnhancedHeaderProps) {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const rolePath = userRole.toLowerCase()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2 md:gap-4">
          {mobileNavContent && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[240px] sm:w-[300px]">
                <div className="px-2 py-6">{mobileNavContent}</div>
              </SheetContent>
            </Sheet>
          )}

          <Link href={`/${rolePath}/dashboard`} className="flex items-center gap-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary-600">
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">SA</div>
            </div>
            <span className="hidden font-bold text-xl text-primary-700 md:inline-block">Safari Academy</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <NotificationBell count={notificationCount} />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                <Avatar className="h-9 w-9">
                  {userAvatar ? <AvatarImage src={userAvatar || "/placeholder.svg"} alt={userName} /> : null}
                  <AvatarFallback className="bg-primary-100 text-primary-700">{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground capitalize">{userRole}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/${rolePath}/profile`} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/${rolePath}/notifications`} className="cursor-pointer">
                  <Bell className="mr-2 h-4 w-4" />
                  <span>Notifications</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={onLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
