"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { GraduationCap, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [accounts, setAccounts] = useState<any[]>([])

  useEffect(() => {
    // Load accounts from localStorage
    const storedAccounts = localStorage.getItem("accounts")
    if (storedAccounts) {
      setAccounts(JSON.parse(storedAccounts))
    } else {
      // Initialize with admin account if no accounts exist
      const initialAccounts = [
        {
          email: "safariac1@gmail.com",
          password: "Adminsa",
          role: "admin",
          name: "Admin",
          id: "AD000001",
        },
      ]
      localStorage.setItem("accounts", JSON.stringify(initialAccounts))
      setAccounts(initialAccounts)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Basic validation
    if (!email || !password) {
      toast({
        title: "Missing information",
        description: "Please enter both email and password.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Find account with matching email and password
    const account = accounts.find((acc) => acc.email === email && acc.password === password)

    if (!account) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Store user info in localStorage
    localStorage.setItem("userRole", account.role)
    localStorage.setItem("userName", account.name)
    localStorage.setItem("userEmail", account.email)
    localStorage.setItem("userId", account.id)

    // Store role-specific data
    if (account.role === "student") {
      localStorage.setItem("userGrade", account.grade || "")
    } else if (account.role === "teacher") {
      localStorage.setItem("userSubject", account.subject || "")
      localStorage.setItem("userGrade", account.grade || "")
    } else if (account.role === "parent") {
      localStorage.setItem("childId", account.childId || "")
      localStorage.setItem("childName", account.childName || "")
      localStorage.setItem("childGrade", account.childGrade || "")
    }

    // Show success message
    toast({
      title: "Login successful",
      description: `Welcome back, ${account.name}!`,
    })

    // Redirect based on role
    setTimeout(() => {
      setIsLoading(false)
      if (account.role === "student") {
        router.push("/student/dashboard")
      } else if (account.role === "parent") {
        router.push("/parent/dashboard")
      } else if (account.role === "teacher") {
        router.push("/teacher/dashboard")
      } else if (account.role === "admin") {
        router.push("/admin/dashboard")
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
            <CardTitle className="text-2xl">Log In</CardTitle>
            <CardDescription>Access your Safari Academy account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="email" className="mb-2 block">
                  Email
                </Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="text-sm text-green-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-green-600 hover:underline">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
