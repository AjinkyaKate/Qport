import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import Button from "../components/Button";
import data from "../data/portfolio.json";

const securityFeatures = [
  {
    title: "End-to-End Encryption",
    description: "All data transmission protected with TLS 1.3 encryption",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    )
  },
  {
    title: "Data Privacy Protection",
    description: "GDPR compliant with configurable data retention policies",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    )
  },
  {
    title: "Role-Based Access Control",
    description: "Granular permissions for users and stakeholders",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  },
  {
    title: "Audit Logging",
    description: "Complete audit trail of all system actions and changes",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    )
  },
  {
    title: "Multi-Factor Authentication",
    description: "Enhanced account security with MFA for all users",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
      </svg>
    )
  },
  {
    title: "Infrastructure Security",
    description: "99.5% uptime with redundant systems and DDoS protection",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
      </svg>
    )
  }
];

const complianceStandards = [
  {
    name: "GDPR",
    description: "General Data Protection Regulation",
    details: "Full compliance with EU data protection and privacy requirements for all user data."
  },
  {
    name: "SOC 2 Type II",
    description: "Service Organization Control",
    details: "Annual third-party audits ensuring security, availability, and confidentiality standards."
  },
  {
    name: "ISO 27001",
    description: "Information Security Management",
    details: "Internationally recognized standard for information security management systems."
  },
  {
    name: "Data Residency",
    description: "Regional Data Storage",
    details: "Customer data stored in region-specific data centers for compliance with local regulations."
  }
];

const dataProtection = [
  {
    category: "Data Encryption",
    items: [
      "TLS 1.3 for data in transit",
      "AES-256 encryption for data at rest",
      "End-to-end encrypted GPS coordinates",
      "Secure key management system"
    ]
  },
  {
    category: "Access Controls",
    items: [
      "Multi-factor authentication (MFA)",
      "Single Sign-On (SSO) support",
      "IP whitelisting options",
      "Session timeout controls"
    ]
  },
  {
    category: "Privacy Controls",
    items: [
      "Driver privacy protection",
      "Data anonymization capabilities",
      "Configurable retention policies",
      "Right to be forgotten compliance"
    ]
  },
  {
    category: "Monitoring & Response",
    items: [
      "24/7 security monitoring",
      "Automated threat detection",
      "Incident response procedures",
      "Regular security assessments"
    ]
  }
];

const SecurityCompliance = () => {
  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      <Head>
        <title>Security & Compliance | Qport Heavy Cargo Intelligence</title>
        <meta
          name="description"
          content="Enterprise-grade security and compliance for heavy cargo route intelligence. GDPR compliant, SOC 2 certified, and ISO 27001 certified."
        />
      </Head>
      {data.showCursor && <Cursor />}
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto px-4">
        <Header />

        <section className="mt-16 text-center">
          <div className="inline-flex items-center rounded-full bg-blue-50 border border-blue-200 px-4 py-2 text-sm font-medium text-blue-700 mb-6">
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Enterprise-Grade Security
          </div>
          <h1 className="text-4xl font-bold tablet:text-5xl laptop:text-6xl">
            Security & Compliance
          </h1>
          <p className="mt-6 mx-auto max-w-3xl text-lg opacity-80">
            Your data security and privacy are our top priorities. Qport is built with enterprise-grade security standards and full regulatory compliance.
          </p>
        </section>

        <section className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Security Features</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              Multi-layered security architecture protecting your sensitive logistics data.
            </p>
          </div>

          <div className="grid gap-8 tablet:grid-cols-2 laptop:grid-cols-3">
            {securityFeatures.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:-translate-y-1">
                <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Compliance & Certifications</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              Qport meets the highest industry standards for data security and privacy compliance.
            </p>
          </div>

          <div className="grid gap-8 laptop:grid-cols-2">
            {complianceStandards.map((standard) => (
              <div key={standard.name} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{standard.name}</h3>
                    <p className="text-sm text-blue-600 font-medium mb-3">{standard.description}</p>
                    <p className="text-slate-600">{standard.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Data Protection Measures</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              Comprehensive security controls protecting your logistics and vehicle data.
            </p>
          </div>

          <div className="grid gap-8 laptop:grid-cols-2">
            {dataProtection.map((section) => (
              <div key={section.category} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold mb-6 text-slate-800">{section.category}</h3>
                <ul className="space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-32">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-12 text-white">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-semibold mb-6 text-center">Security Best Practices</h2>
              <div className="grid gap-6 tablet:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">For Administrators</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>Enable MFA for all user accounts</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>Regularly review user permissions and access logs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>Configure data retention policies per compliance needs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>Set up IP whitelisting for sensitive operations</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">For Developers</h3>
                  <ul className="space-y-3 text-slate-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>Store API keys securely using environment variables</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>Implement rate limiting for API requests</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>Use webhook signature verification</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-1">→</span>
                      <span>Rotate API keys regularly per security policy</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-10 text-white text-center">
          <h2 className="text-2xl font-semibold mb-4">Security Questions?</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Our security team is available to discuss your specific compliance requirements and answer any questions.
          </p>
          <div className="flex gap-4 justify-center">
            <Button classes="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3">
              Contact Security Team
            </Button>
            <Button classes="border-2 border-white text-white hover:bg-white/10 px-8 py-3">
              Download Security Whitepaper
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default SecurityCompliance;