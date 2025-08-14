"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import { Shield, CheckCircle, Clock, XCircle, AlertTriangle, FileText, Camera } from "lucide-react"

interface KYCData {
  status: "not_started" | "pending" | "approved" | "rejected"
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
  documents: {
    idDocument?: File
    proofOfAddress?: File
    photo?: File
  }
  submittedAt?: string
  reviewedAt?: string
  rejectionReason?: string
}

interface KYCVerificationProps {
  userRole: "student" | "parent"
  onStatusChange?: (status: string) => void
}

export function KYCVerification({ userRole, onStatusChange }: KYCVerificationProps) {
  const [kycData, setKycData] = useState<KYCData>({
    status: "not_started",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    idType: "",
    idNumber: "",
    documents: {},
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    // Load KYC data from localStorage
    const savedKYC = localStorage.getItem(`kyc_${userRole}`)
    if (savedKYC) {
      setKycData(JSON.parse(savedKYC))
    }
  }, [userRole])

  const handleInputChange = (field: string, value: string) => {
    setKycData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleFileUpload = (documentType: string, file: File) => {
    setKycData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file,
      },
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate required fields
    const requiredFields = ["firstName", "lastName", "dateOfBirth", "phoneNumber", "address", "idType", "idNumber"]
    const missingFields = requiredFields.filter((field) => !kycData[field])

    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      const updatedKYC = {
        ...kycData,
        status: "pending" as const,
        submittedAt: new Date().toISOString(),
      }

      setKycData(updatedKYC)
      localStorage.setItem(`kyc_${userRole}`, JSON.stringify(updatedKYC))

      toast({
        title: "KYC Submitted",
        description: "Your verification documents have been submitted for review.",
      })

      onStatusChange?.("pending")
      setIsSubmitting(false)
    }, 2000)
  }

  const getStatusBadge = () => {
    const statusConfig = {
      not_started: { color: "secondary", icon: Clock, text: "Not Started" },
      pending: { color: "default", icon: Clock, text: "Under Review" },
      approved: { color: "default", icon: CheckCircle, text: "Verified" },
      rejected: { color: "destructive", icon: XCircle, text: "Rejected" },
    }

    const config = statusConfig[kycData.status]
    const Icon = config.icon

    return (
      <Badge variant={config.color as any} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.text}
      </Badge>
    )
  }

  if (kycData.status === "approved") {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-600" />
              <CardTitle className="text-green-800">Identity Verified</CardTitle>
            </div>
            {getStatusBadge()}
          </div>
          <CardDescription className="text-green-700">
            Your identity has been successfully verified. You have full access to all platform features.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  if (kycData.status === "pending") {
    return (
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <CardTitle className="text-yellow-800">Verification Under Review</CardTitle>
            </div>
            {getStatusBadge()}
          </div>
          <CardDescription className="text-yellow-700">
            Your documents are being reviewed. This usually takes 1-3 business days.
            {userRole === "student" && " You can continue using the platform with limited features."}
          </CardDescription>
        </CardHeader>
        {kycData.submittedAt && (
          <CardContent>
            <p className="text-sm text-yellow-600">
              Submitted on: {new Date(kycData.submittedAt).toLocaleDateString()}
            </p>
          </CardContent>
        )}
      </Card>
    )
  }

  if (kycData.status === "rejected") {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <CardTitle className="text-red-800">Verification Rejected</CardTitle>
            </div>
            {getStatusBadge()}
          </div>
          <CardDescription className="text-red-700">
            Your verification was rejected. Please review the feedback and resubmit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {kycData.rejectionReason && (
            <Alert className="border-red-200 bg-red-50">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">{kycData.rejectionReason}</AlertDescription>
            </Alert>
          )}
          <Button onClick={() => setKycData((prev) => ({ ...prev, status: "not_started" }))} className="mt-4">
            Resubmit Verification
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-blue-600" />
            <CardTitle>Identity Verification (KYC)</CardTitle>
          </div>
          {getStatusBadge()}
        </div>
        <CardDescription>
          {userRole === "student"
            ? "Complete your identity verification to unlock all features. You can use the platform with limited access while verification is pending."
            : "Complete your identity verification to access all features and ensure account security."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={kycData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={kycData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={kycData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  value={kycData.phoneNumber}
                  onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Address Information</h3>
            <div>
              <Label htmlFor="address">Street Address *</Label>
              <Textarea
                id="address"
                value={kycData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" value={kycData.city} onChange={(e) => handleInputChange("city", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" value={kycData.state} onChange={(e) => handleInputChange("state", e.target.value)} />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={kycData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ID Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Identification</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="idType">ID Type *</Label>
                <Select value={kycData.idType} onValueChange={(value) => handleInputChange("idType", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ID type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="passport">Passport</SelectItem>
                    <SelectItem value="drivers_license">Driver's License</SelectItem>
                    <SelectItem value="national_id">National ID</SelectItem>
                    <SelectItem value="student_id">Student ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="idNumber">ID Number *</Label>
                <Input
                  id="idNumber"
                  value={kycData.idNumber}
                  onChange={(e) => handleInputChange("idNumber", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Document Upload</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>ID Document</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Upload ID Document</p>
                  <Input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload("idDocument", e.target.files[0])}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Proof of Address</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Upload Proof of Address</p>
                  <Input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload("proofOfAddress", e.target.files[0])}
                    className="mt-2"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Photo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Camera className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">Upload Photo</p>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload("photo", e.target.files[0])}
                    className="mt-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Submit for Verification"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
