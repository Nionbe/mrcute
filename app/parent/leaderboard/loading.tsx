import { DashboardLayout } from "@/components/dashboard-layout"

export default function Loading() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6 h-8 w-48 animate-pulse rounded-md bg-gray-200"></div>

        <div className="mb-8">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="mb-4 h-6 w-48 animate-pulse rounded-md bg-gray-200"></div>
            <div className="mb-2 h-4 w-64 animate-pulse rounded-md bg-gray-200"></div>
            <div className="mt-6 flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
              <div className="flex items-center">
                <div className="mr-4 h-16 w-16 animate-pulse rounded-full bg-gray-200"></div>
                <div>
                  <div className="mb-2 h-6 w-32 animate-pulse rounded-md bg-gray-200"></div>
                  <div className="h-4 w-24 animate-pulse rounded-md bg-gray-200"></div>
                </div>
              </div>
              <div className="text-center md:text-right">
                <div className="mb-2 h-8 w-16 animate-pulse rounded-md bg-gray-200"></div>
                <div className="h-4 w-24 animate-pulse rounded-md bg-gray-200"></div>
              </div>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="mb-2 h-4 w-24 animate-pulse rounded-md bg-gray-200"></div>
                <div className="h-6 w-12 animate-pulse rounded-md bg-gray-200"></div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="mb-2 h-4 w-24 animate-pulse rounded-md bg-gray-200"></div>
                <div className="h-6 w-12 animate-pulse rounded-md bg-gray-200"></div>
              </div>
              <div className="rounded-lg bg-white p-4 shadow-sm">
                <div className="mb-2 h-4 w-24 animate-pulse rounded-md bg-gray-200"></div>
                <div className="h-6 w-12 animate-pulse rounded-md bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4 h-10 w-full animate-pulse rounded-md bg-gray-200"></div>

        <div className="rounded-lg border bg-card shadow-sm">
          <div className="p-6">
            <div className="mb-4 h-6 w-48 animate-pulse rounded-md bg-gray-200"></div>
            <div className="mb-6 h-4 w-64 animate-pulse rounded-md bg-gray-200"></div>
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center">
                    <div className="mr-3 h-6 w-6 animate-pulse rounded-full bg-gray-200"></div>
                    <div className="h-4 w-32 animate-pulse rounded-md bg-gray-200"></div>
                  </div>
                  <div className="h-4 w-16 animate-pulse rounded-md bg-gray-200"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
