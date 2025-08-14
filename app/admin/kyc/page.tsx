"use client"

import { useState } from "react"
import { Search, Filter, Eye, Check, X, Clock, FileText, Download } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface KYCSubmission {
  id: string
  userId: string
  userRole: "student" | "parent"
  name: string
  email: string
  status: "pending" | "approved" | "rejected"
  submittedAt: string
  reviewedAt?: string
  reviewedBy?: string
  rejectionReason?: string
  personalInfo: {
    firstName: string
    lastName: string
    dateOfBirth: string
    phoneNumber: string
    address: string
    city: string
    state: string
    zipCode: string
    idType: string
    idNumber: string
  }
  documents: {
    idDocument?: string
    proofOfAddress?: string
    photo?: string
  }
}

export default function AdminKYC() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [roleFilter, setRoleFilter] = useState("all")
  const [selectedSubmission, setSelectedSubmission] = useState<KYCSubmission | null>(null)
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  // Mock data - in real app, this would come from API
  const kycSubmissions: KYCSubmission[] = [
    {
      id: "kyc_001",
      userId: "student_001",
      userRole: "student",
      name: "Alex Johnson",
      email: "alex.johnson@example.com",
      status: "pending",
      submittedAt: "2025-01-15T10:30:00Z",
      personalInfo: {
        firstName: "Alex",
        lastName: "Johnson",
        dateOfBirth: "2005-03-15",
        phoneNumber: "+1234567890",
        address: "123 Main St, Apt 4B",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        idType: "student_id",
        idNumber: "STU123456789",
      },
      documents: {
        idDocument: "/documents/alex_id.jpg",
        proofOfAddress: "/documents/alex_address.pdf",
        photo: "/documents/alex_photo.jpg",
      },
    },
    {
      id: "kyc_002",
      userId: "parent_001",
      userRole: "parent",
      name: "Sarah Davis",
      email: "sarah.davis@example.com",
      status: "pending",
      submittedAt: "2025-01-14T15:45:00Z",
      personalInfo: {
        firstName: "Sarah",
        lastName: "Davis",
        dateOfBirth: "1985-07-22",
        phoneNumber: "+1987654321",
        address: "456 Oak Avenue",
        city: "Los Angeles",
        state: "CA",
        zipCode: "90210",
        idType: "drivers_license",
        idNumber: "DL987654321",
      },
      documents: {
        idDocument: "/documents/sarah_id.jpg",
        proofOfAddress: "/documents/sarah_address.pdf",
        photo: "/documents/sarah_photo.jpg",
      },
    },
    {
      id: "kyc_003",
      userId: "student_002",
      userRole: "student",
      name: "Michael Brown",
      email: "michael.brown@example.com",
      status: "approved",
      submittedAt: "2025-01-13T09:15:00Z",
      reviewedAt: "2025-01-13T14:30:00Z",
      reviewedBy: "admin_001",
      personalInfo: {
        firstName: "Michael",
        lastName: "Brown",
        dateOfBirth: "2006-11-08",
        phoneNumber: "+1555666777",
        address: "789 Pine Street",
        city: "Chicago",
        state: "IL",
        zipCode: "60601",
        idType: "student_id",
        idNumber: "STU987654321",
      },
      documents: {
        idDocument: "/documents/michael_id.jpg",
        proofOfAddress: "/documents/michael_address.pdf",
        photo: "/documents/michael_photo.jpg",
      },
    },
    {
      id: "kyc_004",
      userId: "parent_002",
      userRole: "parent",
      name: "Jennifer Wilson",
      email: "jennifer.wilson@example.com",
      status: "rejected",
      submittedAt: "2025-01-12T11:20:00Z",
      reviewedAt: "2025-01-12T16:45:00Z",
      reviewedBy: "admin_001",
      rejectionReason: "ID document is blurry and unreadable. Please upload a clearer image.",
      personalInfo: {
        firstName: "Jennifer",
        lastName: "Wilson",
        dateOfBirth: "1978-04-12",
        phoneNumber: "+1444555666",
        address: "321 Elm Drive",
        city: "Miami",
        state: "FL",
        zipCode: "33101",
        idType: "passport",
        idNumber: "P123456789",
      },
      documents: {
        idDocument: "/documents/jennifer_id.jpg",
        proofOfAddress: "/documents/jennifer_address.pdf",
        photo: "/documents/jennifer_photo.jpg",
      },
    },
  ]

  const filteredSubmissions = kycSubmissions.filter((submission) => {
    const matchesSearch =
      submission.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || submission.status === statusFilter
    const matchesRole = roleFilter === "all" || submission.userRole === roleFilter

    return matchesSearch && matchesStatus && matchesRole
  })

  const pendingSubmissions = filteredSubmissions.filter((s) => s.status === "pending")
  const approvedSubmissions = filteredSubmissions.filter((s) => s.status === "approved")
  const rejectedSubmissions = filteredSubmissions.filter((s) => s.status === "rejected")

  const handleApprove = async (submissionId: string) => {
    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "KYC Approved",
        description: "The KYC submission has been approved successfully.",
      })
      setIsProcessing(false)
      setIsReviewDialogOpen(false)
    }, 1500)
  }

  const handleReject = async (submissionId: string, reason: string) => {
    if (!reason.trim()) {
      toast({
        title: "Rejection Reason Required",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "KYC Rejected",
        description: "The KYC submission has been rejected with feedback.",
      })
      setIsProcessing(false)
      setIsReviewDialogOpen(false)
      setRejectionReason("")
    }, 1500)
  }

  const getStatusBadge = (status: string) => {
    const config = {
      pending: { variant: "secondary", text: "Pending Review", icon: Clock },
      approved: { variant: "default", text: "Approved", icon: Check },
      rejected: { variant: "destructive", text: "Rejected", icon: X },
    }

    const { variant, text, icon: Icon } = config[status as keyof typeof config]

    return (
      <Badge variant={variant as any} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {text}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const KYCReviewDialog = ({ submission }: { submission: KYCSubmission }) => (
    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Review KYC Submission</DialogTitle>
        <DialogDescription>Review and approve or reject the KYC submission for {submission.name}</DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {/* User Information */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-500">User ID</Label>
            <p className="text-sm">{submission.userId}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-500">Role</Label>
            <Badge variant={submission.userRole === "student" ? "default" : "secondary"}>{submission.userRole}</Badge>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-500">Email</Label>
            <p className="text-sm">{submission.email}</p>
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-500">Submitted</Label>
            <p className="text-sm">{formatDate(submission.submittedAt)}</p>
          </div>
        </div>

        {/* Personal Information */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Label className="text-gray-500">Full Name</Label>
              <p>
                {submission.personalInfo.firstName} {submission.personalInfo.lastName}
              </p>
            </div>
            <div>
              <Label className="text-gray-500">Date of Birth</Label>
              <p>{submission.personalInfo.dateOfBirth}</p>
            </div>
            <div>
              <Label className="text-gray-500">Phone Number</Label>
              <p>{submission.personalInfo.phoneNumber}</p>
            </div>
            <div>
              <Label className="text-gray-500">ID Type</Label>
              <p className="capitalize">{submission.personalInfo.idType.replace("_", " ")}</p>
            </div>
            <div className="col-span-2">
              <Label className="text-gray-500">Address</Label>
              <p>
                {submission.personalInfo.address}, {submission.personalInfo.city}, {submission.personalInfo.state}{" "}
                {submission.personalInfo.zipCode}
              </p>
            </div>
            <div>
              <Label className="text-gray-500">ID Number</Label>
              <p>{submission.personalInfo.idNumber}</p>
            </div>
          </div>
        </div>

        {/* Documents */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Submitted Documents</h3>
          <div className="grid grid-cols-3 gap-4">
            {submission.documents.idDocument && (
              <div className="border rounded-lg p-3">
                <Label className="text-sm font-medium">ID Document</Label>
                <div className="mt-2 bg-gray-100 rounded-lg p-4 text-center">
                  <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-xs text-gray-600">ID Document</p>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            )}
            {submission.documents.proofOfAddress && (
              <div className="border rounded-lg p-3">
                <Label className="text-sm font-medium">Proof of Address</Label>
                <div className="mt-2 bg-gray-100 rounded-lg p-4 text-center">
                  <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-xs text-gray-600">Address Proof</p>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            )}
            {submission.documents.photo && (
              <div className="border rounded-lg p-3">
                <Label className="text-sm font-medium">Photo</Label>
                <div className="mt-2 bg-gray-100 rounded-lg p-4 text-center">
                  <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-xs text-gray-600">Profile Photo</p>
                  <Button variant="outline" size="sm" className="mt-2 bg-transparent">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Review Actions */}
        {submission.status === "pending" && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="rejectionReason">Rejection Reason (if rejecting)</Label>
              <Textarea
                id="rejectionReason"
                placeholder="Provide a clear reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="mt-1"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => handleApprove(submission.id)}
                disabled={isProcessing}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                <Check className="h-4 w-4 mr-2" />
                {isProcessing ? "Processing..." : "Approve"}
              </Button>
              <Button
                onClick={() => handleReject(submission.id, rejectionReason)}
                disabled={isProcessing}
                variant="destructive"
                className="flex-1"
              >
                <X className="h-4 w-4 mr-2" />
                {isProcessing ? "Processing..." : "Reject"}
              </Button>
            </div>
          </div>
        )}

        {/* Previous Review Info */}
        {submission.status !== "pending" && (
          <Alert>
            <AlertDescription>
              This submission was {submission.status} on {submission.reviewedAt && formatDate(submission.reviewedAt)} by{" "}
              {submission.reviewedBy}.
              {submission.rejectionReason && (
                <div className="mt-2">
                  <strong>Rejection Reason:</strong> {submission.rejectionReason}
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}
      </div>
    </DialogContent>
  )

  const SubmissionCard = ({ submission }: { submission: KYCSubmission }) => (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{submission.name}</h3>
              <Badge variant={submission.userRole === "student" ? "default" : "secondary"}>{submission.userRole}</Badge>
              {getStatusBadge(submission.status)}
            </div>
            <p className="text-sm text-gray-500">{submission.email}</p>
            <p className="text-sm text-gray-500">ID: {submission.id}</p>
            <p className="text-xs text-gray-400">Submitted: {formatDate(submission.submittedAt)}</p>
            {submission.reviewedAt && (
              <p className="text-xs text-gray-400">Reviewed: {formatDate(submission.reviewedAt)}</p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Dialog
              open={isReviewDialogOpen && selectedSubmission?.id === submission.id}
              onOpenChange={setIsReviewDialogOpen}
            >
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setSelectedSubmission(submission)}>
                  <Eye className="h-4 w-4 mr-1" />
                  Review
                </Button>
              </DialogTrigger>
              {selectedSubmission && <KYCReviewDialog submission={selectedSubmission} />}
            </Dialog>

            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="w-full">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
        <h1 className="text-lg font-bold md:text-xl">KYC Management</h1>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search submissions..."
              className="w-full rounded-md pl-8 md:w-[250px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="student">Students</SelectItem>
              <SelectItem value="parent">Parents</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <div className="p-4 md:p-6">
        {/* Statistics Cards */}
        <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kycSubmissions.length}</div>
              <p className="text-xs text-gray-500">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{pendingSubmissions.length}</div>
              <p className="text-xs text-gray-500">Awaiting review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{approvedSubmissions.length}</div>
              <p className="text-xs text-gray-500">Verified users</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Rejected</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{rejectedSubmissions.length}</div>
              <p className="text-xs text-gray-500">Need resubmission</p>
            </CardContent>
          </Card>
        </div>

        {/* Submissions Tabs */}
        <Tabs defaultValue="all">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Submissions ({filteredSubmissions.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingSubmissions.length})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedSubmissions.length})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedSubmissions.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {filteredSubmissions.length > 0 ? (
              filteredSubmissions.map((submission) => <SubmissionCard key={submission.id} submission={submission} />)
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                <p className="text-center text-gray-500">No submissions found matching your criteria</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="pending">
            {pendingSubmissions.length > 0 ? (
              pendingSubmissions.map((submission) => <SubmissionCard key={submission.id} submission={submission} />)
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                <p className="text-center text-gray-500">No pending submissions</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="approved">
            {approvedSubmissions.length > 0 ? (
              approvedSubmissions.map((submission) => <SubmissionCard key={submission.id} submission={submission} />)
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                <p className="text-center text-gray-500">No approved submissions</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected">
            {rejectedSubmissions.length > 0 ? (
              rejectedSubmissions.map((submission) => <SubmissionCard key={submission.id} submission={submission} />)
            ) : (
              <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                <p className="text-center text-gray-500">No rejected submissions</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
