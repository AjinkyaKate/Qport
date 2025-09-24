import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import data from "../data/portfolio.json";

const TermsOfService = () => {
  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      <Head>
        <title>Terms of Service | Qport</title>
        <meta
          name="description"
          content="Qport's terms of service governing the use of our heavy cargo route intelligence platform."
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
            Terms of Service
          </h1>
          <p className="text-lg opacity-80 mb-4">
            Last updated: September 23, 2025
          </p>
          <p className="text-lg opacity-80 max-w-3xl">
            These Terms of Service ("Terms") govern your access to and use of Qport's heavy cargo
            route intelligence platform and related services.
          </p>
        </section>

        {/* Terms Content */}
        <section className="mt-16">
          <div className="rounded-2xl border border-slate-200 bg-white/70 p-8 shadow-sm">
            <div className="prose prose-lg max-w-none">

              <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4 opacity-80">
                By accessing or using Qport's services, you agree to be bound by these Terms and our Privacy Policy.
                If you do not agree to these Terms, you may not use our services.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">2. Description of Service</h2>
              <p className="mb-4 opacity-80">
                Qport provides a heavy cargo route intelligence platform that enables users to:
              </p>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>Record GPS-accurate routes for heavy cargo transportation</li>
                <li>Follow pre-recorded routes with turn-by-turn navigation</li>
                <li>Share route libraries within teams and organizations</li>
                <li>Access route analytics and performance metrics</li>
                <li>Coordinate logistics operations through real-time tracking</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Accounts and Registration</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">Account Creation</h3>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>You must provide accurate and complete information when creating an account</li>
                <li>You are responsible for maintaining the security of your account credentials</li>
                <li>You must notify us immediately of any unauthorized access to your account</li>
                <li>One person or legal entity may maintain only one account</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Business Use</h3>
              <p className="mb-4 opacity-80">
                Our services are intended for business use by organizations engaged in heavy cargo transportation.
                Personal or recreational use is not permitted under these Terms.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">4. Acceptable Use</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">Permitted Uses</h3>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>Recording routes for legitimate heavy cargo transportation</li>
                <li>Following routes for authorized business operations</li>
                <li>Sharing routes within your organization or with authorized partners</li>
                <li>Using route data for operational planning and optimization</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Prohibited Activities</h3>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>Using the service for illegal activities or unauthorized access to restricted areas</li>
                <li>Recording routes on private property without permission</li>
                <li>Sharing route data with unauthorized third parties</li>
                <li>Reverse engineering, modifying, or creating derivative works</li>
                <li>Interfering with the service's security or integrity</li>
                <li>Using automated systems to access the service without permission</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">5. Safety and Compliance</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">User Responsibility</h3>
              <p className="mb-4 opacity-80">
                You acknowledge and agree that:
              </p>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>You are solely responsible for safe operation of vehicles and equipment</li>
                <li>Our route suggestions are advisory only and subject to real-world conditions</li>
                <li>You must comply with all applicable transportation regulations and laws</li>
                <li>You must verify route conditions and restrictions before use</li>
                <li>You assume all risks associated with heavy cargo transportation</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Route Accuracy</h3>
              <p className="mb-4 opacity-80">
                While we strive for accuracy, route data may contain errors or become outdated.
                Users must exercise professional judgment and conduct independent verification of route conditions.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">6. Intellectual Property</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">Our Rights</h3>
              <p className="mb-4 opacity-80">
                Qport retains all rights, title, and interest in the platform, software, and related technology.
                You may not reproduce, distribute, or create derivative works without written permission.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Your Content</h3>
              <p className="mb-4 opacity-80">
                You retain ownership of route data and content you create. By using our service, you grant us
                a license to use, store, and process your content solely to provide our services.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">7. Payment and Subscription</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">Fees</h3>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>Subscription fees are charged in advance and are non-refundable</li>
                <li>Prices may change with 30 days' notice to existing subscribers</li>
                <li>Usage-based charges apply to certain features as specified in your plan</li>
                <li>All fees are exclusive of applicable taxes</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Cancellation</h3>
              <p className="mb-4 opacity-80">
                You may cancel your subscription at any time. Cancellation will be effective at the end
                of your current billing period.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">8. Limitation of Liability</h2>

              <p className="mb-4 opacity-80">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW:
              </p>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>Qport provides services "as is" without warranties of any kind</li>
                <li>We are not liable for indirect, incidental, or consequential damages</li>
                <li>Our total liability shall not exceed the amount paid for services in the preceding 12 months</li>
                <li>We are not responsible for damages resulting from route inaccuracies or service interruptions</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">9. Indemnification</h2>

              <p className="mb-4 opacity-80">
                You agree to indemnify and hold Qport harmless from claims arising from:
              </p>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>Your use of our services</li>
                <li>Your violation of these Terms</li>
                <li>Your transportation operations and activities</li>
                <li>Your violation of applicable laws or regulations</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">10. Service Availability</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">Uptime</h3>
              <p className="mb-4 opacity-80">
                We strive to maintain high service availability but do not guarantee uninterrupted access.
                Scheduled maintenance will be announced in advance when possible.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Data Backup</h3>
              <p className="mb-4 opacity-80">
                While we maintain regular backups, you are responsible for maintaining your own copies
                of critical route data.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">11. Termination</h2>

              <p className="mb-4 opacity-80">
                We may terminate or suspend your access to our services:
              </p>
              <ul className="list-disc pl-6 mb-4 opacity-80">
                <li>For violation of these Terms</li>
                <li>For non-payment of fees</li>
                <li>For conduct that poses risks to other users or our systems</li>
                <li>At our discretion with 30 days' notice for convenience</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">12. Governing Law</h2>

              <p className="mb-4 opacity-80">
                These Terms are governed by the laws of the State of California, without regard to
                conflict of law provisions. Any disputes will be resolved in the courts of San Francisco County, California.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">13. Changes to Terms</h2>

              <p className="mb-4 opacity-80">
                We may modify these Terms at any time. Material changes will be communicated through
                our platform or by email. Continued use of our services after changes take effect
                constitutes acceptance of the modified Terms.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">14. Contact Information</h2>

              <p className="mb-4 opacity-80">
                For questions about these Terms, please contact us:
              </p>

              <div className="bg-slate-50 p-4 rounded-lg">
                <p className="mb-2"><strong>Email:</strong> info@quickdili.com</p>
                <p className="mb-2"><strong>Mail:</strong> Qport Legal Department, 123 Technology Drive, Suite 400, San Francisco, CA 94105</p>
                <p><strong>Phone:</strong> +91 9673691461</p>
              </div>

              <h2 className="text-2xl font-semibold mt-8 mb-4">15. Severability</h2>

              <p className="mb-4 opacity-80">
                If any provision of these Terms is found to be unenforceable, the remaining provisions
                will continue in full force and effect.
              </p>

            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default TermsOfService;