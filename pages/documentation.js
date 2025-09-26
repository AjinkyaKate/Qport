import Head from "next/head";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Cursor from "../components/Cursor";
import Button from "../components/Button";
import data from "../data/portfolio.json";

const documentationSections = [
  {
    id: "getting-started",
    title: "Getting Started",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
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
    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
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
    icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
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
    icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
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
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
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
        `
      }
    ]
  }
];

const Documentation = () => {
  const [activeSection, setActiveSection] = useState("getting-started");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = documentationSections.map(s => s.id);

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="laptop:hidden fixed bottom-6 right-6 z-50 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="flex gap-8 mt-16">
          <aside className={`
            fixed laptop:sticky top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-white border-r border-slate-200
            transition-transform duration-300 z-40 overflow-y-auto
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full laptop:translate-x-0'}
          `}>
            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">User Guide</h3>
              </div>

              <nav className="space-y-1">
                {documentationSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                      ${activeSection === section.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }
                    `}
                  >
                    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={section.icon} />
                    </svg>
                    <span>{section.title}</span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-slate-200">
                <Button classes="w-full bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 text-sm">
                  Download PDF Guide
                </Button>
              </div>
            </div>
          </aside>

          {isSidebarOpen && (
            <div
              className="laptop:hidden fixed inset-0 bg-black/30 z-30"
              onClick={() => setIsSidebarOpen(false)}
            />
          )}

          <main className="flex-1 min-w-0 pb-20">
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-4">
                Qport<span className="text-blue-600">.</span> Documentation
              </h1>
              <p className="text-lg text-slate-600 max-w-3xl">
                Complete guides for using Qport to record, follow, and manage heavy cargo routes. Learn how to maximize efficiency and safety with GPS-precise route intelligence.
              </p>
            </div>

            {documentationSections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-20 mt-16">
                <h2 className="text-3xl font-bold mb-8">{section.title}</h2>

                <div className="space-y-6">
                  {section.items.map((item, index) => (
                    <div key={index} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                      <div className="flex items-start gap-4 mb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                          <p className="text-sm text-slate-600">{item.description}</p>
                        </div>
                      </div>

                      <div className="prose prose-slate max-w-none">
                        {item.content.split('\n').map((line, idx) => {
                          if (line.startsWith('**') && line.endsWith('**')) {
                            return (
                              <h4 key={idx} className="font-semibold text-lg mt-6 mb-3 text-slate-800">
                                {line.slice(2, -2)}
                              </h4>
                            );
                          }
                          if (line.startsWith('- **') && line.includes(':**')) {
                            const [title, ...content] = line.slice(4).split(':**');
                            return (
                              <div key={idx} className="mb-3 pl-4">
                                <span className="font-semibold text-slate-800">{title}:</span>
                                <span className="ml-1 text-slate-600">{content.join(':**')}</span>
                              </div>
                            );
                          }
                          if (line.startsWith('- ')) {
                            return (
                              <li key={idx} className="ml-4 mb-2 text-slate-600 flex items-start gap-2">
                                <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
                                <span>{line.slice(2)}</span>
                              </li>
                            );
                          }
                          if (line.match(/^\d+\./)) {
                            return (
                              <li key={idx} className="ml-4 mb-2 text-slate-600 list-decimal">
                                {line.replace(/^\d+\.\s*/, '')}
                              </li>
                            );
                          }
                          if (line.trim() === '') {
                            return <br key={idx} />;
                          }
                          return (
                            <p key={idx} className="mb-3 text-slate-600">
                              {line}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}

            <section className="mt-16">
              <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 p-12 text-white">
                <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-3xl font-semibold mb-6">Need Additional Help?</h2>
                  <p className="text-lg opacity-90 mb-8">
                    Access additional resources and support for your team.
                  </p>
                  <div className="grid gap-6 tablet:grid-cols-3">
                    <div className="rounded-lg bg-white/10 p-6 backdrop-blur">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Video Tutorials</h3>
                      <p className="text-sm opacity-80">
                        Watch step-by-step video guides for all major features.
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/10 p-6 backdrop-blur">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Live Support</h3>
                      <p className="text-sm opacity-80">
                        Get real-time help from our technical support team.
                      </p>
                    </div>
                    <div className="rounded-lg bg-white/10 p-6 backdrop-blur">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Training Sessions</h3>
                      <p className="text-sm opacity-80">
                        Schedule customized training for your team.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Documentation;