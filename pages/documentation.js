import Head from "next/head";
import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import data from "../data/portfolio.json";

const documentationSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    items: [
      {
        title: "System Requirements",
        description: "Minimum device specifications and compatibility",
        content: `
**Mobile Device Requirements:**
- iOS 13.0+ or Android 8.0+
- GPS capability with high accuracy
- 4GB RAM minimum, 8GB recommended
- 32GB storage (16GB available)
- Camera for route verification

**Network Requirements:**
- Cellular data for initial sync
- Offline mode available for recorded routes
- WiFi recommended for large route downloads

**Battery Optimization:**
- External power recommended for long recording sessions
- Battery saver mode disables background GPS
        `
      },
      {
        title: "Initial Setup",
        description: "First-time configuration and account setup",
        content: `
**Account Creation:**
1. Download Qport from App Store or Google Play
2. Create account with business email
3. Verify email address
4. Complete company profile

**Team Setup:**
- Add team members with role assignments
- Configure sharing permissions
- Set up dispatch notifications
- Enable real-time tracking

**Device Configuration:**
- Allow location permissions (always)
- Enable background app refresh
- Configure notification preferences
- Test GPS accuracy in field conditions
        `
      }
    ]
  },
  {
    id: "route-recording",
    title: "Route Recording",
    items: [
      {
        title: "Recording Your First Route",
        description: "Step-by-step guide to route recording",
        content: `
**Pre-Recording Checklist:**
- Ensure GPS signal strength (4+ satellites)
- Verify adequate storage space
- Confirm route purpose and cargo details
- Check weather conditions for optimal recording

**Recording Process:**
1. Tap "Start Recording" on main screen
2. Enter route metadata (cargo type, weight, destination)
3. Begin driving at normal operating speed
4. App automatically captures waypoints and turns
5. Add manual markers for critical points
6. Complete recording at final destination

**Best Practices:**
- Drive the route as you would with actual cargo
- Maintain consistent speed for accurate timing
- Mark hazards, weight restrictions, clearance issues
- Record alternative paths for complex intersections
        `
      },
      {
        title: "Route Optimization",
        description: "Improving route quality and accuracy",
        content: `
**Quality Indicators:**
- GPS accuracy: <3 meter deviation
- Waypoint density: Every 50-100 meters
- Turn detection: All significant direction changes
- Elevation tracking: Continuous monitoring

**Enhancement Features:**
- Add custom waypoints for critical decisions
- Record voice notes at important locations
- Tag routes with cargo specifications
- Include photos of key landmarks or obstacles

**Route Validation:**
- Review recorded path on map
- Check for GPS drift or errors
- Verify turn-by-turn accuracy
- Test route following before team deployment
        `
      }
    ]
  },
  {
    id: "route-following",
    title: "Route Following",
    items: [
      {
        title: "Following Recorded Routes",
        description: "Navigation using pre-recorded routes",
        content: `
**Route Selection:**
1. Browse team route library
2. Filter by cargo type, vehicle size, date
3. Review route metrics and difficulty
4. Check recent feedback and conditions

**Navigation Features:**
- Turn-by-turn voice guidance
- Visual waypoint indicators
- Distance to next critical point
- Real-time GPS position tracking
- Offline navigation capability

**Safety Features:**
- Speed limit notifications
- Clearance height warnings
- Weight restriction alerts
- Hazard location reminders
        `
      },
      {
        title: "Real-Time Feedback",
        description: "Reporting conditions during route following",
        content: `
**Feedback Types:**
- Road condition changes
- New obstacles or hazards
- Construction or detours
- Traffic or timing updates

**Reporting Methods:**
- Quick voice notes (hands-free)
- Pre-defined condition tags
- Photo capture at stops
- GPS-stamped incident reports

**Team Coordination:**
- Real-time updates to dispatch
- Automatic team notifications
- Route condition database updates
- Performance metrics tracking
        `
      }
    ]
  },
  {
    id: "team-management",
    title: "Team Management",
    items: [
      {
        title: "User Roles & Permissions",
        description: "Managing team access and capabilities",
        content: `
**Role Types:**
- **Admin:** Full system access, user management, route approval
- **Route Creator:** Can record and edit routes, manage metadata
- **Driver:** Route following, feedback submission, basic recording
- **Viewer:** Read-only access to approved routes and reports

**Permission Settings:**
- Route recording authorization
- Team route library access
- Feedback and editing capabilities
- Export and sharing permissions

**Team Coordination:**
- Centralized route approval workflow
- Version control for route updates
- Performance tracking and analytics
- Communication and notification systems
        `
      }
    ]
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    items: [
      {
        title: "Common Issues",
        description: "Solutions to frequently encountered problems",
        content: `
**GPS Issues:**
- **Poor Signal:** Move to open area, wait for satellite lock
- **Inaccurate Position:** Restart app, check location permissions
- **Drift During Recording:** Avoid recording near tall buildings or heavy tree cover

**App Performance:**
- **Slow Loading:** Clear app cache, restart device
- **Battery Drain:** Reduce screen brightness, use power saving mode
- **Storage Full:** Delete old routes, clear temporary files

**Sync Problems:**
- **Routes Not Syncing:** Check internet connection, retry sync
- **Team Updates Missing:** Refresh route library, check account status
- **Login Issues:** Verify credentials, reset password if needed

**Contact Support:**
- In-app help chat
- Email: info@quickdili.com
- Phone: 1-800-Q-PORT-1
        `
      }
    ]
  }
];

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [activeItem, setActiveItem] = useState(0);

  const currentSection = documentationSections.find(section => section.id === activeSection);
  const currentItem = currentSection?.items[activeItem];

  return (
    <div className={`relative ${data.showCursor && "cursor-none"}`}>
      <Head>
        <title>Documentation | Qport Heavy Cargo Route Intelligence</title>
        <meta
          name="description"
          content="Complete user guides and documentation for Qport heavy cargo route recording and navigation platform."
        />
      </Head>
      {data.showCursor && <Cursor />}
      <div className="gradient-circle"></div>
      <div className="gradient-circle-bottom"></div>

      <div className="container mx-auto px-4">
        <Header />

        {/* Hero Section */}
        <section className="mt-16 text-center">
          <h1 className="text-4xl font-bold tablet:text-5xl laptop:text-6xl">
            Documentation
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg opacity-80">
            Complete guides for using Qport to record, follow, and manage heavy cargo routes.
          </p>
        </section>

        {/* Documentation Content */}
        <section className="mt-16">
          <div className="grid gap-8 laptop:grid-cols-4">
            {/* Sidebar Navigation */}
            <div className="laptop:col-span-1">
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm sticky top-4">
                <h3 className="font-semibold mb-4">Sections</h3>
                <nav className="space-y-2">
                  {documentationSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => {
                        setActiveSection(section.id);
                        setActiveItem(0);
                      }}
                      className={`w-full text-left p-2 rounded-lg text-sm transition-colors ${
                        activeSection === section.id
                          ? "bg-blue-600 text-white"
                          : "hover:bg-slate-100"
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="laptop:col-span-3">
              <div className="grid gap-6 laptop:grid-cols-3">
                {/* Section Items */}
                <div className="laptop:col-span-1">
                  <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
                    <h3 className="font-semibold mb-4">{currentSection?.title}</h3>
                    <div className="space-y-2">
                      {currentSection?.items.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveItem(index)}
                          className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                            activeItem === index
                              ? "bg-slate-100 border border-slate-300"
                              : "hover:bg-slate-50"
                          }`}
                        >
                          <div className="font-medium">{item.title}</div>
                          <div className="text-xs opacity-70 mt-1">{item.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content Display */}
                <div className="laptop:col-span-2">
                  <div className="rounded-2xl border border-slate-200 bg-white/70 p-6 shadow-sm">
                    <h2 className="text-2xl font-semibold mb-2">{currentItem?.title}</h2>
                    <p className="text-sm opacity-70 mb-6">{currentItem?.description}</p>

                    <div className="prose prose-sm max-w-none">
                      {currentItem?.content.split('\n').map((line, index) => {
                        if (line.startsWith('**') && line.endsWith('**')) {
                          return (
                            <h4 key={index} className="font-semibold text-lg mt-6 mb-3">
                              {line.slice(2, -2)}
                            </h4>
                          );
                        }
                        if (line.startsWith('- **') && line.includes(':**')) {
                          const [title, ...content] = line.slice(4).split(':**');
                          return (
                            <div key={index} className="mb-2">
                              <span className="font-medium">{title}:</span>
                              <span className="ml-1">{content.join(':**')}</span>
                            </div>
                          );
                        }
                        if (line.startsWith('- ')) {
                          return (
                            <li key={index} className="ml-4 mb-1">
                              {line.slice(2)}
                            </li>
                          );
                        }
                        if (line.match(/^\d+\./)) {
                          return (
                            <li key={index} className="ml-4 mb-1 list-decimal">
                              {line.replace(/^\d+\.\s*/, '')}
                            </li>
                          );
                        }
                        if (line.trim() === '') {
                          return <br key={index} />;
                        }
                        return (
                          <p key={index} className="mb-3">
                            {line}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mt-16">
          <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-8 text-white">
            <h2 className="text-2xl font-semibold mb-4">Need Additional Help?</h2>
            <div className="grid gap-4 tablet:grid-cols-3">
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
                <h3 className="font-semibold mb-2">Video Tutorials</h3>
                <p className="text-sm opacity-80 mb-3">
                  Watch step-by-step video guides for all major features.
                </p>
                <button className="text-sm font-medium hover:underline">
                  View Tutorials →
                </button>
              </div>
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
                <h3 className="font-semibold mb-2">Live Support</h3>
                <p className="text-sm opacity-80 mb-3">
                  Get real-time help from our technical support team.
                </p>
                <button className="text-sm font-medium hover:underline">
                  Start Chat →
                </button>
              </div>
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur">
                <h3 className="font-semibold mb-2">Training Sessions</h3>
                <p className="text-sm opacity-80 mb-3">
                  Schedule customized training for your team.
                </p>
                <button className="text-sm font-medium hover:underline">
                  Book Training →
                </button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Documentation;