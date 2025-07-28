"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { CreditCard, Upload, Check, Clock, X, FileImage } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

export default function ParentPayments() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false)
  const [paymentDetails, setPaymentDetails] = useState({
    amount: "",
    description: "",
    date: "",
    reference: "",
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // State for payments
  const [allPayments, setAllPayments] = useState<any[]>([])
  const [pendingPayments, setPendingPayments] = useState<any[]>([])
  const [confirmedPayments, setConfirmedPayments] = useState<any[]>([])
  const [userName, setUserName] = useState("")
  const [childName, setChildName] = useState("")
  const [childId, setChildId] = useState("")

  // Load user info and saved payments
  useEffect(() => {
    // Get user info
    const storedUserName = localStorage.getItem("userName") || "Parent"
    const storedChildName = localStorage.getItem("childName") || "Student"
    const storedChildId = localStorage.getItem("childId") || "SA123456"

    setUserName(storedUserName)
    setChildName(storedChildName)
    setChildId(storedChildId)

    // Load payments from localStorage
    const loadedPayments = JSON.parse(localStorage.getItem("parentPayments") || "[]")

    // Set all payments
    setAllPayments(loadedPayments)

    // Filter payments by status
    setPendingPayments(loadedPayments.filter((payment: any) => payment.status === "Pending"))
    setConfirmedPayments(loadedPayments.filter((payment: any) => payment.status === "Confirmed"))

    // If no payments exist yet, initialize with default data
    if (loadedPayments.length === 0) {
      const defaultPayments = [
        {
          id: "1",
          description: "Term 2 Tuition",
          amount: "350 ETB",
          date: "Apr 5, 2025",
          status: "Confirmed",
          reference: "PAY-123456",
          student: storedChildName,
          studentId: storedChildId,
          parent: storedUserName,
        },
        {
          id: "2",
          description: "Extra Curricular Activities",
          amount: "120 ETB",
          date: "Mar 15, 2025",
          status: "Confirmed",
          reference: "PAY-789012",
          student: storedChildName,
          studentId: storedChildId,
          parent: storedUserName,
        },
        {
          id: "3",
          description: "Term 1 Tuition",
          amount: "350 ETB",
          date: "Jan 10, 2025",
          status: "Confirmed",
          reference: "PAY-345678",
          student: storedChildName,
          studentId: storedChildId,
          parent: storedUserName,
        },
        {
          id: "4",
          description: "Field Trip Fee",
          amount: "75 ETB",
          date: "Apr 12, 2025",
          status: "Pending",
          reference: "PAY-901234",
          student: storedChildName,
          studentId: storedChildId,
          parent: storedUserName,
        },
      ]

      localStorage.setItem("parentPayments", JSON.stringify(defaultPayments))
      setAllPayments(defaultPayments)
      setPendingPayments(defaultPayments.filter((payment) => payment.status === "Pending"))
      setConfirmedPayments(defaultPayments.filter((payment) => payment.status === "Confirmed"))
    }
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)

      // Create a preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPaymentDetails((prev) => ({ ...prev, [name]: value }))
  }

  // Update handleSubmit function to store the uploaded payment in localStorage
  const handleSubmit = () => {
    // Validate form
    if (!paymentDetails.amount || !paymentDetails.description || !paymentDetails.date || !selectedFile) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields and upload a payment screenshot.",
        variant: "destructive",
      })
      return
    }

    // Generate a unique payment ID
    const paymentId = `payment-${Date.now()}`
    const referenceNumber = paymentDetails.reference || `REF-${Date.now().toString().slice(-6)}`

    // Create payment object
    const newPayment = {
      id: paymentId,
      description: paymentDetails.description,
      amount: `${paymentDetails.amount} ETB`,
      date: paymentDetails.date,
      reference: referenceNumber,
      status: "Pending",
      screenshotUrl: previewUrl || "/placeholder.svg?height=400&width=600",
      student: childName,
      studentId: childId,
      parent: userName,
    }

    // Update state with new payment
    const updatedPayments = [newPayment, ...allPayments]
    setAllPayments(updatedPayments)
    setPendingPayments([newPayment, ...pendingPayments])

    // Store payment in localStorage for parent view
    localStorage.setItem("parentPayments", JSON.stringify(updatedPayments))

    // Also update admin payments to include this new payment
    updateAdminPayments(newPayment)

    toast({
      title: "Payment Submitted",
      description: "Your payment has been submitted for verification.",
    })

    // Reset form
    setPaymentDetails({
      amount: "",
      description: "",
      date: "",
      reference: "",
    })
    setSelectedFile(null)
    setPreviewUrl(null)
    setIsUploadDialogOpen(false)
  }

  // Function to update admin payments
  const updateAdminPayments = (newPayment: any) => {
    // Get current admin payments
    const adminPaymentsString = localStorage.getItem("adminPayments")
    let adminPayments = { pending: [], verified: [], rejected: [] }

    if (adminPaymentsString) {
      adminPayments = JSON.parse(adminPaymentsString)
    }

    // Add new payment to pending
    adminPayments.pending = [newPayment, ...adminPayments.pending]

    // Save back to localStorage
    localStorage.setItem("adminPayments", JSON.stringify(adminPayments))
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="parent" />

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <h1 className="text-lg font-bold md:text-xl">Payments</h1>
          <Button onClick={() => setIsUploadDialogOpen(true)} className="bg-green-600 hover:bg-green-700">
            <Upload className="mr-2 h-4 w-4" />
            Upload Payment
          </Button>
        </header>

        <main className="p-4 md:p-6">
          <Card className="mb-6 border-2 border-green-200 bg-green-50">
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <h2 className="text-xl font-bold">{childName}</h2>
                  <p className="text-sm text-gray-600">Student ID: {childId}</p>
                  <p className="text-sm text-gray-600">Parent: {userName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Payment Status</p>
                  <p className="text-lg font-bold text-green-600">Good Standing</p>
                  <p className="text-xs text-gray-500">All payments up to date</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Next Payment</p>
                  <p className="text-lg font-bold text-green-600">May 15, 2025</p>
                  <p className="text-xs text-gray-500">Term 3 Tuition (350 ETB)</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Payments</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="space-y-4">
                {allPayments.length > 0 ? (
                  allPayments.map((payment) => (
                    <Card key={payment.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                          <div className="space-y-1">
                            <h3 className="font-medium">{payment.description}</h3>
                            <p className="text-sm text-gray-500">Date: {payment.date}</p>
                            <p className="text-sm text-gray-500">Reference: {payment.reference}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-lg font-bold">{payment.amount}</span>
                            <span
                              className={`flex items-center rounded-full px-3 py-1 text-xs ${
                                payment.status === "Confirmed"
                                  ? "bg-green-100 text-green-600"
                                  : payment.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-600"
                                    : "bg-red-100 text-red-600"
                              }`}
                            >
                              {payment.status === "Confirmed" ? (
                                <Check className="mr-1 h-3 w-3" />
                              ) : payment.status === "Pending" ? (
                                <Clock className="mr-1 h-3 w-3" />
                              ) : (
                                <X className="mr-1 h-3 w-3" />
                              )}
                              {payment.status}
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <CreditCard className="mb-2 h-10 w-10 text-gray-300" />
                    <h3 className="mb-1 text-lg font-medium">No payments found</h3>
                    <p className="text-sm text-gray-500">Upload a payment to get started</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="space-y-4">
                {pendingPayments.length > 0 ? (
                  pendingPayments.map((payment) => (
                    <Card key={payment.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                          <div className="space-y-1">
                            <h3 className="font-medium">{payment.description}</h3>
                            <p className="text-sm text-gray-500">Date: {payment.date}</p>
                            <p className="text-sm text-gray-500">Reference: {payment.reference}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-lg font-bold">{payment.amount}</span>
                            <span className="flex items-center rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-600">
                              <Clock className="mr-1 h-3 w-3" />
                              Pending
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <CreditCard className="mb-2 h-10 w-10 text-gray-300" />
                    <h3 className="mb-1 text-lg font-medium">No pending payments</h3>
                    <p className="text-sm text-gray-500">All your payments have been processed</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="confirmed">
              <div className="space-y-4">
                {confirmedPayments.length > 0 ? (
                  confirmedPayments.map((payment) => (
                    <Card key={payment.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                          <div className="space-y-1">
                            <h3 className="font-medium">{payment.description}</h3>
                            <p className="text-sm text-gray-500">Date: {payment.date}</p>
                            <p className="text-sm text-gray-500">Reference: {payment.reference}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-lg font-bold">{payment.amount}</span>
                            <span className="flex items-center rounded-full bg-green-100 px-3 py-1 text-xs text-green-600">
                              <Check className="mr-1 h-3 w-3" />
                              Confirmed
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                    <CreditCard className="mb-2 h-10 w-10 text-gray-300" />
                    <h3 className="mb-1 text-lg font-medium">No confirmed payments</h3>
                    <p className="text-sm text-gray-500">Your payments are still being processed</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Upload Payment Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload Payment</DialogTitle>
            <DialogDescription>Upload a screenshot of your payment receipt for verification.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount
              </Label>
              <Input
                id="amount"
                name="amount"
                placeholder="e.g., 350"
                value={paymentDetails.amount}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                placeholder="e.g., Term 2 Tuition"
                value={paymentDetails.description}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date" className="text-right">
                Payment Date
              </Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={paymentDetails.date}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reference" className="text-right">
                Reference No.
              </Label>
              <Input
                id="reference"
                name="reference"
                placeholder="e.g., Transaction ID"
                value={paymentDetails.reference}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="screenshot" className="text-right">
                Screenshot
              </Label>
              <div className="col-span-3">
                <div className="mb-2 flex items-center justify-center rounded-lg border border-dashed p-4">
                  {previewUrl ? (
                    <div className="relative">
                      <img
                        src={previewUrl || "/placeholder.svg"}
                        alt="Payment Screenshot"
                        className="max-h-[200px] rounded-lg object-contain"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -right-2 -top-2 h-6 w-6 rounded-full"
                        onClick={() => {
                          setSelectedFile(null)
                          setPreviewUrl(null)
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <FileImage className="mb-2 h-10 w-10 text-gray-300" />
                      <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                      <p className="text-xs text-gray-400">PNG, JPG or JPEG (max. 5MB)</p>
                    </div>
                  )}
                </div>
                <Input
                  id="screenshot"
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  onChange={handleFileChange}
                  className={previewUrl ? "hidden" : ""}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
              Submit Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
