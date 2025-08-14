"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Plus, Minus, ArrowLeft, Save } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CreateQuizPage() {
  const router = useRouter()
  const [teacherInfo, setTeacherInfo] = useState({
    name: "Loading...",
    subject: "Mathematics",
    grade: "10",
    teacherId: "Loading...",
  })

  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    subject: "Mathematics",
    grade: "10",
    timeLimit: 30,
    showAnswersAfterCompletion: true,
    showCorrectAnswers: true,
    allowRetakes: false,
    randomizeQuestions: false,
    questions: [
      {
        id: 1,
        text: "",
        type: "multiple-choice",
        options: ["", "", "", ""],
        correctAnswer: 0,
        explanation: "",
      },
    ],
  })

  useEffect(() => {
    if (typeof window === "undefined") return

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

    setQuizData((prev) => ({
      ...prev,
      subject: userSubject,
      grade: userGrade,
    }))
  }, [])

  const handleQuizDataChange = (e) => {
    const { name, value } = e.target
    setQuizData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSwitchChange = (field: string, checked: boolean) => {
    setQuizData((prev) => ({
      ...prev,
      [field]: checked,
    }))
  }

  const handleQuestionChange = (questionId, field, value) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              [field]: value,
            }
          : q,
      ),
    }))
  }

  const handleOptionChange = (questionId, optionIndex, value) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt, idx) => (idx === optionIndex ? value : opt)),
            }
          : q,
      ),
    }))
  }

  const handleCorrectAnswerChange = (questionId, value) => {
    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              correctAnswer: Number.parseInt(value),
            }
          : q,
      ),
    }))
  }

  const addQuestion = () => {
    const newQuestionId = quizData.questions.length > 0 ? Math.max(...quizData.questions.map((q) => q.id)) + 1 : 1
    setQuizData((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          id: newQuestionId,
          text: "",
          type: "multiple-choice",
          options: ["", "", "", ""],
          correctAnswer: 0,
          explanation: "",
        },
      ],
    }))
  }

  const removeQuestion = (questionId) => {
    if (quizData.questions.length <= 1) {
      toast({
        title: "Cannot remove question",
        description: "A quiz must have at least one question.",
        variant: "destructive",
      })
      return
    }

    setQuizData((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!quizData.title.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for the quiz.",
        variant: "destructive",
      })
      return
    }

    if (!quizData.description.trim()) {
      toast({
        title: "Missing description",
        description: "Please provide a description for the quiz.",
        variant: "destructive",
      })
      return
    }

    for (const question of quizData.questions) {
      if (!question.text.trim()) {
        toast({
          title: "Incomplete question",
          description: "Please provide text for all questions.",
          variant: "destructive",
        })
        return
      }

      if (question.type === "multiple-choice") {
        for (const option of question.options) {
          if (!option.trim()) {
            toast({
              title: "Incomplete options",
              description: "Please provide text for all options in multiple choice questions.",
              variant: "destructive",
            })
            return
          }
        }
      }
    }

    const newQuiz = {
      id: `quiz-${Date.now()}`,
      title: quizData.title,
      description: quizData.description,
      subject: quizData.subject,
      grade: quizData.grade,
      timeLimit: Number.parseInt(quizData.timeLimit),
      showAnswersAfterCompletion: quizData.showAnswersAfterCompletion,
      showCorrectAnswers: quizData.showCorrectAnswers,
      allowRetakes: quizData.allowRetakes,
      randomizeQuestions: quizData.randomizeQuestions,
      questions: quizData.questions,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      teacherName: teacherInfo.name,
      teacherId: teacherInfo.teacherId,
    }

    if (typeof window !== "undefined") {
      const existingQuizzes = JSON.parse(localStorage.getItem("teacherQuizzes") || "[]")
      localStorage.setItem("teacherQuizzes", JSON.stringify([newQuiz, ...existingQuizzes]))
      localStorage.setItem("newlyCreatedQuiz", JSON.stringify(newQuiz))
    }

    toast({
      title: "Quiz created",
      description: `Your quiz has been successfully created and shared with Grade ${quizData.grade} students.`,
    })

    router.push("/teacher/quizzes")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-bold md:text-xl">Create New Quiz</h1>
        </div>
        <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
          <Save className="mr-2 h-4 w-4" />
          Save Quiz
        </Button>
      </header>

      <main className="mx-auto max-w-4xl p-4 md:p-6">
        <form onSubmit={handleSubmit}>
          <Card className="mb-6 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Quiz Details</CardTitle>
              <CardDescription>Provide basic information about your quiz</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                  <TabsTrigger value="visibility">Answer Visibility</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="title">Quiz Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={quizData.title}
                      onChange={handleQuizDataChange}
                      placeholder="Enter quiz title"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={quizData.description}
                      onChange={handleQuizDataChange}
                      placeholder="Enter quiz description"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="grid gap-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select
                        value={quizData.subject}
                        onValueChange={(value) => setQuizData((prev) => ({ ...prev, subject: value }))}
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
                    <div className="grid gap-2">
                      <Label htmlFor="grade">Grade Level</Label>
                      <Select
                        value={quizData.grade}
                        onValueChange={(value) => setQuizData((prev) => ({ ...prev, grade: value }))}
                      >
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
                      <Label htmlFor="timeLimit">Time Limit (minutes)</Label>
                      <Input
                        id="timeLimit"
                        name="timeLimit"
                        type="number"
                        min="1"
                        max="120"
                        value={quizData.timeLimit}
                        onChange={handleQuizDataChange}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Allow Retakes</Label>
                        <p className="text-sm text-gray-500">Allow students to retake this quiz</p>
                      </div>
                      <Switch
                        checked={quizData.allowRetakes}
                        onCheckedChange={(checked) => handleSwitchChange("allowRetakes", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Randomize Questions</Label>
                        <p className="text-sm text-gray-500">Show questions in random order</p>
                      </div>
                      <Switch
                        checked={quizData.randomizeQuestions}
                        onCheckedChange={(checked) => handleSwitchChange("randomizeQuestions", checked)}
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="visibility" className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Answers After Completion</Label>
                        <p className="text-sm text-gray-500">Display quiz results immediately after submission</p>
                      </div>
                      <Switch
                        checked={quizData.showAnswersAfterCompletion}
                        onCheckedChange={(checked) => handleSwitchChange("showAnswersAfterCompletion", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Show Correct Answers</Label>
                        <p className="text-sm text-gray-500">Show which answers were correct/incorrect</p>
                      </div>
                      <Switch
                        checked={quizData.showCorrectAnswers}
                        onCheckedChange={(checked) => handleSwitchChange("showCorrectAnswers", checked)}
                        disabled={!quizData.showAnswersAfterCompletion}
                      />
                    </div>
                    {!quizData.showAnswersAfterCompletion && (
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                        <p className="text-sm text-yellow-800">
                          When "Show Answers After Completion" is disabled, students will only see their score without
                          detailed feedback.
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Questions</h2>
            <Button type="button" onClick={addQuestion} className="bg-green-600 hover:bg-green-700">
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>

          {quizData.questions.map((question, questionIndex) => (
            <Card key={question.id} className="mb-6 shadow-md hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Question {questionIndex + 1}</CardTitle>
                  <CardDescription>
                    {question.type === "multiple-choice" ? "Multiple Choice" : "True/False"}
                  </CardDescription>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeQuestion(question.id)}
                  className="h-8 w-8 text-red-500"
                >
                  <Minus className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor={`question-${question.id}`}>Question Text</Label>
                  <Textarea
                    id={`question-${question.id}`}
                    value={question.text}
                    onChange={(e) => handleQuestionChange(question.id, "text", e.target.value)}
                    placeholder="Enter question text"
                    rows={2}
                  />
                </div>

                <div className="grid gap-2">
                  <Label>Question Type</Label>
                  <Select
                    value={question.type}
                    onValueChange={(value) => handleQuestionChange(question.id, "type", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple-choice">Multiple Choice</SelectItem>
                      <SelectItem value="true-false">True/False</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {question.type === "multiple-choice" ? (
                  <div className="space-y-4">
                    <Label>Options</Label>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center gap-2">
                        <RadioGroup
                          value={question.correctAnswer.toString()}
                          onValueChange={(value) => handleCorrectAnswerChange(question.id, value)}
                          className="flex items-center"
                        >
                          <RadioGroupItem value={optionIndex.toString()} id={`q${question.id}-opt${optionIndex}`} />
                        </RadioGroup>
                        <Input
                          value={option}
                          onChange={(e) => handleOptionChange(question.id, optionIndex, e.target.value)}
                          placeholder={`Option ${optionIndex + 1}`}
                          className="flex-1"
                        />
                      </div>
                    ))}
                    <p className="text-xs text-gray-500">Select the radio button next to the correct answer</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>Correct Answer</Label>
                    <RadioGroup
                      value={question.correctAnswer.toString()}
                      onValueChange={(value) => handleCorrectAnswerChange(question.id, value)}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="0" id={`q${question.id}-true`} />
                        <Label htmlFor={`q${question.id}-true`}>True</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1" id={`q${question.id}-false`} />
                        <Label htmlFor={`q${question.id}-false`}>False</Label>
                      </div>
                    </RadioGroup>
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor={`explanation-${question.id}`}>Explanation (Optional)</Label>
                  <Textarea
                    id={`explanation-${question.id}`}
                    value={question.explanation}
                    onChange={(e) => handleQuestionChange(question.id, "explanation", e.target.value)}
                    placeholder="Provide an explanation for the correct answer"
                    rows={2}
                  />
                  <p className="text-xs text-gray-500">
                    This will be shown to students if answer visibility is enabled
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}

          <div className="mt-6 flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              <Save className="mr-2 h-4 w-4" />
              Save Quiz
            </Button>
          </div>
        </form>
      </main>
    </div>
  )
}
