"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { ArrowLeft, Edit, Trash2, BookOpen, Tag, Calendar, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

interface Note {
  id: string
  title: string
  content: string
  subject: string
  grade: string
  createdAt: string
  createdBy?: string
  teacherName?: string
  studentName?: string
}

export default function NoteDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [note, setNote] = useState<Note | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!params.id) return

    const loadNote = () => {
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
        const foundNote = allNotes.find((n) => n.id === params.id)

        if (foundNote) {
          setNote(foundNote)
        } else {
          toast({
            title: "Note not found",
            description: "The requested note could not be found.",
            variant: "destructive",
          })
          router.push("/student/notes")
        }
      } catch (error) {
        console.error("Error loading note:", error)
        toast({
          title: "Error",
          description: "Failed to load the note.",
          variant: "destructive",
        })
        router.push("/student/notes")
      } finally {
        setLoading(false)
      }
    }

    loadNote()
  }, [params.id, router])

  const handleDelete = () => {
    if (!note || note.teacherName) {
      toast({
        title: "Cannot delete",
        description: "You can only delete your own notes.",
        variant: "destructive",
      })
      return
    }

    try {
      const storedNotes = localStorage.getItem("studentNotes")
      if (storedNotes) {
        const notes = JSON.parse(storedNotes)
        const updatedNotes = notes.filter((n: Note) => n.id !== note.id)
        localStorage.setItem("studentNotes", JSON.stringify(updatedNotes))
      }

      toast({
        title: "Note deleted",
        description: "Your note has been successfully deleted.",
      })

      router.push("/student/notes")
    } catch (error) {
      console.error("Error deleting note:", error)
      toast({
        title: "Error",
        description: "Failed to delete the note.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
          <p className="text-gray-500">Loading note...</p>
        </div>
      </div>
    )
  }

  if (!note) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Note not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-green-600" />
            <h1 className="text-lg font-bold md:text-xl truncate">{note.title}</h1>
          </div>
        </div>
        {!note.teacherName && (
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Note</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to delete this note? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-4xl p-4 md:p-6">
        <Card className="shadow-md">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-2xl mb-2">{note.title}</CardTitle>
                <CardDescription className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <Tag className="mr-1 h-4 w-4" />
                    {note.subject}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(note.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center">
                    <User className="mr-1 h-4 w-4" />
                    {note.teacherName ? `${note.teacherName} (Teacher)` : note.studentName || "Personal Note"}
                  </div>
                </CardDescription>
              </div>
              <div className="flex flex-col items-end gap-2">
                {note.teacherName && (
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    Class Note
                  </Badge>
                )}
                {note.grade && <Badge variant="secondary">Grade {note.grade}</Badge>}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">{note.content}</div>
            </div>
          </CardContent>
        </Card>

        {note.teacherName && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Class Note Information</h3>
            <p className="text-sm text-blue-800">
              This note was created by your teacher and is shared with all students in Grade {note.grade}. You cannot
              edit or delete class notes.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
