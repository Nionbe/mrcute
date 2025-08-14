"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { GraduationCap, Eye, EyeOff } from "lucide-react"

export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    grade: "",
    childName: "",
    childGrade: "",
    subjects: [] as string[],
    grades: [] as string[],
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const generateUserId = (role: string) => {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.floor(Math.random() * 100)
      .toString()
      .padStart(2, "0")
    const prefix = role === "student" ? "ST" : role === "teacher" ? "TC" : role === "parent" ? "PR" : "AD"
    return `${prefix}${timestamp}${random}`
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
      grade: "",
      childName: "",
      childGrade: "",
      subjects: [],
      grades: [],
    }))
  }

  const handleSubjectChange = (subject: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      subjects: checked ? [...prev.subjects, subject] : prev.subjects.filter((s) => s !== subject),
    }))
  }

  const handleTeacherGradeChange = (grade: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      grades: checked ? [...prev.grades, grade] : prev.grades.filter((g) => g !== grade),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Role-specific validation
    if (formData.role === "student" && !formData.grade) {
      toast({
        title: "Error",
        description: "Please select your grade.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (formData.role === "parent" && (!formData.childName || !formData.childGrade)) {
      toast({
        title: "Error",
        description: "Please provide your child's information.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    if (formData.role === "teacher" && (formData.subjects.length === 0 || formData.grades.length === 0)) {
      toast({
        title: "Error",
        description: "Please select at least one subject and one grade level you teach.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      // Generate unique user ID
      const userId = generateUserId(formData.role)

      // Store user data in localStorage (in a real app, this would be sent to a server)
      const userData = {
        id: userId,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        ...(formData.role === "student" && { grade: formData.grade }),
        ...(formData.role === "parent" && {
          childName: formData.childName,
          childGrade: formData.childGrade,
        }),
        ...(formData.role === "teacher" && {
          subjects: formData.subjects,
          grades: formData.grades,
        }),
        createdAt: new Date().toISOString(),
      }

      localStorage.setItem("userData", JSON.stringify(userData))
      localStorage.setItem("userName", formData.name)
      localStorage.setItem("userEmail", formData.email)
      localStorage.setItem("userRole", formData.role)
      localStorage.setItem("userId", userId)

      if (formData.role === "student") {
        localStorage.setItem("userGrade", formData.grade)
      }

      toast({
        title: "Success!",
        description: "Account created successfully. Welcome to Safari Academy!",
      })

      // Redirect to appropriate dashboard
      setTimeout(() => {
        router.push(`/${formData.role}/dashboard`)
      }, 1000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "History",
    "Geography",
    "Computer Science",
    "Art",
    "Music",
    "Physical Education",
    "Economics",
    "Psychology",
    "Philosophy",
  ]

  const grades = Array.from({ length: 12 }, (_, i) => (i + 1).toString())

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md sm:max-w-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-4">
            <GraduationCap className="h-8 w-8 text-green-600 mr-2" />
            <span className="text-2xl font-bold text-green-600">Safari Academy</span>
          </div>
          <CardTitle className="text-xl sm:text-2xl">Create Account</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Join Safari Academy and start your learning journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="text-sm sm:text-base pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="text-sm sm:text-base pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-medium">
                I am a
              </Label>
              <Select onValueChange={handleRoleChange} required>
                <SelectTrigger className="text-sm sm:text-base">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {formData.role === "student" && (
              <div className="space-y-2">
                <Label htmlFor="grade" className="text-sm font-medium">
                  Grade
                </Label>
                <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, grade: value }))} required>
                  <SelectTrigger className="text-sm sm:text-base">
                    <SelectValue placeholder="Select your grade" />
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

            {formData.role === "parent" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="childName" className="text-sm font-medium">
                    Child's Name
                  </Label>
                  <Input
                    id="childName"
                    name="childName"
                    type="text"
                    placeholder="Enter your child's name"
                    value={formData.childName}
                    onChange={handleInputChange}
                    required
                    className="text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="childGrade" className="text-sm font-medium">
                    Child's Grade
                  </Label>
                  <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, childGrade: value }))} required>
                    <SelectTrigger className="text-sm sm:text-base">
                      <SelectValue placeholder="Select your child's grade" />
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
              </>
            )}

            {formData.role === "teacher" && (
              <>
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Subjects You Teach (Select multiple)</Label>
                  <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto border rounded-md p-3">
                    {subjects.map((subject) => (
                      <div key={subject} className="flex items-center space-x-2">
                        <Checkbox
                          id={subject}
                          checked={formData.subjects.includes(subject)}
                          onCheckedChange={(checked) => handleSubjectChange(subject, checked as boolean)}
                        />
                        <Label htmlFor={subject} className="text-xs sm:text-sm cursor-pointer truncate">
                          {subject}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Grade Levels You Teach (Select multiple)</Label>
                  <div className="grid grid-cols-4 gap-2 border rounded-md p-3">
                    {grades.map((grade) => (
                      <div key={grade} className="flex items-center space-x-2">
                        <Checkbox
                          id={`grade-${grade}`}
                          checked={formData.grades.includes(grade)}
                          onCheckedChange={(checked) => handleTeacherGradeChange(grade, checked as boolean)}
                        />
                        <Label htmlFor={`grade-${grade}`} className="text-xs sm:text-sm cursor-pointer">
                          {grade}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base py-2 sm:py-3"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs sm:text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-green-600 hover:text-green-500">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
