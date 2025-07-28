"use client"

import type React from "react"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <PageLayout
      title="Contact Us"
      description="We'd love to hear from you. Reach out with questions, feedback, or inquiries."
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-primary-800 mb-6">Get in Touch</h2>
            <p className="text-gray-700 mb-8">
              Have questions about our programs? Want to learn more about how Safari Academy can support your child's
              education? We're here to help! Fill out the form, and one of our team members will get back to you as soon
              as possible.
            </p>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary-100 p-3 rounded-full mr-4">
                  <Mail className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-800">Email Us</h3>
                  <p className="text-gray-700">info@safariacademy.edu</p>
                  <p className="text-gray-700">support@safariacademy.edu</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary-100 p-3 rounded-full mr-4">
                  <Phone className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-800">Call Us</h3>
                  <p className="text-gray-700">Main: (555) 123-4567</p>
                  <p className="text-gray-700">Support: (555) 987-6543</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary-100 p-3 rounded-full mr-4">
                  <MapPin className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-800">Visit Us</h3>
                  <p className="text-gray-700">123 Education Lane</p>
                  <p className="text-gray-700">Learning City, LC 12345</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 bg-primary-100 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-800">Hours of Operation</h3>
                  <p className="text-gray-700">Monday - Friday: 8:00 AM - 6:00 PM</p>
                  <p className="text-gray-700">Saturday: 9:00 AM - 1:00 PM</p>
                  <p className="text-gray-700">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white p-8 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-primary-800 mb-6">Send Us a Message</h2>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <h3 className="text-lg font-medium text-green-800 mb-2">Thank You!</h3>
                  <p className="text-green-700">
                    Your message has been sent successfully. We'll get back to you as soon as possible.
                  </p>
                  <Button className="mt-4" onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input id="name" name="name" value={formState.name} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input id="phone" name="phone" type="tel" value={formState.phone} onChange={handleChange} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select value={formState.subject} onValueChange={handleSelectChange}>
                      <SelectTrigger id="subject">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="enrollment">Enrollment Information</SelectItem>
                        <SelectItem value="curriculum">Curriculum Questions</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formState.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>

        <section className="mt-16">
          <h2 className="text-2xl font-bold text-primary-800 mb-6 text-center">Find Us</h2>
          <div className="bg-gray-200 rounded-xl h-[400px] flex items-center justify-center">
            <p className="text-gray-500">Interactive Map Would Be Embedded Here</p>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
