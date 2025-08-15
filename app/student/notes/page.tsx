"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Search, Calendar, UserIcon, RefreshCw, Plus, Eye } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import DataManager, { type Note } from "@/lib/data-manager"

export default function StudentNotesPage() {
  const [teacherNotes, setTeacherNotes] = useState<Note[]>([])
  const [personalNotes, setPersonalNotes] = useState<Note[]>([])
  const [filteredTeacherNotes, setFilteredTeacherNotes] = useState<Note[]>([])
  const [filteredPersonalNotes, setFilteredPersonalNotes] = useState<Note[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<{
    id: string
    name: string
    email: string
    role: string
    grade: string
  } | null>(null)

  const dataManager = DataManager.getInstance()

  useEffect(() => {
    initializeData()
    setupEventListeners()

    return () => {
      // Cleanup event listeners
      dataManager.removeEventListener("notes-updated", handleNotesUpdate)
    }
  }, [])

  useEffect(() => {
    filterNotes()
  }, [teacherNotes, personalNotes, searchTerm, subjectFilter])

  const initializeData = async () => {
    try {
      setLoading(true)

      // Get current user from localStorage or set default
      let user = dataManager.getCurrentUser()
      if (!user) {
        // Set default student user
        const defaultStudent = {
          id: "student-1",
          name: localStorage.getItem("userName") || "Alex Smith",
          email: "alex.smith@student.safariacademy.edu",
          role: "student",
          grade: localStorage.getItem("userGrade") || "10",
        }
        dataManager.setCurrentUser(defaultStudent.id)
        user = defaultStudent
      }

      setCurrentUser(user)

      // Load notes for student's grade
      if (user.grade) {
        loadNotes(user.grade)
      }
    } catch (error) {
      console.error("Error initializing data:", error)
    } finally {
      setLoading(false)
    }
  }

  const setupEventListeners = () => {
    dataManager.addEventListener("notes-updated", handleNotesUpdate)
  }

  const handleNotesUpdate = (data: Note[]) => {
    if (currentUser?.grade) {
      loadNotes(currentUser.grade)
    }
  }

  const loadNotes = (userGrade: string) => {
    try {
      // Load teacher notes for student's grade
      const gradeNotes = dataManager.getNotesByGrade(userGrade)
      setTeacherNotes(gradeNotes)

      // Load personal notes (if any - this would be student's own notes)
      // For now, we'll use an empty array as students don't create notes in this version
      setPersonalNotes([])

      console.log(`Loaded ${gradeNotes.length} teacher notes for grade ${userGrade}`)
    } catch (error) {
      console.error("Error loading notes:", error)
      setTeacherNotes([])
      setPersonalNotes([])
    }
  }

  const filterNotes = () => {
    // Filter teacher notes
    let filteredTeacher = teacherNotes

    if (searchTerm) {
      filteredTeacher = filteredTeacher.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.teacherName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (subjectFilter !== "all") {
      filteredTeacher = filteredTeacher.filter((note) => note.subject === subjectFilter)
    }

    setFilteredTeacherNotes(filteredTeacher)

    // Filter personal notes (same logic)
    let filteredPersonal = personalNotes

    if (searchTerm) {
      filteredPersonal = filteredPersonal.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (subjectFilter !== "all") {
      filteredPersonal = filteredPersonal.filter((note) => note.subject === subjectFilter)
    }

    setFilteredPersonalNotes(filteredPersonal)
  }

  const refreshNotes = () => {
    if (currentUser?.grade) {
      loadNotes(currentUser.grade)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  const getUniqueSubjects = () => {
    const subjects = new Set<string>()
    teacherNotes.forEach((note) => subjects.add(note.subject))
    personalNotes.forEach((note) => subjects.add(note.subject))
    return Array.from(subjects).sort()
  }

  const handleNoteClick = (noteId: string) => {
    // Update view count when student clicks on a note
    const note = teacherNotes.find((n) => n.id === noteId)
    if (note) {
      dataManager.updateNote(noteId, { views: note.views + 1 })
    }
  }

  const NoteCard = ({ note, isPersonal = false }: { note: Note; isPersonal?: boolean }) => (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleNoteClick(note.id)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
            <CardDescription className="mt-1">
              <div className="flex items-center gap-2 text-sm">
                {!isPersonal && (
                  <>
                    <UserIcon className="h-3 w-3" />
                    <span>{note.teacherName || "Teacher"}</span>
                    <span>•</span>
                  </>
                )}
                <Calendar className="h-3 w-3" />
                <span>{formatDate(note.createdAt)}</span>
                <span>•</span>
                <Eye className="h-3 w-3" />
                <span>{note.views} views</span>
              </div>
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary">Grade {note.grade}</Badge>
          <Badge variant="outline">{note.subject}</Badge>
          {!isPersonal && <Badge variant="default">Teacher Note</Badge>}
          {isPersonal && <Badge variant="secondary">Personal</Badge>}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
          {note.content.substring(0, 150)}
          {note.content.length > 150 && "..."}
        </p>
        <div className="flex justify-between items-center">
          <Link href={`/student/notes/${note.id}`}>
            <Button variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
              <BookOpen className="h-4 w-4 mr-2" />
              Read More
            </Button>
          </Link>
          <span className="text-xs text-gray-500">{Math.ceil(note.content.length / 200)} min read</span>
        </div>
      </CardContent>
    </Card>
  )

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-48"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Study Notes</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            Access your study materials and teacher resources
            {currentUser?.grade && ` for Grade ${currentUser.grade}`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshNotes} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Link href="/student/notes/create">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Note
            </Button>
          </Link>
        </div>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Find Notes</CardTitle>
          <CardDescription>Search and filter your study materials</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search notes by title, content, subject, or teacher..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {getUniqueSubjects().map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Teacher Notes</p>
                <p className="text-2xl font-bold">{filteredTeacherNotes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserIcon className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Personal Notes</p>
                <p className="text-2xl font-bold">{filteredPersonalNotes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">This Week</p>
                <p className="text-2xl font-bold">
                  {
                    [...filteredTeacherNotes, ...filteredPersonalNotes].filter((note) => {
                      const noteDate = new Date(note.createdAt)
                      const weekAgo = new Date()
                      weekAgo.setDate(weekAgo.getDate() - 7)
                      return noteDate >= weekAgo
                    }).length
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="teacher" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="teacher" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Teacher Notes ({filteredTeacherNotes.length})
          </TabsTrigger>
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <UserIcon className="h-4 w-4" />
            My Notes ({filteredPersonalNotes.length})
          </TabsTrigger>
        </TabsList>

        {/* Teacher Notes */}
        <TabsContent value="teacher" className="space-y-6">
          {filteredTeacherNotes.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredTeacherNotes.map((note) => (
                <NoteCard key={note.id} note={note} isPersonal={false} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Teacher Notes Available</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || subjectFilter !== "all"
                    ? "No teacher notes match your search criteria."
                    : `Your teachers haven't shared any notes for Grade ${currentUser?.grade || "your grade"} yet.`}
                </p>
                {(searchTerm || subjectFilter !== "all") && (
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" onClick={() => setSearchTerm("")}>
                      Clear Search
                    </Button>
                    <Button variant="outline" onClick={() => setSubjectFilter("all")}>
                      Clear Filter
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Personal Notes */}
        <TabsContent value="personal" className="space-y-6">
          {filteredPersonalNotes.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPersonalNotes.map((note) => (
                <NoteCard key={note.id} note={note} isPersonal={true} />
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Personal Notes</h3>
                <p className="text-gray-600 mb-4">
                  {searchTerm || subjectFilter !== "all"
                    ? "No personal notes match your search criteria."
                    : "You haven't created any notes yet. Start by creating your first note!"}
                </p>
                <div className="flex gap-2 justify-center">
                  {(searchTerm || subjectFilter !== "all") && (
                    <>
                      <Button variant="outline" onClick={() => setSearchTerm("")}>
                        Clear Search
                      </Button>
                      <Button variant="outline" onClick={() => setSubjectFilter("all")}>
                        Clear Filter
                      </Button>
                    </>
                  )}
                  <Link href="/student/notes/create">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Note
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
