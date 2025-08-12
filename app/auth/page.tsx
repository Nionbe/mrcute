"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { GraduationCap, BookOpen, Users, Shield, BarChart3, Eye, EyeOff } from "lucide-react"
import Link from "next/link"

export default function AuthPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [role, setRole] = useState<"student" | "teacher" | "parent" | "admin">("student")
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    studentId: "",
    childName: "",
    grade: "",
  })

  useEffect(() => {
    const modeParam = searchParams.get("mode")
    if (modeParam === "signup") {
      setMode("signup")
    }
  }, [searchParams])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === "signin") {
      // Sign-in logic - validate credentials
      const existingUsers = JSON.parse(localStorage.getItem("safari_users") || "[]")
      const user = existingUsers.find(
        (u: any) => u.email === formData.email && u.password === formData.password && u.role === role,
      )

      if (user) {
        localStorage.setItem("safari_user", JSON.stringify(user))
        // Redirect to appropriate dashboard
        switch (role) {
          case "student":
            router.push("/dashboard/student")
            break
          case "teacher":
            router.push("/dashboard/teacher")
            break
          case "parent":
            router.push("/dashboard/parent")
            break
          case "admin":
            router.push("/dashboard/admin")
            break
        }
      } else {
        alert("Invalid credentials. Please check your email, password, and role.")
        return
      }
    } else {
      // Sign-up logic - create new user
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match")
        return
      }

      const userData = {
        ...formData,
        role,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        kycStatus: role === "student" ? "pending" : "not_required",
      }

      // Store user in users array
      const existingUsers = JSON.parse(localStorage.getItem("safari_users") || "[]")
      existingUsers.push(userData)
      localStorage.setItem("safari_users", JSON.stringify(existingUsers))
      localStorage.setItem("safari_user", JSON.stringify(userData))

      // Redirect to appropriate dashboard
      switch (role) {
        case "student":
          router.push("/dashboard/student")
          break
        case "teacher":
          router.push("/dashboard/teacher")
          break
        case "parent":
          router.push("/dashboard/parent")
          break
        case "admin":
          router.push("/dashboard/admin")
          break
      }
    }
  }

  const roleIcons = {
    student: BookOpen,
    teacher: Users,
    parent: Shield,
    admin: BarChart3,
  }

  const roleColors = {
    student: "green",
    teacher: "green",
    parent: "green",
    admin: "green",
  }

  const RoleIcon = roleIcons[role]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-500 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Safari Academy
            </span>
          </Link>

          <div className="flex justify-center space-x-2 mb-6">
            <Button
              variant={mode === "signin" ? "default" : "outline"}
              onClick={() => setMode("signin")}
              className={
                mode === "signin" ? "bg-gradient-to-r from-green-600 to-emerald-600" : "border-green-200 text-green-600"
              }
            >
              Sign In
            </Button>
            <Button
              variant={mode === "signup" ? "default" : "outline"}
              onClick={() => setMode("signup")}
              className={
                mode === "signup" ? "bg-gradient-to-r from-green-600 to-emerald-600" : "border-green-200 text-green-600"
              }
            >
              Sign Up
            </Button>
          </div>
        </div>

        <Card className="border-green-100 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">{mode === "signin" ? "Welcome Back" : "Create Account"}</CardTitle>
            <CardDescription>
              {mode === "signin"
                ? "Sign in to access your Safari Academy dashboard"
                : "Join Safari Academy and start your learning journey"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Role Selection */}
              <div className="space-y-2">
                <Label>Select Your Role</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(["student", "teacher", "parent", "admin"] as const).map((r) => {
                    const Icon = roleIcons[r]
                    const isSelected = role === r
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          isSelected ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Icon className={`w-5 h-5 mx-auto mb-1 ${isSelected ? "text-green-600" : "text-gray-400"}`} />
                        <span
                          className={`text-sm font-medium capitalize ${
                            isSelected ? "text-green-700" : "text-gray-600"
                          }`}
                        >
                          {r}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Name Fields for Signup */}
              {mode === "signup" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password for Signup */}
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>
              )}

              {/* Role-specific fields for signup */}
              {mode === "signup" && role === "student" && (
                <div className="space-y-2">
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    value={formData.studentId}
                    onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                    placeholder="e.g., SA2024001"
                    required
                  />
                </div>
              )}

              {mode === "signup" && role === "parent" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="childName">Child's Name</Label>
                    <Input
                      id="childName"
                      value={formData.childName}
                      onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, grade: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={`Grade ${i + 1}`}>
                            Grade {i + 1}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
              >
                <RoleIcon className="w-4 h-4 mr-2" />
                {mode === "signin" ? "Sign In" : "Create Account"} as {role.charAt(0).toUpperCase() + role.slice(1)}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center space-y-2">
              <p className="text-sm text-gray-600">
                {mode === "signin" ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
                  className="text-green-600 hover:underline font-medium"
                >
                  {mode === "signin" ? "Sign up" : "Sign in"}
                </button>
              </p>
              <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 block">
                ← Back to Home
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
