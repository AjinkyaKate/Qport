import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import Button from "../components/Button";
import data from "../data/portfolio.json";

const integrations = [
  {
    name: "Fleet Management Systems",
    description: "Seamlessly integrate Qport with your existing fleet management platform",
    features: ["Real-time GPS sync", "Route data sharing", "Driver status updates", "Automated reporting"],
    icon: "🚛"
  },
  {
    name: "Dispatch Software",
    description: "Connect Qport routes directly to your dispatch operations",
    features: ["Order synchronization", "Route assignment", "Status notifications", "Load tracking"],
    icon: "📋"
  },
  {
    name: "ERP Systems",
    description: "Integrate logistics data with your enterprise resource planning",
    features: ["Order management", "Delivery confirmation", "Billing integration", "Analytics sync"],
    icon: "🏢"
  },
  {
    name: "Telematics Providers",
    description: "Enhance vehicle data with Qport's precision route intelligence",
    features: ["GPS data enrichment", "Route compliance", "Performance metrics", "Safety analytics"],
    icon: "📡"
  }
];

const apiFeatures = [
  {
    title: "RESTful API",
    description: "Modern REST API with JSON payloads for easy integration",
    details: ["Complete API documentation", "Sandbox environment", "Rate limiting", "Webhook support"]
  },
  {
    title: "Real-time WebSocket",
    description: "Live GPS tracking and status updates via WebSocket connections",
    details: ["Sub-second updates", "Bi-directional communication", "Auto-reconnection", "Event streaming"]
  },
  {
    title: "Authentication & Security",
    description: "Enterprise-grade security with OAuth 2.0 and API keys",
    details: ["OAuth 2.0 support", "API key management", "TLS 1.3 encryption", "IP whitelisting"]
  },
  {
    title: "SDKs & Libraries",
    description: "Pre-built SDKs for popular programming languages",
    details: ["JavaScript/Node.js", "Python", "Java", "C#/.NET"]
  }
];

const APIIntegrations = () => {
  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      <Head>
        <title>API & Integrations | Qport Heavy Cargo Intelligence</title>
        <meta
          name="description"
          content="Integrate Qport's GPS-precise route intelligence with your existing fleet management, dispatch, and ERP systems."
        />
      </Head>
      {data.showCursor && <Cursor />}
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto px-4">
        <Header />

        <section className="mt-16 text-center">
          <h1 className="text-4xl font-bold tablet:text-5xl laptop:text-6xl">
            API & Integrations
          </h1>
          <p className="mt-6 mx-auto max-w-3xl text-lg opacity-80">
            Connect Qport's powerful route intelligence platform with your existing systems through our comprehensive API and pre-built integrations.
          </p>
        </section>

        <section className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Pre-Built Integrations</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              Seamlessly connect Qport with the tools your team already uses every day.
            </p>
          </div>

          <div className="grid gap-8 tablet:grid-cols-2 laptop:grid-cols-4">
            {integrations.map((integration) => (
              <div key={integration.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:-translate-y-1">
                <div className="text-4xl mb-4">{integration.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{integration.name}</h3>
                <p className="text-sm text-slate-600 mb-4">{integration.description}</p>
                <ul className="space-y-2">
                  {integration.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Developer API</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              Build custom integrations with our comprehensive, well-documented API.
            </p>
          </div>

          <div className="grid gap-8 laptop:grid-cols-2">
            {apiFeatures.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all duration-300">
                <h3 className="text-xl font-semibold mb-3 text-slate-800">{feature.title}</h3>
                <p className="text-slate-600 mb-6">{feature.description}</p>
                <div className="grid grid-cols-2 gap-3">
                  {feature.details.map((detail) => (
                    <div key={detail} className="flex items-center gap-2 text-sm text-slate-600">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-32">
          <div className="rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 p-10 text-white overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-2xl font-semibold mb-4">Quick Start Guide</h2>
              <p className="text-slate-300 mb-6 max-w-2xl">
                Get started with Qport API in minutes. Here's a simple example to fetch route data:
              </p>

              <div className="rounded-lg bg-slate-950 p-6 font-mono text-sm overflow-x-auto">
                <pre className="text-green-400">
{`// Initialize Qport API Client
const qport = require('@qport/api-client');

const client = new qport.Client({
  apiKey: 'your_api_key_here'
});

// Fetch route by ID
const route = await client.routes.get('route_id');

// Get real-time vehicle location
const location = await client.vehicles.getLocation('vehicle_id');

// Subscribe to status updates
client.on('vehicle.status.updated', (data) => {
  console.log('Vehicle status:', data);
});`}
                </pre>
              </div>

              <div className="mt-6 flex gap-4">
                <Button classes="bg-white text-slate-900 hover:bg-slate-100">
                  View Documentation
                </Button>
                <Button classes="border border-white/30 text-white hover:bg-white/10">
                  Get API Key
                </Button>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
          </div>
        </section>

        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Integration Support</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              Our team is here to help you integrate Qport with your existing systems.
            </p>
          </div>

          <div className="grid gap-8 laptop:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Documentation</h3>
              <p className="text-slate-600">
                Detailed API docs, code samples, and integration guides to get you started quickly.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Developer Support</h3>
              <p className="text-slate-600">
                Direct access to our engineering team for technical questions and troubleshooting.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Custom Integration Services</h3>
              <p className="text-slate-600">
                Need help? Our team can build custom integrations tailored to your specific needs.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-24 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-10 text-white text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Integrate?</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Start building with Qport API today. Get your API credentials and access our developer portal.
          </p>
          <div className="flex gap-4 justify-center">
            <Button classes="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3">
              Get Started
            </Button>
            <Button classes="border-2 border-white text-white hover:bg-white/10 px-8 py-3">
              Contact Sales
            </Button>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default APIIntegrations;