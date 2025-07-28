import Image from "next/image"
import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Calendar, User, ArrowRight } from "lucide-react"

export const metadata = {
  title: "Blog | Safari Academy",
  description: "Educational insights, tips, and updates from Safari Academy.",
}

export default function BlogPage() {
  const featuredPost = {
    title: "The Future of Education: Personalized Learning Paths",
    excerpt:
      "Discover how personalized learning paths are revolutionizing education and helping students reach their full potential.",
    date: "May 15, 2023",
    author: "Dr. Sarah Johnson",
    category: "Educational Trends",
    image: "/placeholder.svg?height=400&width=800",
    slug: "#",
  }

  const recentPosts = [
    {
      title: "5 Effective Strategies to Improve Reading Comprehension",
      excerpt: "Help your child develop stronger reading skills with these proven techniques.",
      date: "April 28, 2023",
      author: "Emily Wilson",
      category: "Reading Skills",
      image: "/placeholder.svg?height=300&width=400",
      slug: "#",
    },
    {
      title: "Making Math Fun: Games That Teach Mathematical Concepts",
      excerpt: "Engage children in mathematical thinking through play with these educational games.",
      date: "April 15, 2023",
      author: "James Thompson",
      category: "Mathematics",
      image: "/placeholder.svg?height=300&width=400",
      slug: "#",
    },
    {
      title: "The Importance of Social-Emotional Learning in Early Education",
      excerpt: "Why developing emotional intelligence is just as important as academic skills.",
      date: "April 3, 2023",
      author: "Dr. Amara Okafor",
      category: "Child Development",
      image: "/placeholder.svg?height=300&width=400",
      slug: "#",
    },
    {
      title: "Technology in the Classroom: Finding the Right Balance",
      excerpt: "How to leverage technology effectively without overwhelming young learners.",
      date: "March 22, 2023",
      author: "Robert Martinez",
      category: "Educational Technology",
      image: "/placeholder.svg?height=300&width=400",
      slug: "#",
    },
    {
      title: "Supporting Your Child's Learning at Home",
      excerpt: "Simple activities and routines that reinforce classroom learning in the home environment.",
      date: "March 10, 2023",
      author: "Sophia Rodriguez",
      category: "Parent Resources",
      image: "/placeholder.svg?height=300&width=400",
      slug: "#",
    },
    {
      title: "The Science of Learning: How Children's Brains Develop",
      excerpt:
        "Understanding the neurological processes behind learning can help us better support children's education.",
      date: "February 28, 2023",
      author: "David Kim",
      category: "Neuroscience",
      image: "/placeholder.svg?height=300&width=400",
      slug: "#",
    },
  ]

  const categories = [
    "Educational Trends",
    "Child Development",
    "Mathematics",
    "Reading Skills",
    "Science Education",
    "Educational Technology",
    "Parent Resources",
    "Teacher Tips",
    "Special Education",
    "Early Childhood",
  ]

  return (
    <PageLayout title="Safari Academy Blog" description="Insights, tips, and resources for parents and educators.">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-3/4">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-primary-800 mb-6">Featured Article</h2>
              <Card className="overflow-hidden">
                <div className="relative h-[300px]">
                  <Image
                    src={featuredPost.image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs font-medium px-2.5 py-1 rounded">
                    {featuredPost.category}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl text-primary-800">
                    <Link href={featuredPost.slug} className="hover:text-primary-600 transition-colors">
                      {featuredPost.title}
                    </Link>
                  </CardTitle>
                  <CardDescription>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {featuredPost.date}
                      </span>
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {featuredPost.author}
                      </span>
                    </div>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{featuredPost.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="group">
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-primary-800 mb-6">Recent Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {recentPosts.map((post, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative h-[200px]">
                      <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
                      <div className="absolute top-3 left-3 bg-primary-600 text-white text-xs font-medium px-2 py-0.5 rounded">
                        {post.category}
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg text-primary-800">
                        <Link href={post.slug} className="hover:text-primary-600 transition-colors">
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-3 text-xs text-gray-600">
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {post.date}
                          </span>
                          <span className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {post.author}
                          </span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-gray-700 text-sm line-clamp-2">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter>
                      <Link
                        href={post.slug}
                        className="text-primary-600 text-sm font-medium hover:text-primary-800 transition-colors flex items-center"
                      >
                        Read More
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="mt-8 text-center">
                <Button variant="outline">Load More Articles</Button>
              </div>
            </section>
          </div>

          <div className="md:w-1/4">
            <div className="sticky top-24">
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-primary-800 mb-4">Search Articles</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input placeholder="Search..." className="pl-10" />
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-lg font-semibold text-primary-800 mb-4">Categories</h3>
                <ul className="space-y-2">
                  {categories.map((category, index) => (
                    <li key={index}>
                      <Link
                        href="#"
                        className="text-gray-700 hover:text-primary-600 transition-colors flex items-center"
                      >
                        <span className="h-1.5 w-1.5 bg-primary-600 rounded-full mr-2"></span>
                        {category}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-primary-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-primary-800 mb-4">Subscribe to Our Newsletter</h3>
                <p className="text-gray-700 text-sm mb-4">
                  Stay updated with our latest articles, educational resources, and events.
                </p>
                <form className="space-y-4">
                  <Input placeholder="Your email address" type="email" required />
                  <Button className="w-full">Subscribe</Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
