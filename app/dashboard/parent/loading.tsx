export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4 animate-pulse">
          <div className="w-5 h-5 bg-white rounded"></div>
        </div>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  )
}
