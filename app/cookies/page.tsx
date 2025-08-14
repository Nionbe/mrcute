import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollAnimation } from "@/components/scroll-animation"

export const metadata: Metadata = {
  title: "Cookie Policy | Safari Academy",
  description: "Learn about how Safari Academy uses cookies and how you can control them.",
}

export default function CookiePolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-center mb-8">
        <Link href="/">
          <Image
            src="/images/safari-academy-logo.png"
            alt="Safari Academy Logo"
            width={150}
            height={150}
            className="hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      <ScrollAnimation>
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-emerald-500 to-teal-700 bg-clip-text text-transparent">
          Cookie Policy
        </h1>
      </ScrollAnimation>

      <Card className="mb-8 shadow-lg border-emerald-100 hover:shadow-emerald-100/20 transition-all duration-300">
        <CardContent className="p-6">
          <ScrollAnimation>
            <h2 className="text-2xl font-semibold mb-4 text-emerald-700">What Are Cookies?</h2>
            <p className="mb-4 text-gray-700">
              Cookies are small text files that are placed on your device when you visit a website. They are widely used
              to make websites work more efficiently and provide information to the website owners.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-emerald-700 mt-8">How We Use Cookies</h2>
            <p className="mb-4 text-gray-700">
              Safari Academy uses cookies to enhance your experience on our website, remember your preferences, and
              understand how you interact with our content. This helps us improve our services and provide a more
              personalized experience.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-emerald-700 mt-8">Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>
                <strong>Essential Cookies:</strong> These are necessary for the website to function properly.
              </li>
              <li>
                <strong>Preference Cookies:</strong> These remember your settings and preferences.
              </li>
              <li>
                <strong>Analytics Cookies:</strong> These help us understand how visitors interact with our website.
              </li>
              <li>
                <strong>Marketing Cookies:</strong> These track your online activity to help deliver more relevant
                advertising.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-emerald-700 mt-8">Managing Cookies</h2>
            <p className="mb-4 text-gray-700">
              You can control and manage cookies in various ways. Most web browsers allow you to manage your cookie
              preferences. You can:
            </p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>Delete cookies from your device</li>
              <li>
                Block cookies by activating the setting on your browser that allows you to refuse all or some cookies
              </li>
              <li>Set your browser to notify you when you receive a cookie</li>
            </ul>
            <p className="mb-4 text-gray-700">
              Please note that if you choose to block or delete cookies, you may not be able to access certain areas or
              features of our website.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-emerald-700 mt-8">Changes to Our Cookie Policy</h2>
            <p className="mb-4 text-gray-700">
              We may update our Cookie Policy from time to time. Any changes will be posted on this page with an updated
              revision date.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-emerald-700 mt-8">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about our Cookie Policy, please{" "}
              <Link href="/contact" className="text-emerald-600 hover:text-emerald-800 underline">
                contact us
              </Link>
              .
            </p>
          </ScrollAnimation>
        </CardContent>
      </Card>

      <div className="text-center mt-8">
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-md transition-all duration-300"
        >
          Return to Home
        </Link>
      </div>
    </div>
  )
}
