import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex-1 md:ml-64">
      <div className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
        <Skeleton className="h-6 w-48" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      <main className="p-4 md:p-6">
        <div className="mb-6">
          <Skeleton className="h-10 w-96" />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-24 w-full" />
              <div className="flex items-center gap-4">
                <Skeleton className="h-16 w-16" />
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
