import Image from "next/image"
import { PageLayout } from "@/components/page-layout"

export const metadata = {
  title: "About Us | Safari Academy",
  description: "Learn about Safari Academy's mission, values, and educational approach.",
}

export default function AboutPage() {
  return (
    <PageLayout
      title="About Safari Academy"
      description="Nurturing young minds through innovative education and personalized learning experiences."
      showCTA={true}
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 rounded-xl overflow-hidden">
          <Image
            src="/placeholder.svg?height=400&width=800"
            alt="Safari Academy campus"
            width={800}
            height={400}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-primary-800 mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Safari Academy was founded in 2010 with a simple yet powerful vision: to create a learning environment
              where children could explore, discover, and grow at their own pace. Our journey began with a small group
              of dedicated educators who believed that education should be an adventure—a safari of discovery that
              ignites curiosity and fosters a lifelong love of learning.
            </p>
            <p className="text-gray-700">
              Over the years, we've grown from a small local academy to a comprehensive educational platform serving
              students across the country. Throughout our growth, we've remained committed to our founding principles of
              personalized learning, academic excellence, and creating a supportive community for all our students.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-800 mb-4">Our Mission</h2>
            <p className="text-gray-700">
              At Safari Academy, our mission is to empower every child to reach their full potential through engaging,
              personalized education that nurtures their natural curiosity and builds confidence. We believe that every
              child deserves an education that recognizes their unique strengths, challenges them appropriately, and
              prepares them for success in an ever-changing world.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-800 mb-4">Our Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-700 mb-2">Child-Centered Learning</h3>
                <p className="text-gray-700">
                  We place children at the center of everything we do, designing our curriculum and teaching methods to
                  meet their individual needs and learning styles.
                </p>
              </div>
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-700 mb-2">Excellence</h3>
                <p className="text-gray-700">
                  We strive for excellence in all aspects of education, from our curriculum and teaching methods to our
                  support services and community engagement.
                </p>
              </div>
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-700 mb-2">Inclusivity</h3>
                <p className="text-gray-700">
                  We celebrate diversity and create an inclusive environment where every child feels valued, respected,
                  and supported in their learning journey.
                </p>
              </div>
              <div className="bg-primary-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-primary-700 mb-2">Innovation</h3>
                <p className="text-gray-700">
                  We embrace innovation in education, continuously seeking new ways to enhance learning experiences and
                  prepare students for the future.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary-800 mb-4">Our Approach</h2>
            <p className="text-gray-700 mb-4">
              Safari Academy takes a holistic approach to education, recognizing that academic success is just one
              aspect of a child's development. Our curriculum integrates core academic subjects with opportunities for
              creative expression, physical activity, social-emotional learning, and character development.
            </p>
            <p className="text-gray-700 mb-4">
              We utilize a blend of traditional teaching methods and innovative technologies to create engaging learning
              experiences. Our adaptive learning platform allows us to personalize instruction, track progress, and
              provide timely feedback to students and parents.
            </p>
            <p className="text-gray-700">
              At Safari Academy, we believe that learning should be joyful and meaningful. We create opportunities for
              hands-on exploration, collaborative projects, and real-world application of knowledge, helping students
              see the relevance and value of what they're learning.
            </p>
          </section>

          <section className="bg-primary-50 p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-primary-800 mb-4">Join Our Safari</h2>
            <p className="text-gray-700 mb-6">
              Whether you're a student eager to learn, a parent seeking the best education for your child, or an
              educator passionate about making a difference, there's a place for you in our Safari Academy community. We
              invite you to explore our programs, meet our team, and discover how we can support your educational
              journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-primary-600 px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Contact Us
              </a>
              <a
                href="/signup"
                className="inline-flex items-center justify-center rounded-md border border-primary-600 px-6 py-3 text-sm font-medium text-primary-600 shadow-sm hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              >
                Enroll Today
              </a>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}
