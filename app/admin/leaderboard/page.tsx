"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Award, Download, Filter } from "lucide-react"

export default function AdminLeaderboard() {
  const [gradeFilter, setGradeFilter] = useState("all")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [timeFilter, setTimeFilter] = useState("this-month")

  // Sample data for leaderboard
  const studentLeaderboard = [
    { rank: 1, name: "Emma Davis", grade: "10", points: 950, badges: 12, improvement: "+15%" },
    { rank: 2, name: "Alex Johnson", grade: "11", points: 920, badges: 10, improvement: "+8%" },
    { rank: 3, name: "Michael Brown", grade: "10", points: 890, badges: 9, improvement: "+12%" },
    { rank: 4, name: "Sophia Wilson", grade: "9", points: 870, badges: 8, improvement: "+5%" },
    { rank: 5, name: "James Taylor", grade: "12", points: 850, badges: 11, improvement: "+3%" },
    { rank: 6, name: "Olivia Smith", grade: "11", points: 830, badges: 7, improvement: "+10%" },
    { rank: 7, name: "William Anderson", grade: "9", points: 810, badges: 6, improvement: "+7%" },
    { rank: 8, name: "Ava Martinez", grade: "10", points: 790, badges: 8, improvement: "+9%" },
    { rank: 9, name: "Noah Thomas", grade: "12", points: 770, badges: 9, improvement: "+2%" },
    { rank: 10, name: "Isabella Garcia", grade: "11", points: 750, badges: 7, improvement: "+6%" },
  ]

  const classLeaderboard = [
    { rank: 1, class: "Grade 10A", teacher: "Ms. Johnson", avgScore: 92, totalPoints: 4500, improvement: "+10%" },
    { rank: 2, class: "Grade 11B", teacher: "Mr. Wilson", avgScore: 90, totalPoints: 4350, improvement: "+8%" },
    { rank: 3, class: "Grade 9C", teacher: "Mrs. Davis", avgScore: 89, totalPoints: 4200, improvement: "+12%" },
    { rank: 4, class: "Grade 12A", teacher: "Mr. Thompson", avgScore: 87, totalPoints: 4100, improvement: "+5%" },
    { rank: 5, class: "Grade 10B", teacher: "Ms. Martinez", avgScore: 86, totalPoints: 4000, improvement: "+7%" },
  ]

  const teacherLeaderboard = [
    { rank: 1, name: "Ms. Johnson", subject: "Mathematics", students: 45, avgScore: 92, improvement: "+8%" },
    { rank: 2, name: "Mr. Wilson", subject: "Science", students: 50, avgScore: 90, improvement: "+10%" },
    { rank: 3, name: "Mrs. Davis", subject: "English", students: 48, avgScore: 89, improvement: "+6%" },
    { rank: 4, name: "Mr. Thompson", subject: "History", students: 42, avgScore: 87, improvement: "+9%" },
    { rank: 5, name: "Ms. Martinez", subject: "Geography", students: 46, avgScore: 86, improvement: "+7%" },
  ]

  return (
    <div className="flex-1 md:ml-64">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
        <h1 className="text-lg font-bold md:text-xl">Leaderboard Management</h1>
        <div className="flex items-center gap-2">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-term">This Term</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-1">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </header>

      <main className="p-4 md:p-6">
        <Tabs defaultValue="students">
          <TabsList className="mb-6">
            <TabsTrigger value="students">Student Leaderboard</TabsTrigger>
            <TabsTrigger value="classes">Class Leaderboard</TabsTrigger>
            <TabsTrigger value="teachers">Teacher Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Top Students</CardTitle>
                  <CardDescription>Students with the highest performance scores</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={gradeFilter} onValueChange={setGradeFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Grades</SelectItem>
                      <SelectItem value="9">Grade 9</SelectItem>
                      <SelectItem value="10">Grade 10</SelectItem>
                      <SelectItem value="11">Grade 11</SelectItem>
                      <SelectItem value="12">Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 border-b bg-gray-50 p-3 text-sm font-medium text-gray-500">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-4">Student Name</div>
                    <div className="col-span-2">Grade</div>
                    <div className="col-span-2">Points</div>
                    <div className="col-span-2">Badges</div>
                    <div className="col-span-1">Progress</div>
                  </div>
                  {studentLeaderboard.map((student) => (
                    <div
                      key={student.rank}
                      className="grid grid-cols-12 items-center border-b p-3 last:border-0 hover:bg-gray-50"
                    >
                      <div className="col-span-1 flex items-center">
                        {student.rank <= 3 ? (
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full ${
                              student.rank === 1
                                ? "bg-yellow-100 text-yellow-600"
                                : student.rank === 2
                                  ? "bg-gray-200 text-gray-600"
                                  : "bg-amber-100 text-amber-600"
                            }`}
                          >
                            <Award className="h-4 w-4" />
                          </div>
                        ) : (
                          <span className="text-gray-500">{student.rank}</span>
                        )}
                      </div>
                      <div className="col-span-4 font-medium">{student.name}</div>
                      <div className="col-span-2">Grade {student.grade}</div>
                      <div className="col-span-2 font-medium">{student.points}</div>
                      <div className="col-span-2">{student.badges}</div>
                      <div className="col-span-1 text-green-600">{student.improvement}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="classes">
            <Card>
              <CardHeader>
                <CardTitle>Top Classes</CardTitle>
                <CardDescription>Classes with the highest average performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 border-b bg-gray-50 p-3 text-sm font-medium text-gray-500">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-3">Class</div>
                    <div className="col-span-3">Teacher</div>
                    <div className="col-span-2">Avg. Score</div>
                    <div className="col-span-2">Total Points</div>
                    <div className="col-span-1">Progress</div>
                  </div>
                  {classLeaderboard.map((classItem) => (
                    <div
                      key={classItem.rank}
                      className="grid grid-cols-12 items-center border-b p-3 last:border-0 hover:bg-gray-50"
                    >
                      <div className="col-span-1 flex items-center">
                        {classItem.rank <= 3 ? (
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full ${
                              classItem.rank === 1
                                ? "bg-yellow-100 text-yellow-600"
                                : classItem.rank === 2
                                  ? "bg-gray-200 text-gray-600"
                                  : "bg-amber-100 text-amber-600"
                            }`}
                          >
                            <Award className="h-4 w-4" />
                          </div>
                        ) : (
                          <span className="text-gray-500">{classItem.rank}</span>
                        )}
                      </div>
                      <div className="col-span-3 font-medium">{classItem.class}</div>
                      <div className="col-span-3">{classItem.teacher}</div>
                      <div className="col-span-2 font-medium">{classItem.avgScore}%</div>
                      <div className="col-span-2">{classItem.totalPoints}</div>
                      <div className="col-span-1 text-green-600">{classItem.improvement}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="teachers">
            <Card>
              <CardHeader>
                <CardTitle>Top Teachers</CardTitle>
                <CardDescription>Teachers with the highest student performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-12 border-b bg-gray-50 p-3 text-sm font-medium text-gray-500">
                    <div className="col-span-1">Rank</div>
                    <div className="col-span-3">Teacher</div>
                    <div className="col-span-3">Subject</div>
                    <div className="col-span-2">Students</div>
                    <div className="col-span-2">Avg. Score</div>
                    <div className="col-span-1">Progress</div>
                  </div>
                  {teacherLeaderboard.map((teacher) => (
                    <div
                      key={teacher.rank}
                      className="grid grid-cols-12 items-center border-b p-3 last:border-0 hover:bg-gray-50"
                    >
                      <div className="col-span-1 flex items-center">
                        {teacher.rank <= 3 ? (
                          <div
                            className={`flex h-6 w-6 items-center justify-center rounded-full ${
                              teacher.rank === 1
                                ? "bg-yellow-100 text-yellow-600"
                                : teacher.rank === 2
                                  ? "bg-gray-200 text-gray-600"
                                  : "bg-amber-100 text-amber-600"
                            }`}
                          >
                            <Award className="h-4 w-4" />
                          </div>
                        ) : (
                          <span className="text-gray-500">{teacher.rank}</span>
                        )}
                      </div>
                      <div className="col-span-3 font-medium">{teacher.name}</div>
                      <div className="col-span-3">{teacher.subject}</div>
                      <div className="col-span-2">{teacher.students}</div>
                      <div className="col-span-2 font-medium">{teacher.avgScore}%</div>
                      <div className="col-span-1 text-green-600">{teacher.improvement}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
