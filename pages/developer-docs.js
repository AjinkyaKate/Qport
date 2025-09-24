import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import Button from "../components/Button";
import data from "../data/portfolio.json";

const apiEndpoints = [
  {
    method: "GET",
    endpoint: "/api/v1/routes",
    description: "List all routes in your library",
    params: ["page", "limit", "search"]
  },
  {
    method: "GET",
    endpoint: "/api/v1/routes/:id",
    description: "Get route details by ID",
    params: ["id"]
  },
  {
    method: "POST",
    endpoint: "/api/v1/routes",
    description: "Create a new route",
    params: ["name", "waypoints", "metadata"]
  },
  {
    method: "GET",
    endpoint: "/api/v1/vehicles",
    description: "List all vehicles",
    params: ["status", "page", "limit"]
  },
  {
    method: "GET",
    endpoint: "/api/v1/vehicles/:id/location",
    description: "Get real-time vehicle location",
    params: ["id"]
  },
  {
    method: "POST",
    endpoint: "/api/v1/vehicles/:id/status",
    description: "Update vehicle status",
    params: ["id", "status", "location"]
  }
];

const codeExamples = {
  javascript: `// Initialize Qport Client
const Qport = require('@qport/sdk');

const client = new Qport({
  apiKey: process.env.QPORT_API_KEY,
  environment: 'production'
});

// Fetch route details
async function getRoute(routeId) {
  try {
    const route = await client.routes.get(routeId);
    console.log('Route:', route);
    return route;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Get real-time vehicle location
async function trackVehicle(vehicleId) {
  const location = await client.vehicles.getLocation(vehicleId);
  console.log('Current location:', location);
}`,

  python: `# Initialize Qport Client
from qport import QportClient

client = QportClient(
    api_key=os.environ.get('QPORT_API_KEY'),
    environment='production'
)

# Fetch route details
def get_route(route_id):
    try:
        route = client.routes.get(route_id)
        print(f'Route: {route}')
        return route
    except Exception as error:
        print(f'Error: {error}')

# Get real-time vehicle location
def track_vehicle(vehicle_id):
    location = client.vehicles.get_location(vehicle_id)
    print(f'Current location: {location}')`,

  curl: `# Get route details
curl -X GET \\
  https://api.qport.com/v1/routes/:id \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json'

# Get vehicle location
curl -X GET \\
  https://api.qport.com/v1/vehicles/:id/location \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json'

# Update vehicle status
curl -X POST \\
  https://api.qport.com/v1/vehicles/:id/status \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "status": "in_transit",
    "location": {
      "lat": 40.7128,
      "lng": -74.0060
    }
  }'`
};

const DeveloperDocs = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      <Head>
        <title>Developer Documentation | Qport API</title>
        <meta
          name="description"
          content="Complete API documentation for Qport's heavy cargo route intelligence platform. REST API, WebSocket, SDKs, and integration guides."
        />
      </Head>
      {data.showCursor && <Cursor />}
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto px-4">
        <Header />

        <section className="mt-16 text-center">
          <h1 className="text-4xl font-bold tablet:text-5xl laptop:text-6xl">
            Developer Documentation
          </h1>
          <p className="mt-6 mx-auto max-w-3xl text-lg opacity-80">
            Everything you need to integrate Qport's GPS-precise route intelligence into your applications.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button classes="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3">
              Get API Key
            </Button>
            <Button classes="border-2 border-slate-300 hover:border-slate-400 px-8 py-3">
              View on GitHub
            </Button>
          </div>
        </section>

        <section className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Quick Start</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              Get up and running with Qport API in just a few minutes.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-lg">
              <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                <div className="flex gap-2">
                  {['javascript', 'python', 'curl'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLanguage(lang)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        selectedLanguage === lang
                          ? 'bg-blue-600 text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      {lang === 'javascript' ? 'JavaScript' : lang === 'python' ? 'Python' : 'cURL'}
                    </button>
                  ))}
                </div>
                <button className="text-slate-400 hover:text-white text-sm flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy
                </button>
              </div>
              <div className="p-6 bg-slate-950 overflow-x-auto">
                <pre className="text-sm text-green-400 font-mono">
                  {codeExamples[selectedLanguage]}
                </pre>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">API Endpoints</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              RESTful API endpoints for route management and vehicle tracking.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-4">
            {apiEndpoints.map((endpoint, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex flex-col laptop:flex-row laptop:items-center laptop:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-bold ${
                        endpoint.method === 'GET' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-sm font-mono text-slate-700">{endpoint.endpoint}</code>
                    </div>
                    <p className="text-sm text-slate-600">{endpoint.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {endpoint.params.map((param) => (
                      <span key={param} className="px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                        {param}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">SDKs & Libraries</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              Official SDKs for popular programming languages and frameworks.
            </p>
          </div>

          <div className="grid gap-8 laptop:grid-cols-4">
            {[
              { name: 'JavaScript', package: 'npm install @qport/sdk', icon: '📦' },
              { name: 'Python', package: 'pip install qport-sdk', icon: '🐍' },
              { name: 'Java', package: 'maven: com.qport:sdk', icon: '☕' },
              { name: 'C#/.NET', package: 'nuget: Qport.SDK', icon: '⚙️' }
            ].map((sdk) => (
              <div key={sdk.name} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:-translate-y-1 text-center">
                <div className="text-4xl mb-4">{sdk.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{sdk.name}</h3>
                <code className="text-xs bg-slate-100 px-3 py-2 rounded text-slate-700 block">
                  {sdk.package}
                </code>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Key Concepts</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              Understanding core concepts for working with Qport API.
            </p>
          </div>

          <div className="grid gap-8 laptop:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Routes</h3>
              <p className="text-slate-600 mb-4">
                Routes are GPS-recorded paths optimized for heavy cargo navigation. Each route contains waypoints, metadata, and navigation instructions.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Waypoints with GPS coordinates</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Route metadata and restrictions</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Turn-by-turn navigation data</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Vehicles</h3>
              <p className="text-slate-600 mb-4">
                Vehicle objects represent heavy cargo vehicles with real-time tracking, status, and assigned routes.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Real-time GPS location</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Status (in_transit, loading, delivered)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Assigned route and driver info</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Webhooks</h3>
              <p className="text-slate-600 mb-4">
                Subscribe to real-time events for vehicle status updates, route deviations, and delivery confirmations.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>vehicle.location.updated</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>route.deviation.detected</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>delivery.completed</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Authentication</h3>
              <p className="text-slate-600 mb-4">
                Secure API authentication using API keys or OAuth 2.0 for enterprise integrations.
              </p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>API key authentication</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>OAuth 2.0 support</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Rate limiting and quotas</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-32">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-semibold mb-6">Need Help?</h2>
              <p className="text-lg opacity-90 mb-8">
                Join our developer community or contact our support team for technical assistance.
              </p>
              <div className="grid gap-6 tablet:grid-cols-3">
                <div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Documentation</h3>
                  <p className="text-sm opacity-80">Complete API reference and guides</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Community</h3>
                  <p className="text-sm opacity-80">Join Discord & Stack Overflow</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Support</h3>
                  <p className="text-sm opacity-80">Email: dev@qport.com</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default DeveloperDocs;