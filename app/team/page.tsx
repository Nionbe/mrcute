import Image from "next/image"
import { PageLayout } from "@/components/page-layout"

export const metadata = {
  title: "Our Team | Safari Academy",
  description: "Meet the dedicated educators and staff behind Safari Academy.",
}

export default function TeamPage() {
  const leadershipTeam = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & CEO",
      bio: "Dr. Johnson founded Safari Academy with over 20 years of experience in education. She holds a Ph.D. in Educational Psychology and is passionate about creating innovative learning environments.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Michael Chen",
      role: "Chief Academic Officer",
      bio: "Michael oversees our curriculum development and academic programs. With a background in both education and technology, he ensures our teaching methods are both effective and engaging.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Dr. Amara Okafor",
      role: "Director of Student Development",
      bio: "Dr. Okafor leads our student support initiatives, ensuring every child receives the personalized attention they need to thrive academically and socially.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Robert Martinez",
      role: "Chief Technology Officer",
      bio: "Robert brings 15 years of experience in educational technology to Safari Academy, leading our efforts to create innovative digital learning tools and platforms.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  const educationalTeam = [
    {
      name: "Emily Wilson",
      role: "Lead Elementary Educator",
      bio: "Emily specializes in early childhood education and has developed many of our foundational learning programs.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "James Thompson",
      role: "Mathematics Specialist",
      bio: "James has a gift for making mathematics accessible and engaging for students of all levels.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Sophia Rodriguez",
      role: "Language Arts Coordinator",
      bio: "Sophia brings creativity and passion to our language arts curriculum, inspiring students to become confident readers and writers.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "David Kim",
      role: "Science Education Lead",
      bio: "David's hands-on approach to science education encourages students to explore, experiment, and discover the world around them.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Aisha Patel",
      role: "Special Education Specialist",
      bio: "Aisha ensures our programs are accessible to all learners, developing specialized approaches for students with diverse learning needs.",
      image: "/placeholder.svg?height=300&width=300",
    },
    {
      name: "Thomas Jackson",
      role: "Physical Education Director",
      bio: "Thomas promotes healthy, active lifestyles through our physical education programs, emphasizing both fitness and fun.",
      image: "/placeholder.svg?height=300&width=300",
    },
  ]

  return (
    <PageLayout
      title="Our Team"
      description="Meet the passionate educators and professionals who make Safari Academy special."
      showCTA={true}
    >
      <div className="max-w-6xl mx-auto">
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary-800 mb-8 text-center">Leadership Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadershipTeam.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
              >
                <div className="aspect-square relative">
                  <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary-800">{member.name}</h3>
                  <p className="text-primary-600 mb-3">{member.role}</p>
                  <p className="text-gray-700 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-primary-800 mb-8 text-center">Educational Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {educationalTeam.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg">
                <div className="flex items-center p-6">
                  <div className="flex-shrink-0 mr-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary-800">{member.name}</h3>
                    <p className="text-primary-600 text-sm mb-2">{member.role}</p>
                    <p className="text-gray-700 text-sm">{member.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-primary-50 rounded-xl p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-primary-800 mb-4">Join Our Team</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We're always looking for passionate educators and professionals to join our team. If you're dedicated to
              making a difference in children's lives through innovative education, we'd love to hear from you.
            </p>
          </div>
          <div className="flex justify-center">
            <a
              href="/careers"
              className="inline-flex items-center justify-center rounded-md bg-primary-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              View Open Positions
            </a>
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
