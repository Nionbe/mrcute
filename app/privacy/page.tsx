import { PageLayout } from "@/components/page-layout"

export const metadata = {
  title: "Privacy Policy | Safari Academy",
  description: "Safari Academy's privacy policy and data protection practices.",
}

export default function PrivacyPolicyPage() {
  return (
    <PageLayout title="Privacy Policy" description="Last updated: May 15, 2023">
      <div className="max-w-4xl mx-auto prose prose-headings:text-primary-800 prose-a:text-primary-600">
        <section className="mb-8">
          <p className="text-lg">
            At Safari Academy, we take your privacy seriously. This Privacy Policy explains how we collect, use,
            disclose, and safeguard your information when you visit our website and use our educational platform.
          </p>
          <p>
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please
            do not access the site.
          </p>
        </section>

        <section className="mb-8">
          <h2>Information We Collect</h2>
          <h3>Personal Data</h3>
          <p>
            We may collect personal identification information from Users in a variety of ways, including, but not
            limited to, when Users visit our site, register on the site, place an order, subscribe to the newsletter,
            respond to a survey, fill out a form, and in connection with other activities, services, features or
            resources we make available on our Site. Users may be asked for, as appropriate:
          </p>
          <ul>
            <li>Name</li>
            <li>Email address</li>
            <li>Mailing address</li>
            <li>Phone number</li>
            <li>Credit card information (for payment processing only)</li>
            <li>Educational information (grade level, academic history, etc.)</li>
          </ul>

          <h3>Usage Data</h3>
          <p>
            We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may
            include information such as your computer's Internet Protocol address (e.g. IP address), browser type,
            browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on
            those pages, unique device identifiers and other diagnostic data.
          </p>

          <h3>Cookies and Tracking Technologies</h3>
          <p>
            We use cookies and similar tracking technologies to track the activity on our Service and hold certain
            information. Cookies are files with small amount of data which may include an anonymous unique identifier.
          </p>
          <p>
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if
            you do not accept cookies, you may not be able to use some portions of our Service.
          </p>
        </section>

        <section className="mb-8">
          <h2>How We Use Your Information</h2>
          <p>Safari Academy may use the information we collect from you for the following purposes:</p>
          <ul>
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
            <li>To provide customer support</li>
            <li>To gather analysis or valuable information so that we can improve our Service</li>
            <li>To monitor the usage of our Service</li>
            <li>To detect, prevent and address technical issues</li>
            <li>To personalize the educational experience for students</li>
            <li>To process payments and fulfill orders</li>
            <li>To send periodic emails regarding your account or other products and services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>Disclosure of Your Information</h2>
          <p>We may disclose your personal information in the following situations:</p>
          <ul>
            <li>
              <strong>Business Transfers.</strong> If we are involved in a merger, acquisition, or sale of all or a
              portion of our assets, your information may be transferred as part of that transaction.
            </li>
            <li>
              <strong>To Affiliates.</strong> We may share your information with our affiliates, in which case we will
              require those affiliates to honor this Privacy Policy.
            </li>
            <li>
              <strong>To Business Partners.</strong> We may share your information with our business partners to offer
              you certain products, services or promotions.
            </li>
            <li>
              <strong>With Your Consent.</strong> We may disclose your personal information for any other purpose with
              your consent.
            </li>
            <li>
              <strong>Other Legal Requirements.</strong> We may disclose your information where we are legally required
              to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court
              order, or legal process.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2>Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information.
            While we have taken reasonable steps to secure the personal information you provide to us, please be aware
            that despite our efforts, no security measures are perfect or impenetrable, and no method of data
            transmission can be guaranteed against any interception or other type of misuse.
          </p>
        </section>

        <section className="mb-8">
          <h2>Children's Privacy</h2>
          <p>
            Our Service is directed to children under the age of 13, and we recognize the need to provide further
            privacy protections with respect to personal information we may collect from them. We comply with the
            Children's Online Privacy Protection Act (COPPA) and similar laws around the world.
          </p>
          <p>
            We only collect personal information from children under 13 with the consent of a parent or guardian. If we
            learn we have collected personal information from a child under 13 without parental consent, we will delete
            that information promptly.
          </p>
        </section>

        <section className="mb-8">
          <h2>Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>The right to access the personal information we have about you</li>
            <li>The right to request correction of inaccurate personal information</li>
            <li>The right to request deletion of your personal information</li>
            <li>The right to object to processing of your personal information</li>
            <li>The right to data portability</li>
            <li>The right to withdraw consent</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us using the information provided in the "Contact Us"
            section below.
          </p>
        </section>

        <section className="mb-8">
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.
          </p>
          <p>
            You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
            are effective when they are posted on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2>Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
          <ul>
            <li>By email: privacy@safariacademy.edu</li>
            <li>By phone: (555) 123-4567</li>
            <li>By mail: 123 Education Lane, Learning City, LC 12345</li>
          </ul>
        </section>
      </div>
    </PageLayout>
  )
}
