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
import { Switch } from "@/components/ui/switch"
import { Trash2, Edit, Plus, BookOpen, Calendar, Users, Search, Eye, RefreshCw } from "lucide-react"
import { toast } from "@/components/ui/toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import DataManager, { type Note, type User } from "@/lib/data-manager"

export default function TeacherNotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterGrade, setFilterGrade] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [editingNote, setEditingNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    subject: "",
    grade: "",
    isPublished: true,
  })

  const dataManager = DataManager.getInstance()

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
    initializeData()
    setupEventListeners()

    return () => {
      // Cleanup event listeners
      dataManager.removeEventListener("notes-updated", handleNotesUpdate)
    }
  }, [])

  useEffect(() => {
    filterNotes()
  }, [notes, searchTerm, filterGrade])

  const initializeData = async () => {
    try {
      setLoading(true)

      // Get current user from localStorage or set default
      let user = dataManager.getCurrentUser()
      if (!user) {
        // Set default teacher user
        const defaultTeacher: User = {
          id: "teacher-1",
          name: localStorage.getItem("userName") || "Sarah Johnson",
          email: "sarah.johnson@safariacademy.edu",
          role: "teacher",
          grade: localStorage.getItem("userGrade") || "10",
          subject: localStorage.getItem("userSubject") || "Mathematics",
        }
        dataManager.setCurrentUser(defaultTeacher.id)
        user = defaultTeacher
      }

      setCurrentUser(user)

      // Set default form values
      setFormData((prev) => ({
        ...prev,
        subject: user?.subject || "Mathematics",
        grade: user?.grade || "10",
      }))

      // Load teacher's notes
      loadNotes(user.id)
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
    if (currentUser) {
      const teacherNotes = dataManager.getNotesByTeacher(currentUser.id)
      setNotes(teacherNotes)
    }
  }

  const loadNotes = (teacherId: string) => {
    try {
      const teacherNotes = dataManager.getNotesByTeacher(teacherId)
      setNotes(teacherNotes)
      console.log(`Loaded ${teacherNotes.length} notes for teacher ${teacherId}`)
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

    if (!currentUser) {
      toast({
        title: "Error",
        description: "User not found",
        variant: "destructive",
      })
      return
    }

    try {
      if (editingNote) {
        // Update existing note
        const updatedNote = dataManager.updateNote(editingNote.id, {
          title: formData.title,
          content: formData.content,
          subject: formData.subject,
          grade: formData.grade,
          isPublished: formData.isPublished,
        })

        if (updatedNote) {
          toast({
            title: "Success",
            description: "Note updated successfully",
          })
          loadNotes(currentUser.id)
        }
        setEditingNote(null)
      } else {
        // Create new note
        const newNote = dataManager.createNote({
          title: formData.title,
          content: formData.content,
          subject: formData.subject,
          grade: formData.grade,
          teacherId: currentUser.id,
          teacherName: currentUser.name,
          isPublished: formData.isPublished,
        })

        toast({
          title: "Success",
          description: "Note created and students have been notified!",
        })
        loadNotes(currentUser.id)
      }

      // Reset form
      setFormData({
        title: "",
        content: "",
        subject: currentUser.subject || "Mathematics",
        grade: currentUser.grade || "10",
        isPublished: true,
      })
      setIsCreateDialogOpen(false)
    } catch (error) {
      console.error("Error saving note:", error)
      toast({
        title: "Error",
        description: "Failed to save note",
        variant: "destructive",
      })
    }
  }

  const handleEdit = (note: Note) => {
    setEditingNote(note)
    setFormData({
      title: note.title,
      content: note.content,
      subject: note.subject,
      grade: note.grade,
      isPublished: note.isPublished,
    })
    setIsCreateDialogOpen(true)
  }

  const handleDelete = (noteId: string) => {
    try {
      const success = dataManager.deleteNote(noteId)
      if (success) {
        toast({
          title: "Success",
          description: "Note deleted successfully",
        })
        if (currentUser) {
          loadNotes(currentUser.id)
        }
      } else {
        toast({
          title: "Error",
          description: "Failed to delete note",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting note:", error)
      toast({
        title: "Error",
        description: "Failed to delete note",
        variant: "destructive",
      })
    }
  }

  const cancelEdit = () => {
    setEditingNote(null)
    setFormData({
      title: "",
      content: "",
      subject: currentUser?.subject || "Mathematics",
      grade: currentUser?.grade || "10",
      isPublished: true,
    })
    setIsCreateDialogOpen(false)
  }

  const refreshNotes = () => {
    if (currentUser) {
      loadNotes(currentUser.id)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    } catch {
      return dateString
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
        <div className="grid gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 rounded-lg h-32"></div>
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
            Create and manage study notes for your students
            {currentUser && ` • ${currentUser.subject} • Grade ${currentUser.grade}`}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshNotes} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            Create Note
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Total Notes</p>
                <p className="text-2xl font-bold">{notes.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Published</p>
                <p className="text-2xl font-bold">{notes.filter((n) => n.isPublished).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Total Views</p>
                <p className="text-2xl font-bold">{notes.reduce((sum, note) => sum + note.views, 0)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              <div>
                <p className="text-sm text-gray-500">This Week</p>
                <p className="text-2xl font-bold">
                  {
                    notes.filter((note) => {
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
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{note.title}</CardTitle>
                      {!note.isPublished && <Badge variant="secondary">Draft</Badge>}
                    </div>
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
                        {formatDate(note.createdAt)}
                      </Badge>
                      <Badge variant="outline">
                        <Eye className="w-3 h-3 mr-1" />
                        {note.views} views
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
                  <p className="whitespace-pre-wrap text-sm text-gray-700 line-clamp-3">{note.content}</p>
                </div>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xs text-gray-500">Last updated: {formatDate(note.updatedAt)}</span>
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

              <div className="flex items-center space-x-2">
                <Switch
                  id="isPublished"
                  checked={formData.isPublished}
                  onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
                />
                <Label htmlFor="isPublished">Publish immediately (students will be notified)</Label>
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
