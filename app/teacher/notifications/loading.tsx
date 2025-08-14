import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, Filter, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export default function TeacherNotificationsLoading() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="teacher" />

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <h1 className="text-lg font-bold md:text-xl">Notifications</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search notifications..."
                className="w-full rounded-md pl-8 md:w-[200px]"
                disabled
              />
            </div>
            <Skeleton className="h-10 w-[130px]" />
            <Button variant="outline" size="icon" disabled>
              <Filter className="h-4 w-4" />
            </Button>
            <Button disabled className="bg-green-600">
              <Plus className="mr-2 h-4 w-4" />
              Send Notification
            </Button>
          </div>
        </header>

        <main className="mx-auto max-w-6xl p-4 md:p-6">
          <Tabs defaultValue="sent">
            <TabsList className="mb-6">
              <TabsTrigger value="sent" disabled>
                Sent
              </TabsTrigger>
              <TabsTrigger value="scheduled" disabled>
                Scheduled
              </TabsTrigger>
            </TabsList>

            <div className="space-y-4">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                        <div className="space-y-2 w-full">
                          <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-40" />
                            <Skeleton className="h-5 w-24" />
                          </div>
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                            <Skeleton className="h-3 w-32" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-9 w-24" />
                          <Skeleton className="h-9 w-24" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
