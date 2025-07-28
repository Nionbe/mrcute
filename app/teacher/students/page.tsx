"use client"

import { useState } from "react"
import { Search, Filter, Mail, Phone, User, FileText, BarChart } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function TeacherStudents() {
  const [searchQuery, setSearchQuery] = useState("")
  const [gradeFilter, setGradeFilter] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  // Sample students data
  const students = [
    {
      id: "1",
      name: "Alex Johnson",
      grade: "10",
      studentId: "SA123456",
      email: "alex.johnson@example.com",
      phone: "+1 (555) 123-4567",
      parentName: "David Johnson",
      parentEmail: "david.johnson@example.com",
      parentPhone: "+1 (555) 123-4568",
      performance: {
        mathematics: 85,
        science: 92,
        english: 78,
        history: 88,
      },
      attendance: 95,
      quizzesTaken: 8,
      quizAverage: 86,
    },
    {
      id: "2",
      name: "Emma Davis",
      grade: "10",
      studentId: "SA234567",
      email: "emma.davis@example.com",
      phone: "+1 (555) 234-5678",
      parentName: "Sarah Davis",
      parentEmail: "sarah.davis@example.com",
      parentPhone: "+1 (555) 234-5679",
      performance: {
        mathematics: 78,
        science: 95,
        english: 88,
        history: 75,
      },
      attendance: 98,
      quizzesTaken: 8,
      quizAverage: 84,
    },
    {
      id: "3",
      name: "Michael Brown",
      grade: "10",
      studentId: "SA345678",
      email: "michael.brown@example.com",
      phone: "+1 (555) 345-6789",
      parentName: "Robert Brown",
      parentEmail: "robert.brown@example.com",
      parentPhone: "+1 (555) 345-6780",
      performance: {
        mathematics: 92,
        science: 85,
        english: 76,
        history: 82,
      },
      attendance: 92,
      quizzesTaken: 7,
      quizAverage: 84,
    },
    {
      id: "4",
      name: "Olivia Smith",
      grade: "11",
      studentId: "SA456789",
      email: "olivia.smith@example.com",
      phone: "+1 (555) 456-7890",
      parentName: "Jennifer Smith",
      parentEmail: "jennifer.smith@example.com",
      parentPhone: "+1 (555) 456-7891",
      performance: {
        mathematics: 75,
        science: 82,
        english: 90,
        history: 88,
      },
      attendance: 90,
      quizzesTaken: 8,
      quizAverage: 84,
    },
    {
      id: "5",
      name: "James Wilson",
      grade: "11",
      studentId: "SA567890",
      email: "james.wilson@example.com",
      phone: "+1 (555) 567-8901",
      parentName: "Thomas Wilson",
      parentEmail: "thomas.wilson@example.com",
      parentPhone: "+1 (555) 567-8902",
      performance: {
        mathematics: 95,
        science: 90,
        english: 85,
        history: 92,
      },
      attendance: 97,
      quizzesTaken: 8,
      quizAverage: 91,
    },
  ]

  // Filter students based on search query and grade filter
  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGrade = gradeFilter === "all" || student.grade === gradeFilter
    return matchesSearch && matchesGrade
  })

  // Sort students based on sortBy
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    switch (sortBy) {
      case "name":
        return a.name.localeCompare(b.name)
      case "grade":
        return a.grade.localeCompare(b.grade)
      case "performance":
        const aAvg = Object.values(a.performance).reduce((sum, val) => sum + val, 0) / 4
        const bAvg = Object.values(b.performance).reduce((sum, val) => sum + val, 0) / 4
        return bAvg - aAvg
      case "attendance":
        return b.attendance - a.attendance
      default:
        return 0
    }
  })

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="teacher" />

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <h1 className="text-lg font-bold md:text-xl">Students</h1>
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
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-[130px]">
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
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="grade">Grade</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="attendance">Attendance</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <main className="mx-auto max-w-6xl p-4 md:p-6">
          <Tabs defaultValue="list">
            <TabsList className="mb-6">
              <TabsTrigger value="list">Student List</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="list">
              {sortedStudents.length > 0 ? (
                <div className="space-y-6">
                  {sortedStudents.map((student) => (
                    <Card key={student.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <CardTitle>{student.name}</CardTitle>
                            <CardDescription>
                              ID: {student.studentId} • Grade {student.grade}
                            </CardDescription>
                          </div>
                          <Badge>Grade {student.grade}</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div>
                            <h3 className="mb-2 text-sm font-medium text-gray-500">Student Information</h3>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <Mail className="mr-2 h-4 w-4 text-gray-500" />
                                <span>{student.email}</span>
                              </div>
                              <div className="flex items-center">
                                <Phone className="mr-2 h-4 w-4 text-gray-500" />
                                <span>{student.phone}</span>
                              </div>
                              <div className="flex items-center">
                                <User className="mr-2 h-4 w-4 text-gray-500" />
                                <span>Attendance: {student.attendance}%</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h3 className="mb-2 text-sm font-medium text-gray-500">Parent Information</h3>
                            <div className="space-y-2">
                              <div className="flex items-center">
                                <User className="mr-2 h-4 w-4 text-gray-500" />
                                <span>{student.parentName}</span>
                              </div>
                              <div className="flex items-center">
                                <Mail className="mr-2 h-4 w-4 text-gray-500" />
                                <span>{student.parentEmail}</span>
                              </div>
                              <div className="flex items-center">
                                <Phone className="mr-2 h-4 w-4 text-gray-500" />
                                <span>{student.parentPhone}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                          <Button variant="outline" className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            View Notes
                          </Button>
                          <Button variant="outline" className="flex items-center gap-2">
                            <BarChart className="h-4 w-4" />
                            View Results
                          </Button>
                          <Button className="bg-green-600 hover:bg-green-700">Contact Parent</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <div className="mb-2 h-10 w-10 rounded-full bg-gray-100 p-2 text-gray-400">
                    <Search className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1 text-lg font-medium">No students found</h3>
                  <p className="text-sm text-gray-500">
                    {searchQuery || gradeFilter !== "all"
                      ? "Try a different search term or filter"
                      : "Add students to get started"}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="performance">
              {sortedStudents.length > 0 ? (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Class Performance Overview</CardTitle>
                      <CardDescription>Average performance across {filteredStudents.length} students</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {["Mathematics", "Science", "English", "History"].map((subject) => {
                          const subjectKey = subject.toLowerCase() as keyof (typeof students)[0]["performance"]
                          const average =
                            filteredStudents.reduce((sum, student) => sum + student.performance[subjectKey], 0) /
                            filteredStudents.length

                          return (
                            <div key={subject} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{subject}</span>
                                <span className="text-sm text-gray-500">{average.toFixed(1)}%</span>
                              </div>
                              <Progress value={average} className="h-2" />
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Quiz Completion</CardTitle>
                        <CardDescription>Number of quizzes taken by students</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {sortedStudents.map((student) => (
                            <div key={student.id} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{student.name}</span>
                                <span className="text-sm text-gray-500">{student.quizzesTaken} quizzes</span>
                              </div>
                              <Progress value={(student.quizzesTaken / 8) * 100} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Quiz Performance</CardTitle>
                        <CardDescription>Average quiz scores by student</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {sortedStudents.map((student) => (
                            <div key={student.id} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">{student.name}</span>
                                <span className="text-sm text-gray-500">{student.quizAverage}%</span>
                              </div>
                              <Progress value={student.quizAverage} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Individual Student Performance</CardTitle>
                      <CardDescription>Subject-wise performance for each student</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b text-left">
                              <th className="pb-2 pl-2 pr-4 font-medium">Student</th>
                              <th className="pb-2 px-4 font-medium">Mathematics</th>
                              <th className="pb-2 px-4 font-medium">Science</th>
                              <th className="pb-2 px-4 font-medium">English</th>
                              <th className="pb-2 px-4 font-medium">History</th>
                              <th className="pb-2 px-4 font-medium">Average</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sortedStudents.map((student) => {
                              const average = Object.values(student.performance).reduce((sum, val) => sum + val, 0) / 4

                              return (
                                <tr key={student.id} className="border-b">
                                  <td className="py-3 pl-2 pr-4">{student.name}</td>
                                  <td className="py-3 px-4">{student.performance.mathematics}%</td>
                                  <td className="py-3 px-4">{student.performance.science}%</td>
                                  <td className="py-3 px-4">{student.performance.english}%</td>
                                  <td className="py-3 px-4">{student.performance.history}%</td>
                                  <td className="py-3 px-4 font-medium">{average.toFixed(1)}%</td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <div className="mb-2 h-10 w-10 rounded-full bg-gray-100 p-2 text-gray-400">
                    <BarChart className="h-6 w-6" />
                  </div>
                  <h3 className="mb-1 text-lg font-medium">No performance data available</h3>
                  <p className="text-sm text-gray-500">
                    {searchQuery || gradeFilter !== "all"
                      ? "Try a different search term or filter"
                      : "Add students to view performance data"}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
