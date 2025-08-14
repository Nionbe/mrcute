"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Plus, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import Link from "next/link"

export default function CreateNotePage() {
  const router = useRouter()
  const [studentInfo, setStudentInfo] = useState({
    name: "Loading...",
    grade: "10",
    studentId: "Loading...",
  })

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    content: "",
    tags: [] as string[],
    isPrivate: true,
  })
  const [newTag, setNewTag] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const subjects = [
    "English",
    "Mathematics",
    "General Science",
    "Biology",
    "Chemistry",
    "Physics",
    "Geography",
    "History",
    "Civics and Ethical Education",
    "Economics",
    "Information Technology (ICT)",
    "Moral and Civic Education",
    "Physical Education (P.E.)",
    "Agriculture",
    "Computer Science",
    "Art",
    "Music",
    "Physical Education",
    "Economics",
    "Psychology",
    "Philosophy",
  ]

  useEffect(() => {
    if (typeof window === "undefined") return

    const userName = localStorage.getItem("userName") || "Student"
    const userId = localStorage.getItem("userId") || "ST123456"
    const userGrade = localStorage.getItem("userGrade") || "10"

    setStudentInfo({
      name: userName,
      grade: userGrade,
      studentId: userId,
    })
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubjectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!formData.title || !formData.subject || !formData.content) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      // Generate note ID
      const noteId = `note_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      // Create note object
      const noteData = {
        id: noteId,
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        authorId: localStorage.getItem("userId") || "unknown",
        authorName: localStorage.getItem("userName") || "Student",
      }

      // Get existing notes from localStorage
      const existingNotes = JSON.parse(localStorage.getItem("studentNotes") || "[]")

      // Add new note
      const updatedNotes = [noteData, ...existingNotes]

      // Save to localStorage
      localStorage.setItem("studentNotes", JSON.stringify(updatedNotes))

      toast({
        title: "Success!",
        description: "Your note has been created successfully.",
      })

      // Redirect to notes list
      router.push("/student/notes")
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create note. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <Link href="/student/notes">
          <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Back to Notes</span>
          </Button>
        </Link>
        <h1 className="text-base font-semibold sm:text-lg md:text-xl">Create New Note</h1>
      </header>

      <main className="flex-1 space-y-4 p-4 sm:space-y-6 sm:p-6">
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Create Study Note</CardTitle>
            <CardDescription className="text-sm sm:text-base">
              Create a personal study note to help with your learning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Note Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Enter note title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="text-sm sm:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-sm font-medium">
                    Subject <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={handleSubjectChange} required>
                    <SelectTrigger className="text-sm sm:text-base">
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
                <Label htmlFor="content" className="text-sm font-medium">
                  Note Content <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your note content here..."
                  value={formData.content}
                  onChange={handleInputChange}
                  required
                  rows={12}
                  className="text-sm sm:text-base resize-none"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium">Tags (Optional)</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1 text-xs">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 hover:bg-transparent"
                        onClick={() => removeTag(tag)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                    className="text-sm sm:text-base"
                  />
                  <Button type="button" variant="outline" onClick={addTag} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:justify-between">
                <div className="text-xs text-gray-500 sm:text-sm">
                  <p>This note will be saved as a private study note.</p>
                  <p>Only you can view and edit this note.</p>
                </div>
                <div className="flex gap-2">
                  <Link href="/student/notes">
                    <Button type="button" variant="outline" className="text-sm sm:text-base bg-transparent">
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
                    disabled={isLoading}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? "Saving..." : "Save Note"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
