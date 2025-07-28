import Image from "next/image"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Users, Play, CheckCircle } from "lucide-react"

export const metadata = {
  title: "Webinars | Safari Academy",
  description: "Educational webinars for parents, students, and educators from Safari Academy.",
}

export default function WebinarsPage() {
  const upcomingWebinars = [
    {
      title: "Fostering a Growth Mindset in Children",
      presenter: "Dr. Sarah Johnson",
      presenterRole: "Founder & CEO",
      date: "June 20, 2023",
      time: "7:00 PM - 8:00 PM EST",
      audience: "Parents",
      description:
        "Learn how to help your child develop a growth mindset that embraces challenges and persists in the face of setbacks.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Effective Study Strategies for Middle School Students",
      presenter: "James Thompson",
      presenterRole: "Mathematics Specialist",
      date: "June 25, 2023",
      time: "4:00 PM - 5:00 PM EST",
      audience: "Students",
      description:
        "Discover research-backed study techniques that help middle school students retain information and prepare effectively for assessments.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Integrating Technology in the Classroom",
      presenter: "Robert Martinez",
      presenterRole: "Chief Technology Officer",
      date: "July 2, 2023",
      time: "3:30 PM - 5:00 PM EST",
      audience: "Educators",
      description:
        "Explore innovative ways to use technology to enhance student engagement and learning outcomes in both virtual and physical classrooms.",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const recordedWebinars = [
    {
      title: "Understanding Your Child's Learning Style",
      presenter: "Dr. Amara Okafor",
      presenterRole: "Director of Student Development",
      duration: "45 minutes",
      audience: "Parents",
      views: 1245,
      description:
        "Identify your child's unique learning style and discover strategies to support their educational journey.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Preparing for High School: Academic and Social Readiness",
      presenter: "Emily Wilson",
      presenterRole: "Lead Elementary Educator",
      duration: "60 minutes",
      audience: "Students",
      views: 876,
      description: "Essential tips and strategies for middle school students transitioning to high school.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Differentiated Instruction in Diverse Classrooms",
      presenter: "Sophia Rodriguez",
      presenterRole: "Language Arts Coordinator",
      duration: "75 minutes",
      audience: "Educators",
      views: 1532,
      description: "Practical approaches to meeting the diverse learning needs of all students in your classroom.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Supporting Children with ADHD in the Learning Environment",
      presenter: "Aisha Patel",
      presenterRole: "Special Education Specialist",
      duration: "60 minutes",
      audience: "Parents, Educators",
      views: 2103,
      description: "Strategies and accommodations to help children with ADHD thrive academically and socially.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Developing Strong Reading Habits in Elementary Students",
      presenter: "Michael Chen",
      presenterRole: "Chief Academic Officer",
      duration: "50 minutes",
      audience: "Parents, Educators",
      views: 1876,
      description:
        "Practical tips for fostering a love of reading and building strong literacy skills in young learners.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Effective Test-Taking Strategies for Standardized Assessments",
      presenter: "David Kim",
      presenterRole: "Science Education Lead",
      duration: "55 minutes",
      audience: "Students",
      views: 1654,
      description: "Learn techniques to reduce test anxiety and maximize performance on standardized assessments.",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const webinarSeries = [
    {
      title: "Parenting in the Digital Age",
      episodes: 4,
      description:
        "Navigate the challenges of raising children in a technology-driven world, from screen time management to online safety.",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Student Success Skills",
      episodes: 6,
      description:
        "Essential skills for academic success, including time management, organization, note-taking, and test preparation.",
      image: "/placeholder.svg?height=150&width=300",
    },
    {
      title: "Innovative Teaching Practices",
      episodes: 5,
      description: "Explore cutting-edge teaching methodologies that engage students and enhance learning outcomes.",
      image: "/placeholder.svg?height=150&width=300",
    },
  ]

  return (
    <PageLayout
      title="Educational Webinars"
      description="Free webinars for parents, students, and educators on a variety of educational topics."
    >
      <div className="max-w-6xl mx-auto">
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-primary-800 mb-4">Learn from Experts</h2>
              <p className="text-gray-700 mb-6">
                Safari Academy offers free educational webinars led by experienced educators, child development
                specialists, and industry experts. Our webinars provide valuable insights, practical strategies, and
                evidence-based approaches to support student success.
              </p>
              <p className="text-gray-700 mb-6">
                Whether you're a parent looking for ways to support your child's learning, a student seeking to enhance
                your academic skills, or an educator interested in innovative teaching practices, our webinars offer
                something for everyone.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button>Register for Upcoming Webinars</Button>
                <Button variant="outline">Browse Recorded Sessions</Button>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Safari Academy webinars"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-primary-800">Upcoming Webinars</h2>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingWebinars.map((webinar, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-[160px]">
                  <Image src={webinar.image || "/placeholder.svg"} alt={webinar.title} fill className="object-cover" />
                  <Badge className="absolute top-3 left-3 bg-primary-600">{webinar.audience}</Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-primary-800">{webinar.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-1" />
                      <span>
                        {webinar.presenter}, {webinar.presenterRole}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm text-gray-700 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-primary-600" />
                      <span>{webinar.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary-600" />
                      <span>{webinar.time}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm line-clamp-2">{webinar.description}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Register Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary-800 mb-8">Recorded Webinars</h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="parents">For Parents</TabsTrigger>
              <TabsTrigger value="students">For Students</TabsTrigger>
              <TabsTrigger value="educators">For Educators</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className="grid md:grid-cols-3 gap-6">
                {recordedWebinars.map((webinar, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-[160px]">
                      <Image
                        src={webinar.image || "/placeholder.svg"}
                        alt={webinar.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                        <Button variant="secondary" size="icon" className="rounded-full">
                          <Play className="h-6 w-6" />
                        </Button>
                      </div>
                      <Badge className="absolute top-3 left-3 bg-primary-600">{webinar.audience}</Badge>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-primary-800">{webinar.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{webinar.presenter}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center justify-between text-sm text-gray-700 mb-3">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-primary-600" />
                          <span>{webinar.duration}</span>
                        </div>
                        <div className="flex items-center">
                          <span>{webinar.views} views</span>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm line-clamp-2">{webinar.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">
                        Watch Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="parents">
              <div className="grid md:grid-cols-3 gap-6">
                {recordedWebinars
                  .filter((webinar) => webinar.audience.includes("Parents"))
                  .map((webinar, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-[160px]">
                        <Image
                          src={webinar.image || "/placeholder.svg"}
                          alt={webinar.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                          <Button variant="secondary" size="icon" className="rounded-full">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                        <Badge className="absolute top-3 left-3 bg-primary-600">{webinar.audience}</Badge>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-primary-800">{webinar.title}</CardTitle>
                        <CardDescription>
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{webinar.presenter}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center justify-between text-sm text-gray-700 mb-3">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-primary-600" />
                            <span>{webinar.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <span>{webinar.views} views</span>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm line-clamp-2">{webinar.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Watch Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="students">
              <div className="grid md:grid-cols-3 gap-6">
                {recordedWebinars
                  .filter((webinar) => webinar.audience.includes("Students"))
                  .map((webinar, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-[160px]">
                        <Image
                          src={webinar.image || "/placeholder.svg"}
                          alt={webinar.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                          <Button variant="secondary" size="icon" className="rounded-full">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                        <Badge className="absolute top-3 left-3 bg-primary-600">{webinar.audience}</Badge>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-primary-800">{webinar.title}</CardTitle>
                        <CardDescription>
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{webinar.presenter}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center justify-between text-sm text-gray-700 mb-3">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-primary-600" />
                            <span>{webinar.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <span>{webinar.views} views</span>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm line-clamp-2">{webinar.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Watch Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="educators">
              <div className="grid md:grid-cols-3 gap-6">
                {recordedWebinars
                  .filter((webinar) => webinar.audience.includes("Educators"))
                  .map((webinar, index) => (
                    <Card key={index} className="overflow-hidden">
                      <div className="relative h-[160px]">
                        <Image
                          src={webinar.image || "/placeholder.svg"}
                          alt={webinar.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 hover:opacity-100 transition-opacity">
                          <Button variant="secondary" size="icon" className="rounded-full">
                            <Play className="h-6 w-6" />
                          </Button>
                        </div>
                        <Badge className="absolute top-3 left-3 bg-primary-600">{webinar.audience}</Badge>
                      </div>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg text-primary-800">{webinar.title}</CardTitle>
                        <CardDescription>
                          <div className="flex items-center text-sm">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{webinar.presenter}</span>
                          </div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex items-center justify-between text-sm text-gray-700 mb-3">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1 text-primary-600" />
                            <span>{webinar.duration}</span>
                          </div>
                          <div className="flex items-center">
                            <span>{webinar.views} views</span>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm line-clamp-2">{webinar.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">
                          Watch Now
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary-800 mb-8">Webinar Series</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {webinarSeries.map((series, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-[120px]">
                  <Image src={series.image || "/placeholder.svg"} alt={series.title} fill className="object-cover" />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-primary-800">{series.title}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 mr-1 text-primary-600" />
                      <span>{series.episodes} episodes</span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-gray-700 text-sm">{series.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Series
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-primary-50 rounded-xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary-800 mb-4">Request a Webinar Topic</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Is there an educational topic you'd like us to cover in a future webinar? Let us know, and our team will
              consider your suggestion for upcoming sessions.
            </p>
          </div>
          <div className="flex justify-center">
            <Button>Suggest a Topic</Button>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
