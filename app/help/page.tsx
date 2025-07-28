import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Search, BookOpen, Users, Laptop, Phone, Mail, MessageSquare } from "lucide-react"

export const metadata = {
  title: "Help Center | Safari Academy",
  description: "Find answers to common questions and get support for Safari Academy services.",
}

export default function HelpCenterPage() {
  const faqs = {
    general: [
      {
        question: "What is Safari Academy?",
        answer:
          "Safari Academy is an innovative educational platform designed to provide personalized learning experiences for children in grades 1-12. We offer a comprehensive curriculum, interactive learning tools, and support services to help students achieve academic success.",
      },
      {
        question: "What age groups does Safari Academy serve?",
        answer:
          "Safari Academy serves students from grades 1-12, with age-appropriate curriculum and learning experiences designed for each grade level.",
      },
      {
        question: "How does Safari Academy differ from traditional schools?",
        answer:
          "Safari Academy combines the best of traditional education with innovative technology and personalized learning approaches. We focus on individualized learning paths, adaptive curriculum, and providing students with the flexibility to learn at their own pace while still ensuring they meet educational standards.",
      },
      {
        question: "Is Safari Academy accredited?",
        answer:
          "Yes, Safari Academy is fully accredited by recognized educational accreditation organizations, ensuring our curriculum meets or exceeds national standards.",
      },
    ],
    enrollment: [
      {
        question: "How do I enroll my child in Safari Academy?",
        answer:
          "Enrollment is simple! Visit our Enrollment page, complete the application form, and submit the required documentation. Our admissions team will review your application and contact you to discuss the next steps.",
      },
      {
        question: "What documents are required for enrollment?",
        answer:
          "Required documents typically include proof of identity (birth certificate or passport), previous school records, and any relevant health or special education documentation.",
      },
      {
        question: "Can students enroll mid-year?",
        answer:
          "Yes, Safari Academy accepts enrollment throughout the academic year. Our personalized approach makes it easier for students to transition at any time.",
      },
      {
        question: "Is there an enrollment fee?",
        answer:
          "Yes, there is a one-time enrollment fee. Please contact our admissions team for current fee information and available scholarships or financial aid options.",
      },
    ],
    curriculum: [
      {
        question: "What subjects does Safari Academy offer?",
        answer:
          "We offer a comprehensive curriculum including Mathematics, Language Arts, Science, Social Studies, Art, Music, Physical Education, and various electives depending on grade level.",
      },
      {
        question: "How is student progress assessed?",
        answer:
          "Student progress is assessed through a combination of ongoing formative assessments, project-based evaluations, and periodic standardized testing. Parents receive regular progress reports and have access to real-time performance data.",
      },
      {
        question: "Does Safari Academy offer advanced placement or honors courses?",
        answer:
          "Yes, we offer advanced placement and honors options for students who are ready for more challenging coursework.",
      },
      {
        question: "How does Safari Academy support students with different learning styles?",
        answer:
          "Our adaptive learning platform identifies each student's learning style and preferences, adjusting content delivery and activities accordingly. We also provide various resources and support services to accommodate different learning needs.",
      },
    ],
    technical: [
      {
        question: "What technical requirements are needed to access Safari Academy's online platform?",
        answer:
          "Students need a computer or tablet with internet access. Our platform works on most modern browsers, including Chrome, Firefox, Safari, and Edge. A minimum internet speed of 5 Mbps is recommended for optimal performance.",
      },
      {
        question: "How do I reset my password?",
        answer:
          "You can reset your password by clicking the 'Forgot Password' link on the login page. Follow the instructions sent to your registered email address to create a new password.",
      },
      {
        question: "Is my child's data secure?",
        answer:
          "Yes, we take data security and privacy very seriously. Safari Academy employs industry-standard encryption and security protocols to protect all user data. We are fully compliant with relevant data protection regulations, including COPPA and GDPR.",
      },
      {
        question: "What should I do if I encounter technical issues?",
        answer:
          "For technical support, please contact our help desk at support@safariacademy.edu or call (555) 987-6543. Our technical support team is available Monday through Friday, 8:00 AM to 6:00 PM.",
      },
    ],
  }

  return (
    <PageLayout title="Help Center" description="Find answers to your questions and get the support you need.">
      <div className="max-w-6xl mx-auto">
        <section className="mb-12">
          <div className="bg-primary-50 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-primary-800 mb-4">How can we help you today?</h2>
            <div className="max-w-2xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <Input placeholder="Search for answers..." className="pl-12 py-6 text-lg rounded-full" />
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Button variant="outline" size="sm">
                Enrollment
              </Button>
              <Button variant="outline" size="sm">
                Curriculum
              </Button>
              <Button variant="outline" size="sm">
                Technical Support
              </Button>
              <Button variant="outline" size="sm">
                Billing
              </Button>
              <Button variant="outline" size="sm">
                Parent Resources
              </Button>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary-800 mb-6">Frequently Asked Questions</h2>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
            </TabsList>

            {Object.entries(faqs).map(([category, questions]) => (
              <TabsContent key={category} value={category}>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-primary-800">
                      {category.charAt(0).toUpperCase() + category.slice(1)} FAQs
                    </CardTitle>
                    <CardDescription>Frequently asked questions about {category} topics.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {questions.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left font-medium">{faq.question}</AccordionTrigger>
                          <AccordionContent className="text-gray-700">{faq.answer}</AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-primary-800 mb-6">Support Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle className="text-primary-800">User Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Comprehensive guides for students, parents, and teachers on using Safari Academy's platform.
                </p>
                <Button variant="outline">View Guides</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                  <Laptop className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle className="text-primary-800">Video Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Step-by-step video tutorials on navigating the platform and using its features.
                </p>
                <Button variant="outline">Watch Tutorials</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto bg-primary-100 p-3 rounded-full w-14 h-14 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary-600" />
                </div>
                <CardTitle className="text-primary-800">Community Forum</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Connect with other Safari Academy families and educators to share tips and advice.
                </p>
                <Button variant="outline">Join Community</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="bg-primary-50 rounded-xl p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary-800 mb-4">Still Need Help?</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Our support team is ready to assist you with any questions or issues you may have.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="mx-auto bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Phone className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="font-semibold text-primary-800 mb-2">Call Us</h3>
              <p className="text-gray-700 mb-4">Speak directly with our support team.</p>
              <p className="font-medium">(555) 987-6543</p>
            </div>

            <div className="bg-white p-6 rounded-lg text-center">
              <div className="mx-auto bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Mail className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="font-semibold text-primary-800 mb-2">Email Us</h3>
              <p className="text-gray-700 mb-4">Send us your questions anytime.</p>
              <p className="font-medium">support@safariacademy.edu</p>
            </div>

            <div className="bg-white p-6 rounded-lg text-center">
              <div className="mx-auto bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <MessageSquare className="h-5 w-5 text-primary-600" />
              </div>
              <h3 className="font-semibold text-primary-800 mb-2">Live Chat</h3>
              <p className="text-gray-700 mb-4">Chat with our support team in real-time.</p>
              <Button>Start Chat</Button>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
