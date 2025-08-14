"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function CreateNotePage() {
  const router = useRouter()
  const [studentInfo, setStudentInfo] = useState({
    name: "Loading...",
    grade: "10",
    studentId: "Loading...",
  })

  const [noteData, setNoteData] = useState({
    title: "",
    subject: "Mathematics",
    content: "",
    tags: "",
  })

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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNoteData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!noteData.title.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your note.",
        variant: "destructive",
      })
      return
    }

    if (!noteData.content.trim()) {
      toast({
        title: "Missing content",
        description: "Please provide content for your note.",
        variant: "destructive",
      })
      return
    }

    const newNote = {
      id: `note-${Date.now()}`,
      title: noteData.title,
      subject: noteData.subject,
      content: noteData.content,
      tags: noteData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      updatedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      studentName: studentInfo.name,
      studentId: studentInfo.studentId,
      grade: studentInfo.grade,
      type: "personal", // Personal note created by student
    }

    if (typeof window !== "undefined") {
      const existingNotes = JSON.parse(localStorage.getItem("studentPersonalNotes") || "[]")
      localStorage.setItem("studentPersonalNotes", JSON.stringify([newNote, ...existingNotes]))
    }

    toast({
      title: "Note created",
      description: "Your personal note has been successfully created.",
    })

    router.push("/student/notes")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-2 sm:px-4 md:px-6 shadow-sm">
        <div className="flex items-center min-w-0 flex-1">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
          <h1 className="text-sm sm:text-lg font-bold md:text-xl truncate">Create New Note</h1>
        </div>
        <Button onClick={handleSubmit} className="bg-blue-600 hover:bg-blue-700 text-xs sm:text-sm">
          <Save className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          <span className="hidden sm:inline">Save Note</span>
          <span className="sm:hidden">Save</span>
        </Button>
      </header>

      <main className="mx-auto max-w-4xl p-2 sm:p-4 md:p-6">
        <form onSubmit={handleSubmit}>
          <Card className="mb-4 sm:mb-6 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                <div>
                  <CardTitle className="text-lg sm:text-xl">Personal Study Note</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Create your own study notes and references
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="grid gap-4 sm:gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Note Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={noteData.title}
                    onChange={handleInputChange}
                    placeholder="Enter a descriptive title for your note"
                    className="w-full"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </Label>
                  <Select
                    value={noteData.subject}
                    onValueChange={(value) => setNoteData((prev) => ({ ...prev, subject: value }))}
                  >
                    <SelectTrigger id="subject" className="w-full">
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
                  <Label htmlFor="tags" className="text-sm font-medium">
                    Tags (Optional)
                  </Label>
                  <Input
                    id="tags"
                    name="tags"
                    value={noteData.tags}
                    onChange={handleInputChange}
                    placeholder="Enter tags separated by commas (e.g., algebra, equations, formulas)"
                    className="w-full"
                  />
                  <p className="text-xs text-gray-500">Tags help you organize and find your notes easily</p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="content" className="text-sm font-medium">
                    Note Content
                  </Label>
                  <Textarea
                    id="content"
                    name="content"
                    value={noteData.content}
                    onChange={handleInputChange}
                    placeholder="Write your study notes here... You can include key concepts, formulas, examples, or any important information you want to remember."
                    rows={12}
                    className="w-full resize-none"
                    required
                  />
                  <p className="text-xs text-gray-500">Write detailed notes to help you study and review later</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
            <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              <Save className="mr-2 h-4 w-4" />
              Save Note
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
