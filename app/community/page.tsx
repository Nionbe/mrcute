import Image from "next/image"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, MapPin, MessageCircle, Award, BookOpen } from "lucide-react"

export const metadata = {
  title: "Community | Safari Academy",
  description: "Join the Safari Academy community and connect with other parents, students, and educators.",
}

export default function CommunityPage() {
  const upcomingEvents = [
    {
      title: "Parent Workshop: Supporting Your Child's Learning",
      date: "June 15, 2023",
      time: "7:00 PM - 8:30 PM",
      location: "Virtual",
      description: "Learn effective strategies to support your child's educational journey at home.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Student Science Fair",
      date: "June 22, 2023",
      time: "10:00 AM - 3:00 PM",
      location: "Safari Academy Campus",
      description: "Students showcase their innovative science projects and experiments.",
      image: "/placeholder.svg?height=200&width=400",
    },
    {
      title: "Summer Reading Challenge Kickoff",
      date: "July 1, 2023",
      time: "1:00 PM - 3:00 PM",
      location: "Virtual",
      description: "Join us as we launch our annual summer reading challenge with special guest authors.",
      image: "/placeholder.svg?height=200&width=400",
    },
  ]

  const communityGroups = [
    {
      name: "Parent Support Network",
      members: 245,
      description:
        "Connect with other parents to share experiences, advice, and support on your child's educational journey.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "STEM Enthusiasts",
      members: 187,
      description: "A community for students passionate about science, technology, engineering, and mathematics.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Creative Arts Circle",
      members: 156,
      description: "Celebrate and share creative projects, from visual arts to music, writing, and performance.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Educator Collaboration",
      members: 210,
      description:
        "A space for teachers to share resources, teaching strategies, and professional development opportunities.",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const successStories = [
    {
      name: "Emma Thompson",
      role: "Student, Grade 8",
      story:
        "Through Safari Academy's personalized learning approach, I discovered my passion for robotics and programming. The supportive community helped me gain confidence to enter my first robotics competition, where our team won first place!",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "The Martinez Family",
      role: "Parents",
      story:
        "Our son struggled with traditional learning environments. Since joining Safari Academy, he's thrived with the adaptive curriculum and supportive community. The parent network has been an invaluable resource for us.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      name: "Mr. David Chen",
      role: "Science Teacher",
      story:
        "Being part of the Safari Academy community has transformed my teaching. The collaborative environment and innovative resources have helped me create more engaging and effective learning experiences for my students.",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <PageLayout title="Our Community" description="Connect, collaborate, and grow with the Safari Academy community.">
      <div className="max-w-6xl mx-auto">
        <section className="mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold text-primary-800 mb-4">Join Our Thriving Community</h2>
              <p className="text-gray-700 mb-6">
                At Safari Academy, we believe that education thrives in community. Our vibrant community brings together
                students, parents, educators, and staff to create a supportive network focused on helping every child
                succeed.
              </p>
              <p className="text-gray-700 mb-6">
                From online forums and discussion groups to in-person events and workshops, there are countless ways to
                connect, share, and grow with others who share your commitment to quality education.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button>Join Our Community</Button>
                <Button variant="outline">Explore Events</Button>
              </div>
            </div>
            <div className="rounded-xl overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Safari Academy community"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-primary-800">Upcoming Community Events</h2>
            <Button variant="outline" size="sm">
              View All Events
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="relative h-[160px]">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg text-primary-800">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="space-y-2 text-sm text-gray-700 mb-3">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-primary-600" />
                      <span>
                        {event.date} • {event.time}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary-600" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">{event.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Register
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary-800 mb-8">Community Groups</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {communityGroups.map((group, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <Image
                        src={group.image || "/placeholder.svg"}
                        alt={group.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-primary-800">{group.name}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-1" />
                          <span>{group.members} members</span>
                        </div>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-gray-700 text-sm">{group.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    Join Group
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary-800 mb-8">Community Resources</h2>
          <Tabs defaultValue="parents" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="parents">For Parents</TabsTrigger>
              <TabsTrigger value="students">For Students</TabsTrigger>
              <TabsTrigger value="educators">For Educators</TabsTrigger>
            </TabsList>

            <TabsContent value="parents">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="mx-auto bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <BookOpen className="h-5 w-5 text-primary-600" />
                    </div>
                    <CardTitle className="text-center text-primary-800">Parent Guides</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-700 text-sm">
                      Access comprehensive guides on supporting your child's education, understanding curriculum, and
                      navigating our platform.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline" size="sm">
                      View Guides
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="mx-auto bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <MessageCircle className="h-5 w-5 text-primary-600" />
                    </div>
                    <CardTitle className="text-center text-primary-800">Discussion Forums</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-700 text-sm">
                      Connect with other parents to share experiences, ask questions, and offer support on your
                      parenting journey.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline" size="sm">
                      Join Discussions
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="mx-auto bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <Calendar className="h-5 w-5 text-primary-600" />
                    </div>
                    <CardTitle className="text-center text-primary-800">Workshops & Events</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-700 text-sm">
                      Participate in workshops, webinars, and events designed to help you support your child's learning
                      journey.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline" size="sm">
                      View Calendar
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="students">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="mx-auto bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <Users className="h-5 w-5 text-primary-600" />
                    </div>
                    <CardTitle className="text-center text-primary-800">Study Groups</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-700 text-sm">
                      Join virtual study groups with fellow students to collaborate on projects, prepare for
                      assessments, and share knowledge.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline" size="sm">
                      Find Groups
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="mx-auto bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <Award className="h-5 w-5 text-primary-600" />
                    </div>
                    <CardTitle className="text-center text-primary-800">Competitions & Challenges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-700 text-sm">
                      Participate in academic competitions, creative challenges, and other opportunities to showcase
                      your skills and talents.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline" size="sm">
                      Explore Challenges
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="mx-auto bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <BookOpen className="h-5 w-5 text-primary-600" />
                    </div>
                    <CardTitle className="text-center text-primary-800">Student Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-700 text-sm">
                      Access additional learning resources, study guides, and educational materials to support your
                      academic success.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline" size="sm">
                      View Resources
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="educators">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="mx-auto bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <BookOpen className="h-5 w-5 text-primary-600" />
                    </div>
                    <CardTitle className="text-center text-primary-800">Teaching Resources</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-700 text-sm">
                      Access lesson plans, teaching materials, and educational resources to enhance your classroom
                      instruction.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline" size="sm">
                      Browse Resources
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="mx-auto bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <Users className="h-5 w-5 text-primary-600" />
                    </div>
                    <CardTitle className="text-center text-primary-800">Professional Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-700 text-sm">
                      Participate in workshops, webinars, and courses designed to enhance your teaching skills and
                      knowledge.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline" size="sm">
                      View Opportunities
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="mx-auto bg-primary-100 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-2">
                      <MessageCircle className="h-5 w-5 text-primary-600" />
                    </div>
                    <CardTitle className="text-center text-primary-800">Educator Forums</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-center text-gray-700 text-sm">
                      Connect with fellow educators to share best practices, discuss challenges, and collaborate on
                      innovative teaching approaches.
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <Button variant="outline" size="sm">
                      Join Discussions
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary-800 mb-8">Community Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <Card key={index} className="bg-primary-50">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 mr-4">
                      <Image
                        src={story.image || "/placeholder.svg"}
                        alt={story.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-primary-800">{story.name}</CardTitle>
                      <CardDescription>{story.role}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 italic">"{story.story}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="bg-primary-600 text-white rounded-xl p-8 mb-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Become part of the Safari Academy community today and connect with students, parents, and educators who
            share your passion for learning and growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary">Create an Account</Button>
            <Button variant="outline" className="text-white border-white hover:bg-primary-700">
              Learn More
            </Button>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
