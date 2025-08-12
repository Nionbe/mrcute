"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  BookOpen,
  Users,
  Award,
  Calendar,
  Bell,
  BarChart3,
  GraduationCap,
  Shield,
  Star,
  MessageCircle,
  Send,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { role: "bot", content: "Hello! I'm Safari Academy's AI assistant. How can I help you today?" },
  ])
  const [chatInput, setChatInput] = useState("")

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatInput.trim()) return

    const userMessage = { role: "user", content: chatInput }
    setChatMessages((prev) => [...prev, userMessage])

    // Simulate AI response
    setTimeout(() => {
      let botResponse = "I'm here to help! "

      if (chatInput.toLowerCase().includes("admission") || chatInput.toLowerCase().includes("enroll")) {
        botResponse =
          "For admissions, please contact us at admissions@safari-academy.com or call 0911469878. We have 6 campuses serving different grade levels!"
      } else if (chatInput.toLowerCase().includes("campus") || chatInput.toLowerCase().includes("location")) {
        botResponse =
          "We have 6 campuses: Campus 1 (Kindergarten), Campus 2 (Grade 1-4), Campus 3 (Grade 5-8), Campus 4 (Grade 9-12), Campus 5 (Kindergarten), and Campus 6 (Grade 1-8). All located in Bole and Yeka Sub Cities."
      } else if (chatInput.toLowerCase().includes("transport")) {
        botResponse =
          "For transport services, contact our Transport Managers at 0912 848 485, 0913 536 865, or 0966 149 416."
      } else if (chatInput.toLowerCase().includes("contact") || chatInput.toLowerCase().includes("phone")) {
        botResponse =
          "General Office: 0910050404 (info@safari-academy.com). Each campus has dedicated contact numbers. Would you like specific campus contact details?"
      } else if (chatInput.toLowerCase().includes("grade") || chatInput.toLowerCase().includes("class")) {
        botResponse =
          "We serve students from Kindergarten to Grade 12 across our 6 campuses. Each campus specializes in specific grade ranges for optimal learning environments."
      } else {
        botResponse =
          "I can help you with information about admissions, campus locations, transport, contact details, and our educational programs. What would you like to know?"
      }

      setChatMessages((prev) => [...prev, { role: "bot", content: botResponse }])
    }, 1000)

    setChatInput("")
  }

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Engaging assignments, quizzes, and digital notes for effective learning",
    },
    {
      icon: Users,
      title: "Multi-Role Access",
      description: "Separate dashboards for students, teachers, parents, and administrators",
    },
    {
      icon: Award,
      title: "Progress Tracking",
      description: "Real-time grades, attendance monitoring, and performance analytics",
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "Integrated calendar with assignments, events, and deadline reminders",
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description: "Stay updated with grades, assignments, and important announcements",
    },
    {
      icon: BarChart3,
      title: "Detailed Reports",
      description: "Comprehensive analytics for academic performance and attendance",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Mathematics Teacher",
      content:
        "Safari Academy has transformed how I manage my classroom. The quiz creation tools and grade tracking make my job so much easier.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Parent",
      content:
        "I love being able to track my daughter's progress in real-time. The parent dashboard gives me everything I need to support her learning.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "Grade 10 Student",
      content:
        "The platform is so easy to use! I can access all my assignments, take quizzes, and check my grades from anywhere.",
      rating: 5,
    },
  ]

  const campuses = [
    {
      name: "Campus 1 - Kindergarten",
      location: "Bole Sub City, Woreda 8, Around Federal First Instance Court",
      office: "0116 607 203",
      mobile: "0905 171 717",
    },
    {
      name: "Campus 2 - Grade 1-4",
      location: "Bole Sub City, Woreda 8, Around Federal First Instance Court",
      office: "0116 607 204",
      mobile: "0911 005 694",
    },
    {
      name: "Campus 3 - Grade 5-8",
      location: "Bole Sub City, Woreda 08, Around Beshale High School",
      office: "0116 607 887",
      mobile: "0966 149 419",
    },
    {
      name: "Campus 4 - Grade 9-12",
      location: "Yeka Sub City, Woreda 13, In front of CMC Compound",
      mobile: "0966 149 418",
    },
    {
      name: "Campus 5 - Kindergarten",
      location: "Bole Sub City, Woreda 15, In Summit Condominium, Around LG Koica Hope TVET College",
      mobile: "0910 050 404",
    },
    {
      name: "Campus 6 - Grade 1-8",
      location: "Bole Sub City, Woreda 15, In Summit Condominium, Around LG Koica Hope TVET College",
      mobile: "0910 050 404",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-element absolute top-20 left-10 w-20 h-20 bg-green-200/30 rounded-full flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-green-400/50" />
        </div>
        <div
          className="floating-element absolute top-40 right-20 w-16 h-16 bg-emerald-300/20 rounded-full flex items-center justify-center"
          style={{ animationDelay: "2s" }}
        >
          <GraduationCap className="w-6 h-6 text-emerald-400/50" />
        </div>
        <div
          className="floating-element absolute bottom-40 left-20 w-24 h-24 bg-green-100/40 rounded-full flex items-center justify-center"
          style={{ animationDelay: "4s" }}
        >
          <Users className="w-10 h-10 text-green-400/40" />
        </div>
        <div
          className="floating-element absolute bottom-20 right-10 w-12 h-12 bg-emerald-200/30 rounded-full flex items-center justify-center"
          style={{ animationDelay: "1s" }}
        >
          <Award className="w-5 h-5 text-emerald-400/50" />
        </div>
        <div
          className="floating-element absolute top-1/2 left-1/4 w-8 h-8 bg-green-300/25 rounded-full flex items-center justify-center"
          style={{ animationDelay: "3s" }}
        >
          <Calendar className="w-4 h-4 text-green-400/60" />
        </div>
        <div
          className="floating-element absolute top-1/3 right-1/3 w-14 h-14 bg-emerald-100/35 rounded-full flex items-center justify-center"
          style={{ animationDelay: "5s" }}
        >
          <Bell className="w-6 h-6 text-emerald-400/45" />
        </div>
      </div>

      <div className="fixed left-4 bottom-4 z-50">
        <Dialog open={chatOpen} onOpenChange={setChatOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-full w-14 h-14 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg animate-pulse">
              <MessageCircle className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md h-96 flex flex-col">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <span>Safari Academy AI Assistant</span>
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto space-y-3 p-2">
              {chatMessages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.role === "user" ? "bg-green-600 text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleChatSubmit} className="flex space-x-2 pt-2 border-t">
              <Input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1"
              />
              <Button type="submit" size="sm" className="bg-green-600 hover:bg-green-700">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-500 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Safari Academy
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">
                Features
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-green-600 transition-colors">
                Testimonials
              </a>
              <a href="#contact" className="text-gray-600 hover:text-green-600 transition-colors">
                Contact
              </a>
              <Link href="/auth">
                <Button variant="outline" className="border-green-200 text-green-600 hover:bg-green-50 bg-transparent">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth?mode=signup">
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${mobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"}`}
                ></span>
                <span
                  className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
                ></span>
                <span
                  className={`bg-gray-600 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${mobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"}`}
                ></span>
              </div>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-green-100">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-green-600 transition-colors">
                  Features
                </a>
                <a href="#testimonials" className="text-gray-600 hover:text-green-600 transition-colors">
                  Testimonials
                </a>
                <a href="#contact" className="text-gray-600 hover:text-green-600 transition-colors">
                  Contact
                </a>
                <Link href="/auth">
                  <Button
                    variant="outline"
                    className="w-full border-green-200 text-green-600 hover:bg-green-50 bg-transparent"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth?mode=signup">
                  <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <Image
                src="/safari-academy-banner.png"
                alt="Safari Academy - Your Kids our Kids"
                width={400}
                height={150}
                className="rounded-lg shadow-lg animate-fade-in"
                priority
              />
            </div>

            <Badge className="mb-6 bg-green-100 text-green-700 hover:bg-green-200">
              🎓 Welcome to the Future of Education
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Empower Learning with{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Safari Academy
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              A comprehensive educational platform connecting students, teachers, parents, and administrators in one
              seamless digital learning environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth?mode=signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8 transform hover:scale-105 transition-all duration-200"
                >
                  Start Learning Today
                </Button>
              </Link>
              <Link href="/auth">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-200 text-green-600 hover:bg-green-50 px-8 bg-transparent transform hover:scale-105 transition-all duration-200"
                >
                  Sign In to Continue
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Modern Education
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed to enhance learning, teaching, and school management
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105"
              >
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-green-600" />
                  </div>
                  <CardTitle className="text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Role-Based Access Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Designed for Every Role</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tailored experiences for students, teachers, parents, and administrators
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-green-600">Students</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Access assignments, take quizzes, view grades, and manage your learning journey
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-emerald-600">Teachers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Create assignments, manage grades, track attendance, and engage with students
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-green-600">Parents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Monitor your child's progress, view grades, and stay connected with teachers
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg hover:transform hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-emerald-600">Admins</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  Manage users, oversee school operations, and access comprehensive reports
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Loved by Our Community</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See what students, teachers, and parents are saying about Safari Academy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-green-100 hover:transform hover:scale-105 transition-all duration-300"
              >
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                  <CardDescription className="text-green-600">{testimonial.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Campuses</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Six strategically located campuses serving students from Kindergarten to Grade 12
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campuses.map((campus, index) => (
              <Card
                key={index}
                className="border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg"
              >
                <CardHeader>
                  <CardTitle className="text-green-600 text-lg">{campus.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500 mt-1 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{campus.location}</p>
                  </div>
                  {campus.office && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <p className="text-sm text-gray-600">Office: {campus.office}</p>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600">Mobile: {campus.mobile}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Educational Experience?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of students, teachers, and parents already using Safari Academy
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth?mode=signup">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 px-8 transform hover:scale-105 transition-all duration-200"
              >
                Get Started Free
              </Button>
            </Link>
            <Link href="/auth">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 bg-transparent transform hover:scale-105 transition-all duration-200"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <footer id="contact" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-emerald-500 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Safari Academy</span>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering education through innovative technology and seamless digital learning experiences.
              </p>
              <p className="text-gray-400 text-sm">© 2024 Safari Academy. All rights reserved.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-green-400" />
                  <div>
                    <p className="text-gray-300">Admissions</p>
                    <p className="text-gray-400">admissions@safari-academy.com</p>
                    <p className="text-gray-400">0911469878</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-green-400" />
                  <div>
                    <p className="text-gray-300">General Office</p>
                    <p className="text-gray-400">0910050404</p>
                    <p className="text-gray-400">info@safari-academy.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-green-400" />
                  <div>
                    <p className="text-gray-300">Transport</p>
                    <p className="text-gray-400">0912 848 485</p>
                    <p className="text-gray-400">0913 536 865</p>
                    <p className="text-gray-400">0966 149 416</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2 text-sm">
                <a href="#features" className="text-gray-400 hover:text-white transition-colors block">
                  Features
                </a>
                <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors block">
                  Testimonials
                </a>
                <Link href="/auth" className="text-gray-400 hover:text-white transition-colors block">
                  Sign In
                </Link>
                <Link href="/auth?mode=signup" className="text-gray-400 hover:text-white transition-colors block">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
