"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { toast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function AdminPaymentsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState<any>(null)
  const [rejectReason, setRejectReason] = useState("")
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false)
  const [isApproveDialogOpen, setIsApproveDialogOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Initialize payments from localStorage or default to these samples
  const [pendingPayments, setPendingPayments] = useState<any[]>([])
  const [verifiedPayments, setVerifiedPayments] = useState<any[]>([])
  const [rejectedPayments, setRejectedPayments] = useState<any[]>([])

  useEffect(() => {
    // Load payments from localStorage if available
    const storedPayments = localStorage.getItem("adminPayments")
    if (storedPayments) {
      const { pending, verified, rejected } = JSON.parse(storedPayments)
      setPendingPayments(pending)
      setVerifiedPayments(verified)
      setRejectedPayments(rejected)
    } else {
      // Default sample data
      setPendingPayments([
        {
          id: "1",
          student: "Alex Johnson",
          studentId: "SA123456",
          parent: "David Johnson",
          amount: "350 ETB",
          description: "Term 2 Tuition",
          date: "Apr 10, 2025",
          reference: "PAY-123456",
          status: "Pending",
          screenshotUrl: "/placeholder.svg?height=400&width=600",
        },
        {
          id: "2",
          student: "Olivia Smith",
          studentId: "SA789012",
          parent: "Jennifer Smith",
          amount: "120 ETB",
          description: "Extra Curricular Activities",
          date: "Apr 9, 2025",
          reference: "PAY-789012",
          status: "Pending",
          screenshotUrl: "/placeholder.svg?height=400&width=600",
        },
      ])

      setVerifiedPayments([
        {
          id: "3",
          student: "Emma Davis",
          studentId: "SA345678",
          parent: "Sarah Davis",
          amount: "350 ETB",
          description: "Term 2 Tuition",
          date: "Apr 8, 2025",
          reference: "PAY-345678",
          status: "Verified",
          verifiedBy: "Admin",
          verifiedDate: "Apr 8, 2025",
          screenshotUrl: "/placeholder.svg?height=400&width=600",
        },
        {
          id: "4",
          student: "Michael Brown",
          studentId: "SA901234",
          parent: "Robert Brown",
          amount: "350 ETB",
          description: "Term 2 Tuition",
          date: "Apr 7, 2025",
          reference: "PAY-901234",
          status: "Verified",
          verifiedBy: "Admin",
          verifiedDate: "Apr 7, 2025",
          screenshotUrl: "/placeholder.svg?height=400&width=600",
        },
        {
          id: "5",
          student: "James Wilson",
          studentId: "SA567890",
          parent: "Thomas Wilson",
          amount: "120 ETB",
          description: "Extra Curricular Activities",
          date: "Apr 5, 2025",
          reference: "PAY-567890",
          status: "Verified",
          verifiedBy: "Admin",
          verifiedDate: "Apr 5, 2025",
          screenshotUrl: "/placeholder.svg?height=400&width=600",
        },
      ])

      setRejectedPayments([
        {
          id: "6",
          student: "Sophia Martinez",
          studentId: "SA234567",
          parent: "Carlos Martinez",
          amount: "350 ETB",
          description: "Term 2 Tuition",
          date: "Apr 6, 2025",
          reference: "PAY-234567",
          status: "Rejected",
          rejectedReason: "Invalid payment proof",
          rejectedBy: "Admin",
          rejectedDate: "Apr 6, 2025",
          screenshotUrl: "/placeholder.svg?height=400&width=600",
        },
      ])
    }

    // Check for parent payments and add them to pending
    const parentPayments = localStorage.getItem("parentPayments")
    if (parentPayments) {
      const payments = JSON.parse(parentPayments)
      const newPendingPayments = payments
        .filter((payment: any) => payment.status === "Pending")
        .map((payment: any) => ({
          id: payment.id || `new-${Date.now()}`,
          student: payment.student || "Student",
          studentId: payment.studentId || "Unknown",
          parent: payment.parent || "Parent",
          amount: payment.amount || "0 ETB",
          description: payment.description || "Payment",
          date: payment.date || new Date().toLocaleDateString(),
          reference: payment.reference || `PAY-NEW-${Date.now()}`,
          status: "Pending",
          screenshotUrl: payment.screenshotUrl || "/placeholder.svg?height=400&width=600",
        }))

      if (newPendingPayments.length > 0) {
        setPendingPayments((prev) => [...prev, ...newPendingPayments])

        // Update adminPayments in localStorage
        const adminPayments = {
          pending: [...pendingPayments, ...newPendingPayments],
          verified: verifiedPayments,
          rejected: rejectedPayments,
        }
        localStorage.setItem("adminPayments", JSON.stringify(adminPayments))
      }
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  // Save payments to localStorage whenever they change
  useEffect(() => {
    if (pendingPayments.length > 0 || verifiedPayments.length > 0 || rejectedPayments.length > 0) {
      localStorage.setItem(
        "adminPayments",
        JSON.stringify({
          pending: pendingPayments,
          verified: verifiedPayments,
          rejected: rejectedPayments,
        }),
      )
    }
  }, [pendingPayments, verifiedPayments, rejectedPayments])

  const allPayments = [...pendingPayments, ...verifiedPayments, ...rejectedPayments]

  const filteredPendingPayments = pendingPayments.filter(
    (payment) =>
      payment.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.parent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredVerifiedPayments = verifiedPayments.filter(
    (payment) =>
      payment.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.parent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredRejectedPayments = rejectedPayments.filter(
    (payment) =>
      payment.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.parent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredAllPayments = allPayments.filter(
    (payment) =>
      payment.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.parent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.reference.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleViewPayment = (payment: any) => {
    setSelectedPayment(payment)
    setIsViewDialogOpen(true)
  }

  const handleOpenApproveDialog = () => {
    setIsApproveDialogOpen(true)
    setIsViewDialogOpen(false)
  }

  const handleVerifyPayment = () => {
    if (!selectedPayment) return

    // Find the payment in pending payments
    const paymentToVerify = pendingPayments.find((payment) => payment.id === selectedPayment.id)

    if (paymentToVerify) {
      // Add verification details
      const verifiedPayment = {
        ...paymentToVerify,
        status: "Verified",
        verifiedBy: "Admin",
        verifiedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      }

      // Remove from pending and add to verified
      setPendingPayments(pendingPayments.filter((payment) => payment.id !== selectedPayment.id))
      setVerifiedPayments([verifiedPayment, ...verifiedPayments])

      // Update parent payments in localStorage
      updateParentPayments(paymentToVerify, "Verified")

      toast({
        title: "Payment Approved",
        description: "The payment has been successfully approved.",
      })
    }

    setIsApproveDialogOpen(false)
  }

  const handleOpenRejectDialog = () => {
    setIsRejectDialogOpen(true)
    setIsViewDialogOpen(false)
  }

  const handleRejectPayment = () => {
    if (!selectedPayment) return

    // Find the payment in pending payments
    const paymentToReject = pendingPayments.find((payment) => payment.id === selectedPayment.id)

    if (paymentToReject) {
      // Add rejection details
      const rejectedPayment = {
        ...paymentToReject,
        status: "Rejected",
        rejectedReason: rejectReason || "Payment proof not acceptable",
        rejectedBy: "Admin",
        rejectedDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      }

      // Remove from pending and add to rejected
      setPendingPayments(pendingPayments.filter((payment) => payment.id !== selectedPayment.id))
      setRejectedPayments([rejectedPayment, ...rejectedPayments])

      // Update parent payments in localStorage
      updateParentPayments(paymentToReject, "Rejected", rejectReason)

      toast({
        title: "Payment Rejected",
        description: "The payment has been rejected.",
      })
    }

    setRejectReason("")
    setIsRejectDialogOpen(false)
  }

  // Helper function to update parent's payments in localStorage
  const updateParentPayments = (payment: any, newStatus: string, rejectionReason?: string) => {
    const parentPayments = localStorage.getItem("parentPayments")

    if (parentPayments) {
      const payments = JSON.parse(parentPayments)
      const updatedPayments = payments.map((p: any) => {
        if (p.reference === payment.reference) {
          const updatedPayment = {
            ...p,
            status: newStatus,
          }

          if (newStatus === "Rejected" && rejectionReason) {
            updatedPayment.rejectionReason = rejectionReason
          }

          return updatedPayment
        }
        return p
      })

      localStorage.setItem("parentPayments", JSON.stringify(updatedPayments))
    }
  }

  const handleLogout = () => {
    router.push("/login")
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar role="admin" />

      <div className="flex-1 md:ml-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <h1 className="text-lg font-bold md:text-xl">Payment Management</h1>
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search payments..."
                className="w-full rounded-md pl-8 md:w-[250px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Filter by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="term2">Term 2 Tuition</SelectItem>
                <SelectItem value="extra">Extra Activities</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </header>

        <main className="p-4 md:p-6">
          <Tabs defaultValue="pending">
            <TabsList className="mb-6">
              <TabsTrigger value="pending">Pending ({pendingPayments.length})</TabsTrigger>
              <TabsTrigger value="verified">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
              <TabsTrigger value="all">All Payments</TabsTrigger>
            </TabsList>

            <TabsContent value="pending">
              {filteredPendingPayments.length > 0 ? (
                <div className="space-y-4">
                  {filteredPendingPayments.map((payment) => (
                    <Card key={payment.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{payment.student}</h3>
                              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600">
                                {payment.studentId}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">Parent: {payment.parent}</p>
                            <p className="text-sm text-gray-500">Description: {payment.description}</p>
                            <p className="text-sm text-gray-500">Date: {payment.date}</p>
                            <p className="text-sm text-gray-500">Reference: {payment.reference}</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <span className="text-lg font-bold">{payment.amount}</span>
                              <span className="ml-2 rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-600">
                                {payment.status}
                              </span>
                            </div>
                            <div className="flex gap-2">
                              <Button variant="outline" onClick={() => handleViewPayment(payment)}>
                                View Details
                              </Button>
                              <Button
                                variant="default"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => {
                                  setSelectedPayment(payment)
                                  handleOpenApproveDialog()
                                }}
                              >
                                Approve
                              </Button>
                              <Button
                                variant="destructive"
                                onClick={() => {
                                  setSelectedPayment(payment)
                                  handleOpenRejectDialog()
                                }}
                              >
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-center text-gray-500">No pending payments found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="verified">
              {filteredVerifiedPayments.length > 0 ? (
                <div className="space-y-4">
                  {filteredVerifiedPayments.map((payment) => (
                    <Card key={payment.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{payment.student}</h3>
                              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600">
                                {payment.studentId}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">Parent: {payment.parent}</p>
                            <p className="text-sm text-gray-500">Description: {payment.description}</p>
                            <p className="text-sm text-gray-500">Date: {payment.date}</p>
                            <p className="text-sm text-gray-500">Reference: {payment.reference}</p>
                            <p className="text-sm text-gray-500">
                              Verified by: {payment.verifiedBy} on {payment.verifiedDate}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <span className="text-lg font-bold">{payment.amount}</span>
                              <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs text-green-600">
                                {payment.status}
                              </span>
                            </div>
                            <Button variant="outline" onClick={() => handleViewPayment(payment)}>
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-center text-gray-500">No approved payments found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="rejected">
              {filteredRejectedPayments.length > 0 ? (
                <div className="space-y-4">
                  {filteredRejectedPayments.map((payment) => (
                    <Card key={payment.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{payment.student}</h3>
                              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600">
                                {payment.studentId}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">Parent: {payment.parent}</p>
                            <p className="text-sm text-gray-500">Description: {payment.description}</p>
                            <p className="text-sm text-gray-500">Date: {payment.date}</p>
                            <p className="text-sm text-gray-500">Reference: {payment.reference}</p>
                            <p className="text-sm text-gray-500">Rejected reason: {payment.rejectedReason}</p>
                            <p className="text-sm text-gray-500">
                              Rejected by: {payment.rejectedBy} on {payment.rejectedDate}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <span className="text-lg font-bold">{payment.amount}</span>
                              <span className="ml-2 rounded-full bg-red-100 px-2 py-1 text-xs text-red-600">
                                {payment.status}
                              </span>
                            </div>
                            <Button variant="outline" onClick={() => handleViewPayment(payment)}>
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-center text-gray-500">No rejected payments found</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="all">
              {filteredAllPayments.length > 0 ? (
                <div className="space-y-4">
                  {filteredAllPayments.map((payment) => (
                    <Card key={payment.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{payment.student}</h3>
                              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-600">
                                {payment.studentId}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">Parent: {payment.parent}</p>
                            <p className="text-sm text-gray-500">Description: {payment.description}</p>
                            <p className="text-sm text-gray-500">Date: {payment.date}</p>
                            <p className="text-sm text-gray-500">Reference: {payment.reference}</p>
                            {payment.status === "Verified" && (
                              <p className="text-sm text-gray-500">
                                Verified by: {payment.verifiedBy} on {payment.verifiedDate}
                              </p>
                            )}
                            {payment.status === "Rejected" && (
                              <>
                                <p className="text-sm text-gray-500">Rejected reason: {payment.rejectedReason}</p>
                                <p className="text-sm text-gray-500">
                                  Rejected by: {payment.rejectedBy} on {payment.rejectedDate}
                                </p>
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <span className="text-lg font-bold">{payment.amount}</span>
                              <span
                                className={`ml-2 rounded-full px-2 py-1 text-xs ${
                                  payment.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-600"
                                    : payment.status === "Verified"
                                      ? "bg-green-100 text-green-600"
                                      : "bg-red-100 text-red-600"
                                }`}
                              >
                                {payment.status}
                              </span>
                            </div>
                            <Button variant="outline" onClick={() => handleViewPayment(payment)}>
                              View Details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                  <p className="text-center text-gray-500">No payments found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Payment Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>

          {selectedPayment && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Student:</span>
                  <span>{selectedPayment.student}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Student ID:</span>
                  <span>{selectedPayment.studentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Parent:</span>
                  <span>{selectedPayment.parent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Amount:</span>
                  <span className="font-bold">{selectedPayment.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Description:</span>
                  <span>{selectedPayment.description}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Date:</span>
                  <span>{selectedPayment.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Reference:</span>
                  <span>{selectedPayment.reference}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">Status:</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs ${
                      selectedPayment.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : selectedPayment.status === "Verified"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                    }`}
                  >
                    {selectedPayment.status}
                  </span>
                </div>

                {selectedPayment.status === "Verified" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Verified by:</span>
                      <span>{selectedPayment.verifiedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Verified date:</span>
                      <span>{selectedPayment.verifiedDate}</span>
                    </div>
                  </>
                )}

                {selectedPayment.status === "Rejected" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Rejected reason:</span>
                      <span>{selectedPayment.rejectedReason}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Rejected by:</span>
                      <span>{selectedPayment.rejectedBy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Rejected date:</span>
                      <span>{selectedPayment.rejectedDate}</span>
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Payment Proof</h4>
                <div className="overflow-hidden rounded-md border">
                  <img
                    src={selectedPayment.screenshotUrl || "/placeholder.svg"}
                    alt="Payment proof"
                    className="h-auto w-full object-cover"
                  />
                </div>
              </div>

              {selectedPayment.status === "Pending" && (
                <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
                  <Button variant="outline" onClick={handleOpenRejectDialog} className="mb-2 w-full sm:mb-0 sm:w-auto">
                    Reject
                  </Button>
                  <Button
                    onClick={handleOpenApproveDialog}
                    className="w-full bg-green-600 hover:bg-green-700 sm:w-auto"
                  >
                    Approve Payment
                  </Button>
                </DialogFooter>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approve Payment Dialog */}
      <Dialog open={isApproveDialogOpen} onOpenChange={setIsApproveDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Approve Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to approve this payment?</p>
            <p className="text-sm text-gray-500">This will mark the payment as verified and notify the parent.</p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsApproveDialogOpen(false)} className="mr-2">
                Cancel
              </Button>
              <Button onClick={handleVerifyPayment} className="bg-green-600 hover:bg-green-700">
                Approve Payment
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reject Payment Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Payment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="reject-reason">Rejection Reason</Label>
              <Textarea
                id="reject-reason"
                placeholder="Please provide a reason for rejecting this payment"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)} className="mr-2">
                Cancel
              </Button>
              <Button onClick={handleRejectPayment} variant="destructive">
                Reject Payment
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
