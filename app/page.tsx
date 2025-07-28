import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen, GraduationCap, Users, Award, CheckCircle, Globe, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AdaptiveFadeIn, AdaptiveSlideUp } from "@/components/adaptive-animated-components"
import { ScrollAnimation } from "@/components/scroll-animation"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/3 -right-1/3 h-[600px] w-[600px] rounded-full bg-emerald-100 dark:bg-emerald-900/20 opacity-20 blur-3xl"></div>
        <div className="absolute top-2/3 -left-1/3 h-[600px] w-[600px] rounded-full bg-teal-200 dark:bg-teal-900/20 opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-300 dark:bg-emerald-800/20 opacity-10 blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600">
            <GraduationCap className="absolute inset-0 m-auto h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400">
            Safari Academy
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
            >
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500">
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section with Banner */}
      <section className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/images/safari-academy-banner.png"
              alt="Safari Academy Banner"
              width={800}
              height={150}
              className="mb-8 rounded-lg shadow-xl"
              priority
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6">
              Welcome to Safari Academy
            </h1>
            <p className="text-xl text-white text-center mb-8 max-w-2xl">
              Nurturing young minds through engaging and interactive learning experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/login"
                className="px-8 py-3 bg-white text-emerald-600 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="px-8 py-3 bg-emerald-700 text-white rounded-full font-medium hover:bg-emerald-800 transition-colors duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32 text-center">
        <AdaptiveFadeIn>
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-white md:text-6xl lg:text-7xl">
            Discover a New Way to{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent dark:from-emerald-400 dark:to-teal-400">
              Learn
            </span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            Safari Academy connects students, teachers, and parents through an interactive learning ecosystem designed
            for the modern educational journey.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 shadow-lg shadow-emerald-600/20 dark:shadow-emerald-900/30"
              >
                Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-950/30"
              >
                Explore Features
              </Button>
            </Link>
          </div>
        </AdaptiveFadeIn>

        {/* Stats Banner */}
        <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4 lg:gap-8">
          {[
            { number: "10K+", label: "Active Students" },
            { number: "500+", label: "Expert Teachers" },
            { number: "1.2K+", label: "Interactive Courses" },
            { number: "98%", label: "Satisfaction Rate" },
          ].map((stat, index) => (
            <AdaptiveSlideUp key={index} delay={index * 0.1}>
              <div className="rounded-xl border border-emerald-100 bg-white p-6 shadow-sm dark:border-emerald-900/50 dark:bg-gray-900">
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">{stat.number}</p>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            </AdaptiveSlideUp>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="bg-gradient-to-b from-white to-emerald-50 py-20 dark:from-gray-900 dark:to-emerald-900/30"
      >
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 inline-block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-emerald-400 dark:to-teal-400">
              How Safari Academy Works
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
              Our platform is designed to create a seamless educational experience for all users
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Users,
                title: "Join Our Community",
                description:
                  "Create your profile as a student, parent, teacher, or administrator to access personalized features tailored to your role.",
              },
              {
                icon: BookOpen,
                title: "Access Rich Content",
                description:
                  "Dive into our extensive library of interactive lessons, quizzes, and educational resources designed for different learning styles.",
              },
              {
                icon: Award,
                title: "Track Your Progress",
                description:
                  "Monitor performance with detailed analytics, celebrate achievements on leaderboards, and receive personalized feedback.",
              },
            ].map((step, index) => (
              <AdaptiveSlideUp key={index} delay={index * 0.1}>
                <div className="relative rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900">
                  <div className="absolute -top-5 left-8 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                    <span className="text-lg font-bold">{index + 1}</span>
                  </div>
                  <div className="mt-4 mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-900/50 dark:text-emerald-400">
                    <step.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </AdaptiveSlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 inline-block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-emerald-400 dark:to-teal-400">
              Powerful Features for Everyone
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
              Safari Academy offers specialized tools for each role in the educational journey
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: GraduationCap,
                title: "Students",
                features: [
                  "Personalized learning dashboard",
                  "Interactive quizzes with instant feedback",
                  "Progress tracking and achievement badges",
                  "Subject-specific leaderboards",
                  "Study reminders and notifications",
                ],
                color: "from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500",
                bgColor: "bg-blue-50 dark:bg-blue-900/20",
                textColor: "text-blue-600 dark:text-blue-400",
              },
              {
                icon: Users,
                title: "Parents",
                features: [
                  "Real-time progress monitoring",
                  "Direct communication with teachers",
                  "Payment management system",
                  "Performance analytics and insights",
                  "Event and deadline notifications",
                ],
                color: "from-purple-600 to-pink-600 dark:from-purple-500 dark:to-pink-500",
                bgColor: "bg-purple-50 dark:bg-purple-900/20",
                textColor: "text-purple-600 dark:text-purple-400",
              },
              {
                icon: BookOpen,
                title: "Teachers",
                features: [
                  "Comprehensive content management",
                  "Quiz creation and grading tools",
                  "Student performance analytics",
                  "Automated attendance tracking",
                  "Customizable notification system",
                ],
                color: "from-emerald-600 to-teal-600 dark:from-emerald-500 dark:to-teal-500",
                bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
                textColor: "text-emerald-600 dark:text-emerald-400",
              },
            ].map((role, index) => (
              <AdaptiveSlideUp key={index} delay={index * 0.1}>
                <div className="h-full rounded-xl border border-gray-100 bg-white p-8 shadow-lg transition-all hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">
                  <div
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r text-white shadow-lg"
                    style={{
                      backgroundImage: `linear-gradient(to right, ${role.color.split(" ")[1]}, ${role.color.split(" ")[3]})`,
                    }}
                  >
                    <role.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">{role.title}</h3>
                  <ul className="space-y-3">
                    {role.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className={`mr-2 h-5 w-5 ${role.textColor}`} />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AdaptiveSlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Our Learning Paths */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Discover Our Learning Paths
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollAnimation delay={0.1}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Interactive Lessons</h3>
                  <p className="text-gray-600 mb-4">
                    Engage with our interactive lessons designed to make learning fun and effective.
                  </p>
                  <Link
                    href="/student/quizzes"
                    className="text-emerald-600 font-medium hover:text-emerald-800 transition-colors duration-300"
                  >
                    Explore Lessons →
                  </Link>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-r from-teal-400 to-emerald-500 flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Progress Tracking</h3>
                  <p className="text-gray-600 mb-4">
                    Track your learning journey with detailed progress reports and analytics.
                  </p>
                  <Link
                    href="/student/results"
                    className="text-emerald-600 font-medium hover:text-emerald-800 transition-colors duration-300"
                  >
                    View Progress →
                  </Link>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.3}>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="h-48 bg-gradient-to-r from-emerald-500 to-teal-400 flex items-center justify-center">
                  <svg
                    className="w-24 h-24 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800">Community Learning</h3>
                  <p className="text-gray-600 mb-4">
                    Join our vibrant community of learners and share your knowledge and experiences.
                  </p>
                  <Link
                    href="/community"
                    className="text-emerald-600 font-medium hover:text-emerald-800 transition-colors duration-300"
                  >
                    Join Community →
                  </Link>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              What Our Students Say
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ScrollAnimation delay={0.1}>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                    <span className="text-emerald-600 font-bold text-xl">S</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-500">Student</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "Safari Academy has transformed my learning experience. The interactive lessons and supportive
                  community have helped me excel in my studies."
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.2}>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-teal-100 flex items-center justify-center mr-4">
                    <span className="text-teal-600 font-bold text-xl">M</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Michael Chen</h4>
                    <p className="text-sm text-gray-500">Parent</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "As a parent, I appreciate the detailed progress reports and the engaging content that keeps my child
                  motivated to learn."
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={0.3}>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                    <span className="text-emerald-600 font-bold text-xl">A</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Aisha Patel</h4>
                    <p className="text-sm text-gray-500">Teacher</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The teaching tools provided by Safari Academy have revolutionized my classroom. My students are more
                  engaged and showing better results."
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Unique Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 inline-block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-emerald-400 dark:to-teal-400">
              What Makes Us Different
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300">
              Safari Academy offers unique features that set us apart from other educational platforms
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Zap,
                title: "AI-Powered Learning",
                description:
                  "Our adaptive learning system personalizes content based on individual strengths and areas for improvement.",
              },
              {
                icon: Globe,
                title: "Global Classroom",
                description:
                  "Connect with students and educators worldwide through our international learning community.",
              },
              {
                icon: Award,
                title: "Gamified Education",
                description: "Earn points, badges, and rewards as you progress through your educational journey.",
              },
              {
                icon: Users,
                title: "360° Feedback",
                description:
                  "Receive comprehensive feedback from peers, teachers, and our intelligent assessment system.",
              },
            ].map((feature, index) => (
              <AdaptiveSlideUp key={index} delay={index * 0.1}>
                <div className="h-full rounded-xl bg-white p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              </AdaptiveSlideUp>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-r from-emerald-600 to-teal-700">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-center">
            <ScrollAnimation>
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
                Ready to Start Your Learning Journey?
              </h2>
            </ScrollAnimation>
            <ScrollAnimation delay={0.1}>
              <p className="text-xl text-white text-center mb-8 max-w-2xl">
                Join thousands of students who are already benefiting from our interactive learning platform.
              </p>
            </ScrollAnimation>
            <ScrollAnimation delay={0.2}>
              <Link
                href="/signup"
                className="px-8 py-3 bg-white text-emerald-600 rounded-full font-medium hover:bg-gray-100 transition-colors duration-300"
              >
                Get Started Today
              </Link>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </div>
  )
}
