"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff, GraduationCap, Users, BookOpen, BarChart3 } from "lucide-react"
import { toast } from "@/components/ui/toast"
import DataManager, { type User } from "@/lib/data-manager"

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student" as "student" | "teacher" | "parent" | "admin",
  })

  const dataManager = DataManager.getInstance()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value as any,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate login validation
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, create or find user based on email and role
      let user = dataManager.getUserByEmail(formData.email)

      if (!user) {
        // Create new user for demo
        const newUser: User = {
          id: `${formData.role}-${Date.now()}`,
          name: getNameFromEmail(formData.email),
          email: formData.email,
          role: formData.role,
          grade: formData.role === "student" ? "10" : undefined,
          subject: formData.role === "teacher" ? "Mathematics" : undefined,
        }

        // Add user to the system
        const users = dataManager.getUsers()
        users.push(newUser)
        localStorage.setItem("safari-academy-users", JSON.stringify(users))
        user = newUser
      }

      // Set current user
      dataManager.setCurrentUser(user.id)

      // Store user info in localStorage for backward compatibility
      localStorage.setItem("userName", user.name)
      localStorage.setItem("userEmail", user.email)
      localStorage.setItem("userRole", user.role)
      if (user.grade) localStorage.setItem("userGrade", user.grade)
      if (user.subject) localStorage.setItem("userSubject", user.subject)
      localStorage.setItem("userId", user.id)

      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.name}!`,
      })

      // Redirect based on role
      switch (user.role) {
        case "student":
          router.push("/student/dashboard")
          break
        case "teacher":
          router.push("/teacher/dashboard")
          break
        case "parent":
          router.push("/parent/dashboard")
          break
        case "admin":
          router.push("/admin/dashboard")
          break
        default:
          router.push("/")
      }
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const getNameFromEmail = (email: string): string => {
    const name = email.split("@")[0]
    return name
      .split(".")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  }

  const quickLogin = (role: string, name: string, email: string, grade?: string, subject?: string) => {
    setFormData({
      email,
      password: "demo123",
      role: role as any,
    })

    // Auto-login for demo
    setTimeout(() => {
      const user: User = {
        id: `${role}-demo`,
        name,
        email,
        role: role as any,
        grade,
        subject,
      }

      dataManager.setCurrentUser(user.id)

      // Store user info
      localStorage.setItem("userName", name)
      localStorage.setItem("userEmail", email)
      localStorage.setItem("userRole", role)
      if (grade) localStorage.setItem("userGrade", grade)
      if (subject) localStorage.setItem("userSubject", subject)
      localStorage.setItem("userId", user.id)

      toast({
        title: "Demo Login",
        description: `Logged in as ${name}`,
      })

      // Redirect
      router.push(`/${role}/dashboard`)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">Safari Academy</h1>
          </div>
          <p className="text-gray-600">Welcome back! Please sign in to your account.</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Login Form */}
          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={handleSelectChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">Student</SelectItem>
                      <SelectItem value="teacher">Teacher</SelectItem>
                      <SelectItem value="parent">Parent</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Quick Demo Login */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Demo Access</CardTitle>
              <CardDescription>Try the platform with pre-configured demo accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="student" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="student">Student</TabsTrigger>
                  <TabsTrigger value="teacher">Teacher</TabsTrigger>
                  <TabsTrigger value="parent">Parent</TabsTrigger>
                  <TabsTrigger value="admin">Admin</TabsTrigger>
                </TabsList>

                <TabsContent value="student" className="space-y-4">
                  <div className="text-center">
                    <Users className="h-12 w-12 mx-auto text-blue-500 mb-2" />
                    <h3 className="font-semibold">Student Dashboard</h3>
                    <p className="text-sm text-gray-600 mb-4">Access courses, quizzes, and study materials</p>
                    <Button
                      onClick={() => quickLogin("student", "Alex Smith", "alex.smith@student.safariacademy.edu", "10")}
                      className="w-full"
                      variant="outline"
                    >
                      Login as Alex Smith (Grade 10)
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="teacher" className="space-y-4">
                  <div className="text-center">
                    <BookOpen className="h-12 w-12 mx-auto text-green-500 mb-2" />
                    <h3 className="font-semibold">Teacher Dashboard</h3>
                    <p className="text-sm text-gray-600 mb-4">Create content, manage students, and track progress</p>
                    <Button
                      onClick={() =>
                        quickLogin("teacher", "Sarah Johnson", "sarah.johnson@safariacademy.edu", "10", "Mathematics")
                      }
                      className="w-full"
                      variant="outline"
                    >
                      Login as Sarah Johnson (Math Teacher)
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="parent" className="space-y-4">
                  <div className="text-center">
                    <Users className="h-12 w-12 mx-auto text-purple-500 mb-2" />
                    <h3 className="font-semibold">Parent Dashboard</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Monitor your child's progress and communicate with teachers
                    </p>
                    <Button
                      onClick={() => quickLogin("parent", "Michael Smith", "michael.smith@parent.safariacademy.edu")}
                      className="w-full"
                      variant="outline"
                    >
                      Login as Michael Smith (Parent)
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="admin" className="space-y-4">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-red-500 mb-2" />
                    <h3 className="font-semibold">Admin Dashboard</h3>
                    <p className="text-sm text-gray-600 mb-4">Manage users, content, and system settings</p>
                    <Button
                      onClick={() => quickLogin("admin", "Dr. Emily Wilson", "emily.wilson@admin.safariacademy.edu")}
                      className="w-full"
                      variant="outline"
                    >
                      Login as Dr. Emily Wilson (Admin)
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
