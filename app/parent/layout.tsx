"use client"

import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="parent" />
      <div className="flex-1">
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
