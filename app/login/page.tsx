"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react"

export default function Login() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  })

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
      role: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Demo credentials for testing
    const demoCredentials = {
      student: { email: "student@safari.com", password: "student123" },
      parent: { email: "parent@safari.com", password: "parent123" },
      teacher: { email: "teacher@safari.com", password: "teacher123" },
      admin: { email: "admin@safari.com", password: "admin123" },
    }

    // Check if it's a demo login
    const isDemoLogin = Object.entries(demoCredentials).some(
      ([role, creds]) => creds.email === formData.email && creds.password === formData.password,
    )

    if (isDemoLogin) {
      // Find the role based on credentials
      const userRole = Object.entries(demoCredentials).find(
        ([role, creds]) => creds.email === formData.email && creds.password === formData.password,
      )?.[0]

      if (userRole) {
        // Store demo user data
        const demoUserData = {
          id: `${userRole.toUpperCase()}001`,
          firstName: userRole.charAt(0).toUpperCase() + userRole.slice(1),
          lastName: "Demo",
          email: formData.email,
          role: userRole,
          grade: userRole === "student" ? "10" : undefined,
          subject: userRole === "teacher" ? "Mathematics" : undefined,
          childName: userRole === "parent" ? "Alex Demo" : undefined,
          childGrade: userRole === "parent" ? "10" : undefined,
        }

        localStorage.setItem("userData", JSON.stringify(demoUserData))
        localStorage.setItem("userRole", userRole)
        localStorage.setItem("userName", `${demoUserData.firstName} ${demoUserData.lastName}`)
        localStorage.setItem("userEmail", formData.email)
        localStorage.setItem("userId", demoUserData.id)

        router.push(`/${userRole}/dashboard`)
        return
      }
    }

    // For non-demo logins, check if user exists in localStorage
    const storedUserData = localStorage.getItem("userData")
    if (storedUserData) {
      const userData = JSON.parse(storedUserData)
      if (userData.email === formData.email && formData.role === userData.role) {
        localStorage.setItem("userRole", userData.role)
        localStorage.setItem("userName", `${userData.firstName} ${userData.lastName}`)
        localStorage.setItem("userEmail", userData.email)
        localStorage.setItem("userId", userData.id)

        router.push(`/${userData.role}/dashboard`)
        return
      }
    }

    alert("Invalid credentials or role selection!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white">
              <User className="h-6 w-6" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your Safari Academy account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">I am a</Label>
              <Select onValueChange={handleSelectChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Student</SelectItem>
                  <SelectItem value="parent">Parent</SelectItem>
                  <SelectItem value="teacher">Teacher</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
              Sign In
            </Button>
          </form>

          <div className="mt-4 text-center">
            <Link href="#" className="text-sm text-green-600 hover:underline">
              Forgot your password?
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-green-600 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </div>

          <div className="mt-6 border-t pt-6">
            <p className="text-xs text-gray-500 text-center mb-3">Demo Accounts (for testing):</p>
            <div className="space-y-1 text-xs text-gray-600">
              <p>Student: student@safari.com / student123</p>
              <p>Parent: parent@safari.com / parent123</p>
              <p>Teacher: teacher@safari.com / teacher123</p>
              <p>Admin: admin@safari.com / admin123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
