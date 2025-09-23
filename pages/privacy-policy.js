import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import data from "../data/portfolio.json";

const PrivacyPolicy = () => {
  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      <Head>
        <title>Privacy Policy | Qport</title>
        <meta
          name="description"
          content="Qport's privacy policy explaining how we collect, use, and protect your personal information."
        />
      </Head>
      {data.showCursor && <Cursor />}
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto px-4">
        <Header />

        {/* Hero Section */}
        <section className="mt-16">
          <h1 className="text-4xl font-bold tablet:text-5xl laptop:text-6xl mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg opacity-80 mb-4">
            Last updated: September 23, 2025
          </p>
          <p className="text-lg opacity-80 max-w-3xl">
            This Privacy Policy describes how Qport ("we," "us," or "our") collects, uses, and protects
            your information when you use our heavy cargo route intelligence platform.
          </p>
        </section>

        {/* Privacy Policy Content */}
        <section className="mt-16">
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-8 shadow-sm">
            <div className="prose prose-lg max-w-none">

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Information We Collect</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">Personal Information</h3>
              <p className="mb-4 opacity-80">
                We collect information you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>Name, email address, and contact information</li>
                <li>Company information and business details</li>
                <li>Account credentials and authentication data</li>
                <li>Communication preferences and support requests</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Location and Route Data</h3>
              <p className="mb-4 opacity-80">
                Our platform collects location and route information to provide navigation services:
              </p>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>GPS coordinates and location tracking data</li>
                <li>Route recordings and waypoint information</li>
                <li>Vehicle and cargo specifications</li>
                <li>Timing and performance metrics</li>
                <li>Route feedback and condition reports</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Technical Information</h3>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>Device information and operating system details</li>
                <li>App usage statistics and performance data</li>
                <li>Network connection and IP address information</li>
                <li>Crash reports and diagnostic information</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">Service Provision</h3>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>Provide route recording and navigation services</li>
                <li>Generate route intelligence and recommendations</li>
                <li>Enable team coordination and route sharing</li>
                <li>Deliver customer support and technical assistance</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Safety and Compliance</h3>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>Ensure safe heavy cargo transportation</li>
                <li>Comply with transportation regulations</li>
                <li>Investigate incidents and safety concerns</li>
                <li>Improve route safety through data analysis</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Business Operations</h3>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>Process payments and manage subscriptions</li>
                <li>Send important service notifications</li>
                <li>Improve our platform and develop new features</li>
                <li>Conduct research and analytics</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. Information Sharing</h2>

              <p className="mb-4 opacity-80">
                We do not sell, rent, or trade your personal information. We may share information in these circumstances:
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">With Your Consent</h3>
              <p className="mb-4 opacity-80">
                We share information within your organization and with team members as configured in your account settings.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Service Providers</h3>
              <p className="mb-4 opacity-80">
                We work with trusted third-party service providers who assist with:
              </p>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>Cloud hosting and data storage</li>
                <li>Payment processing and billing</li>
                <li>Email delivery and communication services</li>
                <li>Analytics and performance monitoring</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Legal Requirements</h3>
              <p className="mb-4 opacity-80">
                We may disclose information when required by law, court order, or to:
              </p>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>Comply with legal obligations</li>
                <li>Protect our rights and property</li>
                <li>Ensure user safety and prevent fraud</li>
                <li>Respond to emergency situations</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Data Security</h2>

              <p className="mb-4 opacity-80">
                We implement comprehensive security measures to protect your information:
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Technical Safeguards</h3>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>End-to-end encryption for data transmission</li>
                <li>Encrypted storage of sensitive information</li>
                <li>Regular security audits and penetration testing</li>
                <li>Multi-factor authentication and access controls</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Operational Security</h3>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>Employee security training and background checks</li>
                <li>Incident response and monitoring procedures</li>
                <li>Regular backups and disaster recovery planning</li>
                <li>Compliance with industry security standards</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Your Rights and Choices</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">Access and Control</h3>
              <p className="mb-4 opacity-80">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>Access and review your personal information</li>
                <li>Update or correct inaccurate information</li>
                <li>Delete your account and associated data</li>
                <li>Export your route data and information</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Communication Preferences</h3>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>Opt out of marketing communications</li>
                <li>Control notification settings</li>
                <li>Manage data sharing preferences</li>
                <li>Configure privacy settings</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Data Retention</h2>

              <p className="mb-4 opacity-80">
                We retain your information for as long as necessary to:
              </p>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>Provide our services to you</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Maintain safety and security records</li>
              </ul>

              <p className="mb-4 opacity-80">
                Route data may be retained longer for safety analysis and regulatory compliance purposes.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">7. International Data Transfers</h2>

              <p className="mb-4 opacity-80">
                Your information may be processed and stored in countries other than your own. We ensure
                appropriate safeguards are in place to protect your information in accordance with this
                Privacy Policy.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Children's Privacy</h2>

              <p className="mb-4 opacity-80">
                Our services are designed for business use and are not intended for individuals under 18.
                We do not knowingly collect personal information from children.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Changes to This Policy</h2>

              <p className="mb-4 opacity-80">
                We may update this Privacy Policy periodically. We will notify you of material changes
                through our platform or by email. Your continued use of our services after changes
                become effective constitutes acceptance of the updated policy.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Contact Us</h2>

              <p className="mb-4 opacity-80">
                If you have questions about this Privacy Policy or our data practices, please contact us:
              </p>

              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="mb-2"><strong>Email:</strong> privacy@quickport.app</p>
                <p className="mb-2"><strong>Mail:</strong> Qport Privacy Office, 123 Technology Drive, Suite 400, San Francisco, CA 94105</p>
                <p><strong>Phone:</strong> 1-800-Q-PORT-1</p>
              </div>

            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicy;