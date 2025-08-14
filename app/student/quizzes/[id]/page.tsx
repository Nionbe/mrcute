"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Clock, AlertCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

export default function QuizPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({})
  const [timeLeft, setTimeLeft] = useState(2700) // 45 minutes in seconds
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false)
  const [isTimeWarningOpen, setIsTimeWarningOpen] = useState(false)
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false)
  const [quizScore, setQuizScore] = useState(0)
  const [quiz, setQuiz] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  // Load quiz data on component mount
  useEffect(() => {
    const loadQuiz = () => {
      // First check if this is a teacher quiz
      const teacherQuizzes = JSON.parse(localStorage.getItem("teacherQuizzes") || "[]")
      const teacherQuiz = teacherQuizzes.find((q: any) => q.id === params.id)

      if (teacherQuiz) {
        console.log("Found teacher quiz:", teacherQuiz)

        // Format the quiz data to match our expected structure
        const formattedQuiz = {
          id: teacherQuiz.id,
          subject: teacherQuiz.subject,
          topic: teacherQuiz.title,
          timeLimit: teacherQuiz.timeLimit || "45",
          questions: teacherQuiz.questions.map((q: any) => ({
            id: q.id,
            question: q.text,
            options:
              q.type === "multiple-choice"
                ? q.options.map((opt: string, idx: number) => ({ id: idx.toString(), text: opt }))
                : [
                    { id: "true", text: "True" },
                    { id: "false", text: "False" },
                  ],
            correctAnswer: q.correctAnswer,
          })),
          teacherName: teacherQuiz.teacherName || "Teacher",
        }

        setQuiz(formattedQuiz)
        // Set time limit based on the quiz data
        setTimeLeft(Number.parseInt(formattedQuiz.timeLimit) * 60)
        setLoading(false)
        return
      }

      // If not found, use default quiz data
      console.log("Quiz not found, using default data")
      setQuiz({
        id: params.id,
        subject: "Mathematics",
        topic: "Algebra II",
        timeLimit: "45 min",
        questions: [
          {
            id: 1,
            question: "What is the solution to the equation 2x + 5 = 13?",
            options: [
              { id: "a", text: "x = 3" },
              { id: "b", text: "x = 4" },
              { id: "c", text: "x = 5" },
              { id: "d", text: "x = 6" },
            ],
            correctAnswer: "b",
          },
          {
            id: 2,
            question: "Simplify the expression: 3(2x - 4) + 5",
            options: [
              { id: "a", text: "6x - 12 + 5" },
              { id: "b", text: "6x - 7" },
              { id: "c", text: "6x - 12" },
              { id: "d", text: "6x - 7 + 5" },
            ],
            correctAnswer: "b",
          },
          {
            id: 3,
            question: "Factor the expression: x² - 9",
            options: [
              { id: "a", text: "(x - 3)(x + 3)" },
              { id: "b", text: "(x - 9)(x + 1)" },
              { id: "c", text: "(x - 3)²" },
              { id: "d", text: "(x - 3)(x - 3)" },
            ],
            correctAnswer: "a",
          },
          {
            id: 4,
            question: "Solve for x: 3x - 7 = 5x + 3",
            options: [
              { id: "a", text: "x = -5" },
              { id: "b", text: "x = 5" },
              { id: "c", text: "x = -4" },
              { id: "d", text: "x = 4" },
            ],
            correctAnswer: "a",
          },
          {
            id: 5,
            question: "What is the slope of the line passing through the points (2, 3) and (4, 7)?",
            options: [
              { id: "a", text: "1" },
              { id: "b", text: "2" },
              { id: "c", text: "3" },
              { id: "d", text: "4" },
            ],
            correctAnswer: "b",
          },
        ],
      })
      setLoading(false)
    }

    loadQuiz()
  }, [params.id])

  // Timer effect
  useEffect(() => {
    if (!quiz) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 300 && prev > 299) {
          // 5 minutes warning
          setIsTimeWarningOpen(true)
        }

        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [quiz])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestion]: answerId,
    })
  }

  const handleNextQuestion = () => {
    if (quiz && currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitQuiz = () => {
    if (!quiz) return

    // Calculate score
    let correctAnswers = 0
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++
      }
    })

    const score = Math.round((correctAnswers / quiz.questions.length) * 100)
    setQuizScore(score)

    // Save quiz result to localStorage
    const quizResults = JSON.parse(localStorage.getItem("quizResults") || "[]")
    quizResults.push({
      id: quiz.id,
      title: `${quiz.subject}: ${quiz.topic}`,
      subject: quiz.subject,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      score: score,
      totalQuestions: quiz.questions.length,
      correctAnswers: correctAnswers,
      timeSpent: `${Math.floor((Number.parseInt(quiz.timeLimit) * 60 - timeLeft) / 60)} min`,
      status: score >= 60 ? "Passed" : "Failed",
    })
    localStorage.setItem("quizResults", JSON.stringify(quizResults))

    // Show result dialog
    setIsSubmitDialogOpen(false)
    setIsResultDialogOpen(true)
  }

  const handleViewAllQuizzes = () => {
    router.push("/student/quizzes")
  }

  const handleViewResults = () => {
    router.push("/student/results")
  }

  if (loading || !quiz) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <DashboardSidebar role="student" />
        <div className="flex-1 md:ml-64">
          <div className="flex h-full items-center justify-center">
            <p>Loading quiz...</p>
          </div>
        </div>
      </div>
    )
  }

  const currentQuestionData = quiz.questions[currentQuestion]
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="student" />

      <div className="flex-1 md:ml-64">
        <div className="p-4 md:p-6">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold md:text-2xl">
                  {quiz.subject}: {quiz.topic}
                </h1>
                <p className="text-sm text-gray-500">
                  Question {currentQuestion + 1} of {quiz.questions.length}
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow">
                <Clock className="h-4 w-4 text-gray-500" />
                <span className={`font-medium ${timeLeft < 300 ? "text-red-500" : "text-gray-700"}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>

            <Progress value={progress} className="mb-6 h-2" />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">{currentQuestionData.question}</CardTitle>
                <CardDescription>Select the correct answer from the options below</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedAnswers[currentQuestion] || ""}
                  onValueChange={handleAnswerSelect}
                  className="space-y-3"
                >
                  {currentQuestionData.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-gray-50">
                      <RadioGroupItem value={option.id} id={`option-${option.id}`} />
                      <Label htmlFor={`option-${option.id}`} className="flex-1 cursor-pointer">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
                  Previous
                </Button>
                <div className="flex gap-2">
                  {currentQuestion === quiz.questions.length - 1 ? (
                    <Button onClick={() => setIsSubmitDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
                      Submit Quiz
                    </Button>
                  ) : (
                    <Button onClick={handleNextQuestion} disabled={!selectedAnswers[currentQuestion]}>
                      Next
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>

            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {quiz.questions.map((_, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className={`h-8 w-8 p-0 ${
                    index === currentQuestion
                      ? "border-green-600 bg-green-50 text-green-600"
                      : selectedAnswers[index]
                        ? "bg-gray-100"
                        : ""
                  }`}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Confirmation Dialog */}
        <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Submit Quiz?</DialogTitle>
              <DialogDescription>
                Are you sure you want to submit your quiz? You won't be able to change your answers after submission.
              </DialogDescription>
            </DialogHeader>
            <div className="py-2">
              <p className="text-sm text-gray-500">
                You have answered {Object.keys(selectedAnswers).length} out of {quiz.questions.length} questions.
                {Object.keys(selectedAnswers).length < quiz.questions.length && (
                  <span className="mt-2 block font-medium text-amber-600">
                    Warning: You have {quiz.questions.length - Object.keys(selectedAnswers).length} unanswered
                    questions.
                  </span>
                )}
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitQuiz} className="bg-green-600 hover:bg-green-700">
                Submit Quiz
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Time Warning Dialog */}
        <Dialog open={isTimeWarningOpen} onOpenChange={setIsTimeWarningOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center text-amber-600">
                <AlertCircle className="mr-2 h-5 w-5" />
                Time Warning
              </DialogTitle>
              <DialogDescription>You have less than 5 minutes remaining to complete this quiz.</DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setIsTimeWarningOpen(false)}>Continue Quiz</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Results Dialog */}
        <Dialog open={isResultDialogOpen} onOpenChange={setIsResultDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center">Quiz Results</DialogTitle>
              <DialogDescription>
                You have completed the {quiz.subject}: {quiz.topic} quiz.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full border-4 border-green-100 text-center">
                  <span className="text-3xl font-bold text-green-600">{quizScore}%</span>
                </div>
              </div>
              <p className="text-lg font-medium">
                {quizScore >= 80 ? "Excellent work!" : quizScore >= 60 ? "Good job!" : "Keep practicing!"}
              </p>
              <p className="mt-2 text-sm text-gray-500">
                You answered{" "}
                {
                  Object.keys(selectedAnswers).filter(
                    (key) =>
                      selectedAnswers[Number.parseInt(key)] === quiz.questions[Number.parseInt(key)].correctAnswer,
                  ).length
                }{" "}
                out of {quiz.questions.length} questions correctly.
              </p>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={handleViewAllQuizzes} className="w-full sm:w-auto">
                Take Another Quiz
              </Button>
              <Button onClick={handleViewResults} className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                View All Results
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
