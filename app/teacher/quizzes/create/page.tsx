"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Save, ArrowLeft } from "lucide-react"
import { toast } from "@/components/ui/toast"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

interface Quiz {
  id: string
  title: string
  description: string
  subject: string
  grade: string
  timeLimit: number
  questions: Question[]
  showAnswers: boolean
  createdAt: string
  teacherId: string
  teacherName: string
}

export default function CreateQuizPage() {
  const router = useRouter()
  const [quiz, setQuiz] = useState<Partial<Quiz>>({
    title: "",
    description: "",
    subject: "",
    grade: "",
    timeLimit: 30,
    questions: [],
    showAnswers: true,
  })

  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0,
    explanation: "",
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

  const addStudentNotification = (quizTitle: string, quizGrade: string) => {
    try {
      const existingNotifications = JSON.parse(localStorage.getItem("studentNotifications") || "[]")
      const newNotification = {
        id: Date.now().toString(),
        title: "New Quiz Available",
        message: `Your teacher has created a new quiz: "${quizTitle}" for ${quizGrade}`,
        type: "quiz",
        read: false,
        createdAt: new Date().toISOString(),
        grade: quizGrade,
        quizTitle,
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

  const addQuestion = () => {
    if (!currentQuestion.question?.trim()) {
      toast({
        title: "Error",
        description: "Please enter a question",
        variant: "destructive",
      })
      return
    }

    const validOptions = currentQuestion.options?.filter((opt) => opt.trim()) || []
    if (validOptions.length < 2) {
      toast({
        title: "Error",
        description: "Please provide at least 2 options",
        variant: "destructive",
      })
      return
    }

    const newQuestion: Question = {
      id: Date.now().toString(),
      question: currentQuestion.question!,
      options: currentQuestion.options!,
      correctAnswer: currentQuestion.correctAnswer!,
      explanation: currentQuestion.explanation,
    }

    setQuiz((prev) => ({
      ...prev,
      questions: [...(prev.questions || []), newQuestion],
    }))

    // Reset current question
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
      explanation: "",
    })

    toast({
      title: "Success",
      description: "Question added successfully",
    })
  }

  const removeQuestion = (questionId: string) => {
    setQuiz((prev) => ({
      ...prev,
      questions: prev.questions?.filter((q) => q.id !== questionId) || [],
    }))
  }

  const saveQuiz = () => {
    if (!quiz.title?.trim() || !quiz.subject || !quiz.grade) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    if (!quiz.questions?.length) {
      toast({
        title: "Error",
        description: "Please add at least one question",
        variant: "destructive",
      })
      return
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")

    const newQuiz: Quiz = {
      id: Date.now().toString(),
      title: quiz.title!,
      description: quiz.description || "",
      subject: quiz.subject!,
      grade: quiz.grade!,
      timeLimit: quiz.timeLimit || 30,
      questions: quiz.questions!,
      showAnswers: quiz.showAnswers || false,
      createdAt: new Date().toISOString(),
      teacherId: currentUser.id || "teacher1",
      teacherName: currentUser.name || "Teacher",
    }

    try {
      const existingQuizzes = JSON.parse(localStorage.getItem("teacherQuizzes") || "[]")
      const updatedQuizzes = [newQuiz, ...existingQuizzes]
      localStorage.setItem("teacherQuizzes", JSON.stringify(updatedQuizzes))

      // Add notification for students
      addStudentNotification(quiz.title!, quiz.grade!)

      // Trigger real-time update
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "teacherQuizzes",
          newValue: JSON.stringify(updatedQuizzes),
        }),
      )

      toast({
        title: "Success",
        description: "Quiz created and students have been notified!",
      })

      router.push("/teacher/quizzes")
    } catch (error) {
      console.error("Error saving quiz:", error)
      toast({
        title: "Error",
        description: "Failed to save quiz",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Create Quiz</h1>
          <p className="text-muted-foreground">Create a new quiz for your students</p>
        </div>
      </div>

      {/* Quiz Details */}
      <Card>
        <CardHeader>
          <CardTitle>Quiz Details</CardTitle>
          <CardDescription>Basic information about your quiz</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Quiz Title *</Label>
              <Input
                id="title"
                value={quiz.title}
                onChange={(e) => setQuiz((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter quiz title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
              <Input
                id="timeLimit"
                type="number"
                value={quiz.timeLimit}
                onChange={(e) => setQuiz((prev) => ({ ...prev, timeLimit: Number.parseInt(e.target.value) }))}
                min="1"
                max="180"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Select value={quiz.subject} onValueChange={(value) => setQuiz((prev) => ({ ...prev, subject: value }))}>
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
            <div className="space-y-2">
              <Label htmlFor="grade">Grade Level *</Label>
              <Select value={quiz.grade} onValueChange={(value) => setQuiz((prev) => ({ ...prev, grade: value }))}>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={quiz.description}
              onChange={(e) => setQuiz((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Enter quiz description (optional)"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="showAnswers"
              checked={quiz.showAnswers}
              onCheckedChange={(checked) => setQuiz((prev) => ({ ...prev, showAnswers: checked as boolean }))}
            />
            <Label htmlFor="showAnswers">Show correct answers after completion</Label>
          </div>
        </CardContent>
      </Card>

      {/* Add Question */}
      <Card>
        <CardHeader>
          <CardTitle>Add Question</CardTitle>
          <CardDescription>Create questions for your quiz</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question">Question</Label>
            <Textarea
              id="question"
              value={currentQuestion.question}
              onChange={(e) => setCurrentQuestion((prev) => ({ ...prev, question: e.target.value }))}
              placeholder="Enter your question"
              rows={3}
            />
          </div>

          <div className="space-y-4">
            <Label>Answer Options</Label>
            {currentQuestion.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  checked={currentQuestion.correctAnswer === index}
                  onCheckedChange={() => setCurrentQuestion((prev) => ({ ...prev, correctAnswer: index }))}
                />
                <Input
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...(currentQuestion.options || [])]
                    newOptions[index] = e.target.value
                    setCurrentQuestion((prev) => ({ ...prev, options: newOptions }))
                  }}
                  placeholder={`Option ${index + 1}`}
                />
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <Label htmlFor="explanation">Explanation (Optional)</Label>
            <Textarea
              id="explanation"
              value={currentQuestion.explanation}
              onChange={(e) => setCurrentQuestion((prev) => ({ ...prev, explanation: e.target.value }))}
              placeholder="Explain why this is the correct answer"
              rows={2}
            />
          </div>

          <Button onClick={addQuestion} className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
        </CardContent>
      </Card>

      {/* Questions List */}
      {quiz.questions && quiz.questions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Questions ({quiz.questions.length})</CardTitle>
            <CardDescription>Review your quiz questions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quiz.questions.map((question, index) => (
              <div key={question.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">Question {index + 1}</Badge>
                  <Button variant="outline" size="sm" onClick={() => removeQuestion(question.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <p className="font-medium mb-2">{question.question}</p>
                <div className="space-y-1">
                  {question.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className={`text-sm p-2 rounded ${
                        optIndex === question.correctAnswer ? "bg-green-100 text-green-800" : "bg-gray-50"
                      }`}
                    >
                      {optIndex === question.correctAnswer && "✓ "}
                      {option}
                    </div>
                  ))}
                </div>
                {question.explanation && (
                  <p className="text-sm text-muted-foreground mt-2">
                    <strong>Explanation:</strong> {question.explanation}
                  </p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Save Quiz */}
      <div className="flex justify-end">
        <Button onClick={saveQuiz} size="lg">
          <Save className="w-4 h-4 mr-2" />
          Create Quiz
        </Button>
      </div>
    </div>
  )
}
