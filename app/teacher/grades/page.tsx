"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { Search, Edit, Check, X } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"

export default function TeacherGradesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGrade, setFilterGrade] = useState("all")
  const [filterSubject, setFilterSubject] = useState("all")
  const [teacherInfo, setTeacherInfo] = useState({
    name: "Loading...",
    subject: "Mathematics",
    grade: "10",
    teacherId: "Loading...",
  })

  const [students, setStudents] = useState([
    {
      id: "SA123456",
      name: "Alex Johnson",
      grade: "10",
      email: "alex.j@example.com",
      assignments: [
        { id: "1", name: "Algebra Quiz 1", score: 85, maxScore: 100, status: "graded" },
        { id: "2", name: "Geometry Test", score: 78, maxScore: 100, status: "graded" },
        { id: "3", name: "Calculus Assignment", score: null, maxScore: 100, status: "pending" },
      ],
      averageScore: 81.5,
    },
    {
      id: "SA234567",
      name: "Emma Davis",
      grade: "10",
      email: "emma.d@example.com",
      assignments: [
        { id: "1", name: "Algebra Quiz 1", score: 92, maxScore: 100, status: "graded" },
        { id: "2", name: "Geometry Test", score: 88, maxScore: 100, status: "graded" },
        { id: "3", name: "Calculus Assignment", score: null, maxScore: 100, status: "pending" },
      ],
      averageScore: 90,
    },
    {
      id: "SA345678",
      name: "Michael Brown",
      grade: "10",
      email: "michael.b@example.com",
      assignments: [
        { id: "1", name: "Algebra Quiz 1", score: 75, maxScore: 100, status: "graded" },
        { id: "2", name: "Geometry Test", score: 82, maxScore: 100, status: "graded" },
        { id: "3", name: "Calculus Assignment", score: null, maxScore: 100, status: "pending" },
      ],
      averageScore: 78.5,
    },
    {
      id: "SA456789",
      name: "Olivia Smith",
      grade: "11",
      email: "olivia.s@example.com",
      assignments: [
        { id: "1", name: "Algebra Quiz 1", score: 95, maxScore: 100, status: "graded" },
        { id: "2", name: "Geometry Test", score: 91, maxScore: 100, status: "graded" },
        { id: "3", name: "Calculus Assignment", score: null, maxScore: 100, status: "pending" },
      ],
      averageScore: 93,
    },
    {
      id: "SA567890",
      name: "James Wilson",
      grade: "11",
      email: "james.w@example.com",
      assignments: [
        { id: "1", name: "Algebra Quiz 1", score: 68, maxScore: 100, status: "graded" },
        { id: "2", name: "Geometry Test", score: 72, maxScore: 100, status: "graded" },
        { id: "3", name: "Calculus Assignment", score: null, maxScore: 100, status: "pending" },
      ],
      averageScore: 70,
    },
  ])

  const [editingGrade, setEditingGrade] = useState<{
    studentId: string
    assignmentId: string
    score: string
  } | null>(null)

  useEffect(() => {
    // Get user info from localStorage
    const userName = localStorage.getItem("userName") || "Teacher"
    const userId = localStorage.getItem("userId") || "TA789012"
    const userSubject = localStorage.getItem("userSubject") || "Mathematics"
    const userGrade = localStorage.getItem("userGrade") || "10"

    setTeacherInfo({
      name: userName,
      subject: userSubject,
      grade: userGrade,
      teacherId: userId,
    })

    // In a real app, you would fetch students and grades from your backend
    // For now, we'll use the static data defined above
  }, [])

  const handleEditGrade = (studentId: string, assignmentId: string, currentScore: number | null) => {
    setEditingGrade({
      studentId,
      assignmentId,
      score: currentScore !== null ? currentScore.toString() : "",
    })
  }

  const handleSaveGrade = () => {
    if (!editingGrade) return

    const { studentId, assignmentId, score } = editingGrade
    const scoreNum = Number.parseInt(score)

    if (isNaN(scoreNum) || scoreNum < 0 || scoreNum > 100) {
      toast({
        title: "Invalid score",
        description: "Please enter a valid score between 0 and 100.",
        variant: "destructive",
      })
      return
    }

    // Update the student's grade
    setStudents(
      students.map((student) => {
        if (student.id === studentId) {
          const updatedAssignments = student.assignments.map((assignment) => {
            if (assignment.id === assignmentId) {
              return {
                ...assignment,
                score: scoreNum,
                status: "graded",
              }
            }
            return assignment
          })

          // Calculate new average score
          const gradedAssignments = updatedAssignments.filter((a) => a.status === "graded")
          const totalScore = gradedAssignments.reduce((sum, a) => sum + (a.score || 0), 0)
          const newAverage = gradedAssignments.length > 0 ? totalScore / gradedAssignments.length : 0

          return {
            ...student,
            assignments: updatedAssignments,
            averageScore: Math.round(newAverage * 10) / 10,
          }
        }
        return student
      }),
    )

    setEditingGrade(null)

    toast({
      title: "Grade updated",
      description: "The student's grade has been updated successfully.",
    })
  }

  const handleCancelEdit = () => {
    setEditingGrade(null)
  }

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = filterGrade === "all" || student.grade === filterGrade
    return matchesSearch && matchesGrade
  })

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Assign Grades</h1>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Grade Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="grade-filter">Filter by Grade</Label>
                <Select value={filterGrade} onValueChange={setFilterGrade}>
                  <SelectTrigger id="grade-filter">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="9">Grade 9</SelectItem>
                    <SelectItem value="10">Grade 10</SelectItem>
                    <SelectItem value="11">Grade 11</SelectItem>
                    <SelectItem value="12">Grade 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject-filter">Filter by Subject</Label>
                <Select value={filterSubject} onValueChange={setFilterSubject}>
                  <SelectTrigger id="subject-filter">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Subjects</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="History">History</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="search">Search Student</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    id="search"
                    placeholder="Search by name or email..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Grade</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Average Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>Grade {student.grade}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>
                          <span
                            className={`font-medium ${
                              student.averageScore >= 90
                                ? "text-green-600"
                                : student.averageScore >= 80
                                  ? "text-blue-600"
                                  : student.averageScore >= 70
                                    ? "text-yellow-600"
                                    : "text-red-600"
                            }`}
                          >
                            {student.averageScore}%
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              // View student details
                              toast({
                                title: "View student details",
                                description: `Viewing details for ${student.name}`,
                              })
                            }}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-4">
                        No students found matching your criteria
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assignment Grades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Assignment</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.flatMap((student) =>
                    student.assignments.map((assignment) => (
                      <TableRow key={`${student.id}-${assignment.id}`}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{assignment.name}</TableCell>
                        <TableCell>
                          {editingGrade &&
                          editingGrade.studentId === student.id &&
                          editingGrade.assignmentId === assignment.id ? (
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={editingGrade.score}
                              onChange={(e) =>
                                setEditingGrade({
                                  ...editingGrade,
                                  score: e.target.value,
                                })
                              }
                              className="w-20"
                            />
                          ) : assignment.score !== null ? (
                            `${assignment.score}/${assignment.maxScore}`
                          ) : (
                            "Not graded"
                          )}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                              assignment.status === "graded"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {assignment.status === "graded" ? "Graded" : "Pending"}
                          </span>
                        </TableCell>
                        <TableCell>
                          {editingGrade &&
                          editingGrade.studentId === student.id &&
                          editingGrade.assignmentId === assignment.id ? (
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={handleSaveGrade}
                                className="h-8 w-8 text-green-600"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={handleCancelEdit}
                                className="h-8 w-8 text-red-600"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleEditGrade(student.id, assignment.id, assignment.score)}
                              className="h-8 w-8"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    )),
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
