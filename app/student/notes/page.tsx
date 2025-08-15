"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Search, Calendar, User, RefreshCw } from "lucide-react"
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
}

export default function StudentNotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    // Get current user
    const user = JSON.parse(localStorage.getItem("currentUser") || "{}")
    setCurrentUser(user)

    loadNotes()

    // Listen for real-time updates
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "teacherNotes") {
        console.log("Notes updated, reloading...")
        loadNotes()
      }
    }

    // Listen for custom storage events (same tab)
    const handleCustomStorageChange = (e: any) => {
      if (e.key === "teacherNotes") {
        console.log("Notes updated (custom), reloading...")
        loadNotes()
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
  }, [notes, searchTerm, currentUser])

  const loadNotes = () => {
    try {
      setLoading(true)
      const savedNotes = localStorage.getItem("teacherNotes")
      if (savedNotes) {
        const allNotes = JSON.parse(savedNotes)
        console.log("Loaded notes:", allNotes.length)
        setNotes(allNotes)
      } else {
        setNotes([])
      }
    } catch (error) {
      console.error("Error loading notes:", error)
      setNotes([])
    } finally {
      setLoading(false)
    }
  }

  const filterNotes = () => {
    if (!currentUser?.grade) {
      setFilteredNotes([])
      return
    }

    const filtered = notes.filter((note) => {
      // Filter by student's grade
      const gradeMatch = note.grade === currentUser.grade

      // Filter by search term
      const searchMatch =
        searchTerm === "" ||
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase())

      return gradeMatch && searchMatch
    })

    // Sort by creation date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    console.log(`Filtered notes for ${currentUser.grade}:`, filtered.length)
    setFilteredNotes(filtered)
  }

  const refreshNotes = () => {
    loadNotes()
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center py-12">
          <RefreshCw className="w-6 h-6 animate-spin mr-2" />
          <span>Loading notes...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Study Notes</h1>
          <p className="text-muted-foreground">
            Access study materials shared by your teachers
            {currentUser?.grade && ` for ${currentUser.grade}`}
          </p>
        </div>
        <Button onClick={refreshNotes} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search notes by title, subject, or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-muted-foreground">Total Notes</p>
                <p className="text-2xl font-bold">{filteredNotes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-muted-foreground">Your Grade</p>
                <p className="text-2xl font-bold">{currentUser?.grade || "N/A"}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">
                  {
                    filteredNotes.filter((note) => {
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

      {/* Notes List */}
      <div className="grid gap-4">
        {filteredNotes.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Notes Available</h3>
              <p className="text-muted-foreground text-center">
                {searchTerm
                  ? "No notes match your search criteria"
                  : `No study notes have been shared for ${currentUser?.grade || "your grade"} yet`}
              </p>
              {searchTerm && (
                <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-4">
                  Clear Search
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredNotes.map((note) => (
            <Card key={note.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{note.title}</CardTitle>
                    <CardDescription className="flex flex-wrap items-center gap-2 mt-2">
                      <Badge variant="secondary">
                        <BookOpen className="w-3 h-3 mr-1" />
                        {note.subject}
                      </Badge>
                      <Badge variant="outline">
                        <User className="w-3 h-3 mr-1" />
                        {note.teacherName}
                      </Badge>
                      <Badge variant="outline">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(note.createdAt).toLocaleDateString()}
                      </Badge>
                    </CardDescription>
                  </div>
                  <Link href={`/student/notes/${note.id}`}>
                    <Button variant="outline" size="sm">
                      Read Note
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {note.content.substring(0, 200)}
                    {note.content.length > 200 && "..."}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
