import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollAnimation } from "@/components/scroll-animation"

export const metadata: Metadata = {
  title: "GDPR Compliance | Safari Academy",
  description: "Learn about Safari Academy's GDPR compliance and data protection practices.",
}

export default function GDPRPage() {
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
          GDPR Compliance
        </h1>
      </ScrollAnimation>

      <Card className="mb-8 shadow-lg border-emerald-100 hover:shadow-emerald-100/20 transition-all duration-300">
        <CardContent className="p-6">
          <ScrollAnimation>
            <h2 className="text-2xl font-semibold mb-4 text-emerald-700">Our Commitment to Data Protection</h2>
            <p className="mb-4 text-gray-700">
              At Safari Academy, we are committed to protecting the personal data of our students, parents, teachers,
              and visitors. We comply with the General Data Protection Regulation (GDPR) and other applicable data
              protection laws.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-emerald-700 mt-8">What is GDPR?</h2>
            <p className="mb-4 text-gray-700">
              The General Data Protection Regulation (GDPR) is a regulation in EU law on data protection and privacy for
              all individuals within the European Union and the European Economic Area. It addresses the export of
              personal data outside the EU and EEA areas.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-emerald-700 mt-8">How We Comply with GDPR</h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>
                <strong>Lawful Processing:</strong> We only process personal data when we have a lawful basis to do so.
              </li>
              <li>
                <strong>Transparency:</strong> We provide clear information about how we collect and use personal data.
              </li>
              <li>
                <strong>Data Minimization:</strong> We only collect the personal data we need for specific purposes.
              </li>
              <li>
                <strong>Accuracy:</strong> We take steps to ensure the personal data we hold is accurate and up to date.
              </li>
              <li>
                <strong>Storage Limitation:</strong> We don't keep personal data for longer than necessary.
              </li>
              <li>
                <strong>Security:</strong> We implement appropriate technical and organizational measures to protect
                personal data.
              </li>
              <li>
                <strong>Accountability:</strong> We take responsibility for how we process personal data and demonstrate
                compliance.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-emerald-700 mt-8">Your Rights Under GDPR</h2>
            <p className="mb-4 text-gray-700">Under GDPR, you have the following rights:</p>
            <ul className="list-disc pl-6 mb-4 text-gray-700 space-y-2">
              <li>
                <strong>Right to Access:</strong> You can request a copy of your personal data.
              </li>
              <li>
                <strong>Right to Rectification:</strong> You can request that inaccurate personal data be corrected.
              </li>
              <li>
                <strong>Right to Erasure:</strong> You can request that your personal data be deleted in certain
                circumstances.
              </li>
              <li>
                <strong>Right to Restrict Processing:</strong> You can request that we limit how we use your personal
                data.
              </li>
              <li>
                <strong>Right to Data Portability:</strong> You can request a copy of your personal data in a
                machine-readable format.
              </li>
              <li>
                <strong>Right to Object:</strong> You can object to the processing of your personal data in certain
                circumstances.
              </li>
              <li>
                <strong>Rights Related to Automated Decision Making:</strong> You have rights related to automated
                decision making and profiling.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mb-4 text-emerald-700 mt-8">Data Protection Officer</h2>
            <p className="mb-4 text-gray-700">
              We have appointed a Data Protection Officer (DPO) who is responsible for overseeing questions in relation
              to this privacy notice. If you have any questions about this privacy notice, including any requests to
              exercise your legal rights, please contact our DPO using the details set out below.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-emerald-700 mt-8">Contact Us</h2>
            <p className="text-gray-700">
              If you have any questions about our GDPR compliance or wish to exercise your rights, please{" "}
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
