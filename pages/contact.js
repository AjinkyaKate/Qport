import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import Button from "../components/Button";
import data from "../data/portfolio.json";

const contactMethods = [
  {
    title: "Sales Inquiries",
    description: "Questions about Qport features, pricing, or implementation",
    email: "info@quickdili.com",
    phone: "+91 9673691461",
    hours: "Monday - Friday, 8 AM - 6 PM PST"
  },
  {
    title: "Technical Support",
    description: "App issues, route sync problems, or technical assistance",
    email: "info@quickdili.com",
    phone: "+91 9673691461",
    hours: "24/7 for Enterprise customers"
  },
  {
    title: "Partnerships",
    description: "Fleet management integrations, channel partnerships",
    email: "info@quickdili.com",
    phone: "+91 9673691461",
    hours: "Monday - Friday, 9 AM - 5 PM PST"
  }
];

const offices = [
  {
    city: "San Francisco",
    type: "Headquarters",
    address: "123 Technology Drive, Suite 400",
    city_state: "San Francisco, CA 94105",
    phone: "+1 (415) 555-0123",
    coordinates: "37.7749° N, 122.4194° W"
  },
  {
    city: "Calgary",
    type: "Operations Center",
    address: "456 Energy Plaza, Floor 12",
    city_state: "Calgary, AB T2P 2G8",
    phone: "+1 (403) 555-0456",
    coordinates: "51.0447° N, 114.0719° W"
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: "",
    inquiry_type: "general"
  });
  const [formStatus, setFormStatus] = useState({ state: "idle", message: "" });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formStatus.state !== "idle") {
      setFormStatus({ state: "idle", message: "" });
    }
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();
    if (formStatus.state === "loading") return;

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setFormStatus({ state: "error", message: "Please fill in all required fields." });
      return;
    }

    setFormStatus({ state: "loading", message: "Sending your message..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, source: "contact-page" }),
      });

      if (!response.ok) {
        throw new Error("Unable to send message. Please try again later.");
      }

      setFormStatus({
        state: "success",
        message: "Thank you! We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        subject: "",
        message: "",
        inquiry_type: "general"
      });
    } catch (error) {
      setFormStatus({
        state: "error",
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      <Head>
        <title>Contact Us | Qport Heavy Cargo Route Intelligence</title>
        <meta
          name="description"
          content="Get in touch with Qport for sales inquiries, technical support, or partnerships. Multiple ways to reach our team."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data.showCursor && <Cursor />}
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto px-4">
        <Header />

        {/* Hero Section */}
        <section className="mt-16 text-center">
          <h1 className="text-4xl font-bold tablet:text-5xl laptop:text-6xl">
            Contact Us
          </h1>
          <p className="mt-6 mx-auto max-w-3xl text-lg opacity-80">
            Ready to transform your heavy cargo operations? Our team is here to help with
            questions, support, and custom solutions.
          </p>
        </section>

        {/* Contact Methods */}
        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-center mb-8">How Can We Help?</h2>
          <div className="grid gap-6 laptop:grid-cols-3">
            {contactMethods.map((method) => (
              <div key={method.title} className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">{method.title}</h3>
                <p className="text-sm opacity-80 mb-4">{method.description}</p>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${method.email}`} className="text-blue-600 hover:text-blue-700">
                      {method.email}
                    </a>
                  </div>
                  <div>
                    <strong>Phone:</strong>{" "}
                    <a href={`tel:+919673691461`} className="text-blue-600 hover:text-blue-700">
                      +91 9673691461
                    </a>
                  </div>
                  <div className="text-xs opacity-60">
                    <strong>Hours:</strong> {method.hours}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="mt-24">
          <div className="grid gap-12 laptop:grid-cols-2 laptop:items-start">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
              <p className="text-lg opacity-80 mb-6">
                Fill out the form and we'll get back to you within 24 hours. For urgent matters,
                please call us directly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 tablet:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 bg-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 shadow-sm hover:border-slate-300"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 bg-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 shadow-sm hover:border-slate-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div className="grid gap-4 tablet:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Company
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 bg-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 shadow-sm hover:border-slate-300"
                      placeholder="Your company name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-200 bg-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 shadow-sm hover:border-slate-300"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Inquiry Type
                  </label>
                  <select
                    name="inquiry_type"
                    value={formData.inquiry_type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 bg-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 shadow-sm hover:border-slate-300"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="sales">Sales & Pricing</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="demo">Request Demo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 bg-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 shadow-sm hover:border-slate-300"
                    placeholder="Brief subject of your inquiry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-200 bg-white rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all duration-200 shadow-sm hover:border-slate-300 resize-none"
                    placeholder="Tell us about your heavy cargo logistics needs..."
                  />
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    type="primary"
                    onClick={handleSubmit}
                    disabled={formStatus.state === "loading"}
                    classes="px-6 py-2"
                  >
                    {formStatus.state === "loading" ? "Sending..." : "Send Message"}
                  </Button>
                  {formStatus.state === "success" && (
                    <p className="text-green-600 text-sm">
                      ✅ {formStatus.message}
                    </p>
                  )}
                  {formStatus.state === "error" && (
                    <p className="text-red-600 text-sm">
                      ❌ {formStatus.message}
                    </p>
                  )}
                </div>
              </form>
            </div>

            <div className="space-y-8">
              {/* Office Locations */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Our Offices</h3>
                <div className="space-y-4">
                  {offices.map((office) => (
                    <div key={office.city} className="rounded-lg border border-slate-200 bg-white/70 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold">{office.city}</h4>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {office.type}
                        </span>
                      </div>
                      <div className="text-sm opacity-80 space-y-1">
                        <div>{office.address}</div>
                        <div>{office.city_state}</div>
                        <div>
                          <a href={`tel:${office.phone}`} className="text-blue-600 hover:text-blue-700">
                            {office.phone}
                          </a>
                        </div>
                        <div className="text-xs opacity-60">{office.coordinates}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-6 text-white">
                <h3 className="text-xl font-semibold mb-3">Need Immediate Help?</h3>
                <p className="text-sm opacity-90 mb-4">
                  For urgent technical issues or time-sensitive inquiries, contact us directly:
                </p>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Emergency Support:</strong><br />
                    <a href="tel:+919673691461" className="text-blue-100 hover:text-white">
                      +91 9673691461
                    </a>
                  </div>
                  <div>
                    <strong>Priority Email:</strong><br />
                    <a href="mailto:info@quickdili.com" className="text-blue-100 hover:text-white">
                      info@quickdili.com
                    </a>
                  </div>
                </div>
                <p className="text-xs opacity-80 mt-4">
                  Available 24/7 for Enterprise customers
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-24">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold">Frequently Asked Questions</h2>
            <p className="mt-2 opacity-70">Quick answers to common questions</p>
          </div>
          <div className="grid gap-6 laptop:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white/70 p-4">
              <h4 className="font-semibold mb-2">What's your response time for support requests?</h4>
              <p className="text-sm opacity-80">
                Standard support: 24-48 hours. Enterprise customers: 4-hour response guarantee.
                Emergency issues are addressed immediately.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white/70 p-4">
              <h4 className="font-semibold mb-2">Do you offer custom integrations?</h4>
              <p className="text-sm opacity-80">
                Yes, we provide custom API integrations with fleet management systems, ERP platforms,
                and third-party logistics tools.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white/70 p-4">
              <h4 className="font-semibold mb-2">Can I schedule a product demonstration?</h4>
              <p className="text-sm opacity-80">
                Absolutely! Contact our sales team to schedule a personalized demo tailored to
                your heavy cargo logistics needs.
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white/70 p-4">
              <h4 className="font-semibold mb-2">What industries do you primarily serve?</h4>
              <p className="text-sm opacity-80">
                Mining, construction, renewable energy, oil & gas, and any industry requiring
                specialized heavy cargo transportation.
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Contact;