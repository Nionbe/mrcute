import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { EnhancedLoading } from "@/components/enhanced-loading"

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="student" />

      <div className="flex-1 md:ml-64">
        <EnhancedLoading />
      </div>
    </div>
  )
}
