"use client"

import { CardFooter } from "@/components/ui/card"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GraduationCap, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

export default function SignupPage() {
  const router = useRouter()
  const [role, setRole] = useState<string>("student")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    grade: "10",
    subject: "Mathematics",
    childId: "",
    childGrade: "10",
  })
  const [accounts, setAccounts] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [studentAccounts, setStudentAccounts] = useState<any[]>([])

  useEffect(() => {
    // Clear existing notes and quizzes
    localStorage.removeItem("teacherNotes")
    localStorage.removeItem("teacherQuizzes")
    localStorage.removeItem("studentNotes")
    localStorage.removeItem("completedQuizzes")

    // Load accounts from localStorage
    const storedAccounts = localStorage.getItem("accounts")
    if (storedAccounts) {
      const parsedAccounts = JSON.parse(storedAccounts)
      setAccounts(parsedAccounts)

      // Filter student accounts for parent validation
      const students = parsedAccounts.filter((account: any) => account.role === "student")
      setStudentAccounts(students)
    } else {
      // Initialize with admin account if no accounts exist
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.phone) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Check if email already exists
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

    // For parent role, validate child ID
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

    // Generate user ID based on role
    let userId = ""
    if (role === "student") {
      userId = `SA${Math.floor(100000 + Math.random() * 900000)}`
    } else if (role === "parent") {
      userId = `PA${Math.floor(100000 + Math.random() * 900000)}`
    } else if (role === "teacher") {
      userId = `TA${Math.floor(100000 + Math.random() * 900000)}`
    }

    // Create new account
    const newAccount = {
      id: userId,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      role: role,
    }

    // Add role-specific data
    if (role === "student") {
      // Ensure grade is stored as a string
      newAccount.grade = formData.grade.toString()
    } else if (role === "teacher") {
      newAccount.subject = formData.subject
      // Ensure grade is stored as a string
      newAccount.grade = formData.grade.toString()
    } else if (role === "parent") {
      // Connect to child's account
      const childAccount = studentAccounts.find((student) => student.id === formData.childId)
      if (childAccount) {
        newAccount.childId = formData.childId
        newAccount.childName = childAccount.name
        // Ensure childGrade is stored as a string
        newAccount.childGrade = childAccount.grade.toString()
      }
    }

    // Save account to localStorage
    const updatedAccounts = [...accounts, newAccount]
    localStorage.setItem("accounts", JSON.stringify(updatedAccounts))
    setAccounts(updatedAccounts)

    // Store user info in localStorage for immediate login
    localStorage.setItem("userRole", role)
    localStorage.setItem("userName", formData.name)
    localStorage.setItem("userEmail", formData.email)
    localStorage.setItem("userId", userId)
    localStorage.setItem("userPhone", formData.phone)

    // Store grade as a string for students
    if (role === "student") {
      localStorage.setItem("userGrade", formData.grade.toString())
    }

    // If it's a teacher, store subject
    if (role === "teacher") {
      localStorage.setItem("userSubject", formData.subject)
      localStorage.setItem("userGrade", formData.grade.toString())
    }

    // If it's a parent, set child info
    if (role === "parent") {
      localStorage.setItem("childId", formData.childId)
      const childAccount = studentAccounts.find((student) => student.id === formData.childId)
      if (childAccount) {
        localStorage.setItem("childName", childAccount.name)
        localStorage.setItem("childGrade", childAccount.grade.toString())
      }
    }

    // Show success message
    toast({
      title: "Account created successfully",
      description: "Welcome to Safari Academy!",
    })

    // Redirect based on role
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
    <div className="min-h-screen bg-green-50 py-12">
      <div className="container mx-auto px-4">
        <Link href="/" className="mb-8 inline-flex items-center text-green-600 hover:text-green-700">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <Card className="mx-auto max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <GraduationCap className="h-6 w-6 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Create an Account</CardTitle>
            <CardDescription>Join Safari Academy today</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <Label htmlFor="role" className="mb-2 block">
                  I am a:
                </Label>
                <RadioGroup id="role" value={role} onValueChange={setRole} className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="parent" id="parent" />
                    <Label htmlFor="parent">Parent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="teacher" id="teacher" />
                    <Label htmlFor="teacher">Teacher</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="mb-4">
                <Label htmlFor="name" className="mb-2 block">
                  Full Name
                </Label>
                <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
              </div>

              <div className="mb-4">
                <Label htmlFor="email" className="mb-2 block">
                  Email
                </Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="mb-4">
                <Label htmlFor="phone" className="mb-2 block">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+251 91 234 5678"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <Label htmlFor="password" className="mb-2 block">
                  Password
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-6">
                <Label htmlFor="confirmPassword" className="mb-2 block">
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              {role === "student" && (
                <div className="mb-6">
                  <Label htmlFor="grade" className="mb-2 block">
                    Grade
                  </Label>
                  <Select
                    value={formData.grade}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, grade: value }))}
                  >
                    <SelectTrigger id="grade">
                      <SelectValue placeholder="Select Grade" />
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
              )}

              {role === "teacher" && (
                <>
                  <div className="mb-4">
                    <Label htmlFor="subject" className="mb-2 block">
                      Subject
                    </Label>
                    <Select
                      value={formData.subject}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, subject: value }))}
                    >
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select Subject" />
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
                  <div className="mb-6">
                    <Label htmlFor="grade" className="mb-2 block">
                      Grade
                    </Label>
                    <Select
                      value={formData.grade}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, grade: value }))}
                    >
                      <SelectTrigger id="teacherGrade">
                        <SelectValue placeholder="Select Grade" />
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
                </>
              )}

              {role === "parent" && (
                <>
                  <div className="mb-4">
                    <Label htmlFor="childId" className="mb-2 block">
                      Child's ID
                    </Label>
                    <Input
                      id="childId"
                      name="childId"
                      value={formData.childId}
                      onChange={handleChange}
                      placeholder="e.g., SA123456"
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
                </>
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
