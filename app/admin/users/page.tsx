"use client"

import { useState } from "react"
import { Search, Filter, UserPlus, MoreHorizontal, Check, X } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"

export default function AdminUsers() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const students = [
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      role: "Student",
      grade: "10",
      status: "Active",
      joinDate: "Apr 5, 2025",
    },
    {
      id: "2",
      name: "Emma Davis",
      email: "emma.davis@example.com",
      role: "Student",
      grade: "10",
      status: "Active",
      joinDate: "Apr 3, 2025",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      role: "Student",
      grade: "10",
      status: "Active",
      joinDate: "Mar 28, 2025",
    },
    {
      id: "4",
      name: "James Wilson",
      email: "james.wilson@example.com",
      role: "Student",
      grade: "11",
      status: "Pending",
      joinDate: "Apr 11, 2025",
    },
  ]

  const teachers = [
    {
      id: "5",
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      role: "Teacher",
      subject: "Mathematics",
      status: "Active",
      joinDate: "Feb 15, 2025",
    },
    {
      id: "6",
      name: "Robert Martin",
      email: "robert.martin@example.com",
      role: "Teacher",
      subject: "Science",
      status: "Active",
      joinDate: "Mar 1, 2025",
    },
    {
      id: "7",
      name: "Jennifer Lee",
      email: "jennifer.lee@example.com",
      role: "Teacher",
      subject: "English",
      status: "Pending",
      joinDate: "Apr 12, 2025",
    },
  ]

  const parents = [
    {
      id: "8",
      name: "David Johnson",
      email: "david.johnson@example.com",
      role: "Parent",
      children: "Alex Johnson",
      status: "Active",
      joinDate: "Apr 5, 2025",
    },
    {
      id: "9",
      name: "Sarah Davis",
      email: "sarah.davis@example.com",
      role: "Parent",
      children: "Emma Davis",
      status: "Active",
      joinDate: "Apr 3, 2025",
    },
    {
      id: "10",
      name: "Robert Brown",
      email: "robert.brown@example.com",
      role: "Parent",
      children: "Michael Brown",
      status: "Active",
      joinDate: "Mar 28, 2025",
    },
    {
      id: "11",
      name: "Thomas Wilson",
      email: "thomas.wilson@example.com",
      role: "Parent",
      children: "James Wilson",
      status: "Pending",
      joinDate: "Apr 11, 2025",
    },
  ]

  const allUsers = [...students, ...teachers, ...parents]

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role.toLowerCase() === roleFilter.toLowerCase()
    const matchesStatus = statusFilter === "all" || user.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesRole && matchesStatus
  })

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || student.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || teacher.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const filteredParents = parents.filter((parent) => {
    const matchesSearch =
      parent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      parent.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || parent.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const handleApproveUser = () => {
    if (!selectedUser) return

    toast({
      title: "User Approved",
      description: `${selectedUser.name} has been approved and is now active.`,
    })

    setIsApproveDialogOpen(false)
  }

  const handleRejectUser = () => {
    if (!selectedUser) return

    toast({
      title: "User Rejected",
      description: `${selectedUser.name}'s account has been rejected.`,
    })

    setIsRejectDialogOpen(false)
  }

  const handleUserAction = (user: any, action: string) => {
    setSelectedUser(user)

    if (action === "approve") {
      setIsApproveDialogOpen(true)
    } else if (action === "reject") {
      setIsRejectDialogOpen(true)
    }
  }

  const renderUserCard = (user: any) => (
    <Card key={user.id} className="mb-4">
      <CardContent className="p-6">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{user.name}</h3>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  user.role === "Student"
                    ? "bg-blue-100 text-blue-600"
                    : user.role === "Teacher"
                      ? "bg-green-100 text-green-600"
                      : "bg-purple-100 text-purple-600"
                }`}
              >
                {user.role}
              </span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  user.status === "Active"
                    ? "bg-green-100 text-green-600"
                    : user.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                }`}
              >
                {user.status}
              </span>
            </div>
            <p className="text-sm text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-500">
              {user.role === "Student"
                ? `Grade: ${user.grade}`
                : user.role === "Teacher"
                  ? `Subject: ${user.subject}`
                  : `Children: ${user.children}`}
            </p>
            <p className="text-xs text-gray-500">Joined: {user.joinDate}</p>
          </div>
          <div className="flex items-center gap-2">
            {user.status === "Pending" && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 text-green-600 hover:bg-green-50 hover:text-green-700"
                  onClick={() => handleUserAction(user, "approve")}
                >
                  <Check className="h-4 w-4" />
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={() => handleUserAction(user, "reject")}
                >
                  <X className="h-4 w-4" />
                  Reject
                </Button>
              </>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => toast({ title: "View Profile" })}>View Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast({ title: "Reset Password" })}>Reset Password</DropdownMenuItem>
                {user.status === "Active" && (
                  <DropdownMenuItem className="text-red-600" onClick={() => toast({ title: "Deactivate Account" })}>
                    Deactivate
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="admin" />

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <h1 className="text-lg font-bold md:text-xl">User Management</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search users..."
                className="w-full rounded-md pl-8 md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="student">Students</SelectItem>
                <SelectItem value="teacher">Teachers</SelectItem>
                <SelectItem value="parent">Parents</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[110px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button className="gap-1 bg-green-600 hover:bg-green-700">
              <UserPlus className="h-4 w-4" />
              Add User
            </Button>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Users</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="teachers">Teachers</TabsTrigger>
              <TabsTrigger value="parents">Parents</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => renderUserCard(user))
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-center text-gray-500">No users found matching your criteria</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="students">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => renderUserCard(student))
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-center text-gray-500">No students found matching your criteria</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="teachers">
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => renderUserCard(teacher))
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-center text-gray-500">No teachers found matching your criteria</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="parents">
              {filteredParents.length > 0 ? (
                filteredParents.map((parent) => renderUserCard(parent))
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-center text-gray-500">No parents found matching your criteria</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
