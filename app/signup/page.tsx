"use client"

import { CardFooter } from "@/components/ui/card"
import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GraduationCap, ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { generateUserId } from "@/lib/user-utils"

export default function SignupPage() {
  const router = useRouter()
  const [role, setRole] = useState<string>("student")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    grade: "1",
    subjects: [] as string[],
    grades: [] as string[],
    childId: "",
    childGrade: "1",
  })
  const [accounts, setAccounts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [studentAccounts, setStudentAccounts] = useState<any[]>([])

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

  const grades = Array.from({ length: 12 }, (_, i) => (i + 1).toString())

  useEffect(() => {
    localStorage.removeItem("teacherNotes")
    localStorage.removeItem("teacherQuizzes")
    localStorage.removeItem("studentNotes")
    localStorage.removeItem("completedQuizzes")

    const storedAccounts = localStorage.getItem("accounts")
    if (storedAccounts) {
      const parsedAccounts = JSON.parse(storedAccounts)
      setAccounts(parsedAccounts)
      const students = parsedAccounts.filter((account: any) => account.role === "student")
      setStudentAccounts(students)
    } else {
      const initialAccounts = [
        {
          email: "safariac1@gmail.com",
          password: "Adminsa",
          role: "admin",
          name: "Admin",
          id: "AD000001",
          phone: "+251911234567",
        },
      ]
      localStorage.setItem("accounts", JSON.stringify(initialAccounts))
      setAccounts(initialAccounts)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubjectChange = (subject: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      subjects: checked ? [...prev.subjects, subject] : prev.subjects.filter((s) => s !== subject),
    }))
  }

  const handleGradeChange = (grade: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      grades: checked ? [...prev.grades, grade] : prev.grades.filter((g) => g !== grade),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    const emailExists = accounts.some((acc) => acc.email === formData.email)
    if (emailExists) {
      toast({
        title: "Email already exists",
        description: "Please use a different email address.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (role === "teacher") {
      if (formData.subjects.length === 0) {
        toast({
          title: "Select subjects",
          description: "Please select at least one subject you teach.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }
      if (formData.grades.length === 0) {
        toast({
          title: "Select grades",
          description: "Please select at least one grade you teach.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }
    }

    if (role === "parent") {
      const childExists = studentAccounts.find((student) => student.id === formData.childId)
      if (!formData.childId) {
        toast({
          title: "Missing Child ID",
          description: "Please enter your child's Student ID to connect accounts.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      if (!childExists) {
        toast({
          title: "Invalid Child ID",
          description: "The Student ID you entered was not found. Please check and try again.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }
    }

    const userId = generateUserId(role)

    const newAccount = {
      id: userId,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: role,
    }

    if (role === "student") {
      newAccount.grade = formData.grade.toString()
    } else if (role === "teacher") {
      newAccount.subjects = formData.subjects
      newAccount.grades = formData.grades
    } else if (role === "parent") {
      const childAccount = studentAccounts.find((student) => student.id === formData.childId)
      if (childAccount) {
        newAccount.childId = formData.childId
        newAccount.childName = childAccount.name
        newAccount.childGrade = childAccount.grade.toString()
      }
    }

    const updatedAccounts = [...accounts, newAccount]
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts))
    setAccounts(updatedAccounts)

    localStorage.setItem("userRole", role)
    localStorage.setItem("userName", formData.name)
    localStorage.setItem("userEmail", formData.email)
    localStorage.setItem("userId", userId)
    localStorage.setItem("userPhone", formData.phone)

    if (role === "student") {
      localStorage.setItem("userGrade", formData.grade.toString())
    }

    if (role === "teacher") {
      localStorage.setItem("userSubjects", JSON.stringify(formData.subjects))
      localStorage.setItem("userGrades", JSON.stringify(formData.grades))
    }

    if (role === "parent") {
      localStorage.setItem("childId", formData.childId)
      const childAccount = studentAccounts.find((student) => student.id === formData.childId)
      if (childAccount) {
        localStorage.setItem("childName", childAccount.name)
        localStorage.setItem("childGrade", childAccount.grade.toString())
      }
    }

    toast({
      title: "Account created successfully",
      description: "Welcome to Safari Academy!",
    })

    setTimeout(() => {
      setIsLoading(false)
      if (role === "student") {
        router.push("/student/dashboard")
      } else if (role === "parent") {
        router.push("/parent/dashboard")
      } else if (role === "teacher") {
        router.push("/teacher/dashboard")
      }
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-green-50 py-4 px-4">
      <div className="container mx-auto max-w-2xl">
        <Link href="/" className="mb-4 inline-flex items-center text-green-600 hover:text-green-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <Card className="w-full">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-xl md:text-2xl">Create an Account</CardTitle>
            <CardDescription>Join Safari Academy today</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="role" className="mb-2 block text-sm font-medium">
                  I am a:
                </Label>
                <RadioGroup id="role" value={role} onValueChange={setRole} className="grid grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student" className="text-sm">
                      Student
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="parent" id="parent" />
                    <Label htmlFor="parent" className="text-sm">
                      Parent
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="teacher" id="teacher" />
                    <Label htmlFor="teacher" className="text-sm">
                      Teacher
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="name" className="mb-2 block text-sm font-medium">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full"
                  required
                />
              </div>

              <div>
                <Label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full"
                  required
                />
              </div>

              <div>
                <Label htmlFor="phone" className="mb-2 block text-sm font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+251 91 234 5678"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="password" className="mb-2 block text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Create password"
                      className="w-full pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm password"
                      className="w-full pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {role === "student" && (
                <div>
                  <Label htmlFor="grade" className="mb-2 block text-sm font-medium">
                    Grade
                  </Label>
                  <Select
                    value={formData.grade}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, grade: value }))}
                  >
                    <SelectTrigger id="grade" className="w-full">
                      <SelectValue placeholder="Select Grade" />
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
              )}

              {role === "teacher" && (
                <>
                  <div>
                    <Label className="mb-2 block text-sm font-medium">Subjects (Select all that you teach)</Label>
                    <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto border rounded-md p-3">
                      {subjects.map((subject) => (
                        <div key={subject} className="flex items-center space-x-2">
                          <Checkbox
                            id={`subject-${subject}`}
                            checked={formData.subjects.includes(subject)}
                            onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                          />
                          <Label htmlFor={`subject-${subject}`} className="text-xs">
                            {subject}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Selected: {formData.subjects.length} subject(s)</p>
                  </div>

                  <div>
                    <Label className="mb-2 block text-sm font-medium">Grades (Select all that you teach)</Label>
                    <div className="grid grid-cols-6 gap-2 border rounded-md p-3">
                      {grades.map((grade) => (
                        <div key={grade} className="flex items-center space-x-1">
                          <Checkbox
                            id={`grade-${grade}`}
                            checked={formData.grades.includes(grade)}
                            onCheckedChange={(checked) => handleGradeChange(grade, checked as boolean)}
                          />
                          <Label htmlFor={`grade-${grade}`} className="text-xs">
                            {grade}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Selected: {formData.grades.length} grade(s)</p>
                  </div>
                </>
              )}

              {role === "parent" && (
                <div>
                  <Label htmlFor="childId" className="mb-2 block text-sm font-medium">
                    Child's Student ID
                  </Label>
                  <Input
                    id="childId"
                    name="childId"
                    value={formData.childId}
                    onChange={handleChange}
                    placeholder="e.g., ST123456"
                    className="w-full"
                    required
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Enter your child's Student ID to connect with their account
                  </p>
                  {studentAccounts.length > 0 && (
                    <p className="mt-2 text-xs text-green-600">
                      {studentAccounts.length} student account(s) available for connection
                    </p>
                  )}
                </div>
              )}

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-green-600 hover:underline">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
