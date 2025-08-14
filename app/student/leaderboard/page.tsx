"use client"

import { useState, useEffect } from "react"
import { Award, Search, Filter, TrendingUp, Medal } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"

export default function StudentLeaderboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [userName, setUserName] = useState("Alex Johnson")

  const [overallLeaderboard, setOverallLeaderboard] = useState([
    { rank: 1, name: "Sarah Williams", grade: "10", points: 1580, change: "+3" },
    { rank: 2, name: "Michael Brown", grade: "10", points: 1450, change: "-1" },
    { rank: 3, name: "Emma Davis", grade: "10", points: 1320, change: "+1" },
    { rank: 4, name: "James Wilson", grade: "10", points: 1290, change: "-1" },
    { rank: 5, name: "Alex Johnson", grade: "10", points: 1250, change: "+2", isCurrentUser: true },
    { rank: 6, name: "Olivia Smith", grade: "10", points: 1220, change: "0" },
    { rank: 7, name: "William Taylor", grade: "10", points: 1180, change: "+5" },
    { rank: 8, name: "Sophia Martinez", grade: "10", points: 1150, change: "-2" },
    { rank: 9, name: "Benjamin Anderson", grade: "10", points: 1120, change: "+1" },
    { rank: 10, name: "Isabella Thomas", grade: "10", points: 1090, change: "-3" },
  ])

  const [mathLeaderboard, setMathLeaderboard] = useState([
    { rank: 1, name: "Michael Brown", grade: "10", points: 580, change: "0" },
    { rank: 2, name: "Sarah Williams", grade: "10", points: 550, change: "+1" },
    { rank: 3, name: "Alex Johnson", grade: "10", points: 520, change: "+5", isCurrentUser: true },
    { rank: 4, name: "Emma Davis", grade: "10", points: 490, change: "-1" },
    { rank: 5, name: "William Taylor", grade: "10", points: 470, change: "+2" },
  ])

  const [scienceLeaderboard, setScienceLeaderboard] = useState([
    { rank: 1, name: "Sarah Williams", grade: "10", points: 610, change: "+2" },
    { rank: 2, name: "Emma Davis", grade: "10", points: 580, change: "0" },
    { rank: 3, name: "James Wilson", grade: "10", points: 550, change: "+1" },
    { rank: 4, name: "Olivia Smith", grade: "10", points: 520, change: "-1" },
    { rank: 5, name: "Alex Johnson", grade: "10", points: 490, change: "+3", isCurrentUser: true },
  ])

  const [englishLeaderboard, setEnglishLeaderboard] = useState([
    { rank: 1, name: "Emma Davis", grade: "10", points: 590, change: "0" },
    { rank: 2, name: "Isabella Thomas", grade: "10", points: 560, change: "+2" },
    { rank: 3, name: "Sarah Williams", grade: "10", points: 540, change: "-1" },
    { rank: 4, name: "Benjamin Anderson", grade: "10", points: 510, change: "+1" },
    { rank: 5, name: "Sophia Martinez", grade: "10", points: 480, change: "+3" },
    { rank: 6, name: "Alex Johnson", grade: "10", points: 450, change: "-2", isCurrentUser: true },
  ])

  const [historyLeaderboard, setHistoryLeaderboard] = useState([
    { rank: 1, name: "James Wilson", grade: "10", points: 570, change: "+1" },
    { rank: 2, name: "Sophia Martinez", grade: "10", points: 540, change: "+3" },
    { rank: 3, name: "William Taylor", grade: "10", points: 520, change: "-1" },
    { rank: 4, name: "Sarah Williams", grade: "10", points: 500, change: "-1" },
    { rank: 5, name: "Michael Brown", grade: "10", points: 480, change: "+2" },
    { rank: 6, name: "Olivia Smith", grade: "10", points: 460, change: "0" },
    { rank: 7, name: "Alex Johnson", grade: "10", points: 440, change: "+4", isCurrentUser: true },
  ])

  const getLeaderboardData = () => {
    switch (subjectFilter) {
      case "mathematics":
        return mathLeaderboard
      case "science":
        return scienceLeaderboard
      case "english":
        return englishLeaderboard
      case "history":
        return historyLeaderboard
      default:
        return overallLeaderboard
    }
  }

  const filteredLeaderboard = getLeaderboardData().filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Add useEffect to load user data and save/load leaderboard progress
  useEffect(() => {
    // Get user info from localStorage
    const storedUserName = localStorage.getItem("userName") || "Alex Johnson"
    setUserName(storedUserName)

    // Update all leaderboards with the correct user name
    const updateLeaderboardWithUserName = (leaderboard) => {
      return leaderboard.map((student) => (student.isCurrentUser ? { ...student, name: storedUserName } : student))
    }

    setOverallLeaderboard(updateLeaderboardWithUserName(overallLeaderboard))
    setMathLeaderboard(updateLeaderboardWithUserName(mathLeaderboard))
    setScienceLeaderboard(updateLeaderboardWithUserName(scienceLeaderboard))
    setEnglishLeaderboard(updateLeaderboardWithUserName(englishLeaderboard))
    setHistoryLeaderboard(updateLeaderboardWithUserName(historyLeaderboard))

    // Find the user's data in the leaderboards
    const overallUserData = overallLeaderboard.find((student) => student.isCurrentUser)
    const mathUserData = mathLeaderboard.find((student) => student.isCurrentUser)
    const scienceUserData = scienceLeaderboard.find((student) => student.isCurrentUser)
    const englishUserData = englishLeaderboard.find((student) => student.isCurrentUser)
    const historyUserData = historyLeaderboard.find((student) => student.isCurrentUser)

    // Save user data to localStorage if not exists
    if (!localStorage.getItem("userLeaderboardData")) {
      const userData = {
        overall: { rank: overallUserData?.rank || 5, points: overallUserData?.points || 1250 },
        subjects: {
          mathematics: { rank: mathUserData?.rank || 3, points: mathUserData?.points || 520 },
          science: { rank: scienceUserData?.rank || 5, points: scienceUserData?.points || 490 },
          english: { rank: englishUserData?.rank || 6, points: englishUserData?.points || 450 },
          history: { rank: historyUserData?.rank || 7, points: historyUserData?.points || 440 },
        },
      }
      localStorage.setItem("userLeaderboardData", JSON.stringify(userData))
    }
  }, [])

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="student" />

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <h1 className="text-lg font-bold md:text-xl">Leaderboard</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search students..."
                className="w-full rounded-md pl-8 md:w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Overall</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="science">Science</SelectItem>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="history">History</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <Tabs defaultValue="leaderboard">
            <TabsList className="mb-6">
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="my-ranking">My Ranking</TabsTrigger>
            </TabsList>

            <TabsContent value="leaderboard">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>
                        {subjectFilter === "all"
                          ? "Overall Leaderboard"
                          : `${subjectFilter.charAt(0).toUpperCase() + subjectFilter.slice(1)} Leaderboard`}
                      </CardTitle>
                      <CardDescription>Top students based on quiz points</CardDescription>
                    </div>
                    <Award className="h-6 w-6 text-green-600" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredLeaderboard.map((student) => (
                      <div
                        key={student.rank}
                        className={`flex items-center justify-between rounded-lg border p-4 ${
                          student.isCurrentUser ? "border-green-200 bg-green-50" : ""
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                              student.rank === 1
                                ? "bg-yellow-100 text-yellow-600"
                                : student.rank === 2
                                  ? "bg-gray-100 text-gray-600"
                                  : student.rank === 3
                                    ? "bg-orange-100 text-orange-600"
                                    : "bg-green-100 text-green-600"
                            }`}
                          >
                            {student.rank}
                          </div>
                          <div>
                            <p className={`font-medium ${student.isCurrentUser ? "text-green-600" : ""}`}>
                              {student.name} {student.isCurrentUser && "(You)"}
                            </p>
                            <p className="text-sm text-gray-500">Grade {student.grade}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <p className="font-bold text-green-600">{student.points}</p>
                            <p className="text-xs text-gray-500">points</p>
                          </div>
                          <div
                            className={`flex items-center rounded-full px-2 py-1 text-xs ${
                              student.change.startsWith("+")
                                ? "bg-green-100 text-green-600"
                                : student.change === "0"
                                  ? "bg-gray-100 text-gray-600"
                                  : "bg-red-100 text-red-600"
                            }`}
                          >
                            {student.change !== "0" && (
                              <TrendingUp
                                className={`mr-1 h-3 w-3 ${
                                  student.change.startsWith("+") ? "" : "transform rotate-180"
                                }`}
                              />
                            )}
                            {student.change}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="my-ranking">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>My Overall Ranking</CardTitle>
                    <CardDescription>Your position across all subjects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center">
                      <div className="mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                        <span className="text-4xl font-bold text-green-600">#5</span>
                      </div>
                      <h3 className="text-xl font-bold">{userName}</h3>
                      <p className="text-gray-500">Grade 10</p>
                      <div className="mt-4 flex items-center gap-2">
                        <span className="text-2xl font-bold text-green-600">1250</span>
                        <span className="text-sm text-gray-500">total points</span>
                      </div>
                      <div className="mt-2 flex items-center rounded-full bg-green-100 px-3 py-1 text-sm text-green-600">
                        <TrendingUp className="mr-1 h-4 w-4" />
                        +2 from last week
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Subject Rankings</CardTitle>
                    <CardDescription>Your position in each subject</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <span className="text-sm font-bold">#3</span>
                          </div>
                          <span>Mathematics</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-green-600">520</span>
                          <span className="ml-1 text-xs text-gray-500">points</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <span className="text-sm font-bold">#5</span>
                          </div>
                          <span>Science</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-green-600">490</span>
                          <span className="ml-1 text-xs text-gray-500">points</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <span className="text-sm font-bold">#6</span>
                          </div>
                          <span>English</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-green-600">450</span>
                          <span className="ml-1 text-xs text-gray-500">points</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between rounded-lg border p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <span className="text-sm font-bold">#7</span>
                          </div>
                          <span>History</span>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-green-600">440</span>
                          <span className="ml-1 text-xs text-gray-500">points</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Achievement Badges</CardTitle>
                  <CardDescription>Badges earned based on your performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    <div className="flex flex-col items-center rounded-lg border p-4">
                      <Medal className="mb-2 h-10 w-10 text-yellow-500" />
                      <span className="text-center text-sm font-medium">Math Wizard</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border p-4">
                      <Medal className="mb-2 h-10 w-10 text-green-500" />
                      <span className="text-center text-sm font-medium">Quiz Champion</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border p-4">
                      <Medal className="mb-2 h-10 w-10 text-blue-500" />
                      <span className="text-center text-sm font-medium">Fast Learner</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border p-4 opacity-40">
                      <Medal className="mb-2 h-10 w-10 text-purple-500" />
                      <span className="text-center text-sm font-medium">Science Expert</span>
                    </div>
                    <div className="flex flex-col items-center rounded-lg border p-4 opacity-40">
                      <Medal className="mb-2 h-10 w-10 text-red-500" />
                      <span className="text-center text-sm font-medium">Perfect Score</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
