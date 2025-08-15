"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Plus, BookOpen, Calendar, Users, Search, Filter } from "lucide-react"
import { toast } from "@/components/ui/toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

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
}

export default function TeacherNotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGrade, setFilterGrade] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    subject: "",
    grade: "",
  })
  const [teacherInfo, setTeacherInfo] = useState({
    name: "Loading...",
    subject: "Mathematics",
    grade: "10",
    teacherId: "Loading...",
  })

  const subjects = [
    "Mathematics",
    "English",
    "Science",
    "History",
    "Geography",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Art",
    "Physical Education",
    "Economics",
    "Psychology",
    "Philosophy",
  ]

  const grades = Array.from({ length: 12 }, (_, i) => (i + 1).toString())

  useEffect(() => {
    // Get teacher info
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

    // Set default form values
    setFormData((prev) => ({
      ...prev,
      subject: userSubject,
      grade: userGrade,
    }))

    loadNotes(userId)
  }, [])

  useEffect(() => {
    filterNotes()
  }, [notes, searchTerm, filterGrade])

  const loadNotes = (teacherId: string) => {
    try {
      const storedNotes = JSON.parse(localStorage.getItem("teacherNotes") || "[]")
      const teacherNotes = storedNotes.filter((note: Note) => note.teacherId === teacherId)

      // Sort by creation date (newest first)
      teacherNotes.sort((a: Note, b: Note) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

      setNotes(teacherNotes)
      console.log("Loaded teacher notes:", teacherNotes.length)
    } catch (error) {
      console.error("Error loading notes:", error)
      setNotes([])
    }
  }

  const filterNotes = () => {
    let filtered = notes

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.subject.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filter by grade
    if (filterGrade !== "all") {
      filtered = filtered.filter((note) => note.grade === filterGrade)
    }

    setFilteredNotes(filtered)
  }

  const saveNotes = (updatedNotes: Note[]) => {
    try {
      // Get all notes from localStorage
      const allNotes = JSON.parse(localStorage.getItem("teacherNotes") || "[]")

      // Remove old notes from this teacher
      const otherTeacherNotes = allNotes.filter((note: Note) => note.teacherId !== teacherInfo.teacherId)

      // Add updated notes from this teacher
      const newAllNotes = [...otherTeacherNotes, ...updatedNotes]

      // Save back to localStorage
      localStorage.setItem("teacherNotes", JSON.stringify(newAllNotes))

      // Update local state
      setNotes(updatedNotes)

      // Trigger real-time update for students
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "teacherNotes",
          newValue: JSON.stringify(newAllNotes),
        }),
      )

      console.log("Saved notes to localStorage:", newAllNotes.length)
    } catch (error) {
      console.error("Error saving notes:", error)
    }
  }

  const addStudentNotification = (noteTitle: string, noteGrade: string) => {
    try {
      const existingNotifications = JSON.parse(localStorage.getItem("studentNotifications") || "[]")
      const newNotification = {
        id: `note-${Date.now()}`,
        title: "New Study Material Available",
        message: `Your teacher has shared a new note: "${noteTitle}" for Grade ${noteGrade}`,
        type: "note",
        read: false,
        createdAt: new Date().toISOString(),
        grade: noteGrade,
        noteTitle,
        time: "Just now",
        date: new Date().toLocaleDateString(),
      }

      const updatedNotifications = [newNotification, ...existingNotifications]
      localStorage.setItem("studentNotifications", JSON.stringify(updatedNotifications))

      // Trigger notification update
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "studentNotifications",
          newValue: JSON.stringify(updatedNotifications),
        }),
      )

      console.log("Added student notification:", newNotification)
    } catch (error) {
      console.error("Error adding student notification:", error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.content.trim() || !formData.subject || !formData.grade) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    if (editingNote) {
      // Update existing note
      const updatedNotes = notes.map((note) =>
        note.id === editingNote.id
          ? { ...note, ...formData, teacherId: teacherInfo.teacherId, teacherName: teacherInfo.name }
          : note,
      )
      saveNotes(updatedNotes)

      toast({
        title: "Success",
        description: "Note updated successfully",
      })
      setEditingNote(null)
    } else {
      // Create new note
      const newNote: Note = {
        id: `note-${Date.now()}`,
        ...formData,
        createdAt: new Date().toISOString(),
        teacherId: teacherInfo.teacherId,
        teacherName: teacherInfo.name,
        views: 0,
      }

      const updatedNotes = [newNote, ...notes]
      saveNotes(updatedNotes)

      // Add notification for students
      addStudentNotification(formData.title, formData.grade)

      toast({
        title: "Success",
        description: "Note created and students have been notified!",
      })
    }

    // Reset form
    setFormData({
      title: "",
      content: "",
      subject: teacherInfo.subject,
      grade: teacherInfo.grade,
    })
    setIsCreateDialogOpen(false)
  }

  const handleEdit = (note: Note) => {
    setEditingNote(note)
    setFormData({
      title: note.title,
      content: note.content,
      subject: note.subject,
      grade: note.grade,
    })
    setIsCreateDialogOpen(true)
  }

  const handleDelete = (noteId: string) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId)
    saveNotes(updatedNotes)

    toast({
      title: "Success",
      description: "Note deleted successfully",
    })
  }

  const cancelEdit = () => {
    setEditingNote(null)
    setFormData({
      title: "",
      content: "",
      subject: teacherInfo.subject,
      grade: teacherInfo.grade,
    })
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Study Notes</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">Create and manage study notes for your students</p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Create Note
        </Button>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Notes</CardTitle>
          <CardDescription>Search and filter your study notes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search notes by title, content, or subject..."
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
                {grades.map((grade) => (
                  <SelectItem key={grade} value={grade}>
                    Grade {grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notes List */}
      <div className="grid gap-4">
        {filteredNotes.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {searchTerm || filterGrade !== "all" ? "No notes found" : "No notes created yet"}
              </h3>
              <p className="text-gray-600 text-center mb-4">
                {searchTerm || filterGrade !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Create your first study note to share with students"}
              </p>
              {!searchTerm && filterGrade === "all" && (
                <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Note
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
                        <Users className="w-3 h-3 mr-1" />
                        Grade {note.grade}
                      </Badge>
                      <Badge variant="outline">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(note.createdAt).toLocaleDateString()}
                      </Badge>
                      {note.views !== undefined && <Badge variant="outline">{note.views} views</Badge>}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(note)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(note.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-sm text-gray-700 line-clamp-3">{note.content}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Created by {note.teacherName}</span>
                  <Button variant="link" className="text-green-600 p-0 h-auto">
                    View Full Note
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Create/Edit Note Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{editingNote ? "Edit Note" : "Create New Note"}</DialogTitle>
            <DialogDescription>
              {editingNote ? "Update the note details" : "Share study materials with your students"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Note Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter note title"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Select
                    value={formData.subject}
                    onValueChange={(value) => setFormData({ ...formData, subject: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="grade">Grade Level *</Label>
                  <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {grades.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          Grade {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content">Note Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter the note content..."
                  rows={8}
                  required
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={cancelEdit}>
                Cancel
              </Button>
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                {editingNote ? "Update Note" : "Create Note"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
