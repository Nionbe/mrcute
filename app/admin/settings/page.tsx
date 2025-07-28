"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Building, Calendar, CreditCard, Globe, Lock, Mail, Save, Shield, User, Users } from "lucide-react"

export default function AdminSettings() {
  const [schoolName, setSchoolName] = useState("Safari Academy")
  const [schoolEmail, setSchoolEmail] = useState("info@safariacademy.edu")
  const [schoolPhone, setSchoolPhone] = useState("+251 11 123 4567")
  const [schoolAddress, setSchoolAddress] = useState("123 Education Street, Addis Ababa, Ethiopia")
  const [schoolWebsite, setSchoolWebsite] = useState("www.safariacademy.edu")
  const [academicYear, setAcademicYear] = useState("2024-2025")
  const [currentTerm, setCurrentTerm] = useState("Second Term")

  const [emailNotifications, setEmailNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(false)
  const [parentNotifications, setParentNotifications] = useState(true)
  const [maintenanceMode, setMaintenanceMode] = useState(false)
  const [publicRegistration, setPublicRegistration] = useState(true)
  const [twoFactorAuth, setTwoFactorAuth] = useState(false)

  return (
    <div className="flex-1 md:ml-64">
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
        <h1 className="text-lg font-bold md:text-xl">System Settings</h1>
        <div className="flex items-center gap-2">
          <Button variant="default" className="gap-1 bg-green-600 hover:bg-green-700">
            <Save className="h-4 w-4" />
            Save All Changes
          </Button>
        </div>
      </header>

      <main className="p-4 md:p-6">
        <Tabs defaultValue="general">
          <TabsList className="mb-6">
            <TabsTrigger value="general">
              <Building className="mr-2 h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="academic">
              <Calendar className="mr-2 h-4 w-4" />
              Academic
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="mr-2 h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="payment">
              <CreditCard className="mr-2 h-4 w-4" />
              Payment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>School Information</CardTitle>
                <CardDescription>Manage your school's basic information</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="school-name">School Name</Label>
                      <Input id="school-name" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="school-email">School Email</Label>
                      <Input
                        id="school-email"
                        type="email"
                        value={schoolEmail}
                        onChange={(e) => setSchoolEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="school-phone">Phone Number</Label>
                      <Input id="school-phone" value={schoolPhone} onChange={(e) => setSchoolPhone(e.target.value)} />
                    </div>
                    <div>
                      <Label htmlFor="school-website">Website</Label>
                      <Input
                        id="school-website"
                        value={schoolWebsite}
                        onChange={(e) => setSchoolWebsite(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="school-address">Address</Label>
                    <Textarea
                      id="school-address"
                      value={schoolAddress}
                      onChange={(e) => setSchoolAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="school-logo">School Logo</Label>
                    <div className="mt-1 flex items-center">
                      <div className="h-16 w-16 rounded-md border bg-gray-100"></div>
                      <Button variant="outline" className="ml-4">
                        Change Logo
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>System Appearance</CardTitle>
                <CardDescription>Customize the look and feel of the platform</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input id="primary-color" type="color" value="#10b981" className="h-10 w-20" />
                        <span className="text-sm text-gray-500">#10b981 (Green)</span>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="secondary-color">Secondary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input id="secondary-color" type="color" value="#f59e0b" className="h-10 w-20" />
                        <span className="text-sm text-gray-500">#f59e0b (Amber)</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select defaultValue="light">
                      <SelectTrigger>
                        <SelectValue placeholder="Select theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System Default</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic">
            <Card>
              <CardHeader>
                <CardTitle>Academic Settings</CardTitle>
                <CardDescription>Configure academic year and term settings</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="academic-year">Current Academic Year</Label>
                      <Input
                        id="academic-year"
                        value={academicYear}
                        onChange={(e) => setAcademicYear(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="current-term">Current Term</Label>
                      <Select value={currentTerm} onValueChange={setCurrentTerm}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select term" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="First Term">First Term</SelectItem>
                          <SelectItem value="Second Term">Second Term</SelectItem>
                          <SelectItem value="Third Term">Third Term</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="term-start">Term Start Date</Label>
                      <Input id="term-start" type="date" value="2025-01-15" />
                    </div>
                    <div>
                      <Label htmlFor="term-end">Term End Date</Label>
                      <Input id="term-end" type="date" value="2025-04-15" />
                    </div>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="grading-system">Grading System</Label>
                      <Select defaultValue="percentage">
                        <SelectTrigger>
                          <SelectValue placeholder="Select grading system" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage (0-100%)</SelectItem>
                          <SelectItem value="letter">Letter Grade (A-F)</SelectItem>
                          <SelectItem value="gpa">GPA (0.0-4.0)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="passing-grade">Passing Grade</Label>
                      <Input id="passing-grade" type="number" defaultValue="50" />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Grade Levels</CardTitle>
                <CardDescription>Configure grade levels and sections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-8 border-b bg-gray-50 p-3 text-sm font-medium text-gray-500">
                    <div className="col-span-2">Grade Level</div>
                    <div className="col-span-2">Sections</div>
                    <div className="col-span-2">Students</div>
                    <div className="col-span-2">Actions</div>
                  </div>
                  <div className="grid grid-cols-8 items-center border-b p-3 hover:bg-gray-50">
                    <div className="col-span-2">Grade 9</div>
                    <div className="col-span-2">A, B, C</div>
                    <div className="col-span-2">120</div>
                    <div className="col-span-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-8 items-center border-b p-3 hover:bg-gray-50">
                    <div className="col-span-2">Grade 10</div>
                    <div className="col-span-2">A, B, C, D</div>
                    <div className="col-span-2">145</div>
                    <div className="col-span-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-8 items-center border-b p-3 hover:bg-gray-50">
                    <div className="col-span-2">Grade 11</div>
                    <div className="col-span-2">A, B, C</div>
                    <div className="col-span-2">105</div>
                    <div className="col-span-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-8 items-center p-3 hover:bg-gray-50">
                    <div className="col-span-2">Grade 12</div>
                    <div className="col-span-2">A, B</div>
                    <div className="col-span-2">80</div>
                    <div className="col-span-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                </div>
                <Button className="mt-4 bg-green-600 hover:bg-green-700">Add Grade Level</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure how notifications are sent to users</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium">Email Notifications</h4>
                        <p className="text-sm text-gray-500">Send notifications via email</p>
                      </div>
                    </div>
                    <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <Bell className="h-5 w-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium">SMS Notifications</h4>
                        <p className="text-sm text-gray-500">Send notifications via SMS</p>
                      </div>
                    </div>
                    <Switch checked={smsNotifications} onCheckedChange={setSmsNotifications} />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <Users className="h-5 w-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium">Parent Notifications</h4>
                        <p className="text-sm text-gray-500">Send student-related notifications to parents as well</p>
                      </div>
                    </div>
                    <Switch checked={parentNotifications} onCheckedChange={setParentNotifications} />
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="mb-4 text-lg font-medium">Notification Templates</h3>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-6 border-b bg-gray-50 p-3 text-sm font-medium text-gray-500">
                      <div className="col-span-3">Template Name</div>
                      <div className="col-span-2">Type</div>
                      <div className="col-span-1">Actions</div>
                    </div>
                    <div className="grid grid-cols-6 items-center border-b p-3 hover:bg-gray-50">
                      <div className="col-span-3">Welcome Message</div>
                      <div className="col-span-2">Email, In-App</div>
                      <div className="col-span-1">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-6 items-center border-b p-3 hover:bg-gray-50">
                      <div className="col-span-3">Payment Reminder</div>
                      <div className="col-span-2">Email, SMS</div>
                      <div className="col-span-1">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-6 items-center border-b p-3 hover:bg-gray-50">
                      <div className="col-span-3">Quiz Announcement</div>
                      <div className="col-span-2">Email, In-App</div>
                      <div className="col-span-1">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-6 items-center p-3 hover:bg-gray-50">
                      <div className="col-span-3">Grade Posted</div>
                      <div className="col-span-2">Email, In-App</div>
                      <div className="col-span-1">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button className="mt-4 bg-green-600 hover:bg-green-700">Add Template</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>Configure security and access settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <Lock className="h-5 w-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-500">Require 2FA for admin accounts</p>
                      </div>
                    </div>
                    <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <User className="h-5 w-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium">Public Registration</h4>
                        <p className="text-sm text-gray-500">Allow public registration for students and parents</p>
                      </div>
                    </div>
                    <Switch checked={publicRegistration} onCheckedChange={setPublicRegistration} />
                  </div>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <Globe className="h-5 w-5 text-gray-500" />
                      <div>
                        <h4 className="font-medium">Maintenance Mode</h4>
                        <p className="text-sm text-gray-500">Put the system in maintenance mode</p>
                      </div>
                    </div>
                    <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="mb-4 text-lg font-medium">Password Policy</h3>
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="min-length">Minimum Password Length</Label>
                        <Input id="min-length" type="number" defaultValue="8" />
                      </div>
                      <div>
                        <Label htmlFor="password-expiry">Password Expiry (days)</Label>
                        <Input id="password-expiry" type="number" defaultValue="90" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="require-uppercase" defaultChecked />
                        <Label htmlFor="require-uppercase">Require uppercase letters</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="require-numbers" defaultChecked />
                        <Label htmlFor="require-numbers">Require numbers</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="require-special" defaultChecked />
                        <Label htmlFor="require-special">Require special characters</Label>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>Configure payment methods and options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="etb">
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="etb">Ethiopian Birr (ETB)</SelectItem>
                        <SelectItem value="usd">US Dollar (USD)</SelectItem>
                        <SelectItem value="eur">Euro (EUR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <h3 className="mb-4 text-lg font-medium">Payment Methods</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="bank-transfer" defaultChecked />
                        <Label htmlFor="bank-transfer">Bank Transfer</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="mobile-money" defaultChecked />
                        <Label htmlFor="mobile-money">Mobile Money</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="cash" defaultChecked />
                        <Label htmlFor="cash">Cash</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="credit-card" />
                        <Label htmlFor="credit-card">Credit Card</Label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h3 className="mb-4 text-lg font-medium">Fee Structure</h3>
                    <div className="rounded-md border">
                      <div className="grid grid-cols-8 border-b bg-gray-50 p-3 text-sm font-medium text-gray-500">
                        <div className="col-span-2">Fee Type</div>
                        <div className="col-span-2">Grade Level</div>
                        <div className="col-span-2">Amount (ETB)</div>
                        <div className="col-span-2">Actions</div>
                      </div>
                      <div className="grid grid-cols-8 items-center border-b p-3 hover:bg-gray-50">
                        <div className="col-span-2">Tuition Fee</div>
                        <div className="col-span-2">Grade 9</div>
                        <div className="col-span-2">5,000</div>
                        <div className="col-span-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-8 items-center border-b p-3 hover:bg-gray-50">
                        <div className="col-span-2">Tuition Fee</div>
                        <div className="col-span-2">Grade 10</div>
                        <div className="col-span-2">5,500</div>
                        <div className="col-span-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-8 items-center border-b p-3 hover:bg-gray-50">
                        <div className="col-span-2">Tuition Fee</div>
                        <div className="col-span-2">Grade 11</div>
                        <div className="col-span-2">6,000</div>
                        <div className="col-span-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                      <div className="grid grid-cols-8 items-center p-3 hover:bg-gray-50">
                        <div className="col-span-2">Tuition Fee</div>
                        <div className="col-span-2">Grade 12</div>
                        <div className="col-span-2">6,500</div>
                        <div className="col-span-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                    <Button className="mt-4 bg-green-600 hover:bg-green-700">Add Fee Type</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
