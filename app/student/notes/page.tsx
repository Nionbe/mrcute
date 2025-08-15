"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Search, Calendar, User, RefreshCw, Plus, Eye } from "lucide-react"
import Link from "next/link"

interface Note {
  id: string
  title: string
  content: string
  subject: string
  grade: string
  createdAt: string
  teacherId: string
  teacherName: string
  views?: number
  isPersonal?: boolean
}

export default function StudentNotesPage() {
  const [teacherNotes, setTeacherNotes] = useState<Note[]>([])
  const [personalNotes, setPersonalNotes] = useState<Note[]>([])
  const [filteredTeacherNotes, setFilteredTeacherNotes] = useState<Note[]>([])
  const [filteredPersonalNotes, setFilteredPersonalNotes] = useState<Note[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    // Get current user
    const userName = localStorage.getItem("userName") || "Student"
    const userGrade = localStorage.getItem("userGrade") || "10"
    const userId = localStorage.getItem("userId") || "ST123456"

    setCurrentUser({
      name: userName,
      grade: userGrade,
      id: userId,
    })

    loadNotes(userGrade)

    // Listen for real-time updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "teacherNotes") {
        console.log("Teacher notes updated, reloading...")
        loadNotes(userGrade)
      } else if (e.key === "studentNotes") {
        console.log("Student notes updated, reloading...")
        loadPersonalNotes()
      }
    }

    // Listen for custom storage events (same tab)
    const handleCustomStorageChange = (e: any) => {
      if (e.key === "teacherNotes") {
        console.log("Teacher notes updated (custom), reloading...")
        loadNotes(userGrade)
      } else if (e.key === "studentNotes") {
        console.log("Student notes updated (custom), reloading...")
        loadPersonalNotes()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    window.addEventListener("storage", handleCustomStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("storage", handleCustomStorageChange)
    }
  }, [])

  useEffect(() => {
    filterNotes()
  }, [teacherNotes, personalNotes, searchTerm])

  const loadNotes = (userGrade: string) => {
    try {
      setLoading(true)

      // Load teacher notes
      const savedTeacherNotes = localStorage.getItem("teacherNotes")
      if (savedTeacherNotes) {
        const allTeacherNotes = JSON.parse(savedTeacherNotes)

        // Filter by student's grade
        const filteredNotes = allTeacherNotes.filter((note: Note) => {
          return note.grade === userGrade || note.grade === "all"
        })

        // Sort by creation date (newest first)
        filteredNotes.sort((a: Note, b: Note) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        console.log(`Loaded ${filteredNotes.length} teacher notes for grade ${userGrade}`)
        setTeacherNotes(filteredNotes)
      } else {
        setTeacherNotes([])
      }

      // Load personal notes
      loadPersonalNotes()
    } catch (error) {
      console.error("Error loading notes:", error)
      setTeacherNotes([])
      setPersonalNotes([])
    } finally {
      setLoading(false)
    }
  }

  const loadPersonalNotes = () => {
    try {
      const savedPersonalNotes = localStorage.getItem("studentNotes")
      if (savedPersonalNotes) {
        const allPersonalNotes = JSON.parse(savedPersonalNotes)

        // Filter by current user
        const userNotes = allPersonalNotes.filter((note: Note) => note.teacherId === currentUser?.id)

        // Sort by creation date (newest first)
        userNotes.sort((a: Note, b: Note) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        console.log(`Loaded ${userNotes.length} personal notes`)
        setPersonalNotes(userNotes)
      } else {
        setPersonalNotes([])
      }
    } catch (error) {
      console.error("Error loading personal notes:", error)
      setPersonalNotes([])
    }
  }

  const filterNotes = () => {
    // Filter teacher notes
    let filteredTeacher = teacherNotes
    if (searchTerm) {
      filteredTeacher = teacherNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.teacherName.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    setFilteredTeacherNotes(filteredTeacher)

    // Filter personal notes
    let filteredPersonal = personalNotes
    if (searchTerm) {
      filteredPersonal = personalNotes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase()),
      )
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

  const NoteCard = ({ note, isPersonal = false }: { note: Note; isPersonal?: boolean }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
            <CardDescription className="mt-1">
              <div className="flex items-center gap-2 text-sm">
                {!isPersonal && (
                  <>
                    <User className="h-3 w-3" />
                    <span>{note.teacherName || "Teacher"}</span>
                    <span>•</span>
                  </>
                )}
                <Calendar className="h-3 w-3" />
                <span>{formatDate(note.createdAt)}</span>
                {note.views !== undefined && (
                  <>
                    <span>•</span>
                    <Eye className="h-3 w-3" />
                    <span>{note.views} views</span>
                  </>
                )}
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
            <Button variant="outline" size="sm">
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
            Access your personal notes and teacher resources
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

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

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
              <User className="w-5 h-5 text-green-500" />
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
            <User className="h-4 w-4" />
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
                  {searchTerm
                    ? "No teacher notes match your search criteria."
                    : `Your teachers haven't shared any notes for Grade ${currentUser?.grade || "your grade"} yet.`}
                </p>
                {searchTerm && (
                  <Button variant="outline" onClick={() => setSearchTerm("")}>
                    Clear Search
                  </Button>
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
                  {searchTerm
                    ? "No personal notes match your search criteria."
                    : "You haven't created any notes yet. Start by creating your first note!"}
                </p>
                <div className="flex gap-2 justify-center">
                  {searchTerm && (
                    <Button variant="outline" onClick={() => setSearchTerm("")}>
                      Clear Search
                    </Button>
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
