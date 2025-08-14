"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { BookOpen, Search, Plus, FileText, Edit, Trash2, Check, X, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function TeacherNotesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGrade, setFilterGrade] = useState("all")
  const [teacherInfo, setTeacherInfo] = useState({
    name: "Loading...",
    subject: "Mathematics",
    grade: "10",
    teacherId: "Loading...",
  })
  const [notes, setNotes] = useState([])
  const [editingNote, setEditingNote] = useState<null | {
    id: string
    title: string
    content: string
    grade: string
    subject: string
  }>(null)
  const [newNote, setNewNote] = useState({
    title: "",
    content: "",
    grade: "10",
    subject: "Mathematics",
  })
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

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

    // Set default values for new note
    setNewNote((prev) => ({
      ...prev,
      subject: userSubject,
      grade: userGrade,
    }))

    // Load notes from localStorage
    const storedNotes = localStorage.getItem("teacherNotes")
    if (storedNotes) {
      try {
        const parsedNotes = JSON.parse(storedNotes)
        // Filter notes by this teacher
        const teacherNotes = parsedNotes.filter((note) => note.teacherId === userId)
        if (teacherNotes.length > 0) {
          setNotes(teacherNotes)
        }
      } catch (error) {
        console.error("Error parsing stored notes:", error)
      }
    }
  }, [])

  const handleAddNote = () => {
    if (!newNote.title || !newNote.content) {
      toast({
        title: "Missing information",
        description: "Please provide both title and content for the note.",
        variant: "destructive",
      })
      return
    }

    const newNoteObj = {
      id: `note-${Date.now()}`, // Use timestamp for unique ID
      title: newNote.title,
      content: newNote.content,
      grade: newNote.grade,
      subject: newNote.subject,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      views: 0,
      teacher: teacherInfo.name,
      teacherId: teacherInfo.teacherId,
    }

    // Update local state
    const updatedNotes = [newNoteObj, ...notes]
    setNotes(updatedNotes)

    // Store in localStorage - get ALL notes, not just this teacher's
    const existingNotes = JSON.parse(localStorage.getItem("teacherNotes") || "[]")
    const updatedAllNotes = [newNoteObj, ...existingNotes]
    localStorage.setItem("teacherNotes", JSON.stringify(updatedAllNotes))

    // Log for debugging
    console.log("Added note:", newNoteObj)
    console.log("All notes in localStorage:", updatedAllNotes)

    setNewNote({
      title: "",
      content: "",
      grade: teacherInfo.grade,
      subject: teacherInfo.subject,
    })
    setIsAddDialogOpen(false)

    // Show success message
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 5000)

    toast({
      title: "Note created",
      description: `Your note has been successfully created and shared with Grade ${newNote.grade} students.`,
    })
  }

  const handleEditNote = (note) => {
    setEditingNote({
      id: note.id,
      title: note.title,
      content: note.content,
      grade: note.grade,
      subject: note.subject,
    })
  }

  const handleSaveEdit = () => {
    if (!editingNote) return

    const updatedNotes = notes.map((note) =>
      note.id === editingNote.id
        ? {
            ...note,
            title: editingNote.title,
            content: editingNote.content,
            grade: editingNote.grade,
            subject: editingNote.subject,
          }
        : note,
    )

    setNotes(updatedNotes)

    // Update in localStorage
    const existingNotes = JSON.parse(localStorage.getItem("teacherNotes") || "[]")
    const updatedStoredNotes = existingNotes.map((note) =>
      note.id === editingNote.id
        ? {
            ...note,
            title: editingNote.title,
            content: editingNote.content,
            grade: editingNote.grade,
            subject: editingNote.subject,
          }
        : note,
    )
    localStorage.setItem("teacherNotes", JSON.stringify(updatedStoredNotes))

    setEditingNote(null)

    toast({
      title: "Note updated",
      description: `Your note has been successfully updated and shared with Grade ${editingNote.grade} students.`,
    })
  }

  const handleDeleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id)
    setNotes(updatedNotes)

    // Remove from localStorage
    const existingNotes = JSON.parse(localStorage.getItem("teacherNotes") || "[]")
    const updatedStoredNotes = existingNotes.filter((note) => note.id !== id)
    localStorage.setItem("teacherNotes", JSON.stringify(updatedStoredNotes))

    toast({
      title: "Note deleted",
      description: "Your note has been successfully deleted.",
    })
  }

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesGrade = filterGrade === "all" || note.grade === filterGrade
    return matchesSearch && matchesGrade
  })

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="teacher" />

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <h1 className="text-lg font-bold md:text-xl">Teaching Notes</h1>
          <div className="flex items-center gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Note
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Create New Note</DialogTitle>
                  <DialogDescription>Create a new teaching note for your students.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={newNote.title}
                      onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                      placeholder="Enter note title"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="grade">Grade Level</Label>
                      <Select value={newNote.grade} onValueChange={(value) => setNewNote({ ...newNote, grade: value })}>
                        <SelectTrigger id="grade">
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Grade 1</SelectItem>
                          <SelectItem value="2">Grade 2</SelectItem>
                          <SelectItem value="3">Grade 3</SelectItem>
                          <SelectItem value="4">Grade 4</SelectItem>
                          <SelectItem value="5">Grade 5</SelectItem>
                          <SelectItem value="6">Grade 6</SelectItem>
                          <SelectItem value="7">Grade 7</SelectItem>
                          <SelectItem value="8">Grade 8</SelectItem>
                          <SelectItem value="9">Grade 9</SelectItem>
                          <SelectItem value="10">Grade 10</SelectItem>
                          <SelectItem value="11">Grade 11</SelectItem>
                          <SelectItem value="12">Grade 12</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select
                        value={newNote.subject}
                        onValueChange={(value) => setNewNote({ ...newNote, subject: value })}
                      >
                        <SelectTrigger id="subject">
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="English">English</SelectItem>
                          <SelectItem value="Mathematics">Mathematics</SelectItem>
                          <SelectItem value="General Science">General Science</SelectItem>
                          <SelectItem value="Biology">Biology</SelectItem>
                          <SelectItem value="Chemistry">Chemistry</SelectItem>
                          <SelectItem value="Physics">Physics</SelectItem>
                          <SelectItem value="Geography">Geography</SelectItem>
                          <SelectItem value="History">History</SelectItem>
                          <SelectItem value="Civics and Ethical Education">Civics and Ethical Education</SelectItem>
                          <SelectItem value="Economics">Economics</SelectItem>
                          <SelectItem value="Information Technology (ICT)">Information Technology (ICT)</SelectItem>
                          <SelectItem value="Moral and Civic Education">Moral and Civic Education</SelectItem>
                          <SelectItem value="Physical Education (P.E.)">Physical Education (P.E.)</SelectItem>
                          <SelectItem value="Agriculture">Agriculture</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={newNote.content}
                      onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                      placeholder="Enter note content"
                      className="min-h-[200px]"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddNote} className="bg-green-600 hover:bg-green-700">
                    Create Note
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </header>

        <main className="mx-auto max-w-6xl p-4 md:p-6">
          {showSuccess && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <AlertCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-600">Note Published Successfully</AlertTitle>
              <AlertDescription>
                Your note has been published and is now visible to students in Grade {newNote.grade}.
              </AlertDescription>
            </Alert>
          )}

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Manage Teaching Notes</CardTitle>
              <CardDescription>Create and manage notes for your students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search notes..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterGrade} onValueChange={setFilterGrade}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by grade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Grades</SelectItem>
                    <SelectItem value="1">Grade 1</SelectItem>
                    <SelectItem value="2">Grade 2</SelectItem>
                    <SelectItem value="3">Grade 3</SelectItem>
                    <SelectItem value="4">Grade 4</SelectItem>
                    <SelectItem value="5">Grade 5</SelectItem>
                    <SelectItem value="6">Grade 6</SelectItem>
                    <SelectItem value="7">Grade 7</SelectItem>
                    <SelectItem value="8">Grade 8</SelectItem>
                    <SelectItem value="9">Grade 9</SelectItem>
                    <SelectItem value="10">Grade 10</SelectItem>
                    <SelectItem value="11">Grade 11</SelectItem>
                    <SelectItem value="12">Grade 12</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {filteredNotes.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <BookOpen className="mb-2 h-10 w-10 text-gray-400" />
                <h3 className="text-lg font-medium">No notes found</h3>
                <p className="text-sm text-gray-500">
                  No notes match your search criteria. Try adjusting your filters or create a new note.
                </p>
              </div>
            ) : (
              filteredNotes.map((note) => (
                <Card key={note.id} className="overflow-hidden shadow-md hover:shadow-lg">
                  {editingNote && editingNote.id === note.id ? (
                    <CardContent className="p-4">
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor={`edit-title-${note.id}`}>Title</Label>
                          <Input
                            id={`edit-title-${note.id}`}
                            value={editingNote.title}
                            onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor={`edit-grade-${note.id}`}>Grade Level</Label>
                            <Select
                              value={editingNote.grade}
                              onValueChange={(value) => setEditingNote({ ...editingNote, grade: value })}
                            >
                              <SelectTrigger id={`edit-grade-${note.id}`}>
                                <SelectValue placeholder="Select grade" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">Grade 1</SelectItem>
                                <SelectItem value="2">Grade 2</SelectItem>
                                <SelectItem value="3">Grade 3</SelectItem>
                                <SelectItem value="4">Grade 4</SelectItem>
                                <SelectItem value="5">Grade 5</SelectItem>
                                <SelectItem value="6">Grade 6</SelectItem>
                                <SelectItem value="7">Grade 7</SelectItem>
                                <SelectItem value="8">Grade 8</SelectItem>
                                <SelectItem value="9">Grade 9</SelectItem>
                                <SelectItem value="10">Grade 10</SelectItem>
                                <SelectItem value="11">Grade 11</SelectItem>
                                <SelectItem value="12">Grade 12</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor={`edit-subject-${note.id}`}>Subject</Label>
                            <Select
                              value={editingNote.subject}
                              onValueChange={(value) => setEditingNote({ ...editingNote, subject: value })}
                            >
                              <SelectTrigger id={`edit-subject-${note.id}`}>
                                <SelectValue placeholder="Select subject" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="English">English</SelectItem>
                                <SelectItem value="Mathematics">Mathematics</SelectItem>
                                <SelectItem value="General Science">General Science</SelectItem>
                                <SelectItem value="Biology">Biology</SelectItem>
                                <SelectItem value="Chemistry">Chemistry</SelectItem>
                                <SelectItem value="Physics">Physics</SelectItem>
                                <SelectItem value="Geography">Geography</SelectItem>
                                <SelectItem value="History">History</SelectItem>
                                <SelectItem value="Civics and Ethical Education">
                                  Civics and Ethical Education
                                </SelectItem>
                                <SelectItem value="Economics">Economics</SelectItem>
                                <SelectItem value="Information Technology (ICT)">
                                  Information Technology (ICT)
                                </SelectItem>
                                <SelectItem value="Moral and Civic Education">Moral and Civic Education</SelectItem>
                                <SelectItem value="Physical Education (P.E.)">Physical Education (P.E.)</SelectItem>
                                <SelectItem value="Agriculture">Agriculture</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor={`edit-content-${note.id}`}>Content</Label>
                          <Textarea
                            id={`edit-content-${note.id}`}
                            value={editingNote.content}
                            onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                            className="min-h-[150px]"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => setEditingNote(null)}>
                            <X className="mr-2 h-4 w-4" />
                            Cancel
                          </Button>
                          <Button size="sm" onClick={handleSaveEdit} className="bg-green-600 hover:bg-green-700">
                            <Check className="mr-2 h-4 w-4" />
                            Save Changes
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  ) : (
                    <>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{note.title}</CardTitle>
                            <CardDescription>
                              {note.subject} • Grade {note.grade} • {note.date}
                            </CardDescription>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="icon" onClick={() => handleEditNote(note)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="icon" onClick={() => handleDeleteNote(note.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700">{note.content}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            <FileText className="mr-1 inline-block h-4 w-4" />
                            {note.views} views
                          </span>
                          <div className="flex items-center">
                            <span className="mr-2 text-sm text-gray-500">Visible to: Grade {note.grade} students</span>
                            <Button variant="link" className="text-green-600 p-0">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </>
                  )}
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

const Label = ({
  htmlFor,
  children,
  className = "",
}: {
  htmlFor: string
  children: React.ReactNode
  className?: string
}) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </label>
)
