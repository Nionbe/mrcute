"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, Award, Calendar, Bell, BarChart3, GraduationCap, Shield, Star } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-green-100 sticky top-0 z-50">
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
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-8"
                >
                  Start Learning Today
                </Button>
              </Link>
              <Link href="/auth">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-green-200 text-green-600 hover:bg-green-50 px-8 bg-transparent"
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
                className="border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg"
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
            <Card className="text-center border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
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

            <Card className="text-center border-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg">
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

            <Card className="text-center border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg">
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

            <Card className="text-center border-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-lg">
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
              <Card key={index} className="border-green-100">
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
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8">
                Get Started Free
              </Button>
            </Link>
            <Link href="/auth">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 bg-transparent"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
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

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <p>support@safariacademy.com</p>
                <p>+1 (555) 123-4567</p>
                <p>123 Education St, Learning City, LC 12345</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
