"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Bookmark, BookmarkCheck, Share, Printer, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

export default function NotePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [note, setNote] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Load note data on component mount
  useEffect(() => {
    const loadNote = () => {
      // First check if this is a teacher note
      const teacherNotes = JSON.parse(localStorage.getItem("teacherNotes") || "[]")
      const teacherNote = teacherNotes.find((n: any) => n.id === params.id)

      if (teacherNote) {
        console.log("Found teacher note:", teacherNote)
        setNote({
          id: teacherNote.id,
          title: teacherNote.title,
          subject: teacherNote.subject,
          grade: teacherNote.grade,
          date: teacherNote.date,
          teacher: teacherNote.teacher || "Teacher",
          content: teacherNote.content,
        })
        setLoading(false)
        return
      }

      // If not found in teacher notes, check student notes
      const studentNotes = JSON.parse(localStorage.getItem("studentNotes") || "[]")
      const studentNote = studentNotes.find((n: any) => n.id === params.id)

      if (studentNote) {
        console.log("Found student note:", studentNote)
        setNote({
          id: studentNote.id,
          title: studentNote.title,
          subject: studentNote.subject,
          grade: studentNote.grade,
          date: studentNote.date,
          teacher: "Personal Note",
          content: studentNote.content,
        })
        setLoading(false)
        return
      }

      // If we still don't have a note, use default data
      console.log("Note not found, using default data")
      setNote({
        id: params.id,
        title: "World War II Overview",
        subject: "History",
        grade: "10",
        date: "Apr 10, 2025",
        teacher: "Mr. Thompson",
        content: `
          <h2>World War II (1939-1945)</h2>
          
          <p>World War II was a global war that lasted from 1939 to 1945. It involved the vast majority of the world's countries—including all of the great powers—forming two opposing military alliances: the Allies and the Axis.</p>
          
          <h3>Key Events:</h3>
          
          <ul>
            <li><strong>September 1, 1939</strong>: Germany invades Poland, marking the beginning of World War II in Europe.</li>
            <li><strong>December 7, 1941</strong>: Japan attacks Pearl Harbor, leading to the United States' entry into the war.</li>
            <li><strong>June 6, 1944</strong>: D-Day landings in Normandy, France.</li>
            <li><strong>May 8, 1945</strong>: Victory in Europe (VE) Day.</li>
            <li><strong>August 6 and 9, 1945</strong>: Atomic bombings of Hiroshima and Nagasaki.</li>
            <li><strong>September 2, 1945</strong>: Japan formally surrenders, ending World War II.</li>
          </ul>
          
          <h3>Major Figures:</h3>
          
          <p><strong>Allied Leaders:</strong></p>
          <ul>
            <li>Franklin D. Roosevelt (United States)</li>
            <li>Winston Churchill (United Kingdom)</li>
            <li>Joseph Stalin (Soviet Union)</li>
          </ul>
          
          <p><strong>Axis Leaders:</strong></p>
          <ul>
            <li>Adolf Hitler (Germany)</li>
            <li>Benito Mussolini (Italy)</li>
            <li>Hideki Tojo (Japan)</li>
          </ul>
          
          <h3>Impact and Legacy:</h3>
          
          <p>World War II resulted in an estimated 70-85 million fatalities, making it the deadliest conflict in human history. The war led to significant political changes, including the decline of European colonial empires and the beginning of the Cold War between the United States and the Soviet Union.</p>
          
          <p>The United Nations was established to foster international cooperation and prevent future conflicts. The war also accelerated technological developments, including nuclear weapons, radar, jet engines, and electronic computers.</p>
        `,
      })
      setLoading(false)
    }

    // Check if this note is bookmarked
    const checkBookmark = () => {
      const existingBookmarks = JSON.parse(localStorage.getItem("bookmarkedNotes") || "[]")
      const isCurrentNoteBookmarked = existingBookmarks.some((bookmark: any) => bookmark.id === params.id)
      setIsBookmarked(isCurrentNoteBookmarked)
    }

    loadNote()
    checkBookmark()
  }, [params.id])

  const handleBookmark = () => {
    if (!note) return

    // Get existing bookmarks from localStorage or initialize empty array
    const existingBookmarks = JSON.parse(localStorage.getItem("bookmarkedNotes") || "[]")

    if (!isBookmarked) {
      // Add this note to bookmarks
      existingBookmarks.push({
        id: note.id,
        title: note.title,
        subject: note.subject,
        date: note.date,
        teacher: note.teacher,
      })
      localStorage.setItem("bookmarkedNotes", JSON.stringify(existingBookmarks))

      toast({
        title: "Note Bookmarked",
        description: "This note has been added to your bookmarks.",
      })
    } else {
      // Remove this note from bookmarks
      const updatedBookmarks = existingBookmarks.filter((bookmark: any) => bookmark.id !== note.id)
      localStorage.setItem("bookmarkedNotes", JSON.stringify(updatedBookmarks))

      toast({
        title: "Bookmark Removed",
        description: "This note has been removed from your bookmarks.",
      })
    }

    setIsBookmarked(!isBookmarked)
  }

  const handleShare = () => {
    // Copy the URL to clipboard
    navigator.clipboard.writeText(window.location.href)

    toast({
      title: "Share Link Copied",
      description: "Link to this note has been copied to your clipboard.",
    })
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real app, you would generate a PDF here
    // For now, we'll just show a toast
    toast({
      title: "Note Downloaded",
      description: "The note has been downloaded as a PDF.",
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar role="student" />
        <div className="flex-1 md:ml-64">
          <div className="flex h-full items-center justify-center">
            <p>Loading note...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!note) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar role="student" />
        <div className="flex-1 md:ml-64">
          <div className="flex h-full flex-col items-center justify-center p-6">
            <h2 className="mb-2 text-xl font-bold">Note Not Found</h2>
            <p className="mb-4 text-gray-600">The note you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => router.push("/student/notes")}>Back to Notes</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="student" />

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <div className="flex items-center">
            <Link href="/student/notes" className="mr-4">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-lg font-bold md:text-xl">Note Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={handleBookmark}>
              {isBookmarked ? <BookmarkCheck className="h-5 w-5 text-green-600" /> : <Bookmark className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handlePrint}>
              <Printer className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleDownload}>
              <Download className="h-5 w-5" />
            </Button>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <Card>
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <Badge className="bg-green-500">{note.subject}</Badge>
                  <span className="text-sm text-gray-500">Grade {note.grade}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">Posted on {note.date}</span>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">By {note.teacher}</span>
                </div>
                <h1 className="text-2xl font-bold md:text-3xl">{note.title}</h1>
              </div>

              <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: note.content }} />
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
