"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Book, Search, Tag, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Note {
  id: string
  title: string
  content: string
  subject: string
  grade: string
  createdAt: string
  createdBy?: string
  teacherName?: string
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [userGrade, setUserGrade] = useState<string>("10")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // Get user grade from localStorage
    const grade = localStorage.getItem("userGrade")
    if (grade) {
      setUserGrade(grade)
    }

    // Load notes from localStorage
    const loadNotes = () => {
      try {
        // Load student's personal notes
        const storedNotes = localStorage.getItem("studentNotes")
        let personalNotes: Note[] = []

        if (storedNotes) {
          personalNotes = JSON.parse(storedNotes)
        }

        // Load teacher's notes
        const teacherNotes = localStorage.getItem("teacherNotes")
        let classNotes: Note[] = []

        if (teacherNotes) {
          classNotes = JSON.parse(teacherNotes)
        }

        // Combine both types of notes
        const allNotes = [...personalNotes, ...classNotes]
        setNotes(allNotes)
      } catch (error) {
        console.error("Error loading notes:", error)
        setNotes([])
      }
    }

    loadNotes()

    // Set up event listener for storage changes
    window.addEventListener("storage", loadNotes)

    return () => {
      window.removeEventListener("storage", loadNotes)
    }
  }, [])

  // Filter notes based on search query, tab, and user's grade
  const filteredNotes = notes.filter((note) => {
    // First filter by search query
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.subject.toLowerCase().includes(searchQuery.toLowerCase())

    // Then filter by tab selection
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "personal" && !note.teacherName) ||
      (activeTab === "class" && note.teacherName)

    // Then filter by grade - teacher notes should match student's grade
    const matchesGrade =
      !note.teacherName || // Personal notes don't need grade matching
      (note.teacherName && note.grade === userGrade.toString()) // Teacher notes must match grade

    return matchesSearch && matchesTab && matchesGrade
  })

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Notes</h1>
          <p className="text-gray-500">Access and manage your study notes</p>
        </div>
        <Link href="/student/notes/create">
          <Button className="mt-4 bg-green-600 hover:bg-green-700 md:mt-0">
            <Plus className="mr-2 h-4 w-4" />
            Create New Note
          </Button>
        </Link>
      </div>

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search notes..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Notes</TabsTrigger>
            <TabsTrigger value="personal">My Notes</TabsTrigger>
            <TabsTrigger value="class">Class Notes</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <Book className="mb-4 h-12 w-12 text-gray-400" />
          <h3 className="mb-1 text-lg font-medium">No notes found</h3>
          <p className="text-sm text-gray-500">
            {searchQuery
              ? "No notes match your search criteria"
              : activeTab === "personal"
                ? "You haven't created any personal notes yet"
                : activeTab === "class"
                  ? "No class notes available for your grade"
                  : "Start by creating your first note"}
          </p>
          {!searchQuery && activeTab !== "class" && (
            <Link href="/student/notes/create">
              <Button className="mt-4 bg-green-600 hover:bg-green-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Note
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map((note) => (
            <Link key={note.id} href={`/student/notes/${note.id}`}>
              <Card className="h-full cursor-pointer transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="line-clamp-2">{note.title}</CardTitle>
                    {note.teacherName && (
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        Class Note
                      </Badge>
                    )}
                  </div>
                  <CardDescription className="flex items-center">
                    <Tag className="mr-1 h-3 w-3" />
                    {note.subject}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-sm text-gray-500">{note.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between text-xs text-gray-500">
                  <span>{note.teacherName ? `By: ${note.teacherName}` : "Personal Note"}</span>
                  <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
