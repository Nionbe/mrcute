import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function ParentProgressLoading() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="parent" />

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <Skeleton className="h-8 w-40" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-32" />
          </div>
        </header>

        <main className="p-4 md:p-6">
          <Card className="mb-6 border-2 border-gray-200 bg-gray-50">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <div>
                  <Skeleton className="h-4 w-32 mb-2" />
                  <Skeleton className="h-6 w-20 mb-2" />
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mb-6">
            <Skeleton className="h-10 w-72" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-2 w-full mb-3" />
                  <Skeleton className="h-4 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader className="space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-56" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                      <div>
                        <Skeleton className="h-5 w-48 mb-2" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <Skeleton className="h-6 w-16" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
