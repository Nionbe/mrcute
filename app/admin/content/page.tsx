"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Plus, Edit, Trash2, Eye, Search, Filter, ClipboardList } from "lucide-react"

export default function AdminContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [gradeFilter, setGradeFilter] = useState("all")
  const [subjectFilter, setSubjectFilter] = useState("all")

  // Sample data for notes
  const notes = [
    {
      id: "1",
      title: "Introduction to Algebra",
      subject: "Mathematics",
      grade: "10",
      teacher: "Ms. Johnson",
      date: "Apr 10, 2025",
      status: "Published",
    },
    {
      id: "2",
      title: "Cell Structure and Function",
      subject: "Science",
      grade: "11",
      teacher: "Mr. Wilson",
      date: "Apr 9, 2025",
      status: "Published",
    },
    {
      id: "3",
      title: "Literary Analysis Techniques",
      subject: "English",
      grade: "12",
      teacher: "Mrs. Davis",
      date: "Apr 8, 2025",
      status: "Draft",
    },
    {
      id: "4",
      title: "World War II Overview",
      subject: "History",
      grade: "9",
      teacher: "Mr. Thompson",
      date: "Apr 7, 2025",
      status: "Published",
    },
    {
      id: "5",
      title: "Plate Tectonics",
      subject: "Geography",
      grade: "10",
      teacher: "Ms. Martinez",
      date: "Apr 6, 2025",
      status: "Under Review",
    },
  ]

  // Sample data for quizzes
  const quizzes = [
    {
      id: "1",
      title: "Algebra Fundamentals Quiz",
      subject: "Mathematics",
      grade: "10",
      teacher: "Ms. Johnson",
      questions: 15,
      date: "Apr 10, 2025",
      status: "Active",
    },
    {
      id: "2",
      title: "Cell Biology Assessment",
      subject: "Science",
      grade: "11",
      teacher: "Mr. Wilson",
      questions: 20,
      date: "Apr 9, 2025",
      status: "Active",
    },
    {
      id: "3",
      title: "Poetry Analysis Quiz",
      subject: "English",
      grade: "12",
      teacher: "Mrs. Davis",
      questions: 10,
      date: "Apr 8, 2025",
      status: "Draft",
    },
    {
      id: "4",
      title: "Historical Events Timeline Test",
      subject: "History",
      grade: "9",
      teacher: "Mr. Thompson",
      questions: 25,
      date: "Apr 7, 2025",
      status: "Active",
    },
    {
      id: "5",
      title: "Geography Concepts Quiz",
      subject: "Geography",
      grade: "10",
      teacher: "Ms. Martinez",
      questions: 15,
      date: "Apr 6, 2025",
      status: "Inactive",
    },
  ]

  return (
    <div className="flex-1 md:ml-64">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
        <h1 className="text-lg font-bold md:text-xl">Content Management</h1>
        <div className="flex items-center gap-2">
          <Button variant="default" className="gap-1 bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4" />
            Add New Content
          </Button>
        </div>
      </header>

      <main className="p-4 md:p-6">
        <Tabs defaultValue="notes">
          <TabsList className="mb-6">
            <TabsTrigger value="notes">
              <FileText className="mr-2 h-4 w-4" />
              Notes
            </TabsTrigger>
            <TabsTrigger value="quizzes">
              <ClipboardList className="mr-2 h-4 w-4" />
              Quizzes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notes">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Study Notes</CardTitle>
                  <CardDescription>Manage all study notes across grades and subjects</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search notes..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
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
                    <div className="col-span-3">Title</div>
                    <div className="col-span-2">Subject</div>
                    <div className="col-span-1">Grade</div>
                    <div className="col-span-2">Teacher</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-1 text-right">Actions</div>
                  </div>
                  {notes.map((note) => (
                    <div
                      key={note.id}
                      className="grid grid-cols-12 items-center border-b p-3 last:border-0 hover:bg-gray-50"
                    >
                      <div className="col-span-3 flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-gray-500" />
                        <span className="font-medium">{note.title}</span>
                      </div>
                      <div className="col-span-2">{note.subject}</div>
                      <div className="col-span-1">Grade {note.grade}</div>
                      <div className="col-span-2">{note.teacher}</div>
                      <div className="col-span-2">{note.date}</div>
                      <div className="col-span-1">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            note.status === "Published"
                              ? "bg-green-100 text-green-600"
                              : note.status === "Draft"
                                ? "bg-gray-100 text-gray-600"
                                : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {note.status}
                        </span>
                      </div>
                      <div className="col-span-1 flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quizzes">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Quizzes & Assessments</CardTitle>
                  <CardDescription>Manage all quizzes across grades and subjects</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search quizzes..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
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
                    <div className="col-span-3">Title</div>
                    <div className="col-span-2">Subject</div>
                    <div className="col-span-1">Grade</div>
                    <div className="col-span-2">Teacher</div>
                    <div className="col-span-1">Questions</div>
                    <div className="col-span-1">Date</div>
                    <div className="col-span-1">Status</div>
                    <div className="col-span-1 text-right">Actions</div>
                  </div>
                  {quizzes.map((quiz) => (
                    <div
                      key={quiz.id}
                      className="grid grid-cols-12 items-center border-b p-3 last:border-0 hover:bg-gray-50"
                    >
                      <div className="col-span-3 flex items-center">
                        <ClipboardList className="mr-2 h-4 w-4 text-gray-500" />
                        <span className="font-medium">{quiz.title}</span>
                      </div>
                      <div className="col-span-2">{quiz.subject}</div>
                      <div className="col-span-1">Grade {quiz.grade}</div>
                      <div className="col-span-2">{quiz.teacher}</div>
                      <div className="col-span-1">{quiz.questions}</div>
                      <div className="col-span-1">{quiz.date}</div>
                      <div className="col-span-1">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                            quiz.status === "Active"
                              ? "bg-green-100 text-green-600"
                              : quiz.status === "Draft"
                                ? "bg-gray-100 text-gray-600"
                                : "bg-red-100 text-red-600"
                          }`}
                        >
                          {quiz.status}
                        </span>
                      </div>
                      <div className="col-span-1 flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
