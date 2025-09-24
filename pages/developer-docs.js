import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import Button from "../components/Button";
import data from "../data/portfolio.json";

const mobileFeatures = [
  {
    category: "Route Recording",
    description: "Capture GPS-precise routes for future navigation",
    features: [
      "One-tap route recording start/stop",
      "Real-time waypoint capture every 5 minutes",
      "Automatic elevation and turn detection",
      "Route metadata tagging (cargo type, restrictions)",
      "Save routes to cloud library"
    ]
  },
  {
    category: "Turn-by-Turn Navigation",
    description: "Follow pre-recorded routes with precision guidance",
    features: [
      "Visual and audio navigation prompts",
      "Real-time GPS positioning updates",
      "Route deviation alerts and warnings",
      "Offline map navigation (up to 8 hours)",
      "Alternative route suggestions"
    ]
  },
  {
    category: "Status Reporting",
    description: "Keep dispatch informed with real-time updates",
    features: [
      "Loading/unloading confirmation",
      "Route deviation incident reporting",
      "Photo documentation capture",
      "Emergency breakdown alerts",
      "Vehicle condition updates"
    ]
  },
  {
    category: "Communication",
    description: "Stay connected with fleet managers",
    features: [
      "In-app messaging with dispatch",
      "Emergency contact quick-dial",
      "Real-time status notifications",
      "Push alerts for route changes",
      "Driver-to-driver messaging"
    ]
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
            Qport Mobile App Documentation
          </h1>
          <p className="mt-6 mx-auto max-w-3xl text-lg opacity-80">
            Complete guide for drivers and fleet managers using the Qport mobile application for heavy cargo navigation.
          </p>
          <div className="mt-8 flex gap-4 justify-center">
            <Button classes="bg-blue-600 text-white hover:bg-blue-700 px-8 py-3">
              Download User Guide
            </Button>
            <Button classes="border-2 border-slate-300 hover:border-slate-400 px-8 py-3">
              Watch Tutorial Video
            </Button>
          </div>
        </section>

        <section className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Getting Started with Qport Mobile App</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              Step-by-step guide to start using Qport for heavy cargo navigation.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid gap-8 laptop:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Download & Install</h3>
              <p className="text-slate-600 mb-4">Download Qport from Google Play Store and install on your Android device.</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Android 8.0 or higher required</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Minimum 2GB RAM recommended</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>GPS and camera permissions needed</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Login & Setup</h3>
              <p className="text-slate-600 mb-4">Sign in with your driver credentials provided by your fleet manager.</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Enter driver ID and password</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Enable location services</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Download offline maps for your region</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Start Navigating</h3>
              <p className="text-slate-600 mb-4">Select your assigned route and begin turn-by-turn navigation.</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>View assigned delivery routes</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Follow GPS-precise navigation</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                  <span>Update status at checkpoints</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Mobile App Features</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              Comprehensive feature set designed specifically for heavy cargo drivers.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-6">
            {mobileFeatures.map((feature, index) => (
              <div key={index} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2">{feature.category}</h3>
                    <p className="text-slate-600 mb-4">{feature.description}</p>
                    <ul className="grid gap-2 tablet:grid-cols-2">
                      {feature.features.map((item) => (
                        <li key={item} className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Driver Workflow Guide</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              Complete workflow from route assignment to delivery completion.
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-6">
              {[
                {
                  step: "1. Route Assignment",
                  description: "Receive route assignment from dispatch via push notification",
                  actions: ["View route details and cargo specifications", "Check route difficulty and estimated time", "Download offline maps if needed", "Accept or request alternative route"]
                },
                {
                  step: "2. Pre-Departure Check",
                  description: "Complete loading checklist and vehicle inspection",
                  actions: ["Verify cargo loading completion", "Perform vehicle safety check", "Confirm fuel and supplies", "Update status to 'Ready to Depart'"]
                },
                {
                  step: "3. Navigation",
                  description: "Follow turn-by-turn GPS guidance along recorded route",
                  actions: ["Start route navigation", "Follow visual and audio prompts", "Report any route deviations", "Update location every 5 minutes"]
                },
                {
                  step: "4. Delivery & Feedback",
                  description: "Complete delivery and provide route feedback",
                  actions: ["Confirm arrival at destination", "Capture delivery photos", "Log any route issues or obstacles", "Update status to 'Delivered'"]
                }
              ].map((workflow, index) => (
                <div key={index} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 text-white text-2xl font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{workflow.step}</h3>
                      <p className="text-slate-600 mb-4">{workflow.description}</p>
                      <ul className="grid gap-2 tablet:grid-cols-2">
                        {workflow.actions.map((action) => (
                          <li key={action} className="flex items-start gap-2 text-sm text-slate-600">
                            <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-semibold mb-4">Troubleshooting & FAQs</h2>
            <p className="text-lg opacity-70 max-w-3xl mx-auto">
              Common issues and solutions for Qport mobile app users.
            </p>
          </div>

          <div className="max-w-5xl mx-auto space-y-4">
            {[
              {
                q: "GPS location not updating?",
                a: "Ensure location services are enabled in your device settings. Go to Settings > Apps > Qport > Permissions and enable 'Location' with 'Allow all the time' option for background tracking."
              },
              {
                q: "Offline maps not downloading?",
                a: "Check your internet connection and available storage space. Offline maps require at least 500MB of free space. Connect to Wi-Fi for faster downloads."
              },
              {
                q: "Route deviation alerts not working?",
                a: "Verify that you've started navigation mode and GPS accuracy is set to 'High' in device settings. Route deviation detection requires active GPS tracking."
              },
              {
                q: "Unable to upload delivery photos?",
                a: "Check camera permissions in app settings. If photos are stuck in upload queue, they'll automatically sync when internet connection is restored."
              },
              {
                q: "App draining battery quickly?",
                a: "Qport uses GPS tracking which consumes battery. Enable 'Battery Optimization' in app settings to reduce power consumption during long routes."
              },
              {
                q: "How to report route obstacles?",
                a: "Tap the 'Report Issue' button during navigation. Take a photo, select issue type (road block, low clearance, etc.), and add notes. Report syncs automatically with dispatch."
              }
            ].map((faq, index) => (
              <details key={index} className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <summary className="flex items-center justify-between cursor-pointer list-none">
                  <h3 className="text-lg font-semibold text-slate-800 pr-4">{faq.q}</h3>
                  <svg className="w-5 h-5 text-slate-600 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-32">
          <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-12 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-semibold mb-6">Need Help?</h2>
              <p className="text-lg opacity-90 mb-8">
                Contact our driver support team for assistance with the Qport mobile app.
              </p>
              <div className="grid gap-6 tablet:grid-cols-3">
                <div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">User Guides</h3>
                  <p className="text-sm opacity-80">Step-by-step tutorials and PDFs</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Video Tutorials</h3>
                  <p className="text-sm opacity-80">Watch how-to videos</p>
                </div>
                <div>
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Driver Support</h3>
                  <p className="text-sm opacity-80">24/7 hotline: 1-800-QPORT</p>
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