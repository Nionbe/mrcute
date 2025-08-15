"use client"

import type React from "react"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <DashboardSidebar role="teacher" />
      <div className="flex flex-1 flex-col">
        <main className="flex-1 p-4 lg:p-6">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
