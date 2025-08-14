import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, GraduationCap, Heart, Users, Clock, MapPin } from "lucide-react"

export const metadata = {
  title: "Careers | Safari Academy",
  description: "Join our team at Safari Academy and help shape the future of education.",
}

export default function CareersPage() {
  const openPositions = [
    {
      title: "Elementary Education Specialist",
      department: "Education",
      location: "Remote",
      type: "Full-time",
      description: "Join our elementary education team to develop and deliver engaging curriculum for grades 1-5.",
    },
    {
      title: "Mathematics Curriculum Developer",
      department: "Curriculum",
      location: "New York, NY",
      type: "Full-time",
      description: "Create innovative mathematics curriculum that makes learning fun and accessible for all students.",
    },
    {
      title: "Educational Technology Specialist",
      department: "Technology",
      location: "Remote",
      type: "Full-time",
      description: "Help develop and implement technology solutions that enhance our educational platform.",
    },
    {
      title: "Student Support Coordinator",
      department: "Student Services",
      location: "Chicago, IL",
      type: "Full-time",
      description: "Coordinate support services for students, ensuring they have the resources they need to succeed.",
    },
    {
      title: "Content Writer - Science",
      department: "Curriculum",
      location: "Remote",
      type: "Part-time",
      description:
        "Create engaging science content for our online learning platform, making complex concepts accessible to young learners.",
    },
    {
      title: "UX/UI Designer - Educational Products",
      department: "Technology",
      location: "Remote",
      type: "Full-time",
      description: "Design intuitive, engaging interfaces for our educational applications and platforms.",
    },
  ]

  const benefits = [
    {
      icon: <Heart className="h-6 w-6 text-primary-600" />,
      title: "Comprehensive Benefits",
      description: "Health, dental, and vision insurance, plus retirement plans with company matching.",
    },
    {
      icon: <GraduationCap className="h-6 w-6 text-primary-600" />,
      title: "Professional Development",
      description: "Ongoing training, education stipends, and career growth opportunities.",
    },
    {
      icon: <Clock className="h-6 w-6 text-primary-600" />,
      title: "Flexible Scheduling",
      description: "Work-life balance with flexible hours and remote work options for many positions.",
    },
    {
      icon: <Users className="h-6 w-6 text-primary-600" />,
      title: "Collaborative Culture",
      description: "Join a supportive team of passionate educators and innovators.",
    },
  ]

  return (
    <PageLayout
      title="Careers at Safari Academy"
      description="Join our team of passionate educators and help shape the future of learning."
    >
      <div className="max-w-6xl mx-auto">
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-primary-800 mb-4">Why Work With Us</h2>
              <p className="text-gray-700 mb-6">
                At Safari Academy, we're more than just an educational institution—we're a community of passionate
                individuals dedicated to transforming how children learn and grow. When you join our team, you become
                part of a mission to make quality education accessible, engaging, and effective for every child.
              </p>
              <p className="text-gray-700">
                We value innovation, collaboration, and continuous growth. Our team members are encouraged to bring
                their unique perspectives and ideas to the table, contributing to the evolution of our educational
                approach and the success of our students.
              </p>
            </div>
            <div className="bg-primary-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-primary-800 mb-6">Benefits & Perks</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-3">{benefit.icon}</div>
                    <div>
                      <h4 className="font-medium text-primary-700">{benefit.title}</h4>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary-800 mb-8">Open Positions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="transition-all hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-primary-800">{position.title}</CardTitle>
                  <CardDescription>
                    <div className="flex flex-wrap gap-3 mt-2">
                      <span className="inline-flex items-center text-xs bg-primary-100 text-primary-800 rounded-full px-2.5 py-0.5">
                        <Briefcase className="h-3 w-3 mr-1" />
                        {position.department}
                      </span>
                      <span className="inline-flex items-center text-xs bg-gray-100 text-gray-800 rounded-full px-2.5 py-0.5">
                        <MapPin className="h-3 w-3 mr-1" />
                        {position.location}
                      </span>
                      <span className="inline-flex items-center text-xs bg-gray-100 text-gray-800 rounded-full px-2.5 py-0.5">
                        <Clock className="h-3 w-3 mr-1" />
                        {position.type}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 text-sm">{position.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Details & Apply
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-primary-50 rounded-xl p-8 mb-16 text-center">
          <h2 className="text-2xl font-bold text-primary-800 mb-4">Don't See the Right Fit?</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-6">
            We're always interested in connecting with talented individuals who are passionate about education. Send us
            your resume, and we'll keep you in mind for future opportunities.
          </p>
          <Button>Submit Your Resume</Button>
        </section>
      </div>
    </PageLayout>
  )
}
