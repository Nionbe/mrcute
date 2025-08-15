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
import { Trash2, Edit, Plus, BookOpen, Calendar, Users } from "lucide-react"
import { toast } from "@/components/ui/toast"

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

export default function TeacherNotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    subject: "",
    grade: "",
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
  ]

  const grades = Array.from({ length: 12 }, (_, i) => `Grade ${i + 1}`)

  useEffect(() => {
    loadNotes()
  }, [])

  const loadNotes = () => {
    try {
      const savedNotes = localStorage.getItem("teacherNotes")
      if (savedNotes) {
        setNotes(JSON.parse(savedNotes))
      }
    } catch (error) {
      console.error("Error loading notes:", error)
    }
  }

  const saveNotes = (updatedNotes: Note[]) => {
    try {
      localStorage.setItem("teacherNotes", JSON.stringify(updatedNotes))
      setNotes(updatedNotes)

      // Trigger real-time update for students
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "teacherNotes",
          newValue: JSON.stringify(updatedNotes),
        }),
      )
    } catch (error) {
      console.error("Error saving notes:", error)
    }
  }

  const addStudentNotification = (noteTitle: string, noteGrade: string) => {
    try {
      const existingNotifications = JSON.parse(localStorage.getItem("studentNotifications") || "[]")
      const newNotification = {
        id: Date.now().toString(),
        title: "New Study Note Available",
        message: `Your teacher has shared a new note: "${noteTitle}" for ${noteGrade}`,
        type: "note",
        read: false,
        createdAt: new Date().toISOString(),
        grade: noteGrade,
        noteTitle,
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

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

    if (editingNote) {
      // Update existing note
      const updatedNotes = notes.map((note) => (note.id === editingNote.id ? { ...note, ...formData } : note))
      saveNotes(updatedNotes)
      toast({
        title: "Success",
        description: "Note updated successfully",
      })
      setEditingNote(null)
    } else {
      // Create new note
      const newNote: Note = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        teacherId: currentUser.id || "teacher1",
        teacherName: currentUser.name || "Teacher",
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
    setFormData({ title: "", content: "", subject: "", grade: "" })
    setIsCreating(false)
  }

  const handleEdit = (note: Note) => {
    setEditingNote(note)
    setFormData({
      title: note.title,
      content: note.content,
      subject: note.subject,
      grade: note.grade,
    })
    setIsCreating(true)
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
    setFormData({ title: "", content: "", subject: "", grade: "" })
    setIsCreating(false)
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Study Notes</h1>
          <p className="text-muted-foreground">Create and manage study notes for your students</p>
        </div>
        <Button onClick={() => setIsCreating(true)} className="w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          Create Note
        </Button>
      </div>

      {/* Create/Edit Note Form */}
      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{editingNote ? "Edit Note" : "Create New Note"}</CardTitle>
            <CardDescription>
              {editingNote ? "Update the note details" : "Share study materials with your students"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Note Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter note title"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
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
              </div>

              <div className="space-y-2">
                <Label htmlFor="grade">Grade Level</Label>
                <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                  <SelectContent>
                    {grades.map((grade) => (
                      <SelectItem key={grade} value={grade}>
                        {grade}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Note Content</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Enter the note content..."
                  rows={8}
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button type="submit" className="flex-1">
                  {editingNote ? "Update Note" : "Create Note"}
                </Button>
                <Button type="button" variant="outline" onClick={cancelEdit} className="flex-1 bg-transparent">
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Notes List */}
      <div className="grid gap-4">
        {notes.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Notes Yet</h3>
              <p className="text-muted-foreground text-center mb-4">
                Create your first study note to share with students
              </p>
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Note
              </Button>
            </CardContent>
          </Card>
        ) : (
          notes.map((note) => (
            <Card key={note.id}>
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
                        {note.grade}
                      </Badge>
                      <Badge variant="outline">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(note.createdAt).toLocaleDateString()}
                      </Badge>
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
                  <p className="whitespace-pre-wrap text-sm">{note.content}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
