"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { User, Mail, Phone, Calendar, MapPin, School, Award, Edit, Camera, Save, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"

export default function StudentProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [studentInfo, setStudentInfo] = useState({
    name: "Loading...",
    studentId: "Loading...",
    email: "loading@example.com",
    phone: "",
    dateOfBirth: "",
    address: "",
    grade: "10",
    joinDate: "September 2023",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
  })

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    address: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
  })

  useEffect(() => {
    // Get user info from localStorage
    const userName = localStorage.getItem("userName") || "Student"
    const userEmail = localStorage.getItem("userEmail") || "student@example.com"
    const userGrade = localStorage.getItem("userGrade") || "10"
    const userId = localStorage.getItem("userId") || "SA123456"

    setStudentInfo({
      name: userName,
      studentId: userId,
      email: userEmail,
      phone: "",
      dateOfBirth: "",
      address: "",
      grade: userGrade,
      joinDate: "September 2023",
      parentName: "",
      parentEmail: "",
      parentPhone: "",
    })

    setEditForm({
      name: userName,
      email: userEmail,
      phone: "",
      dateOfBirth: "",
      address: "",
      parentName: "",
      parentEmail: "",
      parentPhone: "",
    })
  }, [])

  const achievements = [
    {
      id: "1",
      title: "Mathematics Excellence",
      date: "Mar 15, 2025",
      description: "Achieved top score in the Mathematics Olympiad.",
    },
    {
      id: "2",
      title: "Science Fair Winner",
      date: "Feb 10, 2025",
      description: "First place in the annual Science Fair with the project 'Renewable Energy Solutions'.",
    },
    {
      id: "3",
      title: "Perfect Attendance",
      date: "Jan 5, 2025",
      description: "Recognized for maintaining perfect attendance throughout the semester.",
    },
  ]

  const academicRecords = [
    {
      id: "1",
      subject: "Mathematics",
      grade: "A",
      teacher: "Mr. Williams",
      comments: "Excellent problem-solving skills and participation in class.",
    },
    {
      id: "2",
      subject: "Science",
      grade: "A-",
      teacher: "Dr. Martinez",
      comments: "Strong understanding of concepts with good lab work.",
    },
    {
      id: "3",
      subject: "English",
      grade: "B+",
      teacher: "Mrs. Johnson",
      comments: "Good writing skills but could improve on critical analysis.",
    },
    {
      id: "4",
      subject: "History",
      grade: "A",
      teacher: "Mr. Thompson",
      comments: "Exceptional research and presentation skills.",
    },
    {
      id: "5",
      subject: "Geography",
      grade: "B",
      teacher: "Ms. Rodriguez",
      comments: "Good understanding of concepts but needs more participation.",
    },
  ]

  const handleEditProfile = () => {
    setIsEditing(true)
  }

  const handleSaveProfile = () => {
    // Update the student info with the edited values
    setStudentInfo({
      ...studentInfo,
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone,
      dateOfBirth: editForm.dateOfBirth,
      address: editForm.address,
      parentName: editForm.parentName,
      parentEmail: editForm.parentEmail,
      parentPhone: editForm.parentPhone,
    })

    // Update localStorage
    localStorage.setItem("userName", editForm.name)
    localStorage.setItem("userEmail", editForm.email)

    setIsEditing(false)
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handleCancelEdit = () => {
    // Reset form to current values
    setEditForm({
      name: studentInfo.name,
      email: studentInfo.email,
      phone: studentInfo.phone,
      dateOfBirth: studentInfo.dateOfBirth,
      address: studentInfo.address,
      parentName: studentInfo.parentName,
      parentEmail: studentInfo.parentEmail,
      parentPhone: studentInfo.parentPhone,
    })
    setIsEditing(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleChangePhoto = () => {
    toast({
      title: "Photo Upload",
      description: "Profile photo upload functionality will be available soon.",
    })
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="student" />

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <h1 className="text-lg font-bold md:text-xl">Student Profile</h1>
          {!isEditing ? (
            <Button onClick={handleEditProfile} className="bg-green-600 hover:bg-green-700">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancelEdit}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSaveProfile} className="bg-green-600 hover:bg-green-700">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          )}
        </header>

        <main className="mx-auto max-w-6xl p-4 md:p-6">
          <div className="mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center gap-6 md:flex-row">
                  <div className="relative">
                    <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full bg-green-100">
                      <User className="h-16 w-16 text-green-600" />
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full bg-white"
                      onClick={handleChangePhoto}
                    >
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-2xl font-bold">{studentInfo.name}</h2>
                    <div className="mt-1 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                      <Badge className="bg-green-600">Grade {studentInfo.grade}</Badge>
                      <Badge variant="outline" className="border-green-200 text-green-600">
                        ID: {studentInfo.studentId}
                      </Badge>
                    </div>
                    <p className="mt-2 text-gray-600">Student at Safari Academy since {studentInfo.joinDate}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="personal">
            <TabsList className="mb-6">
              <TabsTrigger value="personal">Personal Information</TabsTrigger>
              <TabsTrigger value="academic">Academic Records</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Your personal and contact details</CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={editForm.name} onChange={handleInputChange} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={editForm.email}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={editForm.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dateOfBirth">Date of Birth</Label>
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={editForm.dateOfBirth}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          name="address"
                          value={editForm.address}
                          onChange={handleInputChange}
                          placeholder="Enter your address"
                        />
                      </div>

                      <div className="md:col-span-2 mt-8">
                        <h3 className="mb-4 text-lg font-medium">Parent/Guardian Information</h3>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="parentName">Parent/Guardian Name</Label>
                        <Input
                          id="parentName"
                          name="parentName"
                          value={editForm.parentName}
                          onChange={handleInputChange}
                          placeholder="Enter parent/guardian name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="parentEmail">Parent/Guardian Email</Label>
                        <Input
                          id="parentEmail"
                          name="parentEmail"
                          type="email"
                          value={editForm.parentEmail}
                          onChange={handleInputChange}
                          placeholder="Enter parent/guardian email"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
                        <Input
                          id="parentPhone"
                          name="parentPhone"
                          value={editForm.parentPhone}
                          onChange={handleInputChange}
                          placeholder="Enter parent/guardian phone"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <Mail className="mr-2 h-4 w-4" />
                            Email
                          </div>
                          <p className="font-medium">{studentInfo.email}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="mr-2 h-4 w-4" />
                            Phone
                          </div>
                          <p className="font-medium">{studentInfo.phone || "Not provided"}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="mr-2 h-4 w-4" />
                            Date of Birth
                          </div>
                          <p className="font-medium">{studentInfo.dateOfBirth || "Not provided"}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="mr-2 h-4 w-4" />
                            Address
                          </div>
                          <p className="font-medium">{studentInfo.address || "Not provided"}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <School className="mr-2 h-4 w-4" />
                            Grade Level
                          </div>
                          <p className="font-medium">{studentInfo.grade}</p>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="mr-2 h-4 w-4" />
                            Join Date
                          </div>
                          <p className="font-medium">{studentInfo.joinDate}</p>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h3 className="mb-4 text-lg font-medium">Parent/Guardian Information</h3>
                        <div className="grid gap-6 md:grid-cols-2">
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <User className="mr-2 h-4 w-4" />
                              Name
                            </div>
                            <p className="font-medium">{studentInfo.parentName || "Not provided"}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <Mail className="mr-2 h-4 w-4" />
                              Email
                            </div>
                            <p className="font-medium">{studentInfo.parentEmail || "Not provided"}</p>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center text-sm text-gray-500">
                              <Phone className="mr-2 h-4 w-4" />
                              Phone
                            </div>
                            <p className="font-medium">{studentInfo.parentPhone || "Not provided"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="academic">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Records</CardTitle>
                  <CardDescription>Your current academic performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {academicRecords.map((record) => (
                      <div key={record.id} className="rounded-lg border p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{record.subject}</h4>
                            <p className="text-sm text-gray-500">Teacher: {record.teacher}</p>
                          </div>
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                            <span className="font-bold text-green-600">{record.grade}</span>
                          </div>
                        </div>
                        <p className="mt-2 text-sm">{record.comments}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="achievements">
              <Card>
                <CardHeader>
                  <CardTitle>Achievements</CardTitle>
                  <CardDescription>Your awards and recognitions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {achievements.map((achievement) => (
                      <div key={achievement.id} className="rounded-lg border p-4">
                        <div className="flex items-center gap-3">
                          <Award className="h-6 w-6 text-green-600" />
                          <div>
                            <h4 className="font-medium">{achievement.title}</h4>
                            <p className="text-sm text-gray-500">Date: {achievement.date}</p>
                          </div>
                        </div>
                        <p className="mt-2 text-sm">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

const Label = ({
  htmlFor,
  children,
  className = "",
}: { htmlFor: string; children: React.ReactNode; className?: string }) => (
  <label htmlFor={htmlFor} className={`text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </label>
)
